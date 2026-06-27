export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NotesHub',
    url: 'https://noteshub.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://noteshub.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NotesHub',
    description: 'Free engineering and college notes platform',
    url: 'https://noteshub.com',
    logo: 'https://noteshub.com/logo.webp',
    sameAs: [
      'https://twitter.com/noteshub',
      'https://facebook.com/noteshub'
    ]
  };
}

export function getSearchActionSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SearchAction',
    target: 'https://noteshub.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  };
}

export function getBreadcrumbSchema(items) {
  if (!items || items.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function getArticleSchema({ title, description, url, image, datePublished, author }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    image,
    datePublished,
    author: {
      '@type': 'Person',
      name: author || 'NotesHub'
    },
    publisher: {
      '@type': 'Organization',
      name: 'NotesHub',
      logo: {
        '@type': 'ImageObject',
        url: 'https://noteshub.com/logo.webp'
      }
    }
  };

  return schema;
}

export function getFAQSchema(questions) {
  if (!questions || questions.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer
      }
    }))
  };
}

export function getCourseSchema({ name, description, provider }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider || 'NotesHub',
      sameAs: 'https://noteshub.com'
    }
  };
}
