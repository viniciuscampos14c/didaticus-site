"use client";

import { useEffect, useRef, useState } from "react";
import css from "./Abertura.module.css";

/*
 * A abertura da home: a marca cresce e o site aparece por dentro do D.
 *
 * Escolhida pelo cliente em 23/09/2026 entre três protótipos. O nome do efeito é
 * animação guiada pela rolagem: a rolagem deixa de mover a página e passa a
 * controlar o tempo de uma cena.
 *
 * O QUADRO DE DESENHO TEM O FORMATO DA TELA, e não é um quadrado. Esta é a
 * correção do defeito que o cliente chamou de grotesco: a primeira versão
 * desenhava num quadrado de 512 e cobria a tela com `slice`, que corta o que
 * sobra. Numa tela de desktop, larga, sobrava só uma faixa de uns 250 dos 512,
 * e a marca calculada para ocupar 46% do quadrado ocupava 93% da altura visível.
 * O protótipo tinha esse erro corrigido e o componente reintroduziu.
 *
 * Agora o quadro mede a tela de verdade e a marca ocupa uma fração da altura
 * real, em qualquer proporção, do monitor largo ao celular em pé.
 *
 * QUEM RECORTA A JANELA É O ALFA DO PRÓPRIO ARQUIVO DA MARCA, e não uma máscara
 * nossa. O marinho é que leva a máscara, folgada, e a marca vai por cima
 * inteira: a borda da janela é exata por construção. Com a máscara na marca, a
 * diferença entre o traçado e o furo real virava um anel azul que engrossava
 * conforme a cena ampliava.
 */

/* A caixa de tinta da marca dentro do arquivo de 1254x1254. */
const TINTA = { x: 328, y: 218, largura: 652, altura: 830 };

/* O centro da contraforma, em coordenadas da caixa de tinta: é de onde o zoom sai. */
const CENTRO_DA_JANELA = { x: 395, y: 474.5 };

/*
 * O contorno do vazio do D, traçado do canal alfa do PNG. Ele só tira o marinho
 * de trás, e nunca define a borda que se vê.
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
 * Quanto da ALTURA DA TELA a marca ocupa antes de a rolagem começar.
 *
 * Fração da tela de verdade, e não de um quadro imaginário. 0,42 foi o que o
 * cliente aprovou no protótipo, medido lá como 49% da moldura.
 */
const PARTE_DA_ALTURA = 0.42;

/* A altura do quadro de desenho, em unidades próprias. A largura acompanha a tela. */
const ALTURA = 1000;

export function Abertura({ children }: { children: React.ReactNode }) {
  const trilha = useRef<HTMLElement>(null);
  const marca = useRef<SVGGElement>(null);

  /*
   * Começa desligada e liga depois de montar. O servidor não tem `matchMedia`
   * nem tamanho de tela, e ler qualquer um dos dois durante a renderização faria
   * o HTML dele divergir do primeiro do navegador. Enquanto está desligada o que
   * aparece é o site, que é o certo para quem pediu movimento reduzido.
   */
  const [animando, setAnimando] = useState(false);
  const [proporcao, setProporcao] = useState(16 / 9);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const medirTela = () => setProporcao(window.innerWidth / window.innerHeight);
    medirTela();
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
      const escala = 1 + Math.pow(andado, 2.4) * 150;
      desenho.style.transform = `scale(${escala.toFixed(3)})`;
      desenho.style.opacity = andado > 0.9 ? String(Math.max(0, (1 - andado) / 0.1)) : "1";
    };

    const aoRolar = () => {
      if (pedido === null) pedido = requestAnimationFrame(medir);
    };

    const aoRedimensionar = () => {
      medirTela();
      medir();
    };

    medir();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRedimensionar);

    return () => {
      if (pedido !== null) cancelAnimationFrame(pedido);
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRedimensionar);
    };
  }, []);

  /* O quadro de desenho no formato da tela. */
  const largura = ALTURA * proporcao;

  /* A marca centrada, com a altura como fração da altura real da tela. */
  const escala = (ALTURA * PARTE_DA_ALTURA) / TINTA.altura;
  const x = (largura - TINTA.largura * escala) / 2;
  const y = (ALTURA - TINTA.altura * escala) / 2;
  const assento = `translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${escala.toFixed(4)})`;

  /* O zoom sai do centro da janela, para a ampliação entrar reta pela porta. */
  const origem =
    `${(((x + CENTRO_DA_JANELA.x * escala) / largura) * 100).toFixed(2)}% ` +
    `${(((y + CENTRO_DA_JANELA.y * escala) / ALTURA) * 100).toFixed(2)}%`;

  return (
    <section ref={trilha} className={animando ? css.trilha : css.semCena}>
      <div className={animando ? css.cena : undefined}>
        {children}

        {animando && (
          <div className={css.cobertura} aria-hidden="true">
            <svg viewBox={`0 0 ${largura.toFixed(1)} ${ALTURA}`} preserveAspectRatio="none">
              <defs>
                <mask
                  id="janelaDoD"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width={largura}
                  height={ALTURA}
                >
                  <rect width={largura} height={ALTURA} fill="#fff" />
                  {/* 3% folgado: ele só tira o marinho de trás, e não encosta na borda. */}
                  <g transform={assento}>
                    <g transform="translate(395,474.5) scale(1.03) translate(-395,-474.5)">
                      <path fill="#000" d={CONTRAFORMA} />
                    </g>
                  </g>
                </mask>
              </defs>

              <g ref={marca} style={{ transformOrigin: origem }}>
                {/*
                 * Marinho chapado, mais escuro que o da primeira dobra do site.
                 * É o contraste que faz a janela ler como janela: por ela se vê
                 * o fundo mais claro, com a estampa e o título, como uma sala
                 * acesa vista por uma porta.
                 */}
                <rect width={largura} height={ALTURA} fill="#021729" mask="url(#janelaDoD)" />
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
