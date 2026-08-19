import React, { useState } from 'react'
import {
  Button,
  Badge,
  Modal
} from '@figma/astraui'
import {
  Globe,
  Ruler,
  Clock,
  Download,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  WifiOff,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  X,
  ShieldAlert,
  FileText,
  LayoutDashboard,
  Truck,
  Activity,
  FileSpreadsheet,
  Settings,
  Menu,
  Info,
  Box,
  Thermometer,
  Droplets,
  Scale,
  Navigation,
  CheckSquare,
  Lock,
  Bell,
  User,
  LogOut,
  MapPin,
  Check
} from 'lucide-react'

// Language definitions
type Lang = 'en' | 'zh'

// Measurement systems
type UnitSystem = 'metric' | 'imperial'

// Timezone options
type Timezone = 'local' | 'shipment' | 'utc'

// Status types
type LogStatus = 'normal' | 'warning' | 'excursion' | 'offline'

interface LogRecord {
  id: string
  timestampLocal: string
  timestampShipment: string
  timestampUtc: string
  locationEn: string
  locationZh: string
  tempC: number | null
  tempF: number | null
  humidity: number | null
  status: LogStatus
  recordedByEn: string
  recordedByZh: string
  remarksEn: string
  remarksZh: string
}

// Mock Data - Multi-checkpoint Telemetry Stream
const LOG_DATA: LogRecord[] = [
  {
    id: 'LOG-101',
    timestampLocal: '2026/08/01 15:30:00',
    timestampShipment: '2026/08/01 15:30:00',
    timestampUtc: '2026/08/01 07:30:00',
    locationEn: 'Taipei BioLogistics Hub (Checkpoint 1/6)',
    locationZh: '台北生技物流中心 (點檢關卡 1/6)',
    tempC: 2.5,
    tempF: 36.5,
    humidity: 45.2,
    status: 'normal',
    recordedByEn: 'Lin Chen (TPE Ops)',
    recordedByZh: '陳林 (台北營運部)',
    remarksEn: 'Pre-flight temperature verification passed. Cold box battery 98%.',
    remarksZh: '起飛前溫度核驗通過。冷藏箱電池電量 98%。'
  },
  {
    id: 'LOG-102',
    timestampLocal: '2026/08/01 18:45:00',
    timestampShipment: '2026/08/01 18:45:00',
    timestampUtc: '2026/08/01 10:45:00',
    locationEn: 'TPE Runway Apron / Loading Area (Checkpoint 2/6)',
    locationZh: '桃園機場機坪裝載區 (點檢關卡 2/6)',
    tempC: 3.8,
    tempF: 38.8,
    humidity: 48.0,
    status: 'normal',
    recordedByEn: 'Automated Sensor #A-88',
    recordedByZh: '自動感測器 #A-88',
    remarksEn: 'Transferred to active thermal container LD3-094.',
    remarksZh: '已轉移至主動式溫控貨陸集裝箱 LD3-094。'
  },
  {
    id: 'LOG-103',
    timestampLocal: '2026/08/02 02:15:00',
    timestampShipment: '2026/08/02 02:15:00',
    timestampUtc: '2026/08/01 18:15:00',
    locationEn: 'In-Flight Flight CI-061 Cargo Hold (Checkpoint 3/6)',
    locationZh: 'CI-061 航班貨艙 (點檢關卡 3/6)',
    tempC: 4.1,
    tempF: 39.4,
    humidity: 42.5,
    status: 'normal',
    recordedByEn: 'In-flight Telemetry System',
    recordedByZh: '機載遙測系統',
    remarksEn: 'Cargo bay climate control stable.',
    remarksZh: '貨艙環境控制穩定。'
  },
  {
    id: 'LOG-104',
    timestampLocal: '2026/08/02 12:10:00',
    timestampShipment: '2026/08/02 06:10:00',
    timestampUtc: '2026/08/02 04:10:00',
    locationEn: 'Frankfurt Airport TARMAC (Checkpoint 4/6)',
    locationZh: '法蘭克福機場停機坪 (點檢關卡 4/6)',
    tempC: 9.1,
    tempF: 48.4,
    humidity: 61.0,
    status: 'excursion',
    recordedByEn: 'FRA Logistics Team',
    recordedByZh: '法蘭克福物流團隊',
    remarksEn: 'Temp exceeded 8.0°C upper limit during tarmac transfer delay (12 mins).',
    remarksZh: '停機坪轉運延誤 12 分鐘，溫度超出上限 8.0°C。'
  },
  {
    id: 'LOG-105',
    timestampLocal: '2026/08/02 12:22:00',
    timestampShipment: '2026/08/02 06:22:00',
    timestampUtc: '2026/08/02 04:22:00',
    locationEn: 'Frankfurt Cold Storage Bay 2',
    locationZh: '法蘭克福冷藏庫 2 號灣',
    tempC: 3.2,
    tempF: 37.8,
    humidity: 46.8,
    status: 'warning',
    recordedByEn: 'Hans Weber (FRA)',
    recordedByZh: 'Hans Weber (法蘭克福)',
    remarksEn: 'Rapid re-cooling active. Internal thermal probe stabilized at 3.2°C.',
    remarksZh: '快速再冷卻啟動中。內部熱探針穩定於 3.2°C。'
  },
  {
    id: 'LOG-106',
    timestampLocal: '2026/08/02 14:00:00',
    timestampShipment: '2026/08/02 08:00:00',
    timestampUtc: '2026/08/02 06:00:00',
    locationEn: 'Frankfurt Cold Storage Warehouse, Zone B (Checkpoint 5/6 - Current)',
    locationZh: '法蘭克福冷藏倉庫 B 區 (點檢關卡 5/6 - 目前位置)',
    tempC: 2.4,
    tempF: 36.3,
    humidity: 44.1,
    status: 'normal',
    recordedByEn: 'Automated Sensor #A-88',
    recordedByZh: '自動感測器 #A-88',
    remarksEn: 'Environmental balance restored in cold warehouse bay.',
    remarksZh: '冷藏倉庫環境平衡已復原。'
  },
  {
    id: 'LOG-107',
    timestampLocal: '2026/08/02 15:15:00',
    timestampShipment: '2026/08/02 09:15:00',
    timestampUtc: '2026/08/02 07:15:00',
    locationEn: 'Secondary Telemetry Probe B (Warehouse Zone B)',
    locationZh: '副無線遙測探針 B (倉庫 B 區)',
    tempC: null,
    tempF: null,
    humidity: null,
    status: 'offline',
    recordedByEn: 'System Alert',
    recordedByZh: '系統警報',
    remarksEn: 'No current reading. Last valid reading: 2.4 °C at 15:00.',
    remarksZh: '目前無有效讀數。最後有效讀數：15:00，2.4 °C。'
  }
]

