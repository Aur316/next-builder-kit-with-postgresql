export const templateKey = {
  all: ['template'] as const,
  list: () => [...templateKey.all, 'list'] as const,
  firstKey: (id: string) => [...templateKey.all, 'firstKey', id] as const,
  secondKey: (id2: string) => [...templateKey.all, 'secondKey', id2] as const,
}
