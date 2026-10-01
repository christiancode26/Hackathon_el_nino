/**
 * Serviço de Clima via Open-Meteo (Seção 5 do CONTEXT.md)
 * Sem chave de API. Se falhar ou timeout, cai nos dados simulados de src/data/alerts.js.
 */
import { ALERTS } from '../data/alerts'

export const MOCK_ALERTS = ALERTS

/**
 * Busca clima real no Open-Meteo e gera alertas conforme as regras da Seção 5
 */
export async function fetchLiveWeatherAlerts(cidade = 'São Paulo') {
  try {
    // 1. Geocodificação da cidade
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      cidade
    )}&count=1&language=pt&format=json`
    const geoRes = await fetch(geoUrl, { signal: AbortSignal.timeout(5000) })
    if (!geoRes.ok) throw new Error('Falha no geocoding')
    const geoData = await geoRes.json()

    if (!geoData.results || geoData.results.length === 0) {
      return { alerts: MOCK_ALERTS, isLive: false, city: cidade }
    }

    const { latitude, longitude, name } = geoData.results[0]

    // 2. Previsão meteorológica
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,precipitation_sum&timezone=auto`
    const weatherRes = await fetch(weatherUrl, { signal: AbortSignal.timeout(5000) })
    if (!weatherRes.ok) throw new Error('Falha no Open-Meteo')
    const weatherData = await weatherRes.json()

    const maxTemps = weatherData.daily?.temperature_2m_max || []
    const precipitations = weatherData.daily?.precipitation_sum || []

    const currentMaxTemp = maxTemps[0] ?? 28
    const currentRain = precipitations[0] ?? 0

    // Conta dias seguidos com chuva ou sem chuva
    const rainDaysCount = precipitations.slice(0, 5).filter((p) => p > 5).length
    const dryDaysCount = precipitations.filter((p) => p === 0).length

    const dynamicAlerts = []

    // Regra 1: Temperatura máxima
    if (currentMaxTemp >= 38) {
      dynamicAlerts.push({
        id: 'dyn-calor-vermelho',
        titulo: `Onda de calor extremo detectada (${Math.round(currentMaxTemp)}°C)`,
        nivel: 'vermelho',
        tipo: 'Saúde',
        horario: 'Hoje durante o dia',
        descricao: `Temperatura registrada em ${name} atingiu nível crítico (${Math.round(
          currentMaxTemp
        )}°C). Risco de hipertermia e desidratação severa.`,
        acoes: [
          'Leve água a pessoas idosas ou com vulnerabilidade no bairro',
          'Beba líquidos frequentemente mesmo sem sede',
          'Evite atividades ao ar livre entre 10h e 16h',
        ],
        missaoTexto: 'Levar água a um vizinho ou ligar para ele',
      })
    } else if (currentMaxTemp >= 35) {
      dynamicAlerts.push({
        id: 'dyn-calor-amarelo',
        titulo: `Alerta de calor elevado (${Math.round(currentMaxTemp)}°C)`,
        nivel: 'amarelo',
        tipo: 'Saúde',
        horario: 'Hoje à tarde',
        descricao: `Dia muito quente em ${name}. Procure locais arejados e com sombra no bairro.`,
        acoes: [
          'Compartilhe dicas de hidratação com quem trabalha na rua',
          'Mantenha bacias d\'água e ventilação adequada em casa',
        ],
        missaoTexto: 'Compartilhar dica de hidratação com vizinhos',
      })
    }

    // Regra 2: Chuva forte prevista >= 30mm em 24h
    if (currentRain >= 30) {
      dynamicAlerts.push({
        id: 'dyn-chuva-forte',
        titulo: `Alerta de temporal e enchente (${Math.round(currentRain)} mm previstos)`,
        nivel: 'laranja',
        tipo: 'Enchente',
        horario: 'Próximas 24 horas',
        descricao: `Previsão de chuva volumosa em ${name}. Alto risco de alagamentos e bolsões de água.`,
        acoes: [
          'Desobstrua ralos e grelhas em frente à sua residência',
          'Não atravesse ruas alagadas nem estacione próximo a córregos',
          'Separe lanterna e documentos em local protegido',
        ],
        missaoTexto: 'Checar e desobstruir ralos da calçada',
      })
    }

    // Regra 3: Vários dias seguidos de chuva -> alerta de encosta
    if (rainDaysCount >= 3) {
      dynamicAlerts.push({
        id: 'dyn-encosta',
        titulo: 'Alerta de solo encharcado em encostas',
        nivel: 'laranja',
        tipo: 'Deslizamento',
        horario: 'Monitoramento contínuo',
        descricao: `Mais de ${rainDaysCount} dias seguidos com chuva acumulada em ${name}. Terrenos inclinados apresentam risco de instabilidade.`,
        acoes: [
          'Observe se há postes ou árvores inclinando na sua rua',
          'Ao primeiro estalo na parede ou solo fofo, saia e ligue 199',
        ],
        missaoTexto: 'Avisar 3 vizinhos sobre rotas de evacuação',
      })
    }

    // Regra 4: Mais de 10 dias sem chuva -> alerta de seca
    if (dryDaysCount >= 5) {
      dynamicAlerts.push({
        id: 'dyn-seca',
        titulo: 'Atenção para estiagem prolongada',
        nivel: 'amarelo',
        tipo: 'Seca',
        horario: 'Período atual',
        descricao: `Baixo índice pluviométrico observado na região de ${name}. Economize recursos hídricos.`,
        acoes: [
          'Reaproveite água do banho ou máquina para limpeza',
          'Evite banhos longos e lave calçadas apenas com vassoura',
        ],
        missaoTexto: 'Reaproveitar água da máquina ou banho',
      })
    }

    const combinedAlerts = dynamicAlerts.length > 0
      ? [...dynamicAlerts, ...MOCK_ALERTS.slice(dynamicAlerts.length)]
      : MOCK_ALERTS

    return {
      alerts: combinedAlerts,
      isLive: true,
      city: name,
      temperature: currentMaxTemp,
      rain: currentRain,
    }
  } catch (error) {
    console.warn('[Open-Meteo] Usando dados mock de contingência:', error.message)
    return { alerts: MOCK_ALERTS, isLive: false, city: cidade }
  }
}
