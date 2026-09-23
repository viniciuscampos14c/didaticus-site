/*
 * Prova que o desktop não mudou.
 *
 * Em 02/09 o cliente aprovou a aparência no computador e perguntou a coisa
 * certa antes de a gente começar o trabalho de celular: se fizermos isso,
 * teremos impacto no que já foi aprovado?
 *
 * A resposta técnica é não, e ela depende de uma disciplina: ajuste de celular
 * entra como `@media (max-width: N)`, que por definição não é avaliado acima de
 * N pixels. O que a pessoa aprovou continua sendo pintado pelas mesmas regras.
 *
 * Só que "depende de uma disciplina" é promessa, e promessa não sobrevive a
 * pressa. Este script transforma a promessa em prova.
 *
 * Ele reúne TODA declaração que vale na largura de desktop, guarda num retrato
 * versionado, e reprova quando ela muda. Ajuste de celular não mexe no retrato.
 * Mexer no desktop mexe, e aí o diff mostra exatamente o quê, e quem revisa
 * decide de propósito em vez de descobrir depois.
 *
 *   pnpm conferir:desktop            confere contra o retrato
 *   npx tsx scripts/conferencia/desktop.ts --gravar   grava o retrato de novo, de propósito
 *
 * O que conta como "vale no desktop":
 *
 * Regra fora de media query, sempre. E regra dentro de media query que NÃO seja
 * só de largura máxima: `prefers-color-scheme` e `prefers-reduced-motion` valem
 * em qualquer largura, então entram. `min-width` entraria também, e hoje não
 * existe nenhum.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { arquivosDo } from "./arquivos";
import postcss, { type AtRule, type Container, type Document, type Rule } from "postcss";

const RETRATO = "scripts/conferencia/desktop.aprovado.txt";

/*
 * Uma condição é "só de celular" quando toda restrição dela é de largura
 * máxima. `(max-width: 820px)` é; `(prefers-color-scheme: dark)` não é; e
 * `(max-width: 820px) and (orientation: landscape)` também não é, porque a
 * segunda parte pode valer no desktop.
 */
function soDeCelular(condicao: string): boolean {
  const partes = condicao
    .split(/\s+and\s+/i)
    .map((p) => p.trim())
    .filter(Boolean);

  return partes.length > 0 && partes.every((p) => /^\(\s*max-width\s*:/i.test(p));
}

function dentroDeCelular(no: Rule): boolean {
  /* O tipo vem escrito: `.parent` pode ser Document, e o inferido do primeiro
   * acesso e mais estreito que isso, entao a atribuicao dentro do laco nao
   * compilava. */
  let pai: Container | Document | undefined = no.parent;

  while (pai) {
    if (pai.type === "atrule") {
      const media = pai as AtRule;
      if (media.name === "media" && soDeCelular(media.params)) return true;
    }
    pai = pai.parent;
  }

  return false;
}

function declaracoesDe(arquivo: string): string[] {
  const raiz = postcss.parse(readFileSync(arquivo, "utf8"), { from: arquivo });
  const linhas: string[] = [];

  raiz.walkRules((regra: Rule) => {
    if (dentroDeCelular(regra)) return;

    /*
     * A condição do media query entra na chave, e não o número da linha.
     *
     * Assim mover um bloco de lugar não conta como mudança de aparência, o que
     * é o certo: quem reorganiza o arquivo não está mudando o desktop. Mas
     * `prefers-color-scheme: dark` e a regra fora dele são entradas distintas,
     * porque pintam em situações distintas.
     */
    const contexto =
      regra.parent?.type === "atrule"
        ? `@${(regra.parent as AtRule).name} ${(regra.parent as AtRule).params} `
        : "";

    regra.walkDecls((decl) => {
      const importante = decl.important ? " !important" : "";
      linhas.push(
        `${arquivo}  ${contexto}${regra.selector.replace(/\s+/g, " ")}  ${decl.prop}: ${decl.value.replace(/\s+/g, " ")}${importante}`,
      );
    });
  });

  return linhas;
}

const arquivos = arquivosDo("*.css");

const atual = arquivos.flatMap(declaracoesDe).sort();
const gravar = process.argv.includes("--gravar");

if (gravar) {
  writeFileSync(RETRATO, atual.join("\n") + "\n");
  console.log(`retrato gravado: ${atual.length} declarações de desktop`);
  process.exit(0);
}

if (!existsSync(RETRATO)) {
  console.error(`Não existe retrato em ${RETRATO}. Grave com: npx tsx scripts/conferencia/desktop.ts --gravar`);
  process.exit(1);
}

const aprovado = readFileSync(RETRATO, "utf8").split("\n").filter(Boolean);

const noAprovado = new Set(aprovado);
const noAtual = new Set(atual);

const sairam = aprovado.filter((l) => !noAtual.has(l));
const entraram = atual.filter((l) => !noAprovado.has(l));

if (sairam.length === 0 && entraram.length === 0) {
  console.log(`O desktop não mudou: ${atual.length} declarações, iguais ao aprovado.`);
  process.exit(0);
}

console.error("O desktop MUDOU. O cliente aprovou a aparência no computador em 02/09.\n");

for (const l of sairam) console.error(`  saiu    ${l}`);
for (const l of entraram) console.error(`  entrou  ${l}`);

console.error(`\n${sairam.length} saíram, ${entraram.length} entraram.`);
console.error("");
console.error("Ajuste de celular entra em @media (max-width: N), e não aparece aqui.");
console.error("Se a mudança é no desktop e é de propósito, grave o retrato de novo:");
console.error("  npx tsx scripts/conferencia/desktop.ts --gravar");
process.exit(1);
