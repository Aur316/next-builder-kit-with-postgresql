enum RouteKey {
  HOME = 'home',
  ABOUT = 'about',
}

type Route = {
  path: string
  name: RouteKey
  visibleInNavbar?: boolean
}

interface Routes {
  routes: Array<Route>
}

export function getRoutes(): Routes {
  return {
    routes: [
      { path: '/', name: RouteKey.HOME, visibleInNavbar: true },
      { path: '/about', name: RouteKey.ABOUT, visibleInNavbar: true },
    ],
  }
}
