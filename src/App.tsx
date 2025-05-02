import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Suspense } from "react";
import MainLayout from './layouts/main';
import 'bootstrap/dist/css/bootstrap.min.css';

import Loading from './assets/LoadingLogo';
import HomePage from './pages/HomePage';
import DataPointsPage from './containers/DataPoints';
import ResultsTopPage from './containers/ResultsTop';
import HistoryPage from './containers/History';
import MgeAdminForm from './containers/Admin';
import { Toaster } from 'react-hot-toast';
import AdminLayout from './layouts/admin';
import AdminUsersPage from './containers/AdminUsers';
import { ROUTES } from './routes';



const router = createBrowserRouter([
  {
    // path: "*",
    // element: <NotFoundPage/>
  },
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
  },
  {
    path: ROUTES.ADMIN_MGE,
    element: <AdminLayout Component={MgeAdminForm} />
  },
  {
    path: ROUTES.ADMIN_USERS,
    element: <AdminLayout Component={AdminUsersPage} />
  }
])

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Toaster />
        <Loading>
          <RouterProvider router={router} />
        </Loading>
      </Suspense>
    </>
  )
}

export default App