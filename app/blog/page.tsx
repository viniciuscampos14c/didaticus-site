import { PaginaInstitucional, paginaCss as css } from "@/componentes/PaginaInstitucional";

export const metadata = { title: "Blog" };

export default function Blog() {
  return <PaginaInstitucional categoria="Blog" titulo="Conversas sobre aprender e ensinar." introducao="Os artigos da Didaticus serão publicados aqui pela equipe da escola, com orientações para alunos e responsáveis.">
    <section className={css.faixa}><p className={css.olho}>Em preparação</p><h2>Conteúdo com autoria e data.</h2><p>A página está pronta para receber artigos próprios. As publicações entrarão depois da revisão pedagógica e editorial da escola.</p></section>
  </PaginaInstitucional>;
}
