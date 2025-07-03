import { createRootRoute } from "@tanstack/react-router"
import RootLayout from "../RootLayout"
import { homePageRoute } from "./homepage"
import { authRoute } from "./auth.route"
import { dashboardRoute } from "./dashboard"

export const rootRoute = createRootRoute({  //main starting route
  component: RootLayout
})

export const routeTree = rootRoute.addChildren([  //all routes are added here
    homePageRoute,
    authRoute,
    dashboardRoute
])