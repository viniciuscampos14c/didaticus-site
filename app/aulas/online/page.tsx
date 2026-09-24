import { PaginaInstitucional, paginaCss as css } from "@/componentes/PaginaInstitucional";
import { LINK_WHATSAPP } from "@/dados/escola";

export const metadata = { title: "Suporte online" };

export default function Online() {
  return <PaginaInstitucional categoria="Aulas particulares / suporte online" titulo="A dúvida não precisa esperar a próxima aula." introducao="A Didaticus informa que o aluno pode enviar dúvidas entre os encontros. A equipe orienta sobre o funcionamento desse suporte no primeiro contato.">
    <section className={css.faixa}><p className={css.olho}>Entre uma aula e outra</p><h2>O estudo continua em casa.</h2><p>O suporte online é um dos benefícios apresentados pela escola. Se a família procura aulas completas por videochamada, vale consultar a equipe sobre a disponibilidade e as condições atuais dessa modalidade.</p></section>
    <section className={css.chamada}><div><h2>Quer saber qual atendimento combina com a sua rotina?</h2><a className={css.botao} href={LINK_WHATSAPP}>Perguntar à equipe →</a></div></section>
  </PaginaInstitucional>;
}
