"use client";

import { useEffect, useRef, useState } from "react";
import css from "./Abertura.module.css";

/*
 * A abertura da home: a marca cresce e o site aparece por dentro do D.
 *
 * Escolhida pelo cliente em 23/09/2026 entre três protótipos. O nome do efeito é
 * animação guiada pela rolagem: a rolagem deixa de mover a página e passa a
 * controlar o tempo de uma cena, que anda para frente e para trás.
 *
 * QUEM RECORTA A JANELA É O ALFA DO PRÓPRIO ARQUIVO DA MARCA, e não uma máscara
 * desenhada por nós. A primeira versão fazia o contrário, com um marinho atrás
 * do PNG e uma máscara traçada por cima, e a diferença entre o traçado e o furo
 * real do arquivo virava um anel azul em volta da janela, que engrossava
 * conforme a cena ampliava. Aqui o marinho é que leva a máscara, folgada de
 * propósito, e a marca vai por cima inteira: a borda passa a ser exata por
 * construção.
 *
 * O contorno em `contraforma.json` foi traçado do canal alfa do PNG e serve só
 * para tirar o marinho de trás. Ele nunca define a borda que se vê.
 */

/* A caixa de tinta da marca dentro do arquivo de 1254x1254. */
const TINTA = { x: 328, y: 218, largura: 652, altura: 830 };

/*
 * O contorno do vazio do D, em coordenadas da caixa de tinta.
 *
 * Fica aqui e não num import de JSON porque ele entra no HTML do servidor: uma
 * busca a mais no primeiro carregamento da home, pela porta do site, custa mais
 * do que as duas linhas que ele ocupa.
 */
const CONTRAFORMA =
  "M369 268 L426 282 L446 296 L459 310 L468 324 L474 338 L479 352 L483 366 " +
  "L486 380 L488 394 L489 408 L490 422 L491 436 L491 450 L491 464 L491 478 " +
  "L490 492 L489 506 L488 520 L486 534 L483 548 L479 562 L474 576 L468 590 " +
  "L460 604 L450 618 L436 632 L418 646 L392 660 L352 674 L320 681 L300 681 " +
  "L300 674 L299 660 L299 646 L299 632 L299 618 L300 604 L300 590 L300 576 " +
  "L300 562 L300 548 L300 534 L300 520 L300 506 L300 492 L300 478 L300 464 " +
  "L300 450 L299 436 L300 422 L300 408 L300 394 L300 380 L300 366 L300 352 " +
  "L300 338 L300 324 L300 310 L300 296 L300 282 L330 268 Z";

/*
 * Quanto da tela a marca ocupa antes de a rolagem começar.
 *
 * Calibrado em 23/09: a primeira versão usava 1.0 e a marca estourava a moldura.
 * Ela precisa ser grande o bastante para a pessoa reconhecer a marca antes de
 * rolar, e pequena o bastante para caber com folga.
 */
const PARTE_DA_TELA = 0.46;

/* O quadro de desenho da cena, em unidades próprias. */
const LADO = 512;

export function Abertura({ children }: { children: React.ReactNode }) {
  const trilha = useRef<HTMLElement>(null);
  const marca = useRef<SVGGElement>(null);

  /*
   * Começa desligada e liga depois de montar.
   *
   * O servidor não tem `matchMedia` nem rolagem, e ler qualquer um dos dois
   * durante a renderização faria o HTML dele divergir do primeiro do navegador.
   * Enquanto está desligada, o que aparece é o site, que é o certo: quem tem
   * animação desligada no sistema nunca vê a cena, e quem não tem vê o site por
   * uma fração de segundo antes de a marca cobrir.
   */
  const [animando, setAnimando] = useState(false);

  useEffect(() => {
    const querParado = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (querParado.matches) return;

    setAnimando(true);

    let pedido: number | null = null;

    const medir = () => {
      pedido = null;
      const alvo = trilha.current;
      const desenho = marca.current;
      if (!alvo || !desenho) return;

      const caixa = alvo.getBoundingClientRect();
      const alcance = caixa.height - window.innerHeight;
      const andado = alcance > 0 ? Math.min(1, Math.max(0, -caixa.top / alcance)) : 0;

      /*
       * A escala cresce em curva, e não em reta. Em reta a primeira metade da
       * rolagem quase não mostra nada e a segunda passa voando.
       */
      const escala = 1 + Math.pow(andado, 2.4) * 170;
      desenho.style.transform = `scale(${escala.toFixed(3)})`;
      desenho.style.opacity = andado > 0.9 ? String(Math.max(0, (1 - andado) / 0.1)) : "1";
    };

    const aoRolar = () => {
      if (pedido === null) pedido = requestAnimationFrame(medir);
    };

    medir();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", medir);

    return () => {
      if (pedido !== null) cancelAnimationFrame(pedido);
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", medir);
    };
  }, []);

  /* A marca centrada no quadro, no tamanho de repouso. */
  const escala = (LADO * PARTE_DA_TELA) / TINTA.altura;
  const x = (LADO - TINTA.largura * escala) / 2;
  const y = (LADO - TINTA.altura * escala) / 2;
  const assento = `translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${escala.toFixed(4)})`;

  /* O zoom sai do centro da janela, para a ampliação entrar reta pela porta. */
  const centro = {
    x: (((x + 395 * escala) / LADO) * 100).toFixed(1),
    y: (((y + 474.5 * escala) / LADO) * 100).toFixed(1),
  };

  return (
    <section ref={trilha} className={animando ? css.trilha : css.semCena}>
      <div className={animando ? css.cena : undefined}>
        {children}

        {animando && (
          <div
            className={css.cobertura}
            aria-hidden="true"
            style={{ transformOrigin: `${centro.x}% ${centro.y}%` }}
          >
            <svg viewBox={`0 0 ${LADO} ${LADO}`} preserveAspectRatio="xMidYMid slice">
              <defs>
                <mask
                  id="janelaDoD"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width={LADO}
                  height={LADO}
                >
                  <rect width={LADO} height={LADO} fill="#fff" />
                  {/*
                   * O furo sai 3% folgado. Ele só precisa tirar o marinho de
                   * trás, e encostar na borda é o que produzia o anel azul.
                   */}
                  <g transform={assento}>
                    <g transform="translate(395,474.5) scale(1.03) translate(-395,-474.5)">
                      <path fill="#000" d={CONTRAFORMA} />
                    </g>
                  </g>
                </mask>
              </defs>

              <g ref={marca} style={{ transformOrigin: `${centro.x}% ${centro.y}%` }}>
                <rect width={LADO} height={LADO} fill="#1B3A5C" mask="url(#janelaDoD)" />
                <g transform={assento}>
                  <image
                    href="/marca/didaticus-simbolo.png"
                    x={-TINTA.x}
                    y={-TINTA.y}
                    width="1254"
                    height="1254"
                  />
                </g>
              </g>
            </svg>
          </div>
        )}
      </div>
    </section>
  );
}
