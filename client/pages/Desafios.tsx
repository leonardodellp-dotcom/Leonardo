import { useState } from "react";
import Layout from "@/components/Layout";
import {
  Zap,
  CheckCircle,
  XCircle,
  Trophy,
  RotateCcw,
  Lock,
} from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "fácil" | "médio" | "difícil" | "impossível";
}

interface QuizState {
  level: "fácil" | "médio" | "difícil" | "impossível" | null;
  currentQuestion: number;
  score: number;
  answered: boolean;
  selectedAnswer: number | null;
  finished: boolean;
  questions: Question[];
}

const questionBank: Question[] = [
  // Fácil
  {
    id: "f1",
    question: "Quantos sacramentos existem na Igreja Católica?",
    options: ["5", "7", "9", "3"],
    correctAnswer: 1,
    explanation:
      "Os sete sacramentos são: Batismo, Confirmação, Eucaristia, Penitência, Unção dos Enfermos, Ordem Sagrada e Matrimônio.",
    difficulty: "fácil",
  },
  {
    id: "f2",
    question: "Qual é o mandamento maior segundo Jesus?",
    options: [
      "Não matarás",
      "Amar a Deus e ao próximo",
      "Guardar o sábado",
      "Honrar os pais",
    ],
    correctAnswer: 1,
    explanation:
      "Jesus respondeu: 'Amarás ao Senhor, teu Deus, de todo o coração... e amarás ao teu próximo como a ti mesmo.'",
    difficulty: "fácil",
  },
  {
    id: "f3",
    question: "Quem foi mãe de Jesus?",
    options: ["Maria Madalena", "Maria de Nazaré", "Martha", "Salomé"],
    correctAnswer: 1,
    explanation:
      "Maria de Nazaré é a mãe de Jesus Cristo e Rainha dos Céus na tradição católica.",
    difficulty: "fácil",
  },
  {
    id: "f4",
    question: "Em qual livro da Bíblia encontramos o Pai Nosso?",
    options: ["Marcos", "Mateus", "Lucas", "Ambos Mateus e Lucas"],
    correctAnswer: 3,
    explanation:
      "O Pai Nosso aparece em Mateus 6:9-13 e Lucas 11:2-4 com variações menores.",
    difficulty: "fácil",
  },
  {
    id: "f5",
    question: "Qual sacramento marca a entrada de uma pessoa na Igreja?",
    options: ["Confirmação", "Batismo", "Penitência", "Eucaristia"],
    correctAnswer: 1,
    explanation:
      "O Batismo é o sacramento que marca a entrada de uma pessoa na comunidade eclesial.",
    difficulty: "fácil",
  },
  {
    id: "f6",
    question: "Quantas vezes o rosário se repete?",
    options: ["1", "2", "3", "5"],
    correctAnswer: 3,
    explanation:
      "O rosário completo consiste em 5 décadas (sets de 10 Ave-Marias), divididas em mistérios.",
    difficulty: "fácil",
  },
  {
    id: "f7",
    question: "Qual é o mandamento que Jesus resumiu como 'amar ao próximo'?",
    options: ["Primeiro", "Segundo", "Não é um dos dez", "Todos"],
    correctAnswer: 1,
    explanation: "O segundo mandamento sintetiza a nossa obrigação para com o próximo.",
    difficulty: "fácil",
  },
  {
    id: "f8",
    question: "Quantos apóstolos Jesus escolheu?",
    options: ["10", "11", "12", "13"],
    correctAnswer: 2,
    explanation:
      "Jesus escolheu 12 apóstolos para ajudá-lo em sua missão e para guiar a Igreja.",
    difficulty: "fácil",
  },
  {
    id: "f9",
    question: "Qual é o maior mandamento segundo Jesus?",
    options: [
      "Honrar pai e mãe",
      "Amar a Deus de todo coração",
      "Não roubar",
      "Guardar o repouso",
    ],
    correctAnswer: 1,
    explanation:
      "Jesus afirmou que o maior mandamento é amar a Deus com todo o coração, alma e mente.",
    difficulty: "fácil",
  },
  {
    id: "f10",
    question: "Em qual cidade Jesus nasceu?",
    options: ["Nazaré", "Jerusalém", "Belém", "Jericó"],
    correctAnswer: 2,
    explanation:
      "Jesus nasceu em Belém da Judeia, conforme profetizado pelos profetas.",
    difficulty: "fácil",
  },
  {
    id: "f11",
    question: "Qual sacramento confere o Espírito Santo de forma especial?",
    options: ["Batismo", "Confirmação", "Eucaristia", "Penitência"],
    correctAnswer: 1,
    explanation:
      "A Confirmação completa a iniciação cristã e confere especialmente o Espírito Santo.",
    difficulty: "fácil",
  },
  {
    id: "f12",
    question: "Quantos Evangelhos sinópticos existem?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 2,
    explanation:
      "Mateus, Marcos e Lucas são os três Evangelhos sinópticos que compartilham muitas narrativas.",
    difficulty: "fácil",
  },
  {
    id: "f13",
    question: "Qual é o significado de 'Pentecostes'?",
    options: ["Cinquenta dias", "Festa do pão", "Primeiro dia", "Ascensão"],
    correctAnswer: 0,
    explanation:
      "Pentecostes significa 'cinquenta dias', comemorado 50 dias após a Páscoa.",
    difficulty: "fácil",
  },
  {
    id: "f14",
    question: "Qual foi o primeiro milagre de Jesus segundo São João?",
    options: [
      "Cura de um leproso",
      "Transformação da água em vinho",
      "Multiplicação dos pães",
      "Caminhada sobre a água",
    ],
    correctAnswer: 1,
    explanation:
      "O primeiro milagre relatado por São João foi a transformação da água em vinho em Caná.",
    difficulty: "fácil",
  },
  {
    id: "f15",
    question: "Qual é o livro mais curto do Novo Testamento?",
    options: ["2 João", "3 João", "Filemom", "2 Pedro"],
    correctAnswer: 2,
    explanation: "Filemom é o livro mais curto do Novo Testamento com apenas 25 versículos.",
    difficulty: "fácil",
  },
  {
    id: "f16",
    question: "Quantos Dez Mandamentos foram dados a Moisés?",
    options: ["5", "10", "15", "20"],
    correctAnswer: 1,
    explanation:
      "Deus entregou a Moisés os Dez Mandamentos gravados em duas tábuas de pedra.",
    difficulty: "fácil",
  },
  {
    id: "f17",
    question: "Qual é o significado de 'Eucaristia'?",
    options: ["Sacrifício", "Ação de graças", "Comunhão", "Bênção"],
    correctAnswer: 1,
    explanation:
      "Eucaristia vem do grego e significa 'ação de graças', referindo-se ao sacrifício de Cristo.",
    difficulty: "fácil",
  },
  {
    id: "f18",
    question: "Quantos livros tem o Velho Testamento?",
    options: ["27", "39", "40", "66"],
    correctAnswer: 1,
    explanation:
      "O Velho Testamento tem 39 livros no cânone católico (sem os deuterocanônicos).",
    difficulty: "fácil",
  },
  {
    id: "f19",
    question: "Qual é a oração que mais rezamos na Eucaristia?",
    options: ["Glória", "Credo", "Pai Nosso", "Ave-Maria"],
    correctAnswer: 2,
    explanation:
      "O Pai Nosso é rezado durante a consagração como uma das orações centrais da missa.",
    difficulty: "fácil",
  },
  {
    id: "f20",
    question: "Qual é o sacramento do perdão dos pecados?",
    options: ["Unção dos Enfermos", "Penitência", "Batismo", "Matrimônio"],
    correctAnswer: 1,
    explanation:
      "A Penitência (ou Reconciliação) é o sacramento através do qual recebemos o perdão dos pecados.",
    difficulty: "fácil",
  },

  // Médio
  {
    id: "m1",
    question: "Em qual concílio foi definido o conceito de transubstanciação?",
    options: [
      "Concílio de Niceia",
      "Concílio de Trento",
      "Concílio Vaticano II",
      "Concílio de Éfeso",
    ],
    correctAnswer: 1,
    explanation:
      "O Concílio de Trento (1545-1563) confirmou e definiu a doutrina da transubstanciação na Eucaristia.",
    difficulty: "médio",
  },
  {
    id: "m2",
    question:
      "Qual é o nome do instrumento de penitência usado em algumas tradições católicas?",
    options: ["Cilício", "Escapulário", "Scapular", "Disciplina"],
    correctAnswer: 0,
    explanation:
      "O cilício é uma veste áspera ou corrente usada como forma de mortificação penitencial.",
    difficulty: "médio",
  },
  {
    id: "m3",
    question: "Qual papa iniciou a Reforma Católica?",
    options: [
      "Papa João Paulo II",
      "Papa Pio XII",
      "Papa Paulo III",
      "Papa Clemente VII",
    ],
    correctAnswer: 2,
    explanation:
      "Papa Paulo III (1534-1549) iniciou a Reforma Católica convocando o Concílio de Trento.",
    difficulty: "médio",
  },
  {
    id: "m4",
    question: "Quantos evangelhos canônicos existem no Novo Testamento?",
    options: ["3", "4", "5", "7"],
    correctAnswer: 1,
    explanation:
      "Existem 4 evangelhos canônicos: Mateus, Marcos, Lucas e João.",
    difficulty: "médio",
  },
  {
    id: "m5",
    question: "Qual é a oração central da missa católica?",
    options: ["Oração Eucarística", "Credo", "Pai Nosso", "Ave-Maria"],
    correctAnswer: 0,
    explanation:
      "A Oração Eucarística (também chamada Canon) é o centro da celebração eucarística.",
    difficulty: "médio",
  },
  {
    id: "m6",
    question: "Qual papa convocou o Concílio Vaticano II?",
    options: [
      "Papa João XXIII",
      "Papa Paulo VI",
      "Papa Pio XII",
      "Papa João Paulo II",
    ],
    correctAnswer: 0,
    explanation:
      "Papa João XXIII convocou o Concílio Vaticano II em 1962, revolucionando a Igreja Católica.",
    difficulty: "médio",
  },
  {
    id: "m7",
    question: "Quantos sacramentos da iniciação cristã existem?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 2,
    explanation:
      "Os três sacramentos da iniciação são: Batismo, Confirmação e Eucaristia.",
    difficulty: "médio",
  },
  {
    id: "m8",
    question: "Qual é o nome da primeira Igreja construída sobre a tumba de Pedro em Roma?",
    options: [
      "Igreja de São Paulo",
      "Basílica de São Pedro",
      "Igreja do Vaticano",
      "Basílica de Santa Maria Maior",
    ],
    correctAnswer: 1,
    explanation:
      "A Basílica de São Pedro foi construída no local onde se acredita estar o túmulo de São Pedro.",
    difficulty: "médio",
  },
  {
    id: "m9",
    question: "Qual apóstolo negou Jesus três vezes?",
    options: ["Judas", "Pedro", "João", "Tomás"],
    correctAnswer: 1,
    explanation:
      "São Pedro negou Jesus três vezes e depois se arrependeu e foi restaurado.",
    difficulty: "médio",
  },
  {
    id: "m10",
    question: "Em qual capítulo de Mateus encontramos o Sermão da Montanha?",
    options: ["Capítulo 3", "Capítulos 5-7", "Capítulo 8", "Capítulo 6"],
    correctAnswer: 1,
    explanation:
      "O Sermão da Montanha está em Mateus 5-7 e contém as Bem-aventuranças.",
    difficulty: "médio",
  },
  {
    id: "m11",
    question: "Qual é o significado da palavra 'Catecismo'?",
    options: [
      "Livro de orações",
      "Instrução religiosa",
      "Profissão de fé",
      "Código de leis",
    ],
    correctAnswer: 1,
    explanation:
      "Catecismo vem do grego e significa instrução religiosa ou ensinamento da fé.",
    difficulty: "médio",
  },
  {
    id: "m12",
    question: "Quantos Papas houve entre São Pedro e o Papa Francisco?",
    options: ["265", "266", "267", "268"],
    correctAnswer: 2,
    explanation:
      "O Papa Francisco é o 266º Papa na sucessão de São Pedro (variações conforme contagem).",
    difficulty: "médio",
  },
  {
    id: "m13",
    question: "Qual é o livro canônico mais antigo do Novo Testamento?",
    options: [
      "Evangelho de Mateus",
      "Evangelhos sinópticos",
      "1 Tessalonicenses",
      "Evangelho de João",
    ],
    correctAnswer: 2,
    explanation:
      "1 Tessalonicenses é considerada a carta mais antiga do Novo Testamento (51-52 d.C.).",
    difficulty: "médio",
  },
  {
    id: "m14",
    question: "Qual doutrina afirma que Cristo possui duas naturezas?",
    options: ["Arianismo", "Docetismo", "Nestorianismo", "Calcedônia"],
    correctAnswer: 3,
    explanation:
      "O Concílio de Calcedônia (451) definiu que Cristo tem duas naturezas: divina e humana.",
    difficulty: "médio",
  },
  {
    id: "m15",
    question: "Qual é o título dado à Maria em Lourdes?",
    options: [
      "Mãe de Deus",
      "Nossa Senhora Imaculada",
      "Rainha do Céu",
      "Mãe da Igreja",
    ],
    correctAnswer: 1,
    explanation:
      "Na aparição de Lourdes, Maria se apresentou como a Imaculada Conceição.",
    difficulty: "médio",
  },
  {
    id: "m16",
    question: "Qual é o significado de 'Liturgia'?",
    options: [
      "Serviço público",
      "Oração privada",
      "Trabalho do povo",
      "Cântico sagrado",
    ],
    correctAnswer: 2,
    explanation:
      "Liturgia vem do grego 'leiturgia' que significa 'trabalho do povo' ou obra pública.",
    difficulty: "médio",
  },
  {
    id: "m17",
    question: "Qual Evangelho começa com 'No princípio era o Verbo'?",
    options: ["Mateus", "Marcos", "Lucas", "João"],
    correctAnswer: 3,
    explanation:
      "O Evangelho de São João começa com essa famosa afirmação sobre o Verbo divino.",
    difficulty: "médio",
  },
  {
    id: "m18",
    question: "Qual é o sacramento que marca a vocação ao matrimônio?",
    options: ["Ordem Sagrada", "Matrimônio", "Confirmação", "Unção dos Enfermos"],
    correctAnswer: 1,
    explanation:
      "O sacramento do Matrimônio une dois batizados em aliança sacramental.",
    difficulty: "médio",
  },
  {
    id: "m19",
    question: "Quantas são as Bem-aventuranças no Sermão da Montanha?",
    options: ["7", "8", "9", "10"],
    correctAnswer: 1,
    explanation:
      "São 8 as Bem-aventuranças proclamadas por Jesus em Mateus 5:3-12.",
    difficulty: "médio",
  },
  {
    id: "m20",
    question: "Qual é o nome do livro das leis de Moisés?",
    options: ["Pentateuco", "Torá", "Pentateuco ou Torá", "Nenhuma das opções"],
    correctAnswer: 2,
    explanation:
      "Os primeiros cinco livros da Bíblia são chamados Pentateuco ou Torá.",
    difficulty: "médio",
  },

  // Difícil
  {
    id: "d1",
    question:
      "Em qual sínodo o papa João Paulo II estabeleceu a Jornada Mundial da Juventude?",
    options: [
      "Sínodo de 1985",
      "Sínodo de 1987",
      "Sínodo de 1989",
      "Nunca foi estabelecido em um sínodo",
    ],
    correctAnswer: 3,
    explanation:
      "A Jornada Mundial da Juventude foi iniciada pelo Papa João Paulo II em 1984 e se tornou tradição, mas não através de um sínodo específico.",
    difficulty: "difícil",
  },
  {
    id: "d2",
    question:
      "Qual é o nome da doutrina que explica como graça e livre arbítrio coexistem?",
    options: ["Semipelagianismo", "Molinismo", "Determinismo", "Arminianismo"],
    correctAnswer: 1,
    explanation:
      "O Molinismo, desenvolvido por Luís de Molina, é a posição católica sobre a compatibilidade entre graça divina e livre arbítrio.",
    difficulty: "difícil",
  },
  {
    id: "d3",
    question: "Em qual ano foi proclamado o dogma da Assunção de Maria?",
    options: ["1854", "1950", "1965", "1980"],
    correctAnswer: 1,
    explanation:
      "O papa Pio XII proclamou solemnemente o dogma da Assunção de Maria em 1950 (Munificentissimus Deus).",
    difficulty: "difícil",
  },
  {
    id: "d4",
    question:
      "Qual cardenal foi o redator principal da Constituição Gaudium et Spes do Vaticano II?",
    options: [
      "Cardenal Ratzinger",
      "Cardenal Wojtyla",
      "Cardenal Suenens",
      "Cardenal Lercaro",
    ],
    correctAnswer: 3,
    explanation:
      "O Cardenal Giacomo Lercaro foi um dos redatores principais da Constituição Gaudium et Spes.",
    difficulty: "difícil",
  },
  {
    id: "d5",
    question: "Qual �� a data do Concílio de Niceia?",
    options: ["312 d.C.", "325 d.C.", "381 d.C.", "451 d.C."],
    correctAnswer: 1,
    explanation:
      "O Concílio de Niceia ocorreu em 325 d.C. e condenou o arianismo.",
    difficulty: "difícil",
  },
  {
    id: "d6",
    question: "Qual é o nome da veneração de imagens na Igreja Católica?",
    options: ["Adoração", "Dulia", "Hiperdulia", "Latria"],
    correctAnswer: 1,
    explanation:
      "Dulia é a veneração apropriada a santos; Hiperdulia é para Maria; Latria é adoração a Deus.",
    difficulty: "difícil",
  },
  {
    id: "d7",
    question: "Qual Padre da Igreja escreveu 'Confissões'?",
    options: ["Santo Agostinho", "São Jerônimo", "Santo Ambrósio", "São Gregório"],
    correctAnswer: 0,
    explanation:
      "Santo Agostinho escreveu as Confissões, uma obra autobiográfica e teológica importante.",
    difficulty: "difícil",
  },
  {
    id: "d8",
    question: "Qual é o nome da prática de abstinência de carne?",
    options: ["Jejum", "Mortificação", "Abstinência", "Penitência"],
    correctAnswer: 2,
    explanation:
      "Abstinência é a prática de não comer carne, especialmente praticada na Quaresma.",
    difficulty: "difícil",
  },
  {
    id: "d9",
    question: "Em qual ano o dogma da Imaculada Conceição foi proclamado?",
    options: ["1854", "1950", "1965", "1854"],
    correctAnswer: 0,
    explanation:
      "O Papa Pio IX proclamou o dogma da Imaculada Conceição em 1854.",
    difficulty: "difícil",
  },
  {
    id: "d10",
    question: "Qual é o nome da doutrina sobre a primazia de Pedro?",
    options: ["Cesaropapismo", "Petrinidade", "Primado", "Episcopado"],
    correctAnswer: 2,
    explanation:
      "O Primado de Pedro é a doutrina que afirma a autoridade primária de Pedro entre os apóstolos.",
    difficulty: "difícil",
  },
  {
    id: "d11",
    question: "Qual Padre da Igreja é chamado 'Doutor da Igreja Ocidental'?",
    options: [
      "Santo Agostinho",
      "São Jerônimo",
      "Santo Ambrósio",
      "Santo Gregório Magno",
    ],
    correctAnswer: 0,
    explanation:
      "Santo Agostinho é considerado o Doutor da Igreja Ocidental pela sua influência teológica.",
    difficulty: "difícil",
  },
  {
    id: "d12",
    question: "Qual é a fórmula sacramental do sacramento da Confirmação?",
    options: [
      "'Eu te batizo'",
      "'Eu te confirmo'",
      "'Recebe a marca do Espírito Santo'",
      "'Vossa culpa, vossa culpa'",
    ],
    correctAnswer: 2,
    explanation:
      "A fórmula da Confirmação é 'Receba o selo do Espírito Santo que lhe é dado como dom'.",
    difficulty: "difícil",
  },
  {
    id: "d13",
    question: "Qual Concílio definiu a autoridade do Papa como infalível em certas circunstâncias?",
    options: [
      "Vaticano I",
      "Vaticano II",
      "Calcedônia",
      "Niceia",
    ],
    correctAnswer: 0,
    explanation:
      "O Concílio Vaticano I (1870) definiu a infalibilidade papal em questões de fé e moral.",
    difficulty: "difícil",
  },
  {
    id: "d14",
    question: "Qual é o nome da celebração do Domingo de Ramos?",
    options: [
      "Processão das Palmas",
      "Entrada Triunfal",
      "Bênção das Palmas",
      "Todas as anteriores",
    ],
    correctAnswer: 3,
    explanation:
      "O Domingo de Ramos combina a bênção das palmas com a entrada triunfal de Jesus.",
    difficulty: "difícil",
  },
  {
    id: "d15",
    question: "Qual é o nome da prática de jejum de 40 dias antes da Páscoa?",
    options: ["Advento", "Quaresma", "Pentecostes", "Epifania"],
    correctAnswer: 1,
    explanation:
      "A Quaresma é o período de 40 dias de penitência antes da Páscoa.",
    difficulty: "difícil",
  },
  {
    id: "d16",
    question: "Qual Papa foi o primeiro a visitar a Terra Santa?",
    options: [
      "Papa Paulo VI",
      "Papa João Paulo II",
      "Papa Pio XII",
      "Papa João XXIII",
    ],
    correctAnswer: 0,
    explanation:
      "Papa Paulo VI foi o primeiro Papa a visitar a Terra Santa em 1964.",
    difficulty: "difícil",
  },
  {
    id: "d17",
    question: "Qual é o significado teológico de 'Theotokos'?",
    options: [
      "Mãe de Deus",
      "Portadora de Deus",
      "Mãe da Igreja",
      "Ambas as opções 1 e 2",
    ],
    correctAnswer: 3,
    explanation:
      "Theotokos significa 'Portadora de Deus' ou 'Mãe de Deus' em grego.",
    difficulty: "difícil",
  },
  {
    id: "d18",
    question: "Qual Concílio condenou o nestorianismo?",
    options: [
      "Éfeso (431 d.C.)",
      "Calcedônia (451 d.C.)",
      "Constantinopla (553 d.C.)",
      "Niceia (325 d.C.)",
    ],
    correctAnswer: 0,
    explanation:
      "O Concílio de Éfeso (431) condenou o nestorianismo e afirmou que Maria é Theotokos.",
    difficulty: "difícil",
  },
  {
    id: "d19",
    question: "Qual é o nome da compilação oficial das leis da Igreja?",
    options: [
      "Código Canônico",
      "Constituição Apostólica",
      "Decreto",
      "Instrução",
    ],
    correctAnswer: 0,
    explanation:
      "O Código Canônico (Codex Iuris Canonici) é a compilação oficial das leis eclesiásticas.",
    difficulty: "difícil",
  },
  {
    id: "d20",
    question: "Qual é o significado de 'Sede Vacante'?",
    options: [
      "Sé vaga",
      "Vacação papal",
      "Período entre papados",
      "Todas as anteriores",
    ],
    correctAnswer: 3,
    explanation:
      "Sede Vacante refere-se ao período entre a morte ou renúncia de um Papa e a eleição do próximo.",
    difficulty: "difícil",
  },

  // Impossível
  {
    id: "i1",
    question:
      "Qual é a velocidade da luz em vacum segundo Santo Tomás de Aquino?",
    options: [
      "Imediata (infinita)",
      "A mesma de hoje",
      "Santo Tomás não discutiu isso",
      "Variável conforme Deus permitia",
    ],
    correctAnswer: 2,
    explanation:
      "Santo Tomás de Aquino não discutiu a velocidade da luz, pois a ciência moderna ainda não havia desenvolvido esse conceito.",
    difficulty: "impossível",
  },
  {
    id: "i2",
    question:
      "Quantas horas de oração São Bento exigiu diariamente em sua Regra?",
    options: [
      "Não quantificou",
      "8 horas",
      "12 horas",
      "Conforme a capacidade",
    ],
    correctAnswer: 3,
    explanation:
      "Na Regra de São Bento, o tempo era determinado 'conforme a capacidade' individual, não sendo fixo em horas.",
    difficulty: "impossível",
  },
  {
    id: "i3",
    question:
      "Qual é a fórmula matemática para calcular o grau de santidade de uma pessoa?",
    options: [
      "Não existe tal f��rmula",
      "Virtudes x Obras / Pecados",
      "Tempo de Oração + Caridade",
      "Estabelecido pelo Vaticano em 1456",
    ],
    correctAnswer: 0,
    explanation:
      "Não existe fórmula matemática para medir santidade. A canonização é baseada em investigação teológica e milagres verificados.",
    difficulty: "impossível",
  },
  {
    id: "i4",
    question: "Qual é o nome da bula papal de 1302 que afirma a supremacia papal?",
    options: ["Unam Sanctam", "Sublimis Deus", "Pacem in Terris", "Humanae Vitae"],
    correctAnswer: 0,
    explanation:
      "A bula 'Unam Sanctam' do Papa Bonifácio VIII afirmava a supremacia papal sobre os monarcas.",
    difficulty: "impossível",
  },
  {
    id: "i5",
    question: "Qual filósofo medieval reconciliou Aristóteles com a teologia cristã?",
    options: ["Santo Tomás de Aquino", "Santo Agostinho", "Escoto", "Boaventura"],
    correctAnswer: 0,
    explanation:
      "Santo Tomás de Aquino usou a filosofia aristotélica para fundamentar a teologia cristã.",
    difficulty: "impossível",
  },
  {
    id: "i6",
    question:
      "Qual é o nome da doutrina que afirma que Cristo é uma pessoa com duas naturezas?",
    options: ["Monofilosismo", "Cálcedonismo", "Docetismo", "Monofisismo"],
    correctAnswer: 1,
    explanation:
      "O Cálcedonismo, definido no Concílio de Calcedônia, afirma que Cristo é Uma Pessoa em duas naturezas.",
    difficulty: "impossível",
  },
  {
    id: "i7",
    question: "Qual Papa instituiu a festa de Corpus Christi?",
    options: ["Papa Urbano IV", "Papa Clemente V", "Papa Gregório X", "Papa Bonifácio VIII"],
    correctAnswer: 0,
    explanation:
      "Papa Urbano IV instituiu a festa de Corpus Christi em 1264 através da bula Transiturus.",
    difficulty: "impossível",
  },
  {
    id: "i8",
    question: "Qual teólogo cristão cunhou o termo milícia de Cristo?",
    options: ["Tertuliano", "Orígenes", "Santo Agostinho", "Santo Ambrósio"],
    correctAnswer: 0,
    explanation:
      "Tertuliano usou o termo Militia Christi para descrever a vida cristã como militar espiritual.",
    difficulty: "impossível",
  },
  {
    id: "i9",
    question:
      "Qual é o nome da heresia que negava a paixão e morte de Cristo de forma real?",
    options: ["Docetismo", "Gnosticismo", "Arianismo", "Pelagianismo"],
    correctAnswer: 0,
    explanation:
      "O Docetismo negava que Cristo sofreu de forma real, sustentando um sofrimento meramente aparente.",
    difficulty: "impossível",
  },
];

