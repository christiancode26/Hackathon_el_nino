# CONTEXT.md — [NOME DO APP]

> Arquivo de contexto fixo. Leia antes de qualquer tarefa. Não repita estas informações nos prompts.

## 1. O que é
Rede social gamificada (mecânica estilo Duolingo) para preparar comunidades para os efeitos do **Super El Niño** (ondas de calor, chuvas fortes, enchentes, deslizamentos e seca). Usuários cumprem missões, ganham pontos, emblemas mensais e pulseiras físicas de material reciclado. O app recebe doações para projetos ambientais.

**Frase de impacto:** "Alertas avisam. A comunidade age."

**Contexto:** hackathon com o tema "Super El Niño: o desafio do século 21". Prioridade: solução simples, demonstrável e ligada a uma necessidade real. Eixos do guia: A) alertas locais, B) rotas seguras e resposta comunitária, C) água e serviços essenciais (seca), D) calor e alagamentos no bairro (adaptação urbana).

## 2. Stack
- Frontend: React + Vite (ou Next.js), Tailwind CSS, React Router
- Backend/Auth/DB: Supabase (login por e-mail e Google)
- Clima: Open-Meteo (sem chave de API). Se der problema, usar dados simulados
- Deploy: local ou Vercel/Netlify
- Idioma da interface: português do Brasil

## 3. Design (referência: PNGs exportados do Figma)
- Mobile-first, com versão desktop. Cantos arredondados (16–24 px), botões grandes, ilustrações flat.
- Cores base: verde-folha `#2E9E5B`, azul-água `#2B7DE9`, fundo `#F5F7F6`, texto `#1F2933`.
- Fonte: Nunito (ou Poppins).
- **A cor do mês atual** muda botões, barra de progresso e cabeçalho (ver tabela da seção 4).
- Níveis de risco: verde `#2E9E5B` tranquilo, amarelo `#F4C430` atenção, laranja `#F28C28` alerta, vermelho `#D64545` perigo.
- Acessibilidade: contraste alto, áreas de toque grandes, textos legíveis.
- Não buscar fidelidade pixel-perfect. Basta ficar parecido com o Figma.

## 4. Calendário de campanhas (banco de missões)

Cada mês tem 2 missões. Cada missão vale **10 pontos**, mais **5 de bônus** ao completar as duas. Cores usadas em homenagem às campanhas (algumas não são oficiais, como Junho Verde).

| Mês | Cor (hex) | Campanha | Eixo | Missão 1 | Missão 2 |
|---|---|---|---|---|---|
| 1 Jan | Branco/cinza `#E5E7EB` (borda `#9CA3AF`) | Saúde mental | A | Ligar para um vizinho que mora sozinho | Fazer uma pausa fresca e à sombra no horário mais quente |
| 2 Fev | Roxo `#8E44AD` | Alzheimer, lúpus e fibromialgia | A | Checar se idosos da rua têm água e ventilação | Montar uma lista de contatos de emergência da família |
| 3 Mar | Azul `#2B7DE9` | Dia Mundial da Água (22/03) | C | Reaproveitar água do banho ou da máquina de lavar | Checar vazamentos e registrar a conta de água |
| 4 Abr | Azul-claro `#5BC0EB` | Conscientização do autismo | B | Mapear um local calmo e acessível para abrigo no bairro | Montar uma mochila de emergência com itens sensoriais |
| 5 Mai | Amarelo `#F4C430` | Maio Amarelo (trânsito) | B | Reportar uma rua que alaga | Compartilhar uma rota alternativa segura com a vizinhança |
| 6 Jun | Verde `#2E9E5B` | Dia do Meio Ambiente (05/06) | D | Plantar uma muda ou cuidar de uma planta da calçada | Separar o lixo e registrar a primeira semana |
| 7 Jul | Amarelo-escuro `#F2A900` | Hepatites virais | A/B | Limpar o ralo e a calha antes da chuva | Checar a caixa d'água e avisar um vizinho sobre fervura/cloro |
| 8 Ago | Dourado `#D4AF37` | Aleitamento materno | C | Organizar reserva de água potável para famílias com bebê | Divulgar onde há ponto de água ou apoio na comunidade |
| 9 Set | Verde `#4CAF50` | Dia da Árvore (21/09) e inclusão | D/B | Plantar ou adotar uma árvore em área sem sombra | Identificar um ponto do bairro inacessível em dias de chuva |
| 10 Out | Rosa `#EC6FA3` | Prevenção do câncer de mama | A | Combinar com amigas um dia de cuidado com a saúde (consulta, exame) | Levar água a quem trabalha ao ar livre em dias de calor |
| 11 Nov | Azul-escuro `#1F5FBF` | Saúde do homem | A | Lembrar um amigo ou parente de se hidratar e evitar sol forte | Cadastrar o bairro nos alertas de chuva e calor |
| 12 Dez | Laranja `#F28C28` | Prevenção do câncer de pele | A | Usar protetor solar e chapéu e compartilhar a dica | Criar um ponto de sombra e água na rua ou na escola |

Observação: Setembro Amarelo (prevenção ao suicídio) foi evitado de propósito, por exigir abordagem própria e cuidadosa.

## 5. Alertas (aba central do app)
Cada alerta tem: tipo de risco, nível (verde/amarelo/laranja/vermelho), título, horário, "O que fazer agora" (2–3 itens), missões que dão pontos e botão "Avisar vizinhos".

