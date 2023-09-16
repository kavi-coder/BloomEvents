import EventServices from "Services/Event/EventServices";
import PaymentService from "Services/Payment/PaymentService";
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import http from "utils/http-common";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getallBookings = async () => {
  return http.get<any>(`/bookings/get/allbookings`);
};

const getBookingDetailsByEventId = async (id: any) => {
  return http.get<any>(`/bookings/get/bookingdetailsbyeventid/${id}`);
};

// add Booking
const addBooking = async (data: any, token: any) => {
  //console.log(data);
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/bookings/addbooking`,
    data: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// make booking front end function
const makeBooking = async (
  user: any,
  event: any,
  totalPrice: number,
  token: any
) => {
  const bookingDate = dayjs();
  const newPayment = {
    userId: user?.userId,
    paymentDate: bookingDate.format("DD-MMM-YYYY").toString(),
    paymentTime: bookingDate.format("hh:mm A").toString(),
    amount: totalPrice,
  };
  const result = await PaymentService.addPayment(newPayment, token);
  if (result.data.status === 1) {
    const newBooking = {
      eventId: Number(event.eventId),
      bookingDate: bookingDate.format("DD-MMM-YYYY").toString(),
      bookingTime: bookingDate.format("hh:mm A").toString(),
      paymentId: result?.data.data?.paymentId,
    };
    const result1 = await BookingService.addBooking(newBooking, token);
    if (result1.data.status === 1) {
      EventServices.bookedEvent(event.eventId, token).then((res: any) => {
        if (res.data.status === 1) {
          toast.success("Payment Successfull");
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          toast.error("Payment Failed");
        }
      });
    } else {
      toast.error("Payment Failed");
    }
  } else {
    toast.error("Payment Failed");
  }
};

const BookingService = {
  getBookingDetailsByEventId,
  addBooking,
  makeBooking,
  getallBookings,
};

export default BookingService;
