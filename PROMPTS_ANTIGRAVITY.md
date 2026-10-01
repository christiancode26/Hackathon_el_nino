# Prompts para o Antigravity: Pulso Verde

Use depois que as telas do Figma estiverem prontas e exportadas em PNG.

## Antes de começar

1. Coloque `CONTEXT.md` na raiz do projeto e troque `[NOME DO APP]` por **Pulso Verde**.
2. Exporte os frames do Figma em PNG (1x) com estes nomes:
   `01-login`, `02-home`, `03-missao`, `04-feed`, `05-calendario`, `06-ranking`, `07-perfil`, `08-resgate`, `09-doe`, `10-alertas`
3. Crie um projeto no Supabase (supabase.com) e deixe à mão a **Project URL** e a **anon key**.
4. (Opcional) Em Rules do Antigravity, cole as seções 3 e 11 do `CONTEXT.md` para o agente segui-las sempre.
5. Inicie o Git no projeto (`git init`) e faça commit a cada etapa que funcionar.

## Regras de uso

- **Uma etapa por conversa.** Abra um chat novo a cada prompt.
- **Anexe só o PNG da tela da etapa.**
- Rode o app e confira antes de passar para a próxima etapa.
- Citar o arquivo: digite `@CONTEXT.md` (ou escreva "leia o CONTEXT.md na raiz do projeto").

---

## ETAPA 1: Estrutura base (sem PNG)

```
Projeto: Pulso Verde. Leia @CONTEXT.md antes de começar.

Tarefa (seção 12, passo 1): crie o projeto com React + Vite + Tailwind
e React Router. Crie:
- src/theme/monthColors.js com as cores dos 12 meses (seção 4)
- src/data/missions.js com as missões dos 12 meses (seção 4)
- src/data/alerts.js com os 6 alertas mock (seção 5)
- componentes base em src/components: Button, MissionCard, AlertCard,
  ProgressBar, Badge, BottomNav, RankingItem
- rotas para as telas da seção 8, com páginas vazias

A cor do mês atual deve vir de monthColors.js, usando a data do sistema.
Não implemente telas ainda. Ao final, liste os arquivos criados e
explique como rodar.
```

**Conferir:** `npm run dev` abre sem erro e a navegação entre rotas funciona.

---

## ETAPA 2: Banco de dados e dados iniciais (sem PNG)

```
Leia @CONTEXT.md. Configure o Supabase (seção 7):
- Gere um arquivo supabase/schema.sql com todas as tabelas, relações e RLS
  (cada usuário só lê e escreve os próprios dados; missions e alertas são
  leitura pública)
- Gere supabase/seed.sql inserindo as 24 missões do calendário (seção 4)
- Crie src/lib/supabase.js lendo VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY
  de um arquivo .env, e um .env.example
Não implemente telas. Diga o que eu devo colar no SQL Editor do Supabase.
```

**Conferir:** rodar o `schema.sql` e depois o `seed.sql` no SQL Editor do Supabase e ver a tabela `missions` com 24 linhas.

---

## ETAPA 3: Login e cadastro (anexe `01-login.png`)

```
Leia @CONTEXT.md. Implemente a tela de Login e Cadastro seguindo a imagem
anexa, com Supabase Auth (e-mail/senha e Google).
- Cadastro pede nome, cidade, bairro e checkbox de consentimento LGPD
  (obrigatório); grave em profiles
- Rotas protegidas: sem login, redirecionar para o Login
- Mensagens de erro simples em português
Se o login com Google exigir configuração externa, deixe o botão pronto e
me explique os passos; o e-mail/senha deve funcionar de imediato.
Não mexa em outras telas.
```

**Conferir:** criar uma conta, sair e entrar de novo.

---

## ETAPA 4: Home e missões do mês (anexe `02-home.png`)

```
Leia @CONTEXT.md. Implemente a Home seguindo a imagem anexa.
- Cabeçalho com saudação, bairro, streak e pontos (de profiles)
- Banner do mês atual com cor e nome da campanha (monthColors.js)
- Lista das 2 missões do mês buscadas na tabela missions
- Botão Concluir: grava em user_missions, soma +10 pontos; ao completar as
  2 do mês, +5 de bônus e cria o emblema em badges
- Streak: aumenta se for o primeiro dia consecutivo com missão concluída;
  zera se passou um dia sem missão
- Cartão de alerta do dia com dado mock que leva à rota de Alertas
Estados da missão: pendente, em validação, concluída.
```

**Conferir:** concluir uma missão atualiza os pontos e continua salvo após recarregar a página.

---

## ETAPA 5: Detalhe da missão e validação (anexe `03-missao.png`)

```
Leia @CONTEXT.md. Implemente a tela de detalhe da missão seguindo a
imagem anexa: descrição, "por que importa para o El Niño", botão
"Marcar como feita", anexo de foto opcional (Supabase Storage) e botão
"Pedir confirmação de um vizinho" (apenas muda o status para
em_validacao; sem fluxo real de confirmação). A Home deve levar a esta
tela ao tocar na missão.
```

---

## ETAPA 6: Calendário de pulseiras (anexe `05-calendario.png`)

```
Leia @CONTEXT.md. Implemente o Calendário seguindo a imagem anexa:
grade de 12 meses com a cor de cada campanha. Meses completos (badges)
aparecem como emblema colorido, o mês atual em destaque e os futuros
bloqueados. Mostre a barra de progresso para os marcos de 3, 6 e 12
meses completos. Dados vêm de badges.
```

---

## ETAPA 7: Aba Alertas (anexe `10-alertas.png`)

