import { FileText, Home, Image, Info, LogIn, UserPlus } from 'lucide-react'

import { RouteKey, Routes } from '../types'

export function getRoutes(): Routes {
  return {
    routes: [
      { path: '/', name: RouteKey.HOME, visibleInNavbar: true, icon: Home },
      {
        path: '/about',
        name: RouteKey.ABOUT,
        visibleInNavbar: true,
        icon: Info,
      },
      {
        path: '/gallery',
        name: RouteKey.GALLERY,
        visibleInNavbar: true,
        icon: Image,
      },
      {
        path: '/posts',
        name: RouteKey.POSTS,
        visibleInNavbar: true,
        icon: FileText,
      },
      {
        path: '/registration',
        name: RouteKey.REGISTRATION,
        visibleInNavbar: true,
        icon: UserPlus,
      },
      {
        path: '/login',
        name: RouteKey.LOGIN,
        visibleInNavbar: true,
        icon: LogIn,
      },
    ],
  }
}
