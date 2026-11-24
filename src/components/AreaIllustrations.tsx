import React from 'react';
import { AreaId } from '../types/maintenance';

export const PlantLogoSvg: React.FC<{ className?: string }> = ({ className = 'w-14 h-9' }) => (
  <svg viewBox="0 0 110 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    {/* Mountains silhouette */}
    <path
      d="M8 54L29 24L45 43L61 28L79 44L92 31L104 54H8Z"
      fill="#F4C430"
      stroke="#18181B"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path
      d="M29 24L36 33L31 35L26 30L29 24Z"
      fill="#FFFFFF"
      stroke="#18181B"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Smelter Chimney */}
    <path
      d="M36 54L39 14H45L48 54H36Z"
      fill="#FFFFFF"
      stroke="#18181B"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    {/* Smoke puff */}
    <path
      d="M44 12C46 7 53 6 58 8C63 5 71 7 73 11C77 12 78 16 74 18"
      stroke="#F59E0B"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    {/* Plant building */}
    <rect x="48" y="39" width="38" height="15" fill="#FFFFFF" stroke="#18181B" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M48 39L58 32L68 39L77 32L86 39" fill="#FDE68A" stroke="#18181B" strokeWidth="2" strokeLinejoin="round" />
    {/* Plant bays */}
    <rect x="53" y="45" width="6" height="9" fill="#18181B" rx="0.5" />
    <rect x="63" y="45" width="6" height="9" fill="#18181B" rx="0.5" />
    <rect x="73" y="45" width="6" height="9" fill="#18181B" rx="0.5" />
    {/* Ground line */}
    <line x1="6" y1="54" x2="104" y2="54" stroke="#18181B" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

export const SemiCirclePattern: React.FC<{ color: string }> = ({ color }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    {/* Bottom-left cluster of 3 D-shaped semi-circles */}
    <svg
      viewBox="0 0 220 140"
      className="absolute -bottom-3 -left-2 w-44 sm:w-52 h-auto opacity-85"
      fill="none"
    >
      <path d="M0 0 A58 58 0 0 1 0 116 Z" fill={color} />
      <path d="M62 0 A58 58 0 0 1 62 116 Z" fill={color} />
      <path d="M124 0 A58 58 0 0 1 124 116 Z" fill={color} />
    </svg>
    {/* Top-right cluster of 3 inverted D-shaped semi-circles */}
    <svg
      viewBox="0 0 220 140"
      className="absolute top-2 -right-3 w-44 sm:w-52 h-auto opacity-85"
      fill="none"
    >
      <path d="M96 10 A58 58 0 0 0 96 126 Z" fill={color} />
      <path d="M158 10 A58 58 0 0 0 158 126 Z" fill={color} />
      <path d="M220 10 A58 58 0 0 0 220 126 Z" fill={color} />
    </svg>
  </div>
);

