# O site da Didaticus: pesquisa e estrutura

Levantamento feito em 23/09/2026, a pedido do cliente, percorrendo página a página o
site do concorrente direto em Brasília: `filhosweb.com.br`.

O objetivo não é copiar o desenho, que o cliente já disse achar datado. É aproveitar o
mapa: quais páginas um site de aulas particulares em Brasília precisa ter, o que cada
uma responde, e o que eles fazem bem ou deixam passar.

Nada deste levantamento vai para o ar ainda. O site atual da Didaticus continua no ar e
a substituição é decisão do cliente.

---

## 1. O que o concorrente tem

### O menu, na ordem em que eles apresentam

| Item | Endereço | O que é |
|---|---|---|
| A Filhos | `/institucional/` | Quem somos, desde quando, e a diretora pedagógica com currículo |
| Aulas Particulares | `/aulas/` | Porta para duas: presenciais e por videoconferência |
| Professores | `/professores` | Vitrine do time, com foto e disciplina |
| Trabalhe conosco | `/acessar-curriculo/` | Área de currículo com login próprio |
| Cursos | `/cursos-presenciais/` | Carrossel de cursos, cada um com página de venda |
| E-commerce | `/vale-a-pena-investir-em-conhecimento/` | Apostilas, jogos e papelaria |
| Downloads | `/downloads/` | Planners, listas de exercícios, jogos. Isca de contato |
| Blog | `/blog/` | Artigos, quase todos publicados fora e linkados de volta |
| Contato | `/contato/` | Endereço, horário, telefone, WhatsApp, e avaliações do Google |
| Login | dois destinos | `/login-aluno/` e `/login-professor/` |

Botão fixo no rodapé de todas as páginas: **Solicite sua aula particular agora**, que leva
a `/agende-sua-aula`.

### A home deles é uma tela só

Confirmado no navegador: `document.body.scrollHeight` é zero. A home é um splash de
viewport inteira com a marca, o menu, o login e um botão. Não rola, não explica, não
vende, não tem preço nem prova social. Quem chega pelo Google cai numa porta, não numa
apresentação.

**É a maior brecha deles, e é exatamente onde o cliente quer investir.**

### O funil de agendamento tem duas portas

`/agende-sua-aula` pergunta uma coisa antes de qualquer formulário:

- ainda não sou cliente
- sim, sou cliente

Separar os dois é acerto. Quem já é cliente quer remarcar e não quer contar de novo em
que série o filho está; quem não é precisa ser qualificado. É um padrão que vale copiar.

### Eles publicam preço, e publicam deslocamento

A página de aulas presenciais abre a tabela inteira:

- valor por duração de aula, com hora/aula e valor cheio
- **tabela de deslocamento por região de Brasília**, de R$ 7,60 na Asa Sul a R$ 30 no
  Lago Sul, Jardim Botânico e Taguatinga
- pacotes de crédito de 48 ou 88 aulas, com o valor sob consulta

Duas leituras. A primeira é que preço aberto filtra: quem chega ao WhatsApp já sabe a
ordem de grandeza. A segunda interessa mais ao nosso projeto: **a tabela de deslocamento
por região é exatamente o que o sistema da Didaticus já modela**, em regiões, sub-regiões
e faixas com valor de hora próprio. O site pode ler isso da API em vez de alguém manter
uma tabela em HTML que envelhece.

### A vitrine de professores

Lista com foto, nome e disciplina. Sem página individual, sem formação, sem avaliação.
Serve para dizer "somos muitos e somos jovens" e para de servir aí.

No fim da mesma página, o formulário de trabalhe conosco. Juntar as duas coisas é
esperto: quem lê sobre os professores é candidato a ser um.

### Prova social

Widget de avaliações do Google na página de contato: 135 avaliações, nota "excelente",
com os depoimentos por extenso e a data. Fica escondido no contato, que é a página que
menos gente abre. Prova social no rodapé da home renderia muito mais.

### Os cursos são produto à parte

Cada curso tem página de venda própria, com estrutura de landing page de verdade: o
problema, o dado que sustenta o problema, o método, como acontecem as aulas, e o botão.
É o material mais bem trabalhado do site deles, e contrasta com a home vazia.

---

## 2. O que a Didaticus precisa ter

Partindo do mapa acima, do que a Didaticus já tem no sistema, e do que a etapa 2 do plano
já reservou.

### As páginas

