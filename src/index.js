import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import './index.css'
import Error from "./pages/Error";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import ResMenu from "./components/ResMenu";
import Cart from "./components/Cart";

// Define routes
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/restaurant/:resId",
        element: <ResMenu/>,
      },
    ],
  },
]);

// Render router provider at the root
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <RouterProvider router={appRouter} />
  // </React.StrictMode>
);
