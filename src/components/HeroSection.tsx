import { Navigation, Search } from 'lucide-react'

type HeroSectionProps = {
  query: string
  setQuery: (value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onNearbySearch: () => void
}

function HeroSection({ query, setQuery, onSubmit, onNearbySearch }: HeroSectionProps) {
  return (
    <section className="hero-section">
      <div className="container hero-shell">
        <div className="hero-copy">
          <span className="eyebrow">Saúde ao seu alcance</span>
          <h1>Encontre cuidados de saúde perto de você.</h1>
          <p>Localize farmácias e hospitais próximos de forma rápida, simples e segura.</p>

          <form className="search-panel" onSubmit={onSubmit}>
            <label className="search-input" htmlFor="facility-search">
              <Search size={18} />
              <input
                id="facility-search"
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Pesquisar farmácia, hospital ou localização..."
                aria-label="Pesquisar farmácia, hospital ou localização"
              />
            </label>
            <button type="submit" className="primary-button search-submit">
              Pesquisar
            </button>
          </form>

          <button className="nearby-link" type="button" onClick={onNearbySearch}>
            <Navigation size={16} />
            Ou encontre serviços perto de mim
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
