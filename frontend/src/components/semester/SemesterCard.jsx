import { Link } from 'react-router-dom';

export default function SemesterCard({ semester, courseSlug, index }) {
  const semesterNumber = index + 1;
  const semesterSlug = `semester-${semesterNumber}`;

  return (
    <Link
      to={`/course/${courseSlug}/${semesterSlug}`}
      className="group block p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label={`Semester ${semesterNumber}: ${semester.title || `Semester ${semesterNumber}`}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold"
          aria-hidden="true"
        >
          {semesterNumber}
        </span>
        <svg
          className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors -translate-x-1 group-hover:translate-x-0 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
        Semester {semesterNumber}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        {semester?.title || `Semester ${semesterNumber} subjects and notes`}
      </p>

      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span>{semester?.totalSubjects || 'Multiple'} Subjects</span>
      </div>
    </Link>
  );
}
