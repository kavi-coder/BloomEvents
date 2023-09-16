import axios from "axios";
import { Event } from "types/Event";
import http from "utils/http-common";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

//all providers
const getAllEvents = async () => {
  return http.get<any>("/event/get/allevents");
};

//add Events
const addEvent = async (data: Event, token: any) => {
  //console.log(data);
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/event/addevent`,
    data: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// get events by user id
const getEventsByUserId = async (id: any) => {
  return http.get<any>(`/event/get/eventsbyuserid/${id}`);
};

const deleteEvent = async (id: any, token: any) => {
  // return http.delete<any>(`/event/deleteevent/${id}`);
  const response = await axios({
    method: "delete",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/event/deleteevent/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const getEventById = async (id: any) => {
  return http.get<any>(`/event/get/eventbyid/${id}`);
};

const placeEvent = async (data: any, token: any) => {
  const response = await axios({
    method: "put",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/event/placeevent`,
    data: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const bookedEvent = async (id: any, token: any) => {
  const response = await axios({
    method: "put",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/event/bookevent/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// get booking dates by provider Id
const getBookingDatesByProviderId = async (id: any) => {
  return http.get<any>(`/event/get/bookingdatesbyproviderid/${id}`);
};

const EventServices = {
  getAllEvents,
  addEvent,
  getEventsByUserId,
  deleteEvent,
  getEventById,
  placeEvent,
  bookedEvent,
  getBookingDatesByProviderId,
};

export default EventServices;
