import { LocateFixed, MapPin, Menu, X } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

type NavbarProps = {
  navItems: string[]
  isMenuOpen: boolean
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}

function Navbar({ navItems, isMenuOpen, setIsMenuOpen }: NavbarProps) {
  return (
    <header className="topbar">
      <div className="container nav-container">
        <div className="brand" aria-label="Found Farmacy home">
          <div className="brand-mark">
            <MapPin size={18} />
          </div>
          <span>
            <strong>Found</strong> Farmacy
          </span>
        </div>

        <nav className={`main-nav ${isMenuOpen ? 'is-open' : ''}`} aria-label="Navegação principal">
          {navItems.map((item) => (
            <a key={item} href="#" onClick={(event) => event.preventDefault()}>
              {item}
            </a>
          ))}
        </nav>

        <button className="primary-button nav-button" type="button" aria-label="Encontrar perto de mim">
          <LocateFixed size={16} />
          Encontrar perto de mim
        </button>

        <button
          type="button"
          className="menu-toggle"
          aria-label="Abrir menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </header>
  )
}

export default Navbar
