import type { ReactNode } from "react";
import { Cabecalho } from "./Cabecalho";
import { Rodape } from "./Rodape";
import { BotaoWhatsapp } from "./BotaoWhatsapp";
import css from "./PaginaInstitucional.module.css";

type Props = {
  categoria: string;
  titulo: string;
  introducao: string;
  children: ReactNode;
};

export function PaginaInstitucional({ categoria, titulo, introducao, children }: Props) {
  return <>
    <header className={css.abertura}>
      <Cabecalho />
      <div className={css.apresentacao}>
        <p className={css.categoria}>{categoria}</p>
        <h1>{titulo}</h1>
        <p className={css.introducao}>{introducao}</p>
      </div>
    </header>
    <main className={css.conteudo}>{children}</main>
    <Rodape />
    <BotaoWhatsapp />
  </>;
}

export { css as paginaCss };
