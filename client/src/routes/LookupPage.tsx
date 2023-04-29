import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';

export default function LookupPage() {
  // Handle submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      contractID: data.get('contractID'),
    });
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
        <Box sx={{ backgroundColor: 'silver', minHeight: '100vh' }}>
          <Container component="main">
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'white' }} />
            <Typography component="h1" variant="h5" color='black'>
                Lookup Contract
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  style={{ backgroundColor: "#ffffff" }}
                  margin="normal"
                  required
                  fullWidth
                  id="contract_id"
                  label="Contract ID"
                  name="contract_id"
                  autoComplete="contract_id"
                  autoFocus
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
    </Grid>
  )
};
