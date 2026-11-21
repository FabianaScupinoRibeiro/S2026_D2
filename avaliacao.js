(() => {
  "use strict";

  // =========================================================================
  // BASE DE SENHAS DO DIA NA UNIDADE (VINCULAÇÃO E CONTROLE DE DUPLICIDADE)
  // =========================================================================
  function getInitialTicketsDb() {
    return [
      {
        code: "N-104",
        queue: "Fila Normal",
        service: "Parcelamento de Débitos",
        desk: "Guichê 01",
        status: "ENCERRADO",
        statusLabel: "Atendimento Encerrado (Checkout Concluído)",
        closedAt: "15:42",
        evaluated: false,
        evaluatedAt: null,
        npsScore: null,
        starScore: null,
      },
      {
        code: "P-042",
        queue: "Preferencial Legal",
        service: "Troca de Titularidade",
        desk: "Guichê 02",
        status: "ENCERRADO",
        statusLabel: "Atendimento Encerrado (Checkout Concluído)",
        closedAt: "15:48",
        evaluated: false,
        evaluatedAt: null,
        npsScore: null,
        starScore: null,
      },
      {
        code: "A-205",
        queue: "Hora Marcada (Agendado)",
        service: "Revisão de Consumo",
        desk: "Guichê 04",
        status: "ENCERRADO",
        statusLabel: "Atendimento Encerrado (Checkout Concluído)",
        closedAt: "15:50",
        evaluated: false,
        evaluatedAt: null,
        npsScore: null,
        starScore: null,
      },
      {
        code: "R-318",
        queue: "Recepção Expressa",
        service: "2ª Via Expressa de Fatura",
        desk: "Balcão Recepção",
        status: "ENCERRADO",
        statusLabel: "Concluído na Recepção",
        closedAt: "15:51",
        evaluated: false,
        evaluatedAt: null,
        npsScore: null,
        starScore: null,
      },
      {
        code: "N-108",
        queue: "Fila Normal",
        service: "Religação de Água",
        desk: "Guichê 03",
        status: "EM_ATENDIMENTO",
        statusLabel: "Em Atendimento no Guichê 03 (Ainda Não Encerrado)",
        closedAt: null,
        evaluated: false,
        evaluatedAt: null,
        npsScore: null,
        starScore: null,
      },
      {
        code: "P-049",
        queue: "Preferencial Legal",
        service: "Cadastro Tarifa Social",
        desk: "Aguardando Chamada",
        status: "AGUARDANDO_FILA",
        statusLabel: "Aguardando Atendimento na Fila",
        closedAt: null,
        evaluated: false,
        evaluatedAt: null,
        npsScore: null,
        starScore: null,
      },
      {
        code: "N-101",
        queue: "Fila Normal",
        service: "2ª Via e Débito Automático",
        desk: "Guichê 01",
        status: "ENCERRADO",
        statusLabel: "Atendimento Encerrado",
        closedAt: "14:18",
        evaluated: true,
        evaluatedAt: "14:20",
        npsScore: 10,
        starScore: 5,
      },
    ];
  }

  let ticketsDb = getInitialTicketsDb();

  const state = {
    currentStep: 1,
    activeTicketCode: null,
    selectedNps: null,
    selectedStars: null,
    selectedTags: new Set(),
    autoReturnTimer: null,
    autoReturnSec: 12,
  };

  const STAR_DESCRIPTIONS = {
    1: "1 estrela — Muito insatisfeito",
    2: "2 estrelas — Insatisfeito",
    3: "3 estrelas — Regular / Neutro",
    4: "4 estrelas — Satisfeito com o atendimento",
    5: "5 estrelas — Excelente atendimento!",
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function currentHHMM() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  }

  // Normaliza códigos digitados sem hífen (ex.: "n104" -> "N-104")
  function normalizeTicketCode(raw) {
    const clean = (raw || "").trim().toUpperCase().replace(/\s+/g, "");
    if (!clean) return "";
    if (/^[A-Z]\d+$/.test(clean)) {
      return `${clean[0]}-${clean.slice(1)}`;
    }
    return clean;
  }

  // =========================================================================
  // NAVEGAÇÃO ENTRE AS 4 ETAPAS DO TABLET COMPARTILHADO
  // =========================================================================
  function goToStep(stepNum) {
    state.currentStep = stepNum;
    if (state.autoReturnTimer) {
      clearInterval(state.autoReturnTimer);
      state.autoReturnTimer = null;
    }

    $("#pane-welcome").classList.toggle("hidden", stepNum !== 1);
    $("#pane-ticket-validation").classList.toggle("hidden", stepNum !== 2);
    $("#pane-rating-form").classList.toggle("hidden", stepNum !== 3);
    $("#pane-thanks").classList.toggle("hidden", stepNum !== 4);

    [1, 2, 3, 4].forEach((n) => {
      const el = $(`#nav-step-${n}`);
      el.classList.remove("active", "done");
      if (n === stepNum) el.classList.add("active");
      else if (n < stepNum) el.classList.add("done");
    });

    if (stepNum === 1) {
      renderOverviewTicketsList();
    } else if (stepNum === 2) {
      renderValidationPresetChips();
      setTimeout(() => $("#input-senha-avaliacao").focus(), 100);
    }
  }

  // =========================================================================
  // ETAPA 1: MONITOR DE SENHAS NA TELA INICIAL E BOTÃO "INICIAR AVALIAÇÃO"
  // =========================================================================
  function renderOverviewTicketsList() {
    const container = $("#overview-tickets-list");
    container.innerHTML = "";

    ticketsDb.forEach((tk) => {
      let badgeHtml = "";
      if (tk.status !== "ENCERRADO") {
        badgeHtml = `<span class="tag tag-amber">⏳ Em Andamento (Bloqueada)</span>`;
      } else if (tk.evaluated) {
        badgeHtml = `<span class="tag tag-red">🔒 Já Avaliada (${tk.evaluatedAt})</span>`;
      } else {
        badgeHtml = `<span class="tag tag-green">✓ Encerrada • Liberada</span>`;
      }

      const tile = document.createElement("div");
      tile.className = "overview-ticket-tile";
      tile.title = "Toque para testar esta senha na tela de validação";
      tile.innerHTML = `
        <div>
          <strong>Senha ${tk.code}</strong>
          <small>${tk.service} • ${tk.desk}</small>
        </div>
        ${badgeHtml}
      `;

      tile.addEventListener("click", () => {
        goToStep(2);
        $("#input-senha-avaliacao").value = tk.code;
        validateTicketAndShowFeedback(tk.code, false);
      });

      container.appendChild(tile);
    });
  }

  $("#btn-iniciar-avaliacao").addEventListener("click", () => {
    $("#input-senha-avaliacao").value = "";
    $("#ticket-validation-alert").classList.add("hidden");
    goToStep(2);
  });

  // =========================================================================
  // ETAPA 2: VALIDAÇÃO DA SENHA (SÓ LIBERA APÓS ENCERRAMENTO E SEM DUPLICIDADE)
  // =========================================================================
  function renderValidationPresetChips() {
    const wrap = $("#validation-preset-chips");
    wrap.innerHTML = "";

    ticketsDb.forEach((tk) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip";

      let statusShort = "";
      if (tk.status !== "ENCERRADO") {
        statusShort = "⏳ Não Encerrada";
      } else if (tk.evaluated) {
        statusShort = "🔒 Já Avaliada";
      } else {
        statusShort = "✓ Pronta p/ Avaliar";
      }

      btn.textContent = `${tk.code} (${statusShort})`;
      btn.addEventListener("click", () => {
        $("#input-senha-avaliacao").value = tk.code;
        validateTicketAndShowFeedback(tk.code, false);
      });
      wrap.appendChild(btn);
    });
  }

  function validateTicketAndShowFeedback(rawCode, shouldAdvanceIfValid) {
    const code = normalizeTicketCode(rawCode);
    $("#input-senha-avaliacao").value = code;
    const alertBox = $("#ticket-validation-alert");

    if (!code) {
      alertBox.className = "validation-alert error-not-closed";
      alertBox.innerHTML = `⚠️ Por favor, digite ou selecione o código da sua senha de atendimento.`;
      alertBox.classList.remove("hidden");
      return false;
    }

    const found = ticketsDb.find((t) => t.code === code);
    if (!found) {
      alertBox.className = "validation-alert error-duplicate";
      alertBox.innerHTML = `
        ❌ <strong>Senha "${code}" não localizada nos atendimentos de hoje:</strong><br/>
        Verifique o código impresso ou exibido no seu comprovante (ex.: <strong>N-104</strong>, <strong>P-042</strong>, <strong>A-205</strong> ou <strong>R-318</strong>).
      `;
      alertBox.classList.remove("hidden");
      return false;
    }

    // REGRA 1: Só libera após o encerramento do atendimento da senha
    if (found.status !== "ENCERRADO") {
      alertBox.className = "validation-alert error-not-closed";
      alertBox.innerHTML = `
        ⏳ <strong>Avaliação ainda não liberada para a senha ${found.code}:</strong><br/>
        Status atual: <strong>${found.statusLabel}</strong> (${found.service}).<br/>
        A avaliação de satisfação no tablet só é liberada <strong>após o encerramento (checkout) do atendimento</strong> pelo atendente.
      `;
      alertBox.classList.remove("hidden");
      return false;
    }

    // REGRA 2: Evita duplicidades (bloqueia caso a senha já tenha sido avaliada)
    if (found.evaluated) {
      alertBox.className = "validation-alert error-duplicate";
      alertBox.innerHTML = `
        🔒 <strong>Avaliação já realizada para a senha ${found.code} (Duplicidade Bloqueada):</strong><br/>
        Esta senha já teve sua avaliação de satisfação registrada hoje às <strong>${found.evaluatedAt}</strong> (Nota NPS <strong>${found.npsScore}/10</strong> • <strong>${found.starScore} ★</strong>).<br/>
        Para garantir a integridade dos indicadores, cada senha só pode ser avaliada uma única vez.
      `;
      alertBox.classList.remove("hidden");
      return false;
    }

    // SENHA VÁLIDA, ENCERRADA E AINDA NÃO AVALIADA!
    alertBox.className = "validation-alert ok-ready";
    alertBox.innerHTML = `
      ✓ <strong>Senha ${found.code} validada com sucesso!</strong> Atendimento encerrado às <strong>${found.closedAt}</strong> (${found.service} • ${found.desk}). Clique em <em>"Validar Senha e Continuar"</em> para registrar sua nota.
    `;
    alertBox.classList.remove("hidden");

    if (shouldAdvanceIfValid) {
      state.activeTicketCode = found.code;
      prepareRatingFormForTicket(found);
      goToStep(3);
    }
    return true;
  }

  $("#form-validar-senha").addEventListener("submit", (e) => {
    e.preventDefault();
    validateTicketAndShowFeedback($("#input-senha-avaliacao").value, true);
  });

  $("#btn-clear-senha").addEventListener("click", () => {
    $("#input-senha-avaliacao").value = "";
    $("#ticket-validation-alert").classList.add("hidden");
    $("#input-senha-avaliacao").focus();
  });

  $("#btn-voltar-welcome").addEventListener("click", () => {
    goToStep(1);
  });

  // =========================================================================
  // ETAPA 3: FORMULÁRIO DE AVALIAÇÃO DO ATENDIMENTO (IGUAL À TelaCidadao.html)
  // =========================================================================
  function buildNpsButtons() {
    const scale = $("#nps-scale");
    scale.innerHTML = "";
    for (let i = 0; i <= 10; i++) {
      const btn = document.createElement("button");
      btn.type = "button";
      const zone = i <= 6 ? "detractor" : i <= 8 ? "passive" : "promoter";
      btn.className = `nps-btn ${zone}`;
      btn.textContent = String(i);
      btn.dataset.nps = String(i);
      btn.setAttribute("aria-label", `Nota ${i} de 10`);

      btn.addEventListener("click", () => {
        state.selectedNps = i;
        $$("#nps-scale .nps-btn").forEach((b) =>
          b.classList.toggle("selected", Number(b.dataset.nps) === i)
        );
        const zoneName =
          i >= 9
            ? "Promotor (Excelente!)"
            : i >= 7
            ? "Neutro (Satisfeito)"
            : "Detrator (Precisamos melhorar)";
        $("#nps-selected-label").textContent = `Nota selecionada: ${i}/10 • ${zoneName}`;
        updateSubmitButtonState();
      });

      scale.appendChild(btn);
    }
  }

  function prepareRatingFormForTicket(tk) {
    state.selectedNps = null;
    state.selectedStars = null;
    state.selectedTags.clear();

    $("#validated-ticket-banner").innerHTML = `
      <div>
        <small>Senha Avaliada</small>
        <strong>${tk.code}</strong>
      </div>
      <div>
        <small>Modalidade</small>
        <strong>${tk.queue}</strong>
      </div>
      <div>
        <small>Serviço Concluído</small>
        <strong>${tk.service}</strong>
      </div>
      <div>
        <small>Posto / Encerramento</small>
        <strong>${tk.desk} (${tk.closedAt})</strong>
      </div>
    `;

    buildNpsButtons();
    $("#nps-selected-label").textContent = "Toque em uma nota de 0 a 10";

    $$("#star-rating .star").forEach((s) => s.classList.remove("active"));
    $("#star-label").textContent = "Toque nas estrelas (de 1 a 5 estrelas)";

    $$("#rating-tags .chip-tag").forEach((c) => c.classList.remove("selected"));
    $("#input-comentario").value = "";
    updateSubmitButtonState();
  }

  $$("#star-rating .star").forEach((starBtn) => {
    starBtn.addEventListener("click", () => {
      const val = Number(starBtn.dataset.star);
      state.selectedStars = val;
      $$("#star-rating .star").forEach((s) => {
        s.classList.toggle("active", Number(s.dataset.star) <= val);
      });
      $("#star-label").textContent = STAR_DESCRIPTIONS[val] || `${val} estrelas`;
      updateSubmitButtonState();
    });
  });

  $$("#rating-tags .chip-tag").forEach((chip) => {
    chip.addEventListener("click", () => {
      chip.classList.toggle("selected");
      const txt = chip.textContent.trim();
      if (chip.classList.contains("selected")) {
        state.selectedTags.add(txt);
      } else {
        state.selectedTags.delete(txt);
      }
    });
  });

  function updateSubmitButtonState() {
    const canSend = state.selectedNps !== null && state.selectedStars !== null;
    $("#btn-enviar-avaliacao").disabled = !canSend;
  }

  $("#btn-trocar-senha").addEventListener("click", () => {
    goToStep(2);
  });

  // Ditado por voz opcional no campo de comentário adicional
  const btnVoiceComment = $("#btn-voice-comment");
  let isListeningComment = false;
  btnVoiceComment.addEventListener("click", () => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!isListeningComment && SpeechRec) {
      try {
        const rec = new SpeechRec();
        rec.lang = "pt-BR";
        isListeningComment = true;
        btnVoiceComment.classList.add("listening");
        $("#voice-comment-label").textContent = "Ouvindo... fale agora";
        rec.onresult = (ev) => {
          $("#input-comentario").value = ev.results[0][0].transcript;
        };
        rec.onend = () => {
          isListeningComment = false;
          btnVoiceComment.classList.remove("listening");
          $("#voice-comment-label").textContent = "Falar comentário por voz";
        };
        rec.onerror = () => {
          isListeningComment = false;
          btnVoiceComment.classList.remove("listening");
          $("#voice-comment-label").textContent = "Falar comentário por voz";
          $("#input-comentario").value =
            "Atendimento muito rápido e atendente explicou o parcelamento com muita clareza.";
        };
        rec.start();
        return;
      } catch (_) {}
    }

    $("#input-comentario").value =
      "Atendimento muito rápido e atendente explicou o parcelamento com muita clareza.";
  });

  // =========================================================================
  // ENVIO DA AVALIAÇÃO E BLOQUEIO IMEDIATO CONTRA DUPLICIDADE
  // =========================================================================
  $("#btn-enviar-avaliacao").addEventListener("click", () => {
    if (state.selectedNps === null || state.selectedStars === null) return;
    const tk = ticketsDb.find((t) => t.code === state.activeTicketCode);
    if (!tk || tk.evaluated) return;

    // Registra a avaliação vinculada à senha e bloqueia futuras avaliações para esta senha
    tk.evaluated = true;
    tk.evaluatedAt = currentHHMM();
    tk.npsScore = state.selectedNps;
    tk.starScore = state.selectedStars;

    const tagsArr = Array.from(state.selectedTags);
    const tagsSummary = tagsArr.length ? ` • Destaques: ${tagsArr.join(", ")}` : "";

    $("#thanks-summary").innerHTML = `
      Obrigado por avaliar a <strong>Senha ${tk.code}</strong> (${tk.service} • ${tk.desk})!<br/>
      Nota NPS registrada: <strong>${tk.npsScore}/10</strong> • Avaliação Geral: <strong>${tk.starScore} de 5 estrelas</strong>${tagsSummary}.
    `;

    goToStep(4);

    // Contagem regressiva automática para liberar o tablet compartilhado ao próximo cidadão
    state.autoReturnSec = 12;
    $("#auto-return-sec").textContent = String(state.autoReturnSec);
    state.autoReturnTimer = setInterval(() => {
      state.autoReturnSec -= 1;
      if (state.autoReturnSec <= 0) {
        clearInterval(state.autoReturnTimer);
        state.autoReturnTimer = null;
        goToStep(1);
      } else {
        $("#auto-return-sec").textContent = String(state.autoReturnSec);
      }
    }, 1000);
  });

  $("#btn-proximo-cidadao").addEventListener("click", () => {
    goToStep(1);
  });

  $("#btn-reset-kiosk").addEventListener("click", () => {
    goToStep(1);
  });

  // Inicialização na Etapa 1 (Tela de boas-vindas com o botão "Iniciar avaliação do atendimento presencial")
  goToStep(1);
})();
