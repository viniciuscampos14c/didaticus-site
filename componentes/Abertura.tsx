"use client";

import { useEffect, useRef, useState } from "react";
import css from "./Abertura.module.css";

export function Abertura({ children }: { children: React.ReactNode }) {
  const trilha = useRef<HTMLElement>(null);
  const cobertura = useRef<HTMLDivElement>(null);
  const [animando, setAnimando] = useState(false);

  useEffect(() => {
    if (!animando) {
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAnimando(true);
      return;
    }
    let pedido: number | null = null;
    const atualizar = () => {
      pedido = null;
      if (!trilha.current || !cobertura.current) return;
      const caixa = trilha.current.getBoundingClientRect();
      const percurso = Math.max(1, caixa.height - window.innerHeight);
      const progresso = Math.min(1, Math.max(0, -caixa.top / percurso));
      const saida = Math.min(1, Math.max(0, (progresso - .62) / .38));
      document.body.classList.toggle("em-abertura", progresso < .995);
      cobertura.current.style.setProperty("--progresso", progresso.toFixed(4));
      cobertura.current.style.setProperty("--saida", saida.toFixed(4));
      cobertura.current.style.visibility = progresso >= .995 ? "hidden" : "visible";
    };
    const aoRolar = () => { if (pedido === null) pedido = requestAnimationFrame(atualizar); };
    atualizar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);
    return () => {
      document.body.classList.remove("em-abertura");
      if (pedido !== null) cancelAnimationFrame(pedido);
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
    };
  }, [animando]);

  return <section ref={trilha} className={animando ? css.trilha : css.semCena}>
    <div className={animando ? css.cena : undefined}>
      {children}
      {animando && <div ref={cobertura} className={css.cobertura} aria-hidden="true">
        <span className={css.lateral}>DIDATICUS</span>
        <div className={css.palco}>
          <p className={css.sobre}>Aprender tem um novo caminho <span>Brasília · DF</span></p>
          <div className={css.livro}>
            <div className={css.pilha} />
            <div className={css.paginaEsquerda}>
              <small>DIDATICUS / EDUCAÇÃO</small>
              <strong>O começo de uma nova conquista.</strong>
              <span>Uma aula de cada vez, no ritmo de cada aluno.</span>
              <i />
            </div>
            <div className={css.paginaDireita}><img src="/lp/imagem-banner.webp" alt="" /></div>
            <div className={css.lombada} />
            <div className={css.capa}><img src="/marca/didaticus-empilhada-oficial.png" alt="" /></div>
          </div>
          <p className={css.convite}>Toda grande história<br />começa com <em>uma descoberta.</em></p>
          <p className={css.apoio}>Aulas particulares e acompanhamento que fazem a diferença.</p>
          <span className={css.indicacao}>Role para conhecer a Didaticus <b>↓</b></span>
        </div>
      </div>}
    </div>
  </section>;
}
