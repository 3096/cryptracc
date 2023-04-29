import React, { useState } from 'react';
import { sha256} from 'crypto-hash';
import './FileHashing.css';

export default function FileHashing() {
    let [file_input, setFileInput] = useState('');
    let [output, setOutput] = useState('');

    // For handling file input
    const handleFileInput = (e : any) => {
        // Initializing the file reader
        const fr = new FileReader();

        // Listening to when the file has been read.
        fr.onload = async () => {
            let result = '';
            // Hashing the content based on the active algorithm
            result = await sha256(fr.result as string);


            // Setting the hashed text as the output
            setOutput(result);
            // Setting the content of the file as file input
            setFileInput(fr.result as string);
        }

        // Reading the file.
        fr.readAsArrayBuffer(e.target.files[0]);
    }

    return (
        <div className='hashing-container'>
            <div className='hashing-content'>
                <div className="hashing-form">
                    <form>
                        <div className="form-group">
                            <label htmlFor="file-input">File Input</label>
                            <input type="file" className="form-control" id="file-input" onChange={handleFileInput} />
                        </div>
                    </form>
                </div>

                <div className="hashed-output">
                    <h4 className="hashed-algorithm-heading">Output</h4>
                    <div className="hashed-algorithm-container">
                        <p className="hashed-algorithm-text">
                            {output}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}