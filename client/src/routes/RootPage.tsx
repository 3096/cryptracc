// let's use this file for wallet connect page
// test commit

// import React, { useState, useEffect } from 'react'
import { Button, Alert } from "@mui/material";
import "./RootPage.css";
import MetaMask_Fox from "../assets/MetaMask_Fox.svg";

export default function RootPage() {
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
    <div className="rootPage">
      <h1>
        <strong>Let's get started</strong>
      </h1>

      <div className="walletConnection">
        <h3>Connect your ETH wallet</h3>

        <Button
          variant="contained"
          style={metaMaskButtonStyle}
          sx={{
            textTransform: "none",
            borderRadius: 3,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
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

      <div className="idSubmission">
        <h3>Upload your ID</h3>

        <Button
          variant="contained"
          component="label"
          sx={{
            height: 50,
            width: 150,
            bgcolor: `#C8C8C8`,
            color: `#000000`,
            textTransform: "none",
            borderRadius: 3,
          }}
        >
          Choose File
          <input hidden accept="image/*" multiple type="file" />
        </Button>
      </div>

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
    </div>
  );
}
// import Button from "@mui/material/Button";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
// import { useAccount, useConnect, useDisconnect } from "wagmi";
// import { InjectedConnector } from "wagmi/connectors/injected";

// export default function RootPage() {
//   const { address, isConnected } = useAccount();
//   const { connect } = useConnect({
//     connector: new InjectedConnector(),
//   });
//   const { disconnect } = useDisconnect();

//   return (
//     <>
//       {isConnected ? (
//         <div>
//           <Card>
//             <CardContent>
//               <Typography my={1}>Connected to {address}</Typography>
//               <Button variant="contained" onClick={() => disconnect()}>
//                 Disconnect
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       ) : (
//         <Button variant="contained" onClick={() => connect()}>
//           Connect Wallet
//         </Button>
//       )}
//     </>
//   );
// }
