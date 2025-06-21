export const routes = {
  landing: "/",
  signin: "/signin",
  signup: "/signup",
  dashboard: "/dashboard",
} as const

export type RouteKey = keyof typeof routes

export const getRoute = (key: RouteKey): string => routes[key]

export const navigationItems = [
  { name: "Home", path: routes.landing },
  { name: "Sign In", path: routes.signin },
  { name: "Sign Up", path: routes.signup },
  { name: "Dashboard", path: routes.dashboard },
] as const
