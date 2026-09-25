"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ErroPortal, exigirResponsavel, portalApi, type UsuarioPortal } from "@/lib/portal-api";
import { dadosDeDemonstracao } from "@/lib/portal-demo";
import css from "./painel.module.css";

type Aluno = { id: string; nome: string; serieEscolar?: string | null; escola?: string | null; colegio?: { nome: string } | null };
type Aula = { id: string; inicioEm: string; fimEm: string; status: string; modalidade: string; disciplina?: { nome: string } | null; professor?: { nome: string } | null; alunos: { aluno: { id: string } }[] };
type Cobranca = { id: string; competencia: string; vencimentoEm: string; status: string; valorTotal: string; valorPago?: string | null; linkPagamento?: string | null; pixCopiaECola?: string | null };
type Pedido = { id: string; alunoId: string; status: string; mensagem: string; criadoEm: string };
type Dados = { alunos: Aluno[]; aulas: Aula[]; cobrancas: Cobranca[]; pedidos: Pedido[] };

const data = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
const hora = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" });
const dinheiro = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
function moeda(valor: string) { return dinheiro.format(Number(valor)); }
function quando(valor: string) { return data.format(new Date(valor)); }

export default function Painel({ demo = false }: { demo?: boolean }) {
  const router = useRouter();
  const [usuario, setUsuario] = useState<UsuarioPortal | null>(null);
  const [dados, setDados] = useState<Dados | null>(null);
  const [alunoId, setAlunoId] = useState("");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [preferencia, setPreferencia] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [aviso, setAviso] = useState("");

  async function carregar() {
    if (demo) {
      const exemplo = dadosDeDemonstracao();
      setUsuario(exemplo.usuario);
      setDados(exemplo);
      setAlunoId((atual) => atual || exemplo.alunos[0].id);
      return;
    }
    try {
      const sessao = await portalApi<{ usuario: UsuarioPortal }>("/auth/eu");
      exigirResponsavel(sessao.usuario);
      setUsuario(sessao.usuario);
      const agora = new Date();
      const de = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() - 1).toISOString();
      const ate = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() + 60).toISOString();
      const [alunos, agenda, financeiro, solicitacoes] = await Promise.all([
        portalApi<{ itens: Aluno[] }>("/alunos?porPagina=200"),
        portalApi<{ aulas: Aula[] }>(`/agenda?de=${encodeURIComponent(de)}&ate=${encodeURIComponent(ate)}`),
        portalApi<{ cobrancas: Cobranca[] }>("/cobrancas"),
        portalApi<{ solicitacoes: Pedido[] }>("/solicitacoes"),
      ]);
      setDados({ alunos: alunos.itens, aulas: agenda.aulas, cobrancas: financeiro.cobrancas, pedidos: solicitacoes.solicitacoes });
      setAlunoId((atual) => atual || alunos.itens[0]?.id || "");
    } catch (e) {
      if (e instanceof ErroPortal && e.status === 401) { router.replace("/portal/entrar"); return; }
      setErro(e instanceof Error ? e.message : "Não foi possível carregar seus dados.");
    }
  }

  useEffect(() => { void carregar(); }, []);

  const aluno = dados?.alunos.find((item) => item.id === alunoId);
  const aulas = useMemo(() => (dados?.aulas ?? []).filter((item) => item.alunos.some((v) => v.aluno.id === alunoId)), [dados, alunoId]);
  const proximas = aulas.filter((item) => new Date(item.inicioEm).getTime() >= Date.now() && item.status === "AGENDADA").slice(0, 4);
  const pedidos = (dados?.pedidos ?? []).filter((item) => item.alunoId === alunoId);

  async function pedir(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setAviso("");
    setEnviando(true);
    try {
      if (demo) {
        setDados((atual) => atual && ({ ...atual, pedidos: [{ id: `pedido-demo-${Date.now()}`, alunoId, status: "ABERTA", mensagem, criadoEm: new Date().toISOString() }, ...atual.pedidos] }));
        setMensagem(""); setPreferencia("");
        setAviso("Pedido registrado nesta demonstração. Nenhuma mensagem foi enviada à escola.");
        return;
      }
      await portalApi("/solicitacoes", { method: "POST", body: JSON.stringify({ alunoId, mensagem, preferencia: preferencia || undefined }) });
      setMensagem(""); setPreferencia(""); setAviso("Pedido enviado. A equipe vai analisar e responder por aqui.");
      await carregar();
    } catch (e) { setAviso(e instanceof Error ? e.message : "Não foi possível enviar o pedido."); }
    finally { setEnviando(false); }
  }

  async function sair() {
    if (demo) { router.replace("/portal/entrar"); return; }
    await portalApi("/auth/sair", { method: "POST" }).catch(() => undefined);
    router.replace("/portal/entrar");
  }

  return <main className={css.pagina}>
    <aside className={css.lateral}><Link href="/" className={css.marca}><Image src="/marca/didaticus-horizontal-oficial.png" alt="Didaticus" width={2172} height={724} /></Link><span className={css.divisor} /><p>ÁREA DO RESPONSÁVEL</p><nav aria-label="Seções do portal"><a href="#visao">Visão geral</a><a href="#agenda">Agenda</a><a href="#financeiro">Financeiro</a><a href="#cadastro">Cadastro</a><a href="#pedidos">Pedidos</a></nav><button className={css.sair} onClick={sair}>Sair do portal ↗</button></aside>
    <div className={css.conteudo} id="visao"><header className={css.topo}><span>{demo ? "DEMONSTRAÇÃO · DADOS FICTÍCIOS" : "PORTAL DO RESPONSÁVEL"}</span><button onClick={sair}>Sair ↗</button></header>
      {erro ? <div className={css.alerta} role="alert"><strong>Não foi possível abrir o painel.</strong><p>{erro}</p><button onClick={() => { setErro(""); void carregar(); }}>Tentar novamente</button></div> : !dados ? <p className={css.carregando}>Carregando informações da família...</p> : <>
        <section className={css.abertura}><div><span className={css.olho}>OLÁ, {usuario?.nome.split(" ")[0]?.toUpperCase()}</span><h1>A rotina de estudos,<br /><em>sempre por perto.</em></h1><p>Consulte as próximas aulas, acompanhe pagamentos e envie pedidos para a equipe.</p></div><span className={css.selo}>Informações da sua família</span></section>
        <div className={css.seletor}><div><small>ALUNO SELECIONADO</small><strong>{aluno?.nome ?? "Nenhum aluno vinculado"}</strong></div>{dados.alunos.length > 1 && <label>Selecionar filho<select value={alunoId} onChange={(e) => setAlunoId(e.target.value)}>{dados.alunos.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}</select></label>}</div>
        <div className={css.grade}>
          <section id="agenda" className={css.cartao}><div className={css.titulo}><span>01 / ROTINA</span><h2>Próximas aulas</h2></div>{proximas.length ? <ul className={css.lista}>{proximas.map((item) => <li key={item.id}><time>{quando(item.inicioEm)}<small>{hora.format(new Date(item.inicioEm))}</small></time><div><strong>{item.disciplina?.nome ?? "Aula particular"}</strong><p>{item.professor?.nome ?? "Professor a confirmar"} · {item.modalidade.toLowerCase()}</p></div></li>)}</ul> : <p className={css.vazio}>Nenhuma próxima aula agendada para este aluno.</p>}<small className={css.nota}>{aulas.length} aula(s) no período consultado.</small></section>
          <section id="financeiro" className={css.cartao}><div className={css.titulo}><span>02 / PAGAMENTOS</span><h2>Financeiro</h2></div><p className={css.descricao}>As cobranças são da família e podem reunir aulas de mais de um filho.</p>{dados.cobrancas.length ? <ul className={css.lista}>{dados.cobrancas.slice(0, 5).map((item) => <li key={item.id}><time>{quando(item.vencimentoEm)}</time><div><strong>{moeda(item.valorTotal)}</strong><p>{item.status === "PAGA" ? "Pago" : item.status === "VENCIDA" ? "Vencido" : "Em aberto"}</p>{item.status !== "PAGA" && item.linkPagamento?.startsWith("https://") && <a className={css.pagamento} href={item.linkPagamento} target="_blank" rel="noopener noreferrer">Abrir pagamento ↗</a>}{item.status !== "PAGA" && item.pixCopiaECola && <button className={css.pix} type="button" onClick={() => void navigator.clipboard.writeText(item.pixCopiaECola!)}>Copiar código PIX</button>}</div></li>)}</ul> : <p className={css.vazio}>Nenhuma cobrança disponível.</p>}</section>
          <section id="cadastro" className={css.cartao}><div className={css.titulo}><span>03 / DADOS</span><h2>Cadastro do aluno</h2></div>{aluno ? <dl className={css.dados}><div><dt>Aluno</dt><dd>{aluno.nome}</dd></div><div><dt>Série</dt><dd>{aluno.serieEscolar || "Não informada"}</dd></div><div><dt>Escola</dt><dd>{aluno.colegio?.nome || aluno.escola || "Não informada"}</dd></div></dl> : <p className={css.vazio}>A escola ainda não vinculou um aluno a este acesso.</p>}</section>
          <section id="pedidos" className={css.cartao}><div className={css.titulo}><span>04 / CONTATO COM A ESCOLA</span><h2>Pedidos de aula</h2></div>{pedidos.length > 0 && <p className={css.descricao}>Último pedido: {pedidos[0].status.toLowerCase().replaceAll("_", " ")} · {quando(pedidos[0].criadoEm)}</p>}<form className={css.formulario} onSubmit={pedir}><label>O que você precisa?<textarea value={mensagem} onChange={(e) => setMensagem(e.target.value)} minLength={5} maxLength={1000} required placeholder="Conte à equipe se deseja uma nova aula ou uma remarcação." /></label><label>Preferência de dia ou horário (opcional)<input value={preferencia} onChange={(e) => setPreferencia(e.target.value)} maxLength={300} placeholder="Ex.: terça-feira à tarde" /></label><button type="submit" disabled={enviando || !alunoId}>{enviando ? "Enviando..." : "Enviar pedido ↗"}</button>{aviso && <p role="status">{aviso}</p>}</form></section>
        </div></>}
    </div>
  </main>;
}
