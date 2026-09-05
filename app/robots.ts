import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

/**
 * robots.txt
 *
 * 정책: **Disallow 를 두지 않는다.**
 * 이 사이트는 전 페이지가 공개 정보 문서이고, 로그인·예약·관리자 같은
 * 비공개 영역이나 중복 URL(검색결과·필터 페이지)이 없다.
 * 불필요한 Disallow 는 색인 누락만 만들 뿐 SEO 에 이득이 없다.
 *
 * ⚠️ 나중에 비공개 경로가 생겨서 Disallow 를 넣을 때 주의:
 *    robots.txt 규칙상 특정 User-Agent 그룹이 존재하면 그 봇은 `*` 그룹을
 *    **통째로 무시**한다. 따라서 아래 세 그룹 전부에 같은 Disallow 를 넣어야 한다.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 1) 기본 — 모든 크롤러 전체 허용
      {
        userAgent: '*',
        allow: '/',
      },

      // 2) 국내 검색엔진 — 네이버(Yeti)·다음(Daumoa)
      //    `*` 로도 커버되지만, 국내 타겟 사이트임을 명시적으로 신호
      {
        userAgent: ['Yeti', 'Daumoa'],
        allow: '/',
      },

      // 3) AI 검색·학습 크롤러 전체 허용
      //    ChatGPT·Claude·Perplexity 등의 답변에 인용되면 그 자체가 유입 경로가 된다.
      //    이들 중 일부는 `*` 가 아니라 자기 이름이 명시된 규칙만 신뢰하므로 따로 나열한다.
      {
        userAgent: [
          // OpenAI
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          // Anthropic
          'ClaudeBot',
          'Claude-User',
          'Claude-SearchBot',
          'anthropic-ai',
          // Perplexity
          'PerplexityBot',
          'Perplexity-User',
          // Google Gemini (검색 순위와는 무관한 별도 신호)
          'Google-Extended',
          // Apple Intelligence
          'Applebot-Extended',
          // Meta AI
          'meta-externalagent',
          // Amazon
          'Amazonbot',
          // Common Crawl — 다수 AI 데이터셋의 원천
          'CCBot',
          // ByteDance
          'Bytespider',
        ],
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
