import { API_URL } from './config'
const API_BASE = API_URL

const KEY_MAP = {
  download_count: 'downloads',
  view_count: 'views',
  created_at: 'datePublished',
  thumbnail_url: 'thumbnail',
  author_name: 'author',
  drive_url: 'fileUrl',
}

function toCamel(str) {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
}

function transformKeys(obj) {
  if (Array.isArray(obj)) return obj.map(transformKeys)
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [KEY_MAP[k] || toCamel(k), transformKeys(v)])
    )
  }
  return obj
}

function getToken() {
  return localStorage.getItem('noteshub-token')
}

async function fetchJSON(endpoint, options = {}) {
  const headers = { ...options.headers }
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `API ${res.status}: ${res.statusText}`)
  }
  const body = await res.json()
  return body && body.data !== undefined ? transformKeys(body.data) : transformKeys(body)
}

// Auth
export function login(email, password) {
  return fetchJSON('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
}

export function register(data) {
  return fetchJSON('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function fetchProfile() {
  return fetchJSON('/auth/profile')
}

export function updateProfile(data) {
  return fetchJSON('/auth/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

// Courses
export function fetchCourses() {
  return fetchJSON('/courses')
}

export function fetchCourseBySlug(slug) {
  return fetchJSON(`/courses/${slug}`)
}

// Semesters
export function fetchSemesters(courseSlug) {
  return fetchJSON(`/semesters/course/${courseSlug}`)
}

export function fetchSemesterBySlug(courseSlug, semesterSlug) {
  return fetchJSON(`/semesters/course/${courseSlug}/${semesterSlug}`)
}

// Subjects (resolver-based)
export function fetchSubjects(courseSlug, semesterNumber) {
  return fetchJSON(`/resolve/subjects/${courseSlug}/${semesterNumber}`)
}

export function fetchSubjectBySlug(courseSlug, semesterNumber, subjectSlug) {
  return fetchSubjects(courseSlug, semesterNumber).then(
    subjects => subjects.find(s => s.slug === subjectSlug) || null
  )
}

// Notes / PYQs / Syllabus / Organiser (resolver-based)
export function fetchNotes(courseSlug, semesterNumber, subjectSlug) {
  return fetchJSON(`/resolve/notes/${courseSlug}/${semesterNumber}/${subjectSlug}`)
}

export function fetchPYQs(courseSlug, semesterNumber, subjectSlug) {
  return fetchJSON(`/resolve/pyqs/${courseSlug}/${semesterNumber}/${subjectSlug}`)
}

export function fetchSyllabus(courseSlug, semesterNumber, subjectSlug) {
  return fetchJSON(`/resolve/syllabus/${courseSlug}/${semesterNumber}/${subjectSlug}`)
}

export function fetchOrganiser(courseSlug, semesterNumber, subjectSlug) {
  return fetchJSON(`/resolve/organiser/${courseSlug}/${semesterNumber}/${subjectSlug}`)
}

export function fetchNoteDetail(noteSlug) {
  return fetchJSON(`/notes/${noteSlug}`)
}

// Search
export function searchContent(query) {
  return fetchJSON(`/resolve/search/${encodeURIComponent(query)}`)
}

// Admin
export function adminLogin(email, password) {
  return fetchJSON('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
}

export function fetchAdminDashboard() {
  return fetchJSON('/admin/dashboard')
}

export function fetchAdminCourses() {
  return fetchJSON('/admin/courses')
}

export function fetchAdminSemesters() {
  return fetchJSON('/admin/semesters')
}

export function fetchAdminSubjects() {
  return fetchJSON('/admin/subjects')
}

export function fetchAdminNotes(page = 1, limit = 20) {
  return fetchJSON(`/admin/notes?page=${page}&limit=${limit}`)
}

export function fetchAdminPYQs(page = 1, limit = 20) {
  return fetchJSON(`/admin/notes?page=${page}&limit=${limit}&category=pyq`)
}

export function deleteAdminNote(id) {
  return fetchJSON(`/admin/notes/${id}`, { method: 'DELETE' })
}

export function createCourse(data) {
  return fetchJSON('/courses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function updateCourse(slug, data) {
  return fetchJSON(`/courses/${slug}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function deleteCourse(slug) {
  return fetchJSON(`/courses/${slug}`, { method: 'DELETE' })
}

export function createSemester(data) {
  return fetchJSON('/semesters', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function updateSemester(id, data) {
  return fetchJSON(`/semesters/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function deleteSemester(id) {
  return fetchJSON(`/semesters/${id}`, { method: 'DELETE' })
}

export function createSubject(data) {
  return fetchJSON('/subjects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function updateSubject(id, data) {
  return fetchJSON(`/subjects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function deleteSubject(id) {
  return fetchJSON(`/subjects/${id}`, { method: 'DELETE' })
}

export function createNote(data) {
  return fetchJSON('/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function updateNote(id, data) {
  return fetchJSON(`/notes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function deleteNote(id) {
  return fetchJSON(`/notes/${id}`, { method: 'DELETE' })
}

// Settings
export function fetchPublicSettings() {
  return fetchJSON('/settings/public')
}

export function fetchSettings() {
  return fetchJSON('/settings')
}

export function updateSettings(data) {
  return fetchJSON('/settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

// Change password
export function changePassword(data) {
  return fetchJSON('/auth/change-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}
