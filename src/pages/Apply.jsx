import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { api } from '../services/api'

export default function Apply() {
  const { petId } = useParams()
  const navigate = useNavigate()
  const { addApplication } = useApp()
  const [pet, setPet] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    city: '',
    address: '',
    housingType: 'apartment',
    ownership: 'own',
    hasExperience: false,
    motivation: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    loadPet()
  }, [petId])

  const loadPet = async () => {
    const result = await api.getPet(petId)
    setPet(result)
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = '请输入姓名'
    if (!formData.age || formData.age < 18) newErrors.age = '年龄需满18岁'
    if (!formData.city.trim()) newErrors.city = '请输入城市'
    if (!formData.address.trim()) newErrors.address = '请输入详细地址'
    if (!formData.motivation.trim()) newErrors.motivation = '请填写领养动机'
    if (formData.motivation.length > 200) newErrors.motivation = '领养动机不能超过200字'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return

    setLoading(true)
    await api.submitApplication(formData)
    addApplication({
      petId: parseInt(petId),
      petName: pet?.name,
      ...formData
    })
    setLoading(false)
    navigate('/success')
  }

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  return (
    <div className="min-h-screen bg-background-light max-w-md mx-auto pb-32">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center bg-white/95 backdrop-blur-sm p-4 pb-2 justify-between border-b border-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="text-slate-900 flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-slate-900 text-lg font-bold leading-tight flex-1 text-center pr-12">领养申请表</h2>
      </div>

      {/* Progress indicator */}
      <div className="flex w-full flex-row items-center justify-center gap-3 py-6 bg-white">
        <div className="h-2.5 w-2.5 rounded-full bg-primary/40"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-primary/40"></div>
        <div className="h-2.5 w-8 rounded-full bg-primary shadow-[0_0_10px_rgba(253,224,71,0.6)]"></div>
      </div>

      <div className="px-5">
        {/* Personal Info */}
        <h3 className="text-slate-900 text-lg font-bold leading-tight pb-4 pt-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">person</span>
          个人信息
        </h3>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col w-full">
            <p className="text-slate-700 text-sm font-medium leading-normal pb-2">姓名</p>
            <input
              className={`flex w-full rounded-xl text-slate-900 focus:outline-0 focus:ring-2 focus:ring-primary/50 ${errors.name ? 'border-red-300' : 'border-gray-200'} border bg-gray-50 focus:border-primary h-14 placeholder:text-gray-400 p-4 text-base font-normal transition-all`}
              placeholder="请输入您的真实姓名"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </label>

          <div className="flex gap-4">
            <label className="flex flex-col w-1/3">
              <p className="text-slate-700 text-sm font-medium leading-normal pb-2">年龄</p>
              <input
                type="number"
                className={`flex w-full rounded-xl text-slate-900 focus:outline-0 focus:ring-2 focus:ring-primary/50 ${errors.age ? 'border-red-300' : 'border-gray-200'} border bg-gray-50 focus:border-primary h-14 placeholder:text-gray-400 p-4 text-base font-normal transition-all`}
                placeholder="25"
                value={formData.age}
                onChange={(e) => updateField('age', parseInt(e.target.value) || '')}
              />
              {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
            </label>
            <label className="flex flex-col w-2/3">
              <p className="text-slate-700 text-sm font-medium leading-normal pb-2">城市</p>
              <div className="relative">
                <input
                  className={`flex w-full rounded-xl text-slate-900 focus:outline-0 focus:ring-2 focus:ring-primary/50 ${errors.city ? 'border-red-300' : 'border-gray-200'} border bg-gray-50 focus:border-primary h-14 placeholder:text-gray-400 p-4 pr-10 text-base font-normal transition-all`}
                  placeholder="例如：上海"
                  value={formData.city}
                  onChange={(e) => updateField('city', e.target.value)}
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xl">location_on</span>
              </div>
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </label>
          </div>

          <label className="flex flex-col w-full">
            <p className="text-slate-700 text-sm font-medium leading-normal pb-2">详细地址</p>
            <input
              className={`flex w-full rounded-xl text-slate-900 focus:outline-0 focus:ring-2 focus:ring-primary/50 ${errors.address ? 'border-red-300' : 'border-gray-200'} border bg-gray-50 focus:border-primary h-14 placeholder:text-gray-400 p-4 text-base font-normal transition-all`}
              placeholder="街道、小区、门牌号"
              value={formData.address}
              onChange={(e) => updateField('address', e.target.value)}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </label>
        </div>
      </div>

      <div className="my-6 mx-5 border-t border-gray-100"></div>

      {/* Housing */}
      <div className="px-5">
        <h3 className="text-slate-900 text-lg font-bold leading-tight pb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">home</span>
          住房环境
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-2">
            <p className="text-slate-700 text-sm font-medium leading-normal">住房类型</p>
            <div className="flex flex-col gap-2">
              {['apartment', 'villa'].map(type => (
                <label
                  key={type}
                  className={`relative flex cursor-pointer rounded-xl border p-3 transition-all ${
                    formData.housingType === type
                      ? 'border-primary bg-primary/10 ring-1 ring-primary'
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    checked={formData.housingType === type}
                    onChange={() => updateField('housingType', type)}
                  />
                  <div className="flex items-center gap-3">
                    <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                      formData.housingType === type ? 'border-primary bg-primary' : 'border-gray-400'
                    }`}>
                      {formData.housingType === type && (
                        <div className="h-2 w-2 rounded-full bg-slate-900"></div>
                      )}
                    </div>
                    <span className="text-slate-900 font-medium">{type === 'apartment' ? '公寓' : '别墅'}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-slate-700 text-sm font-medium leading-normal">产权情况</p>
            <div className="flex flex-col gap-2">
              {['own', 'rent'].map(own => (
                <label
                  key={own}
                  className={`relative flex cursor-pointer rounded-xl border p-3 transition-all ${
                    formData.ownership === own
                      ? 'border-primary bg-primary/10 ring-1 ring-primary'
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    checked={formData.ownership === own}
                    onChange={() => updateField('ownership', own)}
                  />
                  <div className="flex items-center gap-3">
                    <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                      formData.ownership === own ? 'border-primary bg-primary' : 'border-gray-400'
                    }`}>
                      {formData.ownership === own && (
                        <div className="h-2 w-2 rounded-full bg-slate-900"></div>
                      )}
                    </div>
                    <span className="text-slate-900 font-medium">{own === 'own' ? '自有' : '租赁'}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="my-6 mx-5 border-t border-gray-100"></div>

      {/* Experience */}
      <div className="px-5">
        <div className="flex items-center justify-between rounded-2xl bg-gray-50 border border-gray-200 p-4">
          <div className="flex flex-col">
            <h3 className="text-slate-900 text-base font-bold leading-tight flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">pets</span>
              养宠经验
            </h3>
            <p className="text-sm text-gray-500 mt-1">您以前是否饲养过宠物？</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={formData.hasExperience}
              onChange={(e) => updateField('hasExperience', e.target.checked)}
            />
            <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>

      <div className="my-6 mx-5 border-t border-gray-100"></div>

      {/* Motivation */}
      <div className="px-5 pb-8">
        <h3 className="text-slate-900 text-lg font-bold leading-tight pb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">favorite</span>
          领养动机
        </h3>
        <label className="flex flex-col min-w-40 flex-1">
          <textarea
            className={`flex w-full min-w-0 flex-1 resize-none rounded-xl text-slate-900 focus:outline-0 focus:ring-2 focus:ring-primary/50 ${errors.motivation ? 'border-red-300' : 'border-gray-200'} border bg-gray-50 focus:border-primary min-h-[140px] placeholder:text-gray-400 p-4 text-base font-normal leading-normal transition-all`}
            placeholder="请简述您为何想领养这只宠物，以及您打算如何照顾它..."
            value={formData.motivation}
            onChange={(e) => updateField('motivation', e.target.value)}
            maxLength={200}
          />
          <div className="flex justify-between mt-2">
            {errors.motivation && <p className="text-red-500 text-xs">{errors.motivation}</p>}
            <span className="text-xs text-gray-400 ml-auto">{formData.motivation.length}/200</span>
          </div>
        </label>
      </div>

      {/* Submit button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white/80 backdrop-blur-md border-t border-gray-100 max-w-md mx-auto z-40">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex w-full items-center justify-center rounded-full bg-primary h-14 px-8 text-slate-900 text-lg font-bold shadow-[0_8px_20px_-6px_rgba(253,224,71,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50"
        >
          {loading ? (
            <span className="material-symbols-outlined animate-spin">progress_activity</span>
          ) : (
            '提交申请'
          )}
        </button>
        <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-[14px]">lock</span>
          您的信息将被严格保密
        </p>
      </div>
    </div>
  )
}
