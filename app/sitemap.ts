import type { MetadataRoute } from 'next'
import { ALL_PAGES, CLUSTERS } from '@/data'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const clusterUrls = CLUSTERS.map((c) => ({
    url: `${SITE_URL}/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 검색량이 큰 문서에 더 높은 우선순위를 준다
  const pageUrls = ALL_PAGES.map(({ cluster, page }) => ({
    url: `${SITE_URL}/${cluster.slug}/${page.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: page.volume >= 500 ? 0.8 : page.volume >= 100 ? 0.7 : 0.6,
  }))

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    ...clusterUrls,
    { url: `${SITE_URL}/guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/qna`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ...pageUrls,
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
  ]
}
