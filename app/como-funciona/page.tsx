import { PaginaInstitucional, paginaCss as css } from "@/componentes/PaginaInstitucional";
import { LINK_WHATSAPP } from "@/dados/escola";

export const metadata = { title: "Como funciona" };

const etapas = [
  { titulo: "Chame no WhatsApp", texto: "Conte a série, a matéria e o que motivou a busca por apoio." },
  { titulo: "Conheça as soluções", texto: "A equipe apresenta o atendimento disponível para a necessidade do aluno." },
  { titulo: "Agende a primeira aula", texto: "Família e escola combinam a data e o horário antes de começar." },
  { titulo: "Receba o professor", texto: "Nas aulas em domicílio, o professor vai até o aluno na região atendida." },
];

export default function ComoFunciona() {
  return <PaginaInstitucional categoria="Como funciona" titulo="Quatro passos para começar." introducao="A Didaticus apresenta um caminho direto: conversar, conhecer as soluções, agendar e receber o professor para a primeira aula em domicílio.">
    <section className={css.faixa}><p className={css.olho}>Passo a passo</p><h2>Um caminho claro desde o início.</h2><div className={css.grade}>{etapas.map((e,i) => <article key={e.titulo}><p className={css.olho}>{String(i+1).padStart(2,"0")}</p><h3>{e.titulo}</h3><p>{e.texto}</p></article>)}</div></section>
    <section className={css.chamada}><div><h2>Comece contando o que seu filho precisa.</h2><a className={css.botao} href={LINK_WHATSAPP}>Conversar pelo WhatsApp →</a></div></section>
  </PaginaInstitucional>;
}
