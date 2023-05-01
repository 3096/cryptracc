import React, { useEffect } from 'react';
import {useState} from 'react' ;


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
      <ContractButton/>
      <BasicTable/>
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

import { Button } from "@mui/material";

function ContractButton(){
  return(
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
        >
          <strong>Create Contract</strong>
        </Button>
      </center>
  );
}

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

function createData(unAuthorizedContract, AuthorizedContract) {
  return { unAuthorizedContract, AuthorizedContract };
}

 const rows = [
  createData(1, 1),
  createData(2, 2),
  createData(3, 3 ),
  createData(4, 4 ),
  createData(5, 5)
 ];

 
function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Un-Authorized Contract</TableCell>
            <TableCell align="right">Authorized Contract</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.unAuthorizedContract}>
              <TableCell component="th" scope="row">
                {row.unAuthorizedContract}
              </TableCell>
              <TableCell align="right">{row.AuthorizedContract}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
 }

























