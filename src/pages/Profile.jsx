import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Profile() {
  const navigate = useNavigate()
  const { applications, favorites, user } = useApp()

  // Mock user data
  const userData = {
    name: '张三',
    id: '8839201',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    stats: {
      following: 12,
      followers: 5,
      likes: 108
    }
  }

  const menuItems = [
    { icon: 'assignment', title: '我的申请', subtitle: '查看领养进度', badge: applications.length > 0 ? applications.length : null },
    { icon: 'favorite', title: '我的收藏', subtitle: '心仪的毛孩子', badge: favorites.length > 0 ? favorites.length : null },
    { icon: 'pets', title: '已领养', subtitle: '我的家庭成员' },
    { icon: 'book', title: '领养日记', subtitle: '记录美好生活' }
  ]

  const settingItems = [
    { icon: 'verified_user', title: '实名认证', badge: '已认证' },
    { icon: 'location_on', title: '地址管理' },
    { icon: 'help', title: '帮助中心' }
  ]

  return (
    <div className="min-h-screen bg-background-light flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="relative w-full pt-12 pb-8 px-6 flex flex-col items-center bg-white rounded-b-2xl shadow-sm z-10">
        {/* Settings and notifications */}
        <div className="absolute top-4 right-4 flex gap-3">
          <button className="p-2 text-slate-400 hover:text-primary-dark transition-colors">
            <span className="material-symbols-outlined text-2xl">settings</span>
          </button>
          <button className="p-2 text-slate-400 hover:text-primary-dark transition-colors relative">
            <span className="material-symbols-outlined text-2xl">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center gap-4 mt-4">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full bg-cover bg-center border-4 border-primary/20 p-1" style={{ backgroundImage: `url('${userData.avatar}')` }}>
              <div className="w-full h-full rounded-full bg-cover bg-center" style={{ backgroundImage: `url('${userData.avatar}')` }}></div>
            </div>
            <button className="absolute bottom-0 right-0 bg-primary text-slate-900 p-1.5 rounded-full border-2 border-white shadow-lg hover:bg-yellow-300 transition-colors">
              <span className="material-symbols-outlined text-sm font-bold">edit</span>
            </button>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{userData.name}</h1>
            <p className="text-sm text-slate-500 mt-1">爱心领养人 ID: {userData.id}</p>
          </div>

          <button className="mt-2 px-8 py-2.5 bg-primary text-slate-900 hover:bg-yellow-300 font-bold rounded-full text-sm transition-colors flex items-center gap-2 shadow-sm shadow-yellow-200">
            <span className="material-symbols-outlined text-lg">edit_note</span>
            编辑资料
          </button>
        </div>

        {/* Stats */}
        <div className="flex w-full justify-between mt-8 px-4 divide-x divide-slate-100">
          <div className="flex-1 flex flex-col items-center gap-1">
            <span className="text-lg font-bold text-slate-900">{userData.stats.following}</span>
            <span className="text-xs text-slate-500">关注</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1">
            <span className="text-lg font-bold text-slate-900">{userData.stats.followers}</span>
            <span className="text-xs text-slate-500">粉丝</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1">
            <span className="text-lg font-bold text-slate-900">{userData.stats.likes}</span>
            <span className="text-xs text-slate-500">获赞</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6 space-y-6 pb-24">
        {/* My services */}
        <section>
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className="text-lg font-bold text-slate-900">我的服务</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (idx === 0 && applications.length > 0) {
                    navigate('/success')
                  }
                }}
                className="flex flex-col items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-primary/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 group-hover:bg-primary group-hover:text-slate-900 transition-colors">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div>
                  <span className="block text-base font-bold text-slate-900">{item.title}</span>
                  <span className="text-xs text-slate-400 mt-0.5">{item.subtitle}</span>
                </div>
                {item.badge && (
                  <span className="absolute top-2 right-2 bg-primary text-slate-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Settings */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {settingItems.map((item, idx) => (
            <button key={idx} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-primary/20 group-hover:text-yellow-700 transition-colors">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <span className="text-base font-medium text-slate-900">{item.title}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                {item.badge && (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">{item.badge}</span>
                )}
                <span className="material-symbols-outlined text-xl">chevron_right</span>
              </div>
            </button>
          ))}
        </section>

        {/* Invite banner */}
        <div className="relative w-full h-24 rounded-2xl overflow-hidden shadow-sm mt-4">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 flex items-center px-6 justify-between">
            <div className="z-10 text-slate-900">
              <h3 className="font-bold text-lg">邀请好友领好礼</h3>
              <p className="text-xs text-slate-800 mt-1">分享爱心，让更多宠物找到家</p>
            </div>
            <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm z-10">
              <span className="material-symbols-outlined text-3xl text-slate-900">volunteer_activism</span>
            </div>
            <div className="absolute -right-4 -bottom-8 w-32 h-32 bg-white/20 rounded-full"></div>
            <div className="absolute right-12 -top-8 w-20 h-20 bg-white/20 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="sticky bottom-0 w-full bg-white border-t border-slate-100 pb-4 pt-2 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
        <div className="flex justify-between items-end">
          <button onClick={() => navigate('/pets')} className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-400 hover:text-yellow-600 transition-colors">
            <span className="material-symbols-outlined text-2xl">home</span>
            <span className="text-[10px] font-medium">首页</span>
          </button>
          <button onClick={() => navigate('/pets')} className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-400 hover:text-yellow-600 transition-colors">
            <span className="material-symbols-outlined text-2xl">search</span>
            <span className="text-[10px] font-medium">搜索</span>
          </button>
          <button className="flex flex-1 flex-col items-center justify-end gap-1 text-yellow-600">
            <div className="bg-primary px-4 py-1 rounded-full flex flex-col items-center shadow-sm shadow-yellow-200">
              <span className="material-symbols-outlined text-2xl text-slate-900" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
            </div>
            <span className="text-[10px] font-medium">我的</span>
          </button>
        </div>
      </div>
    </div>
  )
}
