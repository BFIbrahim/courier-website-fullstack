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
      }
    ]
  }
]);