# Site da Didaticus

O site institucional e o portal do responsável da Didaticus, escola de aulas
particulares em Brasília.

Repositório separado do sistema por pedido do cliente em 23/09/2026. O sistema
interno, a API e o worker continuam em [Didaticus](https://github.com/viniciuscampos14c/Didaticus).

**Nada disto está no ar.** O site que a escola tem hoje é uma landing em
WordPress, em `didaticusaulas.com.br/lp`, e a substituição é decisão do cliente.

Como se chegou em cada decisão, inclusive os erros no caminho, está em
[`docs/HISTORICO.md`](docs/HISTORICO.md). Vale ler antes de mexer na home.

## O que já está decidido

**A identidade visual é a da landing que a escola já publica, e não a do
sistema.** É a decisão que mais custou e a que não pode ser esquecida. O sistema
interno tem uma paleta calma, feita para oito horas de uso; o site é a vitrine
que o pai vê antes de decidir, e a escola já tem uma voz visual para isso:
marinho com a estampa de material escolar, título em caixa alta em Poppins 800,
laranja destacando as palavras que importam, e foto de aluno em bloco colorido.
As cores em `app/globals.css` foram amostradas da landing, e não escolhidas.

**A abertura da home.** Um livro com a marca oficial se abre durante a primeira
rolagem e revela a home. Esta direção substituiu o zoom pelo vazio do D depois
da revisão visual feita com o cliente em 24/09/2026.

**O portal do responsável é o único item destacado do menu.** Nenhum concorrente
de Brasília tem um. Ver `docs/PESQUISA.md`.

**A marca é a que o cliente entregou, e não se redesenha.** Houve três
tentativas de vetorizar e refinar: as duas primeiras foram reprovadas, e depois
da terceira o cliente mandou a marca que ele mesmo gerou. Regras de uso em
`docs/MARCA.md`.

**O WhatsApp é o canal de venda.** A landing inteira converge para ele, e o site
também: botão no herói, no fechamento, e flutuando a página toda.

## A consequência de estar separado do sistema

Aqui não se alcança os pacotes do monorepo (`@didaticus/types`,
`@didaticus/api-client`). O site conversa com a API v1 por HTTP.

O risco é conhecido: quando a API mudar um contrato, a quebra apareceria em
produção, na frente de um pai, e não no terminal de quem fez a mudança. A
defesa já existe e não é tipo escrito à mão: o `api-client` do monorepo sempre
foi gerado do OpenAPI, então este repositório gera os próprios tipos do mesmo
contrato, e o `conferir:contrato` reprova quando a cópia envelhece.

## Rodar

```bash
npm install
npm run dev        # http://localhost:3100
```

```bash
npm run build
npm run tipos      # confere os tipos sem gerar nada
```

**No Windows, servidor que ficou para trás segura a porta.** O `pkill` do Git
Bash não alcança processo do Windows, e o sintoma é o navegador mostrando a
versão velha como se o build não tivesse pegado. Para liberar a porta:

```powershell
Get-NetTCPConnection -LocalPort 3100 -State Listen | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

## Os guardas

```bash
npm run conferir            # tipos, texto, cascata e desktop de uma vez
npm run conferir:contrato   # o contrato commitado ainda descreve a API?
npm run contrato:gerar      # busca o contrato da API e regera os tipos
```

Os três primeiros são os mesmos do repositório do sistema, copiados. O `texto`
recusa marca de texto gerado por máquina, o `cascata` acusa regra responsiva
desfeita por outra, e o `desktop` compara o CSS de desktop com um retrato
aprovado. Mudou o desktop de propósito, grave de novo:

```bash
npx tsx scripts/conferencia/desktop.ts --gravar
```

**O `conferir:contrato` é o que esta separação exige e não existia lá.** Ele
busca o contrato de verdade em `/v1/docs-json` e compara com o `openapi.json`
commitado.

## Estrutura

```
app/
  page.tsx              a home, com o primeiro quadro dentro da abertura
  layout.tsx            o esqueleto e a Poppins
  globals.css           os tokens, amostrados da landing
  home.module.css       a home
componentes/
  Abertura.tsx          a animação guiada pela rolagem
  Rodape.tsx            o rodapé
  BotaoWhatsapp.tsx     o botão flutuante
dados/
  escola.ts             o conteúdo, e de onde cada parte veio
scripts/
  contrato.ts           busca o contrato da API e gera os tipos
  conferencia/          os guardas
tipos/
  api.ts                gerado do contrato, não editar à mão
public/
  marca/                os arquivos da marca que o cliente entregou
  lp/                   a estampa, a colagem de fotos e os ícones da landing
docs/
  HISTORICO.md          como se chegou em cada decisão, e os erros
  PESQUISA.md           o concorrente, e o que o site precisa ter
  MARCA.md              os arquivos da marca e onde cada um serve
```

As rotas públicas já têm páginas: aulas presenciais, suporte online, como funciona,
professores, preços, conteúdos, blog, materiais, sobre, contato e trabalhe
conosco. O portal tem uma página de apresentação e uma prévia navegável em
`/portal/previa`, com estados vazios para agenda, financeiro, cadastro e
solicitações de aula, conforme o escopo atualizado do sistema interno.
As rotas `/portal/entrar` e `/portal/painel` já usam a API do sistema interno
com a conta `RESPONSAVEL`. A página pública só aponta para a entrada quando
`NEXT_PUBLIC_PORTAL_ENABLED=true`. Para testar, configure `NEXT_PUBLIC_API_URL`
e permita a origem do site em `CORS_ORIGINS` na API. A liberação depende de
validar o fluxo com uma conta real vinculada a um aluno e os domínios HTTPS.

Para avaliar a interface sem a API, inicie o site com `npm run dev` e entre em
`/portal/entrar` com `familia.demo@didaticus.local` e `Didaticus#2026`. Esse
acesso existe somente em desenvolvimento e abre `/portal/demo` com dados
fictícios. Pedidos enviados nessa tela não chegam à escola.

## A home, e de onde veio cada parte

A ordem segue a da landing, que é a conversa que o pai tem na cabeça: o herói
com o título da escola e as fotos, os cinco benefícios, os quatro passos para
contratar, as matérias e os níveis, os bairros atendidos, o portal, e o
fechamento.

**O que a escola diz de si** vem da landing, lida em 23/09: os benefícios, os
passos, o WhatsApp e os "quase 10 anos". É a voz que ela já escolheu para
vender.

**O que a escola faz de fato** vem do sistema: as 17 matérias e os 42 bairros
são os mesmos que a recepção usa para marcar aula.

**O que não está**, de propósito: valores em código. A página de preços explica
o que entra no orçamento e encaminha a família para a equipe. A tabela pública
deve ler as faixas do sistema quando a API de publicação estiver definida.

## Regras da abertura

**O livro mantém proporção própria e cabe na tela**, inclusive em monitores
baixos. A capa usa a marca empilhada entregue pelo cliente.

**A transição dura menos de uma tela adicional.** Depois da abertura, a home
rola normalmente.

**Quem tem movimento reduzido ligado no sistema não vê a cena**, e sem
JavaScript ela simplesmente não acontece. O texto da home é HTML normal por
baixo, indexável.

## O que falta e depende da escola

- **Contato.** O cadastro da unidade no sistema está sem CNPJ, endereço,
  telefone e e-mail. O rodapé mostra o WhatsApp, que a escola publica, e nada
  mais: telefone de exemplo é o jeito mais rápido de um site nascer mentindo.
- **A licença das fotos.** A colagem do herói veio da landing e parece de banco
  de imagens, provavelmente comprada pela agência que fez a landing. Confirmar
  que a licença cobre o site novo **antes de ir para o ar**.
- **Depoimentos.** O concorrente tem 135 avaliações no Google e as esconde na
  página de contato. Inventar um está fora de questão.
- **Quantos professores e quantos alunos.** Números que vendem e que não temos.
- **Preço.** Publicar aberto, como o concorrente, ou deixar sob consulta.

## O que ainda não existe

- A validação de ponta a ponta do portal com uma conta real e a ativação em
  produção. Enquanto `NEXT_PUBLIC_PORTAL_ENABLED` for falso, `/portal` aponta
  para a prévia, que não contém dados reais.
- A publicação de professores e preços a partir da API. As páginas explicam o
  serviço sem inventar perfis ou valores.
- A captura de leads pelo site. O contrato contém `/v1/leads/captura`, mas o
  esquema do corpo está vazio; é preciso confirmar os campos antes de enviar.
- Conteúdo aprovado para blog e materiais.
- O favicon. Abaixo de uns 32px o símbolo vira mancha, e a saída é uma versão
  simplificada da marca. Ver `docs/MARCA.md`.
