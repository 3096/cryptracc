import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { styled } from "@mui/material/styles";


const StyledButton = styled(Button)({
    backgroundColor: "inherit",
    padding: "6px",
    color: "inherit",
    margin: "15px", // Add margin to create spacing between buttons
    "&:hover": {
      backgroundColor: "inherit", // Set the desired hover color here
    },
  });

function Navbar() {
  return (
    <div>
        <AppBar position="static" style={{ justifyContent: "center" }}>
        <Toolbar>
          <a href="/">
            <Typography sx={{ fontFamily: "Oleo Script", fontSize: 32 }}>
              cryptracc
            </Typography>
          </a>
          <StyledButton variant="contained" href="/">
            Home
            </StyledButton>
            <StyledButton variant="contained" href="/dashboard">
            Dashboard
            </StyledButton>
            <StyledButton variant="contained" href="/create">
            Create
            </StyledButton>
            <StyledButton variant="contained" href="/user">
            User
            </StyledButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