| Alerta | Nível | Tipo | Missões |
|---|---|---|---|
| Chuva forte à noite | Laranja | Enchente | Limpar o ralo da calçada antes das 18h; Montar a mochila de emergência (documentos, água, lanterna, remédios) |
| Onda de calor (39°C) | Vermelho | Saúde | Levar água a um vizinho idoso ou ligar para ele; Beber água a cada 30 min |
| Chuva acumulada em encosta | Laranja | Deslizamento | Combinar rota de saída e ponto de encontro; Descobrir o abrigo mais próximo e avisar 3 vizinhos |
| Semanas sem chuva | Amarelo | Seca | Reaproveitar água do banho ou da máquina; Verificar vazamentos e registrar a conta de água |
| Depois da enchente | Amarelo | Saúde | Eliminar água parada em vasos, pneus e baldes; Não entrar em água de enchente e desinfetar a caixa d'água |
| Ilha de calor no bairro | Amarelo | Adaptação urbana | Plantar ou cuidar de uma muda em ponto sem sombra; Reportar ponto de alagamento ou falta de sombra |

**Lógica de nível (simulável, depois ligar ao Open-Meteo):**
- Temperatura máxima prevista >= 35°C: alerta de calor (>= 38°C: vermelho).
- Chuva prevista >= 30 mm em 24h: alerta de chuva forte (laranja).
- Vários dias seguidos de chuva: alerta de encosta.
- Mais de 10 dias sem chuva: alerta de seca.
Esses limites são suposições de protótipo, não critério técnico oficial.

**Plano de emergência (checklist fixo):** mochila de emergência, contatos de emergência, rota de saída, ponto de encontro, abrigo mais próximo. Atalhos: Defesa Civil 199, Bombeiros 193, SAMU 192.

## 6. Regras de pontuação e recompensas
- Missão concluída: +10 pontos. Mês completo (2 missões): +5 de bônus e emblema digital do mês.
- Streak: dias seguidos com pelo menos 1 missão concluída.
- Pulseira física por marcos: **3, 6 e 12 meses completos**. Cada pulseira usa a cor do mês do marco, em material reciclado.
- Mês perdido não pode ser recuperado (edição limitada).
- Ranking por **bairro** (soma dos pontos dos moradores) e meta coletiva.
- Validação das missões: no MVP, check + foto opcional. A confirmação por vizinho do mesmo bairro é o mecanismo antifraude apresentado no pitch.

## 7. Banco de dados (Supabase)
- `profiles`: id (auth), nome, cidade, bairro, pontos, streak, ultimo_dia_ativo, consentimento_lgpd
- `missions`: id, mes (1–12), titulo, descricao, eixo, pontos
- `user_missions`: id, user_id, mission_id, status (pendente | em_validacao | concluida), foto_url, validada_por, criado_em
- `badges`: id, user_id, mes, ano
- `bracelet_claims`: id, user_id, marco (3 | 6 | 12), status (disponivel | pedida | em_producao | enviada), endereco
- `donations`: id, user_id, valor, destino (simulado no MVP)
- `neighborhood_scores`: bairro, cidade, pontos_total (pode ser view)
- `alerts`: dados simulados no MVP

RLS ativado: cada usuário só lê e escreve os próprios dados.

## 8. Telas (frames do Figma)
`01-login`, `02-home`, `03-missao`, `04-feed`, `05-calendario`, `06-ranking`, `07-perfil`, `08-resgate`, `09-doe`, `10-alertas`

Barra inferior: Início, Calendário, **Alertas** (central, com selo de contagem), Ranking, Perfil. O Feed abre por ícone no cabeçalho da Home.

## 9. O que é real e o que é simulado (MVP)
**Funcional de verdade:** login, cadastro com bairro, missões do mês, pontos, streak, calendário.
**Funcional se sobrar tempo:** alertas via Open-Meteo, ranking de bairros.
**Simulado (só tela e fluxo):** doação, resgate de pulseira, feed, confirmação por vizinho, mapa.
No pitch, avisar que é um protótipo e apresentar o resto como visão de futuro.

## 10. Privacidade (LGPD)
Coletar só o necessário (nome, bairro, e-mail, endereço no resgate), com consentimento explícito no cadastro. Para menores de idade, prever autorização do responsável.

## 11. Regras para o agente (economia de tokens)
1. Uma tela ou tarefa por vez. Não gerar o app inteiro de uma vez.
2. Primeiro a versão estática com dados mock, depois a lógica.
3. Criar componentes reutilizáveis (Button, MissionCard, AlertCard, ProgressBar, Badge, BottomNav, RankingItem) e reaproveitá-los.
4. Centralizar cores dos meses em um único arquivo (`src/theme/monthColors.js`) e as missões em `src/data/missions.js`.
5. Não refatorar nem "melhorar" o que não foi pedido.
6. Mudanças pequenas e específicas. Se um bug não for resolvido em 2 tentativas, parar e explicar a causa.
7. Não adicionar bibliotecas novas sem avisar.
8. Textos em português do Brasil, tom simples, acolhedor e motivador.
9. Respostas curtas: dizer o que foi feito e quais arquivos mudaram, sem repetir código.

## 12. Ordem de construção
1. Estrutura do projeto, rotas, tema, `BottomNav` e componentes base
2. Login e cadastro (Supabase Auth)
3. Home com missões do mês e botão Concluir (pontos e streak)
4. Calendário de pulseiras
5. Aba Alertas (mock, depois Open-Meteo)
6. Perfil e conquistas
7. Telas simuladas: ranking, resgate, doe aqui, feed
8. Ensaio do pitch e gravação do demo (plano B)
