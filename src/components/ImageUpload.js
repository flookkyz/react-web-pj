import React, { useState, useEffect, useRef } from "react";
import "./Create.css";

function ImageUpload(props) {
  const [file, setFile] = useState();
  const [previewUrl, setpreviewUrl] = useState();
  const filePickerRef = useRef();

  useEffect(()=> {
      if(!file){
          return;
      }
      const fileReader = new FileReader();
      fileReader.onload = () => {
          setpreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
  },[file]);

  function pickedHandler(event) {
      let pickedFile;
      if(event.target.files && event.target.files.length===1) {
          pickedFile = event.target.files[0];
          setFile(pickedFile);
      }
  }

  function pickedImageHandler () {
      filePickerRef.current.click();
  }


  return (
    <>
      <div className="form-control center">
        <label htmlFor="title">รูปภาพตารางเรียน :</label>
        <input
          type="file"
          className="form-control in"
          ref={filePickerRef}
          style={{ display: "none" }}
          accept=".jpg,.jpeg,.png"
          onChange={pickedHandler}
        />
      </div>
      <div>
        <div className="image-upload__proview">
          {previewUrl && <img src={previewUrl} alt="preview" />}
          {previewUrl && (
            <div className="center">
              <button
                className="image-upload-button"
                type="button"
                onClick={pickedImageHandler}
              >+</button>
            </div>
          )}
        </div>
        <div>
          <h2>sadasd</h2>
          {previewUrl && (
            <div className="center">
              <button
                className="image-upload-button"
                type="button"
                onClick={pickedImageHandler}
              ></button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ImageUpload;
