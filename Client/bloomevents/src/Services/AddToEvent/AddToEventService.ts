import axios from "axios";
import { AddToEvent } from "types/AddToEvent";
import http from "utils/http-common";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

//get/ all packages
const getAllAddToEvent = async () => {
  return http.get<any>("/addtoevent/get/alladdtoevent");
};

// add package to event
const addPackageToEvent = async (data: AddToEvent, token: any) => {
  //console.log(data);
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/addtoevent/addpackagetoevent`,
    data: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

//get/ packkage count
const getpackagecountbyeventid = async (eventId: any) => {
  return http.get<any>(`/addtoevent/get/packagecountbyeventid/${eventId}`);
};

// get packages
const getPackagesByEventId = async (eventId: any) => {
  return http.get<any>(`/addtoevent/get/packagesbyeventid/${eventId}`);
};

const deletePackage = async (eventId: any, token: any) => {
  const response = await axios({
    method: "delete",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/addtoevent/deletepackagebyid/${eventId}`,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const getPlacedPackagesByProviderId = async (providerId: any) => {
  return http.get<any>(
    `/addtoevent/get/placedpackagesbyproviderId/${providerId}`
  );
};

// approve package
const approvePackage = async (addToEventId: any, token: any) => {
  const response = await axios({
    method: "put",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_BACKEND_SERVER}/addtoevent/approvepackage/${addToEventId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// get approved but not booked events
const getApprovedPackagesByProviderId = async (providerId: any) => {
  return http.get<any>(
    `/addtoevent/get/approvedpackagesbyproviderId/${providerId}`
  );
};

// get booked events
const getBookedPackagesByProviderId = async (providerId: any) => {
  return http.get<any>(
    `/addtoevent/get/bookedpackagesbyproviderId/${providerId}`
  );
};

// get booked events
const getApprovedPackageCountByEventId = async (eventId: any) => {
  return http.get<any>(
    `/addtoevent/get/approvedpackagecountbyeventid/${eventId}`
  );
};

// get all booked packages
const getAllBookedPackages = async () => {
  return http.get<any>(`/addtoevent/get/allbookedpackages`);
};

const getRequestCountByUserId = async (userId: any) => {
  return http.get<any>(`/addtoevent/get/requestcountbyuserid/${userId}`);
};

const getRequestCountByProviderId = async (providerId: any) => {
  return http.get<any>(
    `/addtoevent/get/requestcountbyproviderid/${providerId}`
  );
};

const AddToEventService = {
  getAllAddToEvent,
  addPackageToEvent,
  getpackagecountbyeventid,
  getPackagesByEventId,
  deletePackage,
  getPlacedPackagesByProviderId,
  approvePackage,
  getApprovedPackagesByProviderId,
  getBookedPackagesByProviderId,
  getApprovedPackageCountByEventId,
  getAllBookedPackages,
  getRequestCountByUserId,
  getRequestCountByProviderId,
};

export default AddToEventService;
