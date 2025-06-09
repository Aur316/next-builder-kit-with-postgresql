export const postKey = {
  all: ['post'] as const,
  list: () => [...postKey.all, 'list'] as const,
  detail: (id: string) => [...postKey.all, 'detail', id] as const,
}
