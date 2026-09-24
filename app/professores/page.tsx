import { PaginaInstitucional, paginaCss as css } from "@/componentes/PaginaInstitucional";
import { LINK_WHATSAPP } from "@/dados/escola";

export const metadata = { title: "Professores" };

export default function Professores() {
  return <PaginaInstitucional categoria="Professores" titulo="Ensinar bem começa por entender quem aprende." introducao="A Didaticus organiza o encontro entre a necessidade do aluno e o professor que atende a disciplina, a região e o horário da família.">
    <section className={css.faixa}><p className={css.olho}>Nossa forma de trabalhar</p><h2>Mais que uma lista de nomes.</h2><p>O professor certo para uma família depende da matéria, do momento do aluno e da disponibilidade real para aquela aula. Por isso, a indicação começa com uma conversa.</p><div className={css.grade}><article><h3>Disciplina</h3><p>A equipe identifica o conteúdo que precisa de atenção.</p></article><article><h3>Disponibilidade</h3><p>O horário é combinado considerando a rotina da família e do professor.</p></article><article><h3>Acompanhamento</h3><p>O que acontece na aula alimenta o acompanhamento do aluno.</p></article></div><p className={css.nota}>Os perfis individuais entrarão aqui quando a escola autorizar a publicação das fotos e formações cadastradas no sistema.</p></section>
    <section className={css.chamada}><div><h2>Conte a matéria e a série do aluno.</h2><a className={css.botao} href={LINK_WHATSAPP}>Encontrar um professor →</a></div></section>
  </PaginaInstitucional>;
}
