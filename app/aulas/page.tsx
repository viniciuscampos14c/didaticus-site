import Link from "next/link";
import { PaginaInstitucional, paginaCss as css } from "@/componentes/PaginaInstitucional";
import { MATERIAS, NIVEIS, LINK_WHATSAPP } from "@/dados/escola";

export const metadata = { title: "Aulas particulares" };

export default function Aulas() {
  return <PaginaInstitucional categoria="Aulas particulares" titulo="Uma aula construída em torno do aluno." introducao="Do ensino fundamental à preparação para o vestibular, a Didaticus adapta o atendimento à matéria, ao momento e à rotina de cada estudante.">
    <section className={css.faixa}>
      <p className={css.olho}>Como podemos ajudar</p><h2>O apoio certo começa pela conversa.</h2>
      <div className={css.grade}>
        <article><h3>Em casa</h3><p>O professor vai até a família nas regiões atendidas do Distrito Federal.</p><Link href="/aulas/presenciais">Conhecer as aulas presenciais →</Link></article>
        <article><h3>Dúvidas entre as aulas</h3><p>O suporte online divulgado pela Didaticus ajuda o aluno quando surgem dúvidas depois do encontro.</p><Link href="/aulas/online">Entender o suporte online →</Link></article>
        <article><h3>Um plano para começar</h3><p>A família conta a série, a disciplina e a dificuldade. A equipe apresenta as soluções disponíveis antes do agendamento.</p><Link href="/como-funciona">Entender como funciona →</Link></article>
      </div>
    </section>
    <section className={css.faixa}><div className={css.duasColunas}><div><p className={css.olho}>Etapas de ensino</p><h2>Do fundamental ao vestibular.</h2><ul className={css.lista}>{NIVEIS.map(n => <li key={n}>{n}</li>)}</ul></div><div><p className={css.olho}>Disciplinas</p><h2>Ajuda para a matéria que precisa.</h2><p>{MATERIAS.join(" · ")}</p></div></div></section>
    <section className={css.chamada}><div><h2>Conte o que o aluno precisa neste momento.</h2><a className={css.botao} href={LINK_WHATSAPP}>Conversar sobre as aulas →</a></div></section>
  </PaginaInstitucional>;
}
