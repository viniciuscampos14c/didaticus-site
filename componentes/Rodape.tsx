import Image from "next/image";
import Link from "next/link";
import { LINK_WHATSAPP } from "@/dados/escola";
import css from "./Rodape.module.css";

const grupos = [
  { titulo: "Aulas", links: [{ texto: "Presenciais", href: "/aulas/presenciais" }, { texto: "Suporte online", href: "/aulas/online" }, { texto: "Preços", href: "/precos" }] },
  { titulo: "A escola", links: [{ texto: "Como funciona", href: "/como-funciona" }, { texto: "Professores", href: "/professores" }, { texto: "Trabalhe conosco", href: "/trabalhe-conosco" }] },
  { titulo: "Para a família", links: [{ texto: "Portal do responsável", href: "/portal" }, { texto: "Blog", href: "/blog" }, { texto: "Materiais", href: "/materiais" }] },
];

export function Rodape() {
  return <footer className={css.rodape}>
    <div className={css.conteudo}>
      <div className={css.marca}>
        <Link href="/" aria-label="Didaticus, página inicial"><Image src="/marca/didaticus-horizontal-oficial.png" alt="Didaticus, aulas particulares" width={2172} height={724} sizes="220px" /></Link>
        <p>Aulas particulares em Brasília, com atenção ao caminho de cada aluno.</p>
      </div>
      <nav className={css.colunas} aria-label="Rodapé">
        {grupos.map(grupo => <div key={grupo.titulo}><h2>{grupo.titulo}</h2><ul>{grupo.links.map(link => <li key={link.href}><Link href={link.href}>{link.texto}</Link></li>)}</ul></div>)}
        <div><h2>Fale com a gente</h2><ul><li><a href={LINK_WHATSAPP}>WhatsApp (61) 99996-7400</a></li><li><Link href="/contato">Contato</Link></li></ul></div>
      </nav>
    </div>
    <p className={css.linhaFinal}>Didaticus · Brasília, DF</p>
  </footer>;
}
