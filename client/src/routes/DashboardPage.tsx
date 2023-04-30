import React from 'react';
import {useState} from 'react' ;
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
//import { HexString, ZERO_HASH, useCryptraccCreate, useIdentitySetupCheck } from "../hooks/cryptracc";

export default function DashboardPage() {  
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
    <div>
      <img className="avatar" />
      <Profile/>
    </div>
  );
}

//Name of the user
//Later on we will get userName from the signup/login page
const user = {
  name: 'User Name',
  imageSize: 200,
};


/*
Information about the user
*/
function Profile(){
  return(
    <>
      <p>Welcome <b>{user.name} </b> to CryptAcc's DashBoard</p>
    </>
  );
}




