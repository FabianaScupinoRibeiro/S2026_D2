(() => {
  "use strict";

  // =========================================================================
  // BANCO DE DADOS INTEGRADO: PATROCINADORES, ESTOQUE DE ITENS DOADOS,
  // VÍNCULOS DE PRÊMIOS POR CICLO E RANKING POR UNIDADE (COM DRILL-DOWN)
  // =========================================================================
  function getInitialData() {
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

      // Estoque de itens doados pelos patrocinadores
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

      // Ciclos (Ciclo em Andamento C_2026_4 + Ciclos Anteriores C_2026_3 e C_2026_2)
      cycles: {
        C_2026_4: {
          id: "C_2026_4",
          code: "Ciclo 2026.4",
          label: "Ciclo 2026.4 (Em Andamento • Out–Dez/2026)",
          status: "VIGENTE",
          // Prêmios vinculados a cada Categoria e Faixa no Ciclo em Andamento
          prizeBuckets: [
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
          // Ranking por Unidade de Atendimento (com lista de membros para Drill-Down)
          unitsRanking: [
            {
              unitId: "U_BOAVISTA",
              unitName: "Posto Boa Vista — Rua da Cidadania (Curitiba)",
              coord: "01 • Coord. Curitiba Centro-Leste",
              tme: "06m 20s",
              nps: 92,
              collectivePts: 1298,
              tier: "OURO",
              members: [
                { code: "Equipe Boa Vista (Coletivo)", category: "GRUPO", roleLabel: "🤝 Equipe da Unidade", indPts: 0, grpPts: 1298, totalPts: 1298, tier: "OURO" },
                { code: "Supervisor Local #S-03", category: "SUPERVISOR", roleLabel: "📊 Supervisor Local", indPts: 810, grpPts: 440, totalPts: 1375, tier: "OURO" },
                { code: "Atendente #501 • Guichê 01", category: "ATENDENTE", roleLabel: "🎧 Atendente de Guichê", indPts: 790, grpPts: 410, totalPts: 1320, tier: "OURO" },
                { code: "Recepcionista #R-312", category: "RECEPCAO", roleLabel: "🛎️ Recepcionista", indPts: 695, grpPts: 390, totalPts: 1193, tier: "OURO" },
                { code: "Atendente #502 • Guichê 02", category: "ATENDENTE", roleLabel: "🎧 Atendente de Guichê", indPts: 640, grpPts: 390, totalPts: 1120, tier: "PRATA" },
              ],
            },
            {
              unitId: "U_MARINGA",
              unitName: "Central Maringá Brasil (Maringá)",
              coord: "07 • Coord. Maringá",
              tme: "07m 00s",
              nps: 91,
              collectivePts: 1265,
              tier: "OURO",
              members: [
                { code: "Atendente #701 • Guichê 01", category: "ATENDENTE", roleLabel: "🎧 Atendente de Guichê", indPts: 820, grpPts: 425, totalPts: 1370, tier: "OURO" },
                { code: "Supervisor Local #S-07", category: "SUPERVISOR", roleLabel: "📊 Supervisor Local", indPts: 790, grpPts: 430, totalPts: 1342, tier: "OURO" },
                { code: "Equipe Maringá Brasil (Coletivo)", category: "GRUPO", roleLabel: "🤝 Equipe da Unidade", indPts: 0, grpPts: 1265, totalPts: 1265, tier: "OURO" },
                { code: "Recepcionista #R-209", category: "RECEPCAO", roleLabel: "🛎️ Recepcionista", indPts: 740, grpPts: 410, totalPts: 1265, tier: "OURO" },
              ],
            },
            {
              unitId: "U_REBOUCAS",
              unitName: "Central Rebouças — Matriz (Curitiba)",
              coord: "01 • Coord. Curitiba Centro-Leste",
              tme: "08m 45s",
              nps: 89,
              collectivePts: 1111,
              tier: "OURO",
              members: [
                { code: "Atendente #101 • Guichê 01", category: "ATENDENTE", roleLabel: "🎧 Atendente de Guichê", indPts: 850, grpPts: 430, totalPts: 1410, tier: "OURO" },
                { code: "Recepcionista #R-104", category: "RECEPCAO", roleLabel: "🛎️ Recepcionista", indPts: 760, grpPts: 420, totalPts: 1298, tier: "OURO" },
                { code: "Supervisor Local #S-01", category: "SUPERVISOR", roleLabel: "📊 Supervisor Local", indPts: 720, grpPts: 390, totalPts: 1221, tier: "OURO" },
                { code: "Equipe Rebouças (Coletivo)", category: "GRUPO", roleLabel: "🤝 Equipe da Unidade", indPts: 0, grpPts: 1111, totalPts: 1111, tier: "OURO" },
                { code: "Atendente #104 • Guichê 04", category: "ATENDENTE", roleLabel: "🎧 Atendente de Guichê", indPts: 625, grpPts: 360, totalPts: 1083, tier: "PRATA" },
              ],
            },
            {
              unitId: "U_LONDRINA",
              unitName: "Central Londrina Centro (Londrina)",
              coord: "06 • Coord. Londrina",
              tme: "09m 35s",
              nps: 85,
              collectivePts: 1012,
              tier: "PRATA",
              members: [
                { code: "Atendente #601 • Guichê 01", category: "ATENDENTE", roleLabel: "🎧 Atendente de Guichê", indPts: 710, grpPts: 375, totalPts: 1194, tier: "PRATA" },
                { code: "Supervisor Local #S-06", category: "SUPERVISOR", roleLabel: "📊 Supervisor Local", indPts: 650, grpPts: 365, totalPts: 1116, tier: "PRATA" },
                { code: "Recepcionista #R-118", category: "RECEPCAO", roleLabel: "🛎️ Recepcionista", indPts: 615, grpPts: 350, totalPts: 1061, tier: "PRATA" },
                { code: "Equipe Londrina Centro (Coletivo)", category: "GRUPO", roleLabel: "🤝 Equipe da Unidade", indPts: 0, grpPts: 1012, totalPts: 1012, tier: "PRATA" },
              ],
            },
            {
              unitId: "U_PINHEIRINHO",
              unitName: "Posto Pinheirinho — Rua da Cidadania (Curitiba)",
              coord: "02 • Coord. Curitiba Sul-Oeste",
              tme: "09m 50s",
              nps: 84,
              collectivePts: 957,
              tier: "PRATA",
              members: [
                { code: "Atendente #303 • Guichê 03", category: "ATENDENTE", roleLabel: "🎧 Atendente de Guichê", indPts: 660, grpPts: 355, totalPts: 1116, tier: "PRATA" },
                { code: "Recepcionista #R-405", category: "RECEPCAO", roleLabel: "🛎️ Recepcionista", indPts: 570, grpPts: 330, totalPts: 990, tier: "PRATA" },
                { code: "Equipe Pinheirinho (Coletivo)", category: "GRUPO", roleLabel: "🤝 Equipe da Unidade", indPts: 0, grpPts: 957, totalPts: 957, tier: "PRATA" },
                { code: "Supervisor Local #S-02", category: "SUPERVISOR", roleLabel: "📊 Supervisor Local", indPts: 580, grpPts: 330, totalPts: 945, tier: "PRATA" },
              ],
            },
          ],
        },

        // CICLO ANTERIOR 1: C_2026_3 (Jul–Set/2026)
        C_2026_3: {
          id: "C_2026_3",
          code: "Ciclo 2026.3",
          label: "Ciclo 2026.3 (Encerrado • Jul–Set/2026)",
          status: "ENCERRADO",
          prizeBuckets: [
            {
              category: "RECEPCAO",
              tier: "OURO",
              minPts: 980,
              items: [
                { linkId: "H1", itemId: "DI_1", sponsorName: "Positivo Informática", sponsorIcon: "💻", itemName: "Kit Mouse & Teclado Sem Fio Positivo Comfort", qty: 20 },
              ],
            },
            {
              category: "RECEPCAO",
              tier: "PRATA",
              minPts: 760,
              items: [
                { linkId: "H2", itemId: "DI_6", sponsorName: "iFood", sponsorIcon: "🍔", itemName: "Voucher iFood Benefícios R$ 250", qty: 30 },
              ],
            },
            {
              category: "ATENDENTE",
              tier: "OURO",
              minPts: 1100,
              items: [
                { linkId: "H3", itemId: "DI_5", sponsorName: "iFood", sponsorIcon: "🍔", itemName: "Voucher iFood Benefícios R$ 450 (Pós-Checkout)", qty: 25 },
              ],
            },
            {
              category: "ATENDENTE",
              tier: "PRATA",
              minPts: 840,
              items: [
                { linkId: "H4", itemId: "DI_3", sponsorName: "Positivo Informática", sponsorIcon: "💻", itemName: "Headset USB Positivo", qty: 25 },
              ],
            },
            {
              category: "GRUPO",
              tier: "OURO",
              minPts: 920,
              items: [
                { linkId: "H5", itemId: "DI_7", sponsorName: "iFood", sponsorIcon: "🍔", itemName: "Almoço Coletivo iFood Empresas R$ 2.000", qty: 5 },
              ],
            },
          ],
          unitsRanking: [
            {
              unitId: "U_MARINGA",
              unitName: "Central Maringá Brasil (Maringá)",
              coord: "07 • Coord. Maringá",
              tme: "07m 15s",
              nps: 90,
              collectivePts: 1144,
              tier: "OURO",
              members: [
                { code: "Atendente #701 • Guichê 01", category: "ATENDENTE", roleLabel: "🎧 Atendente de Guichê", indPts: 810, grpPts: 340, totalPts: 1265, tier: "OURO" },
                { code: "Equipe Maringá Brasil (Coletivo)", category: "GRUPO", roleLabel: "🤝 Equipe da Unidade", indPts: 0, grpPts: 1144, totalPts: 1144, tier: "OURO" },
                { code: "Recepcionista #R-209", category: "RECEPCAO", roleLabel: "🛎️ Recepcionista", indPts: 620, grpPts: 240, totalPts: 945, tier: "PRATA" },
              ],
            },
            {
              unitId: "U_REBOUCAS",
              unitName: "Central Rebouças — Matriz (Curitiba)",
              coord: "01 • Coord. Curitiba Centro-Leste",
              tme: "08m 20s",
              nps: 88,
              collectivePts: 1095,
              tier: "OURO",
              members: [
                { code: "Atendente #101 • Guichê 01", category: "ATENDENTE", roleLabel: "🎧 Atendente de Guichê", indPts: 795, grpPts: 335, totalPts: 1243, tier: "OURO" },
                { code: "Recepcionista #R-104", category: "RECEPCAO", roleLabel: "🛎️ Recepcionista", indPts: 730, grpPts: 310, totalPts: 1144, tier: "OURO" },
                { code: "Equipe Rebouças (Coletivo)", category: "GRUPO", roleLabel: "🤝 Equipe da Unidade", indPts: 0, grpPts: 1095, totalPts: 1095, tier: "OURO" },
              ],
            },
            {
              unitId: "U_BOAVISTA",
              unitName: "Posto Boa Vista — Rua da Cidadania (Curitiba)",
              coord: "01 • Coord. Curitiba Centro-Leste",
              tme: "07m 40s",
              nps: 89,
              collectivePts: 1060,
              tier: "OURO",
              members: [
                { code: "Recepcionista #R-312", category: "RECEPCAO", roleLabel: "🛎️ Recepcionista", indPts: 690, grpPts: 300, totalPts: 1089, tier: "OURO" },
                { code: "Equipe Boa Vista (Coletivo)", category: "GRUPO", roleLabel: "🤝 Equipe da Unidade", indPts: 0, grpPts: 1060, totalPts: 1060, tier: "OURO" },
              ],
            },
          ],
        },

        // CICLO ANTERIOR 2: C_2026_2 (Abr–Jun/2026)
        C_2026_2: {
          id: "C_2026_2",
          code: "Ciclo 2026.2",
          label: "Ciclo 2026.2 (Encerrado • Abr–Jun/2026)",
          status: "ENCERRADO",
          prizeBuckets: [
            {
              category: "ATENDENTE",
              tier: "OURO",
              minPts: 1020,
              items: [
                { linkId: "H21", itemId: "DI_1", sponsorName: "Positivo Informática", sponsorIcon: "💻", itemName: "Kit Mouse & Teclado Wireless Positivo", qty: 15 },
              ],
            },
            {
              category: "SUPERVISOR",
              tier: "OURO",
              minPts: 1050,
              items: [
                { linkId: "H22", itemId: "DI_9", sponsorName: "Fundação Sanepar & Senac", sponsorIcon: "🎓", itemName: "Bolsa Certificação Executiva Senac", qty: 5 },
              ],
            },
            {
              category: "GRUPO",
              tier: "OURO",
              minPts: 900,
              items: [
                { linkId: "H23", itemId: "DI_7", sponsorName: "iFood", sponsorIcon: "🍔", itemName: "Voucher Confraternização iFood Empresas", qty: 3 },
              ],
            },
          ],
          unitsRanking: [
            {
              unitId: "U_BOAVISTA",
              unitName: "Posto Boa Vista — Rua da Cidadania (Curitiba)",
              coord: "01 • Coord. Curitiba Centro-Leste",
              tme: "06m 45s",
              nps: 91,
              collectivePts: 1090,
              tier: "OURO",
              members: [
                { code: "Atendente #501 • Guichê 01", category: "ATENDENTE", roleLabel: "🎧 Atendente de Guichê", indPts: 780, grpPts: 260, totalPts: 1185, tier: "OURO" },
                { code: "Equipe Boa Vista (Coletivo)", category: "GRUPO", roleLabel: "🤝 Equipe da Unidade", indPts: 0, grpPts: 1090, totalPts: 1090, tier: "OURO" },
              ],
            },
            {
              unitId: "U_REBOUCAS",
              unitName: "Central Rebouças — Matriz (Curitiba)",
              coord: "01 • Coord. Curitiba Centro-Leste",
              tme: "08m 50s",
              nps: 87,
              collectivePts: 1040,
              tier: "OURO",
              members: [
                { code: "Supervisor Local #S-01", category: "SUPERVISOR", roleLabel: "📊 Supervisor Local", indPts: 800, grpPts: 280, totalPts: 1210, tier: "OURO" },
                { code: "Equipe Rebouças (Coletivo)", category: "GRUPO", roleLabel: "🤝 Equipe da Unidade", indPts: 0, grpPts: 1040, totalPts: 1040, tier: "OURO" },
              ],
            },
          ],
        },
      },
    };
  }

  let db = getInitialData();

  const state = {
    activeTab: "view-public-team",
    publicCycleId: "C_2026_4",
    publicUnitId: "ALL",
    publicCategory: "ALL",
    publicTier: "ALL",
    adminStockSponsorFilter: "ALL",
  };

  const CATEGORY_META = {
    RECEPCAO: { label: "🛎️ Recepcionistas", cls: "tag-teal" },
    ATENDENTE: { label: "🎧 Atendentes de Guichê", cls: "tag-blue" },
    SUPERVISOR: { label: "📊 Supervisores Locais", cls: "tag-amber" },
    GRUPO: { label: "🤝 Equipe da Unidade (Grupo)", cls: "tag-green" },
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function formatNum(n) {
    return Number(n).toLocaleString("pt-BR");
  }

  function getPublicCycle() {
    return db.cycles[state.publicCycleId] || db.cycles.C_2026_4;
  }

  function getPrizeSummaryForCategoryTier(cycleObj, category, tier) {
    const bucket = cycleObj.prizeBuckets.find(
      (b) => b.category === category && b.tier === tier
    );
    if (!bucket || bucket.items.length === 0) {
      return "Aguardando vínculo de item";
    }
    return bucket.items
      .map((it) => `${it.sponsorIcon} ${it.itemName} (${it.sponsorName})`)
      .join(" + ");
  }

  // =========================================================================
  // NAVEGAÇÃO ENTRE AS 2 ABAS PRINCIPAIS (TIME SANEPAR vs. TIME DE GESTÃO)
  // =========================================================================
  $$(".main-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".main-tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.activeTab = btn.dataset.target;

      $("#view-public-team").classList.toggle("hidden", state.activeTab !== "view-public-team");
      $("#view-admin-management").classList.toggle("hidden", state.activeTab !== "view-admin-management");
    });
  });

  // =========================================================================
  // ABA 1: RENDERIZAÇÃO DA VITRINE CLEAN E RANKING POR UNIDADE (COM DRILL-DOWN)
  // =========================================================================
  function renderPublicMiniKpis() {
    const cyc = getPublicCycle();
    const totalLinkedItems = cyc.prizeBuckets.reduce((acc, b) => acc + b.items.length, 0);
    const leaderUnit = cyc.unitsRanking[0];

    $("#pub-kpi-cycle").textContent = cyc.label;
    $("#pub-kpi-prizes").textContent = `${totalLinkedItems} Prêmio(s) Patrocinado(s) Ativo(s)`;
    $("#pub-kpi-leader").textContent = leaderUnit
      ? `🥇 ${leaderUnit.unitName} (${formatNum(leaderUnit.collectivePts)} pts)`
      : "—";
  }

  function renderPublicPrizesList() {
    const cyc = getPublicCycle();
    const listEl = $("#pub-prizes-list");
    listEl.innerHTML = "";

    $("#pub-prizes-title").textContent = `Prêmios Disponíveis — ${cyc.code}`;

    const buckets = cyc.prizeBuckets.filter((b) => {
      if (state.publicCategory !== "ALL" && b.category !== state.publicCategory) return false;
      if (state.publicTier !== "ALL" && b.tier !== state.publicTier) return false;
      return true;
    });

    if (buckets.length === 0) {
      listEl.innerHTML = `
        <div class="clean-prize-card">
          <strong>Nenhuma categoria encontrada para este filtro neste ciclo.</strong>
          <span class="text-muted">Selecione "Todas as Categorias" ou "Ouro & Prata" acima.</span>
        </div>
      `;
      return;
    }

    buckets.forEach((b) => {
      const catMeta = CATEGORY_META[b.category] || CATEGORY_META.GRUPO;
      const isSelectedCat = state.publicCategory === b.category;

      const card = document.createElement("div");
      card.className = `clean-prize-card ${b.tier === "OURO" ? "tier-ouro" : ""}${isSelectedCat ? " active-cat" : ""}`;
      card.title = "Clique para filtrar o ranking ao lado por esta categoria";

      const itemsHtml =
        b.items.length > 0
          ? b.items
              .map(
                (it) => `
              <div class="cp-item-pill">
                <div>
                  <strong>🎁 ${it.itemName}</strong>
                  <div class="text-muted" style="font-size:0.74rem;">Patrocinador: <strong>${it.sponsorIcon} ${it.sponsorName}</strong></div>
                </div>
                <span class="tag tag-teal">${it.qty} cotas</span>
              </div>
            `
              )
              .join("")
          : `<div class="cp-item-pill"><span class="text-muted">Nenhum item doado vinculado a esta faixa.</span></div>`;

      card.innerHTML = `
        <div class="cp-head">
          <span class="tag ${catMeta.cls}">${catMeta.label}</span>
          <span class="tag ${b.tier === "OURO" ? "tag-amber" : "tag-blue"}">
            ${b.tier === "OURO" ? "🥇 Faixa Ouro" : "🥈 Faixa Prata"} • Mín. ${formatNum(b.minPts)} pts
          </span>
        </div>
        <div class="cp-items-list">${itemsHtml}</div>
      `;

      card.addEventListener("click", () => {
        state.publicCategory = state.publicCategory === b.category ? "ALL" : b.category;
        $("#sel-public-category").value = state.publicCategory;
        renderPublicPrizesList();
        renderPublicRanking();
      });

      listEl.appendChild(card);
    });
  }

  function renderPublicRanking() {
    const cyc = getPublicCycle();
    const thead = $("#pub-ranking-thead");
    const tbody = $("#pub-ranking-tbody");
    const breadcrumb = $("#pub-ranking-breadcrumb");
    const btnBack = $("#btn-ranking-back-units");
    tbody.innerHTML = "";

    const isClosed = cyc.status === "ENCERRADO";

    // NÍVEL 1 DO DRILL-DOWN: VISÃO CONSOLIDADA POR UNIDADE DE ATENDIMENTO
    if (state.publicUnitId === "ALL") {
      btnBack.classList.add("hidden");
      $("#pub-ranking-level-tag").textContent = isClosed
        ? `Histórico Homologado • Ranking Final por Unidade (${cyc.code})`
        : `Visão Geral • Ranking Atual por Unidade de Atendimento (${cyc.code})`;
      $("#pub-ranking-title").textContent = `Ranking por Unidade de Atendimento — ${cyc.code} (Clique na Unidade p/ Drill-Down)`;

      breadcrumb.innerHTML = `
        <span class="drill-crumb active">🏛️ Todas as Unidades de Atendimento (${cyc.unitsRanking.length} Unidades no Ranking)</span>
        <span class="text-muted">• Clique em uma unidade abaixo para abrir os profissionais e prêmios daquela unidade</span>
      `;

      thead.innerHTML = `
        <tr>
          <th>Posição</th>
          <th>Unidade de Atendimento</th>
          <th>Indicadores (TME / NPS)</th>
          <th>Pontuação da Unidade</th>
          <th>Prêmio Coletivo da Unidade</th>
          <th>Drill-Down</th>
        </tr>
      `;

      cyc.unitsRanking.forEach((u, idx) => {
        const pos = idx + 1;
        const medal = pos === 1 ? "🥇 1º" : pos === 2 ? "🥈 2º" : pos === 3 ? "🥉 3º" : `${pos}º`;
        const groupPrizeText = getPrizeSummaryForCategoryTier(cyc, "GRUPO", u.tier);

        const tr = document.createElement("tr");
        tr.className = "drillable-unit-row";
        tr.innerHTML = `
          <td><strong>${medal}</strong></td>
          <td>
            <strong>${u.unitName}</strong>
            <div class="text-muted" style="font-size:0.74rem;">${u.coord}</div>
          </td>
          <td>
            <span class="tag tag-green">TME ${u.tme}</span>
            <span class="tag tag-blue">NPS ${u.nps}</span>
          </td>
          <td>
            <strong>${formatNum(u.collectivePts)} pts</strong>
            <div><span class="tag ${u.tier === "OURO" ? "tag-amber" : "tag-blue"}">${u.tier === "OURO" ? "🥇 Faixa Ouro" : "🥈 Faixa Prata"}</span></div>
          </td>
          <td style="max-width:250px;font-size:0.77rem;">${groupPrizeText}</td>
          <td>
            <button type="button" class="btn btn-primary btn-sm">
              🔍 Ver Ranking da Unidade →
            </button>
          </td>
        `;

        tr.addEventListener("click", () => {
          state.publicUnitId = u.unitId;
          $("#sel-public-unit").value = u.unitId;
          renderPublicRanking();
        });

        tbody.appendChild(tr);
      });
      return;
    }

    // NÍVEL 2 DO DRILL-DOWN: RANKING INTERNO DA UNIDADE DE ATENDIMENTO SELECIONADA
    const unitObj =
      cyc.unitsRanking.find((u) => u.unitId === state.publicUnitId) || cyc.unitsRanking[0];

    btnBack.classList.remove("hidden");
    $("#pub-ranking-level-tag").textContent = `Drill-Down da Unidade • ${unitObj.coord}`;
    $("#pub-ranking-title").textContent = `Ranking Interno: ${unitObj.unitName} — ${cyc.code}`;

    breadcrumb.innerHTML = `
      <span class="drill-crumb" id="crumb-back-all-units">🏛️ Todas as Unidades</span>
      <span>›</span>
      <span class="drill-crumb active">📍 ${unitObj.unitName} (TME ${unitObj.tme} • NPS ${unitObj.nps})</span>
    `;

    $("#crumb-back-all-units").addEventListener("click", () => {
      state.publicUnitId = "ALL";
      $("#sel-public-unit").value = "ALL";
      renderPublicRanking();
    });

    thead.innerHTML = `
      <tr>
        <th>Pos.</th>
        <th>Profissional / Equipe (LGPD)</th>
        <th>Categoria</th>
        <th>Pontuação (Ind. + Grupo)</th>
        <th>Faixa</th>
        <th>Prêmio Patrocinado Vinculado</th>
      </tr>
    `;

    const filteredMembers = unitObj.members.filter(
      (m) => state.publicCategory === "ALL" || m.category === state.publicCategory
    );

    if (filteredMembers.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center;padding:16px;" class="text-muted">
            Nenhum participante desta categoria registrado nesta unidade para o filtro selecionado.
          </td>
        </tr>
      `;
      return;
    }

    filteredMembers.forEach((m, idx) => {
      const pos = idx + 1;
      const medal = pos === 1 ? "🥇 1º" : pos === 2 ? "🥈 2º" : pos === 3 ? "🥉 3º" : `${pos}º`;
      const catMeta = CATEGORY_META[m.category] || CATEGORY_META.GRUPO;
      const prizeSummary = getPrizeSummaryForCategoryTier(cyc, m.category, m.tier);

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${medal}</strong></td>
        <td><strong>${m.code}</strong></td>
        <td><span class="tag ${catMeta.cls}">${m.roleLabel}</span></td>
        <td>
          <strong>${formatNum(m.totalPts)} pts</strong>
          <div class="text-muted" style="font-size:0.73rem;">
            ${m.indPts > 0 ? `Ind.: ${m.indPts} + Grupo: ${m.grpPts}` : `100% Mérito Coletivo`}
          </div>
        </td>
        <td>
          <span class="tag ${m.tier === "OURO" ? "tag-amber" : "tag-blue"}">
            ${m.tier === "OURO" ? "🥇 Ouro" : "🥈 Prata"}
          </span>
        </td>
        <td style="font-size:0.78rem;">
          <strong>${prizeSummary}</strong>
          <div class="text-muted" style="font-size:0.72rem;">
            ${isClosed ? "✓ Prêmio Homologado e Entregue" : "🏆 Habilitado no Ranking Atual"}
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Eventos dos filtros da Aba 1
  $("#sel-public-cycle").addEventListener("change", (e) => {
    state.publicCycleId = e.target.value;
    const cyc = getPublicCycle();
    if (
      state.publicUnitId !== "ALL" &&
      !cyc.unitsRanking.some((u) => u.unitId === state.publicUnitId)
    ) {
      state.publicUnitId = "ALL";
      $("#sel-public-unit").value = "ALL";
    }
    renderPublicMiniKpis();
    renderPublicPrizesList();
    renderPublicRanking();
  });

  $("#sel-public-unit").addEventListener("change", (e) => {
    state.publicUnitId = e.target.value;
    renderPublicRanking();
  });

  $("#sel-public-category").addEventListener("change", (e) => {
    state.publicCategory = e.target.value;
    renderPublicPrizesList();
    renderPublicRanking();
  });

  $("#btn-ranking-back-units").addEventListener("click", () => {
    state.publicUnitId = "ALL";
    $("#sel-public-unit").value = "ALL";
    renderPublicRanking();
  });

  $$("#pub-tier-chips .chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      $$("#pub-tier-chips .chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      state.publicTier = chip.dataset.tier;
      renderPublicPrizesList();
    });
  });

  // =========================================================================
  // ABA 2: GESTÃO DE PATROCINADORES, ITENS DOADOS E VÍNCULO AO CICLO VIGENTE
  // =========================================================================
  function showAdminFeedback(htmlMsg) {
    const fb = $("#admin-feedback-banner");
    fb.innerHTML = htmlMsg;
    fb.classList.remove("hidden");
  }

  function renderAdminSponsorsAndDropdowns() {
    $("#admin-sponsors-count-tag").textContent = `${db.sponsors.length} Patrocinadores`;

    // Lista de cartões de patrocinadores no Passo 1
    const listEl = $("#admin-sponsors-list");
    listEl.innerHTML = "";
    db.sponsors.forEach((sp) => {
      const itemsCount = db.donatedItems.filter((it) => it.sponsorId === sp.id).length;
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

    // Dropdown de patrocinador no formulário do Passo 2
    const selItemSponsor = $("#sel-item-sponsor");
    selItemSponsor.innerHTML = "";
    db.sponsors.forEach((sp) => {
      const opt = document.createElement("option");
      opt.value = sp.id;
      opt.textContent = `${sp.icon} ${sp.name}`;
      selItemSponsor.appendChild(opt);
    });

    // Dropdown de filtro de estoque por patrocinador no Passo 2
    const selFilterStock = $("#filter-stock-sponsor");
    selFilterStock.innerHTML = `<option value="ALL">Todos os Patrocinadores (${db.sponsors.length})</option>`;
    db.sponsors.forEach((sp) => {
      const opt = document.createElement("option");
      opt.value = sp.id;
      opt.textContent = `${sp.icon} ${sp.name}`;
      selFilterStock.appendChild(opt);
    });
    selFilterStock.value = state.adminStockSponsorFilter;
  }

  function renderAdminDonatedItemsStock() {
    const tbody = $("#donated-items-tbody");
    tbody.innerHTML = "";

    const filtered = db.donatedItems.filter(
      (it) =>
        state.adminStockSponsorFilter === "ALL" ||
        it.sponsorId === state.adminStockSponsorFilter
    );

    filtered.forEach((it) => {
      const sp = db.sponsors.find((s) => s.id === it.sponsorId) || db.sponsors[0];
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

    // Atualiza o dropdown de itens disponíveis para vínculo no Passo 3
    const selLinkItem = $("#sel-link-donated-item");
    const prevSelected = selLinkItem.value;
    selLinkItem.innerHTML = "";
    db.donatedItems.forEach((it) => {
      const sp = db.sponsors.find((s) => s.id === it.sponsorId) || db.sponsors[0];
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

    const stockItem = db.donatedItems.find((d) => d.id === selLinkItem.value);
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
    const activeCycle = db.cycles.C_2026_4;
    const grid = $("#active-cycle-prize-links-grid");
    grid.innerHTML = "";

    const categoriesOrder = ["RECEPCAO", "ATENDENTE", "SUPERVISOR", "GRUPO"];

    categoriesOrder.forEach((catKey) => {
      const catMeta = CATEGORY_META[catKey];
      const ouroBucket = activeCycle.prizeBuckets.find(
        (b) => b.category === catKey && b.tier === "OURO"
      );
      const prataBucket = activeCycle.prizeBuckets.find(
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

          const targetBucket = activeCycle.prizeBuckets.find(
            (b) => b.category === tCat && b.tier === tTier
          );
          if (!targetBucket) return;

          const foundLink = targetBucket.items.find((x) => x.linkId === tLinkId);
          if (foundLink) {
            const stockItem = db.donatedItems.find((d) => d.id === foundLink.itemId);
            if (stockItem) {
              stockItem.linkedQty = Math.max(0, stockItem.linkedQty - foundLink.qty);
            }
            targetBucket.items = targetBucket.items.filter((x) => x.linkId !== tLinkId);
            showAdminFeedback(
              `↺ Item <strong>"${foundLink.itemName}"</strong> desvinculado de <strong>${catMeta.label} (${tTier})</strong>. As ${foundLink.qty} cotas retornaram ao saldo do patrocinador!`
            );
            refreshAll();
          }
        });
      });

      grid.appendChild(card);
    });
  }

  // Passo 1: Cadastrar Novo Patrocinador
  $("#form-new-sponsor").addEventListener("submit", (e) => {
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

    db.sponsors.push(newSp);
    $("#inp-sp-name").value = "";
    $("#inp-sp-agreement").value = "";

    showAdminFeedback(
      `✅ <strong>Novo patrocinador cadastrado com sucesso:</strong> ${newSp.icon} <strong>${newSp.name}</strong> (${newSp.segment}). Agora você já pode registrar itens doados por ele no Passo 2!`
    );
    refreshAll();
    $("#sel-item-sponsor").value = newSp.id;
  });

  // Passo 2: Cadastrar Novo Item Doado
  $("#form-new-donated-item").addEventListener("submit", (e) => {
    e.preventDefault();
    const sponsorId = $("#sel-item-sponsor").value;
    const name = $("#inp-item-name").value.trim();
    const totalQty = Number($("#inp-item-qty").value) || 10;
    if (!sponsorId || !name) return;

    const sp = db.sponsors.find((s) => s.id === sponsorId) || db.sponsors[0];
    const newItem = {
      id: `DI_${Date.now()}`,
      sponsorId,
      name,
      totalQty,
      linkedQty: 0,
    };

    db.donatedItems.unshift(newItem);
    $("#inp-item-name").value = "";

    showAdminFeedback(
      `📦 <strong>Item doado registrado no estoque:</strong> <em>"${newItem.name}"</em> (${newItem.totalQty} unidades doadas por <strong>${sp.icon} ${sp.name}</strong>). Disponível para vínculo no Passo 3!`
    );
    refreshAll();
    $("#sel-link-donated-item").value = newItem.id;
  });

  $("#filter-stock-sponsor").addEventListener("change", (e) => {
    state.adminStockSponsorFilter = e.target.value;
    renderAdminSponsorsAndDropdowns();
    renderAdminDonatedItemsStock();
  });

  $("#sel-link-donated-item").addEventListener("change", () => {
    syncLinkQtyMaxWithSelectedStock();
  });

  $("#inp-link-qty").addEventListener("input", () => {
    const itemId = $("#sel-link-donated-item").value;
    const stockItem = db.donatedItems.find((d) => d.id === itemId);
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

  // Passo 3: Vincular Item Doado ao Prêmio de uma Categoria do Ciclo em Andamento
  $("#form-link-item-to-prize").addEventListener("submit", (e) => {
    e.preventDefault();
    const category = $("#sel-link-category").value;
    const tier = $("#sel-link-tier").value;
    const itemId = $("#sel-link-donated-item").value;
    const qtyToLink = Number($("#inp-link-qty").value);
    const errBanner = $("#link-qty-error-msg");

    const stockItem = db.donatedItems.find((d) => d.id === itemId);
    if (!stockItem) return;

    const available = Math.max(0, stockItem.totalQty - stockItem.linkedQty);

    // Ajuste 2: Bloqueia o vínculo caso a quantidade informada seja maior do que o saldo disponível no item
    if (!qtyToLink || qtyToLink < 1 || qtyToLink > available) {
      if (errBanner) {
        errBanner.innerHTML = `⚠️ <strong>Operação bloqueada:</strong> Não é permitido vincular <strong>${qtyToLink || 0} cotas</strong>, pois o saldo disponível do item <strong>"${stockItem.name}"</strong> é de apenas <strong>${available} unidade(s)</strong>.`;
        errBanner.classList.remove("hidden");
      }
      return;
    }

    if (errBanner) errBanner.classList.add("hidden");

    const sp = db.sponsors.find((s) => s.id === stockItem.sponsorId) || db.sponsors[0];
    const activeCycle = db.cycles.C_2026_4;

    let bucket = activeCycle.prizeBuckets.find(
      (b) => b.category === category && b.tier === tier
    );
    if (!bucket) {
      bucket = {
        category,
        tier,
        minPts: tier === "OURO" ? 1100 : 850,
        items: [],
      };
      activeCycle.prizeBuckets.push(bucket);
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

    const catLabel = CATEGORY_META[category]?.label || category;
    showAdminFeedback(
      `🔗 <strong>Vínculo realizado com sucesso no Ciclo 2026.4 (Vigente)!</strong> O item <strong>"${stockItem.name}"</strong> (${sp.icon} ${sp.name} • ${qtyToLink} cotas) foi vinculado ao prêmio de <strong>${catLabel} (${tier})</strong> e já está visível para todo o time na Aba 1!`
    );

    refreshAll();
  });

  // =========================================================================
  // MASCOTE AQUALINO RESPONDENDO DÚVIDAS DE UTILIZAÇÃO DA TELA
  // =========================================================================
  function generateAqualinoV2Answer(rawQuestion) {
    const q = (rawQuestion || "").toLowerCase();

    if (/(drill|unidade|ranking|equipe|profissiona|atendente|recepcionista|supervisor)/i.test(q)) {
      return `Na <strong>Aba 1 (Vitrine & Ranking por Unidade)</strong>, a tabela da direita inicia mostrando o <strong>Ranking Geral das Unidades de Atendimento</strong> para evitar poluição visual. Basta clicar em qualquer linha de unidade (ex.: <em>Posto Boa Vista</em>, <em>Central Rebouças</em> ou <em>Central Maringá</em>) ou escolher a unidade no filtro <strong>"2. Unidade de Atendimento"</strong> para fazer o <strong>Drill-Down</strong> e ver o ranking individual dos Recepcionistas, Atendentes e Supervisor daquela unidade!`;
    }

    if (/(anterior|ciclo|histórico|historico|2026\.3|2026\.2)/i.test(q)) {
      return `Para consultar o <strong>ranking e os prêmios dos ciclos anteriores</strong>, selecione o ciclo desejado no campo <strong>"1. Ciclo de Gamificação (Atual ou Anteriores)"</strong> na Aba 1 (como o <em>Ciclo 2026.3</em> ou o <em>Ciclo 2026.2</em>). Tanto a vitrine de prêmios à esquerda quanto o ranking por unidade à direita atualizarão imediatamente com os dados homologados daquele ciclo!`;
    }

    if (/(patrocinador|item|doado|estoque|doação|doacao|positivo|ifood)/i.test(q)) {
      return `Clique na <strong>Aba 2 (2. Gestão de Patrocinadores & Vínculo de Itens Doados)</strong>, exclusiva do time de gestão. No <strong>Passo 1</strong> você cadastra novos patrocinadores (como <em>Positivo Informática</em>, <em>iFood</em>, etc.); e no <strong>Passo 2</strong> você registra os itens doados por cada patrocinador e acompanha o saldo disponível no estoque!`;
    }

    if (/(vincular|vínculo|vinculo|prêmio|premio|categoria|ouro|prata)/i.test(q)) {
      return `Na <strong>Aba 2</strong>, vá ao <strong>Passo 3 (Vincular Itens Doados aos Prêmios de Cada Categoria — Ciclo 2026.4)</strong>: escolha a Categoria (<em>Recepcionistas, Atendentes, Supervisores ou Equipe da Unidade</em>), a Faixa (<em>Ouro ou Prata</em>), o Item Doado disponível no estoque e clique em <strong>"🔗 Vincular Item ao Prêmio da Categoria"</strong>. O prêmio aparece na mesma hora na Aba 1 para todo o time da SANEPAR!`;
    }

    return `Esta tela foi dividida em <strong>2 abas limpas</strong> para evitar qualquer poluição visual: na <strong>Aba 1</strong>, todo o time da SANEPAR consulta os prêmios e o ranking por Unidade de Atendimento (com drill-down clicando na unidade e consulta a ciclos anteriores); na <strong>Aba 2</strong>, o time de gestão cadastra patrocinadores, registra itens doados e vincula esses itens aos prêmios de cada categoria do ciclo em andamento!`;
  }

  function askAqualinoV2(questionText) {
    const q = (questionText || "").trim();
    if (!q) {
      $("#aqualino-qa-drawer").classList.remove("hidden");
      $("#input-ask-aqualino-v2").focus();
      return;
    }

    const answerHtml = generateAqualinoV2Answer(q);
    const bubble = $("#aqualino-v2-bubble");
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

  $("#btn-toggle-aqualino-qa").addEventListener("click", () => {
    const drawer = $("#aqualino-qa-drawer");
    drawer.classList.toggle("hidden");
    if (!drawer.classList.contains("hidden")) {
      $("#input-ask-aqualino-v2").focus();
    }
  });

  $("#form-ask-aqualino-v2").addEventListener("submit", (e) => {
    e.preventDefault();
    askAqualinoV2($("#input-ask-aqualino-v2").value);
  });

  $$(".chip-ask-v2").forEach((chip) => {
    chip.addEventListener("click", () => {
      $("#input-ask-aqualino-v2").value = chip.dataset.q;
      askAqualinoV2(chip.dataset.q);
    });
  });

  const btnVoiceV2 = $("#btn-voice-aqualino-v2");
  let isListeningV2 = false;
  btnVoiceV2.addEventListener("click", () => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!isListeningV2 && SpeechRec) {
      try {
        const rec = new SpeechRec();
        rec.lang = "pt-BR";
        isListeningV2 = true;
        btnVoiceV2.classList.add("listening");
        btnVoiceV2.textContent = "🛑 Ouvindo...";
        rec.onresult = (ev) => {
          const txt = ev.results[0][0].transcript;
          $("#input-ask-aqualino-v2").value = txt;
          askAqualinoV2(txt);
        };
        rec.onend = () => {
          isListeningV2 = false;
          btnVoiceV2.classList.remove("listening");
          btnVoiceV2.textContent = "🎤 Voz";
        };
        rec.onerror = () => {
          isListeningV2 = false;
          btnVoiceV2.classList.remove("listening");
          btnVoiceV2.textContent = "🎤 Voz";
          const sample = "Como vincular os itens doados aos prêmios de cada categoria do ciclo em andamento?";
          $("#input-ask-aqualino-v2").value = sample;
          askAqualinoV2(sample);
        };
        rec.start();
        return;
      } catch (_) {}
    }

    const sample = "Como vincular os itens doados aos prêmios de cada categoria do ciclo em andamento?";
    $("#input-ask-aqualino-v2").value = sample;
    askAqualinoV2(sample);
  });

  $("#btn-floating-aqualino-v2").addEventListener("click", () => {
    $("#aqualino-qa-drawer").classList.remove("hidden");
    $("#aqualino-v2-panel").scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => $("#input-ask-aqualino-v2").focus(), 250);
  });

  // Restaurar Padrão
  $("#btn-reset-v2").addEventListener("click", () => {
    db = getInitialData();
    state.publicCycleId = "C_2026_4";
    state.publicUnitId = "ALL";
    state.publicCategory = "ALL";
    state.publicTier = "ALL";
    state.adminStockSponsorFilter = "ALL";

    $("#sel-public-cycle").value = "C_2026_4";
    $("#sel-public-unit").value = "ALL";
    $("#sel-public-category").value = "ALL";
    $$("#pub-tier-chips .chip").forEach((c) => {
      c.classList.toggle("active", c.dataset.tier === "ALL");
    });

    $("#admin-feedback-banner").classList.add("hidden");
    $("#aqualino-v2-bubble").classList.remove("answering");
    $("#aqualino-v2-bubble").innerHTML =
      "Olá! Na <strong>Aba 1</strong> todo o time da SANEPAR consulta os prêmios e o ranking por Unidade (com drill-down e histórico de ciclos). Na <strong>Aba 2</strong> o time de gestão cadastra patrocinadores, itens doados e vincula aos prêmios do ciclo em andamento!";

    refreshAll();
  });

  function refreshAll() {
    renderPublicMiniKpis();
    renderPublicPrizesList();
    renderPublicRanking();
    renderAdminSponsorsAndDropdowns();
    renderAdminDonatedItemsStock();
    renderAdminActiveCycleLinks();
  }

  refreshAll();
})();
