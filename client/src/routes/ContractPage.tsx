import React from 'react';
import "./ContractPage.css";
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const contractId = "contractId"; // get contractId here

const signers = [ // get all signers here
  { id: "signerId1", status: true },
  { id: "signerId2", status: true },
  { id: "signerId3", status: false },
  { id: "signerId4", status: false },
];

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  marginTop: 50,
  //width: 700,
}));

export default function ContractPage() {
  const [contractStatus, setContractStatus] = React.useState("Incomplete");
  const [signature, setSignature] = React.useState("");
  const [refresh, setRefresh] = React.useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignature(event.target.value);
  };

  const onClick = () => { // needs validation to check if they own their Id
    const signer = signers.find(({ id }) => id == signature)
    if (signer != null) {
      signer.status = true
      setRefresh(!refresh); // what
    }
    
    // check contract completedness status
    var complete = true
    signers.forEach(function(signer) {
      if (signer.status == false) {
        complete = false
      }
    })
    setContractStatus(complete ? "Complete" : "Imcomplete")
  }

  return (
    <div className="contractPage">
      <Grid container justifyContent="flex-start">
        <Grid item>
          <Button className="backButton" href="/lookup">
            <ArrowBackIosNewIcon />
            <b>BACK</b>
          </Button>
        </Grid>
      </Grid>

      <h1>{contractId}</h1>

      <h2><u>STATUS</u>: {contractStatus}</h2>

      <TextField
        label="Signature"
        variant="outlined"
        value={signature}
        onChange={onChange}
        style={{ width: "400px" }}
      />

      <Button variant="contained" component="label" sx={{
          height: 50,
          width: 100,
          bgcolor: `#30B46C`,
          color: `#FFFFFF`,
          borderRadius: 3,
          marginLeft: 3,
        }}
        onClick={onClick}
      >
        <strong>SIGN</strong>
      </Button>

      <Demo>
        <List>
          {signers.map((signer, i) => (
            <div key={signer.id}>
              <ListItem>
                <ListItemText
                  primary={signer.id}
                />
                <Chip color={signer.status ? "success" : "warning"} label={signer.status ? <strong>SIGNED</strong> : <strong>NOT SIGNED</strong>}/>
              </ListItem>
              {i != signers.length - 1 ? <Divider variant="inset" component="li" /> : null}
            </div>
          ))}
        </List>
      </Demo>
    </div>
  );
}