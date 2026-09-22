import { useMemo, useState } from 'react'
import {
  CallToAction,
  CategoryGrid,
  Footer,
  HealthTipsSection,
  HeroSection,
  Navbar,
  ResultsSection,
} from '../components'
import { categories, distanceOptions, facilityData, healthTips, navItems, typeOptions } from '../data/mockData'

function Home() {
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<(typeof typeOptions)[number]>('Todos')
  const [distanceFilter, setDistanceFilter] = useState<(typeof distanceOptions)[number]>('Qualquer distância')
  const [openOnly, setOpenOnly] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [stateMode, setStateMode] = useState<'default' | 'loading' | 'empty' | 'locationError' | 'connectionError'>('default')
  const [selectedId, setSelectedId] = useState<number | null>(facilityData[0].id)

  const filteredFacilities = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return facilityData.filter((facility) => {
      const matchesType =
        typeFilter === 'Todos' ||
        (typeFilter === 'Farmácias' && facility.type === 'Farmácia') ||
        (typeFilter === 'Hospitais' && facility.type === 'Hospital') ||
        (typeFilter === 'Clínicas' && facility.type === 'Clínica')

      const matchesDistance =
        distanceFilter === 'Qualquer distância' ||
        (distanceFilter === 'Até 1 km' && facility.distance <= 1) ||
        (distanceFilter === 'Até 5 km' && facility.distance <= 5) ||
        (distanceFilter === 'Até 10 km' && facility.distance <= 10)

      const matchesOpen = !openOnly || facility.open

      const matchesQuery =
        normalizedQuery.length === 0 ||
        facility.name.toLowerCase().includes(normalizedQuery) ||
        facility.type.toLowerCase().includes(normalizedQuery) ||
        facility.area.toLowerCase().includes(normalizedQuery) ||
        facility.address.toLowerCase().includes(normalizedQuery)

      return matchesType && matchesDistance && matchesOpen && matchesQuery
    })
  }, [query, typeFilter, distanceFilter, openOnly])

  const selectedFacility =
    filteredFacilities.find((facility) => facility.id === selectedId) ?? filteredFacilities[0] ?? null

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStateMode('default')
  }

  const handleNearbySearch = () => {
    if (!('geolocation' in navigator)) {
      setStateMode('locationError')
      return
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        setStateMode('default')
        setQuery('Perto de mim')
      },
      () => {
        setStateMode('locationError')
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  return (
    <div className="found-farm-app">
      <Navbar navItems={navItems} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main>
        <HeroSection query={query} setQuery={setQuery} onSubmit={handleSearch} onNearbySearch={handleNearbySearch} />

        <CategoryGrid items={[...categories]} />

        <ResultsSection
          facilities={filteredFacilities}
          selectedFacility={selectedFacility}
          onSelectFacility={(facilityId) => setSelectedId(facilityId)}
          query={query}
          setQuery={setQuery}
          typeFilter={typeFilter}
          setTypeFilter={(value) => setTypeFilter(value as (typeof typeOptions)[number])}
          distanceFilter={distanceFilter}
          setDistanceFilter={(value) => setDistanceFilter(value as (typeof distanceOptions)[number])}
          openOnly={openOnly}
          setOpenOnly={setOpenOnly}
          stateMode={stateMode}
          onRetry={() => setStateMode('default')}
          onNearbySearch={handleNearbySearch}
        />

        <HealthTipsSection items={healthTips} />
        <CallToAction />
      </main>

      <Footer />
    </div>
  )
}

export default Home
