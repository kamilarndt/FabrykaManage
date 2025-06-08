import React, { useState } from "react";

const STATUS_MAP = {
  "Do konsultacji": { color: "#EF4444", icon: "🔴" },
  "W kolejce": { color: "#F59E0B", icon: "🟠" },
  "Projektowanie": { color: "#3B82F6", icon: "🔵" },
  "CNC Queue": { color: "#8B5CF6", icon: "🟣" },
  "Wycinanie": { color: "#EAB308", icon: "🟡" },
  "Gotowe": { color: "#10B981", icon: "🟢" },
  "Produkcja": { color: "#F3F4F6", icon: "⚪" },
};

type StatusType = keyof typeof STATUS_MAP;

interface ElementTileProps {
  title: string;
  projectId: string;
  status: StatusType;
  progress: number;
  files: number;
  comments: number;
  alerts: number;
  onClick?: () => void;
}

const ElementTile: React.FC<ElementTileProps> = ({
  title,
  projectId,
  status,
  progress,
  files,
  comments,
  alerts,
  onClick,
}) => {
  const statusData = STATUS_MAP[status];
  return (
    <div
      className="w-[280px] h-[320px] bg-white rounded-[8px] shadow-md flex flex-col overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
      onClick={onClick}
      tabIndex={0}
      role="button"
      style={{ outline: "none" }}
    >
      {/* 3D Preview */}
      <div className="w-full h-[140px] bg-gray-100 flex items-center justify-center text-gray-400 text-lg font-semibold border-b border-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-100"></div>
        <span className="relative z-10">3D Preview</span>
      </div>
      {/* Title */}
      <div className="px-4 pt-3 pb-1">
        <div className="font-bold text-[16px] text-gray-900 truncate" title={title}>{title}</div>
        <div className="text-[12px] text-gray-400 truncate">{projectId}</div>
      </div>
      {/* Status bar */}
      <div
        className="w-full h-[25px] flex items-center px-4 text-white text-[14px] font-medium"
        style={{ background: statusData.color }}
      >
        <span className="mr-2">{statusData.icon}</span> {status.toUpperCase()}
      </div>
      {/* Progress bar */}
      <div className="w-full h-[15px] bg-gray-200">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, background: statusData.color }}
        />
      </div>
      {/* Quick icons row */}
      <div className="flex items-center justify-between px-4 py-2 text-[16px] text-gray-700">
        <span title="Pliki" className="hover:text-blue-500 transition-colors">📎 {files}</span>
        <span title="Komentarze" className="hover:text-green-500 transition-colors">💬 {comments}</span>
        <span title="Alerty" className="hover:text-red-500 transition-colors">⚠️ {alerts}</span>
      </div>
    </div>
  );
};

type MaterialAssignment = {
  id: string;
  nazwa: string;
  ilosc: number;
  jednostka: string;
  cena_jednostkowa: number;
  dostepnosc: string;
  oznaczenie_3d: {
    powierzchnia: string;
    kolor_podswietlenia: string;
  };
};

const sampleMaterials: MaterialAssignment[] = [
  {
    id: "MAT-001",
    nazwa: "Płyta OSB 18mm",
    ilosc: 2.5,
    jednostka: "m²",
    cena_jednostkowa: 45.0,
    dostepnosc: "W magazynie: 15m²",
    oznaczenie_3d: { powierzchnia: "front_panel", kolor_podswietlenia: "#00d4aa" },
  },
  {
    id: "MAT-002",
    nazwa: "Sklejka 15mm",
    ilosc: 1.2,
    jednostka: "m²",
    cena_jednostkowa: 52.0,
    dostepnosc: "W magazynie: 8m²",
    oznaczenie_3d: { powierzchnia: "side_panel", kolor_podswietlenia: "#ffb300" },
  },
];

