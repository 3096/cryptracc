import { sha256 } from "crypto-hash";
import "./FileHashing.css";
import { Dispatch } from "react";

type Props = { setOutput: Dispatch<React.SetStateAction<string>> };

export default function FileHashing({ setOutput }: Props) {
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
      setOutput("0x" + result);
    };

    // Reading the file.
    fr.readAsArrayBuffer(e.target.files[0]);
  };

  return (
    <div className="hashing-container">
      <div className="hashing-content">
        <div className="hashing-form">
          <form>
            <div className="form-group">
              <label htmlFor="file-input">File Input</label>
              <input type="file" className="form-control" id="file-input" onChange={handleFileInput} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
