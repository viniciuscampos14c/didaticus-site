/*
 * Regra responsiva que uma regra posterior desfaz em silêncio.
 *
 * Em 02/09 o cliente mostrou a tela de entrada no celular e ela estava errada:
 * o painel de marca aparecia empilhado embaixo do formulário, quando devia
 * desaparecer. O CSS mandava esconder, e a regra estava escrita, legível, e não
 * fazia nada.
 *
 * A razão é a cascata. O `@media (max-width: 820px)` com `.painel { display:
 * none }` estava na linha 214, e o bloco `.painel { display: flex }` na 450.
 * Mesma especificidade, e em CSS quem vem depois ganha, media query ou não.
 *
 * O padrão que causa isso é natural: a pessoa escreve o ajuste responsivo perto
 * da regra que ele ajusta, a folha cresce depois, e um dia alguém declara a
 * mesma propriedade mais abaixo. Ninguém percebe, porque a regra continua lá.
 *
 * Este script usa o parser do PostCSS, e não expressão regular, porque a
 * primeira tentativa foi por regex e deu falso negativo justamente no caso que
 * eu já sabia que existia.
 *
 *   pnpm conferir:cascata
 */

import { readFileSync } from "node:fs";
import { arquivosDo } from "./arquivos";
import postcss, { type Rule, type AtRule } from "postcss";

type Colisao = {
  arquivo: string;
  seletor: string;
  propriedade: string;
  linhaDoMedia: number;
  condicao: string;
  linhaQueGanha: number;
};

function conferir(arquivo: string): Colisao[] {
  const raiz = postcss.parse(readFileSync(arquivo, "utf8"), { from: arquivo });
  const colisoes: Colisao[] = [];

  /*
   * A ordem de declaração é o que decide, então cada regra é registrada com a
   * posição dela no arquivo. Regra dentro de media query não conta como base:
   * ela é o ajuste, não o valor de partida.
   */
  type Declarada = { linha: number; propriedades: Set<string> };
  const fora = new Map<string, Declarada[]>();

  raiz.walkRules((regra: Rule) => {
    if (regra.parent?.type === "atrule") return;

    const propriedades = new Set<string>();
    /*
     * Corpo em bloco, e não expressão, porque `Set.add` devolve o conjunto e o
     * postcss tipa o retorno da varredura como `false | void`.
     *
     * É só o tipo, e não um defeito: conferido que quem interrompe a varredura
     * é `false` e nada mais, então a versão em expressão lia as três
     * declarações do mesmo jeito. Fica em bloco porque é o que compila com o
     * postcss atual, e porque não depender dessa distinção é mais barato do que
     * lembrar dela.
     */
    regra.walkDecls((d) => {
      propriedades.add(d.prop);
    });

    for (const seletor of regra.selectors) {
      const lista = fora.get(seletor) ?? [];
      lista.push({ linha: regra.source?.start?.line ?? 0, propriedades });
      fora.set(seletor, lista);
    }
  });

  raiz.walkAtRules("media", (media: AtRule) => {
    const linhaDoMedia = media.source?.start?.line ?? 0;

    media.walkRules((regra: Rule) => {
      regra.walkDecls((decl) => {
        for (const seletor of regra.selectors) {
          const depois = (fora.get(seletor) ?? []).find(
            (d) => d.linha > linhaDoMedia && d.propriedades.has(decl.prop),
          );

          if (depois) {
            colisoes.push({
              arquivo,
              seletor,
              propriedade: decl.prop,
              linhaDoMedia,
              condicao: media.params,
              linhaQueGanha: depois.linha,
            });
          }
        }
      });
    });
  });

  return colisoes;
}

const arquivos = arquivosDo("*.css");

const colisoes = arquivos.flatMap(conferir);

if (colisoes.length === 0) {
  console.log(`Nenhuma regra responsiva desfeita, em ${arquivos.length} folhas.`);
  process.exit(0);
}

console.error(`${colisoes.length} regra(s) responsiva(s) que não valem:\n`);

for (const c of colisoes) {
  console.error(`  ${c.arquivo}:${c.linhaDoMedia}`);
  console.error(`    @media ${c.condicao} manda ${c.seletor} { ${c.propriedade} }`);
  console.error(`    e a linha ${c.linhaQueGanha} redeclara ${c.propriedade} em ${c.seletor}\n`);
}

console.error("Mova o @media para DEPOIS da regra que ele ajusta.");
process.exit(1);
