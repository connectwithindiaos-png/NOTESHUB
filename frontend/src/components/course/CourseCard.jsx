import { Link } from 'react-router-dom';
import { getCourseIcon } from '../../utils/icons';

export default function CourseCard({ course }) {
  const { name, fullName, slug, description, color, bgColor, duration, totalSubjects } = course;

  return (
    <article className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div
        className="absolute inset-0 opacity-10 dark:opacity-20 transition-opacity group-hover:opacity-20 dark:group-hover:opacity-30"
        style={{ background: `linear-gradient(135deg, ${color}20, ${color}40)` }}
        aria-hidden="true"
      />
      <div
        className="relative h-full p-6 rounded-2xl border border-gray-200 dark:border-gray-700"
        style={{ backgroundColor: bgColor }}
      >
        <div className="flex items-start gap-4 mb-4">
          <span
            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${color}20` }}
            role="img"
            aria-label={`${name} icon`}
          >
            {getCourseIcon(slug)}
          </span>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
              {name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
              {fullName}
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center gap-4 mb-5">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>{totalSubjects} Subjects</span>
          </div>
        </div>

        <Link
          to={`/course/${slug}`}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{ backgroundColor: color }}
          onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
          aria-label={`View ${name} notes`}
        >
          View Notes
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
