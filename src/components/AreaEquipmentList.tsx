import React, { useState } from 'react';
import { AreaInfo, Equipment, EquipmentStatus } from '../types/maintenance';
import { AreaTechnicianIllustration, SemiCirclePattern } from './AreaIllustrations';
import { ArrowLeft, ArrowRight, MapPin, Phone, Search, User } from 'lucide-react';
import { DetailTab } from './EquipmentDetailView';

interface AreaEquipmentListProps {
  area: AreaInfo;
  equipmentList: Equipment[];
  statusOverrides: Record<string, EquipmentStatus>;
  onBackHome: () => void;
  onSelectEquipment: (equipment: Equipment, initialTab?: DetailTab) => void;
}

export const AreaEquipmentList: React.FC<AreaEquipmentListProps> = ({
  area,
  equipmentList,
  statusOverrides,
  onBackHome,
  onSelectEquipment,
}) => {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = Array.from(new Set(equipmentList.map((e) => e.category)));

  const categoryLabels: Record<string, string> = {
    compresor: 'Compresores',
    bomba: 'Bombas',
    grua: 'Grúas',
    'bag-house': 'Bag House',
    'horno-rotatorio': 'Hornos',
    soplador: 'Sopladores',
  };

  const filtered = equipmentList.filter((eq) => {
    const matchesCat = categoryFilter === 'all' || eq.category === categoryFilter;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      eq.tag.toLowerCase().includes(q) ||
      eq.name.toLowerCase().includes(q) ||
      eq.location.bayAxis.toLowerCase().includes(q) ||
      eq.location.building.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <button
        type="button"
        onClick={onBackHome}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-zinc-800 hover:bg-slate-50 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Todas las Áreas de Mantenimiento</span>
      </button>

      {/* Faithful Area Hero Banner matching card motif */}
      <div
        className="relative overflow-hidden rounded-3xl p-6 sm:p-10"
        style={{ backgroundColor: area.cardBgHex }}
      >
        <SemiCirclePattern color={area.semiCircleHex} />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-zinc-700">
              <span className="font-mono">{area.plantZoneCode}</span>
              <span aria-hidden="true">·</span>
              <span>{equipmentList.length} Equipos registrados</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-zinc-950 uppercase tracking-tight">
              {area.title}
            </h1>

            <p className="text-sm sm:text-base text-zinc-800 leading-relaxed">
              {area.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-5 text-xs font-medium text-zinc-800">
              <span className="inline-flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {area.supervisor}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono">
                <Phone className="w-4 h-4" />
                {area.shiftPhone}
              </span>
            </div>
          </div>

          <div className="self-end md:self-center shrink-0">
            <AreaTechnicianIllustration areaId={area.id} className="w-36 h-40 sm:w-44 sm:h-48" />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setCategoryFilter('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              categoryFilter === 'all'
                ? 'bg-zinc-900 text-white'
                : 'bg-slate-100 text-zinc-700 hover:bg-slate-200'
            }`}
          >
            Todos ({equipmentList.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-zinc-900 text-white'
                  : 'bg-slate-100 text-zinc-700 hover:bg-slate-200'
              }`}
            >
              {categoryLabels[cat] ?? cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar equipo, tag o eje..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
      </div>

      {/* Equipment Cards Grid */}
      {filtered.length === 0 ? (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-10 text-center space-y-2">
          <p className="text-base font-semibold text-zinc-900">
            No se encontraron equipos con ese filtro
          </p>
          <p className="text-sm text-zinc-500">
            Prueba borrando la búsqueda o seleccionando otra categoría.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((eq) => {
            const status = statusOverrides[eq.id] ?? eq.status;
            return (
              <div
                key={eq.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-400 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-zinc-500 mb-2">
                    <span className="font-mono font-bold text-zinc-900">{eq.tag}</span>
                    <span>
                      {eq.brand} · {status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-950 leading-snug">
                    {eq.name}
                  </h3>

                  <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
                    {eq.summary}
                  </p>

                  {/* Location Block */}
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5 text-xs">
                    <div className="flex items-start gap-2 text-zinc-800 font-medium">
                      <MapPin className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
                      <span>
                        {eq.location.building} · {eq.location.bayAxis}
                      </span>
                    </div>
                    <p className="text-zinc-500 pl-6">
                      {eq.location.level} · Capacidad: <span className="font-mono text-zinc-800">{eq.keyMetric}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectEquipment(eq, 'specs')}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-zinc-900 text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <span>Ver Ficha Técnica</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectEquipment(eq, 'location')}
                    className="py-2.5 px-4 rounded-xl border border-slate-200 bg-white text-zinc-800 text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Ubicar</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
