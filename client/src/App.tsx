import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./routes/RootPage";
import CreatePage from "./routes/CreatePage";
import DashboardPage from "./routes/DashboardPage";
import SetupPage from "./routes/SetupPage";
import LookupPage from "./routes/LookupPage";
import ContractPage from "./routes/ContractPage";
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";
import Navbar from "./components/Navbar";

const wagmiClient = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

const router = createBrowserRouter([
  { path: "/", element: <RootPage /> },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/create", element: <CreatePage /> },
  { path: "/setup", element: <SetupPage /> },
  { path: "/lookup", element: <LookupPage /> },
  { path: "/contract/:contractId", element: <ContractPage /> },
]);

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <Navbar />
      <RouterProvider router={router} />
    </WagmiConfig>
  );
}

export default App;
