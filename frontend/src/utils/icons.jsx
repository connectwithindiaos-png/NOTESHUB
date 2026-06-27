const icons = {
  'btech-cse': (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="8" y="6" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <rect x="12" y="10" width="16" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <line x1="14" y1="14" x2="18" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="14" y1="18" x2="16" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8" y1="28" x2="32" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="16" y1="28" x2="16" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="24" y1="28" x2="24" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="12" y1="34" x2="28" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  'btech-ai': (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="20" cy="14" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M14 26 L18 20 L22 20 L26 26" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
      <line x1="20" y1="20" x2="20" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="20" cy="28" r="2" fill="currentColor"/>
      <path d="M8 10 Q20 2 32 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4"/>
      <path d="M10 30 Q20 38 30 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4"/>
    </svg>
  ),
  'btech-ds': (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="6" y="6" width="12" height="28" rx="2" fill="currentColor" opacity="0.3"/>
      <rect x="22" y="12" width="12" height="22" rx="2" fill="currentColor" opacity="0.5"/>
      <rect x="6" y="6" width="12" height="28" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="22" y="12" width="12" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <line x1="14" y1="6" x2="14" y2="34" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <line x1="28" y1="12" x2="28" y2="34" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <circle cx="14" cy="10" r="1.5" fill="currentColor"/>
      <circle cx="28" cy="16" r="1.5" fill="currentColor"/>
      <circle cx="14" cy="20" r="1.5" fill="currentColor"/>
      <circle cx="28" cy="26" r="1.5" fill="currentColor"/>
    </svg>
  ),
  'btech-ml': (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="28" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="20" cy="28" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <line x1="16" y1="15" x2="18" y2="25" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
      <line x1="24" y1="15" x2="22" y2="25" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
      <circle cx="28" cy="12" r="1.5" fill="currentColor"/>
      <circle cx="20" cy="28" r="1.5" fill="currentColor"/>
    </svg>
  ),
  'btech-it': (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="20" cy="20" r="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <line x1="20" y1="8" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20" y1="28" x2="20" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8" y1="20" x2="12" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="28" y1="20" x2="32" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="12" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
      <line x1="25" y1="25" x2="28" y2="28" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
      <line x1="28" y1="12" x2="25" y2="15" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
      <line x1="15" y1="25" x2="12" y2="28" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
    </svg>
  ),
  'btech-ece': (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M8 20 L14 14 L14 26 L8 20 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      <path d="M32 20 L26 14 L26 26 L32 20 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      <line x1="14" y1="20" x2="26" y2="20" stroke="currentColor" strokeWidth="2"/>
      <circle cx="20" cy="20" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <line x1="17" y1="23" x2="14" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      <line x1="23" y1="23" x2="26" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    </svg>
  ),
  'btech-ee': (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <line x1="20" y1="6" x2="20" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="20" y1="24" x2="20" y2="34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M14 16 L20 10 L26 16" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
      <path d="M14 24 L20 30 L26 24" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
      <line x1="10" y1="20" x2="14" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="26" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="20" cy="20" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  'btech-me': (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="20" cy="20" r="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M12 12 L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      <path d="M28 12 L24 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      <path d="M12 28 L16 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      <path d="M28 28 L24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      <circle cx="20" cy="20" r="1.5" fill="currentColor"/>
    </svg>
  ),
  'bca': (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="6" y="8" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <rect x="10" y="12" width="20" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <line x1="14" y1="30" x2="26" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="18" y1="34" x2="22" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="14" y1="16" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="22" y1="20" x2="26" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  'bsc-cs': (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="8" y="10" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <line x1="12" y1="16" x2="28" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="24" x2="18" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M28 18 L32 14 L32 26 Z" fill="currentColor" opacity="0.3"/>
      <circle cx="30" cy="20" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  'mca': (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="6" y="8" width="28" height="24" rx="3" stroke="currentColor" strokeWidth="2" fill="none"/>
      <line x1="14" y1="14" x2="26" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="14" y1="20" x2="26" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="14" y1="26" x2="22" y2="26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M28 18 L32 16 L32 28 L28 26 Z" fill="currentColor" opacity="0.3"/>
    </svg>
  ),
  'bba': (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="6" y="12" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <line x1="20" y1="6" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="12" y1="18" x2="28" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="24" x2="24" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="28" r="1" fill="currentColor"/>
      <circle cx="18" cy="28" r="1" fill="currentColor"/>
      <circle cx="24" cy="28" r="1" fill="currentColor"/>
    </svg>
  ),
  'mba': (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M8 30 L8 14 L20 6 L32 14 L32 30" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
      <line x1="14" y1="30" x2="14" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="20" y1="30" x2="20" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="26" y1="30" x2="26" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="6" y1="30" x2="34" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  'bcom': (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="6" y="8" width="28" height="24" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <line x1="20" y1="14" x2="20" y2="26" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="14" y1="20" x2="26" y2="20" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M14 16 Q20 18 26 16" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4"/>
      <path d="M14 24 Q20 22 26 24" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4"/>
    </svg>
  ),
  'ba': (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M20 6 L6 12 L20 18 L34 12 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
      <path d="M6 18 L20 24 L34 18" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
      <path d="M6 24 L20 30 L34 24" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
      <path d="M20 18 L20 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="20" cy="34" r="2" fill="currentColor" opacity="0.5"/>
    </svg>
  ),
}

export function getCourseIcon(slug) {
  return icons[slug] || icons['btech-cse']
}

export function getIconViewBox(slug) {
  return '0 0 40 40'
}
