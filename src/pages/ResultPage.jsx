import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { CloudRain, Car, Route, MapPin, Ruler, Percent, Send, CheckCircle2, RefreshCcw } from 'lucide-react'
import { useApp } from '../context/AppContext'
import RiskBadge from '../components/RiskBadge'
import CrackOverlay from '../components/CrackOverlay'
import MapView from '../components/MapView'
import { RISK_STYLES } from '../data/mockData'

function MetricCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2 text-slate-400">
        <Icon size={16} />
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="mt-1.5 text-xl font-bold text-slate-900">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-slate-400">{sub}</p>}
    </div>
  )
}

export default function ResultPage() {
  const { currentAnalysis, reportCurrentAnalysis } = useApp()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!currentAnalysis) {
    return <Navigate to="/" replace />
  }

  const a = currentAnalysis
  const riskStyle = RISK_STYLES[a.riskLevel]

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">진단 결과</h1>
          <p className="mt-1 text-sm text-slate-500">AI가 분석한 도로 균열·포트홀 위험도입니다.</p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 self-start rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          <RefreshCcw size={15} />
          다른 사진 진단하기
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <CrackOverlay imageUrl={a.imageUrl} regions={a.overlayRegions} riskLevel={a.riskLevel} />
        </div>

        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className={`rounded-2xl border p-5 ${riskStyle.badge}`}>
            <p className="text-xs font-medium opacity-80">종합 위험도</p>
            <div className="mt-2 flex items-center justify-between">
              <RiskBadge level={a.riskLevel} size="lg" />
            </div>
            <p className="mt-3 text-xs leading-relaxed opacity-80">
              균열 면적, 강수량, 교통량, 도로유형을 종합해 산정한 포트홀 발전 위험도입니다. (시뮬레이션 값)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MetricCard icon={Percent} label="균열 면적 비율" value={`${a.crackAreaPercent}%`} />
            <MetricCard icon={Ruler} label="균열 길이" value={`${a.crackLengthCm} cm`} />
            <MetricCard icon={CloudRain} label="최근 강수량" value={`${a.rainfallMm} mm`} />
            <MetricCard icon={Car} label="일 교통량" value={`${a.trafficVolume.toLocaleString()} 대`} />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Route size={16} />
              <span className="text-xs font-medium">도로유형</span>
            </div>
            <p className="mt-1.5 text-sm font-semibold text-slate-800">{a.roadType}</p>
          </div>

          <button
            type="button"
            onClick={reportCurrentAnalysis}
            disabled={a.reported}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold shadow-sm transition-colors ${
              a.reported
                ? 'cursor-default bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-blue-700 text-white hover:bg-blue-800'
            }`}
          >
            {a.reported ? (
              <>
                <CheckCircle2 size={16} />
                지자체에 신고 완료
              </>
            ) : (
              <>
                <Send size={16} />
                지자체에 신고하기
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center gap-2 text-slate-700">
          <MapPin size={18} />
          <h2 className="font-semibold">촬영 위치</h2>
        </div>
        <p className="mb-3 text-sm text-slate-500">{a.location.address}</p>
        <p className="mb-3 text-xs text-slate-400">
          GPS 좌표: {a.location.lat.toFixed(5)}, {a.location.lng.toFixed(5)}
        </p>
        <MapView reports={[a]} center={a.location} height={280} />
      </div>
    </div>
  )
}
