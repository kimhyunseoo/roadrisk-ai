import { useNavigate } from 'react-router-dom'
import { CloudRain, Car, Route, ScanSearch, Building2 } from 'lucide-react'
import UploadDropzone from '../components/UploadDropzone'
import { useApp } from '../context/AppContext'

const FEATURES = [
  {
    icon: ScanSearch,
    title: 'AI 균열·포트홀 탐지',
    desc: '업로드한 사진에서 도로 균열과 포트홀 영역을 자동으로 탐지합니다.',
  },
  {
    icon: CloudRain,
    title: '강수량 데이터 결합',
    desc: '해당 지역의 강수량 데이터를 반영해 균열 악화 가능성을 계산합니다.',
  },
  {
    icon: Car,
    title: '교통량 데이터 결합',
    desc: '차량 통행량을 함께 고려해 포트홀 발전 속도를 추정합니다.',
  },
  {
    icon: Route,
    title: '도로유형별 분석',
    desc: '간선도로, 이면도로 등 도로유형에 따른 위험도를 구분합니다.',
  },
]

export default function HomePage() {
  const navigate = useNavigate()
  const { analyzePhoto } = useApp()

  const handleFileSelected = (file) => {
    analyzePhoto(file)
    navigate('/result')
  }

  return (
    <div>
      <section className="bg-gradient-to-b from-blue-50 to-transparent">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-medium text-blue-700">
              <Building2 size={14} />
              시민 참여형 도로 안전 진단 서비스
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              도로 사진 한 장으로
              <br />
              포트홀 위험도를 진단하세요
            </h1>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              사진을 업로드하면 AI가 균열과 포트홀을 탐지하고, 강수량·교통량·도로유형 데이터를 종합해
              위험도를 Low·Medium·High로 알려드립니다.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-xl">
            <UploadDropzone onFileSelected={handleFileSelected} />
            <p className="mt-3 text-center text-xs text-slate-400">
              ※ 본 데모는 실제 AI 모델과 연동되지 않으며, 분석 결과는 시연용 가상 데이터입니다.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-center text-xl font-bold text-slate-900 sm:text-2xl">
          어떻게 위험도를 진단하나요?
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <Icon size={20} />
              </span>
              <p className="mt-4 font-semibold text-slate-800">{title}</p>
              <p className="mt-1.5 text-sm text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">지자체 담당자이신가요?</h2>
          <p className="mt-2 text-sm text-slate-500">
            시민이 신고한 위험 지역을 지도와 리스트로 한눈에 확인하고 유지보수 우선순위를 정할 수 있습니다.
          </p>
          <a
            href="/dashboard"
            className="mt-5 inline-flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-5 py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100"
          >
            지자체 대시보드 보기
          </a>
        </div>
      </section>
    </div>
  )
}
