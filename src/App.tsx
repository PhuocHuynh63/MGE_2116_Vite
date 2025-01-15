import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { lazy, Suspense } from "react";
import MainLayout from './layouts/main';
import 'bootstrap/dist/css/bootstrap.min.css';

import Loading from './assets/LoadingLogo';

const HomePage = lazy(() => import('./pages/HomePage'))
const DataPointsPage = lazy(() => import('./containers/DataPoints'));
const ResultsTopPage = lazy(() => import('./containers/ResultsTop'));
const HistoryPage = lazy(() => import('./containers/History'));

const router = createBrowserRouter([
  {
    // path: "*",
    // element: <NotFoundPage/>
  },
  {
    path: "/",
    element: <MainLayout Component={HomePage} />
  },
  {
    path: "/data-points",
    element: <MainLayout Component={DataPointsPage} />
  },
  {
    path: "/results-top",
    element: <MainLayout Component={ResultsTopPage} />
  },
  {
    path: "/history",
    element: <MainLayout Component={HistoryPage} />
  },
])

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Loading>
          <RouterProvider router={router} />
        </Loading>
      </Suspense>
    </>
  )
}

export default App