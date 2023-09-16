import axios from "axios";
import http from "utils/http-common";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

//get/ Email By User Id
const getEmailByUserId = async (userId: any) => {
  return http.get<any>(`/logindetails/get/emailbyuserid/${userId}`);
};

// update password
const updatePassword = async (id: any, data: any, token: any) => {
  const response = await axios({
    method: "put",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/logindetails/updatepassword/${id}`,
    data: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// set default pw
const setDefaultPW = async (userId: any, token: any) => {
  // return await http.put<any>(`/logindetails/defaultPassword/${userId}`);
  const response = await axios({
    method: "put",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/logindetails/defaultPassword/${userId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const LoginDetailsServices = {
  getEmailByUserId,
  updatePassword,
  setDefaultPW,
};

export default LoginDetailsServices;
