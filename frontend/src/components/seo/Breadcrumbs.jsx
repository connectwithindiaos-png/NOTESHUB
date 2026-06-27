import { Link } from 'react-router-dom';
import { getBreadcrumbSchema } from '../../utils/schema';
import { SITE_URL } from '../../utils/config';
import SchemaMarkup from './SchemaMarkup';

export default function Breadcrumbs({ items }) {
  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    ...items
  ];

  const schema = getBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <SchemaMarkup schemas={[schema]} />
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600" itemScope itemType="https://schema.org/BreadcrumbList">
            {breadcrumbItems.map((item, index) => (
              <li key={index} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                {index > 0 && (
                  <svg className="w-4 h-4 mx-1 inline text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                <meta itemProp="position" content={String(index + 1)} />
                {index < breadcrumbItems.length - 1 ? (
                  <Link to={item.url.replace(SITE_URL, '') || '/'} itemProp="item" className="hover:text-blue-600 transition-colors">
                    <span itemProp="name">{item.name}</span>
                  </Link>
                ) : (
                  <span itemProp="name" className="text-gray-900 font-medium" aria-current="page">{item.name}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
