import React, { useState } from 'react';
import {
  AreaInfo,
  Equipment,
  EquipmentStatus,
  MaintenanceNote,
} from '../types/maintenance';
import { TechnicalDiagrams } from './TechnicalDiagrams';
import { PlantFloorMap } from './PlantFloorMap';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  Droplets,
  FileText,
  Lock,
  MapPin,
  Package,
  Plus,
  ShieldCheck,
  Wrench,
} from 'lucide-react';

export type DetailTab =
  | 'specs'
  | 'location'
  | 'lubrication'
  | 'parts'
  | 'safety'
  | 'diagram';

interface EquipmentDetailViewProps {
  equipment: Equipment;
  area: AreaInfo;
  initialTab?: DetailTab;
  statusOverride?: EquipmentStatus;
  lubricationDates: Record<string, string>;
  notes: MaintenanceNote[];
  onBackToArea: () => void;
  onBackHome: () => void;
  onUpdateStatus: (equipmentId: string, status: EquipmentStatus) => void;
  onMarkLubricated: (lubId: string) => void;
  onAddNote: (equipmentId: string, author: string, text: string) => void;
}

export const EquipmentDetailView: React.FC<EquipmentDetailViewProps> = ({
  equipment,
  area,
  initialTab = 'specs',
  statusOverride,
  lubricationDates,
  notes,
  onBackToArea,
  onBackHome,
  onUpdateStatus,
  onMarkLubricated,
  onAddNote,
}) => {
  const [activeTab, setActiveTab] = useState<DetailTab>(initialTab);
  const [highlightedPartCode, setHighlightedPartCode] = useState<string | null>(null);
  const [checkedSafetyItems, setCheckedSafetyItems] = useState<Record<number, boolean>>({});
  const [noteAuthor, setNoteAuthor] = useState('');
  const [noteText, setNoteText] = useState('');

  const currentStatus = statusOverride ?? equipment.status;

  const statusMeta: Record<EquipmentStatus, { textClass: string; bgClass: string; icon: React.ReactNode }> = {
    Operativo: {
      textClass: 'text-emerald-800',
      bgClass: 'bg-emerald-50 border-emerald-200',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />,
    },
    'En Mantenimiento': {
      textClass: 'text-amber-800',
      bgClass: 'bg-amber-50 border-amber-200',
      icon: <Wrench className="w-3.5 h-3.5 text-amber-700" />,
    },
    Standby: {
      textClass: 'text-slate-700',
      bgClass: 'bg-slate-100 border-slate-200',
      icon: <Lock className="w-3.5 h-3.5 text-slate-600" />,
    },
  };

  const tabs: { id: DetailTab; label: string; icon: React.ReactNode }[] = [
    { id: 'specs', label: 'Especificaciones', icon: <FileText className="w-4 h-4" /> },
    { id: 'location', label: 'Ubicación en Planta', icon: <MapPin className="w-4 h-4" /> },
    { id: 'lubrication', label: 'Lubricación', icon: <Droplets className="w-4 h-4" /> },
    { id: 'parts', label: 'Repuestos', icon: <Package className="w-4 h-4" /> },
    { id: 'safety', label: 'Seguridad y LOTO', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'diagram', label: 'Diagrama Técnico', icon: <Wrench className="w-4 h-4" /> },
  ];

  const handleJumpToPart = (partCode: string) => {
    setHighlightedPartCode(partCode);
    setActiveTab('parts');
  };

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    onAddNote(equipment.id, noteAuthor.trim() || 'Técnico de Turno', noteText.trim());
    setNoteText('');
  };

  const completedChecklistCount = equipment.safety.checklist.filter(
    (_, idx) => checkedSafetyItems[idx]
  ).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Breadcrumb & Back Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <button
            type="button"
            onClick={onBackHome}
            className="hover:text-zinc-900 font-medium cursor-pointer"
          >
            Inicio
          </button>
          <span aria-hidden="true">/</span>
          <button
            type="button"
            onClick={onBackToArea}
            className="hover:text-zinc-900 font-medium cursor-pointer"
          >
            {area.title}
          </button>
          <span aria-hidden="true">/</span>
          <span className="font-mono font-semibold text-zinc-900">{equipment.tag}</span>
        </div>

        <button
          type="button"
          onClick={onBackToArea}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-zinc-800 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a {area.title}</span>
        </button>
      </div>

      {/* Equipment Summary Header */}
      <div
        className="rounded-3xl p-6 sm:p-8 border border-black/5"
        style={{ backgroundColor: area.cardBgHex }}
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-700">
              <span className="font-mono font-bold text-zinc-950">{equipment.tag}</span>
              <span aria-hidden="true">·</span>
              <span>{area.title}</span>
              <span aria-hidden="true">·</span>
              <span>{equipment.brand} {equipment.model}</span>
              <span aria-hidden="true">·</span>
              <span>Criticidad {equipment.criticality}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight uppercase">
              {equipment.name}
            </h1>

            <p className="text-sm sm:text-base text-zinc-800 leading-relaxed">
              {equipment.summary}
            </p>

            {/* Immediate Quick Location Callout */}
            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-zinc-900 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-zinc-800 shrink-0" />
                {equipment.location.building}
              </span>
              <span className="font-mono text-zinc-800">
                {equipment.location.bayAxis} · {equipment.location.level}
              </span>
            </div>
          </div>

          {/* Operational Status & Quick Switch */}
          <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-4 border border-black/10 shrink-0 min-w-[230px]">
            <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Estado Operativo
            </p>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold mb-3 ${statusMeta[currentStatus].bgClass} ${statusMeta[currentStatus].textClass}`}
            >
              {statusMeta[currentStatus].icon}
              <span>{currentStatus}</span>
            </div>

            <label className="block text-[11px] text-zinc-500 mb-1" htmlFor="status-select">
              Actualizar estado en turno
            </label>
            <select
              id="status-select"
              value={currentStatus}
              onChange={(e) => onUpdateStatus(equipment.id, e.target.value as EquipmentStatus)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            >
              <option value="Operativo">Operativo</option>
              <option value="En Mantenimiento">En Mantenimiento</option>
              <option value="Standby">Standby</option>
            </select>
          </div>
        </div>
      </div>

      {/* Horizontal Navigation Tabs */}
      <div className="overflow-x-auto pb-1">
        <div className="inline-flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl min-w-full sm:min-w-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-white text-zinc-950 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: ESPECIFICACIONES TÉCNICAS & BITÁCORA */}
      {activeTab === 'specs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-zinc-950 uppercase">
                Datos y Especificaciones Técnicas
              </h2>
              <span className="font-mono text-xs text-zinc-500">S/N: {equipment.serialNumber}</span>
            </div>

            <div className="divide-y divide-slate-100">
              <div className="px-6 py-3.5 flex items-center justify-between gap-4 text-sm">
                <span className="text-zinc-500">Fabricante / Modelo</span>
                <span className="font-semibold text-zinc-900 text-right">
                  {equipment.brand} · {equipment.model}
                </span>
              </div>
              <div className="px-6 py-3.5 flex items-center justify-between gap-4 text-sm">
                <span className="text-zinc-500">Año de Fabricación</span>
                <span className="font-mono font-semibold text-zinc-900 tabular-nums">{equipment.year}</span>
              </div>
              {equipment.specs.map((row) => (
                <div
                  key={row.label}
                  className="px-6 py-3.5 flex items-center justify-between gap-4 text-sm"
                >
                  <span className="text-zinc-500">{row.label}</span>
                  <span className="font-semibold text-zinc-900 text-right tabular-nums">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Field Notes / Bitácora */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
            <div>
              <h3 className="font-display text-2xl font-bold text-zinc-950 uppercase">
                Bitácora de Campo
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                Registra inspecciones, ruidos anómalos o novedades del equipo en turno.
              </p>
            </div>

            <form onSubmit={handleCreateNote} className="space-y-3">
              <input
                type="text"
                value={noteAuthor}
                onChange={(e) => setNoteAuthor(e.target.value)}
                placeholder="Tu nombre (ej. J. Quispe — Mecánico)"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <textarea
                rows={3}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Ej. Verificada temperatura de rodamientos en 54 °C, sin fugas visibles..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 text-white text-sm font-semibold inline-flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Guardar Registro en Bitácora</span>
              </button>
            </form>

            <div className="pt-3 border-t border-slate-100 space-y-3 max-h-64 overflow-y-auto">
              {notes.length === 0 ? (
                <p className="text-xs text-zinc-500 py-2">
                  No hay observaciones recientes registradas para este equipo.
                </p>
              ) : (
                notes.map((n) => (
                  <div key={n.id} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                      <span className="font-semibold text-zinc-800">{n.author}</span>
                      <span className="font-mono tabular-nums">{n.date}</span>
                    </div>
                    <p className="text-sm text-zinc-700 leading-relaxed">{n.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: UBICACIÓN EN PLANTA */}
      {activeTab === 'location' && (
        <PlantFloorMap
          focusedEquipmentId={equipment.id}
          initialAreaFilter={equipment.areaId}
          onSelectEquipment={() => {}}
          compact={true}
        />
      )}

      {/* TAB 3: LUBRICACIÓN */}
      {activeTab === 'lubrication' && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-bold text-zinc-950 uppercase">
                Plan y Puntos de Lubricación
              </h2>
              <p className="text-xs text-zinc-500">
                Especificaciones de aceite, grasa, volumen e intervalos en horas de operación.
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {equipment.lubrication.map((lub) => {
              const lastDate = lubricationDates[lub.id] || lub.lastDoneDate;
              return (
                <div
                  key={lub.id}
                  className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <h3 className="text-base font-bold text-zinc-900">{lub.point}</h3>
                    <p className="text-sm font-medium text-zinc-700">{lub.lubricant}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500">
                      <span>Cantidad: <strong className="text-zinc-800">{lub.quantity}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span>Frecuencia: <strong className="font-mono tabular-nums text-zinc-800">{lub.intervalHours} h</strong></span>
                      <span aria-hidden="true">·</span>
                      <span>Método: {lub.method}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 shrink-0">
                    <div className="text-left lg:text-right">
                      <p className="text-[11px] font-medium text-zinc-500">Última ejecución</p>
                      <p className="font-mono text-sm font-semibold text-zinc-900 tabular-nums">
                        {lastDate}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onMarkLubricated(lub.id)}
                      className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Registrar Lubricación Hoy
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: REPUESTOS CRÍTICOS */}
      {activeTab === 'parts' && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-bold text-zinc-950 uppercase">
                Repuestos Críticos y Ubicación en Almacén
              </h2>
              <p className="text-xs text-zinc-500">
                Stock disponible, número de parte OEM y estantería asignada.
              </p>
            </div>
            {highlightedPartCode && (
              <button
                type="button"
                onClick={() => setHighlightedPartCode(null)}
                className="text-xs font-medium text-zinc-600 hover:text-zinc-900 underline cursor-pointer"
              >
                Limpiar filtro ({highlightedPartCode})
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-zinc-600">
                  <th className="py-3 px-6">Código Interno</th>
                  <th className="py-3 px-4">Descripción del Repuesto</th>
                  <th className="py-3 px-4">N° Parte OEM</th>
                  <th className="py-3 px-4 text-right">Stock / Mín.</th>
                  <th className="py-3 px-6">Ubicación Almacén</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {equipment.spareParts.map((part) => {
                  const isHighlighted = highlightedPartCode === part.code;
                  const lowStock = part.stock <= part.minStock;
                  return (
                    <tr
                      key={part.code}
                      className={isHighlighted ? 'bg-amber-50' : 'hover:bg-slate-50/70'}
                    >
                      <td className="py-3.5 px-6 font-mono text-xs font-bold text-zinc-900 whitespace-nowrap">
                        {part.code}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-zinc-900">{part.name}</td>
                      <td className="py-3.5 px-4 font-mono text-xs text-zinc-600 whitespace-nowrap">
                        {part.oemNumber}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums whitespace-nowrap">
                        <span
                          className={`font-bold ${
                            lowStock ? 'text-amber-700' : 'text-emerald-700'
                          }`}
                        >
                          {part.stock}
                        </span>
                        <span className="text-zinc-400"> / {part.minStock}</span>
                      </td>
                      <td className="py-3.5 px-6 text-xs font-medium text-zinc-700">
                        {part.warehouseLocation}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: SEGURIDAD Y LOTO */}
      {activeTab === 'safety' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: EPP + LOTO Points + Hazards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-2xl font-bold text-zinc-950 uppercase">
                Puntos de Bloqueo y Etiquetado (LOTO)
              </h2>
              <div className="space-y-3">
                {equipment.safety.lotoPoints.map((lp) => (
                  <div
                    key={lp.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-red-600 shrink-0" />
                        <span className="font-mono text-xs font-bold text-zinc-900">{lp.tag}</span>
                        <span className="text-xs text-zinc-500">· Bloqueo {lp.type}</span>
                      </div>
                      <p className="text-sm text-zinc-700 mt-1">{lp.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
              <h3 className="font-display text-xl font-bold text-zinc-950 uppercase">
                EPP Obligatorio y Riesgos del Área
              </h3>
              <div>
                <p className="text-xs font-semibold text-zinc-500 mb-2">Equipo de Protección Personal requerido:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {equipment.safety.epp.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-zinc-800 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100"
                    >
                      <ShieldCheck className="w-4 h-4 text-zinc-700 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <p className="text-xs font-semibold text-zinc-500 mb-2">Riesgos críticos identificados:</p>
                <ul className="space-y-2">
                  {equipment.safety.hazards.map((hz) => (
                    <li
                      key={hz}
                      className="flex items-start gap-2.5 text-sm text-amber-950 bg-amber-50/70 px-3.5 py-2.5 rounded-xl border border-amber-200/70"
                    >
                      <AlertTriangle className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                      <span>{hz}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Pre-Intervention Checklist */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-zinc-900" />
                <h3 className="font-display text-2xl font-bold text-zinc-950 uppercase">
                  Checklist Pre-Intervención
                </h3>
              </div>
              <span className="font-mono text-xs font-semibold text-zinc-700 tabular-nums">
                {completedChecklistCount}/{equipment.safety.checklist.length}
              </span>
            </div>

            <p className="text-xs text-zinc-500">
              Verifica cada paso antes de iniciar trabajos mecánicos o eléctricos sobre {equipment.tag}.
            </p>

            <div className="space-y-2.5">
              {equipment.safety.checklist.map((step, idx) => {
                const checked = !!checkedSafetyItems[idx];
                return (
                  <label
                    key={idx}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                      checked
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                        : 'bg-slate-50 border-slate-200 text-zinc-800 hover:bg-slate-100/70'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        setCheckedSafetyItems((prev) => ({
                          ...prev,
                          [idx]: !prev[idx],
                        }))
                      }
                      className="mt-1 w-4 h-4 rounded accent-zinc-900 cursor-pointer shrink-0"
                    />
                    <span className="text-sm leading-snug">{step}</span>
                  </label>
                );
              })}
            </div>

            {completedChecklistCount === equipment.safety.checklist.length && (
              <div className="p-3.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Verificación LOTO completa. Seguro para intervenir.</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 6: DIAGRAMA TÉCNICO */}
      {activeTab === 'diagram' && (
        <TechnicalDiagrams
          category={equipment.category}
          tag={equipment.tag}
          hotspots={equipment.hotspots}
          accentHex={area.accentHex}
          onJumpToPart={handleJumpToPart}
        />
      )}
    </div>
  );
};
