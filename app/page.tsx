import Image from "next/image";
import { Abertura } from "@/componentes/Abertura";
import css from "./home.module.css";

/*
 * A home.
 *
 * O primeiro quadro fica DENTRO da abertura: é ele que aparece por dentro do D
 * quando a marca se abre. O resto da página vem embaixo, como qualquer página.
 *
 * O TEXTO É HTML NORMAL, POR BAIXO DA CENA. Se o JavaScript não rodar, a
 * abertura simplesmente não acontece e o site continua sendo um site, indexável
 * pelo Google. A cena é acréscimo, e não a página.
 */

const REGIOES = ["Asa Sul", "Asa Norte", "Lago Norte", "Águas Claras", "Sudoeste", "Noroeste"];

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
               * O acesso do pai é o único item destacado, e é de propósito:
               * nenhum concorrente de Brasília tem portal do responsável, e é o
               * que a Didaticus tem e eles não.
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
            <a className={css.botao} href="#pedir">
              Quero uma aula
            </a>
          </div>

          <p className={css.rodapeDoQuadro}>{REGIOES.join(" · ")} e mais</p>
        </header>
      </Abertura>

      <main className={css.corpo}>
        <section className={css.secao} id="pedir">
          <h2>Daqui para frente</h2>
          <p>
            As páginas do site entram nesta parte, abaixo da abertura. O que já está
            decidido e o que ainda falta decidir está em <code>docs/PESQUISA.md</code>.
          </p>
        </section>
      </main>
    </>
  );
}