**Home.** Uma página de verdade, e não uma porta. É onde entra o efeito de rolagem que o
cliente pediu, e o resto da página vem logo abaixo: o que a escola faz, para quem, como
funciona, prova social, e o convite. Ver a seção 3.

**Aulas particulares.** Uma página por modalidade, como eles fazem, porque a dúvida do pai
é entre presencial e online e não entre matérias:
- presencial, com a área atendida e o deslocamento
- por videoconferência, com o que a escola precisa do aluno para a aula render

**Como funciona.** Página que o concorrente não tem e que responde a pergunta que todo pai
faz: da primeira conversa até a primeira aula, quantos passos são. É onde a Didaticus
mostra que tem sistema: agenda própria, relato de cada aula, acompanhamento.

**Professores.** A vitrine, e uma página por professor. Formação, disciplinas, regiões em
que atende. O sistema já guarda os três.

**Preços.** Tabela aberta, alimentada pelo cadastro do sistema em vez de digitada no HTML.

**Blog.** Conteúdo próprio, e não link para fora. Serve ao Google, que é de onde vem quem
procura "aula particular Brasília".

**Materiais.** Planners e listas de exercício em troca do e-mail. Cada download vira um
`Lead` no sistema, que já tem o modelo e o funil.

**Trabalhe conosco.** Formulário de candidatura, que também cai como lead.

**Contato.** Endereço, horário, WhatsApp, e o mapa.

**Portal do responsável.** É o que nenhum concorrente tem e é a diferença do projeto: o
pai entra e vê a agenda do filho, o relato de cada aula, as notas e as faturas. O sistema
já tem `AcessoPortal`, convite e as três coisas populadas pela operação.

### As três portas de login

O concorrente tem duas: aluno e professor. A Didaticus tem três, e a terceira é a que
vende: **o responsável**. Ela vai em `didaticus.com.br/portal`, decidido na arquitetura.

### O que liga o site ao sistema

O site não repete regra nenhuma. Ele lê da API v1, que já existe e está documentada:

| No site | Vem de |
|---|---|
| Formulário de contato e download | `POST /leads` |
| Pedido de aula de quem já é cliente | `POST /solicitacoes` |
| Tabela de preços e deslocamento | regiões e faixas |
| Página de cada professor | cadastro de professores |
| Portal do responsável | a mesma API, com o escopo do token |

---

## 3. A home: o efeito que o cliente pediu

O cliente descreveu duas ideias e disse não saber o nome:

> "criar como se fosse um livro, eu quando for abaixando com o mouse ou rolando o scroll
> ele vai abrindo e então começa as páginas do site mesmo, ou em vez do livro o nome com
> a logo grande Didaticus e aí rolando vai entrando no nome com o restante do site"

Os dois têm nome, e são o mesmo mecanismo com desenho diferente: **animação guiada pela
rolagem**, ou *scroll-driven animation*. A rolagem deixa de mover a página e passa a
controlar o tempo de uma cena, que roda para frente e para trás conforme a pessoa sobe ou
desce.

- **O livro que abre** é uma animação de capa, com a rotação de uma página em
  `perspective` e `rotateY`.
- **Entrar dentro do nome** chama-se *zoom de portal*, ou *scroll zoom transition*: a
  marca cresce até uma letra virar moldura, e o site aparece por dentro dela.

Protótipo dos dois lado a lado, para o cliente escolher, em `docs/site/efeito-home.html`.

### O que decidir junto com o efeito

Ele custa atenção e custa acessibilidade, e por isso três regras nascem com ele:

1. **Dura uma rolagem, não três.** Acima disso a pessoa não sente que está entrando, sente
   que está presa.
2. **Quem desligou animação no sistema não vê.** `prefers-reduced-motion` entrega a home
   direto, sem cena nenhuma. Não é detalhe: enjoo de movimento é real e o público aqui
   inclui crianças.
3. **O conteúdo existe sem a animação.** O texto da home é HTML normal, indexável, com a
   cena por cima. Se o JavaScript falhar, o site continua sendo um site.

---

## 4. O que fica para decidir com o cliente

- Publicar preço aberto, como o concorrente, ou só sob consulta
- Se o blog vai ter conteúdo próprio ou só republicar o que a diretoria escreve fora
- Se o e-commerce de material entra na primeira versão ou fica para depois
- Quando o site atual sai do ar, e como as páginas antigas redirecionam