interface HandlingCheck {
  id: string
  time: string
  itemEn: string
  itemZh: string
  compliance: 'compliant' | 'non_compliant' | 'pending'
  checkedByEn: string
  checkedByZh: string
  notesEn: string
  notesZh: string
}

const HANDLING_CHECKS: HandlingCheck[] = [
  {
    id: 'HC-01',
    time: '2026/08/01 14:00',
    itemEn: 'Pre-shipment Visual & Seal Audit',
    itemZh: '發貨前外觀與封條查驗',
    compliance: 'compliant',
    checkedByEn: 'Lin Chen (TPE)',
    checkedByZh: '陳林 (台北)',
    notesEn: 'Tamper-evident seal #77821 intact and verified.',
    notesZh: '防篡改封條 #77821 完好無損，已驗證。'
  },
  {
    id: 'HC-02',
    time: '2026/08/01 15:00',
    itemEn: 'Dry Ice / Passive Cooling Battery Charge',
    itemZh: '乾冰/被動冷卻包預冷電量核查',
    compliance: 'compliant',
    checkedByEn: 'K. Sato (Quality)',
    checkedByZh: '佐藤 (品質部)',
    notesEn: 'VIP vacuum insulation panels fully conditioned.',
    notesZh: 'VIP 真空絕熱板已完成預冷條件。'
  },
  {
    id: 'HC-03',
    time: '2026/08/02 06:15',
    itemEn: 'Tarmac Thermal Exposure & Transfer Check',
    itemZh: '機坪熱暴露與轉運交接檢查',
    compliance: 'non_compliant',
    checkedByEn: 'Hans Weber (FRA)',
    checkedByZh: 'Hans Weber (法蘭克福)',
    notesEn: '12 min ambient exposure > 25.0°C outside limits. Deviation logged.',
    notesZh: '環境暴露 12 分鐘 (> 25.0°C) 超出規範。已記錄異常。'
  },
  {
    id: 'HC-04',
    time: '2026/08/02 08:30',
    itemEn: 'Biologic Stability Protocol Assessment',
    itemZh: '生物製劑穩定性協定評估',
    compliance: 'pending',
    checkedByEn: 'Dr. E. Vance (QA Director)',
    checkedByZh: 'Dr. E. Vance (品保總監)',
    notesEn: 'Awaiting cumulative Mean Kinetic Temperature (MKT) report.',
    notesZh: '等待累積平均動力學溫度 (MKT) 報告。'
  }
]