const MaterialAssignmentTab: React.FC = () => {
  const [materials, setMaterials] = useState<MaterialAssignment[]>(sampleMaterials);
  const [showLibrary, setShowLibrary] = useState(false);

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Przypisane materiały</h3>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
          onClick={() => setShowLibrary(true)}
        >
          Dodaj materiał
        </button>
      </div>
      <div className="space-y-2">
        {materials.map((mat) => (
          <div key={mat.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 transition-colors">
            <div className="w-4 h-4 rounded-full" style={{ background: mat.oznaczenie_3d.kolor_podswietlenia }} title={mat.oznaczenie_3d.powierzchnia} />
            <div className="flex-1">
              <div className="font-medium">{mat.nazwa}</div>
              <div className="text-xs text-gray-500">{mat.ilosc} {mat.jednostka} × {mat.cena_jednostkowa} zł ({mat.dostepnosc})</div>
              <div className="text-xs text-gray-400">Powierzchnia: {mat.oznaczenie_3d.powierzchnia}</div>
            </div>
            <button className="text-red-500 hover:underline text-xs hover:text-red-700 transition-colors">Usuń</button>
          </div>
        ))}
      </div>
      <div className="mt-2">
        <span className="font-semibold">Podgląd kosztów:</span> {materials.reduce((sum, m) => sum + m.ilosc * m.cena_jednostkowa, 0).toFixed(2)} zł
      </div>
      <div className="mt-4">
        <h4 className="font-semibold mb-2">Sugestie materiałów (AI)</h4>
        <div className="flex gap-2 flex-wrap">
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs hover:bg-green-200 cursor-pointer transition-colors">Płyta OSB 18mm</span>
          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs hover:bg-yellow-200 cursor-pointer transition-colors">Sklejka 15mm</span>
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs hover:bg-gray-200 cursor-pointer transition-colors">MDF 19mm</span>
        </div>
      </div>
      <div className="mt-6">
        <h4 className="font-semibold mb-2">Drag & Drop (wizualizacja)</h4>
        <div className="flex items-center gap-4">
          <div className="w-40 h-32 bg-gray-200 rounded flex items-center justify-center text-gray-400 border-2 border-dashed border-blue-400 hover:border-blue-500 hover:bg-gray-100 transition-all">
            Model 3D (placeholder)
          </div>
          <div className="flex-1 text-xs text-gray-500">
            Przeciągnij materiał z biblioteki na wybraną powierzchnię modelu.<br />
            <span className="inline-block mt-2 w-4 h-4 rounded-full align-middle" style={{ background: '#00d4aa' }} /> front_panel &nbsp;
            <span className="inline-block w-4 h-4 rounded-full align-middle" style={{ background: '#ffb300' }} /> side_panel
          </div>
        </div>
      </div>
      {/* Modal biblioteki materiałów */}
      {showLibrary && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl p-8 w-[400px] transform scale-100 transition-all">
            <h4 className="font-bold mb-4">Biblioteka materiałów</h4>
            <div className="space-y-2 mb-4">
              <button className="block w-full text-left px-3 py-2 hover:bg-blue-50 rounded transition-colors">Płyta OSB 18mm</button>
              <button className="block w-full text-left px-3 py-2 hover:bg-blue-50 rounded transition-colors">Sklejka 15mm</button>
              <button className="block w-full text-left px-3 py-2 hover:bg-blue-50 rounded transition-colors">MDF 19mm</button>
            </div>
            <button className="mt-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors" onClick={() => setShowLibrary(false)}>Zamknij</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Timeline Projektanta
const DesignerTimeline: React.FC = () => {
  const timeSlots = Array.from({length: 10}, (_, i) => 8 + i); // 8:00 - 17:00
  
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-green-600">PROJEKTANT: Jan Kowalski</h3>
        <div className="text-sm text-gray-500">14:30</div>
      </div>
      
      <div className="flex gap-4 mb-4 text-sm">
        <div className="bg-green-100 px-3 py-1 rounded">Wykorzystanie: 85%</div>
        <div className="bg-yellow-100 px-3 py-1 rounded">Dokładność: 72%</div>
        <div className="bg-red-100 px-3 py-1 rounded">Deadline Alert: 2</div>
      </div>

      <div className="flex-1 bg-white rounded border p-4">
        <div className="flex justify-between mb-2 text-xs text-gray-400">
          {timeSlots.map(hour => (
            <span key={hour} className="w-20 text-center">{hour}:00</span>
          ))}
        </div>
        
        <div className="relative h-20 bg-gray-50 rounded">
          {/* Taskbary na timeline */}
          <div className="absolute top-2 left-4 w-32 h-6 bg-green-500 rounded flex items-center px-2 text-white text-xs shadow">
            EL001 ✅90%
          </div>
          <div className="absolute top-10 left-36 w-40 h-6 bg-blue-500 rounded flex items-center px-2 text-white text-xs shadow">
            EL002 ⚡60%
          </div>
          <div className="absolute top-18 right-20 w-24 h-6 bg-red-500 rounded flex items-center px-2 text-white text-xs shadow">
            EL003 ⚠️30%
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Wydajności
const PerformanceDashboard: React.FC = () => {
  const teamData = [
    { name: "A.Nowak", accuracy: 92, inProgress: 3, delayed: 0, level: "⚡⚡⚡" },
    { name: "J.Kowalski", accuracy: 72, inProgress: 5, delayed: 2, level: "⚡⚡" },
    { name: "M.Wiśniewski", accuracy: 45, inProgress: 7, delayed: 4, level: "⚡" },
  ];

  const getAccuracyColor = (acc: number) => {
    if (acc >= 90) return "bg-green-500 text-white";
    if (acc >= 70) return "bg-orange-400 text-white";
    return "bg-red-500 text-white";
  };

  return (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-lg font-bold text-orange-500 mb-4">WYDAJNOŚĆ DZIAŁU PROJEKTOWEGO</h3>
      
      <div className="bg-white rounded border shadow-sm overflow-hidden flex-1">
        <div className="grid grid-cols-5 gap-4 p-3 bg-gray-50 font-semibold text-sm border-b">
          <span>Projektant</span>
          <span>Dokładność(%)</span>
          <span>W trakcie</span>
          <span>Opóźnione</span>
          <span>Status</span>
        </div>
        
        {teamData.map((member, i) => (
          <div key={i} className="grid grid-cols-5 gap-4 p-3 border-b hover:bg-gray-50 transition-colors">
            <span className="font-medium">{member.name}</span>
            <span className={`px-2 py-1 rounded text-center text-sm ${getAccuracyColor(member.accuracy)}`}>
              {member.accuracy}%
            </span>
            <span className="text-center">{member.inProgress}</span>
            <span className="text-center">{member.delayed}</span>
            <span className="text-center">{member.level}</span>
          </div>
        ))}
        
        <div className="p-3 bg-blue-50 text-sm font-medium">
          Średni czas realizacji: 3.2h | Cel: 2.5h
        </div>
      </div>
    </div>
  );
};

// System Alertów
const AlertSystem: React.FC = () => {
  const alerts = [
    { time: "-2h", message: "Soft reminder", type: "gray", icon: "💬" },
    { time: "-1h", message: "Przypomnienie", type: "orange", icon: "⚠️" },
    { time: "0h", message: "DEADLINE", type: "blue", icon: "⏰" },
    { time: "+1h", message: "Alert projektanta", type: "yellow", icon: "🟡" },
    { time: "+2h", message: "Manager powiadomiony", type: "orange", icon: "🟠" },
    { time: "+4h", message: "Eskalacja prezes", type: "red", icon: "🔴" },
  ];

  const getAlertColor = (type: string) => {
    const colors = {
      gray: "bg-gray-100 text-gray-700",
      orange: "bg-orange-100 text-orange-700",
      blue: "bg-blue-100 text-blue-700",
      yellow: "bg-yellow-100 text-yellow-700",
      red: "bg-red-100 text-red-700",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100";
  };

  return (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-lg font-bold text-purple-600 mb-4">SYSTEM ALERTÓW TIMELINE</h3>
      
      <div className="flex-1 bg-white rounded border p-4">
        <div className="relative">
          <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 rounded"></div>
          <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full"></div>
          
          <div className="grid grid-cols-6 gap-2">
            {alerts.map((alert, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl mb-2">{alert.icon}</div>
                <div className="text-xs font-medium mb-1">{alert.time}</div>
                <div className={`px-2 py-1 rounded text-xs ${getAlertColor(alert.type)}`}>
                  {alert.message}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 space-y-2">
          <div className="text-sm font-semibold">Aktywne alerty:</div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2 p-2 bg-red-50 rounded">
              <span className="text-red-500">🔴</span>
              <span>EL003 - opóźnienie 4h (eskalacja do prezesa)</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
              <span className="text-yellow-500">🟡</span>
              <span>EL002 - przekroczony termin 1h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const sampleTiles = [
  {
    title: "Ściana Lewa A1",
    projectId: "ST-2024-045",
    status: "Projektowanie" as StatusType,
    progress: 75,
    files: 3,
    comments: 2,
    alerts: 1,
  },
  {
    title: "Front Prawy B2",
    projectId: "ST-2024-046",
    status: "Do konsultacji" as StatusType,
    progress: 10,
    files: 1,
    comments: 0,
    alerts: 2,
  },
  {
    title: "Panel CNC X3",
    projectId: "ST-2024-047",
    status: "CNC Queue" as StatusType,
    progress: 40,
    files: 2,
    comments: 1,
    alerts: 0,
  },
  {
    title: "Blat Wyspa K1",
    projectId: "ST-2024-048",
    status: "Wycinanie" as StatusType,
    progress: 55,
    files: 4,
    comments: 3,
    alerts: 1,
  },
  {
    title: "Półka Górna Z5",
    projectId: "ST-2024-049",
    status: "Gotowe" as StatusType,
    progress: 100,
    files: 2,
    comments: 0,
    alerts: 0,
  },
  {
    title: "Korpus Dół L7",
    projectId: "ST-2024-050",
    status: "Produkcja" as StatusType,
    progress: 20,
    files: 1,
    comments: 1,
    alerts: 0,
  },
  {
    title: "Panel Tylny Q9",
    projectId: "ST-2024-051",
    status: "W kolejce" as StatusType,
    progress: 5,
    files: 0,
    comments: 0,
    alerts: 1,
  },
  {
    title: "Ściana Prawa C4",
    projectId: "ST-2024-052",
    status: "Projektowanie" as StatusType,
    progress: 65,
    files: 2,
    comments: 1,
    alerts: 0,
  },
];

const sectionStyle = (borderColor: string) => `bg-white rounded-lg shadow-sm p-6 border-4 ${borderColor} flex flex-col hover:shadow-md transition-shadow duration-300`;

const DesignersBoard = () => {
  const [showMaterials, setShowMaterials] = useState(false);
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="grid grid-cols-2 grid-rows-2 gap-8 max-w-[2400px] w-full" style={{ height: 'min(1600px, 90vh)' }}>
        {/* Kafelki Elementów */}
        <section className={sectionStyle("border-blue-500")}>
          <h2 className="text-2xl font-bold mb-6 text-blue-500 flex items-center gap-2">
            <span>📋</span> Kafelki Elementów
          </h2>
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              {sampleTiles.map((tile, i) => (
                <div key={i}>
                  <ElementTile {...tile} onClick={() => setShowMaterials(true)} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Modal zakładki Materiały */}
          {showMaterials && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
              <div className="bg-white rounded-lg shadow-2xl p-8 w-[600px] max-h-[90vh] overflow-y-auto transform scale-100 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Materiały elementu</h3>
                  <button 
                    className="text-gray-400 hover:text-gray-700 text-2xl transition-colors" 
                    onClick={() => setShowMaterials(false)}
                  >
                    &times;
                  </button>
                </div>
                <MaterialAssignmentTab />
              </div>
            </div>
          )}
        </section>
        
        {/* Osie Czasu Projektantów */}
        <section className={sectionStyle("border-green-500")}>
          <h2 className="text-2xl font-bold mb-6 text-green-500 flex items-center gap-2">
            <span>⏰</span> Osie Czasu Projektantów
          </h2>
          <DesignerTimeline />
        </section>
        
        {/* Dashboard Wydajności */}
        <section className={sectionStyle("border-orange-400")}>
          <h2 className="text-2xl font-bold mb-6 text-orange-400 flex items-center gap-2">
            <span>📊</span> Dashboard Wydajności
          </h2>
          <PerformanceDashboard />
        </section>
        
        {/* System Alertów */}
        <section className={sectionStyle("border-purple-500")}>
          <h2 className="text-2xl font-bold mb-6 text-purple-500 flex items-center gap-2">
            <span>🚨</span> System Alertów
          </h2>
          <AlertSystem />
        </section>
      </div>
    </div>
  );
};

export default DesignersBoard; 