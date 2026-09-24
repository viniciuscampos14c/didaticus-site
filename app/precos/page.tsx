import { PaginaInstitucional, paginaCss as css } from "@/componentes/PaginaInstitucional";
import { LINK_WHATSAPP } from "@/dados/escola";

export const metadata = { title: "Preços" };

export default function Precos() {
  return <PaginaInstitucional categoria="Preços" titulo="Saiba o valor antes de agendar." introducao="A equipe apresenta as condições de atendimento para a aula que sua família procura.">
    <section className={css.faixa}><p className={css.olho}>Solicite um orçamento</p><h2>Conte o que você procura.</h2><p>Ao escrever para a Didaticus, informe a série, a matéria, o bairro e os horários possíveis. Com esses dados, a equipe pode apresentar as opções de atendimento e o valor correspondente.</p><p className={css.nota}>Ainda não há valores públicos aprovados pela escola para exibir nesta página. Confirme preço e condições diretamente com a equipe.</p></section>
    <section className={css.chamada}><div><h2>Vamos encontrar a opção para sua família?</h2><a className={css.botao} href={LINK_WHATSAPP}>Pedir um orçamento →</a></div></section>
  </PaginaInstitucional>;
}
