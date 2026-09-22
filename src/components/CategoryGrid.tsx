import { motion } from 'framer-motion'
import { Building2, HeartPulse, Hospital, ShieldPlus, Stethoscope } from 'lucide-react'

const iconMap = {
  ShieldPlus,
  Hospital,
  Stethoscope,
  HeartPulse,
  Building2,
}

export type CategoryItem = {
  title: string
  description: string
  icon: keyof typeof iconMap
}

type CategoryGridProps = {
  items: CategoryItem[]
}

function CategoryGrid({ items }: CategoryGridProps) {
  return (
    <section className="category-section">
      <div className="container category-grid">
        {items.map(({ title, description, icon }) => {
          const Icon = iconMap[icon]

          return (
            <motion.article
              key={title}
              className="category-card"
              whileHover={{ y: -4, boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)' }}
              transition={{ duration: 0.22 }}
            >
              <div className="category-icon">
                <Icon size={22} />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}

export default CategoryGrid
