import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import FileHashing from "../components/FileHashing";
import {
  HexString,
  ZERO_HASH,
  useCryptraccCreate,
  useIdentitySetupCheck,
} from "../hooks/cryptracc";
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
      navigate(`contract/${contractHash}`);
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
    setNumUsers(parseInt(e.target.value));
  }

  function renderUserForm() {
    const userForms: JSX.Element[] = [];
    for (let i = 0; i < numUsers; i++) {
      userForms.push(
        <div key={i}>
          <h5>User {i + 1}</h5>
          <label>
            Wallet Address:
            <input
              type="text"
              value={walletAddresses[i]}
              onChange={(e) => {
                setWalletAddresses(
                  [...Array(numUsers).keys()].map((idx) =>
                    idx === i ? e.target.value : walletAddresses[idx]
                  )
                );
              }}
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
      <h2>Enter contract information:</h2>
      {/* <label>
        Contract Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label> */}
      <br />
      <FileHashing
        prompt="Choose the contract file"
        setOutput={setContractHash}
      />
      <br />
      <label>
        Number of users (Max 10 only):
        <input
          type="number"
          min="1"
          max="10"
          value={numUsers}
          onChange={handleNumUsersChange}
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
