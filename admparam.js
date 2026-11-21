(() => {
  "use strict";

  // =========================================================================
  // ESTADO INICIAL DAS PARAMETRIZAÇÕES DO ADMINISTRADOR DA SOLUÇÃO
  // =========================================================================
  function getInitialAdmData() {
    return {
      version: 5.0,
      lastSaved: "Hoje, 17:19",
      unitFilter: "ALL",

      attendants: [
        {
          id: "AT_1",
          name: "Roberto Dias",
          unit: "Central Rebouças (Curitiba)",
          desk: "Guichê 01 • Pleno",
          shiftStart: "08:00",
          shiftEnd: "17:00",
          lunchWindow: "12:00 às 13:00 (1º Turno)",
          active: true,
        },
        {
          id: "AT_2",
          name: "Ana Paula Ribeiro",
          unit: "Central Rebouças (Curitiba)",
          desk: "Guichê 02 • Pleno",
          shiftStart: "08:00",
          shiftEnd: "17:00",
          lunchWindow: "13:00 às 14:00 (2º Turno)",
          active: true,
        },
        {
          id: "AT_3",
          name: "Marcos Oliveira",
          unit: "Central Rebouças (Curitiba)",
          desk: "Guichê 03 • Pleno",
          shiftStart: "08:00",
          shiftEnd: "17:00",
          lunchWindow: "12:00 às 13:00 (1º Turno)",
          active: true,
        },
        {
          id: "AT_4",
          name: "Carla Souza",
          unit: "Central Rebouças (Curitiba)",
          desk: "Guichê 04 • Pleno",
          shiftStart: "08:00",
          shiftEnd: "17:00",
          lunchWindow: "13:00 às 14:00 (2º Turno)",
          active: true,
        },
        {
          id: "AT_5",
          name: "Juliana Mendes",
          unit: "Central Rebouças (Curitiba)",
          desk: "Balcão Recepção • Triagem",
          shiftStart: "08:00",
          shiftEnd: "17:00",
          lunchWindow: "11:30 às 12:30 (Turno Antecipado)",
          active: true,
        },
        {
          id: "AT_6",
          name: "Carlos Eduardo Martins",
          unit: "Posto Pinheirinho (Curitiba)",
          desk: "Guichê 01 • Pleno",
          shiftStart: "08:00",
          shiftEnd: "17:00",
          lunchWindow: "12:00 às 13:00 (1º Turno)",
          active: true,
        },
        {
          id: "AT_7",
          name: "Luciana Prado",
          unit: "Posto Boa Vista (Curitiba)",
          desk: "Guichê 01 • Sênior (Apoio)",
          shiftStart: "08:00",
          shiftEnd: "17:00",
          lunchWindow: "13:00 às 14:00 (2º Turno)",
          active: true,
        },
      ],

      evaluationQuestions: [
        {
          id: "Q_1",
          active: true,
          text: "Em uma escala de 0 a 10, o quanto você recomendaria o atendimento da SANEPAR a um amigo ou familiar?",
          type: "Escala NPS (0 a 10)",
          required: "Obrigatória",
          weightTag: "Peso Principal Gamificação (50%)",
        },
        {
          id: "Q_2",
          active: true,
          text: "Avaliação geral do atendimento presencial recebido:",
          type: "Estrelas (1 a 5 ★)",
          required: "Obrigatória",
          weightTag: "Qualidade Geral do Guichê/Recepção",
        },
        {
          id: "Q_3",
          active: true,
          text: "O que você mais gostou no seu atendimento de hoje? (Pouco tempo de espera, Triagem clara, Cordialidade, Problema resolvido)",
          type: "Múltipla Escolha (Tags Rápidas)",
          required: "Opcional",
          weightTag: "Diagnóstico Qualitativo",
        },
        {
          id: "Q_4",
          active: true,
          text: "Comentário adicional, elogio ou sugestão (por texto ou ditado por voz):",
          type: "Texto / Voz Aberto",
          required: "Opcional",
          weightTag: "Ouvidoria & Melhoria Contínua",
        },
      ],

      cancelJustifications: [
        {
          id: "J_1",
          active: true,
          text: "Desistência espontânea do cidadão durante a espera na fila",
          scope: "Recepção & Guichê (Cancelamento)",
          requiresObs: "Não",
        },
        {
          id: "J_2",
          active: true,
          text: "Ausência do cidadão após 3 chamadas consecutivas no painel eletrônico",
          scope: "Guichê (Ausência na Chamada)",
          requiresObs: "Não",
        },
        {
          id: "J_3",
          active: true,
          text: "Falta de documentação obrigatória exigida para o serviço (titularidade, contrato ou procuração)",
          scope: "Recepção & Guichê (Cancelamento)",
          requiresObs: "Sim (Obrigatório detalhar)",
        },
        {
          id: "J_4",
          active: true,
          text: "Demanda de competência de outra instituição (Prefeitura Central 156 / COPEL) — Cidadão orientado",
          scope: "Recepção (Triagem / Desistência)",
          requiresObs: "Não",
        },
        {
          id: "J_5",
          active: true,
          text: "Necessidade de vistoria técnica externa em campo ou análise de engenharia no SGC",
          scope: "Guichê (Não Resolvido no Balcão)",
          requiresObs: "Sim (Obrigatório detalhar)",
        },
      ],

      legalPriorities: [
        {
          id: "LP_1",
          active: true,
          title: "Superprioridade Legal — Idosos 80+ Anos",
          law: "Lei Federal nº 13.466/2017 (Estatuto da Pessoa Idosa)",
          prefix: "P80",
          rule: "Topo Absoluto da Fila Prioritária",
          maxTmeMin: 5,
        },
        {
          id: "LP_2",
          active: true,
          title: "Prioridade Legal — Pessoa Idosa (60+ Anos)",
          law: "Lei Federal nº 10.741/2003",
          prefix: "P",
          rule: "Intercalação 2 Prioritárias : 1 Normal",
          maxTmeMin: 8,
        },
        {
          id: "LP_3",
          active: true,
          title: "Prioridade Legal — Pessoa com Deficiência (PcD) ou TEA",
          law: "Lei nº 13.146/2015 (LBI) e Lei nº 12.764/2012",
          prefix: "D",
          rule: "Intercalação 2 Prioritárias : 1 Normal",
          maxTmeMin: 8,
        },
        {
          id: "LP_4",
          active: true,
          title: "Prioridade Legal — Gestantes, Lactantes, Criança de Colo e Doadores",
          law: "Lei Federal nº 10.048/2000",
          prefix: "G",
          rule: "Intercalação 2 Prioritárias : 1 Normal",
          maxTmeMin: 8,
        },
        {
          id: "LP_5",
          active: true,
          title: "Atendimento Agendado (Hora Marcada com Suavização)",
          law: "Diretriz de Nível de Serviço SANEPAR",
          prefix: "AG",
          rule: "Prioridade na Janela do Horário Agendado",
          maxTmeMin: 6,
        },
        {
          id: "LP_6",
          active: true,
          title: "Atendimento Convencional (Senha Normal)",
          law: "Padrão Regulatório AGEPAR / SANEPAR",
          prefix: "N",
          rule: "Ordem de Chegada c/ Trava Anti-Inanição",
          maxTmeMin: 10,
        },
      ],
    };
  }

  let db = getInitialAdmData();

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function currentHHMM() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  }

  function showGlobalFeedback(msgHtml) {
    const fb = $("#adm-global-feedback");
    fb.innerHTML = msgHtml;
    fb.classList.remove("hidden");
  }

  // =========================================================================
  // NAVEGAÇÃO ENTRE OS 4 MÓDULOS DO ADMINISTRADOR
  // =========================================================================
  $$(".adm-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".adm-tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const targetId = btn.dataset.tab;
      $$(".adm-tab-pane").forEach((pane) => {
        pane.classList.toggle("hidden", pane.id !== targetId);
      });
    });
  });

  // =========================================================================
  // MÓDULO 1: METAS (TME, TMA, SATISFAÇÃO) & MOTOR DE SIMULAÇÃO DE DEMANDA
  // =========================================================================
  function renderSimulationPreview() {
    const tmeTarget = Number($("#adm-tme-target").value) || 10;
    const tmaTarget = Number($("#adm-tma-target").value) || 8;
    const npsTarget = Number($("#adm-nps-target").value) || 85;
    const cap = Number($("#adm-sim-capacity").value) || 24;
    const lunchPen = Number($("#adm-sim-lunch-penalty").value) || 300;
    const seniorGain = Number($("#adm-sim-senior-gain").value) || 18;
    const histW = Number($("#adm-sim-hist-weight").value) || 60;
    const agW = Math.max(0, 100 - histW);
    const retention = Number($("#adm-sim-reception-retention").value) || 34;

    const sampleDemand = 142; // exemplo Central Rebouças
    const recommendedAttendants = Math.max(2, Math.ceil((sampleDemand / cap) * (10 / tmeTarget)));

    $("#adm-sim-preview-box").innerHTML = `
      <strong>📐 Prévia de Calibragem do Simulador (Exemplo: Demanda de ${sampleDemand} senhas/dia):</strong>
      <span>• <strong>Fórmula de Demanda do Dia:</strong> <code>${histW}% Histórico/SGC + ${agW}% (Agendamentos + Senhas Emitidas Pendentes)</code> com <strong>${retention}%</strong> de retenção na triagem/digital.</span>
      <span>• <strong>Dimensionamento Recomendado:</strong> Para cumprir <strong>TME ≤ ${tmeTarget} min</strong> e <strong>TMA ≤ ${tmaTarget} min</strong> (Meta NPS ≥ ${npsTarget}), o motor recomendará <strong>${recommendedAttendants} atendentes ativos</strong> (ou redução de <strong>-${seniorGain}% no TMA</strong> com reforço sênior).</span>
      <span>• <strong>Impacto de Horário de Almoço:</strong> Se todos os atendentes tiverem o mesmo horário de almoço, o simulador projetará aumento de <strong>+${lunchPen}% no TME</strong> entre 12h e 14h.</span>
    `;
  }

  [
    "#adm-tme-target",
    "#adm-tme-critical",
    "#adm-tme-recepcao",
    "#adm-tma-target",
    "#adm-nps-target",
    "#adm-stars-target",
    "#adm-eval-coverage",
    "#adm-fcr-target",
    "#adm-sim-capacity",
    "#adm-sim-lunch-penalty",
    "#adm-sim-senior-gain",
    "#adm-sim-hist-weight",
    "#adm-sim-smoothing-days",
    "#adm-sim-reception-retention",
  ].forEach((sel) => {
    const el = $(sel);
    if (el) {
      el.addEventListener("input", renderSimulationPreview);
      el.addEventListener("change", renderSimulationPreview);
    }
  });

  // =========================================================================
  // MÓDULO 2: CADASTRO DE ATENDENTES, HORÁRIOS E ESCALONAMENTO DE ALMOÇO
  // =========================================================================
  const LUNCH_OPTIONS = [
    "11:30 às 12:30 (Turno Antecipado)",
    "12:00 às 13:00 (1º Turno)",
    "12:30 às 13:30 (Turno Intermediário)",
    "13:00 às 14:00 (2º Turno)",
  ];

  function renderAttendantsTable() {
    const tbody = $("#adm-attendants-tbody");
    tbody.innerHTML = "";
    $("#adm-attendants-total-badge").textContent = `${db.attendants.length} Cadastrados`;

    const filtered = db.attendants.filter(
      (a) => db.unitFilter === "ALL" || a.unit === db.unitFilter
    );

    // Verifica se há concentração excessiva no mesmo horário de almoço (ex.: 12:00 às 13:00)
    const activeInScope = filtered.filter((a) => a.active);
    const count12to13 = activeInScope.filter((a) =>
      a.lunchWindow.startsWith("12:00")
    ).length;
    const ratio12to13 =
      activeInScope.length > 0 ? count12to13 / activeInScope.length : 0;

    const banner = $("#lunch-conflict-banner");
    const penaltyVal = Number($("#adm-sim-lunch-penalty").value) || 300;
    if (activeInScope.length >= 2 && ratio12to13 >= 0.75) {
      banner.className = "lunch-check-banner warn";
      banner.innerHTML = `⚠️ <strong>Alerta de Concentração de Horário de Almoço:</strong> ${count12to13} de ${activeInScope.length} atendentes ativos no escopo estão alocados das <strong>12:00 às 13:00</strong>. Essa sobreposição pode elevar o tempo de espera em até <strong>+${penaltyVal}%</strong>! Recomendado distribuir metade para <strong>13:00 às 14:00 (2º Turno)</strong>.`;
    } else {
      banner.className = "lunch-check-banner ok";
      banner.innerHTML = `✓ <strong>Escalonamento de Almoço Equilibrado:</strong> Os horários de almoço dos ${activeInScope.length} atendentes ativos estão distribuídos em turnos distintos (${count12to13} no 1º Turno 12h–13h e ${activeInScope.length - count12to13} nos demais turnos), evitando picos de fila no meio-dia.`;
    }

    filtered.forEach((att) => {
      const tr = document.createElement("tr");
      if (!att.active) tr.style.opacity = "0.55";

      const lunchOptsHtml = LUNCH_OPTIONS.map(
        (opt) =>
          `<option value="${opt}" ${att.lunchWindow === opt ? "selected" : ""}>${opt}</option>`
      ).join("");

      tr.innerHTML = `
        <td><strong>${att.name}</strong></td>
        <td>
          <strong>${att.desk}</strong>
          <div class="text-muted" style="font-size:0.73rem;">${att.unit}</div>
        </td>
        <td>${att.shiftStart} às ${att.shiftEnd}</td>
        <td>
          <select class="inline-lunch-select" title="Alterar turno de almoço do atendente">
            ${lunchOptsHtml}
          </select>
        </td>
        <td>
          <span class="tag ${att.active ? "tag-green" : "tag-amber"}">
            ${att.active ? "● Ativo" : "○ Reserva / Férias"}
          </span>
        </td>
        <td style="white-space:nowrap;">
          <button type="button" class="btn btn-secondary btn-sm btn-toggle-att">
            ${att.active ? "Pausar/Reserva" : "Ativar"}
          </button>
          <button type="button" class="btn btn-secondary btn-sm btn-del-att" title="Remover cadastro">
            🗑️
          </button>
        </td>
      `;

      tr.querySelector(".inline-lunch-select").addEventListener("change", (e) => {
        att.lunchWindow = e.target.value;
        renderAttendantsTable();
      });

      tr.querySelector(".btn-toggle-att").addEventListener("click", () => {
        att.active = !att.active;
        renderAttendantsTable();
      });

      tr.querySelector(".btn-del-att").addEventListener("click", () => {
        db.attendants = db.attendants.filter((x) => x.id !== att.id);
        renderAttendantsTable();
      });

      tbody.appendChild(tr);
    });
  }

  $("#filter-att-unit").addEventListener("change", (e) => {
    db.unitFilter = e.target.value;
    renderAttendantsTable();
  });

  $("#form-add-attendant").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#att-inp-name").value.trim();
    const unit = $("#att-sel-unit").value;
    const desk = $("#att-sel-desk").value;
    const shiftStart = $("#att-inp-shift-start").value || "08:00";
    const shiftEnd = $("#att-inp-shift-end").value || "17:00";
    const lunchStart = $("#att-inp-lunch-start").value || "12:00";
    const lunchEnd = $("#att-inp-lunch-end").value || "13:00";

    if (!name) return;

    let lunchWindow = `${lunchStart} às ${lunchEnd}`;
    if (lunchStart === "12:00" && lunchEnd === "13:00") {
      lunchWindow = "12:00 às 13:00 (1º Turno)";
    } else if (lunchStart === "13:00" && lunchEnd === "14:00") {
      lunchWindow = "13:00 às 14:00 (2º Turno)";
    } else if (lunchStart === "11:30" && lunchEnd === "12:30") {
      lunchWindow = "11:30 às 12:30 (Turno Antecipado)";
    } else if (lunchStart === "12:30" && lunchEnd === "13:30") {
      lunchWindow = "12:30 às 13:30 (Turno Intermediário)";
    } else if (!LUNCH_OPTIONS.includes(lunchWindow)) {
      LUNCH_OPTIONS.push(lunchWindow);
    }

    db.attendants.unshift({
      id: `AT_${Date.now()}`,
      name,
      unit,
      desk,
      shiftStart,
      shiftEnd,
      lunchWindow,
      active: true,
    });

    $("#att-inp-name").value = "";
    renderAttendantsTable();
    showGlobalFeedback(
      `👤 <strong>Atendente cadastrado com sucesso:</strong> <strong>${name}</strong> (${desk} • ${unit}) com expediente das <strong>${shiftStart} às ${shiftEnd}</strong> e horário de almoço das <strong>${lunchWindow}</strong>.`
    );
  });

  // =========================================================================
  // MÓDULO 3: PERGUNTAS DE AVALIAÇÃO DE SATISFAÇÃO & JUSTIFICATIVAS DE CANCELAMENTO
  // =========================================================================
  function renderEvaluationQuestions() {
    const listEl = $("#adm-questions-list");
    listEl.innerHTML = "";
    const activeCount = db.evaluationQuestions.filter((q) => q.active).length;
    $("#adm-questions-count-tag").textContent = `${activeCount} Pergunta(s) Ativa(s)`;

    db.evaluationQuestions.forEach((q, idx) => {
      const card = document.createElement("div");
      card.className = `param-item-card${q.active ? "" : " inactive"}`;
      card.innerHTML = `
        <div class="param-item-top">
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <input type="checkbox" class="chk-q-active" ${q.active ? "checked" : ""} title="Ativar ou desativar pergunta" />
            <strong>Pergunta #${idx + 1}</strong>
            <span class="tag tag-teal">${q.type}</span>
            <span class="tag ${q.required === "Obrigatória" ? "tag-blue" : "tag-amber"}">${q.required}</span>
          </div>
          <button type="button" class="btn btn-secondary btn-sm btn-del-q" title="Remover pergunta">🗑️</button>
        </div>
        <input type="text" class="param-item-input inp-q-text" value="${q.text}" />
      `;

      card.querySelector(".chk-q-active").addEventListener("change", (e) => {
        q.active = e.target.checked;
        renderEvaluationQuestions();
      });

      card.querySelector(".inp-q-text").addEventListener("input", (e) => {
        q.text = e.target.value;
      });

      card.querySelector(".btn-del-q").addEventListener("click", () => {
        db.evaluationQuestions = db.evaluationQuestions.filter((x) => x.id !== q.id);
        renderEvaluationQuestions();
      });

      listEl.appendChild(card);
    });
  }

  $("#form-add-question").addEventListener("submit", (e) => {
    e.preventDefault();
    const text = $("#q-inp-text").value.trim();
    const type = $("#q-sel-type").value;
    const required = $("#q-sel-required").value;
    if (!text) return;

    db.evaluationQuestions.push({
      id: `Q_${Date.now()}`,
      active: true,
      text,
      type,
      required,
      weightTag: "Parametrizada pelo Administrador",
    });

    $("#q-inp-text").value = "";
    renderEvaluationQuestions();
    showGlobalFeedback(
      `⭐ <strong>Nova pergunta adicionada ao formulário de avaliação de satisfação do cidadão:</strong> <em>"${text}"</em> (${type} • ${required}).`
    );
  });

  function renderCancelJustifications() {
    const listEl = $("#adm-justifications-list");
    listEl.innerHTML = "";
    const activeCount = db.cancelJustifications.filter((j) => j.active).length;
    $("#adm-justifications-count-tag").textContent = `${activeCount} Motivo(s) Ativo(s)`;

    db.cancelJustifications.forEach((j) => {
      const card = document.createElement("div");
      card.className = `param-item-card${j.active ? "" : " inactive"}`;
      card.innerHTML = `
        <div class="param-item-top">
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <input type="checkbox" class="chk-j-active" ${j.active ? "checked" : ""} title="Ativar ou desativar justificativa" />
            <span class="tag tag-blue">${j.scope}</span>
            <span class="tag ${j.requiresObs.startsWith("Sim") ? "tag-amber" : "tag-green"}">
              Obs. detalhada: ${j.requiresObs}
            </span>
          </div>
          <button type="button" class="btn btn-secondary btn-sm btn-del-j" title="Remover justificativa">🗑️</button>
        </div>
        <input type="text" class="param-item-input inp-j-text" value="${j.text}" />
      `;

      card.querySelector(".chk-j-active").addEventListener("change", (e) => {
        j.active = e.target.checked;
        renderCancelJustifications();
      });

      card.querySelector(".inp-j-text").addEventListener("input", (e) => {
        j.text = e.target.value;
      });

      card.querySelector(".btn-del-j").addEventListener("click", () => {
        db.cancelJustifications = db.cancelJustifications.filter((x) => x.id !== j.id);
        renderCancelJustifications();
      });

      listEl.appendChild(card);
    });
  }

  $("#form-add-justification").addEventListener("submit", (e) => {
    e.preventDefault();
    const text = $("#just-inp-text").value.trim();
    const scope = $("#just-sel-scope").value;
    const requiresObs = $("#just-sel-obs").value;
    if (!text) return;

    db.cancelJustifications.push({
      id: `J_${Date.now()}`,
      active: true,
      text,
      scope,
      requiresObs,
    });

    $("#just-inp-text").value = "";
    renderCancelJustifications();
    showGlobalFeedback(
      `📋 <strong>Nova justificativa de cancelamento / não resolução cadastrada:</strong> <em>"${text}"</em> (Aplicação: ${scope}).`
    );
  });

  // =========================================================================
  // MÓDULO 4: PRIORIZAÇÃO LEGAL DE SENHAS, LGPD E AUDITORIAS
  // =========================================================================
  const INTERCALATION_RULES = [
    "Topo Absoluto da Fila Prioritária",
    "Intercalação 2 Prioritárias : 1 Normal",
    "Intercalação 3 Prioritárias : 1 Normal",
    "Intercalação 1 Prioritária : 1 Normal",
    "Prioridade na Janela do Horário Agendado",
    "Ordem de Chegada c/ Trava Anti-Inanição",
  ];

  function renderLegalPrioritiesTable() {
    const tbody = $("#adm-legal-priority-tbody");
    tbody.innerHTML = "";

    db.legalPriorities.forEach((lp) => {
      const tr = document.createElement("tr");
      if (!lp.active) tr.style.opacity = "0.55";

      const ruleOpts = INTERCALATION_RULES.map(
        (r) => `<option value="${r}" ${lp.rule === r ? "selected" : ""}>${r}</option>`
      ).join("");

      tr.innerHTML = `
        <td>
          <input type="checkbox" class="chk-lp-active" ${lp.active ? "checked" : ""} />
        </td>
        <td>
          <strong>${lp.title}</strong>
          <div class="text-muted" style="font-size:0.73rem;">${lp.law}</div>
        </td>
        <td><span class="tag tag-blue">${lp.prefix}</span></td>
        <td>
          <select class="inline-lunch-select sel-lp-rule">
            ${ruleOpts}
          </select>
        </td>
        <td>
          <input
            type="number"
            class="param-item-input inp-lp-tme"
            style="width:74px;"
            min="2"
            max="30"
            value="${lp.maxTmeMin}"
          />
        </td>
      `;

      tr.querySelector(".chk-lp-active").addEventListener("change", (e) => {
        lp.active = e.target.checked;
        renderLegalPrioritiesTable();
      });

      tr.querySelector(".sel-lp-rule").addEventListener("change", (e) => {
        lp.rule = e.target.value;
      });

      tr.querySelector(".inp-lp-tme").addEventListener("input", (e) => {
        lp.maxTmeMin = Number(e.target.value) || 8;
      });

      tbody.appendChild(tr);
    });
  }

  // =========================================================================
  // SALVAR TODAS AS PARAMETRIZAÇÕES E RESTAURAR PADRÃO
  // =========================================================================
  $("#btn-save-all-adm").addEventListener("click", () => {
    db.version = Number((db.version + 0.1).toFixed(1));
    db.lastSaved = `Hoje, ${currentHHMM()}`;
    $("#adm-last-saved-indicator").textContent = `Última gravação global: ${db.lastSaved} (Versão v${db.version.toFixed(1)})`;

    const tmeTarget = $("#adm-tme-target").value;
    const tmaTarget = $("#adm-tma-target").value;
    const npsTarget = $("#adm-nps-target").value;
    const attCount = db.attendants.filter((a) => a.active).length;
    const qCount = db.evaluationQuestions.filter((q) => q.active).length;
    const jCount = db.cancelJustifications.filter((j) => j.active).length;

    showGlobalFeedback(
      `💾 <strong>Parametrizações Globais salvas com sucesso (Versão v${db.version.toFixed(1)} às ${currentHHMM()})!</strong><br/>Resumo ativo: Meta TME ≤ <strong>${tmeTarget}m</strong> • Meta TMA ≤ <strong>${tmaTarget}m</strong> • Meta NPS ≥ <strong>${npsTarget}</strong> • <strong>${attCount} atendentes ativos</strong> na escala • <strong>${qCount} perguntas</strong> de avaliação • <strong>${jCount} motivos</strong> de cancelamento e regras de prioridade legal/LGPD sincronizadas.`
    );
  });

  $("#btn-reset-adm").addEventListener("click", () => {
    db = getInitialAdmData();
    $("#adm-tme-target").value = "10";
    $("#adm-tme-critical").value = "12";
    $("#adm-tme-recepcao").value = "2";
    $("#adm-tma-target").value = "8";
    $("#adm-nps-target").value = "85";
    $("#adm-stars-target").value = "4.6";
    $("#adm-eval-coverage").value = "70";
    $("#adm-fcr-target").value = "90";
    $("#adm-sim-capacity").value = "24";
    $("#adm-sim-lunch-penalty").value = "300";
    $("#adm-sim-senior-gain").value = "18";
    $("#adm-sim-hist-weight").value = "60";
    $("#adm-sim-smoothing-days").value = "DIAS_1_A_5";
    $("#adm-sim-reception-retention").value = "34";
    $("#filter-att-unit").value = "ALL";
    $("#adm-global-feedback").classList.add("hidden");
    $("#adm-last-saved-indicator").textContent = `Última gravação global: Hoje, 17:19 (Versão v5.0)`;

    refreshAll();
  });

  // =========================================================================
  // MASCOTE AQUALINO RESPONDENDO DÚVIDAS DO ADMINISTRADOR
  // =========================================================================
  function generateAqualinoAdmAnswer(rawQuestion) {
    const q = (rawQuestion || "").toLowerCase();

    if (/(meta|tme|tma|nps|satisfação|satisfacao|simula|demanda|previsão|previsao)/i.test(q)) {
      return `Na <strong>Aba 1 (1. Metas & Simulação)</strong>, à esquerda você configura as metas de <strong>TME (Espera)</strong>, <strong>TMA (Atendimento)</strong> e <strong>Satisfação (NPS e Estrelas)</strong>. À direita você calibra os parâmetros usados pelo motor de <strong>Simulação de Atendimento Consoante a Previsão de Demanda</strong> (capacidade por atendente, penalidade de almoço simultâneo de +300%, ganho do reforço sênior e suavização dos dias 01 a 05 do mês)!`;
    }

    if (/(atendente|nome|horário|horario|almoço|almoco|expediente|escala|turno)/i.test(q)) {
      return `Na <strong>Aba 2 (2. Atendentes & Horários / Almoço)</strong>, você define o horário de abertura/fechamento das unidades, cadastra o <strong>nome dos atendentes</strong>, sua unidade, guichê, horário de expediente e <strong>horário de almoço</strong>. A tela ainda possui um <strong>Detector Automático de Concentração de Almoço</strong> que avisa se muitos atendentes estiverem no mesmo turno das 12h às 13h!`;
    }

    if (/(pergunta|avaliação|avaliacao|cancelamento|justificativa|motivo|cidadão|cidadao)/i.test(q)) {
      return `Na <strong>Aba 3 (3. Avaliação & Cancelamentos)</strong>, à esquerda você edita, ativa/desativa ou adiciona novas <strong>perguntas feitas ao cidadão na avaliação de satisfação</strong> (NPS 0–10, estrelas, tags e comentários). À direita você parametriza as <strong>justificativas padronizadas para cancelamento de senha</strong> (desistência, ausência após 3 chamadas, falta de documentação) e para não resolução no guichê!`;
    }

    if (/(prioridade|prioriza|legal|lei|idoso|pcd|gestante|lgpd|auditoria|sha|anonim)/i.test(q)) {
      return `Na <strong>Aba 4 (4. Prioridades Legais, LGPD & Auditoria)</strong>, à esquerda você parametriza as regras de intercalação e o TME máximo das filas prioritárias legais (<em>Idosos 80+, Idosos 60+, PcD/TEA, Gestantes/Colo e Agendados</em>) e a trava anti-inanição da fila normal. À direita você controla as diretrizes da <strong>LGPD (Lei nº 13.709/2018)</strong> — anonimização em dashboards/tablet, retenção de áudio — e a assinatura criptográfica <strong>SHA-256</strong> para auditorias!`;
    }

    return `Estou aqui para apoiar o <strong>Administrador da Solução SANEPAR</strong>! Use as <strong>4 abas superiores</strong> para parametrizar: <strong>(1)</strong> Metas de TME, TMA, Satisfação e Simulação de Demanda; <strong>(2)</strong> Cadastro de Atendentes e Horários de Atendimento/Almoço; <strong>(3)</strong> Perguntas da Avaliação de Satisfação e Justificativas de Cancelamento; e <strong>(4)</strong> Priorização Legal de Senhas, LGPD e Auditorias. Depois, clique em <strong>"💾 Salvar Todas as Parametrizações"</strong> no topo!`;
  }

  function askAqualinoAdm(questionText) {
    const q = (questionText || "").trim();
    if (!q) {
      $("#aqualino-adm-drawer").classList.remove("hidden");
      $("#input-ask-aqualino-adm").focus();
      return;
    }

    const answerHtml = generateAqualinoAdmAnswer(q);
    const bubble = $("#aqualino-adm-bubble");
    bubble.classList.add("answering");
    bubble.innerHTML = `
      💬 <strong>Sua dúvida:</strong> <em>"${q}"</em><br/>
      💧 <strong>Aqualino responde:</strong> ${answerHtml}
    `;

    const img = $(".mascot-img-clean");
    if (img) {
      img.classList.add("celebrate");
      setTimeout(() => img.classList.remove("celebrate"), 600);
    }
  }

  $("#btn-toggle-aqualino-adm").addEventListener("click", () => {
    const drawer = $("#aqualino-adm-drawer");
    drawer.classList.toggle("hidden");
    if (!drawer.classList.contains("hidden")) {
      $("#input-ask-aqualino-adm").focus();
    }
  });

  $("#form-ask-aqualino-adm").addEventListener("submit", (e) => {
    e.preventDefault();
    askAqualinoAdm($("#input-ask-aqualino-adm").value);
  });

  $$(".chip-ask-adm").forEach((chip) => {
    chip.addEventListener("click", () => {
      $("#input-ask-aqualino-adm").value = chip.dataset.q;
      askAqualinoAdm(chip.dataset.q);
    });
  });

  const btnVoiceAdm = $("#btn-voice-aqualino-adm");
  let isListeningAdm = false;
  btnVoiceAdm.addEventListener("click", () => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!isListeningAdm && SpeechRec) {
      try {
        const rec = new SpeechRec();
        rec.lang = "pt-BR";
        isListeningAdm = true;
        btnVoiceAdm.classList.add("listening");
        btnVoiceAdm.textContent = "🛑 Ouvindo...";
        rec.onresult = (ev) => {
          const txt = ev.results[0][0].transcript;
          $("#input-ask-aqualino-adm").value = txt;
          askAqualinoAdm(txt);
        };
        rec.onend = () => {
          isListeningAdm = false;
          btnVoiceAdm.classList.remove("listening");
          btnVoiceAdm.textContent = "🎤 Voz";
        };
        rec.onerror = () => {
          isListeningAdm = false;
          btnVoiceAdm.classList.remove("listening");
          btnVoiceAdm.textContent = "🎤 Voz";
          const sample = "Como cadastrar o nome dos atendentes, horários de atendimento e escalas de almoço?";
          $("#input-ask-aqualino-adm").value = sample;
          askAqualinoAdm(sample);
        };
        rec.start();
        return;
      } catch (_) {}
    }

    const sample = "Como cadastrar o nome dos atendentes, horários de atendimento e escalas de almoço?";
    $("#input-ask-aqualino-adm").value = sample;
    askAqualinoAdm(sample);
  });

  $("#btn-floating-aqualino-adm").addEventListener("click", () => {
    $("#aqualino-adm-drawer").classList.remove("hidden");
    $("#aqualino-adm-panel").scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => $("#input-ask-aqualino-adm").focus(), 250);
  });

  function refreshAll() {
    renderSimulationPreview();
    renderAttendantsTable();
    renderEvaluationQuestions();
    renderCancelJustifications();
    renderLegalPrioritiesTable();
  }

  refreshAll();
})();
