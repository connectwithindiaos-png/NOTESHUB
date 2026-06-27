require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');

const courses = [
  {
    name: 'B.Tech CSE', fullName: 'B.Tech Computer Science Engineering',
    slug: 'btech-cse', description: 'Core computer science program covering algorithms, systems, and software engineering',
    longDescription: 'B.Tech Computer Science Engineering (CSE) is a comprehensive program that covers the fundamental principles of computing, including algorithms, data structures, programming languages, software engineering, operating systems, databases, computer networks, and emerging technologies like AI, ML, and cloud computing.',
    icon: 'GraduationCap', color: '#4F46E5', bgColor: '#EEF2FF', duration: '4 Years', totalSemesters: 8, totalSubjects: 48,
    keywords: 'B.Tech CSE, computer science engineering, software engineering, programming',
    brochurePoints: [
      '8 semesters of rigorous CS education', 'Hands-on programming and software development',
      'Industry-aligned curriculum with emerging tech', 'Expert faculty from top institutions',
      'Research and innovation opportunities', 'Placement assistance in top tech companies'
    ]
  },
  {
    name: 'B.Tech AI', fullName: 'B.Tech Artificial Intelligence',
    slug: 'btech-ai', description: 'Specialized AI program focusing on ML, deep learning, and intelligent systems',
    longDescription: 'B.Tech Artificial Intelligence (AI) is a specialized program that focuses on the theory and application of intelligent systems, covering machine learning, deep learning, natural language processing, computer vision, reinforcement learning, and ethical AI practices.',
    icon: 'Bot', color: '#7C3AED', bgColor: '#F5F3FF', duration: '4 Years', totalSemesters: 8, totalSubjects: 47,
    keywords: 'B.Tech AI, artificial intelligence, machine learning, deep learning',
    brochurePoints: [
      '8 semesters of AI-focused education', 'Hands-on ML and deep learning projects',
      'Access to GPU computing resources', 'Industry partnerships with AI companies',
      'Research opportunities in cutting-edge AI', 'Placement in AI and data science roles'
    ]
  },
  {
    name: 'B.Tech DS', fullName: 'B.Tech Data Science',
    slug: 'btech-ds', description: 'Data science program covering statistics, big data, ML, and data engineering',
    longDescription: 'B.Tech Data Science (DS) combines statistics, computer science, and domain knowledge to extract insights from data. Students learn data collection, processing, analysis, visualization, and machine learning at scale.',
    icon: 'BarChart3', color: '#059669', bgColor: '#ECFDF5', duration: '4 Years', totalSemesters: 8, totalSubjects: 47,
    keywords: 'B.Tech DS, data science, big data, analytics, machine learning',
    brochurePoints: [
      '8 semesters of data science education', 'Training in big data technologies',
      'Statistical modeling and ML expertise', 'Industry projects with real datasets',
      'Data visualization and storytelling', 'Placement in analytics and data roles'
    ]
  },
  {
    name: 'B.Tech ML', fullName: 'B.Tech Machine Learning',
    slug: 'btech-ml', description: 'Intensive ML program covering deep learning, neural networks, and AI systems',
    longDescription: 'B.Tech Machine Learning (ML) is a specialized program focused on the theory and practice of machine learning, covering supervised and unsupervised learning, neural networks, deep learning, reinforcement learning, and ML system design.',
    icon: 'BrainCircuit', color: '#DC2626', bgColor: '#FEF2F2', duration: '4 Years', totalSemesters: 8, totalSubjects: 47,
    keywords: 'B.Tech ML, machine learning, deep learning, neural networks, AI',
    brochurePoints: [
      '8 semesters of ML-intensive curriculum', 'Deep learning and neural networks focus',
      'Reinforcement learning and advanced topics', 'MLOps and production deployment skills',
      'Research opportunities in ML', 'Placement in ML engineering roles'
    ]
  },
  {
    name: 'B.Tech IT', fullName: 'B.Tech Information Technology',
    slug: 'btech-it', description: 'IT program covering web, mobile, cloud, cybersecurity, and enterprise systems',
    longDescription: 'B.Tech Information Technology (IT) prepares graduates for careers in the IT industry with curriculum covering web development, mobile applications, cloud computing, databases, cybersecurity, DevOps, and enterprise software.',
    icon: 'Monitor', color: '#D97706', bgColor: '#FFFBEB', duration: '4 Years', totalSemesters: 8, totalSubjects: 47,
    keywords: 'B.Tech IT, information technology, web development, cloud computing',
    brochurePoints: [
      '8 semesters of IT-focused education', 'Full-stack web and mobile development',
      'Cloud computing and DevOps skills', 'Cybersecurity and network expertise',
      'Industry projects and internships', 'Placement in IT services and product companies'
    ]
  },
  {
    name: 'B.Tech ECE', fullName: 'B.Tech Electronics & Communication Engineering',
    slug: 'btech-ece', description: 'ECE program covering electronics, communication, VLSI, and embedded systems',
    longDescription: 'B.Tech Electronics and Communication Engineering (ECE) covers analog and digital electronics, communication systems, signal processing, VLSI design, embedded systems, and emerging areas like IoT and wireless communication.',
    icon: 'Cpu', color: '#0891B2', bgColor: '#ECFEFF', duration: '4 Years', totalSemesters: 8, totalSubjects: 46,
    keywords: 'B.Tech ECE, electronics, communication engineering, VLSI, embedded systems',
    brochurePoints: [
      '8 semesters of electronics education', 'Analog and digital circuit design',
      'Communication systems and signal processing', 'VLSI and embedded systems labs',
      'Industry-oriented curriculum', 'Placement in electronics and IT sectors'
    ]
  },
  {
    name: 'B.Tech EE', fullName: 'B.Tech Electrical Engineering',
    slug: 'btech-ee', description: 'Electrical engineering program covering power, machines, control, and renewable energy',
    longDescription: 'B.Tech Electrical Engineering (EE) provides comprehensive knowledge of electrical power systems, electrical machines, control systems, power electronics, renewable energy, and smart grid technologies.',
    icon: 'Zap', color: '#EAB308', bgColor: '#FEFCE8', duration: '4 Years', totalSemesters: 8, totalSubjects: 46,
    keywords: 'B.Tech EE, electrical engineering, power systems, machines, renewable energy',
    brochurePoints: [
      '8 semesters of electrical engineering', 'Power systems and electrical machines',
      'Control systems and instrumentation', 'Renewable energy and smart grid',
      'Industry collaboration and labs', 'Placement in power and energy sectors'
    ]
  },
  {
    name: 'B.Tech ME', fullName: 'B.Tech Mechanical Engineering',
    slug: 'btech-me', description: 'Mechanical engineering program covering design, thermal, manufacturing, and automation',
    longDescription: 'B.Tech Mechanical Engineering (ME) provides a strong foundation in mechanical design, thermal sciences, manufacturing, and automation, covering machines, materials, thermodynamics, fluid mechanics, and CAD/CAM.',
    icon: 'Settings', color: '#0D9488', bgColor: '#F0FDFA', duration: '4 Years', totalSemesters: 8, totalSubjects: 46,
    keywords: 'B.Tech ME, mechanical engineering, design, thermal, manufacturing',
    brochurePoints: [
      '8 semesters of mechanical engineering', 'Design and thermal sciences focus',
      'Manufacturing and automation labs', 'CAD/CAM and FEA training',
      'Industry partnerships and internships', 'Placement in manufacturing and automotive sectors'
    ]
  },
  {
    name: 'BCA', fullName: 'Bachelor of Computer Applications',
    slug: 'bca', description: 'Undergraduate program in computer applications and software development',
    longDescription: 'Bachelor of Computer Applications (BCA) is an undergraduate degree program that provides a strong foundation in computer applications, programming, and software development, preparing students for careers in the IT industry.',
    icon: 'Computer', color: '#DC2626', bgColor: '#FEF2F2', duration: '3 Years', totalSemesters: 6, totalSubjects: 36,
    keywords: 'BCA, bachelor of computer applications, computer science, IT',
    brochurePoints: [
      '6 semesters of comprehensive computer education', 'Strong programming and development focus',
      'Practical lab sessions and projects', 'Industry-aligned curriculum',
      'Experienced faculty members', 'Career opportunities in software development'
    ]
  },
  {
    name: 'B.Sc CS', fullName: 'B.Sc Computer Science',
    slug: 'bsc-cs', description: 'Undergraduate program in computer science fundamentals and applications',
    longDescription: 'Bachelor of Science in Computer Science (B.Sc CS) provides a strong foundation in computer science theory, programming, algorithms, and software development, preparing students for careers in IT and higher education.',
    icon: 'BookOpen', color: '#0891B2', bgColor: '#ECFEFF', duration: '3 Years', totalSemesters: 6, totalSubjects: 30,
    keywords: 'B.Sc CS, computer science, programming, algorithms',
    brochurePoints: [
      '6 semesters of comprehensive CS education', 'Strong programming fundamentals',
      'Mathematics and theoretical CS foundation', 'Practical lab sessions and projects',
      'Experienced faculty members', 'Pathways to research and higher education'
    ]
  },
  {
    name: 'MCA', fullName: 'Master of Computer Applications',
    slug: 'mca', description: 'Postgraduate program in computer applications and software development',
    longDescription: 'Master of Computer Applications (MCA) is a postgraduate degree focusing on computer applications, software development, and IT, bridging the gap between industry requirements and academic knowledge.',
    icon: 'Monitor', color: '#059669', bgColor: '#ECFDF5', duration: '2 Years', totalSemesters: 4, totalSubjects: 24,
    keywords: 'MCA, master of computer applications, computer science, IT',
    brochurePoints: [
      '4 semesters of advanced computing education', 'Modern software development practices',
      'Industry projects and internships', 'Expert faculty with industry experience',
      'State-of-the-art computer labs', 'Placement assistance in top tech companies'
    ]
  },
  {
    name: 'BBA', fullName: 'Bachelor of Business Administration',
    slug: 'bba', description: 'Undergraduate program in business management and administration',
    longDescription: 'Bachelor of Business Administration (BBA) is a comprehensive undergraduate program that provides a solid foundation in business principles, management practices, and organizational leadership.',
    icon: 'Briefcase', color: '#D97706', bgColor: '#FFFBEB', duration: '3 Years', totalSemesters: 6, totalSubjects: 36,
    keywords: 'BBA, bachelor of business administration, management, business',
    brochurePoints: [
      '6 semesters of comprehensive business education', 'Practical management training',
      'Industry exposure through internships', 'Case study-based learning approach',
      'Expert faculty from business backgrounds', 'Strong placement network with corporate partners'
    ]
  },
  {
    name: 'MBA', fullName: 'Master of Business Administration',
    slug: 'mba', description: 'Postgraduate program in business management and leadership',
    longDescription: 'Master of Business Administration (MBA) is a prestigious postgraduate degree that develops strategic thinking, leadership skills, and business acumen for senior management roles across industries.',
    icon: 'TrendingUp', color: '#7C3AED', bgColor: '#F5F3FF', duration: '2 Years', totalSemesters: 4, totalSubjects: 24,
    keywords: 'MBA, master of business administration, management, leadership, PGDM',
    brochurePoints: [
      '4 semesters of advanced management education', 'Specialization tracks in Marketing, Finance, HR, and Operations',
      'Industry projects and live case studies', 'Leadership development programs',
      'Expert faculty with corporate experience', 'Excellent placement record with top companies'
    ]
  },
  {
    name: 'B.Com', fullName: 'Bachelor of Commerce',
    slug: 'bcom', description: 'Undergraduate program in commerce and accounting',
    longDescription: 'Bachelor of Commerce (B.Com) is a comprehensive undergraduate program that provides a strong foundation in commerce, accounting, finance, and business principles.',
    icon: 'BookOpen', color: '#0891B2', bgColor: '#ECFEFF', duration: '3 Years', totalSemesters: 6, totalSubjects: 36,
    keywords: 'B.Com, bachelor of commerce, commerce, accounting, finance',
    brochurePoints: [
      '6 semesters of comprehensive commerce education', 'Strong foundation in accounting and finance',
      'Practical training in tax and audit', 'Industry-oriented curriculum',
      'Experienced faculty from commerce backgrounds', 'Career opportunities in finance and accounting'
    ]
  },
  {
    name: 'BA', fullName: 'Bachelor of Arts',
    slug: 'ba', description: 'Undergraduate program in arts and humanities',
    longDescription: 'Bachelor of Arts (BA) is a versatile undergraduate program that offers a broad education in humanities, social sciences, and liberal arts, developing critical thinking, analytical skills, and cultural awareness.',
    icon: 'Library', color: '#0D9488', bgColor: '#F0FDFA', duration: '3 Years', totalSemesters: 6, totalSubjects: 30,
    keywords: 'BA, bachelor of arts, humanities, social sciences, liberal arts',
    brochurePoints: [
      '6 semesters of comprehensive arts education', 'Multiple specialization options',
      'Development of critical thinking skills', 'Interdisciplinary learning approach',
      'Expert faculty from diverse fields', 'Career opportunities in education, media, and civil services'
    ]
  }
];

