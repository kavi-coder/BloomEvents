import CircularProgressItem from "components/CircularProgress/CircularProgressItem";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar-edit";
import { RiImageAddLine } from "react-icons/ri";
import FileUpload from "Services/FileUpload/FileUpload";

function UpdateUserProfilePic({ user }: any) {
  const [token, setToken] = useState<any>();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setToken(JSON.parse(token));
    } else {
      setToken(null);
    }
  }, []);

  //update propic
  const [src, setSrc] = useState<any>();
  const [preview, setPreview] = useState(null);
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

  // handle backdrop
  const [backdrop, setBackdrop] = useState<boolean>(false);
  const handlePropic = () => {
    setBackdrop(true);
    setTimeout(() => {
      const file = FileUpload.convertBase64ToFile(preview, "aa.png");

      let formData = new FormData();
      formData.append("file", file);

      FileUpload.uploadProfilePicture(user?.userId, formData, token);
      window.location.reload();
    }, 1000);
  };

  // image
  const [picture, setPicture] = useState("");
  useEffect(() => {
    setPicture(
      `${process.env.REACT_APP_BACKEND_SERVER}/upload/profilePic/${user?.userId}`
    );
  }, [user]);

  return (
    <div>
      <div className="flex justify-center w-full text-center">
        <div className="flex justify-center mx-auto my-3 mb-5">
          <img
            src={picture}
            alt=""
            className="absolute duration-300 ease-in-out cursor-pointer hover:opacity-25 rounded-full w-[472px] h-[472px] z-1"
          />

          <div
            className={`flex justify-center file:text-transparent ${
              !preview && "opacity-0"
            }  hover:opacity-100 duration-300 items-center z-0 hover:z-10 rounded-full hover:bg-[#ffffff70]`}>
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
              label="Choose profile picture"
              borderStyle={{ borderStyle: "none" }}
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          type="submit"
          onClick={handlePropic}
          className="mt-5 react-hook-form-btn react-hook-form-btn-submit">
          {backdrop === true && (
            <>
              <div className="mr-3">
                <CircularProgressItem />
              </div>
            </>
          )}
          Update Profile Picture
        </button>
      </div>
    </div>
  );
}

export default UpdateUserProfilePic;
