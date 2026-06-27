import { useMemo } from 'react';

export function useSEO(pageType, data) {
  return useMemo(() => {
    switch (pageType) {
      case 'home':
        return {
          title: 'NotesHub - Free Engineering & College Notes PDF Download | B.Tech, BCA Notes',
          description: 'Download free engineering and college notes PDF for B.Tech, BCA, B.Sc CS and more. Semester-wise, subject-wise study material, handwritten notes, previous year papers for all courses.',
          keywords: 'btech notes, bca notes, engineering notes pdf, semester notes pdf, free college notes, download semester notes',
          canonical: 'https://noteshub.com',
          ogImage: 'https://noteshub.com/og-image-home.webp'
        };
      case 'courses':
        return {
          title: 'All Courses - Engineering & College Notes | B.Tech, BCA Notes PDF',
          description: 'Browse all engineering and college courses. Get semester-wise notes for B.Tech CSE, AI, DS, ML, IT, ECE, EE, ME, BCA, B.Sc CS. Free PDF download.',
          keywords: 'engineering courses, btech courses, bca course, college notes',
          canonical: 'https://noteshub.com/courses',
          ogImage: 'https://noteshub.com/og-image-courses.webp'
        };
      case 'course':
        return {
          title: `${data?.name || ''} Notes PDF Download | Semester Wise Study Material`,
          description: data?.description || '',
          keywords: data?.keywords || '',
          canonical: `https://noteshub.com/course/${data?.slug || ''}`,
          ogImage: `https://noteshub.com/images/courses/${data?.slug || 'default'}.webp`
        };
      case 'semester':
        return {
          title: data?.seo?.title || `${data?.courseName} ${data?.semesterName} Notes PDF`,
          description: data?.seo?.description || '',
          keywords: data?.seo?.keywords || '',
          canonical: `https://noteshub.com/course/${data?.courseSlug}/${data?.semesterSlug}`,
          ogImage: `https://noteshub.com/images/semesters/${data?.courseSlug}-${data?.semesterSlug}.webp`
        };
      case 'subject':
        return {
          title: `${data?.subjectName} Notes PDF | ${data?.courseName} ${data?.semesterName}`,
          description: `Download ${data?.subjectName} notes PDF for ${data?.courseName} ${data?.semesterName}. Free study material, topic-wise notes, important questions and exam preparation resources.`,
          keywords: `${data?.subjectName} notes, ${data?.courseSlug} notes, ${data?.semesterName} ${data?.courseName} notes`,
          canonical: `https://noteshub.com/course/${data?.courseSlug}/${data?.semesterSlug}/${data?.subjectSlug}`,
          ogImage: `https://noteshub.com/images/subjects/${data?.courseSlug}-${data?.subjectSlug}.webp`
        };
      case 'note':
        return {
          title: `${data?.title || ''} | NotesHub Free Study Material`,
          description: data?.description || '',
          keywords: data?.keywords || '',
          canonical: `https://noteshub.com/note/${data?.slug || ''}`,
          ogImage: data?.thumbnail || 'https://noteshub.com/og-image-note.webp'
        };
      case 'search':
        return {
          title: `Search Results: ${data?.query || ''} - NotesHub`,
          description: `Search results for "${data?.query || ''}" on NotesHub. Find engineering notes, study material, and college resources.`,
          keywords: `${data?.query || ''}, search notes, engineering study material`,
          canonical: `https://noteshub.com/search?q=${encodeURIComponent(data?.query || '')}`,
          ogImage: 'https://noteshub.com/og-image-search.webp'
        };
      case '404':
        return {
          title: 'Page Not Found - NotesHub',
          description: 'The page you are looking for does not exist. Browse our courses and find the study material you need.',
          keywords: '404, page not found, noteshub',
          canonical: 'https://noteshub.com/404',
          ogImage: 'https://noteshub.com/og-image.webp'
        };
      default:
        return {
          title: 'NotesHub - Free Engineering & College Notes',
          description: 'Download free engineering notes PDF.',
          keywords: 'engineering notes, college notes',
          canonical: 'https://noteshub.com',
          ogImage: 'https://noteshub.com/og-image.webp'
        };
    }
  }, [pageType, data]);
}
