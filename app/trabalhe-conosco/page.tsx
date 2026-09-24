import { PaginaInstitucional, paginaCss as css } from "@/componentes/PaginaInstitucional";
import { LINK_WHATSAPP } from "@/dados/escola";

export const metadata = { title: "Trabalhe conosco" };

export default function TrabalheConosco() {
  return <PaginaInstitucional categoria="Trabalhe conosco" titulo="Seu jeito de ensinar pode fazer diferença." introducao="Professores que gostam de acompanhar o desenvolvimento individual dos alunos encontram na Didaticus uma escola voltada ao ensino próximo.">
    <section className={css.faixa}><p className={css.olho}>Para professores</p><h2>Quer conversar com a equipe?</h2><p>Conte sua formação, as disciplinas que leciona e as regiões ou horários em que pode atender. O processo de candidatura pelo site será aberto quando a integração de cadastro estiver pronta.</p><p className={css.nota}>Não envie documentos pessoais por esta página. Enquanto a candidatura online não está disponível, confirme com a equipe o canal adequado para apresentar seu perfil.</p></section>
    <section className={css.chamada}><div><h2>Converse com a Didaticus sobre oportunidades.</h2><a className={css.botao} href={LINK_WHATSAPP}>Falar com a equipe →</a></div></section>
  </PaginaInstitucional>;
}
