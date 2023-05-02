import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import FileHashing from "../components/FileHashing";
import {
  HexString,
  ZERO_HASH,
  useCryptraccCreate,
  useIdentitySetupCheck,
} from "../hooks/cryptracc";

export default function CreatePage() {
  useIdentitySetupCheck();
  // const [signerAddresses, setSignerAddresses] = useState<HexString[]>([]);
  // const { data, isLoading, isSuccess, write } = useCryptraccCreate(contractHash, signerAddresses);

  // // this is just a test, write your actual damn code
  // const [tested, setTested] = useState(false);
  // useEffect(() => {
  //   if (!tested) {
  //     setContractHash("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
  //     setSignerAddresses(["0x70997970C51812dc3A010C7d01b50e0d17dc79C8", "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"]);
  //     if (write) {
  //       write();
  //       setTested(true);
  //     }
  //   }
  // }, [setContractHash, setSignerAddresses, tested, write]);
  // console.log(data, isLoading, isSuccess);
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
  const [file, setFile] = useState(null);
  const [numUsers, setNumUsers] = useState(0);
  const [walletAddresses, setWalletAddresses] = useState([]);
  const { isSuccess, write } = useCryptraccCreate(
    contractHash,
    walletAddresses
  );

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);

  //   const contract = {
  //     name : name,
  //     file: file,
  //     numUsers: numUsers,
  //     walletAddress : walletAddress

  //   };

  //   // add the new contract object to the contracts array
  //   setContract(prevState => [...prevState, contracts]);

  //   // reset the form fields and close the form
  //   e.target.reset();
  //   setShowForm(false);
  // }

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  function handleSubmit() {
    write?.();
  }

  function handleNumUsersChange(e) {
    setNumUsers(parseInt(e.target.value));
  }

  function renderUserForm() {
    const userForms = [];
    for (let i = 0; i < numUsers; i++) {
      userForms.push(
        <div key={i}>
          <h5>User {i + 1}</h5>
          <label>
            Wallet Address:
            <input type="text" />
          </label>
          <br />
          <br />
        </div>
      );
    }
    return userForms;
  }

  function BackButton() {
    const handleButtonClick = () => {
      window.location.href = "http://localhost:5173/dashboard";
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
      <label>
        Contract Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Choose a file:
        <input type="file" onChange={handleFileChange} />
      </label>
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
