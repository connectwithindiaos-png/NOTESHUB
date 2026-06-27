export const universities = [
  { id: 'makaut', name: 'MAKAUT', fullName: 'Maulana Abul Kalam Azad University of Technology', short: 'MAKAUT', image: '/images/universities/makaut-logo.png' },
  { id: 'ju', name: 'JU', fullName: 'Jadavpur University', short: 'JU', image: '/images/universities/ju-logo.png' },
  { id: 'cu', name: 'CU', fullName: 'University of Calcutta', short: 'CU', image: '/images/universities/cu-logo.jpg' },
  { id: 'iitkgp', name: 'IIT KGP', fullName: 'Indian Institute of Technology Kharagpur', short: 'IIT KGP', image: '/images/universities/iitkgp-logo.png' },
  { id: 'nitdgp', name: 'NIT DGP', fullName: 'National Institute of Technology Durgapur', short: 'NIT DGP', image: '/images/universities/nitdgp-logo.png' },
  { id: 'iiest', name: 'IIEST', fullName: 'Indian Institute of Engineering Science and Technology Shibpur', short: 'IIEST', image: '/images/universities/iiest-logo.png' },
  { id: 'knu', name: 'KNU', fullName: 'University of Kalyani', short: 'KNU', image: '/images/universities/knu-logo.png' },
  { id: 'vu', name: 'VU', fullName: 'Vidyasagar University', short: 'VU', image: '/images/universities/vu-logo.jpg' },
  { id: 'bu', name: 'BU', fullName: 'The University of Burdwan', short: 'BU', image: '/images/universities/bu-logo.png' },
]

export function getUniversityById(id) {
  return universities.find(u => u.id === id) || null
}
