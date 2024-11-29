import React, { useState } from "react"
import { useDropzone } from "react-dropzone"

function Drang_Drop_File({ filetype, Returndata, toggle_spinner }) {
    const [files, setFiles] = useState([])


    React.useEffect(() => {
        console.log("abc", files)
        if (files.length > 0) {
            Returndata(files)
        } else {
            console.log("length is 0")

        }
    }, [files])



    const { getRootProps, getInputProps } = useDropzone({
        accept: filetype,
        onDrop: (acceptedFiles) => {
            console.log("acceptedFiles", acceptedFiles);
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            )
            // toggle_spinner()

        },
    })



    return (
        <>
            {/* <div className="App">
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drop files here</p>
                </div>
                <div>{images}</div>
            </div> */}



            <div className="uplaod-button-wrap"  {...getRootProps()}>
                <div></div>

                <div className="middle-content ">
                    <div className="button-wrap">
                        <label className="new-button" htmlFor="upload">+ Upload File
                          <input {...getInputProps()} />
                        </label>
                    </div>
                    <p className="text-color mb-0 upload-text">Or you can drag & drop your file</p>
                </div>
            </div>




        </>


    )
}

export default Drang_Drop_File