import { createBrowserRouter } from "react-router-dom";

import { ProtectedAdmin, ProtectedUser } from "./protected";

import {
  AdminTherapists,
  LandingPage,
  Login,
  LoginAdmin,
  NotFound,
  Signup,
} from "../pages";
import { Layout } from "../layout";
import BugReportPage from "../pages/bugsReport";
import AdminBugs from "../pages/adminBugs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      // {
      //   path: "therapists",
      //   element: <Therapists />,
      // },
      // {
      //   path: "therapist/:id",
      //   element: <TherapistPage />,
      // },
      {
        path: "bug-report",
        element: <BugReportPage />,
      },
    ],
  },
  {
    path: "signup",
    element: (
      <ProtectedUser>
        <Signup />
      </ProtectedUser>
    ),
  },
  {
    path: "login",
    element: (
      <ProtectedUser>
        <Login />
      </ProtectedUser>
    ),
  },
  {
    path: "admin/login",
    element: <LoginAdmin />,
  },
  {
    path: "admin/therapists",
    element: <ProtectedAdmin />,
    children: [
      {
        path: "",
        element: <AdminTherapists />,
      },
      {
        path: "bugs",
        element: <AdminBugs />,
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
