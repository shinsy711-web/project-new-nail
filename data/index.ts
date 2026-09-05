import type { Cluster, Page } from '@/lib/types'
import { license } from './license'
import { course } from './course'
import { cost } from './cost'
import { funding } from './funding'
import { region } from './region'
import { startup } from './startup'
import { career } from './career'
import { compare } from './compare'

/** 내비게이션·사이트맵 노출 순서 */
export const CLUSTERS: Cluster[] = [
  course,
  license,
  cost,
  funding,
  region,
  career,
  startup,
  compare,
]

export function getCluster(slug: string): Cluster | undefined {
  return CLUSTERS.find((c) => c.slug === slug)
}

export function getPage(clusterSlug: string, pageSlug: string): Page | undefined {
  return getCluster(clusterSlug)?.pages.find((p) => p.slug === pageSlug)
}

/** "/license/nail-license" → 해당 Page. 존재하지 않으면 undefined */
export function resolveHref(href: string): { cluster: Cluster; page?: Page } | undefined {
  const parts = href.split('/').filter(Boolean)
  if (parts.length === 0) return undefined
  const cluster = getCluster(parts[0])
  if (!cluster) return undefined
  if (parts.length === 1) return { cluster }
  const page = cluster.pages.find((p) => p.slug === parts[1])
  if (!page) return undefined
  return { cluster, page }
}

/** related 배열을 실제 존재하는 링크로만 정리해 라벨과 함께 반환 */
export function resolveRelated(hrefs: string[] = []): { href: string; label: string; sub: string }[] {
  return hrefs
    .map((href) => {
      const hit = resolveHref(href)
      if (!hit) return null
      if (hit.page) {
        return { href, label: hit.page.keyword, sub: hit.cluster.name }
      }
      return { href, label: hit.cluster.keyword, sub: hit.cluster.name }
    })
    .filter((x): x is { href: string; label: string; sub: string } => x !== null)
}

export const ALL_PAGES: { cluster: Cluster; page: Page }[] = CLUSTERS.flatMap((c) =>
  c.pages.map((p) => ({ cluster: c, page: p }))
)

/** 검색량 상위 페이지 — 홈 화면 노출용 */
export const TOP_PAGES = [...ALL_PAGES]
  .sort((a, b) => b.page.volume - a.page.volume)
  .slice(0, 12)

export const TOTAL_PAGE_COUNT = ALL_PAGES.length + CLUSTERS.length
