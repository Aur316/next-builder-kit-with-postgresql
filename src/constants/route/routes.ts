import { RouteKey, Routes } from '../../types'

export function getRoutes(): Routes {
  return {
    routes: [
      { path: '/', name: RouteKey.HOME, visibleInNavbar: true },
      { path: '/about', name: RouteKey.ABOUT, visibleInNavbar: true },
      { path: '/gallery', name: RouteKey.GALLERY, visibleInNavbar: true },
      { path: '/posts', name: RouteKey.POSTS, visibleInNavbar: true },
    ],
  }
}
