import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Registration from "../pages/Authentication/Registration/Registration";
import Covarage from "../pages/Covarage/Covarage";
import PrivetRoutes from "../Routes/PrivetRoutes";
import AddParcel from "../pages/AddParcel/AddParcel";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import TrackParcel from "../pages/Dashboard/TrackParcel/TrackParcel";
import BeARider from "../pages/Dashboard/BeARider/BeARider";
import PendingRiders from "../pages/Dashboard/PendingRiders/PendingRiders";
import ApprovedRiders from "../pages/Dashboard/ApprovedRiders/ApprovedRiders";
import MakeAdmin from "../pages/Dashboard/MakeAdmin/MakeAdmin";
import Forbidden from "../pages/Forbidden/FOrbidden";
import AdminRoute from "../Routes/AdminRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
        {
            index: true,
            path: '/',
            Component: Home
        },
        {
          path: 'coverage',
          Component: Covarage,
          loader: () => fetch('warehouse.json')
        },
        {
          path:'addparcel',
          element: <PrivetRoutes><AddParcel></AddParcel></PrivetRoutes>,
          loader:() => fetch('warehouse.json')
        }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Registration
      }
    ]
  },
  {
    path:'forbidden',
    Component: Forbidden
  },
  {
    path: "/dashboard",
    element: <PrivetRoutes><DashboardLayout></DashboardLayout></PrivetRoutes>,
    children: [
      {
        path: 'myparcels',
        Component: MyParcels,
      },
      {
        path: 'payment/:id',
        Component: Payment
      },
      {
        path: 'paymenthistory',
        Component: PaymentHistory
      },
      {
        path: 'track',
        Component: TrackParcel
      },
      {
        path: 'bearider',
        Component: BeARider
      },
      {
        path: 'pending-riders',
        element: <AdminRoute><PendingRiders></PendingRiders></AdminRoute>
      },
      {
        path: 'active-riders',
        element: <AdminRoute><ApprovedRiders></ApprovedRiders></AdminRoute>
      },
      {
        path: 'makeadmin',
        element: <AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>
      }
    ]
  }
]);