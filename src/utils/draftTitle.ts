export function draftTitle(title: string, draft: boolean | undefined) {
  return draft ? `DRAFT: ${title}` : title;
}
