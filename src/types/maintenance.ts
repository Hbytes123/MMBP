export type AreaId = 'casa-fuerza' | 'zinc' | 'anodicos' | 'short-rotary';

export type EquipmentStatus = 'Operativo' | 'En Mantenimiento' | 'Standby';

export type EquipmentCategory =
  | 'compresor'
  | 'bomba'
  | 'grua'
  | 'bag-house'
  | 'horno-rotatorio'
  | 'soplador';

export interface LubricationPoint {
  id: string;
  point: string;
  lubricant: string;
  quantity: string;
  intervalHours: number;
  method: string;
  lastDoneDate: string;
}

export interface SparePart {
  code: string;
  name: string;
  oemNumber: string;
  stock: number;
  minStock: number;
  warehouseLocation: string;
}

export interface LotoPoint {
  id: string;
  type: 'Eléctrico' | 'Neumático' | 'Térmico' | 'Mecánico';
  tag: string;
  location: string;
}

export interface SafetyProcedure {
  epp: string[];
  lotoPoints: LotoPoint[];
  hazards: string[];
  checklist: string[];
}

export interface BlueprintHotspot {
  id: string;
  x: number;
  y: number;
  label: string;
  detail: string;
  partRef?: string;
}

export interface EquipmentLocation {
  building: string;
  level: string;
  bayAxis: string;
  /** Percentage coordinates on the global plant SVG map (0-100) */
  mapCoords: { x: number; y: number };
  /** Percentage coordinates within the zoomed area bay (0-100) */
  bayCoords: { x: number; y: number };
  accessRoute: string;
  nearbyLandmark: string;
}

export interface TechSpecRow {
  label: string;
  value: string;
}

export interface Equipment {
  id: string;
  tag: string;
  name: string;
  areaId: AreaId;
  category: EquipmentCategory;
  brand: string;
  model: string;
  serialNumber: string;
  year: number;
  criticality: 'Alta' | 'Media' | 'Baja';
  status: EquipmentStatus;
  summary: string;
  keyMetric: string;
  specs: TechSpecRow[];
  location: EquipmentLocation;
  lubrication: LubricationPoint[];
  spareParts: SparePart[];
  safety: SafetyProcedure;
  hotspots: BlueprintHotspot[];
}

export interface AreaInfo {
  id: AreaId;
  title: string;
  subtitle: string;
  plantZoneCode: string;
  supervisor: string;
  shiftPhone: string;
  description: string;
  cardBgHex: string;
  semiCircleHex: string;
  accentHex: string;
  badgeBgHex: string;
  badgeTextHex: string;
  mapRegion: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface MaintenanceNote {
  id: string;
  equipmentId: string;
  author: string;
  date: string;
  text: string;
}
