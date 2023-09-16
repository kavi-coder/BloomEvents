import CircularProgressItem from "components/CircularProgress/CircularProgressItem";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FileUpload from "Services/FileUpload/FileUpload";
import AddNewImageCard from "./AddNewImageCard";
import { AiFillCloseCircle } from "react-icons/ai";

function AddNewDetailImage({ limit, setLimit, providerId, setNames }: any) {
  const [token, setToken] = useState<any>();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setToken(JSON.parse(token));
    } else {
      setToken(null);
    }
  }, []);

  const [files, setFiles] = useState<File[]>([]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (limit > 0) {
      const n: any = event.target.files?.length;
      setLimit(limit - n);

      const selectedFiles = event.target.files;
      if (selectedFiles) {
        const filesArray = Array.from(selectedFiles);
        setFiles((prevFiles) => [...prevFiles, ...filesArray]);
      }
    }
  };

  const removeImage = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    setLimit(limit + 1);
  };

  const [backdrop, setBackdrop] = useState<boolean>(false);
  const uploadImages = (e: any) => {
    e.preventDefault();
    setBackdrop(true);

    let formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    setTimeout(() => {
      FileUpload.uploadServiceDetailImages(providerId, formData, token).then(
        (res: any) => {
          if (res.status === 200) {
            toast.success("Successfully Uploaded");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            toast.error("Upload failed");
          }
        }
      );
    }, 1000);
  };

  return (
    <div>
      <div className="relative grid grid-cols-5 gap-3 p-3 bg-white">
        {files &&
          Array.from(files).map((file, index) => (
            <div
              className={`rounded-lg relative hover:scale-[1.02] duration-200 ease-in-out`}>
              <div className="image-info-delete-btn z-1">
                <button
                  type="submit"
                  onClick={() => removeImage(index)}
                  className="text-lg react-hook-form-btn react-hook-form-btn-delete">
                  <AiFillCloseCircle />
                </button>
              </div>
              <img
                key={file.name}
                src={URL.createObjectURL(file)}
                alt={file.name}
                className={`rounded-lg`}
                style={{ width: "100%", height: "200px" }}
              />
            </div>
          ))}
        {limit > 0 && <AddNewImageCard func={handleChange} />}
      </div>

      {files?.length > 0 && (
        <div className="react-hook-form-btn-div">
          <button
            type="submit"
            onClick={uploadImages}
            className={`react-hook-form-btn react-hook-form-btn-submit `}>
            {backdrop === true && (
              <>
                <div className="mr-3">
                  <CircularProgressItem />
                </div>
              </>
            )}
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}

export default AddNewDetailImage;
