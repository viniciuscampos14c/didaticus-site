# Site da Didaticus

O site institucional e o portal do responsável da Didaticus, escola de aulas
particulares em Brasília.

Repositório separado do sistema por pedido do cliente em 23/09/2026. O sistema
interno, a API e o worker continuam em [Didaticus](https://github.com/viniciuscampos14c/Didaticus).

## O que já está decidido

**A abertura da home.** A marca cresce e o site aparece por dentro do vazio do
D. O nome do efeito é animação guiada pela rolagem. Escolhida entre três
protótipos, e o motivo da escolha foi que a logo da Didaticus já é um livro:
abrir o D e entrar por ele mostra a metáfora que já está na marca, em vez de
acrescentar outra.

**O portal do responsável é o destaque do menu.** Nenhum concorrente de Brasília
tem um, e é a coisa que a Didaticus tem e eles não. Ver `docs/PESQUISA.md`.

**A marca é a que o cliente entregou.** Nada foi redesenhado. As regras de uso, e
um caso em que ela precisa de atenção, estão em `docs/MARCA.md`.

## A consequência de estar separado do sistema

Aqui não se alcança os pacotes do monorepo (`@didaticus/types`,
`@didaticus/api-client`). Este site conversa com a API v1 por HTTP e carrega os
próprios tipos.

O preço disso é conhecido e vale escrever: **quando a API mudar um contrato,
nada aqui vai reclamar em tempo de compilação**. No monorepo o TypeScript
apontava; aqui a quebra aparece em execução. Duas defesas, quando o consumo
começar: um teste de fumaça que bate nos contratos que o site usa, e um tipo
escrito à mão por resposta consumida, num arquivo só, para a mudança ter um
lugar óbvio para ser feita.

## Rodar

```bash
npm install
npm run dev        # http://localhost:3100
```

```bash
npm run build
npm run tipos      # confere os tipos sem gerar nada
```

## Estrutura

```
app/
  page.tsx            a home, com o primeiro quadro dentro da abertura
  layout.tsx          o esqueleto e as fontes
  globals.css         os tokens da marca
  (institucional)/    as páginas públicas
  (portal)/           o portal do responsável, autenticado
componentes/
  Abertura.tsx        a animação guiada pela rolagem
docs/
  PESQUISA.md         o levantamento do concorrente e o que o site precisa ter
  MARCA.md            os arquivos da marca e onde cada um serve
public/marca/         os arquivos da marca
```

## Três regras da abertura, que não são detalhe

**Ela dura duas telas e meia, e não cinco.** Acima disso a pessoa não sente que
está entrando, sente que está presa.

**Quem tem movimento reduzido ligado no sistema não vê a cena.** A home abre
direto. Não é preferência: enjoo de movimento é real, e o público aqui inclui
criança.

**O texto da home é HTML normal, por baixo da cena.** Se o JavaScript não rodar,
a abertura não acontece e o site continua sendo um site, indexável. A cena é
acréscimo, e não a página.

## O que ainda não existe

- O favicon. Abaixo de uns 32px o símbolo vira mancha, e a saída é uma versão
  simplificada da marca. Ver `docs/MARCA.md`.
- As páginas internas: aulas, professores, preços, materiais, contato.
- O portal do responsável, que depende do fluxo de convite já existente na API.
- O consumo da API. Nada aqui busca dado ainda.
