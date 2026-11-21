(() => {
  "use strict";

  // =========================================================================
  // BANCO DE DADOS DA VITRINE DE PRÊMIOS, PATROCINADORES, RANKING E HISTÓRICO
  // =========================================================================
  function getInitialVitrineDb() {
    return {
      C_2026_4: {
        id: "C_2026_4",
        code: "Ciclo 2026.4",
        name: "Ciclo 2026.4 (Vigente • Out–Dez/2026) — Excelência SGC & Resolutividade",
        status: "VIGENTE",
        prizes: [
          {
            id: "P_264_1",
            category: "RECEPCAO",
            tier: "OURO",
            sponsor: "Positivo Informática",
            sponsorIcon: "💻",
            title: "Kit Mouse & Teclado Sem Fio Ergonômico Positivo + Headset",
            desc: "Combo Wireless 2.4GHz silencioso de alta precisão + Headset USB Noise Cancelling oferecido pela Positivo Informática.",
            minPts: 1100,
            qty: 22,
            ranking: [
              {
                pos: 1,
                who: "Recepcionista #R-104 • Central Rebouças (Curitiba)",
                unit: "01 • Coord. Curitiba Centro-Leste",
                indPts: 760,
                grpPts: 420,
                totalPts: 1298,
                metricNote: "TME Recepção 01m 18s • 38% Fila Evitada",
              },
              {
                pos: 2,
                who: "Recepcionista #R-209 • Central Maringá Brasil",
                unit: "07 • Coord. Maringá",
                indPts: 740,
                grpPts: 410,
                totalPts: 1265,
                metricNote: "TME Recepção 01m 24s • 36% Fila Evitada",
              },
              {
                pos: 3,
                who: "Recepcionista #R-312 • Posto Boa Vista (Curitiba)",
                unit: "01 • Coord. Curitiba Centro-Leste",
                indPts: 695,
                grpPts: 390,
                totalPts: 1193,
                metricNote: "100% Conferência Documental SGC",
              },
              {
                pos: 4,
                who: "Recepcionista #R-118 • Central Londrina Centro",
                unit: "06 • Coord. Londrina",
                indPts: 615,
                grpPts: 350,
                totalPts: 1061,
                metricNote: "Em evolução (a 39 pts da Faixa Ouro)",
              },
            ],
          },
          {
            id: "P_264_2",
            category: "RECEPCAO",
            tier: "PRATA",
            sponsor: "iFood",
            sponsorIcon: "🍔",
            title: "Voucher iFood Benefícios R$ 350 (Cartão Presente Digital)",
            desc: "Crédito livre no app iFood (restaurantes e mercado) patrocinado pelo iFood Empresas para destaques regionais da recepção.",
            minPts: 850,
            qty: 44,
            ranking: [
              {
                pos: 1,
                who: "Recepcionista #R-118 • Central Londrina Centro",
                unit: "06 • Coord. Londrina",
                indPts: 615,
                grpPts: 350,
                totalPts: 1061,
                metricNote: "Habilitado na Faixa Prata (Rumo à Ouro)",
              },
              {
                pos: 2,
                who: "Recepcionista #R-405 • Posto Pinheirinho (Curitiba)",
                unit: "02 • Coord. Curitiba Sul-Oeste",
                indPts: 570,
                grpPts: 330,
                totalPts: 990,
                metricNote: "Nota Acolhimento 4,8 ★",
              },
              {
                pos: 3,
                who: "Recepcionista #R-502 • Central Cascavel",
                unit: "12 • Coord. Cascavel",
                indPts: 520,
                grpPts: 310,
                totalPts: 913,
                metricNote: "Triagem 156/Copel 100% assertiva",
              },
            ],
          },
          {
            id: "P_264_3",
            category: "ATENDENTE",
            tier: "OURO",
            sponsor: "Positivo Informática",
            sponsorIcon: "💻",
            title: "Notebook Positivo Vision C15 + Kit Teclado & Mouse Wireless",
            desc: "Equipamento portátil de uso pessoal + kit completo de periféricos sem fio patrocinado pela Positivo Informática.",
            minPts: 1250,
            qty: 15,
            ranking: [
              {
                pos: 1,
                who: "Atendente #101 • Guichê 01 — Central Rebouças (Curitiba)",
                unit: "01 • Coord. Curitiba Centro-Leste",
                indPts: 850,
                grpPts: 430,
                totalPts: 1410,
                metricNote: "NPS Pós-Checkout 96 (5,0 ★) • FCR 96,2%",
              },
              {
                pos: 2,
                who: "Atendente #701 • Guichê 01 — Central Maringá Brasil",
                unit: "07 • Coord. Maringá",
                indPts: 820,
                grpPts: 425,
                totalPts: 1370,
                metricNote: "NPS Pós-Checkout 94 (4,9 ★) • FCR 94,5%",
              },
              {
                pos: 3,
                who: "Atendente #501 • Guichê 01 — Posto Boa Vista (Curitiba)",
                unit: "01 • Coord. Curitiba Centro-Leste",
                indPts: 790,
                grpPts: 410,
                totalPts: 1320,
                metricNote: "NPS Pós-Checkout 94 • TMA 06m 10s",
              },
              {
                pos: 4,
                who: "Atendente #601 • Guichê 01 — Central Londrina Centro",
                unit: "06 • Coord. Londrina",
                indPts: 710,
                grpPts: 375,
                totalPts: 1194,
                metricNote: "Disputa acirrada (a 56 pts da Faixa Ouro)",
              },
            ],
          },
          {
            id: "P_264_4",
            category: "ATENDENTE",
            tier: "PRATA",
            sponsor: "iFood",
            sponsorIcon: "🍔",
            title: "Voucher iFood Benefícios R$ 500 + 3 Meses Clube iFood",
            desc: "Voucher gastronômico digital patrocinado pelo iFood para os atendentes de guichê com alta avaliação pós-checkout.",
            minPts: 950,
            qty: 35,
            ranking: [
              {
                pos: 1,
                who: "Atendente #601 • Guichê 01 — Central Londrina Centro",
                unit: "06 • Coord. Londrina",
                indPts: 710,
                grpPts: 375,
                totalPts: 1194,
                metricNote: "Líder da Faixa Prata • NPS 88",
              },
              {
                pos: 2,
                who: "Atendente #303 • Guichê 03 — Posto Pinheirinho (Curitiba)",
                unit: "02 • Coord. Curitiba Sul-Oeste",
                indPts: 660,
                grpPts: 355,
                totalPts: 1116,
                metricNote: "NPS 91 • Resolutividade 93,0%",
              },
              {
                pos: 3,
                who: "Atendente #104 • Guichê 04 — Central Rebouças (Curitiba)",
                unit: "01 • Coord. Curitiba Centro-Leste",
                indPts: 625,
                grpPts: 360,
                totalPts: 1083,
                metricNote: "NPS 91 • Zero fila em agendados",
              },
            ],
          },
          {
            id: "P_264_5",
            category: "SUPERVISOR",
            tier: "OURO",
            sponsor: "SESC Paraná",
            sponsorIcon: "🏖️",
            title: "Fim de Semana Hotel SESC Caiobá ou Foz (c/ Acompanhante)",
            desc: "2 diárias com pensão completa para o Supervisor Local que mantiver o TME da unidade ≤ 10m e NPS ≥ 85, patrocinado pelo SESC Paraná.",
            minPts: 1200,
            qty: 10,
            ranking: [
              {
                pos: 1,
                who: "Supervisor Local #S-03 • Posto Boa Vista (Curitiba)",
                unit: "01 • Coord. Curitiba Centro-Leste",
                indPts: 810,
                grpPts: 440,
                totalPts: 1375,
                metricNote: "TME Médio 06m 20s • 100% dias dentro da meta",
              },
              {
                pos: 2,
                who: "Supervisor Local #S-07 • Central Maringá Brasil",
                unit: "07 • Coord. Maringá",
                indPts: 790,
                grpPts: 430,
                totalPts: 1342,
                metricNote: "TME Médio 07m 00s • Benchmark Estadual ★",
              },
              {
                pos: 3,
                who: "Supervisor Local #S-01 • Central Rebouças (Curitiba)",
                unit: "01 • Coord. Curitiba Centro-Leste",
                indPts: 720,
                grpPts: 390,
                totalPts: 1221,
                metricNote: "100% alertas do Aqualino mitigados < 3 min",
              },
            ],
          },
          {
            id: "P_264_6",
            category: "SUPERVISOR",
            tier: "PRATA",
            sponsor: "Positivo Informática",
            sponsorIcon: "💻",
            title: "Tablet Positivo Tab Q10 + Kit Teclado & Mouse Bluetooth",
            desc: "Tablet corporativo/pessoal com capa teclado e mouse Bluetooth oferecido pela Positivo Informática para gestão em mobilidade.",
            minPts: 920,
            qty: 12,
            ranking: [
              {
                pos: 1,
                who: "Supervisor Local #S-06 • Central Londrina Centro",
                unit: "06 • Coord. Londrina",
                indPts: 650,
                grpPts: 365,
                totalPts: 1116,
                metricNote: "Escalonamento de almoço reduziu TME em -42%",
              },
              {
                pos: 2,
                who: "Supervisor Local #S-18 • Central Ponta Grossa",
                unit: "18 • Coord. Ponta Grossa",
                indPts: 610,
                grpPts: 340,
                totalPts: 1045,
                metricNote: "Aderência à escala preditiva SGC: 95%",
              },
            ],
          },
          {
            id: "P_264_7",
            category: "GRUPO",
            tier: "OURO",
            sponsor: "iFood",
            sponsorIcon: "🍔",
            title: "Experiência Gastronômica Coletiva iFood (R$ 2.500 p/ a Equipe)",
            desc: "Patrocínio iFood Empresas para confraternização completa de toda a equipe da Central (Recepcionistas + Atendentes + Supervisor Local).",
            minPts: 1050,
            qty: 6,
            ranking: [
              {
                pos: 1,
                who: "Equipe Completa • Posto Boa Vista — Rua da Cidadania (Curitiba)",
                unit: "01 • Coord. Curitiba Centro-Leste",
                indPts: 0,
                grpPts: 1180,
                totalPts: 1298,
                metricNote: "TME Coletivo 06m 20s • NPS 92 • FCR 94,1%",
              },
              {
                pos: 2,
                who: "Equipe Completa • Central Maringá Brasil",
                unit: "07 • Coord. Maringá",
                indPts: 0,
                grpPts: 1150,
                totalPts: 1265,
                metricNote: "TME Coletivo 07m 00s • NPS 91 • FCR 93,8%",
              },
              {
                pos: 3,
                who: "Equipe Completa • Central Rebouças — Matriz (Curitiba)",
                unit: "01 • Coord. Curitiba Centro-Leste",
                indPts: 0,
                grpPts: 1010,
                totalPts: 1111,
                metricNote: "NPS 89 • Maior volume estadual atendido",
              },
            ],
          },
          {
            id: "P_264_8",
            category: "GRUPO",
            tier: "PRATA",
            sponsor: "Fundação Sanepar & Senac",
            sponsorIcon: "🎓",
            title: "Kit Periféricos Positivo p/ Sala de Equipe + Troféu Aqualino Regional",
            desc: "Renovação de mouses/teclados ergonômicos + Placa de Reconhecimento Regional e Café Especial patrocinado pela Fundação Sanepar.",
            minPts: 820,
            qty: 12,
            ranking: [
              {
                pos: 1,
                who: "Equipe Completa • Central Londrina Centro",
                unit: "06 • Coord. Londrina",
                indPts: 0,
                grpPts: 920,
                totalPts: 1012,
                metricNote: "FCR Coletivo 90,5% • NPS 83",
              },
              {
                pos: 2,
                who: "Equipe Completa • Posto Pinheirinho (Curitiba)",
                unit: "02 • Coord. Curitiba Sul-Oeste",
                indPts: 0,
                grpPts: 870,
                totalPts: 957,
                metricNote: "35% de demanda retida na recepção",
              },
            ],
          },
        ],
      },
      C_2027_1: {
        id: "C_2027_1",
        code: "Ciclo 2027.1",
        name: "Ciclo 2027.1 (Planejado • Jan–Mar/2027) — Operação Verão Paraná",
        status: "PLANEJADO",
        prizes: [
          {
            id: "P_271_1",
            category: "RECEPCAO",
            tier: "OURO",
            sponsor: "Positivo Informática",
            sponsorIcon: "💻",
            title: "Kit Teclado & Mouse Sem Fio Positivo Smart + Smartband",
            desc: "Prêmio planejado para a Operação Verão patrocinado pela Positivo Informática para triagem expressa ≤ 1m 30s.",
            minPts: 1150,
            qty: 25,
            ranking: [
              {
                pos: 1,
                who: "Aguardando início da vigência (01/01/2027)",
                unit: "382 Centrais Elegíveis",
                indPts: 0,
                grpPts: 0,
                totalPts: 0,
                metricNote: "Ciclo Planejado • Inscrições automáticas via SGC",
              },
            ],
          },
          {
            id: "P_271_2",
            category: "ATENDENTE",
            tier: "OURO",
            sponsor: "iFood",
            sponsorIcon: "🍔",
            title: "Super Voucher iFood Verão R$ 750 + Kit Positivo Wireless",
            desc: "Parceria conjunta iFood + Positivo Informática para os líderes de satisfação pós-checkout na alta temporada.",
            minPts: 1300,
            qty: 20,
            ranking: [
              {
                pos: 1,
                who: "Aguardando início da vigência (01/01/2027)",
                unit: "382 Centrais Elegíveis",
                indPts: 0,
                grpPts: 0,
                totalPts: 0,
                metricNote: "Ciclo Planejado • Meta Pós-Checkout 3,0x",
              },
            ],
          },
          {
            id: "P_271_3",
            category: "SUPERVISOR",
            tier: "OURO",
            sponsor: "SESC Paraná",
            sponsorIcon: "🏖️",
            title: "3 Diárias Hotel SESC Caiobá / Matinhos (Pós-Operação Verão)",
            desc: "Estadia completa patrocinada pelo SESC Paraná para os supervisores locais com zero déficit de escala no verão.",
            minPts: 1250,
            qty: 12,
            ranking: [
              {
                pos: 1,
                who: "Aguardando início da vigência (01/01/2027)",
                unit: "22 Coordenações Comerciais",
                indPts: 0,
                grpPts: 0,
                totalPts: 0,
                metricNote: "Ciclo Planejado",
              },
            ],
          },
          {
            id: "P_271_4",
            category: "GRUPO",
            tier: "OURO",
            sponsor: "iFood",
            sponsorIcon: "🍔",
            title: "Festival Gastronômico iFood p/ Equipe da Central Campeã Verão",
            desc: "Voucher coletivo iFood Empresas R$ 3.000 para celebração da equipe com melhor TME e NPS no trimestre de verão.",
            minPts: 1100,
            qty: 8,
            ranking: [
              {
                pos: 1,
                who: "Aguardando início da vigência (01/01/2027)",
                unit: "Equipes Litoral, Capital e Interior",
                indPts: 0,
                grpPts: 0,
                totalPts: 0,
                metricNote: "Ciclo Planejado",
              },
            ],
          },
        ],
      },
      C_2026_3: {
        id: "C_2026_3",
        code: "Ciclo 2026.3",
        name: "Ciclo 2026.3 (Histórico Encerrado • Jul–Set/2026) — Recepção Gamificada",
        status: "ENCERRADO",
        prizes: [
          {
            id: "P_263_1",
            category: "RECEPCAO",
            tier: "OURO",
            sponsor: "Positivo Informática",
            sponsorIcon: "💻",
            title: "Kit Mouse & Teclado Sem Fio Positivo Comfort + Mochila",
            desc: "Concedido pela Positivo Informática aos recepcionistas campeões na implantação da conferência documental.",
            minPts: 980,
            qty: 20,
            ranking: [
              {
                pos: 1,
                who: "Recepcionista #R-104 • Central Rebouças (Curitiba)",
                unit: "01 • Coord. Curitiba Centro-Leste",
                indPts: 730,
                grpPts: 310,
                totalPts: 1144,
                metricNote: "✓ Prêmio Homologado e Entregue em 05/10/2026",
              },
              {
                pos: 2,
                who: "Recepcionista #R-312 • Posto Boa Vista (Curitiba)",
                unit: "01 • Coord. Curitiba Centro-Leste",
                indPts: 690,
                grpPts: 300,
                totalPts: 1089,
                metricNote: "✓ Prêmio Homologado e Entregue em 05/10/2026",
              },
            ],
          },
          {
            id: "P_263_2",
            category: "ATENDENTE",
            tier: "OURO",
            sponsor: "iFood",
            sponsorIcon: "🍔",
            title: "Voucher iFood Benefícios R$ 450 (Destaque Pós-Checkout)",
            desc: "Patrocínio iFood entregue aos atendentes de guichê com média ≥ 4,8 ★ na avaliação pós-checkout.",
            minPts: 1100,
            qty: 25,
            ranking: [
              {
                pos: 1,
                who: "Atendente #701 • Guichê 01 — Central Maringá Brasil",
                unit: "07 • Coord. Maringá",
                indPts: 810,
                grpPts: 340,
                totalPts: 1265,
                metricNote: "✓ Prêmio Homologado e Entregue em 05/10/2026",
              },
              {
                pos: 2,
                who: "Atendente #101 • Guichê 01 — Central Rebouças (Curitiba)",
                unit: "01 • Coord. Curitiba Centro-Leste",
                indPts: 795,
                grpPts: 335,
                totalPts: 1243,
                metricNote: "✓ Prêmio Homologado e Entregue em 05/10/2026",
              },
            ],
          },
          {
            id: "P_263_3",
            category: "GRUPO",
            tier: "OURO",
            sponsor: "iFood",
            sponsorIcon: "🍔",
            title: "Café & Almoço Coletivo iFood Empresas (R$ 2.000 p/ Unidade)",
            desc: "Entregue pelo iFood Empresas às unidades com menor índice de retrabalho entre recepção e guichês.",
            minPts: 920,
            qty: 5,
            ranking: [
              {
                pos: 1,
                who: "Equipe Completa • Central Maringá Brasil",
                unit: "07 • Coord. Maringá",
                indPts: 0,
                grpPts: 1040,
                totalPts: 1144,
                metricNote: "✓ Prêmio Coletivo Entregue em 06/10/2026",
              },
            ],
          },
        ],
      },
      C_2026_2: {
        id: "C_2026_2",
        code: "Ciclo 2026.2",
        name: "Ciclo 2026.2 (Histórico Encerrado • Abr–Jun/2026) — Piloto Curitiba",
        status: "ENCERRADO",
        prizes: [
          {
            id: "P_262_1",
            category: "ATENDENTE",
            tier: "OURO",
            sponsor: "Positivo Informática",
            sponsorIcon: "💻",
            title: "Kit Mouse & Teclado Wireless Positivo + Headset USB",
            desc: "Patrocínio Positivo Informática entregue aos atendentes campeões do piloto metropolitano de Curitiba.",
            minPts: 1020,
            qty: 15,
            ranking: [
              {
                pos: 1,
                who: "Atendente #501 • Guichê 01 — Posto Boa Vista (Curitiba)",
                unit: "01 • Coord. Curitiba Centro-Leste",
                indPts: 780,
                grpPts: 260,
                totalPts: 1185,
                metricNote: "✓ Prêmio Homologado e Entregue em 04/07/2026",
              },
            ],
          },
          {
            id: "P_262_2",
            category: "SUPERVISOR",
            tier: "OURO",
            sponsor: "Fundação Sanepar & Senac",
            sponsorIcon: "🎓",
            title: "Bolsa Certificação Executiva Senac + Kit Positivo Wireless",
            desc: "Entregue aos supervisores locais de Curitiba que eliminaram o pico de 300% no horário de almoço.",
            minPts: 1050,
            qty: 5,
            ranking: [
              {
                pos: 1,
                who: "Supervisor Local #S-01 • Central Rebouças (Curitiba)",
                unit: "01 • Coord. Curitiba Centro-Leste",
                indPts: 800,
                grpPts: 280,
                totalPts: 1210,
                metricNote: "✓ Prêmio Homologado e Entregue em 04/07/2026",
              },
            ],
          },
        ],
      },
    };
  }

  // Histórico consolidado das premiações de cada ciclo (Bloco 3)
  const HISTORICAL_AWARDS_LOG = [
    {
      cycleId: "C_2026_4",
      cycleCode: "Ciclo 2026.4 (Vigente)",
      category: "ATENDENTE",
      tier: "OURO",
      prize: "Notebook Positivo Vision C15 + Kit Teclado & Mouse Wireless",
      sponsor: "💻 Positivo Informática",
      winner: "Atendente #101 • Guichê 01 — Central Rebouças (Curitiba)",
      score: "1.410 pts (850 Ind. + 430 Grupo • Bônus 1,20x)",
      status: "🏆 1º Lugar Atual no Ranking (Habilitado)",
      statusCls: "tag-green",
    },
    {
      cycleId: "C_2026_4",
      cycleCode: "Ciclo 2026.4 (Vigente)",
      category: "RECEPCAO",
      tier: "OURO",
      prize: "Kit Mouse & Teclado Sem Fio Ergonômico Positivo + Headset",
      sponsor: "💻 Positivo Informática",
      winner: "Recepcionista #R-104 • Central Rebouças (Curitiba)",
      score: "1.298 pts (760 Ind. + 420 Grupo • Bônus 1,20x)",
      status: "🏆 1º Lugar Atual no Ranking (Habilitado)",
      statusCls: "tag-green",
    },
    {
      cycleId: "C_2026_4",
      cycleCode: "Ciclo 2026.4 (Vigente)",
      category: "GRUPO",
      tier: "OURO",
      prize: "Experiência Gastronômica Coletiva iFood (R$ 2.500 p/ a Equipe)",
      sponsor: "🍔 iFood",
      winner: "Equipe Completa • Posto Boa Vista — Rua da Cidadania (Curitiba)",
      score: "1.298 pts (100% Mérito Coletivo • TME 06m 20s & NPS 92)",
      status: "🏆 Unidade Líder no Ranking (Habilitada)",
      statusCls: "tag-green",
    },
    {
      cycleId: "C_2026_4",
      cycleCode: "Ciclo 2026.4 (Vigente)",
      category: "SUPERVISOR",
      tier: "OURO",
      prize: "Fim de Semana Hotel SESC Caiobá ou Foz (c/ Acompanhante)",
      sponsor: "🏖️ SESC Paraná",
      winner: "Supervisor Local #S-03 • Posto Boa Vista (Curitiba)",
      score: "1.375 pts (810 Ind. + 440 Grupo • Bônus 1,20x)",
      status: "🏆 1º Lugar Atual no Ranking (Habilitado)",
      statusCls: "tag-green",
    },
    {
      cycleId: "C_2026_3",
      cycleCode: "Ciclo 2026.3 (Encerrado)",
      category: "RECEPCAO",
      tier: "OURO",
      prize: "Kit Mouse & Teclado Sem Fio Positivo Comfort + Mochila",
      sponsor: "💻 Positivo Informática",
      winner: "Recepcionista #R-104 • Central Rebouças (Curitiba)",
      score: "1.144 pts (730 Ind. + 310 Grupo • Bônus 1,10x)",
      status: "✓ Prêmio Entregue & Homologado (05/10/2026)",
      statusCls: "tag-blue",
    },
    {
      cycleId: "C_2026_3",
      cycleCode: "Ciclo 2026.3 (Encerrado)",
      category: "ATENDENTE",
      tier: "OURO",
      prize: "Voucher iFood Benefícios R$ 450 (Destaque Pós-Checkout)",
      sponsor: "🍔 iFood",
      winner: "Atendente #701 • Guichê 01 — Central Maringá Brasil",
      score: "1.265 pts (810 Ind. + 340 Grupo • Bônus 1,10x)",
      status: "✓ Prêmio Entregue & Homologado (05/10/2026)",
      statusCls: "tag-blue",
    },
    {
      cycleId: "C_2026_3",
      cycleCode: "Ciclo 2026.3 (Encerrado)",
      category: "RECEPCAO",
      tier: "PRATA",
      prize: "Voucher iFood Benefícios R$ 250 (Destaque Triagem Regional)",
      sponsor: "🍔 iFood",
      winner: "Recepcionista #R-209 • Central Maringá Brasil",
      score: "945 pts (620 Ind. + 240 Grupo • Bônus 1,10x)",
      status: "✓ Prêmio Entregue & Homologado (05/10/2026)",
      statusCls: "tag-blue",
    },
    {
      cycleId: "C_2026_3",
      cycleCode: "Ciclo 2026.3 (Encerrado)",
      category: "GRUPO",
      tier: "OURO",
      prize: "Café & Almoço Coletivo iFood Empresas (R$ 2.000 p/ Unidade)",
      sponsor: "🍔 iFood",
      winner: "Equipe Completa • Central Maringá Brasil",
      score: "1.144 pts (100% Mérito Coletivo • Zero Retrabalho)",
      status: "✓ Prêmio Entregue & Homologado (06/10/2026)",
      statusCls: "tag-blue",
    },
    {
      cycleId: "C_2026_2",
      cycleCode: "Ciclo 2026.2 (Encerrado)",
      category: "ATENDENTE",
      tier: "OURO",
      prize: "Kit Mouse & Teclado Wireless Positivo + Headset USB",
      sponsor: "💻 Positivo Informática",
      winner: "Atendente #501 • Guichê 01 — Posto Boa Vista (Curitiba)",
      score: "1.185 pts (780 Ind. + 260 Grupo • Bônus 1,20x)",
      status: "✓ Prêmio Entregue & Homologado (04/07/2026)",
      statusCls: "tag-blue",
    },
    {
      cycleId: "C_2026_2",
      cycleCode: "Ciclo 2026.2 (Encerrado)",
      category: "SUPERVISOR",
      tier: "OURO",
      prize: "Bolsa Certificação Executiva Senac + Kit Positivo Wireless",
      sponsor: "🎓 Fundação Sanepar & Senac",
      winner: "Supervisor Local #S-01 • Central Rebouças (Curitiba)",
      score: "1.210 pts (800 Ind. + 280 Grupo • Bônus 1,20x)",
      status: "✓ Prêmio Entregue & Homologado (04/07/2026)",
      statusCls: "tag-blue",
    },
    {
      cycleId: "C_2026_2",
      cycleCode: "Ciclo 2026.2 (Encerrado)",
      category: "GRUPO",
      tier: "OURO",
      prize: "Voucher Confraternização iFood Empresas + Placa Piloto Curitiba",
      sponsor: "🍔 iFood",
      winner: "Equipe Completa • Posto Boa Vista — Rua da Cidadania (Curitiba)",
      score: "1.090 pts (TME Piloto reduzido para 06m 45s)",
      status: "✓ Prêmio Entregue & Homologado (05/07/2026)",
      statusCls: "tag-blue",
    },
  ];

  let vitrineDb = getInitialVitrineDb();

  const state = {
    cycleId: "C_2026_4",
    category: "ALL",
    tier: "ALL",
    sponsor: "ALL",
    selectedPrizeId: "P_264_1",
    historyCycleFilter: "ALL",
  };

  const CATEGORY_MAP = {
    RECEPCAO: { label: "🛎️ Recepcionistas", cls: "tag-teal" },
    ATENDENTE: { label: "🎧 Atendentes de Guichê", cls: "tag-blue" },
    SUPERVISOR: { label: "📊 Supervisores Locais", cls: "tag-amber" },
    GRUPO: { label: "🤝 Equipe da Unidade (Grupo)", cls: "tag-green" },
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function currentHHMMSS() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  }

  function formatNum(n) {
    return Number(n).toLocaleString("pt-BR");
  }

  setInterval(() => {
    $("#live-clock-display").textContent = currentHHMMSS();
  }, 1000);

  function getActiveCycleObj() {
    return vitrineDb[state.cycleId] || vitrineDb.C_2026_4;
  }

  function isReadOnlyCycle(cyc) {
    const c = cyc || getActiveCycleObj();
    return c.status === "ENCERRADO";
  }

  function getFilteredPrizes() {
    const c = getActiveCycleObj();
    return c.prizes.filter((p) => {
      if (state.category !== "ALL" && p.category !== state.category) return false;
      if (state.tier !== "ALL" && p.tier !== state.tier) return false;
      if (state.sponsor !== "ALL" && p.sponsor !== state.sponsor) return false;
      return true;
    });
  }

  // =========================================================================
  // KPIS DO TOPO E SÍNTESE DO MASCOTE AQUALINO
  // =========================================================================
  function renderTopBarAndKpis() {
    const c = getActiveCycleObj();
    const readOnly = isReadOnlyCycle(c);

    const stText =
      c.status === "VIGENTE"
        ? "Vigente"
        : c.status === "PLANEJADO"
        ? "Planejado"
        : "Histórico Encerrado";
    $("#top-vitrine-cycle-badge").textContent = `${c.code} (${stText})`;

    $("#vitrine-readonly-banner").classList.toggle("hidden", !readOnly);
    $("#btn-toggle-new-prize").disabled = readOnly;
    if (readOnly) {
      $("#new-prize-drawer").classList.add("hidden");
    }

    const statusTag = $("#vitrine-cycle-status-tag");
    if (c.status === "VIGENTE") {
      statusTag.className = "tag tag-green";
      statusTag.textContent = `${c.code} • Disputa de Prêmios em Tempo Real`;
    } else if (c.status === "PLANEJADO") {
      statusTag.className = "tag tag-blue";
      statusTag.textContent = `${c.code} • Vitrine Planejada (Configurável)`;
    } else {
      statusTag.className = "tag tag-amber";
      statusTag.textContent = `${c.code} • Vitrine Histórica Homologada`;
    }

    const allPrizes = c.prizes;
    const totalQuotas = allPrizes.reduce((acc, p) => acc + p.qty, 0);
    const uniqueSponsors = new Set(allPrizes.map((p) => p.sponsor));

    let qualifiedCount = 0;
    let maxScore = 0;
    allPrizes.forEach((p) => {
      p.ranking.forEach((r) => {
        if (r.totalPts >= p.minPts && r.totalPts > 0) qualifiedCount += 1;
        if (r.totalPts > maxScore) maxScore = r.totalPts;
      });
    });

    $("#kpi-vitrine-prizes-count").textContent = `${allPrizes.length} Prêmios`;
    $("#kpi-vitrine-unidades-total").textContent = `${formatNum(totalQuotas)} cotas patrocinadas no ciclo`;
    $("#kpi-vitrine-sponsors-count").textContent = `${uniqueSponsors.size} Parceiros`;
    $("#kpi-vitrine-qualified-count").textContent =
      c.status === "PLANEJADO" ? "A iniciar" : `${qualifiedCount} Líderes`;
    $("#kpi-vitrine-top-score").textContent =
      maxScore > 0 ? `Maior pontuação: ${formatNum(maxScore)} pts` : "Vigência inicia em 01/01/2027";

    const bubble = $("#aqualino-vitrine-bubble");
    if (!bubble.classList.contains("answering")) {
      bubble.innerHTML = `💧 <strong>Visão do Aqualino na Vitrine (${c.code}):</strong> Temos <strong>${allPrizes.length} prêmios cadastrados</strong> (${formatNum(totalQuotas)} cotas) distribuídos para <strong>Recepcionistas, Atendentes de Guichê, Supervisores Locais e Equipes de Unidade</strong>, custeados por patrocinadores como <strong>Positivo Informática</strong> (mouses, teclados, headsets, notebooks) e <strong>iFood</strong> (vouchers individuais e experiências gastronômicas para a equipe). Clique em qualquer prêmio abaixo para inspecionar o <strong>status atual do ranking</strong>!`;
    }
  }

  // =========================================================================
  // FAIXA DE PATROCINADORES E CATÁLOGO DE CARTÕES DE PRÊMIOS (BLOCO 1)
  // =========================================================================
  function renderSponsorsStrip() {
    const c = getActiveCycleObj();
    const strip = $("#sponsors-summary-strip");
    strip.innerHTML = "";

    const sponsorsMeta = [
      {
        name: "Positivo Informática",
        icon: "💻",
        items: "Mouses, Teclados Wireless, Headsets, Tablets e Notebooks",
      },
      {
        name: "iFood",
        icon: "🍔",
        items: "Vouchers Individuais (R$ 350 a R$ 750) e Experiências p/ Equipe",
      },
      {
        name: "SESC Paraná",
        icon: "🏖️",
        items: "Hospedagem Litoral/Foz e Passaportes de Bem-Estar",
      },
      {
        name: "Fundação Sanepar & Senac",
        icon: "🎓",
        items: "Bolsas Executivas, Certificações e Troféu Aqualino",
      },
    ];

    sponsorsMeta.forEach((sp) => {
      const countInCycle = c.prizes.filter((p) => p.sponsor === sp.name).length;
      const isSelected = state.sponsor === sp.name;

      const card = document.createElement("div");
      card.className = `sponsor-mini-card${isSelected ? " active" : ""}`;
      card.title = "Clique para filtrar os prêmios deste patrocinador";
      card.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <strong>${sp.icon} ${sp.name}</strong>
          <span class="tag ${isSelected ? "tag-blue" : "tag-teal"}">${countInCycle} prêmio(s)</span>
        </div>
        <span>${sp.items}</span>
      `;

      card.addEventListener("click", () => {
        state.sponsor = state.sponsor === sp.name ? "ALL" : sp.name;
        $("#filter-vitrine-sponsor").value = state.sponsor;
        refreshAll();
      });

      strip.appendChild(card);
    });
  }

  function renderPrizeCatalog() {
    const c = getActiveCycleObj();
    const filtered = getFilteredPrizes();
    const container = $("#prize-catalog-cards");
    container.innerHTML = "";

    $("#catalog-section-title").textContent = `Vitrine de Prêmios Disponíveis — ${c.code}`;
    $("#catalog-count-badge").textContent = `${filtered.length} Prêmio(s) Exibido(s)`;

    // Garante que o prêmio selecionado para o ranking exista na lista filtrada
    if (filtered.length > 0 && !filtered.some((p) => p.id === state.selectedPrizeId)) {
      state.selectedPrizeId = filtered[0].id;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: span 2; padding: 20px; text-align: center; background: var(--surface-alt); border: 1px dashed var(--border); border-radius: 10px;">
          <strong>Nenhum prêmio encontrado para a combinação de filtros selecionada.</strong>
          <p class="text-muted" style="margin-top:4px;">Clique em "↺ Restaurar Padrão" ou selecione "Todas as Categorias / Todos os Patrocinadores".</p>
        </div>
      `;
      return;
    }

    filtered.forEach((prize) => {
      const catMeta = CATEGORY_MAP[prize.category] || CATEGORY_MAP.GRUPO;
      const isSelected = prize.id === state.selectedPrizeId;
      const topLeader = prize.ranking[0];
      const topPts = topLeader ? topLeader.totalPts : 0;
      const pct = topPts > 0 ? Math.min(100, Math.round((topPts / prize.minPts) * 100)) : 0;
      const isQualified = topPts >= prize.minPts;

      const card = document.createElement("article");
      card.className = `vitrine-prize-card ${prize.tier === "OURO" ? "tier-ouro" : "tier-prata"}${isSelected ? " selected-prize" : ""}`;

      card.innerHTML = `
        <div class="vp-top-badges">
          <span class="tag ${catMeta.cls}">${catMeta.label}</span>
          <span class="tag ${prize.tier === "OURO" ? "tag-amber" : "tag-blue"}">
            ${prize.tier === "OURO" ? "🥇 Faixa Ouro" : "🥈 Faixa Prata"} • Mín. ${formatNum(prize.minPts)} pts
          </span>
        </div>

        <div class="vp-title-wrap">
          <h3 class="vp-title">${prize.title}</h3>
          <p class="vp-desc">${prize.desc}</p>
        </div>

        <div class="vp-sponsor-box">
          <span>Patrocinador: <strong class="vp-sponsor-name">${prize.sponsorIcon} ${prize.sponsor}</strong></span>
          <span class="tag tag-teal">${prize.qty} cotas</span>
        </div>

        <div class="vp-leader-preview">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
            <strong>🏆 Líder Atual do Prêmio:</strong>
            <span class="tag ${isQualified ? "tag-green" : "tag-amber"}">
              ${
                topPts === 0
                  ? "Ciclo Futuro"
                  : isQualified
                  ? `✓ Habilitado (${formatNum(topPts)} pts)`
                  : `Em Disputa (${formatNum(topPts)} pts)`
              }
            </span>
          </div>
          <span class="text-muted">${topLeader ? topLeader.who : "—"}</span>
          <div class="vp-progress-track">
            <div class="vp-progress-fill" style="width: ${pct}%"></div>
          </div>
        </div>

        <div class="vp-footer-row">
          <span class="text-muted" style="font-size:0.74rem;">${prize.ranking.length} concorrente(s) no pódio</span>
          <button type="button" class="btn ${isSelected ? "btn-teal" : "btn-primary"} btn-sm">
            ${isSelected ? "👁️ Exibindo Ranking ao Lado" : "📊 Ver Status do Ranking →"}
          </button>
        </div>
      `;

      card.addEventListener("click", () => {
        state.selectedPrizeId = prize.id;
        renderPrizeCatalog();
        renderRankingPanel();
      });

      container.appendChild(card);
    });
  }

  // =========================================================================
  // BLOCO 2: VISIBILIDADE DO STATUS ATUAL DO RANKING DE CADA PRÊMIO
  // =========================================================================
  function renderRankingPanel() {
    const c = getActiveCycleObj();
    const sel = $("#select-ranking-prize");
    sel.innerHTML = "";

    c.prizes.forEach((p) => {
      const opt = document.createElement("option");
      opt.value = p.id;
      const catLabel = CATEGORY_MAP[p.category]?.label || p.category;
      opt.textContent = `[${p.tier}] ${p.title} (${p.sponsor}) — ${catLabel}`;
      sel.appendChild(opt);
    });

    const prize =
      c.prizes.find((p) => p.id === state.selectedPrizeId) || c.prizes[0];
    if (!prize) return;

    state.selectedPrizeId = prize.id;
    sel.value = prize.id;

    const catMeta = CATEGORY_MAP[prize.category] || CATEGORY_MAP.GRUPO;
    $("#ranking-prize-title").textContent = `Ranking do Prêmio — ${prize.sponsorIcon} ${prize.sponsor}`;
    $("#ranking-status-pill").textContent =
      c.status === "ENCERRADO"
        ? "Ranking Final Homologado"
        : c.status === "PLANEJADO"
        ? "Aguardando Vigência"
        : "Disputa ao Vivo";

    $("#ranking-prize-highlight").innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
        <span class="tag ${catMeta.cls}">${catMeta.label}</span>
        <span class="tag ${prize.tier === "OURO" ? "tag-amber" : "tag-blue"}">
          ${prize.tier === "OURO" ? "🥇 Faixa Ouro" : "🥈 Faixa Prata"} • Meta: ${formatNum(prize.minPts)} pts
        </span>
      </div>
      <h3>🎁 ${prize.title}</h3>
      <p style="font-size:0.79rem;color:var(--text-muted);">${prize.desc}</p>
      <div style="display:flex;justify-content:space-between;font-size:0.77rem;padding-top:4px;border-top:1px dashed #99e2d8;">
        <span>Patrocinador Oficial: <strong>${prize.sponsorIcon} ${prize.sponsor}</strong></span>
        <span>Disponibilidade: <strong>${prize.qty} unidades/cotas</strong></span>
      </div>
    `;

    const listEl = $("#ranking-leaderboard-list");
    listEl.innerHTML = "";

    prize.ranking.forEach((r) => {
      const isQualified = r.totalPts >= prize.minPts && r.totalPts > 0;
      const diff = prize.minPts - r.totalPts;
      const medal =
        r.pos === 1 ? "🥇 1º Lugar" : r.pos === 2 ? "🥈 2º Lugar" : r.pos === 3 ? "🥉 3º Lugar" : `${r.pos}º Lugar`;

      const row = document.createElement("div");
      row.className = `leader-row-card pos-${r.pos}`;
      row.innerHTML = `
        <div class="leader-top">
          <span class="leader-rank-badge">${medal} • ${r.who}</span>
          <span class="leader-score-pill">${formatNum(r.totalPts)} pts</span>
        </div>
        <div class="leader-sub">
          <span>📍 ${r.unit}</span>
          <span>
            ${
              r.indPts > 0
                ? `Mérito Ind.: <strong>${formatNum(r.indPts)} pts</strong> + Grupo: <strong>${formatNum(r.grpPts)} pts</strong>`
                : `Mérito Coletivo da Equipe: <strong>${formatNum(r.grpPts)} pts</strong>`
            }
          </span>
        </div>
        <div class="leader-sub" style="padding-top:3px;border-top:1px dashed var(--border);">
          <span>📊 ${r.metricNote}</span>
          <span class="tag ${isQualified ? "tag-green" : "tag-amber"}">
            ${
              r.totalPts === 0
                ? "Aguardando Início"
                : isQualified
                ? `✓ Habilitado ao Prêmio (${prize.sponsor})`
                : `Faltam ${formatNum(diff)} pts p/ Meta`
            }
          </span>
        </div>
      `;
      listEl.appendChild(row);
    });
  }

  $("#select-ranking-prize").addEventListener("change", (e) => {
    state.selectedPrizeId = e.target.value;
    renderPrizeCatalog();
    renderRankingPanel();
  });

  // =========================================================================
  // CADASTRO DE NOVO PRÊMIO PATROCINADO NO CICLO
  // =========================================================================
  $("#btn-toggle-new-prize").addEventListener("click", () => {
    if (isReadOnlyCycle()) return;
    $("#new-prize-drawer").classList.toggle("hidden");
  });

  $("#btn-close-new-prize").addEventListener("click", () => {
    $("#new-prize-drawer").classList.add("hidden");
  });

  $("#form-add-prize").addEventListener("submit", (e) => {
    e.preventDefault();
    const c = getActiveCycleObj();
    if (isReadOnlyCycle(c)) return;

    const category = $("#np-category").value;
    const tier = $("#np-tier").value;
    const sponsor = $("#np-sponsor").value;
    const title = $("#np-title").value.trim();
    const desc = $("#np-desc").value.trim();
    const minPts = Number($("#np-min-pts").value) || 1000;
    const qty = Number($("#np-qty").value) || 10;

    if (!title || !desc) return;

    const iconMap = {
      "Positivo Informática": "💻",
      iFood: "🍔",
      "SESC Paraná": "🏖️",
      "Fundação Sanepar & Senac": "🎓",
    };

    const newPrizeId = `P_NEW_${Date.now()}`;
    const newPrize = {
      id: newPrizeId,
      category,
      tier,
      sponsor,
      sponsorIcon: iconMap[sponsor] || "🎁",
      title,
      desc,
      minPts,
      qty,
      ranking: [
        {
          pos: 1,
          who:
            category === "RECEPCAO"
              ? "Recepcionista #R-104 • Central Rebouças (Curitiba)"
              : category === "ATENDENTE"
              ? "Atendente #101 • Guichê 01 — Central Rebouças (Curitiba)"
              : category === "SUPERVISOR"
              ? "Supervisor Local #S-03 • Posto Boa Vista (Curitiba)"
              : "Equipe Completa • Posto Boa Vista (Curitiba)",
          unit: "01 • Coord. Curitiba Centro-Leste",
          indPts: category === "GRUPO" ? 0 : Math.round(minPts * 0.65),
          grpPts: category === "GRUPO" ? minPts : Math.round(minPts * 0.4),
          totalPts: Math.round(minPts * 1.08),
          metricNote: "Líder habilitado no ranking em tempo real",
        },
      ],
    };

    c.prizes.unshift(newPrize);
    state.selectedPrizeId = newPrizeId;

    $("#np-title").value = "";
    $("#np-desc").value = "";
    $("#new-prize-drawer").classList.add("hidden");

    const fb = $("#vitrine-feedback-banner");
    fb.innerHTML = `🎁 <strong>Novo prêmio cadastrado com sucesso no ${c.code}:</strong> <em>"${title}"</em> (Patrocinador: <strong>${sponsor}</strong>) — disponível no catálogo e no monitoramento de ranking!`;
    fb.classList.remove("hidden");

    refreshAll();
  });

  // =========================================================================
  // BLOCO 3: HISTÓRICO DAS PREMIAÇÕES DE CADA CICLO
  // =========================================================================
  $$("#history-cycle-tabs .chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      $$("#history-cycle-tabs .chip").forEach((b) => b.classList.remove("active"));
      chip.classList.add("active");
      state.historyCycleFilter = chip.dataset.histCycle;
      renderHistoricalAwardsTable();
    });
  });

  function renderHistoricalAwardsTable() {
    const tbody = $("#awards-history-tbody");
    tbody.innerHTML = "";

    const rows = HISTORICAL_AWARDS_LOG.filter((item) => {
      if (state.historyCycleFilter !== "ALL" && item.cycleId !== state.historyCycleFilter) {
        return false;
      }
      if (state.category !== "ALL" && item.category !== state.category) {
        return false;
      }
      if (state.sponsor !== "ALL" && !item.sponsor.includes(state.sponsor)) {
        return false;
      }
      return true;
    });

    rows.forEach((r) => {
      const catMeta = CATEGORY_MAP[r.category] || CATEGORY_MAP.GRUPO;
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${r.cycleCode}</strong></td>
        <td><span class="tag ${catMeta.cls}">${catMeta.label}</span></td>
        <td>
          <span class="tag ${r.tier === "OURO" ? "tag-amber" : "tag-blue"}">
            ${r.tier === "OURO" ? "🥇 Ouro" : "🥈 Prata"}
          </span>
        </td>
        <td><strong>${r.prize}</strong></td>
        <td><strong>${r.sponsor}</strong></td>
        <td>${r.winner}</td>
        <td>${r.score}</td>
        <td><span class="tag ${r.statusCls}">${r.status}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  // =========================================================================
  // EVENTOS DOS FILTROS SUPERIORES DA VITRINE
  // =========================================================================
  $("#filter-vitrine-cycle").addEventListener("change", (e) => {
    state.cycleId = e.target.value;
    const c = getActiveCycleObj();
    if (c.prizes.length > 0) {
      state.selectedPrizeId = c.prizes[0].id;
    }
    $("#vitrine-feedback-banner").classList.add("hidden");
    refreshAll();
  });

  $("#filter-vitrine-category").addEventListener("change", (e) => {
    state.category = e.target.value;
    refreshAll();
  });

  $("#filter-vitrine-tier").addEventListener("change", (e) => {
    state.tier = e.target.value;
    refreshAll();
  });

  $("#filter-vitrine-sponsor").addEventListener("change", (e) => {
    state.sponsor = e.target.value;
    refreshAll();
  });

  // =========================================================================
  // MASCOTE AQUALINO RESPONDENDO DÚVIDAS DE UTILIZAÇÃO DA TELA (TelaGameVitrine)
  // =========================================================================
  function generateAqualinoVitrineAnswer(rawQuestion) {
    const q = (rawQuestion || "").toLowerCase();

    if (/(catálogo|catalogo|categoria|recepcionista|atendente|supervisor|grupo|faixa|ouro|prata)/i.test(q)) {
      return `No <strong>Bloco 1 (Catálogo de Prêmios por Categoria & Patrocinador)</strong>, você visualiza todos os prêmios separados pelas 4 categorias de premiação: <strong>🛎️ Recepcionistas</strong>, <strong>🎧 Atendentes de Guichê</strong>, <strong>📊 Supervisores Locais</strong> e <strong>🤝 Equipe da Unidade (Grupo)</strong>, divididos nas faixas <strong>🥇 Ouro</strong> e <strong>🥈 Prata</strong>. Use os filtros no topo para focar em qualquer categoria ou faixa!`;
    }

    if (/(patrocinador|positivo|ifood|sesc|senac|parceiro|mouse|teclado|voucher)/i.test(q)) {
      return `Cada prêmio exibe claramente o seu <strong>Patrocinador Oficial</strong> — como a <strong>💻 Positivo Informática</strong> (oferecendo kits de mouses e teclados sem fio ergonômicos, headsets, tablets e notebooks) e o <strong>🍔 iFood</strong> (oferecendo vouchers gastronômicos individuais e experiências coletivas para toda a equipe da Central campeã). Você pode clicar diretamente nos cartões dos patrocinadores ou usar o seletor <em>"4. Patrocinador Oficial do Prêmio"</em> para filtrar!`;
    }

    if (/(ranking|status|líder|lider|pódio|podio|disputa|classificação|classificacao|pontos)/i.test(q)) {
      return `Para ver o <strong>Status Atual do Ranking de Cada Prêmio</strong>, basta clicar em qualquer cartão de prêmio na vitrine (ou escolhê-lo no seletor do <strong>Bloco 2</strong> à direita). O painel mostra em tempo real o <strong>1º, 2º, 3º e 4º colocados</strong> na disputa por aquele prêmio específico, detalhando os pontos de <em>Mérito Individual</em>, <em>Mérito do Grupo</em> e se o profissional/equipe já atingiu a pontuação mínima de habilitação!`;
    }

    if (/(histórico|historico|ciclo|entregue|homologado|anterior|2026\.3|2026\.2)/i.test(q)) {
      return `No <strong>Bloco 3 (Histórico Consolidado das Premiações de Cada Ciclo)</strong>, você consulta todas as premiações entregues e homologadas nos ciclos anteriores (como o <em>Ciclo 2026.2</em> e o <em>Ciclo 2026.3</em>) e a prévia dos líderes do ciclo vigente (<em>Ciclo 2026.4</em>). Você também pode trocar o ciclo no filtro <strong>"1. Ciclo de Gamificação"</strong> no topo para navegar pela vitrine histórica de cada período!`;
    }

    return `Estou aqui para ajudar você a utilizar a <strong>Tela de Vitrine de Prêmios & Ranking (TelaGameVitrine)</strong>! Você pode: <strong>1)</strong> Filtrar o catálogo por Ciclo, Categoria (<em>Recepcionistas, Atendentes, Supervisores e Grupo</em>), Faixa (<em>Ouro/Prata</em>) e Patrocinador (<em>Positivo Informática, iFood, SESC PR e Fundação Sanepar</em>); <strong>2)</strong> Clicar em qualquer prêmio para ver o <strong>status atual do ranking</strong> daquele prêmio no Bloco 2; <strong>3)</strong> Cadastrar novos prêmios patrocinados em ciclos ativos/planejados; e <strong>4)</strong> Auditar o <strong>histórico completo de premiações por ciclo</strong> no Bloco 3.`;
  }

  function askAqualinoVitrine(questionText) {
    const q = (questionText || "").trim();
    if (!q) {
      $("#input-ask-aqualino-vitrine").focus();
      return;
    }

    const answerHtml = generateAqualinoVitrineAnswer(q);
    const bubble = $("#aqualino-vitrine-bubble");
    bubble.classList.add("answering");
    bubble.innerHTML = `
      💬 <strong>Sua dúvida sobre a tela:</strong> <em>"${q}"</em><br/>
      💧 <strong>Aqualino responde:</strong> ${answerHtml}
      <button type="button" id="btn-back-vitrine-summary" style="margin-left:8px;text-decoration:underline;cursor:pointer;border:none;background:none;color:var(--primary);font-weight:700;">
        ↺ Voltar ao resumo da vitrine do ciclo
      </button>
    `;

    const btnBack = $("#btn-back-vitrine-summary");
    if (btnBack) {
      btnBack.addEventListener("click", () => {
        bubble.classList.remove("answering");
        renderTopBarAndKpis();
      });
    }

    const img = $(".mascot-img");
    if (img) {
      img.classList.add("celebrate");
      setTimeout(() => img.classList.remove("celebrate"), 600);
    }
  }

  $("#form-ask-aqualino-vitrine").addEventListener("submit", (e) => {
    e.preventDefault();
    askAqualinoVitrine($("#input-ask-aqualino-vitrine").value);
  });

  $$(".chip-ask-vitrine").forEach((chip) => {
    chip.addEventListener("click", () => {
      $("#input-ask-aqualino-vitrine").value = chip.dataset.q;
      askAqualinoVitrine(chip.dataset.q);
    });
  });

  const btnVoiceVitrine = $("#btn-voice-aqualino-vitrine");
  let isListeningVitrine = false;
  btnVoiceVitrine.addEventListener("click", () => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!isListeningVitrine && SpeechRec) {
      try {
        const rec = new SpeechRec();
        rec.lang = "pt-BR";
        isListeningVitrine = true;
        btnVoiceVitrine.classList.add("listening");
        btnVoiceVitrine.textContent = "🛑 Ouvindo...";
        rec.onresult = (ev) => {
          const txt = ev.results[0][0].transcript;
          $("#input-ask-aqualino-vitrine").value = txt;
          askAqualinoVitrine(txt);
        };
        rec.onend = () => {
          isListeningVitrine = false;
          btnVoiceVitrine.classList.remove("listening");
          btnVoiceVitrine.textContent = "🎤 Voz";
        };
        rec.onerror = () => {
          isListeningVitrine = false;
          btnVoiceVitrine.classList.remove("listening");
          btnVoiceVitrine.textContent = "🎤 Voz";
          const sample = "Como funcionam os patrocinadores de cada prêmio (como Positivo Informática e iFood) nesta tela?";
          $("#input-ask-aqualino-vitrine").value = sample;
          askAqualinoVitrine(sample);
        };
        rec.start();
        return;
      } catch (_) {}
    }

    const sample = "Como funcionam os patrocinadores de cada prêmio (como Positivo Informática e iFood) nesta tela?";
    $("#input-ask-aqualino-vitrine").value = sample;
    askAqualinoVitrine(sample);
  });

  function focusAqualinoVitrineInput() {
    $("#aqualino-vitrine-panel").scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => $("#input-ask-aqualino-vitrine").focus(), 250);
  }

  $("#btn-floating-aqualino-vitrine").addEventListener("click", focusAqualinoVitrineInput);

  // Restaurar padrão inicial
  $("#btn-reset-vitrine").addEventListener("click", () => {
    vitrineDb = getInitialVitrineDb();
    state.cycleId = "C_2026_4";
    state.category = "ALL";
    state.tier = "ALL";
    state.sponsor = "ALL";
    state.selectedPrizeId = "P_264_1";
    state.historyCycleFilter = "ALL";

    $("#filter-vitrine-cycle").value = "C_2026_4";
    $("#filter-vitrine-category").value = "ALL";
    $("#filter-vitrine-tier").value = "ALL";
    $("#filter-vitrine-sponsor").value = "ALL";
    $("#input-ask-aqualino-vitrine").value = "";
    $("#aqualino-vitrine-bubble").classList.remove("answering");
    $("#vitrine-feedback-banner").classList.add("hidden");
    $("#new-prize-drawer").classList.add("hidden");

    $$("#history-cycle-tabs .chip").forEach((b) => {
      b.classList.toggle("active", b.dataset.histCycle === "ALL");
    });

    refreshAll();
  });

  function refreshAll() {
    renderTopBarAndKpis();
    renderSponsorsStrip();
    renderPrizeCatalog();
    renderRankingPanel();
    renderHistoricalAwardsTable();
  }

  // Inicialização
  $("#live-clock-display").textContent = currentHHMMSS();
  refreshAll();
})();
