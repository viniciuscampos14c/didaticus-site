import Image from "next/image";
import { Abertura } from "@/componentes/Abertura";
import { Rodape } from "@/componentes/Rodape";
import { BotaoWhatsapp } from "@/componentes/BotaoWhatsapp";
import { Cabecalho } from "@/componentes/Cabecalho";
import {
  BENEFICIOS,
  LINK_WHATSAPP,
  MATERIAS,
  NIVEIS,
  PASSOS,
  QUANTOS_BAIRROS,
  REGIOES,
  TEMPO_DE_CASA,
} from "@/dados/escola";
import css from "./home.module.css";

/*
 * A home.
 *
 * A LINGUAGEM VISUAL É A DA LANDING QUE A ESCOLA JÁ PUBLICA, e não a do sistema.
 * A primeira versão desta página saiu em creme e com letra editorial, e o
 * cliente a chamou de grotesca: tinha a cara do sistema interno, que é calmo
 * porque é feito para oito horas de uso, e não a da vitrine. A escola já tem uma
 * voz visual para vender, e ela é outra: marinho com a estampa de material
 * escolar, título em caixa alta, laranja destacando as palavras que importam, e
 * foto de aluno em bloco colorido.
 *
 * O primeiro quadro fica DENTRO da abertura: é ele que aparece pela janela do D.
 * O resto vem embaixo, e segue o ritmo da landing: marinho, ciano, laranja.
 *
 * O texto é HTML normal, por baixo da cena. Sem JavaScript a abertura não
 * acontece e o site continua sendo um site, indexável.
 */

