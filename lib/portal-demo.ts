// Credenciais apenas para a interface de demonstração local. Nunca autenticam na API.
export const EMAIL_DEMO = "familia.demo@didaticus.local";
export const SENHA_DEMO = "Didaticus#2026";

export function dadosDeDemonstracao() {
  const data = (dias: number) => {
    const valor = new Date();
    valor.setDate(valor.getDate() + dias);
    valor.setHours(14, 0, 0, 0);
    return valor.toISOString();
  };
  return {
    usuario: { id: "usuario-demo", nome: "Mariana Silva", perfil: "RESPONSAVEL", responsavelId: "responsavel-demo" },
    alunos: [
      { id: "aluno-luiza", nome: "Luiza Silva", serieEscolar: "8º ano", colegio: { nome: "Colégio Exemplo" } },
      { id: "aluno-gabriel", nome: "Gabriel Silva", serieEscolar: "5º ano", colegio: { nome: "Colégio Exemplo" } },
    ],
    aulas: [
      { id: "aula-1", inicioEm: data(2), fimEm: data(2), status: "AGENDADA", modalidade: "PRESENCIAL", disciplina: { nome: "Matemática" }, professor: { nome: "Prof. Ana" }, alunos: [{ aluno: { id: "aluno-luiza" } }] },
      { id: "aula-2", inicioEm: data(5), fimEm: data(5), status: "AGENDADA", modalidade: "ONLINE", disciplina: { nome: "Redação" }, professor: { nome: "Prof. Bruno" }, alunos: [{ aluno: { id: "aluno-luiza" } }] },
      { id: "aula-3", inicioEm: data(3), fimEm: data(3), status: "AGENDADA", modalidade: "PRESENCIAL", disciplina: { nome: "Ciências" }, professor: { nome: "Prof. Paula" }, alunos: [{ aluno: { id: "aluno-gabriel" } }] },
    ],
    cobrancas: [
      { id: "cobranca-1", competencia: data(0), vencimentoEm: data(8), status: "EMITIDA", valorTotal: "480.00", linkPagamento: null, pixCopiaECola: null },
      { id: "cobranca-2", competencia: data(-30), vencimentoEm: data(-22), status: "PAGA", valorTotal: "420.00", valorPago: "420.00" },
    ],
    pedidos: [{ id: "pedido-1", alunoId: "aluno-luiza", status: "EM_ANALISE", mensagem: "Remarcar a aula de matemática", criadoEm: data(-2) }],
  };
}
