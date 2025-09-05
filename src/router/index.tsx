import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "../App";
import { PageLoading } from "../components/PageLoading";

const ListPage = lazy(() => import("../features/people/list/ListPage"));
const DetailsPage = lazy(() => import("../features/people/details/DetailsPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoading />}>
            <ListPage />
          </Suspense>
        ),
      },
      {
        path: "/pessoa/:id",
        element: (
          <Suspense fallback={<PageLoading />}>
            <DetailsPage />
          </Suspense>
        ),
      },
    ],
  },
]);