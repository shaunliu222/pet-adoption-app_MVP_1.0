import { useNavigate, useLocation } from 'react-router-dom'

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const items = [
    { path: '/pets', icon: 'pets', label: '首页', activeIcon: 'pets' },
    { path: '/favorites', icon: 'favorite', label: '收藏' },
    { path: '/pets', icon: 'add', label: '', isCenter: true },
    { path: '/messages', icon: 'chat_bubble', label: '消息', hasNotification: true },
    { path: '/profile', icon: 'person', label: '我的' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 pb-6 pt-2 z-20 max-w-md mx-auto">
      <div className="flex justify-around items-end">
        {items.map((item, idx) => {
          if (item.isCenter) {
            return (
              <div key={idx} className="relative -top-5">
                <button
                  onClick={() => navigate(item.path)}
                  className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-slate-900 shadow-lg shadow-yellow-400/50 hover:scale-105 transition-transform"
                >
                  <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                </button>
              </div>
            )
          }

          return (
            <button
              key={idx}
              onClick={() => navigate(item.path)}
              className={`flex flex-1 flex-col items-center gap-1 group ${isActive(item.path) ? 'text-yellow-600' : 'text-slate-400 hover:text-yellow-600'} transition-colors`}
            >
              <div className={`w-12 h-8 flex items-center justify-center rounded-full ${isActive(item.path) ? 'bg-primary/20 text-yellow-700' : ''} transition-colors relative`}>
                <span
                  className="material-symbols-outlined text-2xl"
                  style={isActive(item.path) ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                {item.hasNotification && (
                  <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                )}
              </div>
              <span className={`text-[10px] ${isActive(item.path) ? 'font-bold text-slate-900' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
