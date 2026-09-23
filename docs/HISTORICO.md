# Como o site chegou onde está

O registro das decisões do site, em ordem, e dos erros no caminho. Os erros
estão aqui de propósito: cada um foi reprovado pelo cliente ou pego por
medição, e repetir qualquer um deles custa uma rodada inteira que já foi paga.

Tudo aconteceu em 23/09/2026.

---

## As cinco coisas que não se repete

Se for ler uma parte só, é esta.

1. **As cores do site vêm da landing da escola, e não do sistema.** A landing
   está em `didaticusaulas.com.br/lp`. A raiz do domínio serve a nossa página de
   manutenção, que aponta para ela.
2. **A marca do cliente não se redesenha.** Três tentativas: duas reprovadas, e
   depois da terceira ele mandou a marca que gerou. Os arquivos dele são a oficial.
3. **O quadro de desenho da abertura tem o formato da tela.** Quadrado com
   `slice` produz o D gigante em monitor largo.
4. **Na abertura, o marinho leva a máscara e a marca vai por cima sem
   máscara.** O contrário produz um anel azul em volta da janela.
5. **O painel de captura desta ferramenta mente sobre imagem e animação.** Com
   ele oculto, `requestAnimationFrame` não dispara e imagem não é pintada. Medir
   pelo código é confiável; o olho do cliente é o teste visual de verdade.

---

## 1. A pesquisa

O ponto de partida foi o concorrente direto em Brasília, `filhosweb.com.br`,
percorrido página a página. O resultado está em `docs/PESQUISA.md`.

O achado que decidiu a home: **a home deles não rola.** `scrollHeight` zero, uma
tela só com marca, menu e botão. Quem chega pelo Google cai numa porta. É a
maior brecha deles.

Dois outros: eles publicam tabela de deslocamento por região, que é exatamente o
que o nosso sistema já modela, e o login deles tem duas portas, aluno e
professor. Não existe portal do responsável.

## 2. A abertura

O cliente descreveu duas ideias sem saber o nome: um livro que abre, ou entrar
dentro do nome. São o mesmo mecanismo, **animação guiada pela rolagem**, com
desenho diferente.

Foram três protótipos, lado a lado, e **ele escolheu a opção C**: o D que abre e
por onde se entra. O argumento que decidiu não foi estético: a logo da Didaticus
já é um livro de páginas, então a animação mostra a metáfora que já está na
marca. O protótipo das três continua no repositório do sistema, em
`docs/site/efeito-home.html`.

## 3. A marca, e as três tentativas

A logo existia só em PNG de 122 por 160 pixels, e a abertura amplia a marca
dezenas de vezes. A conclusão parecia óbvia: vetorizar. Deu errado três vezes.

**Primeira tentativa.** Redesenhei as páginas do livro como duas massas
sólidas, com o argumento de que fio fino some abaixo de 20px. O cliente: "na
original tem esses 3 riscos em branco que dá a entender que é um livro, o seu
não fez sentido". Ele estava certo. O argumento era verdadeiro e a conclusão
errada: tamanho pequeno é problema do arquivo de favicon, e não motivo para
descaracterizar a marca.

**Segunda tentativa.** Tracei por cima do original ampliado com grade e
conferi por sobreposição. Ficou mais fiel, e o cliente: "ainda não ficou legal,
não parece um livro". O erro era de estrutura, não de acabamento: eu desenhava
as páginas como enfeite **por cima** do D. No original elas ficam dentro da
cunha entre a capa levantada e o corpo.

**Terceira tentativa.** Li a imagem pixel a pixel e montei um mapa em texto do
que era laranja, branco e fundo. O mapa mostrou a cunha, e ficou mais próximo.
Ela não chegou a ser reprovada com palavras: a resposta do cliente foi mandar a
marca que ele mesmo gerou.

**O que resolveu:** o cliente gerou a marca por conta própria e mandou quatro
arquivos. Foram adotados como estão. Conferido nos arquivos dele que o fundo é
transparente de verdade e que o vazio do D é furo, e não branco pintado, que é
o que permite usá-lo na abertura.

As páginas são brancas sem contorno, e **isso é decisão do cliente**. Sobre
fundo branco elas somem; onde o fundo for claro, usa-se a versão empilhada ou a
horizontal, que já trazem o contorno marinho. Ver `docs/MARCA.md`.

