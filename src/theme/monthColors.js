/**
 * Cores das campanhas dos 12 meses do ano — Pulso Verde (Seção 4)
 * A cor do mês atual altera botões, barra de progresso e destaques.
 */

export const MONTH_COLORS = {
  1: {
    month: 1,
    name: 'Janeiro',
    short: 'JAN',
    hex: '#E5E7EB',
    borderColor: '#9CA3AF',
    textColor: '#1F2933',
    campaign: 'Saúde mental',
    eixo: 'A',
  },
  2: {
    month: 2,
    name: 'Fevereiro',
    short: 'FEV',
    hex: '#8E44AD',
    borderColor: '#732D91',
    textColor: '#FFFFFF',
    campaign: 'Alzheimer, lúpus e fibromialgia',
    eixo: 'A',
  },
  3: {
    month: 3,
    name: 'Março',
    short: 'MAR',
    hex: '#2B7DE9',
    borderColor: '#1D63BE',
    textColor: '#FFFFFF',
    campaign: 'Dia Mundial da Água (22/03)',
    eixo: 'C',
  },
  4: {
    month: 4,
    name: 'Abril',
    short: 'ABR',
    hex: '#5BC0EB',
    borderColor: '#39A7D6',
    textColor: '#FFFFFF',
    campaign: 'Conscientização do autismo',
    eixo: 'B',
  },
  5: {
    month: 5,
    name: 'Maio',
    short: 'MAI',
    hex: '#F4C430',
    borderColor: '#D4A41B',
    textColor: '#1F2933',
    campaign: 'Maio Amarelo (trânsito)',
    eixo: 'B',
  },
  6: {
    month: 6,
    name: 'Junho',
    short: 'JUN',
    hex: '#2E9E5B',
    borderColor: '#237B47',
    textColor: '#FFFFFF',
    campaign: 'Dia do Meio Ambiente (05/06)',
    eixo: 'D',
  },
  7: {
    month: 7,
    name: 'Julho',
    short: 'JUL',
    hex: '#F2A900',
    borderColor: '#C68A00',
    textColor: '#FFFFFF',
    campaign: 'Hepatites virais',
    eixo: 'A/B',
  },
  8: {
    month: 8,
    name: 'Agosto',
    short: 'AGO',
    hex: '#D4AF37',
    borderColor: '#B08D23',
    textColor: '#FFFFFF',
    campaign: 'Aleitamento materno',
    eixo: 'C',
  },
  9: {
    month: 9,
    name: 'Setembro',
    short: 'SET',
    hex: '#4CAF50',
    borderColor: '#3B8B3E',
    textColor: '#FFFFFF',
    campaign: 'Dia da Árvore (21/09) e inclusão',
    eixo: 'D/B',
  },
  10: {
    month: 10,
    name: 'Outubro',
    short: 'OUT',
    hex: '#EC6FA3',
    borderColor: '#D04D85',
    textColor: '#FFFFFF',
    campaign: 'Prevenção do câncer de mama',
    eixo: 'A',
  },
  11: {
    month: 11,
    name: 'Novembro',
    short: 'NOV',
    hex: '#1F5FBF',
    borderColor: '#154792',
    textColor: '#FFFFFF',
    campaign: 'Saúde do homem',
    eixo: 'A',
  },
  12: {
    month: 12,
    name: 'Dezembro',
    short: 'DEZ',
    hex: '#F28C28',
    borderColor: '#C76E1A',
    textColor: '#FFFFFF',
    campaign: 'Prevenção do câncer de pele',
    eixo: 'A',
  },
}

/**
 * Retorna as informações de cor e tema para o mês solicitado (1 a 12).
 * Por padrão, usa o mês atual do sistema.
 */
export function getMonthTheme(monthNumber = new Date().getMonth() + 1) {
  return MONTH_COLORS[monthNumber] || MONTH_COLORS[10] // Outubro padrão como no Figma
}

export default MONTH_COLORS
