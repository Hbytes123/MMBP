import React, { useEffect, useMemo, useState } from 'react';
import { AREAS, EQUIPMENT_LIST } from './data/equipmentData';
import {
  AreaId,
  Equipment,
  EquipmentStatus,
  MaintenanceNote,
} from './types/maintenance';
import {
  AreaTechnicianIllustration,
  PlantLogoSvg,
  SemiCirclePattern,
} from './components/AreaIllustrations';
import { AreaEquipmentList } from './components/AreaEquipmentList';
import { DetailTab, EquipmentDetailView } from './components/EquipmentDetailView';
import { PlantFloorMap } from './components/PlantFloorMap';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  Droplets,
  MapPin,
  Search,
  ShieldCheck,
  Wrench,
} from 'lucide-react';

type ViewMode =
  | { type: 'home' }
  | { type: 'area'; areaId: AreaId }
  | { type: 'equipment'; equipmentId: string; initialTab?: DetailTab }
  | { type: 'map' }
  | { type: 'directory' }
  | { type: 'maintenance-hub' };

const STORAGE_STATUS_KEY = 'metalurgia_status_overrides_v1';
const STORAGE_LUB_KEY = 'metalurgia_lub_dates_v1';
const STORAGE_NOTES_KEY = 'metalurgia_field_notes_v1';

