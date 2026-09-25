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
        <div className={css.apresentacao}><Link href="/" className={css.marca} aria-label="Didaticus, voltar ao site"><svg className={css.marcaSimbolo} viewBox="0 0 88 96" fill="none" aria-hidden="true" focusable="false"><path d="M10 35C25 26 45 16 59 10L72 14C52 20 35 29 16 39L10 35Z" fill="#FF6533"/><path d="M15 39C34 29 52 21 73 17L77 22C56 26 37 34 19 43L15 39Z" fill="white"/><path d="M19 43C38 34 57 27 78 24L81 29C59 33 40 40 22 47L19 43Z" fill="white"/><path d="M22 46C42 39 61 33 81 31L83 36C62 39 43 45 24 51L22 46Z" fill="white"/><path fillRule="evenodd" clipRule="evenodd" d="M13 41C28 36 43 35 52 37C69 40 78 51 78 63C78 79 65 89 45 92L15 95C10 96 7 93 7 88V49C7 45 9 43 13 41ZM38 51V77L43 76C53 75 60 70 60 63C60 55 52 50 43 50L38 51Z" fill="#FF6533"/></svg><span className={css.marcaNome}>DIDATICUS<small>AULAS PARTICULARES</small></span></Link><span className={css.selo}>ÁREA DA FAMÍLIA</span><h1>Acompanhe cada passo <em>mais de perto.</em></h1><p>Aulas, pagamentos e pedidos reunidos para você acompanhar a rotina de estudos do seu filho.</p><div className={css.detalhe}><strong>Seu acesso é pessoal</strong><small>Use o e-mail e a senha cadastrados pela equipe da Didaticus.</small></div></div>
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
