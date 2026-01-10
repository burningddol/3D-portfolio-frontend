import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Screen from "./screen";

const Main = lazy(() => import("./main")); // screen속에선 main 3d렌더링할필요없음(무거움)

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={null}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "/screen",
    element: <Screen />,
  },
]);

const Routing = () => {
  return <RouterProvider router={router} />;
};

export default Routing;
