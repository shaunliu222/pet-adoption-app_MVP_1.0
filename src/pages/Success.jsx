import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Success() {
  const navigate = useNavigate()
  const { applications } = useApp()
  const latestApplication = applications[applications.length - 1]

  return (
    <div className="min-h-screen bg-background-light flex flex-col items-center justify-center max-w-md mx-auto">
      <div className="w-full bg-white h-screen sm:h-auto sm:min-h-[812px] sm:rounded-[2.5rem] sm:shadow-2xl overflow-hidden relative flex flex-col">
        {/* Status bar spacer */}
        <div className="h-12 w-full shrink-0 flex items-end justify-between px-6 pb-2 z-10">
          <span className="text-xs font-semibold text-slate-900">9:41</span>
          <div className="flex gap-1.5 items-center">
            <span className="material-symbols-outlined text-[18px] text-slate-900">signal_cellular_alt</span>
            <span className="material-symbols-outlined text-[18px] text-slate-900">wifi</span>
            <span className="material-symbols-outlined text-[18px] text-slate-900">battery_full</span>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
          {/* Hero illustration */}
          <div className="relative w-full aspect-[4/3] flex items-center justify-center bg-orange-50/50">
            {/* Decorative circles */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-orange-400/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-400/20 rounded-full blur-3xl"></div>

            {/* Confetti */}
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-red-400 rounded-full opacity-60"></div>
            <div className="absolute top-1/3 right-1/4 w-2 h-4 bg-orange-400 rotate-45 opacity-80"></div>
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
            <div className="absolute top-20 right-10 w-3 h-3 bg-green-400 rotate-12 opacity-60"></div>

            {/* Main image */}
            <div className="relative z-10 w-64 h-64 flex items-center justify-center">
              <span className="material-symbols-outlined text-[180px] text-orange-300">celebration</span>
            </div>
          </div>

          {/* Text content */}
          <div className="px-6 pt-2 pb-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4 text-green-600">
              <span className="material-symbols-outlined text-[28px]">check_circle</span>
            </div>
            <h1 className="text-slate-900 text-[28px] font-bold leading-tight mb-3">
              恭喜！领养申请已提交
            </h1>
            <p className="text-slate-500 text-[15px] leading-relaxed max-w-[320px]">
              感谢您的爱心，救助站工作人员将在1-3个工作日内与您联系，请保持电话畅通。
            </p>
          </div>

          {/* Pet info card */}
          {latestApplication && (
            <div className="px-6 py-2 w-full">
              <div className="w-full bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-100 flex items-center gap-4">
                <div className="w-20 h-20 shrink-0 rounded-xl bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-orange-400">pets</span>
                </div>
                <div className="flex-1 flex flex-col justify-center gap-1.5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-slate-900 text-lg font-bold">{latestApplication.petName || '宠物'}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="material-symbols-outlined text-[16px]">pets</span>
                    <span>领养申请</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 text-orange-500 text-xs font-semibold border border-orange-200">
                      <span className="material-symbols-outlined text-[14px] animate-pulse">hourglass_top</span>
                      审核中
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="h-6"></div>
        </div>

        {/* Footer actions */}
        <div className="shrink-0 p-6 pt-2 w-full bg-white flex flex-col gap-3 pb-8">
          <button
            onClick={() => navigate('/profile')}
            className="w-full h-14 bg-orange-400 hover:bg-orange-500 active:scale-[0.98] transition-all duration-200 rounded-full flex items-center justify-center gap-2 text-white font-bold text-lg shadow-[0_8px_20px_rgba(238,140,43,0.3)]"
          >
            <span className="material-symbols-outlined">assignment_turned_in</span>
            查看申请进度
          </button>
          <button
            onClick={() => navigate('/pets')}
            className="w-full h-14 bg-transparent hover:bg-slate-50 active:scale-[0.98] transition-all duration-200 rounded-full flex items-center justify-center text-slate-500 font-semibold text-lg"
          >
            返回首页
          </button>
        </div>
      </div>
    </div>
  )
}
