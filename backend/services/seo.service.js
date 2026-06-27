const db = require('../config/database');
const config = require('../config');

class SEOService {
  async generateSitemap() {
    const baseUrl = config.siteUrl;
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    xml += `  <url><loc>${baseUrl}</loc><priority>1.0</priority></url>\n`;
    xml += `  <url><loc>${baseUrl}/courses</loc><priority>0.9</priority></url>\n`;

    const courses = await db.query('SELECT slug, updated_at FROM courses WHERE is_active = true');
    for (const course of courses.rows) {
      const lastmod = course.updated_at ? new Date(course.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      xml += `  <url><loc>${baseUrl}/courses/${course.slug}</loc><lastmod>${lastmod}</lastmod><priority>0.8</priority></url>\n`;
    }

    const semesters = await db.query(
      'SELECT sem.slug as sem_slug, c.slug as course_slug, sem.updated_at FROM semesters sem JOIN courses c ON sem.course_id = c.id WHERE sem.is_active = true AND c.is_active = true'
    );
    for (const sem of semesters.rows) {
      const lastmod = sem.updated_at ? new Date(sem.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      xml += `  <url><loc>${baseUrl}/courses/${sem.course_slug}/${sem.sem_slug}</loc><lastmod>${lastmod}</lastmod><priority>0.7</priority></url>\n`;
    }

    const subjects = await db.query(
      'SELECT sub.slug as sub_slug, sem.slug as sem_slug, c.slug as course_slug, sub.updated_at FROM subjects sub JOIN semesters sem ON sub.semester_id = sem.id JOIN courses c ON sub.course_id = c.id WHERE sub.is_active = true AND sem.is_active = true AND c.is_active = true'
    );
    for (const sub of subjects.rows) {
      const lastmod = sub.updated_at ? new Date(sub.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      xml += `  <url><loc>${baseUrl}/courses/${sub.course_slug}/${sub.sem_slug}/${sub.sub_slug}</loc><lastmod>${lastmod}</lastmod><priority>0.6</priority></url>\n`;
    }

    const notes = await db.query('SELECT slug, updated_at FROM notes WHERE is_active = true');
    for (const note of notes.rows) {
      const lastmod = note.updated_at ? new Date(note.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      xml += `  <url><loc>${baseUrl}/notes/${note.slug}</loc><lastmod>${lastmod}</lastmod><priority>0.5</priority></url>\n`;
    }

    xml += '</urlset>';
    return xml;
  }

  generateRobotsTxt() {
    const baseUrl = config.siteUrl;
    return `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /auth/

Sitemap: ${baseUrl}/api/v1/seo/sitemap.xml
`;
  }

  async generateCourseStructuredData(slug) {
    const course = await db.query('SELECT * FROM courses WHERE slug = $1', [slug]);
    if (!course.rows[0]) return null;
    const c = course.rows[0];
    return {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: c.full_name || c.name,
      description: c.description || '',
      provider: {
        '@type': 'EducationalOrganization',
        name: 'Notes Hub',
      },
      numberOfCredits: c.total_subjects,
      totalSemesters: c.total_semesters,
      duration: c.duration,
    };
  }

  async generateNoteStructuredData(slug) {
    const note = await db.query(
      `SELECT n.*, s.name as subject_name, c.name as course_name
       FROM notes n
       LEFT JOIN subjects s ON n.subject_id = s.id
       LEFT JOIN courses c ON n.course_id = c.id
       WHERE n.slug = $1`,
      [slug]
    );
    if (!note.rows[0]) return null;
    const n = note.rows[0];
    return {
      '@context': 'https://schema.org',
      '@type': 'DigitalDocument',
      name: n.title,
      description: n.description || '',
      author: n.author_name ? { '@type': 'Person', name: n.author_name } : undefined,
      about: {
        '@type': 'Course',
        name: n.course_name,
      },
      learningResourceType: n.file_type || 'Note',
      dateCreated: n.created_at,
      dateModified: n.updated_at,
    };
  }

  async generateBreadcrumbs(items) {
    const baseUrl = config.siteUrl;
    const itemListElement = items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? (item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`) : undefined,
    }));
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement,
    };
  }

  async generatePageMetadata(type, slug) {
    switch (type) {
      case 'course': {
        const course = await db.query('SELECT * FROM courses WHERE slug = $1', [slug]);
        if (!course.rows[0]) return null;
        const c = course.rows[0];
        return {
          title: `${c.full_name || c.name} - Notes Hub`,
          description: c.description || `Study materials for ${c.name}`,
          keywords: c.keywords || `${c.name}, notes, study materials`,
          ogImage: c.icon ? undefined : undefined,
        };
      }
      case 'note': {
        const note = await db.query('SELECT * FROM notes WHERE slug = $1', [slug]);
        if (!note.rows[0]) return null;
        const n = note.rows[0];
        return {
          title: `${n.title} - Notes Hub`,
          description: n.description || `Download ${n.title} notes`,
          keywords: `${n.title}, notes, study material`,
          ogImage: n.thumbnail_url,
        };
      }
      default:
        return null;
    }
  }
}

module.exports = new SEOService();
