import "./SetupPage.css";
import WalletConnectButton from "../components/WalletConnectButton";
import IdUploadButton from "../components/FileHashing";
import { Button, Alert } from "@mui/material";
import { useIdentitySetup, useIdentitySetupCheck } from "../hooks/cryptracc";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SetupPage() {
  useIdentitySetupCheck(false);
  const { data, isLoading, isSuccess, write, setIdentityHash } = useIdentitySetup();
  const nav = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      nav("/dashboard");
    }
  }, [isSuccess, nav]);

  return (
    <div className="setupPage">
      <div className="headerRow">
        <h1>Set up</h1>
        <h1 className="cryptracc">cryptracc</h1>
      </div>

      <div className="warning">
        <Alert
          variant="outlined"
          severity="error"
          sx={{
            height: 60,
            width: 440,
            bgcolor: "none",
            color: `#FFFFFF`,
            borderRadius: 3,
            outlineWidth: 0,
          }}
        >
          We could not find the associated ID of the ETH wallet you provided. Please upload your ID below to continue.
        </Alert>
      </div>

      <IdUploadButton prompt="Upload your ID" setOutput={setIdentityHash} acceptedFormats="image/*" />

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
          onClick={write}
        >
          <strong>CONTINUE</strong>
        </Button>
      </center>
    </div>
  );
}
