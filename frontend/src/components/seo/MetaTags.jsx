import { Helmet } from 'react-helmet-async';

export default function MetaTags({ title, description, keywords, canonical, ogImage, ogType = 'website', twitterCard = 'summary_large_image', children }) {
  const siteName = 'NotesHub';
  const fullTitle = title?.includes('NotesHub') ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@noteshub" />

      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />

      <link rel="alternate" hrefLang="en" href={canonical} />
      <link rel="alternate" hrefLang="hi" href={`${canonical}?lang=hi`} />
      <link rel="alternate" hrefLang="bn" href={`${canonical}?lang=bn`} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />

      {children}
    </Helmet>
  );
}
