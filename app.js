(() => {
  "use strict";

  const state = {
    currentStep: 1,
    citizen: {
      doc: "",
      matricula: "104892-3",
      name: "Cidadão(ã)",
    },
    triage: null,
    whenMode: "hoje",
    priorityType: "normal",
    selectedDate: null,
    selectedSlot: null,
    unit: "Central Rebouças — R. Engenheiros Rebouças, 1376",
    ticket: null,
    checkedIn: false,
    queue: {
      counters: [
        { guiche: "Guichê 01", ticket: "P-039", type: "Prioridade Idoso" },
        { guiche: "Guichê 02", ticket: "N-121", type: "Senha Normal" },
        { guiche: "Guichê 03", ticket: "D-015", type: "Prioridade PcD" },
        { guiche: "Guichê 04", ticket: "AG-198", type: "Agendado" },
      ],
      recentCalls: ["AG-198", "D-015", "N-121", "P-039", "N-120"],
      aheadCount: 4,
      timerId: null,
    },
    rating: {
      nps: null,
      stars: 0,
      tags: new Set(),
      comment: "",
    },
  };

  const MOCK_PROFILES = {
    "12345678900": {
      name: "Maria Clara Oliveira",
      matricula: "104892-3",
      hasOpenBill: true,
      message:
        "Olá! Identificamos uma fatura pendente com vencimento hoje (R$ 148,90). Deseja emitir a 2ª via direto por aqui ou deseja retirar senha para o atendimento presencial?",
    },
    "1048923": {
      name: "Maria Clara Oliveira",
      matricula: "104892-3",
      hasOpenBill: true,
      message:
        "Olá! Identificamos uma fatura pendente com vencimento hoje (R$ 148,90). Deseja emitir a 2ª via direto por aqui ou deseja retirar senha para o atendimento presencial?",
    },
    "45678912000134": {
      name: "Padaria Pão Quente Ltda",
      matricula: "339014-7",
      hasOpenBill: false,
      message:
        "Olá, Padaria Pão Quente Ltda! Identificamos solicitação comercial em andamento (Protocolo #2026-8841). Deseja relatar uma dúvida abaixo ou retirar senha para o atendimento presencial?",
    },
    "3390147": {
      name: "Padaria Pão Quente Ltda",
      matricula: "339014-7",
      hasOpenBill: false,
      message:
        "Olá, Padaria Pão Quente Ltda! Identificamos solicitação comercial em andamento (Protocolo #2026-8841). Deseja relatar uma dúvida abaixo ou retirar senha para o atendimento presencial?",
    },
    "98765432111": {
      name: "João Pedro Santos",
      matricula: "882310-5",
      hasOpenBill: false,
      message:
        "Olá, João Pedro! Sua matrícula 882310-5 (Boa Vista • Curitiba) está com as faturas em dia. Descreva abaixo o que precisa resolver ou retire sua senha presencial.",
    },
    "8823105": {
      name: "João Pedro Santos",
      matricula: "882310-5",
      hasOpenBill: false,
      message:
        "Olá, João Pedro! Sua matrícula 882310-5 (Boa Vista • Curitiba) está com as faturas em dia. Descreva abaixo o que precisa resolver ou retire sua senha presencial.",
    },
    "32165498722": {
      name: "Ana Paula Ferreira",
      matricula: "541209-8",
      hasOpenBill: false,
      message:
        "Olá, Ana Paula! Sua matrícula 541209-8 (Pinheirinho • Curitiba) foi localizada via conta Google e está com faturas em dia. Descreva abaixo sua solicitação ou retire sua senha presencial.",
    },
    "5412098": {
      name: "Ana Paula Ferreira",
      matricula: "541209-8",
      hasOpenBill: false,
      message:
        "Olá, Ana Paula! Sua matrícula 541209-8 (Pinheirinho • Curitiba) foi localizada via conta Google e está com faturas em dia. Descreva abaixo sua solicitação ou retire sua senha presencial.",
    },
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function onlyDigits(str) {
    return (str || "").replace(/\D/g, "");
  }

  function formatDoc(value) {
    const digits = onlyDigits(value);
    if (digits.length <= 11) {
      return digits
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1-$2")
        .slice(0, 14);
    }
    return digits
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18);
  }

  function generateQrSvg(seedText) {
    const size = 21;
    let hash = 0;
    for (let i = 0; i < seedText.length; i++) {
      hash = (hash * 31 + seedText.charCodeAt(i)) >>> 0;
    }
    const isFinder = (r, c) =>
      (r < 7 && c < 7) || (r < 7 && c >= size - 7) || (r >= size - 7 && c < 7);

    let rects = "";
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        let filled = false;
        if (isFinder(r, c)) {
          const lr = r >= size - 7 ? r - (size - 7) : r;
          const lc = c >= size - 7 ? c - (size - 7) : c;
          filled =
            lr === 0 || lr === 6 || lc === 0 || lc === 6 || (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4);
        } else {
          const v = (hash ^ (r * 73856093) ^ (c * 19349663)) >>> 0;
          filled = v % 3 !== 0;
        }
        if (filled) {
          rects += `<rect x="${c}" y="${r}" width="1" height="1" fill="#0f172a"/>`;
        }
      }
    }
    return `<svg viewBox="0 0 ${size} ${size}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><rect width="${size}" height="${size}" fill="#ffffff"/>${rects}</svg>`;
  }

  function goToStep(stepNum) {
    if (stepNum >= 2 && !state.triage) {
      renderDocumentsForCase();
    }
    if (stepNum >= 3 && !state.ticket) {
      createDefaultTicketIfNeeded();
    }
    state.currentStep = stepNum;
    $$(".step-pane").forEach((el) => el.classList.add("hidden"));
    $(`#step-${stepNum}`).classList.remove("hidden");

    $$(".step-item").forEach((btn) => {
      const s = Number(btn.dataset.step);
      btn.classList.remove("active", "done");
      if (s === stepNum) btn.classList.add("active");
      else if (s < stepNum) btn.classList.add("done");
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Navegação pelo stepper no topo
  $$(".step-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      goToStep(Number(btn.dataset.step));
    });
  });

  $$("[data-goto]").forEach((btn) => {
    btn.addEventListener("click", () => {
      goToStep(Number(btn.dataset.goto));
    });
  });

  // =========================================================================
  // ETAPA 1A: IDENTIFICAÇÃO + OPÇÕES DE LOGIN + CONSULTA EM MILISSEGUNDOS
  // =========================================================================
  const inputDoc = $("#input-doc");
  const inputMatricula = $("#input-matricula");
  const loginAuthBanner = $("#login-auth-banner");
  const loginAuthText = $("#login-auth-text");
  const presetManualGroup = $("#preset-manual-group");

  inputDoc.addEventListener("input", (e) => {
    e.target.value = formatDoc(e.target.value);
  });

  function setLoginMode(btn) {
    const mode = btn.dataset.loginMode;
    const label = btn.dataset.loginLabel || "Login";

    $$(".login-option-btn").forEach((b) => b.classList.toggle("active", b === btn));

    if (mode === "manual") {
      inputDoc.readOnly = false;
      inputMatricula.readOnly = false;
      inputDoc.value = "";
      inputMatricula.value = "";
      if (loginAuthBanner) loginAuthBanner.classList.add("hidden");
      if (presetManualGroup) presetManualGroup.classList.remove("hidden");
      $("#sgc-result-box").classList.add("hidden");
      $("#fatura-express-card").classList.add("hidden");
      inputDoc.focus();
    } else {
      const autoDoc = btn.dataset.doc || "123.456.789-00";
      const autoMat = btn.dataset.matricula || "104892-3";
      inputDoc.value = formatDoc(autoDoc);
      inputMatricula.value = autoMat;
      inputDoc.readOnly = true;
      inputMatricula.readOnly = true;

      if (presetManualGroup) presetManualGroup.classList.add("hidden");
      if (loginAuthBanner && loginAuthText) {
        const docType = onlyDigits(autoDoc).length > 11 ? "CNPJ" : "CPF";
        loginAuthText.innerHTML = `Autenticado via <strong>${label}</strong> — ${docType} <strong>${inputDoc.value}</strong> preenchido automaticamente.`;
        loginAuthBanner.classList.remove("hidden");
      }
      runFastLookup();
    }
  }

  $$(".login-option-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLoginMode(btn));
  });

  $$(".chip-preset").forEach((chip) => {
    chip.addEventListener("click", () => {
      const manualBtn = document.querySelector('.login-option-btn[data-login-mode="manual"]');
      if (manualBtn) {
        $$(".login-option-btn").forEach((b) => b.classList.toggle("active", b === manualBtn));
      }
      inputDoc.readOnly = false;
      inputMatricula.readOnly = false;
      if (loginAuthBanner) loginAuthBanner.classList.add("hidden");
      inputDoc.value = chip.dataset.doc;
      inputMatricula.value = chip.dataset.matricula;
      runFastLookup();
    });
  });

  $("#form-identificacao").addEventListener("submit", (e) => {
    e.preventDefault();
    runFastLookup();
  });

  function runFastLookup() {
    const docDigits = onlyDigits(inputDoc.value);
    const matDigits = onlyDigits(inputMatricula.value);

    if (!docDigits && !matDigits) {
      alert("Informe seu CPF, CNPJ ou Matrícula para consultar.");
      return;
    }

    const ms = Math.floor(95 + Math.random() * 65);
    const btn = $("#btn-consultar-sgc");
    btn.disabled = true;
    btn.textContent = "Consultando...";

    setTimeout(() => {
      const profile = MOCK_PROFILES[matDigits] || MOCK_PROFILES[docDigits] || {
        name: "Cliente SANEPAR",
        matricula: inputMatricula.value.trim() || "104892-3",
        hasOpenBill: true,
        message:
          "Olá! Identificamos uma fatura pendente com vencimento hoje (R$ 148,90). Deseja emitir a 2ª via direto por aqui ou deseja retirar senha para o atendimento presencial?",
      };

      state.citizen.doc = inputDoc.value.trim();
      state.citizen.matricula = profile.matricula;
      state.citizen.name = profile.name;

      $("#sgc-latency").textContent = `Consultado em ${ms} ms • Matrícula ${profile.matricula}`;
      $("#sgc-message").textContent = profile.message;

      const actionsEl = $("#sgc-shortcuts");
      actionsEl.innerHTML = "";

      if (profile.hasOpenBill) {
        const btn2via = document.createElement("button");
        btn2via.type = "button";
        btn2via.className = "btn btn-secondary btn-sm btn-block";
        btn2via.textContent = "📄 Emitir 2ª via direto por aqui";
        btn2via.addEventListener("click", () => {
          $("#inv-matricula").textContent = profile.matricula;
          $("#copy-feedback").classList.add("hidden");
          $("#fatura-express-card").classList.remove("hidden");
          $("#fatura-express-card").scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
        actionsEl.appendChild(btn2via);
      }

      const btnSenha = document.createElement("button");
      btnSenha.type = "button";
      btnSenha.className = "btn btn-primary btn-sm btn-block";
      btnSenha.textContent = "🎫 Retirar senha para o atendimento presencial";
      btnSenha.addEventListener("click", () => {
        if (!state.triage) {
          state.triage = {
            docsCaseName: "Atendimento de Fatura / Cadastro",
            docs: [
              "Documento oficial com foto (RG ou CNH) e CPF/CNPJ",
              "Número da matrícula SANEPAR ou fatura em aberto",
            ],
          };
        }
        renderDocumentsForCase();
        goToStep(2);
      });
      actionsEl.appendChild(btnSenha);

      $("#sgc-result-box").classList.remove("hidden");
      btn.disabled = false;
      btn.textContent = "Consultar Cadastro";
    }, ms);
  }

  $("#btn-close-fatura").addEventListener("click", () => {
    $("#fatura-express-card").classList.add("hidden");
  });

  $("#btn-copy-code").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText($("#inv-code").textContent);
    } catch (_) {}
    $("#copy-feedback").classList.remove("hidden");
  });

  $("#btn-confirm-fatura-resolvida").addEventListener("click", () => {
    $("#fatura-express-card").classList.add("hidden");
    goToStep(5);
  });

  // =========================================================================
  // ETAPA 1B: TRIAGEM POR TEXTO OU VOZ + REDIRECIONAMENTO
  // =========================================================================
  const inputProblema = $("#input-problema");
  const btnVoice = $("#btn-voice");
  const voiceStatus = $("#voice-status");
  let recognition = null;
  let isListening = false;

  $$(".chip-topic").forEach((chip) => {
    chip.addEventListener("click", () => {
      inputProblema.value = chip.dataset.text;
      analyzeProblem();
    });
  });

  btnVoice.addEventListener("click", () => {
    if (isListening) stopVoice(false);
    else startVoice();
  });

  $("#btn-voice-sim-stop").addEventListener("click", () => {
    stopVoice(true);
  });

  function startVoice() {
    isListening = true;
    btnVoice.classList.add("listening");
    btnVoice.setAttribute("aria-pressed", "true");
    $("#voice-label").textContent = "Ouvindo...";
    voiceStatus.classList.remove("hidden");

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      try {
        recognition = new SpeechRec();
        recognition.lang = "pt-BR";
        recognition.interimResults = true;
        recognition.onresult = (event) => {
          let txt = "";
          for (let i = 0; i < event.results.length; i++) {
            txt += event.results[i][0].transcript;
          }
          inputProblema.value = txt;
        };
        recognition.onerror = () => {
          $("#voice-status-text").textContent =
            "Toque em 'Concluir fala' para preencher transcrição de voz";
        };
        recognition.onend = () => {
          if (isListening) stopVoice(false);
        };
        recognition.start();
        return;
      } catch (_) {}
    }
    $("#voice-status-text").textContent = "Captando sua voz... toque em 'Concluir fala'";
  }

  function stopVoice(fillDemo) {
    isListening = false;
    btnVoice.classList.remove("listening");
    btnVoice.setAttribute("aria-pressed", "false");
    $("#voice-label").textContent = "Falar por voz";
    voiceStatus.classList.add("hidden");
    if (recognition) {
      try {
        recognition.stop();
      } catch (_) {}
      recognition = null;
    }
    if (fillDemo && !inputProblema.value.trim()) {
      inputProblema.value =
        "Preciso fazer a troca de titularidade da conta de água para o meu nome.";
      analyzeProblem();
    }
  }

  $("#btn-analisar-problema").addEventListener("click", analyzeProblem);

  function classifyProblem(text) {
    const t = text.toLowerCase();

    // Casos que NÃO podem ser resolvidos pela SANEPAR (outra instituição)
    if (/(bueiro|boca de lobo|chuva|alagamento|drenagem|asfalto|buraco|lixo|coleta|iluminação|árvore)/i.test(t)) {
      return {
        tagClass: "tag-amber",
        tagText: "Outra Instituição • Não atendido pela SANEPAR",
        title: "Este problema deve ser reportado à Prefeitura de Curitiba (Central 156)",
        bodyHtml:
          "<p>Esclarecemos que drenagem de água da chuva (bueiros/bocas de lobo), buracos no asfalto, coleta de lixo e iluminação pública <strong>não podem ser resolvidos pela SANEPAR</strong>, pois são de competência da Prefeitura Municipal de Curitiba.</p><p>A SANEPAR atua exclusivamente nas redes de água tratada e esgoto sanitário.</p>",
        externalHtml:
          "<strong>Busque a instituição responsável:</strong><br/>• Prefeitura de Curitiba — Disque <strong>156</strong> ou App Curitiba 156",
        docsCaseName: "Verificação de Rede SANEPAR",
        docs: [
          "Documento oficial com foto (RG ou CNH) e CPF",
          "Endereço completo e fotos do local, caso suspeite de vazamento da rede de água/esgoto",
        ],
      };
    }

    if (/(luz|energia|copel|poste|fio elétrico|apagão)/i.test(t)) {
      return {
        tagClass: "tag-amber",
        tagText: "Outra Instituição • Não atendido pela SANEPAR",
        title: "Este problema deve ser resolvido junto à COPEL",
        bodyHtml:
          "<p>Esclarecemos que serviços de energia elétrica, faturas de luz e manutenção de postes <strong>não são atendidos pela SANEPAR</strong>. Você deverá buscar a concessionária de energia elétrica.</p>",
        externalHtml:
          "<strong>Busque a instituição responsável:</strong><br/>• COPEL — Telefone <strong>0800 51 00 116</strong> ou site <em>copel.com</em>",
        docsCaseName: "Esclarecimento Presencial",
        docs: ["Documento oficial com foto (RG ou CNH) e CPF"],
      };
    }

    // Casos SANEPAR com lista específica de documentos
    if (/(titularidade|nome|inquilino|locação|proprietário)/i.test(t)) {
      return {
        tagClass: "tag-blue",
        tagText: "SANEPAR • Exige Documentação",
        title: "Como funciona a Troca de Titularidade",
        bodyHtml:
          "<p>A transferência da conta para o seu nome requer comprovação de posse ou locação do imóvel em Curitiba e ausência de débitos pendentes em nome do solicitante.</p>",
        externalHtml: "",
        docsCaseName: "Troca de Titularidade",
        docs: [
          "RG e CPF (ou CNPJ e Contrato Social para empresas)",
          "Contrato de locação vigente ou Escritura / Matrícula do Registro de Imóveis",
          "Número da matrícula SANEPAR e leitura atual do hidrômetro",
        ],
      };
    }

    if (/(parcelar|parcelamento|dívida|atraso|atrasada|negociar|débito)/i.test(t)) {
      return {
        tagClass: "tag-blue",
        tagText: "SANEPAR • Negociação",
        title: "Parcelamento de Débitos na SANEPAR",
        bodyHtml:
          "<p>Você pode parcelar faturas vencidas diretamente com entrada reduzida e cobrança das parcelas nas próximas contas mensais.</p>",
        externalHtml: "",
        docsCaseName: "Parcelamento de Débitos",
        docs: [
          "Documento oficial com foto (RG ou CNH) e CPF do titular",
          "Documento de vínculo com o imóvel (ou procuração, se não for o titular)",
          "Faturas em aberto ou número da matrícula SANEPAR",
        ],
      };
    }

    if (/(tarifa social|água solidária|baixa renda|cadúnico|cadunico|nis)/i.test(t)) {
      return {
        tagClass: "tag-teal",
        tagText: "SANEPAR • Benefício Social",
        title: "Programa Água Solidária (Tarifa Social)",
        bodyHtml:
          "<p>Famílias inscritas no Cadastro Único (CadÚnico) com renda familiar dentro dos critérios têm desconto na tarifa mensal de água e esgoto.</p>",
        externalHtml: "",
        docsCaseName: "Cadastro Tarifa Social",
        docs: [
          "RG e CPF do responsável familiar",
          "Comprovante atualizado do CadÚnico com número do NIS",
          "Conta recente da SANEPAR do imóvel residencial",
        ],
      };
    }

    return {
      tagClass: "tag-green",
      tagText: "SANEPAR • Esclarecimento",
      title: "Orientação sobre sua solicitação",
      bodyHtml:
        "<p>Serviços como religação de água, segunda via e aviso de falta de água ou vazamento também estão disponíveis 24h pelo <strong>0800 200 0115</strong>. Se preferir ser atendido presencialmente, confira os documentos no próximo passo.</p>",
      externalHtml: "",
      docsCaseName: "Atendimento Presencial SANEPAR",
      docs: [
        "Documento oficial com foto (RG ou CNH) e CPF/CNPJ",
        "Número da matrícula SANEPAR (presente na fatura)",
        "Comprovante de pagamento ou documento complementar do imóvel, se aplicável",
      ],
    };
  }

  function analyzeProblem() {
    const text = inputProblema.value.trim();
    if (!text) {
      alert("Por favor, digite ou fale o que você precisa resolver.");
      return;
    }

    const res = classifyProblem(text);
    state.triage = res;

    const pill = $("#triage-status-pill");
    pill.className = `tag ${res.tagClass}`;
    pill.textContent = res.tagText;

    $("#triage-title").textContent = res.title;
    $("#triage-body").innerHTML = res.bodyHtml;

    const ext = $("#triage-external-box");
    if (res.externalHtml) {
      ext.innerHTML = res.externalHtml;
      ext.classList.remove("hidden");
    } else {
      ext.classList.add("hidden");
    }

    $("#resolved-card").classList.add("hidden");
    $("#triage-result-card").classList.remove("hidden");
    $("#triage-result-card").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  $("#btn-nao-presencial").addEventListener("click", () => {
    $("#triage-result-card").classList.add("hidden");
    $("#resolved-card").classList.remove("hidden");
    $("#resolved-card").scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  $("#btn-avaliar-digital").addEventListener("click", () => {
    goToStep(5);
  });

  $("#btn-sim-presencial").addEventListener("click", () => {
    renderDocumentsForCase();
    goToStep(2);
  });

  // =========================================================================
  // ETAPA 2: DOCUMENTOS + TEMPOS DA UNIDADE + IR HOJE OU AGENDAR
  // =========================================================================
  const UNIT_METRICS = {
    "Central Rebouças — R. Engenheiros Rebouças, 1376": {
      shortName: "Central Rebouças (Centro)",
      tmeSec: 520, // 08m 40s
      tmaSec: 435, // 07m 15s
    },
    "Rua da Cidadania Pinheirinho — Av. Winston Churchill, 2033": {
      shortName: "Rua da Cidadania Pinheirinho",
      tmeSec: 680, // 11m 20s
      tmaSec: 470, // 07m 50s
    },
    "Rua da Cidadania Boa Vista — Av. Paraná, 3600": {
      shortName: "Rua da Cidadania Boa Vista",
      tmeSec: 375, // 06m 15s
      tmaSec: 390, // 06m 30s
    },
    "Rua da Cidadania Fazendinha — R. Carlos Klemtz, 1700": {
      shortName: "Rua da Cidadania Fazendinha",
      tmeSec: 465, // 07m 45s
      tmaSec: 415, // 06m 55s
    },
  };

  function formatSecondsToMinSec(sec) {
    const s = Math.max(60, Math.round(sec));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}m ${String(r).padStart(2, "0")}s`;
  }

  function currentHHMMSS() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  }

  function getSelectedUnitMetrics(unitKey) {
    const key = unitKey || ($("#select-unidade") ? $("#select-unidade").value : state.unit);
    return (
      UNIT_METRICS[key] ||
      UNIT_METRICS["Central Rebouças — R. Engenheiros Rebouças, 1376"]
    );
  }

  function renderUnitMetrics(highlightFlash = false) {
    const selVal = $("#select-unidade") ? $("#select-unidade").value : state.unit;
    state.unit = selVal;
    const m = getSelectedUnitMetrics(selVal);

    // 1) Atualiza os indicadores abaixo do campo "Unidade SANEPAR em Curitiba" (Etapa 2)
    const step2Box = $("#step2-unit-metrics-box");
    if (step2Box) {
      $("#step2-unit-name-lbl").textContent = `Tempos médios agora • ${m.shortName}`;
      $("#step2-unit-tme").textContent = formatSecondsToMinSec(m.tmeSec);
      $("#step2-unit-tma").textContent = formatSecondsToMinSec(m.tmaSec);
      if (highlightFlash) {
        step2Box.classList.add("metric-flash");
        setTimeout(() => step2Box.classList.remove("metric-flash"), 700);
      }
    }

    // 2) Atualiza os indicadores abaixo de "Últimas senhas chamadas:" (Etapa 3 — Senha para Hoje)
    const step3Box = $("#step3-live-times-box");
    if (step3Box) {
      const ticketUnitKey = state.ticket ? state.ticket.unit : selVal;
      const tm = getSelectedUnitMetrics(ticketUnitKey);
      const isTodayTicket = !state.ticket || state.ticket.mode === "hoje";

      step3Box.classList.toggle("hidden", !isTodayTicket);
      $("#step3-times-unit-lbl").textContent = `Indicadores do dia • ${tm.shortName}`;
      $("#step3-live-tme").textContent = formatSecondsToMinSec(tm.tmeSec);
      $("#step3-live-tma").textContent = formatSecondsToMinSec(tm.tmaSec);
      $("#step3-times-updated-at").textContent = `Atualizado às ${currentHHMMSS()}`;

      if (highlightFlash) {
        step3Box.classList.add("metric-flash");
        setTimeout(() => step3Box.classList.remove("metric-flash"), 700);
      }
    }
  }

  // Ao trocar a unidade no campo "Unidade SANEPAR em Curitiba", atualiza imediatamente TME e TMA
  $("#select-unidade").addEventListener("change", (e) => {
    state.unit = e.target.value;
    if (state.ticket) {
      state.ticket.unit = state.unit;
      $("#ticket-unit").textContent = state.unit.split("—")[0].trim();
      $("#scanner-unit-label").textContent = `Totem Entrada • ${state.unit.split("—")[0].trim()}`;
    }
    renderUnitMetrics(true);
  });

  // Simulação contínua em tempo real dos indicadores do dia (TME e TMA) enquanto o usuário aguarda atendimento
  setInterval(() => {
    Object.keys(UNIT_METRICS).forEach((k) => {
      const u = UNIT_METRICS[k];
      const deltaTme = Math.floor(Math.random() * 15) - 7; // oscila entre -7s e +7s
      const deltaTma = Math.floor(Math.random() * 11) - 5; // oscila entre -5s e +5s
      u.tmeSec = Math.max(240, Math.min(840, u.tmeSec + deltaTme));
      u.tmaSec = Math.max(300, Math.min(620, u.tmaSec + deltaTma));
    });
    renderUnitMetrics(state.currentStep === 3);
  }, 5000);

  function renderDocumentsForCase() {
    const info = state.triage || {
      docsCaseName: "Atendimento Geral SANEPAR",
      docs: [
        "Documento oficial com foto (RG ou CNH) e CPF/CNPJ",
        "Número da matrícula SANEPAR ou conta de água recente",
      ],
    };

    $("#docs-case-tag").textContent = info.docsCaseName;
    const ul = $("#docs-list");
    ul.innerHTML = "";
    info.docs.forEach((doc) => {
      const li = document.createElement("li");
      li.innerHTML = `<label><input type="checkbox" checked /> <span>${doc}</span></label>`;
      ul.appendChild(li);
    });
    renderUnitMetrics(false);
  }

  $("#btn-ir-hoje").addEventListener("click", () => {
    state.whenMode = "hoje";
    $("#btn-ir-hoje").classList.add("selected");
    $("#btn-agendar-outro-dia").classList.remove("selected");
    $("#subflow-hoje").classList.remove("hidden");
    $("#subflow-agendar").classList.add("hidden");
  });

  $("#btn-agendar-outro-dia").addEventListener("click", () => {
    state.whenMode = "agendar";
    $("#btn-agendar-outro-dia").classList.add("selected");
    $("#btn-ir-hoje").classList.remove("selected");
    $("#subflow-agendar").classList.remove("hidden");
    $("#subflow-hoje").classList.add("hidden");
    renderDemandCalendar();
  });

  $("#btn-gerar-senha-hoje").addEventListener("click", () => {
    const checked = document.querySelector('input[name="priority-type"]:checked');
    state.priorityType = checked ? checked.value : "normal";
    state.unit = $("#select-unidade").value;

    const map = {
      normal: { code: "N-127", label: "Senha Normal (Convencional)", ahead: 4 },
      idosa: { code: "P-042", label: "Prioridade — Pessoa Idosa (60+)", ahead: 2 },
      pcd: { code: "D-018", label: "Prioridade — Pessoa com Deficiência (PcD/TEA)", ahead: 1 },
      gestante: { code: "G-011", label: "Prioridade — Gestante / Lactante / Colo", ahead: 1 },
    };

    const chosen = map[state.priorityType];
    state.queue.aheadCount = chosen.ahead;
    state.ticket = {
      code: chosen.code,
      categoryLabel: chosen.label,
      mode: "hoje",
      datetime: "Hoje • Fila Digital",
      unit: state.unit,
      subject: state.triage ? state.triage.docsCaseName : "Atendimento SANEPAR",
    };

    populateTicketStep();
    goToStep(3);
  });

  function renderDemandCalendar() {
    const grid = $("#calendar-days");
    grid.innerHTML = "";
    $("#time-slots-container").classList.add("hidden");
    $("#btn-confirmar-agendamento").disabled = true;

    const baseDate = new Date(2026, 10, 16); // 16/11/2026
    const weekNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const items = [];

    for (let offset = 1; items.length < 15; offset++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + offset);
      const dow = d.getDay();
      if (dow === 0 || dow === 6) continue;

      const dayNum = d.getDate();
      let level = "low";
      let label = "Baixa procura";
      // Suavização: bloqueia os primeiros dias do mês (1 a 5), onde há pico histórico sem agendamento
      if (dayNum >= 1 && dayNum <= 5) {
        level = "high";
        label = "Pico início mês";
      } else if (dow === 1 || dayNum === 20) {
        level = "med";
        label = "Moderada";
      }
      items.push({ date: d, dow, dayNum, level, label });
    }

    items.forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `day-card ${item.level}`;
      const dd = String(item.dayNum).padStart(2, "0");
      const mm = String(item.date.getMonth() + 1).padStart(2, "0");
      const dateStr = `${dd}/${mm}`;

      btn.innerHTML = `
        <span>${weekNames[item.dow]}</span>
        <strong>${dateStr}</strong>
        <span class="demand-tag">${item.label}</span>
      `;

      if (item.level === "high") {
        btn.disabled = true;
      } else {
        btn.addEventListener("click", () => {
          $$(".day-card").forEach((c) => c.classList.remove("selected"));
          btn.classList.add("selected");
          state.selectedDate = `${weekNames[item.dow]}, ${dateStr}/2026`;
          renderSlots(item.level);
        });
      }
      grid.appendChild(btn);
    });
  }

  function renderSlots(level) {
    $("#selected-date-label").textContent = state.selectedDate;
    const slotsEl = $("#time-slots");
    slotsEl.innerHTML = "";
    $("#btn-confirmar-agendamento").disabled = true;

    const times =
      level === "low"
        ? ["09:00", "10:00", "11:00", "13:30", "14:30", "15:45"]
        : ["10:30", "14:15", "15:45"];

    times.forEach((t) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "slot-btn";
      b.textContent = t;
      b.addEventListener("click", () => {
        $$(".slot-btn").forEach((s) => s.classList.remove("selected"));
        b.classList.add("selected");
        state.selectedSlot = t;
        $("#btn-confirmar-agendamento").disabled = false;
      });
      slotsEl.appendChild(b);
    });

    $("#time-slots-container").classList.remove("hidden");
  }

  $("#btn-confirmar-agendamento").addEventListener("click", () => {
    state.unit = $("#select-unidade").value;
    state.queue.aheadCount = 1;
    state.ticket = {
      code: "AG-204",
      categoryLabel: "Senha de Atendimento Agendado",
      mode: "agendar",
      datetime: `${state.selectedDate} às ${state.selectedSlot}`,
      unit: state.unit,
      subject: state.triage ? state.triage.docsCaseName : "Atendimento SANEPAR",
    };

    populateTicketStep();
    goToStep(3);
  });

  // =========================================================================
  // ETAPA 3: SENHA & FILA DIGITAL EM TEMPO REAL
  // =========================================================================
  function createDefaultTicketIfNeeded() {
    state.ticket = {
      code: "N-127",
      categoryLabel: "Senha Normal (Convencional)",
      mode: "hoje",
      datetime: "Hoje • Fila Digital",
      unit: state.unit,
      subject: state.triage ? state.triage.docsCaseName : "Atendimento Geral SANEPAR",
    };
    populateTicketStep();
  }

  function populateTicketStep() {
    const tk = state.ticket;
    $("#ticket-code").textContent = tk.code;
    $("#ticket-category-label").textContent = tk.categoryLabel;
    $("#ticket-unit").textContent = tk.unit.split("—")[0].trim();
    $("#ticket-datetime").textContent = tk.datetime;
    $("#ticket-subject").textContent = tk.subject;
    $("#ticket-mode-badge").textContent =
      tk.mode === "hoje" ? "Senha Digital • Hoje" : "Senha Agendada";

    $("#ticket-qr-svg").innerHTML = generateQrSvg(`${tk.code}-${state.citizen.matricula}`);
    $("#totem-qr-preview").innerHTML = generateQrSvg(`TOTEM-${tk.unit}`);
    $("#scanner-unit-label").textContent = `Totem Entrada • ${tk.unit.split("—")[0].trim()}`;

    const printSimBox = $("#ticket-print-simulation");
    if (printSimBox) printSimBox.classList.add("hidden");

    updateLeaveHomeGuidance();
    renderLiveQueue();
    renderUnitMetrics(false);
    startQueueTimer();
  }

  // Simulação de impressão da senha gerada
  function simulateTicketPrint() {
    if (!state.ticket) createDefaultTicketIfNeeded();
    const tk = state.ticket;
    const printBox = $("#ticket-print-simulation");
    const statusBar = $("#print-sim-status-bar");
    const statusText = $("#print-sim-status-text");
    if (!printBox) return;

    $("#print-ticket-code").textContent = tk.code;
    $("#print-ticket-category").textContent = tk.categoryLabel;
    $("#print-ticket-citizen").textContent = state.citizen.name || "Cidadão(ã)";
    $("#print-ticket-doc").textContent = state.citizen.doc || inputDoc.value.trim() || "Não informado";
    $("#print-ticket-matricula").textContent = state.citizen.matricula || inputMatricula.value.trim() || "104892-3";
    $("#print-ticket-unit").textContent = tk.unit.split("—")[0].trim();
    $("#print-ticket-datetime").textContent = tk.datetime;
    $("#print-ticket-subject").textContent = tk.subject;
    $("#print-ticket-timestamp").textContent = `${new Date().toLocaleDateString("pt-BR")} às ${currentHHMMSS()}`;
    $("#print-ticket-qr").innerHTML = generateQrSvg(`PRINT-${tk.code}-${state.citizen.matricula}`);

    printBox.classList.remove("hidden");
    statusBar.classList.add("printing");
    statusText.textContent = `🖨️ Imprimindo comprovante da senha ${tk.code}... aguarde`;
    printBox.scrollIntoView({ behavior: "smooth", block: "nearest" });

    setTimeout(() => {
      statusBar.classList.remove("printing");
      statusText.textContent = `✓ Senha ${tk.code} impressa com sucesso! Retire seu comprovante.`;
    }, 850);

    syncPrintOnlyMount();
  }

  function syncPrintOnlyMount() {
    const mount = $("#print-only-mount");
    const simBox = $("#ticket-print-simulation");
    if (!mount || !simBox) return;
    const paper = simBox.querySelector(".thermal-ticket-paper");
    if (paper) {
      mount.innerHTML = "";
      mount.appendChild(paper.cloneNode(true));
    }
  }

  function printOnlyThermalTicket() {
    syncPrintOnlyMount();
    window.print();
  }

  const btnImprimirSenha = $("#btn-imprimir-senha");
  if (btnImprimirSenha) {
    btnImprimirSenha.addEventListener("click", simulateTicketPrint);
  }

  const btnBrowserPrint = $("#btn-browser-print");
  if (btnBrowserPrint) {
    btnBrowserPrint.addEventListener("click", printOnlyThermalTicket);
  }

  const btnClosePrintSim = $("#btn-close-print-sim");
  if (btnClosePrintSim) {
    btnClosePrintSim.addEventListener("click", () => {
      $("#ticket-print-simulation").classList.add("hidden");
    });
  }

  function updateLeaveHomeGuidance() {
    const ahead = state.queue.aheadCount;
    const mins = Math.max(3, ahead * 4);
    const title = $("#leave-home-title");
    const desc = $("#leave-home-desc");

    if (state.ticket && state.ticket.mode === "agendar") {
      title.textContent = "Horário reservado com sucesso";
      desc.textContent = `Programe-se para sair de casa e chegar 10 min antes (${state.ticket.datetime}).`;
      return;
    }

    if (ahead > 2) {
      title.textContent = "Organize sua saída de casa";
      desc.textContent = `Há ${ahead} senhas na sua frente (previsão ~${mins} min). Saia no momento ideal para não esperar na fila física.`;
    } else if (ahead > 0) {
      title.textContent = "Sua vez está próxima!";
      desc.textContent = `Faltam apenas ${ahead} senha(s) (~${mins} min). Dirija-se à unidade e faça o check-in no QR Code da entrada.`;
    } else {
      title.textContent = "Dirija-se à entrada para o Check-in";
      desc.textContent = "Sua senha será a próxima a ser chamada assim que você confirmar presença.";
    }
  }

  function renderLiveQueue() {
    const grid = $("#live-counters");
    grid.innerHTML = "";
    state.queue.counters.forEach((c) => {
      const div = document.createElement("div");
      div.className = "counter-tile" + (c.ticket === state.ticket?.code ? " highlight" : "");
      div.innerHTML = `
        <small>${c.guiche}</small>
        <strong>${c.ticket}</strong>
        <span>${c.type}</span>
      `;
      grid.appendChild(div);
    });

    const hist = $("#recent-calls-list");
    hist.innerHTML = "";
    state.queue.recentCalls.slice(0, 5).forEach((code) => {
      const span = document.createElement("span");
      span.className = "recent-chip";
      span.textContent = code;
      hist.appendChild(span);
    });
  }

  function advanceQueue() {
    if (!state.ticket) createDefaultTicketIfNeeded();
    const idx = Math.floor(Math.random() * state.queue.counters.length);
    const c = state.queue.counters[idx];
    const [prefix, numStr] = c.ticket.split("-");
    const nextCode = `${prefix}-${String(Number(numStr) + 1).padStart(3, "0")}`;
    c.ticket = nextCode;
    state.queue.recentCalls.unshift(nextCode);

    if (state.queue.aheadCount > 0) state.queue.aheadCount -= 1;

    // Atualiza ligeiramente o TME e TMA da unidade quando a fila avança
    const uMetrics = getSelectedUnitMetrics(state.ticket ? state.ticket.unit : state.unit);
    uMetrics.tmeSec = Math.max(240, uMetrics.tmeSec - 6);
    uMetrics.tmaSec = Math.max(300, uMetrics.tmaSec + (Math.random() > 0.5 ? 4 : -4));

    updateLeaveHomeGuidance();
    renderLiveQueue();
    renderUnitMetrics(true);
  }

  function startQueueTimer() {
    if (state.queue.timerId) clearInterval(state.queue.timerId);
    state.queue.timerId = setInterval(() => {
      if (state.currentStep === 3 && state.queue.aheadCount > 1) {
        advanceQueue();
      }
    }, 8000);
  }

  $("#btn-simular-avanco").addEventListener("click", advanceQueue);
  $("#btn-ir-checkin").addEventListener("click", () => goToStep(4));

  // =========================================================================
  // ETAPA 4: CHECK-IN VIA QR CODE NA ENTRADA
  // =========================================================================
  $("#btn-scan-qr").addEventListener("click", () => {
    if (!state.ticket) createDefaultTicketIfNeeded();
    state.checkedIn = true;
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");

    $("#scanner-box").classList.add("hidden");
    $("#checkin-done-box").classList.remove("hidden");
    $("#checkin-time").textContent = `${hh}:${mm}`;

    const pill = $("#ticket-status-pill");
    pill.className = "tag tag-green";
    pill.textContent = "Check-in realizado";

    $("#guiche-call-text").textContent = `Presença confirmada! Senha ${state.ticket.code} aguardando chamada...`;
  });

  $("#btn-simular-chamada-guiche").addEventListener("click", () => {
    if (!state.ticket) createDefaultTicketIfNeeded();
    state.queue.counters[0].ticket = state.ticket.code;
    state.queue.counters[0].type = "Sua senha!";
    state.queue.recentCalls.unshift(state.ticket.code);
    renderLiveQueue();

    $("#guiche-call-text").textContent = `📣 Senha ${state.ticket.code} chamada agora no Guichê 01!`;
    $("#guiche-call-status").style.background = "#ecfdf5";
    $("#guiche-call-status").style.borderColor = "#a7f3d0";
    $("#guiche-call-status").style.color = "#065f46";
  });

  $("#btn-concluir-para-avaliar").addEventListener("click", () => goToStep(5));

  // =========================================================================
  // ETAPA 5: AVALIAÇÃO + NPS (0 A 10)
  // =========================================================================
  function buildNps() {
    const container = $("#nps-scale");
    container.innerHTML = "";
    for (let i = 0; i <= 10; i++) {
      const btn = document.createElement("button");
      btn.type = "button";
      const group = i <= 6 ? "detractor" : i <= 8 ? "passive" : "promoter";
      btn.className = `nps-btn ${group}`;
      btn.textContent = i;
      btn.addEventListener("click", () => {
        $$(".nps-btn").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        state.rating.nps = i;
        const zone = i <= 6 ? "Detrator" : i <= 8 ? "Neutro" : "Promotor";
        $("#nps-selected-label").textContent = `Nota ${i} (${zone})`;
        checkRatingReady();
      });
      container.appendChild(btn);
    }
  }

  $$(".star").forEach((btn) => {
    btn.addEventListener("click", () => {
      const val = Number(btn.dataset.star);
      state.rating.stars = val;
      $$(".star").forEach((s) => s.classList.toggle("active", Number(s.dataset.star) <= val));
      const names = ["", "Muito insatisfeito", "Insatisfeito", "Regular", "Satisfeito", "Muito satisfeito"];
      $("#star-label").textContent = `${val} de 5 estrelas • ${names[val]}`;
      checkRatingReady();
    });
  });

  $$(".chip-tag").forEach((chip) => {
    chip.addEventListener("click", () => {
      chip.classList.toggle("selected");
      const label = chip.textContent;
      if (state.rating.tags.has(label)) state.rating.tags.delete(label);
      else state.rating.tags.add(label);
    });
  });

  function checkRatingReady() {
    $("#btn-enviar-avaliacao").disabled = !(state.rating.nps !== null && state.rating.stars > 0);
  }

  $("#btn-enviar-avaliacao").addEventListener("click", () => {
    $("#rating-form-card").classList.add("hidden");
    $("#rating-thanks-card").classList.remove("hidden");
    $("#thanks-icon").textContent = "★";
    $("#thanks-title").textContent = "Avaliação registrada com sucesso!";
    const tags = Array.from(state.rating.tags);
    const extra = tags.length ? ` • Destaques: ${tags.join(", ")}` : "";
    $("#thanks-summary").textContent = `Nota NPS: ${state.rating.nps}/10 • Avaliação Geral: ${state.rating.stars}/5 estrelas${extra}. Obrigado!`;
  });

  $("#btn-encerrar-sem-avaliar").addEventListener("click", () => {
    $("#rating-form-card").classList.add("hidden");
    $("#rating-thanks-card").classList.remove("hidden");
    $("#thanks-icon").textContent = "✓";
    $("#thanks-title").textContent = "Atendimento encerrado com sucesso!";
    const ticketInfo = state.ticket ? ` (Senha ${state.ticket.code})` : "";
    $("#thanks-summary").textContent = `O encerramento do seu atendimento${ticketInfo} foi confirmado sem realização de avaliação, conforme sua opção. Obrigado por utilizar os serviços da SANEPAR!`;
  });

  function resetAll() {
    if (state.queue.timerId) clearInterval(state.queue.timerId);
    state.triage = null;
    state.ticket = null;
    state.checkedIn = false;
    state.rating = { nps: null, stars: 0, tags: new Set(), comment: "" };

    inputDoc.readOnly = false;
    inputMatricula.readOnly = false;
    inputDoc.value = "";
    inputMatricula.value = "";
    inputProblema.value = "";
    $("#input-comentario").value = "";
    if (loginAuthBanner) loginAuthBanner.classList.add("hidden");
    if (presetManualGroup) presetManualGroup.classList.remove("hidden");
    $$(".login-option-btn").forEach((b) =>
      b.classList.toggle("active", b.dataset.loginMode === "manual")
    );
    const printSimBox = $("#ticket-print-simulation");
    if (printSimBox) printSimBox.classList.add("hidden");
    $("#sgc-result-box").classList.add("hidden");
    $("#fatura-express-card").classList.add("hidden");
    $("#triage-result-card").classList.add("hidden");
    $("#resolved-card").classList.add("hidden");
    $("#subflow-hoje").classList.add("hidden");
    $("#subflow-agendar").classList.add("hidden");
    $("#btn-ir-hoje").classList.remove("selected");
    $("#btn-agendar-outro-dia").classList.remove("selected");
    $("#scanner-box").classList.remove("hidden");
    $("#checkin-done-box").classList.add("hidden");
    $("#rating-form-card").classList.remove("hidden");
    $("#rating-thanks-card").classList.add("hidden");
    $("#nps-selected-label").textContent = "";
    $("#star-label").textContent = "Selecione de 1 a 5 estrelas";
    $("#btn-enviar-avaliacao").disabled = true;
    $("#guiche-call-status").removeAttribute("style");
    $$(".star").forEach((s) => s.classList.remove("active"));
    $$(".chip-tag").forEach((c) => c.classList.remove("selected"));
    buildNps();
    goToStep(1);
  }

  $("#btn-reset").addEventListener("click", resetAll);
  $("#btn-novo-atendimento").addEventListener("click", resetAll);

  buildNps();
  renderUnitMetrics(false);
})();
