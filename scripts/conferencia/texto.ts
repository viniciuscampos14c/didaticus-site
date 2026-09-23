/*
 * Procura traço de IA no texto que uma pessoa vai ler.
 *
 * O CLAUDE.md já manda passar o `humanizer` antes de fechar qualquer texto, e
 * mesmo assim um travessão chegou à tela inicial e o cliente viu antes de nós.
 * Regra que depende de alguém lembrar não é regra, é intenção. Este script é a
 * regra.
 *
 *   pnpm conferir:texto
 *
 * O que ele NÃO faz: julgar estilo. Ele acha o que dá para achar por padrão,
 * que é pontuação. Rule of three, voz passiva e conclusão genérica continuam
 * sendo trabalho de leitura, e é por isso que a skill não sai do processo.
 */

import { readFileSync } from "node:fs";
import { arquivosDo } from "./arquivos";

/*
 * Travessão e meia-risca. São o tell mais confiável de texto gerado, e a razão
 * de este arquivo existir.
 */
const TRAVESSAO = /[—–]/;

/*
 * Travessão sozinho é célula vazia de tabela, e isso é tipografia correta:
 * `{aluno.regiao?.nome ?? "—"}` diz "não tem" melhor do que um espaço em branco.
 * O que se procura é travessão ENTRE palavras, que é onde mora a prosa.
 */
const EM_PROSA = /\p{L}[^\n"]{0,80}?\s[—–]\s[^\n"]{0,80}?\p{L}/u;

const MOJIBAKE = /Ã[§£©¡ ]|â€[™“”"]|�/;

/*
 * Aspas curvas só valem como defeito em código.
 *
 * Em prosa portuguesa elas são tipografia correta, e o texto do projeto usa. Em
 * string de código são armadilha: quebram busca por grep, quebram comparação, e
 * a pessoa que digita no teclado dela nunca produz a mesma.
 */
const ASPAS_CURVAS = /[“”‘’]/;

/*
 * Alfabeto que não pertence a texto em português.
 *
 * Achado duas vezes em 02/09, e as duas por acaso: um dígito devanágari no
 * lugar de um 4 num valor de cor, e um ideograma chinês no meio de uma frase da
 * tela de segundo fator. Nenhuma das regras acima pegava, e o sintoma na tela é
 * um símbolo solto que ninguém sabe de onde veio.
 *
 * A primeira versão desta regra listava os símbolos PERMITIDOS, e foi larga
 * demais: reprovou o sinal de menos de um botão, um visto, e os desenhos de
 * árvore da documentação. A lista de símbolos aceitáveis não tem fim.
 *
 * Esta versão vai pelo contrário e lista os alfabetos que não têm o que fazer
 * aqui. Símbolo nenhum dispara, e escrita de outro sistema dispara sempre.
 */
const OUTRO_ALFABETO = new RegExp(
  [
    "\\p{Script=Han}",
    "\\p{Script=Hiragana}",
    "\\p{Script=Katakana}",
    "\\p{Script=Hangul}",
    "\\p{Script=Cyrillic}",
    "\\p{Script=Greek}",
    "\\p{Script=Arabic}",
    "\\p{Script=Hebrew}",
    "\\p{Script=Devanagari}",
    "\\p{Script=Thai}",
  ].join("|"),
  "u",
);

type Achado = { arquivo: string; linha: number; texto: string; motivo: string };

/*
 * Uma linha pode ser dispensada com `conferir-texto: ok` e o porquê ao lado.
 * Sem o porquê a dispensa não vale: exceção que ninguém justifica vira hábito.
 */
const DISPENSA = /conferir-texto:\s*ok\b/;

/*
 * A primeira versão olhava só `.ts`, `.tsx` e `.md`, e o buraco apareceu no
 * mesmo dia: um travessão num comentário de Dockerfile passou porque a extensão
 * não estava na lista. CSS entra pelo mesmo motivo e por um pior, que é
 * `content: "..."`, texto que a pessoa lê na tela.
 *
 * `.html` entrou em 03/09, e do jeito errado de descobrir: a página da raiz do
 * domínio foi publicada e eu conferi a pontuação dela à mão, que é a falha que
 * este arquivo existe para evitar. Página solta, fora do build, é justamente a
 * que ninguém revisa duas vezes.
 */
const EXTENSOES = [
  "*.ts",
  "*.tsx",
  "*.md",
  "*.css",
  "*.html",
  "*.yml",
  "*.yaml",
  "*.sh",
  "*.Dockerfile",
  "Dockerfile",
];

function alvos(): string[] {
  return arquivosDo(...EXTENSOES).filter(
    (caminho) => !caminho.startsWith("scripts/conferencia/texto.ts"),
  );
}

function conferir(arquivo: string): Achado[] {
  const achados: Achado[] = [];

  /* Arquivo apagado não chega aqui: quem filtra é o `arquivosDo`, e o porquê
   * está lá. */
  const linhas = readFileSync(arquivo, "utf8").split("\n");

  linhas.forEach((linha, i) => {
    if (DISPENSA.test(linha)) return;

    const registrar = (motivo: string) =>
      achados.push({ arquivo, linha: i + 1, texto: linha.trim().slice(0, 100), motivo });

    if (TRAVESSAO.test(linha) && EM_PROSA.test(linha)) registrar("travessão em prosa");
    if (MOJIBAKE.test(linha)) registrar("acento quebrado");
    if (!arquivo.endsWith(".md") && ASPAS_CURVAS.test(linha)) registrar("aspas curvas");

    const estranho = linha.match(OUTRO_ALFABETO);
    if (estranho) {
      const ponto = estranho[0].codePointAt(0)?.toString(16).padStart(4, "0");
      registrar(`letra de outro alfabeto: U+${ponto?.toUpperCase()}`);
    }
  });

  return achados;
}

const achados = alvos().flatMap(conferir);

if (achados.length === 0) {
  console.log("Nenhum traço de IA no texto.");
  process.exit(0);
}

console.error(`${achados.length} ocorrência(s):\n`);
for (const a of achados) {
  console.error(`  ${a.arquivo}:${a.linha}  ${a.motivo}`);
  console.error(`    ${a.texto}\n`);
}
console.error("Reescreva, ou marque a linha com `conferir-texto: ok` dizendo por quê.");
process.exit(1);
