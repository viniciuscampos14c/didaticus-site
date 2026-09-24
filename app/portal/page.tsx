import { PaginaInstitucional, paginaCss as css } from "@/componentes/PaginaInstitucional";
import { LINK_WHATSAPP } from "@/dados/escola";
import Link from "next/link";

export const metadata = { title: "Portal do responsável" };

const portalHabilitado = process.env.NEXT_PUBLIC_PORTAL_ENABLED === "true";

export default function Portal() {
  return <PaginaInstitucional categoria="Portal do responsável" titulo="Acompanhe a trajetória do aluno de perto." introducao={portalHabilitado ? "Entre com o acesso criado pela equipe da Didaticus para acompanhar a rotina do seu filho." : "Estamos preparando um acesso para que você acompanhe a rotina do seu filho em um só lugar."}>
    <section className={css.faixa}><p className={css.olho}>Área da família</p><h2>Informação para acompanhar a rotina.</h2><div className={css.grade}><article><h3>Agenda de cada filho</h3><p>Próximas aulas e histórico, com um aluno selecionado por vez.</p></article><article><h3>Financeiro</h3><p>Valores em aberto e histórico do que já foi pago pela família.</p></article><article><h3>Cadastro e pedidos</h3><p>Dados do aluno e solicitação de agendamento ou remarcação para a escola analisar.</p></article></div><p><Link href={portalHabilitado ? "/portal/entrar" : "/portal/previa"}>{portalHabilitado ? "Entrar no portal do responsável" : "Conhecer a prévia do portal"} →</Link></p></section>
    <section className={css.chamada}><div><h2>Precisa consultar uma informação agora?</h2><a className={css.botao} href={LINK_WHATSAPP}>Falar com a equipe →</a></div></section>
  </PaginaInstitucional>;
}
