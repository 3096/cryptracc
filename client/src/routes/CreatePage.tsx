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
  const [numUsers, setNumUsers] = useState(0);

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
    
    // add the new user object to the users array
    setUsers(prevState => [...prevState, user]);

    // reset the form fields and close the form
    setName("");
    setid1("");
    setid2("");
    setsign1("");
    setsign2("");
    setFile(null);
    e.target.reset();
    setShowForm(false);
  }

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }
  
  function consoleUsers() {
    console.log("Users:");
    for (let user of users) {
      console.log(user);
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
          <h3>Enter user {i + 1} information:</h3>
          <label>
            user{i + 1} HashId:
            <input type="text" value={i === 0 ? id1 : id2} onChange={e => i === 0 ? setid1(e.target.value) : setid2(e.target.value)} />
          </label>
          <br />
          <label>
            Signature_User{i + 1}:
            <textarea value={i === 0 ? sign1 : sign2} onChange={e => i === 0 ? setsign1(e.target.value) : setsign2(e.target.value)} />
          </label>
          <br />
        </div>
      );
    }
    return userForms;
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
          Number of users:
          <input type="number" min="1" value={numUsers} onChange={handleNumUsersChange} />
        </label>
        <br />
        {renderUserForm()}
        <br />
        <button onClick={consoleUsers}>Submit</button>
        <button onClick={() => setShowForm(false)}>Close</button>
      </form>
    </div>
  );
}
    
