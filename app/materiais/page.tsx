import { PaginaInstitucional, paginaCss as css } from "@/componentes/PaginaInstitucional";

export const metadata = { title: "Materiais" };

export default function Materiais() {
  return <PaginaInstitucional categoria="Materiais" titulo="Ferramentas para estudar com mais direção." introducao="Este espaço receberá materiais produzidos e aprovados pela Didaticus para apoiar a rotina de estudos.">
    <section className={css.faixa}><p className={css.olho}>Em preparação</p><h2>Baixe somente o que foi revisado.</h2><p>Planners e exercícios aparecerão aqui quando a escola disponibilizar os arquivos e aprovar as condições de acesso. Ainda não há downloads publicados.</p></section>
  </PaginaInstitucional>;
}
