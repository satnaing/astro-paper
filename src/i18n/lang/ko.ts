import type { UIStrings } from "../types";

export default {
  nav: {
    home: "홈",
    posts: "포스트",
    tags: "태그",
    about: "소개",
    archives: "아카이브",
    search: "검색",
  },
  post: {
    publishedAt: "게시일",
    updatedAt: "수정일",
    sharePostIntro: "이 포스트 공유하기:",
    sharePostOn: "{{platform}}에 이 포스트 공유하기",
    sharePostViaEmail: "이메일로 이 포스트 공유하기",
    tagLabel: "태그",
    backToTop: "맨 위로",
    goBack: "뒤로 가기",
    editPage: "페이지 편집",
    previousPost: "이전 포스트",
    nextPost: "다음 포스트",
  },
  pagination: {
    prev: "이전",
    next: "다음",
    page: "페이지",
  },
  home: {
    socialLinks: "소셜 링크",
    featured: "추천 포스트",
    recentPosts: "최근 포스트",
    allPosts: "전체 포스트",
  },
  footer: {
    copyright: "저작권",
    allRightsReserved: "모든 권리 보유.",
  },
  pages: {
    tagTitle: "태그",
    tagDesc: "이 태그가 지정된 모든 게시글",

    tagsTitle: "태그",
    tagsDesc: "게시글에 사용된 모든 태그입니다.",

    postsTitle: "포스트",
    postsDesc: "제가 작성한 모든 게시글입니다.",

    archivesTitle: "아카이브",
    archivesDesc: "제가 보관한 모든 게시글입니다.",

    searchTitle: "검색",
    searchDesc: "게시글을 검색해보세요...",
  },
  a11y: {
    skipToContent: "본문으로 건너뛰기",
    openMenu: "메뉴 열기",
    closeMenu: "메뉴 닫기",
    toggleTheme: "테마 전환",
    searchPlaceholder: "게시글 검색...",
    noResults: "검색 결과가 없습니다",
    goToPreviousPage: "이전 페이지로 이동",
    goToNextPage: "다음 페이지로 이동",
  },
  notFound: {
    title: "404 Not Found",
    message: "페이지를 찾을 수 없습니다",
    goHome: "홈으로 돌아가기",
  },
} satisfies UIStrings;
