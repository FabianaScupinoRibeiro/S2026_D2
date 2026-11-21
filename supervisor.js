(() => {
  "use strict";

  // Horário fixo de referência da consulta operacional (11:45 -> 08h a 11h são passado consolidado; 12h a 17h são futuro simulável)
  const CONSULTATION_TIME_LABEL = "11:45";
  const PAST_HOURS_COUNT = 4; // 08h, 09h, 10h, 11h estão no passado e NÃO mudam com simulações

  // Perguntas e respostas da FAQ interativa com o mascote Aqualino
  const AQUALINO_FAQ_ITEMS = [
    {
      question: "1. Como funciona o Simulador de Cenários e o botão 'Aplicar Simulação'?",
      keywords: "simulador simulação aplicar cenário atendentes tme almoço",
      answer:
        "No card <strong>Dimensionamento & Simulação de Cenários</strong>, você pode testar diferentes metas de TME (4 a 20 min), alterar a quantidade de atendentes (2 a 8), escolher a política de almoço e incluir reforço sênior. Enquanto você ajusta os controles, o banner mostra a prévia do impacto. Ao clicar no botão <strong>'✓ Aplicar Simulação na Operação da Unidade'</strong>, o cenário é efetivado nos KPIs da agência, nos guichês abertos (incluindo as listboxes de intervenção) e nos horários futuros do gráfico!",
    },
    {
      question: "2. Por que os horários de 08h às 11h no Gráfico em Tempo Real não mudam na simulação?",
      keywords: "gráfico tempo real passado horas anteriores 08h 11h 11:45",
      answer:
        "O gráfico indica o <strong>Horário no Momento da Consulta (11:45)</strong>. Como os horários de <strong>08h, 09h, 10h e 11h</strong> já aconteceram (estão no passado), seus tempos médios de espera são fatos consolidados e imutáveis. Qualquer simulação ou abertura de novos guichês afeta exclusivamente os horários futuros (<strong>12h às 17h</strong>).",
    },
    {
      question: "3. Como alternar entre Unidades de Curitiba e Níveis de Visão?",
      keywords: "unidade nível visão filtro curitiba pinheirinho boa vista rebouças guichê fila",
      answer:
        "No topo da tela, use o campo <strong>Unidade</strong> para alternar entre <em>Central Rebouças (Curitiba)</em>, <em>Posto Pinheirinho (Curitiba)</em> e <em>Posto Boa Vista (Curitiba)</em>. Use o campo <strong>Nível de Visão</strong> para filtrar todos os KPIs, gráficos e tabelas pela agência inteira, por uma fila específica (Convencional, Preferencial Legal, Agendados) ou por um Guichê/Atendente individual.",
    },
    {
      question: "4. Como funcionam as Intervenções Ágeis e a abertura de novos guichês?",
      keywords: "intervenções ágeis novos guichês listbox transferir redistribuir",
      answer:
        "Quando novos guichês são abertos (pelo botão de recomendação do Aqualino, aplicando uma simulação ou registrando ação), eles passam a aparecer imediatamente nos campos listbox <strong>Guichê de Destino</strong> e <strong>Selecionar Guichê</strong> da seção <em>Intervenções Ágeis na Distribuição de Filas</em>, permitindo transferir senhas ou redistribuir categorias na hora.",
    },
    {
      question: "5. Como fazer o Drill-Down dos 5 indicadores de desempenho?",
      keywords: "drill-down indicadores kpi tme tma ociosidade nps avaliações demanda",
      answer:
        "Basta clicar sobre qualquer um dos <strong>5 cartões de KPI no topo</strong> (TME, TMA, Ociosidade & Efetivo, Qualidade NPS com/sem avaliação ou Previsão Hoje) — ou nos botões equivalentes do painel de Drill-Down — para abrir a decomposição analítica daquele indicador.",
    },
    {
      question: "6. Por que os dados pessoais dos cidadãos não aparecem nesta tela (LGPD)?",
      keywords: "lgpd privacidade segurança dados pessoais anonimizado código senha",
      answer:
        "Por determinação técnica de segurança e conformidade com a <strong>LGPD</strong>, o foco da supervisão é a performance operacional. Por isso, todos os atendimentos e drill-downs são identificados apenas pelo <strong>Código da Senha</strong> (ex.: <code>C-104</code>, <code>P-042</code>), <strong>Tipo de Fila</strong>, <strong>Serviço de Triagem</strong> e <strong>Tempos (TME e TMA)</strong>, sem expor nome, CPF ou matrícula.",
    },
  ];

  // Base de dados independente para cada uma das 3 Unidades de Curitiba
  function createUnitsDatabase() {
    return {
      "Central Rebouças": {
        unitName: "Central Rebouças (Curitiba)",
        baseOpenAttendants: 4,
        targetTmeMinutes: 10,
        activeAttendants: 4,
        lunchPolicy: "simultaneo",
        seniorReinforcement: false,
        gamification: {
          points: 680,
          dailyGoal: 1000,
          lastDelta: 0,
          earnedGargalo: false,
          motivationalMsg:
            "💡 <strong>Motivação do Aqualino (Gamificação):</strong> Atue nos pontos críticos indicados! Ao aplicar minha recomendação (<strong>+120 pts</strong>), efetivar uma simulação equilibrada (<strong>+80 pts</strong>), abrir/redistribuir um guichê (<strong>+60 pts</strong>) ou transferir uma senha de fila crítica (<strong>+45 pts</strong>), seus pontos sobem na hora rumo à <strong>Faixa Ouro</strong>!",
        },
        // Estado rascunho do simulador (aplicado ao clicar no botão Aplicar Simulação)
        simDraft: {
          targetTmeMinutes: 10,
          activeAttendants: 4,
          lunchPolicy: "simultaneo",
          seniorReinforcement: false,
        },
        evalWithCount: 34,
        evalWithoutCount: 10,
        npsScore: 78,
        // Horários passados fixos (08h, 09h, 10h, 11h) que não mudam com simulações
        pastHourlyTmeMin: [7, 10, 13, 15],
        forecastToday: {
          historicalWalkin: 78,
          scheduled: 48,
          issuedPendingToday: 16,
        },
        nextDaysForecast: [
          { label: "Qua (18/11)", hist: 72, ag: 52 },
          { label: "Qui (19/11)", hist: 68, ag: 54 },
          { label: "Sex (20/11)", hist: 84, ag: 40 },
          { label: "Seg (23/11)", hist: 96, ag: 38 },
        ],
        counters: [
          {
            id: "G-01",
            name: "Guichê 01 • Atendente #101",
            profile: "Pleno",
            isOpen: true,
            newlyOpened: false,
            queueScope: "QUEUE_PREF",
            status: "Em Atendimento",
            statusClass: "tag-green",
            rule: "Fila Preferencial Legal + Convencional",
            currentTicket: "P-042",
            tmaAvgSec: 450,
            idleSec: 110,
            servedCount: 11,
            npsAvg: 88,
            evalWith: 9,
            evalWithout: 2,
          },
          {
            id: "G-02",
            name: "Guichê 02 • Atendente #102",
            profile: "Pleno",
            isOpen: true,
            newlyOpened: false,
            queueScope: "QUEUE_CONV",
            status: "Em Atendimento",
            statusClass: "tag-green",
            rule: "Fila Convencional + Transferências",
            currentTicket: "C-104",
            tmaAvgSec: 495,
            idleSec: 95,
            servedCount: 10,
            npsAvg: 82,
            evalWith: 8,
            evalWithout: 2,
          },
          {
            id: "G-03",
            name: "Guichê 03 • Atendente #103",
            profile: "Pleno",
            isOpen: true,
            newlyOpened: false,
            queueScope: "QUEUE_CONV",
            status: "Sobrecarregado",
            statusClass: "tag-red",
            rule: "Fila Convencional (Gargalo)",
            currentTicket: "C-105",
            tmaAvgSec: 540,
            idleSec: 40,
            servedCount: 12,
            npsAvg: 71,
            evalWith: 9,
            evalWithout: 3,
          },
          {
            id: "G-04",
            name: "Guichê 04 • Atendente #104",
            profile: "Pleno",
            isOpen: true,
            newlyOpened: false,
            queueScope: "QUEUE_AG",
            status: "Ocioso há 08m 40s",
            statusClass: "tag-amber",
            rule: "Exclusivo Agendados (Ocioso)",
            currentTicket: "—",
            tmaAvgSec: 390,
            idleSec: 520,
            servedCount: 11,
            npsAvg: 91,
            evalWith: 8,
            evalWithout: 3,
          },
          {
            id: "G-05",
            name: "Guichê 05 • Apoio Sênior #201",
            profile: "Sênior",
            isOpen: false,
            newlyOpened: false,
            queueScope: "QUEUE_CONV",
            status: "Fechado (Reserva)",
            statusClass: "tag-blue",
            rule: "Aguardando ativação da supervisão",
            currentTicket: "—",
            tmaAvgSec: 340,
            idleSec: 0,
            servedCount: 0,
            npsAvg: 95,
            evalWith: 0,
            evalWithout: 0,
          },
          {
            id: "G-06",
            name: "Guichê 06 • Apoio Sênior #202",
            profile: "Sênior",
            isOpen: false,
            newlyOpened: false,
            queueScope: "QUEUE_PREF",
            status: "Fechado (Reserva)",
            statusClass: "tag-blue",
            rule: "Aguardando ativação da supervisão",
            currentTicket: "—",
            tmaAvgSec: 330,
            idleSec: 0,
            servedCount: 0,
            npsAvg: 96,
            evalWith: 0,
            evalWithout: 0,
          },
        ],
        tickets: [
          {
            code: "C-104",
            queueType: "Convencional",
            queueCode: "QUEUE_CONV",
            service: "Contestação de Fatura",
            guiche: "G-02",
            tmeSec: 970,
            tmaSec: 490,
            nps: null,
            evaluated: false,
            status: "Em Atendimento no Guichê 02",
          },
          {
            code: "P-042",
            queueType: "Preferencial Legal (Idoso 60+)",
            queueCode: "QUEUE_PREF",
            service: "Troca de Titularidade",
            guiche: "G-01",
            tmeSec: 410,
            tmaSec: 440,
            nps: 10,
            evaluated: true,
            status: "Em Atendimento no Guichê 01",
          },
          {
            code: "C-105",
            queueType: "Convencional",
            queueCode: "QUEUE_CONV",
            service: "Parcelamento de Débitos",
            guiche: "G-03",
            tmeSec: 940,
            tmaSec: 530,
            nps: null,
            evaluated: false,
            status: "Em Atendimento no Guichê 03",
          },
          {
            code: "C-106",
            queueType: "Convencional",
            queueCode: "QUEUE_CONV",
            service: "Religação de Água",
            guiche: "G-03",
            tmeSec: 890,
            tmaSec: 0,
            nps: null,
            evaluated: false,
            status: "Em Espera (Gargalo Convencional)",
          },
          {
            code: "C-107",
            queueType: "Convencional",
            queueCode: "QUEUE_CONV",
            service: "Contestação de Fatura",
            guiche: "G-02",
            tmeSec: 840,
            tmaSec: 0,
            nps: null,
            evaluated: false,
            status: "Em Espera (Gargalo Convencional)",
          },
          {
            code: "P-043",
            queueType: "Preferencial Legal (PcD / TEA)",
            queueCode: "QUEUE_PREF",
            service: "Cadastro Tarifa Social",
            guiche: "G-01",
            tmeSec: 380,
            tmaSec: 0,
            nps: null,
            evaluated: false,
            status: "Em Espera (Fila Preferencial)",
          },
          {
            code: "AG-205",
            queueType: "Agendado (Hora Marcada)",
            queueCode: "QUEUE_AG",
            service: "Ligação Nova de Água",
            guiche: "G-04",
            tmeSec: 190,
            tmaSec: 395,
            nps: 9,
            evaluated: true,
            status: "Concluído (Avaliado NPS 9)",
          },
          {
            code: "C-103",
            queueType: "Convencional",
            queueCode: "QUEUE_CONV",
            service: "Parcelamento de Débitos",
            guiche: "G-03",
            tmeSec: 910,
            tmaSec: 560,
            nps: 6,
            evaluated: true,
            status: "Concluído (Avaliado NPS 6 — Alerta Espera)",
          },
          {
            code: "C-102",
            queueType: "Convencional",
            queueCode: "QUEUE_CONV",
            service: "2ª Via / Revisão Cadastral",
            guiche: "G-02",
            tmeSec: 720,
            tmaSec: 460,
            nps: null,
            evaluated: false,
            status: "Concluído (Sem Avaliação Registrada)",
          },
        ],
        managerLogs: [
          {
            datetime: "17/11/2026 09:15",
            indicator: "Prevenção de Pico Matinal — Central Rebouças (Curitiba)",
            text: "Alocação de triagem assistida na recepção para emissão rápida de 2ª via, evitando 14 entradas na fila convencional.",
          },
        ],
      },

      "Rua da Cidadania Pinheirinho": {
        unitName: "Posto Pinheirinho (Curitiba)",
        baseOpenAttendants: 3,
        targetTmeMinutes: 10,
        activeAttendants: 3,
        lunchPolicy: "simultaneo",
        seniorReinforcement: false,
        gamification: {
          points: 720,
          dailyGoal: 1000,
          lastDelta: 0,
          earnedGargalo: false,
          motivationalMsg:
            "💡 <strong>Motivação do Aqualino (Gamificação):</strong> O Posto Pinheirinho tem gargalo na fila preferencial e alerta de almoço. Abra o reforço sênior ou escale o almoço para ganhar até <strong>+120 pts</strong> e conquistar suas medalhas do dia!",
        },
        simDraft: {
          targetTmeMinutes: 10,
          activeAttendants: 3,
          lunchPolicy: "simultaneo",
          seniorReinforcement: false,
        },
        evalWithCount: 22,
        evalWithoutCount: 6,
        npsScore: 81,
        pastHourlyTmeMin: [6, 9, 11, 12],
        forecastToday: {
          historicalWalkin: 52,
          scheduled: 34,
          issuedPendingToday: 11,
        },
        nextDaysForecast: [
          { label: "Qua (18/11)", hist: 48, ag: 36 },
          { label: "Qui (19/11)", hist: 45, ag: 38 },
          { label: "Sex (20/11)", hist: 56, ag: 29 },
          { label: "Seg (23/11)", hist: 64, ag: 30 },
        ],
        counters: [
          {
            id: "G-01",
            name: "Guichê 01 • Atendente #301 (Pinheirinho)",
            profile: "Pleno",
            isOpen: true,
            newlyOpened: false,
            queueScope: "QUEUE_PREF",
            status: "Sobrecarregado",
            statusClass: "tag-red",
            rule: "Fila Preferencial Legal + Tarifa Social",
            currentTicket: "P-310",
            tmaAvgSec: 510,
            idleSec: 35,
            servedCount: 9,
            npsAvg: 79,
            evalWith: 7,
            evalWithout: 2,
          },
          {
            id: "G-02",
            name: "Guichê 02 • Atendente #302 (Pinheirinho)",
            profile: "Pleno",
            isOpen: true,
            newlyOpened: false,
            queueScope: "QUEUE_CONV",
            status: "Em Atendimento",
            statusClass: "tag-green",
            rule: "Fila Convencional Geral",
            currentTicket: "C-304",
            tmaAvgSec: 470,
            idleSec: 80,
            servedCount: 10,
            npsAvg: 83,
            evalWith: 8,
            evalWithout: 2,
          },
          {
            id: "G-03",
            name: "Guichê 03 • Atendente #303 (Pinheirinho)",
            profile: "Pleno",
            isOpen: true,
            newlyOpened: false,
            queueScope: "QUEUE_AG",
            status: "Ocioso há 06m 15s",
            statusClass: "tag-amber",
            rule: "Agendados + Religação",
            currentTicket: "—",
            tmaAvgSec: 410,
            idleSec: 375,
            servedCount: 9,
            npsAvg: 88,
            evalWith: 7,
            evalWithout: 2,
          },
          {
            id: "G-04",
            name: "Guichê 04 • Apoio Sênior #304 (Pinheirinho)",
            profile: "Sênior",
            isOpen: false,
            newlyOpened: false,
            queueScope: "QUEUE_PREF",
            status: "Fechado (Reserva)",
            statusClass: "tag-blue",
            rule: "Aguardando abertura pela supervisão",
            currentTicket: "—",
            tmaAvgSec: 350,
            idleSec: 0,
            servedCount: 0,
            npsAvg: 94,
            evalWith: 0,
            evalWithout: 0,
          },
          {
            id: "G-05",
            name: "Guichê 05 • Apoio Sênior #305 (Pinheirinho)",
            profile: "Sênior",
            isOpen: false,
            newlyOpened: false,
            queueScope: "QUEUE_CONV",
            status: "Fechado (Reserva)",
            statusClass: "tag-blue",
            rule: "Aguardando abertura pela supervisão",
            currentTicket: "—",
            tmaAvgSec: 345,
            idleSec: 0,
            servedCount: 0,
            npsAvg: 95,
            evalWith: 0,
            evalWithout: 0,
          },
        ],
        tickets: [
          {
            code: "P-310",
            queueType: "Preferencial Legal (Idoso 60+)",
            queueCode: "QUEUE_PREF",
            service: "Cadastro Tarifa Social",
            guiche: "G-01",
            tmeSec: 740,
            tmaSec: 510,
            nps: 8,
            evaluated: true,
            status: "Em Atendimento no Guichê 01",
          },
          {
            code: "P-311",
            queueType: "Preferencial Legal (Gestante)",
            queueCode: "QUEUE_PREF",
            service: "Parcelamento de Débitos",
            guiche: "G-01",
            tmeSec: 690,
            tmaSec: 0,
            nps: null,
            evaluated: false,
            status: "Em Espera (Gargalo Preferencial)",
          },
          {
            code: "C-304",
            queueType: "Convencional",
            queueCode: "QUEUE_CONV",
            service: "Troca de Titularidade",
            guiche: "G-02",
            tmeSec: 640,
            tmaSec: 465,
            nps: 9,
            evaluated: true,
            status: "Em Atendimento no Guichê 02",
          },
          {
            code: "C-305",
            queueType: "Convencional",
            queueCode: "QUEUE_CONV",
            service: "Religação de Água",
            guiche: "G-02",
            tmeSec: 610,
            tmaSec: 0,
            nps: null,
            evaluated: false,
            status: "Em Espera (Fila Convencional)",
          },
          {
            code: "AG-320",
            queueType: "Agendado (Hora Marcada)",
            queueCode: "QUEUE_AG",
            service: "Revisão de Consumo",
            guiche: "G-03",
            tmeSec: 170,
            tmaSec: 400,
            nps: 10,
            evaluated: true,
            status: "Concluído (Avaliado NPS 10)",
          },
        ],
        managerLogs: [
          {
            datetime: "17/11/2026 09:40",
            indicator: "Monitoramento Regional — Posto Pinheirinho (Curitiba)",
            text: "Alta procura por renovação de Tarifa Social identificada no início da manhã na unidade Pinheirinho.",
          },
        ],
      },

      "Rua da Cidadania Boa Vista": {
        unitName: "Posto Boa Vista (Curitiba)",
        baseOpenAttendants: 3,
        targetTmeMinutes: 10,
        activeAttendants: 3,
        lunchPolicy: "escalonado",
        seniorReinforcement: false,
        gamification: {
          points: 890,
          dailyGoal: 1000,
          lastDelta: 0,
          earnedGargalo: true,
          motivationalMsg:
            "💡 <strong>Motivação do Aqualino (Gamificação):</strong> Excelente gestão no Posto Boa Vista! Aplique o ajuste preventivo para o pico das 12h para somar mais <strong>+120 pts</strong> e ultrapassar a meta de <strong>1.000 pts (Nível 5 • Líder Master ★)</strong>!",
        },
        simDraft: {
          targetTmeMinutes: 10,
          activeAttendants: 3,
          lunchPolicy: "escalonado",
          seniorReinforcement: false,
        },
        evalWithCount: 29,
        evalWithoutCount: 4,
        npsScore: 92,
        pastHourlyTmeMin: [4, 5, 6, 7],
        forecastToday: {
          historicalWalkin: 31,
          scheduled: 29,
          issuedPendingToday: 4,
        },
        nextDaysForecast: [
          { label: "Qua (18/11)", hist: 30, ag: 28 },
          { label: "Qui (19/11)", hist: 29, ag: 31 },
          { label: "Sex (20/11)", hist: 35, ag: 26 },
          { label: "Seg (23/11)", hist: 42, ag: 28 },
        ],
        // 3 guichês abertos (G-01 a G-03) + 2 guichês em reserva (G-04 e G-05) para quando solicitar abrir +2 novos guichês abrir exatamente 2!
        counters: [
          {
            id: "G-01",
            name: "Guichê 01 • Atendente #501 (Boa Vista)",
            profile: "Sênior",
            isOpen: true,
            newlyOpened: false,
            queueScope: "QUEUE_PREF",
            status: "Em Atendimento",
            statusClass: "tag-green",
            rule: "Preferencial Legal + Agendados",
            currentTicket: "P-512",
            tmaAvgSec: 370,
            idleSec: 140,
            servedCount: 12,
            npsAvg: 94,
            evalWith: 11,
            evalWithout: 1,
          },
          {
            id: "G-02",
            name: "Guichê 02 • Atendente #502 (Boa Vista)",
            profile: "Pleno",
            isOpen: true,
            newlyOpened: false,
            queueScope: "QUEUE_CONV",
            status: "Em Atendimento",
            statusClass: "tag-green",
            rule: "Fila Convencional Geral",
            currentTicket: "C-501",
            tmaAvgSec: 400,
            idleSec: 165,
            servedCount: 11,
            npsAvg: 91,
            evalWith: 9,
            evalWithout: 2,
          },
          {
            id: "G-03",
            name: "Guichê 03 • Atendente #503 (Boa Vista)",
            profile: "Pleno",
            isOpen: true,
            newlyOpened: false,
            queueScope: "QUEUE_AG",
            status: "Disponível",
            statusClass: "tag-green",
            rule: "Agendados + Apoio Convencional",
            currentTicket: "AG-518",
            tmaAvgSec: 385,
            idleSec: 190,
            servedCount: 10,
            npsAvg: 92,
            evalWith: 9,
            evalWithout: 1,
          },
          {
            id: "G-04",
            name: "Guichê 04 • Apoio Sênior #504 (Boa Vista)",
            profile: "Sênior",
            isOpen: false,
            newlyOpened: false,
            queueScope: "QUEUE_CONV",
            status: "Fechado (Reserva)",
            statusClass: "tag-blue",
            rule: "Reserva Técnica",
            currentTicket: "—",
            tmaAvgSec: 340,
            idleSec: 0,
            servedCount: 0,
            npsAvg: 96,
            evalWith: 0,
            evalWithout: 0,
          },
          {
            id: "G-05",
            name: "Guichê 05 • Apoio Sênior #505 (Boa Vista)",
            profile: "Sênior",
            isOpen: false,
            newlyOpened: false,
            queueScope: "QUEUE_PREF",
            status: "Fechado (Reserva)",
            statusClass: "tag-blue",
            rule: "Reserva Técnica",
            currentTicket: "—",
            tmaAvgSec: 335,
            idleSec: 0,
            servedCount: 0,
            npsAvg: 96,
            evalWith: 0,
            evalWithout: 0,
          },
        ],
        tickets: [
          {
            code: "P-512",
            queueType: "Preferencial Legal (Idoso 60+)",
            queueCode: "QUEUE_PREF",
            service: "2ª Via e Débito Automático",
            guiche: "G-01",
            tmeSec: 260,
            tmaSec: 360,
            nps: 10,
            evaluated: true,
            status: "Em Atendimento no Guichê 01",
          },
          {
            code: "C-501",
            queueType: "Convencional",
            queueCode: "QUEUE_CONV",
            service: "Troca de Titularidade",
            guiche: "G-02",
            tmeSec: 390,
            tmaSec: 410,
            nps: 9,
            evaluated: true,
            status: "Em Atendimento no Guichê 02",
          },
          {
            code: "AG-518",
            queueType: "Agendado (Hora Marcada)",
            queueCode: "QUEUE_AG",
            service: "Ligação Nova de Esgoto",
            guiche: "G-03",
            tmeSec: 150,
            tmaSec: 380,
            nps: 10,
            evaluated: true,
            status: "Concluído (Avaliado NPS 10)",
          },
          {
            code: "C-502",
            queueType: "Convencional",
            queueCode: "QUEUE_CONV",
            service: "Contestação de Fatura",
            guiche: "G-02",
            tmeSec: 410,
            tmaSec: 0,
            nps: null,
            evaluated: false,
            status: "Em Espera (Dentro da Meta)",
          },
        ],
        managerLogs: [
          {
            datetime: "17/11/2026 08:30",
            indicator: "Escala de Almoço Preventiva — Posto Boa Vista (Curitiba)",
            text: "Turno de almoço escalonado previamente em 2 grupos; unidade operando dentro da meta de TME.",
          },
        ],
      },
    };
  }

  const state = {
    currentUnitKey: "Central Rebouças",
    viewLevel: "ALL",
    selectedDrillKpi: "tme",
    selectedGuicheId: "G-01",
    selectedFaqIndex: 0,
    units: createUnitsDatabase(),
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function currentUnit() {
    return state.units[state.currentUnitKey];
  }

  function formatSec(sec) {
    const s = Math.max(0, Math.round(sec));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}m ${String(r).padStart(2, "0")}s`;
  }

  // Abre ou fecha guichês exatamente até a quantidade desejada (sem abrir guichês extras além do solicitado!)
  function syncCountersWithAttendantCount(u, desiredCount, markNewlyOpened = false) {
    while (u.counters.length < desiredCount) {
      const nextNum = u.counters.length + 1;
      const gId = `G-${String(nextNum).padStart(2, "0")}`;
      u.counters.push({
        id: gId,
        name: `Guichê ${String(nextNum).padStart(2, "0")} • Apoio Extra #${200 + nextNum}`,
        profile: u.seniorReinforcement ? "Sênior" : "Pleno",
        isOpen: false,
        newlyOpened: false,
        queueScope: "QUEUE_CONV",
        status: "Fechado (Reserva)",
        statusClass: "tag-blue",
        rule: "Aguardando ativação da supervisão",
        currentTicket: "—",
        tmaAvgSec: u.seniorReinforcement ? 335 : 420,
        idleSec: 0,
        servedCount: 0,
        npsAvg: 94,
        evalWith: 0,
        evalWithout: 0,
      });
    }

    u.counters.forEach((c, idx) => {
      if (idx < desiredCount) {
        if (!c.isOpen) {
          c.isOpen = true;
          c.newlyOpened = markNewlyOpened || idx >= u.baseOpenAttendants;
          c.status =
            u.seniorReinforcement && c.profile === "Sênior"
              ? "Aberto • Reforço Sênior"
              : "Aberto • Ativo";
          c.statusClass = "tag-green";
          if (c.rule.includes("Aguardando") || c.rule.includes("Reserva")) {
            c.rule = "Reforço Fila Convencional + Preferencial";
          }
          c.idleSec = 25;
        }
      } else {
        c.isOpen = false;
        c.newlyOpened = false;
        c.status = "Fechado (Reserva)";
        c.statusClass = "tag-blue";
        c.currentTicket = "—";
        c.idleSec = 0;
      }
    });
  }

  function getViewScopeLabel(u) {
    if (state.viewLevel === "ALL") return `Toda a Agência • ${u.unitName}`;
    if (state.viewLevel === "QUEUE_CONV") return `Fila Convencional • ${u.unitName}`;
    if (state.viewLevel === "QUEUE_PREF") return `Fila Preferencial Legal • ${u.unitName}`;
    if (state.viewLevel === "QUEUE_AG") return `Fila Agendados • ${u.unitName}`;
    const g = u.counters.find((c) => c.id === state.viewLevel);
    return g ? `${g.name}` : `Toda a Agência • ${u.unitName}`;
  }

  // Calcula métricas operacionais (pode calcular tanto para o estado aplicado quanto para o rascunho da simulação)
  function computeOperationalMetrics(useDraftParams = false) {
    const u = currentUnit();
    const view = state.viewLevel;

    const targetTmeMin = useDraftParams ? u.simDraft.targetTmeMinutes : u.targetTmeMinutes;
    const activeAtt = useDraftParams ? u.simDraft.activeAttendants : u.activeAttendants;
    const lunchPol = useDraftParams ? u.simDraft.lunchPolicy : u.lunchPolicy;
    const seniorReinf = useDraftParams ? u.simDraft.seniorReinforcement : u.seniorReinforcement;

    const scopedTickets = u.tickets.filter((t) => {
      if (view === "ALL") return true;
      if (view.startsWith("QUEUE_")) return t.queueCode === view;
      if (view.startsWith("G-")) return t.guiche === view;
      return true;
    });

    const openCounters = u.counters.filter((c) => c.isOpen);
    const scopedCounters = u.counters.filter((c) => {
      if (view === "ALL") return c.isOpen;
      if (view.startsWith("QUEUE_")) {
        return c.isOpen && (c.queueScope === view || c.rule.includes("Todas") || c.newlyOpened);
      }
      if (view.startsWith("G-")) return c.id === view;
      return c.isOpen;
    });

    let demandShare = 1.0;
    if (view === "QUEUE_CONV") demandShare = 0.54;
    else if (view === "QUEUE_PREF") demandShare = 0.24;
    else if (view === "QUEUE_AG") demandShare = 0.22;
    else if (view.startsWith("G-")) demandShare = 1 / Math.max(1, openCounters.length);

    const histWalkin = Math.max(1, Math.round(u.forecastToday.historicalWalkin * demandShare));
    const scheduled = Math.max(1, Math.round(u.forecastToday.scheduled * demandShare));
    const pendingNow =
      view === "ALL"
        ? u.forecastToday.issuedPendingToday
        : Math.max(
            scopedTickets.filter((t) => t.status.includes("Espera")).length,
            Math.round(u.forecastToday.issuedPendingToday * demandShare)
          );

    const totalTodayDemand = histWalkin + scheduled + pendingNow;

    let baseTmaSeconds = seniorReinf ? 380 : 465;
    if (view.startsWith("G-")) {
      const gObj = u.counters.find((c) => c.id === view);
      if (gObj) baseTmaSeconds = gObj.tmaAvgSec;
    } else if (scopedTickets.length > 0) {
      const withTma = scopedTickets.filter((t) => t.tmaSec > 0);
      if (withTma.length > 0) {
        baseTmaSeconds = Math.round(
          withTma.reduce((acc, t) => acc + t.tmaSec, 0) / withTma.length
        );
        if (seniorReinf) baseTmaSeconds = Math.round(baseTmaSeconds * 0.82);
      }
    }

    const tmaMinutes = baseTmaSeconds / 60;
    const activeStaffForScope =
      view === "ALL" ? activeAtt : Math.max(1, scopedCounters.length);

    const recommendedStaff =
      view === "ALL"
        ? Math.max(
            3,
            Math.min(
              8,
              Math.ceil(
                (totalTodayDemand * tmaMinutes) /
                  (7.5 * 60 * (0.68 + targetTmeMin * 0.015))
              )
            )
          )
        : Math.max(
            1,
            Math.ceil(
              (totalTodayDemand * tmaMinutes) /
                (7.5 * 60 * (0.68 + targetTmeMin * 0.015))
            )
          );

    let rawTmeBase = targetTmeMin * 60;
    if (scopedTickets.length > 0) {
      rawTmeBase = Math.round(
        scopedTickets.reduce((acc, t) => acc + t.tmeSec, 0) / scopedTickets.length
      );
    }

    const staffRatio = recommendedStaff / Math.max(1, activeStaffForScope);
    let projectedTmeSec = Math.round(rawTmeBase * Math.pow(staffRatio, 0.85));
    if (seniorReinf) projectedTmeSec = Math.round(projectedTmeSec * 0.72);
    if (lunchPol === "escalonado") projectedTmeSec = Math.round(projectedTmeSec * 0.85);

    const lunchPeakMultiplier = lunchPol === "simultaneo" ? 4.0 : 1.35;
    const lunchPeakMinutes = Math.round((projectedTmeSec / 60) * lunchPeakMultiplier);

    const avgIdleSec = scopedCounters.length
      ? Math.round(scopedCounters.reduce((acc, c) => acc + c.idleSec, 0) / scopedCounters.length)
      : 0;

    let evalWith = u.evalWithCount;
    let evalWithout = u.evalWithoutCount;
    let currentNps = projectedTmeSec <= targetTmeMin * 60 ? Math.max(88, u.npsScore) : u.npsScore;

    if (view.startsWith("G-")) {
      const gObj = u.counters.find((c) => c.id === view);
      if (gObj) {
        evalWith = gObj.evalWith;
        evalWithout = gObj.evalWithout;
        currentNps = gObj.npsAvg;
      }
    } else if (view !== "ALL") {
      evalWith = Math.max(2, Math.round(u.evalWithCount * demandShare));
      evalWithout = Math.max(1, Math.round(u.evalWithoutCount * demandShare));
      if (view === "QUEUE_CONV") currentNps = projectedTmeSec <= targetTmeMin * 60 ? 86 : 72;
      if (view === "QUEUE_PREF") currentNps = 91;
      if (view === "QUEUE_AG") currentNps = 94;
    }

    return {
      scopeLabel: getViewScopeLabel(u),
      demandShare,
      histWalkin,
      scheduled,
      pendingNow,
      totalTodayDemand,
      baseTmaSeconds,
      activeStaffForScope,
      recommendedStaff,
      projectedTmeSec,
      lunchPeakMinutes,
      avgIdleSec,
      evalWith,
      evalWithout,
      currentNps,
      scopedTickets,
      scopedCounters,
    };
  }

  // =========================================================================
  // RENDERIZAÇÃO DO TOPO, KPIS E ALERTAS DO AQUALINO
  // =========================================================================
  function renderTopDashboard() {
    const u = currentUnit();
    const m = computeOperationalMetrics(false); // Usa estado aplicado na unidade
    const simM = computeOperationalMetrics(true); // Prévia do cenário simulado nos controles
    const targetSec = u.targetTmeMinutes * 60;

    // KPI 1: TME
    $("#kpi-tme-val").textContent = formatSec(m.projectedTmeSec);
    $("#kpi-tme-target-lbl").textContent = formatSec(targetSec);
    const tmeStatus = $("#kpi-tme-status");
    const tmeValEl = $("#kpi-tme-val");

    if (m.projectedTmeSec > targetSec) {
      tmeStatus.className = "tag tag-red";
      tmeStatus.textContent = "Acima do Target";
      tmeValEl.className = "kpi-big text-red";
    } else {
      tmeStatus.className = "tag tag-green";
      tmeStatus.textContent = "Dentro da Meta ✓";
      tmeValEl.className = "kpi-big text-green";
    }

    // KPI 2: TMA
    $("#kpi-tma-val").textContent = formatSec(m.baseTmaSeconds);
    const tmaStatus = $("#kpi-tma-status");
    if (u.seniorReinforcement) {
      tmaStatus.className = "tag tag-green";
      tmaStatus.textContent = "Otimizado (Sênior -18%)";
    } else {
      tmaStatus.className = "tag tag-blue";
      tmaStatus.textContent = `Escopo: ${state.viewLevel === "ALL" ? "Agência" : state.viewLevel}`;
    }

    // KPI 3: Ociosidade e Efetivo
    $("#kpi-idle-val").textContent = formatSec(m.avgIdleSec);
    $("#kpi-active-staff").textContent = m.activeStaffForScope;
    $("#kpi-rec-staff").textContent = m.recommendedStaff;
    const staffBadge = $("#kpi-staff-status");
    const diffStaff = m.activeStaffForScope - m.recommendedStaff;
    if (diffStaff < 0) {
      staffBadge.className = "tag tag-red";
      staffBadge.textContent = `Falta Efetivo (${diffStaff})`;
    } else {
      staffBadge.className = "tag tag-green";
      staffBadge.textContent = "Efetivo Adequado ✓";
    }

    // KPI 4: NPS e Avaliações
    $("#kpi-nps-val").textContent = m.currentNps;
    $("#kpi-eval-with").textContent = m.evalWith;
    $("#kpi-eval-without").textContent = m.evalWithout;
    const npsBadge = $("#kpi-nps-status");
    const npsValEl = $("#kpi-nps-val");
    if (m.currentNps < 85) {
      npsBadge.className = "tag tag-amber";
      npsBadge.textContent = "Abaixo da Meta (85)";
      npsValEl.className = "kpi-big text-amber";
    } else {
      npsBadge.className = "tag tag-green";
      npsBadge.textContent = "Meta Batida ✓";
      npsValEl.className = "kpi-big text-green";
    }

    // KPI 5: Previsão Hoje e Fila Atual
    $("#kpi-forecast-today").textContent = m.totalTodayDemand;
    $("#kpi-waiting-now").textContent = m.pendingNow;
    $("#kpi-waiting-now").className = m.pendingNow > 6 ? "text-red" : "text-green";
    $("#kpi-card-demanda .kpi-sub").innerHTML =
      `Hist. (${m.histWalkin}) + Agend. (${m.scheduled}) + Pendentes (${m.pendingNow}) • <strong>Drill-down 🔍</strong>`;

    // Prévia no card do Simulador (usa simM)
    const simTargetSec = u.simDraft.targetTmeMinutes * 60;
    const simDiffStaff = u.simDraft.activeAttendants - simM.recommendedStaff;
    $("#sim-target-tme-display").textContent = `${u.simDraft.targetTmeMinutes} min`;
    $("#sim-attendants-display").textContent = `${u.simDraft.activeAttendants} atendentes`;
    $("#sim-recommended-staff").textContent = `${simM.recommendedStaff} atendente(s)`;
    $("#sim-projected-tme").textContent = `${formatSec(simM.projectedTmeSec)} (Pico 12h: ${simM.lunchPeakMinutes} min)`;
    $("#sim-projected-tme").className =
      simM.projectedTmeSec > simTargetSec ? "text-red" : "text-green";

    const simTag = $("#sim-status-tag");
    if (simM.projectedTmeSec > simTargetSec || u.simDraft.lunchPolicy === "simultaneo") {
      simTag.className = "tag tag-red";
      simTag.textContent =
        simDiffStaff < 0
          ? `Defasagem de ${Math.abs(simDiffStaff)} Atendente(s)`
          : "Alerta Pico de Almoço (+300%)";
    } else {
      simTag.className = "tag tag-green";
      simTag.textContent = "Cenário Simulado Equilibrado ✓";
    }

    renderCriticalAlertsAndAqualino(u, m, targetSec);
  }

  function renderCriticalAlertsAndAqualino(u, m, targetSec) {
    const alerts = [];

    if (m.projectedTmeSec > targetSec) {
      alerts.push({
        level: "critical",
        title: `🚨 Tempo Excessivo (${m.scopeLabel})`,
        desc: `TME em ${formatSec(m.projectedTmeSec)} acima da meta parametrizada de ${formatSec(targetSec)}.`,
      });
    } else {
      alerts.push({
        level: "normal",
        title: `✓ TME Dentro da Meta (${m.scopeLabel})`,
        desc: `TME em ${formatSec(m.projectedTmeSec)} (Meta ≤ ${formatSec(targetSec)}).`,
      });
    }

    if (m.activeStaffForScope < m.recommendedStaff || u.lunchPolicy === "simultaneo") {
      const msg =
        u.lunchPolicy === "simultaneo"
          ? `Almoço simultâneo sem escalonamento elevará o TME em +300% (${m.lunchPeakMinutes} min) entre 12h e 14h!`
          : `Efetivo no escopo (${m.activeStaffForScope}/${m.recommendedStaff}) abaixo do recomendado para ${m.totalTodayDemand} senhas.`;
      alerts.push({
        level: "critical",
        title: "🚨 Alerta de Efetivo / Escala de Almoço",
        desc: msg,
      });
    } else {
      alerts.push({
        level: "normal",
        title: "✓ Efetivo e Escala de Almoço Equilibrados",
        desc: `${m.activeStaffForScope} atendente(s) no escopo com almoço escalonado em 2 turnos.`,
      });
    }

    if (m.currentNps < 85) {
      alerts.push({
        level: "warning",
        title: "⚠️ Alerta de Satisfação (NPS < 85)",
        desc: `NPS no escopo selecionado está em ${m.currentNps} (${m.evalWith} c/ aval. | ${m.evalWithout} s/ aval.).`,
      });
    } else {
      alerts.push({
        level: "normal",
        title: "✓ Satisfação (NPS) Dentro do Objetivo",
        desc: `NPS em ${m.currentNps} (Meta ≥ 85) com ${m.evalWith} avaliações registradas.`,
      });
    }

    const critCount = alerts.filter((a) => a.level !== "normal").length;
    const countBadge = $("#active-alerts-count-badge");
    const bubble = $("#aqualino-recommendation-text");

    if (critCount > 0) {
      countBadge.className = "tag tag-red";
      countBadge.textContent = `${critCount} Alerta(s) Crítico(s) • ${m.scopeLabel}`;
      bubble.classList.remove("healthy");
      bubble.innerHTML = `🚨 <strong>Diagnóstico do Aqualino [${m.scopeLabel}]:</strong> Identifiquei <strong>${critCount} desvio(s) operacional(is)</strong>! O TME neste recorte está em <strong>${formatSec(m.projectedTmeSec)}</strong> (Meta ≤ ${formatSec(targetSec)}) com <strong>${m.pendingNow} senha(s) pendente(s)</strong>. <strong>Recomendação:</strong> abra +2 guichês com funcionários sêniores e escale o horário de almoço para evitar o pico de +300%!`;
    } else {
      countBadge.className = "tag tag-green";
      countBadge.textContent = `0 Alertas Críticos • ${m.scopeLabel}`;
      bubble.classList.add("healthy");
      bubble.innerHTML = `✅ <strong>Diagnóstico do Aqualino [${m.scopeLabel}]:</strong> Todos os parâmetros estão dentro do target! TME em <strong>${formatSec(m.projectedTmeSec)}</strong>, TMA em <strong>${formatSec(m.baseTmaSeconds)}</strong> e NPS em <strong>${m.currentNps}</strong>.`;
    }

    const strip = $("#critical-alerts-strip");
    strip.innerHTML = "";
    alerts.forEach((a) => {
      const div = document.createElement("div");
      div.className = `alert-pill-card ${a.level}`;
      div.innerHTML = `<strong>${a.title}</strong><span>${a.desc}</span>`;
      strip.appendChild(div);
    });

    renderSupervisorGamification(u, m, targetSec);
  }

  function renderSupervisorGamification(u, m, targetSec) {
    const g = u.gamification;
    if (!g) return;

    const pts = g.points;
    const goal = g.dailyGoal;
    const pct = Math.min(100, Math.round((pts / goal) * 100));

    $("#sup-score-points").textContent = `${pts} pts`;
    $("#sup-mascot-level").textContent =
      pts >= 900 ? "Nível 5 • Líder Master ★" : "Nível 4 • Líder Operacional";
    $("#sup-xp-progress-label").textContent = `${pts} / ${goal} pts`;
    $("#sup-xp-fill").style.width = `${pct}%`;

    const isTmeOk = m.projectedTmeSec <= targetSec;
    const isLunchOk = u.lunchPolicy === "escalonado";
    const isGargaloOk = g.earnedGargalo || u.activeAttendants > u.baseOpenAttendants;

    $("#badge-sup-gargalo").classList.toggle("earned", isGargaloOk);
    $("#badge-sup-almoco").classList.toggle("earned", isLunchOk);
    $("#badge-sup-target").classList.toggle("earned", isTmeOk);

    $("#aqualino-motivational-text").innerHTML = g.motivationalMsg;
  }

  function awardSupervisorGamification(u, deltaPts, actionLabel) {
    if (!u.gamification) return;
    u.gamification.points += deltaPts;
    u.gamification.lastDelta = deltaPts;
    u.gamification.earnedGargalo = true;
    u.gamification.motivationalMsg = `🎉 <strong>Parabéns, Supervisor! (+${deltaPts} pts conquistados na Gamificação!)</strong> Sua ação (<em>"${actionLabel}"</em>) mitigou um ponto crítico de <strong>${u.unitName}</strong>! Agora você acumula <strong>${u.gamification.points} pts</strong> rumo ao topo da Vitrine de Prêmios!`;

    const deltaBadge = $("#sup-score-delta-badge");
    const scoreCard = $("#sup-score-card");
    const img = $(".mascot-img");

    if (deltaBadge) {
      deltaBadge.textContent = `+${deltaPts} pts!`;
      deltaBadge.classList.remove("hidden");
    }
    if (scoreCard) {
      scoreCard.classList.add("score-pulse");
      setTimeout(() => scoreCard.classList.remove("score-pulse"), 900);
    }
    if (img) {
      img.classList.add("celebrate");
      setTimeout(() => img.classList.remove("celebrate"), 700);
    }
  }

  // =========================================================================
  // PONTO 3: DRILL-DOWN INTERATIVO SEM A SESSÃO "Senhas Analisadas no Escopo (LGPD)"
  // =========================================================================
  function selectDrillKpi(kpiKey) {
    state.selectedDrillKpi = kpiKey;
    $$(".clickable-kpi").forEach((el) => {
      el.classList.toggle("active-drill", el.dataset.drill === kpiKey);
    });
    $$("[data-drill-btn]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.drillBtn === kpiKey);
    });
    renderDrillDownPanel();
  }

  $$(".clickable-kpi").forEach((card) => {
    card.addEventListener("click", () => selectDrillKpi(card.dataset.drill));
  });

  $$("[data-drill-btn]").forEach((btn) => {
    btn.addEventListener("click", () => selectDrillKpi(btn.dataset.drillBtn));
  });

  function renderDrillDownPanel() {
    const u = currentUnit();
    const m = computeOperationalMetrics(false);
    const kpi = state.selectedDrillKpi;
    const titleEl = $("#drill-title");
    const area = $("#drill-content-area");

    $("#drill-badge").textContent = `Drill-Down Ativo • ${m.scopeLabel}`;

    if (kpi === "tme") {
      titleEl.textContent = `Análise Detalhada de TME (Espera) — ${m.scopeLabel}`;
      const convTme = u.seniorReinforcement ? "06m 50s" : "14m 40s";
      const prefTme = u.seniorReinforcement ? "04m 15s" : "06m 10s";
      area.innerHTML = `
        <div class="drill-tile">
          <div class="drill-tile-head">
            <span>TME Apurado no Recorte Selecionado</span>
            <span class="tag ${m.projectedTmeSec > u.targetTmeMinutes * 60 ? "tag-red" : "tag-green"}">${formatSec(m.projectedTmeSec)}</span>
          </div>
          <div class="drill-bar-track"><div class="drill-bar-fill ${m.projectedTmeSec > u.targetTmeMinutes * 60 ? "crit" : "ok"}" style="width: ${Math.min(100, Math.round((m.projectedTmeSec / 1200) * 100))}%"></div></div>
          <p class="drill-meta">Escopo: <strong>${m.scopeLabel}</strong> • Meta parametrizada: ≤ ${u.targetTmeMinutes}m 00s.</p>
        </div>
        <div class="drill-tile">
          <div class="drill-tile-head">
            <span>Impacto da Janela de Almoço (12h–14h)</span>
            <span class="tag ${u.lunchPolicy === "simultaneo" ? "tag-red" : "tag-green"}">Pico: ${m.lunchPeakMinutes} min</span>
          </div>
          <div class="drill-bar-track"><div class="drill-bar-fill ${u.lunchPolicy === "simultaneo" ? "crit" : "ok"}" style="width: ${u.lunchPolicy === "simultaneo" ? "95%" : "38%"}"></div></div>
          <p class="drill-meta">${u.lunchPolicy === "simultaneo" ? "Almoço simultâneo causa salto de +300% na espera." : "Almoço escalonado em 2 turnos mantém a fila controlada."}</p>
        </div>
        <div class="drill-tile">
          <div class="drill-tile-head">
            <span>Comparativo Convencional vs. Preferencial</span>
            <span class="tag tag-teal">${convTme} / ${prefTme}</span>
          </div>
          <div class="drill-bar-track"><div class="drill-bar-fill ok" style="width: 58%"></div></div>
          <p class="drill-meta">A fila Preferencial Legal e os Agendados mantêm prioridade automática de chamada nos guichês.</p>
        </div>
      `;
    } else if (kpi === "tma") {
      titleEl.textContent = `Análise Detalhada de TMA (Duração do Atendimento) — ${m.scopeLabel}`;
      area.innerHTML = `
        <div class="drill-tile">
          <div class="drill-tile-head">
            <span>TMA Médio no Escopo Selecionado</span>
            <span class="tag tag-blue">${formatSec(m.baseTmaSeconds)}</span>
          </div>
          <div class="drill-bar-track"><div class="drill-bar-fill" style="width: 68%"></div></div>
          <p class="drill-meta">Cronometragem do check-in no guichê até o checkout para ${m.scopeLabel}.</p>
        </div>
        <div class="drill-tile">
          <div class="drill-tile-head">
            <span>Efeito da Equipe Sênior no TMA</span>
            <span class="tag ${u.seniorReinforcement ? "tag-green" : "tag-amber"}">${u.seniorReinforcement ? "Ativo (-18% no TMA)" : "Inativo (Potencial -18%)"}</span>
          </div>
          <div class="drill-bar-track"><div class="drill-bar-fill ok" style="width: ${u.seniorReinforcement ? "85%" : "30%"}"></div></div>
          <p class="drill-meta">Funcionários sêniores concluem negociações e contestações complexas em menor tempo.</p>
        </div>
        <div class="drill-tile">
          <div class="drill-tile-head">
            <span>Ganho da Pré-Conferência na Recepção</span>
            <span class="tag tag-teal">-02m 10s / senha</span>
          </div>
          <div class="drill-bar-track"><div class="drill-bar-fill ok" style="width: 75%"></div></div>
          <p class="drill-meta">Documentação já validada pela recepção evita retrabalho nos guichês de ${u.unitName}.</p>
        </div>
      `;
    } else if (kpi === "ociosidade") {
      titleEl.textContent = `Análise de Ociosidade e Capacidade Instalada — ${m.scopeLabel}`;
      area.innerHTML = `
        <div class="drill-tile">
          <div class="drill-tile-head">
            <span>Tempo Ocioso Médio no Escopo</span>
            <span class="tag tag-teal">${formatSec(m.avgIdleSec)}</span>
          </div>
          <div class="drill-bar-track"><div class="drill-bar-fill warn" style="width: ${Math.min(100, Math.round((m.avgIdleSec / 600) * 100))}%"></div></div>
          <p class="drill-meta">Tempo livre acumulado dos guichês sem atendimento em andamento neste filtro.</p>
        </div>
        <div class="drill-tile">
          <div class="drill-tile-head">
            <span>Guichês Ativos vs. Recomendados</span>
            <span class="tag ${m.activeStaffForScope < m.recommendedStaff ? "tag-red" : "tag-green"}">${m.activeStaffForScope} ativos / ${m.recommendedStaff} rec.</span>
          </div>
          <div class="drill-bar-track"><div class="drill-bar-fill ${m.activeStaffForScope < m.recommendedStaff ? "crit" : "ok"}" style="width: ${Math.min(100, Math.round((m.activeStaffForScope / m.recommendedStaff) * 100))}%"></div></div>
          <p class="drill-meta">Calculado para a demanda de ${m.totalTodayDemand} senhas e meta de TME ≤ ${u.targetTmeMinutes} min.</p>
        </div>
        <div class="drill-tile">
          <div class="drill-tile-head">
            <span>Guichês Abertos na Unidade</span>
            <span class="tag tag-blue">${u.counters.filter((c) => c.isOpen).map((c) => c.id).join(", ")}</span>
          </div>
          <div class="drill-bar-track"><div class="drill-bar-fill ok" style="width: 80%"></div></div>
          <p class="drill-meta">Todos os guichês abertos estão disponíveis nas listboxes de Intervenções Ágeis abaixo.</p>
        </div>
      `;
    } else if (kpi === "nps") {
      const total = m.evalWith + m.evalWithout;
      const withPct = total > 0 ? Math.round((m.evalWith / total) * 100) : 0;
      const withoutPct = 100 - withPct;
      titleEl.textContent = `Análise de Satisfação (NPS) e Cobertura de Avaliações — ${m.scopeLabel}`;
      area.innerHTML = `
        <div class="drill-tile">
          <div class="drill-tile-head">
            <span>Atendimentos COM Avaliação</span>
            <span class="tag tag-green">${m.evalWith} (${withPct}%)</span>
          </div>
          <div class="drill-bar-track"><div class="drill-bar-fill ok" style="width: ${withPct}%"></div></div>
          <p class="drill-meta">Cidadãos que registraram nota NPS (0–10) após encerramento/checkout no escopo ${m.scopeLabel}.</p>
        </div>
        <div class="drill-tile">
          <div class="drill-tile-head">
            <span>Atendimentos SEM Avaliação</span>
            <span class="tag tag-amber">${m.evalWithout} (${withoutPct}%)</span>
          </div>
          <div class="drill-bar-track"><div class="drill-bar-fill warn" style="width: ${withoutPct}%"></div></div>
          <p class="drill-meta">Atendimentos finalizados sem preenchimento opcional da pesquisa de satisfação.</p>
        </div>
        <div class="drill-tile">
          <div class="drill-tile-head">
            <span>Score NPS Apurado</span>
            <span class="tag ${m.currentNps >= 85 ? "tag-green" : "tag-amber"}">NPS ${m.currentNps} (Meta ≥ 85)</span>
          </div>
          <div class="drill-bar-track"><div class="drill-bar-fill" style="width: ${m.currentNps}%"></div></div>
          <p class="drill-meta">Exibição 100% anonimizada conforme diretrizes de privacidade (LGPD).</p>
        </div>
      `;
    } else {
      titleEl.textContent = `Composição da Previsão de Demanda — ${m.scopeLabel} (${m.totalTodayDemand} Senhas)`;
      area.innerHTML = `
        <div class="drill-tile">
          <div class="drill-tile-head">
            <span>1. Demanda Histórica Espontânea</span>
            <span class="tag tag-blue">${m.histWalkin} senhas</span>
          </div>
          <div class="drill-bar-track"><div class="drill-bar-fill" style="width: 55%"></div></div>
          <p class="drill-meta">Projeção estatística para ${m.scopeLabel} nesta faixa de dia útil.</p>
        </div>
        <div class="drill-tile">
          <div class="drill-tile-head">
            <span>2. Agendamentos Confirmados</span>
            <span class="tag tag-teal">${m.scheduled} senhas</span>
          </div>
          <div class="drill-bar-track"><div class="drill-bar-fill ok" style="width: 34%"></div></div>
          <p class="drill-meta">Agendamentos distribuídos fora dos dias de pico do início do mês (dias 1 a 5).</p>
        </div>
        <div class="drill-tile">
          <div class="drill-tile-head">
            <span>3. Senhas Emitidas Hoje e Não Atendidas</span>
            <span class="tag tag-amber">${m.pendingNow} senhas</span>
          </div>
          <div class="drill-bar-track"><div class="drill-bar-fill warn" style="width: 28%"></div></div>
          <p class="drill-meta">Senhas já emitidas hoje na unidade que ainda aguardam chamada ou conclusão.</p>
        </div>
      `;
    }
  }

  // =========================================================================
  // PONTO 6 E PONTO 4: SIMULADOR COM BOTÃO DE APLICAÇÃO + GRÁFICO COM PASSADO IMUTÁVEL
  // =========================================================================
  $("#range-target-tme").addEventListener("input", (e) => {
    currentUnit().simDraft.targetTmeMinutes = Number(e.target.value);
    $("#sim-apply-feedback").classList.add("hidden");
    renderTopDashboard();
    renderCharts();
  });

  $("#range-attendants").addEventListener("input", (e) => {
    currentUnit().simDraft.activeAttendants = Number(e.target.value);
    $("#sim-apply-feedback").classList.add("hidden");
    renderTopDashboard();
    renderCharts();
  });

  $("#select-lunch-policy").addEventListener("change", (e) => {
    currentUnit().simDraft.lunchPolicy = e.target.value;
    $("#sim-apply-feedback").classList.add("hidden");
    renderTopDashboard();
    renderCharts();
  });

  $("#check-senior-reinforcement").addEventListener("change", (e) => {
    const u = currentUnit();
    u.simDraft.seniorReinforcement = e.target.checked;
    if (u.simDraft.seniorReinforcement && u.simDraft.activeAttendants < u.baseOpenAttendants + 2) {
      u.simDraft.activeAttendants = Math.min(8, u.baseOpenAttendants + 2);
      $("#range-attendants").value = String(u.simDraft.activeAttendants);
    }
    $("#sim-apply-feedback").classList.add("hidden");
    renderTopDashboard();
    renderCharts();
  });

  // Botão de Aplicação da Simulação (Ponto 6)
  $("#btn-aplicar-simulacao").addEventListener("click", () => {
    const u = currentUnit();
    const prevAtt = u.activeAttendants;

    u.targetTmeMinutes = u.simDraft.targetTmeMinutes;
    u.activeAttendants = u.simDraft.activeAttendants;
    u.lunchPolicy = u.simDraft.lunchPolicy;
    u.seniorReinforcement = u.simDraft.seniorReinforcement;

    const openedMore = u.activeAttendants > prevAtt;
    syncCountersWithAttendantCount(u, u.activeAttendants, openedMore);

    u.managerLogs.unshift({
      datetime: `17/11/2026 ${CONSULTATION_TIME_LABEL}`,
      indicator: `Simulação Aplicada (${u.unitName})`,
      text: `Aplicado cenário simulado: Meta TME ≤ ${u.targetTmeMinutes} min, ${u.activeAttendants} atendentes ativos, almoço ${u.lunchPolicy}${u.seniorReinforcement ? " e reforço sênior ativo" : ""}.`,
    });

    awardSupervisorGamification(
      u,
      80,
      `Aplicação de Simulação Operacional (${u.activeAttendants} atendentes • almoço ${u.lunchPolicy})`
    );
    refreshAllViews();

    const fb = $("#sim-apply-feedback");
    fb.textContent = `✓ Simulação aplicada na operação de ${u.unitName} (+80 pts na Gamificação)! Os guichês, KPIs, listboxes de intervenção e projeções a partir das 12h foram atualizados.`;
    fb.classList.remove("hidden");

    if (openedMore) {
      const newly = u.counters.find((c) => c.newlyOpened);
      if (newly) {
        $("#select-guiche-destino").value = newly.id;
        $("#select-guiche-regra").value = newly.id;
      }
    }
  });

  // Renderização dos Gráficos (Ponto 4: Horário da Consulta + Horários Passados 08h-11h Fixos!)
  function renderCharts() {
    const u = currentUnit();
    // No gráfico horário, os horários futuros (12h-17h) mostram o impacto da simulação em edição/aplicada,
    // enquanto os horários anteriores (08h-11h) estão no passado e NUNCA mudam!
    const simM = computeOperationalMetrics(true);
    const m = computeOperationalMetrics(false);

    $("#chart-consult-time-badge").textContent =
      `🕒 Horário da Consulta: ${CONSULTATION_TIME_LABEL} (08h–11h Passado Consolidado Fixo • 12h–17h Projetado)`;

    const hourlyEl = $("#hourly-tme-chart");
    hourlyEl.innerHTML = "";

    const hours = ["08h", "09h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h"];
    const futureDemandFactor = [1.0, 1.0, 1.0, 1.0, 1.3, 1.25, 1.1, 0.95, 0.85, 0.65];
    const baseFutureTmeMin = Math.max(2, Math.round(simM.projectedTmeSec / 60));

    // Fator de escala fixo apenas para quando muda o Nível de Visão (Fila Preferencial/Agendada tem passado menor que Convencional),
    // mas NUNCA muda com os controles de simulação!
    let viewPastMultiplier = 1.0;
    if (state.viewLevel === "QUEUE_PREF") viewPastMultiplier = 0.55;
    else if (state.viewLevel === "QUEUE_AG") viewPastMultiplier = 0.35;

    hours.forEach((h, idx) => {
      const isPast = idx < PAST_HOURS_COUNT; // 08h, 09h, 10h, 11h
      let valMin;
      let barClass = "";
      let tooltip = "";

      if (isPast) {
        // Horário no passado: valor histórico consolidado fixo (não sofre efeito de simulações)
        valMin = Math.max(2, Math.round(u.pastHourlyTmeMin[idx] * viewPastMultiplier));
        barClass = "bar-past";
        tooltip = `${h} (Passado Consolidado antes de ${CONSULTATION_TIME_LABEL}): TME realizado de ${valMin} min (inalterável por simulações)`;
      } else {
        // Horário futuro (12h em diante): calculado dinamicamente pela simulação
        valMin = Math.round(baseFutureTmeMin * futureDemandFactor[idx]);
        if ((h === "12h" || h === "13h") && u.simDraft.lunchPolicy === "simultaneo") {
          valMin = Math.round(baseFutureTmeMin * 4.0);
        } else if ((h === "12h" || h === "13h") && u.simDraft.lunchPolicy === "escalonado") {
          valMin = Math.round(baseFutureTmeMin * 1.25);
        }
        barClass =
          valMin > u.simDraft.targetTmeMinutes
            ? "bar-crit"
            : valMin <= u.simDraft.targetTmeMinutes * 0.8
            ? "bar-ok"
            : "";
        tooltip = `${h} (Projeção Futura pós-${CONSULTATION_TIME_LABEL}): TME estimado de ${valMin} min`;
      }

      const heightPct = Math.min(100, Math.max(12, Math.round((valMin / 45) * 100)));
      const col = document.createElement("div");
      col.className = `h-col${idx === PAST_HOURS_COUNT ? " now-divider" : ""}`;
      col.innerHTML = `
        <span class="h-val">${valMin}m</span>
        <div class="h-bar ${barClass}" style="height: ${heightPct}%" title="${tooltip}"></div>
        <span class="h-lbl">${idx === PAST_HOURS_COUNT ? "📍12h" : h}</span>
      `;
      hourlyEl.appendChild(col);
    });

    // Gráfico 2: Previsão de Demanda (Dia atual + próximos dias)
    const daysEl = $("#multi-day-forecast-chart");
    daysEl.innerHTML = "";

    const forecastDays = [
      {
        label: "Hoje (17/11)",
        isToday: true,
        hist: m.histWalkin,
        ag: m.scheduled,
        pend: m.pendingNow,
      },
      ...u.nextDaysForecast.map((d) => ({
        label: d.label,
        isToday: false,
        hist: Math.max(1, Math.round(d.hist * m.demandShare)),
        ag: Math.max(1, Math.round(d.ag * m.demandShare)),
        pend: 0,
      })),
    ];

    forecastDays.forEach((d) => {
      const total = d.hist + d.ag + d.pend;
      const recStaff = Math.max(1, Math.ceil(total / 24));
      const pHist = Math.round((d.hist / total) * 100);
      const pAg = Math.round((d.ag / total) * 100);
      const pPend = Math.max(0, 100 - pHist - pAg);

      const card = document.createElement("div");
      card.className = `f-day-card${d.isToday ? " today" : ""}`;
      card.innerHTML = `
        <div class="f-day-top">
          <span>${d.label}</span>
          <strong>${total}</strong>
        </div>
        <div class="f-stack-bar">
          <div class="f-seg-hist" style="width: ${pHist}%"></div>
          <div class="f-seg-ag" style="width: ${pAg}%"></div>
          <div class="f-seg-pend" style="width: ${pPend}%"></div>
        </div>
        <span class="f-meta">Hist: ${d.hist} | Ag: ${d.ag}${d.pend ? ` | Pend: ${d.pend}` : ""}</span>
        <span class="tag tag-blue">Rec.: ${recStaff} atend.</span>
      `;
      daysEl.appendChild(card);
    });
  }

  // =========================================================================
  // GUICHÊS, GARGALOS E LISTBOXES DE INTERVENÇÃO
  // =========================================================================
  function renderGuichesAndBottleneck() {
    const u = currentUnit();
    const grid = $("#guiches-status-grid");
    grid.innerHTML = "";

    if (!u.counters.some((c) => c.id === state.selectedGuicheId)) {
      state.selectedGuicheId = u.counters[0].id;
    }

    const countersToShow = u.counters.filter((c) => {
      if (state.viewLevel === "ALL") return true;
      if (state.viewLevel.startsWith("G-")) return c.id === state.viewLevel;
      if (state.viewLevel.startsWith("QUEUE_")) {
        return c.queueScope === state.viewLevel || c.rule.includes("Todas") || c.newlyOpened;
      }
      return true;
    });

    countersToShow.forEach((c) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `g-sup-tile${state.selectedGuicheId === c.id ? " selected" : ""}`;
      btn.innerHTML = `
        <div class="g-sup-top">
          <span>${c.id} (${c.profile})${c.newlyOpened ? " ✨" : ""}</span>
          <span class="tag ${c.statusClass}">${c.status}</span>
        </div>
        <span class="g-sup-meta"><strong>Regra:</strong> ${c.rule}</span>
        <span class="g-sup-meta">Senha atual: <strong>${c.currentTicket}</strong> | TMA: <strong>${formatSec(c.tmaAvgSec)}</strong></span>
        <span class="g-sup-meta">Ociosidade: <strong>${formatSec(c.idleSec)}</strong> | Atendidos: <strong>${c.servedCount}</strong></span>
      `;
      btn.addEventListener("click", () => {
        state.selectedGuicheId = c.id;
        renderGuichesAndBottleneck();
        renderGuicheDrillTable();
      });
      grid.appendChild(btn);
    });

    const bottleEl = $("#bottleneck-banner");
    const bottleTxt = $("#bottleneck-text");
    const m = computeOperationalMetrics(false);

    if (m.projectedTmeSec <= u.targetTmeMinutes * 60) {
      bottleEl.classList.add("resolved");
      bottleTxt.innerHTML = `Operação equilibrada em <strong>${u.unitName} (${m.scopeLabel})</strong>! TME em ${formatSec(m.projectedTmeSec)} dentro da meta de ${u.targetTmeMinutes} min.`;
    } else {
      bottleEl.classList.remove("resolved");
      const waitingTickets = m.scopedTickets.filter((t) => t.status.includes("Espera"));
      const sampleCode = waitingTickets[0] ? waitingTickets[0].code : m.scopedTickets[0]?.code || "C-104";
      const idleCounter = u.counters.find((c) => c.idleSec >= 300);
      bottleTxt.innerHTML = `Em <strong>${u.unitName} (${m.scopeLabel})</strong>: <strong>${m.pendingNow} senha(s) pendente(s)</strong> (ex.: senha <code>${sampleCode}</code>, TME médio ${formatSec(m.projectedTmeSec)})${idleCounter ? `, enquanto <strong>${idleCounter.id}</strong> está ocioso há <strong>${formatSec(idleCounter.idleSec)}</strong>` : ""}.`;
    }
  }

  function renderGuicheDrillTable() {
    const u = currentUnit();
    const c = u.counters.find((item) => item.id === state.selectedGuicheId) || u.counters[0];
    $("#guiche-drill-title").textContent = `🔍 Drill-Down do ${c.name} — Visão Anonimizada LGPD`;

    const tbody = $("#guiche-drill-tbody");
    tbody.innerHTML = "";

    const rows = u.tickets.filter((t) => t.guiche === c.id);
    if (!rows.length) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-muted">Nenhuma senha vinculada ao ${c.id} no momento. Use a sessão "Intervenções Ágeis na Distribuição de Filas" ao lado para transferir senhas para este guichê.</td></tr>`;
      return;
    }

    rows.forEach((r) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${r.code}</strong></td>
        <td>${r.queueType}</td>
        <td>${r.service}</td>
        <td><span class="tag ${r.tmeSec > u.targetTmeMinutes * 60 ? "tag-red" : "tag-green"}">${formatSec(r.tmeSec)}</span></td>
        <td>${r.tmaSec > 0 ? formatSec(r.tmaSec) : "Em espera"}</td>
        <td>${r.status}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  function populateInterventionSelects() {
    const u = currentUnit();

    // 1. Nível de Visão no topo
    const viewSel = $("#select-nivel-visao");
    const prevView = state.viewLevel;
    viewSel.innerHTML = `
      <option value="ALL">Visão Agregada — Toda a Agência (${u.unitName})</option>
      <option value="QUEUE_CONV">Fila: Convencional</option>
      <option value="QUEUE_PREF">Fila: Preferencial Legal</option>
      <option value="QUEUE_AG">Fila: Agendados</option>
    `;
    u.counters.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c.id;
      opt.textContent = `Atendente Individual: ${c.name} (${c.isOpen ? "Aberto" : "Reserva"})`;
      viewSel.appendChild(opt);
    });
    if (Array.from(viewSel.options).some((o) => o.value === prevView)) {
      viewSel.value = prevView;
    } else {
      state.viewLevel = "ALL";
      viewSel.value = "ALL";
    }

    // 2. Senha (Código LGPD)
    const selSenha = $("#select-senha-intervencao");
    const prevSenha = selSenha.value;
    selSenha.innerHTML = "";
    u.tickets.forEach((t) => {
      const opt = document.createElement("option");
      opt.value = t.code;
      opt.textContent = `${t.code} • ${t.queueType} (${t.service}) — Atual: ${t.guiche}`;
      selSenha.appendChild(opt);
    });
    if (Array.from(selSenha.options).some((o) => o.value === prevSenha)) {
      selSenha.value = prevSenha;
    }

    // 3. Guichê de Destino (#select-guiche-destino)
    const selDestino = $("#select-guiche-destino");
    const prevDestino = selDestino.value;
    selDestino.innerHTML = "";
    const openCounters = u.counters.filter((c) => c.isOpen);
    openCounters.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c.id;
      const prefixNew = c.newlyOpened ? "✨ [NOVO ABERTO] " : "";
      opt.textContent = `${prefixNew}${c.name} (${c.status} • ${c.rule})`;
      selDestino.appendChild(opt);
    });
    if (Array.from(selDestino.options).some((o) => o.value === prevDestino)) {
      selDestino.value = prevDestino;
    }

    // 4. Selecionar Guichê (#select-guiche-regra)
    const selRegra = $("#select-guiche-regra");
    const prevRegra = selRegra.value;
    selRegra.innerHTML = "";
    u.counters.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c.id;
      const prefixNew = c.newlyOpened ? "✨ [NOVO ABERTO] " : "";
      opt.textContent = `${prefixNew}${c.name} — ${c.isOpen ? "Aberto" : "Fechado"} (Atual: ${c.rule})`;
      selRegra.appendChild(opt);
    });
    if (Array.from(selRegra.options).some((o) => o.value === prevRegra)) {
      selRegra.value = prevRegra;
    }
  }

  // Intervenção 1: Transferir Senha entre Guichês
  $("#form-transferir-fila").addEventListener("submit", (e) => {
    e.preventDefault();
    const u = currentUnit();
    const code = $("#select-senha-intervencao").value;
    const targetGuiche = $("#select-guiche-destino").value;

    const tk = u.tickets.find((t) => t.code === code);
    const g = u.counters.find((c) => c.id === targetGuiche);
    if (!tk || !g) return;

    const oldGuiche = tk.guiche;
    tk.guiche = targetGuiche;
    tk.tmeSec = Math.max(160, Math.round(tk.tmeSec * 0.65));
    tk.status = `Redirecionado p/ ${targetGuiche} pela Supervisão`;

    g.isOpen = true;
    g.currentTicket = tk.code;
    g.status = "Em Atendimento";
    g.statusClass = "tag-green";
    g.idleSec = 0;

    state.selectedGuicheId = targetGuiche;
    u.managerLogs.unshift({
      datetime: `17/11/2026 ${CONSULTATION_TIME_LABEL}`,
      indicator: `Transferência Ágil (${u.unitName})`,
      text: `Senha ${tk.code} (${tk.service}) transferida do ${oldGuiche} para o ${targetGuiche} para balanceamento de carga.`,
    });

    awardSupervisorGamification(
      u,
      45,
      `Transferência Ágil da Senha ${tk.code} do ${oldGuiche} para o ${targetGuiche}`
    );
    refreshAllViews();
  });

  // Intervenção 2: Redistribuir Categoria de Fila ou Abrir Guichê
  $("#form-redistribuir-guiche").addEventListener("submit", (e) => {
    e.preventDefault();
    const u = currentUnit();
    const gId = $("#select-guiche-regra").value;
    const newRule = $("#select-nova-regra").value;
    const g = u.counters.find((c) => c.id === gId);
    if (!g) return;

    const wasClosed = !g.isOpen;
    g.isOpen = true;
    if (wasClosed) g.newlyOpened = true;
    g.rule = newRule;
    g.status = wasClosed ? "Aberto • Novo Reforço" : "Ativo • Redistribuído";
    g.statusClass = "tag-green";
    g.idleSec = 20;

    u.activeAttendants = u.counters.filter((c) => c.isOpen).length;
    u.simDraft.activeAttendants = u.activeAttendants;

    state.selectedGuicheId = gId;
    u.managerLogs.unshift({
      datetime: `17/11/2026 ${CONSULTATION_TIME_LABEL}`,
      indicator: `Redistribuição / Abertura de Guichê (${u.unitName})`,
      text: `${g.name} ativado/configurado com a regra: "${newRule}".`,
    });

    awardSupervisorGamification(
      u,
      60,
      `${wasClosed ? "Abertura" : "Redistribuição"} do ${g.id} (${newRule})`
    );
    refreshAllViews();
  });

  // PONTO 5: Botão "Aplicar Recomendação: Abrir +2 Guichês Sênior & Escalonar Almoço"
  // Abre EXATAMENTE 2 novos guichês acima da base aberta da unidade (ex.: em Boa Vista abre apenas G-04 e G-05 -> 2 novos guichês!)
  $("#btn-aplicar-recomendacao-aqualino").addEventListener("click", () => {
    const u = currentUnit();
    const exactTargetOpen = u.baseOpenAttendants + 2; // Sempre exatamente +2 novos guichês sobre a base!

    u.activeAttendants = exactTargetOpen;
    u.lunchPolicy = "escalonado";
    u.seniorReinforcement = true;

    u.simDraft.activeAttendants = exactTargetOpen;
    u.simDraft.lunchPolicy = "escalonado";
    u.simDraft.seniorReinforcement = true;

    u.forecastToday.issuedPendingToday = Math.max(2, Math.floor(u.forecastToday.issuedPendingToday / 2));

    syncCountersWithAttendantCount(u, exactTargetOpen, true);

    u.counters.forEach((c) => {
      if (c.isOpen && c.idleSec > 200) {
        c.rule = "Priorizar Fila Convencional + Agendados";
        c.status = "Em Atendimento";
        c.statusClass = "tag-green";
        c.idleSec = 35;
      }
    });

    u.tickets.forEach((t) => {
      t.tmeSec = Math.min(t.tmeSec, 440);
    });

    const newlyOpenedList = u.counters.filter((c) => c.newlyOpened);

    u.managerLogs.unshift({
      datetime: `17/11/2026 ${CONSULTATION_TIME_LABEL}`,
      indicator: `Abertura de +2 Guichês Sênior + Escala de Almoço (${u.unitName})`,
      text: `Abertos exatamente ${newlyOpenedList.length} novos guichês (${newlyOpenedList.map((c) => c.id).join(" e ")}) com funcionários sêniores e escalonado o horário de almoço em 2 turnos.`,
    });

    awardSupervisorGamification(
      u,
      120,
      "Recomendação do Aqualino: Abertura de +2 Guichês Sênior & Escalonamento de Almoço"
    );

    refreshAllViews();
    if (newlyOpenedList[0]) {
      $("#select-guiche-destino").value = newlyOpenedList[0].id;
      $("#select-guiche-regra").value = newlyOpenedList[0].id;
    }
  });

  // =========================================================================
  // REGISTRO DE AÇÕES TOMADAS PELO SUPERVISOR
  // =========================================================================
  $$(".chip-action-preset").forEach((chip) => {
    chip.addEventListener("click", () => {
      $("#textarea-acao-gestor").value = chip.dataset.action;
    });
  });

  $("#form-acao-gestor").addEventListener("submit", (e) => {
    e.preventDefault();
    const u = currentUnit();
    const txt = $("#textarea-acao-gestor").value.trim();
    if (!txt) {
      alert("Descreva a ação tomada pelo supervisor para enriquecer o histórico.");
      return;
    }

    const rawDt = $("#input-acao-datahora").value || "2026-11-17T11:45";
    const [datePart, timePart] = rawDt.split("T");
    const [yyyy, mm, dd] = datePart.split("-");
    const formattedDt = `${dd}/${mm}/${yyyy} ${timePart}`;
    const ind = $("#select-acao-indicador").value;

    u.managerLogs.unshift({
      datetime: formattedDt,
      indicator: `${ind} (${u.unitName})`,
      text: txt,
    });

    let openedNew = false;
    if (/2 guichês|2 guiches|sênior|senior|abrir/i.test(txt)) {
      u.seniorReinforcement = true;
      u.simDraft.seniorReinforcement = true;
      const exactOpen = u.baseOpenAttendants + 2; // Exatamente +2 novos guichês
      u.activeAttendants = exactOpen;
      u.simDraft.activeAttendants = exactOpen;
      syncCountersWithAttendantCount(u, exactOpen, true);
      openedNew = true;
    }
    if (/almoço|almoco|escalon/i.test(txt)) {
      u.lunchPolicy = "escalonado";
      u.simDraft.lunchPolicy = "escalonado";
    }

    awardSupervisorGamification(u, 40, `Registro de Ação Operacional (${ind})`);

    $("#textarea-acao-gestor").value = "";
    refreshAllViews();

    if (openedNew) {
      const newly = u.counters.find((c) => c.newlyOpened);
      if (newly) {
        $("#select-guiche-destino").value = newly.id;
        $("#select-guiche-regra").value = newly.id;
      }
    }
  });

  function renderManagerLogs() {
    const u = currentUnit();
    const list = $("#manager-actions-log");
    list.innerHTML = "";
    u.managerLogs.forEach((item) => {
      const div = document.createElement("div");
      div.className = "manager-log-item";
      div.innerHTML = `<strong>📅 ${item.datetime} • ${item.indicator}:</strong> ${item.text}`;
      list.appendChild(div);
    });
  }

  // =========================================================================
  // RESPOSTA DIRETA DO AQUALINO A DÚVIDAS DE UTILIZAÇÃO DA TELA (TEXTO OU VOZ)
  // =========================================================================
  function generateAqualinoUsageAnswer(rawQuestion) {
    const q = (rawQuestion || "").toLowerCase();

    if (/(simula|aplicar|cenário|cenario|almoço|almoco|300%|dimensiona|atendente)/i.test(q)) {
      return `No bloco <strong>Dimensionamento & Simulação de Cenários</strong>, ajuste o TME objetivo (4 a 20 min), a quantidade de atendentes (2 a 8), a política de almoço e o reforço sênior para ver a prévia do impacto. Para efetivar na agência, clique no botão <strong>"✓ Aplicar Simulação na Operação da Unidade"</strong>!`;
    }

    if (/(gráfico|grafico|passado|08h|09h|10h|11h|11:45|hora|muda|anterior)/i.test(q)) {
      return `No bloco <strong>Gráficos em Tempo Real</strong>, indicamos o <strong>Horário da Consulta (${CONSULTATION_TIME_LABEL})</strong>. Os horários anteriores (<strong>08h às 11h</strong>) já ocorreram no passado e por isso permanecem fixos/inalteráveis; apenas os horários futuros (<strong>12h às 17h</strong>) mudam com as simulações.`;
    }

    if (/(transferir|redistribuir|abrir|guichê|guiche|listbox|interven)/i.test(q)) {
      return `Use o bloco <strong>Intervenções Ágeis na Distribuição de Filas</strong> para transferir uma senha para outro guichê ou alterar a regra/abrir um guichê. Sempre que novos guichês são abertos, eles aparecem automaticamente nas listboxes <strong>Guichê de Destino</strong> e <strong>Selecionar Guichê</strong>!`;
    }

    if (/(unidade|visão|visao|filtro|drill|indicador|kpi|pinheirinho|boa vista|rebouças)/i.test(q)) {
      return `No topo da tela, altere a <strong>Unidade</strong> para carregar os dados daquela agência ou mude o <strong>Nível de Visão</strong> para filtrar todos os dados por Fila ou por Guichê individual. Para detalhar qualquer um dos 5 KPIs do topo, basta clicar sobre o cartão do indicador para atualizar o painel de <strong>Drill-Down</strong>!`;
    }

    if (/(lgpd|dado|nome|cpf|matrícula|matricula|privacidade|anonim|código|codigo)/i.test(q)) {
      return `Em conformidade com a <strong>LGPD</strong>, esta tela de supervisão não exibe nomes, CPFs ou matrículas dos cidadãos. Todos os atendimentos e drill-downs são identificados exclusivamente pelo <strong>Código da Senha</strong> (ex.: <code>C-104</code>, <code>P-042</code>), <strong>Tipo de Fila</strong>, <strong>Serviço de Triagem</strong> e <strong>Tempos (TME e TMA)</strong>.`;
    }

    if (/(ação|acao|histórico|historico|gestor|registrar|data)/i.test(q)) {
      return `No card <strong>Registro de Ações Tomadas pelo Supervisor</strong>, indique a data, o horário e a descrição da intervenção (ex.: abertura de +2 guichês sêniores) e clique em registrar para documentar o motivo da melhora na curva histórica de TME e TMA.`;
    }

    return `Posso ajudar com qualquer recurso desta tela! Você pode: <strong>(1)</strong> trocar a <em>Unidade</em> e o <em>Nível de Visão</em> no topo; <strong>(2)</strong> clicar nos <em>5 KPIs</em> para ver o Drill-Down; <strong>(3)</strong> testar parâmetros no <em>Simulador</em> e clicar em <em>Aplicar Simulação</em>; ou <strong>(4)</strong> transferir senhas e abrir guichês em <em>Intervenções Ágeis</em>.`;
  }

  function askAqualino(questionText) {
    const q = (questionText || "").trim();
    if (!q) {
      $("#input-pergunta-aqualino").focus();
      return;
    }

    const answerHtml = generateAqualinoUsageAnswer(q);
    const bubble = $("#aqualino-recommendation-text");
    bubble.classList.remove("healthy");
    bubble.classList.add("answering-question");
    bubble.innerHTML = `
      💬 <strong>Você perguntou:</strong> <em>"${q}"</em><br/>
      💧 <strong>Aqualino explica:</strong> ${answerHtml}
      <button type="button" id="btn-voltar-diagnostico" class="btn-link" style="margin-left:8px;text-decoration:underline;cursor:pointer;border:none;background:none;color:var(--primary);font-weight:700;">
        ↺ Voltar ao diagnóstico operacional
      </button>
    `;

    const btnBack = $("#btn-voltar-diagnostico");
    if (btnBack) {
      btnBack.addEventListener("click", () => {
        bubble.classList.remove("answering-question");
        renderTopDashboard();
      });
    }

    const img = $(".mascot-img");
    if (img) {
      img.classList.add("celebrate");
      setTimeout(() => img.classList.remove("celebrate"), 600);
    }
  }

  $("#form-perguntar-aqualino").addEventListener("submit", (e) => {
    e.preventDefault();
    askAqualino($("#input-pergunta-aqualino").value);
  });

  $$(".chip-ask-aqualino").forEach((chip) => {
    chip.addEventListener("click", () => {
      $("#input-pergunta-aqualino").value = chip.dataset.question;
      askAqualino(chip.dataset.question);
    });
  });

  // Suporte a pergunta por voz para o Aqualino
  const btnVozAqualino = $("#btn-voz-aqualino");
  let isListeningAqualino = false;
  btnVozAqualino.addEventListener("click", () => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!isListeningAqualino && SpeechRec) {
      try {
        const rec = new SpeechRec();
        rec.lang = "pt-BR";
        isListeningAqualino = true;
        btnVozAqualino.classList.add("listening");
        btnVozAqualino.textContent = "🛑 Ouvindo...";
        rec.onresult = (ev) => {
          const transcript = ev.results[0][0].transcript;
          $("#input-pergunta-aqualino").value = transcript;
          askAqualino(transcript);
        };
        rec.onend = () => {
          isListeningAqualino = false;
          btnVozAqualino.classList.remove("listening");
          btnVozAqualino.textContent = "🎤 Voz";
        };
        rec.onerror = () => {
          isListeningAqualino = false;
          btnVozAqualino.classList.remove("listening");
          btnVozAqualino.textContent = "🎤 Voz";
          const fallbackQ = "Como funciona o simulador de cenários e o botão de aplicar simulação?";
          $("#input-pergunta-aqualino").value = fallbackQ;
          askAqualino(fallbackQ);
        };
        rec.start();
        return;
      } catch (_) {}
    }

    const sampleQ = "Como funciona o simulador de cenários e o botão de aplicar simulação?";
    $("#input-pergunta-aqualino").value = sampleQ;
    askAqualino(sampleQ);
  });

  function focusAqualinoQuestionInput() {
    $("#aqualino-alert-panel").scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => $("#input-pergunta-aqualino").focus(), 250);
  }

  $("#btn-floating-aqualino").addEventListener("click", focusAqualinoQuestionInput);

  // =========================================================================
  // SELEÇÃO DE UNIDADE E NÍVEL DE VISÃO + HISTÓRICO AUDITÁVEL
  // =========================================================================
  $("#select-unidade-sup").addEventListener("change", (e) => {
    state.currentUnitKey = e.target.value;
    state.viewLevel = "ALL";
    const u = currentUnit();
    state.selectedGuicheId = u.counters[0].id;
    $("#sim-apply-feedback").classList.add("hidden");
    $("#sup-score-delta-badge").classList.add("hidden");
    refreshAllViews();
  });

  $("#select-nivel-visao").addEventListener("change", (e) => {
    state.viewLevel = e.target.value;
    if (state.viewLevel.startsWith("G-")) {
      state.selectedGuicheId = state.viewLevel;
    }
    refreshAllViews();
  });

  function syncSimulatorInputsWithUnit() {
    const u = currentUnit();
    $("#range-target-tme").value = String(u.simDraft.targetTmeMinutes);
    $("#range-attendants").value = String(u.simDraft.activeAttendants);
    $("#select-lunch-policy").value = u.simDraft.lunchPolicy;
    $("#check-senior-reinforcement").checked = u.simDraft.seniorReinforcement;
  }

  function renderAuditTable() {
    const u = currentUnit();
    const m = computeOperationalMetrics(false);
    const tbody = $("#audit-log-tbody");
    tbody.innerHTML = "";

    m.scopedTickets.forEach((t) => {
      const tr = document.createElement("tr");
      const npsBadge = t.evaluated
        ? `<span class="tag ${t.nps >= 9 ? "tag-green" : "tag-amber"}">NPS ${t.nps}/10</span>`
        : `<span class="tag tag-blue">Sem avaliação</span>`;

      tr.innerHTML = `
        <td><strong>${t.code}</strong></td>
        <td>${t.queueType}</td>
        <td>${t.service}</td>
        <td><strong>${t.guiche}</strong></td>
        <td><span class="tag ${t.tmeSec > u.targetTmeMinutes * 60 ? "tag-red" : "tag-green"}">${formatSec(t.tmeSec)}</span></td>
        <td>${t.tmaSec > 0 ? formatSec(t.tmaSec) : "—"}</td>
        <td>${npsBadge}</td>
        <td>${t.status}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Restaurar demonstração
  $("#btn-reset-sup").addEventListener("click", () => {
    state.units = createUnitsDatabase();
    state.viewLevel = "ALL";
    const u = currentUnit();
    state.selectedGuicheId = u.counters[0].id;
    $("#input-pergunta-aqualino").value = "";
    $("#sim-apply-feedback").classList.add("hidden");
    $("#sup-score-delta-badge").classList.add("hidden");
    refreshAllViews();
  });

  function refreshAllViews() {
    syncSimulatorInputsWithUnit();
    populateInterventionSelects();
    renderTopDashboard();
    renderDrillDownPanel();
    renderCharts();
    renderGuichesAndBottleneck();
    renderGuicheDrillTable();
    renderManagerLogs();
    renderAuditTable();
  }

  // Inicialização
  refreshAllViews();
})();
