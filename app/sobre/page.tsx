import { PaginaInstitucional, paginaCss as css } from "@/componentes/PaginaInstitucional";
import { LINK_WHATSAPP, TEMPO_DE_CASA } from "@/dados/escola";

export const metadata = { title: "A Didaticus" };

export default function Sobre() {
  return <PaginaInstitucional categoria="A Didaticus" titulo="Ensino próximo de cada aluno e de cada família." introducao={`Há ${TEMPO_DE_CASA}, a Didaticus oferece aulas particulares no Distrito Federal, com professores preparados e atenção às necessidades de cada estudante.`}>
    <section className={css.faixa}><p className={css.olho}>Nosso trabalho</p><h2>Cada aluno chega com um jeito de aprender.</h2><p>A Didaticus apresenta a personalização como parte do seu trabalho: considera as particularidades do estudante, a etapa escolar e a disponibilidade da família ao organizar as aulas.</p><div className={css.grade}><article><h3>Ensino fundamental</h3><p>Apoio para acompanhar os conteúdos e lidar com as dúvidas que aparecem na escola.</p></article><article><h3>Ensino médio</h3><p>Uma aula voltada às disciplinas e avaliações desta etapa.</p></article><article><h3>Vestibular</h3><p>Preparação orientada pelas matérias que exigem mais atenção do aluno.</p></article></div></section>
    <section className={css.chamada}><div><h2>Vamos conversar sobre o seu filho?</h2><a className={css.botao} href={LINK_WHATSAPP}>Falar com a equipe →</a></div></section>
  </PaginaInstitucional>;
}
