import axios from "axios";
import { AddToEvent } from "types/AddToEvent";
import http from "utils/http-common";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

// update user details
const updateUser = async (data: AddToEvent, token: any) => {
  const response = await axios({
    method: "put",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/user/updateuser`,
    data: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

//get/ user by id
const getUserByUserId = async (userId: any) => {
  return await http.get<any>(`/user/get/userbyid/${userId}`);
};

// get all users
const getAllUsers = async () => {
  return await http.get<any>(`/user/get/allusers`);
};

//delete user by id
const deleteUserByUserId = async (userId: any, token: any) => {
  // return await http.delete<any>(`/user/deleteuser/${userId}`);
  const response = await axios({
    method: "delete",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/user/deleteuser/${userId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

//change role
const changeRole = async (userId: any, token: any) => {
  // return await http.put<any>(`/user/changerole/${userId}`);
  const response = await axios({
    method: "put",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/user/changerole/${userId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const UserServices = {
  updateUser,
  getUserByUserId,
  getAllUsers,
  deleteUserByUserId,
  changeRole,
};

export default UserServices;
