import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

/*
 * Os tipos da API, gerados do contrato que ela publica.
 *
 * ESTE ARQUIVO É A DEFESA DA SEPARAÇÃO. Enquanto o site morava no monorepo,
 * mudar um contrato da API quebrava a compilação do site na mesma hora, porque
 * os dois compilavam juntos. Separado em 23/09/2026, essa rede sumiu: a quebra
 * passaria a aparecer em produção, na frente de um pai, e não no terminal de
 * quem fez a mudança.
 *
 * A rede volta por aqui. A API expõe o próprio contrato em `/v1/docs-json`, e o
 * `openapi.json` deste repositório é uma cópia commitada dele. O `npm run
 * tipos` compila o site contra os tipos gerados dessa cópia, então contrato
 * errado vira erro de compilação de novo.
 *
 * Falta a cópia envelhecer, que é o defeito que ela mesma introduz: alguém muda
 * a API, esquece de rodar `contrato:gerar`, e o arquivo passa a descrever uma
 * API que não existe mais. Por isso o modo `--conferir`: ele busca o contrato
 * de verdade e compara com o commitado. É ele que roda antes de publicar.
 */

const RAIZ = resolve(__dirname, "..");
const COPIA = resolve(RAIZ, "openapi.json");
const TIPOS = resolve(RAIZ, "tipos", "api.ts");

const ENDERECO =
  process.env.API_CONTRATO_URL ?? "https://api.didaticusaulas.com.br/v1/docs-json";

const conferindo = process.argv.includes("--conferir");

async function buscar(): Promise<string> {
  const resposta = await fetch(ENDERECO);

  if (!resposta.ok) {
    throw new Error(
      `A API respondeu ${resposta.status} em ${ENDERECO}. ` +
        `Se ela estiver fora do ar, rode de novo depois: sem o contrato de verdade ` +
        `não dá para saber se a cópia está velha.`,
    );
  }

  /*
   * Reescrito com indentação, e não gravado como veio. Contrato numa linha só
   * transforma qualquer diferença num diff de uma linha, e é justamente no diff
   * que a pessoa lê o que mudou na API.
   */
  return JSON.stringify(await resposta.json(), null, 2) + "\n";
}

async function principal() {
  const doServidor = await buscar();

  if (conferindo) {
    let commitado: string;
    try {
      commitado = readFileSync(COPIA, "utf8");
    } catch {
      console.error(
        "Não existe openapi.json neste repositório. Rode `npm run contrato:gerar`.",
      );
      process.exit(1);
    }

    if (commitado !== doServidor) {
      console.error(
        "O contrato commitado não descreve mais a API.\n" +
          "Alguém mudou a API e este repositório não acompanhou.\n" +
          "Rode `npm run contrato:gerar`, confira o diff e comite junto.",
      );
      process.exit(1);
    }

    console.log("O contrato commitado ainda descreve a API.");
    return;
  }

  writeFileSync(COPIA, doServidor, "utf8");

  /*
   * O gerador é chamado pelo caminho dele dentro de `node_modules`, e não por
   * `npx` com `shell: true`. Com shell, o Node concatena os argumentos numa
   * linha de comando em vez de escapá-los, e um caminho com espaço ou aspas
   * deixa de ser argumento e vira comando. Este repositório já mora em pasta
   * com espaço no nome, então não é hipótese distante.
   */
  const gerador = resolve(RAIZ, "node_modules", "openapi-typescript", "bin", "cli.js");
  execFileSync(process.execPath, [gerador, COPIA, "-o", TIPOS], {
    cwd: RAIZ,
    stdio: "inherit",
  });

  console.log(`Contrato e tipos atualizados de ${ENDERECO}`);
}

principal().catch((erro: unknown) => {
  console.error(erro instanceof Error ? erro.message : String(erro));
  process.exit(1);
});
