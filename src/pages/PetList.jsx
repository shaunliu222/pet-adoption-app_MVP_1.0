import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { api } from '../services/api'
import BottomNav from '../components/BottomNav'

export default function PetList() {
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useApp()
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    type: '',
    gender: '',
    age: ''
  })

  useEffect(() => {
    loadPets()
  }, [search, filters])

  const loadPets = async () => {
    setLoading(true)
    const result = await api.getPets({ search, ...filters })
    setPets(result)
    setLoading(false)
  }

  const statusColors = {
    available: 'bg-primary',
    pending: 'bg-orange-400'
  }

  const statusText = {
    available: '待领养',
    pending: '审核中'
  }

  return (
    <div className="min-h-screen bg-background-light flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="flex-none bg-white pt-12 pb-2 px-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold text-center flex-1">发现萌宠</h1>
          <div className="flex items-center justify-end w-10">
            <button className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 transition-colors relative">
              <span className="material-symbols-outlined text-2xl">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-2">
          <label className="relative flex items-center w-full h-12 rounded-xl bg-background-light overflow-hidden ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-primary transition-all">
            <div className="grid place-items-center h-full w-12 text-slate-400">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              className="peer h-full w-full outline-none text-sm text-slate-700 pr-2 bg-transparent placeholder-slate-400"
              placeholder="搜索宠物品种、性格..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>
      </header>

      {/* Filter tags */}
      <div className="flex-none bg-white pb-3 pt-1">
        <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar items-center">
          <button className="flex items-center justify-center h-9 px-4 rounded-full bg-primary text-slate-900 text-sm font-medium whitespace-nowrap shadow-sm">
            <span className="material-symbols-outlined text-[18px] mr-1">tune</span>
            筛选
          </button>
          <button
            onClick={() => setFilters(f => ({ ...f, type: f.type === 'dog' ? '' : 'dog' }))}
            className={`flex items-center justify-center h-9 px-4 rounded-full text-sm font-medium whitespace-nowrap border transition-all ${
              filters.type === 'dog' ? 'bg-primary text-slate-900 border-primary' : 'bg-slate-100 text-slate-700 border-transparent'
            }`}
          >
            狗狗
          </button>
          <button
            onClick={() => setFilters(f => ({ ...f, type: f.type === 'cat' ? '' : 'cat' }))}
            className={`flex items-center justify-center h-9 px-4 rounded-full text-sm font-medium whitespace-nowrap border transition-all ${
              filters.type === 'cat' ? 'bg-primary text-slate-900 border-primary' : 'bg-slate-100 text-slate-700 border-transparent'
            }`}
          >
            猫咪
          </button>
          <button
            onClick={() => setFilters(f => ({ ...f, gender: f.gender === 'male' ? '' : 'male' }))}
            className={`flex items-center justify-center h-9 px-4 rounded-full text-sm font-medium whitespace-nowrap border transition-all ${
              filters.gender === 'male' ? 'bg-primary text-slate-900 border-primary' : 'bg-slate-100 text-slate-700 border-transparent'
            }`}
          >
            男孩
          </button>
          <button
            onClick={() => setFilters(f => ({ ...f, gender: f.gender === 'female' ? '' : 'female' }))}
            className={`flex items-center justify-center h-9 px-4 rounded-full text-sm font-medium whitespace-nowrap border transition-all ${
              filters.gender === 'female' ? 'bg-primary text-slate-900 border-primary' : 'bg-slate-100 text-slate-700 border-transparent'
            }`}
          >
            女孩
          </button>
        </div>
      </div>

      {/* Pet list */}
      <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 pb-24">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
          </div>
        ) : pets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
            <span className="material-symbols-outlined text-6xl mb-2">pets</span>
            <p>暂无符合条件的宠物</p>
          </div>
        ) : (
          pets.map(pet => (
            <div
              key={pet.id}
              className="group relative flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100"
            >
              {/* Pet image */}
              <div
                className="relative w-full sm:w-48 aspect-[4/3] sm:aspect-square overflow-hidden cursor-pointer"
                onClick={() => navigate(`/pets/${pet.id}`)}
              >
                <img
                  alt={pet.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={pet.image}
                />
                {/* Status badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <span className={`w-1.5 h-1.5 rounded-full ${statusColors[pet.status]}`}></span>
                  <span className="text-xs font-bold text-slate-800">{statusText[pet.status]}</span>
                </div>
                {/* Favorite button */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(pet.id) }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center hover:bg-white/50 transition-colors"
                >
                  <span className={`material-symbols-outlined text-[20px] ${isFavorite(pet.id) ? 'text-red-500' : 'text-white'}`}>
                    {isFavorite(pet.id) ? 'favorite' : 'favorite_border'}
                  </span>
                </button>
              </div>

              {/* Pet info */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xl font-bold text-slate-900">{pet.name}</h3>
                    <span className={`material-symbols-outlined text-[24px] ${pet.gender === 'male' ? 'text-blue-500' : 'text-pink-400'}`}>
                      {pet.gender === 'male' ? 'male' : 'female'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-3">
                    {pet.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-3 text-xs font-medium text-slate-600">
                    <div className="flex items-center gap-1 bg-background-light px-2 py-1 rounded-lg">
                      <span className="material-symbols-outlined text-[16px]">cake</span>
                      <span>{pet.age}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-background-light px-2 py-1 rounded-lg">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>
                      <span>{pet.distance}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/pets/${pet.id}`)}
                    className="bg-primary hover:bg-yellow-400 text-slate-900 p-2 rounded-lg transition-colors shadow-sm"
                  >
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </main>

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  )
}