```
Leia @CONTEXT.md. Implemente a aba Alertas seguindo a imagem anexa.
- Resumo de risco do dia em 4 níveis de cor
- Filtros por tipo (Todos, Calor, Chuva e enchente, Deslizamento, Seca,
  Saúde)
- Os 6 alertas de src/data/alerts.js com "O que fazer agora", botão
  "Fazer missão (+10 pts)" e botão "Avisar vizinhos" (usar Web Share API;
  se não existir, copiar o texto)
- Checklist "Meu plano de emergência" com progresso salvo no perfil
- Atalhos 199, 193 e 192 como links tel:
- Estados: sem alertas e alerta concluído (esmaecido com check)
Sem API ainda. O selo na barra de navegação mostra o número de alertas
ativos.
```

---

## ETAPA 8: Perfil e conquistas (anexe `07-perfil.png`)

```
Leia @CONTEXT.md. Implemente o Perfil seguindo a imagem anexa: foto,
nome, bairro, nível (calculado pelos pontos), pontos, streak, coleção de
emblemas mensais e a seção "Minhas pulseiras" com status (bloqueada,
disponível, pedida, em produção, enviada). A pulseira fica "disponível"
ao atingir 3, 6 ou 12 meses completos.
```

---

## ETAPA 9: Ranking de bairros (anexe `06-ranking.png`)

```
Leia @CONTEXT.md. Implemente o Ranking seguindo a imagem anexa. Some os
pontos dos usuários por bairro (view neighborhood_scores no Supabase).
Se houver poucos dados, complete com bairros fictícios marcados como
dados de exemplo. Destaque o bairro do usuário, o top 3 e a barra de
meta coletiva.
```

---

## ETAPA 10: Resgatar pulseira (anexe `08-resgate.png`)

```
Leia @CONTEXT.md. Implemente o fluxo de resgate seguindo a imagem anexa.
Botão liberado só se houver pulseira disponível. Formulário de endereço
ou ponto de retirada, confirmação e acompanhamento do status
(pedida > em produção > enviada). Grave em bracelet_claims. Não há
pagamento nem logística real: o avanço de status pode ser simulado por um
botão de demonstração visível só em modo demo.
```

---

## ETAPA 11: Doe aqui (anexe `09-doe.png`)

```
Leia @CONTEXT.md. Implemente a tela Doe aqui seguindo a imagem anexa,
totalmente simulada: contador de impacto, cartões de valor (R$ 10, R$ 25,
R$ 50 e outro valor), tela de agradecimento com o impacto gerado e seção
"Para onde vai o dinheiro". Grave em donations sem integrar pagamento.
Deixe um aviso discreto: "Protótipo: nenhuma cobrança é realizada."
```

---

## ETAPA 12: Feed da comunidade (anexe `04-feed.png`)

```
Leia @CONTEXT.md. Implemente o Feed seguindo a imagem anexa, simulado:
posts de conquistas com curtidas e comentários em dados mock, campo para
publicar uma ação ou reportar ponto de risco (guarda só no estado local)
e botão "Confirmar ação" para vizinhos. O acesso é pelo ícone no
cabeçalho da Home.
```

---

## ETAPA 13: Clima real com Open-Meteo (opcional, sem PNG)

```
Leia @CONTEXT.md. Integre o Open-Meteo à aba Alertas e ao alerta do dia
da Home. Use geocoding pela cidade do usuário (API de geocoding do
Open-Meteo) e a previsão de 3 dias. Gere os alertas pela lógica de nível
da seção 5 (limites são suposição de protótipo). Se a API falhar ou
demorar, volte aos dados mock sem quebrar a tela e mostre
"Dados de exemplo". Crie um modo demo em que eu possa forçar um cenário
(calor, chuva forte, seca) por um seletor, para apresentar no pitch.
```

---

## ETAPA 14: Polimento e demo (sem PNG)

```
Leia @CONTEXT.md. Faça uma revisão final, sem criar funcionalidades novas:
1. Verifique o layout em 375 px (celular) e em desktop, corrigindo
   quebras e textos cortados
2. Garanta que a navegação inferior e os botões tenham áreas de toque
   grandes e contraste adequado
3. Adicione estados de carregamento e mensagens de erro simples
4. Crie um usuário de demonstração e uma seed com dados de exemplo
   (alguns pontos, streak e 2 meses concluídos) para eu apresentar
5. Gere um README curto com como rodar e as variáveis de ambiente
Liste o que alterou, sem repetir código.
```

---

## ETAPA 15: Publicação (opcional)

```
Leia @CONTEXT.md. Prepare o deploy no Vercel: confira o build de produção
(npm run build), ajuste as rotas para funcionar em recarga (rewrites para
SPA) e liste as variáveis de ambiente que preciso cadastrar. Não altere
funcionalidades.
```

---

## Prompts de correção (modelos)

**Bug:**
```
Na tela [X], [descreva o problema em uma frase e o que deveria acontecer].
Corrija só isso, sem alterar o resto. Se não resolver em 2 tentativas,
explique a causa provável.
```

**Visual:**
```
Na tela [X], compare com a imagem anexa e ajuste apenas [elemento]: [o que
está diferente]. Não mexa em outros componentes.
```

**Erro no console:**
```
Aparece este erro ao [ação]: [cole a mensagem]. Explique a causa em uma
frase e corrija com a menor mudança possível.
```

---

## Prioridade se o tempo apertar

| Prioridade | Etapas |
|---|---|
| Essencial | 1, 2, 3, 4, 6, 7 |
| Importante | 5, 8, 14 |
| Pode ser simulado ou cortado | 9, 10, 11, 12 |
| Só se sobrar tempo | 13, 15 |

Reserve a última hora para ensaiar o pitch e gravar um vídeo do demo como plano B.
