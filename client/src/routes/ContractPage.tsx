import React from 'react';
import "./ContractPage.css";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { HexString, ZERO_HASH, useCryptraccContract, useCryptraccSign, useIdentitySetupCheck } from "../hooks/cryptracc";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";

// const contractId = "contractId"; // temp

// const signers = [
//   // get all signers here
//   { id: "signerId1", status: true },
//   { id: "signerId2", status: true },
//   { id: "signerId3", status: false },
//   { id: "signerId4", status: false },
// ];

const provider = new ethers.providers.Web3Provider(window.ethereum);
const walletAddress = await provider.getSigner().getAddress();

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  marginTop: 50,
  //width: 700,
}));

export default function ContractPage() {
  // might not need useIdentitySetupCheck();
  let { contractId } = useParams();
  const [validatedContractHash, setContractHash] = React.useState<HexString>(ZERO_HASH);
  const { contractSignStatus } = useCryptraccContract(validatedContractHash);
  const [signature, setSignature] = React.useState(""); // user-inputted signature
  const [contractStatus, setContractStatus] = React.useState("Incomplete");
  const { data, isLoading, isSuccess, write } = useCryptraccSign(validatedContractHash);

  React.useEffect(() => {
    if (contractId && contractId.startsWith("0x") && contractId.length === 66) {
      setContractHash(`0x${contractId.slice(2)}`);
    } else {
      // TODO: handle invalid contractId
      console.log("Invalid contractId");
    }
  }, [contractId, setContractHash]);

  // contractSignStatus contains (k|v={address: hash, signStatus: num})
  console.log(contractSignStatus);
  console.log(walletAddress);

  // get all signers
  const signers: { id: HexString; status: string; }[] = [];
  if (contractSignStatus) {
    for (const [_, signer] of Object.entries(contractSignStatus)) {
      // console.log(`${v.address} ${v.signStatus}`);
      signers.push({ id: signer.address as HexString, status: signer.signStatus as string});
    }
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignature(event.target.value);
  };

  const onClick = () => {
    if (signature == walletAddress) {
      write?.();

      // const signer = signers.find(({ id }) => id == walletAddress);
      // if (signer && signer.status == "1") { // not signed yet
      //   signer.status = "2";
      // }
    }
  };
  
  React.useEffect(() => {
    // check contract completedness status
    var complete = true;
    signers.forEach(function (signer) {
      if (signer.status == "1") {
        complete = false;
      }
    });
    setContractStatus(complete ? "Complete" : "Incomplete");
  }, [isSuccess]);

  return (
    <div className="contractPage">
      <Grid container justifyContent="flex-start">
        <Grid item>
          <Button className="backButton" href="/lookup">
            <ArrowBackIosNewIcon />
            <b>BACK</b>
          </Button>
        </Grid>
      </Grid>

      <h2>{contractId}</h2>

      <h3>
        <u>STATUS</u>: {contractStatus}
      </h3>

      <TextField
        label="Signature"
        variant="outlined"
        value={signature}
        onChange={onChange}
        style={{ width: "400px" }}
      />

      <Button variant="contained" component="label" sx={{
          height: 50,
          width: 100,
          bgcolor: `#30B46C`,
          color: `#FFFFFF`,
          borderRadius: 3,
          marginLeft: 3,
        }}
        onClick={onClick}
      >
        <strong>SIGN</strong>
      </Button>

      <Demo>
        <List>
          {signers.map((signer, i) => (
            <div key={signer.id}>
              <ListItem>
                <ListItemText primary={signer.id} />
                <Chip
                  color={signer.status=="2" ? "success" : "warning"}
                  label={signer.status=="2" ? <strong>SIGNED</strong> : <strong>NOT SIGNED</strong>}
                />
              </ListItem>
              {i != signers.length - 1 ? <Divider variant="inset" component="li" /> : null}
            </div>
          ))}
        </List>
      </Demo>
    </div>
  );
}