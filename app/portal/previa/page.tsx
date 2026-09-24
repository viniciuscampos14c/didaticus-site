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
  { id: "financeiro", nome: "Financeiro", indice: "02" },
  { id: "cadastro", nome: "Cadastro", indice: "03" },
  { id: "solicitacoes", nome: "Solicitações", indice: "04" },
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
            <p>Este é o desenho da área que reunirá agenda, financeiro e dados de um filho por vez. Os dados aparecerão apenas depois da autenticação e da integração com o sistema da Didaticus.</p>
          </div>
          <div className={css.ficha} aria-label="Estado do acesso">
            <span className={css.fichaPonto} aria-hidden="true" />
            <div><small>ACESSO</small><strong>Em preparação</strong><span>Nenhum aluno ou informação pessoal é exibido nesta prévia.</span></div>
          </div>
        </header>

        <section className={css.areaAluno} aria-label="Aluno selecionado">
          <div className={css.avatar} aria-hidden="true">D</div>
          <div><span>ALUNO SELECIONADO</span><strong>Escolha um filho após entrar</strong></div>
          <span className={css.etiqueta}>Após entrar</span>
        </section>

        <div className={css.grade}>
          <section id="agenda" className={`${css.cartao} ${css.agenda}`}>
            <div className={css.cabecalhoCartao}><div><p className={css.indice}>01 / ROTINA</p><h2>Próximas aulas</h2></div><span className={css.iconeAgenda} aria-hidden="true">↗</span></div>
            <div className={css.linhaAgenda}>
              <div className={css.dataVazia} aria-hidden="true"><span>—</span><small>—</small></div>
              <div><strong>A agenda aparecerá aqui</strong><p>Dia, horário, disciplina e professor das aulas do filho selecionado.</p></div>
            </div>
            <p className={css.baseCartao}>As informações virão da agenda do sistema interno.</p>
          </section>

          <section id="financeiro" className={css.cartao}>
            <div className={css.cabecalhoCartao}><div><p className={css.indice}>02 / FINANCEIRO</p><h2>Pagamentos</h2></div><span className={css.iconeSimples} aria-hidden="true">▤</span></div>
            <div className={css.vazio}><div className={css.tracos} aria-hidden="true"><i /><i /><i /></div><strong>Em aberto e já pago</strong><p>Valores, vencimentos e formas de pagamento ficarão disponíveis para o responsável autorizado.</p></div>
          </section>

          <section id="cadastro" className={css.cartao}>
            <div className={css.cabecalhoCartao}><div><p className={css.indice}>03 / DADOS</p><h2>Cadastro do aluno</h2></div><span className={css.iconeSimples} aria-hidden="true">◌</span></div>
            <div className={css.vazio}><div className={css.barras} aria-hidden="true"><i /><i /><i /><i /></div><strong>Dados em um lugar</strong><p>As informações cadastrais do filho selecionado aparecerão aqui depois do acesso.</p></div>
          </section>

          <section id="solicitacoes" className={`${css.cartao} ${css.financeiro}`}>
            <div className={css.cabecalhoCartao}><div><p className={css.indice}>04 / PEDIDOS</p><h2>Solicitações de aula</h2></div><span className={css.iconeSimples} aria-hidden="true">↗</span></div>
            <div className={css.vazio}><strong>Peça um horário ou uma remarcação</strong><p>A família poderá enviar uma solicitação. A escola confirma e executa a alteração da agenda.</p></div>
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
