import axios from "axios";
import http from "utils/http-common";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

//get Email By User Id
const getProfilePicture = async (userId: any) => {
  return http.get<any>(
    `${process.env.REACT_APP_BACKEND_SERVER}/upload/profilePic/${userId}`
  );
};

// convert Base64 string to file
const convertBase64ToFile = (base64String: any, filename: any) => {
  const arr = base64String.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

// upload profile picture
const uploadProfilePicture = async (userId: any, formData: any, token: any) => {
  //console.log(data);
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/upload/uploadprofilepic/${userId}`,
    data: formData,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

// upload service logo
const uploadServiceLogo = async (
  providerId: any,
  formData: any,
  token: any
) => {
  //console.log(data);
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/upload/provideruploadimage/${providerId}`,
    data: formData,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

// get provider details image names
const getImageNames = async (providerId: any) => {
  return http.get<any>(
    `${process.env.REACT_APP_BACKEND_SERVER}/upload/ProviderImages/${providerId}`
  );
};

// upload service logo
const uploadServiceDetailImages = async (
  providerId: any,
  formData: any,
  token: any
) => {
  //console.log(data);
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/upload/uploadprivoderdetailpics/${providerId}`,
    data: formData,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

// delete provider details image
const deleteServiceDetailImage = async (
  providerId: any,
  fileName: any,
  token: any
) => {
  // return http.delete<any>(
  //   `${process.env.REACT_APP_BACKEND_SERVER}/upload/deletedtailimage/${providerId}/${fileName}`
  // );

  const response = await axios({
    method: "delete",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/upload/deletedtailimage/${providerId}/${fileName}`,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const FileUpload = {
  getProfilePicture,
  convertBase64ToFile,
  uploadProfilePicture,
  uploadServiceLogo,
  getImageNames,
  uploadServiceDetailImages,
  deleteServiceDetailImage,
};

export default FileUpload;
