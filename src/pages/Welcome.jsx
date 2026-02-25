import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto">
      {/* Header spacer */}
      <div className="h-12"></div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-between px-6 pb-12 pt-4">
        {/* Image section */}
        <div className="w-full flex-1 flex items-center justify-center relative mb-8">
          {/* Decorative backgrounds */}
          <div className="absolute w-[120%] h-[80%] bg-primary/20 rounded-full blur-3xl -top-10 left-1/2 -translate-x-1/2 z-0"></div>
          <div className="absolute w-[80%] h-[60%] bg-yellow-200/30 rounded-full blur-2xl bottom-10 right-0 z-0"></div>

          {/* Main image */}
          <div className="relative z-10 w-full aspect-[4/5] max-h-[500px] overflow-hidden rounded-xl">
            <div
              className="w-full h-full bg-cover bg-center transition-transform hover:scale-105 duration-700"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600')" }}
            ></div>

            {/* Stats badge */}
            <div className="absolute top-6 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
              <span className="material-symbols-outlined text-yellow-500">pets</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800">已救助</span>
                <span className="text-[10px] text-slate-500">12,400+</span>
              </div>
            </div>

            {/* Community badge */}
            <div className="absolute bottom-8 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="h-6 w-6 rounded-full bg-slate-200 border-2 border-white bg-cover bg-center"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50')" }}></div>
                <div className="h-6 w-6 rounded-full bg-slate-200 border-2 border-white bg-cover bg-center"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50')" }}></div>
                <div className="h-6 w-6 rounded-full bg-slate-200 border-2 border-white bg-cover bg-center"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50')" }}></div>
              </div>
              <span className="text-xs font-bold text-yellow-600">加入社区</span>
            </div>
          </div>
        </div>

        {/* Text and buttons */}
        <div className="w-full flex flex-col items-center z-10">
          {/* Page indicators */}
          <div className="flex flex-row items-center justify-center gap-2 mb-6">
            <div className="h-2 w-6 rounded-full bg-primary transition-all duration-300 shadow-sm"></div>
            <div className="h-2 w-2 rounded-full bg-slate-200"></div>
            <div className="h-2 w-2 rounded-full bg-slate-200"></div>
          </div>

          <h1 className="text-slate-900 text-[32px] font-bold leading-tight text-center mb-3 tracking-tight">
            给它一个温暖的家
          </h1>
          <p className="text-slate-500 text-base font-normal leading-relaxed text-center px-4 mb-8">
            连接流浪小动物与有爱心的领养人，<br/>让每一次相遇都充满温情。
          </p>

          {/* Start button */}
          <button
            onClick={() => navigate('/pets')}
            className="group relative w-full h-14 bg-primary rounded-full overflow-hidden shadow-lg shadow-yellow-200 active:scale-[0.98] transition-all duration-200 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative text-slate-900 text-lg font-bold tracking-wide flex items-center gap-2">
              开启领养之旅
              <span className="material-symbols-outlined text-[20px] font-bold group-hover:translate-x-1 transition-transform text-slate-900">arrow_forward</span>
            </span>
          </button>

          {/* Login link */}
          <button
            onClick={() => navigate('/profile')}
            className="mt-4 text-sm text-slate-400 hover:text-slate-800 transition-colors"
          >
            已有账号？登录
          </button>
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="h-6 w-full flex justify-center items-end pb-2">
        <div className="w-32 h-1 bg-slate-200 rounded-full"></div>
      </div>
    </div>
  )
}
