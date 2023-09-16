import axios from "axios";
import http from "utils/http-common";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

//get/ reviews by provider id
const getReviewsByProviderId = async (providerId: any) => {
  return http.get<any>(`/review/get/reviewsbyproviderid/${providerId}`);
};

const addReview = async (data: any, addToEventId: any, token: any) => {
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/review/addreview/${addToEventId}`,
    data: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const ReviewService = { getReviewsByProviderId, addReview };
export default ReviewService;
