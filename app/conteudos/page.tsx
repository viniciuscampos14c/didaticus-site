import { PaginaInstitucional, paginaCss as css } from "@/componentes/PaginaInstitucional";
import { LINK_WHATSAPP } from "@/dados/escola";
import Link from "next/link";

export const metadata = { title: "Conteúdos" };

export default function Conteudos() {
  return <PaginaInstitucional categoria="Conteúdos" titulo="Aprender continua entre uma aula e outra." introducao="Este espaço reunirá materiais de estudo e orientações para alunos e famílias. O conteúdo será publicado pela equipe da Didaticus.">
    <section className={css.faixa}><p className={css.olho}>Em preparação</p><h2>Materiais que ajudam de verdade.</h2><div className={css.grade}><article><h3>Materiais</h3><p>Planners e exercícios revisados antes da publicação.</p><Link href="/materiais">Ver materiais →</Link></article><article><h3>Blog</h3><p>Orientações para organizar os estudos e acompanhar a aprendizagem.</p><Link href="/blog">Visitar o blog →</Link></article><article><h3>Para responsáveis</h3><p>Leituras sobre acompanhamento escolar e conversa com os filhos.</p></article></div><p className={css.nota}>Os downloads e artigos aparecerão aqui quando houver conteúdo aprovado pela escola. Não haverá arquivos de exemplo apresentados como material oficial.</p></section>
    <section className={css.chamada}><div><h2>Precisa de ajuda com uma matéria agora?</h2><a className={css.botao} href={LINK_WHATSAPP}>Falar com a Didaticus →</a></div></section>
  </PaginaInstitucional>;
}
