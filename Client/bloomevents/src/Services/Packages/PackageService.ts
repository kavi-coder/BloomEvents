import axios from "axios";
import { Package } from "types/Packages";
import http from "utils/http-common";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

//all providers
const getAllpackages = async () => {
  return http.get<any>("/package/get/allpackages");
};

//get/ Package Count By ProviderId
const getPackageCountByProviderId = async (id: any) => {
  return http.get<any>(`/package/get/packagecountbyproviderid/${id}`);
};

//get/ Packages By ProviderId
const getPackagesByProviderId = async (id: any) => {
  return http.get<any>(`/package/get/packagesbyproviderid/${id}`);
};

const getPackageByPackageId = async (id: any) => {
  return http.get<any>(`/package/get/packagebypackageid/${id}`);
};

// add package
const addPackage = async (data: Package, token: any) => {
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/package/addpackage`,
    data: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

//update package
const updatePackage = async (data: Package, packageId: any, token: any) => {
  const response = await axios({
    method: "put",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/package/updatepackage/${packageId}`,
    data: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// delete package
const deletePackage = async (packageId: any, token: any) => {
  // return http.delete<any>(`/package/deletepackage/${packageId}`);
  const response = await axios({
    method: "delete",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/package/deletepackage/${packageId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// get Total Price By EventId
const getTotalPriceByEventId = async (id: any) => {
  return http.get<any>(`/package/get/totalpricebyeventid/${id}`);
};

const getPackageCountByCategoryId = async (id: any) => {
  return http.get<any>(`/package/get/packagecountbycategoryid/${id}`);
};

const PackageServices = {
  getAllpackages,
  getPackageCountByProviderId,
  getPackagesByProviderId,
  getPackageByPackageId,
  addPackage,
  updatePackage,
  deletePackage,
  getTotalPriceByEventId,
  getPackageCountByCategoryId,
};

export default PackageServices;
