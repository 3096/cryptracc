import "./SetupPage.css";
import WalletConnectButton from "../components/WalletConnectButton";
import IdUploadButton from "../components/IdUploadButton";
import { Button, Alert } from "@mui/material";

export default function SetupPage() {
  return (
  <div className = "setupPage">
    <div className = "headerRow">
      <h1>Set up</h1>
      <h1 className = "cryptracc">cryptracc</h1>
    </div>

    <div className = "warning">
      <Alert variant="outlined" severity="error" sx={{
        height: 60,
        width: 440,
        bgcolor: "none",
        color: `#FFFFFF`,
        borderRadius: 3,
        outlineWidth: 0,
      }}>
        We could not find the associated ID of the ETH wallet you provided. Please upload your ID below to continue.
      </Alert>
    </div>

    <IdUploadButton />

    <center><Button variant="contained" component="label" sx={{
          height: 50,
          width: 250,
          bgcolor: `#30B46C`,
          color: `#FFFFFF`,
          borderRadius: 3,
        }}>
        <strong>CONTINUE</strong>
      </Button></center>
  </div>
  );
}
