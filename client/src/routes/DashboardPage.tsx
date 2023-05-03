import React, { useEffect } from "react";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { useIdentitySetupCheck } from "../hooks/cryptracc";

//import { HexString, ZERO_HASH, useCryptraccCreate, useIdentitySetupCheck } from "../hooks/cryptracc";

export default function DashboardPage() {
  useIdentitySetupCheck();
  return (
    <div>
      <img className="avatar" />
      <Profile />
      <ContractButton />
    </div>
  );
}

//Name of the user
//Later on we will get userName from the signup/login page
const user = {
  name: "User Name",
  imageSize: 200,
};

/*
Information about the user
*/
function Profile() {
  const { address } = useAccount();
  return (
    <>
      <Typography variant="h5" sx={{ my: 4 }}>
        Welcome, User <b>{address}</b>
      </Typography>
    </>
  );
}

function ContractButton() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/create");
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
        <strong>Create a Contract</strong>
      </Button>
    </center>
  );
}

function createData(unAuthorizedContract, AuthorizedContract) {
  return { unAuthorizedContract, AuthorizedContract };
}

const rows = [createData(1, 1), createData(2, 2), createData(3, 3), createData(4, 4), createData(5, 5)];

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
