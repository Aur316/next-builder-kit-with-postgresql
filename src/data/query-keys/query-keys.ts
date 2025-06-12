export const postKey = {
  all: ['posts'] as const,
  list: () => [...postKey.all, 'list'] as const,
  active: () => [...postKey.all, 'active'] as const,
  deleted: () => [...postKey.all, 'deleted'] as const,
  detail: (id: string) => [...postKey.all, 'detail', id] as const,
  search: (query: string) => [...postKey.all, 'search', query] as const,
}
