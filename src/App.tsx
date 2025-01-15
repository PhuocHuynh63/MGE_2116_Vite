import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import './App.css'
import { lazy } from "react";
import MainLayout from './layouts/main';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataPointsPage from './containers/DataPoints';
import ResultsTopPage from './containers/ResultsTop';
import HistoryPage from './containers/History';

const HomePage = lazy(() => import('./pages/HomePage'))

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
      <RouterProvider router={router} />
    </>
  )
}

export default App