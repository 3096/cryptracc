import "./WalletConnectButton.css";
import { Button, Alert } from "@mui/material";
import MetaMask_Fox from "../assets/MetaMask_Fox.svg";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useConnect } from "wagmi";

export default function WalletConnectButton() {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const metaMaskFoxIcon = {
    width: 40,
    height: 40,
  };

  const metaMaskButtonStyle = {
    width: 300,
    height: 60,
    backgroundColor: "#F3AA1B",
    color: "white",
    fontSize: "18px",
  };

  return (
    <div className="walletConnection">
      <h3>Connect to your ETH wallet</h3>

      <Button
        variant="contained"
        style={metaMaskButtonStyle}
        sx={{
          textTransform: "none",
          borderRadius: 3,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
        onClick={() => connect()}
      >
        <img src={MetaMask_Fox} style={metaMaskFoxIcon} />
        <strong>Connect to METAMASK</strong>
      </Button>

      <Alert
        variant="outlined"
        severity="info"
        sx={{
          height: 40,
          width: 266,
          bgcolor: "none",
          color: `#FFFFFF`,
          borderRadius: 3,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          outlineWidth: 0,
        }}
      >
        <a href="https://metamask.io/download/">
          <strong>
            *<u>MetaMask</u>
          </strong>
        </a>{" "}
        is required.
      </Alert>
    </div>
  );
}
