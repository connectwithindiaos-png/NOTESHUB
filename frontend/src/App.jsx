import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/layout/Layout'
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/admin/ProtectedRoute'

const HomePage = lazy(() => import('./pages/HomePage'))
const CoursesPage = lazy(() => import('./pages/CoursesPage'))
const CoursePage = lazy(() => import('./pages/CoursePage'))
const SemesterPage = lazy(() => import('./pages/SemesterPage'))
const SubjectPage = lazy(() => import('./pages/SubjectPage'))
const NotePage = lazy(() => import('./pages/NotePage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const FAQPage = lazy(() => import('./pages/FAQPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

// Admin pages
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminCourses = lazy(() => import('./pages/admin/AdminCourses'))
const AdminSemesters = lazy(() => import('./pages/admin/AdminSemesters'))
const AdminSubjects = lazy(() => import('./pages/admin/AdminSubjects'))
const AdminNotes = lazy(() => import('./pages/admin/AdminNotes'))
const AdminPYQs = lazy(() => import('./pages/admin/AdminPYQs'))
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'))

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '12px',
            fontFamily: '"DM Mono", monospace',
            fontSize: '13px',
            padding: '12px 16px',
          },
          success: {
            iconTheme: { primary: '#10b981', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
          },
        }}
      />
      <div className="grain-overlay" aria-hidden="true" />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/course/:courseSlug" element={<CoursePage />} />
          <Route path="/course/:courseSlug/:semesterSlug" element={<SemesterPage />} />
          <Route path="/course/:courseSlug/:semesterSlug/:subjectSlug" element={<SubjectPage />} />
          <Route path="/note/:noteSlug" element={<NotePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/semesters" element={<AdminSemesters />} />
          <Route path="/admin/subjects" element={<AdminSubjects />} />
          <Route path="/admin/notes" element={<AdminNotes />} />
          <Route path="/admin/pyqs" element={<AdminPYQs />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </>
  )
}
