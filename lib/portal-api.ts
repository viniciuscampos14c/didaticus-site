const BASE = process.env.NEXT_PUBLIC_API_URL ??
  (typeof window !== "undefined" && window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:3001/v1"
    : "http://localhost:3001/v1");

export type UsuarioPortal = {
  id: string;
  nome: string;
  perfil: string;
  responsavelId: string | null;
};

export class ErroPortal extends Error {
  constructor(readonly status: number, mensagem: string) {
    super(mensagem);
  }
}

let renovacao: Promise<boolean> | null = null;

async function renovar(): Promise<boolean> {
  if (renovacao) return renovacao;
  const atual = fetch(`${BASE}/auth/renovar`, { method: "POST", credentials: "include" })
    .then((r) => r.ok)
    .catch(() => false);
  renovacao = atual;
  try {
    return await atual;
  } finally {
    if (renovacao === atual) renovacao = null;
  }
}

export async function portalApi<T>(rota: string, init: RequestInit = {}, repetir = true): Promise<T> {
  const resposta = await fetch(`${BASE}${rota}`, {
    ...init,
    credentials: "include",
    headers: { ...(init.body ? { "Content-Type": "application/json" } : {}), ...init.headers },
  });
  if (resposta.status === 401 && repetir && rota !== "/auth/entrar" && rota !== "/auth/renovar" && !rota.startsWith("/auth/segundo-fator") && rota !== "/auth/sair") {
    if (await renovar()) return portalApi<T>(rota, init, false);
  }
  if (!resposta.ok) {
    const corpo = await resposta.json().catch(() => null);
    const mensagem = typeof corpo?.message === "string" ? corpo.message : "Não foi possível concluir a consulta.";
    throw new ErroPortal(resposta.status, mensagem);
  }
  return resposta.status === 204 ? (undefined as T) : (resposta.json() as Promise<T>);
}

export function exigirResponsavel(usuario: UsuarioPortal): void {
  if (usuario.perfil !== "RESPONSAVEL" || !usuario.responsavelId) {
    throw new ErroPortal(403, "Este acesso não está vinculado a um responsável. Fale com a escola.");
  }
}
