"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { exigirResponsavel, portalApi, type UsuarioPortal } from "@/lib/portal-api";
import { EMAIL_DEMO, SENHA_DEMO } from "@/lib/portal-demo";
import css from "./portal.module.css";

type Entrada = {
  usuario?: UsuarioPortal;
  desafio?: string;
  precisaSegundoFator?: boolean;
  precisaCadastrarSegundoFator?: boolean;
  recuperacao?: string[];
};

export default function Entrar() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [codigo, setCodigo] = useState("");
  const [desafio, setDesafio] = useState("");
  const [segredo, setSegredo] = useState("");
  const [recuperacao, setRecuperacao] = useState<string[]>([]);
  const [erro, setErro] = useState("");
  const [ocupado, setOcupado] = useState(false);

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro("");
    setOcupado(true);
    try {
      if (process.env.NODE_ENV === "development" && email.trim().toLowerCase() === EMAIL_DEMO && !desafio) {
        if (senha !== SENHA_DEMO) throw new Error("Senha da demonstração incorreta.");
        router.replace("/portal/demo");
        return;
      }
      const resposta = desafio
        ? await portalApi<Entrada>(segredo ? "/auth/segundo-fator/confirmar" : "/auth/segundo-fator", { method: "POST", body: JSON.stringify({ desafio, codigo }) })
        : await portalApi<Entrada>("/auth/entrar", { method: "POST", body: JSON.stringify({ email, senha }) });
      if (resposta.precisaCadastrarSegundoFator && resposta.desafio) {
        const ativacao = await portalApi<{ segredo: string }>("/auth/segundo-fator/comecar", { method: "POST", body: JSON.stringify({ desafio: resposta.desafio }) });
        setDesafio(resposta.desafio);
        setSegredo(ativacao.segredo);
        return;
      }
      if (resposta.precisaSegundoFator && resposta.desafio) {
        setDesafio(resposta.desafio);
        return;
      }
      if (!resposta.usuario) throw new Error("Não foi possível confirmar o acesso.");
      if (resposta.usuario.perfil !== "RESPONSAVEL" || !resposta.usuario.responsavelId) {
        await portalApi("/auth/sair", { method: "POST" });
        exigirResponsavel(resposta.usuario);
      }
      if (resposta.recuperacao?.length) {
        setRecuperacao(resposta.recuperacao);
        return;
      }
      router.replace("/portal/painel");
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Não foi possível entrar. Tente novamente.");
    } finally {
      setOcupado(false);
    }
  }

  return <main className={css.pagina}>
    <div className={css.conteudo}>
      <div className={css.grade}>
        <div className={css.apresentacao}><Link href="/" className={css.marca} aria-label="Didaticus, voltar ao site"><span className={css.marcaSimbolo} aria-hidden="true" /><span className={css.marcaNome}>DIDATICUS<small>AULAS PARTICULARES</small></span></Link><span className={css.selo}>ÁREA DA FAMÍLIA</span><h1>Acompanhe cada passo <em>mais de perto.</em></h1><p>Aulas, pagamentos e pedidos reunidos para você acompanhar a rotina de estudos do seu filho.</p><div className={css.detalhe}><span>01</span><div><strong>Seu acesso é pessoal</strong><small>Use o e-mail e a senha cadastrados pela equipe da Didaticus.</small></div></div></div>
        <form className={css.formulario} onSubmit={enviar}>
          <span className={css.numero}>PORTAL DO RESPONSÁVEL / ENTRAR</span>
          <h2>{recuperacao.length ? "Guarde seus códigos" : segredo ? "Proteja seu acesso" : desafio ? "Confirme seu acesso" : "Bem-vindo de volta."}</h2>
          <p>{recuperacao.length ? "Anote estes códigos em um lugar seguro. Eles permitem entrar se você perder o celular." : segredo ? "Cadastre a chave abaixo no seu aplicativo de autenticação e digite o código gerado." : desafio ? "Digite o código do seu aplicativo de autenticação." : "Entre para ver as informações do aluno."}</p>
          {recuperacao.length ? <div className={css.codigos}>{recuperacao.map((item) => <code key={item}>{item}</code>)}</div> : desafio ? <>{segredo && <div className={css.segredo}><small>CHAVE DE CONFIGURAÇÃO</small><code>{segredo}</code></div>}<label>Código de verificação<input value={codigo} onChange={(e) => setCodigo(e.target.value)} autoComplete="one-time-code" minLength={6} maxLength={20} required /></label></> : <><label>E-mail<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required /></label><label>Senha<input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} autoComplete="current-password" minLength={8} required /></label></>}
          {erro && <p className={css.erro} role="alert">{erro}</p>}
          {recuperacao.length ? <button type="button" onClick={() => router.replace("/portal/painel")}>Guardei os códigos <span aria-hidden="true">↗</span></button> : <button disabled={ocupado} type="submit">{ocupado ? "Aguarde..." : desafio ? "Confirmar código" : "Entrar no portal"}<span aria-hidden="true">↗</span></button>}
          <small>Problemas para entrar? <Link href="/contato">Fale com a equipe</Link>.</small>
          {process.env.NODE_ENV === "development" && <small className={css.demo}>Quer explorar antes de conectar a API? Use o acesso de demonstração. Os dados são fictícios.</small>}
        </form>
      </div>
    </div>
  </main>;
}
