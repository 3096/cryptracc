// let's use this file for wallet connect page

import { Button } from "@mui/material";
import "./RootPage.css";
import WalletConnectButton from "../components/WalletConnectButton";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";

export default function RootPage() {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  if (isConnected) {
    navigate("/dashboard");
  }

  return (
    <div className="rootPage">
      <center>
        <h1>
          <strong>Let's get started</strong>
        </h1>
      </center>

      <WalletConnectButton />

      <center>
        <Button
          variant="contained"
          component="label"
          sx={{
            height: 50,
            width: 250,
            bgcolor: `#30B46C`,
            color: `#FFFFFF`,
            borderRadius: 3,
          }}
        >
          <strong>CONTINUE</strong>
        </Button>
      </center>
    </div>
  );
}
