# 🌿 Pulso Verde

> **"Alertas avisam. A comunidade age."**

**Pulso Verde** é uma plataforma gamificada de mobilização comunitária criada para preparar bairros vulneráveis aos impactos do **Super El Niño** no Brasil — incluindo ondas de calor, chuvas extremas, enchentes, deslizamentos e seca.

---

## 🌎 Contexto e Relevância — El Niño

O fenômeno climático **El Niño** provoca desequilíbrios severos no regime de chuvas e temperaturas em todo o Brasil. Em anos de Super El Niño:

- 🔥 **Sul e Sudeste** enfrentam chuvas torrenciais, enchentes e deslizamentos
- 🌵 **Norte e Nordeste** sofrem com secas prolongadas e ondas de calor extremo
- 🏚️ Comunidades de baixa renda são as mais afetadas pela falta de informação e de preparo

O Pulso Verde nasce como resposta direta a esse cenário: **se as pessoas não conseguem evitar os eventos climáticos, podem se preparar coletivamente para sobreviver a eles.**

---

## 🎯 Objetivos do Projeto

| Objetivo | Descrição |
|---|---|
| 🔔 **Alertar** | Informar a comunidade sobre riscos climáticos em tempo real com base na cidade do usuário (API Open-Meteo) |
| 🤝 **Engajar** | Gamificar o preparo comunitário com missões mensais, pontos, streaks e pulseiras de reconhecimento |
| 📅 **Educar** | Apresentar 12 campanhas anuais alinhadas ao calendário de riscos do El Niño e ao calendário de saúde pública |
| 🏘️ **Conectar** | Criar um feed social onde vizinhos validam ações uns dos outros, fortalecendo o capital social local |
| 💧 **Mobilizar** | Facilitar doações para comunidades em situação de emergência climática |

---

## ✨ Principais Funcionalidades

### 🏠 Home — Missões do Mês
- Exibe as **2 missões mensais** temáticas alinhadas ao risco climático vigente
- Cabeçalho com a **cor do mês** (12 paletas únicas) e campanha de conscientização
- Registro de +10 pontos por missão concluída + bônus de +5 ao completar ambas
- Atualização de **streak** diário de engajamento

### 📅 Calendário de Comprometimento
- Grade visual dos 12 meses com status: ✅ Concluído | 🔄 Em andamento | 🔒 Bloqueado
- Marcos de **pulseiras de reconhecimento** aos 3, 6 e 12 meses
- Linha do tempo de conquistas gamificadas

### 🚨 Aba de Alertas
- Integração com a **API Open-Meteo** (sem necessidade de chave) para dados meteorológicos em tempo real
- Geração automática de alertas por nível de risco:
  - 🟢 Verde — Situação normal
  - 🟡 Amarelo — Atenção
  - 🟠 Laranja — Alerta
  - 🔴 Vermelho — Emergência
- Filtros por tipo: Enchente, Calor, Deslizamento, Seca
- **Checklist do plano de emergência** domiciliar
- Atalhos para ligação direta: **199** (Defesa Civil), **193** (Bombeiros), **192** (SAMU)
- Fallback para dados mock em caso de falha na API

### 👤 Perfil e Conquistas
- Pontuação total, streak, ações realizadas e vizinhos engajados
- Grid de **emblemas mensais** (1 por campanha concluída)
- Status das **pulseiras de reconhecimento** com ícone temático exclusivo

### 🏆 Ranking de Bairros
- Ranking de bairros por % de participação na meta climática da cidade
- Podium com top-3 destaque
- Posição do bairro do usuário fixada na base

### 📱 Feed Social
- Criação de posts com foto e localização
- **Validação de ação por vizinho** (+5 pontos para o validador)
- Reações e comentários na comunidade

### 💚 Resgate de Pulseiras
- Formulário de solicitação de pulseiras físicas com endereço de entrega
- Timeline de status do pedido

### 💧 Doe Aqui
- Doações simbólicas (R$10 / R$25 / R$50 ou valor livre)
- Barra de transparência mostrando destinação dos recursos (72% direto / 18% logística / 10% plataforma)

---

## 🗓️ Missões por Mês — Calendário El Niño

| Mês | Cor | Campanha | Risco Climático |
|---|---|---|---|
| Janeiro | 🔴 Vermelho | Janeiro Vermelho | Chuvas / Enchentes |
| Fevereiro | 🩷 Rosa claro | Prevenção de Doenças | Epidemias pós-chuva |
| Março | 🟤 Marrom | Deslizamentos | Encostas / Deslizamentos |
| Abril | 🟢 Verde | Abril Verde | Conscientização ambiental |
| Maio | 🟡 Amarelo | Maio Amarelo | Segurança e mobilidade |
| Junho | 🔵 Azul escuro | Enchentes de Inverno | Chuvas do inverno |
| Julho | 🩵 Azul claro | Julho das Águas | Gestão hídrica / Seca |
| Agosto | 🟠 Laranja | Calor Extremo | Onda de calor / Seca |
| Setembro | 🌿 Verde musgo | Setembro Verde | Qualidade do ar / Queimadas |
| Outubro | 🌸 Rosa | Outubro Rosa | Saúde / Preparo geral |
| Novembro | 🔵 Azul | Novembro Azul | Saúde masculina / Alerta chuvas |
| Dezembro | ⭐ Dourado | Dezembro Solidário | Solidariedade / Fim de ano |

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| **React 18 + Vite** | Interface e build |
| **Tailwind CSS** | Estilização responsiva |
| **React Router v6** | Navegação entre telas |
| **Supabase** | Auth (e-mail + Google) e banco de dados PostgreSQL |
| **Open-Meteo API** | Dados meteorológicos em tempo real (sem API key) |
| **localStorage** | Modo demo sem backend configurado |

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- Node.js ≥ 18
- npm ≥ 9

### Instalação

```bash
# Clone o repositório
git clone https://github.com/christiancode26/Hackathon_el_nino.git
cd Hackathon_el_nino

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:5173** no navegador.

> 💡 **Modo Demo**: sem configurar o Supabase, use o botão **"Entrar como Lucas Mendes (Demonstração)"** na tela de login para explorar todas as funcionalidades.

### Variáveis de Ambiente (opcional — para Supabase)

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
```

Sem essas variáveis, o app roda integralmente em **modo demo** com localStorage.

### Build para Produção

```bash
npm run build
```

---

## 🗂️ Estrutura do Projeto

```
src/
├── components/        # Componentes reutilizáveis (Button, Badge, AlertCard, BraceletIcon...)
├── context/           # AuthContext — estado global de autenticação e gamificação
├── data/              # missions.js, alerts.js — dados das missões e alertas mock
├── lib/               # supabase.js — cliente Supabase com detecção de modo demo
├── pages/             # Telas: Home, Alertas, Calendário, Perfil, Ranking, Feed, Doe, Resgate
├── services/          # weatherService.js — integração Open-Meteo
└── theme/             # monthColors.js — paleta e campanhas dos 12 meses
```

---

## 👥 Equipe

| Nome | GitHub |
|---|---|
| **Christian Rodrigues dos Santos** | [@christiancode26](https://github.com/christiancode26) |
| **Victor Otavio Marques Garcia do Nascimento** | — |

---

## 📄 Licença

Este projeto foi desenvolvido para fins de **hackathon acadêmico**. Todos os direitos reservados aos autores.

---

<div align="center">
  <strong>🌿 Pulso Verde — Alertas avisam. A comunidade age.</strong><br/>
  Feito com 💚 para comunidades brasileiras vulneráveis ao clima extremo.
</div>
