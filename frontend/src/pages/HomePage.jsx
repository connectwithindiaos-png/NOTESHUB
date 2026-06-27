import { motion } from 'framer-motion'
import MetaTags from '../components/seo/MetaTags'
import SchemaMarkup from '../components/seo/SchemaMarkup'
import { getHomeSEO } from '../data/seoContent'
import { getWebsiteSchema, getOrganizationSchema, getSearchActionSchema } from '../utils/schema'
import { getCanonicalUrl } from '../utils/canonicalUrl'
import HeroSection from '../components/home/HeroSection'
import UniversitiesSection from '../components/home/UniversitiesSection'

import { CoursesSectionWrapper } from '../components/home/CoursesSection'
import { FAQSectionWrapper } from '../components/home/FAQSection'
import JoinPopup from '../components/home/JoinPopup'

export default function HomePage() {
  const seo = getHomeSEO()
  const canonical = getCanonicalUrl('/')

  return (
    <article>
      <MetaTags
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={canonical}
      />
      <SchemaMarkup
        schemas={[
          getWebsiteSchema(),
          getOrganizationSchema(),
          getSearchActionSchema()
        ]}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />
        <UniversitiesSection />
        <CoursesSectionWrapper />
        <FAQSectionWrapper />
        <JoinPopup />
      </motion.div>
    </article>
  )
}
