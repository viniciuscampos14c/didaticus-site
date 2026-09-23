/*
 * O conteúdo do site, e de onde cada parte veio.
 *
 * DUAS FONTES, e nenhuma é chute:
 *
 * - O que a escola diz de si vem da landing page que ela publica hoje, em
 *   didaticusaulas.com.br/lp, lida em 23/09/2026: os cinco benefícios, os quatro
 *   passos para contratar, o WhatsApp e os "quase dez anos". É a voz que a
 *   escola já escolheu e já usa para vender, e o site novo parte dela em vez de
 *   inventar outra.
 *
 * - O que a escola faz de fato vem do sistema: as 17 matérias e os 42 bairros
 *   são os mesmos que a recepção usa para marcar aula.
 *
 * O preço NÃO está aqui. Ele muda, e tabela em código é tabela que alguém
 * esquece. Quando a página de preços existir, lê das faixas das regiões.
 */

/* O canal de venda da escola. A landing inteira converge para ele. */
export const WHATSAPP = "5561999967400";
export const LINK_WHATSAPP =
  `https://wa.me/${WHATSAPP}?text=` +
  encodeURIComponent("Olá! Vim pelo site e quero saber sobre as aulas particulares.");

/* Publicado pela própria escola na landing: "com quase 10 anos de experiência". */
export const TEMPO_DE_CASA = "quase 10 anos";

export const BENEFICIOS = [
  {
    icone: "/lp/01.png.webp",
    titulo: "Aulas em domicílio",
    texto: "Você não precisa se deslocar. O professor vai até a sua casa.",
  },
  {
    icone: "/lp/02.png.webp",
    titulo: "Professores treinados",
    texto:
      "Especialistas preparados para o ensino personalizado, e para as avaliações que o aluno tem pela frente.",
  },
  {
    icone: "/lp/03.png.webp",
    titulo: "Suporte online",
    texto: "Surgiu dúvida entre uma aula e outra? O aluno envia, e a gente responde.",
  },
  {
    icone: "/lp/04.png.webp",
    titulo: "Horários flexíveis",
    texto: "Qualquer dia da semana, no horário em que o aluno pode.",
  },
  {
    icone: "/lp/05.png.webp",
    titulo: "Linguagem jovem",
    texto: "Professor que fala a língua do aluno. É o que destrava a relação com a matéria.",
  },
];

export const PASSOS = [
  { icone: "/lp/icon-1.png.webp", titulo: "Fale com a gente pelo WhatsApp" },
  { icone: "/lp/icon-2.png.webp", titulo: "Conheça as nossas soluções" },
  { icone: "/lp/icon-3.png.webp", titulo: "Agende a primeira aula do seu filho" },
  { icone: "/lp/icon-4.png.webp", titulo: "O melhor professor da região vai até a sua casa" },
];

export const NIVEIS = [
  "Ensino fundamental",
  "Ensino médio",
  "Preparatório para o vestibular",
  "Aulas personalizadas e flexíveis",
];

export const MATERIAS = [
  "Matemática",
  "Português",
  "Redação",
  "Física",
  "Química",
  "Biologia",
  "História",
  "Geografia",
  "Inglês",
  "Espanhol",
  "Literatura",
  "Filosofia",
  "Sociologia",
  "Ciências",
  "Artes",
  "Alfabetização",
  "Acompanhamento Pedagógico",
] as const;

export type Regiao = { nome: string; curto: string; bairros: string[] };

export const REGIOES: Regiao[] = [
  {
    nome: "Região Central do Distrito Federal",
    curto: "Plano Piloto e arredores",
    bairros: [
      "Asa Sul", "Asa Norte", "Sudoeste", "Noroeste", "Octogonal", "Cruzeiro Novo",
      "Cruzeiro Velho", "Park Way", "Vila Planalto", "Vila Telebrasília",
      "Setor de Clubes Norte", "Setor de Clubes Sul", "Setor Militar Urbano", "SIA",
    ],
  },
  {
    nome: "Região Norte do Distrito Federal",
    curto: "Lagos e região norte",
    bairros: [
      "Lago Norte", "Lago Sul", "Jardim Botânico", "Setor de Embaixadas Norte",
      "Setor de Embaixadas Sul", "Granja do Torto", "Taquari", "Varjão", "Paranoá",
      "São Sebastião", "Sobradinho", "Planaltina",
    ],
  },
  {
    nome: "Região Sul do Distrito Federal",
    curto: "Região sul e oeste",
    bairros: [
      "Águas Claras", "Taguatinga", "Vicente Pires", "Guará I", "Guará II", "Park Sul",
      "Núcleo Bandeirante", "Candangolândia", "Arniqueiras", "Riacho Fundo I",
      "Riacho Fundo II", "Samambaia", "Ceilândia", "Recanto das Emas", "Santa Maria", "Gama",
    ],
  },
];

export const QUANTOS_BAIRROS = REGIOES.reduce((n, r) => n + r.bairros.length, 0);
