import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import DashboardPage from "../pages/DashboardPage.jsx"
import {useSelector} from 'react-redux';
import { useNavigate } from '@tanstack/react-router';
import { checkAuth } from "../utils/helper.js";

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
  beforeLoad: checkAuth
})