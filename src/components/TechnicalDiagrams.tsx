import React, { useState } from 'react';
import { BlueprintHotspot, EquipmentCategory } from '../types/maintenance';
import { Info, Package } from 'lucide-react';

interface TechnicalDiagramsProps {
  category: EquipmentCategory;
  tag: string;
  hotspots: BlueprintHotspot[];
  accentHex: string;
  onJumpToPart?: (partCode: string) => void;
}

export const TechnicalDiagrams: React.FC<TechnicalDiagramsProps> = ({
  category,
  tag,
  hotspots,
  accentHex,
  onJumpToPart,
}) => {
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>(hotspots[0]?.id ?? '');
  const activeHotspot = hotspots.find((h) => h.id === selectedHotspotId) ?? hotspots[0];

  const renderSchematic = () => {
    switch (category) {
      case 'compresor':
        return (
          <g stroke="#1E293B" strokeWidth="2" fill="none">
            {/* Base skid */}
            <rect x="55" y="210" width="390" height="22" rx="3" fill="#CBD5E1" />
            {/* Motor block */}
            <rect x="85" y="120" width="110" height="90" rx="6" fill="#E2E8F0" />
            <line x1="100" y1="132" x2="100" y2="198" stroke="#64748B" />
            <line x1="115" y1="132" x2="115" y2="198" stroke="#64748B" />
            <line x1="130" y1="132" x2="130" y2="198" stroke="#64748B" />
            <rect x="120" y="95" width="40" height="25" fill="#94A3B8" />
            {/* Compression element */}
            <rect x="215" y="135" width="85" height="65" rx="6" fill="#F8FAFC" />
            <circle cx="257" cy="167" r="18" fill="#E2E8F0" />
            <path d="M195 167H215" strokeWidth="5" />
            {/* Separator tank */}
            <rect x="330" y="105" width="80" height="105" rx="28" fill="#F1F5F9" />
            <path d="M300 155H330" strokeWidth="3" />
            <path d="M370 105V80H415" strokeWidth="3" />
            {/* Pressure gauge */}
            <circle cx="370" cy="80" r="10" fill="#FFFFFF" />
            <line x1="370" y1="80" x2="375" y2="75" stroke="#EF4444" strokeWidth="2" />
          </g>
        );
      case 'bomba':
        return (
          <g stroke="#1E293B" strokeWidth="2" fill="none">
            {/* Skid baseplate */}
            <rect x="55" y="212" width="390" height="20" rx="3" fill="#CBD5E1" />
            {/* Electric motor */}
            <rect x="80" y="125" width="120" height="87" rx="6" fill="#E2E8F0" />
            <line x1="95" y1="138" x2="95" y2="200" stroke="#64748B" />
            <line x1="110" y1="138" x2="110" y2="200" stroke="#64748B" />
            <line x1="125" y1="138" x2="125" y2="200" stroke="#64748B" />
            {/* Coupling & guard */}
            <rect x="200" y="150" width="60" height="38" rx="4" fill="#FDE047" />
            {/* Bearing housing */}
            <rect x="260" y="148" width="55" height="64" rx="4" fill="#F1F5F9" />
            {/* Volute casing */}
            <circle cx="355" cy="166" r="46" fill="#E2E8F0" />
            <circle cx="355" cy="166" r="22" fill="#FFFFFF" />
            {/* Discharge & Suction */}
            <rect x="342" y="88" width="26" height="34" fill="#CBD5E1" />
            <rect x="335" y="82" width="40" height="8" fill="#94A3B8" />
            <rect x="400" y="152" width="35" height="28" fill="#CBD5E1" />
          </g>
        );
      case 'grua':
        return (
          <g stroke="#1E293B" strokeWidth="2" fill="none">
            {/* Bridge girders */}
            <rect x="45" y="75" width="410" height="28" rx="2" fill="#FACC15" />
            {/* End trucks */}
            <rect x="45" y="65" width="45" height="52" rx="4" fill="#475569" />
            <rect x="410" y="65" width="45" height="52" rx="4" fill="#475569" />
            <circle cx="67" cy="112" r="9" fill="#CBD5E1" />
            <circle cx="432" cy="112" r="9" fill="#CBD5E1" />
            {/* Hoist trolley */}
            <rect x="205" y="52" width="90" height="44" rx="5" fill="#E2E8F0" />
            {/* Wire ropes */}
            <line x1="230" y1="96" x2="230" y2="195" stroke="#475569" strokeWidth="2.5" />
            <line x1="270" y1="96" x2="270" y2="195" stroke="#475569" strokeWidth="2.5" />
            {/* Hook block */}
            <rect x="220" y="192" width="60" height="26" rx="4" fill="#FACC15" />
            <path d="M250 218V230C250 238 238 242 234 234" strokeWidth="4" strokeLinecap="round" />
          </g>
        );
      case 'bag-house':
        return (
          <g stroke="#1E293B" strokeWidth="2" fill="none">
            {/* Support legs */}
            <line x1="125" y1="205" x2="125" y2="255" strokeWidth="5" />
            <line x1="375" y1="205" x2="375" y2="255" strokeWidth="5" />
            {/* Plenum top */}
            <rect x="110" y="45" width="280" height="38" rx="4" fill="#E2E8F0" />
            {/* Filter housing */}
            <rect x="110" y="83" width="280" height="110" fill="#F8FAFC" />
            {/* Filter bags inside cutaway */}
            {[140, 175, 210, 245, 280, 315, 350].map((x) => (
              <rect key={x} x={x} y="92" width="14" height="90" rx="5" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5" />
            ))}
            {/* Hoppers */}
            <polygon points="110,193 250,193 210,248 150,248" fill="#E2E8F0" />
            <polygon points="250,193 390,193 350,248 290,248" fill="#E2E8F0" />
            {/* Inlet duct */}
            <rect x="45" y="130" width="65" height="32" fill="#CBD5E1" />
          </g>
        );
      case 'horno-rotatorio':
        return (
          <g stroke="#1E293B" strokeWidth="2" fill="none">
            {/* Concrete piers & trunnions */}
            <rect x="140" y="205" width="55" height="40" fill="#CBD5E1" />
            <rect x="310" y="205" width="55" height="40" fill="#CBD5E1" />
            <circle cx="167" cy="195" r="14" fill="#64748B" />
            <circle cx="337" cy="195" r="14" fill="#64748B" />
            {/* Rotary Drum */}
            <rect x="130" y="92" width="245" height="96" rx="8" fill="#FEF9C3" />
            {/* Riding rings & girth gear */}
            <rect x="155" y="88" width="22" height="104" fill="#94A3B8" />
            <rect x="242" y="84" width="26" height="112" fill="#FACC15" />
            <rect x="325" y="88" width="22" height="104" fill="#94A3B8" />
            {/* Burner lance left */}
            <rect x="50" y="128" width="80" height="22" rx="3" fill="#475569" />
            <path d="M135 139L165 130V148Z" fill="#F97316" stroke="#EA580C" />
            {/* Exhaust hood right */}
            <path d="M375 98H425V178H375" fill="#E2E8F0" />
          </g>
        );
      case 'soplador':
      default:
        return (
          <g stroke="#1E293B" strokeWidth="2" fill="none">
            <rect x="65" y="210" width="370" height="20" rx="3" fill="#CBD5E1" />
            <rect x="90" y="122" width="110" height="88" rx="6" fill="#E2E8F0" />
            <rect x="200" y="148" width="50" height="36" fill="#94A3B8" />
            <circle cx="325" cy="150" r="56" fill="#F1F5F9" />
            <circle cx="325" cy="150" r="24" fill="#CBD5E1" />
            <rect x="360" y="75" width="38" height="46" fill="#E2E8F0" />
          </g>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-8 bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-medium text-slate-500">Esquema Interactivo de Componentes</p>
            <h4 className="text-sm font-semibold text-slate-900">
              Diagrama Técnico · <span className="font-mono">{tag}</span>
            </h4>
          </div>
          <span className="text-xs text-slate-500">Haz clic en los puntos numerados</span>
        </div>

        <div className="relative w-full aspect-[16/9] bg-white border border-slate-200 rounded-xl overflow-hidden">
          {/* Technical blueprint grid */}
          <svg viewBox="0 0 500 280" className="w-full h-full">
            <defs>
              <pattern id="blueprint-grid" width="25" height="25" patternUnits="userSpaceOnUse">
                <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#F1F5F9" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="500" height="280" fill="url(#blueprint-grid)" />
            {renderSchematic()}
          </svg>

          {/* Interactive Hotspots */}
          {hotspots.map((hs, index) => {
            const isSelected = hs.id === activeHotspot?.id;
            return (
              <button
                key={hs.id}
                type="button"
                onClick={() => setSelectedHotspotId(hs.id)}
                style={{
                  left: `${hs.x}%`,
                  top: `${hs.y}%`,
                  backgroundColor: isSelected ? accentHex : '#18181B',
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center shadow-md transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${
                  isSelected ? 'scale-115 ring-4 ring-white' : 'hover:scale-110'
                }`}
                aria-label={`Ver componente ${hs.label}`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Component Panel */}
      <div className="lg:col-span-4 space-y-3">
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
            <Info className="w-4 h-4 text-slate-400" />
            <span>Componente Seleccionado</span>
          </div>
          {activeHotspot ? (
            <>
              <h4 className="text-base font-bold text-slate-900 mb-2">{activeHotspot.label}</h4>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">{activeHotspot.detail}</p>
              {activeHotspot.partRef && (
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="text-xs text-slate-500">
                    Repuesto asociado: <span className="font-mono font-semibold text-slate-900">{activeHotspot.partRef}</span>
                  </div>
                  {onJumpToPart && (
                    <button
                      type="button"
                      onClick={() => onJumpToPart(activeHotspot.partRef!)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:underline cursor-pointer"
                    >
                      <Package className="w-3.5 h-3.5" />
                      Ver stock
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-slate-500">Selecciona un punto del diagrama.</p>
          )}
        </div>

        {/* Component list quick selector */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1.5">
          <p className="text-xs font-semibold text-slate-700 mb-2">Puntos del diagrama</p>
          {hotspots.map((hs, idx) => {
            const active = hs.id === activeHotspot?.id;
            return (
              <button
                key={hs.id}
                type="button"
                onClick={() => setSelectedHotspotId(hs.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer ${
                  active ? 'bg-white text-slate-900 shadow-xs border border-slate-200' : 'text-slate-600 hover:bg-white/60'
                }`}
              >
                <span
                  className="w-5 h-5 rounded-full text-white text-[11px] font-bold flex items-center justify-center shrink-0"
                  style={{ backgroundColor: active ? accentHex : '#52525B' }}
                >
                  {idx + 1}
                </span>
                <span className="truncate">{hs.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
