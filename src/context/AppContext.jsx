import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('applications')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('applications', JSON.stringify(applications))
  }, [applications])

  const toggleFavorite = (petId) => {
    setFavorites(prev =>
      prev.includes(petId)
        ? prev.filter(id => id !== petId)
        : [...prev, petId]
    )
  }

  const isFavorite = (petId) => favorites.includes(petId)

  const addApplication = (application) => {
    const newApp = {
      ...application,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    setApplications(prev => [...prev, newApp])
    return newApp
  }

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      favorites,
      toggleFavorite,
      isFavorite,
      applications,
      addApplication
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
