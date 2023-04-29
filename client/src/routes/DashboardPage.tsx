import React from 'react';
import {useState} from 'react' ;
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';






export default function DashboardPage() {  
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return(
    <div>
      <img className="avatar" />
      <Profile/>
      <App/>
    </div>
  );
}

//Name of the user
//Later on we will get userName from the signup/login page
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 200,
};


/*
Information about the user
*/
function Profile(){
  return(
    <>
      <h1>CryptAcc</h1>
      <p>Welcome <b>{user.name} </b> to CryptAcc's DashBoard</p>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
      
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

  return (
  <div>
    <button onClick={() => setShowForm(true)}>Add Contract +</button>
    {showForm && (
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
    )}
    <div>
      <h3>Contracts Signed</h3>
      {users.map((user, index) => (
        <Box key={index} sx={{ backgroundColor: "#eee", padding: 5 }}>
          <Typography variant="h7" display="inline">Contract Name: </Typography>
          <Typography variant="h7" display="inline">{user.name}</Typography>
          <br />
          <Typography variant="h7" display="inline">user1 HashId: </Typography>
          <Typography variant="h7" display="inline">{user.id1}</Typography>
          <br />
          <Typography variant="h7" display="inline">user2 HashId: </Typography>
          <Typography variant="h7" display="inline">{user.id2}</Typography>
          <br />
        </Box>
      ))}
    </div>
    
  </div>
  );
}



