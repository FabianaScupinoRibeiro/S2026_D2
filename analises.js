(() => {
  "use strict";

  // Estrutura das 4 Macro-Regiões e 22 Coordenações Comerciais da SANEPAR (382 Centrais)
  const REGIONS = [
    {
      id: "REG_METRO",
      name: "Região Metropolitana e Litoral",
      centraisCount: 98,
      staffCount: 340,
      dailyVolume: 6420,
      avoidedVolume: 2290,
      tmeSec: 650, // 10m 50s
      tmaSec: 445, // 07m 25s
      nps: 84,
      fcrPct: 90.8,
      status: "Alerta em 2 Centrais (Pico Urbano)",
      statusClass: "tag-amber",
    },
    {
      id: "REG_NORTE",
      name: "Região Norte e Noroeste",
      centraisCount: 112,
      staffCount: 310,
      dailyVolume: 5180,
      avoidedVolume: 1760,
      tmeSec: 590, // 09m 50s
      tmaSec: 425, // 07m 05s
      nps: 87,
      fcrPct: 92.1,
      status: "Dentro dos Parâmetros",
      statusClass: "tag-green",
    },
    {
      id: "REG_OESTE",
      name: "Região Oeste e Sudoeste",
      centraisCount: 96,
      staffCount: 280,
      dailyVolume: 4290,
      avoidedVolume: 1410,
      tmeSec: 615, // 10m 15s
      tmaSec: 435, // 07m 15s
      nps: 88,
      fcrPct: 91.9,
      status: "Dentro dos Parâmetros",
      statusClass: "tag-green",
    },
    {
      id: "REG_CAMPOS",
      name: "Região Campos Gerais e Centro-Sul",
      centraisCount: 76,
      staffCount: 210,
      dailyVolume: 2750,
      avoidedVolume: 870,
      tmeSec: 635, // 10m 35s
      tmaSec: 440, // 07m 20s
      nps: 85,
      fcrPct: 90.5,
      status: "Atenção em 1 Coordenação",
      statusClass: "tag-amber",
    },
  ];

  // As 22 Coordenações Comerciais da SANEPAR somando 382 Centrais de Relacionamento
  const COORDENACOES_22 = [
    { id: "C01", regId: "REG_METRO", name: "01 • Coord. Curitiba Centro-Leste", centrais: 22, staff: 112, vol: 2450, tmeSec: 685, tmaSec: 465, nps: 81, fcr: 89.5, municipios: ["Curitiba", "Pinhais"] },
    { id: "C02", regId: "REG_METRO", name: "02 • Coord. Curitiba Sul-Oeste", centrais: 20, staff: 86, vol: 1780, tmeSec: 595, tmaSec: 440, nps: 85, fcr: 91.2, municipios: ["Curitiba", "Araucária", "Fazenda Rio Grande"] },
    { id: "C03", regId: "REG_METRO", name: "03 • Coord. São José dos Pinhais", centrais: 18, staff: 52, vol: 890, tmeSec: 540, tmaSec: 420, nps: 88, fcr: 92.0, municipios: ["São José dos Pinhais", "Tijucas do Sul"] },
    { id: "C04", regId: "REG_METRO", name: "04 • Coord. Metropolitana Norte (Colombo)", centrais: 20, staff: 48, vol: 720, tmeSec: 580, tmaSec: 430, nps: 86, fcr: 90.4, municipios: ["Colombo", "Almirante Tamandaré", "Rio Branco do Sul"] },
    { id: "C05", regId: "REG_METRO", name: "05 • Coord. Litoral (Paranaguá/Matinhos)", centrais: 18, staff: 42, vol: 580, tmeSec: 560, tmaSec: 435, nps: 86, fcr: 91.0, municipios: ["Paranaguá", "Matinhos", "Guaratuba"] },
    { id: "C06", regId: "REG_NORTE", name: "06 • Coord. Londrina", centrais: 24, staff: 88, vol: 1620, tmeSec: 640, tmaSec: 450, nps: 83, fcr: 90.8, municipios: ["Londrina", "Cambé", "Ibiporã"] },
    { id: "C07", regId: "REG_NORTE", name: "07 • Coord. Maringá", centrais: 22, staff: 76, vol: 1390, tmeSec: 490, tmaSec: 410, nps: 91, fcr: 93.6, municipios: ["Maringá", "Sarandi", "Paiçandu"] },
    { id: "C08", regId: "REG_NORTE", name: "08 • Coord. Apucarana / Arapongas", centrais: 18, staff: 42, vol: 640, tmeSec: 530, tmaSec: 420, nps: 88, fcr: 92.1, municipios: ["Apucarana", "Arapongas"] },
    { id: "C09", regId: "REG_NORTE", name: "09 • Coord. Paranavaí", centrais: 16, staff: 34, vol: 510, tmeSec: 515, tmaSec: 415, nps: 89, fcr: 92.4, municipios: ["Paranavaí", "Loanda"] },
    { id: "C10", regId: "REG_NORTE", name: "10 • Coord. Cornélio Procópio", centrais: 16, staff: 35, vol: 500, tmeSec: 525, tmaSec: 425, nps: 87, fcr: 91.5, municipios: ["Cornélio Procópio", "Bandeirantes"] },
    { id: "C11", regId: "REG_NORTE", name: "11 • Coord. Santo Antônio da Platina", centrais: 16, staff: 35, vol: 520, tmeSec: 535, tmaSec: 430, nps: 87, fcr: 91.8, municipios: ["Santo Antônio da Platina", "Jacarezinho"] },
    { id: "C12", regId: "REG_OESTE", name: "12 • Coord. Cascavel", centrais: 20, staff: 74, vol: 1280, tmeSec: 575, tmaSec: 430, nps: 89, fcr: 92.7, municipios: ["Cascavel", "Corbélia"] },
    { id: "C13", regId: "REG_OESTE", name: "13 • Coord. Foz do Iguaçu", centrais: 16, staff: 58, vol: 940, tmeSec: 610, tmaSec: 440, nps: 87, fcr: 91.5, municipios: ["Foz do Iguaçu", "Medianeira"] },
    { id: "C14", regId: "REG_OESTE", name: "14 • Coord. Toledo", centrais: 16, staff: 42, vol: 610, tmeSec: 520, tmaSec: 415, nps: 90, fcr: 93.0, municipios: ["Toledo", "Marechal Cândido Rondon"] },
    { id: "C15", regId: "REG_OESTE", name: "15 • Coord. Pato Branco", centrais: 15, staff: 38, vol: 520, tmeSec: 540, tmaSec: 425, nps: 89, fcr: 92.2, municipios: ["Pato Branco", "Palmas"] },
    { id: "C16", regId: "REG_OESTE", name: "16 • Coord. Francisco Beltrão", centrais: 15, staff: 36, vol: 490, tmeSec: 550, tmaSec: 430, nps: 88, fcr: 91.6, municipios: ["Francisco Beltrão", "Dois Vizinhos"] },
    { id: "C17", regId: "REG_OESTE", name: "17 • Coord. Umuarama", centrais: 14, staff: 32, vol: 450, tmeSec: 565, tmaSec: 435, nps: 87, fcr: 91.1, municipios: ["Umuarama", "Guaíra"] },
    { id: "C18", regId: "REG_CAMPOS", name: "18 • Coord. Ponta Grossa", centrais: 20, staff: 68, vol: 980, tmeSec: 635, tmaSec: 455, nps: 83, fcr: 89.8, municipios: ["Ponta Grossa", "Castro", "Palmeira"] },
    { id: "C19", regId: "REG_CAMPOS", name: "19 • Coord. Guarapuava", centrais: 16, staff: 44, vol: 590, tmeSec: 580, tmaSec: 440, nps: 85, fcr: 90.6, municipios: ["Guarapuava", "Prudentópolis"] },
    { id: "C20", regId: "REG_CAMPOS", name: "20 • Coord. Campo Mourão", centrais: 14, staff: 34, vol: 430, tmeSec: 545, tmaSec: 425, nps: 87, fcr: 91.4, municipios: ["Campo Mourão", "Goioerê"] },
    { id: "C21", regId: "REG_CAMPOS", name: "21 • Coord. Telêmaco Borba", centrais: 14, staff: 34, vol: 410, tmeSec: 555, tmaSec: 430, nps: 86, fcr: 90.9, municipios: ["Telêmaco Borba", "Jaguariaíva"] },
    { id: "C22", regId: "REG_CAMPOS", name: "22 • Coord. União da Vitória / Irati", centrais: 12, staff: 30, vol: 340, tmeSec: 530, tmaSec: 420, nps: 88, fcr: 91.7, municipios: ["União da Vitória", "Irati"] },
  ];

  // Centrais de Relacionamento e Atendentes com detalhamento completo de indicadores
  const CENTRAIS_SAMPLE = [
    {
      id: "AG_REBOUCAS",
      coordId: "C01",
      municipio: "Curitiba",
      name: "Central Rebouças (Curitiba)",
      staff: 6,
      vol: 142,
      tmeSec: 690,
      tmaSec: 465,
      nps: 79,
      fcr: 89.0,
      status: "Sobrecarga Fila Convencional",
      statusClass: "tag-red",
      attendants: [
        {
          id: "AT_101",
          name: "Atendente #101 • Guichê 01 (Preferencial)",
          guiche: "Guichê 01",
          profile: "Sênior • Preferencial Legal",
          vol: 28,
          resolved: 26,
          transferred: 1,
          unresolved: 1,
          evalWith: 23,
          evalWithout: 5,
          idleSec: 110,
          activeHours: "05h 42m",
          tmeSec: 390,
          tmaSec: 430,
          nps: 90,
          stars: "4,9 ★",
          fcr: 93.5,
          lunchShift: "1º Turno (12h00–13h00)",
          status: "Em Atendimento (Normal)",
          tickets: [
            { code: "P-042", queue: "Preferencial Legal (Idoso 60+)", service: "Troca de Titularidade", tmeSec: 360, tmaSec: 410, nps: 10, outcome: "✓ Resolvido no 1º Atendimento" },
            { code: "P-041", queue: "Preferencial Legal (Idoso 60+)", service: "Contestação de Fatura", tmeSec: 410, tmaSec: 445, nps: 9, outcome: "✓ Resolvido (Fatura Retificada)" },
            { code: "D-019", queue: "Preferencial Legal (PcD/TEA)", service: "Cadastro Tarifa Social", tmeSec: 380, tmaSec: 420, nps: 10, outcome: "✓ Resolvido (Benefício Ativo)" },
            { code: "G-011", queue: "Preferencial Legal (Gestante)", service: "Parcelamento de Débitos", tmeSec: 405, tmaSec: 440, nps: 9, outcome: "✓ Resolvido (Acordo Formalizado)" },
          ],
        },
        {
          id: "AT_102",
          name: "Atendente #102 • Guichê 02 (Convencional)",
          guiche: "Guichê 02",
          profile: "Pleno • Convencional e Co-atendimento",
          vol: 31,
          resolved: 28,
          transferred: 2,
          unresolved: 1,
          evalWith: 24,
          evalWithout: 7,
          idleSec: 95,
          activeHours: "06h 05m",
          tmeSec: 635,
          tmaSec: 480,
          nps: 82,
          stars: "4,6 ★",
          fcr: 89.2,
          lunchShift: "2º Turno (13h00–14h00)",
          status: "Em Atendimento (Normal)",
          tickets: [
            { code: "C-104", queue: "Convencional", service: "Contestação de Fatura", tmeSec: 650, tmaSec: 490, nps: 8, outcome: "✓ Resolvido (Revisão Hidrômetro)" },
            { code: "AG-205", queue: "Agendado • Transferida", service: "Parcelamento + Titularidade", tmeSec: 590, tmaSec: 470, nps: 9, outcome: "✓ Resolvido (Co-atendimento)" },
            { code: "C-102", queue: "Convencional", service: "2ª Via / Revisão Cadastral", tmeSec: 660, tmaSec: 460, nps: null, outcome: "✓ Resolvido (Sem avaliação)" },
          ],
        },
        {
          id: "AT_103",
          name: "Atendente #103 • Guichê 03 (Convencional)",
          guiche: "Guichê 03",
          profile: "Pleno • Convencional Geral",
          vol: 34,
          resolved: 29,
          transferred: 2,
          unresolved: 3,
          evalWith: 25,
          evalWithout: 9,
          idleSec: 40,
          activeHours: "06h 28m",
          tmeSec: 810,
          tmaSec: 530,
          nps: 72,
          stars: "4,1 ★",
          fcr: 85.4,
          lunchShift: "1º Turno (12h00–13h00)",
          status: "Alerta TMA / Fila Alta",
          tickets: [
            { code: "C-105", queue: "Convencional", service: "Parcelamento de Débitos", tmeSec: 840, tmaSec: 530, nps: 7, outcome: "✓ Resolvido" },
            { code: "C-103", queue: "Convencional", service: "Ligação Nova de Esgoto", tmeSec: 790, tmaSec: 560, nps: 6, outcome: "⚠️ Não Resolvido (Exige Vistoria)" },
            { code: "C-106", queue: "Convencional", service: "Religação de Água", tmeSec: 800, tmaSec: 500, nps: 8, outcome: "✓ Resolvido" },
          ],
        },
        {
          id: "AT_104",
          name: "Atendente #104 • Guichê 04 (Agendados)",
          guiche: "Guichê 04",
          profile: "Pleno • Hora Marcada",
          vol: 25,
          resolved: 24,
          transferred: 0,
          unresolved: 1,
          evalWith: 21,
          evalWithout: 4,
          idleSec: 520,
          activeHours: "04h 50m",
          tmeSec: 195,
          tmaSec: 390,
          nps: 93,
          stars: "4,9 ★",
          fcr: 94.8,
          lunchShift: "2º Turno (13h00–14h00)",
          status: "Baixa Ocupação",
          tickets: [
            { code: "AG-203", queue: "Agendado", service: "Ligação Nova de Água", tmeSec: 180, tmaSec: 395, nps: 10, outcome: "✓ Resolvido no Horário" },
            { code: "AG-204", queue: "Agendado", service: "Troca de Titularidade", tmeSec: 210, tmaSec: 385, nps: 9, outcome: "✓ Resolvido no Horário" },
          ],
        },
      ],
    },
    {
      id: "AG_PINHEIRINHO",
      coordId: "C02",
      municipio: "Curitiba",
      name: "Posto Pinheirinho — Rua da Cidadania (Curitiba)",
      staff: 4,
      vol: 96,
      tmeSec: 615,
      tmaSec: 470,
      nps: 82,
      fcr: 90.4,
      status: "Atenção Preferencial Legal",
      statusClass: "tag-amber",
      attendants: [
        {
          id: "AT_301",
          name: "Atendente #301 • Guichê 01 (Pinheirinho)",
          guiche: "Guichê 01",
          profile: "Pleno • Preferencial",
          vol: 34,
          resolved: 30,
          transferred: 2,
          unresolved: 2,
          evalWith: 26,
          evalWithout: 8,
          idleSec: 35,
          activeHours: "06h 15m",
          tmeSec: 640,
          tmaSec: 495,
          nps: 79,
          stars: "4,4 ★",
          fcr: 88.5,
          lunchShift: "1º Turno (12h00–13h00)",
          status: "Alta Demanda Tarifa Social",
          tickets: [
            { code: "P-310", queue: "Preferencial Legal", service: "Cadastro Tarifa Social", tmeSec: 650, tmaSec: 510, nps: 8, outcome: "✓ Resolvido" },
            { code: "P-311", queue: "Preferencial Legal", service: "Parcelamento de Débitos", tmeSec: 630, tmaSec: 480, nps: 8, outcome: "✓ Resolvido" },
          ],
        },
        {
          id: "AT_302",
          name: "Atendente #302 • Guichê 02 (Pinheirinho)",
          guiche: "Guichê 02",
          profile: "Pleno • Convencional",
          vol: 32,
          resolved: 30,
          transferred: 1,
          unresolved: 1,
          evalWith: 25,
          evalWithout: 7,
          idleSec: 80,
          activeHours: "05h 55m",
          tmeSec: 520,
          tmaSec: 455,
          nps: 85,
          stars: "4,7 ★",
          fcr: 91.2,
          lunchShift: "2º Turno (13h00–14h00)",
          status: "Dentro da Meta",
          tickets: [
            { code: "C-304", queue: "Convencional", service: "Troca de Titularidade", tmeSec: 520, tmaSec: 455, nps: 9, outcome: "✓ Resolvido" },
          ],
        },
        {
          id: "AT_303",
          name: "Atendente #303 • Guichê 03 (Pinheirinho)",
          guiche: "Guichê 03",
          profile: "Sênior • Agendados e Religação",
          vol: 30,
          resolved: 28,
          transferred: 1,
          unresolved: 1,
          evalWith: 24,
          evalWithout: 6,
          idleSec: 375,
          activeHours: "05h 10m",
          tmeSec: 210,
          tmaSec: 410,
          nps: 91,
          stars: "4,9 ★",
          fcr: 93.0,
          lunchShift: "2º Turno (13h00–14h00)",
          status: "Dentro da Meta",
          tickets: [
            { code: "AG-320", queue: "Agendado", service: "Revisão de Consumo", tmeSec: 170, tmaSec: 400, nps: 10, outcome: "✓ Resolvido" },
          ],
        },
      ],
    },
    {
      id: "AG_BOAVISTA",
      coordId: "C01",
      municipio: "Curitiba",
      name: "Posto Boa Vista — Rua da Cidadania (Curitiba)",
      staff: 3,
      vol: 64,
      tmeSec: 380,
      tmaSec: 390,
      nps: 92,
      fcr: 94.1,
      status: "Operação Estável ✓",
      statusClass: "tag-green",
      attendants: [
        {
          id: "AT_501",
          name: "Atendente #501 • Guichê 01 (Boa Vista)",
          guiche: "Guichê 01",
          profile: "Sênior • Geral",
          vol: 23,
          resolved: 22,
          transferred: 0,
          unresolved: 1,
          evalWith: 20,
          evalWithout: 3,
          idleSec: 140,
          activeHours: "05h 20m",
          tmeSec: 260,
          tmaSec: 370,
          nps: 94,
          stars: "5,0 ★",
          fcr: 95.0,
          lunchShift: "1º Turno (12h00–13h00)",
          status: "Excelente Desempenho",
          tickets: [
            { code: "P-512", queue: "Preferencial Legal", service: "2ª Via e Débito Automático", tmeSec: 260, tmaSec: 360, nps: 10, outcome: "✓ Resolvido" },
          ],
        },
        {
          id: "AT_502",
          name: "Atendente #502 • Guichê 02 (Boa Vista)",
          guiche: "Guichê 02",
          profile: "Pleno • Convencional",
          vol: 21,
          resolved: 20,
          transferred: 0,
          unresolved: 1,
          evalWith: 18,
          evalWithout: 3,
          idleSec: 165,
          activeHours: "05h 05m",
          tmeSec: 390,
          tmaSec: 400,
          nps: 91,
          stars: "4,8 ★",
          fcr: 93.2,
          lunchShift: "2º Turno (13h00–14h00)",
          status: "Dentro da Meta",
          tickets: [
            { code: "C-501", queue: "Convencional", service: "Troca de Titularidade", tmeSec: 390, tmaSec: 410, nps: 9, outcome: "✓ Resolvido" },
          ],
        },
        {
          id: "AT_503",
          name: "Atendente #503 • Guichê 03 (Boa Vista)",
          guiche: "Guichê 03",
          profile: "Pleno • Agendados",
          vol: 20,
          resolved: 19,
          transferred: 0,
          unresolved: 1,
          evalWith: 17,
          evalWithout: 3,
          idleSec: 190,
          activeHours: "04h 55m",
          tmeSec: 180,
          tmaSec: 385,
          nps: 92,
          stars: "4,9 ★",
          fcr: 94.0,
          lunchShift: "1º Turno (12h00–13h00)",
          status: "Dentro da Meta",
          tickets: [
            { code: "AG-518", queue: "Agendado", service: "Ligação Nova de Esgoto", tmeSec: 150, tmaSec: 380, nps: 10, outcome: "✓ Resolvido" },
          ],
        },
      ],
    },
    {
      id: "AG_LONDRINA",
      coordId: "C06",
      municipio: "Londrina",
      name: "Central Londrina Centro",
      staff: 8,
      vol: 185,
      tmeSec: 635,
      tmaSec: 450,
      nps: 83,
      fcr: 90.5,
      status: "Atenção Pico Almoço",
      statusClass: "tag-amber",
      attendants: [
        {
          id: "AT_601",
          name: "Atendente #601 • Guichê 01 (Londrina)",
          guiche: "Guichê 01",
          profile: "Sênior • Geral",
          vol: 38,
          resolved: 35,
          transferred: 1,
          unresolved: 2,
          evalWith: 30,
          evalWithout: 8,
          idleSec: 60,
          activeHours: "06h 10m",
          tmeSec: 590,
          tmaSec: 445,
          nps: 84,
          stars: "4,7 ★",
          fcr: 90.8,
          lunchShift: "1º Turno",
          status: "Ativo",
          tickets: [
            { code: "C-601", queue: "Convencional", service: "Parcelamento de Débitos", tmeSec: 590, tmaSec: 445, nps: 9, outcome: "✓ Resolvido" },
          ],
        },
        {
          id: "AT_602",
          name: "Atendente #602 • Guichê 02 (Londrina)",
          guiche: "Guichê 02",
          profile: "Pleno • Convencional",
          vol: 41,
          resolved: 37,
          transferred: 2,
          unresolved: 2,
          evalWith: 31,
          evalWithout: 10,
          idleSec: 45,
          activeHours: "06h 25m",
          tmeSec: 650,
          tmaSec: 460,
          nps: 81,
          stars: "4,5 ★",
          fcr: 89.9,
          lunchShift: "2º Turno",
          status: "Alerta Fila",
          tickets: [
            { code: "C-604", queue: "Convencional", service: "Contestação de Fatura", tmeSec: 650, tmaSec: 460, nps: 8, outcome: "✓ Resolvido" },
          ],
        },
      ],
    },
    {
      id: "AG_MARINGA",
      coordId: "C07",
      municipio: "Maringá",
      name: "Central Maringá Brasil",
      staff: 7,
      vol: 158,
      tmeSec: 420,
      tmaSec: 405,
      nps: 91,
      fcr: 93.8,
      status: "Benchmark Estadual ★",
      statusClass: "tag-green",
      attendants: [
        {
          id: "AT_701",
          name: "Atendente #701 • Guichê 01 (Maringá)",
          guiche: "Guichê 01",
          profile: "Sênior • Benchmark",
          vol: 36,
          resolved: 35,
          transferred: 0,
          unresolved: 1,
          evalWith: 31,
          evalWithout: 5,
          idleSec: 110,
          activeHours: "05h 50m",
          tmeSec: 390,
          tmaSec: 395,
          nps: 93,
          stars: "4,9 ★",
          fcr: 94.5,
          lunchShift: "1º Turno",
          status: "Benchmark ★",
          tickets: [
            { code: "AG-702", queue: "Agendado", service: "Troca de Titularidade", tmeSec: 390, tmaSec: 395, nps: 10, outcome: "✓ Resolvido" },
          ],
        },
      ],
    },
  ];

  // Estado central da Tela Estratégica
  const state = {
    regiao: "ALL",
    coordenacao: "ALL",
    municipio: "ALL",
    central: "ALL",
    atendente: "ALL",
    sgcEvent: "vencimento_lote",
    predHorizonDays: 7,
    predTargetTmeMin: 10,
    // Ajuste 1 e 2: Rastreia individualmente por Evento SGC quais linhas tiveram "Aplicar Escala" clicado
    appliedReallocByEvent: {
      vencimento_lote: new Set(),
      avisos_corte: new Set(),
      feirao_negociacao: new Set(),
      normal_suavizado: new Set(),
    },
    // Ajuste 4: Telemetria contínua que atualiza a cada 30s (oscilando valores e status entre Acima da Meta e Dentro da Meta)
    telemetryStep: 0,
    countdownSec: 30,
    tsMetric: "tme_tma",
    ssrsSchedules: [
      {
        title: "Relatório Executivo Estadual (22 Coordenações e 382 Centrais)",
        dest: "Diretoria Comercial, Superintendências e 22 Coordenações",
        freq: "Diário (07:00 — Fechamento D-1)",
        format: "PDF Executivo + Planilha XLSX (Via SSRS Read-Replica)",
      },
      {
        title: "Relatório Regulatório de SLA e Tempos de Fila (Fiscalização / AGEPAR)",
        dest: "Órgãos Fiscalizadores, Auditoria Interna e Ouvidoria",
        freq: "Mensal (1º Dia Útil — Consolidado)",
        format: "Pacote Auditável CSV / Parquet (Anonimizado LGPD)",
      },
    ],
  };

  // Perfis de oscilação em tempo real (a cada 30 segundos) para demonstrar transição de status (ex: Acima da Meta <-> Dentro da Meta)
  const TELEMETRY_DELTAS = [
    { tmeDeltaSec: +52, tmaDeltaSec: +12, volDelta: 0, avoidedDelta: 0, evalDelta: 0, npsDelta: 0, fcrDelta: 0.0 }, // Ciclo 0: TME Macro ~10m 24s (Acima da Meta 10m!)
    { tmeDeltaSec: -38, tmaDeltaSec: -8, volDelta: +24, avoidedDelta: +9, evalDelta: +18, npsDelta: +1, fcrDelta: +0.3 }, // Ciclo 1: TME Macro ~08m 54s (Dentro da Meta <= 10m!)
    { tmeDeltaSec: +68, tmaDeltaSec: +15, volDelta: +52, avoidedDelta: +19, evalDelta: +39, npsDelta: -1, fcrDelta: -0.2 }, // Ciclo 2: TME Macro ~10m 40s (Acima da Meta 10m!)
    { tmeDeltaSec: -55, tmaDeltaSec: -14, volDelta: +81, avoidedDelta: +31, evalDelta: +64, npsDelta: +2, fcrDelta: +0.5 }, // Ciclo 3: TME Macro ~08m 37s (Dentro da Meta <= 10m!)
  ];

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function formatSec(sec) {
    const s = Math.max(0, Math.round(sec));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}m ${String(r).padStart(2, "0")}s`;
  }

  function formatNum(n) {
    return Number(n).toLocaleString("pt-BR");
  }

  function currentHHMMSS() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  }

  // =========================================================================
  // AJUSTE 4: RELÓGIO 1s E ATUALIZAÇÃO CONTÍNUA DOS INDICADORES A CADA 30 SEGUNDOS
  // =========================================================================
  function triggerTelemetryCycleUpdate() {
    state.telemetryStep = (state.telemetryStep + 1) % TELEMETRY_DELTAS.length;
    state.countdownSec = 30;
    $("#last-kpi-update-time").textContent = currentHHMMSS();
    $("#kpi-countdown-sec").textContent = "30";

    renderExecutiveTop();
    renderHierarchyDrillTable();

    // Destaca visualmente os cartões de KPI atualizados
    $$(".kpi-card").forEach((card) => {
      card.classList.add("kpi-flash");
      setTimeout(() => card.classList.remove("kpi-flash"), 900);
    });
  }

  setInterval(() => {
    $("#live-clock-display").textContent = currentHHMMSS();
    state.countdownSec -= 1;
    if (state.countdownSec <= 0) {
      triggerTelemetryCycleUpdate();
    } else {
      $("#kpi-countdown-sec").textContent = String(state.countdownSec);
    }
  }, 1000);

  $("#btn-force-kpi-tick").addEventListener("click", triggerTelemetryCycleUpdate);

  // =========================================================================
  // FILTROS HIERÁRQUICOS EM CASCATA (5 NÍVEIS) E BREADCRUMB DE DRILL-DOWN
  // =========================================================================
  function populateFilterDropdowns() {
    const selCoord = $("#filter-coordenacao");
    const validCoords = COORDENACOES_22.filter(
      (c) => state.regiao === "ALL" || c.regId === state.regiao
    );
    selCoord.innerHTML = `<option value="ALL">Todas as Coordenações (${validCoords.length})</option>`;
    validCoords.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c.id;
      opt.textContent = `${c.name} (${c.centrais} centrais)`;
      selCoord.appendChild(opt);
    });
    if (!validCoords.some((c) => c.id === state.coordenacao)) {
      state.coordenacao = "ALL";
    }
    selCoord.value = state.coordenacao;

    const selMun = $("#filter-municipio");
    const munSet = new Set();
    validCoords
      .filter((c) => state.coordenacao === "ALL" || c.id === state.coordenacao)
      .forEach((c) => c.municipios.forEach((m) => munSet.add(m)));
    const munList = Array.from(munSet);
    selMun.innerHTML = `<option value="ALL">Todos os Municípios (${munList.length})</option>`;
    munList.forEach((m) => {
      const opt = document.createElement("option");
      opt.value = m;
      opt.textContent = m;
      selMun.appendChild(opt);
    });
    if (!munList.includes(state.municipio)) {
      state.municipio = "ALL";
    }
    selMun.value = state.municipio;

    const selCentral = $("#filter-central");
    const validCoordIds = new Set(
      validCoords
        .filter((c) => state.coordenacao === "ALL" || c.id === state.coordenacao)
        .map((c) => c.id)
    );
    const validCentrais = CENTRAIS_SAMPLE.filter(
      (ag) =>
        validCoordIds.has(ag.coordId) &&
        (state.municipio === "ALL" || ag.municipio === state.municipio)
    );
    selCentral.innerHTML = `<option value="ALL">Todas as Centrais no Escopo</option>`;
    validCentrais.forEach((ag) => {
      const opt = document.createElement("option");
      opt.value = ag.id;
      opt.textContent = ag.name;
      selCentral.appendChild(opt);
    });
    if (!validCentrais.some((ag) => ag.id === state.central)) {
      state.central = "ALL";
    }
    selCentral.value = state.central;

    const selAtend = $("#filter-atendente");
    const attendantsList = [];
    validCentrais
      .filter((ag) => state.central === "ALL" || ag.id === state.central)
      .forEach((ag) => ag.attendants.forEach((at) => attendantsList.push(at)));
    selAtend.innerHTML = `<option value="ALL">Todos os Atendentes no Escopo</option>`;
    attendantsList.forEach((at) => {
      const opt = document.createElement("option");
      opt.value = at.id;
      opt.textContent = at.name;
      selAtend.appendChild(opt);
    });
    if (!attendantsList.some((at) => at.id === state.atendente)) {
      state.atendente = "ALL";
    }
    selAtend.value = state.atendente;

    renderBreadcrumbs();
  }

  function renderBreadcrumbs() {
    const trail = $("#drill-breadcrumb");
    const crumbs = [
      {
        label: "🌐 Rede Estadual PR (382 Centrais / 22 Coord.)",
        action: () => {
          state.regiao = "ALL";
          state.coordenacao = "ALL";
          state.municipio = "ALL";
          state.central = "ALL";
          state.atendente = "ALL";
          refreshAll();
        },
      },
    ];

    if (state.regiao !== "ALL") {
      const rObj = REGIONS.find((r) => r.id === state.regiao);
      crumbs.push({
        label: `📍 ${rObj ? rObj.name : state.regiao}`,
        action: () => {
          state.coordenacao = "ALL";
          state.municipio = "ALL";
          state.central = "ALL";
          state.atendente = "ALL";
          refreshAll();
        },
      });
    }

    if (state.coordenacao !== "ALL") {
      const cObj = COORDENACOES_22.find((c) => c.id === state.coordenacao);
      crumbs.push({
        label: `🏢 ${cObj ? cObj.name : state.coordenacao}`,
        action: () => {
          state.municipio = "ALL";
          state.central = "ALL";
          state.atendente = "ALL";
          refreshAll();
        },
      });
    }

    if (state.municipio !== "ALL") {
      crumbs.push({
        label: `🏙️ ${state.municipio}`,
        action: () => {
          state.central = "ALL";
          state.atendente = "ALL";
          refreshAll();
        },
      });
    }

    if (state.central !== "ALL") {
      const agObj = CENTRAIS_SAMPLE.find((a) => a.id === state.central);
      crumbs.push({
        label: `🏛️ ${agObj ? agObj.name : state.central}`,
        action: () => {
          state.atendente = "ALL";
          refreshAll();
        },
      });
    }

    if (state.atendente !== "ALL") {
      let attName = state.atendente;
      for (const ag of CENTRAIS_SAMPLE) {
        const found = ag.attendants.find((a) => a.id === state.atendente);
        if (found) attName = found.name;
      }
      crumbs.push({
        label: `🎧 ${attName}`,
        action: () => {},
      });
    }

    trail.innerHTML = "";
    crumbs.forEach((c, idx) => {
      const span = document.createElement("span");
      span.className = `crumb${idx === crumbs.length - 1 ? " active" : ""}`;
      span.textContent = c.label;
      span.addEventListener("click", c.action);
      trail.appendChild(span);
    });

    $("#btn-drill-up").disabled = crumbs.length <= 1;
  }

  $("#btn-drill-up").addEventListener("click", () => {
    if (state.atendente !== "ALL") state.atendente = "ALL";
    else if (state.central !== "ALL") state.central = "ALL";
    else if (state.municipio !== "ALL") state.municipio = "ALL";
    else if (state.coordenacao !== "ALL") state.coordenacao = "ALL";
    else if (state.regiao !== "ALL") state.regiao = "ALL";
    refreshAll();
  });

  $("#filter-regiao").addEventListener("change", (e) => {
    state.regiao = e.target.value;
    state.coordenacao = "ALL";
    state.municipio = "ALL";
    state.central = "ALL";
    state.atendente = "ALL";
    refreshAll();
  });

  $("#filter-coordenacao").addEventListener("change", (e) => {
    state.coordenacao = e.target.value;
    if (state.coordenacao !== "ALL") {
      const cObj = COORDENACOES_22.find((c) => c.id === state.coordenacao);
      if (cObj) state.regiao = cObj.regId;
      $("#filter-regiao").value = state.regiao;
    }
    state.municipio = "ALL";
    state.central = "ALL";
    state.atendente = "ALL";
    refreshAll();
  });

  $("#filter-municipio").addEventListener("change", (e) => {
    state.municipio = e.target.value;
    state.central = "ALL";
    state.atendente = "ALL";
    refreshAll();
  });

  $("#filter-central").addEventListener("change", (e) => {
    state.central = e.target.value;
    if (state.central !== "ALL") {
      const agObj = CENTRAIS_SAMPLE.find((a) => a.id === state.central);
      if (agObj) {
        state.coordenacao = agObj.coordId;
        state.municipio = agObj.municipio;
        const cObj = COORDENACOES_22.find((c) => c.id === agObj.coordId);
        if (cObj) state.regiao = cObj.regId;
        $("#filter-regiao").value = state.regiao;
      }
    }
    state.atendente = "ALL";
    refreshAll();
  });

  $("#filter-atendente").addEventListener("change", (e) => {
    state.atendente = e.target.value;
    if (state.atendente !== "ALL" && state.central === "ALL") {
      for (const ag of CENTRAIS_SAMPLE) {
        if (ag.attendants.some((a) => a.id === state.atendente)) {
          state.central = ag.id;
          state.coordenacao = ag.coordId;
          state.municipio = ag.municipio;
          const cObj = COORDENACOES_22.find((c) => c.id === ag.coordId);
          if (cObj) state.regiao = cObj.regId;
          $("#filter-regiao").value = state.regiao;
          break;
        }
      }
    }
    refreshAll();
  });

  // =========================================================================
  // CÁLCULO AGREGADO OU INDIVIDUALIZADO CONFORME O ESCOPO E TELEMETRIA EM TEMPO REAL
  // =========================================================================
  function getCurrentEventAppliedSet() {
    if (!state.appliedReallocByEvent[state.sgcEvent]) {
      state.appliedReallocByEvent[state.sgcEvent] = new Set();
    }
    return state.appliedReallocByEvent[state.sgcEvent];
  }

  function getAppliedReallocRatio() {
    // Cada escala ajustada individualmente no evento atual reduz o TME em ~9% (até 3 escalas)
    const count = getCurrentEventAppliedSet().size;
    return Math.max(0.72, 1.0 - count * 0.09);
  }

  function computeScopedMetrics() {
    const bonusFactor = getAppliedReallocRatio();
    const delta = TELEMETRY_DELTAS[state.telemetryStep];
    const appliedCount = getCurrentEventAppliedSet().size;
    const extraStaff = appliedCount * 12;

    // Nível 5: Atendente Individual
    if (state.atendente !== "ALL") {
      for (const ag of CENTRAIS_SAMPLE) {
        const at = ag.attendants.find((a) => a.id === state.atendente);
        if (at) {
          return {
            scopeLabel: `${at.name} (${ag.name})`,
            centrais: 1,
            coords: 1,
            staff: 1,
            volume: at.vol + Math.max(0, Math.round(delta.volDelta / 25)),
            avoided: Math.round(at.vol * 0.25),
            evalTotal: at.evalWith + Math.max(0, Math.round(delta.evalDelta / 30)),
            tmeSec: Math.max(120, Math.round((at.tmeSec + delta.tmeDeltaSec * 0.6) * bonusFactor)),
            tmaSec: Math.max(240, at.tmaSec + delta.tmaDeltaSec),
            nps: Math.min(98, at.nps + delta.npsDelta + appliedCount),
            fcr: Math.min(98.5, at.fcr + delta.fcrDelta),
          };
        }
      }
    }

    // Nível 4: Central de Relacionamento Específica
    if (state.central !== "ALL") {
      const ag = CENTRAIS_SAMPLE.find((a) => a.id === state.central) || CENTRAIS_SAMPLE[0];
      return {
        scopeLabel: ag.name,
        centrais: 1,
        coords: 1,
        staff: ag.staff + appliedCount,
        volume: ag.vol + Math.max(0, Math.round(delta.volDelta / 8)),
        avoided: Math.round(ag.vol * 0.34) + Math.max(0, Math.round(delta.avoidedDelta / 8)),
        evalTotal: Math.round(ag.vol * 0.76) + Math.max(0, Math.round(delta.evalDelta / 8)),
        tmeSec: Math.max(180, Math.round((ag.tmeSec + delta.tmeDeltaSec) * bonusFactor)),
        tmaSec: Math.max(300, ag.tmaSec + delta.tmaDeltaSec),
        nps: Math.min(96, ag.nps + delta.npsDelta + appliedCount * 2),
        fcr: Math.min(97.5, ag.fcr + delta.fcrDelta),
      };
    }

    // Nível 3 ou 2: Município ou Coordenação Comercial
    if (state.coordenacao !== "ALL" || state.municipio !== "ALL") {
      const cObj =
        COORDENACOES_22.find((c) => c.id === state.coordenacao) ||
        COORDENACOES_22.find((c) => c.municipios.includes(state.municipio)) ||
        COORDENACOES_22[0];
      const munRatio = state.municipio !== "ALL" ? 0.65 : 1.0;
      const vol = Math.round(cObj.vol * munRatio) + Math.round(delta.volDelta * 0.3);
      return {
        scopeLabel:
          state.municipio !== "ALL"
            ? `Município: ${state.municipio} (${cObj.name})`
            : cObj.name,
        centrais: Math.max(1, Math.round(cObj.centrais * munRatio)),
        coords: 1,
        staff: Math.max(2, Math.round(cObj.staff * munRatio) + appliedCount * 2),
        volume: vol,
        avoided: Math.round(vol * 0.34),
        evalTotal: Math.round(vol * 0.76),
        tmeSec: Math.max(210, Math.round((cObj.tmeSec + delta.tmeDeltaSec) * bonusFactor)),
        tmaSec: Math.max(320, cObj.tmaSec + delta.tmaDeltaSec),
        nps: Math.min(95, cObj.nps + delta.npsDelta + appliedCount),
        fcr: Math.min(96.8, cObj.fcr + delta.fcrDelta),
      };
    }

    // Nível 1: Macro-Região
    if (state.regiao !== "ALL") {
      const rObj = REGIONS.find((r) => r.id === state.regiao) || REGIONS[0];
      const coordsInReg = COORDENACOES_22.filter((c) => c.regId === rObj.id).length;
      return {
        scopeLabel: rObj.name,
        centrais: rObj.centraisCount,
        coords: coordsInReg,
        staff: rObj.staffCount + Math.round(extraStaff / 2),
        volume: rObj.dailyVolume + Math.round(delta.volDelta * 0.5),
        avoided: rObj.avoidedVolume + Math.round(delta.avoidedDelta * 0.5),
        evalTotal: Math.round(rObj.dailyVolume * 0.76) + Math.round(delta.evalDelta * 0.5),
        tmeSec: Math.max(240, Math.round((rObj.tmeSec + delta.tmeDeltaSec) * bonusFactor)),
        tmaSec: Math.max(330, rObj.tmaSec + delta.tmaDeltaSec),
        nps: Math.min(95, rObj.nps + delta.npsDelta + appliedCount),
        fcr: Math.min(96.5, rObj.fcrPct + delta.fcrDelta),
      };
    }

    // Nível 0 (Macro Estadual): 382 Centrais / 22 Coordenações Comerciais
    // Base TME = 572s (09m 32s); com Ciclo 0 (+52s) fica em 624s (10m 24s -> Acima da Meta 10m);
    // com Ciclo 1 (-38s) cai para 534s (08m 54s -> Dentro da Meta <= 10m)!
    return {
      scopeLabel: "Rede Estadual do Paraná (382 Centrais / 22 Coordenações)",
      centrais: 382,
      coords: 22,
      staff: 1140 + extraStaff,
      volume: 18640 + delta.volDelta,
      avoided: 6330 + delta.avoidedDelta,
      evalTotal: 14280 + delta.evalDelta,
      tmeSec: Math.round((572 + delta.tmeDeltaSec) * bonusFactor),
      tmaSec: 438 + delta.tmaDeltaSec,
      nps: Math.min(94, 86 + delta.npsDelta + appliedCount),
      fcr: Math.min(96.0, 91.4 + delta.fcrDelta + appliedCount * 0.5),
    };
  }

  // =========================================================================
  // RENDERIZAÇÃO DOS KPIS CORPORATIVOS E PAINEL DO AQUALINO
  // =========================================================================
  function renderExecutiveTop() {
    const m = computeScopedMetrics();
    const targetTmeSec = state.predTargetTmeMin * 60;
    const isOverTme = m.tmeSec > targetTmeSec;

    $("#exec-tme-val").textContent = formatSec(m.tmeSec);
    $("#exec-tme-val").className = isOverTme ? "kpi-big text-red" : "kpi-big text-green";
    $("#exec-tme-tag").className = isOverTme ? "tag tag-red" : "tag tag-green";
    $("#exec-tme-tag").textContent = isOverTme
      ? `Acima da Meta (${state.predTargetTmeMin}m)`
      : `Meta ≤ ${state.predTargetTmeMin}m ✓`;

    const isOverTma = m.tmaSec > 480;
    $("#exec-tma-val").textContent = formatSec(m.tmaSec);
    $("#exec-tma-tag").className = isOverTma ? "tag tag-amber" : "tag tag-blue";
    $("#exec-tma-tag").textContent = isOverTma ? "Acima de 08m 00s" : "Meta ≤ 08m 00s ✓";

    $("#exec-nps-val").textContent = m.nps;
    $("#exec-nps-val").className = m.nps >= 85 ? "kpi-big text-green" : "kpi-big text-amber";
    $("#exec-nps-tag").className = m.nps >= 85 ? "tag tag-green" : "tag tag-amber";
    $("#exec-nps-tag").textContent = m.nps >= 85 ? "Meta NPS ≥ 85 ✓" : "Abaixo da Meta (85)";

    $("#exec-fcr-val").textContent = `${m.fcr.toFixed(1).replace(".", ",")}%`;
    $("#exec-eval-total").textContent = formatNum(m.evalTotal);

    $("#exec-centrais-val").textContent = formatNum(m.centrais);
    $("#exec-staff-val").textContent = formatNum(m.staff);
    $("#exec-net-tag").textContent = `${m.coords} Coordenação(ões)`;
    $("#exec-scope-caption").textContent = m.scopeLabel;

    $("#exec-volume-val").textContent = formatNum(m.volume);
    $("#exec-avoided-val").textContent = formatNum(m.avoided);

    const bubble = $("#aqualino-exec-bubble");
    if (!bubble.classList.contains("answering")) {
      if (!isOverTme) {
        $("#exec-alert-badge").className = "tag tag-green";
        $("#exec-alert-badge").textContent = `Operação Dentro da Meta ≤ ${state.predTargetTmeMin}m (${m.scopeLabel})`;
        bubble.innerHTML = `✅ <strong>Síntese Estratégica do Aqualino [${m.scopeLabel}]:</strong> O TME atual está em <strong>${formatSec(m.tmeSec)}</strong> (dentro da meta corporativa de <strong>≤ ${state.predTargetTmeMin}m 00s</strong>), com NPS em <strong>${m.nps}</strong> e resolutividade de <strong>${m.fcr.toFixed(1).replace(".", ",")}%</strong>.`;
      } else {
        $("#exec-alert-badge").className = "tag tag-red";
        $("#exec-alert-badge").textContent = `Alerta de TME Acima da Meta (${state.predTargetTmeMin}m) • ${m.scopeLabel}`;
        bubble.innerHTML = `🚨 <strong>Visão Estratégica do Aqualino [${m.scopeLabel}]:</strong> O TME em tempo real atingiu <strong>${formatSec(m.tmeSec)}</strong>, ultrapassando a meta de <strong>≤ ${state.predTargetTmeMin}m 00s</strong>. Você pode aplicar as escalas preditivas recomendadas abaixo para reequilibrar o atendimento!`;
      }
    }

    const currentEventApplied = getCurrentEventAppliedSet();
    const hasAppliedAny = currentEventApplied.size > 0;
    const alertsEl = $("#exec-critical-alerts");
    alertsEl.innerHTML = `
      <div class="alert-pill-card ${!isOverTme ? "normal" : "critical"}">
        <strong>${!isOverTme ? `✓ TME Equalizado (≤ ${state.predTargetTmeMin}m)` : `🚨 Alerta de Fila: TME em ${formatSec(m.tmeSec)}`}</strong>
        <span>${!isOverTme ? `TME atual (${formatSec(m.tmeSec)}) operando abaixo do teto corporativo.` : `Ultrapassou o parâmetro estipulado de ${state.predTargetTmeMin} min neste ciclo de tempo real.`}</span>
      </div>
      <div class="alert-pill-card ${hasAppliedAny ? "normal" : "warning"}">
        <strong>${hasAppliedAny ? `✓ ${currentEventApplied.size} Escala(s) Preditiva(s) Aplicada(s)` : "⚠️ Recomendação Preditiva de Efetivo (SGC)"}</strong>
        <span>${hasAppliedAny ? "Reforço de escala ativo para o evento comercial selecionado." : `Horizonte de ${state.predHorizonDays} dias sugere remanejar efetivo antes do pico do SGC.`}</span>
      </div>
      <div class="alert-pill-card normal">
        <strong>✓ Benchmark de Qualidade (NPS ${m.nps}): Monitoramento Contínuo</strong>
        <span>Atualizado automaticamente a cada 30 segundos com dados das Centrais.</span>
      </div>
    `;
  }

  // =========================================================================
  // AJUSTE 5: DRILL-DOWN MULTINÍVEL COM DETALHAMENTO INDIVIDUAL DO ATENDENTE (NÍVEL 5)
  // =========================================================================
  function renderHierarchyDrillTable() {
    const tbody = $("#hierarchy-drill-tbody");
    const thead = $("#hierarchy-drill-thead");
    const detailPanel = $("#attendant-detail-panel");
    tbody.innerHTML = "";

    const targetSec = state.predTargetTmeMin * 60;
    const factor = getAppliedReallocRatio();
    const delta = TELEMETRY_DELTAS[state.telemetryStep];

    // NÍVEL 5: Quando um Atendente Individual está selecionado, exibe seu Detalhamento Completo!
    if (state.atendente !== "ALL") {
      let selectedAtt = null;
      let parentCentral = null;
      for (const ag of CENTRAIS_SAMPLE) {
        const found = ag.attendants.find((a) => a.id === state.atendente);
        if (found) {
          selectedAtt = found;
          parentCentral = ag;
          break;
        }
      }

      if (selectedAtt && parentCentral) {
        const attTme = Math.max(120, Math.round((selectedAtt.tmeSec + delta.tmeDeltaSec * 0.6) * factor));
        const attTma = Math.max(240, selectedAtt.tmaSec + delta.tmaDeltaSec);
        const attIsOver = attTme > targetSec;

        $("#table-drill-level-tag").textContent = `Drill-Down Nível 5 • Detalhamento Individual do Atendente`;
        $("#table-drill-title").textContent = `Indicadores Individuais: ${selectedAtt.name} — ${parentCentral.name}`;

        detailPanel.classList.remove("hidden");
        detailPanel.innerHTML = `
          <div class="att-detail-header">
            <div>
              <span class="tag tag-teal">${selectedAtt.guiche} • ${selectedAtt.profile}</span>
              <h3 style="margin-top:4px;font-size:1rem;">🎧 ${selectedAtt.name} — ${parentCentral.name}</h3>
            </div>
            <button type="button" id="btn-back-to-central-attendants" class="btn btn-secondary btn-sm">
              ← Voltar para todos os atendentes de ${parentCentral.name}
            </button>
          </div>

          <div class="att-detail-grid">
            <div class="att-metric-tile">
              <small>TME Individual (Espera)</small>
              <strong class="${attIsOver ? "text-red" : "text-green"}">${formatSec(attTme)}</strong>
              <span>${attIsOver ? `Acima da Meta (${state.predTargetTmeMin}m)` : `Meta ≤ ${state.predTargetTmeMin}m ✓`}</span>
            </div>
            <div class="att-metric-tile">
              <small>TMA Individual (Guichê)</small>
              <strong>${formatSec(attTma)}</strong>
              <span>Tempo ativo hoje: ${selectedAtt.activeHours}</span>
            </div>
            <div class="att-metric-tile">
              <small>Satisfação &amp; NPS Individual</small>
              <strong class="text-green">NPS ${selectedAtt.nps} (${selectedAtt.stars})</strong>
              <span>${selectedAtt.evalWith} c/ aval. • ${selectedAtt.evalWithout} s/ aval.</span>
            </div>
            <div class="att-metric-tile">
              <small>Resolutividade &amp; Desfechos</small>
              <strong class="text-teal">${selectedAtt.fcr.toFixed(1).replace(".", ",")}% (${selectedAtt.vol} atend.)</strong>
              <span>✓ ${selectedAtt.resolved} resolv. | ⇄ ${selectedAtt.transferred} transf. | ⚠️ ${selectedAtt.unresolved} não resolv.</span>
            </div>
            <div class="att-metric-tile">
              <small>Tempo Ocioso no Guichê</small>
              <strong>${formatSec(selectedAtt.idleSec)}</strong>
              <span>Sem senha em atendimento ativo</span>
            </div>
            <div class="att-metric-tile">
              <small>Escala de Almoço</small>
              <strong>${selectedAtt.lunchShift}</strong>
              <span>Escalonamento da unidade</span>
            </div>
            <div class="att-metric-tile">
              <small>Status Atual do Guichê</small>
              <strong>${selectedAtt.status}</strong>
              <span>Monitorado em tempo real</span>
            </div>
            <div class="att-metric-tile">
              <small>Conformidade LGPD</small>
              <strong class="text-green">100% Anonimizado</strong>
              <span>Chamadas identificadas por senha</span>
            </div>
          </div>
        `;

        $("#btn-back-to-central-attendants").addEventListener("click", () => {
          state.atendente = "ALL";
          refreshAll();
        });

        thead.innerHTML = `
          <tr>
            <th>Código da Senha (LGPD)</th>
            <th>Tipo de Fila</th>
            <th>Serviço de Triagem</th>
            <th>Guichê / Atendente</th>
            <th>TME (Espera)</th>
            <th>TMA (Atendimento)</th>
            <th>Avaliação (NPS)</th>
            <th colspan="2">Desfecho Registrado no Guichê</th>
          </tr>
        `;

        selectedAtt.tickets.forEach((tk) => {
          const tkTme = Math.max(110, Math.round(tk.tmeSec * factor));
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td><strong>${tk.code}</strong></td>
            <td>${tk.queue}</td>
            <td>${tk.service}</td>
            <td>${selectedAtt.guiche}</td>
            <td><span class="tag ${tkTme > targetSec ? "tag-red" : "tag-green"}">${formatSec(tkTme)}</span></td>
            <td>${formatSec(tk.tmaSec)}</td>
            <td>${tk.nps !== null ? `<span class="tag ${tk.nps >= 9 ? "tag-green" : "tag-amber"}">NPS ${tk.nps}</span>` : `<span class="tag tag-blue">Sem aval.</span>`}</td>
            <td colspan="2">${tk.outcome}</td>
          `;
          tbody.appendChild(tr);
        });
        return;
      }
    }

    // Para os níveis 1 a 4, oculta o painel individual do atendente e restaura o cabeçalho padrão da tabela
    detailPanel.classList.add("hidden");
    thead.innerHTML = `
      <tr>
        <th>Unidade Organizacional / Geográfica</th>
        <th>Escopo / Centrais</th>
        <th>Volume Hoje</th>
        <th>TME (Espera)</th>
        <th>TMA (Atend.)</th>
        <th>NPS (Qualidade)</th>
        <th>Resolutividade</th>
        <th>Status Operacional</th>
        <th>Ação</th>
      </tr>
    `;

    // NÍVEL 4: Central selecionada -> Lista os Atendentes daquela Central
    if (state.central !== "ALL") {
      const ag = CENTRAIS_SAMPLE.find((a) => a.id === state.central) || CENTRAIS_SAMPLE[0];
      $("#table-drill-level-tag").textContent = `Drill-Down Nível 4 • Atendentes da Unidade (${ag.name})`;
      $("#table-drill-title").textContent = `Produtividade e Métricas por Guichê / Atendente — ${ag.name}`;

      ag.attendants.forEach((at) => {
        const tme = Math.max(120, Math.round((at.tmeSec + delta.tmeDeltaSec * 0.6) * factor));
        const isOver = tme > targetSec;
        const tr = document.createElement("tr");
        tr.className = "drill-row";
        tr.innerHTML = `
          <td><strong>${at.name}</strong></td>
          <td>${at.guiche} (${at.profile})</td>
          <td>${at.vol} senhas</td>
          <td><span class="tag ${isOver ? "tag-red" : "tag-green"}">${formatSec(tme)} (${isOver ? `Acima ${state.predTargetTmeMin}m` : `≤ ${state.predTargetTmeMin}m`})</span></td>
          <td>${formatSec(at.tmaSec)}</td>
          <td><span class="tag ${at.nps >= 85 ? "tag-green" : "tag-amber"}">NPS ${at.nps}</span></td>
          <td>${at.fcr.toFixed(1).replace(".", ",")}%</td>
          <td>${at.status}</td>
          <td><button type="button" class="btn btn-primary btn-sm">🔍 Selecionar Atendente →</button></td>
        `;
        tr.addEventListener("click", () => {
          state.atendente = at.id;
          refreshAll();
        });
        tbody.appendChild(tr);
      });
      return;
    }

    // NÍVEL 3: Coordenação ou Município selecionado -> Lista as Centrais de Relacionamento
    if (state.coordenacao !== "ALL" || state.municipio !== "ALL") {
      const cObj =
        COORDENACOES_22.find((c) => c.id === state.coordenacao) ||
        COORDENACOES_22.find((c) => c.municipios.includes(state.municipio)) ||
        COORDENACOES_22[0];
      $("#table-drill-level-tag").textContent = `Drill-Down Nível 3 • Centrais de Relacionamento (${cObj.name})`;
      $("#table-drill-title").textContent = `Centrais de Relacionamento e Agências — ${cObj.name}`;

      let list = CENTRAIS_SAMPLE.filter(
        (ag) =>
          ag.coordId === cObj.id &&
          (state.municipio === "ALL" || ag.municipio === state.municipio)
      );
      if (!list.length) {
        list = [
          {
            id: "AG_REBOUCAS",
            name: `Central Sede — ${state.municipio !== "ALL" ? state.municipio : cObj.municipios[0]}`,
            municipio: state.municipio !== "ALL" ? state.municipio : cObj.municipios[0],
            staff: Math.max(3, Math.round(cObj.staff * 0.4)),
            vol: Math.round(cObj.vol * 0.45),
            tmeSec: cObj.tmeSec,
            tmaSec: cObj.tmaSec,
            nps: cObj.nps,
            fcr: cObj.fcr,
            status: "Operação Monitorada",
            statusClass: "tag-green",
          },
        ];
      }

      list.forEach((ag) => {
        const tme = Math.max(180, Math.round((ag.tmeSec + delta.tmeDeltaSec) * factor));
        const isOver = tme > targetSec;
        const tr = document.createElement("tr");
        tr.className = "drill-row";
        tr.innerHTML = `
          <td><strong>${ag.name}</strong></td>
          <td>${ag.municipio} • ${ag.staff} atend.</td>
          <td>${formatNum(ag.vol)}</td>
          <td><span class="tag ${isOver ? "tag-red" : "tag-green"}">${formatSec(tme)} (${isOver ? `Acima ${state.predTargetTmeMin}m` : `≤ ${state.predTargetTmeMin}m`})</span></td>
          <td>${formatSec(ag.tmaSec)}</td>
          <td><span class="tag ${ag.nps >= 85 ? "tag-green" : "tag-amber"}">NPS ${ag.nps}</span></td>
          <td>${ag.fcr.toFixed(1).replace(".", ",")}%</td>
          <td><span class="tag ${isOver ? "tag-red" : "tag-green"}">${isOver ? "Acima da Meta" : "Dentro da Meta ✓"}</span></td>
          <td><button type="button" class="btn btn-secondary btn-sm">🔍 Ver Atendentes →</button></td>
        `;
        tr.addEventListener("click", () => {
          state.central = ag.id;
          refreshAll();
        });
        tbody.appendChild(tr);
      });
      return;
    }

    // NÍVEL 2: Região selecionada -> Lista as Coordenações Comerciais daquela Região
    if (state.regiao !== "ALL") {
      const rObj = REGIONS.find((r) => r.id === state.regiao);
      const coords = COORDENACOES_22.filter((c) => c.regId === state.regiao);
      $("#table-drill-level-tag").textContent = `Drill-Down Nível 2 • Coordenações Comerciais (${rObj.name})`;
      $("#table-drill-title").textContent = `Coordenações Comerciais da ${rObj.name}`;

      coords.forEach((c) => {
        const tme = Math.max(210, Math.round((c.tmeSec + delta.tmeDeltaSec) * factor));
        const isOver = tme > targetSec;
        const tr = document.createElement("tr");
        tr.className = "drill-row";
        tr.innerHTML = `
          <td><strong>${c.name}</strong></td>
          <td>${c.centrais} Centrais • ${c.staff} atend.</td>
          <td>${formatNum(c.vol)}</td>
          <td><span class="tag ${isOver ? "tag-red" : "tag-green"}">${formatSec(tme)} (${isOver ? `Acima ${state.predTargetTmeMin}m` : `≤ ${state.predTargetTmeMin}m`})</span></td>
          <td>${formatSec(c.tmaSec)}</td>
          <td><span class="tag ${c.nps >= 85 ? "tag-green" : "tag-amber"}">NPS ${c.nps}</span></td>
          <td>${c.fcr.toFixed(1).replace(".", ",")}%</td>
          <td><span class="tag ${isOver ? "tag-amber" : "tag-green"}">${isOver ? `Acima da Meta (${state.predTargetTmeMin}m)` : `Meta ≤ ${state.predTargetTmeMin}m ✓`}</span></td>
          <td><button type="button" class="btn btn-secondary btn-sm">🔍 Drill-Down →</button></td>
        `;
        tr.addEventListener("click", () => {
          state.coordenacao = c.id;
          refreshAll();
        });
        tbody.appendChild(tr);
      });
      return;
    }

    // NÍVEL 1 (Macro): Lista as 4 Macro-Regiões do Paraná
    $("#table-drill-level-tag").textContent =
      "Visão Hierárquica Interativa • Nível 1: 4 Macro-Regiões (22 Coordenações / 382 Centrais)";
    $("#table-drill-title").textContent =
      "Desempenho Consolidado por Macro-Região da SANEPAR (Clique em uma Região para Drill-Down)";

    REGIONS.forEach((r) => {
      const tme = Math.max(240, Math.round((r.tmeSec + delta.tmeDeltaSec) * factor));
      const isOver = tme > targetSec;
      const coordsCount = COORDENACOES_22.filter((c) => c.regId === r.id).length;
      const tr = document.createElement("tr");
      tr.className = "drill-row";
      tr.innerHTML = `
        <td><strong>${r.name}</strong></td>
        <td>${coordsCount} Coord. • ${r.centraisCount} Centrais</td>
        <td>${formatNum(r.dailyVolume + Math.round(delta.volDelta * 0.25))}</td>
        <td><span class="tag ${isOver ? "tag-red" : "tag-green"}">${formatSec(tme)} (${isOver ? `Acima ${state.predTargetTmeMin}m` : `≤ ${state.predTargetTmeMin}m`})</span></td>
        <td>${formatSec(r.tmaSec + delta.tmaDeltaSec)}</td>
        <td><span class="tag ${r.nps >= 85 ? "tag-green" : "tag-amber"}">NPS ${r.nps + delta.npsDelta}</span></td>
        <td>${r.fcrPct.toFixed(1).replace(".", ",")}%</td>
        <td><span class="tag ${isOver ? "tag-red" : "tag-green"}">${isOver ? `Acima da Meta (${state.predTargetTmeMin}m)` : `Meta ≤ ${state.predTargetTmeMin}m ✓`}</span></td>
        <td><button type="button" class="btn btn-secondary btn-sm">🔍 Ver Coordenações →</button></td>
      `;
      tr.addEventListener("click", () => {
        state.regiao = r.id;
        refreshAll();
      });
      tbody.appendChild(tr);
    });
  }

  // =========================================================================
  // AJUSTES 1, 2 E 3: INTELIGÊNCIA PREDITIVA (SGC × DEMANDA) COM CÁLCULO DINÂMICO
  // DE HORIZONTE E TME MÁXIMO, E BOTÕES INDIVIDUAIS "APLICAR ESCALA"
  // =========================================================================
  function renderPredictiveAndReallocation() {
    const ev = state.sgcEvent;
    const days = state.predHorizonDays;
    const targetMin = state.predTargetTmeMin;

    $("#pred-horizon-lbl").textContent = `Próximos ${days} dias`;
    $("#pred-target-tme-lbl").textContent = `${targetMin} min`;

    const baseConfigs = {
      vencimento_lote: {
        basePeakPct: 42,
        baseDailyTickets: 22400,
        baseDeficitAt10m: 38,
        baseTmeUnadjustedSec: 970, // 16m 10s
        recommendations: [
          {
            unit: "01 • Coord. Curitiba Centro-Leste (Central Rebouças)",
            baseStaffAdd: 4,
            descTemplate: (staff, d, t) =>
              `Cruzamento SGC aponta pico no Lote 01 nos próximos ${d} dias. Recomendado alocar +${staff} atendentes sêniores para manter o TME ≤ ${t} min.`,
          },
          {
            unit: "06 • Coord. Londrina (Central Londrina Centro)",
            baseStaffAdd: 3,
            descTemplate: (staff, d, t) =>
              `Previsão de alta procura em 2ª via e parcelamento na janela de ${d} dias. Remanejar +${staff} atendentes do backoffice regional (Meta ≤ ${t} min).`,
          },
          {
            unit: "18 • Coord. Ponta Grossa (Campos Gerais)",
            baseStaffAdd: 2,
            descTemplate: (staff, d, t) =>
              `Escalonar turnos de almoço (12h e 13h) e alocar +${staff} atendentes nos próximos ${d} dias para cumprir TME ≤ ${t} min.`,
          },
        ],
      },
      avisos_corte: {
        basePeakPct: 35,
        baseDailyTickets: 20800,
        baseDeficitAt10m: 29,
        baseTmeUnadjustedSec: 880, // 14m 40s
        recommendations: [
          {
            unit: "02 • Coord. Curitiba Sul-Oeste (Posto Pinheirinho)",
            baseStaffAdd: 3,
            descTemplate: (staff, d, t) =>
              `Lote SGC de avisos de corte impacta os próximos ${d} dias. Reforçar recepção e +${staff} guichês para manter TME ≤ ${t} min.`,
          },
          {
            unit: "12 • Coord. Cascavel & 13 • Coord. Foz do Iguaçu",
            baseStaffAdd: 2,
            descTemplate: (staff, d, t) =>
              `Abrir +${staff} guichês preferenciais para baixa rápida de comprovantes de religação durante os próximos ${d} dias (Meta ≤ ${t} min).`,
          },
        ],
      },
      feirao_negociacao: {
        basePeakPct: 50,
        baseDailyTickets: 25100,
        baseDeficitAt10m: 52,
        baseTmeUnadjustedSec: 1110, // 18m 30s
        recommendations: [
          {
            unit: "Rede Estadual — Maiores Centrais (Curitiba, Londrina, Maringá)",
            baseStaffAdd: 6,
            descTemplate: (staff, d, t) =>
              `Campanha de negociação nos próximos ${d} dias: ativar +${staff} células expressas de parcelamento para garantir TME ≤ ${t} min.`,
          },
          {
            unit: "Coordenações do Interior (Ponta Grossa, Cascavel, Foz)",
            baseStaffAdd: 4,
            descTemplate: (staff, d, t) =>
              `Ampliar vagas de agendamento vespertino e alocar +${staff} atendentes nos próximos ${d} dias (Meta ≤ ${t} min).`,
          },
        ],
      },
      normal_suavizado: {
        basePeakPct: -28,
        baseDailyTickets: 14900,
        baseDeficitAt10m: 0,
        baseTmeUnadjustedSec: 410, // 06m 50s
        recommendations: [
          {
            unit: "Otimização de Capacidade Estadual (22 Coordenações)",
            baseStaffAdd: 2,
            descTemplate: (staff, d, t) =>
              `Operação suavizada para os próximos ${d} dias (Meta ≤ ${t} min): direcionar ${staff} atendentes por regional para análise de protocolos digitais SGC.`,
          },
        ],
      },
    };

    const cfg = baseConfigs[ev] || baseConfigs.vencimento_lote;

    // Ajuste 3: O Horizonte de Previsão (days) e o TME Máximo Corporativo (targetMin) alteram os cálculos!
    const horizonFactor = 0.85 + (days / 7) * 0.15;
    const totalProjectedHorizonVolume = Math.round(cfg.baseDailyTickets * days * (0.92 + days * 0.01));
    const adjustedPeakPct = Math.round(cfg.basePeakPct * horizonFactor);

    const currentEventApplied = getCurrentEventAppliedSet();

    // Quanto menor o TME Máximo Corporativo (ex: 5 min em vez de 10 min), maior a necessidade de atendentes
    const tmeStrictnessFactor = 10 / targetMin;
    const rawDeficit = Math.round(cfg.baseDeficitAt10m * horizonFactor * tmeStrictnessFactor);
    const coveredByClickedButtons = currentEventApplied.size * Math.max(8, Math.round(rawDeficit / cfg.recommendations.length));
    const remainingDeficit = Math.max(0, rawDeficit - coveredByClickedButtons);

    const beforeTmeSec = Math.round(cfg.baseTmeUnadjustedSec * (0.9 + days * 0.015));
    const afterTmeSec = Math.min(
      targetMin * 60 - 25,
      Math.max(240, Math.round(beforeTmeSec * getAppliedReallocRatio() * (targetMin / 10) * 0.55))
    );

    $("#pred-peak-volume").textContent = `${adjustedPeakPct > 0 ? "+" : ""}${adjustedPeakPct}% (${formatNum(totalProjectedHorizonVolume)} atend. em ${days} dias)`;
    $("#pred-peak-volume").className = adjustedPeakPct > 0 ? "text-red" : "text-green";

    if (remainingDeficit === 0) {
      $("#pred-staff-deficit").textContent = `0 (Meta ≤ ${targetMin}m coberta p/ ${days} dias)`;
      $("#pred-staff-deficit").className = "text-green";
    } else {
      $("#pred-staff-deficit").textContent = `-${remainingDeficit} atendentes na rede (p/ TME ≤ ${targetMin}m)`;
      $("#pred-staff-deficit").className = "text-amber";
    }

    $("#pred-tme-saved").textContent = `De ${formatSec(beforeTmeSec)} p/ ${formatSec(afterTmeSec)} (Meta ≤ ${targetMin}m)`;

    const listEl = $("#reallocation-list");
    listEl.innerHTML = "";
    cfg.recommendations.forEach((rec, idx) => {
      const isThisApplied = currentEventApplied.has(idx);
      const staffNeeded = Math.max(1, Math.round(rec.baseStaffAdd * tmeStrictnessFactor * (days >= 10 ? 1.2 : 1.0)));

      const div = document.createElement("div");
      div.className = "realloc-item";
      div.innerHTML = `
        <div>
          <strong>${rec.unit}</strong>
          <p class="text-muted">${rec.descTemplate(staffNeeded, days, targetMin)}</p>
        </div>
        <button type="button" class="btn ${isThisApplied ? "btn-secondary" : "btn-teal"} btn-sm btn-apply-realloc">
          ${isThisApplied ? "✓ Escala Ajustada" : "Aplicar Escala"}
        </button>
      `;

      // Ajuste 1 e 2: Clicar em "Aplicar Escala" salva o estado por evento (state.sgcEvent) e por linha (idx)
      div.querySelector(".btn-apply-realloc").addEventListener("click", () => {
        const evSet = getCurrentEventAppliedSet();
        if (evSet.has(idx)) {
          evSet.delete(idx);
        } else {
          evSet.add(idx);
        }
        renderExecutiveTop();
        renderHierarchyDrillTable();
        renderPredictiveAndReallocation();
        renderHistoricalTimeSeries();
      });

      listEl.appendChild(div);
    });
  }

  // Ajuste 1: Ao escolher outro evento em "1. Evento Comercial do SGC", exibe "Aplicar Escala" caso ainda não tenha sido aplicado para aquele evento, ou "✓ Escala Ajustada" nas linhas já aplicadas daquele evento específico
  $("#select-sgc-event").addEventListener("change", (e) => {
    state.sgcEvent = e.target.value;
    refreshAll();
  });

  // Ajuste 3: Alterar "2. Horizonte de Previsão" ou "3. TME Máximo Corporativo" atualiza imediatamente os cálculos e status
  $("#range-pred-horizon").addEventListener("input", (e) => {
    state.predHorizonDays = Number(e.target.value);
    renderPredictiveAndReallocation();
    renderExecutiveTop();
  });

  $("#range-pred-target-tme").addEventListener("input", (e) => {
    state.predTargetTmeMin = Number(e.target.value);
    refreshAll();
  });

  $("#btn-aplicar-remanejamento-global").addEventListener("click", () => {
    const evSet = getCurrentEventAppliedSet();
    evSet.add(0);
    evSet.add(1);
    evSet.add(2);
    const img = $(".mascot-img");
    if (img) {
      img.classList.add("celebrate");
      setTimeout(() => img.classList.remove("celebrate"), 600);
    }
    refreshAll();
  });

  // =========================================================================
  // SÉRIES TEMPORAIS HISTÓRICAS E CORRELAÇÃO COM EVENTOS DO SGC E TI
  // =========================================================================
  $$("#timeseries-metric-tabs .chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$("#timeseries-metric-tabs .chip").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.tsMetric = btn.dataset.tsMetric;
      renderHistoricalTimeSeries();
    });
  });

  function renderHistoricalTimeSeries() {
    const grid = $("#historical-timeseries-chart");
    grid.innerHTML = "";
    const anyRealloc = getCurrentEventAppliedSet().size > 0;

    const seriesData = {
      tme_tma: {
        title: "Série Temporal (Jun/2026 a Nov/2026) — Evolução do TME (azul) e TMA (verde-água) em Minutos",
        months: [
          { m: "Jun/26", v1: 14.2, v2: 8.9, u1: "14,2m", u2: "8,9m", max: 16, event: "Pré-Triagem Digital" },
          { m: "Jul/26", v1: 13.5, v2: 8.6, u1: "13,5m", u2: "8,6m", max: 16, event: "Lote Corte SGC" },
          { m: "Ago/26", v1: 11.4, v2: 8.1, u1: "11,4m", u2: "8,1m", max: 16, event: "Suavização Dias 1–5" },
          { m: "Set/26", v1: 10.6, v2: 7.8, u1: "10,6m", u2: "7,8m", max: 16, event: "Recepção Gamificada" },
          { m: "Out/26", v1: 9.2, v2: 7.4, u1: "9,2m", u2: "7,4m", max: 16, event: "Contexto SGC Guichê" },
          { m: "Nov/26", v1: anyRealloc ? 6.8 : 8.7, v2: 7.3, u1: anyRealloc ? "6,8m" : "8,7m", u2: "7,3m", max: 16, event: "IA Preditiva Escalas" },
        ],
      },
      volume_sgc: {
        title: "Série Temporal (Jun/2026 a Nov/2026) — Atendimento Presencial (azul) vs. Retenção Digital/Recepção (verde-água)",
        months: [
          { m: "Jun/26", v1: 82, v2: 18, u1: "82%", u2: "18%", max: 100, event: "100% Balcão" },
          { m: "Jul/26", v1: 78, v2: 22, u1: "78%", u2: "22%", max: 100, event: "2ª Via Expressa SGC" },
          { m: "Ago/26", v1: 72, v2: 28, u1: "72%", u2: "28%", max: 100, event: "Agendamento Suave" },
          { m: "Set/26", v1: 69, v2: 31, u1: "69%", u2: "31%", max: 100, event: "Filtro Órgãos (156/Copel)" },
          { m: "Out/26", v1: 67, v2: 33, u1: "67%", u2: "33%", max: 100, event: "Check-in QR Code" },
          { m: "Nov/26", v1: 66, v2: 34, u1: "66%", u2: "34%", max: 100, event: "34% Fila Evitada" },
        ],
      },
      nps_fcr: {
        title: "Série Temporal (Jun/2026 a Nov/2026) — Evolução do Score NPS (azul) e Resolutividade 1º Atendimento (verde-água)",
        months: [
          { m: "Jun/26", v1: 74, v2: 84, u1: "NPS 74", u2: "84%", max: 100, event: "Baseline" },
          { m: "Jul/26", v1: 76, v2: 85, u1: "NPS 76", u2: "85%", max: 100, event: "Conferência Doc." },
          { m: "Ago/26", v1: 80, v2: 88, u1: "NPS 80", u2: "88%", max: 100, event: "Fim Filas Dias 1–5" },
          { m: "Set/26", v1: 83, v2: 89, u1: "NPS 83", u2: "89%", max: 100, event: "Gamificação Aqualino" },
          { m: "Out/26", v1: 85, v2: 91, u1: "NPS 85", u2: "91%", max: 100, event: "SGC Instantâneo" },
          { m: "Nov/26", v1: anyRealloc ? 90 : 86, v2: 93, u1: anyRealloc ? "NPS 90" : "NPS 86", u2: "93%", max: 100, event: "Meta Superada" },
        ],
      },
    };

    const cfg = seriesData[state.tsMetric] || seriesData.tme_tma;
    $("#timeseries-chart-title").textContent = cfg.title;

    cfg.months.forEach((item) => {
      const h1 = Math.max(15, Math.round((item.v1 / cfg.months[0].max) * 100));
      const h2 = Math.max(15, Math.round((item.v2 / cfg.months[0].max) * 100));
      const col = document.createElement("div");
      col.className = "ts-col";
      col.innerHTML = `
        <span class="ts-event-badge" title="Evento correlacionado no SGC/TI">${item.event}</span>
        <div class="ts-bars-pair">
          <div class="ts-bar-1" style="height: ${h1}%" title="${item.m}: ${item.u1}"></div>
          <div class="ts-bar-2" style="height: ${h2}%" title="${item.m}: ${item.u2}"></div>
        </div>
        <span class="ts-lbl">${item.m} (${item.u1} | ${item.u2})</span>
      `;
      grid.appendChild(col);
    });

    const corrEl = $("#sgc-correlation-cards");
    corrEl.innerHTML = `
      <div class="corr-item">
        <strong>Ago/2026 • Suavização de Agendamentos (Bloqueio Dias 01 a 05 no SGC):</strong> Reduziu em <strong>-41%</strong> os picos históricos de espera no início do mês nas 22 coordenações comerciais.
      </div>
      <div class="corr-item">
        <strong>Set/2026 • Triagem Digital + Atuação da Recepção Gamificada:</strong> Reteve <strong>34% da demanda espontânea</strong> (2ª via expressa e redirecionamento para Prefeitura 156 / COPEL) antes de gerar fila de guichê.
      </div>
      <div class="corr-item">
        <strong>Out/2026 • Contextualização Instantânea SGC na Chamada do Guichê:</strong> Reduziu o TMA médio estadual de <strong>08m 54s para 07m 18s</strong> (-18% no tempo de atendimento).
      </div>
    `;
  }

  // =========================================================================
  // RELATÓRIOS CONSOLIDADOS AUTOMÁTICOS (MICROSOFT REPORTING SERVICES - SSRS)
  // =========================================================================
  function renderSsrsSchedules() {
    const listEl = $("#ssrs-schedules-list");
    listEl.innerHTML = "";
    state.ssrsSchedules.forEach((s) => {
      const div = document.createElement("div");
      div.className = "ssrs-item";
      div.innerHTML = `
        <div>
          <strong>📊 ${s.title}</strong>
          <div class="text-muted">${s.dest} • <strong>${s.freq}</strong> • ${s.format}</div>
        </div>
        <span class="tag tag-green">Ativo no SSRS</span>
      `;
      listEl.appendChild(div);
    });
  }

  $("#form-agendar-relatorio").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = $("#select-report-template").value;
    const dest = $("#select-report-dest").value;
    const freq = $("#select-report-freq").value;
    const format = $("#select-report-format").value;

    state.ssrsSchedules.unshift({ title, dest, freq, format });
    renderSsrsSchedules();

    const fb = $("#report-emission-feedback");
    fb.textContent = `✓ Novo agendamento programado no Microsoft Reporting Services (SSRS): "${title}" (${freq}) — processamento 100% desacoplado do banco transacional!`;
    fb.classList.remove("hidden");
  });

  $("#btn-emitir-relatorio-agora").addEventListener("click", () => {
    const m = computeScopedMetrics();
    const template = $("#select-report-template").value;
    const format = $("#select-report-format").value;
    const fb = $("#report-emission-feedback");
    fb.innerHTML = `✓ <strong>Relatório gerado com sucesso via Microsoft Reporting Services (Read-Replica Desacoplada — 0% impacto no backend SGC):</strong><br/>Escopo: <strong>${m.scopeLabel}</strong> • Modelo: <em>${template}</em> (${format}) • Todos os registros anonimizados conforme LGPD.`;
    fb.classList.remove("hidden");
  });

  // =========================================================================
  // AUDITORIA IMUTÁVEL E RASTREABILIDADE (LGPD LEI Nº 13.709/2018)
  // =========================================================================
  function renderImmutableAuditTable() {
    const tbody = $("#immutable-audit-tbody");
    tbody.innerHTML = "";

    const rows = [
      {
        hash: "sha256:9f8a..c41e",
        unit: "01 • Central Rebouças (Curitiba)",
        code: "C-104",
        service: "Contestação de Fatura",
        times: "TME: 09m 12s | TMA: 07m 40s",
        nps: "NPS 9",
        event: "Checkout validado • Dados pessoais mascarados (LGPD)",
      },
      {
        hash: "sha256:4b2d..88a0",
        unit: "01 • Central Rebouças (Curitiba)",
        code: "P-042",
        service: "Troca de Titularidade",
        times: "TME: 05m 50s | TMA: 07m 10s",
        nps: "NPS 10",
        event: "Preferencial Legal • Documentos conferidos na recepção",
      },
      {
        hash: "sha256:7e11..19f3",
        unit: "06 • Central Londrina Centro",
        code: "AG-205",
        service: "Parcelamento de Débitos",
        times: "TME: 03m 10s | TMA: 06m 35s",
        nps: "NPS 10",
        event: "Atendimento agendado suavizado (fora dos dias 1–5)",
      },
      {
        hash: "sha256:3c90..b27d",
        unit: "07 • Central Maringá Brasil",
        code: "REC-318",
        service: "2ª Via Expressa / PIX",
        times: "TME: 01m 15s | TMA: —",
        nps: "NPS 10",
        event: "Atendimento evitado (Resolvido na Recepção)",
      },
      {
        hash: "sha256:6a54..02e9",
        unit: "12 • Central Cascavel",
        code: "C-412",
        service: "Religação de Água",
        times: "TME: 06m 45s | TMA: 05m 50s",
        nps: "NPS 9",
        event: "Ordem de religação integrada ao SGC",
      },
    ];

    rows.forEach((r) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><code>${r.hash}</code></td>
        <td><strong>${r.unit}</strong></td>
        <td><span class="tag tag-blue">${r.code}</span></td>
        <td>${r.service}</td>
        <td>${r.times}</td>
        <td><span class="tag tag-green">${r.nps}</span></td>
        <td>${r.event}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  $("#btn-verificar-integridade").addEventListener("click", () => {
    const banner = $("#integrity-check-banner");
    banner.textContent =
      "🛡️ Verificação criptográfica SHA-256 concluída: 100% dos registros de jornada das 382 Centrais estão íntegros, inalterados e anonimizados em conformidade com a Lei nº 13.709/2018 (LGPD).";
    banner.classList.remove("hidden");
  });

  // =========================================================================
  // MASCOTE AQUALINO RESPONDENDO DÚVIDAS DE UTILIZAÇÃO DA TELA DIRETAMENTE
  // =========================================================================
  function generateAqualinoStrategicAnswer(rawQuestion) {
    const q = (rawQuestion || "").toLowerCase();

    if (/(drill|nível|nivel|região|regiao|coordena|município|municipio|central|atendente|filtro)/i.test(q)) {
      return `Você pode navegar pelos <strong>5 níveis hierárquicos</strong> (<em>Região → 22 Coordenações Comerciais → Município → 382 Centrais de Relacionamento → Atendente Individual</em>) usando os 5 seletores no topo ou clicando diretamente nas linhas da tabela comparativa! Ao clicar em <strong>"🔍 Selecionar Atendente →"</strong>, a tela exibe o painel completo com os 8 indicadores individuais e as senhas atendidas por aquele profissional.`;
    }

    if (/(preditiv|sgc|escala|remanejamento|pico|dimensiona|horizonte)/i.test(q)) {
      return `No módulo <strong>Inteligência Preditiva (SGC × Operação Física)</strong>, selecione o evento do SGC, ajuste o <strong>Horizonte de Previsão (3 a 15 dias)</strong> e o <strong>TME Máximo Corporativo (5 a 15 min)</strong> para ver o recálculo imediato do volume e do déficit de efetivo. Ao clicar em <strong>"Aplicar Escala"</strong> em uma recomendação, apenas aquela linha daquele evento específico é marcada como <em>"✓ Escala Ajustada"</em> (e esse ajuste fica preservado para aquele evento caso você alterne entre diferentes eventos do SGC)!`;
    }

    if (/(relatório|relatorio|reporting|ssrs|desacopla|automático|automatico|backend)/i.test(q)) {
      return `Na <strong>Central de Relatórios Consolidados</strong>, toda a geração pesada de relatórios periódicos utiliza o <strong>Microsoft Reporting Services (SSRS)</strong> conectado a uma base analítica replicada (Read-Replica). Isso garante o <strong>desacoplamento de processamento</strong>, evitando qualquer sobrecarga nas aplicações transacionais de backend (SGC)!`;
    }

    if (/(históric|historic|série|serie|temporal|correlação|correlacao|ti|evento)/i.test(q)) {
      return `No bloco <strong>Séries Temporais & Correlação SGC/TI</strong>, você alterna entre 3 visões históricas (<em>TME & TMA</em>, <em>Volume Físico × Retenção Digital</em> e <em>NPS & Resolutividade</em>) e visualiza em cada mês o marco do evento comercial (SGC) ou de TI que explica a variação dos indicadores!`;
    }

    if (/(auditoria|imutável|imutavel|lgpd|13\.709|hash|segurança|seguranca|anonim)/i.test(q)) {
      return `Todos os eventos das 382 Centrais são gravados de forma inalterável com assinatura <strong>SHA-256</strong> (você pode testar clicando em <em>"🛡️ Verificar Integridade dos Logs"</em>). Em estrita observância à <strong>LGPD (Lei nº 13.709/2018)</strong>, nenhum dado pessoal de cidadão é exibido nos dashboards ou relatórios — apenas códigos de senha anonimizados (ex.: <code>C-104</code>, <code>P-042</code>).`;
    }

    return `Estou aqui para ajudar você a usar a <strong>Tela de Análises e Dashboards Estratégicos</strong>! Você pode filtrar pelos <strong>5 níveis organizacionais</strong> no topo (incluindo o detalhamento individual do atendente), simular <strong>picos do SGC e aplicar escalas individuais</strong>, acompanhar a <strong>atualização em tempo real a cada 30s</strong>, programar relatórios desacoplados no <strong>Microsoft Reporting Services (SSRS)</strong> ou auditar os logs sob conformidade <strong>LGPD</strong>.`;
  }

  function askAqualinoExec(questionText) {
    const q = (questionText || "").trim();
    if (!q) {
      $("#input-ask-aqualino-exec").focus();
      return;
    }

    const answerHtml = generateAqualinoStrategicAnswer(q);
    const bubble = $("#aqualino-exec-bubble");
    bubble.classList.add("answering");
    bubble.innerHTML = `
      💬 <strong>Sua dúvida sobre a tela:</strong> <em>"${q}"</em><br/>
      💧 <strong>Aqualino responde:</strong> ${answerHtml}
      <button type="button" id="btn-back-exec-summary" style="margin-left:8px;text-decoration:underline;cursor:pointer;border:none;background:none;color:var(--primary);font-weight:700;">
        ↺ Voltar à síntese executiva da rede
      </button>
    `;

    const btnBack = $("#btn-back-exec-summary");
    if (btnBack) {
      btnBack.addEventListener("click", () => {
        bubble.classList.remove("answering");
        renderExecutiveTop();
      });
    }

    const img = $(".mascot-img");
    if (img) {
      img.classList.add("celebrate");
      setTimeout(() => img.classList.remove("celebrate"), 600);
    }
  }

  $("#form-ask-aqualino-exec").addEventListener("submit", (e) => {
    e.preventDefault();
    askAqualinoExec($("#input-ask-aqualino-exec").value);
  });

  $$(".chip-ask-exec").forEach((chip) => {
    chip.addEventListener("click", () => {
      $("#input-ask-aqualino-exec").value = chip.dataset.q;
      askAqualinoExec(chip.dataset.q);
    });
  });

  const btnVoiceExec = $("#btn-voice-aqualino-exec");
  let isListeningExec = false;
  btnVoiceExec.addEventListener("click", () => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!isListeningExec && SpeechRec) {
      try {
        const rec = new SpeechRec();
        rec.lang = "pt-BR";
        isListeningExec = true;
        btnVoiceExec.classList.add("listening");
        btnVoiceExec.textContent = "🛑 Ouvindo...";
        rec.onresult = (ev) => {
          const txt = ev.results[0][0].transcript;
          $("#input-ask-aqualino-exec").value = txt;
          askAqualinoExec(txt);
        };
        rec.onend = () => {
          isListeningExec = false;
          btnVoiceExec.classList.remove("listening");
          btnVoiceExec.textContent = "🎤 Voz";
        };
        rec.onerror = () => {
          isListeningExec = false;
          btnVoiceExec.classList.remove("listening");
          btnVoiceExec.textContent = "🎤 Voz";
          const sample = "Como funciona o drill-down pelos 5 níveis (Região, Coordenação, Município, Central e Atendente)?";
          $("#input-ask-aqualino-exec").value = sample;
          askAqualinoExec(sample);
        };
        rec.start();
        return;
      } catch (_) {}
    }

    const sample =
      "Como funciona o drill-down pelos 5 níveis (Região, Coordenação, Município, Central e Atendente)?";
    $("#input-ask-aqualino-exec").value = sample;
    askAqualinoExec(sample);
  });

  function focusAqualinoExecInput() {
    $("#aqualino-exec-panel").scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => $("#input-ask-aqualino-exec").focus(), 250);
  }

  $("#btn-falar-aqualino-top").addEventListener("click", focusAqualinoExecInput);
  $("#btn-floating-aqualino-exec").addEventListener("click", focusAqualinoExecInput);

  // Restaurar visão macro estadual
  $("#btn-reset-exec").addEventListener("click", () => {
    state.regiao = "ALL";
    state.coordenacao = "ALL";
    state.municipio = "ALL";
    state.central = "ALL";
    state.atendente = "ALL";
    state.sgcEvent = "vencimento_lote";
    state.predHorizonDays = 7;
    state.predTargetTmeMin = 10;
    Object.values(state.appliedReallocByEvent).forEach((s) => s.clear());
    state.telemetryStep = 0;
    state.countdownSec = 30;
    $("#filter-regiao").value = "ALL";
    $("#select-sgc-event").value = "vencimento_lote";
    $("#range-pred-horizon").value = "7";
    $("#range-pred-target-tme").value = "10";
    $("#input-ask-aqualino-exec").value = "";
    $("#aqualino-exec-bubble").classList.remove("answering");
    $("#report-emission-feedback").classList.add("hidden");
    $("#integrity-check-banner").classList.add("hidden");
    $("#last-kpi-update-time").textContent = currentHHMMSS();
    refreshAll();
  });

  function refreshAll() {
    populateFilterDropdowns();
    renderExecutiveTop();
    renderHierarchyDrillTable();
    renderPredictiveAndReallocation();
    renderHistoricalTimeSeries();
    renderSsrsSchedules();
    renderImmutableAuditTable();
  }

  // Inicialização
  $("#live-clock-display").textContent = currentHHMMSS();
  $("#last-kpi-update-time").textContent = currentHHMMSS();
  refreshAll();
})();
