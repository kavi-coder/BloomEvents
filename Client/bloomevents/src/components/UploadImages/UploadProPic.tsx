import React from "react";
import Avatar from "react-avatar-edit";
import { useState } from "react";

function UploadProPic({ setPreview }: any) {
  const [src, setSrc] = useState();
  // const [preview, setPreview] = useState(null);
  function onClose() {
    setPreview(null);
  }
  function onCrop(pv: any) {
    setPreview(pv);
  }
  function onBeforeFileLoad(elem: any) {
    if (elem.target.files[0].size > 7168000) {
      alert("File is too big!");
      elem.target.value = "";
    }
  }

  return (
    <div>
      <Avatar
        width={470}
        height={470}
        onCrop={onCrop}
        onClose={onClose}
        onBeforeFileLoad={onBeforeFileLoad}
        src={src}
        exportQuality={1}
        shadingOpacity={0.6}
        exportAsSquare
        exportSize={2000}
        label="Upload profile picture"
        // borderStyle={{ borderStyle: "none" }}
      />
      {/* {preview && (
        <img src={preview} alt="Preview" width={"500px"} height={"500px"} />
      )} */}
    </div>
  );
}

export default UploadProPic;
