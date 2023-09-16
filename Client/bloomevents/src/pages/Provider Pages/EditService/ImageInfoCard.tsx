import CircularProgressItem from "components/CircularProgress/CircularProgressItem";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUpload from "Services/FileUpload/FileUpload";
import { toast } from "react-toastify";

function ImageInfoCard({
  source,
  providerId,
  setDeleteName,
  limit,
  setLimit,
}: any) {
  const server = `http://localhost:8080/upload/ProviderImages/${providerId}`;

  const [token, setToken] = useState<any>();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setToken(JSON.parse(token));
    } else {
      setToken(null);
    }
  }, []);

  const [backdropDelete, setBackdropDelete] = useState<boolean>(false);
  const handleDeleteImage = (e: any) => {
    e.preventDefault();
    setBackdropDelete(true);
    setTimeout(() => {
      setDeleteName(source);
      setBackdropDelete(false);
      // setLimit(limit + 1);
      FileUpload.deleteServiceDetailImage(providerId, source, token).then(
        (res: any) => {
          if (res.status === 200) {
            toast.success("Successfully Deleted");
          } else {
            toast.error("Delete Failed");
          }
        }
      );
    }, 1000);

    // alert();
  };

  return (
    <div
      className={`rounded-lg relative hover:scale-[1.02] duration-200 ease-in-out`}>
      <div className="image-info-delete-btn z-1">
        <button
          type="submit"
          onClick={handleDeleteImage}
          className="react-hook-form-btn react-hook-form-btn-delete">
          {backdropDelete === true ? (
            <>
              <div className="">
                <CircularProgressItem />
              </div>
            </>
          ) : (
            <DeleteIcon />
          )}
        </button>
      </div>
      <img
        src={`${server}/${source}`}
        alt={""}
        style={{ width: "100%", height: "200px" }}
        className={`rounded-lg`}
      />
    </div>
  );
}

export default ImageInfoCard;
