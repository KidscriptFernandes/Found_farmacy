import { MapPin } from 'lucide-react'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-shell">
        <div className="brand footer-brand">
          <div className="brand-mark">
            <MapPin size={18} />
          </div>
          <span>
            <strong>Found</strong> Farmacy
          </span>
        </div>
        <p>Conectando pessoas aos cuidados de saúde certos, perto de si.</p>
      </div>
    </footer>
  )
}

export default Footer
