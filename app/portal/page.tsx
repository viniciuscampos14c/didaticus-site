import { PaginaInstitucional, paginaCss as css } from "@/componentes/PaginaInstitucional";
import { LINK_WHATSAPP } from "@/dados/escola";

export const metadata = { title: "Portal do responsável" };

export default function Portal() {
  return <PaginaInstitucional categoria="Portal do responsável" titulo="Acompanhe a trajetória do aluno de perto." introducao="A Didaticus está preparando um acesso para que responsáveis consultem informações das aulas em um só lugar.">
    <section className={css.faixa}><p className={css.olho}>O que o portal reunirá</p><h2>Informação para acompanhar cada etapa.</h2><div className={css.grade}><article><h3>Agenda</h3><p>Datas e horários das aulas do aluno.</p></article><article><h3>Relatos e notas</h3><p>O que foi trabalhado e como o aluno está avançando.</p></article><article><h3>Faturas</h3><p>Valores e documentos relacionados às aulas.</p></article></div><p className={css.nota}>O acesso ainda não foi liberado. A integração depende das consultas do responsável na API do sistema interno. Quando estiver pronta, a família entrará com suas próprias credenciais; nenhum dado de aluno será exibido nesta página pública.</p></section>
    <section className={css.chamada}><div><h2>Precisa consultar uma informação agora?</h2><a className={css.botao} href={LINK_WHATSAPP}>Falar com a equipe →</a></div></section>
  </PaginaInstitucional>;
}
