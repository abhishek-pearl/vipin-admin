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
import UpdateServices from "./pages/Services/UpdateServices";
import Payments from "./pages/Payments/Payments";
import Banners from "./pages/Banners/Banners";
import AddBanner from "./pages/Banners/AddBanner";
import Leads from "./pages/Leads/Leads";
import AdListing from "./pages/Ads/AdListing";
import AddAd from "./pages/Ads/AddAd";
import UpdateAd from "./pages/Ads/UpdateAd";
import UpdateNews from "./pages/News/UpdateNews";
import ContactCRUD from "./pages/contact/Contact";
import TaglineCRUD from "./pages/Tagline/Tagline";

const App = () => {
  const { userData } = useAppStore();
  console.log(userData?.isUserLoggedIn);
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
          path: "/news/update/:newsId",
          element: <UpdateNews />,
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
          path: "/services/:id",
          element: <UpdateServices />,
        },
        {
          path: "/payments",
          element: <Payments />,
        },
        {
          path: "/banners",
          element: <Banners />,
        },
        {
          path: "/banner/add",
          element: <AddBanner />,
        },
        {
          path: "/leads",
          element: <Leads />,
        },
        {
          path: "/ads",
          element: <AdListing />,
        },
        {
          path: "/addAd",
          element: <AddAd />,
        },
        {
          path: "/updateAd",
          element: <UpdateAd />
        },
        {
          path: "/contact",
          element: <ContactCRUD />
        },
        {
          path: "/tagline",
          element: <TaglineCRUD />
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
