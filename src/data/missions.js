/**
 * Banco de missões dos 12 meses — Pulso Verde (Seção 4)
 * Cada mês tem 2 missões (10 pontos cada, +5 bônus ao completar as duas).
 */

export const MISSIONS = [
  // Mês 1 - Janeiro (Saúde Mental - Eixo A)
  {
    id: 'm1-1',
    mes: 1,
    numero: 1,
    titulo: 'Ligar para um vizinho que mora sozinho',
    descricao: 'Demonstre cuidado comunitário entrando em contato com quem pode estar vulnerável ao isolamento e ao calor.',
    eixo: 'A',
    pontos: 10,
  },
  {
    id: 'm1-2',
    mes: 1,
    numero: 2,
    titulo: 'Fazer uma pausa fresca e à sombra no horário mais quente',
    descricao: 'Proteja sua saúde descansando e hidratando-se entre as 11h e 16h.',
    eixo: 'A',
    pontos: 10,
  },

  // Mês 2 - Fevereiro (Alzheimer, lúpus e fibromialgia - Eixo A)
  {
    id: 'm2-1',
    mes: 2,
    numero: 1,
    titulo: 'Checar se idosos da rua têm água e ventilação',
    descricao: 'Verifique se as pessoas idosas da sua vizinhança têm acesso facilitado a água fresca e ambientes ventilados.',
    eixo: 'A',
    pontos: 10,
  },
  {
    id: 'm2-2',
    mes: 2,
    numero: 2,
    titulo: 'Montar uma lista de contatos de emergência da família',
    descricao: 'Anote telefones úteis (Defesa Civil 199, Bombeiros 193, SAMU 192 e familiares) em local visível.',
    eixo: 'A',
    pontos: 10,
  },

  // Mês 3 - Março (Dia Mundial da Água 22/03 - Eixo C)
  {
    id: 'm3-1',
    mes: 3,
    numero: 1,
    titulo: 'Reaproveitar água do banho ou da máquina de lavar',
    descricao: 'Guarde água cinza para descarga, limpeza da calçada ou quintal contra a escassez hídrica.',
    eixo: 'C',
    pontos: 10,
  },
  {
    id: 'm3-2',
    mes: 3,
    numero: 2,
    titulo: 'Checar vazamentos e registrar a conta de água',
    descricao: 'Inspecione torneiras e hidrômetros para evitar desperdício de água potável no bairro.',
    eixo: 'C',
    pontos: 10,
  },

  // Mês 4 - Abril (Conscientização do autismo - Eixo B)
  {
    id: 'm4-1',
    mes: 4,
    numero: 1,
    titulo: 'Mapear um local calmo e acessível para abrigo no bairro',
    descricao: 'Identifique pontos de apoio seguros com menor poluição sonora para emergências comunitárias.',
    eixo: 'B',
    pontos: 10,
  },
  {
    id: 'm4-2',
    mes: 4,
    numero: 2,
    titulo: 'Montar uma mochila de emergência com itens sensoriais',
    descricao: 'Inclua abafadores de ruído, itens de conforto sensorial, água e documentos essenciais.',
    eixo: 'B',
    pontos: 10,
  },

  // Mês 5 - Maio (Maio Amarelo / trânsito - Eixo B)
  {
    id: 'm5-1',
    mes: 5,
    numero: 1,
    titulo: 'Reportar uma rua que alaga',
    descricao: 'Ajude a mapear trechos críticos de alagamento para orientar a vizinhança e a Defesa Civil.',
    eixo: 'B',
    pontos: 10,
  },
  {
    id: 'm5-2',
    mes: 5,
    numero: 2,
    titulo: 'Compartilhar uma rota alternativa segura com a vizinhança',
    descricao: 'Mostre aos vizinhos caminhos alternativos mais altos e seguros durante fortes chuvas.',
    eixo: 'B',
    pontos: 10,
  },

  // Mês 6 - Junho (Dia do Meio Ambiente 05/06 - Eixo D)
  {
    id: 'm6-1',
    mes: 6,
    numero: 1,
    titulo: 'Plantar uma muda ou cuidar de uma planta da calçada',
    descricao: 'Amplie a cobertura verde local para amenizar ilhas de calor e aumentar a drenagem do solo.',
    eixo: 'D',
    pontos: 10,
  },
  {
    id: 'm6-2',
    mes: 6,
    numero: 2,
    titulo: 'Separar o lixo e registrar a primeira semana',
    descricao: 'Evite que resíduos sólidos obstruam bueiros e canais durante temporais.',
    eixo: 'D',
    pontos: 10,
  },

  // Mês 7 - Julho (Hepatites virais - Eixo A/B)
  {
    id: 'm7-1',
    mes: 7,
    numero: 1,
    titulo: 'Limpar o ralo e a calha antes da chuva',
    descricao: 'Retire folhas e detritos para prevenir entupimentos e refluxo de água contaminada.',
    eixo: 'A/B',
    pontos: 10,
  },
  {
    id: 'm7-2',
    mes: 7,
    numero: 2,
    titulo: 'Checar a caixa d\'água e avisar um vizinho sobre fervura/cloro',
    descricao: 'Garanta a vedação do reservatório e compartilhe orientações para desinfecção de água potável.',
    eixo: 'A/B',
    pontos: 10,
  },

  // Mês 8 - Agosto (Aleitamento materno - Eixo C)
  {
    id: 'm8-1',
    mes: 8,
    numero: 1,
    titulo: 'Organizar reserva de água potável para famílias com bebê',
    descricao: 'Auxilie famílias vulneráveis a manterem suprimento hídrico seguro contra períodos secos.',
    eixo: 'C',
    pontos: 10,
  },
  {
    id: 'm8-2',
    mes: 8,
    numero: 2,
    titulo: 'Divulgar onde há ponto de água ou apoio na comunidade',
    descricao: 'Compartilhe no grupo local os pontos com bicas, torneiras públicas ou postos de apoio.',
    eixo: 'C',
    pontos: 10,
  },

  // Mês 9 - Setembro (Dia da Árvore 21/09 e inclusão - Eixo D/B)
  {
    id: 'm9-1',
    mes: 9,
    numero: 1,
    titulo: 'Plantar ou adotar uma árvore em área sem sombra',
    descricao: 'Contribua para diminuir a temperatura da sua rua através do sombreamento natural.',
    eixo: 'D/B',
    pontos: 10,
  },
  {
    id: 'm9-2',
    mes: 9,
    numero: 2,
    titulo: 'Identificar um ponto do bairro inacessível em dias de chuva',
    descricao: 'Sinalize calçadas quebradas ou valas que dificultam o deslocamento de cadeirantes e pedestres.',
    eixo: 'D/B',
    pontos: 10,
  },

  // Mês 10 - Outubro (Prevenção do câncer de mama - Eixo A)
  {
    id: 'm10-1',
    mes: 10,
    numero: 1,
    titulo: 'Combinar com amigas um dia de cuidado com a saúde (consulta, exame)',
    descricao: 'Incentive a prevenção e o apoio mútuo entre as mulheres da comunidade.',
    eixo: 'A',
    pontos: 10,
  },
  {
    id: 'm10-2',
    mes: 10,
    numero: 2,
    titulo: 'Levar água a quem trabalha ao ar livre em dias de calor',
    descricao: 'Ofereça água gelada para garis, entregadores e trabalhadores sob sol forte.',
    eixo: 'A',
    pontos: 10,
  },

  // Mês 11 - Novembro (Saúde do homem - Eixo A)
  {
    id: 'm11-1',
    mes: 11,
    numero: 1,
    titulo: 'Lembrar um amigo ou parente de se hidratar e evitar sol forte',
    descricao: 'Estimule hábitos de autocuidado e prevenção contra insolação e desidratação crônica.',
    eixo: 'A',
    pontos: 10,
  },
  {
    id: 'm11-2',
    mes: 11,
    numero: 2,
    titulo: 'Cadastrar o bairro nos alertas de chuva e calor',
    descricao: 'Inscreva-se e auxilie vizinhos a cadastrarem seus CEPs no SMS da Defesa Civil (40199).',
    eixo: 'A',
    pontos: 10,
  },

  // Mês 12 - Dezembro (Prevenção do câncer de pele - Eixo A)
  {
    id: 'm12-1',
    mes: 12,
    numero: 1,
    titulo: 'Usar protetor solar e chapéu e compartilhar a dica',
    descricao: 'Multiplique a conscientização sobre proteção ultravioleta em dias de calor extremo.',
    eixo: 'A',
    pontos: 10,
  },
  {
    id: 'm12-2',
    mes: 12,
    numero: 2,
    titulo: 'Criar um ponto de sombra e água na rua ou na escola',
    descricao: 'Disponibilize recipientes de água fresca e áreas cobertas para quem transita pela rua.',
    eixo: 'A',
    pontos: 10,
  },
]

export const BONUS_POINTS_MONTH_COMPLETED = 5
export const POINTS_PER_MISSION = 10

/**
 * Retorna as 2 missões de um mês específico (1 a 12)
 */
export function getMissionsByMonth(mes = new Date().getMonth() + 1) {
  return MISSIONS.filter((m) => m.mes === Number(mes))
}

export default MISSIONS
