import React, { useState } from 'react';
import { AREAS, EQUIPMENT_LIST } from '../data/equipmentData';
import { AreaId, Equipment } from '../types/maintenance';
import { ArrowRight, Compass, MapPin, Navigation, Search } from 'lucide-react';

interface PlantFloorMapProps {
  focusedEquipmentId?: string | null;
  initialAreaFilter?: AreaId | 'all';
  onSelectEquipment: (equipment: Equipment) => void;
  compact?: boolean;
}

export const PlantFloorMap: React.FC<PlantFloorMapProps> = ({
  focusedEquipmentId = null,
  initialAreaFilter = 'all',
  onSelectEquipment,
  compact = false,
}) => {
  const [areaFilter, setAreaFilter] = useState<AreaId | 'all'>(initialAreaFilter);
  const [selectedPinId, setSelectedPinId] = useState<string>(
    focusedEquipmentId || EQUIPMENT_LIST[0].id
  );
  const [mapQuery, setMapQuery] = useState('');

  const visibleEquipment = EQUIPMENT_LIST.filter((eq) => {
    const matchesArea = areaFilter === 'all' || eq.areaId === areaFilter;
    const q = mapQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      eq.tag.toLowerCase().includes(q) ||
      eq.name.toLowerCase().includes(q) ||
      eq.location.bayAxis.toLowerCase().includes(q);
    return matchesArea && matchesQuery;
  });

  const activeEquipment =
    EQUIPMENT_LIST.find((e) => e.id === (focusedEquipmentId || selectedPinId)) ||
    visibleEquipment[0] ||
    EQUIPMENT_LIST[0];

  const activeArea = AREAS.find((a) => a.id === activeEquipment.areaId)!;

  return (
    <div className="space-y-5">
      {!compact && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4">
          {/* Interactive Area Filter Segmented Controls */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setAreaFilter('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                areaFilter === 'all'
                  ? 'bg-zinc-900 text-white'
                  : 'bg-white text-zinc-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Toda la Planta ({EQUIPMENT_LIST.length})
            </button>
            {AREAS.map((area) => {
              const count = EQUIPMENT_LIST.filter((e) => e.areaId === area.id).length;
              const isActive = areaFilter === area.id;
              return (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => setAreaFilter(area.id)}
                  style={
                    isActive
                      ? { backgroundColor: area.accentHex, color: '#FFFFFF' }
                      : undefined
                  }
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? ''
                      : 'bg-white text-zinc-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {area.title} ({count})
                </button>
              );
            })}
          </div>

          {/* Search on map */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={mapQuery}
              onChange={(e) => setMapQuery(e.target.value)}
              placeholder="Ubicar por tag, equipo o eje..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Interactive Plant Map Canvas */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-zinc-700" />
              <span className="text-sm font-semibold text-zinc-900">
                Plano Maestro de Ubicación en Planta
              </span>
            </div>
            <span className="text-xs font-mono text-zinc-500">
              Norte ↑ · Ejes Estructurales A–P / 1–6
            </span>
          </div>

          <div className="relative w-full aspect-[16/10] bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
            <svg viewBox="0 0 1000 625" className="w-full h-full select-none">
              {/* Architectural Grid */}
              <defs>
                <pattern id="plant-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#E2E8F0" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="1000" height="625" fill="url(#plant-grid)" />

              {/* Central Horizontal Main Access Avenue */}
              <rect x="20" y="295" width="960" height="36" fill="#E2E8F0" />
              <line x1="20" y1="313" x2="980" y2="313" stroke="#94A3B8" strokeWidth="2" strokeDasharray="10 8" />
              <text x="500" y="317" textAnchor="middle" fontSize="11" fontWeight="700" fill="#475569" letterSpacing="2">
                VÍA PRINCIPAL DE PLANTA · ACCESO GRÚAS Y MONTACARGAS
              </text>

              {/* Central Vertical Service Corridor */}
              <rect x="478" y="30" width="44" height="565" fill="#E2E8F0" />
              <line x1="500" y1="30" x2="500" y2="595" stroke="#94A3B8" strokeWidth="2" strokeDasharray="10 8" />

              {/* 4 Plant Areas */}
              {AREAS.map((area) => {
                const { x, y, width, height } = area.mapRegion;
                const svgX = x * 10;
                const svgY = y * 6.25;
                const svgW = width * 10;
                const svgH = height * 6.25;
                const isDimmed = areaFilter !== 'all' && areaFilter !== area.id;

                return (
                  <g key={area.id} opacity={isDimmed ? 0.35 : 1}>
                    <rect
                      x={svgX}
                      y={svgY}
                      width={svgW}
                      height={svgH}
                      rx="14"
                      fill={area.cardBgHex}
                      stroke={area.accentHex}
                      strokeWidth="2.5"
                      strokeOpacity="0.45"
                    />
                    {/* Area structural label */}
                    <text
                      x={svgX + 18}
                      y={svgY + 30}
                      fontSize="20"
                      fontWeight="800"
                      fill="#18181B"
                      fontFamily="Barlow Condensed, sans-serif"
                    >
                      {area.title}
                    </text>
                    <text
                      x={svgX + svgW - 18}
                      y={svgY + 26}
                      textAnchor="end"
                      fontSize="11"
                      fontWeight="600"
                      fill={area.badgeTextHex}
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {area.plantZoneCode}
                    </text>

                    {/* Internal aisle guide */}
                    <line
                      x1={svgX + 24}
                      y1={svgY + svgH / 2 + 6}
                      x2={svgX + svgW - 24}
                      y2={svgY + svgH / 2 + 6}
                      stroke={area.accentHex}
                      strokeOpacity="0.25"
                      strokeWidth="1.5"
                      strokeDasharray="6 6"
                    />
                  </g>
                );
              })}

              {/* Structural Axis Labels */}
              {['B', 'D', 'F', 'H', 'K', 'M', 'P'].map((axis, idx) => (
                <text
                  key={axis}
                  x={110 + idx * 130}
                  y="22"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="#64748B"
                  fontFamily="JetBrains Mono, monospace"
                >
                  EJE {axis}
                </text>
              ))}
              {['1', '2', '3', '4', '5'].map((num, idx) => (
                <text
                  key={num}
                  x="16"
                  y={90 + idx * 115}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="#64748B"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {num}
                </text>
              ))}

              {/* Warehouse & Substation Landmark */}
              <rect x="466" y="286" width="68" height="54" rx="6" fill="#18181B" />
              <text x="500" y="310" textAnchor="middle" fontSize="10" fontWeight="700" fill="#FACC15">
                ALMACÉN
              </text>
              <text x="500" y="324" textAnchor="middle" fontSize="9" fill="#E4E4E7">
                CENTRAL
              </text>
            </svg>

            {/* Interactive Equipment Pins Overlaid on SVG */}
            {visibleEquipment.map((eq) => {
              const area = AREAS.find((a) => a.id === eq.areaId)!;
              const isSelected = activeEquipment.id === eq.id;
              return (
                <button
                  key={eq.id}
                  type="button"
                  onClick={() => setSelectedPinId(eq.id)}
                  style={{
                    left: `${eq.location.mapCoords.x}%`,
                    top: `${eq.location.mapCoords.y}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus-visible:outline-2 focus-visible:outline-zinc-900 transition-transform ${
                    isSelected ? 'z-20 scale-110' : 'z-10 hover:scale-105'
                  }`}
                  aria-label={`Seleccionar ubicación de ${eq.tag} ${eq.name}`}
                >
                  {isSelected && (
                    <span
                      className="absolute inset-0 -m-2 rounded-full border-2 opacity-60 pointer-events-none"
                      style={{ borderColor: area.accentHex }}
                    />
                  )}
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border shadow-sm transition-colors ${
                      isSelected
                        ? 'bg-zinc-900 text-white border-zinc-900'
                        : 'bg-white text-zinc-900 border-zinc-300 hover:border-zinc-900'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: area.accentHex }}
                    />
                    <span className="font-mono text-[11px] font-semibold whitespace-nowrap">
                      {eq.tag}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
            <span>Haz clic en cualquier etiqueta del plano para ver su ruta de acceso y referencias.</span>
            <span className="font-mono tabular-nums">
              Equipos visibles: {visibleEquipment.length} / {EQUIPMENT_LIST.length}
            </span>
          </div>
        </div>

        {/* Selected Equipment Location Details Card */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <span className="font-mono text-xs font-semibold text-zinc-900">
                {activeEquipment.tag}
              </span>
              <span className="text-xs font-medium text-zinc-600">
                {activeArea.title} · {activeEquipment.status}
              </span>
            </div>

            <h3 className="text-lg font-bold text-zinc-900 mt-3 leading-snug">
              {activeEquipment.name}
            </h3>
            <p className="text-xs text-zinc-500 mt-1">{activeEquipment.keyMetric}</p>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-zinc-700 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-zinc-800">Nave y Sector</p>
                  <p className="text-sm text-zinc-600">{activeEquipment.location.building}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-[11px] font-medium text-zinc-500">Eje Estructural</p>
                  <p className="text-xs font-semibold text-zinc-900 mt-0.5">
                    {activeEquipment.location.bayAxis}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-[11px] font-medium text-zinc-500">Nivel / Elevación</p>
                  <p className="text-xs font-semibold text-zinc-900 mt-0.5">
                    {activeEquipment.location.level}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <Navigation className="w-4 h-4 text-zinc-700 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-zinc-800">Ruta de Acceso</p>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {activeEquipment.location.accessRoute}
                  </p>
                </div>
              </div>

              <div className="bg-amber-50/70 border border-amber-200/70 rounded-xl p-3">
                <p className="text-xs font-semibold text-amber-900">Punto de Referencia</p>
                <p className="text-xs text-amber-900/85 mt-1 leading-relaxed">
                  {activeEquipment.location.nearbyLandmark}
                </p>
              </div>
            </div>
          </div>

          {!compact && (
            <button
              type="button"
              onClick={() => onSelectEquipment(activeEquipment)}
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-zinc-900 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <span>Abrir Ficha Técnica Completa</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
