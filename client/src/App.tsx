import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./routes/RootPage";
import CreatePage from "./routes/CreatePage";
import DashboardPage from "./routes/DashboardPage";
import SetupPage from "./routes/SetupPage";
import LookupPage from "./routes/LookupPage";
import ContractPage from "./routes/ContractPage";
import VerificationPage from "./routes/VerificationPage";
import { WagmiConfig, configureChains, createClient } from "wagmi";
import Navbar from "./components/Navbar";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import { hardhat } from "@wagmi/chains";
import { Box } from "@mui/material";

const { provider } = configureChains(
  [hardhat],
  [jsonRpcProvider({ rpc: () => ({ http: import.meta.env.VITE_RPC_URL }) })]
);
const wagmiClient = createClient({
  autoConnect: true,
  provider: provider,
});

const router = createBrowserRouter([
  { path: "/", element: <RootPage /> },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/create", element: <CreatePage /> },
  { path: "/setup", element: <SetupPage /> },
  { path: "/lookup", element: <LookupPage /> },
  { path: "/contract/:contractId", element: <ContractPage /> },
  { path: "/user", element: <VerificationPage /> },
  { path: "/user/:walletAddress", element: <VerificationPage /> },
]);

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", overflowY: "auto" }}>
        <Navbar />
        <RouterProvider router={router} />
      </Box>
    </WagmiConfig>
  );
}

export default App;
