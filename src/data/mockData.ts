export type FacilityType = 'Farmácia' | 'Hospital' | 'Clínica'

export type Facility = {
  id: number
  name: string
  type: FacilityType
  distance: number
  phone: string
  address: string
  hours: string
  service: string
  open: boolean
  services: string[]
  area: string
}

export const navItems = ['Início', 'Encontrar', 'Hospitais', 'Farmácias', 'Conselhos']

export const categories = [
  {
    title: 'Farmácias',
    description: 'Encontre farmácias próximas',
    icon: 'ShieldPlus',
  },
  {
    title: 'Hospitais',
    description: 'Localize hospitais e centros de saúde',
    icon: 'Hospital',
  },
  {
    title: 'Clínicas',
    description: 'Encontre clínicas próximas',
    icon: 'Stethoscope',
  },
  {
    title: 'Conselhos de saúde',
    description: 'Informações simples para cuidar melhor da sua saúde',
    icon: 'HeartPulse',
  },
] as const

export const facilityData: Facility[] = [
  {
    id: 1,
    name: 'Farmácia Central',
    type: 'Farmácia',
    distance: 1.2,
    phone: '+244 923 456 789',
    address: 'Rua do Comércio 145, Luanda',
    hours: '08:00 – 22:00',
    service: 'Farmácia de turno',
    open: true,
    services: ['Atendimento 24h', 'Vacinas', 'Primeiros socorros'],
    area: 'Centro',
  },
  {
    id: 2,
    name: 'Hospital Geral',
    type: 'Hospital',
    distance: 2.8,
    phone: '+244 912 345 678',
    address: 'Avenida 4 de Fevereiro 213, Ingombota',
    hours: '24 horas',
    service: 'Urgências e consultas',
    open: true,
    services: ['Urgência', 'Radiologia', 'Pediatria'],
    area: 'Ingombota',
  },
  {
    id: 3,
    name: 'Clínica Saúde Mais',
    type: 'Clínica',
    distance: 3.5,
    phone: '+244 927 112 334',
    address: 'Alameda das Flores 78, Maianga',
    hours: '07:30 – 19:00',
    service: 'Consultas gerais',
    open: false,
    services: ['Consulta geral', 'Cardiologia', 'Laboratório'],
    area: 'Maianga',
  },
  {
    id: 4,
    name: 'Pharmacia Nova',
    type: 'Farmácia',
    distance: 5.1,
    phone: '+244 933 555 221',
    address: 'Avenida da Independência 44, Sambizanga',
    hours: '08:00 – 21:00',
    service: 'Medicamentos e aconselhamento',
    open: true,
    services: ['Medicamentos', 'Aconselhamento', 'Check-up rápido'],
    area: 'Sambizanga',
  },
  {
    id: 5,
    name: 'Centro Médico Vida',
    type: 'Clínica',
    distance: 6.7,
    phone: '+244 921 778 990',
    address: 'Rua da Cidadania 18, Benfica',
    hours: '08:00 – 18:00',
    service: 'Atendimento de rotina',
    open: true,
    services: ['Medicina geral', 'Vacinas', 'Exames'],
    area: 'Benfica',
  },
  {
    id: 6,
    name: 'Hospital da Esperança',
    type: 'Hospital',
    distance: 8.4,
    phone: '+244 915 761 340',
    address: 'Estrada da Catete 305, Catete',
    hours: '24 horas',
    service: 'Serviços de urgência',
    open: false,
    services: ['Emergência', 'Obstetrícia', 'Oncologia'],
    area: 'Catete',
  },
]

export const typeOptions = ['Todos', 'Farmácias', 'Hospitais', 'Clínicas'] as const
export const distanceOptions = ['Até 1 km', 'Até 5 km', 'Até 10 km', 'Qualquer distância'] as const

export type HealthTip = {
  title: string
  description: string
  icon: 'Droplets' | 'Sparkles' | 'Activity' | 'MoonStar' | 'HeartPulse' | 'Building2'
}

export const healthTips: HealthTip[] = [
  {
    title: 'Hidratação',
    description: 'Beba água ao longo do dia e mantenha a hidratação regular, especialmente em clima quente.',
    icon: 'Droplets',
  },
  {
    title: 'Higiene das mãos',
    description: 'Lave as mãos com água e sabão para reduzir o risco de infeções e contaminação.',
    icon: 'Sparkles',
  },
  {
    title: 'Alimentação equilibrada',
    description: 'Inclua frutas, legumes, proteínas e grãos integrais na alimentação diária.',
    icon: 'Activity',
  },
  {
    title: 'Sono',
    description: 'Mantenha uma rotina de descanso e evite telas e cafeína antes de dormir.',
    icon: 'MoonStar',
  },
  {
    title: 'Atividade física',
    description: 'Faça movimentos leves e regulares para melhorar energia, equilíbrio e saúde cardiovascular.',
    icon: 'Activity',
  },
  {
    title: 'Quando procurar ajuda médica',
    description: 'Consulte um profissional se os sintomas persistirem, piorarem ou se houver sinais de urgência.',
    icon: 'Building2',
  },
]