async function seed() {
  console.log('Starting database seeding...');
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const adminPasswordHash = await bcrypt.hash('admin123', 12);
    const adminResult = await client.query(
      `INSERT INTO users (email, password_hash, full_name, role)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO NOTHING
       RETURNING id, email, full_name, role`,
      ['admin@noteshub.com', adminPasswordHash, 'Admin User', 'admin']
    );
    if (adminResult.rows.length > 0) {
      console.log('  Admin user created: admin@noteshub.com / admin123');
    } else {
      console.log('  Admin user already exists');
    }

    for (const course of courses) {
      const courseResult = await client.query(
        `INSERT INTO courses (name, full_name, slug, description, long_description, icon, color, bg_color, duration, total_semesters, total_subjects, keywords, brochure_points)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
         ON CONFLICT (slug) DO UPDATE SET
           name = EXCLUDED.name,
           updated_at = CURRENT_TIMESTAMP
         RETURNING id, total_semesters, total_subjects`,
        [course.name, course.fullName, course.slug, course.description, course.longDescription, course.icon, course.color, course.bgColor, course.duration, course.totalSemesters, course.totalSubjects, course.keywords, JSON.stringify(course.brochurePoints)]
      );
      const saved = courseResult.rows[0];
      console.log(`  Course: ${course.name} (${course.slug})`);

      if (saved) {
        const subsPerSem = Math.ceil(saved.total_subjects / saved.total_semesters);
        for (let i = 1; i <= saved.total_semesters; i++) {
          await client.query(
            `INSERT INTO semesters (course_id, semester_number, name, slug, total_subjects)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (course_id, slug) DO NOTHING`,
            [saved.id, i, `Semester ${i}`, `semester-${i}`, subsPerSem]
          );
        }
        console.log(`    → ${saved.total_semesters} semesters created`);
      }
    }

    await client.query('COMMIT');
    console.log(`\nSeeding completed! ${courses.length} courses inserted.`);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Seeding failed:', error.message);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
