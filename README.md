# Pulso Verde 🌱

> **"Alertas avisam. A comunidade age."**

Rede social gamificada mobile-first desenvolvida para o Hackathon com o tema **Super El Niño: o desafio do século 21**. O aplicativo engaja comunidades na preparação contra ondas de calor, temporais, enchentes, deslizamentos e secas através de missões colaborativas, pontos, emblemas mensais e recompensas físicas sustentáveis.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- **Node.js**: v18+ (testado no Node v24)
- **NPM**: v9+

### 1. Clonar e Instalar Dependências
```bash
# Instalar pacotes
npm install
```

### 2. Configurar Variáveis de Ambiente
Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais do **Supabase**:
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-publica
```
*(Caso não configure o Supabase imediatamente, o app funciona 100% em **modo de demonstração** com dados locais para o pitch).*

### 3. Configurar Banco de Dados (Supabase)
No painel do Supabase, abra o **SQL Editor** e execute:
1. `supabase/schema.sql`: cria as tabelas `profiles`, `missions`, `user_missions`, `badges`, `bracelet_claims`, `donations` com RLS ativado.
2. `supabase/seed.sql`: insere as 24 missões do calendário das campanhas.

### 4. Executar em Desenvolvimento
```bash
npm run dev
```
Acesse `http://localhost:5173`.

### 5. Build para Produção
```bash
npm run build
npm run preview
```

---

## 📱 Estrutura das Telas (Figma)

- `01-login` (`/login`): Autenticação por e-mail/senha e Google OAuth com consentimento LGPD.
- `02-home` (`/home`): Saudação, status de risco do bairro, card da campanha com a cor do mês (Outubro rosa `#EC6FA3`), barra de progresso e missões diárias com botão "Concluir" (+10 pts e bônus de +5).
- `03-missao` (`/missao/:id`): Detalhe da missão, explicação do impacto para o Super El Niño, envio de foto opcional e solicitação de validação comunitária.
- `04-feed` (`/feed`): Feed social de ações realizadas no bairro, fotos de mutirões, curtidas e botão de confirmação entre vizinhos.
- `05-calendario` (`/calendario`): Grade dos 12 meses do ano com emblemas, mês em andamento e linha do tempo dos marcos de pulseiras físicas (3, 6 e 12 meses).
- `06-ranking` (`/ranking`): Meta coletiva da cidade, pódio dos 3 bairros líderes e classificação geral com destaque para o bairro do usuário.
- `07-perfil` (`/perfil`): Painel do usuário, nível, sequência (*streak*), histórico de emblemas e status de resgate de pulseiras.
- `08-resgate` (`/resgate`): Fluxo de solicitação da pulseira física feita com plástico 100% reciclado.
- `09-doe` (`/doe`): Apoio financeiro com cotas sugeridas (R$ 10, R$ 25, R$ 50), prestação de contas e transparência do uso dos recursos.
- `10-alertas` (`/alertas`): Central com dados em tempo real da **Open-Meteo**, seletor de cenários de emergência para o pitch (Calor 39°C, Tempestade, Seca), checklist do Plano de Emergência e discagem rápida (199, 193, 192).

---

## 🛠 Stack Tecnológica

- **Frontend:** React 18, Vite, Tailwind CSS, React Router v6, Lucide Icons
- **Backend / Auth:** Supabase (Auth + PostgreSQL + Row Level Security)
- **API de Clima:** Open-Meteo (tempo real sem chave de API + contingência automática)
- **Deploy:** Vercel (`vercel.json` incluso para SPA rewrites)
