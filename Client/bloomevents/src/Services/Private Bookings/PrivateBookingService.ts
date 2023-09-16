import axios from "axios";
import http from "utils/http-common";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

// get private boookings by provider id
const getPrivateBookingsByProviderId = async (providerId: any) => {
  return http.get<any>(
    `/privatebooking/get/privatebookingsbyproviderid/${providerId}`
  );
};

const addPrivateBooking = async (data: any, token: any) => {
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/privatebooking/addprivatebooking`,
    data: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const deletePrivateBookingById = async (bookingId: any, token: any) => {
  // return http.delete<any>(
  //   `/privatebooking/deleteprivatebookingbyid/${bookingId}`
  // );
  const response = await axios({
    method: "delete",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/privatebooking/deleteprivatebookingbyid/${bookingId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const PrivateBookingService = {
  getPrivateBookingsByProviderId,
  addPrivateBooking,
  deletePrivateBookingById,
};
export default PrivateBookingService;
