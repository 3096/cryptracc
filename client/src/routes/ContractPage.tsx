import React, { useEffect } from "react";
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
import {
  HexString,
  ZERO_HASH,
  useCryptraccContract,
  useCryptraccSign,
  useIdentitySetupCheck,
} from "../hooks/cryptracc";
import { useParams } from "react-router-dom";
import { useAccount } from "wagmi";
import { ThemeContext } from "@emotion/react";
import { Box, Container, ListItemButton, Typography } from "@mui/material";
import { isHexString } from "ethers/lib/utils.js";
import FileHashing from "../components/FileHashing";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  marginTop: 50,
  //width: 700,
}));

export default function ContractPage() {
  // useIdentitySetupCheck();
  let { contractId } = useParams();
  const { address } = useAccount();
  const [validatedContractHash, setContractHash] = React.useState<HexString>(ZERO_HASH);
  const { contractSignStatus: loadedStatus } = useCryptraccContract(validatedContractHash);
  const [contractSignStatus, setContractSignStatus] = React.useState(loadedStatus);
  const [addressConfirm, setAddressConfirm] = React.useState(""); // user-inputted confirmation
  const { data, isLoading, isSuccess, write } = useCryptraccSign(validatedContractHash);
  const [signLoaded, setSignLoaded] = React.useState(false);
  const [checkingContractHash, setCheckContractHash] = React.useState(ZERO_HASH);

  React.useEffect(() => {
    if (contractId && isHexString(contractId, 32)) {
      setContractHash(`0x${contractId.slice(2)}`);
    } else {
      // TODO: handle invalid contractId
      console.log("Invalid contractId");
    }
  }, [contractId, setContractHash]);

  useEffect(() => {
    if (contractSignStatus === undefined || contractSignStatus.length === 0) {
      setContractSignStatus(loadedStatus);
    }
  }, [contractSignStatus, loadedStatus]);

  // contractSignStatus contains (k|v={address: hash, signStatus: num})
  // console.log(contractSignStatus);
  // console.log(address);
  // console.log(isSuccess);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddressConfirm(event.target.value);
  };

  const onClick = () => {
    if (addressConfirm === address) {
      write?.();
    }
  };

  useEffect(() => {
    if (isLoading && !signLoaded) {
      setSignLoaded(true);
    }
    if (signLoaded && isSuccess && contractSignStatus?.find((signer) => signer.address === address)?.signStatus === 1) {
      setAddressConfirm("");
      setContractSignStatus(
        contractSignStatus?.map((signer) => (signer.address === address ? { ...signer, signStatus: 2 } : signer))
      );
      setSignLoaded(false);
    }
  }, [address, contractSignStatus, isLoading, isSuccess, signLoaded]);

  return (
    <Container>
      <Box className="contractPage" sx={{ pt: 6 }}>
        {/* <Grid container justifyContent="flex-start">
        <Grid item>
          <Button className="backButton" href="/lookup">
            <ArrowBackIosNewIcon />
            <b>BACK</b>
          </Button>
        </Grid>
      </Grid> */}

        <h2>{contractId}</h2>

        <h3>
          <u>STATUS</u>: {contractSignStatus?.every((signer) => signer.signStatus === 2) ? "Complete" : "Incomplete"}
        </h3>

        <TextField
          label="Enter your wallet address to confirm signing"
          variant="outlined"
          value={addressConfirm}
          onChange={onChange}
          style={{ width: "400px" }}
        />

        <Button
          variant="contained"
          component="label"
          sx={{
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
            {contractSignStatus?.map((signer, i) => (
              <div key={i}>
                <ListItem>
                  <ListItemButton href={`/user/${signer.address}`}>
                    <ListItemText primary={signer.address as string} />
                  </ListItemButton>
                  {signer.signStatus === 2 ? (
                    <Chip color={"success"} label={<strong>SIGNED</strong>} />
                  ) : (
                    <Chip color={"warning"} label={<strong>NOT SIGNED</strong>} />
                  )}
                </ListItem>
                {i !== contractSignStatus.length - 1 ? <Divider variant="inset" component="li" /> : null}
              </div>
            ))}
          </List>
        </Demo>
        <FileHashing prompt="Verify contract content" setOutput={setCheckContractHash} />
        <Typography variant="body1" sx={{ mt: 2 }}>
          {checkingContractHash === ZERO_HASH
            ? ""
            : validatedContractHash === checkingContractHash
            ? "The contract hash matches the file"
            : "The contract hash does not match the file"}
        </Typography>
      </Box>
    </Container>
  );
}
