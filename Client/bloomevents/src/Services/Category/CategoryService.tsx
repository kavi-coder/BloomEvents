import axios from "axios";
import http from "utils/http-common";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

//login
const getAllCategories = async () => {
  return http.get<any>("/category/get/allcategories");
};

const addCategory = async (data: any, token: any) => {
  // return http.put<any>(`/event/placeevent/${id}`);
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/category/addcategory`,
    data: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const CategoryService = {
  getAllCategories,
  addCategory,
};

export default CategoryService;
