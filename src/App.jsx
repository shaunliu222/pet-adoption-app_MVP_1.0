import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Welcome from './pages/Welcome'
import PetList from './pages/PetList'
import PetDetail from './pages/PetDetail'
import Apply from './pages/Apply'
import Success from './pages/Success'
import Profile from './pages/Profile'
import AIPhoto from './pages/AIPhoto'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background-light font-body">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/pets" element={<PetList />} />
            <Route path="/pets/:id" element={<PetDetail />} />
            <Route path="/apply/:petId" element={<Apply />} />
            <Route path="/success" element={<Success />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ai-photo/:petId" element={<AIPhoto />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
