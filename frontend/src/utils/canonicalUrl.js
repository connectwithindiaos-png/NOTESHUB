const BASE_URL = 'https://noteshub.com';

export function getCanonicalUrl(path) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${cleanPath}`;
}

export function getCourseUrl(courseSlug) {
  return `/course/${courseSlug}`;
}

export function getSemesterUrl(courseSlug, semesterSlug) {
  return `/course/${courseSlug}/${semesterSlug}`;
}

export function getSubjectUrl(courseSlug, semesterSlug, subjectSlug) {
  return `/course/${courseSlug}/${semesterSlug}/${subjectSlug}`;
}

export function getNoteUrl(noteSlug) {
  return `/note/${noteSlug}`;
}

export { BASE_URL };
