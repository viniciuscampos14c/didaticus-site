import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

/*
 * Quais arquivos as guardas conferem.
 *
 * Existe porque as três listavam por conta e as três tinham o mesmo buraco: só
 * olhavam o que o `git` já rastreia. Arquivo novo é justamente o que ninguém
 * revisou ainda, e ele ficava invisível no commit que o introduz.
 *
 * O caso que revelou isso foi o rodapé, em 03/09: o `conferir:desktop` disse
 * "o desktop não mudou, 2836 declarações" com uma folha de estilo nova inteira
 * na pasta, ainda sem `git add`. A guarda não estava errada nos números, estava
 * cega para o arquivo, e passar por engano é pior do que reprovar por engano.
 *
 * Então a lista soma o rastreado com o não rastreado que não está no
 * `.gitignore`. O `--exclude-standard` é o que garante a segunda parte: sem
 * ele, `node_modules` e `.next` entrariam.
 */

function rodarGit(argumentos: string[]): string[] {
  const saida = execFileSync("git", argumentos, {
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });

  return saida.split("\n").filter(Boolean);
}

/*
 * Skill de terceiro não é texto nosso, e não é folha nossa. O `.claude/` sai
 * das três guardas pelo mesmo motivo: reprovar o estilo de quem escreveu a
 * skill não conserta nada aqui.
 */
function nosso(caminho: string): boolean {
  return !caminho.startsWith(".claude/");
}

export function arquivosDo(...padroes: string[]): string[] {
  const rastreados = rodarGit(["ls-files", ...padroes]);
  const novos = rodarGit(["ls-files", "--others", "--exclude-standard", ...padroes]);

  /*
   * Apagado e ainda rastreado sai da lista. O `git ls-files` devolve o caminho
   * até o commit da remoção, e ler um arquivo que não existe derruba a guarda
   * inteira. Já aconteceu em 02/09, e guarda que estoura é guarda que parou de
   * rodar sem ninguém notar.
   */
  const existentes = [...new Set([...rastreados, ...novos])]
    .filter(nosso)
    .filter((caminho) => existsSync(caminho));

  return existentes.sort();
}
