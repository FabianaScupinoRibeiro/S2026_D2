(() => {
  "use strict";

  const CURRENT_ATTENDANT = "Ana Paula Ribeiro (Guichê 02)";

  const initialDayTickets = () => [
    {
      code: "P-041",
      filterType: "preferencial",
      typeLabel: "Preferencial • Pessoa Idosa (60+)",
      tagClass: "tag-teal",
      name: "Sr. Antônio Carlos Ferreira",
      demandCategory: "Contestação de Consumo / Hidrômetro",
      demandText:
        "A conta deste mês veio quase o dobro do normal após uma manutenção na rua e quero revisão da fatura.",
      docsCheckedByReception: [
        "RG e CPF do titular (Antônio Carlos Ferreira)",
        "Fatura contestada e histórico de consumo",
        "Foto da leitura atual do hidrômetro (conferida na recepção)",
      ],
      context: {
        titular: "Antônio Carlos Ferreira",
        matriculaCat: "118920-4 • Residencial",
        statusLigacao: "Ativa",
        statusTagClass: "tag-green",
        financeiro: "1 fatura vencida (R$ 84,50)",
        financeiroClass: "text-amber",
        ocorrencias: "Solicitação de verificação de hidrômetro em 10/11",
      },
      aqualinoTip:
        "Verifique no histórico a leitura informada na vistoria de 10/11. Se houve pico atípico acima de 50% da média dos últimos 6 meses, você pode emitir a retificação pela média agora mesmo e suspender a cobrança da fatura de R$ 84,50!",
      suggestedAudioTranscript:
        "Conferimos o laudo da verificação do hidrômetro de 10/11 e identificamos leitura acumulada atípica. Realizamos a revisão da fatura pela média dos últimos 6 meses e emitimos nova guia atualizada sem juros para pagamento.",
      previousAttendants: [],
      previousNotes: "",
    },
    {
      code: "AG-205",
      filterType: "transferida",
      typeLabel: "Agendado • Transferida p/ Conclusão",
      tagClass: "tag-blue",
      name: "Marcos Vinícius Rocha",
      demandCategory: "Parcelamento Especial + Troca de Titularidade",
      demandText:
        "Preciso concluir o parcelamento de 4 faturas em atraso e já atualizar a titularidade mediante procuração.",
      docsCheckedByReception: [
        "RG e CPF do solicitante e do titular",
        "Procuração assinada (validada pela recepção)",
        "Faturas vencidas da matrícula 774120-2",
      ],
      context: {
        titular: "Benedito Rocha (Representado por Marcos V. Rocha)",
        matriculaCat: "774120-2 • Residencial",
        statusLigacao: "Em Religação",
        statusTagClass: "tag-amber",
        financeiro: "4 faturas vencidas (Total R$ 412,30)",
        financeiroClass: "text-amber",
        ocorrencias: "Pedido de religação e negociação iniciado hoje às 16:05",
      },
      aqualinoTip:
        "Esta senha foi iniciada por Marcos Oliveira (Guichê 03) e transferida para você concluir a alteração cadastral! Como você será o último atendente, ao encerrar você fará o checkout do cidadão e vocês dois ganharão pontos pela satisfação dele!",
      suggestedAudioTranscript:
        "Dando continuidade ao atendimento iniciado no Guichê 03, formalizamos o termo de parcelamento em 10 vezes com entrada quitada via PIX, concluímos a atualização cadastral e confirmamos a ordem de religação prioritária.",
      previousAttendants: ["Marcos Oliveira (Guichê 03)"],
      previousNotes:
        "Guichê 03 (Marcos Oliveira): Simulação de parcelamento aprovada com entrada de 15%. Transferido ao Guichê 02 para averbação da procuração e encerramento/checkout.",
    },
    {
      code: "N-125",
      filterType: "normal",
      typeLabel: "Senha Normal (Do Dia)",
      tagClass: "tag-blue",
      name: "Luciana Mendes",
      demandCategory: "Religação após Corte",
      demandText:
        "Quitei os débitos pendentes ontem e preciso solicitar a religação de água de urgência no imóvel.",
      docsCheckedByReception: [
        "Documento oficial com foto (CNH) e CPF",
        "Comprovantes bancários de quitação das faturas",
      ],
      context: {
        titular: "Luciana Mendes",
        matriculaCat: "512098-6 • Residencial",
        statusLigacao: "Cortada",
        statusTagClass: "tag-red",
        financeiro: "Baixa bancária em processamento (R$ 196,00 pagos)",
        financeiroClass: "text-green",
        ocorrencias: "Suspensão de fornecimento por inadimplência em 12/11",
      },
      aqualinoTip:
        "Com o comprovante de pagamento conferido pela recepção, dê baixa manual imediata na fatura de R$ 196,00 e gere a Ordem de Serviço de Religação (prazo regulamentar de até 24h em Curitiba).",
      suggestedAudioTranscript:
        "Confirmamos os comprovantes de quitação, efetuamos a baixa manual no sistema comercial e abrimos a Ordem de Serviço de religação de água nº 2026-99412 com execução em até 24 horas.",
      previousAttendants: [],
      previousNotes: "",
    },
    {
      code: "D-019",
      filterType: "preferencial",
      typeLabel: "Preferencial • PcD / TEA",
      tagClass: "tag-teal",
      name: "Fernanda Azevedo",
      demandCategory: "Cadastro Tarifa Social (Água Solidária)",
      demandText:
        "Solicitação de inclusão no benefício Água Solidária apresentando folha resumo do CadÚnico.",
      docsCheckedByReception: [
        "RG e CPF da titular",
        "Folha Resumo do CadÚnico ativa com NIS",
        "Fatura recente da SANEPAR",
      ],
      context: {
        titular: "Fernanda Azevedo",
        matriculaCat: "663019-9 • Residencial",
        statusLigacao: "Ativa",
        statusTagClass: "tag-green",
        financeiro: "Faturas em dia",
        financeiroClass: "text-green",
        ocorrencias: "Pré-conferência documental aprovada na recepção hoje",
      },
      aqualinoTip:
        "O NIS já foi validado na recepção! Basta vincular o código do benefício Água Solidária à matrícula 663019-9; o desconto já valerá para o próximo ciclo de faturamento.",
      suggestedAudioTranscript:
        "Realizamos o cadastramento da matrícula 663019-9 no programa Água Solidária mediante validação do NIS/CadÚnico. O desconto da Tarifa Social será aplicado a partir da próxima fatura mensal.",
      previousAttendants: [],
      previousNotes: "",
    },
    {
      code: "AG-206",
      filterType: "agendada",
      typeLabel: "Atendimento Agendado (16:30)",
      tagClass: "tag-green",
      name: "Padaria Pão Quente Ltda",
      demandCategory: "Ligação Comercial / Aumento de Vazão",
      demandText:
        "Solicitação de redimensionamento de cavalete e hidrômetro para ampliação da padaria.",
      docsCheckedByReception: [
        "CNPJ e Contrato Social da empresa",
        "RG/CPF do sócio administrador",
        "Croqui hidrossanitário e alvará comercial",
      ],
      context: {
        titular: "Padaria Pão Quente Ltda",
        matriculaCat: "339014-7 • Comercial",
        statusLigacao: "Ativa",
        statusTagClass: "tag-green",
        financeiro: "Faturas em dia",
        financeiroClass: "text-green",
        ocorrencias: "Protocolo de consulta prévia de viabilidade #2026-8841 em 08/11",
      },
      aqualinoTip:
        "Para aumento de vazão comercial, verifique se há necessidade de vistoria técnica em campo da rede externa. Se precisar de vistoria prévia antes da conclusão final, explique ao cliente e registre o encaminhamento!",
      suggestedAudioTranscript:
        "Analisamos a documentação técnica do imóvel comercial e abrimos o pedido de redimensionamento de hidrômetro, agendando vistoria técnica de campo para aferição da pressão da rede na próxima terça-feira.",
      previousAttendants: [],
      previousNotes: "",
    },
  ];

  const initialHistory = () => [
    {
      code: "P-040",
      client: "Dona Maria Helena • 104892-3",
      demand: "Troca de Titularidade",
      attendants: [CURRENT_ATTENDANT],
      durationSec: 365,
      outcomeType: "resolved",
      outcomeText: "✓ Resolvido: Titularidade transferida após conferência do contrato.",
      satisfactionText: "5,0 ★ (NPS 10) • +100 pts",
    },
    {
      code: "AG-203",
      client: "Condomínio Solar • 881023-1",
      demand: "Revisão de Hidrômetro",
      attendants: ["Roberto Dias (Guichê 01)", CURRENT_ATTENDANT],
      durationSec: 420,
      outcomeType: "resolved",
      outcomeText: "✓ Resolvido (Co-atendimento): Laudo revisado e fatura retificada.",
      satisfactionText: "5,0 ★ (NPS 10) • +100 pts p/ ambos",
    },
    {
      code: "N-124",
      client: "Jorge Luís Prado • 992011-4",
      demand: "Ligação Nova de Esgoto",
      attendants: [CURRENT_ATTENDANT],
      durationSec: 370,
      outcomeType: "unresolved",
      outcomeText:
        "⚠️ Não resolvido: Necessidade de vistoria técnica presencial em campo pela equipe operacional.",
      satisfactionText: "4,0 ★ (NPS 8) • +60 pts",
    },
  ];

  const state = {
    shiftState: "active", // "active" | "paused" | "ended"
    pauseReason: "",
    points: 620,
    resolvedCount: 7,
    unresolvedCount: 1,
    serviceDurationsSec: [365, 420, 370, 390, 380, 410, 355, 382], // média ~06m 24s (384s)
    idleSeconds: 255, // 04m 15s
    satisfactionScores: [5, 5, 4, 5, 5, 5, 5, 5],
    npsScores: [10, 10, 8, 9, 10, 9, 10, 9],
    queueFilter: "all",
    dayTickets: initialDayTickets(),
    activeTicket: null,
    callCount: 0,
    inService: false,
    currentServiceSeconds: 0,
    selectedOutcomeTab: "resolved",
    lastCheckedOutRecord: null,
    pendingRating: { nps: null, stars: 0 },
    history: initialHistory(),
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function formatSeconds(sec) {
    const s = Math.max(0, Math.round(sec));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}m ${String(r).padStart(2, "0")}s`;
  }

  // =========================================================================
  // CONTROLE DE JORNADA DO ATENDENTE (INÍCIO, PAUSAS, FIM) & TEMPO OCIOSO
  // =========================================================================
  function updateShiftUI() {
    const badge = $("#shift-status-badge");
    const btnStart = $("#btn-iniciar-dia");
    const pauseGroup = $("#pause-controls-group");
    const btnPause = $("#btn-pausar-retomar");
    const btnEnd = $("#btn-encerrar-dia");
    const idleBadge = $("#kpi-idle-state-badge");

    if (state.shiftState === "active") {
      badge.className = "tag tag-green";
      badge.textContent = state.inService
        ? "● Em Atendimento no Guichê"
        : "● Jornada Ativa (Disponível)";
      btnStart.classList.add("hidden");
      pauseGroup.classList.remove("hidden");
      btnEnd.classList.remove("hidden");
      btnPause.textContent = "⏸ Iniciar Pausa";

      if (state.inService) {
        idleBadge.className = "tag tag-green";
        idleBadge.textContent = "Pausado (Em Atendimento)";
      } else {
        idleBadge.className = "tag tag-teal";
        idleBadge.textContent = "Contabilizando Ociosidade";
      }
    } else if (state.shiftState === "paused") {
      badge.className = "tag tag-amber";
      badge.textContent = `⏸ Em ${state.pauseReason}`;
      btnStart.classList.add("hidden");
      pauseGroup.classList.remove("hidden");
      btnPause.textContent = "▶ Retomar Atividades";
      idleBadge.className = "tag tag-amber";
      idleBadge.textContent = "Pausa Oficial Registrada";
    } else {
      badge.className = "tag tag-red";
      badge.textContent = "⏹ Expediente Encerrado";
      btnStart.classList.remove("hidden");
      pauseGroup.classList.add("hidden");
      btnEnd.classList.add("hidden");
      idleBadge.className = "tag tag-red";
      idleBadge.textContent = "Jornada Encerrada";
    }
  }

  $("#btn-iniciar-dia").addEventListener("click", () => {
    state.shiftState = "active";
    updateAqualino(
      0,
      "☀️ <strong>Bom trabalho!</strong> Sua jornada foi iniciada. Clique em <strong>Chamar Próxima Senha</strong> para atender o próximo cidadão!"
    );
    updateShiftUI();
  });

  $("#btn-pausar-retomar").addEventListener("click", () => {
    if (state.inService) {
      alert("Encerre ou transfira o atendimento em andamento antes de iniciar uma pausa.");
      return;
    }
    if (state.shiftState === "active") {
      state.shiftState = "paused";
      state.pauseReason = $("#select-pause-type").value;
      updateAqualino(
        0,
        `⏸ <strong>${state.pauseReason} registrada!</strong> O cronômetro de tempo ocioso foi pausado durante o seu intervalo.`
      );
    } else {
      state.shiftState = "active";
      updateAqualino(
        0,
        "▶ <strong>De volta ao Guichê 02!</strong> Pausa finalizada. Pronto para chamar a próxima senha!"
      );
    }
    updateShiftUI();
  });

  $("#btn-encerrar-dia").addEventListener("click", () => {
    if (state.inService) {
      alert("Conclua o atendimento em andamento antes de encerrar suas atividades no dia.");
      return;
    }
    state.shiftState = "ended";
    updateAqualino(
      0,
      `🏁 <strong>Expediente encerrado!</strong> Você fechou o dia com <strong>${state.points} pts</strong>, <strong>${state.resolvedCount} casos resolvidos</strong> e excelente avaliação dos cidadãos!`
    );
    updateShiftUI();
  });

  // =========================================================================
  // GAMIFICAÇÃO (AQUALINO) & KPIS DO ATENDENTE
  // =========================================================================
  function updateAqualino(pointsDelta, speechHtml) {
    state.points = Math.max(0, state.points + pointsDelta);
    if (pointsDelta > 0) {
      const img = $(".mascot-img");
      if (img) {
        img.classList.add("celebrate");
        setTimeout(() => img.classList.remove("celebrate"), 500);
      }
    }
    $("#aqualino-speech").innerHTML = speechHtml;
    renderKpis();
  }

  function renderKpis() {
    $("#score-points").textContent = `${state.points} pts`;
    const pct = Math.min(100, Math.round((state.points / 800) * 100));
    $("#xp-fill").style.width = `${pct}%`;
    $("#xp-progress-label").textContent = `${state.points} / 800 pts`;

    const avgStars =
      state.satisfactionScores.reduce((a, b) => a + b, 0) / state.satisfactionScores.length;
    const avgNps = state.npsScores.reduce((a, b) => a + b, 0) / state.npsScores.length;

    $("#kpi-satisfaction").textContent = `${avgStars.toFixed(1).replace(".", ",")} ★`;
    $("#kpi-nps-avg").textContent = avgNps.toFixed(1).replace(".", ",");
    $("#kpi-eval-count").textContent = state.satisfactionScores.length;
    $("#xp-bonus-hint").textContent = `Satisfação Média: ${avgStars.toFixed(1).replace(".", ",")} ★ (Peso 50% da pontuação)`;

    if (state.points >= 800) {
      $("#mascot-level").textContent = "Nível 5 • Mestre Aqualino 🏆";
    } else {
      $("#mascot-level").textContent = "Nível 4 • Especialista";
    }

    const avgSec = Math.round(
      state.serviceDurationsSec.reduce((a, b) => a + b, 0) / state.serviceDurationsSec.length
    );
    $("#kpi-avg-service-time").textContent = formatSeconds(avgSec);
    $("#kpi-current-timer-badge").textContent = `Atual: ${formatSeconds(state.currentServiceSeconds)}`;
    $("#kpi-idle-time").textContent = formatSeconds(state.idleSeconds);

    const totalCases = state.resolvedCount + state.unresolvedCount;
    const resPct = totalCases > 0 ? Math.round((state.resolvedCount / totalCases) * 100) : 100;
    $("#kpi-resolved-ratio").textContent = `${state.resolvedCount} / ${state.unresolvedCount}`;
    $("#kpi-resolved-pct").textContent = `${resPct}%`;
    $("#kpi-resolved-num").textContent = state.resolvedCount;
    $("#kpi-unresolved-num").textContent = state.unresolvedCount;
  }

  // Cronômetro de 1s: atualiza tempo de atendimento da senha ativa OU tempo ocioso acumulado
  setInterval(() => {
    if (state.shiftState !== "active") return;

    if (state.inService && state.activeTicket) {
      state.currentServiceSeconds += 1;
      $("#desk-service-timer").textContent = formatSeconds(state.currentServiceSeconds);
      $("#kpi-current-timer-badge").textContent = `Atual: ${formatSeconds(state.currentServiceSeconds)}`;
    } else {
      state.idleSeconds += 1;
      $("#kpi-idle-time").textContent = formatSeconds(state.idleSeconds);
    }
  }, 1000);

  // =========================================================================
  // LISTA DE TODAS AS SENHAS GERADAS E AGENDADAS PARA O DIA
  // =========================================================================
  $$("#queue-filters .chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$("#queue-filters .chip").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.queueFilter = btn.dataset.filter;
      renderDayQueue();
    });
  });

  function renderDayQueue() {
    $("#count-all").textContent = state.dayTickets.length;
    const listEl = $("#day-tickets-list");
    listEl.innerHTML = "";

    const filtered = state.dayTickets.filter((tk) => {
      if (state.queueFilter === "all") return true;
      return tk.filterType === state.queueFilter;
    });

    if (!filtered.length) {
      listEl.innerHTML = `<p class="text-muted small-note">Nenhuma senha encontrada neste filtro.</p>`;
      return;
    }

    filtered.forEach((tk) => {
      const card = document.createElement("div");
      const isCurrent = state.activeTicket && state.activeTicket.code === tk.code;
      card.className = `queue-ticket-card${isCurrent ? " active-ticket" : ""}`;

      const docsHtml = tk.docsCheckedByReception.map((d) => `<li>${d}</li>`).join("");
      const transferNote =
        tk.previousAttendants.length > 0
          ? `<span class="tag tag-amber">⇄ Transferida por ${tk.previousAttendants[0]}</span>`
          : "";

      card.innerHTML = `
        <div class="qt-top">
          <div class="qt-code-group">
            <span class="qt-code">${tk.code}</span>
            <span class="tag ${tk.tagClass}">${tk.typeLabel}</span>
          </div>
          <button type="button" class="btn btn-secondary btn-sm btn-call-this">
            ${isCurrent ? "Em Chamada" : "📢 Chamar"}
          </button>
        </div>
        ${transferNote}
        <div class="qt-name">${tk.name} • <span class="text-muted">${tk.context.matriculaCat}</span></div>
        <div class="qt-demand">
          <strong>${tk.demandCategory}:</strong> ${tk.demandText}
        </div>
        <div class="qt-docs-mini">
          <strong>✓ Documentos conferidos na recepção:</strong>
          <ul>${docsHtml}</ul>
        </div>
      `;

      card.querySelector(".btn-call-this").addEventListener("click", () => {
        callTicketToDesk(tk.code);
      });

      listEl.appendChild(card);
    });
  }

  // =========================================================================
  // CHAMAR SENHA, CONTEXTUALIZAÇÃO IMEDIATA, RECHAMADA MÚLTIPLA, AUSÊNCIA E CHECK-IN
  // =========================================================================
  function callNextTicket() {
    if (state.shiftState !== "active") {
      alert("Inicie ou retome sua jornada antes de chamar uma senha.");
      return;
    }
    if (state.inService) {
      alert("Você já possui uma senha em atendimento ativo. Conclua ou transfira antes de chamar a próxima.");
      return;
    }
    if (!state.dayTickets.length) {
      alert("Todas as senhas da fila foram chamadas! Clique em 'Restaurar Demo' no topo para recarregar as senhas.");
      return;
    }
    callTicketToDesk(state.dayTickets[0].code);
  }

  $("#btn-chamar-proxima").addEventListener("click", callNextTicket);
  $("#btn-chamar-proxima-empty").addEventListener("click", callNextTicket);

  function callTicketToDesk(code) {
    if (state.shiftState !== "active") {
      alert("Inicie ou retome sua jornada antes de chamar uma senha.");
      return;
    }
    if (state.inService && state.activeTicket && state.activeTicket.code !== code) {
      alert("Finalize ou transfira o atendimento atual antes de chamar outra senha.");
      return;
    }

    const tk = state.dayTickets.find((t) => t.code === code);
    if (!tk) return;

    state.activeTicket = tk;
    state.callCount = 1;
    state.inService = false;
    state.currentServiceSeconds = 0;

    $("#desk-empty-card").classList.add("hidden");
    $("#desk-active-card").classList.remove("hidden");

    // Topo da senha chamada
    const typeTag = $("#desk-ticket-type-tag");
    typeTag.className = `tag ${tk.tagClass}`;
    typeTag.textContent = tk.typeLabel;

    const callTag = $("#desk-call-state-tag");
    callTag.className = "tag tag-amber";
    callTag.textContent = "🔔 Chamando no Painel (1ª chamada)";

    const transferBadge = $("#desk-transfer-badge");
    if (tk.previousAttendants.length > 0) {
      transferBadge.textContent = `⇄ Co-atendimento c/ ${tk.previousAttendants.join(", ")}`;
      transferBadge.classList.remove("hidden");
    } else {
      transferBadge.classList.add("hidden");
    }

    $("#desk-ticket-code").textContent = tk.code;
    $("#desk-citizen-name").textContent = tk.name;
    $("#desk-service-timer").textContent = "00m 00s";
    $("#desk-call-counter-text").textContent = "Chamadas realizadas: 1x";
    $("#recall-count-num").textContent = "1";
    $(".desk-timer-box").classList.remove("in-service");

    // Reexibe controles de chamada
    $("#call-controls-bar").classList.remove("checked-in");
    $("#btn-checkin-guiche").disabled = false;
    $("#btn-checkin-guiche").textContent = "✓ Fazer Check-in e Iniciar Atendimento";
    $("#btn-registrar-ausencia").disabled = false;

    // CARREGAMENTO AUTOMÁTICO DO BLOCO DE CONTEXTO DO CLIENTE (SGC)
    $("#ctx-titular").textContent = tk.context.titular;
    $("#ctx-matricula-cat").textContent = tk.context.matriculaCat;
    const stLig = $("#ctx-status-ligacao");
    stLig.className = `tag ${tk.context.statusTagClass}`;
    stLig.textContent = tk.context.statusLigacao;

    const finEl = $("#ctx-financeiro");
    finEl.className = tk.context.financeiroClass;
    finEl.textContent = tk.context.financeiro;

    $("#ctx-ocorrencias").textContent = tk.context.ocorrencias;

    // Demanda e Documentos conferidos na recepção
    $("#desk-demand-category").textContent = tk.demandCategory;
    $("#desk-demand-text").textContent = `"${tk.demandText}"`;

    const prevNotesEl = $("#desk-previous-attendant-notes");
    if (tk.previousNotes) {
      prevNotesEl.textContent = tk.previousNotes;
      prevNotesEl.classList.remove("hidden");
    } else {
      prevNotesEl.classList.add("hidden");
    }

    const docsUl = $("#desk-docs-list");
    docsUl.innerHTML = "";
    tk.docsCheckedByReception.forEach((docItem) => {
      const li = document.createElement("li");
      li.textContent = docItem;
      docsUl.appendChild(li);
    });

    // Dica contextual do Aqualino
    $("#desk-aqualino-tip").textContent = tk.aqualinoTip;
    updateAqualino(
      0,
      `📢 <strong>Senha ${tk.code} chamada!</strong> O Contexto do Cliente <strong>${tk.context.titular}</strong> foi carregado automaticamente.💡 <em>${tk.aqualinoTip}</em>`
    );

    // Bloqueia execução até o check-in no guichê
    $("#service-execution-area").classList.add("execution-locked");
    $("#execution-lock-banner").classList.remove("hidden");
    $("#textarea-resumo-orientacao").value = "";
    $("#select-unresolved-reason").value = "";

    updateShiftUI();
    renderDayQueue();
  }

  // Rechamar senha múltiplas vezes
  $("#btn-rechamar-senha").addEventListener("click", () => {
    if (!state.activeTicket) return;
    state.callCount += 1;
    $("#recall-count-num").textContent = String(state.callCount);
    $("#desk-call-counter-text").textContent = `Chamadas realizadas: ${state.callCount}x`;
    const callTag = $("#desk-call-state-tag");
    callTag.className = "tag tag-amber";
    callTag.textContent = `🔔 Rechamando no Painel (${state.callCount}ª chamada)`;

    updateAqualino(
      0,
      `🔔 <strong>Senha ${state.activeTicket.code} rechamada (${state.callCount}ª vez)</strong> no painel sonoro da agência. Caso o cidadão não compareça, você pode registrar ausência.`
    );
  });

  // Registrar ausência do cidadão
  $("#btn-registrar-ausencia").addEventListener("click", () => {
    if (!state.activeTicket) return;
    const tk = state.activeTicket;

    state.history.unshift({
      code: tk.code,
      client: `${tk.name} • ${tk.context.matriculaCat.split("•")[0].trim()}`,
      demand: tk.demandCategory,
      attendants: [CURRENT_ATTENDANT],
      durationSec: 0,
      outcomeType: "absent",
      outcomeText: `🚫 Cidadão ausente no guichê após ${state.callCount} chamada(s) no painel.`,
      satisfactionText: "Sem avaliação (Ausente)",
    });

    state.dayTickets = state.dayTickets.filter((t) => t.code !== tk.code);
    state.activeTicket = null;
    state.inService = false;

    $("#desk-active-card").classList.add("hidden");
    $("#desk-empty-card").classList.remove("hidden");

    updateAqualino(
      5,
      `📋 <strong>Ausência registrada (+5 pts):</strong> Senha <strong>${tk.code}</strong> encerrada por não comparecimento após ${state.callCount} chamada(s). Fila liberada para o próximo cidadão!`
    );
    updateShiftUI();
    renderDayQueue();
    renderHistoryTable();
  });

  // Fazer Check-in no Guichê e Iniciar Atendimento
  $("#btn-checkin-guiche").addEventListener("click", () => {
    if (!state.activeTicket) return;
    state.inService = true;
    state.currentServiceSeconds = 1;

    const callTag = $("#desk-call-state-tag");
    callTag.className = "tag tag-green";
    callTag.textContent = "✓ Check-in no Guichê • Em Atendimento";

    $(".desk-timer-box").classList.add("in-service");
    $("#call-controls-bar").classList.add("checked-in");
    $("#btn-checkin-guiche").disabled = true;
    $("#btn-checkin-guiche").textContent = "✓ Atendimento em Andamento";
    $("#btn-registrar-ausencia").disabled = true;

    // Desbloqueia a área de resumo por áudio e conclusão/transferência
    $("#service-execution-area").classList.remove("execution-locked");
    $("#execution-lock-banner").classList.add("hidden");

    updateAqualino(
      10,
      `▶️ <strong>Atendimento iniciado (+10 pts):</strong> Cidadão <strong>${state.activeTicket.name}</strong> realizou check-in no Guichê 02. O cronômetro de tempo ocioso foi pausado!`
    );
    updateShiftUI();
  });

  // =========================================================================
  // RESUMO DA ORIENTAÇÃO POR ÁUDIO (TRANSCRIÇÃO, EDIÇÃO E BOTÃO LIMPAR)
  // =========================================================================
  const textareaResumo = $("#textarea-resumo-orientacao");
  const btnAudio = $("#btn-gravar-audio");
  const audioBar = $("#audio-recording-bar");
  let recognition = null;
  let isRecordingAudio = false;

  btnAudio.addEventListener("click", () => {
    if (isRecordingAudio) {
      stopAudioRecording(true);
    } else {
      startAudioRecording();
    }
  });

  $("#btn-concluir-audio").addEventListener("click", () => {
    stopAudioRecording(true);
  });

  function startAudioRecording() {
    isRecordingAudio = true;
    btnAudio.classList.add("listening");
    btnAudio.setAttribute("aria-pressed", "true");
    $("#audio-btn-label").textContent = "Gravando áudio...";
    audioBar.classList.remove("hidden");

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
          textareaResumo.value = txt;
        };
        recognition.onerror = () => {
          $("#audio-status-text").textContent =
            "Clique em 'Inserir Transcrição' para concluir a transcrição do áudio";
        };
        recognition.onend = () => {
          if (isRecordingAudio) stopAudioRecording(false);
        };
        recognition.start();
        return;
      } catch (_) {}
    }
    $("#audio-status-text").textContent =
      "Captando voz do atendente... clique em 'Inserir Transcrição' para transcrever";
  }

  function stopAudioRecording(insertSuggestedIfEmpty) {
    isRecordingAudio = false;
    btnAudio.classList.remove("listening");
    btnAudio.setAttribute("aria-pressed", "false");
    $("#audio-btn-label").textContent = "Inserir por Áudio (Transcrever)";
    audioBar.classList.add("hidden");

    if (recognition) {
      try {
        recognition.stop();
      } catch (_) {}
      recognition = null;
    }

    if (insertSuggestedIfEmpty && !textareaResumo.value.trim() && state.activeTicket) {
      textareaResumo.value = state.activeTicket.suggestedAudioTranscript;
      textareaResumo.focus();
    }
  }

  // Botão Limpar para apagar tudo e gravar novamente
  $("#btn-limpar-resumo").addEventListener("click", () => {
    if (isRecordingAudio) stopAudioRecording(false);
    textareaResumo.value = "";
    textareaResumo.focus();
  });

  // =========================================================================
  // DESFECHOS: TEMA RESOLVIDO, NÃO RESOLVIDO (JUSTIFICADO) OU TRANSFERÊNCIA
  // =========================================================================
  $$(".outcome-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".outcome-tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      state.selectedOutcomeTab = tab.dataset.outcome;

      $("#outcome-pane-resolved").classList.toggle("hidden", state.selectedOutcomeTab !== "resolved");
      $("#outcome-pane-unresolved").classList.toggle("hidden", state.selectedOutcomeTab !== "unresolved");
      $("#outcome-pane-transfer").classList.toggle("hidden", state.selectedOutcomeTab !== "transfer");
    });
  });

  function validateOrientationSummary() {
    const summary = textareaResumo.value.trim();
    if (!summary) {
      alert(
        "Por favor, informe ou grave por áudio o resumo da orientação apresentada ao cidadão antes de concluir ou transferir."
      );
      textareaResumo.focus();
      return null;
    }
    return summary;
  }

  // DESFECHO 1: Tema Resolvido + Checkout (Libera Avaliação de Satisfação)
  $("#btn-encerrar-resolvido").addEventListener("click", () => {
    if (!state.activeTicket) return;
    const summary = validateOrientationSummary();
    if (!summary) return;

    const tk = state.activeTicket;
    const duration = Math.max(45, state.currentServiceSeconds);
    const allAttendants = [...tk.previousAttendants, CURRENT_ATTENDANT];

    state.resolvedCount += 1;
    state.serviceDurationsSec.push(duration);

    const record = {
      code: tk.code,
      client: `${tk.name} • ${tk.context.matriculaCat.split("•")[0].trim()}`,
      demand: tk.demandCategory,
      attendants: allAttendants,
      durationSec: duration,
      outcomeType: "resolved",
      outcomeText: `✓ Resolvido (Checkout concluído): ${summary}`,
      satisfactionText: "Aguardando avaliação pós-checkout...",
    };

    state.history.unshift(record);
    state.dayTickets = state.dayTickets.filter((t) => t.code !== tk.code);
    state.activeTicket = null;
    state.inService = false;
    state.currentServiceSeconds = 0;

    $("#desk-active-card").classList.add("hidden");
    $("#desk-empty-card").classList.remove("hidden");

    updateAqualino(
      40,
      `🎉 <strong>Atendimento Resolvido e Checkout Realizado! (+40 pts)</strong> O checkout liberou a avaliação de satisfação para o cidadão da senha <strong>${record.code}</strong>!`
    );
    updateShiftUI();
    renderDayQueue();
    renderHistoryTable();
  });

  // DESFECHO 2: Não Foi Possível Resolver (Exige indicar o motivo + faz Checkout)
  $("#btn-encerrar-nao-resolvido").addEventListener("click", () => {
    if (!state.activeTicket) return;
    const summary = validateOrientationSummary();
    if (!summary) return;

    const reason = $("#select-unresolved-reason").value;
    if (!reason) {
      alert("Indique por que o tema do cliente não pôde ser resolvido antes de encerrar o atendimento.");
      $("#select-unresolved-reason").focus();
      return;
    }

    const tk = state.activeTicket;
    const duration = Math.max(45, state.currentServiceSeconds);
    const allAttendants = [...tk.previousAttendants, CURRENT_ATTENDANT];

    state.unresolvedCount += 1;
    state.serviceDurationsSec.push(duration);

    const record = {
      code: tk.code,
      client: `${tk.name} • ${tk.context.matriculaCat.split("•")[0].trim()}`,
      demand: tk.demandCategory,
      attendants: allAttendants,
      durationSec: duration,
      outcomeType: "unresolved",
      outcomeText: `⚠️ Não resolvido (${reason}). Orientação: ${summary}`,
      satisfactionText: "Aguardando avaliação pós-checkout...",
    };

    state.history.unshift(record);
    state.dayTickets = state.dayTickets.filter((t) => t.code !== tk.code);
    state.activeTicket = null;
    state.inService = false;
    state.currentServiceSeconds = 0;

    $("#desk-active-card").classList.add("hidden");
    $("#desk-empty-card").classList.remove("hidden");

    updateAqualino(
      15,
      `📝 <strong>Atendimento encerrado com justificativa e Checkout realizado (+15 pts):</strong> O checkout liberou a avaliação de satisfação para o cidadão da senha <strong>${record.code}</strong>.`
    );
    updateShiftUI();
    renderDayQueue();
    renderHistoryTable();
  });

  // DESFECHO 3: Transferir Atendimento para Outro Atendente (Sem Checkout ainda; o último fará o Checkout)
  $("#btn-confirmar-transferencia").addEventListener("click", () => {
    if (!state.activeTicket) return;
    const summary = validateOrientationSummary();
    if (!summary) return;

    const targetAttendant = $("#select-transfer-target").value;
    const transferReason = $("#select-transfer-reason").value;
    const tk = state.activeTicket;
    const duration = Math.max(30, state.currentServiceSeconds);

    state.serviceDurationsSec.push(duration);

    // Registra a participação do atendente atual na senha para pontuação compartilhada no checkout final
    if (!tk.previousAttendants.includes(CURRENT_ATTENDANT)) {
      tk.previousAttendants.push(CURRENT_ATTENDANT);
    }
    tk.filterType = "transferida";
    tk.typeLabel = `Transferida p/ ${targetAttendant.split("(")[0].trim()}`;
    tk.previousNotes = `Etapa anterior (${CURRENT_ATTENDANT}): ${summary} [Motivo da transferência: ${transferReason}]`;

    state.history.unshift({
      code: tk.code,
      client: `${tk.name} • ${tk.context.matriculaCat.split("•")[0].trim()}`,
      demand: tk.demandCategory,
      attendants: [...tk.previousAttendants, targetAttendant.split("(")[0].trim()],
      durationSec: duration,
      outcomeType: "transferred",
      outcomeText: `⇄ Transferido para ${targetAttendant} (${transferReason}). O último atendente encerrará e fará o checkout.`,
      satisfactionText: "Aguardando checkout do último atendente",
    });

    state.activeTicket = null;
    state.inService = false;
    state.currentServiceSeconds = 0;

    $("#desk-active-card").classList.add("hidden");
    $("#desk-empty-card").classList.remove("hidden");

    updateAqualino(
      20,
      `🤝 <strong>Atendimento transferido (+20 pts):</strong> Senha <strong>${tk.code}</strong> encaminhada para <strong>${targetAttendant}</strong>. Quando o último atendente realizar o checkout e o cidadão avaliar, <strong>ambos ganharão pontos consoante a satisfação</strong>!`
    );
    updateShiftUI();
    renderDayQueue();
    renderHistoryTable();
  });

  // =========================================================================
  // TABELA DE HISTÓRICO DE ATENDIMENTOS DO GUICHÊ
  // =========================================================================
  function renderHistoryTable() {
    const tbody = $("#attendant-history-tbody");
    tbody.innerHTML = "";
    state.history.forEach((h) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${h.code}</strong></td>
        <td>${h.client}</td>
        <td>${h.demand}</td>
        <td>${h.attendants.join(" → ")}</td>
        <td>${h.durationSec > 0 ? formatSeconds(h.durationSec) : "—"}</td>
        <td>${h.outcomeText}</td>
        <td><strong>${h.satisfactionText}</strong></td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Restaurar demonstração
  $("#btn-reset-demo").addEventListener("click", () => {
    state.shiftState = "active";
    state.points = 620;
    state.resolvedCount = 7;
    state.unresolvedCount = 1;
    state.serviceDurationsSec = [365, 420, 370, 390, 380, 410, 355, 382];
    state.idleSeconds = 255;
    state.satisfactionScores = [5, 5, 4, 5, 5, 5, 5, 5];
    state.npsScores = [10, 10, 8, 9, 10, 9, 10, 9];
    state.dayTickets = initialDayTickets();
    state.activeTicket = null;
    state.inService = false;
    state.currentServiceSeconds = 0;
    state.history = initialHistory();

    $("#desk-active-card").classList.add("hidden");
    $("#desk-empty-card").classList.remove("hidden");

    updateAqualino(
      0,
      '💡 <strong>Dica do Aqualino:</strong> Clique em <strong>"📢 Chamar Próxima Senha"</strong> para carregar instantaneamente o <strong>Contexto do Cliente</strong>. Lembre-se: a avaliação de satisfação após o checkout tem o maior peso na sua pontuação (até <strong>+100 pts</strong>), e em atendimentos compartilhados os dois atendentes ganham pontos!'
    );
    updateShiftUI();
    renderDayQueue();
    renderHistoryTable();
  });

  // Inicialização
  updateShiftUI();
  renderKpis();
  renderDayQueue();
  renderHistoryTable();
})();
