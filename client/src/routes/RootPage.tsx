// let's use this file for wallet connect page

import { Button } from "@mui/material";
import "./RootPage.css";
import WalletConnectButton from "../components/WalletConnectButton";

export default function RootPage() {
  return (
    <div className="rootPage">
      <center><h1><strong>Let's get started</strong></h1></center>

      <WalletConnectButton />

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