export default function App() {
  // Application State
  const [lang, setLang] = useState<Lang>('en')
  const [units, setUnits] = useState<UnitSystem>('metric')
  const [timezone, setTimezone] = useState<Timezone>('local')

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)

  // Filters & Interactivity
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedRecord, setSelectedRecord] = useState<LogRecord | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // Toggle Exception Section view (Realistic vs Empty state)
  const [exceptionViewState, setExceptionDeviationView] = useState<'has_issue' | 'empty'>('has_issue')

  // User Profile
  const user = {
    name: 'John Doe',
    roleEn: 'Operations Manager',
    roleZh: '營運經理',
    initials: 'JD'
  }

  // UI Strings Translation Lookup
  const t = {
    en: {
      appName: 'Cold Chain Monitoring Log',
      shipmentId: 'Shipment ID: #94829381-TX',
      activeItem: 'Monitoring Logs',
      portalTitle: 'BioCold Logistics Operations',
      backTooltip: 'Back to Monitoring Logs',
      backToast: 'Navigating back to Monitoring Logs list...',
      nav: {
        dashboard: 'Dashboard',
        shipments: 'Shipments',
        monitoringLogs: 'Monitoring Logs',
        exceptions: 'Exceptions',
        reports: 'Reports',
        settings: 'Settings'
      },
      header: {
        language: 'Language',
        units: 'Units',
        timezone: 'Time Zone',
        export: 'Export Data',
        moreActions: 'Actions'
      },
      shipmentOverview: {
        title: 'Shipment Overview',
        productName: 'Adalimumab Anti-Inflammatory Biologic Injection (40 mg/0.8 mL)',
        carrier: 'Carrier',
        carrierVal: 'Global BioLogistics (Air Freight)',
        currentLocation: 'Current Location',
        currentLocationVal: 'Frankfurt Cold Storage Warehouse, Zone B',
        nextCheckpoint: 'Next Checkpoint',
        nextCheckpointVal: 'Frankfurt University Hospital',
        route: 'Transport Route',
        routeVal: 'Taipei Logistics Center → Frankfurt Medical Logistics Center',
        progress: 'Progress',
        progressVal: '4 of 6 checkpoints completed',
        progressStreamTitle: 'Checkpoints Progress Stream (4 of 6 Completed):',
        delivery: 'Est. Final Delivery',
        deliveryVal: '2026/08/02 18:30 (GMT+2)',
        status: 'Shipment Status',
        statusVal: 'In Transit',
        statusFullLabel: 'In Transit · 4 of 6 checkpoints completed'
      },
      checkpoints: [
        { label: 'Taipei Logistics Center', type: 'Origin Hub', done: true },
        { label: 'TPE Airport Apron', type: 'Air Cargo Loading', done: true },
        { label: 'CI-061 Aircraft Cargo', type: 'In-Flight Transit', done: true },
        { label: 'Frankfurt Airport Apron', type: 'Tarmac Transfer', done: true },
        { label: 'FRA Cold Storage Zone B', type: 'Current Warehouse', done: true, current: true },
        { label: 'FRA University Hospital', type: 'Final Delivery', done: false }
      ],
      cards: {
        temp: 'Current Temperature',
        tempTarget: 'Target Range: 2.0 – 8.0 °C',
        humidity: 'Current Humidity',
        humidityTarget: 'Target Range: 40 – 60 % RH',
        dimensions: 'Dimensions & Weight',
        distance: 'Total Distance',
        lastCheckin: 'Last Check-in'
      },
      logTable: {
        title: 'Multi-Checkpoint Temperature & Humidity Log',
        subtitle: 'Telemetry recorded at each transportation, transfer, and cold storage facility checkpoint.',
        searchPlaceholder: 'Search location, sensor, or remarks...',
        filterStatus: 'Filter Status',
        allStatuses: 'All Statuses',
        normal: 'Normal',
        warning: 'Warning',
        excursion: 'Temp Excursion',
        offline: 'Sensor Offline',
        colTimestamp: 'Timestamp',
        colLocation: 'Checkpoint Location',
        colTemp: 'Temperature',
        colHumidity: 'Humidity',
        colStatus: 'Status',
        colRecordedBy: 'Recorded By',
        colRemarks: 'Remarks',
        colActions: 'Action',
        viewDetails: 'View Details'
      },
      exceptions: {
        title: 'Exceptions & Deviations',
        toggleReal: 'Show Recorded Deviation',
        toggleEmpty: 'Show Empty State',
        event: 'Deviation Event',
        eventVal: 'Temperature exceeded target upper threshold',
        recordedValue: 'Recorded Temp',
        targetRange: 'Target Range',
        targetVal: '2.0 – 8.0 °C',
        duration: 'Excursion Duration',
        durationVal: '12 minutes',
        location: 'Event Location',
        locationVal: 'Frankfurt Cargo Terminal (Checkpoint 4/6)',
        status: 'Review Status',
        statusVal: 'Under QA Review',
        correctiveAction: 'Corrective Action Requested',
        correctiveVal: 'Immediate inspection requested. Secondary thermal probe data requested.',
        emptyTitle: 'No Temperature Deviations Recorded',
        emptyDesc: 'All readings within allowable thermal thresholds (2.0 – 8.0 °C).'
      },
      handling: {
        title: 'Handling Checks & Compliance Audit',
        colTime: 'Check Time',
        colItem: 'Checklist Item',
        colCompliance: 'Compliance',
        colCheckedBy: 'Checked By',
        colNotes: 'Notes',
        compliant: 'Compliant',
        nonCompliant: 'Non-compliant',
        pending: 'Pending Review'
      },
      approval: {
        title: 'Final Record Approval',
        approvedBy: 'Approved By',
        approvedByVal: 'Dr. Eleanor Vance (Global QA Director)',
        approvalDate: 'Approval Date',
        approvalDateVal: 'Pending Exception Resolution',
        approvalStatus: 'Status',
        approvalStatusVal: 'Pending Final Approval',
        notes: 'QA Reviewer Notes',
        notesVal: 'All unresolved temperature exceptions must be reviewed and signed off before final sign-off.',
        button: 'Approve Record',
        helperText: 'All unresolved exceptions must be reviewed before final approval.'
      },
      tzLabel: {
        local: 'Viewer Local Time',
        shipment: 'Shipment Location Time',
        utc: 'Coordinated Universal Time (UTC)'
      }
    },
    zh: {
      appName: '冷鏈監測日誌',
      shipmentId: '貨運單號：#94829381-TX',
      activeItem: '監測日誌',
      portalTitle: 'BioCold 物流營運管理',
      backTooltip: '返回監測日誌列表',
      backToast: '正在返回監測日誌列表...',
      nav: {
        dashboard: '儀表板',
        shipments: '貨運管理',
        monitoringLogs: '監測日誌',
        exceptions: '異常管理',
        reports: '報表中心',
        settings: '系統設定'
      },
      header: {
        language: '語言選擇',
        units: '計量單位',
        timezone: '時區切換',
        export: '匯出資料',
        moreActions: '更多操作'
      },
      shipmentOverview: {
        title: '貨運概況',
        productName: '抗體標靶藥物－阿達木單抗（40 毫克／0.8 毫升）',
        carrier: '承運物流',
        carrierVal: 'Global BioLogistics (空運貨運)',
        currentLocation: '目前位置',
        currentLocationVal: '法蘭克福冷藏倉庫 B 區',
        nextCheckpoint: '下一站點檢點',
        nextCheckpointVal: '法蘭克福大學醫院',
        route: '運輸路線',
        routeVal: '台北物流中心 → 法蘭克福醫療物流中心',
        progress: '關卡進度',
        progressVal: '4 / 6 關卡已完成',
        progressStreamTitle: '檢查點進度流（已完成 4/6）:',
        delivery: '預計最終送達',
        deliveryVal: '2026/08/02 18:30 (GMT+2)',
        status: '貨運狀態',
        statusVal: '運輸中',
        statusFullLabel: '運輸中 · 4 / 6 關卡已完成'
      },
      checkpoints: [
        { label: '台北物流中心', type: '起運樞紐', done: true },
        { label: '桃園機場裝載區', type: '空運裝載', done: true },
        { label: 'CI-061 航班機艙', type: '空中運輸', done: true },
        { label: '法蘭克福停機坪', type: '機坪轉運', done: true },
        { label: '法蘭克福冷藏倉庫 B 區', type: '目前倉庫', done: true, current: true },
        { label: '法蘭克福大學醫院', type: '最終送達單位', done: false }
      ],
      cards: {
        temp: '目前溫度',
        tempTarget: '目標範圍：2.0 – 8.0 °C',
        humidity: '目前濕度',
        humidityTarget: '目標範圍：40 – 60 % RH',
        dimensions: '材積與重量',
        distance: '運輸總里程',
        lastCheckin: '最後點檢時間'
      },
      logTable: {
        title: '多站點點檢溫濕度監測日誌',
        subtitle: '完整記錄起運、空運、機場機坪、冷藏倉庫至最終醫療院所各關卡之即時數據。',
        searchPlaceholder: '搜尋地點、感測器或備註...',
        filterStatus: '狀態篩選',
        allStatuses: '所有狀態',
        normal: '正常',
        warning: '警告',
        excursion: '溫度異常',
        offline: '感測器離線',
        colTimestamp: '紀錄時間',
        colLocation: '點檢站點位置',
        colTemp: '溫度',
        colHumidity: '濕度',
        colStatus: '狀態',
        colRecordedBy: '紀錄人員/系統',
        colRemarks: '備註事項',
        colActions: '操作',
        viewDetails: '檢視詳情'
      },
      exceptions: {
        title: '異常與偏差記錄',
        toggleReal: '顯示紀錄偏差記錄',
        toggleEmpty: '顯示無異常狀態',
        event: '異常事件',
        eventVal: '溫度超出設定之上限門檻',
        recordedValue: '紀錄數值',
        targetRange: '目標範圍',
        targetVal: '2.0 – 8.0 °C',
        duration: '持續時間',
        durationVal: '12 分鐘',
        location: '事件地點',
        locationVal: '法蘭克福機場貨運航棧 (點檢關卡 4/6)',
        status: '審核狀態',
        statusVal: '品保審核中',
        correctiveAction: '要求矯正措施',
        correctiveVal: '已要求立即進行檢查並提取副熱探針數據。',
        emptyTitle: '目前沒有溫度偏差或異常事件。',
        emptyDesc: '所有測量數值均符合法規容許之溫度範圍 (2.0 – 8.0 °C)。'
      },
      handling: {
        title: '操作檢查與合規稽核',
        colTime: '檢查時間',
        colItem: '檢查項目',
        colCompliance: '合規狀態',
        colCheckedBy: '檢查人員',
        colNotes: '備註',
        compliant: '符合規範',
        nonCompliant: '不符合規範',
        pending: '等待審核'
      },
      approval: {
        title: '最終核准簽核',
        approvedBy: '簽核主管',
        approvedByVal: 'Dr. Eleanor Vance (全球品保總監)',
        approvalDate: '簽核日期',
        approvalDateVal: '待異常處理完成完畢',
        approvalStatus: '簽核狀態',
        approvalStatusVal: '最終核准中',
        notes: '品保審查備註',
        notesVal: '所有未解決之溫度異常必須於最終簽核前完成審查與核可。',
        button: '核准紀錄',
        helperText: '所有未解決的異常必須先經過審查才能進行最終核准。'
      },
      tzLabel: {
        local: 'Viewer Local Time',
        shipment: 'Shipment Location Time',
        utc: 'Coordinated Universal Time (UTC)'
      }
    }
  }[lang]

  // Formatting helpers
  const formatTemp = (c: number | null, f: number | null) => {
    if (c === null || f === null) return '—'
    if (units === 'imperial') {
      return `${f.toFixed(1)} °F`
    }
    return `${c.toFixed(1)} °C`
  }

  const formatHumidity = (h: number | null) => {
    if (h === null) return '—'
    return `${h}% RH`
  }

  const formatDimensions = () => {
    if (units === 'imperial') {
      return { dim: '47.2 × 31.5 × 63.0 in', weight: '771.6 lb' }
    }
    return { dim: '120 × 80 × 160 cm', weight: '350.0 kg' }
  }

  const formatDistance = () => {
    if (units === 'imperial') {
      return '5,778.7 mi'
    }
    return '9,300 km'
  }

  const getTimestamp = (rec: LogRecord) => {
    if (timezone === 'utc') return `${rec.timestampUtc} (UTC)`
    if (timezone === 'shipment') return `${rec.timestampShipment} (GMT+2)`
    return `${rec.timestampLocal} (GMT+8)`
  }

  const getLastCheckinDisplay = () => {
    if (timezone === 'utc') return { date: '2026/08/01 07:30', tz: 'UTC' }
    if (timezone === 'shipment') return { date: '01/08/2026 09:30', tz: 'GMT+2 · Berlin time' }
    return { date: '2026/08/01 15:30', tz: 'GMT+8 · Taipei time' }
  }

  // Filtered log list
  const filteredLogs = LOG_DATA.filter((item) => {
    const matchesSearch =
      item.locationEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.locationZh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.remarksEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.remarksZh.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Status Badge Component
  const renderStatusBadge = (status: LogStatus) => {
    switch (status) {
      case 'normal':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full text-xs font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.logTable.normal}</span>
          </span>
        )
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full text-xs font-medium">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.logTable.warning}</span>
          </span>
        )
      case 'excursion':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-full text-xs font-medium">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
            <span>{t.logTable.excursion}</span>
          </span>
        )
      case 'offline':
        return (
          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-full text-xs font-medium">
            <WifiOff className="w-3.5 h-3.5 text-slate-500" />
            <span>{t.logTable.offline}</span>
          </span>
        )
    }
  }

  const handleExport = () => {
    setToastMessage(lang === 'zh' ? '冷鏈監測日誌已成功匯出 (CSV/PDF)' : 'Cold chain log successfully exported (CSV/PDF)')
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleBackToLogs = () => {
    setToastMessage(t.backToast)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-main)] flex flex-col font-sans antialiased">
      {/* MARKER-MAKE-KIT-INVOKED */}

      {/* Persistent App Shell Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-2.5 flex items-center justify-between z-30 sticky top-0 shadow-2xs">
        
        {/* Left: Brand Identity / App Portal */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[var(--primary-teal)] text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
            <Thermometer className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-900 text-sm md:text-base leading-tight block">BioCold Logistics</span>
            <span className="text-[11px] text-slate-500 hidden sm:block leading-tight">{t.portalTitle}</span>
          </div>
        </div>

        {/* Right: User Controls following exact reference layout */}
        <div className="flex items-center gap-2 md:gap-3">
          
          {/* Notification Bell Icon with Red Unread Dot */}
          <button className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 absolute top-1.5 right-1.5 ring-2 ring-white"></span>
          </button>

          {/* Settings Icon (Visible on Desktop & Tablet, hidden on Mobile) */}
          <button className="hidden sm:flex p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
            <Settings className="w-5 h-5 text-slate-600" />
          </button>

          {/* Vertical Divider */}
          <div className="h-6 w-px bg-slate-200 mx-0.5 sm:mx-1"></div>

          {/* User Account Controls */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-50 transition-colors text-left"
            >
              {/* Circular Avatar with initials JD & pink-purple gradient per reference */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-pink-500 text-white font-medium text-xs flex items-center justify-center flex-shrink-0 shadow-xs">
                {user.initials}
              </div>

              {/* User Name & Role Text Block */}
              <div className="hidden sm:block text-left leading-tight">
                <p className="font-semibold text-slate-900 text-sm leading-snug">{user.name}</p>
                <p className="text-[11px] text-slate-500 hidden md:block">{lang === 'zh' ? user.roleZh : user.roleEn}</p>
              </div>

              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block ml-0.5" />
            </button>

            {/* Account Mobile / Context Dropdown */}
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 text-xs animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="font-bold text-slate-900 text-sm">{user.name}</p>
                  <p className="text-slate-500 text-xs">{lang === 'zh' ? user.roleZh : user.roleEn}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-mono">john.doe@biocold.com</p>
                </div>
                
                <div className="py-1">
                  <button className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>User Profile</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium sm:hidden">
                    <Settings className="w-3.5 h-3.5 text-slate-500" />
                    <span>System Settings</span>
                  </button>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button className="w-full text-left px-4 py-2 hover:bg-rose-50 flex items-center gap-2 text-rose-600 font-medium">
                    <LogOut className="w-3.5 h-3.5 text-rose-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Main App Layout Shell */}
      <div className="flex-1 flex overflow-hidden w-full">

        {/* Left Sidebar Navigation (Collapsible Desktop & Tablet Layout) */}
        <aside
          className={`hidden md:flex bg-white border-r border-slate-200 flex-col flex-shrink-0 transition-all duration-300 ease-in-out relative ${
            sidebarCollapsed ? 'w-16' : 'w-60'
          }`}
        >
          {/* Upper Left Collapse / Expand Toggle Button directly below global header */}
          <div className={`pt-3 pb-2 flex items-center ${sidebarCollapsed ? 'justify-center' : 'px-4 justify-start'}`}>
            <button
              type="button"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className="w-8 h-8 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200 shadow-2xs flex items-center justify-center shrink-0 cursor-pointer"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          <nav className="px-2 py-1 space-y-1.5 flex-1">
            <a
              href="#"
              title={sidebarCollapsed ? t.nav.dashboard : undefined}
              className="flex items-center gap-3 px-2 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors"
            >
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <LayoutDashboard className="w-4 h-4 text-slate-400" />
              </div>
              {!sidebarCollapsed && <span className="whitespace-nowrap">{t.nav.dashboard}</span>}
            </a>

            <a
              href="#"
              title={sidebarCollapsed ? t.nav.shipments : undefined}
              className="flex items-center gap-3 px-2 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors"
            >
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4 text-slate-400" />
              </div>
              {!sidebarCollapsed && <span className="whitespace-nowrap">{t.nav.shipments}</span>}
            </a>

            {/* Active Item highlighted in both states */}
            <a
              href="#"
              title={sidebarCollapsed ? t.nav.monitoringLogs : undefined}
              className="flex items-center gap-3 px-2 py-1.5 rounded-lg bg-[var(--primary-teal-light)] text-[var(--primary-teal-dark)] text-sm font-semibold transition-colors"
            >
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <Activity className="w-4 h-4 text-[var(--primary-teal)]" />
              </div>
              {!sidebarCollapsed && <span className="whitespace-nowrap">{t.nav.monitoringLogs}</span>}
            </a>

            <a
              href="#"
              title={sidebarCollapsed ? t.nav.exceptions : undefined}
              className="flex items-center gap-3 px-2 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors"
            >
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-4 h-4 text-slate-400" />
              </div>
              {!sidebarCollapsed && (
                <>
                  <span className="whitespace-nowrap">{t.nav.exceptions}</span>
                  <span className="ml-auto bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full">1</span>
                </>
              )}
            </a>

            <a
              href="#"
              title={sidebarCollapsed ? t.nav.reports : undefined}
              className="flex items-center gap-3 px-2 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors"
            >
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <FileSpreadsheet className="w-4 h-4 text-slate-400" />
              </div>
              {!sidebarCollapsed && <span className="whitespace-nowrap">{t.nav.reports}</span>}
            </a>

            <a
              href="#"
              title={sidebarCollapsed ? t.nav.settings : undefined}
              className="flex items-center gap-3 px-2 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors"
            >
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <Settings className="w-4 h-4 text-slate-400" />
              </div>
              {!sidebarCollapsed && <span className="whitespace-nowrap">{t.nav.settings}</span>}
            </a>
          </nav>

          <div className="p-2 border-t border-slate-100">
            {!sidebarCollapsed ? (
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-500">
                <p className="font-semibold text-slate-700">Active Sensor Network</p>
                <p className="mt-0.5 text-[11px]">Cellular Telemetry IoT v4</p>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Sensors Connected</span>
                </div>
              </div>
            ) : (
              <div title="Active Sensor Network Connected" className="flex justify-center p-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Area Container */}
        <div className="flex-1 flex flex-col min-w-0 bg-[var(--bg-app)] overflow-y-auto">

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-slate-900 text-slate-100 p-4 space-y-2 border-b border-slate-800 animate-in fade-in slide-in-from-top-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Navigation Menu</div>
              <a href="#" className="flex items-center gap-2 p-2 rounded bg-[var(--primary-teal)] text-white font-medium text-sm">
                <Activity className="w-4 h-4" />
                <span>{t.nav.monitoringLogs}</span>
              </a>
              <a href="#" className="flex items-center gap-2 p-2 rounded text-slate-300 hover:bg-slate-800 text-sm">
                <LayoutDashboard className="w-4 h-4" />
                <span>{t.nav.dashboard}</span>
              </a>
              <a href="#" className="flex items-center gap-2 p-2 rounded text-slate-300 hover:bg-slate-800 text-sm">
                <Truck className="w-4 h-4" />
                <span>{t.nav.shipments}</span>
              </a>
              <a href="#" className="flex items-center gap-2 p-2 rounded text-slate-300 hover:bg-slate-800 text-sm">
                <ShieldAlert className="w-4 h-4" />
                <span>{t.nav.exceptions}</span>
              </a>
            </div>
          )}

          {/* Main Dashboard Content Stream */}
          <main className="p-4 md:p-6 space-y-6">

            {/* 1. Page Header Card with Back Arrow */}
            <section className="bg-white rounded-xl border border-slate-200 p-4 md:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
              
              {/* Title, Back Button & Mobile Drawer Trigger */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-600"
                >
                  <Menu className="w-5 h-5" />
                </button>

                {/* Back Arrow Button: Perfect circular hover target, borderless default state, accessible 40x40 target */}
                <button
                  type="button"
                  onClick={handleBackToLogs}
                  title={t.backTooltip}
                  aria-label={t.backTooltip}
                  className="w-10 h-10 rounded-full bg-transparent border-none text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-teal)] transition-all flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5 shrink-0" />
                </button>

                <div>
                  <h1 className="font-bold text-slate-900 text-lg md:text-xl leading-snug flex items-center gap-2">
                    <span>{t.appName}</span>
                    <Badge label="Active Logging" variant="success" className="text-xs" />
                  </h1>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{t.shipmentId}</p>
                </div>
              </div>

              {/* Interactive Control Selectors */}
              <div className="flex items-center flex-wrap gap-2 text-xs">
                
                {/* Language Selector */}
                <div className="h-8 flex items-center gap-1 bg-slate-100 rounded-lg p-1 border border-slate-200">
                  <Globe className="w-3.5 h-3.5 text-slate-500 ml-1 shrink-0" />
                  <button
                    onClick={() => setLang('en')}
                    className={`h-6 px-2 rounded font-medium transition-all ${
                      lang === 'en' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLang('zh')}
                    className={`h-6 px-2 rounded font-medium transition-all ${
                      lang === 'zh' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    中文（繁體）
                  </button>
                  <div className="h-6 px-2 text-slate-400 cursor-not-allowed flex items-center gap-1">
                    <span>日本語</span>
                    <span className="text-[9px] bg-slate-200 text-slate-600 px-1 rounded font-normal">Coming Soon</span>
                  </div>
                </div>

                {/* Measurement System Selector */}
                <div className="h-8 flex items-center gap-1 bg-slate-100 rounded-lg p-1 border border-slate-200">
                  <Ruler className="w-3.5 h-3.5 text-slate-500 ml-1 shrink-0" />
                  <button
                    onClick={() => setUnits('metric')}
                    className={`h-6 px-2 rounded font-medium transition-all ${
                      units === 'metric' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Metric (°C)
                  </button>
                  <button
                    onClick={() => setUnits('imperial')}
                    className={`h-6 px-2 rounded font-medium transition-all ${
                      units === 'imperial' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Imperial (°F)
                  </button>
                </div>

                {/* Time-zone Selector */}
                <div className="h-8 flex items-center gap-1 bg-slate-100 rounded-lg p-1 border border-slate-200">
                  <Clock className="w-3.5 h-3.5 text-slate-500 ml-1 shrink-0" />
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value as Timezone)}
                    className="bg-transparent text-slate-800 text-xs font-medium focus:outline-none cursor-pointer pr-1 h-6"
                  >
                    <option value="local">{t.tzLabel.local} (GMT+8)</option>
                    <option value="shipment">{t.tzLabel.shipment} (GMT+2)</option>
                    <option value="utc">{t.tzLabel.utc}</option>
                  </select>
                </div>

                {/* Export Data Button */}
                <button
                  type="button"
                  onClick={handleExport}
                  className="h-8 inline-flex flex-row items-center justify-center gap-2 whitespace-nowrap min-w-max px-3.5 rounded-lg bg-[var(--primary-teal)] hover:bg-[var(--primary-teal-dark)] text-white text-xs font-semibold shrink-0 cursor-pointer transition-colors shadow-2xs"
                >
                  <Download className="w-4 h-4 shrink-0 inline-block" />
                  <span className="whitespace-nowrap inline-block">{t.header.export}</span>
                </button>
              </div>
            </section>

            {/* 2. Refined Shipment Information & Checkpoint Overview Card */}
            <section className="bg-white rounded-xl border border-slate-200 p-4 md:p-5 shadow-xs transition-all space-y-4">
              <div className="flex flex-col items-start sm:flex-row sm:flex-wrap justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-[var(--primary-teal-dark)] font-semibold uppercase tracking-wider">
                    <Box className="w-4 h-4 text-[var(--primary-teal)]" />
                    <span>{t.shipmentOverview.title}</span>
                  </div>
                  {/* Clean Product Name without appended flight route */}
                  <h2 className="font-bold text-slate-900 text-base md:text-lg mt-1 leading-snug break-words">
                    {t.shipmentOverview.productName}
                  </h2>
                </div>

                {/* Status Badge & Checkpoint Progress Indicator */}
                <div className="flex flex-col items-end sm:flex-row sm:items-center gap-1 sm:w-full">
                  <div className="flex items-center gap-2">
                    <Badge label={t.shipmentOverview.statusVal} variant="success" className="text-xs font-semibold" />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                    {t.shipmentOverview.statusFullLabel}
                  </span>
                </div>
              </div>

              {/* Multi-Checkpoint Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-sm">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-slate-500 font-medium text-sm">{t.shipmentOverview.carrier}</p>
                  <p className="font-semibold text-slate-800 mt-0.5 text-sm">{t.shipmentOverview.carrierVal}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-slate-500 font-medium text-sm">{t.shipmentOverview.currentLocation}</p>
                  <p className="font-semibold text-[var(--primary-teal-dark)] mt-0.5 flex items-center gap-1 text-sm">
                    <MapPin className="w-3.5 h-3.5 text-[var(--primary-teal)] shrink-0" />
                    <span className="text-sm">{t.shipmentOverview.currentLocationVal}</span>
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-slate-500 font-medium text-sm">{t.shipmentOverview.nextCheckpoint}</p>
                  <p className="font-semibold text-slate-800 mt-0.5 text-sm">{t.shipmentOverview.nextCheckpointVal}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-slate-500 font-medium text-sm">{t.shipmentOverview.route}</p>
                  <p className="font-semibold text-slate-800 mt-0.5 text-sm">{t.shipmentOverview.routeVal}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-slate-500 font-medium text-sm">{t.shipmentOverview.progress}</p>
                  <p className="font-semibold text-slate-800 mt-0.5 text-sm">{t.shipmentOverview.progressVal}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-slate-500 font-medium text-sm">{t.shipmentOverview.delivery}</p>
                  <p className="font-semibold text-slate-800 mt-0.5 text-sm">{t.shipmentOverview.deliveryVal}</p>
                </div>
              </div>

              {/* Visual 6-Checkpoint Logistics Stepper Timeline */}
              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-700 mb-3">{t.shipmentOverview.progressStreamTitle}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {t.checkpoints.map((cp, index) => (
                    <div
                      key={index}
                      className={`p-2.5 rounded-lg border text-xs flex flex-col justify-between transition-all ${
                        cp.current
                          ? 'bg-[var(--primary-teal-light)] border-[var(--primary-teal)] text-[var(--primary-teal-dark)] ring-1 ring-[var(--primary-teal)]'
                          : cp.done
                          ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                          : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-bold text-xs uppercase font-mono">CP 0{index + 1}</span>
                        {cp.done ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-[13px] leading-tight">{cp.label}</p>
                        <p className="text-xs opacity-75 mt-0.5">{cp.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 3. Five Summary Metric Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
              
              {/* Card 1: Temperature */}
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>{t.cards.temp}</span>
                    <Thermometer className="w-4 h-4 text-[var(--primary-teal)]" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mt-2 font-mono tracking-tight">
                    {formatTemp(2.5, 36.5)}
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-normal">{t.cards.tempTarget}</span>
                  <Badge label="Normal" variant="success" className="text-[10px]" />
                </div>
              </div>

              {/* Card 2: Humidity */}
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>{t.cards.humidity}</span>
                    <Droplets className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mt-2 font-mono tracking-tight">
                    {lang === 'zh' ? '45.2 % RH' : '45.2 % RH'}
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-normal">{t.cards.humidityTarget}</span>
                  <Badge label="Normal" variant="success" className="text-[10px]" />
                </div>
              </div>

              {/* Card 3: Dimensions & Weight */}
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>{t.cards.dimensions}</span>
                    <Scale className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-2 font-mono">
                    {formatDimensions().dim}
                  </div>
                  <div className="text-xs text-slate-600 font-mono mt-0.5 font-semibold">
                    {formatDimensions().weight}
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                  Container type: Active Cargo-LD3
                </div>
              </div>

              {/* Card 4: Distance */}
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>{t.cards.distance}</span>
                    <Navigation className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mt-2 font-mono tracking-tight">
                    {formatDistance()}
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                  Air Flight TPE → FRA
                </div>
              </div>

              {/* Card 5: Last Check-in */}
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>{t.cards.lastCheckin}</span>
                    <Clock className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-2 font-mono">
                    {getLastCheckinDisplay().date}
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                  {getLastCheckinDisplay().tz}
                </div>
              </div>
            </section>

            {/* 4. Multi-Checkpoint Temperature Readings Log Table Section */}
            <section className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
                <div>
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[var(--primary-teal)]" />
                    <span>{t.logTable.title}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{t.logTable.subtitle}</p>
                </div>

                {/* Table Filters & Search */}
                <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder={t.logTable.searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[var(--primary-teal)]"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:border-[var(--primary-teal)] cursor-pointer"
                  >
                    <option value="all">{t.logTable.allStatuses}</option>
                    <option value="normal">{t.logTable.normal}</option>
                    <option value="warning">{t.logTable.warning}</option>
                    <option value="excursion">{t.logTable.excursion}</option>
                    <option value="offline">{t.logTable.offline}</option>
                  </select>
                </div>
              </div>

              {/* Desktop & Tablet Table View */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4">{t.logTable.colTimestamp}</th>
                      <th className="py-3 px-4">{t.logTable.colLocation}</th>
                      <th className="py-3 px-4 text-right">{t.logTable.colTemp}</th>
                      <th className="py-3 px-4 text-right">{t.logTable.colHumidity}</th>
                      <th className="py-3 px-4">{t.logTable.colStatus}</th>
                      <th className="py-3 px-4 hidden md:table-cell">{t.logTable.colRecordedBy}</th>
                      <th className="py-3 px-4 hidden lg:table-cell">{t.logTable.colRemarks}</th>
                      <th className="py-3 px-4 text-right">{t.logTable.colActions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-normal">
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 font-mono text-slate-600 whitespace-nowrap">
                          {getTimestamp(log)}
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-900">
                          {lang === 'zh' ? log.locationZh : log.locationEn}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                          {formatTemp(log.tempC, log.tempF)}
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-slate-700 whitespace-nowrap">
                          {formatHumidity(log.humidity)}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          {renderStatusBadge(log.status)}
                        </td>
                        <td className="py-3 px-4 text-slate-600 whitespace-nowrap hidden md:table-cell">
                          {lang === 'zh' ? log.recordedByZh : log.recordedByEn}
                        </td>
                        <td className="py-3 px-4 text-slate-500 max-w-xs truncate hidden lg:table-cell">
                          {lang === 'zh' ? log.remarksZh : log.remarksEn}
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => setSelectedRecord(log)}
                            className="text-[var(--primary-teal)] hover:text-[var(--primary-teal-dark)] font-semibold hover:underline"
                          >
                            {t.logTable.viewDetails}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Stacked Cards View */}
              <div className="sm:hidden p-3 space-y-3 bg-slate-50">
                {filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    className="bg-white rounded-lg border border-slate-200 p-3 shadow-2xs space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="font-mono text-slate-500 font-medium">{getTimestamp(log)}</span>
                      {renderStatusBadge(log.status)}
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900 text-sm">
                        {lang === 'zh' ? log.locationZh : log.locationEn}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2 rounded border border-slate-100 font-mono">
                      <div>
                        <span className="text-slate-400 text-[10px] block font-sans">Temp:</span>
                        <span className="font-bold text-slate-900">{formatTemp(log.tempC, log.tempF)}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block font-sans">Humidity:</span>
                        <span className="font-bold text-slate-900">{formatHumidity(log.humidity)}</span>
                      </div>
                    </div>

                    <div className="pt-1 flex items-center justify-between text-slate-500 text-[11px]">
                      <span>Recorded by: {lang === 'zh' ? log.recordedByZh : log.recordedByEn}</span>
                      <button
                        onClick={() => setSelectedRecord(log)}
                        className="text-[var(--primary-teal-dark)] font-semibold hover:underline flex items-center gap-0.5"
                      >
                        <span>{t.logTable.viewDetails}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Exceptions and Deviations Section */}
            <section className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 md:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-slate-900 text-base">{t.exceptions.title}</h3>
                </div>

                {/* State Switcher for Demo (Has Deviation vs Empty) */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
                  <button
                    onClick={() => setExceptionDeviationView('has_issue')}
                    className={`px-2.5 py-1 rounded font-medium transition-all ${
                      exceptionViewState === 'has_issue' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500'
                    }`}
                  >
                    {t.exceptions.toggleReal}
                  </button>
                  <button
                    onClick={() => setExceptionDeviationView('empty')}
                    className={`px-2.5 py-1 rounded font-medium transition-all ${
                      exceptionViewState === 'empty' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500'
                    }`}
                  >
                    {t.exceptions.toggleEmpty}
                  </button>
                </div>
              </div>

              {exceptionViewState === 'has_issue' ? (
                /* Deviation Recorded Card */
                <div className="bg-rose-50/60 border border-rose-200 rounded-xl p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-100 pb-2">
                    <div className="flex items-center gap-2">
                      <AlertOctagon className="w-4 h-4 text-rose-600" />
                      <span className="font-bold text-rose-900 text-sm">{t.exceptions.eventVal}</span>
                    </div>
                    <Badge label={t.exceptions.statusVal} variant="warning" className="text-xs font-semibold" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 block">{t.exceptions.recordedValue}:</span>
                      <span className="font-bold text-rose-700 text-sm font-mono">
                        {units === 'imperial' ? '48.4 °F' : '9.1 °C'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">{t.exceptions.targetRange}:</span>
                      <span className="font-medium text-slate-800 font-mono">{t.exceptions.targetVal}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">{t.exceptions.duration}:</span>
                      <span className="font-semibold text-slate-900">{t.exceptions.durationVal}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">{t.exceptions.location}:</span>
                      <span className="font-medium text-slate-800">{t.exceptions.locationVal}</span>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-rose-200 text-xs text-slate-700">
                    <span className="font-bold text-slate-900 block mb-0.5">{t.exceptions.correctiveAction}:</span>
                    <p>{t.exceptions.correctiveVal}</p>
                  </div>
                </div>
              ) : (
                /* Empty State Card */
                <div className="py-8 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200 flex flex-col items-center justify-center p-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">{t.exceptions.emptyTitle}</h4>
                  <p className="text-xs text-slate-500 max-w-sm mt-1">{t.exceptions.emptyDesc}</p>
                </div>
              )}
            </section>

            {/* 6. Handling Checks Table */}
            <section className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-4 border-b border-slate-200 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-[var(--primary-teal)]" />
                  <span>{t.handling.title}</span>
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4">{t.handling.colTime}</th>
                      <th className="py-3 px-4">{t.handling.colItem}</th>
                      <th className="py-3 px-4">{t.handling.colCompliance}</th>
                      <th className="py-3 px-4">{t.handling.colCheckedBy}</th>
                      <th className="py-3 px-4">{t.handling.colNotes}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {HANDLING_CHECKS.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 font-mono text-slate-600 whitespace-nowrap">{item.time}</td>
                        <td className="py-3 px-4 font-medium text-slate-900">
                          {lang === 'zh' ? item.itemZh : item.itemEn}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          {item.compliance === 'compliant' && (
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full text-xs font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{t.handling.compliant}</span>
                            </span>
                          )}
                          {item.compliance === 'non_compliant' && (
                            <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-full text-xs font-semibold">
                              <X className="w-3.5 h-3.5 text-rose-600" />
                              <span>{t.handling.nonCompliant}</span>
                            </span>
                          )}
                          {item.compliance === 'pending' && (
                            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full text-xs font-semibold">
                              <Clock className="w-3.5 h-3.5 text-amber-600" />
                              <span>{t.handling.pending}</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                          {lang === 'zh' ? item.checkedByZh : item.checkedByEn}
                        </td>
                        <td className="py-3 px-4 text-slate-500">
                          {lang === 'zh' ? item.notesZh : item.notesEn}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 7. Final Approval Card */}
            <section className="bg-white rounded-xl border border-slate-200 p-4 md:p-5 shadow-xs">
              <div className="border-b border-slate-100 pb-3 mb-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Lock className="w-4 h-4 text-slate-600" />
                  <span>{t.approval.title}</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block">{t.approval.approvedBy}:</span>
                  <span className="font-semibold text-slate-900 mt-0.5 block">{t.approval.approvedByVal}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block">{t.approval.approvalDate}:</span>
                  <span className="font-semibold text-slate-900 mt-0.5 block">{t.approval.approvalDateVal}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block">{t.approval.approvalStatus}:</span>
                  <Badge label={t.approval.approvalStatusVal} variant="warning" className="text-xs mt-1 font-semibold" />
                </div>
              </div>

              <div className="mt-4 bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-700">
                <span className="font-bold text-slate-900 block">{t.approval.notes}:</span>
                <p className="mt-0.5 text-slate-600">{t.approval.notesVal}</p>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <p className="text-xs text-amber-700 font-medium flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>{t.approval.helperText}</span>
                </p>

                <Button
                  disabled
                  variant="neutral"
                  className="opacity-50 cursor-not-allowed bg-slate-200 text-slate-500 text-xs px-4 py-2 font-semibold rounded-lg flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{t.approval.button}</span>
                </Button>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* Record Detail Modal */}
      {selectedRecord && (
        <Modal
          isOpen={!!selectedRecord}
          onClose={() => setSelectedRecord(null)}
          title={`Log Entry Detail - ${selectedRecord.id}`}
        >
          <div className="p-4 space-y-4 text-xs">
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div>
                <span className="text-slate-500 block mb-1">Status:</span>
                <div>{renderStatusBadge(selectedRecord.status)}</div>
              </div>
              <div className="text-right font-mono">
                <span className="text-slate-500 block">Recorded Temperature:</span>
                <span className="text-lg font-bold text-slate-900">
                  {formatTemp(selectedRecord.tempC, selectedRecord.tempF)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <span className="font-semibold text-slate-700 block">Location:</span>
                <span className="text-slate-900 font-medium text-sm">
                  {lang === 'zh' ? selectedRecord.locationZh : selectedRecord.locationEn}
                </span>
              </div>
              <div>
                <span className="font-semibold text-slate-700 block">Timestamp:</span>
                <span className="text-slate-800 font-mono">{getTimestamp(selectedRecord)}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-700 block">Recorded By:</span>
                <span className="text-slate-800">
                  {lang === 'zh' ? selectedRecord.recordedByZh : selectedRecord.recordedByEn}
                </span>
              </div>
              <div>
                <span className="font-semibold text-slate-700 block">Remarks & Operational Notes:</span>
                <p className="bg-slate-50 p-2.5 rounded border border-slate-200 text-slate-700 mt-1">
                  {lang === 'zh' ? selectedRecord.remarksZh : selectedRecord.remarksEn}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <Button
                variant="neutral"
                onClick={() => setSelectedRecord(null)}
                className="text-xs px-4 py-1.5"
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Export Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-3">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  )
}
