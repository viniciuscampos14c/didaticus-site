# A marca da Didaticus

Arquivos entregues pelo cliente em 23/09/2026. São a marca oficial: nada aqui
foi redesenhado por nós.

| Arquivo | Uso |
|---|---|
| `didaticus-simbolo.png` | O símbolo sozinho, 1254x1254, fundo transparente |
| `didaticus-empilhada.png` | Símbolo sobre a palavra, para espaço vertical |
| `didaticus-horizontal.webp` | Símbolo ao lado da palavra, para cabeçalho |
| `didaticus-palavra.webp` | Só a palavra, para quando o símbolo já apareceu |

## O que foi conferido, e o que achamos

**O fundo é transparente de verdade** nos quatro, e o vazio do D é FURO e não
branco pintado. Isso importa mais do que parece: é o furo que permite usar a
marca como máscara na abertura da home, onde o site aparece por dentro do D.

**As páginas são brancas, sem contorno, e isso é decisão do cliente.** A
consequência precisa estar escrita: sobre fundo branco elas somem, e o símbolo
lê como um D com um corte diagonal no canto. Sobre marinho, sobre foto e sobre
qualquer fundo que não seja quase branco, elas aparecem.

Onde o fundo for claro, use `didaticus-empilhada.png` ou
`didaticus-horizontal.webp`: nessas duas as páginas já têm o contorno marinho e
lêem em qualquer lugar. É a própria marca resolvendo o caso, sem precisar
inventar variação.

**Abaixo de uns 32px o símbolo vira mancha.** É esperado num desenho com página,
lombada e capa. Quando chegar a hora do favicon, o caminho é uma versão
simplificada, e essa decisão fica para quando o site existir.

## A contraforma, para a abertura da home

`contraforma.json` tem o contorno do vazio do D traçado do canal alfa do
`didaticus-simbolo.png`, em coordenadas da caixa de tinta (652 x 830, com a
origem no canto superior esquerdo da tinta, que no arquivo fica em 328,218).

Ele existe porque máscara feita do PNG borra a borda quando a cena amplia a
marca dezenas de vezes. O contorno em vetor mantém a borda limpa em qualquer
escala, e é ele que a cena usa.
