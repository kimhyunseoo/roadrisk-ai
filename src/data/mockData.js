// All values here are simulated for demo purposes only — no real model inference.

const CITY_CENTER = { lat: 37.5665, lng: 126.978 } // Seoul city hall, used as demo anchor

const ROAD_TYPES = ['간선도로', '이면도로', '고속도로', '주거지역 도로']
const DISTRICTS = [
  '중구 세종대로',
  '종로구 종로',
  '용산구 한강대로',
  '마포구 월드컵로',
  '영등포구 여의대로',
  '강남구 테헤란로',
  '성동구 왕십리로',
  '서대문구 연희로',
]

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function computeRiskLevel({ crackAreaPercent, rainfallMm, trafficVolume }) {
  // Simple weighted dummy scoring — NOT a real model, purely for demo simulation.
  const score =
    crackAreaPercent * 4 + rainfallMm / 20 + trafficVolume / 800

  if (score >= 32) return 'High'
  if (score >= 16) return 'Medium'
  return 'Low'
}

function randomOverlayRegions() {
  const count = Math.floor(randomBetween(2, 5))
  return Array.from({ length: count }, () => ({
    top: randomBetween(10, 75),
    left: randomBetween(10, 75),
    width: randomBetween(8, 26),
    height: randomBetween(6, 18),
    rotate: randomBetween(-25, 25),
  }))
}

export function generateAnalysis(imageUrl) {
  const crackAreaPercent = Number(randomBetween(0.5, 15).toFixed(1))
  const crackLengthCm = Math.round(randomBetween(20, 320))
  const rainfallMm = Math.round(randomBetween(10, 220))
  const trafficVolume = Math.round(randomBetween(500, 9000))
  const roadType = pick(ROAD_TYPES)
  const riskLevel = computeRiskLevel({ crackAreaPercent, rainfallMm, trafficVolume })

  const lat = CITY_CENTER.lat + randomBetween(-0.04, 0.04)
  const lng = CITY_CENTER.lng + randomBetween(-0.05, 0.05)
  const address = `서울특별시 ${pick(DISTRICTS)} ${Math.floor(randomBetween(1, 300))}`

  return {
    id: `report-${Math.floor(randomBetween(100000, 999999))}`,
    imageUrl,
    crackAreaPercent,
    crackLengthCm,
    rainfallMm,
    trafficVolume,
    roadType,
    riskLevel,
    overlayRegions: randomOverlayRegions(),
    location: { lat, lng, address },
    createdAt: null, // stamped by caller (avoids Date.now inside pure generator)
  }
}

const SEED_ADDRESSES = DISTRICTS

export function generateSeedReports(count = 14) {
  return Array.from({ length: count }, (_, i) => {
    const crackAreaPercent = Number(randomBetween(0.5, 15).toFixed(1))
    const rainfallMm = Math.round(randomBetween(10, 220))
    const trafficVolume = Math.round(randomBetween(500, 9000))
    const riskLevel = computeRiskLevel({ crackAreaPercent, rainfallMm, trafficVolume })
    const lat = CITY_CENTER.lat + randomBetween(-0.045, 0.045)
    const lng = CITY_CENTER.lng + randomBetween(-0.06, 0.06)

    return {
      id: `seed-${i}`,
      imageUrl: null,
      crackAreaPercent,
      crackLengthCm: Math.round(randomBetween(20, 320)),
      rainfallMm,
      trafficVolume,
      roadType: pick(ROAD_TYPES),
      riskLevel,
      overlayRegions: [],
      location: {
        lat,
        lng,
        address: `서울특별시 ${pick(SEED_ADDRESSES)} ${Math.floor(randomBetween(1, 300))}`,
      },
      createdAt: `2026-0${Math.floor(randomBetween(1, 7))}-${String(Math.floor(randomBetween(1, 28))).padStart(2, '0')}`,
    }
  })
}

export const RISK_STYLES = {
  Low: {
    label: 'Low',
    labelKo: '낮음',
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    dot: 'bg-emerald-500',
    marker: '#10b981',
    ring: 'ring-emerald-500',
  },
  Medium: {
    label: 'Medium',
    labelKo: '보통',
    badge: 'bg-amber-100 text-amber-800 border-amber-300',
    dot: 'bg-amber-500',
    marker: '#f59e0b',
    ring: 'ring-amber-500',
  },
  High: {
    label: 'High',
    labelKo: '높음',
    badge: 'bg-red-100 text-red-800 border-red-300',
    dot: 'bg-red-500',
    marker: '#ef4444',
    ring: 'ring-red-500',
  },
}

export const CITY_MAP_CENTER = CITY_CENTER
