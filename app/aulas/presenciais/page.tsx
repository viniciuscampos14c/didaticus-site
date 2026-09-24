import { PaginaInstitucional, paginaCss as css } from "@/componentes/PaginaInstitucional";
import { LINK_WHATSAPP, QUANTOS_BAIRROS, REGIOES } from "@/dados/escola";

export const metadata = { title: "Aulas presenciais" };

export default function Presenciais() {
  return <PaginaInstitucional categoria="Aulas particulares / presencial" titulo="O professor vai até você." introducao="Aulas individuais em casa, com horários combinados para a rotina da família e atendimento em diferentes regiões do Distrito Federal.">
    <section className={css.faixa}><p className={css.olho}>Onde atendemos</p><h2>{QUANTOS_BAIRROS} bairros atendidos.</h2><p>O bairro faz parte da organização da aula desde o primeiro contato. A equipe confirma a disponibilidade do professor e o deslocamento antes do agendamento.</p><div className={css.grade}>{REGIOES.map(r => <article key={r.nome}><h3>{r.curto}</h3><p>{r.bairros.join(" · ")}</p></article>)}</div></section>
    <section className={css.chamada}><div><h2>Vamos encontrar um professor perto de você?</h2><a className={css.botao} href={LINK_WHATSAPP}>Falar com a Didaticus →</a></div></section>
  </PaginaInstitucional>;
}
