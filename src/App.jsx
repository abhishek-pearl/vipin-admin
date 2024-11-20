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
import News from "./pages/News/News";
import Testimonials from "./pages/Testimonials/Testimonials";
import AddTestimonial from "./pages/Testimonials/AddTestimonial";
import AddServices from "./pages/Services/AddServices";
import Services from "./pages/Services/Services";
import HeaderCRUD from "./pages/Header/HeaderCRUD";
import AddHeaderItems from "./pages/Header/AddHeaderItems";
import AddPrivacyPolicy from "./pages/PrivacyPolicy/AddPrivacyPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";



const App = () => {
  const { userData } = useAppStore()
  console.log(userData?.isUserLoggedIn)
  const router = createBrowserRouter([
    {
      path: "/",
      element: userData?.isUserLoggedIn ? <Layout /> : <Login />,

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
          path: "/news/update",
          element: <CreateNews />,
        },
        {
          path: "/news",
          element: <News />,
        },
        {
          path: "/services",
          element: <Services />,
        },
        {
          path: "/createServices",
          element: <AddServices />,
        },
        {
          path: "/testimonials",
          element: <Testimonials />,
        },
        {
          path: "/createTestimonial",
          element: <AddTestimonial />,
        },
        {
          path: "/header",
          element: <HeaderCRUD />,
        },
        {
          path: "/addHeader",
          element: <AddHeaderItems />,
        },
        {
          path: "/privacyPolicy",
          element: <PrivacyPolicy />,
        },

        {
          path: "/addPrivacyPolicy",
          element: <AddPrivacyPolicy />,
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
