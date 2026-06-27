const COURSES = [
  { slug: 'btech-cse', name: 'B.Tech CSE' },
  { slug: 'btech-ai', name: 'B.Tech AI' },
  { slug: 'btech-ds', name: 'B.Tech DS' },
  { slug: 'btech-ml', name: 'B.Tech ML' },
  { slug: 'btech-it', name: 'B.Tech IT' },
  { slug: 'btech-ece', name: 'B.Tech ECE' },
  { slug: 'btech-ee', name: 'B.Tech EE' },
  { slug: 'btech-me', name: 'B.Tech ME' },
  { slug: 'bca', name: 'BCA' },
  { slug: 'bsc-cs', name: 'B.Sc CS' }
];

const SEMESTERS = [
  'semester-1', 'semester-2', 'semester-3', 'semester-4',
  'semester-5', 'semester-6', 'semester-7', 'semester-8'
];

const SUBJECTS = {
  'btech-cse': {
    'semester-1': ['programming-in-c', 'mathematics-i', 'physics', 'communication-skills', 'basic-electrical-engineering'],
    'semester-2': ['data-structures', 'mathematics-ii', 'chemistry', 'engineering-mechanics', 'environmental-studies'],
    'semester-3': ['object-oriented-programming', 'discrete-mathematics', 'digital-logic-design', 'computer-organization', 'operating-systems'],
    'semester-4': ['database-management-systems', 'design-analysis-of-algorithms', 'software-engineering', 'theory-of-computation', 'computer-networks'],
    'semester-5': ['artificial-intelligence', 'compiler-design', 'web-technologies', 'machine-learning-introduction', 'cyber-security'],
    'semester-6': ['deep-learning', 'cloud-computing', 'big-data-analytics', 'blockchain-technology', 'natural-language-processing'],
    'semester-7': ['distributed-systems', 'computer-vision', 'internet-of-things', 'software-project-management', 'computational-intelligence'],
    'semester-8': ['robotics', 'speech-processing', 'advanced-database-systems', 'ethics-in-ai', 'major-project']
  },
  'btech-ai': {
    'semester-1': ['programming-in-c', 'mathematics-i', 'physics', 'communication-skills', 'basic-electrical-engineering'],
    'semester-2': ['data-structures', 'mathematics-ii', 'chemistry', 'engineering-mechanics', 'environmental-studies'],
    'semester-3': ['object-oriented-programming', 'discrete-mathematics', 'digital-logic-design', 'computer-organization', 'operating-systems'],
    'semester-4': ['database-management-systems', 'design-analysis-of-algorithms', 'software-engineering', 'probability-statistics', 'computer-networks'],
    'semester-5': ['artificial-intelligence', 'knowledge-representation', 'machine-learning', 'natural-language-processing', 'cyber-security'],
    'semester-6': ['deep-learning', 'reinforcement-learning', 'computer-vision', 'robotics', 'speech-processing'],
    'semester-7': ['distributed-systems', 'multi-agent-systems', 'explainable-ai', 'software-project-management', 'computational-intelligence'],
    'semester-8': ['cognitive-science', 'ai-ethics', 'advanced-nlp', 'autonomous-systems', 'major-project']
  },
  'btech-ds': {
    'semester-1': ['programming-in-c', 'mathematics-i', 'physics', 'communication-skills', 'basic-electrical-engineering'],
    'semester-2': ['data-structures', 'mathematics-ii', 'chemistry', 'engineering-mechanics', 'environmental-studies'],
    'semester-3': ['object-oriented-programming', 'discrete-mathematics', 'digital-logic-design', 'computer-organization', 'operating-systems'],
    'semester-4': ['database-management-systems', 'design-analysis-of-algorithms', 'software-engineering', 'probability-statistics', 'computer-networks'],
    'semester-5': ['data-science-introduction', 'statistical-methods', 'machine-learning', 'big-data-analytics', 'data-visualization'],
    'semester-6': ['deep-learning', 'cloud-computing', 'data-warehousing-mining', 'time-series-analysis', 'natural-language-processing'],
    'semester-7': ['distributed-systems', 'computer-vision', 'business-intelligence', 'software-project-management', 'computational-intelligence'],
    'semester-8': ['data-engineering', 'ethics-in-data-science', 'advanced-database-systems', 'information-retrieval', 'major-project']
  },
  'btech-ml': {
    'semester-1': ['programming-in-c', 'mathematics-i', 'physics', 'communication-skills', 'basic-electrical-engineering'],
    'semester-2': ['data-structures', 'mathematics-ii', 'chemistry', 'engineering-mechanics', 'environmental-studies'],
    'semester-3': ['object-oriented-programming', 'discrete-mathematics', 'digital-logic-design', 'computer-organization', 'operating-systems'],
    'semester-4': ['database-management-systems', 'design-analysis-of-algorithms', 'software-engineering', 'probability-statistics', 'computer-networks'],
    'semester-5': ['machine-learning', 'artificial-intelligence', 'statistical-learning', 'big-data-analytics', 'cyber-security'],
    'semester-6': ['deep-learning', 'reinforcement-learning', 'natural-language-processing', 'computer-vision', 'cloud-computing'],
    'semester-7': ['distributed-systems', 'advanced-deep-learning', 'explainable-ml', 'software-project-management', 'computational-intelligence'],
    'semester-8': ['ml-ops', 'generative-ai', 'advanced-nlp', 'autonomous-systems', 'major-project']
  },
  'btech-it': {
    'semester-1': ['programming-in-c', 'mathematics-i', 'physics', 'communication-skills', 'basic-electrical-engineering'],
    'semester-2': ['data-structures', 'mathematics-ii', 'chemistry', 'engineering-mechanics', 'environmental-studies'],
    'semester-3': ['object-oriented-programming', 'discrete-mathematics', 'digital-logic-design', 'computer-organization', 'operating-systems'],
    'semester-4': ['database-management-systems', 'design-analysis-of-algorithms', 'software-engineering', 'probability-statistics', 'computer-networks'],
    'semester-5': ['web-technologies', 'cyber-security', 'cloud-computing', 'machine-learning-introduction', 'mobile-app-development'],
    'semester-6': ['deep-learning', 'blockchain-technology', 'big-data-analytics', 'natural-language-processing', 'software-testing'],
    'semester-7': ['distributed-systems', 'computer-vision', 'internet-of-things', 'software-project-management', 'computational-intelligence'],
    'semester-8': ['information-security', 'data-center-management', 'advanced-web-technologies', 'it-ethics', 'major-project']
  },
  'btech-ece': {
    'semester-1': ['programming-in-c', 'mathematics-i', 'physics', 'communication-skills', 'basic-electrical-engineering'],
    'semester-2': ['data-structures', 'mathematics-ii', 'chemistry', 'engineering-mechanics', 'environmental-studies'],
    'semester-3': ['electronic-devices-circuits', 'network-theory', 'digital-logic-design', 'signals-systems', 'electromagnetic-theory'],
    'semester-4': ['analog-circuits', 'digital-signal-processing', 'microprocessors', 'communication-systems', 'control-systems'],
    'semester-5': ['vlsi-design', 'embedded-systems', 'digital-communication', 'antenna-wave-propagation', 'power-electronics'],
    'semester-6': ['wireless-communication', 'optical-fiber-communication', 'cmos-design', 'sensors-transducers', 'internet-of-things'],
    'semester-7': ['radar-systems', 'satellite-communication', 'computer-networks', 'software-project-management', 'computational-intelligence'],
    'semester-8': ['advanced-communication-systems', 'nanoelectronics', 'biomedical-electronics', 'major-project', 'professional-ethics']
  },
  'btech-ee': {
    'semester-1': ['programming-in-c', 'mathematics-i', 'physics', 'communication-skills', 'basic-electrical-engineering'],
    'semester-2': ['data-structures', 'mathematics-ii', 'chemistry', 'engineering-mechanics', 'environmental-studies'],
    'semester-3': ['electrical-circuits', 'electromagnetic-fields', 'electrical-machines-i', 'network-theory', 'analog-electronics'],
    'semester-4': ['electrical-machines-ii', 'power-systems-i', 'control-systems', 'digital-electronics', 'measurements-instrumentation'],
    'semester-5': ['power-systems-ii', 'power-electronics', 'microprocessors', 'electrical-drives', 'renewable-energy-systems'],
    'semester-6': ['high-voltage-engineering', 'switchgear-protection', 'digital-signal-processing', 'smart-grids', 'energy-management'],
    'semester-7': ['power-system-operation-control', 'electric-vehicles', 'computer-networks', 'software-project-management', 'computational-intelligence'],
    'semester-8': ['advanced-power-systems', 'industrial-automation', 'electrical-engineering-design', 'major-project', 'professional-ethics']
  },
  'btech-me': {
    'semester-1': ['programming-in-c', 'mathematics-i', 'physics', 'communication-skills', 'basic-electrical-engineering'],
    'semester-2': ['data-structures', 'mathematics-ii', 'chemistry', 'engineering-mechanics', 'environmental-studies'],
    'semester-3': ['thermodynamics', 'fluid-mechanics', 'solid-mechanics', 'engineering-materials', 'manufacturing-processes'],
    'semester-4': ['heat-mass-transfer', 'machine-design', 'theory-of-machines', 'production-technology', 'metrology-quality-control'],
    'semester-5': ['automobile-engineering', 'cad-cam', 'robotics', 'ic-engines', 'refrigeration-air-conditioning'],
    'semester-6': ['finite-element-analysis', 'mechatronics', 'hydraulics-pneumatics', 'composite-materials', 'energy-engineering'],
    'semester-7': ['additive-manufacturing', 'industrial-engineering', 'automation-robotics', 'software-project-management', 'computational-intelligence'],
    'semester-8': ['electric-vehicles', 'nuclear-engineering', 'mechanical-vibrations', 'major-project', 'professional-ethics']
  },
  'bca': {
    'semester-1': ['programming-in-c', 'mathematics-i', 'computer-fundamentals', 'communication-skills', 'accounting-basics'],
    'semester-2': ['data-structures', 'mathematics-ii', 'digital-logic-design', 'object-oriented-programming', 'environmental-studies'],
    'semester-3': ['database-management-systems', 'operating-systems', 'computer-networks', 'software-engineering', 'web-technologies'],
    'semester-4': ['design-analysis-of-algorithms', 'java-programming', 'python-programming', 'cyber-security', 'data-analytics'],
    'semester-5': ['artificial-intelligence', 'cloud-computing', 'machine-learning', 'mobile-app-development', 'blockchain-technology'],
    'semester-6': ['deep-learning', 'big-data-analytics', 'internet-of-things', 'natural-language-processing', 'major-project']
  },
  'bsc-cs': {
    'semester-1': ['programming-in-c', 'mathematics-i', 'physics', 'communication-skills', 'computer-fundamentals'],
    'semester-2': ['data-structures', 'mathematics-ii', 'chemistry', 'object-oriented-programming', 'environmental-studies'],
    'semester-3': ['database-management-systems', 'discrete-mathematics', 'operating-systems', 'digital-logic-design', 'computer-networks'],
    'semester-4': ['design-analysis-of-algorithms', 'software-engineering', 'java-programming', 'python-programming', 'web-technologies'],
    'semester-5': ['artificial-intelligence', 'cloud-computing', 'machine-learning', 'cyber-security', 'data-analytics'],
    'semester-6': ['deep-learning', 'big-data-analytics', 'blockchain-technology', 'natural-language-processing', 'major-project']
  }
};