export default function Desafios() {
  const [quizState, setQuizState] = useState<QuizState>({
    level: null,
    currentQuestion: 0,
    score: 0,
    answered: false,
    selectedAnswer: null,
    finished: false,
    questions: [],
  });

  const startQuiz = (level: "fácil" | "médio" | "difícil" | "impossível") => {
    const filteredQuestions = questionBank.filter(
      (q) => q.difficulty === level,
    );
    const shuffled = filteredQuestions
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    setQuizState({
      level,
      currentQuestion: 0,
      score: 0,
      answered: false,
      selectedAnswer: null,
      finished: false,
      questions: shuffled,
    });
  };

  const handleAnswer = (index: number) => {
    if (quizState.answered) return;

    const isCorrect =
      index === quizState.questions[quizState.currentQuestion].correctAnswer;

    setQuizState({
      ...quizState,
      selectedAnswer: index,
      answered: true,
      score: isCorrect ? quizState.score + 1 : quizState.score,
    });
  };

  const nextQuestion = () => {
    if (quizState.currentQuestion + 1 < quizState.questions.length) {
      setQuizState({
        ...quizState,
        currentQuestion: quizState.currentQuestion + 1,
        answered: false,
        selectedAnswer: null,
      });
    } else {
      setQuizState({
        ...quizState,
        finished: true,
      });
    }
  };

  const resetQuiz = () => {
    setQuizState({
      level: null,
      currentQuestion: 0,
      score: 0,
      answered: false,
      selectedAnswer: null,
      finished: false,
      questions: [],
    });
  };

  if (quizState.level === null) {
    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Teste seu Conhecimento
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Desafios Católicos
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Participe de quizzes desafiadores sobre fé, história da Igreja e
                doutrina católica. Escolha um nível e teste seu conhecimento!
              </p>
            </div>

            {/* Level Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  level: "fácil",
                  title: "🟢 Fácil",
                  description: "Perguntas básicas sobre a fé católica",
                  color:
                    "from-green-500/10 via-green-500/5 to-transparent border-green-500/30",
                },
                {
                  level: "médio",
                  title: "🟡 Médio",
                  description: "Conhecimento intermediário necessário",
                  color:
                    "from-blue-600/10 via-blue-600/5 to-transparent border-blue-600/30",
                },
                {
                  level: "difícil",
                  title: "🔴 Difícil",
                  description: "Para os mais conhecedores",
                  color:
                    "from-red-500/10 via-red-500/5 to-transparent border-red-500/30",
                },
                {
                  level: "impossível",
                  title: "⚫ Impossível",
                  description: "Apenas para os maiores especialistas",
                  color:
                    "from-purple-500/10 via-purple-500/5 to-transparent border-purple-500/30",
                },
              ].map(({ level, title, description, color }) => (
                <button
                  key={level}
                  onClick={() =>
                    startQuiz(
                      level as "fácil" | "médio" | "difícil" | "impossível",
                    )
                  }
                  className={`bg-gradient-to-br ${color} border rounded-xl p-8 text-left hover:shadow-lg transition-all hover:scale-105 active:scale-95`}
                >
                  <h3 className="text-2xl font-bold mb-2">{title}</h3>
                  <p className="text-muted-foreground mb-4">{description}</p>
                  <div className="text-primary font-semibold">Começar →</div>
                </button>
              ))}
            </div>

            {/* Info Section */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4">📝 Como Funciona</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">1.</span>
                  Escolha um nível de dificuldade
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">2.</span>
                  Responda 5 perguntas aleatórias do banco de questões
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">3.</span>
                  Cada resposta correta vale 1 ponto
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">4.</span>
                  Veja a explicação após sua resposta
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">5.</span>
                  Descubra seu placar ao final!
                </li>
              </ul>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (quizState.finished) {
    const percentage = (quizState.score / quizState.questions.length) * 100;
    let message = "";
    let icon = null;

    if (percentage === 100) {
      message = "🏆 Perfeito! Você é um especialista!";
      icon = <Trophy className="w-16 h-16 text-accent mx-auto mb-4" />;
    } else if (percentage >= 80) {
      message = "⭐ Excelente desempenho!";
      icon = <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />;
    } else if (percentage >= 60) {
      message = "✓ Bom resultado! Continue aprendendo";
      icon = <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />;
    } else {
      message = "💪 Desafio aceito! Tente novamente";
      icon = (
        <Zap className="w-16 h-16 text-accent mx-auto mb-4 animate-pulse" />
      );
    }

    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <div className="bg-card border border-border rounded-xl p-12 text-center">
              {icon}
              <h2 className="text-4xl font-bold mb-4">Resultado Final</h2>
              <p className="text-2xl font-bold text-primary mb-2">
                {quizState.score} de {quizState.questions.length}
              </p>
              <p className="text-3xl font-bold text-accent mb-6">
                {Math.round(percentage)}%
              </p>
              <p className="text-xl mb-8">{message}</p>

              <button
                onClick={resetQuiz}
                className="flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all mx-auto"
              >
                <RotateCcw className="w-5 h-5" />
                Tentar Novamente
              </button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (quizState.questions.length === 0) {
    return <div>Carregando...</div>;
  }

  const question = quizState.questions[quizState.currentQuestion];
  const progress =
    ((quizState.currentQuestion + 1) / quizState.questions.length) * 100;

  return (
    <Layout>
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold text-primary">
                Pergunta {quizState.currentQuestion + 1} de{" "}
                {quizState.questions.length}
              </span>
              <span className="text-sm font-semibold">
                Pontuação: {quizState.score}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-card border border-border rounded-xl p-8 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <span
                className={`px-3 py-1 rounded-full text-sm font-bold ${
                  question.difficulty === "fácil"
                    ? "bg-green-500/20 text-green-400"
                    : question.difficulty === "médio"
                      ? "bg-blue-600/20 text-blue-300"
                      : question.difficulty === "difícil"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-purple-500/20 text-purple-400"
                }`}
              >
                {question.difficulty.toUpperCase()}
              </span>
            </div>

            <h2 className="text-2xl font-bold mb-8">{question.question}</h2>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = quizState.selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;
                const showResult = quizState.answered;

                let buttonClass =
                  "w-full text-left p-4 border rounded-lg transition-all font-medium";

                if (!showResult) {
                  buttonClass +=
                    " bg-muted hover:bg-muted/80 border-border hover:border-primary cursor-pointer";
                } else if (isCorrect) {
                  buttonClass +=
                    " bg-green-500/20 border-green-500/50 text-green-400";
                } else if (isSelected && !isCorrect) {
                  buttonClass +=
                    " bg-destructive/20 border-destructive/50 text-destructive";
                } else {
                  buttonClass += " bg-muted border-border opacity-50";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={quizState.answered}
                    className={buttonClass}
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-current opacity-20 rounded">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                      {showResult && isCorrect && (
                        <CheckCircle className="w-5 h-5 ml-auto text-green-500" />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 ml-auto text-destructive" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {quizState.answered && (
              <div className="mt-8 p-6 bg-muted/30 border border-border rounded-lg">
                <p className="font-semibold mb-2">💡 Explicação:</p>
                <p className="text-sm text-muted-foreground">
                  {question.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Next Button */}
          {quizState.answered && (
            <button
              onClick={nextQuestion}
              className="w-full px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all"
            >
              {quizState.currentQuestion + 1 === quizState.questions.length
                ? "Ver Resultado"
                : "Próxima Pergunta"}
            </button>
          )}
        </div>
      </section>
    </Layout>
  );
}
