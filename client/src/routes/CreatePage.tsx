import React, { useEffect, useState } from "react"; 
import { Button } from "@mui/material";

//import { HexString, ZERO_HASH, useCryptraccCreate, useIdentitySetupCheck } from "../hooks/cryptracc";

export default function CreatePage() {

  
  // useIdentitySetupCheck();
  // const [contractHash, setContractHash] = useState<HexString>(ZERO_HASH);
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
  return(
  <>
  <App/>
  </>
  );
}
function App() {
  const [contract, setContract] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  
  // const [id1, setid1] = useState("");
  // const [id2, setid2] = useState("");
  // const [sign1, setsign1] = useState("");
  // const [sign2, setsign2] = useState("");
  const [file, setFile] = useState(null);
  const [numUsers, setNumUsers] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const contract = {
      name : name,
      file: file,
      numUsers: numUsers,
    };
    
    // add the new contract object to the contracts array
    setContract(prevState => [...prevState, contracts]);

    // reset the form fields and close the form
    e.target.reset();
    setShowForm(false);
  }

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }
  
  function consoleUsers() {
    console.log("Contracts made:");
    for (let c of contract) {
      console.log(c);
    }
  }

  function handleNumUsersChange(e) {
    setNumUsers(parseInt(e.target.value));
  }

  function renderUserForm() {
    const userForms = [];
    for (let i = 0; i < numUsers; i++) {
      userForms.push(
        <div key={i}>
          <h3>User {i + 1} information:</h3>
          <label>
            user{i + 1} HashId:
            <input type="text" />
          </label>
          <br />
          <label>
            Signature_User{i + 1}:
            <textarea/>
          </label>
          <br />
        </div>
      );
    }
    return userForms;
  }


  function BackButton() {
    const handleButtonClick = () => {
      window.location.href = 'http://localhost:5173/dashboard';
    }
  
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
          onClick={consoleUsers}
        >
          Submit
        </Button>
      </center>
    );
  }

  return (
    <div className="form-popup">
      <form onSubmit={handleSubmit}>
        <h2>Enter contract information:</h2>
        <label>
          Contract Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Choose a file:
          <input type="file" onChange={handleFileChange} />
        </label>
        <br />
        <label>
          Number of users (Max 5 only):
          <input type="number" min="1" max="5" value={numUsers} onChange={handleNumUsersChange} />
        </label>
        <br />
        {renderUserForm()}
        <br />
        {submitButton()}
        <br/>
        {BackButton()}
      </form>
    </div>
  );
}
    