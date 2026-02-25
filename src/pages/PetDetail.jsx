import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { api } from '../services/api'

export default function PetDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useApp()
  const [pet, setPet] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    loadPet()
  }, [id])

  const loadPet = async () => {
    setLoading(true)
    const result = await api.getPet(id)
    setPet(result)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center max-w-md mx-auto">
        <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
      </div>
    )
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-background-light flex flex-col items-center justify-center max-w-md mx-auto">
        <span className="material-symbols-outlined text-6xl text-slate-300 mb-2">pets</span>
        <p className="text-slate-400">宠物不存在</p>
        <button onClick={() => navigate('/pets')} className="mt-4 text-primary">返回列表</button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-light max-w-md mx-auto">
      {/* Image section */}
      <div className="relative h-[50vh] w-full group">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url('${pet.images?.[currentImage] || pet.image}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent"></div>

        {/* Top buttons */}
        <div className="absolute top-0 left-0 right-0 p-4 pt-12 flex justify-between items-center z-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex gap-3">
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 transition-colors">
              <span className="material-symbols-outlined">share</span>
            </button>
            <button
              onClick={() => toggleFavorite(pet.id)}
              className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg hover:scale-105 transition-all ${
                isFavorite(pet.id) ? 'bg-white/90 text-red-500' : 'bg-white/90 text-slate-400'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isFavorite(pet.id) ? "'FILL' 1" : "'FILL' 0" }}>
                favorite
              </span>
            </button>
          </div>
        </div>

        {/* Image indicators */}
        {pet.images && pet.images.length > 1 && (
          <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2">
            {pet.images.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-2 h-2 rounded-full cursor-pointer ${
                  idx === currentImage ? 'bg-white shadow-sm' : 'bg-white/50 backdrop-blur-sm'
                }`}
              ></div>
            ))}
          </div>
        )}
      </div>

      {/* Content section */}
      <div className="relative -mt-6 rounded-t-[2rem] bg-white px-6 pt-8 pb-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] min-h-[55vh] pb-32">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-1">{pet.name}</h1>
            <div className="flex items-center text-slate-500 text-sm font-medium">
              <span className="material-symbols-outlined text-primary-dark mr-1 text-[18px]">location_on</span>
              {pet.location} ({pet.distance})
            </div>
          </div>
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold flex items-center border border-yellow-200">
            <span className="w-2 h-2 rounded-full bg-primary-dark mr-2 animate-pulse"></span>
            待领养
          </div>
        </div>

        {/* Basic info grid */}
        <div className="grid grid-cols-3 gap-3 my-6">
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl border border-slate-100 bg-background-light">
            <span className="text-slate-400 text-xs font-medium mb-1">性别</span>
            <span className="text-slate-900 font-bold">{pet.gender === 'male' ? '男孩' : '女孩'}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl border border-slate-100 bg-background-light">
            <span className="text-slate-400 text-xs font-medium mb-1">年龄</span>
            <span className="text-slate-900 font-bold">{pet.age}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl border border-slate-100 bg-background-light">
            <span className="text-slate-400 text-xs font-medium mb-1">体重</span>
            <span className="text-slate-900 font-bold">{pet.weight}</span>
          </div>
        </div>

        {/* Breed info */}
        <div className="flex items-center justify-between py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
              <span className="material-symbols-outlined">pets</span>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">品种</p>
              <p className="text-slate-900 font-bold text-sm">{pet.breed}</p>
            </div>
          </div>
        </div>

        {/* AI Features - 2 columns */}
        <div className="py-4 border-b border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-purple-500 text-lg">auto_awesome</span>
              AI 能力
            </h3>
            <span className="text-xs text-purple-500 bg-purple-50 px-2 py-0.5 rounded-full font-medium">New</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {/* AI合照 */}
            <div
              onClick={() => navigate(`/ai-photo/${pet.id}`)}
              className="relative group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl blur-sm opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative h-full bg-white p-4 rounded-2xl border border-purple-100 shadow-sm group-hover:shadow-md transition-all">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 mb-3 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                    <span className="material-symbols-outlined text-2xl">add_a_photo</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 mb-1">AI合照</h4>
                  <p className="text-[10px] text-slate-500 leading-tight mb-3">上传个人照片，生成<br/>和它的温暖合照</p>
                  <button className="w-full py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium transition-colors">
                    立即生成
                  </button>
                </div>
              </div>
            </div>

            {/* AI对话 */}
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl blur-sm opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative h-full bg-white p-4 rounded-2xl border border-blue-100 shadow-sm group-hover:shadow-md transition-all">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 mb-3 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <span className="material-symbols-outlined text-2xl">forum</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 mb-1">AI 对话</h4>
                  <p className="text-[10px] text-slate-500 leading-tight mb-3">与它聊天互动<br/>了解更多趣事</p>
                  <button className="w-full py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium transition-colors">
                    开始对话
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shelter info */}
        <div className="flex items-center justify-between py-4 mb-2">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-white shadow-sm"
                style={{ backgroundImage: `url('${pet.shelter.avatar}')` }}
              ></div>
              <div className="absolute -bottom-1 -right-1 bg-primary text-slate-900 text-[8px] p-0.5 rounded-full border border-white">
                <span className="material-symbols-outlined text-[10px] block">verified</span>
              </div>
            </div>
            <div>
              <p className="text-slate-900 font-bold text-sm">{pet.shelter.name}</p>
              <p className="text-xs text-slate-400">{pet.shelter.publishedAt}发布</p>
            </div>
          </div>
          <button className="bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors text-slate-600">
            <span className="material-symbols-outlined">chat_bubble</span>
          </button>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900 mb-2">性格描述</h3>
          <p className="text-slate-500 text-sm leading-relaxed text-justify">
            {pet.description}
            <span className="text-primary-dark font-bold cursor-pointer ml-1">查看更多</span>
          </p>
        </div>

        {/* Health tags */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900 mb-3">健康状况</h3>
          <div className="flex flex-wrap gap-2">
            {pet.tags.map((tag, idx) => (
              <div key={idx} className="inline-flex items-center px-3 py-1.5 rounded-full bg-yellow-50 text-yellow-800 border border-yellow-200">
                <span className="material-symbols-outlined text-[16px] mr-1.5">
                  {idx === 0 ? 'vaccines' : idx === 1 ? 'medical_services' : 'favorite'}
                </span>
                <span className="text-xs font-semibold">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto p-4 bg-white/80 backdrop-blur-lg border-t border-slate-100 flex items-center gap-3 z-50">
        <button className="p-3.5 px-4 rounded-xl border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap text-sm font-medium">
          联系救助站
        </button>
        <button
          onClick={() => navigate(`/apply/${pet.id}`)}
          className="flex-1 bg-primary hover:bg-yellow-300 text-slate-900 font-bold py-3.5 px-6 rounded-xl shadow-[0_4px_14px_rgba(253,224,71,0.4)] transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
        >
          <span>申请领养</span>
          <span className="material-symbols-outlined text-[20px]">pets</span>
        </button>
      </div>
    </div>
  )
}
