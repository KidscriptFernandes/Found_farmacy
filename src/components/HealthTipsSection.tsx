import { motion } from 'framer-motion'
import { Activity, Building2, Droplets, HeartPulse, MoonStar, Sparkles } from 'lucide-react'
import type { HealthTip } from '../data/mockData'

const iconMap = {
  Droplets,
  Sparkles,
  Activity,
  MoonStar,
  HeartPulse,
  Building2,
}

type HealthTipsSectionProps = {
  items: HealthTip[]
}

function HealthTipsSection({ items }: HealthTipsSectionProps) {
  return (
    <section className="tips-section">
      <div className="container">
        <div className="section-header centered">
          <span className="eyebrow">Conselhos de saúde</span>
          <h2>Informações simples para ajudar você a cuidar melhor da sua saúde.</h2>
        </div>

        <div className="tips-grid">
          {items.map(({ title, description, icon }) => {
            const Icon = iconMap[icon]

            return (
              <motion.article key={title} className="tip-card" whileHover={{ y: -4 }}>
                <div className="tip-icon">
                  <Icon size={20} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <button type="button" className="text-button">
                  Ler mais
                  <HeartPulse size={15} />
                </button>
              </motion.article>
            )
          })}
        </div>

        <p className="health-note">
          Informação educativa. Em caso de sintomas persistentes ou emergência, procure um profissional de saúde.
        </p>
      </div>
    </section>
  )
}

export default HealthTipsSection
