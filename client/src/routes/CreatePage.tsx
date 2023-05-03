import React, { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import FileHashing from "../components/FileHashing";
import { HexString, ZERO_HASH, useCryptraccCreate, useIdentitySetupCheck } from "../hooks/cryptracc";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {
  useIdentitySetupCheck();
  return (
    <>
      <App />
    </>
  );
}
function App() {
  const [contractHash, setContractHash] = useState<HexString>(ZERO_HASH);
  const [contract, setContract] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [numUsers, setNumUsers] = useState(1);
  const [walletAddresses, setWalletAddresses] = useState<string[]>([]);
  const { isSuccess, write } = useCryptraccCreate(
    contractHash,
    walletAddresses as HexString[] // TODO: sanitize this input
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate(`/contract/${contractHash}`);
    }
  }, [isSuccess, navigate, contractHash]);

  function handleSubmit() {
    console.log(contractHash);
    console.log(walletAddresses);
    if (write) {
      write();
    } else {
      console.log("write isn't here?");
    }
  }

  function handleNumUsersChange(e: { target: { value: string } }) {
    const num = parseInt(e.target.value);
    if (num > 0 && num <= 10) {
      setNumUsers(num);
    }
  }

  function renderUserForm() {
    const userForms: JSX.Element[] = [];
    for (let i = 0; i < numUsers; i++) {
      userForms.push(
        <div key={i}>
          <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
            User {i + 1}
          </Typography>
          <label>
            Wallet Address:
            <br />
            <TextField
              size="small"
              type="text"
              value={walletAddresses[i]}
              onChange={(e) => {
                setWalletAddresses(
                  [...Array(numUsers).keys()].map((idx) => (idx === i ? e.target.value : walletAddresses[idx]))
                );
              }}
              sx={{ width: 420, mt: 1 }}
            />
          </label>
          <br />
        </div>
      );
    }
    return userForms;
  }

  function BackButton() {
    const handleButtonClick = () => {
      navigate("/dashboard");
    };

    return (
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
            mb: 16,
          }}
          onClick={handleButtonClick}
        >
          Back
        </Button>
      </center>
    );
  }

  function submitButton() {
    return (
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
            mt: 4,
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </center>
    );
  }

  return (
    <div className="form-popup">
      <Typography variant="h4" sx={{ mt: 8 }}>
        Enter contract information:
      </Typography>
      {/* <label>
        Contract Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label> */}
      <br />
      <FileHashing prompt="Choose the contract file" setOutput={setContractHash} />
      <br />
      <label>
        Number of users:
        <br />
        (max 10)
        <TextField
          size="small"
          InputProps={{ inputProps: { min: 1, max: 10, type: "number" } }}
          value={numUsers}
          onChange={handleNumUsersChange}
          sx={{ ml: 1, mt: 1, width: 55 }}
        />
      </label>
      <br />
      {renderUserForm()}
      <br />
      {submitButton()}
      <br />
      {BackButton()}
    </div>
  );
}
