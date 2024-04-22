import { lazy } from "react";
import { Navigate } from "react-router-dom";
const LeadLists = lazy(() => import ("../../views/admin_views/leads"))
const UsersList = lazy(() => import('../../views/admin_views/user-list'))
// const UserView = lazy(() => import('../../views/apps/user/view'))
const UserView = lazy(() => import('../../views/admin_views/user/view'))
const LeadsProfile = lazy(() => import('../../views/admin_views/leads/LeadsProfile'))
const SubscriptionPage = lazy(() => import('../../views/admin_views/subscription'))

const AdminAppRoutes = [
  {
    element: <LeadLists />,
    path: "/apps/leads",
  },
  {
    element: <LeadsProfile />,
    path: "/apps/leadsProfile",
  },
  {
    path: "/apps/user/view",
    element: <Navigate to="/apps/user/view/1" />,
  },
  {
    path: '/admin/user/list/:userID',
    element: <UsersList />,
  },
  {
    path: '/apps/user/view',
    element: <Navigate to='/apps/user/view/1' />
  },
  {
    element: <UserView />,
    path: '/apps/user/view/:id'
  },
  {
    element: <SubscriptionPage />,
    path: '/apps/subscription'
  },
];
export default AdminAppRoutes;