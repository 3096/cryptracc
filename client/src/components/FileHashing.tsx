import { Dispatch, useState } from "react";
import "./FileHashing.css";
import { Button } from "@mui/material";
import { sha256 } from "crypto-hash";

type Props = { prompt: string; setOutput: Dispatch<React.SetStateAction<`0x${string}`>> };

export default function IdUploadButton({ prompt, setOutput }: Props) {
  const [filename, setFilename] = useState<string>();
  // For handling file input
  const handleFileInput = (e: any) => {
    // Initializing the file reader
    const fr = new FileReader();

    // Listening to when the file has been read.
    fr.onload = async () => {
      let result = "";
      // Hashing the content based on the active algorithm
      result = await sha256(fr.result as string);

      // Setting the hashed text as the output
      setOutput(`0x${result.padStart(64, "0")}`);
      setFilename(e.target.files[0].name);
    };

    // Reading the file.
    fr.readAsArrayBuffer(e.target.files[0]);
  };
  return (
    <div className="idSubmission">
      <h3>{prompt}</h3>

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
        <input hidden accept="image/*" multiple type="file" onChange={handleFileInput} />
      </Button>
      <h4>{filename ?? "No file chosen"}</h4>
    </div>
  );
}
