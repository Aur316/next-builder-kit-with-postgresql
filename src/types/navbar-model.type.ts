export enum RouteKey {
  HOME = 'home',
  ABOUT = 'about',
  GALLERY = 'gallery',
  POSTS = 'posts',
}

export type Route = {
  path: string
  name: RouteKey
  visibleInNavbar?: boolean
}

export interface Routes {
  routes: Array<Route>
}
