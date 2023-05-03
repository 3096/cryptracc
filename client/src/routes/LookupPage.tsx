import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import FileHash from "../components/FileHashing";
import { useNavigate } from "react-router-dom";
import { isHexString } from "ethers/lib/utils.js";

export default function LookupPage() {
  const [userInput, setUserInput] = React.useState<string>("");
  const navigate = useNavigate();

  // Handle submit
  const handleSubmit = () => {
    if (isHexString(userInput, 32)) {
      navigate(`/contract/${userInput}`);
    } else {
      alert("Please enter a valid contract ID (20 bytes hex string)");
    }
  };

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <Box sx={{ backgroundColor: "light", minHeight: "100vh" }}>
        <Container component="main">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "white" }} />
            <Typography component="h1" variant="h5" color="white">
              Lookup Contract
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                style={{ color: "#ffffff" }}
                margin="normal"
                required
                fullWidth
                id="contract_id"
                label="Contract ID"
                name="contract_id"
                autoComplete="contract_id"
                autoFocus
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Grid>
  );
}
