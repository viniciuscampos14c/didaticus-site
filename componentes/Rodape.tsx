import Image from "next/image";
import css from "./Rodape.module.css";

/*
 * O rodapé.
 *
 * O que falta aqui é dado da escola que o sistema ainda não tem: o cadastro da
 * unidade está sem CNPJ, endereço, telefone e e-mail. Em vez de inventar um
 * telefone de exemplo, que é o jeito mais rápido de um site nascer mentindo,
 * este rodapé mostra só o que é verdade hoje.
 *
 * Quando a escola preencher o cadastro, o contato entra aqui vindo da API, que
 * é onde ele já deveria estar.
 */

const SECOES = [
  {
    titulo: "Aulas",
    itens: ["Presencial, em casa", "Por videoconferência", "Acompanhamento pedagógico"],
  },
  {
    titulo: "A escola",
    itens: ["Quem somos", "Professores", "Trabalhe conosco"],
  },
  {
    titulo: "Para a família",
    itens: ["Portal do responsável", "Materiais para baixar", "Contato"],
  },
];

export function Rodape() {
  return (
    <footer className={css.rodape}>
      <div className={css.conteudo}>
        <div className={css.marca}>
          <Image
            src="/marca/didaticus-empilhada.png"
            alt="Didaticus, aulas particulares"
            width={150}
            height={150}
          />
        </div>

        <nav className={css.colunas} aria-label="Rodapé">
          {SECOES.map((secao) => (
            <div key={secao.titulo}>
              <h2>{secao.titulo}</h2>
              <ul>
                {secao.itens.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <p className={css.linhaFinal}>
        Didaticus, aulas particulares em Brasília. Acesso da equipe pelo sistema.
      </p>
    </footer>
  );
}
