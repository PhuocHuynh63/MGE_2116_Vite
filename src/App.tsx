import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './App.css';
import { Suspense, lazy } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import Loading from './assets/LoadingLogo';
import { Toaster } from 'react-hot-toast';
import { ROUTES } from './routes';
import Admin from './containers/Admin';
import RequireAuth from './components/RequireAuth';

// Lazy load components
const MainLayout = lazy(() => import('./layouts/main'));
const AdminLayout = lazy(() => import('./layouts/admin'));
const HomePage = lazy(() => import('./pages/HomePage'));
const DataPointsPage = lazy(() => import('./containers/DataPoints'));
const ResultsTopPage = lazy(() => import('./containers/ResultsTop'));
const HistoryPage = lazy(() => import('./containers/History'));
const MgeAdminForm = lazy(() => import('./containers/AdminMge'));
const AdminUsersPage = lazy(() => import('./containers/AdminUsers'));
const AdminHistoryPage = lazy(() => import('./containers/AdminHistory'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        path: ROUTES.BID_MGE,
        element: <MainLayout Component={HomePage} />
      },
      {
        path: ROUTES.DATA_POINTS,
        element: <MainLayout Component={DataPointsPage} />
      },
      {
        path: ROUTES.RESULTS_TOP,
        element: <MainLayout Component={ResultsTopPage} />
      },
      {
        path: ROUTES.HISTORY,
        element: <MainLayout Component={HistoryPage} />
      }
    ]
  },
  {
    path: '/admin',
    element: <Outlet />,
    children: [
      {
        path: '',
        element: <Admin />
      },
      {
        path: 'mge',
        element: (
          <RequireAuth>
            <AdminLayout Component={MgeAdminForm} />
          </RequireAuth>
        )
      },
      {
        path: 'users',
        element: (
          <RequireAuth>
            <AdminLayout Component={AdminUsersPage} />
          </RequireAuth>
        )
      },
      {
        path: 'history',
        element: (
          <RequireAuth>
            <AdminLayout Component={AdminHistoryPage} />
          </RequireAuth>
        )
      }
    ]
  }
]);

function App() {
  return (
    <Suspense>
      <Loading>
        <Toaster />
        <RouterProvider router={router} />
      </Loading>
    </Suspense>
  );
}

export default App;