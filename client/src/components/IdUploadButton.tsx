import './IdUploadButton.css'
import { Button } from "@mui/material";

export default function IdUploadButton() {
    return (
        <div className="idSubmission">
            <h3>Upload your ID</h3>
    
            <Button
              variant="contained"
              component="label"
              sx={{
                height: 50,
                width: 150,
                bgcolor: `#C8C8C8`,
                color: `#000000`,
                textTransform: "none",
                borderRadius: 3,
              }}
            >
                Choose File
                <input hidden accept="image/*" multiple type="file" />
            </Button>
        </div>
    )
}