import Image from "next/image";
import { Abertura } from "@/componentes/Abertura";
import { Rodape } from "@/componentes/Rodape";
import { COMO_FUNCIONA, MATERIAS, QUANTOS_BAIRROS, REGIOES } from "@/dados/escola";
import css from "./home.module.css";

/*
 * A home.
 *
 * O primeiro quadro fica DENTRO da abertura: é ele que aparece por dentro do D
 * quando a marca se abre. O resto vem embaixo, como qualquer página.
 *
 * ELA VENDE, e essa é a decisão que veio da pesquisa. A home do concorrente
 * direto é uma tela só, sem rolagem: marca, menu e um botão. Quem chega pelo
 * Google cai numa porta em vez de numa apresentação, e é a maior brecha que
 * eles deixam. Repetir isso com uma abertura bonita por cima seria trocar um
 * erro por um erro mais caro.
 *
 * O TEXTO É HTML NORMAL, POR BAIXO DA CENA. Se o JavaScript não rodar, a
 * abertura não acontece e o site continua sendo um site, indexável. A cena é
 * acréscimo, e não a página.
 */

export default function Home() {
  return (
    <>
      <Abertura>
        <header className={css.primeiroQuadro}>
          <nav className={css.topo}>
            <Image
              src="/marca/didaticus-horizontal.webp"
              alt="Didaticus, aulas particulares"
              width={200}
              height={67}
              priority
              className={css.marca}
            />
            <ul className={css.menu}>
              <li>Aulas</li>
              <li>Professores</li>
              <li>Preços</li>
              <li>Materiais</li>
              {/*
               * O acesso do responsável é o único item destacado, e é de
               * propósito: nenhum concorrente de Brasília tem portal do
               * responsável, e é o que a Didaticus tem e eles não.
               */}
              <li className={css.portal}>Portal do responsável</li>
            </ul>
          </nav>

          <div className={css.chamada}>
            <h1>Aula particular que a família acompanha.</h1>
            <p>
              Em casa ou online, em Brasília. Cada aula com relato do professor, e o
              responsável vendo a agenda, as notas e as faturas pelo portal.
            </p>
            <a className={css.botao} href="#comecar">
              Quero uma aula
            </a>
          </div>

          <p className={css.rodapeDoQuadro}>
            {REGIOES.map((r) => r.curto).join(" · ")}
          </p>
        </header>
      </Abertura>

      <main className={css.corpo}>
        {/* ---------------------------------------------- as modalidades */}
        <section className={css.faixa} aria-labelledby="modalidades">
          <div className={css.larguraTexto}>
            <p className={css.olho}>Como a aula acontece</p>
            <h2 id="modalidades">Na sua casa ou na tela, com a mesma preparação.</h2>
          </div>

          <div className={css.duasColunas}>
            <article className={css.cartao}>
              <h3>Presencial, em casa</h3>
              <p>
                O professor vai até vocês. A escola cuida de não marcar duas aulas em
                pontas opostas da cidade com meia hora entre elas, porque professor
                atrasado é aula encurtada.
              </p>
            </article>
            <article className={css.cartao}>
              <h3>Por videoconferência</h3>
              <p>
                Mesmo dia e hora marcados, mesma preparação. A diferença é que o
                professor não tem o caderno do aluno na frente, então ele pede as fotos
                antes em vez de descobrir na hora.
              </p>
            </article>
          </div>
        </section>

        {/* ---------------------------------------------- como funciona */}
        <section className={`${css.faixa} ${css.faixaEscura}`} aria-labelledby="como">
          <div className={css.larguraTexto}>
            <p className={css.olho}>Da primeira conversa à primeira aula</p>
            <h2 id="como">Cinco passos, e você sabe onde está em cada um.</h2>
          </div>

          <ol className={css.passos}>
            {COMO_FUNCIONA.map((passo, i) => (
              <li key={passo.titulo} className={css.passo}>
                <span className={css.numero} aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3>{passo.titulo}</h3>
                  <p>{passo.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------------------------------------------- matérias */}
        <section className={css.faixa} aria-labelledby="materias">
          <div className={css.larguraTexto}>
            <p className={css.olho}>O que a escola ensina</p>
            <h2 id="materias">
              {MATERIAS.length} matérias, da alfabetização ao terceiro ano.
            </h2>
            <p className={css.apoio}>
              Acompanhamento pedagógico é o caso em que a dificuldade não é de
              conteúdo. Ele existe na lista porque é uma pergunta diferente, e a
              resposta também.
            </p>
          </div>

          <ul className={css.materias}>
            {MATERIAS.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------- onde atende */}
        <section className={`${css.faixa} ${css.faixaClara}`} aria-labelledby="onde">
          <div className={css.larguraTexto}>
            <p className={css.olho}>Onde a Didaticus atende</p>
            <h2 id="onde">{QUANTOS_BAIRROS} bairros do Distrito Federal.</h2>
            <p className={css.apoio}>
              A região entra no cálculo da aula desde a marcação, e não como surpresa na
              fatura.
            </p>
          </div>

          <div className={css.regioes}>
            {REGIOES.map((regiao) => (
              <article key={regiao.nome} className={css.regiao}>
                <h3>{regiao.curto}</h3>
                <p className={css.bairros}>{regiao.bairros.join(" · ")}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------ portal */}
        <section className={`${css.faixa} ${css.faixaMarca}`} aria-labelledby="portal">
          <div className={css.larguraTexto}>
            <p className={css.olho}>O que ninguém mais tem por aqui</p>
            <h2 id="portal">O portal do responsável.</h2>
            <p className={css.destaque}>
              A agenda do seu filho, o relato que o professor escreveu depois de cada
              aula, as notas e as faturas. Tudo no mesmo lugar, a qualquer hora, sem
              precisar ligar para a secretaria para saber como foi a semana.
            </p>
            <a className={css.botaoVazado} href="#comecar">
              Ver como funciona
            </a>
          </div>
        </section>

        {/* ----------------------------------------------------- convite */}
        <section className={`${css.faixa} ${css.convite}`} id="comecar">
          <div className={css.larguraTexto}>
            <h2>Conte o que está acontecendo.</h2>
            <p className={css.apoio}>
              A conversa começa pela dificuldade, e não pelo pacote de horas. Responder
              leva dois minutos.
            </p>
            <a className={css.botao} href="#comecar">
              Falar com a Didaticus
            </a>
          </div>
        </section>
      </main>

      <Rodape />
    </>
  );
}