export const CasaFuerzaTechnicianSvg: React.FC<{ className?: string }> = ({ className = 'w-44 h-48' }) => (
  <svg viewBox="0 0 220 245" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    {/* Thumbs-up right arm */}
    <path d="M72 132L44 128L38 102L54 98L58 114L75 117" fill="#FFFFFF" stroke="#18181B" strokeWidth="3.2" strokeLinejoin="round" />
    {/* Thumbs-up black glove */}
    <path d="M35 102C32 95 36 86 43 85L43 72C43 68 49 67 50 72L52 84H59C63 84 65 89 63 93L61 103C60 106 56 108 51 108H41C38 108 36 105 35 102Z" fill="#27272A" stroke="#18181B" strokeWidth="3" strokeLinejoin="round" />
    {/* Left arm */}
    <path d="M150 122L184 150L168 176L146 164" fill="#FFFFFF" stroke="#18181B" strokeWidth="3.2" strokeLinejoin="round" />
    <path d="M152 162C158 164 162 172 157 179C152 186 143 185 138 179L144 164Z" fill="#27272A" stroke="#18181B" strokeWidth="3" strokeLinejoin="round" />

    {/* Legs / Trousers */}
    <path d="M78 202L74 242H106L110 218L114 242H146L142 202H78Z" fill="#E4E4E7" stroke="#18181B" strokeWidth="3.2" strokeLinejoin="round" />

    {/* Torso shirt base */}
    <path d="M72 114C72 104 86 98 110 98C134 98 148 104 148 114L146 202H74L72 114Z" fill="#FFFFFF" stroke="#18181B" strokeWidth="3.2" strokeLinejoin="round" />
    {/* Orange Hi-Vis Vest */}
    <path d="M76 110L95 104V202H75L76 110Z" fill="#F97316" stroke="#18181B" strokeWidth="3" strokeLinejoin="round" />
    <path d="M144 110L125 104V202H145L144 110Z" fill="#F97316" stroke="#18181B" strokeWidth="3" strokeLinejoin="round" />
    <rect x="95" y="142" width="30" height="60" fill="#FB923C" stroke="#18181B" strokeWidth="2.8" />
    {/* Grey reflective stripes */}
    <rect x="76" y="160" width="68" height="10" fill="#D4D4D8" stroke="#18181B" strokeWidth="2.4" />
    <rect x="76" y="182" width="68" height="9" fill="#D4D4D8" stroke="#18181B" strokeWidth="2.4" />
    {/* Harness straps & chest buckle */}
    <path d="M89 105L95 202M131 105L125 202" stroke="#18181B" strokeWidth="6" strokeLinecap="round" />
    <path d="M89 105L95 202M131 105L125 202" stroke="#52525B" strokeWidth="2.5" strokeLinecap="round" />
    <rect x="86" y="138" width="48" height="11" rx="2" fill="#3F3F46" stroke="#18181B" strokeWidth="2.5" />
    <rect x="103" y="135" width="14" height="17" rx="2" fill="#E4E4E7" stroke="#18181B" strokeWidth="2.5" />
    <rect x="74" y="196" width="72" height="11" rx="2" fill="#3F3F46" stroke="#18181B" strokeWidth="2.5" />

    {/* Neck & Head */}
    <path d="M98 92V106C106 111 114 111 122 106V92" fill="#FDE2C8" stroke="#18181B" strokeWidth="3" />
    <ellipse cx="110" cy="68" rx="25" ry="27" fill="#FDE2C8" stroke="#18181B" strokeWidth="3.2" />
    {/* Glasses & smile */}
    <rect x="91" y="61" width="16" height="11" rx="3" fill="#FFFFFF" fillOpacity="0.6" stroke="#18181B" strokeWidth="2.5" />
    <rect x="113" y="61" width="16" height="11" rx="3" fill="#FFFFFF" fillOpacity="0.6" stroke="#18181B" strokeWidth="2.5" />
    <line x1="107" y1="65" x2="113" y2="65" stroke="#18181B" strokeWidth="2.5" />
    <circle cx="99" cy="66.5" r="2" fill="#18181B" />
    <circle cx="121" cy="66.5" r="2" fill="#18181B" />
    <path d="M101 80C106 85 114 85 119 80" stroke="#18181B" strokeWidth="2.6" strokeLinecap="round" />

    {/* Orange Ear Muffs */}
    <rect x="78" y="56" width="10" height="22" rx="5" fill="#EA580C" stroke="#18181B" strokeWidth="2.8" />
    <rect x="132" y="56" width="10" height="22" rx="5" fill="#EA580C" stroke="#18181B" strokeWidth="2.8" />

    {/* Orange Hard Hat */}
    <path d="M82 52C82 32 95 22 110 22C125 22 138 32 138 52H82Z" fill="#F97316" stroke="#18181B" strokeWidth="3.2" strokeLinejoin="round" />
    <path d="M104 23V48M116 23V48" stroke="#18181B" strokeWidth="2.4" />
    <path d="M77 52C88 47 132 47 143 52C143 56 135 58 110 58C85 58 77 56 77 52Z" fill="#EA580C" stroke="#18181B" strokeWidth="3" />
  </svg>
);