import { SITE_URL } from './config'

function getLastMod() {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

function xmlUrl(loc, changefreq, priority, lastmod) {
  return `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <lastmod>${lastmod}</lastmod>
  </url>`;
}

export function generateSitemapXml() {
  const lastmod = getLastMod();
  const urls = [];
  const base = SITE_URL

  // Home
  urls.push(xmlUrl(base, 'weekly', '1.0', lastmod));

  // Static pages
  const staticPages = [
    { loc: `${base}/courses`, freq: 'weekly', priority: '0.9' },
    { loc: `${base}/search`, freq: 'monthly', priority: '0.5' },
    { loc: `${base}/about`, freq: 'monthly', priority: '0.5' },
    { loc: `${base}/contact`, freq: 'monthly', priority: '0.5' }
  ];

  staticPages.forEach((page) => {
    urls.push(xmlUrl(page.loc, page.freq, page.priority, lastmod));
  });

  // Course pages
  COURSES.forEach((course) => {
    const courseUrl = `${base}/course/${course.slug}`;
    urls.push(xmlUrl(courseUrl, 'weekly', '0.9', lastmod));

    // Semester pages
    SEMESTERS.forEach((semester) => {
      const semesterUrl = `${base}/course/${course.slug}/${semester}`;
      urls.push(xmlUrl(semesterUrl, 'weekly', '0.8', lastmod));

      // Subject pages
      const courseSubjects = SUBJECTS[course.slug];
      if (courseSubjects) {
        const subjects = courseSubjects[semester];
        if (subjects) {
          subjects.forEach((subject) => {
            const subjectUrl = `${base}/course/${course.slug}/${semester}/${subject}`;
            urls.push(xmlUrl(subjectUrl, 'weekly', '0.7', lastmod));
          });
        }
      }
    });
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.join('\n')}
</urlset>`;
}
