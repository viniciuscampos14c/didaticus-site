import Image from "next/image";
import { LINK_WHATSAPP } from "@/dados/escola";
import css from "./Rodape.module.css";

/*
 * O rodapé.
 *
 * O contato que falta aqui é dado que o sistema ainda não tem: o cadastro da
 * unidade está sem CNPJ, endereço, telefone e e-mail. O WhatsApp entra porque a
 * própria escola o publica na landing. O resto fica de fora em vez de virar
 * dado de exemplo, que é o jeito mais rápido de um site nascer mentindo.
 */

const SECOES = [
  {
    titulo: "Aulas",
    itens: ["Presencial, em casa", "Por videoconferência", "Preparatório para o vestibular"],
  },
  {
    titulo: "A escola",
    itens: ["Como funciona", "Onde atendemos", "Trabalhe conosco"],
  },
  {
    titulo: "Para a família",
    itens: ["Portal do responsável", "Materiais para baixar"],
  },
];

export function Rodape() {
  return (
    <footer className={css.rodape}>
      <div className={css.conteudo}>
        <div className={css.marca}>
          <Image src="/marca/didaticus-simbolo.png" alt="" width={1254} height={1254} sizes="48px" className={css.simbolo} />
          <Image src="/marca/didaticus-palavra.webp" alt="Didaticus, aulas particulares" width={2000} height={667} sizes="160px" className={css.palavra} />
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
          <div>
            <h2>Fale com a gente</h2>
            <ul>
              <li>
                <a href={LINK_WHATSAPP} target="_blank" rel="noopener noreferrer">
                  WhatsApp (61) 99996-7400
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <p className={css.linhaFinal}>Didaticus, aulas particulares em Brasília.</p>
    </footer>
  );
}
