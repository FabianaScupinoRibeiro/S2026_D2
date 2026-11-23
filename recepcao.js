(() => {
  "use strict";

  const TARGET_WAIT_SECONDS = 180; // Meta: 03m 00s (180 segundos)

  const QUEUE_TYPES = {
    normal: { prefix: "N", label: "Senha Normal", tagClass: "tag-blue" },
    idosa: { prefix: "P", label: "Preferencial • Pessoa Idosa (60+)", tagClass: "tag-teal" },
    pcd: { prefix: "D", label: "Preferencial • PcD / TEA", tagClass: "tag-teal" },
    gestante: { prefix: "G", label: "Preferencial • Gestante / Colo", tagClass: "tag-teal" },
    agendado: { prefix: "AG", label: "Atendimento Agendado", tagClass: "tag-green" },
  };

  // Ajuste 4: Todos os checkboxes de documentos iniciam NÃO selecionados (checked: false)
  const initialPendingQueue = () => [
    {
      code: "N-128",
      queueKey: "normal",
      priorityLabel: "Senha Normal",
      priorityTagClass: "tag-blue",
      name: "Carlos Eduardo Lima",
      doc: "341.892.109-20",
      matricula: "409182-1",
      arrivalTimeStr: "16:10",
      waitSeconds: 95,
      caseType: "Troca de Titularidade",
      demandText:
        "Aluguei um apartamento no Água Verde e preciso passar a conta de água da SANEPAR para o meu CPF.",
      docs: [
        { name: "RG e CPF do novo titular (original ou cópia autenticada)", checked: false },
        { name: "Contrato de locação vigente com assinaturas identificadas", checked: false },
        { name: "Número da matrícula SANEPAR e leitura atual do hidrômetro", checked: false },
      ],
    },
    {
      code: "P-043",
      queueKey: "idosa",
      priorityLabel: "Preferencial • Pessoa Idosa (60+)",
      priorityTagClass: "tag-teal",
      name: "Dona Helena Martins (68 anos)",
      doc: "192.440.819-53",
      matricula: "219044-8",
      arrivalTimeStr: "16:11",
      waitSeconds: 68,
      caseType: "2ª Via / Dúvida de Fatura",
      demandText:
        "Recebi aviso de fatura pendente que vence hoje, mas perdi o boleto impresso e quero pagar.",
      docs: [
        { name: "Documento oficial com foto (RG ou CNH) e CPF", checked: false },
        { name: "Número da matrícula SANEPAR (219044-8)", checked: false },
      ],
    },
    {
      code: "AG-205",
      queueKey: "agendado",
      priorityLabel: "Atendimento Agendado",
      priorityTagClass: "tag-green",
      name: "Marcos Vinícius Rocha",
      doc: "084.512.779-04",
      matricula: "774120-2",
      arrivalTimeStr: "16:09",
      waitSeconds: 142,
      caseType: "Parcelamento de Débitos",
      demandText:
        "Quero parcelar 4 faturas atrasadas do imóvel do meu pai para evitar corte no fornecimento.",
      docs: [
        { name: "RG e CPF do solicitante", checked: false },
        { name: "Procuração ou documento que comprove vínculo com o titular/imóvel", checked: false },
        { name: "Faturas em aberto ou número da matrícula SANEPAR", checked: false },
      ],
    },
    {
      code: "D-019",
      queueKey: "pcd",
      priorityLabel: "Preferencial • PcD / TEA",
      priorityTagClass: "tag-teal",
      name: "Fernanda Azevedo",
      doc: "518.203.991-12",
      matricula: "663019-9",
      arrivalTimeStr: "16:11",
      waitSeconds: 52,
      caseType: "Cadastro Tarifa Social",
      demandText:
        "Solicitação de inclusão no programa Água Solidária (Tarifa Social) com folha resumo do CadÚnico.",
      docs: [
        { name: "RG e CPF do responsável familiar", checked: false },
        { name: "Comprovante atualizado do CadÚnico com número do NIS", checked: false },
        { name: "Fatura recente da SANEPAR do imóvel residencial", checked: false },
      ],
    },
  ];

  // Ajuste 6: Senhas já conferidas e liberadas pela recepção que aguardam chamada no guichê
  const initialReleasedQueue = () => [
    {
      code: "N-125",
      queueKey: "normal",
      priorityLabel: "Senha Normal",
      priorityTagClass: "tag-blue",
      name: "Luciana Mendes",
      matricula: "512098-6",
      demand: "Contestação de Consumo",
      arrival: "15:55",
      checkinRec: "15:57",
      waitSeconds: 102,
      guiche: "G-02",
    },
    {
      code: "P-041",
      queueKey: "idosa",
      priorityLabel: "Preferencial • Pessoa Idosa (60+)",
      priorityTagClass: "tag-teal",
      name: "Sr. Antônio Ferreira",
      matricula: "118920-4",
      demand: "Troca de Titularidade",
      arrival: "16:01",
      checkinRec: "16:03",
      waitSeconds: 118,
      guiche: "G-01",
    },
  ];

  const initialAgencyCounters = () => [
    {
      id: "G-01",
      attendant: "Mariana Costa",
      rule: "Exclusivo Preferencial Legal (Idoso / PcD / Gestante)",
      isOpen: true,
      newlyOpened: false,
    },
    {
      id: "G-02",
      attendant: "Rafael Souza",
      rule: "Apoio Prioritário • Fila Normal + Agendados",
      isOpen: true,
      newlyOpened: false,
    },
    {
      id: "G-03",
      attendant: "Camila Teixeira",
      rule: "Exclusivo Preferencial Legal (Idoso / PcD / Gestante)",
      isOpen: true,
      newlyOpened: false,
    },
    {
      id: "G-04",
      attendant: "Bruno Oliveira",
      rule: "Atendimento Universal (Todas as Filas)",
      isOpen: true,
      newlyOpened: false,
    },
    {
      id: "G-05",
      attendant: "Patrícia Lima (Reserva)",
      rule: "Guichê Fechado • Disponível p/ Reforço",
      isOpen: false,
      newlyOpened: false,
    },
    {
      id: "G-06",
      attendant: "Lucas Rocha (Reserva)",
      rule: "Guichê Fechado • Disponível p/ Reforço",
      isOpen: false,
      newlyOpened: false,
    },
  ];

  const initialHistory = () => [
    {
      code: "N-126",
      citizen: "Roberto Almeida • Mat. 551029-3",
      demand: "2ª Via de Fatura",
      arrival: "15:58",
      checkinRec: "15:59",
      waitSeconds: 84,
      outcomeType: "avoided",
      outcomeLabel: "⚡ Resolvido na Recepção (Atendimento Evitado)",
    },
    {
      code: "P-041",
      citizen: "Sr. Antônio Ferreira • Mat. 118920-4",
      demand: "Troca de Titularidade",
      arrival: "16:01",
      checkinRec: "16:03",
      waitSeconds: 118,
      outcomeType: "released",
      outcomeLabel: "✓ Documentos conferidos • Liberado p/ Guichê (Preferencial • Pessoa Idosa (60+))",
    },
    {
      code: "N-125",
      citizen: "Luciana Mendes • Mat. 512098-6",
      demand: "Contestação de Consumo",
      arrival: "15:55",
      checkinRec: "15:57",
      waitSeconds: 102,
      outcomeType: "released",
      outcomeLabel: "✓ Documentos conferidos • Liberado p/ Guichê (Senha Normal)",
    },
    {
      code: "N-127",
      citizen: "Juliana Costa • Mat. 908123-7",
      demand: "Parcelamento de Débitos",
      arrival: "16:04",
      checkinRec: "16:07",
      waitSeconds: 134,
      outcomeType: "canceled",
      outcomeLabel: "✕ Cancelado: Cidadão não trouxe os documentos obrigatórios requeridos",
    },
    {
      code: "N-123",
      citizen: "Paulo Roberto Nunes • Mat. 440192-8",
      demand: "Religação de Água",
      arrival: "15:40",
      checkinRec: "15:42",
      waitSeconds: 98,
      outcomeType: "finished",
      outcomeLabel: "✓ Atendimento encerrado no Guichê 02",
    },
  ];

  const state = {
    points: 340,
    avoidedCount: 4,
    releasedCount: 6,
    canceledCount: 1,
    completedWaitSeconds: [95, 112, 130, 88, 145, 102, 118, 84, 134],
    pendingQueue: initialPendingQueue(),
    releasedQueue: initialReleasedQueue(),
    agencyCounters: initialAgencyCounters(),
    selectedTicketCode: "N-128",
    history: initialHistory(),
    nextTicketNum: 129,
    lastGeneratedTicket: null,
    walkinTriage: null,
    walkinWhenMode: "hoje",
    walkinSelectedDate: null,
    walkinSelectedSlot: null,
    liveCounters: [
      { guiche: "Guichê 01", ticket: "P-040", type: "Preferencial Idoso" },
      { guiche: "Guichê 02", ticket: "N-124", type: "Senha Normal" },
      { guiche: "Guichê 03", ticket: "D-018", type: "Preferencial PcD" },
      { guiche: "Guichê 04", ticket: "AG-203", type: "Agendado" },
    ],
    recentCalls: ["P-040", "AG-203", "N-124", "D-018", "N-123"],
    rating: {
      validatedTicket: null,
      nps: null,
      stars: 0,
    },
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function formatSeconds(sec) {
    const s = Math.max(0, Math.round(sec));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}m ${String(r).padStart(2, "0")}s`;
  }

  function nowHHMM() {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  }

  function nowHHMMSS() {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
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

  // =========================================================================
  // NAVEGAÇÃO ENTRE ABAS
  // =========================================================================
  function switchTab(tabId) {
    $$(".tab-pane").forEach((p) => p.classList.add("hidden"));
    $(`#${tabId}`).classList.remove("hidden");
    $$(".tab-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.tab === tabId);
    });
    if (tabId === "tab-painel-nps") {
      renderRatingEligibleChips();
    }
  }

  $$(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  // =========================================================================
  // GAMIFICAÇÃO (AQUALINO) & KPIS DE TEMPO DE ESPERA
  // =========================================================================
  function addGamificationPoints(pts, speechHtml) {
    state.points = Math.max(0, state.points + pts);
    const img = $(".mascot-img");
    if (img) {
      img.classList.add("celebrate");
      setTimeout(() => img.classList.remove("celebrate"), 500);
    }
    $("#mascot-speech").innerHTML = speechHtml;
    renderDashboardKpis();
  }

  function getAvgWaitSeconds() {
    if (!state.completedWaitSeconds.length) return 0;
    const sum = state.completedWaitSeconds.reduce((a, b) => a + b, 0);
    return Math.round(sum / state.completedWaitSeconds.length);
  }

  function renderDashboardKpis() {
    $("#score-points").textContent = `${state.points} pts`;
    const pct = Math.min(100, Math.round((state.points / 500) * 100));
    $("#xp-fill").style.width = `${pct}%`;
    $("#xp-progress-label").textContent = `${state.points} / 500 pts`;

    if (state.points >= 500) {
      $("#xp-bonus-hint").textContent = "Meta Ouro alcançada hoje! Parabéns! 🏆";
      $("#mascot-level").textContent = "Nível 4 • Recepção Ouro 🏆";
      $("#medal-ouro").classList.add("earned");
    } else {
      $("#xp-bonus-hint").textContent = `Faltam ${500 - state.points} pts para o Troféu Ouro 🏆`;
      $("#mascot-level").textContent = "Nível 3 • Guardião";
      $("#medal-ouro").classList.remove("earned");
    }

    const avgSec = getAvgWaitSeconds();
    $("#kpi-avg-wait").textContent = formatSeconds(avgSec);
    const waitBadge = $("#kpi-wait-badge");

    if (avgSec <= TARGET_WAIT_SECONDS) {
      waitBadge.className = "tag tag-green";
      waitBadge.textContent = "Abaixo da Meta ✓";
      $("#medal-tempo").classList.add("earned");
    } else {
      waitBadge.className = "tag tag-amber";
      waitBadge.textContent = "Acima do Objetivo";
      $("#medal-tempo").classList.remove("earned");
    }

    $("#kpi-avoided-count").textContent = state.avoidedCount;
    $("#kpi-released-count").textContent = state.releasedCount;
    $("#kpi-canceled-count").textContent = state.canceledCount;
    $("#badge-pending-count").textContent = state.pendingQueue.length;
  }

  // =========================================================================
  // MÓDULO 1: FILA DE CONFERÊNCIA & GESTÃO PÓS-CHECK-IN DA RECEPÇÃO
  // =========================================================================
  function renderPendingQueue() {
    const listEl = $("#queue-checkin-list");
    listEl.innerHTML = "";

    if (!state.pendingQueue.length) {
      listEl.innerHTML = `<div class="empty-state">Nenhuma senha aguardando conferência no momento.</div>`;
      $("#inspection-content").classList.add("hidden");
      $("#inspection-empty").classList.remove("hidden");
      return;
    }

    $("#inspection-content").classList.remove("hidden");
    $("#inspection-empty").classList.add("hidden");

    if (!state.pendingQueue.some((t) => t.code === state.selectedTicketCode)) {
      state.selectedTicketCode = state.pendingQueue[0].code;
    }

    state.pendingQueue.forEach((item) => {
      const div = document.createElement("div");
      const isSelected = item.code === state.selectedTicketCode;
      const isOver = item.waitSeconds > TARGET_WAIT_SECONDS;
      div.className = `queue-item${isSelected ? " selected" : ""}`;
      div.innerHTML = `
        <div class="q-left">
          <div class="q-code-line">
            <span class="q-code">${item.code}</span>
            <span class="tag ${item.priorityTagClass}">${item.priorityLabel}</span>
          </div>
          <span class="q-name">${item.name}</span>
          <span class="q-demand">${item.caseType} • Mat. ${item.matricula}</span>
        </div>
        <div class="q-right">
          <span class="q-wait-pill ${isOver ? "warn" : "ok"}">⏱ ${formatSeconds(item.waitSeconds)}</span>
          <span class="q-arrival">Chegada: ${item.arrivalTimeStr}</span>
        </div>
      `;
      div.addEventListener("click", () => {
        state.selectedTicketCode = item.code;
        $("#cancel-reason-box").classList.add("hidden");
        renderPendingQueue();
        renderInspectionDesk();
      });
      listEl.appendChild(div);
    });
  }

  function renderInspectionDesk() {
    const tk = state.pendingQueue.find((t) => t.code === state.selectedTicketCode);
    if (!tk) return;

    const prioTag = $("#insp-priority-tag");
    prioTag.className = `tag ${tk.priorityTagClass}`;
    prioTag.textContent = tk.priorityLabel;

    $("#insp-ticket-code").textContent = tk.code;
    $("#insp-action-code").textContent = tk.code;
    $("#insp-citizen-name").textContent = tk.name;
    $("#insp-citizen-meta").textContent = `Documento: ${tk.doc} • Matrícula SANEPAR: ${tk.matricula}`;

    const waitBox = $("#insp-wait-box");
    waitBox.classList.toggle("over-target", tk.waitSeconds > TARGET_WAIT_SECONDS);
    $("#insp-wait-elapsed").textContent = formatSeconds(tk.waitSeconds);
    $("#insp-arrival-time").textContent = `Check-in chegada: ${tk.arrivalTimeStr}`;

    $("#insp-case-type").textContent = tk.caseType;
    $("#insp-demand-text").textContent = `"${tk.demandText}"`;

    const docsUl = $("#insp-docs-list");
    docsUl.innerHTML = "";
    tk.docs.forEach((d, idx) => {
      const li = document.createElement("li");
      li.innerHTML = `<label><input type="checkbox" data-doc-idx="${idx}" ${d.checked ? "checked" : ""} /> <span>${d.name}</span></label>`;
      li.querySelector("input").addEventListener("change", (e) => {
        tk.docs[idx].checked = e.target.checked;
      });
      docsUl.appendChild(li);
    });

    const inspPrintBox = $("#insp-print-simulation");
    if (inspPrintBox && state.printedInspTicketCode !== tk.code) {
      inspPrintBox.classList.add("hidden");
    }
  }

  // Simulação de impressão da senha selecionada na Aba 1 (Conferência)
  function simulateInspectionTicketPrint() {
    const tk = state.pendingQueue.find((t) => t.code === state.selectedTicketCode);
    if (!tk) return;
    const printBox = $("#insp-print-simulation");
    const statusBar = $("#insp-print-status-bar");
    const statusText = $("#insp-print-status-text");
    if (!printBox) return;

    state.printedInspTicketCode = tk.code;

    $("#insp-print-code").textContent = tk.code;
    $("#insp-print-category").textContent = tk.priorityLabel;
    $("#insp-print-citizen").textContent = tk.name;
    $("#insp-print-doc").textContent = tk.doc || "Não informado";
    $("#insp-print-matricula").textContent = tk.matricula || "104892-3";
    $("#insp-print-datetime").textContent = `Hoje • Chegada ${tk.arrivalTimeStr}`;
    $("#insp-print-subject").textContent = tk.caseType;
    $("#insp-print-timestamp").textContent = `${new Date().toLocaleDateString("pt-BR")} às ${nowHHMMSS()}`;
    $("#insp-print-qr").innerHTML = generateQrSvg(`REC-INSP-${tk.code}-${tk.matricula}`);

    printBox.classList.remove("hidden");
    statusBar.classList.add("printing");
    statusText.textContent = `🖨️ Imprimindo comprovante da senha ${tk.code}... aguarde`;
    printBox.scrollIntoView({ behavior: "smooth", block: "nearest" });

    setTimeout(() => {
      statusBar.classList.remove("printing");
      statusText.textContent = `✓ Senha ${tk.code} impressa com sucesso! Retire o comprovante.`;
    }, 850);

    syncPrintOnlyMount("#insp-print-simulation");
  }

  function syncPrintOnlyMount(simBoxSelector) {
    const mount = $("#print-only-mount");
    const simBox = $(simBoxSelector);
    if (!mount || !simBox) return;
    const paper = simBox.querySelector(".thermal-ticket-paper");
    if (paper) {
      mount.innerHTML = "";
      mount.appendChild(paper.cloneNode(true));
    }
  }

  function printOnlyThermalTicket(simBoxSelector) {
    syncPrintOnlyMount(simBoxSelector);
    window.print();
  }

  const btnImprimirInsp = $("#btn-imprimir-senha-insp");
  if (btnImprimirInsp) {
    btnImprimirInsp.addEventListener("click", simulateInspectionTicketPrint);
  }
  const btnInspBrowserPrint = $("#btn-insp-browser-print");
  if (btnInspBrowserPrint) {
    btnInspBrowserPrint.addEventListener("click", () => printOnlyThermalTicket("#insp-print-simulation"));
  }
  const btnInspClosePrint = $("#btn-insp-close-print");
  if (btnInspClosePrint) {
    btnInspClosePrint.addEventListener("click", () => {
      state.printedInspTicketCode = null;
      $("#insp-print-simulation").classList.add("hidden");
    });
  }

  $("#btn-marcar-todos-docs").addEventListener("click", () => {
    const tk = state.pendingQueue.find((t) => t.code === state.selectedTicketCode);
    if (!tk) return;
    tk.docs.forEach((d) => (d.checked = true));
    renderInspectionDesk();
  });

  $("#form-busca-senha").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = $("#input-busca-senha").value.trim().toUpperCase();
    if (!q) return;
    const found = state.pendingQueue.find((t) => t.code.toUpperCase() === q);
    if (found) {
      state.selectedTicketCode = found.code;
      renderPendingQueue();
      renderInspectionDesk();
      $("#input-busca-senha").value = "";
    } else {
      alert(`Senha "${q}" não encontrada na fila de chegada pendente.`);
    }
  });

  // AÇÃO 1: Liberar para o Guichê (Check-in da Recepção)
  $("#btn-liberar-guiche").addEventListener("click", () => {
    const tk = state.pendingQueue.find((t) => t.code === state.selectedTicketCode);
    if (!tk) return;

    const unchecked = tk.docs.filter((d) => !d.checked);
    if (unchecked.length > 0) {
      const confirmAnyway = confirm(
        `Atenção: Há ${unchecked.length} documento(s) não marcado(s) na conferência.\nDeseja liberar a senha ${tk.code} mesmo assim?`
      );
      if (!confirmAnyway) return;
    }

    const checkinTime = nowHHMM();
    state.releasedCount += 1;
    state.completedWaitSeconds.push(tk.waitSeconds);
    const underTarget = tk.waitSeconds <= TARGET_WAIT_SECONDS;
    const ptsEarned = underTarget ? 30 : 10;

    state.releasedQueue.unshift({
      code: tk.code,
      queueKey: tk.queueKey || "normal",
      priorityLabel: tk.priorityLabel,
      priorityTagClass: tk.priorityTagClass,
      name: tk.name,
      matricula: tk.matricula,
      demand: tk.caseType,
      arrival: tk.arrivalTimeStr,
      checkinRec: checkinTime,
      waitSeconds: tk.waitSeconds,
      guiche: (tk.queueKey || "normal") === "normal" ? "G-02" : "G-01",
    });

    state.history.unshift({
      code: tk.code,
      citizen: `${tk.name} • Mat. ${tk.matricula}`,
      demand: tk.caseType,
      arrival: tk.arrivalTimeStr,
      checkinRec: checkinTime,
      waitSeconds: tk.waitSeconds,
      outcomeType: "released",
      outcomeLabel: `✓ Documentos conferidos • Liberado p/ Guichê (${tk.priorityLabel})`,
    });

    state.pendingQueue = state.pendingQueue.filter((t) => t.code !== tk.code);

    const speech = underTarget
      ? `🎉 <strong>Dica do Aqualino (+${ptsEarned} pts):</strong> Você conferiu os documentos e liberou a senha <strong>${tk.code}</strong> em <strong>${formatSeconds(tk.waitSeconds)}</strong> (abaixo do objetivo de 03m 00s)!`
      : `👍 <strong>Check-in concluído (+${ptsEarned} pts):</strong> Senha <strong>${tk.code}</strong> liberada para o guichê.`;

    addGamificationPoints(ptsEarned, speech);
    renderPendingQueue();
    renderInspectionDesk();
    renderReleasedQueue();
    renderHistoryTable();
    renderRatingEligibleChips();
  });

  // AÇÃO 2: Atender e Resolver na Própria Recepção (Atendimento Evitado)
  $("#btn-resolver-recepcao").addEventListener("click", () => {
    const tk = state.pendingQueue.find((t) => t.code === state.selectedTicketCode);
    if (!tk) return;

    state.avoidedCount += 1;
    state.completedWaitSeconds.push(tk.waitSeconds);

    state.history.unshift({
      code: tk.code,
      citizen: `${tk.name} • Mat. ${tk.matricula}`,
      demand: tk.caseType,
      arrival: tk.arrivalTimeStr,
      checkinRec: nowHHMM(),
      waitSeconds: tk.waitSeconds,
      outcomeType: "avoided",
      outcomeLabel: "⚡ Demanda resolvida na Recepção (Atendimento Evitado)",
    });

    state.pendingQueue = state.pendingQueue.filter((t) => t.code !== tk.code);

    addGamificationPoints(
      50,
      `🌟 <strong>Aqualino comemora! (+50 pts)</strong> Você resolveu a demanda de <strong>${tk.name} (${tk.code})</strong> direto na recepção em <strong>${formatSeconds(tk.waitSeconds)}</strong>! Mais um atendimento no guichê evitado!`
    );

    renderPendingQueue();
    renderInspectionDesk();
    renderHistoryTable();
    renderRatingEligibleChips();
  });

  // AÇÃO 3: Cancelar Atendimento da Senha na Conferência
  $("#btn-abrir-cancelamento").addEventListener("click", () => {
    $("#select-cancel-reason").value = "";
    $("#cancel-reason-box").classList.remove("hidden");
  });

  $("#btn-fechar-cancelamento").addEventListener("click", () => {
    $("#cancel-reason-box").classList.add("hidden");
  });

  $("#btn-confirmar-cancelamento").addEventListener("click", () => {
    const tk = state.pendingQueue.find((t) => t.code === state.selectedTicketCode);
    if (!tk) return;

    const reason = $("#select-cancel-reason").value;
    if (!reason) {
      alert("Selecione uma justificativa pré-definido para cancelar a senha.");
      return;
    }

    state.canceledCount += 1;
    state.completedWaitSeconds.push(tk.waitSeconds);

    state.history.unshift({
      code: tk.code,
      citizen: `${tk.name} • Mat. ${tk.matricula}`,
      demand: tk.caseType,
      arrival: tk.arrivalTimeStr,
      checkinRec: nowHHMM(),
      waitSeconds: tk.waitSeconds,
      outcomeType: "canceled",
      outcomeLabel: `✕ Cancelado: ${reason}`,
    });

    state.pendingQueue = state.pendingQueue.filter((t) => t.code !== tk.code);
    $("#cancel-reason-box").classList.add("hidden");

    addGamificationPoints(
      15,
      `🛡️ <strong>Triagem preventiva (+15 pts):</strong> Senha <strong>${tk.code}</strong> cancelada com justificativa (<em>${reason}</em>), evitando espera improdutiva no guichê!`
    );

    renderPendingQueue();
    renderInspectionDesk();
    renderHistoryTable();
    renderRatingEligibleChips();
  });

  // =========================================================================
  // AJUSTE 6: GESTÃO DE SENHAS LIBERADAS PELA RECEPÇÃO
  // (Alterar fila Normal <-> Preferencial ou Cancelar por desistência pós-check-in)
  // =========================================================================
  function renderReleasedQueue() {
    const container = $("#released-tickets-list");
    container.innerHTML = "";

    if (!state.releasedQueue.length) {
      container.innerHTML = `<div class="empty-state">Nenhuma senha liberada aguardando chamada no momento.</div>`;
      populateReceptionInterventionSelects();
      return;
    }

    state.releasedQueue.forEach((item) => {
      const div = document.createElement("div");
      div.className = "released-item";
      div.innerHTML = `
        <div class="released-item-top">
          <div class="q-left">
            <div class="q-code-line">
              <span class="q-code">${item.code}</span>
              <span class="tag ${item.priorityTagClass}">${item.priorityLabel}</span>
              <span class="tag tag-teal">Guichê: ${item.guiche || "G-02"}</span>
              <span class="tag tag-green">Check-in Recepção: ${item.checkinRec}</span>
            </div>
            <span class="q-name">${item.name} • Mat. ${item.matricula}</span>
            <span class="q-demand">Demanda: ${item.demand}</span>
          </div>

          <div class="released-controls">
            <select class="select-change-queue" aria-label="Alterar fila da senha ${item.code}">
              <option value="normal" ${item.queueKey === "normal" ? "selected" : ""}>Fila: Senha Normal</option>
              <option value="idosa" ${item.queueKey === "idosa" ? "selected" : ""}>Fila: Preferencial • Pessoa Idosa (60+)</option>
              <option value="pcd" ${item.queueKey === "pcd" ? "selected" : ""}>Fila: Preferencial • PcD / TEA</option>
              <option value="gestante" ${item.queueKey === "gestante" ? "selected" : ""}>Fila: Preferencial • Gestante / Colo</option>
              <option value="agendado" ${item.queueKey === "agendado" ? "selected" : ""}>Fila: Atendimento Agendado</option>
            </select>
            <button type="button" class="btn btn-secondary btn-sm btn-apply-queue">
              ⇄ Alterar Fila
            </button>
            <button type="button" class="btn btn-danger-outline btn-sm btn-toggle-post-cancel">
              ✕ Cancelar Senha
            </button>
          </div>
        </div>

        <div class="cancel-box post-cancel-box hidden">
          <label><strong>Justificativa para cancelar a senha ${item.code} (pós-liberação):</strong></label>
          <select class="select-post-cancel-reason">
            <option value="">-- Escolha um motivo pré-definido --</option>
            <option value="Desistência voluntária do cidadão após o check-in da recepção">Desistência voluntária do cidadão após o check-in da recepção</option>
            <option value="Cidadão precisou se ausentar antes da chamada no guichê">Cidadão precisou se ausentar antes da chamada no guichê</option>
            <option value="Cidadão optou por agendar o atendimento para outra data">Cidadão optou por agendar o atendimento para outra data</option>
            <option value="Falta de documento complementar identificada após conferência">Falta de documento complementar identificada após conferência</option>
          </select>
          <div class="btn-row">
            <button type="button" class="btn btn-secondary btn-sm flex-1 btn-close-post-cancel">Voltar</button>
            <button type="button" class="btn btn-danger btn-sm flex-1 btn-confirm-post-cancel">Confirmar Cancelamento</button>
          </div>
        </div>
      `;

      // Alterar Fila (ex.: de Senha Normal para Preferencial)
      const selectQueue = div.querySelector(".select-change-queue");
      div.querySelector(".btn-apply-queue").addEventListener("click", () => {
        const newKey = selectQueue.value;
        if (newKey === item.queueKey) {
          alert(`A senha ${item.code} já está na fila "${item.priorityLabel}". Selecione outra fila no seletor ao lado para alterar.`);
          return;
        }
        const oldLabel = item.priorityLabel;
        const newType = QUEUE_TYPES[newKey];
        item.queueKey = newKey;
        item.priorityLabel = newType.label;
        item.priorityTagClass = newType.tagClass;

        // Atualiza registro no histórico
        const histEntry = state.history.find((h) => h.code === item.code && h.outcomeType === "released");
        if (histEntry) {
          histEntry.outcomeLabel = `⇄ Fila alterada (${oldLabel} → ${newType.label}) • Aguardando Guichê`;
        } else {
          state.history.unshift({
            code: item.code,
            citizen: `${item.name} • Mat. ${item.matricula}`,
            demand: item.demand,
            arrival: item.arrival,
            checkinRec: nowHHMM(),
            waitSeconds: item.waitSeconds,
            outcomeType: "released",
            outcomeLabel: `⇄ Fila alterada (${oldLabel} → ${newType.label})`,
          });
        }

        addGamificationPoints(
          10,
          `⇄ <strong>Fila atualizada pela recepção (+10 pts):</strong> A senha <strong>${item.code} (${item.name})</strong> foi alterada de <em>${oldLabel}</em> para <strong>${newType.label}</strong>!`
        );
        renderReleasedQueue();
        renderHistoryTable();
      });

      // Cancelar senha pós-liberação (ex.: desistência do cidadão)
      const cancelBox = div.querySelector(".post-cancel-box");
      div.querySelector(".btn-toggle-post-cancel").addEventListener("click", () => {
        cancelBox.classList.toggle("hidden");
      });
      div.querySelector(".btn-close-post-cancel").addEventListener("click", () => {
        cancelBox.classList.add("hidden");
      });
      div.querySelector(".btn-confirm-post-cancel").addEventListener("click", () => {
        const reason = div.querySelector(".select-post-cancel-reason").value;
        if (!reason) {
          alert("Selecione uma justificativa pré-definida para cancelar a senha.");
          return;
        }

        state.releasedQueue = state.releasedQueue.filter((r) => r.code !== item.code);
        state.releasedCount = Math.max(0, state.releasedCount - 1);
        state.canceledCount += 1;

        const histEntry = state.history.find((h) => h.code === item.code);
        if (histEntry) {
          histEntry.outcomeType = "canceled";
          histEntry.outcomeLabel = `✕ Cancelado pós-check-in: ${reason}`;
        } else {
          state.history.unshift({
            code: item.code,
            citizen: `${item.name} • Mat. ${item.matricula}`,
            demand: item.demand,
            arrival: item.arrival,
            checkinRec: nowHHMM(),
            waitSeconds: item.waitSeconds,
            outcomeType: "canceled",
            outcomeLabel: `✕ Cancelado pós-check-in: ${reason}`,
          });
        }

        addGamificationPoints(
          5,
          `📋 <strong>Fila atualizada (+5 pts):</strong> A senha <strong>${item.code} (${item.name})</strong> foi cancelada após o check-in (<em>${reason}</em>), liberando vaga no guichê!`
        );
        renderDashboardKpis();
        renderReleasedQueue();
        renderHistoryTable();
        renderRatingEligibleChips();
      });

      container.appendChild(div);
    });

    populateReceptionInterventionSelects();
  }

  function populateReceptionInterventionSelects() {
    const selTicket = $("#select-senha-intervencao");
    const selDest = $("#select-guiche-destino");
    const selRuleCounter = $("#select-guiche-regra");

    if (selTicket) {
      const prevVal = selTicket.value;
      selTicket.innerHTML = "";
      if (state.releasedQueue.length === 0) {
        const opt = document.createElement("option");
        opt.value = "";
        opt.textContent = "Nenhuma senha liberada aguardando chamada";
        selTicket.appendChild(opt);
      } else {
        state.releasedQueue.forEach((t) => {
          const opt = document.createElement("option");
          opt.value = t.code;
          opt.textContent = `${t.code} • ${t.priorityLabel} (${t.demand}) — Atual: ${t.guiche || "G-02"}`;
          selTicket.appendChild(opt);
        });
        if (prevVal && state.releasedQueue.some((t) => t.code === prevVal)) {
          selTicket.value = prevVal;
        }
      }
    }

    if (selDest && state.agencyCounters) {
      const prevDest = selDest.value;
      selDest.innerHTML = "";
      const openCounters = state.agencyCounters.filter((c) => c.isOpen);
      openCounters.forEach((c) => {
        const opt = document.createElement("option");
        opt.value = c.id;
        const badgeNew = c.newlyOpened ? "✨ [NOVO ABERTO] " : "";
        opt.textContent = `${badgeNew}${c.id} (${c.attendant}) — ${c.rule}`;
        selDest.appendChild(opt);
      });
      if (prevDest && openCounters.some((c) => c.id === prevDest)) {
        selDest.value = prevDest;
      }
    }

    if (selRuleCounter && state.agencyCounters) {
      const prevRuleC = selRuleCounter.value;
      selRuleCounter.innerHTML = "";
      state.agencyCounters.forEach((c) => {
        const opt = document.createElement("option");
        opt.value = c.id;
        const statusTxt = c.isOpen ? "Aberto" : "Fechado";
        opt.textContent = `${c.id} (${c.attendant} • ${statusTxt}) — Regra atual: ${c.rule}`;
        selRuleCounter.appendChild(opt);
      });
      if (prevRuleC && state.agencyCounters.some((c) => c.id === prevRuleC)) {
        selRuleCounter.value = prevRuleC;
      }
    }
  }

  const formTransferirFila = $("#form-transferir-fila");
  if (formTransferirFila) {
    formTransferirFila.addEventListener("submit", (e) => {
      e.preventDefault();
      const code = $("#select-senha-intervencao").value;
      const destId = $("#select-guiche-destino").value;
      if (!code || !destId) return;

      const ticket = state.releasedQueue.find((t) => t.code === code);
      const destCounter = state.agencyCounters.find((c) => c.id === destId);
      if (!ticket || !destCounter) return;

      const prevGuiche = ticket.guiche || "G-02";
      ticket.guiche = destCounter.id;

      const histEntry = state.history.find((h) => h.code === ticket.code);
      if (histEntry) {
        histEntry.outcomeLabel = `⇄ Transferido na Recepção (${prevGuiche} → ${destCounter.id} • ${destCounter.attendant})`;
      }

      const banner = $("#intervention-feedback-banner");
      if (banner) {
        banner.innerHTML = `
          <div class="instant-meta"><span class="status-dot"></span><span>Transferência Imediata Executada pela Recepção</span></div>
          <p class="instant-text">A senha <strong>${ticket.code} (${ticket.name} • ${ticket.demand})</strong> foi transferida de <strong>${prevGuiche}</strong> para o guichê <strong>${destCounter.id} (${destCounter.attendant})</strong> com prioridade na fila!</p>
        `;
        banner.classList.remove("hidden");
      }

      addGamificationPoints(
        20,
        `⇄ <strong>Intervenção Ágil na Fila (+20 pts):</strong> Você redistribuiu a senha <strong>${ticket.code}</strong> de <strong>${prevGuiche}</strong> para <strong>${destCounter.id} (${destCounter.attendant})</strong>, equilibrando a espera na agência!`
      );

      renderReleasedQueue();
      renderHistoryTable();
    });
  }

  const formRedistribuirGuiche = $("#form-redistribuir-guiche");
  if (formRedistribuirGuiche) {
    formRedistribuirGuiche.addEventListener("submit", (e) => {
      e.preventDefault();
      const counterId = $("#select-guiche-regra").value;
      const newRule = $("#select-nova-regra").value;
      if (!counterId || !newRule) return;

      const counter = state.agencyCounters.find((c) => c.id === counterId);
      if (!counter) return;

      const wasClosed = !counter.isOpen;
      counter.isOpen = true;
      counter.rule = newRule;
      if (wasClosed) {
        counter.newlyOpened = true;
      }

      const numPart = counter.id.replace("G-", "");
      const guicheLabel = `Guichê ${numPart}`;
      const liveMatch = state.liveCounters.find((lc) => lc.guiche === guicheLabel);
      if (liveMatch) {
        liveMatch.type = newRule;
      } else if (wasClosed) {
        state.liveCounters.push({
          guiche: guicheLabel,
          ticket: "LIVRE",
          type: newRule,
        });
      }

      const banner = $("#intervention-feedback-banner");
      if (banner) {
        banner.innerHTML = `
          <div class="instant-meta"><span class="status-dot"></span><span>${wasClosed ? "Novo Guichê de Reforço Aberto e Configurado" : "Regra de Atendimento Atualizada no Guichê"}</span></div>
          <p class="instant-text">O guichê <strong>${counter.id} (${counter.attendant})</strong> agora opera com a regra <strong>"${newRule}"</strong>${wasClosed ? " e já está disponível na lista de guichês abertos para receber transferências imediatas!" : " e a distribuição automática de senhas foi reequilibrada!"}</p>
        `;
        banner.classList.remove("hidden");
      }

      addGamificationPoints(
        25,
        `⚡ <strong>Atuação Direta na Agência (+25 pts):</strong> ${wasClosed ? `Guichê de reforço <strong>${counter.id}</strong> aberto` : `Guichê <strong>${counter.id}</strong> reconfigurado`} com a regra <strong>${newRule}</strong>!`
      );

      populateReceptionInterventionSelects();
      const selDest = $("#select-guiche-destino");
      if (selDest) selDest.value = counter.id;
      renderLiveCounters();
    });
  }

  // Simular chegada de novo cidadão na recepção (com checkboxes desmarcados)
  $("#btn-simular-chegada").addEventListener("click", () => {
    const samples = [
      {
        prefix: "N",
        queueKey: "normal",
        priorityLabel: "Senha Normal",
        priorityTagClass: "tag-blue",
        name: "Patrícia Gomes",
        doc: "412.998.102-44",
        matricula: "601928-4",
        caseType: "Troca de Titularidade",
        demandText: "Comprei um imóvel no bairro Portão e quero atualizar o titular da matrícula.",
        docs: [
          { name: "RG e CPF do comprador", checked: false },
          { name: "Escritura pública ou Matrícula do Registro de Imóveis", checked: false },
          { name: "Número da matrícula SANEPAR e leitura atual", checked: false },
        ],
      },
      {
        prefix: "P",
        queueKey: "idosa",
        priorityLabel: "Preferencial • Pessoa Idosa (60+)",
        priorityTagClass: "tag-teal",
        name: "Sr. Osvaldo Ribeiro (72 anos)",
        doc: "109.332.874-15",
        matricula: "310942-0",
        caseType: "Religação de Água",
        demandText: "Paguei a fatura em atraso hoje cedo e quero solicitar a religação de água.",
        docs: [
          { name: "Documento oficial com foto (RG ou CNH) e CPF", checked: false },
          { name: "Comprovante de pagamento da fatura vencida", checked: false },
        ],
      },
    ];

    const pick = samples[state.nextTicketNum % samples.length];
    const code = `${pick.prefix}-${state.nextTicketNum}`;
    state.nextTicketNum += 1;

    state.pendingQueue.push({
      code,
      queueKey: pick.queueKey,
      priorityLabel: pick.priorityLabel,
      priorityTagClass: pick.priorityTagClass,
      name: pick.name,
      doc: pick.doc,
      matricula: pick.matricula,
      arrivalTimeStr: nowHHMM(),
      waitSeconds: 12,
      caseType: pick.caseType,
      demandText: pick.demandText,
      docs: pick.docs,
    });

    state.selectedTicketCode = code;
    renderDashboardKpis();
    renderPendingQueue();
    renderInspectionDesk();
    renderRatingEligibleChips();
  });

  function renderHistoryTable() {
    const tbody = $("#history-table-body");
    tbody.innerHTML = "";
    state.history.forEach((row) => {
      const tr = document.createElement("tr");
      const under = row.waitSeconds <= TARGET_WAIT_SECONDS;
      const waitTagClass = under ? "tag-green" : "tag-amber";
      tr.innerHTML = `
        <td><strong>${row.code}</strong></td>
        <td>${row.citizen}</td>
        <td>${row.demand}</td>
        <td>${row.arrival}</td>
        <td>${row.checkinRec}</td>
        <td><span class="tag ${waitTagClass}">${formatSeconds(row.waitSeconds)}</span></td>
        <td>${row.outcomeLabel}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  setInterval(() => {
    if (!state.pendingQueue.length) return;
    state.pendingQueue.forEach((t) => {
      t.waitSeconds += 1;
    });
    renderPendingQueue();
    renderInspectionDesk();
  }, 1000);

  // =========================================================================
  // MÓDULO 2: ATENDIMENTO A CIDADÃO SEM CELULAR (TRIAGEM, SENHA E AGENDAMENTO)
  // =========================================================================
  const inputNome = $("#input-nome");
  const inputDoc = $("#input-doc");
  const inputMatricula = $("#input-matricula");
  const inputProblema = $("#input-problema");

  inputDoc.addEventListener("input", (e) => {
    e.target.value = formatDoc(e.target.value);
  });

  $$(".chip-preset").forEach((chip) => {
    chip.addEventListener("click", () => {
      inputNome.value = chip.dataset.name || "Cidadão Presencial";
      inputDoc.value = chip.dataset.doc;
      inputMatricula.value = chip.dataset.matricula;
      runReceptionSgcLookup();
    });
  });

  $("#form-identificacao").addEventListener("submit", (e) => {
    e.preventDefault();
    runReceptionSgcLookup();
  });

  function runReceptionSgcLookup() {
    const docDigits = onlyDigits(inputDoc.value);
    const matDigits = onlyDigits(inputMatricula.value);
    if (!docDigits && !matDigits) {
      alert("Informe o CPF, CNPJ ou Matrícula do cidadão.");
      return;
    }

    const ms = Math.floor(95 + Math.random() * 60);
    const name = inputNome.value.trim() || "Maria Clara Oliveira";
    const mat = inputMatricula.value.trim() || "104892-3";
    const isCommercial = docDigits.length === 14;
    const isInOrder = matDigits === "8823105";

    $("#sgc-latency").textContent = `Consultado em ${ms} ms • Matrícula ${mat}`;

    const shortcuts = $("#sgc-shortcuts");
    shortcuts.innerHTML = "";

    if (!isCommercial && !isInOrder) {
      $("#sgc-message").textContent =
        `Olá! Identificamos para ${name} uma fatura pendente com vencimento hoje (R$ 148,90). Deseja emitir a 2ª via direto por aqui na recepção ou retirar senha para o atendimento presencial?`;

      const b2via = document.createElement("button");
      b2via.type = "button";
      b2via.className = "btn btn-secondary btn-sm btn-block";
      b2via.textContent = "📄 Emitir 2ª via direto aqui na Recepção";
      b2via.addEventListener("click", () => {
        $("#inv-matricula").textContent = mat;
        $("#copy-feedback").classList.add("hidden");
        $("#fatura-express-card").classList.remove("hidden");
      });
      shortcuts.appendChild(b2via);
    } else {
      $("#sgc-message").textContent =
        `Cadastro de ${name} (Matrícula ${mat}) verificado e sem faturas vencendo hoje. Registre abaixo a solicitação do cidadão ou gere a senha de atendimento.`;
    }

    $("#sgc-result-box").classList.remove("hidden");
  }

  $("#btn-close-fatura").addEventListener("click", () => {
    $("#fatura-express-card").classList.add("hidden");
  });

  $("#btn-copy-code").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText($("#inv-code").textContent);
    } catch (_) { }
    $("#copy-feedback").classList.remove("hidden");
  });

  $("#btn-confirm-fatura-resolvida").addEventListener("click", () => {
    const citizenName = inputNome.value.trim() || "Maria Clara Oliveira";
    const mat = inputMatricula.value.trim() || "104892-3";
    $("#fatura-express-card").classList.add("hidden");

    const code = `REC-${state.nextTicketNum}`;
    state.nextTicketNum += 1;
    state.avoidedCount += 1;
    state.completedWaitSeconds.push(45);
    state.history.unshift({
      code,
      citizen: `${citizenName} • Mat. ${mat}`,
      demand: "2ª Via de Fatura (Vencimento Hoje)",
      arrival: nowHHMM(),
      checkinRec: nowHHMM(),
      waitSeconds: 45,
      outcomeType: "avoided",
      outcomeLabel: "⚡ 2ª via emitida na Recepção (Atendimento Evitado)",
    });

    addGamificationPoints(
      50,
      `🌟 <strong>2ª Via Expressa na Recepção! (+50 pts)</strong> Você resolveu o atendimento de <strong>${citizenName} (${code})</strong> sem precisar gerar fila no guichê!`
    );
    renderHistoryTable();
    renderRatingEligibleChips();
  });

  // Voz na Recepção
  const btnVoice = $("#btn-voice");
  const voiceStatus = $("#voice-status");
  let isListening = false;

  btnVoice.addEventListener("click", () => {
    isListening = !isListening;
    btnVoice.classList.toggle("listening", isListening);
    voiceStatus.classList.toggle("hidden", !isListening);
    $("#voice-label").textContent = isListening ? "Ouvindo..." : "Captar por voz";
  });

  $("#btn-voice-sim-stop").addEventListener("click", () => {
    isListening = false;
    btnVoice.classList.remove("listening");
    voiceStatus.classList.add("hidden");
    $("#voice-label").textContent = "Captar por voz";
    if (!inputProblema.value.trim()) {
      inputProblema.value =
        "Preciso fazer a troca de titularidade da conta de água para o meu nome.";
    }
    analyzeWalkinProblem();
  });

  $$(".chip-topic").forEach((chip) => {
    chip.addEventListener("click", () => {
      inputProblema.value = chip.dataset.text;
      analyzeWalkinProblem();
    });
  });

  $("#btn-analisar-problema").addEventListener("click", analyzeWalkinProblem);

  function classifyProblem(text) {
    const t = text.toLowerCase();
    if (/(bueiro|boca de lobo|chuva|alagamento|drenagem|asfalto|buraco|lixo|coleta|iluminação)/i.test(t)) {
      return {
        tagClass: "tag-amber",
        tagText: "Outra Instituição • Não é SANEPAR",
        title: "Orientar o cidadão a buscar a Prefeitura de Curitiba (Central 156)",
        bodyHtml:
          "<p>Drenagem pluvial (bocas de lobo/bueiros), pavimentação/asfalto, coleta de lixo e iluminação pública <strong>não são resolvidos pela SANEPAR</strong>. Oriente o cidadão a acionar a Prefeitura de Curitiba.</p>",
        externalHtml: "<strong>Órgão responsável:</strong> Prefeitura de Curitiba — Disque <strong>156</strong>",
        docsCaseName: "Verificação de Rede SANEPAR",
        docs: ["Documento oficial com foto (RG ou CNH) e CPF", "Endereço e fotos do local"],
      };
    }

    if (/(luz|energia|copel|poste|fio elétrico|apagão)/i.test(t)) {
      return {
        tagClass: "tag-amber",
        tagText: "Outra Instituição • Não é SANEPAR",
        title: "Orientar o cidadão a buscar a COPEL",
        bodyHtml:
          "<p>Serviços de energia elétrica e manutenção de postes <strong>não podem ser resolvidos pela SANEPAR</strong>, devendo ser tratados diretamente na COPEL.</p>",
        externalHtml: "<strong>Órgão responsável:</strong> COPEL — Atendimento <strong>0800 51 00 116</strong>",
        docsCaseName: "Orientação Presencial",
        docs: ["Documento oficial com foto (RG ou CNH) e CPF"],
      };
    }

    if (/(titularidade|nome|inquilino|locação|proprietário)/i.test(t)) {
      return {
        tagClass: "tag-blue",
        tagText: "SANEPAR • Exige Documentos",
        title: "Troca de Titularidade da Matrícula",
        bodyHtml:
          "<p>Requer conferência do documento de posse ou contrato de locação do imóvel e documento de identificação do novo titular.</p>",
        externalHtml: "",
        docsCaseName: "Troca de Titularidade",
        docs: [
          "RG e CPF (ou CNPJ + Contrato Social)",
          "Contrato de locação vigente ou Escritura / Matrícula do Imóvel",
          "Número da matrícula SANEPAR e leitura atual do hidrômetro",
        ],
      };
    }

    if (/(parcelar|parcelamento|dívida|atraso|atrasada|negociar|débito)/i.test(t)) {
      return {
        tagClass: "tag-blue",
        tagText: "SANEPAR • Negociação",
        title: "Parcelamento de Débitos",
        bodyHtml:
          "<p>Permite parcelar faturas em atraso mediante conferência de titularidade ou procuração.</p>",
        externalHtml: "",
        docsCaseName: "Parcelamento de Débitos",
        docs: [
          "Documento oficial com foto (RG ou CNH) e CPF do titular",
          "Procuração ou comprovante de vínculo com o imóvel (se não for titular)",
          "Faturas em aberto ou número da matrícula SANEPAR",
        ],
      };
    }

    if (/(tarifa social|água solidária|baixa renda|cadúnico|cadunico|nis)/i.test(t)) {
      return {
        tagClass: "tag-teal",
        tagText: "SANEPAR • Benefício Social",
        title: "Inclusão na Tarifa Social (Água Solidária)",
        bodyHtml: "<p>Conferir inscrição ativa no CadÚnico (NIS) e fatura residencial.</p>",
        externalHtml: "",
        docsCaseName: "Tarifa Social",
        docs: [
          "RG e CPF do responsável familiar",
          "Folha Resumo do CadÚnico com número do NIS",
          "Fatura recente da SANEPAR",
        ],
      };
    }

    return {
      tagClass: "tag-green",
      tagText: "SANEPAR • Orientação",
      title: "Esclarecimento de Solicitação",
      bodyHtml:
        "<p>Caso o recepcionista já tenha esclarecido a dúvida ou registrado o pedido, clique em <strong>Resolvido na Recepção</strong>; se o cidadão ainda desejar guichê, confira os documentos ao lado.</p>",
      externalHtml: "",
      docsCaseName: "Atendimento Geral SANEPAR",
      docs: [
        "Documento oficial com foto (RG ou CNH) e CPF/CNPJ",
        "Número da matrícula SANEPAR ou fatura recente",
      ],
    };
  }

  function analyzeWalkinProblem() {
    const txt = inputProblema.value.trim();
    if (!txt) {
      alert("Descreva ou selecione a demanda apresentada pelo cidadão.");
      return;
    }
    const res = classifyProblem(txt);
    state.walkinTriage = res;

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

    $("#triage-result-card").classList.remove("hidden");
    renderWalkinDocs();
  }

  function renderWalkinDocs() {
    const info = state.walkinTriage || {
      docsCaseName: "Atendimento Geral SANEPAR",
      docs: [
        "Documento oficial com foto (RG ou CNH) e CPF/CNPJ",
        "Número da matrícula SANEPAR ou conta recente",
      ],
    };
    $("#docs-case-tag").textContent = info.docsCaseName;
    const ul = $("#docs-list");
    ul.innerHTML = "";
    info.docs.forEach((d) => {
      const li = document.createElement("li");
      li.innerHTML = `<label><input type="checkbox" /> <span>${d}</span></label>`;
      ul.appendChild(li);
    });
  }

  $("#btn-nao-presencial").addEventListener("click", () => {
    const name = inputNome.value.trim() || "Cidadão Presencial";
    const mat = inputMatricula.value.trim() || "Sem matrícula";
    const caseName = state.walkinTriage ? state.walkinTriage.docsCaseName : "Esclarecimento na Triagem";
    const code = `REC-${state.nextTicketNum}`;
    state.nextTicketNum += 1;

    state.avoidedCount += 1;
    state.completedWaitSeconds.push(60);
    state.history.unshift({
      code,
      citizen: `${name} • Mat. ${mat}`,
      demand: caseName,
      arrival: nowHHMM(),
      checkinRec: nowHHMM(),
      waitSeconds: 60,
      outcomeType: "avoided",
      outcomeLabel: "⚡ Esclarecido/Resolvido na Recepção (Atendimento Evitado)",
    });

    addGamificationPoints(
      50,
      `🏆 <strong>Demanda resolvida no balcão! (+50 pts)</strong> Você esclareceu a solicitação de <strong>${name} (${code})</strong> na recepção e evitou mais um atendimento no guichê!`
    );

    $("#walkin-ticket-feedback").classList.remove("hidden");
    $("#walkin-ticket-feedback").innerHTML = `
      <div class="instant-meta"><span class="status-dot"></span><span>Atendimento Evitado Registrado (${code} • +50 pts)</span></div>
      <p class="instant-text">Demanda de <strong>${name}</strong> registrada como resolvida na recepção com sucesso!</p>
    `;
    renderHistoryTable();
    renderRatingEligibleChips();
  });

  $("#btn-sim-presencial").addEventListener("click", () => {
    $("#walkin-step2-card").scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  $("#btn-ir-hoje").addEventListener("click", () => {
    state.walkinWhenMode = "hoje";
    $("#btn-ir-hoje").classList.add("selected");
    $("#btn-agendar-outro-dia").classList.remove("selected");
    $("#subflow-hoje").classList.remove("hidden");
    $("#subflow-agendar").classList.add("hidden");
  });

  $("#btn-agendar-outro-dia").addEventListener("click", () => {
    state.walkinWhenMode = "agendar";
    $("#btn-agendar-outro-dia").classList.add("selected");
    $("#btn-ir-hoje").classList.remove("selected");
    $("#subflow-agendar").classList.remove("hidden");
    $("#subflow-hoje").classList.add("hidden");
    renderWalkinCalendar();
  });

  function createWalkinTicket(releaseImmediately) {
    const checked = document.querySelector('input[name="priority-type"]:checked');
    const prio = checked ? checked.value : "normal";
    const chosen = QUEUE_TYPES[prio] || QUEUE_TYPES.normal;
    const code = `${chosen.prefix}-${state.nextTicketNum}`;
    state.nextTicketNum += 1;

    const name = inputNome.value.trim() || "Cidadão Presencial (Balcão)";
    const doc = inputDoc.value.trim() || "Não informado";
    const mat = inputMatricula.value.trim() || "104892-3";
    const caseName = state.walkinTriage ? state.walkinTriage.docsCaseName : "Atendimento Geral SANEPAR";
    const demandTxt = inputProblema.value.trim() || "Solicitação presencial registrada pela recepção.";
    const docsArr = (state.walkinTriage ? state.walkinTriage.docs : [
      "Documento oficial com foto (RG ou CNH) e CPF",
      "Número da matrícula SANEPAR",
    ]).map((d) => ({ name: d, checked: false }));

    const currentHHMM = nowHHMM();

    if (releaseImmediately) {
      state.releasedCount += 1;
      state.completedWaitSeconds.push(55);
      state.releasedQueue.unshift({
        code,
        queueKey: prio,
        priorityLabel: chosen.label,
        priorityTagClass: chosen.tagClass,
        name,
        matricula: mat,
        demand: caseName,
        arrival: currentHHMM,
        checkinRec: currentHHMM,
        waitSeconds: 55,
        guiche: prio === "normal" ? "G-02" : "G-01",
      });
      state.history.unshift({
        code,
        citizen: `${name} • Mat. ${mat}`,
        demand: caseName,
        arrival: currentHHMM,
        checkinRec: currentHHMM,
        waitSeconds: 55,
        outcomeType: "released",
        outcomeLabel: `✓ Triado na recepção e liberado direto p/ Guichê (${chosen.label})`,
      });
      addGamificationPoints(
        30,
        `⚡ <strong>Atendimento Cidadão sem Celular (+30 pts):</strong> Senha <strong>${code}</strong> emitida, documentos conferidos e check-in liberado em <strong>00m 55s</strong>!`
      );
      renderReleasedQueue();
      renderHistoryTable();
    } else {
      state.pendingQueue.push({
        code,
        queueKey: prio,
        priorityLabel: chosen.label,
        priorityTagClass: chosen.tagClass,
        name,
        doc,
        matricula: mat,
        arrivalTimeStr: currentHHMM,
        waitSeconds: 10,
        caseType: caseName,
        demandText: demandTxt,
        docs: docsArr,
      });
      state.selectedTicketCode = code;
      renderDashboardKpis();
      renderPendingQueue();
      renderInspectionDesk();
    }

    renderRatingEligibleChips();

    const fb = $("#walkin-ticket-feedback");
    fb.classList.remove("hidden");
    fb.innerHTML = `
      <div class="instant-meta"><span class="status-dot"></span><span>Senha Emitida: ${code} (${chosen.label})</span></div>
      <p class="instant-text">Cidadão: <strong>${name}</strong> • Caso: <strong>${caseName}</strong> • Status: <strong>${releaseImmediately ? "Check-in confirmado e liberado para o Guichê!" : "Adicionado à Fila de Conferência da Recepção (Aba 1)"}</strong></p>
    `;

    state.lastGeneratedTicket = {
      code,
      categoryLabel: chosen.label,
      name,
      doc,
      matricula: mat,
      unit: "Central Rebouças",
      datetime: `Hoje • Emitida às ${currentHHMM}`,
      subject: caseName,
    };
    const printBox = $("#ticket-print-simulation");
    if (printBox) printBox.classList.add("hidden");
  }

  $("#btn-gerar-senha-checkin-fila").addEventListener("click", () => createWalkinTicket(false));
  $("#btn-gerar-e-liberar-direto").addEventListener("click", () => createWalkinTicket(true));

  function renderWalkinCalendar() {
    const grid = $("#calendar-days");
    grid.innerHTML = "";
    $("#time-slots-container").classList.add("hidden");
    $("#btn-confirmar-agendamento").disabled = true;

    const baseDate = new Date(2026, 10, 17); // 17/11/2026
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
      btn.innerHTML = `<span>${weekNames[item.dow]}</span><strong>${dateStr}</strong><span class="demand-tag">${item.label}</span>`;

      if (item.level === "high") {
        btn.disabled = true;
      } else {
        btn.addEventListener("click", () => {
          $$(".day-card").forEach((c) => c.classList.remove("selected"));
          btn.classList.add("selected");
          state.walkinSelectedDate = `${weekNames[item.dow]}, ${dateStr}/2026`;
          renderWalkinSlots(item.level);
        });
      }
      grid.appendChild(btn);
    });
  }

  function renderWalkinSlots(level) {
    $("#selected-date-label").textContent = state.walkinSelectedDate;
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
        state.walkinSelectedSlot = t;
        $("#btn-confirmar-agendamento").disabled = false;
      });
      slotsEl.appendChild(b);
    });

    $("#time-slots-container").classList.remove("hidden");
  }

  $("#btn-confirmar-agendamento").addEventListener("click", () => {
    const code = `AG-${state.nextTicketNum + 80}`;
    state.nextTicketNum += 1;
    const name = inputNome.value.trim() || "Cidadão Presencial";
    const doc = inputDoc.value.trim() || "Não informado";
    const mat = inputMatricula.value.trim() || "104892-3";
    const caseName = state.walkinTriage ? state.walkinTriage.docsCaseName : "Atendimento Geral SANEPAR";
    const fb = $("#walkin-ticket-feedback");
    fb.classList.remove("hidden");
    fb.innerHTML = `
      <div class="instant-meta"><span class="status-dot"></span><span>Agendamento Confirmado: Senha ${code}</span></div>
      <p class="instant-text">Agendado para <strong>${name}</strong> em <strong>${state.walkinSelectedDate} às ${state.walkinSelectedSlot}</strong> (fora dos dias de pico do início do mês).</p>
    `;

    state.lastGeneratedTicket = {
      code,
      categoryLabel: "Atendimento Agendado",
      name,
      doc,
      matricula: mat,
      unit: "Central Rebouças",
      datetime: `${state.walkinSelectedDate} às ${state.walkinSelectedSlot}`,
      subject: caseName,
    };
    const printBox = $("#ticket-print-simulation");
    if (printBox) printBox.classList.add("hidden");

    addGamificationPoints(
      15,
      `📅 <strong>Agendamento Inteligente (+15 pts):</strong> Você agendou o atendimento de <strong>${name}</strong> em um dia de baixa procura (${state.walkinSelectedDate}), ajudando a suavizar os picos de demanda!`
    );
  });

  // Simulação de impressão da senha gerada na Aba 2 (como foi feito na TelaCidadao.html)
  function simulateWalkinTicketPrint() {
    if (!state.lastGeneratedTicket) {
      createWalkinTicket(false);
    }
    const tk = state.lastGeneratedTicket;
    const printBox = $("#ticket-print-simulation");
    const statusBar = $("#print-sim-status-bar");
    const statusText = $("#print-sim-status-text");
    if (!printBox || !tk) return;

    $("#print-ticket-code").textContent = tk.code;
    $("#print-ticket-category").textContent = tk.categoryLabel;
    $("#print-ticket-citizen").textContent = tk.name;
    $("#print-ticket-doc").textContent = tk.doc || "Não informado";
    $("#print-ticket-matricula").textContent = tk.matricula || "104892-3";
    $("#print-ticket-unit").textContent = tk.unit || "Central Rebouças";
    $("#print-ticket-datetime").textContent = tk.datetime;
    $("#print-ticket-subject").textContent = tk.subject;
    $("#print-ticket-timestamp").textContent = `${new Date().toLocaleDateString("pt-BR")} às ${nowHHMMSS()}`;
    $("#print-ticket-qr").innerHTML = generateQrSvg(`REC-PRINT-${tk.code}-${tk.matricula}`);

    printBox.classList.remove("hidden");
    statusBar.classList.add("printing");
    statusText.textContent = `🖨️ Imprimindo comprovante da senha ${tk.code}... aguarde`;
    printBox.scrollIntoView({ behavior: "smooth", block: "nearest" });

    setTimeout(() => {
      statusBar.classList.remove("printing");
      statusText.textContent = `✓ Senha ${tk.code} impressa com sucesso! Retire seu comprovante.`;
    }, 850);

    syncPrintOnlyMount("#ticket-print-simulation");
  }

  const btnImprimirSenha = $("#btn-imprimir-senha");
  if (btnImprimirSenha) {
    btnImprimirSenha.addEventListener("click", simulateWalkinTicketPrint);
  }

  const btnBrowserPrint = $("#btn-browser-print");
  if (btnBrowserPrint) {
    btnBrowserPrint.addEventListener("click", () => printOnlyThermalTicket("#ticket-print-simulation"));
  }

  const btnClosePrintSim = $("#btn-close-print-sim");
  if (btnClosePrintSim) {
    btnClosePrintSim.addEventListener("click", () => {
      $("#ticket-print-simulation").classList.add("hidden");
    });
  }

  // =========================================================================
  // MÓDULO 3: PAINEL DE GUICHÊS AO VIVO & PESQUISA DE SATISFAÇÃO COM VALIDAÇÃO DE SENHA
  // =========================================================================
  function renderLiveCounters() {
    const grid = $("#live-counters");
    grid.innerHTML = "";
    state.liveCounters.forEach((c) => {
      const div = document.createElement("div");
      div.className = "counter-tile";
      div.innerHTML = `<small>${c.guiche}</small><strong>${c.ticket}</strong><span>${c.type}</span>`;
      grid.appendChild(div);
    });

    const hist = $("#recent-calls-list");
    hist.innerHTML = "";
    state.recentCalls.slice(0, 6).forEach((code) => {
      const span = document.createElement("span");
      span.className = "recent-chip";
      span.textContent = code;
      hist.appendChild(span);
    });
  }

  $("#btn-simular-avanco").addEventListener("click", () => {
    const idx = Math.floor(Math.random() * state.liveCounters.length);
    const c = state.liveCounters[idx];
    const finishedTicketCode = c.ticket;

    // Marca a senha que estava no guichê como "Atendimento encerrado no Guichê"
    const existingHist = state.history.find((h) => h.code.toUpperCase() === finishedTicketCode.toUpperCase());
    if (existingHist) {
      existingHist.outcomeType = "finished";
      existingHist.outcomeLabel = `✓ Atendimento encerrado no ${c.guiche}`;
    } else {
      state.history.unshift({
        code: finishedTicketCode,
        citizen: `Cidadão Atendido (${c.type})`,
        demand: "Atendimento no Guichê",
        arrival: "15:50",
        checkinRec: "15:52",
        waitSeconds: 96,
        outcomeType: "finished",
        outcomeLabel: `✓ Atendimento encerrado no ${c.guiche}`,
      });
    }

    const [prefix, num] = c.ticket.split("-");
    const nextCode = `${prefix}-${String(Number(num) + 1).padStart(3, "0")}`;
    c.ticket = nextCode;
    state.recentCalls.unshift(nextCode);
    renderLiveCounters();
    renderHistoryTable();
  });

  function renderRatingEligibleChips() {
    // Sessão "Pesquisa de Satisfação" removida da TelaRecepcao.html (realizada em TelaAvaliacaoCidadao.html / TelaCidadao.html)
  }

  // Restaurar dados de demonstração
  $("#btn-reset-demo").addEventListener("click", () => {
    state.points = 340;
    state.avoidedCount = 4;
    state.releasedCount = 6;
    state.canceledCount = 1;
    state.completedWaitSeconds = [95, 112, 130, 88, 145, 102, 118, 84, 134];
    state.pendingQueue = initialPendingQueue();
    state.releasedQueue = initialReleasedQueue();
    state.agencyCounters = initialAgencyCounters();
    state.selectedTicketCode = "N-128";
    state.history = initialHistory();
    state.lastGeneratedTicket = null;
    state.printedInspTicketCode = null;
    const intBanner = $("#intervention-feedback-banner");
    if (intBanner) intBanner.classList.add("hidden");
    const walkinPrintBox = $("#ticket-print-simulation");
    if (walkinPrintBox) walkinPrintBox.classList.add("hidden");
    const inspPrintBox = $("#insp-print-simulation");
    if (inspPrintBox) inspPrintBox.classList.add("hidden");
    $("#mascot-speech").innerHTML =
      "💬 <strong>Dica do Aqualino:</strong> Mantenha o tempo entre a chegada do cidadão e o seu check-in abaixo de <strong>03m 00s</strong> (+30 pts) ou resolva a demanda direto na recepção para evitar fila no guichê (+50 pts)!";
    renderDashboardKpis();
    renderPendingQueue();
    renderInspectionDesk();
    renderReleasedQueue();
    renderHistoryTable();
    switchTab("tab-conferencia");
  });

  // Inicialização
  renderDashboardKpis();
  renderPendingQueue();
  renderInspectionDesk();
  renderReleasedQueue();
  renderHistoryTable();
  renderWalkinDocs();
  renderLiveCounters();
})();
