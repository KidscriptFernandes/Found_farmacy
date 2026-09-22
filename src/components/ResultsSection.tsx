import { motion } from 'framer-motion'
import { Building2, Clock3, Hospital, MapPin, Navigation, Phone } from 'lucide-react'
import type { Facility } from '../data/mockData'

type ResultsSectionProps = {
  facilities: Facility[]
  selectedFacility: Facility | null
  onSelectFacility: (facilityId: number) => void
  query: string
  setQuery: (value: string) => void
  typeFilter: string
  setTypeFilter: (value: string) => void
  distanceFilter: string
  setDistanceFilter: (value: string) => void
  openOnly: boolean
  setOpenOnly: (value: boolean) => void
  stateMode: 'default' | 'loading' | 'empty' | 'locationError' | 'connectionError'
  onRetry: () => void
  onNearbySearch: () => void
}

const typeOptions = ['Todos', 'Farmácias', 'Hospitais', 'Clínicas'] as const
const distanceOptions = ['Até 1 km', 'Até 5 km', 'Até 10 km', 'Qualquer distância'] as const

function ResultsSection({
  facilities,
  selectedFacility,
  onSelectFacility,
  query,
  setQuery,
  typeFilter,
  setTypeFilter,
  distanceFilter,
  setDistanceFilter,
  openOnly,
  setOpenOnly,
  stateMode,
  onRetry,
  onNearbySearch,
}: ResultsSectionProps) {
  const showEmptyState = stateMode === 'empty' || facilities.length === 0
  const showLoadingState = stateMode === 'loading'
  const showConnectionError = stateMode === 'connectionError'
  const showLocationError = stateMode === 'locationError'

  return (
    <section className="results-section" aria-label={query ? `Resultados para ${query}` : 'Resultados de estabelecimentos'}>
      <div className="container location-shell">
        <div className="results-panel">
          <div className="section-header compact">
            <div>
              <span className="eyebrow muted">Estabelecimentos próximos</span>
              <h2>Encontrar serviços</h2>
            </div>
          </div>

          <div className="filter-bar">
            <label className="filter-field">
              <span>Tipo</span>
              <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
                {typeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="filter-field">
              <span>Distância</span>
              <select value={distanceFilter} onChange={(event) => setDistanceFilter(event.target.value)}>
                {distanceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="switch-row" htmlFor="open-only">
            <input id="open-only" type="checkbox" checked={openOnly} onChange={(event) => setOpenOnly(event.target.checked)} />
            <span>Mostrar apenas estabelecimentos abertos</span>
          </label>

          {showLoadingState ? (
            <div className="results-list skeleton-list" aria-live="polite">
              {Array.from({ length: 3 }).map((_, index) => (
                <div className="result-skeleton" key={`skeleton-${index}`}>
                  <div className="skeleton skeleton-line medium" />
                  <div className="skeleton skeleton-line short" />
                  <div className="skeleton skeleton-line" />
                  <div className="skeleton skeleton-line short" />
                </div>
              ))}
            </div>
          ) : showEmptyState ? (
            <div className="empty-state" role="status">
              <h3>Não encontramos nenhum estabelecimento nesta área.</h3>
              <button type="button" className="primary-button" onClick={() => setQuery('')}>
                Pesquisar noutra localização
              </button>
            </div>
          ) : showConnectionError ? (
            <div className="error-state" role="alert">
              <h3>Não foi possível carregar a informação.</h3>
              <p>Verifique a sua ligação e tente novamente.</p>
              <button type="button" className="primary-button" onClick={onRetry}>
                Tentar novamente
              </button>
            </div>
          ) : showLocationError ? (
            <div className="error-state" role="alert">
              <h3>Não conseguimos acessar a sua localização.</h3>
              <p>Verifique as permissões do browser e tente outra vez.</p>
              <button type="button" className="primary-button" onClick={onNearbySearch}>
                Tentar novamente
              </button>
            </div>
          ) : (
            <div className="results-list">
              {facilities.map((facility) => (
                <motion.article
                  key={facility.id}
                  layout
                  className={`facility-card ${selectedFacility?.id === facility.id ? 'selected' : ''}`}
                  onClick={() => onSelectFacility(facility.id)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="facility-header">
                    <div>
                      <h3>{facility.name}</h3>
                      <span className="facility-tag">{facility.type}</span>
                    </div>
                    <span className={`status-badge ${facility.open ? 'open' : 'closed'}`}>
                      {facility.open ? 'Aberto agora' : 'Fechado'}
                    </span>
                  </div>

                  <div className="facility-meta">
                    <span>
                      <MapPin size={14} />
                      {facility.distance.toFixed(1)} km
                    </span>
                    <span>
                      <Phone size={14} />
                      {facility.phone}
                    </span>
                    <span>
                      <Clock3 size={14} />
                      {facility.hours}
                    </span>
                  </div>

                  <div className="facility-actions">
                    <button type="button" className="secondary-button">
                      Ver detalhes
                    </button>
                    <button type="button" className="primary-button compact-button">
                      Como chegar
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>

        <div className="map-panel">
          <div className="section-header map-header">
            <div>
              <span className="eyebrow muted">Mapa</span>
              <h2>Próximo de si</h2>
            </div>
            <button type="button" className="ghost-button">
              Ver rota
            </button>
          </div>

          <div className="map-surface" aria-label="Mapa de serviços de saúde">
            {facilities.slice(0, 5).map((facility) => (
              <button
                key={facility.id}
                type="button"
                title={`${facility.name} - ${facility.type}`}
                className={`map-pin ${facility.type === 'Hospital' ? 'hospital' : 'pharmacy'} ${selectedFacility?.id === facility.id ? 'active' : ''}`}
                style={{
                  left: `${14 + (facility.id * 12) % 70}%`,
                  top: `${16 + (facility.id * 15) % 58}%`,
                }}
                onClick={() => onSelectFacility(facility.id)}
                aria-label={`Detalhes de ${facility.name}`}
              >
                {facility.type === 'Hospital' ? <Hospital size={12} /> : <MapPin size={12} />}
              </button>
            ))}

            {selectedFacility && (
              <div className="map-popup">
                <div className="popup-header">
                  <strong>{selectedFacility.name}</strong>
                  <span className={`status-badge ${selectedFacility.open ? 'open' : 'closed'}`}>
                    {selectedFacility.open ? 'Aberto' : 'Fechado'}
                  </span>
                </div>
                <p>{selectedFacility.type}</p>
                <small>{selectedFacility.distance.toFixed(1)} km</small>
                <button type="button" className="primary-button compact-button">
                  Ver detalhes
                </button>
              </div>
            )}
          </div>

          {selectedFacility && (
            <aside className="detail-card" aria-live="polite">
              <div className="detail-header">
                <div>
                  <span className="eyebrow muted">Detalhes</span>
                  <h3>{selectedFacility.name}</h3>
                </div>
                <span className={`status-badge ${selectedFacility.open ? 'open' : 'closed'}`}>
                  {selectedFacility.open ? 'Aberto agora' : 'Fechado'}
                </span>
              </div>

              <div className="detail-image" aria-hidden="true">
                <div className="image-placeholder">
                  <Building2 size={28} />
                </div>
              </div>

              <div className="detail-grid">
                <span>
                  <MapPin size={14} />
                  {selectedFacility.address}
                </span>
                <span>
                  <Phone size={14} />
                  {selectedFacility.phone}
                </span>
                <span>
                  <Clock3 size={14} />
                  {selectedFacility.hours}
                </span>
                <span>
                  <Navigation size={14} />
                  {selectedFacility.distance.toFixed(1)} km de distância
                </span>
              </div>

              <div className="detail-services">
                <strong>Serviços disponíveis</strong>
                <div className="services-list">
                  {selectedFacility.services.map((service) => (
                    <span key={service}>{service}</span>
                  ))}
                </div>
              </div>

              <div className="detail-actions full">
                <button type="button" className="primary-button">
                  Como chegar
                </button>
                <button type="button" className="secondary-button">
                  Ligar
                </button>
                <button type="button" className="secondary-button">
                  Partilhar
                </button>
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  )
}

export default ResultsSection
