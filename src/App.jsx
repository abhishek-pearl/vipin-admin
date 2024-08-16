import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "sonner";

///// pages /////

import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Auth/Login/Login";

import Layout from "./components/Layout/Layout";
// import ComingSoon from "./pages/NotFound/ComingSoon";
import NotFound from "./pages/NotFound/NotFound";
import AddAuction from "./pages/Auctions/AddAuction";
import UpdateAuction from "./pages/Auctions/UpdateAuction";
import Auctions from "./pages/Auctions/Auctions";

const isUserLoggedIn = localStorage.getItem("isusrlgd");

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: isUserLoggedIn ? <Layout /> : <Navigate to="/login" />,

      children: [
        {
          path: "/",
          element: <Dashboard />,
        },

        {
          path: "/*",
          element: <NotFound />,
        },
        {
          path: "/auctions",
          element: <Auctions />,
        },
        {
          path: "/auctions/add",
          element: <AddAuction />,
        },
        {
          path: "/auctions/update/:id",
          element: <UpdateAuction />,
        },

      ],
    },
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <>
      <Toaster richColors containerClassName="overflow-auto" />
      <RouterProvider router={router} />;
    </>
  );
};

export default App;