export default function Home() {
  return (
    <>
      <Abertura>
        <header className={css.heroi}>
          <Cabecalho />

          <div className={css.heroiMiolo}>
            <div className={css.heroiTexto}>
              <p className={css.selo}>Aulas particulares · Brasília</p>
              <h1 className={css.titulo}>
                O jeito de aprender muda. <span className={css.realce}>O cuidado acompanha.</span>
              </h1>
              <p className={css.heroiApoio}>
                Aulas particulares em domicílio, adaptadas à matéria e ao ritmo
                do seu filho. O primeiro passo é contar o que ele precisa.
              </p>

              <div className={css.acoes}>
                <a className={css.botaoWhats} href={LINK_WHATSAPP} target="_blank" rel="noopener noreferrer">
                  <IconeWhats /> Agendar aula agora
                </a>
                <a className={css.botaoFantasma} href="/como-funciona">
                  Como funciona
                </a>
              </div>

              <ul className={css.provas}>
                <li><strong>Há {TEMPO_DE_CASA}</strong> no Distrito Federal</li>
                <li><strong>{QUANTOS_BAIRROS} bairros</strong> atendidos</li>
                <li><strong>{MATERIAS.length} matérias</strong></li>
              </ul>
            </div>

            <div className={css.heroiFoto}>
              <Image
                src="/lp/imagem-banner.webp"
                alt="Três alunos sorrindo, com caderno, mochila e computador"
                width={615}
                height={583}
                sizes="(max-width: 900px) 420px, 560px"
                priority
              />
            </div>
          </div>
        </header>
      </Abertura>

      <main className={css.corpo}>
        {/* ------------------------------------------------ os benefícios */}
        <section className={`${css.faixa} ${css.faixaCiano}`} aria-labelledby="beneficios">
          <div className={css.miolo}>
            <h2 id="beneficios" className={css.tituloSecao}>
              Didaticus é o reforço escolar que{" "}
              <span className={css.realce}>melhora as notas</span> do seu filho
            </h2>

            <ul className={css.beneficios}>
              {BENEFICIOS.map((b) => (
                <li key={b.titulo} className={css.beneficio}>
                  <Image src={b.icone} alt="" width={58} height={59} sizes="58px" className={css.beneficioIcone} />
                  <h3>{b.titulo}</h3>
                  <p>{b.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* -------------------------------------------- como contratar */}
        <section className={`${css.faixa} ${css.faixaLaranja}`} id="como" aria-labelledby="titulo-como">
          <div className={css.miolo}>
            <h2 id="titulo-como" className={css.tituloSecao}>
              Como contratar a Didaticus
            </h2>
            <p className={css.subtitulo}>São apenas 4 passos</p>

            <ol className={css.passos}>
              {PASSOS.map((p) => (
                <li key={p.titulo} className={css.passo}>
                  {/* O número já está no ícone da escola: o ladrilho amarelo com o algarismo laranja. */}
                  <Image src={p.icone} alt="" width={90} height={87} sizes="64px" className={css.passoIcone} />
                  <p>{p.titulo}</p>
                </li>
              ))}
            </ol>

            <a className={css.botaoAmarelo} href={LINK_WHATSAPP} target="_blank" rel="noopener noreferrer">
              Começar pelo passo 1
            </a>
          </div>
        </section>

        {/* ------------------------------------------ níveis e matérias */}
        <section className={css.faixa} id="materias" aria-labelledby="titulo-materias">
          <div className={`${css.miolo} ${css.duasMetades}`}>
            <div>
              <h2 id="titulo-materias" className={css.tituloSecao}>
                Do fundamental ao <span className={css.realce}>vestibular</span>
              </h2>
              <p className={css.textoSecao}>
                Com {TEMPO_DE_CASA} no mercado, a Didaticus reconhece o que cada aluno
                tem de próprio e adapta a aula a ele: ao jeito de aprender, à matéria
                que trava e aos horários que a família tem.
              </p>
              <ul className={css.niveis}>
                {NIVEIS.map((n) => (
                  <li key={n}>
                    <span className={css.marcador} aria-hidden="true" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>

            <div className={css.caixaMaterias}>
              <p className={css.rotuloMaterias}>{MATERIAS.length} matérias</p>
              <ul className={css.materias}>
                {MATERIAS.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ onde atende */}
        <section className={`${css.faixa} ${css.faixaMarinho}`} id="onde" aria-labelledby="titulo-onde">
          <div className={css.miolo}>
            <h2 id="titulo-onde" className={css.tituloSecao}>
              O professor vai até você em{" "}
              <span className={css.realceAmarelo}>{QUANTOS_BAIRROS} bairros</span>
            </h2>
            <p className={css.subtitulo}>
              A região entra no cálculo da aula desde a marcação, e não como surpresa na fatura.
            </p>

            <div className={css.regioes}>
              {REGIOES.map((r) => (
                <article key={r.nome} className={css.regiao}>
                  <h3>{r.curto}</h3>
                  <ul>
                    {r.bairros.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- o portal */}
        <section className={css.faixa} id="portal" aria-labelledby="titulo-portal">
          <div className={`${css.miolo} ${css.portalCaixa}`}>
            <div className={css.portalTexto}>
              <p className={css.seloEscuro}>Portal do responsável · em implantação</p>
              <h2 id="titulo-portal" className={css.tituloSecao}>
                Você acompanha <span className={css.realce}>cada aula</span>, sem precisar ligar
              </h2>
              <p className={css.textoSecao}>
                Quando o acesso estiver disponível, você poderá consultar a agenda do seu filho,
                os relatos das aulas, as notas e as faturas em um só lugar.
              </p>
            </div>

            <ul className={css.portalItens}>
              <li><strong>Agenda</strong> Os dias e horários de cada aula</li>
              <li><strong>Relato</strong> O que foi dado e como o aluno respondeu</li>
              <li><strong>Notas</strong> O desempenho ao longo do tempo</li>
              <li><strong>Faturas</strong> Boleto e PIX na mesma fatura</li>
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------ o fechamento */}
        <section className={`${css.faixa} ${css.fechamento}`} aria-labelledby="titulo-final">
          <div className={css.miolo}>
            <h2 id="titulo-final" className={css.tituloSecao}>
              A próxima conquista começa com uma conversa.
            </h2>
            <p className={css.subtitulo}>
              Conte a série, a matéria e o que o aluno precisa. A equipe ajuda a organizar a primeira aula.
            </p>
            <a className={css.botaoWhats} href={LINK_WHATSAPP} target="_blank" rel="noopener noreferrer">
              <IconeWhats /> Agendar a primeira aula
            </a>
          </div>
        </section>
      </main>

      <Rodape />
      <BotaoWhatsapp />
    </>
  );
}

function IconeWhats() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.84 9.84 0 0 0 12.04 2Zm5.8 14.13c-.24.68-1.42 1.32-1.95 1.37-.5.05-.97.23-3.27-.68-2.77-1.09-4.51-3.92-4.65-4.1-.13-.18-1.11-1.48-1.11-2.82 0-1.34.7-2 .95-2.28.25-.27.54-.34.72-.34h.52c.17 0 .39-.06.61.47.24.55.8 1.9.87 2.04.07.14.12.3.02.48-.09.18-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.56.16.27.7 1.16 1.51 1.88 1.04.93 1.92 1.21 2.19 1.35.27.14.43.12.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.23.61-.14.25.09 1.59.75 1.86.89.27.14.45.2.52.32.07.11.07.66-.17 1.3Z" />
    </svg>
  );
}
