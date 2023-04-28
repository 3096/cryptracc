import {useState} from 'react' ;


export default function DashboardPage() {  
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return(
    <div>
      <img className="avatar" />
      <AboutPage/>
      <App/>
      <Profile/>
      <ShoppingList/>
      <div>
      <h1>Counters that update seperately</h1>
        <MyButton count={count} onClick={handleClick} />
        <MyButton count={count} onClick={handleClick} />
      </div>
    </div>
  );
}

const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

/*
UI for Contract button
*/
// function CreateContractButton() {
//   function handleClick() {
//     alert('Add Contract');
//   }

//   return (
//     <button onClick={handleClick}>
//       New Contract +
//     </button>
//   );
// }

/*
Information about the user
*/
function AboutPage(){
  return(
    <>
      <h1>CryptAcc</h1>
      <p>Welcome to {user.name} to CryptAcc's DashBoard</p>
    </>
  );
}


export function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
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

const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

export function ShoppingList() {
  const listItems = products.map(product => 
  <li key={product.id}> {product.title} </li>)
  return (
    <ul>{listItems}</ul>
  );
}

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );

}

function App() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [id1, setid1] = useState("");
  const [id2, setid2] = useState("");
  const [sign1, setsign1] = useState("");
  const [sign2, setsign2] = useState("");
  const [file, setFile] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = {
      id1: id1,
      id2: id2,
      sign1: sign1,
      sign2: sign2,
      file: file,
    };
    
    //For debugg purpouse
    console.log(users);

    // add the new user object to the users array
    setUsers(prevState => [...prevState, user])

    // reset the form fields and close the form
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
  <>
    <div>
      <button onClick={() => setShowForm(true)}>Add Contract +</button>
      {showForm && (
        <div className="form-popup">
          <form onSubmit={handleSubmit}>
            <label>
              Choose a file:
              <input type="file" onChange={handleFileChange} />
            </label>
            <br />
            <label>
              user1:
              <input type="text" value={id1} onChange={e => setid1(e.target.value)} />
            </label>
            <br />
            <label>
              user2:
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
    {users.map((user, index) => (
        <div key={index} className="user-box">
          <p>ID1: {user.id1}</p>
          <p>ID2: {user.id2}</p>
          <p>Signature_User1: {user.sign1}</p>
          <p>Signature_User2: {user.sign2}</p>
          <p>File: {user.file.name}</p>
        </div>
      ))}

    </div>
  </>
  );
}