export const ZincTechnicianSvg: React.FC<{ className?: string }> = ({ className = 'w-44 h-48' }) => (
  <svg viewBox="0 0 220 245" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    {/* Left hand adjusting respirator */}
    <path d="M74 126L46 116L58 84L76 92L68 108L80 112" fill="#FFFFFF" stroke="#18181B" strokeWidth="3.2" strokeLinejoin="round" />
    <path d="M62 76C68 72 78 75 80 83L74 96L58 88C57 82 59 78 62 76Z" fill="#3B82F6" stroke="#18181B" strokeWidth="3" strokeLinejoin="round" />
    {/* Right arm thumbs up */}
    <path d="M148 124L178 134L184 104L168 100L164 114L148 110" fill="#FFFFFF" stroke="#18181B" strokeWidth="3.2" strokeLinejoin="round" />
    <path d="M186 105C189 98 186 89 179 88V75C179 70 173 70 172 75L170 87H163C159 87 157 92 159 96L161 106C162 109 166 111 171 111H180C183 111 185 108 186 105Z" fill="#3B82F6" stroke="#18181B" strokeWidth="3" strokeLinejoin="round" />

    {/* Legs */}
    <path d="M78 204L74 242H106L110 218L114 242H146L142 204H78Z" fill="#EFF6FF" stroke="#18181B" strokeWidth="3.2" strokeLinejoin="round" />

    {/* White coverall torso */}
    <path d="M72 114C72 104 86 98 110 98C134 98 148 104 148 114L146 204H74L72 114Z" fill="#FFFFFF" stroke="#18181B" strokeWidth="3.2" strokeLinejoin="round" />
    {/* Blue safety harness */}
    <path d="M90 102L94 204M130 102L126 204" stroke="#18181B" strokeWidth="9" strokeLinecap="round" />
    <path d="M90 102L94 204M130 102L126 204" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
    <rect x="82" y="142" width="56" height="12" rx="2" fill="#2563EB" stroke="#18181B" strokeWidth="2.6" />
    <rect x="103" y="139" width="14" height="18" rx="2" fill="#E4E4E7" stroke="#18181B" strokeWidth="2.5" />
    <rect x="74" y="196" width="72" height="11" rx="2" fill="#1D4ED8" stroke="#18181B" strokeWidth="2.5" />

    {/* Head */}
    <ellipse cx="110" cy="68" rx="25" ry="27" fill="#FDE2C8" stroke="#18181B" strokeWidth="3.2" />
    {/* Safety goggles */}
    <rect x="87" y="56" width="46" height="16" rx="6" fill="#DBEAFE" stroke="#18181B" strokeWidth="2.8" />
    <circle cx="99" cy="64" r="2.2" fill="#18181B" />
    <circle cx="121" cy="64" r="2.2" fill="#18181B" />

    {/* Dual-cartridge respirator */}
    <path d="M92 75C92 71 100 69 110 69C120 69 128 71 128 75L124 96C116 101 104 101 96 96L92 75Z" fill="#334155" stroke="#18181B" strokeWidth="2.8" />
    <circle cx="92" cy="86" r="10" fill="#64748B" stroke="#18181B" strokeWidth="2.6" />
    <circle cx="128" cy="86" r="10" fill="#64748B" stroke="#18181B" strokeWidth="2.6" />
    <circle cx="110" cy="88" r="6" fill="#94A3B8" stroke="#18181B" strokeWidth="2.2" />

    {/* Blue Hard Hat */}
    <path d="M82 50C82 30 95 20 110 20C125 20 138 30 138 50H82Z" fill="#3B82F6" stroke="#18181B" strokeWidth="3.2" strokeLinejoin="round" />
    <path d="M104 21V46M116 21V46" stroke="#18181B" strokeWidth="2.4" />
    <path d="M77 50C88 45 132 45 143 50C143 54 135 56 110 56C85 56 77 54 77 50Z" fill="#2563EB" stroke="#18181B" strokeWidth="3" />
  </svg>
);

