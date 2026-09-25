"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import css from "./Cabecalho.module.css";
import { PORTAL_DESTINO } from "@/dados/portal-destino";

const links = [
  { href: "/aulas", texto: "Aulas" },
  { href: "/como-funciona", texto: "Como funciona" },
  { href: "/professores", texto: "Professores" },
  { href: "/precos", texto: "Preços" },
  { href: "/conteudos", texto: "Conteúdos" },
  { href: "/sobre", texto: "A Didaticus" },
  { href: "/contato", texto: "Contato" },
];

export function Cabecalho() {
  const [aberto, setAberto] = useState(false);
  return (
    <nav className={css.barra} aria-label="Navegação principal">
      <Link href="/" className={css.marca} aria-label="Didaticus, página inicial" onClick={() => setAberto(false)}>
        <Image src="/marca/didaticus-horizontal-oficial.png" alt="Didaticus, aulas particulares" width={2172} height={724} sizes="(max-width: 960px) 155px, 195px" priority />
      </Link>
      <button type="button" className={css.alternar} aria-expanded={aberto} aria-controls="menu-principal" onClick={() => setAberto(!aberto)}>
        <span>{aberto ? "Fechar" : "Menu"}</span><span aria-hidden="true">{aberto ? "×" : "☰"}</span>
      </button>
      <ul id="menu-principal" className={`${css.links} ${aberto ? css.aberto : ""}`}>
        {links.map((link) => <li key={link.href}><Link href={link.href} onClick={() => setAberto(false)}>{link.texto}</Link></li>)}
        <li><Link href={PORTAL_DESTINO} className={css.portal} onClick={() => setAberto(false)}>Portal do responsável</Link></li>
      </ul>
    </nav>
  );
}
