export interface LiturgicalDate {
  date: string;
  name: string;
  type: "solemn" | "feast" | "memorial" | "ordinary";
  month: number;
  day: number;
}

export const LITURGICAL_DATES: LiturgicalDate[] = [
  // January
  {
    date: "1º de janeiro",
    name: "Circuncisão do Senhor",
    type: "solemn",
    month: 1,
    day: 1,
  },
  {
    date: "6 de janeiro",
    name: "Epifania do Senhor",
    type: "solemn",
    month: 1,
    day: 6,
  },
  {
    date: "22 de janeiro",
    name: "São Vicente",
    type: "memorial",
    month: 1,
    day: 22,
  },
  // February
  {
    date: "2 de fevereiro",
    name: "Apresentação do Senhor (Candelária)",
    type: "feast",
    month: 2,
    day: 2,
  },
  {
    date: "14 de fevereiro",
    name: "São Valentim",
    type: "memorial",
    month: 2,
    day: 14,
  },
  // March
  {
    date: "19 de março",
    name: "São José",
    type: "solemn",
    month: 3,
    day: 19,
  },
  {
    date: "25 de março",
    name: "Anunciação do Senhor",
    type: "solemn",
    month: 3,
    day: 25,
  },
  {
    date: "29 de março",
    name: "Domingo de Ramos",
    type: "solemn",
    month: 3,
    day: 29,
  },
  // April
  {
    date: "2 de abril",
    name: "Quinta-feira Santa",
    type: "solemn",
    month: 4,
    day: 2,
  },
  {
    date: "3 de abril",
    name: "Sexta-feira Santa",
    type: "solemn",
    month: 4,
    day: 3,
  },
  {
    date: "5 de abril",
    name: "Páscoa (Domingo de Ressurreição)",
    type: "solemn",
    month: 4,
    day: 5,
  },
  // May
  {
    date: "1º de maio",
    name: "São José Operário",
    type: "feast",
    month: 5,
    day: 1,
  },
  {
    date: "24 de maio",
    name: "Pentecostes (Domingo de Pentecostes)",
    type: "solemn",
    month: 5,
    day: 24,
  },
  // June
  {
    date: "4 de junho",
    name: "Corpus Christi",
    type: "feast",
    month: 6,
    day: 4,
  },
  {
    date: "29 de junho",
    name: "São Pedro e São Paulo",
    type: "solemn",
    month: 6,
    day: 29,
  },
  // July
  {
    date: "25 de julho",
    name: "São Tiago Apóstolo",
    type: "feast",
    month: 7,
    day: 25,
  },
  // August
  {
    date: "6 de agosto",
    name: "Transfiguração do Senhor",
    type: "feast",
    month: 8,
    day: 6,
  },
  {
    date: "15 de agosto",
    name: "Assunção de Maria",
    type: "solemn",
    month: 8,
    day: 15,
  },
  {
    date: "29 de agosto",
    name: "Degolação de São João Batista",
    type: "feast",
    month: 8,
    day: 29,
  },
  // September
  {
    date: "8 de setembro",
    name: "Natividade de Maria",
    type: "feast",
    month: 9,
    day: 8,
  },
  // October
  {
    date: "12 de outubro",
    name: "Nossa Senhora Aparecida (Padroeira do Brasil)",
    type: "solemn",
    month: 10,
    day: 12,
  },
  {
    date: "28 de outubro",
    name: "São Judas Tadeu e São Simão",
    type: "feast",
    month: 10,
    day: 28,
  },
  // November
  {
    date: "1º de novembro",
    name: "Todos os Santos",
    type: "solemn",
    month: 11,
    day: 1,
  },
  {
    date: "2 de novembro",
    name: "Finados (Commemoração de Todos os Fiéis Defuntos)",
    type: "ordinary",
    month: 11,
    day: 2,
  },
  {
    date: "30 de novembro",
    name: "Santo André Apóstolo",
    type: "feast",
    month: 11,
    day: 30,
  },
  // December
  {
    date: "8 de dezembro",
    name: "Imaculada Conceição",
    type: "solemn",
    month: 12,
    day: 8,
  },
  {
    date: "25 de dezembro",
    name: "Natal do Senhor",
    type: "solemn",
    month: 12,
    day: 25,
  },
  {
    date: "26 de dezembro",
    name: "Santo Estêvão (1º Mártir)",
    type: "feast",
    month: 12,
    day: 26,
  },
];
