/**
 * Alertas iniciais simulados (Seção 5 do CONTEXT.md)
 * 6 alertas cobrindo Enchente, Calor/Saúde, Deslizamento, Seca e Adaptação Urbana.
 */

export const ALERTS = [
  {
    id: 'a1',
    titulo: 'Chuva forte à noite',
    nivel: 'laranja',
    tipo: 'Enchente',
    horario: 'Hoje a partir das 19h até as 23h',
    descricao: 'Precipitação intensa com risco de alagamentos em vias baixas e refluxo de bueiros.',
    acoes: [
      'Limpar o ralo e calha da calçada antes das 18h',
      'Montar a mochila de emergência (documentos, água, lanterna, remédios)',
      'Evitar estacionar carros sob árvores ou vias de alagamento histórico',
    ],
    missaoTexto: 'Limpar o ralo da calçada antes das 18h',
  },
  {
    id: 'a2',
    titulo: 'Onda de calor extremo (39°C)',
    nivel: 'vermelho',
    tipo: 'Saúde',
    horario: 'Pico entre 11h e 16h',
    descricao: 'Massa de ar quente associada ao Super El Niño com risco elevado de desidratação e estresse térmico.',
    acoes: [
      'Levar água fresca a um vizinho idoso ou ligar para checar ventilação',
      'Beber pelo menos 500ml de água a cada 30 minutos',
      'Umedecer toalhas e manter animais domésticos em locais sombreados',
    ],
    missaoTexto: 'Levar água a um vizinho idoso ou ligar para ele',
  },
  {
    id: 'a3',
    titulo: 'Chuva acumulada em encosta',
    nivel: 'laranja',
    tipo: 'Deslizamento',
    horario: 'Próximas 36 horas',
    descricao: 'Solo saturado por chuvas contínuas. Risco de movimentação de terra e trincas.',
    acoes: [
      'Combinar previamente rota de saída e ponto de encontro da família',
      'Descobrir o abrigo comunitário mais próximo e avisar 3 vizinhos',
      'Ao menor sinal de rachaduras ou estalos, evacuar imediatamente e ligar 199',
    ],
    missaoTexto: 'Descobrir o abrigo mais próximo e avisar 3 vizinhos',
  },
  {
    id: 'a4',
    titulo: 'Semanas consecutivas sem chuva',
    nivel: 'amarelo',
    tipo: 'Seca',
    horario: 'Período de estiagem',
    descricao: 'Níveis de reservatórios em queda e aumento do risco de queimadas urbanas.',
    acoes: [
      'Reaproveitar água do banho ou da máquina de lavar para descargas',
      'Verificar vazamentos em torneiras e registrar o consumo da conta de água',
      'Umidificar ambientes com bacias de água fresca durante a noite',
    ],
    missaoTexto: 'Reaproveitar água do banho ou da máquina de lavar',
  },
  {
    id: 'a5',
    titulo: 'Cuidados depois da enchente',
    nivel: 'amarelo',
    tipo: 'Saúde',
    horario: 'Pós-temporal',
    descricao: 'Risco de contaminação por leptospirose e proliferação do mosquito da dengue.',
    acoes: [
      'Eliminar água parada em vasos, pneus velhos, garrafas e baldes',
      'Nunca entrar em contato com água de enchente descalço',
      'Desinfetar caixas d\'água e utensílios com água sanitária (cloro)',
    ],
    missaoTexto: 'Eliminar água parada em vasos e baldes',
  },
  {
    id: 'a6',
    titulo: 'Ilha de calor no bairro',
    nivel: 'amarelo',
    tipo: 'Adaptação urbana',
    horario: 'Contínuo',
    descricao: 'Asfalto e concreto sem arborização elevam a temperatura local em até 4°C a mais que a média.',
    acoes: [
      'Plantar ou adotar uma muda em ponto sem sombra na calçada',
      'Reportar pontos críticos de calor ou ausência de árvores no app',
      'Instalar recipientes de água fresca para pássaros e animais',
    ],
    missaoTexto: 'Plantar ou cuidar de uma muda em ponto sem sombra',
  },
]

export default ALERTS
