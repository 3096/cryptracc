import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar"
import RootPage from "./routes/RootPage";
import CreatePage from "./routes/CreatePage";
import DashboardPage from "./routes/DashboardPage";
import SetupPage from "./routes/SetupPage";
import LookupPage from "./routes/LookupPage";
import ContractPage from "./routes/ContractPage";

const router = createBrowserRouter([
  { path: "/", element: <RootPage /> },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/create", element: <CreatePage /> },
  { path: "/setup", element: <SetupPage /> },
  { path: "/lookup", element: <LookupPage /> },
  { path: "/contract/:contractId", element: <ContractPage /> },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
    {/* Footer */}
  </React.StrictMode>
);