export default function App() {
  const [view, setView] = useState<ViewMode>({ type: 'home' });
  const [heroSearch, setHeroSearch] = useState('');

  const [statusOverrides, setStatusOverrides] = useState<Record<string, EquipmentStatus>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_STATUS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [lubricationDates, setLubricationDates] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LUB_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [notes, setNotes] = useState<MaintenanceNote[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_NOTES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_STATUS_KEY, JSON.stringify(statusOverrides));
    } catch {
      // Ignore storage quota errors
    }
  }, [statusOverrides]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_LUB_KEY, JSON.stringify(lubricationDates));
    } catch {
      // Ignore storage quota errors
    }
  }, [lubricationDates]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_NOTES_KEY, JSON.stringify(notes));
    } catch {
      // Ignore storage quota errors
    }
  }, [notes]);

  const navigateTo = (nextView: ViewMode) => {
    setView(nextView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateStatus = (equipmentId: string, status: EquipmentStatus) => {
    setStatusOverrides((prev) => ({ ...prev, [equipmentId]: status }));
  };

  const handleMarkLubricated = (lubId: string) => {
    const today = new Date().toISOString().slice(0, 10);
    setLubricationDates((prev) => ({ ...prev, [lubId]: today }));
  };

  const handleAddNote = (equipmentId: string, author: string, text: string) => {
    const newNote: MaintenanceNote = {
      id: `note-${Date.now()}`,
      equipmentId,
      author,
      date: new Date().toISOString().slice(0, 10),
      text,
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const quickSearchResults = useMemo(() => {
    const q = heroSearch.trim().toLowerCase();
    if (!q) return [];
    return EQUIPMENT_LIST.filter(
      (eq) =>
        eq.tag.toLowerCase().includes(q) ||
        eq.name.toLowerCase().includes(q) ||
        eq.location.building.toLowerCase().includes(q) ||
        eq.location.bayAxis.toLowerCase().includes(q) ||
        eq.brand.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [heroSearch]);

  // Top Stepper matching the visual model in the image
  const renderTopStepper = () => {
    const activeStep =
      view.type === 'home' || view.type === 'area'
        ? 0
        : view.type === 'directory' || view.type === 'equipment'
        ? 1
        : view.type === 'map'
        ? 2
        : 3;

    return (
      <div className="w-full max-w-xl mx-auto px-4 pt-6 pb-8">
        <div className="relative flex items-center justify-between">
          {/* Connecting white horizontal bar behind the 4 nodes */}
          <div
            className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-2 bg-white/85 rounded-full"
            aria-hidden="true"
          />

          {/* Step 1: Plant Crest (Home / Areas) */}
          <button
            type="button"
            onClick={() => navigateTo({ type: 'home' })}
            title="Inicio y Áreas de Mantenimiento"
            aria-label="Inicio y Áreas de Mantenimiento"
            className={`relative z-10 flex items-center justify-center px-3 py-1.5 rounded-xl bg-white shadow-xs transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-zinc-900 ${
              activeStep === 0 ? 'ring-2 ring-zinc-900 scale-105' : 'hover:scale-105 opacity-95'
            }`}
          >
            <img
              src={`${import.meta.env.BASE_URL}assets/aistudio/METAlurgia_business_PERU_2__733fbab0.jpg`}
              alt="Logo Planta Metalúrgica"
              referrerPolicy="no-referrer"
              className="w-14 h-8 sm:w-16 sm:h-9 object-contain"
            />
          </button>

          {/* Step 2: Technical Specs & Directory */}
          <button
            type="button"
            onClick={() => navigateTo({ type: 'directory' })}
            title="Directorio y Especificaciones Técnicas"
            aria-label="Directorio y Especificaciones Técnicas"
            className={`relative z-10 w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-xs transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-zinc-900 ${
              activeStep === 1
                ? 'ring-2 ring-zinc-900 text-zinc-950 scale-105'
                : 'text-zinc-500 hover:text-zinc-900 hover:scale-105'
            }`}
          >
            <BookOpen className="w-5 h-5" />
          </button>

          {/* Step 3: Plant Location Map */}
          <button
            type="button"
            onClick={() => navigateTo({ type: 'map' })}
            title="Mapa de Ubicación en Planta"
            aria-label="Mapa de Ubicación en Planta"
            className={`relative z-10 w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-xs transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-zinc-900 ${
              activeStep === 2
                ? 'ring-2 ring-zinc-900 text-zinc-950 scale-105'
                : 'text-zinc-500 hover:text-zinc-900 hover:scale-105'
            }`}
          >
            <Bookmark className="w-5 h-5" />
          </button>

          {/* Step 4: Lubrication, Spare Parts & LOTO Maintenance Hub */}
          <button
            type="button"
            onClick={() => navigateTo({ type: 'maintenance-hub' })}
            title="Lubricación, Repuestos y Seguridad LOTO"
            aria-label="Lubricación, Repuestos y Seguridad LOTO"
            className={`relative z-10 w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-xs transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-zinc-900 ${
              activeStep === 3
                ? 'ring-2 ring-zinc-900 text-zinc-950 scale-105'
                : 'text-zinc-500 hover:text-zinc-900 hover:scale-105'
            }`}
          >
            <Wrench className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  // Compact golden header strip for inner pages
  const renderInnerHeader = () => (
    <header
      className="border-b border-amber-200/70"
      style={{
        background: 'linear-gradient(180deg, #FDE368 0%, #FEF3B8 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigateTo({ type: 'home' })}
          className="inline-flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl shadow-xs cursor-pointer hover:bg-amber-50 transition-colors"
        >
          <PlantLogoSvg className="w-10 h-6" />
          <span className="font-display text-lg font-extrabold tracking-tight text-zinc-950 uppercase whitespace-nowrap">
            Guía de Mantenimiento
          </span>
        </button>

        <nav className="flex items-center gap-2 sm:gap-5 text-xs sm:text-sm font-semibold text-zinc-800 overflow-x-auto">
          <button
            type="button"
            onClick={() => navigateTo({ type: 'home' })}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              view.type === 'home' ? 'bg-zinc-900 text-white' : 'hover:bg-white/60'
            }`}
          >
            Áreas
          </button>
          <button
            type="button"
            onClick={() => navigateTo({ type: 'directory' })}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              view.type === 'directory' ? 'bg-zinc-900 text-white' : 'hover:bg-white/60'
            }`}
          >
            Equipos
          </button>
          <button
            type="button"
            onClick={() => navigateTo({ type: 'map' })}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              view.type === 'map' ? 'bg-zinc-900 text-white' : 'hover:bg-white/60'
            }`}
          >
            Mapa de Planta
          </button>
          <button
            type="button"
            onClick={() => navigateTo({ type: 'maintenance-hub' })}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              view.type === 'maintenance-hub' ? 'bg-zinc-900 text-white' : 'hover:bg-white/60'
            }`}
          >
            Lubricación y LOTO
          </button>
        </nav>
      </div>
    </header>
  );

  // ==================== VIEW: HOME (FAITHFUL TO MOCKUP) ====================
  if (view.type === 'home') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Top Golden-Yellow Fade Hero matching exact visual proportions */}
        <section
          className="relative pb-16 sm:pb-24"
          style={{
            background:
              'linear-gradient(180deg, #FDE266 0%, #FDE784 48%, #FEF4BE 80%, #FFFFFF 100%)',
          }}
        >
          {renderTopStepper()}

          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-zinc-950 uppercase tracking-tight leading-[0.98] text-balance">
              Toda la información de
              <br />
              tus equipos en un solo lugar
            </h1>

            <p className="mt-5 max-w-xl mx-auto text-sm sm:text-base text-zinc-800 leading-relaxed">
              Consulta especificaciones técnicas, fotografías, ubicación, lubricación,
              repuestos y procedimientos de seguridad de manera rápida y sencilla.
            </p>

            {/* Quick Search & Direct Map Action */}
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="relative flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="Buscar equipo por tag (ej. CF-CMP-01), nombre o eje..."
                    className="w-full pl-11 pr-4 py-3 bg-white border border-zinc-900/10 rounded-2xl text-sm text-zinc-900 placeholder:text-zinc-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo({ type: 'map' })}
                  className="px-5 py-3 rounded-2xl bg-zinc-900 text-white text-sm font-semibold inline-flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
                >
                  <MapPin className="w-4 h-4 text-amber-300" />
                  <span>Mapa de Planta</span>
                </button>
              </div>

              {/* Live Search Dropdown */}
              {quickSearchResults.length > 0 && (
                <div className="mt-2 bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden text-left divide-y divide-slate-100">
                  {quickSearchResults.map((eq) => {
                    const area = AREAS.find((a) => a.id === eq.areaId)!;
                    return (
                      <button
                        key={eq.id}
                        type="button"
                        onClick={() => {
                          setHeroSearch('');
                          navigateTo({ type: 'equipment', equipmentId: eq.id });
                        }}
                        className="w-full px-4 py-3 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <span className="font-mono font-bold text-zinc-900">{eq.tag}</span>
                            <span aria-hidden="true">·</span>
                            <span>{area.title}</span>
                          </div>
                          <p className="text-sm font-semibold text-zinc-900 truncate mt-0.5">
                            {eq.name}
                          </p>
                          <p className="text-xs text-zinc-500 truncate">
                            {eq.location.building} · {eq.location.bayAxis}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-400 shrink-0" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Main Section: ÁREAS DE TRABAJO / EXPLORA LAS ÁREAS DE MANTENIMIENTO */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pb-20">
          <div className="mb-8">
            <p className="text-xs sm:text-sm font-semibold tracking-wider text-zinc-700 uppercase">
              ÁREAS DE TRABAJO
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-none mt-1">
              <span className="text-zinc-950 block">EXPLORA LAS ÁREAS DE</span>
              <span className="text-[#F5C518] block">MANTENIMIENTO</span>
            </h2>
          </div>

          {/* 4 Faithful Area Cards: 1-col on mobile (exact mockup vertical rhythm), 2x2 on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
            {AREAS.map((area) => {
              const areaEquipmentCount = EQUIPMENT_LIST.filter(
                (e) => e.areaId === area.id
              ).length;

              return (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => navigateTo({ type: 'area', areaId: area.id })}
                  style={{ backgroundColor: area.cardBgHex }}
                  className="group relative overflow-hidden rounded-2xl sm:rounded-3xl text-left p-6 sm:p-8 min-h-[290px] sm:min-h-[310px] flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-zinc-900 cursor-pointer"
                >
                  {/* Repeating Semi-Circle Geometric Background */}
                  <SemiCirclePattern color={area.semiCircleHex} />

                  {/* Top Left Title & Subtitle */}
                  <div className="relative z-10 max-w-[68%]">
                    <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-zinc-950 uppercase tracking-tight leading-none">
                      {area.title}
                    </h3>
                    <p className="mt-2.5 text-sm sm:text-base text-zinc-800 leading-snug">
                      {area.subtitle}
                    </p>
                  </div>

                  {/* Bottom Bar with Technician Illustration on Right */}
                  <div className="relative z-10 flex items-end justify-between mt-6">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-900 group-hover:underline">
                      <span>{areaEquipmentCount} equipos disponibles</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* Right-aligned Line-Art Technician */}
                  <div className="pointer-events-none absolute right-2 sm:right-4 bottom-0 z-10 transition-transform duration-200 group-hover:scale-[1.03]">
                    {area.id === 'casa-fuerza' ? (
                      <img
                        src={`${import.meta.env.BASE_URL}assets/aistudio/imagen_1b96487e.png`}
                        alt="Técnico de Casa Fuerza con EPP"
                        referrerPolicy="no-referrer"
                        className="w-40 h-44 sm:w-44 sm:h-48 object-contain object-bottom"
                      />
                    ) : (
                      <AreaTechnicianIllustration
                        areaId={area.id}
                        className="w-40 h-44 sm:w-44 sm:h-48"
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </main>

        <footer className="border-t border-slate-100 py-6 text-center text-xs text-zinc-500">
          Guía Técnica de Mantenimiento Industrial · Consulta de Equipos, Ubicación y Seguridad LOTO
        </footer>
      </div>
    );
  }

  // ==================== VIEW: AREA EQUIPMENT LIST ====================
  if (view.type === 'area') {
    const area = AREAS.find((a) => a.id === view.areaId)!;
    const areaEquipment = EQUIPMENT_LIST.filter((e) => e.areaId === view.areaId);
    return (
      <div className="min-h-screen bg-white">
        {renderInnerHeader()}
        <AreaEquipmentList
          area={area}
          equipmentList={areaEquipment}
          statusOverrides={statusOverrides}
          onBackHome={() => navigateTo({ type: 'home' })}
          onSelectEquipment={(eq, initialTab) =>
            navigateTo({ type: 'equipment', equipmentId: eq.id, initialTab })
          }
        />
      </div>
    );
  }

  // ==================== VIEW: EQUIPMENT DETAIL ====================
  if (view.type === 'equipment') {
    const equipment = EQUIPMENT_LIST.find((e) => e.id === view.equipmentId)!;
    const area = AREAS.find((a) => a.id === equipment.areaId)!;
    const eqNotes = notes.filter((n) => n.equipmentId === equipment.id);

    return (
      <div className="min-h-screen bg-white">
        {renderInnerHeader()}
        <EquipmentDetailView
          equipment={equipment}
          area={area}
          initialTab={view.initialTab}
          statusOverride={statusOverrides[equipment.id]}
          lubricationDates={lubricationDates}
          notes={eqNotes}
          onBackToArea={() => navigateTo({ type: 'area', areaId: area.id })}
          onBackHome={() => navigateTo({ type: 'home' })}
          onUpdateStatus={handleUpdateStatus}
          onMarkLubricated={handleMarkLubricated}
          onAddNote={handleAddNote}
        />
      </div>
    );
  }

  // ==================== VIEW: GLOBAL PLANT FLOOR MAP ====================
  if (view.type === 'map') {
    return (
      <div className="min-h-screen bg-white">
        {renderInnerHeader()}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Localización en Planta
              </p>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-zinc-950 uppercase">
                Mapa General de Equipos y Ubicación
              </h1>
            </div>
            <button
              type="button"
              onClick={() => navigateTo({ type: 'home' })}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-zinc-800 hover:bg-slate-50 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al Inicio</span>
            </button>
          </div>

          <PlantFloorMap
            onSelectEquipment={(eq) =>
              navigateTo({ type: 'equipment', equipmentId: eq.id, initialTab: 'specs' })
            }
          />
        </div>
      </div>
    );
  }

  // ==================== VIEW: GLOBAL EQUIPMENT DIRECTORY ====================
  if (view.type === 'directory') {
    const q = heroSearch.trim().toLowerCase();
    const list = EQUIPMENT_LIST.filter(
      (eq) =>
        !q ||
        eq.tag.toLowerCase().includes(q) ||
        eq.name.toLowerCase().includes(q) ||
        eq.location.building.toLowerCase().includes(q) ||
        eq.location.bayAxis.toLowerCase().includes(q)
    );

    return (
      <div className="min-h-screen bg-white">
        {renderInnerHeader()}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Catálogo Maestro
              </p>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-zinc-950 uppercase">
                Todos los Equipos de Planta ({list.length})
              </h1>
            </div>
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Filtrar por tag, máquina o eje..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-zinc-600">
                    <th className="py-3.5 px-5">Tag</th>
                    <th className="py-3.5 px-4">Equipo</th>
                    <th className="py-3.5 px-4">Área</th>
                    <th className="py-3.5 px-4">Ubicación Exacta</th>
                    <th className="py-3.5 px-4">Estado</th>
                    <th className="py-3.5 px-5 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {list.map((eq) => {
                    const area = AREAS.find((a) => a.id === eq.areaId)!;
                    const status = statusOverrides[eq.id] ?? eq.status;
                    return (
                      <tr key={eq.id} className="hover:bg-slate-50/70">
                        <td className="py-3.5 px-5 font-mono text-xs font-bold text-zinc-950 whitespace-nowrap">
                          {eq.tag}
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-zinc-900">{eq.name}</p>
                          <p className="text-xs text-zinc-500">{eq.keyMetric}</p>
                        </td>
                        <td className="py-3.5 px-4 text-xs font-semibold text-zinc-700 whitespace-nowrap">
                          {area.title}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-zinc-600">
                          <p className="font-medium text-zinc-800">{eq.location.bayAxis}</p>
                          <p>{eq.location.level}</p>
                        </td>
                        <td className="py-3.5 px-4 text-xs font-semibold text-zinc-800 whitespace-nowrap">
                          {status}
                        </td>
                        <td className="py-3.5 px-5 text-right whitespace-nowrap space-x-2">
                          <button
                            type="button"
                            onClick={() =>
                              navigateTo({ type: 'equipment', equipmentId: eq.id, initialTab: 'location' })
                            }
                            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-zinc-800 hover:bg-slate-100 cursor-pointer"
                          >
                            Ubicar
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              navigateTo({ type: 'equipment', equipmentId: eq.id, initialTab: 'specs' })
                            }
                            className="px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 cursor-pointer"
                          >
                            Ficha
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== VIEW: MAINTENANCE HUB (LUBRICACIÓN & LOTO) ====================
  return (
    <div className="min-h-screen bg-white">
      {renderInnerHeader()}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div>
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Ejecución en Terreno
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-zinc-950 uppercase">
            Lubricación, Repuestos y Bloqueos LOTO
          </h1>
          <p className="text-sm text-zinc-600 mt-1">
            Acceso rápido a rutas de engrase/aceite y puntos de aislamiento seguro por equipo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {EQUIPMENT_LIST.map((eq) => {
            const area = AREAS.find((a) => a.id === eq.areaId)!;
            return (
              <div
                key={eq.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span className="font-mono font-bold text-zinc-900">{eq.tag}</span>
                    <span>{area.title}</span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-950">{eq.name}</h3>

                  <div className="pt-2 space-y-1.5 text-xs text-zinc-600">
                    <p className="flex items-center gap-2">
                      <Droplets className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>
                        {eq.lubrication[0]?.lubricant} · Cada{' '}
                        <strong className="font-mono tabular-nums">
                          {eq.lubrication[0]?.intervalHours} h
                        </strong>
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                      <span>
                        {eq.safety.lotoPoints.length} punto(s) LOTO ({eq.safety.lotoPoints.map((l) => l.tag).join(', ')})
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() =>
                      navigateTo({ type: 'equipment', equipmentId: eq.id, initialTab: 'lubrication' })
                    }
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-100 text-zinc-900 text-xs font-semibold hover:bg-slate-200 cursor-pointer"
                  >
                    Ir a Lubricación
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      navigateTo({ type: 'equipment', equipmentId: eq.id, initialTab: 'safety' })
                    }
                    className="flex-1 py-2 px-3 rounded-xl bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 cursor-pointer"
                  >
                    Ver LOTO y EPP
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
