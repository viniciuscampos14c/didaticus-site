import Image from "next/image";
import Link from "next/link";
import { LINK_WHATSAPP } from "@/dados/escola";
import css from "./previa.module.css";

export const metadata = {
  title: "Prévia da área do responsável",
  robots: { index: false, follow: false },
};

const secoes = [
  { id: "agenda", nome: "Agenda", indice: "01" },
  { id: "relatos", nome: "Relatos", indice: "02" },
  { id: "notas", nome: "Notas", indice: "03" },
  { id: "faturas", nome: "Faturas", indice: "04" },
];

export default function PreviaPortal() {
  return (
    <div className={css.pagina}>
      <aside className={css.lateral} aria-label="Navegação da prévia">
        <Link href="/" className={css.marca} aria-label="Didaticus, página inicial">
          <Image src="/marca/didaticus-horizontal-oficial.png" alt="Didaticus" width={2172} height={724} sizes="180px" />
        </Link>
        <div className={css.linha} />
        <p className={css.rotuloLateral}>Área do responsável</p>
        <nav aria-label="Seções da área do responsável">
          <a href="#inicio" className={css.ativo}>Visão geral</a>
          {secoes.map((secao) => (
            <a href={`#${secao.id}`} key={secao.id}>
              <span>{secao.nome}</span><small>{secao.indice}</small>
            </a>
          ))}
        </nav>
        <div className={css.rodapeLateral}>
          <p>Uma visão clara da rotina de estudos.</p>
          <Link href="/portal">Voltar ao site <span aria-hidden="true">↗</span></Link>
        </div>
      </aside>

      <main className={css.principal} id="inicio">
        <div className={css.topo}>
          <span className={css.selo}>Prévia da interface</span>
          <Link href="/portal">Voltar ao site <span aria-hidden="true">↗</span></Link>
        </div>

        <header className={css.abertura}>
          <div>
            <p className={css.sobretitulo}>PORTAL DO RESPONSÁVEL</p>
            <h1>A rotina de estudos,<br /><em>mais perto de você.</em></h1>
            <p>Este é o desenho da área que reunirá as informações do aluno. Os dados aparecerão apenas depois da autenticação e da integração com o sistema da Didaticus.</p>
          </div>
          <div className={css.ficha} aria-label="Estado do acesso">
            <span className={css.fichaPonto} aria-hidden="true" />
            <div><small>ACESSO</small><strong>Em preparação</strong><span>Nenhum aluno ou informação pessoal é exibido nesta prévia.</span></div>
          </div>
        </header>

        <section className={css.areaAluno} aria-label="Aluno selecionado">
          <div className={css.avatar} aria-hidden="true">D</div>
          <div><span>ÁREA DO ALUNO</span><strong>Os alunos vinculados aparecerão aqui</strong></div>
          <span className={css.etiqueta}>Após entrar</span>
        </section>

        <div className={css.grade}>
          <section id="agenda" className={`${css.cartao} ${css.agenda}`}>
            <div className={css.cabecalhoCartao}><div><p className={css.indice}>01 / ROTINA</p><h2>Próximas aulas</h2></div><span className={css.iconeAgenda} aria-hidden="true">↗</span></div>
            <div className={css.linhaAgenda}>
              <div className={css.dataVazia} aria-hidden="true"><span>—</span><small>—</small></div>
              <div><strong>A agenda aparecerá aqui</strong><p>Dia, horário, disciplina e professor de cada aula, depois que a família entrar.</p></div>
            </div>
            <p className={css.baseCartao}>As informações virão da agenda do sistema interno.</p>
          </section>

          <section id="relatos" className={css.cartao}>
            <div className={css.cabecalhoCartao}><div><p className={css.indice}>02 / ACOMPANHAMENTO</p><h2>Relatos das aulas</h2></div><span className={css.iconeSimples} aria-hidden="true">✎</span></div>
            <div className={css.vazio}><div className={css.tracos} aria-hidden="true"><i /><i /><i /></div><strong>O que foi trabalhado</strong><p>Os registros das aulas ajudarão a família a acompanhar o percurso do aluno.</p></div>
          </section>

          <section id="notas" className={css.cartao}>
            <div className={css.cabecalhoCartao}><div><p className={css.indice}>03 / EVOLUÇÃO</p><h2>Notas</h2></div><span className={css.iconeSimples} aria-hidden="true">◌</span></div>
            <div className={css.vazio}><div className={css.barras} aria-hidden="true"><i /><i /><i /><i /></div><strong>Um histórico para consultar</strong><p>As notas cadastradas para o aluno ficarão reunidas nesta seção.</p></div>
          </section>

          <section id="faturas" className={`${css.cartao} ${css.financeiro}`}>
            <div className={css.cabecalhoCartao}><div><p className={css.indice}>04 / FINANCEIRO</p><h2>Faturas</h2></div><span className={css.iconeSimples} aria-hidden="true">▤</span></div>
            <div className={css.vazio}><strong>Valores e vencimentos em um lugar</strong><p>Quando o acesso estiver pronto, o responsável autorizado verá apenas as faturas ligadas aos seus alunos.</p></div>
          </section>
        </div>

        <section className={css.ajuda}>
          <div><p className={css.sobretitulo}>ENQUANTO PREPARAMOS O ACESSO</p><h2>Precisa de uma informação agora?</h2><p>A equipe da Didaticus continua disponível pelo WhatsApp para dúvidas sobre aulas, agenda e pagamentos.</p></div>
          <a href={LINK_WHATSAPP}>Falar com a equipe <span aria-hidden="true">↗</span></a>
        </section>
      </main>
    </div>
  );
}
