-- Pulso Verde — Seed SQL para Supabase (Seção 4 do CONTEXT.md)
-- Inserção das 24 missões oficiais do calendário anual
-- Execute no SQL Editor do Supabase logo após executar o schema.sql.

INSERT INTO public.missions (id, mes, numero, titulo, descricao, eixo, pontos) VALUES
-- Mês 1 - Janeiro (Saúde Mental - Eixo A)
('m1-1', 1, 1, 'Ligar para um vizinho que mora sozinho', 'Demonstre cuidado comunitário entrando em contato com quem pode estar vulnerável ao isolamento e ao calor.', 'A', 10),
('m1-2', 1, 2, 'Fazer uma pausa fresca e à sombra no horário mais quente', 'Proteja sua saúde descansando e hidratando-se entre as 11h e 16h.', 'A', 10),

-- Mês 2 - Fevereiro (Alzheimer, lúpus e fibromialgia - Eixo A)
('m2-1', 2, 1, 'Checar se idosos da rua têm água e ventilação', 'Verifique se as pessoas idosas da sua vizinhança têm acesso facilitado a água fresca e ambientes ventilados.', 'A', 10),
('m2-2', 2, 2, 'Montar uma lista de contatos de emergência da família', 'Anote telefones úteis (Defesa Civil 199, Bombeiros 193, SAMU 192 e familiares) em local visível.', 'A', 10),

-- Mês 3 - Março (Dia Mundial da Água - Eixo C)
('m3-1', 3, 1, 'Reaproveitar água do banho ou da máquina de lavar', 'Guarde água cinza para descarga, limpeza da calçada ou quintal contra a escassez hídrica.', 'C', 10),
('m3-2', 3, 2, 'Checar vazamentos e registrar a conta de água', 'Inspecione torneiras e hidrômetros para evitar desperdício de água potável no bairro.', 'C', 10),

-- Mês 4 - Abril (Conscientização do autismo - Eixo B)
('m4-1', 4, 1, 'Mapear um local calmo e acessível para abrigo no bairro', 'Identifique pontos de apoio seguros com menor poluição sonora para emergências comunitárias.', 'B', 10),
('m4-2', 4, 2, 'Montar uma mochila de emergência com itens sensoriais', 'Inclua abafadores de ruído, itens de conforto sensorial, água e documentos essenciais.', 'B', 10),

-- Mês 5 - Maio (Maio Amarelo / trânsito - Eixo B)
('m5-1', 5, 1, 'Reportar uma rua que alaga', 'Ajude a mapear trechos críticos de alagamento para orientar a vizinhança e a Defesa Civil.', 'B', 10),
('m5-2', 5, 2, 'Compartilhar uma rota alternativa segura com a vizinhança', 'Mostre aos vizinhos caminhos alternativos mais altos e seguros durante fortes chuvas.', 'B', 10),

-- Mês 6 - Junho (Dia do Meio Ambiente - Eixo D)
('m6-1', 6, 1, 'Plantar uma muda ou cuidar de uma planta da calçada', 'Amplie a cobertura verde local para amenizar ilhas de calor e aumentar a drenagem do solo.', 'D', 10),
('m6-2', 6, 2, 'Separar o lixo e registrar a primeira semana', 'Evite que resíduos sólidos obstruam bueiros e canais durante temporais.', 'D', 10),

-- Mês 7 - Julho (Hepatites virais - Eixo A/B)
('m7-1', 7, 1, 'Limpar o ralo e a calha antes da chuva', 'Retire folhas e detritos para prevenir entupimentos e refluxo de água contaminada.', 'A/B', 10),
('m7-2', 7, 2, 'Checar a caixa d''água e avisar um vizinho sobre fervura/cloro', 'Garanta a vedação do reservatório e compartilhe orientações para desinfecção de água potável.', 'A/B', 10),

-- Mês 8 - Agosto (Aleitamento materno - Eixo C)
('m8-1', 8, 1, 'Organizar reserva de água potável para famílias com bebê', 'Auxilie famílias vulneráveis a manterem suprimento hídrico seguro contra períodos secos.', 'C', 10),
('m8-2', 8, 2, 'Divulgar onde há ponto de água ou apoio na comunidade', 'Compartilhe no grupo local os pontos com bicas, torneiras públicas ou postos de apoio.', 'C', 10),

-- Mês 9 - Setembro (Dia da Árvore e inclusão - Eixo D/B)
('m9-1', 9, 1, 'Plantar ou adotar uma árvore em área sem sombra', 'Contribua para diminuir a temperatura da sua rua através do sombreamento natural.', 'D/B', 10),
('m9-2', 9, 2, 'Identificar um ponto do bairro inacessível em dias de chuva', 'Sinalize calçadas quebradas ou valas que dificultam o deslocamento de pedestres e PcD.', 'D/B', 10),

-- Mês 10 - Outubro (Prevenção do câncer de mama - Eixo A)
('m10-1', 10, 1, 'Combinar com amigas um dia de cuidado com a saúde (consulta, exame)', 'Incentive a prevenção e o apoio mútuo entre as mulheres da comunidade.', 'A', 10),
('m10-2', 10, 2, 'Levar água a quem trabalha ao ar livre em dias de calor', 'Ofereça água gelada para garis, entregadores e trabalhadores sob sol forte.', 'A', 10),

-- Mês 11 - Novembro (Saúde do homem - Eixo A)
('m11-1', 11, 1, 'Lembrar um amigo ou parente de se hidratar e evitar sol forte', 'Estimule hábitos de autocuidado e prevenção contra insolação e desidratação crônica.', 'A', 10),
('m11-2', 11, 2, 'Cadastrar o bairro nos alertas de chuva e calor', 'Inscreva-se e auxilie vizinhos a cadastrarem seus CEPs no SMS da Defesa Civil (40199).', 'A', 10),

-- Mês 12 - Dezembro (Prevenção do câncer de pele - Eixo A)
('m12-1', 12, 1, 'Usar protetor solar e chapéu e compartilhar a dica', 'Multiplique a conscientização sobre proteção ultravioleta em dias de calor extremo.', 'A', 10),
('m12-2', 12, 2, 'Criar um ponto de sombra e água na rua ou na escola', 'Disponibilize recipientes de água fresca e áreas cobertas para quem transita pela rua.', 'A', 10)
ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao = EXCLUDED.descricao,
  eixo = EXCLUDED.eixo,
  pontos = EXCLUDED.pontos;