## 4. O anel azul na janela

Na primeira versão da abertura com a marca do cliente, apareceu um halo azul em
volta da janela do D, e engrossava conforme a cena ampliava.

A causa: eu desenhava o marinho **atrás** do PNG e recortava a janela com um
contorno traçado por mim. O traçado era um pouco menor que o furo real do
arquivo, e a diferença virava o anel.

A correção não foi melhorar o traçado, foi **inverter quem recorta**. O marinho
leva a máscara, 3% folgada, e a marca vai por cima sem máscara nenhuma. A borda
da janela passa a ser o alfa do próprio arquivo, que é exato por construção. O
contorno traçado, em `public/marca/contraforma.json`, só tira o marinho de trás.

## 5. O repositório separado

O site nasceu no monorepo, como a arquitetura previa em `apps/site`, e foi
separado por pedido do cliente. Ele perguntou em seguida se isso era ruim.

Resposta dada: tem um custo, e o custo principal tinha conserto barato. No
monorepo, mudar um contrato da API quebrava a compilação do site; separado,
quebraria em produção. Como o `api-client` sempre foi gerado do OpenAPI, o site
gera os próprios tipos do mesmo contrato, e o `conferir:contrato` reprova quando
a cópia envelhece. Os três guardas do sistema foram copiados.

O custo que não tem conserto: mudança que atravessa API e site vira dois commits
e dois deploys, com ordem obrigatória. O cliente ainda não decidiu quem vai
mexer no site; se forem só os mesmos dois de sempre, voltar para o monorepo
continua barato enquanto o site for pequeno.

## 6. A primeira home, e por que foi reprovada

A primeira home saiu em creme, com letra editorial e cores do sistema. O
cliente: "Isso é o seu melhor? Veja como ficou grotesco essa home."

**Dois erros, e os dois eram meus.**

O primeiro foi de medida. A marca ocupava 93% da altura num monitor largo. O
componente desenhava num quadrado de 512 e cobria a tela com `slice`, que corta
o que sobra: numa tela 16:9 sobrava uma faixa de uns 250 dos 512, e a marca
calculada para 46% do quadrado ocupava quase a tela. **O protótipo tinha esse
erro corrigido, e o componente o reintroduziu.**

O segundo foi de fonte. Usei a paleta do sistema interno, que é calma porque é
feita para oito horas de uso. O site é outra conversa, e a escola já tinha uma
voz visual publicada para ela, na landing. O cliente: "as cores serão da landing
page, e não do sistema da Didaticus".

## 7. A home atual

Refeita a partir da landing. As cores foram amostradas dos elementos de lá:

| Token | Valor | De onde |
|---|---|---|
| `--marinho` | `#04203A` | fundo do rodapé e dos títulos |
| `--laranja` | `#FF6533` | botões e palavras em destaque |
| `--laranja-2` | `#F05A29` | a faixa de "como contratar" |
| `--amarelo` | `#FFD200` | botão secundário, que eu não tinha |
| `--ciano` | `#F4FDFF` | a faixa dos benefícios |

A fonte é Poppins, e o título vai em caixa alta no peso 800. O conteúdo que a
escola diz de si também veio da landing, inclusive os "quase 10 anos" que eu
tinha dito não saber. Os arquivos visuais (estampa, colagem de fotos, nove
ícones) foram baixados com autorização do cliente.

A abertura foi corrigida na raiz: o quadro de desenho mede a tela e a marca
ocupa 42% da altura real. Medido 42,0% em 1600x900, em 1915x940 e em 375x812,
sem rolagem lateral no celular.

No caminho a medição achou um defeito que o olho não veria: o símbolo de 42
pixels era baixado com 1920 de largura, porque faltava dizer ao `next/image` o
tamanho de exibição. Sete imagens ganharam `sizes`.

**O que não foi visto:** as seções abaixo do herói, pintadas. Estão conferidas
por estrutura e por conteúdo no HTML, e não por olho. Ver a quinta regra lá em
cima.

---

## Onde parou

A home está pronta para o cliente olhar. O próximo passo combinado é continuar
o site, e o que falta está no README, em "O que ainda não existe" e em "O que
falta e depende da escola".
