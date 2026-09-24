import { PaginaInstitucional, paginaCss as css } from "@/componentes/PaginaInstitucional";
import { LINK_WHATSAPP } from "@/dados/escola";

export const metadata = { title: "Contato" };

export default function Contato() {
  return <PaginaInstitucional categoria="Contato" titulo="Conte para a gente o que o aluno precisa." introducao="A conversa pode começar com uma matéria, uma prova ou uma dificuldade que ainda não tem nome. A equipe ajuda a encontrar o próximo passo.">
    <section className={css.faixa}><p className={css.olho}>Fale com a Didaticus</p><h2>O primeiro contato é simples.</h2><p>Envie uma mensagem com a série do aluno, a matéria e o bairro onde a família está. A equipe apresenta as soluções disponíveis e orienta sobre o agendamento.</p><div className={css.grade}><article><h3>WhatsApp</h3><p>(61) 99996-7400 é o contato divulgado pela escola.</p><a href={LINK_WHATSAPP}>Iniciar conversa →</a></article><article><h3>Onde fica</h3><p>SRTVN Quadra 701, Conjunto 124, Ala A, salas 610/612, Asa Norte, Brasília, DF.</p></article><article><h3>Já é cliente?</h3><p>Fale com a equipe sobre agenda e solicitações de aula.</p><a href={LINK_WHATSAPP}>Conversar com a equipe →</a></article></div></section>
  </PaginaInstitucional>;
}
