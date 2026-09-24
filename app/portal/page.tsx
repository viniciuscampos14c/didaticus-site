import { PaginaInstitucional, paginaCss as css } from "@/componentes/PaginaInstitucional";
import { LINK_WHATSAPP } from "@/dados/escola";
import Link from "next/link";

export const metadata = { title: "Portal do responsável" };

export default function Portal() {
  return <PaginaInstitucional categoria="Portal do responsável" titulo="Acompanhe a trajetória do aluno de perto." introducao="A Didaticus está preparando um acesso para que responsáveis consultem informações das aulas em um só lugar.">
    <section className={css.faixa}><p className={css.olho}>O que o portal reunirá</p><h2>Informação para acompanhar a rotina.</h2><div className={css.grade}><article><h3>Agenda de cada filho</h3><p>Próximas aulas e histórico, com um aluno selecionado por vez.</p></article><article><h3>Financeiro</h3><p>Valores em aberto, formas de pagamento e histórico do que já foi pago.</p></article><article><h3>Cadastro e pedidos</h3><p>Dados do aluno e solicitação de agendamento ou remarcação para a escola analisar.</p></article></div><p className={css.nota}>O acesso ainda não foi liberado. A integração depende das consultas do responsável na API do sistema interno. Quando estiver pronta, a família entrará com suas próprias credenciais; nenhum dado de aluno será exibido nesta página pública.</p><p><Link href="/portal/previa">Conhecer a prévia da área do responsável →</Link></p></section>
    <section className={css.chamada}><div><h2>Precisa consultar uma informação agora?</h2><a className={css.botao} href={LINK_WHATSAPP}>Falar com a equipe →</a></div></section>
  </PaginaInstitucional>;
}