export const AnodicosTechnicianSvg: React.FC<{ className?: string }> = ({ className = 'w-44 h-48' }) => (
  <svg viewBox="0 0 220 245" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    {/* Spark accent lines around hard hat */}
    <path d="M72 34L62 28M70 46L58 46M148 34L158 28M150 46L162 46" stroke="#A855F7" strokeWidth="3" strokeLinecap="round" />

    {/* Right arm thumbs up */}
    <path d="M74 128L46 124L40 96L56 92L60 108L76 112" fill="#F8FAFC" stroke="#18181B" strokeWidth="3.2" strokeLinejoin="round" />
    <path d="M37 97C34 90 38 81 45 80V67C45 62 51 62 52 67L54 79H61C65 79 67 84 65 88L63 98C62 101 58 103 53 103H43C40 103 38 100 37 97Z" fill="#A855F7" stroke="#18181B" strokeWidth="3" strokeLinejoin="round" />

    {/* Tyvek Legs & Boots */}
    <path d="M78 196L74 230H104L109 208L114 230H144L140 196H78Z" fill="#F8FAFC" stroke="#18181B" strokeWidth="3.2" strokeLinejoin="round" />
    <path d="M72 228H105V240H68C68 233 70 228 72 228Z" fill="#27272A" stroke="#18181B" strokeWidth="2.8" strokeLinejoin="round" />
    <path d="M113 228H146C148 228 150 233 150 240H113V228Z" fill="#27272A" stroke="#18181B" strokeWidth="2.8" strokeLinejoin="round" />

    {/* Tyvek Hooded Coverall */}
    <path d="M70 112C70 100 86 92 110 92C134 92 150 100 150 112L144 198H74L70 112Z" fill="#F8FAFC" stroke="#18181B" strokeWidth="3.2" strokeLinejoin="round" />
    <line x1="110" y1="100" x2="110" y2="196" stroke="#CBD5E1" strokeWidth="2.5" strokeDasharray="4 4" />
    {/* Purple Tyvek oval chest emblem */}
    <ellipse cx="127" cy="126" rx="14" ry="8" fill="#FAF5FF" stroke="#9333EA" strokeWidth="2" />
    <text x="127" y="129" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#7E22CE" fontFamily="sans-serif">Tyvek</text>

    {/* Left arm holding purple clipboard */}
    <path d="M148 118L170 144L154 166L134 156" fill="#F8FAFC" stroke="#18181B" strokeWidth="3.2" strokeLinejoin="round" />
    <g transform="translate(124, 134) rotate(-14)">
      <rect x="0" y="0" width="38" height="48" rx="4" fill="#9333EA" stroke="#18181B" strokeWidth="2.8" />
      <rect x="11" y="-4" width="16" height="8" rx="2" fill="#D4D4D8" stroke="#18181B" strokeWidth="2.2" />
      <rect x="6" y="10" width="26" height="30" rx="1.5" fill="#FFFFFF" />
      <line x1="10" y1="17" x2="28" y2="17" stroke="#CBD5E1" strokeWidth="2" />
      <line x1="10" y1="24" x2="28" y2="24" stroke="#CBD5E1" strokeWidth="2" />
      <line x1="10" y1="31" x2="22" y2="31" stroke="#CBD5E1" strokeWidth="2" />
    </g>
    <circle cx="152" cy="160" r="8" fill="#27272A" stroke="#18181B" strokeWidth="2.8" />

    {/* Head + Hood */}
    <circle cx="110" cy="68" r="29" fill="#F8FAFC" stroke="#18181B" strokeWidth="3.2" />
    <ellipse cx="110" cy="69" rx="22" ry="23" fill="#FDE2C8" stroke="#18181B" strokeWidth="2.8" />
    {/* Eyes & brows */}
    <circle cx="100" cy="61" r="2.3" fill="#18181B" />
    <circle cx="120" cy="61" r="2.3" fill="#18181B" />
    <path d="M94 54H104M116 54H126" stroke="#18181B" strokeWidth="2.2" strokeLinecap="round" />
    {/* Purple-accented P100 Respirator */}
    <path d="M93 74C93 70 101 68 110 68C119 68 127 70 127 74L123 93C115 98 105 98 97 93L93 74Z" fill="#3F3F46" stroke="#18181B" strokeWidth="2.6" />
    <circle cx="92" cy="84" r="9.5" fill="#A855F7" stroke="#18181B" strokeWidth="2.5" />
    <circle cx="128" cy="84" r="9.5" fill="#A855F7" stroke="#18181B" strokeWidth="2.5" />
    <circle cx="110" cy="86" r="5" fill="#E4E4E7" stroke="#18181B" strokeWidth="2" />

    {/* White Hard Hat */}
    <path d="M82 48C82 28 95 19 110 19C125 19 138 28 138 48H82Z" fill="#FFFFFF" stroke="#18181B" strokeWidth="3.2" strokeLinejoin="round" />
    <path d="M104 20V44M116 20V44" stroke="#94A3B8" strokeWidth="2.2" />
    <path d="M77 48C88 43 132 43 143 48C143 52 135 54 110 54C85 54 77 52 77 48Z" fill="#F1F5F9" stroke="#18181B" strokeWidth="3" />
  </svg>
);

