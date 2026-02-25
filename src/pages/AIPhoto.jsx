import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../services/api'

// 互动场景列表
const INTERACTION_SCENES = [
  { id: 'cuddle_sofa', name: '沙发相拥', icon: 'weekend', desc: '宠物依偎在怀里' },
  { id: 'sleeping_together', name: '一起睡觉', icon: 'bed', desc: '温馨的午睡时光' },
  { id: 'feeding', name: '喂食时光', icon: 'restaurant', desc: '给宠物喂食的画面' },
  { id: 'outdoor_walk', name: '户外散步', icon: 'directions_walk', desc: '阳光下的户外互动' },
  { id: 'gentle_touch', name: '温柔抚摸', icon: 'front_hand', desc: '轻抚宠物，深情对视' },
]

export default function AIPhoto() {
  const { petId } = useParams()
  const navigate = useNavigate()
  const [pet, setPet] = useState(null)
  const [userPhoto, setUserPhoto] = useState(null)
  const [userPhotoPreview, setUserPhotoPreview] = useState(null)
  const [selectedScene, setSelectedScene] = useState('cuddle_sofa')
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadPet = async () => {
      const result = await api.getPet(petId)
      setPet(result)
    }
    loadPet()
  }, [petId])

  const handlePhotoSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUserPhoto(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setUserPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
      setError(null)
      setResult(null)
    }
  }

  const handleGenerate = async () => {
    if (!userPhoto) {
      setError('请先上传您的照片')
      return
    }
    if (!pet?.image) {
      setError('宠物照片加载失败')
      return
    }

    setGenerating(true)
    setError(null)
    setResult(null)

    try {
      // 创建 FormData
      const formData = new FormData()
      formData.append('user_image', userPhoto)
      formData.append('interaction_id', selectedScene)

      // 将宠物图片URL转换为Blob然后上传
      const petImageResponse = await fetch(pet.image)
      const petImageBlob = await petImageResponse.blob()
      formData.append('pet_image', petImageBlob, 'pet.jpg')

      // 调用AI API
      const response = await fetch('/ai-api/generate/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        // 将API返回的URL转换为前端代理URL
        // API返回: /api/download/xxx.png -> 前端需要: /ai-api/download/xxx.png
        const imageUrl = data.image_url ? data.image_url.replace('/api/', '/ai-api/') : null
        setResult({
          imageUrl: imageUrl,
          prompt: data.prompt,
        })
      } else {
        setError(data.message || '生成失败，请重试')
      }
    } catch (err) {
      console.error('AI generation error:', err)
      setError('AI服务连接失败，请确保AI服务已启动 (python api.py)')
    } finally {
      setGenerating(false)
    }
  }

  const downloadImage = async () => {
    if (!result?.imageUrl) return

    try {
      const response = await fetch(result.imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `ai_photo_${pet?.name || 'pet'}_${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Download error:', err)
    }
  }

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
        >
          <span className="material-symbols-outlined text-slate-900">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-slate-900">AI合照生成</h1>
        <div className="w-10 h-10"></div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-6 flex flex-col">
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            和{pet?.name || '萌宠'}拍张照吧!
          </h2>
          <p className="text-slate-500 text-sm">上传你的照片，AI将为你生成一张温馨合影</p>
        </div>

        {/* Photo upload area */}
        <div className="w-full grid grid-cols-2 gap-4 mb-6">
          {/* User photo upload */}
          <label className="relative aspect-[3/4] rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center group cursor-pointer hover:border-primary hover:bg-yellow-50 transition-all overflow-hidden">
            {userPhotoPreview ? (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${userPhotoPreview}')` }}
                ></div>
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-sm font-medium">更换照片</span>
                </div>
              </>
            ) : (
              <>
                <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-primary-dark">add_a_photo</span>
                </div>
                <span className="text-sm font-medium text-slate-400 group-hover:text-primary-dark">点击上传照片</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoSelect}
            />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border border-slate-100">
              <span className="material-symbols-outlined text-primary-dark text-lg font-bold">add</span>
            </div>
          </label>

          {/* Pet photo */}
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${pet?.image}')` }}
            ></div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <p className="text-white text-sm font-bold">{pet?.name || '萌宠'}</p>
            </div>
          </div>
        </div>

        {/* Scene selection */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-dark text-lg">auto_awesome</span>
            选择互动场景
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {INTERACTION_SCENES.map((scene) => (
              <button
                key={scene.id}
                onClick={() => setSelectedScene(scene.id)}
                className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                  selectedScene === scene.id
                    ? 'bg-primary text-slate-900 shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span className="material-symbols-outlined text-xl mb-1">{scene.icon}</span>
                <span className="text-[10px] font-medium text-center">{scene.name}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-2 text-center">
            {INTERACTION_SCENES.find(s => s.id === selectedScene)?.desc}
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <span className="material-symbols-outlined text-red-500">error</span>
            <div className="flex-1">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Result display */}
        {result && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
              生成成功
            </h3>
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src={result.imageUrl}
                alt="AI Generated Photo"
                className="w-full aspect-square object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white text-sm font-bold mb-2">你和{pet?.name}的温馨合影</p>
                <button
                  onClick={downloadImage}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium hover:bg-white/30 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">download</span>
                  保存图片
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="w-full bg-yellow-50 rounded-xl p-4 flex items-start gap-3">
          <span className="material-symbols-outlined text-primary-dark text-xl mt-0.5">lightbulb</span>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-slate-800 mb-1">小贴士</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              为了获得最佳效果，请上传光线充足、面部清晰的正面照片。AI 将自动匹配{pet?.name || '宠物'}的神态哦！
            </p>
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="sticky bottom-0 w-full p-4 bg-white/90 backdrop-blur-lg border-t border-slate-100 z-50">
        <div className="flex flex-col gap-3">
          <label className="w-full py-3 rounded-xl border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 transition-colors shadow-sm font-medium flex items-center justify-center gap-2 cursor-pointer">
            <span className="material-symbols-outlined">upload_file</span>
            {userPhoto ? '更换照片' : '上传照片'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoSelect}
            />
          </label>
          <button
            onClick={handleGenerate}
            disabled={generating || !userPhoto}
            className="w-full bg-primary hover:bg-yellow-300 text-slate-900 font-bold py-4 rounded-xl shadow-[0_4px_14px_rgba(253,224,71,0.4)] transition-all hover:shadow-[0_6px_20px_rgba(253,224,71,0.6)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {generating ? (
              <>
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                生成中...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">auto_awesome</span>
                立即生成合照
              </>
            )}
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-400 mt-3">
          生成即表示同意 <span className="underline cursor-pointer">用户协议</span> 及 <span className="underline cursor-pointer">隐私政策</span>
        </p>
      </div>
    </div>
  )
}
