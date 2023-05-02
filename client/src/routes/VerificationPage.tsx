import { useIdentityHash, useIdentitySetupCheck } from "../hooks/cryptracc";
import { useState, useEffect } from "react";
import { createHash } from "crypto";
import { HexString, ZERO_HASH, ZERO_ADDRESS, useCryptraccContract } from "../hooks/cryptracc";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import FileHashing from "../components/FileHashing";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function VerificationPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileHash, setFileHash] = useState(ZERO_HASH);
  const [result, setResult] = useState("");
  const navigate = useNavigate();
  const { walletAddress } = useParams();
  const [validatedWalletAddress, setValidatedWalletAddress] = useState<HexString>(ZERO_ADDRESS);
  const [inputWalletAddress, setInputWalletAddress] = useState<string>(validatedWalletAddress);
  const { data: storedIdHash } = useIdentityHash(validatedWalletAddress);

  const checkAddress = (address: string) => address.startsWith("0x") && address.length === 42 && /^([0-9a-fA-F]{2})+$/.test(address.slice(2));

  useEffect(() => {
    if (walletAddress && checkAddress(walletAddress)) {
      setValidatedWalletAddress(`0x${walletAddress.slice(2)}`);
      setInputWalletAddress(walletAddress);
    } else {
      // TODO: handle invalid walletAddress
    }
  }, [walletAddress, setValidatedWalletAddress]);

  useEffect(() => {
    if (validatedWalletAddress === ZERO_ADDRESS) {
      setResult("Please enter a valid wallet address to verify");
    } else if (!storedIdHash) {
      setResult("Unknown error")
    } else if (storedIdHash === ZERO_HASH) {
      setResult("This address is not verified on Cryptracc")
    } else if (fileHash === ZERO_HASH) {
      setResult("Please select a ID file to verify")
    } else if (fileHash === storedIdHash) {
      setResult("Cryptracc successfully verified the ID of this address")
    } else {
      setResult("The selected ID does not match Cryptracc's record of this address")
    }
  }, [validatedWalletAddress, storedIdHash, fileHash]);

  const handleAddressInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setInputWalletAddress(input);
    if (checkAddress(input)) {
      setValidatedWalletAddress(`0x${input.slice(2)}`);
    } else {
      setValidatedWalletAddress(ZERO_ADDRESS);
    }
  };

  // const handleFileUpload = () => {
  //   if (selectedFile) {
  //     const fileReader = new FileReader();
  //     fileReader.onload = () => {
  //       const fileData = fileReader.result;
  //       const hash = createHash("sha256");  // still needs to change to zero hash

  //       hash.update(fileData);
  //       const hashDigest = hash.digest("hex");
  //       setFileHash(hashDigest);
  //     };
  //     fileReader.readAsArrayBuffer(selectedFile);
  //   }
  // };

  const handleCompare = () => {
    // if (fileHash ===  ) {
    //   setResult("pass");
    // } else {
    //   setResult("not pass");
    // }
  };

  // function BackButton() {
  const back = () => {
    navigate(-1);
  }

  return (
    <div>
      <Box>
        <Typography variant="h6" sx={{ mb: 2, fontFamily: ['Montserrat', 'sans-serif'] }}>Enter a Wallet Address for verification</Typography>
        <TextField
          variant="outlined"
          value={inputWalletAddress}
          onChange={handleAddressInput}
          style={{ width: 420 }}
        />
      </Box>
      <FileHashing prompt="Select a ID file" setOutput={setFileHash} />
      {/* <input type="file" onChange={handleFileSelection} /> */}
      {/* <button onClick={handleFileUpload}>Hash File</button> */}
      {/* {fileHash !== ZERO_HASH ? <p>File hash: {fileHash}</p> : <></>} */}

      <Typography variant="h4" sx={{ mb: 7 }}>{result}</Typography>
      {/* <Typography variant="h1" align="center" style={{fontFamily: 'cursive', fontWeight: 'bold', fontSize: '5rem', color: '#333'}}>Hello World</Typography> */}

      {/* need a text intrea for  */}



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
        onClick={back}
      >
        <strong>Back</strong>
      </Button>
    </div>


  );
}
