import { Link } from 'react-router-dom';

export default function SubjectCard({ subject, courseSlug, semesterSlug }) {
  return (
    <Link
      to={`/course/${courseSlug}/${semesterSlug}/${subject.slug || subject.id}`}
      className="group block p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label={`${subject.name} - ${subject.code || ''}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 min-w-0">
          {subject.icon && (
            <span
              className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-lg"
              role="img"
              aria-label={`${subject.name} icon`}
            >
              {subject.icon}
            </span>
          )}
          <div className="min-w-0">
            <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">
              {subject.name}
            </h3>
            {subject.code && (
              <span className="inline-block mt-0.5 px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md">
                {subject.code}
              </span>
            )}
          </div>
        </div>
        <svg
          className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {subject.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {subject.description}
        </p>
      )}

      {subject.topics && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {subject.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="px-2 py-0.5 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-md"
            >
              {topic}
            </span>
          ))}
          {subject.topics.length > 3 && (
            <span className="px-2 py-0.5 text-xs text-gray-400 dark:text-gray-500">
              +{subject.topics.length - 3} more
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
