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
          // Ranking por Unidade de Atendimento (com nomes dos profissionais e equipes)
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
                { code: "Carlos Henrique Almeida", category: "SUPERVISOR", roleLabel: "📊 Supervisor Local", indPts: 810, grpPts: 440, totalPts: 1375, tier: "OURO" },
                { code: "Beatriz Nogueira", category: "ATENDENTE", roleLabel: "🎧 Atendente de Guichê", indPts: 790, grpPts: 410, totalPts: 1320, tier: "OURO" },
                { code: "Equipe Posto Boa Vista (Coletivo)", category: "GRUPO", roleLabel: "🤝 Equipe da Unidade", indPts: 0, grpPts: 1298, totalPts: 1298, tier: "OURO" },
                { code: "Fernanda Cristina Lopes", category: "RECEPCAO", roleLabel: "🛎️ Recepcionista", indPts: 695, grpPts: 390, totalPts: 1193, tier: "OURO" },
                { code: "Gustavo Henrique Prado", category: "ATENDENTE", roleLabel: "🎧 Atendente de Guichê", indPts: 640, grpPts: 390, totalPts: 1120, tier: "PRATA" },
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
                { code: "Leonardo Silveira", category: "ATENDENTE", roleLabel: "🎧 Atendente de Guichê", indPts: 820, grpPts: 425, totalPts: 1370, tier: "OURO" },
                { code: "Juliana Barros", category: "SUPERVISOR", roleLabel: "📊 Supervisora Local", indPts: 790, grpPts: 430, totalPts: 1342, tier: "OURO" },
                { code: "Amanda Cavalcanti", category: "RECEPCAO", roleLabel: "🛎️ Recepcionista", indPts: 740, grpPts: 410, totalPts: 1268, tier: "OURO" },
                { code: "Equipe Central Maringá Brasil (Coletivo)", category: "GRUPO", roleLabel: "🤝 Equipe da Unidade", indPts: 0, grpPts: 1265, totalPts: 1265, tier: "OURO" },
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
                { code: "Ana Paula Ribeiro", category: "ATENDENTE", roleLabel: "🎧 Atendente de Guichê", indPts: 850, grpPts: 430, totalPts: 1410, tier: "OURO" },
                { code: "Mariana Costa", category: "RECEPCAO", roleLabel: "🛎️ Recepcionista", indPts: 760, grpPts: 420, totalPts: 1298, tier: "OURO" },
                { code: "Ricardo Tavares", category: "SUPERVISOR", roleLabel: "📊 Supervisor Local", indPts: 720, grpPts: 390, totalPts: 1221, tier: "OURO" },
                { code: "Equipe Central Rebouças (Coletivo)", category: "GRUPO", roleLabel: "🤝 Equipe da Unidade", indPts: 0, grpPts: 1111, totalPts: 1111, tier: "OURO" },
                { code: "Marcos Oliveira", category: "ATENDENTE", roleLabel: "🎧 Atendente de Guichê", indPts: 625, grpPts: 360, totalPts: 1083, tier: "PRATA" },
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
                { code: "Thiago Moreira", category: "ATENDENTE", roleLabel: "🎧 Atendente de Guichê", indPts: 710, grpPts: 375, totalPts: 1194, tier: "PRATA" },
                { code: "Renata Vasconcelos", category: "SUPERVISOR", roleLabel: "📊 Supervisora Local", indPts: 650, grpPts: 365, totalPts: 1116, tier: "PRATA" },
                { code: "Camila Teixeira", category: "RECEPCAO", roleLabel: "🛎️ Recepcionista", indPts: 615, grpPts: 350, totalPts: 1061, tier: "PRATA" },
                { code: "Equipe Central Londrina Centro (Coletivo)", category: "GRUPO", roleLabel: "🤝 Equipe da Unidade", indPts: 0, grpPts: 1012, totalPts: 1012, tier: "PRATA" },
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
                { code: "Rafael Souza", category: "ATENDENTE", roleLabel: "🎧 Atendente de Guichê", indPts: 660, grpPts: 355, totalPts: 1116, tier: "PRATA" },
                { code: "Patrícia Lima", category: "RECEPCAO", roleLabel: "🛎️ Recepcionista", indPts: 570, grpPts: 330, totalPts: 990, tier: "PRATA" },
                { code: "Equipe Posto Pinheirinho (Coletivo)", category: "GRUPO", roleLabel: "🤝 Equipe da Unidade", indPts: 0, grpPts: 957, totalPts: 957, tier: "PRATA" },
                { code: "Eduardo Martins", category: "SUPERVISOR", roleLabel: "📊 Supervisor Local", indPts: 580, grpPts: 330, totalPts: 945, tier: "PRATA" },
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
                { code: "Leonardo Silveira", category: "ATENDENTE", roleLabel: "🎧 Atendente de Guichê", indPts: 810, grpPts: 340, totalPts: 1265, tier: "OURO" },
                { code: "Equipe Central Maringá Brasil (Coletivo)", category: "GRUPO", roleLabel: "🤝 Equipe da Unidade", indPts: 0, grpPts: 1144, totalPts: 1144, tier: "OURO" },
                { code: "Amanda Cavalcanti", category: "RECEPCAO", roleLabel: "🛎️ Recepcionista", indPts: 620, grpPts: 240, totalPts: 945, tier: "PRATA" },
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
                { code: "Ana Paula Ribeiro", category: "ATENDENTE", roleLabel: "🎧 Atendente de Guichê", indPts: 795, grpPts: 335, totalPts: 1243, tier: "OURO" },
                { code: "Mariana Costa", category: "RECEPCAO", roleLabel: "🛎️ Recepcionista", indPts: 730, grpPts: 310, totalPts: 1144, tier: "OURO" },
                { code: "Equipe Central Rebouças (Coletivo)", category: "GRUPO", roleLabel: "🤝 Equipe da Unidade", indPts: 0, grpPts: 1095, totalPts: 1095, tier: "OURO" },
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
                { code: "Fernanda Cristina Lopes", category: "RECEPCAO", roleLabel: "🛎️ Recepcionista", indPts: 690, grpPts: 300, totalPts: 1089, tier: "OURO" },
                { code: "Equipe Posto Boa Vista (Coletivo)", category: "GRUPO", roleLabel: "🤝 Equipe da Unidade", indPts: 0, grpPts: 1060, totalPts: 1060, tier: "OURO" },
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
                { code: "Beatriz Nogueira", category: "ATENDENTE", roleLabel: "🎧 Atendente de Guichê", indPts: 780, grpPts: 260, totalPts: 1185, tier: "OURO" },
                { code: "Equipe Posto Boa Vista (Coletivo)", category: "GRUPO", roleLabel: "🤝 Equipe da Unidade", indPts: 0, grpPts: 1090, totalPts: 1090, tier: "OURO" },
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
                { code: "Ricardo Tavares", category: "SUPERVISOR", roleLabel: "📊 Supervisor Local", indPts: 800, grpPts: 280, totalPts: 1210, tier: "OURO" },
                { code: "Equipe Central Rebouças (Coletivo)", category: "GRUPO", roleLabel: "🤝 Equipe da Unidade", indPts: 0, grpPts: 1040, totalPts: 1040, tier: "OURO" },
              ],
            },
          ],
        },
      },
    };
  }

  let db = getInitialData();

  function loadSharedSponsorsDataIntoDb() {
    try {
      const raw = localStorage.getItem("sanepar_gamification_sponsors_stock_v1");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.sponsors) && Array.isArray(parsed.donatedItems)) {
        db.sponsors = parsed.sponsors;
        db.donatedItems = parsed.donatedItems;
      }
      if (parsed && Array.isArray(parsed.activeCyclePrizeBuckets) && db.cycles.C_2026_4) {
        db.cycles.C_2026_4.prizeBuckets = parsed.activeCyclePrizeBuckets;
      }
    } catch (_) {}
  }

  loadSharedSponsorsDataIntoDb();

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
  // RENDERIZAÇÃO DA VITRINE CLEAN E RANKING POR UNIDADE (COM DRILL-DOWN)
  // =========================================================================
  function getAllRankedMembers(cyc) {
    const all = [];
    cyc.unitsRanking.forEach((u) => {
      u.members.forEach((m) => {
        all.push({
          ...m,
          unitId: u.unitId,
          unitName: u.unitName,
          coord: u.coord,
          unitTme: u.tme,
          unitNps: u.nps,
        });
      });
    });
    return all.sort((a, b) => b.totalPts - a.totalPts);
  }

  function renderPublicMiniKpis() {
    const cyc = getPublicCycle();
    const totalLinkedItems = cyc.prizeBuckets.reduce((acc, b) => acc + b.items.length, 0);
    const allRanked = getAllRankedMembers(cyc);
    const topMember = allRanked[0];

    $("#pub-kpi-cycle").textContent = cyc.label;
    $("#pub-kpi-prizes").textContent = `${totalLinkedItems} Prêmio(s) Patrocinado(s) Ativo(s)`;
    $("#pub-kpi-leader").textContent = topMember
      ? `🥇 ${topMember.code} (${formatNum(topMember.totalPts)} pts)`
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
    const allRanked = getAllRankedMembers(cyc);

    const isAllUnits = state.publicUnitId === "ALL";
    const selectedUnitObj = !isAllUnits
      ? cyc.unitsRanking.find((u) => u.unitId === state.publicUnitId) || cyc.unitsRanking[0]
      : null;

    if (isAllUnits) {
      btnBack.classList.add("hidden");
      $("#pub-ranking-level-tag").textContent = isClosed
        ? `Histórico Homologado • Ranking Geral de Profissionais e Equipes (${cyc.code})`
        : `Classificação Geral por Pontuação • Todos os Profissionais e Equipes (${cyc.code})`;
      $("#pub-ranking-title").textContent = `Ranking de Profissionais e Equipes — ${cyc.code}`;

      breadcrumb.innerHTML = `
        <span class="drill-crumb active">🏆 Todos os Profissionais e Equipes (${allRanked.length} participantes ranqueados do maior para o menor nº de pontos)</span>
        <span class="text-muted">• Clique no nome da unidade ou use os filtros acima para focar em uma unidade ou categoria</span>
      `;
    } else {
      btnBack.classList.remove("hidden");
      $("#pub-ranking-level-tag").textContent = `Filtro por Unidade • ${selectedUnitObj.coord}`;
      $("#pub-ranking-title").textContent = `Ranking de Profissionais e Equipes: ${selectedUnitObj.unitName} — ${cyc.code}`;

      breadcrumb.innerHTML = `
        <span class="drill-crumb" id="crumb-back-all-units">🏛️ Todas as Unidades</span>
        <span>›</span>
        <span class="drill-crumb active">📍 ${selectedUnitObj.unitName} (TME ${selectedUnitObj.tme} • NPS ${selectedUnitObj.nps})</span>
      `;

      $("#crumb-back-all-units").addEventListener("click", () => {
        state.publicUnitId = "ALL";
        $("#sel-public-unit").value = "ALL";
        renderPublicRanking();
      });
    }

    thead.innerHTML = `
      <tr>
        <th>Pos.</th>
        <th>Profissional/Equipe</th>
        <th>Categoria</th>
        <th>Pontuação (Ind. + Grupo)</th>
        <th>Faixa</th>
        <th>Prêmio Patrocinado Vinculado</th>
      </tr>
    `;

    // Filtra por unidade (se selecionada) e por categoria (se selecionada), mantendo ordenação decrescente por totalPts
    const filteredMembers = allRanked
      .filter((m) => isAllUnits || m.unitId === state.publicUnitId)
      .filter((m) => state.publicCategory === "ALL" || m.category === state.publicCategory)
      .sort((a, b) => b.totalPts - a.totalPts);

    if (filteredMembers.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center;padding:16px;" class="text-muted">
            Nenhum profissional ou equipe encontrado para o filtro selecionado neste ciclo.
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
        <td>
          <strong>${m.code}</strong>
          <div class="text-muted drill-crumb" data-unit-id="${m.unitId}" style="font-size:0.73rem;" title="Clique para filtrar os profissionais desta unidade">
            📍 ${m.unitName}
          </div>
        </td>
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

      const unitLink = tr.querySelector("[data-unit-id]");
      if (unitLink) {
        unitLink.addEventListener("click", () => {
          state.publicUnitId = m.unitId;
          $("#sel-public-unit").value = m.unitId;
          renderPublicRanking();
        });
      }

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
  // MASCOTE AQUALINO RESPONDENDO DÚVIDAS DE UTILIZAÇÃO DA TELA
  // =========================================================================
  function generateAqualinoV2Answer(rawQuestion) {
    const q = (rawQuestion || "").toLowerCase();

    if (/(drill|unidade|ranking|equipe|profissiona|atendente|recepcionista|supervisor)/i.test(q)) {
      return `Na <strong>Vitrine & Ranking por Unidade</strong>, a tabela da direita inicia mostrando o <strong>Ranking Geral das Unidades de Atendimento</strong> para evitar poluição visual. Basta clicar em qualquer linha de unidade (ex.: <em>Posto Boa Vista</em>, <em>Central Rebouças</em> ou <em>Central Maringá</em>) ou escolher a unidade no filtro <strong>"2. Unidade de Atendimento"</strong> para fazer o <strong>Drill-Down</strong> e ver o ranking individual dos Recepcionistas, Atendentes e Supervisor daquela unidade!`;
    }

    if (/(anterior|ciclo|histórico|historico|2026\.3|2026\.2)/i.test(q)) {
      return `Para consultar o <strong>ranking e os prêmios dos ciclos anteriores</strong>, selecione o ciclo desejado no campo <strong>"1. Ciclo de Gamificação (Atual ou Anteriores)"</strong> (como o <em>Ciclo 2026.3</em> ou o <em>Ciclo 2026.2</em>). Tanto a vitrine de prêmios à esquerda quanto o ranking por unidade à direita atualizarão imediatamente com os dados homologados daquele ciclo!`;
    }

    if (/(patrocinador|item|doado|estoque|doação|doacao|positivo|ifood|vincular|vínculo|vinculo)/i.test(q)) {
      return `A <strong>Gestão de Patrocinadores & Vínculo de Itens Doados</strong> agora fica na tela <strong>TelaGameParam.html</strong> (acessível pelo botão <em>⚙️ Regras & Patrocínios</em> no topo), onde o time de gestão cadastra novos patrocinadores, registra itens doados no estoque e vincula os prêmios às categorias do ciclo vigente!`;
    }

    return `Nesta tela todo o time da SANEPAR consulta os prêmios patrocinados disponíveis por categoria e o ranking por Unidade de Atendimento (com drill-down clicando na unidade e consulta a ciclos anteriores). O cadastro de patrocinadores e vínculo de itens doados é realizado na tela <strong>TelaGameParam.html</strong>!`;
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
          const sample = "Como consultar o ranking por unidade de atendimento e usar o drill-down para ver os profissionais da unidade?";
          $("#input-ask-aqualino-v2").value = sample;
          askAqualinoV2(sample);
        };
        rec.start();
        return;
      } catch (_) {}
    }

    const sample = "Como consultar o ranking por unidade de atendimento e usar o drill-down para ver os profissionais da unidade?";
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
    localStorage.removeItem("sanepar_gamification_sponsors_stock_v1");
    db = getInitialData();
    state.publicCycleId = "C_2026_4";
    state.publicUnitId = "ALL";
    state.publicCategory = "ALL";
    state.publicTier = "ALL";

    $("#sel-public-cycle").value = "C_2026_4";
    $("#sel-public-unit").value = "ALL";
    $("#sel-public-category").value = "ALL";
    $$("#pub-tier-chips .chip").forEach((c) => {
      c.classList.toggle("active", c.dataset.tier === "ALL");
    });

    $("#aqualino-v2-bubble").classList.remove("answering");
    $("#aqualino-v2-bubble").innerHTML =
      "Olá! Nesta vitrine todo o time da SANEPAR consulta os prêmios patrocinados disponíveis para cada categoria e acompanha o ranking por Unidade de Atendimento (com drill-down e histórico de ciclos anteriores)!";

    refreshAll();
  });

  function refreshAll() {
    renderPublicMiniKpis();
    renderPublicPrizesList();
    renderPublicRanking();
  }

  refreshAll();
})();
