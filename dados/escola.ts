/*
 * O que a escola faz, de onde o site tira o conteúdo.
 *
 * Os nomes vieram do sistema em 23/09/2026: as 17 disciplinas cadastradas e as
 * 42 sub-regiões atendidas, com a região de cada uma. Não são exemplo nem
 * chute, são o que a recepção usa para marcar aula.
 *
 * FICA AQUI EM VEZ DE ESPALHADO NAS PÁGINAS, e por enquanto escrito à mão em
 * vez de vindo da API. A troca é consciente: a home é a porta do site e não
 * pode depender de a API estar de pé para dizer o que a escola ensina. Quando
 * existir cache, isto vira uma busca com este arquivo de reserva.
 *
 * O preço NÃO está aqui de propósito. Ele muda, e uma tabela em código é uma
 * tabela que alguém esquece de atualizar. Quando a página de preços existir,
 * ela lê das faixas das regiões, que é onde a escola já mantém o valor.
 */

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
      "Asa Sul",
      "Asa Norte",
      "Sudoeste",
      "Noroeste",
      "Octogonal",
      "Cruzeiro Novo",
      "Cruzeiro Velho",
      "Park Way",
      "Vila Planalto",
      "Vila Telebrasília",
      "Setor de Clubes Norte",
      "Setor de Clubes Sul",
      "Setor Militar Urbano",
      "SIA",
    ],
  },
  {
    nome: "Região Norte do Distrito Federal",
    curto: "Lagos e norte",
    bairros: [
      "Lago Norte",
      "Lago Sul",
      "Jardim Botânico",
      "Setor de Embaixadas Norte",
      "Setor de Embaixadas Sul",
      "Granja do Torto",
      "Taquari",
      "Varjão",
      "Paranoá",
      "São Sebastião",
      "Sobradinho",
      "Planaltina",
    ],
  },
  {
    nome: "Região Sul do Distrito Federal",
    curto: "Sul e oeste",
    bairros: [
      "Águas Claras",
      "Taguatinga",
      "Vicente Pires",
      "Guará I",
      "Guará II",
      "Park Sul",
      "Núcleo Bandeirante",
      "Candangolândia",
      "Arniqueiras",
      "Riacho Fundo I",
      "Riacho Fundo II",
      "Samambaia",
      "Ceilândia",
      "Recanto das Emas",
      "Santa Maria",
      "Gama",
    ],
  },
];

export const QUANTOS_BAIRROS = REGIOES.reduce((n, r) => n + r.bairros.length, 0);

/*
 * Os passos da primeira conversa até a primeira aula.
 *
 * É a página que o concorrente não tem, e responde a pergunta que todo pai faz
 * antes de decidir: quantos passos são, e quando meu filho começa.
 *
 * Cada passo corresponde a algo que o sistema faz de verdade. Nada aqui é
 * promessa de processo que não existe.
 */
export const COMO_FUNCIONA = [
  {
    titulo: "Você conta o que está acontecendo",
    texto:
      "Qual matéria, qual série, e o que tem travado. Se for dificuldade de " +
      "aprendizagem e não de conteúdo, a conversa muda, e é melhor saber disso antes.",
  },
  {
    titulo: "A escola escolhe o professor",
    texto:
      "Pela matéria, pelo horário que serve para vocês, e pela região, para ninguém " +
      "atravessar a cidade entre duas aulas. Quem escolhe é a coordenação, não um sorteio.",
  },
  {
    titulo: "A aula é marcada com dia e hora",
    texto:
      "Em casa ou por videoconferência. Fica na agenda, com lembrete, e remarcar é " +
      "conversa com a secretaria e não com o professor.",
  },
  {
    titulo: "Depois de cada aula, um relato",
    texto:
      "O professor escreve o que foi dado e como o aluno respondeu. Não é presença " +
      "marcada no papel: é o que permite acompanhar sem ter que perguntar.",
  },
  {
    titulo: "Você acompanha pelo portal",
    texto:
      "A agenda do seu filho, o relato de cada aula, as notas e as faturas, no mesmo " +
      "lugar. Sem precisar ligar para saber.",
  },
];
