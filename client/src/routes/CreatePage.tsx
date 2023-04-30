import React, { useEffect, useState } from "react"; 
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
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [id1, setid1] = useState("");
  const [id2, setid2] = useState("");
  const [sign1, setsign1] = useState("");
  const [sign2, setsign2] = useState("");
  const [file, setFile] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = {
      name : name,
      id1: id1,
      id2: id2,
      sign1: sign1,
      sign2: sign2,
      file: file,
    };
    
    //For debugg purpouse
    console.log(users);

    // add the new user object to the users array
    setUsers(prevState => [...prevState, users]);

    // reset the form fields and close the form
    setName("");
    setid1("");
    setid2("");
    setsign1("");
    setsign2("");
    setFile(null);
    e.target.reset();
    setShowForm(false);

  //   // send the data to the server
  //   fetch("https://example.com/api/v1/contracts", {
  //     method: "POST",
  //     body: JSON.stringify(users),
  //   })
  //   .then((response) => {
  //     if (response.ok) {
  //       console.log("Success!");
  //     } else {
  //       console.log("Error: " + response.status);
  //     }
  //   })
  //   .catch((error) => {
  //     console.log("Error: " + error);
  //   }); 
  }
  
  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }
  return (
        <div className="form-popup">
          <form onSubmit={handleSubmit}>
          <br />
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
              user1 HashId:
              <input type="text" value={id1} onChange={e => setid1(e.target.value)} />
            </label>
            <br />
            <label>
              user2 HashId:
              <input type="text" value={id2} onChange={e => setid2(e.target.value)} />
            </label>
            <br />
            <label>
              Signature_User1:
              <textarea value={sign1} onChange={e => setsign1(e.target.value)} />
            </label>
            <label>
              <br />
              Signature_User2:
              <textarea value={sign2} onChange={e => setsign2(e.target.value)} />
            </label>
            <br />
            <button type="submit">Submit</button>
            <button onClick={() => setShowForm(false)}>Close</button>
          </form>
        </div>
  );
}