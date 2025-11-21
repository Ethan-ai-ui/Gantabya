import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout'; 
import Home from './pages/home'; 
import Option from './pages/Option';
import Signin from './pages/Signin';
import Trekkersignup from './pages/Trekkersignup';
import SPSignup from './pages/SPSignup';
import Dashboard from './pages/dashboard';
import ProfileSettings from './pages/ProfileSettings';
import MyReviews from './pages/MyReviews';
import MyBookings from './pages/MyBookings';
import FavoriteGuides from './pages/FavoriteGuides';
import ManageServices from './pages/ManageServices';
import Earnings from './pages/Earnings';
import BrowseTreks from './pages/BrowseTreks';
import BookingsReceived from './pages/BookingsRecieved';
import SPProfile from './pages/SPProfile';
import './index.css';
import { AppProvider } from './context/AppContext';

const routes = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/", 
        element: <Home />
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "option",
        element: <Option />
      },
      {
        path: "signin",
        element: <Signin />
      },
      {
        path: "trekkersignup",
        element: <Trekkersignup />
      },
      {
        path: "spsignup",
        element: <SPSignup />
      },
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "profile-settings",
        element: <ProfileSettings />
      },
      {
        path: "my-reviews",
        element: <MyReviews />
      },
      {
        path: "my-bookings",
        element: <MyBookings />
      },
      {
        path: "favorite-guides",
        element: <FavoriteGuides />
      },
      {
        path: "manage-services",
        element: <ManageServices />
      },
      {
        path: "earnings",
        element: <Earnings />
      },
      {
        path: "browse-treks",
        element: <BrowseTreks />
      },
      {
        path: "bookings-received",
        element: <BookingsReceived />
      },
      {
        path: "business-profile",
        element: <SPProfile />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
    <RouterProvider router={routes} />
    </AppProvider>
  </StrictMode>
);
