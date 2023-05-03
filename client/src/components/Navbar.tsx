import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)({
  backgroundColor: "inherit",
  padding: "6px",
  color: "inherit",
  margin: "8px", // Add margin to create spacing between buttons
  "&:hover": {
    backgroundColor: "inherit", // Set the desired hover color here
  },
});

function Navbar() {
  return (
    <div>
      <AppBar position="static" style={{ justifyContent: "center", padding: "6px" }}>
        <Toolbar>
          <a href="/">
            <Typography sx={{ fontFamily: "Oleo Script", fontSize: 32, mr: 3, mb: 0.5 }}>cryptracc</Typography>
          </a>
          <StyledButton variant="contained" href="/dashboard">
            Home
          </StyledButton>
          <StyledButton variant="contained" href="/create">
            Create Contract
          </StyledButton>
          <StyledButton variant="contained" href="/lookup">
            Lookup Contract
          </StyledButton>
          <StyledButton variant="contained" href="/user">
            Verify User
          </StyledButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
