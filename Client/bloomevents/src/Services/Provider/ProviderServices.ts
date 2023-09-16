import axios from "axios";
import http from "utils/http-common";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

//all providers
const getAllServices = async () => {
  return http.get<any>("/provider/get/allproviders");
  // var config = {
  //   method: "get",
  //   url: "http://localhost:8080/provider/get/allproviders",
  // };

  // axios(config)
  //   .then(function (response) {
  //     console.log(response.data);
  //     return response.data;
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
};

//get/ provider
const getProvider = async (id: any) => {
  return http.get<any>(`/provider/get/providerbyid/${id}`);
};

//get/ provider by package id
const getProviderByPackageId = async (packageId: any) => {
  return http.get<any>(`/provider/get/providerbypackageid/${packageId}`);
};

const getProvidersByUserId = async (userId: any) => {
  return http.get<any>(`/provider/get/providersbyuserid/${userId}`);
};

// update provider
const updateProvider = async (data: any, token: any) => {
  const response = await axios({
    method: "put",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/provider/updateprovider`,
    data: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

//add provider
const addProvider = async (data: any, token: any) => {
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/provider/addprovider`,
    data: data,

    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

//get/ provider by package id
const deleteProvider = async (providerId: any, token: any) => {
  // return http.delete<any>(`/provider/deleteprovider/${providerId}`);
  const response = await axios({
    method: "delete",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/provider/deleteprovider/${providerId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// get provider count by category id
const getProviderCountByCategoryId = async (categoryId: any) => {
  return http.get<any>(`/provider/get/providercountbycategoryid/${categoryId}`);
};

const ProviderService = {
  getAllServices,
  getProvider,
  getProviderByPackageId,
  getProvidersByUserId,
  updateProvider,
  addProvider,
  deleteProvider,
  getProviderCountByCategoryId,
};

export default ProviderService;
