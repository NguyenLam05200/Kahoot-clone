import axios from "axios";

import React, { Component } from "react";

class UploadImage extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };
  // On file upload (click the upload button)
  onFileUpload = async () => {
    // Create an object of formData
    const formData = new FormData();
    formData.append("upload_preset", "uno7mtgs");
    // Update the formData object
    formData.append(
      "file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    // Details of the uploaded file
    console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    const resp = await axios.post(
      "https://api.cloudinary.com/v1_1/dm1q6n9ns/image/upload",
      formData
    );
    this.props.callback(resp.data.url);
    this.setState({ selectedFile: null });
  };

  // File content to be displayed after
  // file upload is complete

  render() {
    return (
      <div>
        <div className="row">
          <input type="file" onChange={this.onFileChange} />
        </div>
        <div className="row mt-3">
          <button className="btn btn-success" onClick={this.onFileUpload}>
            Upload!
          </button>
        </div>
      </div>
    );
  }
}

export default UploadImage;
