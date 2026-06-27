import { Helmet } from 'react-helmet-async';

export default function SchemaMarkup({ schemas }) {
  if (!schemas || schemas.length === 0) return null;

  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
