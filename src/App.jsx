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
import useAppStore from "./appStore";
import Layout from "./components/Layout/Layout";
// import ComingSoon from "./pages/NotFound/ComingSoon";
import NotFound from "./pages/NotFound/NotFound";
import AddAuction from "./pages/Auctions/AddAuction";
import UpdateAuction from "./pages/Auctions/UpdateAuction";
import Auctions from "./pages/Auctions/Auctions";
import CreateNews from "./pages/News/CreateNews";



const App = () => {
  const {userData}= useAppStore()
  console.log(userData?.isUserLoggedIn)
  const router = createBrowserRouter([
    {
      path: "/",
      element: userData?.isUserLoggedIn ? <Layout /> : <Login/>,

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
        {
          path: "/news/add",
          element: <CreateNews />,
        },
        {
          path: "/news",
          element: <CreateNews />,
        },

      ],
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
