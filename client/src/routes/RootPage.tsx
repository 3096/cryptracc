// let's use this file for wallet connect page

import { Button } from "@mui/material";
import "./RootPage.css";
import WalletConnectButton from "../components/WalletConnectButton";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function RootPage() {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate("/dashboard");
    }
  }, [isConnected, navigate]);

  return (
    <div className="rootPage">
      <center>
        <h1>
          <strong>Let's get started</strong>
        </h1>
      </center>

      <WalletConnectButton />
    </div>
  );
}