export const ShortRotaryTechnicianSvg: React.FC<{ className?: string }> = ({ className = 'w-44 h-48' }) => (
  <svg viewBox="0 0 220 245" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    {/* Thumbs-up right arm */}
    <path d="M72 132L44 128L38 102L54 98L58 114L75 117" fill="#E5E7EB" stroke="#18181B" strokeWidth="3.2" strokeLinejoin="round" />
    <path d="M35 102C32 95 36 86 43 85V72C43 68 49 67 50 72L52 84H59C63 84 65 89 63 93L61 103C60 106 56 108 51 108H41C38 108 36 105 35 102Z" fill="#EAB308" stroke="#18181B" strokeWidth="3" strokeLinejoin="round" />
    {/* Left arm */}
    <path d="M150 122L182 148L166 174L144 162" fill="#E5E7EB" stroke="#18181B" strokeWidth="3.2" strokeLinejoin="round" />
    <circle cx="152" cy="170" r="10" fill="#EAB308" stroke="#18181B" strokeWidth="3" />

    {/* Legs */}
    <path d="M78 202L74 242H106L110 218L114 242H146L142 202H78Z" fill="#D1D5DB" stroke="#18181B" strokeWidth="3.2" strokeLinejoin="round" />

    {/* Heat-resistant aluminized jacket */}
    <path d="M72 114C72 104 86 98 110 98C134 98 148 104 148 114L146 202H74L72 114Z" fill="#F3F4F6" stroke="#18181B" strokeWidth="3.2" strokeLinejoin="round" />
    <path d="M110 100V202" stroke="#18181B" strokeWidth="2.8" />
    {/* Yellow Hi-Vis bands */}
    <rect x="75" y="158" width="70" height="10" fill="#FACC15" stroke="#18181B" strokeWidth="2.5" />
    <rect x="75" y="180" width="70" height="9" fill="#FACC15" stroke="#18181B" strokeWidth="2.5" />
    <rect x="85" y="120" width="18" height="22" rx="2" fill="#FDE047" stroke="#18181B" strokeWidth="2.4" />

    {/* Neck & Head */}
    <ellipse cx="110" cy="68" rx="25" ry="27" fill="#FDE2C8" stroke="#18181B" strokeWidth="3.2" />
    <circle cx="100" cy="66" r="2.2" fill="#18181B" />
    <circle cx="120" cy="66" r="2.2" fill="#18181B" />
    <path d="M101 80C106 85 114 85 119 80" stroke="#18181B" strokeWidth="2.6" strokeLinecap="round" />

    {/* Raised Gold Visor Shield */}
    <path d="M84 53H136L133 76C125 81 95 81 87 76L84 53Z" fill="#FEF08A" fillOpacity="0.45" stroke="#18181B" strokeWidth="2.4" />

    {/* Golden Yellow Hard Hat */}
    <path d="M82 50C82 30 95 20 110 20C125 20 138 30 138 50H82Z" fill="#FACC15" stroke="#18181B" strokeWidth="3.2" strokeLinejoin="round" />
    <path d="M104 21V46M116 21V46" stroke="#18181B" strokeWidth="2.4" />
    <path d="M77 50C88 45 132 45 143 50C143 54 135 56 110 56C85 56 77 54 77 50Z" fill="#EAB308" stroke="#18181B" strokeWidth="3" />
  </svg>
);

export const AreaTechnicianIllustration: React.FC<{ areaId: AreaId; className?: string }> = ({
  areaId,
  className,
}) => {
  switch (areaId) {
    case 'casa-fuerza':
      return <CasaFuerzaTechnicianSvg className={className} />;
    case 'zinc':
      return <ZincTechnicianSvg className={className} />;
    case 'anodicos':
      return <AnodicosTechnicianSvg className={className} />;
    case 'short-rotary':
      return <ShortRotaryTechnicianSvg className={className} />;
  }
};
