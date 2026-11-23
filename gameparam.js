(() => {
  "use strict";

  // =========================================================================
  // BANCO DE CICLOS DE GAMIFICAÇÃO (HISTÓRICO COM REGRAS PRÓPRIAS POR CICLO)
  // =========================================================================
  function getInitialCyclesDb() {
    return [
      {
        id: "C_2026_4",
        code: "Ciclo 2026.4",
        name: "Ciclo 2026.4 — Excelência SGC & Resolutividade Total",
        startDate: "2026-10-01",
        endDate: "2026-12-31",
        status: "VIGENTE",
        wasEverActivated: true, // Já foi ativado -> não pode ser apagado, apenas encerrado
        version: "v4.2",
        lastSaved: "Hoje, 12:10",
        author: "Comitê Estratégico Comercial SANEPAR",
        weightIndividual: 65,
        groupMultiplier: 1.2,
        coopRule: "INTEGRADA",
        roles: {
          RECEPCAO: { active: true, minMetric1: 180, minMetric2: 92 },
          ATENDENTE: { active: true, minMetric1: 140, minMetric2: 65 },
          SUPERVISOR: { active: true, minMetric1: 85, minMetric2: 80 },
        },
        rules: [
          {
            id: "R1",
            active: true,
            role: "RECEPCAO",
            merit: "INDIVIDUAL",
            name: "Check-in Ágil e Conferência Documental na Recepção",
            target: "Tempo Recepção ≤ 02m 00s",
            points: 35,
            weight: 1.5,
            freq: "Por Atendimento",
          },
          {
            id: "R2",
            active: true,
            role: "RECEPCAO",
            merit: "INDIVIDUAL",
            name: "Fila Evitada (Resolução Expressa 2ª Via / Orientação 156 e Copel)",
            target: "Retenção ≥ 30% na Triagem",
            points: 60,
            weight: 2.0,
            freq: "Diário",
          },
          {
            id: "R3",
            active: true,
            role: "RECEPCAO",
            merit: "INDIVIDUAL",
            name: "Satisfação do Cidadão com o Acolhimento da Recepção",
            target: "Nota ≥ 4,7 ★ (Pesquisa)",
            points: 50,
            weight: 2.0,
            freq: "Semanal",
          },
          {
            id: "R4",
            active: true,
            role: "ATENDENTE",
            merit: "INDIVIDUAL",
            name: "Avaliação de Satisfação Pós-Checkout pelo Cidadão (NPS)",
            target: "Nota 9 ou 10 (5 ★ Pós-Checkout)",
            points: 80,
            weight: 3.0,
            freq: "Por Atendimento",
          },
          {
            id: "R5",
            active: true,
            role: "ATENDENTE",
            merit: "INDIVIDUAL",
            name: "Resolutividade no 1º Atendimento Presencial (FCR SGC)",
            target: "FCR Individual ≥ 92%",
            points: 65,
            weight: 2.0,
            freq: "Semanal",
          },
          {
            id: "R6",
            active: true,
            role: "ATENDENTE",
            merit: "INDIVIDUAL",
            name: "Cumprimento do TMA Objetivo & Registro Completo de Orientação",
            target: "TMA ≤ 08m 00s c/ Resumo SGC",
            points: 45,
            weight: 1.5,
            freq: "Diário",
          },
          {
            id: "R7",
            active: true,
            role: "SUPERVISOR",
            merit: "INDIVIDUAL",
            name: "Gestão Ativa de Fila: TME Diário da Unidade Dentro da Meta",
            target: "TME da Unidade ≤ 10m 00s",
            points: 90,
            weight: 2.0,
            freq: "Diário",
          },
          {
            id: "R8",
            active: true,
            role: "SUPERVISOR",
            merit: "INDIVIDUAL",
            name: "Escalonamento Inteligente de Almoço e Resposta aos Alertas do Aqualino",
            target: "100% Alertas Mitigados < 5m",
            points: 75,
            weight: 2.0,
            freq: "Semanal",
          },
          {
            id: "R9",
            active: true,
            role: "GRUPO",
            merit: "GRUPO",
            name: "Meta Coletiva de Tempo de Espera da Central de Relacionamento",
            target: "TME Mensal da Unidade ≤ 09m 30s",
            points: 180,
            weight: 2.0,
            freq: "Mensal / Ciclo",
          },
          {
            id: "R10",
            active: true,
            role: "GRUPO",
            merit: "GRUPO",
            name: "Excelência Coletiva em Satisfação do Cidadão (Recepção + Guichês)",
            target: "NPS Consolidado da Central ≥ 86",
            points: 220,
            weight: 3.0,
            freq: "Mensal / Ciclo",
          },
          {
            id: "R11",
            active: true,
            role: "GRUPO",
            merit: "GRUPO",
            name: "Sinergia Equipe Local: Zero Desistência por Espera > 20 min",
            target: "Abandono de Fila < 1,5%",
            points: 140,
            weight: 1.5,
            freq: "Mensal / Ciclo",
          },
        ],
        prizes: {
          RECEPCAO: { goldPts: 1100, silverPts: 850 },
          ATENDENTE: { goldPts: 1250, silverPts: 950 },
          SUPERVISOR: { goldPts: 1200, silverPts: 920 },
          GRUPO: { goldPts: 1050, silverPts: 820 },
        },
      },
      {
        id: "C_2027_1",
        code: "Ciclo 2027.1",
        name: "Ciclo 2027.1 — Operação Verão Paraná & Agilidade Digital",
        startDate: "2027-01-01",
        endDate: "2027-03-31",
        status: "PLANEJADO",
        wasEverActivated: false, // Criado mas ainda não foi ativado -> pode ser apagado!
        version: "v1.4 (Rascunho)",
        lastSaved: "15/11/2026, 17:40",
        author: "Planejamento Operacional & SGC",
        weightIndividual: 55,
        groupMultiplier: 1.3,
        coopRule: "INTEGRADA",
        roles: {
          RECEPCAO: { active: true, minMetric1: 210, minMetric2: 94 },
          ATENDENTE: { active: true, minMetric1: 160, minMetric2: 70 },
          SUPERVISOR: { active: true, minMetric1: 88, minMetric2: 85 },
        },
        rules: [
          {
            id: "R27_1",
            active: true,
            role: "RECEPCAO",
            merit: "INDIVIDUAL",
            name: "Triagem Ultra-Ágil Verão (QR Code e Autoatendimento Assistido)",
            target: "Tempo Recepção ≤ 01m 30s",
            points: 50,
            weight: 2.0,
            freq: "Por Atendimento",
          },
          {
            id: "R27_2",
            active: true,
            role: "ATENDENTE",
            merit: "INDIVIDUAL",
            name: "Satisfação Pós-Checkout em Alta Temporada (NPS Cidadão)",
            target: "Nota 9 ou 10 no Pós-Checkout",
            points: 90,
            weight: 3.0,
            freq: "Por Atendimento",
          },
          {
            id: "R27_3",
            active: true,
            role: "SUPERVISOR",
            merit: "INDIVIDUAL",
            name: "Aplicação Preventiva das Escalas SGC no Litoral e Interior",
            target: "Zero Déficit de Guichês em Pico",
            points: 100,
            weight: 2.0,
            freq: "Semanal",
          },
          {
            id: "R27_4",
            active: true,
            role: "GRUPO",
            merit: "GRUPO",
            name: "Meta Coletiva Verão: TME ≤ 08m 30s + Retenção Digital ≥ 38%",
            target: "SLA Combinado da Central",
            points: 260,
            weight: 3.0,
            freq: "Mensal / Ciclo",
          },
        ],
        prizes: {
          RECEPCAO: { goldPts: 1150, silverPts: 880 },
          ATENDENTE: { goldPts: 1300, silverPts: 980 },
          SUPERVISOR: { goldPts: 1250, silverPts: 950 },
          GRUPO: { goldPts: 1100, silverPts: 860 },
        },
      },
      {
        id: "C_2026_3",
        code: "Ciclo 2026.3",
        name: "Ciclo 2026.3 — Implantação Recepção Gamificada & Triagem",
        startDate: "2026-07-01",
        endDate: "2026-09-30",
        status: "ENCERRADO",
        wasEverActivated: true, // Já ativado e encerrado -> Somente leitura
        version: "v3.0 (Auditado)",
        lastSaved: "30/09/2026, 18:00",
        author: "Diretoria Comercial SANEPAR",
        weightIndividual: 70,
        groupMultiplier: 1.1,
        coopRule: "PARCIAL",
        roles: {
          RECEPCAO: { active: true, minMetric1: 150, minMetric2: 90 },
          ATENDENTE: { active: true, minMetric1: 130, minMetric2: 60 },
          SUPERVISOR: { active: false, minMetric1: 80, minMetric2: 75 },
        },
        rules: [
          {
            id: "R263_1",
            active: true,
            role: "RECEPCAO",
            merit: "INDIVIDUAL",
            name: "Conferência Documental Completa Antes da Liberação para Fila",
            target: "Zero Devolução por Falta de Doc.",
            points: 55,
            weight: 2.0,
            freq: "Diário",
          },
          {
            id: "R263_2",
            active: true,
            role: "RECEPCAO",
            merit: "INDIVIDUAL",
            name: "Orientação Preventiva de Demandas Externas (Prefeitura 156 / Copel)",
            target: "100% Triagem Correta",
            points: 45,
            weight: 1.5,
            freq: "Por Atendimento",
          },
          {
            id: "R263_3",
            active: true,
            role: "ATENDENTE",
            merit: "INDIVIDUAL",
            name: "Nota de Satisfação Pós-Checkout (Avaliação do Cidadão)",
            target: "Média ≥ 4,6 ★",
            points: 75,
            weight: 3.0,
            freq: "Por Atendimento",
          },
          {
            id: "R263_4",
            active: true,
            role: "GRUPO",
            merit: "GRUPO",
            name: "Redução Coletiva de Retrabalho entre Recepção e Guichês",
            target: "Transferências Internas < 5%",
            points: 170,
            weight: 2.0,
            freq: "Mensal / Ciclo",
          },
        ],
        prizes: {
          RECEPCAO: { goldPts: 980, silverPts: 760 },
          ATENDENTE: { goldPts: 1100, silverPts: 840 },
          SUPERVISOR: { goldPts: 1000, silverPts: 800 },
          GRUPO: { goldPts: 920, silverPts: 740 },
        },
      },
      {
        id: "C_2026_2",
        code: "Ciclo 2026.2",
        name: "Ciclo 2026.2 — Piloto Metropolitano Curitiba (Meta TME ≤ 10m)",
        startDate: "2026-04-01",
        endDate: "2026-06-30",
        status: "ENCERRADO",
        wasEverActivated: true, // Já ativado e encerrado -> Somente leitura
        version: "v2.1 (Auditado)",
        lastSaved: "30/06/2026, 17:30",
        author: "Coordenação Metropolitana Curitiba",
        weightIndividual: 75,
        groupMultiplier: 1.2,
        coopRule: "SEGMENTADA",
        roles: {
          RECEPCAO: { active: false, minMetric1: 120, minMetric2: 88 },
          ATENDENTE: { active: true, minMetric1: 125, minMetric2: 55 },
          SUPERVISOR: { active: true, minMetric1: 80, minMetric2: 75 },
        },
        rules: [
          {
            id: "R262_1",
            active: true,
            role: "ATENDENTE",
            merit: "INDIVIDUAL",
            name: "Redução de TMA com Uso do Resumo por Voz Transcrito",
            target: "TMA ≤ 08m 30s",
            points: 60,
            weight: 2.0,
            freq: "Diário",
          },
          {
            id: "R262_2",
            active: true,
            role: "SUPERVISOR",
            merit: "INDIVIDUAL",
            name: "Equilíbrio de Horário de Almoço (Evitar Aumento de 300% na Fila)",
            target: "TME 12h–14h ≤ 12m 00s",
            points: 85,
            weight: 2.0,
            freq: "Diário",
          },
          {
            id: "R262_3",
            active: true,
            role: "GRUPO",
            merit: "GRUPO",
            name: "Meta Coletiva Piloto Curitiba: TME Geral ≤ 10m 00s",
            target: "TME Mensal ≤ 10m 00s",
            points: 200,
            weight: 2.0,
            freq: "Mensal / Ciclo",
          },
        ],
        prizes: {
          RECEPCAO: { goldPts: 900, silverPts: 700 },
          ATENDENTE: { goldPts: 1020, silverPts: 790 },
          SUPERVISOR: { goldPts: 1050, silverPts: 810 },
          GRUPO: { goldPts: 900, silverPts: 720 },
        },
      },
    ];
  }

  let cyclesDb = getInitialCyclesDb();

  const state = {
    activeCycleId: "C_2026_4",
    roleFilter: "ALL",
    snapshotCycleId: null,
    simRole: "ATENDENTE",
    simIndPct: 88,
    simGrpPct: 92,
    simCollectiveHit: true,
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function getActiveCycle() {
    return cyclesDb.find((c) => c.id === state.activeCycleId) || cyclesDb[0];
  }

  // Ajuste 1: Ciclos com "Histórico Encerrado" (status === "ENCERRADO") podem ser visualizados mas NÃO podem ser alterados
  function isCycleReadOnly(cycleObj) {
    const c = cycleObj || getActiveCycle();
    return c.status === "ENCERRADO";
  }

  function currentHHMMSS() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  }

  function currentDateBr() {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, "0");
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const yyyy = now.getFullYear();
    const hh = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    return `${dd}/${mm}/${yyyy}, ${hh}:${min}`;
  }

  function formatDateBr(isoDate) {
    if (!isoDate) return "—";
    const parts = isoDate.split("-");
    if (parts.length !== 3) return isoDate;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  function formatNum(n) {
    return Number(n).toLocaleString("pt-BR");
  }

  setInterval(() => {
    $("#live-clock-display").textContent = currentHHMMSS();
  }, 1000);

  // =========================================================================
  // BARRA DE SELEÇÃO, EDIÇÃO, ATIVAÇÃO, ENCERRAMENTO E EXCLUSÃO DE CICLO
  // =========================================================================
  function renderCycleSelectorBar() {
    const c = getActiveCycle();
    const readOnly = isCycleReadOnly(c);
    const sel = $("#select-active-cycle");
    sel.innerHTML = "";

    cyclesDb.forEach((cyc) => {
      const opt = document.createElement("option");
      opt.value = cyc.id;
      const stLabel =
        cyc.status === "VIGENTE"
          ? "🟢 Vigente"
          : cyc.status === "PLANEJADO"
          ? "🔵 Planejado (Não Ativado)"
          : "⚪ Histórico Encerrado (Somente Leitura)";
      opt.textContent = `${cyc.code} (${stLabel}) — ${formatDateBr(cyc.startDate)} a ${formatDateBr(cyc.endDate)}`;
      sel.appendChild(opt);
    });

    sel.value = c.id;
    $("#input-cycle-name").value = c.name;
    $("#input-cycle-start").value = c.startDate;
    $("#input-cycle-end").value = c.endDate;

    // Ajuste 3: Se o ciclo já chegou a ser ativado (wasEverActivated), ele não pode voltar para PLANEJADO, só pode ser encerrado.
    const statusSel = $("#select-cycle-status");
    const optPlanejado = statusSel.querySelector('option[value="PLANEJADO"]');
    if (optPlanejado) {
      optPlanejado.disabled = Boolean(c.wasEverActivated);
    }
    statusSel.value = c.status;

    // Ajuste 1: Bloqueia campos se o ciclo estiver com "Histórico Encerrado"
    $("#input-cycle-name").disabled = readOnly;
    $("#input-cycle-start").disabled = readOnly;
    $("#input-cycle-end").disabled = readOnly;
    statusSel.disabled = readOnly;
    $("#btn-save-cycle").disabled = readOnly;

    $("#cycle-readonly-banner").classList.toggle("hidden", !readOnly);

    // Ajuste 3: Botões de ciclo não ativado (Ativar ou Apagar) vs. ciclo ativado (só pode ser Encerrado)
    const canDelete = !c.wasEverActivated && c.status === "PLANEJADO";
    const canActivate = !c.wasEverActivated && c.status === "PLANEJADO";
    const canClose = c.wasEverActivated && c.status === "VIGENTE";

    $("#btn-delete-cycle").classList.toggle("hidden", !canDelete);
    $("#btn-activate-cycle").classList.toggle("hidden", !canActivate);
    $("#btn-close-cycle").classList.toggle("hidden", !canClose);

    const stText =
      c.status === "VIGENTE"
        ? "Vigente"
        : c.status === "PLANEJADO"
        ? "Planejado"
        : "Histórico Encerrado • Somente Leitura";
    $("#top-active-cycle-badge").textContent = `${c.code} (${stText})`;
    $("#block1-cycle-indicator").textContent = readOnly
      ? `🔒 Visualizando ${c.code} (Histórico Encerrado — Inalterável)`
      : `Regras independentes do ${c.code}`;
    $("#game-cycle-version-lbl").textContent = `Versão da Regra: ${c.version}`;

    const badge = $("#game-cycle-status-badge");
    if (c.status === "VIGENTE") {
      badge.className = "tag tag-green";
      badge.textContent = `${c.code} • Ciclo Vigente em Operação`;
    } else if (c.status === "PLANEJADO") {
      badge.className = "tag tag-blue";
      badge.textContent = `${c.code} • Ciclo Planejado (Ainda Não Ativado)`;
    } else {
      badge.className = "tag tag-amber";
      badge.textContent = `${c.code} • Histórico Encerrado (Somente Visualização)`;
    }
  }

  $("#select-active-cycle").addEventListener("change", (e) => {
    state.activeCycleId = e.target.value;
    $("#cycle-save-feedback").classList.add("hidden");
    refreshAll();
  });

  $("#input-cycle-name").addEventListener("input", (e) => {
    const c = getActiveCycle();
    if (isCycleReadOnly(c)) return;
    c.name = e.target.value;
    renderHistoryTable();
  });

  $("#input-cycle-start").addEventListener("change", (e) => {
    const c = getActiveCycle();
    if (isCycleReadOnly(c)) return;
    c.startDate = e.target.value;
    renderCycleSelectorBar();
    renderHistoryTable();
  });

  $("#input-cycle-end").addEventListener("change", (e) => {
    const c = getActiveCycle();
    if (isCycleReadOnly(c)) return;
    c.endDate = e.target.value;
    renderCycleSelectorBar();
    renderHistoryTable();
  });

  $("#select-cycle-status").addEventListener("change", (e) => {
    const c = getActiveCycle();
    if (isCycleReadOnly(c)) return;
    const nextStatus = e.target.value;

    // Se já foi ativado, não pode voltar para PLANEJADO
    if (c.wasEverActivated && nextStatus === "PLANEJADO") {
      e.target.value = c.status;
      return;
    }

    if (nextStatus === "VIGENTE") {
      c.wasEverActivated = true;
    }
    if (nextStatus === "ENCERRADO") {
      c.wasEverActivated = true;
      c.lastSaved = `Encerrado em ${currentDateBr()}`;
    }

    c.status = nextStatus;
    refreshAll();
  });

  // Ajuste 3: Função para ativar um ciclo planejado (a partir daí não pode mais ser apagado, apenas encerrado)
  function activateCycleById(cycleId) {
    const target = cyclesDb.find((c) => c.id === cycleId);
    if (!target || target.status === "ENCERRADO") return;

    target.status = "VIGENTE";
    target.wasEverActivated = true;
    target.lastSaved = `Ativado em ${currentDateBr()}`;
    state.activeCycleId = target.id;
    refreshAll();

    const fb = $("#cycle-save-feedback");
    fb.innerHTML = `🟢 <strong>${target.code} foi ativado com sucesso!</strong> Como este ciclo entrou em vigor, ele agora faz parte do histórico auditável e não pode mais ser apagado — apenas encerrado ao término de sua vigência.`;
    fb.classList.remove("hidden");
  }

  // Ajuste 3: Função para encerrar um ciclo que já foi ativado (torna-se Histórico Encerrado somente leitura)
  function closeActivatedCycleById(cycleId) {
    const target = cyclesDb.find((c) => c.id === cycleId);
    if (!target || target.status === "ENCERRADO") return;

    target.status = "ENCERRADO";
    target.wasEverActivated = true;
    target.version = target.version.includes("Auditado")
      ? target.version
      : `${target.version} (Encerrado/Auditado)`;
    target.lastSaved = `Encerrado em ${currentDateBr()}`;
    state.activeCycleId = target.id;
    refreshAll();

    const fb = $("#cycle-save-feedback");
    fb.innerHTML = `🔒 <strong>${target.code} foi encerrado e arquivado no Histórico!</strong> A partir de agora suas regras podem ser livremente visualizadas e consultadas, mas não podem mais ser alteradas.`;
    fb.classList.remove("hidden");
  }

  // Ajuste 3: Função para apagar um ciclo que foi criado mas NÃO chegou a ser ativado
  function deleteUnactivatedCycleById(cycleId) {
    const target = cyclesDb.find((c) => c.id === cycleId);
    if (!target) return;

    if (target.wasEverActivated || target.status !== "PLANEJADO") {
      const fb = $("#cycle-save-feedback");
      fb.innerHTML = `⚠️ <strong>Operação bloqueada:</strong> O <strong>${target.code}</strong> já chegou a ser ativado e, por regra de governança, ciclos ativados não podem ser apagados — apenas encerrados.`;
      fb.classList.remove("hidden");
      return;
    }

    const deletedCode = target.code;
    cyclesDb = cyclesDb.filter((c) => c.id !== cycleId);
    if (state.activeCycleId === cycleId) {
      state.activeCycleId = cyclesDb[0].id;
    }
    if (state.snapshotCycleId === cycleId) {
      state.snapshotCycleId = null;
      $("#cycle-snapshot-drawer").classList.add("hidden");
    }

    refreshAll();

    const fb = $("#cycle-save-feedback");
    fb.innerHTML = `🗑️ <strong>${deletedCode} (que ainda não havia sido ativado) foi apagado com sucesso!</strong>`;
    fb.classList.remove("hidden");
  }

  $("#btn-activate-cycle").addEventListener("click", () => {
    activateCycleById(state.activeCycleId);
  });

  $("#btn-close-cycle").addEventListener("click", () => {
    closeActivatedCycleById(state.activeCycleId);
  });

  $("#btn-delete-cycle").addEventListener("click", () => {
    deleteUnactivatedCycleById(state.activeCycleId);
  });

  // Criar Novo Ciclo (Inicia como PLANEJADO e wasEverActivated: false, podendo ser editado ou apagado enquanto não for ativado)
  function cloneCycleToNew(sourceCycle) {
    const nextNum = cyclesDb.length + 1;
    const newCode = `Ciclo 2027.${nextNum - 2}`;
    const cloned = JSON.parse(JSON.stringify(sourceCycle));
    cloned.id = `C_CUSTOM_${Date.now()}`;
    cloned.code = newCode;
    cloned.name = `${newCode} — Novo Ciclo Estratégico (Baseado no ${sourceCycle.code})`;
    cloned.startDate = "2027-04-01";
    cloned.endDate = "2027-06-30";
    cloned.status = "PLANEJADO";
    cloned.wasEverActivated = false; // Nunca foi ativado -> pode ser apagado!
    cloned.version = "v1.0 (Rascunho Não Ativado)";
    cloned.lastSaved = currentDateBr();
    cloned.author = "Gestão Estratégica SANEPAR";

    cyclesDb.unshift(cloned);
    state.activeCycleId = cloned.id;
    refreshAll();

    const fb = $("#cycle-save-feedback");
    fb.innerHTML = `✨ <strong>Novo ciclo criado (${cloned.code}) como Planejado / Não Ativado!</strong> Você pode parametrizar suas regras livremente, ativá-lo quando desejar ou apagá-lo caso desista antes da ativação.`;
    fb.classList.remove("hidden");
  }

  $("#btn-new-cycle").addEventListener("click", () => {
    cloneCycleToNew(getActiveCycle());
  });

  $("#btn-save-cycle").addEventListener("click", () => {
    const c = getActiveCycle();
    if (isCycleReadOnly(c)) return;

    const verMatch = c.version.match(/v(\d+)\.(\d+)/);
    if (verMatch) {
      c.version = `v${verMatch[1]}.${Number(verMatch[2]) + 1}`;
    } else {
      c.version = "v1.1";
    }
    c.lastSaved = `Hoje, ${currentHHMMSS().slice(0, 5)}`;

    refreshAll();

    const fb = $("#cycle-save-feedback");
    fb.innerHTML = `💾 <strong>Regras do ${c.code} salvas no Histórico de Ciclos (${c.version}) às ${currentHHMMSS()}!</strong> Mérito Individual: <strong>${c.weightIndividual}%</strong> • Mérito do Grupo: <strong>${100 - c.weightIndividual}%</strong>.`;
    fb.classList.remove("hidden");
  });

  // =========================================================================
  // KPIS DO TOPO E SÍNTESE DO MASCOTE AQUALINO
  // =========================================================================
  function getActiveRoleNames(c) {
    const names = [];
    if (c.roles.RECEPCAO.active) names.push("Recepcionistas");
    if (c.roles.ATENDENTE.active) names.push("Atendentes");
    if (c.roles.SUPERVISOR.active) names.push("Supervisores Locais");
    return names;
  }

  function renderTopKpisAndAqualino() {
    const c = getActiveCycle();
    const readOnly = isCycleReadOnly(c);
    const indW = c.weightIndividual;
    const grpW = 100 - indW;

    $("#kpi-merit-split").textContent = `${indW}% / ${grpW}%`;
    $("#kpi-merit-desc").textContent = `${indW}% Mérito Individual • ${grpW}% Mérito do Grupo`;
    $("#kpi-merit-tag").textContent =
      indW >= 70 ? "Foco Individual" : grpW >= 40 ? "Foco Coletivo" : "Equilíbrio Ativo";

    const roleNames = getActiveRoleNames(c);
    $("#kpi-roles-count").textContent = `${roleNames.length} ${roleNames.length === 1 ? "Perfil" : "Perfis"}`;
    $("#kpi-roles-list").textContent = roleNames.length
      ? roleNames.join(", ")
      : "Nenhum perfil habilitado";
    $("#kpi-roles-tag").className = roleNames.length > 0 ? "tag tag-green" : "tag tag-red";
    $("#kpi-roles-tag").textContent = `${roleNames.length} de 3 ativos`;

    const activeRules = c.rules.filter((r) => r.active);
    const indRules = activeRules.filter((r) => r.merit === "INDIVIDUAL").length;
    const grpRules = activeRules.filter((r) => r.merit === "GRUPO").length;

    $("#kpi-rules-count").textContent = `${activeRules.length} Regras`;
    $("#kpi-rules-breakdown").textContent = `${indRules} Individuais + ${grpRules} Coletivas (Grupo)`;

    $("#kpi-cycles-total").textContent = `${cyclesDb.length} Ciclos`;
    $("#kpi-last-saved").textContent = c.lastSaved;

    const bubble = $("#aqualino-game-bubble");
    if (!bubble.classList.contains("answering")) {
      const rolesText = roleNames.length ? roleNames.join(", ") : "nenhum perfil selecionado";
      const modeNotice = readOnly
        ? `🔒 <em>Este ciclo está com Histórico Encerrado (somente visualização).</em>`
        : !c.wasEverActivated
        ? `🔵 <em>Este ciclo ainda não foi ativado (pode ser editado, ativado ou apagado).</em>`
        : `🟢 <em>Ciclo ativado em vigor (pode ser editado ou encerrado).</em>`;
      bubble.innerHTML = `💧 <strong>Resumo do Aqualino para o ${c.code}:</strong> Concorrem aos prêmios: <strong>${rolesText}</strong>. A nota final combina <strong>${indW}% de Mérito Individual</strong> com <strong>${grpW}% de Mérito do Grupo (Unidade)</strong> e multiplicador coletivo de <strong>${c.groupMultiplier.toFixed(2).replace(".", ",")}x</strong>. ${modeNotice}`;
    }
  }

  // =========================================================================
  // BLOCO 1: PERFIS CONCORRENTES E PONDERAÇÃO MÉRITO INDIVIDUAL VS. GRUPO
  // =========================================================================
  function renderRolesAndWeights() {
    const c = getActiveCycle();
    const readOnly = isCycleReadOnly(c);

    // Recepcionistas
    $("#chk-role-recepcao").checked = c.roles.RECEPCAO.active;
    $("#chk-role-recepcao").disabled = readOnly;
    $("#input-min-att-recepcao").value = c.roles.RECEPCAO.minMetric1;
    $("#input-min-att-recepcao").disabled = readOnly;
    $("#input-min-pres-recepcao").value = c.roles.RECEPCAO.minMetric2;
    $("#input-min-pres-recepcao").disabled = readOnly;
    $("#role-card-recepcao").classList.toggle("disabled-role", !c.roles.RECEPCAO.active);
    $("#badge-role-recepcao").className = c.roles.RECEPCAO.active ? "tag tag-green" : "tag tag-amber";
    $("#badge-role-recepcao").textContent = c.roles.RECEPCAO.active ? "Concorrendo ✓" : "Não concorre neste ciclo";

    // Atendentes
    $("#chk-role-atendente").checked = c.roles.ATENDENTE.active;
    $("#chk-role-atendente").disabled = readOnly;
    $("#input-min-att-atendente").value = c.roles.ATENDENTE.minMetric1;
    $("#input-min-att-atendente").disabled = readOnly;
    $("#input-min-eval-atendente").value = c.roles.ATENDENTE.minMetric2;
    $("#input-min-eval-atendente").disabled = readOnly;
    $("#role-card-atendente").classList.toggle("disabled-role", !c.roles.ATENDENTE.active);
    $("#badge-role-atendente").className = c.roles.ATENDENTE.active ? "tag tag-green" : "tag tag-amber";
    $("#badge-role-atendente").textContent = c.roles.ATENDENTE.active ? "Concorrendo ✓" : "Não concorre neste ciclo";

    // Supervisores
    $("#chk-role-supervisor").checked = c.roles.SUPERVISOR.active;
    $("#chk-role-supervisor").disabled = readOnly;
    $("#input-min-sla-supervisor").value = c.roles.SUPERVISOR.minMetric1;
    $("#input-min-sla-supervisor").disabled = readOnly;
    $("#input-min-team-supervisor").value = c.roles.SUPERVISOR.minMetric2;
    $("#input-min-team-supervisor").disabled = readOnly;
    $("#role-card-supervisor").classList.toggle("disabled-role", !c.roles.SUPERVISOR.active);
    $("#badge-role-supervisor").className = c.roles.SUPERVISOR.active ? "tag tag-green" : "tag tag-amber";
    $("#badge-role-supervisor").textContent = c.roles.SUPERVISOR.active ? "Concorrendo ✓" : "Não concorre neste ciclo";

    // Ponderação Individual vs Grupo
    const indW = c.weightIndividual;
    const grpW = 100 - indW;
    $("#range-merit-individual").value = String(indW);
    $("#range-merit-individual").disabled = readOnly;
    $("#lbl-weight-ind").textContent = `${indW}%`;
    $("#lbl-weight-grp").textContent = `${grpW}%`;
    $("#bar-merit-ind").style.width = `${indW}%`;
    $("#bar-merit-ind").textContent = `${indW}% Individual`;
    $("#bar-merit-grp").style.width = `${grpW}%`;
    $("#bar-merit-grp").textContent = `${grpW}% Grupo`;

    $("#select-group-multiplier").value = c.groupMultiplier.toFixed(2);
    $("#select-group-multiplier").disabled = readOnly;
    $("#select-coop-rule").value = c.coopRule;
    $("#select-coop-rule").disabled = readOnly;

    $("#formula-preview-banner").innerHTML = `
      <strong>📐 Fórmula Ativa no ${c.code}:</strong>
      <code>Pontuação Final = [(Pontos Individuais × ${indW}%) + (Pontos do Grupo × ${grpW}%)] × Multiplicador Coletivo (${c.groupMultiplier.toFixed(2).replace(".", ",")}x)</code>
    `;
  }

  $("#chk-role-recepcao").addEventListener("change", (e) => {
    if (isCycleReadOnly()) return;
    getActiveCycle().roles.RECEPCAO.active = e.target.checked;
    refreshAll();
  });
  $("#chk-role-atendente").addEventListener("change", (e) => {
    if (isCycleReadOnly()) return;
    getActiveCycle().roles.ATENDENTE.active = e.target.checked;
    refreshAll();
  });
  $("#chk-role-supervisor").addEventListener("change", (e) => {
    if (isCycleReadOnly()) return;
    getActiveCycle().roles.SUPERVISOR.active = e.target.checked;
    refreshAll();
  });

  $("#input-min-att-recepcao").addEventListener("input", (e) => {
    if (isCycleReadOnly()) return;
    getActiveCycle().roles.RECEPCAO.minMetric1 = Number(e.target.value);
  });
  $("#input-min-pres-recepcao").addEventListener("input", (e) => {
    if (isCycleReadOnly()) return;
    getActiveCycle().roles.RECEPCAO.minMetric2 = Number(e.target.value);
  });
  $("#input-min-att-atendente").addEventListener("input", (e) => {
    if (isCycleReadOnly()) return;
    getActiveCycle().roles.ATENDENTE.minMetric1 = Number(e.target.value);
  });
  $("#input-min-eval-atendente").addEventListener("input", (e) => {
    if (isCycleReadOnly()) return;
    getActiveCycle().roles.ATENDENTE.minMetric2 = Number(e.target.value);
  });
  $("#input-min-sla-supervisor").addEventListener("input", (e) => {
    if (isCycleReadOnly()) return;
    getActiveCycle().roles.SUPERVISOR.minMetric1 = Number(e.target.value);
  });
  $("#input-min-team-supervisor").addEventListener("input", (e) => {
    if (isCycleReadOnly()) return;
    getActiveCycle().roles.SUPERVISOR.minMetric2 = Number(e.target.value);
  });

  $("#range-merit-individual").addEventListener("input", (e) => {
    if (isCycleReadOnly()) return;
    getActiveCycle().weightIndividual = Number(e.target.value);
    renderRolesAndWeights();
    renderTopKpisAndAqualino();
    renderSimulator();
    renderHistoryTable();
  });

  $("#select-group-multiplier").addEventListener("change", (e) => {
    if (isCycleReadOnly()) return;
    getActiveCycle().groupMultiplier = Number(e.target.value);
    renderRolesAndWeights();
    renderTopKpisAndAqualino();
    renderSimulator();
    renderHistoryTable();
  });

  $("#select-coop-rule").addEventListener("change", (e) => {
    if (isCycleReadOnly()) return;
    getActiveCycle().coopRule = e.target.value;
  });

  // =========================================================================
  // BLOCO 2: TABELA DE REGRAS PARAMETRIZÁVEIS DO CICLO
  // =========================================================================
  const ROLE_BADGE_MAP = {
    RECEPCAO: { label: "🛎️ Recepcionistas", cls: "tag-teal" },
    ATENDENTE: { label: "🎧 Atendentes (Guichê)", cls: "tag-blue" },
    SUPERVISOR: { label: "📊 Supervisores Locais", cls: "tag-amber" },
    GRUPO: { label: "🤝 Equipe da Unidade (Grupo)", cls: "tag-green" },
  };

  $$("#rules-category-tabs .chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      $$("#rules-category-tabs .chip").forEach((b) => b.classList.remove("active"));
      chip.classList.add("active");
      state.roleFilter = chip.dataset.roleFilter;
      renderRulesTable();
    });
  });

  function renderRulesTable() {
    const c = getActiveCycle();
    const readOnly = isCycleReadOnly(c);
    const tbody = $("#rules-param-tbody");
    tbody.innerHTML = "";

    $("#rules-section-title").textContent = readOnly
      ? `Critérios, Metas, Pontos e Pesos — ${c.code} (🔒 Somente Visualização)`
      : `Critérios, Metas, Pontos e Pesos — ${c.code}`;

    // Oculta o formulário de adicionar regra quando o ciclo está encerrado (somente leitura)
    const addPanel = $(".add-rule-panel");
    if (addPanel) {
      addPanel.classList.toggle("hidden", readOnly);
    }

    const filtered = c.rules.filter(
      (r) => state.roleFilter === "ALL" || r.role === state.roleFilter
    );

    filtered.forEach((rule) => {
      const rBadge = ROLE_BADGE_MAP[rule.role] || ROLE_BADGE_MAP.GRUPO;
      const tr = document.createElement("tr");
      if (!rule.active) tr.classList.add("rule-disabled");

      tr.innerHTML = `
        <td>
          <input type="checkbox" class="chk-rule-active" ${rule.active ? "checked" : ""} ${readOnly ? "disabled" : ""} title="Ativar ou desativar regra neste ciclo" />
        </td>
        <td><span class="tag ${rBadge.cls}">${rBadge.label}</span></td>
        <td>
          <span class="tag ${rule.merit === "INDIVIDUAL" ? "tag-blue" : "tag-teal"}">
            ${rule.merit === "INDIVIDUAL" ? "🏅 Mérito Individual" : "🤝 Mérito do Grupo"}
          </span>
        </td>
        <td><strong>${rule.name}</strong></td>
        <td>
          <input type="text" class="inline-input-target" value="${rule.target}" ${readOnly ? "disabled" : ""} title="Meta alvo desta regra" />
        </td>
        <td>
          <input type="number" class="inline-input-pts" min="5" max="1000" step="5" value="${rule.points}" ${readOnly ? "disabled" : ""} title="Pontos base (XP)" />
        </td>
        <td>
          <select class="inline-select-weight" ${readOnly ? "disabled" : ""} title="Peso/multiplicador da regra">
            <option value="1" ${Number(rule.weight) === 1 ? "selected" : ""}>1,0x (Padrão)</option>
            <option value="1.5" ${Number(rule.weight) === 1.5 ? "selected" : ""}>1,5x (Médio)</option>
            <option value="2" ${Number(rule.weight) === 2 ? "selected" : ""}>2,0x (Alto)</option>
            <option value="3" ${Number(rule.weight) === 3 ? "selected" : ""}>3,0x (Maior Peso ★)</option>
          </select>
        </td>
        <td>${rule.freq}</td>
        <td>
          ${
            readOnly
              ? `<span class="tag tag-amber">🔒 Fixo</span>`
              : `<button type="button" class="btn btn-secondary btn-sm btn-del-rule" title="Remover regra deste ciclo">🗑️ Remover</button>`
          }
        </td>
      `;

      if (!readOnly) {
        tr.querySelector(".chk-rule-active").addEventListener("change", (e) => {
          rule.active = e.target.checked;
          renderRulesTable();
          renderTopKpisAndAqualino();
          renderSimulator();
          renderHistoryTable();
        });

        tr.querySelector(".inline-input-target").addEventListener("input", (e) => {
          rule.target = e.target.value;
        });

        tr.querySelector(".inline-input-pts").addEventListener("input", (e) => {
          rule.points = Math.max(0, Number(e.target.value) || 0);
          renderSimulator();
        });

        tr.querySelector(".inline-select-weight").addEventListener("change", (e) => {
          rule.weight = Number(e.target.value);
          renderSimulator();
        });

        const delBtn = tr.querySelector(".btn-del-rule");
        if (delBtn) {
          delBtn.addEventListener("click", () => {
            c.rules = c.rules.filter((item) => item.id !== rule.id);
            renderRulesTable();
            renderTopKpisAndAqualino();
            renderSimulator();
            renderHistoryTable();
          });
        }
      }

      tbody.appendChild(tr);
    });
  }

  $("#new-rule-role").addEventListener("change", (e) => {
    if (e.target.value === "GRUPO") {
      $("#new-rule-merit").value = "GRUPO";
    } else {
      $("#new-rule-merit").value = "INDIVIDUAL";
    }
  });

  $("#form-add-rule").addEventListener("submit", (e) => {
    e.preventDefault();
    const c = getActiveCycle();
    if (isCycleReadOnly(c)) return;

    const role = $("#new-rule-role").value;
    const merit = $("#new-rule-merit").value;
    const name = $("#new-rule-name").value.trim();
    const target = $("#new-rule-target").value.trim();
    const points = Number($("#new-rule-points").value) || 40;
    const weight = Number($("#new-rule-weight").value) || 1.0;
    const freq = $("#new-rule-freq").value;

    if (!name || !target) return;

    c.rules.push({
      id: `R_NEW_${Date.now()}`,
      active: true,
      role,
      merit,
      name,
      target,
      points,
      weight,
      freq,
    });

    $("#new-rule-name").value = "";
    $("#new-rule-target").value = "";

    renderRulesTable();
    renderTopKpisAndAqualino();
    renderSimulator();
    renderHistoryTable();
  });

  // =========================================================================
  // BLOCO 3.1: FAIXAS DE PONTUAÇÃO POR PERFIL E COLETIVO (SEM DESCRIÇÃO DO PRÊMIO)
  // =========================================================================
  function renderPrizesCatalog() {
    const c = getActiveCycle();
    const readOnly = isCycleReadOnly(c);
    const grid = $("#prizes-config-grid");
    grid.innerHTML = "";

    const categories = [
      {
        key: "RECEPCAO",
        title: "🛎️ Recepcionistas",
        isActive: c.roles.RECEPCAO.active,
        tagText: c.roles.RECEPCAO.active ? "Mérito Individual + Grupo" : "Inativo no Ciclo",
      },
      {
        key: "ATENDENTE",
        title: "🎧 Atendentes (Guichê)",
        isActive: c.roles.ATENDENTE.active,
        tagText: c.roles.ATENDENTE.active ? "Mérito Individual + Grupo" : "Inativo no Ciclo",
      },
      {
        key: "SUPERVISOR",
        title: "📊 Supervisores Locais",
        isActive: c.roles.SUPERVISOR.active,
        tagText: c.roles.SUPERVISOR.active ? "Mérito Individual + Grupo" : "Inativo no Ciclo",
      },
      {
        key: "GRUPO",
        title: "🤝 Equipe da Unidade (Grupo)",
        isActive: true,
        tagText: "100% Mérito do Grupo",
      },
    ];

    categories.forEach((cat) => {
      const pObj = c.prizes[cat.key];
      const div = document.createElement("div");
      div.className = "prize-card";
      if (!cat.isActive) div.style.opacity = "0.6";

      // Ajuste 4: Exibe apenas as faixas de pontuação mínima exigidas para habilitação (sem descrição do item de prêmio)
      div.innerHTML = `
        <div class="prize-card-head">
          <strong>${cat.title}</strong>
          <span class="tag ${cat.isActive ? "tag-green" : "tag-amber"}">${cat.tagText}</span>
        </div>

        <div class="prize-tier-row">
          <div class="prize-tier-top">
            <span>🥇 Faixa Ouro (1º Nível de Premiação)</span>
            <label>
              Pontuação mín. (pts):
              <input type="number" class="inp-gold-pts" min="100" max="5000" step="20" value="${pObj.goldPts}" ${readOnly ? "disabled" : ""} />
            </label>
          </div>
        </div>

        <div class="prize-tier-row">
          <div class="prize-tier-top">
            <span>🥈 Faixa Prata (2º Nível de Premiação)</span>
            <label>
              Pontuação mín. (pts):
              <input type="number" class="inp-silver-pts" min="100" max="5000" step="20" value="${pObj.silverPts}" ${readOnly ? "disabled" : ""} />
            </label>
          </div>
        </div>
      `;

      if (!readOnly) {
        div.querySelector(".inp-gold-pts").addEventListener("input", (e) => {
          pObj.goldPts = Number(e.target.value) || 0;
          renderSimulator();
        });
        div.querySelector(".inp-silver-pts").addEventListener("input", (e) => {
          pObj.silverPts = Number(e.target.value) || 0;
          renderSimulator();
        });
      }

      grid.appendChild(div);
    });
  }

  // =========================================================================
  // BLOCO 3.2: SIMULADOR INTERATIVO DE PONTUAÇÃO E HABILITAÇÃO NO CICLO
  // =========================================================================
  function renderSimulator() {
    const c = getActiveCycle();
    const roleKey = state.simRole;
    const indPct = state.simIndPct / 100;
    const grpPct = state.simGrpPct / 100;

    $("#sim-lbl-ind-pct").textContent = `${state.simIndPct}% de cumprimento`;
    $("#sim-lbl-grp-pct").textContent = `${state.simGrpPct}% das metas da agência`;

    const isRoleActive = c.roles[roleKey] && c.roles[roleKey].active;

    const roleRules = c.rules.filter((r) => r.active && r.role === roleKey);
    const baseRolePool = roleRules.reduce((acc, r) => acc + r.points * r.weight * 3.8, 0);
    const rawIndScore = Math.round((baseRolePool || 950) * indPct);

    const groupRules = c.rules.filter((r) => r.active && r.role === "GRUPO");
    const baseGroupPool = groupRules.reduce((acc, r) => acc + r.points * r.weight, 0);
    const rawGrpScore = Math.round((baseGroupPool || 900) * grpPct);

    const indW = c.weightIndividual / 100;
    const grpW = (100 - c.weightIndividual) / 100;

    const weightedInd = Math.round(rawIndScore * indW);
    const weightedGrp = Math.round(rawGrpScore * grpW);

    const mult = state.simCollectiveHit ? c.groupMultiplier : 1.0;
    const finalScore = Math.round((weightedInd + weightedGrp) * mult);

    $("#sim-val-ind-raw").textContent = `${formatNum(rawIndScore)} pts`;
    $("#sim-val-ind-weighted").textContent = `Ponderado (${c.weightIndividual}%): ${formatNum(weightedInd)} pts`;

    $("#sim-val-grp-raw").textContent = `${formatNum(rawGrpScore)} pts`;
    $("#sim-val-grp-weighted").textContent = `Ponderado (${100 - c.weightIndividual}%): ${formatNum(weightedGrp)} pts`;

    $("#sim-val-final-score").textContent = `${formatNum(finalScore)} pts`;
    $("#sim-val-mult-applied").textContent = state.simCollectiveHit
      ? `Inclui Bônus Coletivo ${mult.toFixed(2).replace(".", ",")}x`
      : "Sem Bônus Extra (Meta Coletiva não batida)";

    const outcomeEl = $("#sim-prize-outcome");
    const prizeCfg = c.prizes[roleKey];

    if (!isRoleActive) {
      outcomeEl.innerHTML = `
        ⚠️ <strong>Perfil não habilitado no ${c.code}:</strong> O perfil selecionado está marcado como <em>"Não concorre neste ciclo"</em> no Bloco 1.
      `;
      return;
    }

    // Ajuste 4: Não exibe descrição de prêmio, apenas a faixa conquistada (Ouro / Prata / Em Evolução)
    if (finalScore >= prizeCfg.goldPts) {
      outcomeEl.innerHTML = `
        🏆 <strong>Resultado Simulado — HABILITADO NA FAIXA OURO (${formatNum(finalScore)} pts ≥ ${formatNum(prizeCfg.goldPts)} pts):</strong><br/>
        O profissional atingiu a pontuação mínima exigida para a <strong>Faixa Ouro (1º Nível)</strong> neste ciclo.${state.simCollectiveHit ? `<br/>🤝 <strong>Mérito do Grupo:</strong> Unidade também habilitada na Faixa Coletiva (≥ ${formatNum(c.prizes.GRUPO.goldPts)} pts).` : ""}
      `;
    } else if (finalScore >= prizeCfg.silverPts) {
      outcomeEl.innerHTML = `
        🥈 <strong>Resultado Simulado — HABILITADO NA FAIXA PRATA (${formatNum(finalScore)} pts ≥ ${formatNum(prizeCfg.silverPts)} pts):</strong><br/>
        O profissional atingiu a pontuação mínima para a <strong>Faixa Prata (2º Nível)</strong>.<br/>
        <span class="text-muted">Faltam ${formatNum(prizeCfg.goldPts - finalScore)} pts para alcançar a Faixa Ouro (${formatNum(prizeCfg.goldPts)} pts).</span>
      `;
    } else {
      outcomeEl.innerHTML = `
        📈 <strong>Em Evolução no Ciclo (${formatNum(finalScore)} pts):</strong> Faltam <strong>${formatNum(prizeCfg.silverPts - finalScore)} pts</strong> para alcançar a Faixa Prata (${formatNum(prizeCfg.silverPts)} pts) neste ciclo.
      `;
    }
  }

  $("#sim-select-role").addEventListener("change", (e) => {
    state.simRole = e.target.value;
    renderSimulator();
  });

  $("#sim-range-ind").addEventListener("input", (e) => {
    state.simIndPct = Number(e.target.value);
    renderSimulator();
  });

  $("#sim-range-grp").addEventListener("input", (e) => {
    state.simGrpPct = Number(e.target.value);
    renderSimulator();
  });

  $("#sim-chk-collective-goal").addEventListener("change", (e) => {
    state.simCollectiveHit = e.target.checked;
    renderSimulator();
  });

  // =========================================================================
  // BLOCO 4: HISTÓRICO DE REGRAS DE CADA CICLO (REPOSITÓRIO E SNAPSHOT)
  // =========================================================================
  function renderHistoryTable() {
    const tbody = $("#cycles-history-tbody");
    tbody.innerHTML = "";

    cyclesDb.forEach((cyc) => {
      const isCurrent = cyc.id === state.activeCycleId;
      const readOnly = isCycleReadOnly(cyc);
      const canDelete = !cyc.wasEverActivated && cyc.status === "PLANEJADO";
      const canClose = cyc.wasEverActivated && cyc.status === "VIGENTE";
      const canActivate = !cyc.wasEverActivated && cyc.status === "PLANEJADO";

      const roleNames = getActiveRoleNames(cyc);
      const activeRules = cyc.rules.filter((r) => r.active);
      const topWeightRule = activeRules.reduce(
        (best, r) => (r.weight > (best ? best.weight : 0) ? r : best),
        activeRules[0]
      );

      const stBadge =
        cyc.status === "VIGENTE"
          ? `<span class="tag tag-green">🟢 Vigente (Ativado)</span>`
          : cyc.status === "PLANEJADO"
          ? `<span class="tag tag-blue">🔵 Planejado (Não Ativado)</span>`
          : `<span class="tag tag-amber">⚪ Histórico Encerrado</span>`;

      const tr = document.createElement("tr");
      if (isCurrent) {
        tr.style.background = "#f0f9ff";
      }

      const loadBtnLabel = isCurrent
        ? readOnly
          ? "👁️ Visualizando (Fixo)"
          : "✓ Em Edição"
        : readOnly
        ? "👁️ Visualizar Ciclo"
        : "📂 Carregar Ciclo";

      tr.innerHTML = `
        <td>
          <strong>${cyc.name}</strong>
          ${isCurrent ? `<span class="tag tag-teal" style="margin-left:6px;">Carregado na Tela</span>` : ""}
        </td>
        <td>${formatDateBr(cyc.startDate)} a ${formatDateBr(cyc.endDate)}</td>
        <td>${stBadge}</td>
        <td>${roleNames.map((n) => `<span class="tag tag-blue" style="margin-right:3px;">${n}</span>`).join("")}</td>
        <td>
          <strong>${cyc.weightIndividual}% Ind. / ${100 - cyc.weightIndividual}% Grupo</strong>
          <div class="text-muted">Bônus Coletivo: ${cyc.groupMultiplier.toFixed(2).replace(".", ",")}x</div>
        </td>
        <td>
          <strong>${activeRules.length} regras ativas</strong>
          <div class="text-muted">Maior peso: ${topWeightRule ? `${topWeightRule.name.slice(0, 34)}... (${topWeightRule.weight}x)` : "—"}</div>
        </td>
        <td>
          <strong>${cyc.version}</strong>
          <div class="text-muted">${cyc.lastSaved}</div>
        </td>
        <td style="white-space:nowrap;display:flex;gap:5px;flex-wrap:wrap;">
          <button type="button" class="btn ${isCurrent ? "btn-secondary" : "btn-primary"} btn-sm btn-load-cycle">
            ${loadBtnLabel}
          </button>
          <button type="button" class="btn btn-secondary btn-sm btn-view-snapshot">
            🔍 Ver Snapshot
          </button>
          <button type="button" class="btn btn-teal btn-sm btn-clone-cycle" title="Criar novo ciclo copiando estas regras">
            📋 Clonar
          </button>
          ${
            canActivate
              ? `<button type="button" class="btn btn-teal btn-sm btn-act-row" title="Ativar este ciclo planejado">🟢 Ativar</button>`
              : ""
          }
          ${
            canDelete
              ? `<button type="button" class="btn btn-danger btn-sm btn-del-row" title="Apagar ciclo que foi criado mas ainda não foi ativado">🗑️ Apagar</button>`
              : ""
          }
          ${
            canClose
              ? `<button type="button" class="btn btn-amber btn-sm btn-close-row" title="Ciclo já ativado: só pode ser encerrado">🔒 Encerrar</button>`
              : ""
          }
        </td>
      `;

      tr.querySelector(".btn-load-cycle").addEventListener("click", () => {
        state.activeCycleId = cyc.id;
        refreshAll();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      tr.querySelector(".btn-view-snapshot").addEventListener("click", () => {
        state.snapshotCycleId = cyc.id;
        renderSnapshotDrawer();
      });

      tr.querySelector(".btn-clone-cycle").addEventListener("click", () => {
        cloneCycleToNew(cyc);
      });

      const actBtn = tr.querySelector(".btn-act-row");
      if (actBtn) {
        actBtn.addEventListener("click", () => activateCycleById(cyc.id));
      }

      const delBtn = tr.querySelector(".btn-del-row");
      if (delBtn) {
        delBtn.addEventListener("click", () => deleteUnactivatedCycleById(cyc.id));
      }

      const closeBtn = tr.querySelector(".btn-close-row");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => closeActivatedCycleById(cyc.id));
      }

      tbody.appendChild(tr);
    });

    if (state.snapshotCycleId) {
      renderSnapshotDrawer();
    }
  }

  function renderSnapshotDrawer() {
    const drawer = $("#cycle-snapshot-drawer");
    const cyc = cyclesDb.find((c) => c.id === state.snapshotCycleId);
    if (!cyc) {
      drawer.classList.add("hidden");
      return;
    }

    const readOnly = isCycleReadOnly(cyc);
    const roleNames = getActiveRoleNames(cyc);
    drawer.classList.remove("hidden");
    drawer.innerHTML = `
      <div class="snapshot-head">
        <div>
          <span class="tag tag-blue">Snapshot Histórico de Regras • ${cyc.version} (${cyc.lastSaved})</span>
          <h3 style="margin-top:4px;font-size:0.98rem;color:var(--primary-dark);">
            🗂️ ${cyc.name} (${formatDateBr(cyc.startDate)} a ${formatDateBr(cyc.endDate)})
          </h3>
          <p class="text-muted" style="font-size:0.8rem;">
            Perfis concorrentes: <strong>${roleNames.join(", ")}</strong> • Divisão de Mérito: <strong>${cyc.weightIndividual}% Individual / ${100 - cyc.weightIndividual}% Grupo</strong> (Multiplicador Coletivo ${cyc.groupMultiplier.toFixed(2).replace(".", ",")}x) • Responsável: ${cyc.author}
          </p>
        </div>
        <div style="display:flex;gap:8px;">
          <button type="button" id="btn-load-from-snapshot" class="btn btn-primary btn-sm">
            ${readOnly ? "👁️ Visualizar este Ciclo Encerrado na Tela" : "📂 Carregar este Ciclo para Edição Completa"}
          </button>
          <button type="button" id="btn-close-snapshot" class="btn btn-secondary btn-sm">
            ✕ Fechar Snapshot
          </button>
        </div>
      </div>

      <div class="snapshot-rules-list">
        ${cyc.rules
          .map(
            (r) => `
          <div class="snapshot-rule-chip">
            <div style="display:flex;justify-content:space-between;gap:4px;">
              <span class="tag ${ROLE_BADGE_MAP[r.role]?.cls || "tag-blue"}">${ROLE_BADGE_MAP[r.role]?.label || r.role}</span>
              <span class="tag ${r.merit === "INDIVIDUAL" ? "tag-blue" : "tag-teal"}">${r.merit} • Peso ${r.weight}x</span>
            </div>
            <strong>${r.name}</strong>
            <span class="text-muted">Meta: <strong>${r.target}</strong> • Base: <strong>+${r.points} pts</strong> (${r.freq})</span>
          </div>
        `
          )
          .join("")}
      </div>
    `;

    $("#btn-load-from-snapshot").addEventListener("click", () => {
      state.activeCycleId = cyc.id;
      refreshAll();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    $("#btn-close-snapshot").addEventListener("click", () => {
      state.snapshotCycleId = null;
      drawer.classList.add("hidden");
    });
  }

  // =========================================================================
  // MASCOTE AQUALINO RESPONDENDO DÚVIDAS DE UTILIZAÇÃO DA TELA (TelaGameParam)
  // =========================================================================
  function generateAqualinoGameAnswer(rawQuestion) {
    const q = (rawQuestion || "").toLowerCase();

    if (/(mérito|merito|individual|grupo|coletiv|peso|pondera|proporção|proporcao|multiplicador)/i.test(q)) {
      return `No <strong>Bloco 1 (Ponderação: Mérito Individual × Mérito do Grupo)</strong>, arraste o controle deslizante para definir a proporção exata (por exemplo, <strong>65% Mérito Individual e 35% Mérito do Grupo</strong>). Além disso, você pode escolher um <strong>Multiplicador por Meta Coletiva Batida</strong> (ex.: <em>+20% de bônus</em> quando a Central mantém o TME ≤ 10m e o NPS ≥ 85) e configurar regras coletivas na tabela do Bloco 2!`;
    }

    if (/(perfil|perfis|recepcionista|atendente|supervisor|concorr|participa|elegib)/i.test(q)) {
      return `No <strong>Bloco 1 (Perfis Elegíveis que Concorrem aos Prêmios)</strong>, você pode marcar ou desmarcar individualmente <strong>🛎️ Recepcionistas</strong>, <strong>🎧 Atendentes de Guichê</strong> e <strong>📊 Supervisores Locais</strong> para definir quem concorre em cada ciclo, além de parametrizar a quantidade mínima de atendimentos, assiduidade e % de avaliações exigidas para elegibilidade!`;
    }

    if (/(histórico|historico|ciclo|clonar|novo ciclo|salvar|anterior|vigência|vigencia|snapshot|apagar|excluir|encerrar|encerrado)/i.test(q)) {
      return `Cada ciclo possui <strong>suas próprias regras independentes</strong>! As regras de governança são: <strong>1)</strong> Ciclos criados que ainda <strong>não chegaram a ser ativados (Planejados)</strong> podem ser editados, ativados (<em>🟢 Ativar</em>) ou apagados (<em>🗑️ Apagar</em>); <strong>2)</strong> Se um ciclo <strong>já chegou a ser ativado</strong>, ele não pode ser apagado, apenas encerrado (<em>🔒 Encerrar</em>); e <strong>3)</strong> Ciclos com <strong>Histórico Encerrado</strong> podem ser visualizados na tela ou clonados, mas suas regras não podem mais ser alteradas!`;
    }

    if (/(regra|editar|ponto|meta|adicionar|incluir|remover|pós-checkout|pos-checkout)/i.test(q)) {
      return `No <strong>Bloco 2 (Motor de Regras Parametrizáveis)</strong>, enquanto o ciclo estiver Vigente ou Planejado, você pode filtrar por perfil (<em>Recepcionistas, Atendentes, Supervisores ou Mérito do Grupo</em>), editar diretamente na tabela a <strong>Meta Alvo</strong>, os <strong>Pontos Base (XP)</strong> e o <strong>Peso (1,0x a 3,0x)</strong> ou usar o formulário abaixo da tabela para <strong>adicionar novas regras</strong> ao ciclo!`;
    }

    if (/(prêmio|premio|simulador|simular|ouro|prata|faixa|catálogo|catalogo)/i.test(q)) {
      return `No <strong>Bloco 3</strong>, à esquerda você parametriza as <strong>Faixas de Pontuação Mínima (Ouro e Prata)</strong> exigidas para Recepcionistas, Atendentes, Supervisores e Equipe da Unidade. À direita, no <strong>Simulador Estratégico</strong>, você testa em tempo real a pontuação final e verifica qual faixa (Ouro ou Prata) seria alcançada! E na seção <strong>2. Gestão de Patrocinadores & Vínculo de Itens Doados</strong> abaixo, você vincula os itens doados pelos patrocinadores a cada categoria!`;
    }

    if (/(patrocinador|item|doado|estoque|doação|doacao|positivo|ifood|vincular|vínculo|vinculo)/i.test(q)) {
      return `Na seção <strong>2. Gestão de Patrocinadores & Vínculo de Itens Doados</strong> desta tela: no <strong>Passo 1</strong> você cadastra novos patrocinadores (como <em>Positivo Informática</em>, <em>iFood</em>, etc.); no <strong>Passo 2</strong> você registra os itens doados no estoque; e no <strong>Passo 3</strong> você vincula esses itens aos prêmios de cada categoria (Recepcionistas, Atendentes, Supervisores ou Equipe) e faixa (Ouro ou Prata) do ciclo em andamento!`;
    }

    return `Estou aqui para ajudar você a utilizar a <strong>Tela de Parametrização de Gamificação (TelaGameParam)</strong>! Você pode: <strong>1)</strong> Criar, ativar, encerrar ou apagar ciclos ainda não ativados; <strong>2)</strong> Habilitar <em>Recepcionistas, Atendentes e Supervisores Locais</em> e ajustar o peso entre <em>Mérito Individual e Mérito do Grupo</em>; <strong>3)</strong> Parametrizar as faixas Ouro e Prata e simular notas; e <strong>4)</strong> Cadastrar patrocinadores, itens doados e vinculá-los aos prêmios de cada categoria do ciclo vigente!`;
  }

  function askAqualinoGame(questionText) {
    const q = (questionText || "").trim();
    if (!q) {
      $("#input-ask-aqualino-game").focus();
      return;
    }

    const answerHtml = generateAqualinoGameAnswer(q);
    const bubble = $("#aqualino-game-bubble");
    bubble.classList.add("answering");
    bubble.innerHTML = `
      💬 <strong>Sua dúvida sobre a tela:</strong> <em>"${q}"</em><br/>
      💧 <strong>Aqualino responde:</strong> ${answerHtml}
      <button type="button" id="btn-back-game-summary" style="margin-left:8px;text-decoration:underline;cursor:pointer;border:none;background:none;color:var(--primary);font-weight:700;">
        ↺ Voltar ao resumo do ciclo atual
      </button>
    `;

    const btnBack = $("#btn-back-game-summary");
    if (btnBack) {
      btnBack.addEventListener("click", () => {
        bubble.classList.remove("answering");
        renderTopKpisAndAqualino();
      });
    }

    const img = $(".mascot-img");
    if (img) {
      img.classList.add("celebrate");
      setTimeout(() => img.classList.remove("celebrate"), 600);
    }
  }

  $("#form-ask-aqualino-game").addEventListener("submit", (e) => {
    e.preventDefault();
    askAqualinoGame($("#input-ask-aqualino-game").value);
  });

  $$(".chip-ask-game").forEach((chip) => {
    chip.addEventListener("click", () => {
      $("#input-ask-aqualino-game").value = chip.dataset.q;
      askAqualinoGame(chip.dataset.q);
    });
  });

  const btnVoiceGame = $("#btn-voice-aqualino-game");
  let isListeningGame = false;
  btnVoiceGame.addEventListener("click", () => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!isListeningGame && SpeechRec) {
      try {
        const rec = new SpeechRec();
        rec.lang = "pt-BR";
        isListeningGame = true;
        btnVoiceGame.classList.add("listening");
        btnVoiceGame.textContent = "🛑 Ouvindo...";
        rec.onresult = (ev) => {
          const txt = ev.results[0][0].transcript;
          $("#input-ask-aqualino-game").value = txt;
          askAqualinoGame(txt);
        };
        rec.onend = () => {
          isListeningGame = false;
          btnVoiceGame.classList.remove("listening");
          btnVoiceGame.textContent = "🎤 Voz";
        };
        rec.onerror = () => {
          isListeningGame = false;
          btnVoiceGame.classList.remove("listening");
          btnVoiceGame.textContent = "🎤 Voz";
          const sample = "Como funciona o histórico de regras de cada ciclo e como criar um ciclo com regras próprias?";
          $("#input-ask-aqualino-game").value = sample;
          askAqualinoGame(sample);
        };
        rec.start();
        return;
      } catch (_) {}
    }

    const sample = "Como funciona o histórico de regras de cada ciclo e como criar um ciclo com regras próprias?";
    $("#input-ask-aqualino-game").value = sample;
    askAqualinoGame(sample);
  });

  function focusAqualinoGameInput() {
    $("#aqualino-game-panel").scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => $("#input-ask-aqualino-game").focus(), 250);
  }

  $("#btn-floating-aqualino-game").addEventListener("click", focusAqualinoGameInput);

  // =========================================================================
  // SESSÃO 2: GESTÃO DE PATROCINADORES, ITENS DOADOS E VÍNCULO AO CICLO VIGENTE
  // (Movida de TelaGameVitrine2.html com todas as suas funcionalidades)
  // =========================================================================
  function getInitialSponsorsDb() {
    return {
      sponsors: [
        {
          id: "SP_POSITIVO",
          name: "Positivo Informática",
          icon: "💻",
          segment: "Tecnologia & Periféricos",
          agreement: "Termo Doação #2026/01 (Custo Zero SANEPAR)",
        },
        {
          id: "SP_IFOOD",
          name: "iFood",
          icon: "🍔",
          segment: "Alimentação & Vouchers",
          agreement: "Convênio Parceria #2026/04 (Custo Zero SANEPAR)",
        },
        {
          id: "SP_SESC",
          name: "SESC Paraná",
          icon: "🏖️",
          segment: "Lazer, Hotelaria & Cultura",
          agreement: "Acordo Cooperação #2026/07",
        },
        {
          id: "SP_FUNDACAO",
          name: "Fundação Sanepar & Senac",
          icon: "🎓",
          segment: "Educação & Certificações",
          agreement: "Programa Institucional #2026/09",
        },
      ],
      donatedItems: [
        {
          id: "DI_1",
          sponsorId: "SP_POSITIVO",
          name: "Kit Mouse & Teclado Sem Fio Ergonômico Positivo",
          totalQty: 60,
          linkedQty: 42,
        },
        {
          id: "DI_2",
          sponsorId: "SP_POSITIVO",
          name: "Notebook Positivo Vision C15 + Mochila Executiva",
          totalQty: 20,
          linkedQty: 15,
        },
        {
          id: "DI_3",
          sponsorId: "SP_POSITIVO",
          name: "Headset USB Noise Cancelling Positivo",
          totalQty: 45,
          linkedQty: 22,
        },
        {
          id: "DI_4",
          sponsorId: "SP_POSITIVO",
          name: "Tablet Positivo Tab Q10 + Capa Teclado Bluetooth",
          totalQty: 20,
          linkedQty: 12,
        },
        {
          id: "DI_5",
          sponsorId: "SP_IFOOD",
          name: "Voucher iFood Benefícios R$ 500 (Cartão Digital)",
          totalQty: 50,
          linkedQty: 35,
        },
        {
          id: "DI_6",
          sponsorId: "SP_IFOOD",
          name: "Voucher iFood Benefícios R$ 350 (Cartão Digital)",
          totalQty: 60,
          linkedQty: 44,
        },
        {
          id: "DI_7",
          sponsorId: "SP_IFOOD",
          name: "Experiência Gastronômica Coletiva iFood R$ 2.500 (Equipe)",
          totalQty: 10,
          linkedQty: 6,
        },
        {
          id: "DI_8",
          sponsorId: "SP_SESC",
          name: "Fim de Semana Hotel SESC Caiobá ou Foz (c/ Acompanhante)",
          totalQty: 15,
          linkedQty: 10,
        },
        {
          id: "DI_9",
          sponsorId: "SP_FUNDACAO",
          name: "Bolsa Certificação Executiva Senac + Troféu Aqualino",
          totalQty: 20,
          linkedQty: 12,
        },
      ],
      activeCyclePrizeBuckets: [
        {
          category: "RECEPCAO",
          tier: "OURO",
          minPts: 1100,
          items: [
            { linkId: "L1", itemId: "DI_1", sponsorName: "Positivo Informática", sponsorIcon: "💻", itemName: "Kit Mouse & Teclado Sem Fio Ergonômico Positivo", qty: 22 },
            { linkId: "L2", itemId: "DI_3", sponsorName: "Positivo Informática", sponsorIcon: "💻", itemName: "Headset USB Noise Cancelling Positivo", qty: 22 },
          ],
        },
        {
          category: "RECEPCAO",
          tier: "PRATA",
          minPts: 850,
          items: [
            { linkId: "L3", itemId: "DI_6", sponsorName: "iFood", sponsorIcon: "🍔", itemName: "Voucher iFood Benefícios R$ 350 (Cartão Digital)", qty: 44 },
          ],
        },
        {
          category: "ATENDENTE",
          tier: "OURO",
          minPts: 1250,
          items: [
            { linkId: "L4", itemId: "DI_2", sponsorName: "Positivo Informática", sponsorIcon: "💻", itemName: "Notebook Positivo Vision C15 + Mochila Executiva", qty: 15 },
          ],
        },
        {
          category: "ATENDENTE",
          tier: "PRATA",
          minPts: 950,
          items: [
            { linkId: "L5", itemId: "DI_5", sponsorName: "iFood", sponsorIcon: "🍔", itemName: "Voucher iFood Benefícios R$ 500 (Cartão Digital)", qty: 35 },
          ],
        },
        {
          category: "SUPERVISOR",
          tier: "OURO",
          minPts: 1200,
          items: [
            { linkId: "L6", itemId: "DI_8", sponsorName: "SESC Paraná", sponsorIcon: "🏖️", itemName: "Fim de Semana Hotel SESC Caiobá ou Foz (c/ Acompanhante)", qty: 10 },
          ],
        },
        {
          category: "SUPERVISOR",
          tier: "PRATA",
          minPts: 920,
          items: [
            { linkId: "L7", itemId: "DI_4", sponsorName: "Positivo Informática", sponsorIcon: "💻", itemName: "Tablet Positivo Tab Q10 + Capa Teclado Bluetooth", qty: 12 },
          ],
        },
        {
          category: "GRUPO",
          tier: "OURO",
          minPts: 1050,
          items: [
            { linkId: "L8", itemId: "DI_7", sponsorName: "iFood", sponsorIcon: "🍔", itemName: "Experiência Gastronômica Coletiva iFood R$ 2.500 (Equipe)", qty: 6 },
          ],
        },
        {
          category: "GRUPO",
          tier: "PRATA",
          minPts: 820,
          items: [
            { linkId: "L9", itemId: "DI_9", sponsorName: "Fundação Sanepar & Senac", sponsorIcon: "🎓", itemName: "Bolsa Certificação Executiva Senac + Troféu Aqualino", qty: 12 },
          ],
        },
      ],
    };
  }

  let sponsorsDb = getInitialSponsorsDb();
  state.adminStockSponsorFilter = "ALL";

  function saveSharedSponsorsData() {
    try {
      localStorage.setItem(
        "sanepar_gamification_sponsors_stock_v1",
        JSON.stringify(sponsorsDb)
      );
    } catch (_) {}
  }

  function loadSharedSponsorsData() {
    try {
      const raw = localStorage.getItem("sanepar_gamification_sponsors_stock_v1");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (
        parsed &&
        Array.isArray(parsed.sponsors) &&
        Array.isArray(parsed.donatedItems) &&
        Array.isArray(parsed.activeCyclePrizeBuckets)
      ) {
        sponsorsDb = parsed;
      }
    } catch (_) {}
  }

  loadSharedSponsorsData();

  $$(".main-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".main-tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const targetId = btn.dataset.scrollTarget;
      const targetEl = targetId ? $(`#${targetId}`) : null;
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  function showAdminFeedback(htmlMsg) {
    const fb = $("#admin-feedback-banner");
    if (!fb) return;
    fb.innerHTML = htmlMsg;
    fb.classList.remove("hidden");
  }

  function renderAdminSponsorsAndDropdowns() {
    const countTag = $("#admin-sponsors-count-tag");
    if (!countTag) return;
    countTag.textContent = `${sponsorsDb.sponsors.length} Patrocinadores`;

    const listEl = $("#admin-sponsors-list");
    listEl.innerHTML = "";
    sponsorsDb.sponsors.forEach((sp) => {
      const itemsCount = sponsorsDb.donatedItems.filter((it) => it.sponsorId === sp.id).length;
      const isFiltered = state.adminStockSponsorFilter === sp.id;

      const chip = document.createElement("div");
      chip.className = `sponsor-chip-card${isFiltered ? " active" : ""}`;
      chip.innerHTML = `
        <strong>${sp.icon} ${sp.name} (${itemsCount} itens)</strong>
        <span class="text-muted">${sp.segment} • ${sp.agreement}</span>
      `;
      chip.addEventListener("click", () => {
        state.adminStockSponsorFilter =
          state.adminStockSponsorFilter === sp.id ? "ALL" : sp.id;
        $("#filter-stock-sponsor").value = state.adminStockSponsorFilter;
        renderAdminSponsorsAndDropdowns();
        renderAdminDonatedItemsStock();
      });
      listEl.appendChild(chip);
    });

    const selItemSponsor = $("#sel-item-sponsor");
    selItemSponsor.innerHTML = "";
    sponsorsDb.sponsors.forEach((sp) => {
      const opt = document.createElement("option");
      opt.value = sp.id;
      opt.textContent = `${sp.icon} ${sp.name}`;
      selItemSponsor.appendChild(opt);
    });

    const selFilterStock = $("#filter-stock-sponsor");
    selFilterStock.innerHTML = `<option value="ALL">Todos os Patrocinadores (${sponsorsDb.sponsors.length})</option>`;
    sponsorsDb.sponsors.forEach((sp) => {
      const opt = document.createElement("option");
      opt.value = sp.id;
      opt.textContent = `${sp.icon} ${sp.name}`;
      selFilterStock.appendChild(opt);
    });
    selFilterStock.value = state.adminStockSponsorFilter;
  }

  function renderAdminDonatedItemsStock() {
    const tbody = $("#donated-items-tbody");
    if (!tbody) return;
    tbody.innerHTML = "";

    const filtered = sponsorsDb.donatedItems.filter(
      (it) =>
        state.adminStockSponsorFilter === "ALL" ||
        it.sponsorId === state.adminStockSponsorFilter
    );

    filtered.forEach((it) => {
      const sp = sponsorsDb.sponsors.find((s) => s.id === it.sponsorId) || sponsorsDb.sponsors[0];
      const available = Math.max(0, it.totalQty - it.linkedQty);

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${sp.icon} ${sp.name}</strong></td>
        <td><strong>${it.name}</strong></td>
        <td>${it.totalQty} unid.</td>
        <td>${it.linkedQty} unid.</td>
        <td>
          <span class="tag ${available > 0 ? "tag-green" : "tag-amber"}">
            ${available} disponíveis
          </span>
        </td>
      `;
      tbody.appendChild(tr);
    });

    const selLinkItem = $("#sel-link-donated-item");
    const prevSelected = selLinkItem.value;
    selLinkItem.innerHTML = "";
    sponsorsDb.donatedItems.forEach((it) => {
      const sp = sponsorsDb.sponsors.find((s) => s.id === it.sponsorId) || sponsorsDb.sponsors[0];
      const available = Math.max(0, it.totalQty - it.linkedQty);
      if (available > 0) {
        const opt = document.createElement("option");
        opt.value = it.id;
        opt.textContent = `${sp.icon} ${sp.name} — ${it.name} (Saldo: ${available} unid.)`;
        selLinkItem.appendChild(opt);
      }
    });
    if (prevSelected && Array.from(selLinkItem.options).some((o) => o.value === prevSelected)) {
      selLinkItem.value = prevSelected;
    }
    syncLinkQtyMaxWithSelectedStock();
  }

  function syncLinkQtyMaxWithSelectedStock() {
    const selLinkItem = $("#sel-link-donated-item");
    const inpQty = $("#inp-link-qty");
    const lblMax = $("#lbl-max-link-qty");
    const btnSubmit = $("#btn-submit-link-prize");
    const errBanner = $("#link-qty-error-msg");
    if (!selLinkItem || !inpQty) return;

    const stockItem = sponsorsDb.donatedItems.find((d) => d.id === selLinkItem.value);
    if (!stockItem) {
      if (lblMax) lblMax.textContent = "0";
      inpQty.value = "0";
      inpQty.max = "0";
      inpQty.disabled = true;
      if (btnSubmit) btnSubmit.disabled = true;
      return;
    }

    const available = Math.max(0, stockItem.totalQty - stockItem.linkedQty);
    inpQty.disabled = false;
    if (btnSubmit) btnSubmit.disabled = false;
    inpQty.max = String(available);
    if (lblMax) lblMax.textContent = String(available);

    const currentVal = Number(inpQty.value) || 1;
    if (currentVal > available) {
      inpQty.value = String(available);
    } else if (currentVal < 1) {
      inpQty.value = "1";
    }
    if (errBanner) errBanner.classList.add("hidden");
  }

  function renderAdminActiveCycleLinks() {
    const grid = $("#active-cycle-prize-links-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const categoriesOrder = ["RECEPCAO", "ATENDENTE", "SUPERVISOR", "GRUPO"];

    categoriesOrder.forEach((catKey) => {
      const catMeta = ROLE_BADGE_MAP[catKey];
      const ouroBucket = sponsorsDb.activeCyclePrizeBuckets.find(
        (b) => b.category === catKey && b.tier === "OURO"
      );
      const prataBucket = sponsorsDb.activeCyclePrizeBuckets.find(
        (b) => b.category === catKey && b.tier === "PRATA"
      );

      const card = document.createElement("div");
      card.className = "linked-cat-card";

      const renderBucketRows = (bucket, tierLabel, tierBadgeCls) => {
        if (!bucket || bucket.items.length === 0) {
          return `
            <div class="linked-item-row">
              <span class="text-muted">${tierLabel}: Nenhum item doado vinculado.</span>
            </div>
          `;
        }
        return bucket.items
          .map(
            (link) => `
            <div class="linked-item-row">
              <div>
                <span class="tag ${tierBadgeCls}" style="margin-right:5px;">${tierLabel}</span>
                <strong>${link.itemName}</strong>
                <span class="text-muted">(${link.sponsorIcon} ${link.sponsorName} • ${link.qty} cotas)</span>
              </div>
              <button type="button" class="btn btn-secondary btn-sm btn-unlink-item" data-cat="${catKey}" data-tier="${bucket.tier}" data-link-id="${link.linkId}">
                ✕ Desvincular
              </button>
            </div>
          `
          )
          .join("");
      };

      card.innerHTML = `
        <div class="linked-cat-head">
          <strong>${catMeta.label}</strong>
          <span class="tag ${catMeta.cls}">Ciclo 2026.4 (Vigente)</span>
        </div>
        ${renderBucketRows(ouroBucket, "🥇 Ouro", "tag-amber")}
        ${renderBucketRows(prataBucket, "🥈 Prata", "tag-blue")}
      `;

      card.querySelectorAll(".btn-unlink-item").forEach((btn) => {
        btn.addEventListener("click", () => {
          const tCat = btn.dataset.cat;
          const tTier = btn.dataset.tier;
          const tLinkId = btn.dataset.linkId;

          const targetBucket = sponsorsDb.activeCyclePrizeBuckets.find(
            (b) => b.category === tCat && b.tier === tTier
          );
          if (!targetBucket) return;

          const foundLink = targetBucket.items.find((x) => x.linkId === tLinkId);
          if (foundLink) {
            const stockItem = sponsorsDb.donatedItems.find((d) => d.id === foundLink.itemId);
            if (stockItem) {
              stockItem.linkedQty = Math.max(0, stockItem.linkedQty - foundLink.qty);
            }
            targetBucket.items = targetBucket.items.filter((x) => x.linkId !== tLinkId);
            saveSharedSponsorsData();
            showAdminFeedback(
              `↺ Item <strong>"${foundLink.itemName}"</strong> desvinculado de <strong>${catMeta.label} (${tTier})</strong>. As ${foundLink.qty} cotas retornaram ao saldo do patrocinador!`
            );
            renderAdminSponsorsAndDropdowns();
            renderAdminDonatedItemsStock();
            renderAdminActiveCycleLinks();
          }
        });
      });

      grid.appendChild(card);
    });
  }

  // Passo 1: Cadastrar Novo Patrocinador
  const formNewSponsor = $("#form-new-sponsor");
  if (formNewSponsor) {
    formNewSponsor.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("#inp-sp-name").value.trim();
      const segment = $("#sel-sp-segment").value;
      const agreement = $("#inp-sp-agreement").value.trim();
      if (!name || !agreement) return;

      const iconMap = {
        "Tecnologia & Periféricos": "💻",
        "Alimentação & Vouchers": "🍔",
        "Lazer, Hotelaria & Cultura": "🏖️",
        "Educação & Certificações": "🎓",
      };

      const newSp = {
        id: `SP_${Date.now()}`,
        name,
        icon: iconMap[segment] || "🤝",
        segment,
        agreement,
      };

      sponsorsDb.sponsors.push(newSp);
      $("#inp-sp-name").value = "";
      $("#inp-sp-agreement").value = "";
      saveSharedSponsorsData();

      showAdminFeedback(
        `✅ <strong>Novo patrocinador cadastrado com sucesso:</strong> ${newSp.icon} <strong>${newSp.name}</strong> (${newSp.segment}). Agora você já pode registrar itens doados por ele no Passo 2!`
      );
      renderAdminSponsorsAndDropdowns();
      renderAdminDonatedItemsStock();
      renderAdminActiveCycleLinks();
      $("#sel-item-sponsor").value = newSp.id;
    });
  }

  // Passo 2: Cadastrar Novo Item Doado
  const formNewDonatedItem = $("#form-new-donated-item");
  if (formNewDonatedItem) {
    formNewDonatedItem.addEventListener("submit", (e) => {
      e.preventDefault();
      const sponsorId = $("#sel-item-sponsor").value;
      const name = $("#inp-item-name").value.trim();
      const totalQty = Number($("#inp-item-qty").value) || 10;
      if (!sponsorId || !name) return;

      const sp = sponsorsDb.sponsors.find((s) => s.id === sponsorId) || sponsorsDb.sponsors[0];
      const newItem = {
        id: `DI_${Date.now()}`,
        sponsorId,
        name,
        totalQty,
        linkedQty: 0,
      };

      sponsorsDb.donatedItems.unshift(newItem);
      $("#inp-item-name").value = "";
      saveSharedSponsorsData();

      showAdminFeedback(
        `📦 <strong>Item doado registrado no estoque:</strong> <em>"${newItem.name}"</em> (${newItem.totalQty} unidades doadas por <strong>${sp.icon} ${sp.name}</strong>). Disponível para vínculo no Passo 3!`
      );
      renderAdminSponsorsAndDropdowns();
      renderAdminDonatedItemsStock();
      renderAdminActiveCycleLinks();
      $("#sel-link-donated-item").value = newItem.id;
      syncLinkQtyMaxWithSelectedStock();
    });
  }

  const filterStockSponsor = $("#filter-stock-sponsor");
  if (filterStockSponsor) {
    filterStockSponsor.addEventListener("change", (e) => {
      state.adminStockSponsorFilter = e.target.value;
      renderAdminSponsorsAndDropdowns();
      renderAdminDonatedItemsStock();
    });
  }

  const selLinkDonatedItem = $("#sel-link-donated-item");
  if (selLinkDonatedItem) {
    selLinkDonatedItem.addEventListener("change", () => {
      syncLinkQtyMaxWithSelectedStock();
    });
  }

  const inpLinkQty = $("#inp-link-qty");
  if (inpLinkQty) {
    inpLinkQty.addEventListener("input", () => {
      const itemId = $("#sel-link-donated-item").value;
      const stockItem = sponsorsDb.donatedItems.find((d) => d.id === itemId);
      const errBanner = $("#link-qty-error-msg");
      if (!stockItem || !errBanner) return;

      const available = Math.max(0, stockItem.totalQty - stockItem.linkedQty);
      const val = Number($("#inp-link-qty").value);

      if (val > available) {
        errBanner.innerHTML = `⚠️ <strong>Quantidade acima do saldo disponível:</strong> O item <strong>"${stockItem.name}"</strong> possui apenas <strong>${available} unidade(s)</strong> de saldo. Informe no máximo <strong>${available}</strong>.`;
        errBanner.classList.remove("hidden");
      } else {
        errBanner.classList.add("hidden");
      }
    });
  }

  // Passo 3: Vincular Item Doado ao Prêmio de uma Categoria do Ciclo em Andamento
  const formLinkItemToPrize = $("#form-link-item-to-prize");
  if (formLinkItemToPrize) {
    formLinkItemToPrize.addEventListener("submit", (e) => {
      e.preventDefault();
      const category = $("#sel-link-category").value;
      const tier = $("#sel-link-tier").value;
      const itemId = $("#sel-link-donated-item").value;
      const qtyToLink = Number($("#inp-link-qty").value);
      const errBanner = $("#link-qty-error-msg");

      const stockItem = sponsorsDb.donatedItems.find((d) => d.id === itemId);
      if (!stockItem) return;

      const available = Math.max(0, stockItem.totalQty - stockItem.linkedQty);

      if (!qtyToLink || qtyToLink < 1 || qtyToLink > available) {
        if (errBanner) {
          errBanner.innerHTML = `⚠️ <strong>Operação bloqueada:</strong> Não é permitido vincular <strong>${qtyToLink || 0} cotas</strong>, pois o saldo disponível do item <strong>"${stockItem.name}"</strong> é de apenas <strong>${available} unidade(s)</strong>.`;
          errBanner.classList.remove("hidden");
        }
        return;
      }

      if (errBanner) errBanner.classList.add("hidden");

      const sp = sponsorsDb.sponsors.find((s) => s.id === stockItem.sponsorId) || sponsorsDb.sponsors[0];

      let bucket = sponsorsDb.activeCyclePrizeBuckets.find(
        (b) => b.category === category && b.tier === tier
      );
      if (!bucket) {
        bucket = {
          category,
          tier,
          minPts: tier === "OURO" ? 1100 : 850,
          items: [],
        };
        sponsorsDb.activeCyclePrizeBuckets.push(bucket);
      }

      bucket.items.push({
        linkId: `L_${Date.now()}`,
        itemId: stockItem.id,
        sponsorName: sp.name,
        sponsorIcon: sp.icon,
        itemName: stockItem.name,
        qty: qtyToLink,
      });

      stockItem.linkedQty += qtyToLink;
      saveSharedSponsorsData();

      const catLabel = ROLE_BADGE_MAP[category]?.label || category;
      showAdminFeedback(
        `🔗 <strong>Vínculo realizado com sucesso no Ciclo 2026.4 (Vigente)!</strong> O item <strong>"${stockItem.name}"</strong> (${sp.icon} ${sp.name} • ${qtyToLink} cotas) foi vinculado ao prêmio de <strong>${catLabel} (${tier})</strong> e já está sincronizado com a Vitrine de Prêmios (TelaGameVitrine2)!`
      );

      renderAdminSponsorsAndDropdowns();
      renderAdminDonatedItemsStock();
      renderAdminActiveCycleLinks();
    });
  }

  // Restaurar padrão inicial
  $("#btn-reset-gameparam").addEventListener("click", () => {
    localStorage.removeItem("sanepar_gamification_sponsors_stock_v1");
    cyclesDb = getInitialCyclesDb();
    sponsorsDb = getInitialSponsorsDb();
    state.activeCycleId = "C_2026_4";
    state.roleFilter = "ALL";
    state.snapshotCycleId = null;
    state.simRole = "ATENDENTE";
    state.simIndPct = 88;
    state.simGrpPct = 92;
    state.simCollectiveHit = true;
    state.adminStockSponsorFilter = "ALL";

    $$("#rules-category-tabs .chip").forEach((b) => {
      b.classList.toggle("active", b.dataset.roleFilter === "ALL");
    });
    $("#sim-select-role").value = "ATENDENTE";
    $("#sim-range-ind").value = "88";
    $("#sim-range-grp").value = "92";
    $("#sim-chk-collective-goal").checked = true;
    $("#input-ask-aqualino-game").value = "";
    $("#aqualino-game-bubble").classList.remove("answering");
    $("#cycle-save-feedback").classList.add("hidden");
    $("#cycle-snapshot-drawer").classList.add("hidden");
    const adminFb = $("#admin-feedback-banner");
    if (adminFb) adminFb.classList.add("hidden");

    refreshAll();
  });

  function refreshAll() {
    renderCycleSelectorBar();
    renderTopKpisAndAqualino();
    renderRolesAndWeights();
    renderRulesTable();
    renderPrizesCatalog();
    renderSimulator();
    renderHistoryTable();
    renderAdminSponsorsAndDropdowns();
    renderAdminDonatedItemsStock();
    renderAdminActiveCycleLinks();
  }

  // Inicialização
  $("#live-clock-display").textContent = currentHHMMSS();
  refreshAll();
})();
