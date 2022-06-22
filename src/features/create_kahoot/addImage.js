import { useState } from "react";

export default function AddImage() {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "uno7mtgs");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dm1q6n9ns/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
  }

  return (
    <form
      action=""
      method="post"
      onChange={handleOnChange}
      onSubmit={handleOnSubmit}
    >
      <p>
        <input type="file" name="file" />
      </p>

      <img src={imageSrc} style={{ width: "100px", height: "100px" }} />

      {imageSrc && !uploadData && (
        <p>
          <button className="mt-3">Upload Files</button>
        </p>
      )}

      {uploadData && (
        <code>
          <pre>{JSON.stringify(uploadData, null, 2)}</pre>
        </code>
      )}
    </form>
  );
}
