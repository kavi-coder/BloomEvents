import {
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineDollarCircle,
} from "react-icons/ai";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { RouteName } from "constant/routeName";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AddToEventService from "Services/AddToEvent/AddToEventService";
import { FiPackage } from "react-icons/fi";

import EventServices from "Services/Event/EventServices";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import DialogBox from "components/Dialog Boxes/DialogBox";
import PackageServices from "Services/Packages/PackageService";
import { Dialog, DialogTitle } from "@mui/material";
import PaypalComponent from "components/Provider/Paypal/PaypalComponent";
import BookingService from "Services/Booking/BookingService";
import PaymentService from "Services/Payment/PaymentService";

function MyEventCard({ event, func }: any) {
  const navigate = useNavigate();
  const [user, setuser] = React.useState<any>("");

  useEffect(() => {
    setTimeout(() => {
      let logged = localStorage.getItem("loggedUser");
      if (logged) {
        setuser(JSON.parse(logged));
      } else {
        setuser(null);
        navigate(RouteName.Login);
      }
    }, 1000);
  }, [localStorage.getItem("loggedUser")]);

  const [token, setToken] = useState<any>();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setToken(JSON.parse(token));
    } else {
      setToken(null);
    }
  }, []);

  // handle delete event
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleClickCloseDelete = () => {
    setOpenDelete(false);
  };

  // handle place event
  const [openPlace, setOpenPlace] = React.useState(false);

  const handleClickOpenPlace = () => {
    setOpenPlace(true);
  };

  const handleClickClosePlace = () => {
    setOpenPlace(false);
  };

  // get package count
  const [packageCount, setPackageCount] = React.useState<number>(0);

  React.useEffect(() => {
    AddToEventService.getpackagecountbyeventid(event.eventId).then(
      (res: any) => {
        if (res.data.status === 1) {
          setPackageCount(res.data.data);
          return;
        }
      }
    );
  }, []);

  //delete function
  const deleteEvent = () => {
    EventServices.deleteEvent(event.eventId, token).then((res: any) => {
      if (res.data.status == 1) {
        func(event.eventId);
        toast.success("Successfully Deleted");
        handleClickCloseDelete();
      } else {
        toast.error(res.data.message);
      }
    });
  };

  // place function
  const placeEvent = () => {
    const placedDate = dayjs();
    const placedEvent = {
      eventId: Number(event.eventId),
      placedDate: placedDate.format("DD-MMM-YYYY").toString(),
      placedTime: placedDate.format("hh:mm A").toString(),
    };
    EventServices.placeEvent(placedEvent, token && token).then((res: any) => {
      if (res.data.status === 1) {
        toast.success("Successfully Placed");
        handleClickClosePlace();
        window.location.reload();
      } else {
        toast.error(res.data.message);
      }
    });
  };

  // get approved package count
  const [approvedCount, setApprovedCount] = React.useState<number>(0);
  React.useEffect(() => {
    AddToEventService.getApprovedPackageCountByEventId(event.eventId).then(
      (res: any) => {
        if (res.data.status === 1) {
          setApprovedCount(res.data.data);
          return;
        }
      }
    );
  }, []);

  // get total price
  const [totalPrice, setTotalPrice] = React.useState(0);
  React.useEffect(() => {
    PackageServices.getTotalPriceByEventId(event.eventId).then((res: any) => {
      if (res.data.status === 1) {
        setTotalPrice(res.data.data);
        return;
      }
    });
  }, []);

  // handle payment
  const [openPayment, setOpenPayment] = React.useState(false);

  const handleClickOpenPayment = () => {
    setOpenPayment(true);
  };
  const handleClickClosePayment = () => {
    setOpenPayment(false);
  };

  // paymnt function
  const [booking, setBooking] = useState<Boolean>();

  useEffect(() => {
    if (booking === true) {
      BookingService.makeBooking(user, event, totalPrice, token && token);
    }
    handleClickClosePayment();
  }, [booking]);

  return (
    <div>
      <div className="w-full">
        <div className=" w-full p-6 my-2 bg-[#fff8ef] rounded-lg shadow-lg flex justify-around">
          <div className="w-8/12">
            <Link
              to={{
                pathname: `${RouteName.EventDetails.replace(
                  ":eventId",
                  event.eventId.toString()
                )}`,
              }}>
              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 ">
                {event.eventName}
              </h5>

              <div className="grid w-full grid-cols-2">
                <div>
                  <p className="flex items-center mb-2 text-base text-neutral-600 ">
                    <AiOutlineCalendar className="mr-1 text-[#ffa537]" />
                    Date : {event.eventDate}
                  </p>

                  <p className="flex items-center mb-2 text-base text-neutral-600 ">
                    <AiOutlineClockCircle className="mr-1 text-[#ffa537]" />
                    Time : {event.eventTime}
                  </p>
                </div>

                <div className="pl-20">
                  <p className="flex items-center mb-2 text-base text-neutral-600 ">
                    <FiPackage className="mr-1 text-[#ffa537]" />
                    Packages : {packageCount}
                  </p>

                  <p className="flex items-center mb-2 text-base text-neutral-600 ">
                    <AiOutlineDollarCircle className="mr-1 text-[#ffa537]" />
                    Total Price : Rs {totalPrice}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* btns */}
          <div className={`flex items-center w-4/12 mt-2 justify-end`}>
            {/* delete or remove btn */}
            <div className="my-event-card-btns">
              {!event.placed ? (
                <>
                  <button
                    type="button"
                    onClick={handleClickOpenDelete}
                    className={`text-red-600 border-red-600 hover:bg-red-600 my-event-card-btn `}>
                    <span className="mr-1">
                      <DeleteIcon />
                    </span>
                    Delete
                  </button>
                </>
              ) : (
                <>
                  {dayjs(
                    `${event.eventDate} ${event.eventTime}`,
                    "DD-MMM-YYYY hh:mm A"
                  ).isBefore(dayjs()) && (
                    <button
                      type="button"
                      onClick={deleteEvent}
                      className={`text-fuchsia-600 border-fuchsia-600 hover:bg-fuchsia-600 my-event-card-btn `}>
                      <span className="mr-1">
                        <DeleteIcon />
                      </span>
                      Remove
                    </button>
                  )}
                </>
              )}
            </div>

            {/* delete dialog */}
            <DialogBox
              open={openDelete}
              close={handleClickCloseDelete}
              actionFunc={deleteEvent}
              actionBtnName={"Delete"}
              color={"red-600"}
              title={
                dayjs(
                  `${event.eventDate} ${event.eventTime}`,
                  "DD-MMM-YYYY hh:mm A"
                ).isBefore(dayjs())
                  ? `Do you want to remove ${event.eventName} ?`
                  : `Do you want to delete ${event.eventName} ?`
              }
            />

            {/* place event */}
            {event?.placed ? (
              <>
                {packageCount !== approvedCount ? (
                  <button
                    type="button"
                    disabled
                    className={
                      "border-green-600 bg-green-600 my-event-card-btn !text-white"
                    }>
                    <span className="mr-1">
                      <DoneAllIcon />
                    </span>
                    Placed
                  </button>
                ) : (
                  <>
                    {packageCount !== 0 ? (
                      <>
                        {dayjs(
                          `${event.eventDate} ${event.eventTime}`,
                          "DD-MMM-YYYY hh:mm A"
                        ).isAfter(dayjs()) && (
                          <button
                            type="button"
                            disabled={event.booked === true ? true : false}
                            onClick={handleClickOpenPayment}
                            className={` ${
                              event.booked === true
                                ? "border-orange-600 bg-orange-600 !text-white"
                                : "text-blue-600 border-blue-600 hover:bg-blue-600"
                            }  my-event-card-btn `}>
                            {event.booked === true ? "Booked" : "Make Payment"}
                          </button>
                        )}

                        <Dialog
                          open={openPayment}
                          onClose={handleClickClosePayment}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                          className="p-5">
                          <DialogTitle id="alert-dialog-title">
                            <PaypalComponent
                              totalPrice={Number(totalPrice)}
                              eventName={event.eventName}
                              setBooking={setBooking}
                            />
                          </DialogTitle>
                        </Dialog>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={handleClickOpenDelete}
                          className="text-red-600 border-red-600 hover:bg-red-600 my-event-card-btn">
                          <span className="mr-1">
                            <DeleteIcon />
                          </span>
                          Delete
                        </button>
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {dayjs(
                  `${event?.eventDate} ${event?.eventTime}`,
                  "DD-MMM-YYYY hh:mm A"
                ).isBefore(dayjs()) ? (
                  <></>
                ) : (
                  <>
                    {packageCount !== 0 && (
                      <button
                        type="button"
                        onClick={handleClickOpenPlace}
                        className={
                          "text-green-600 border-green-600 hover:bg-green-600 my-event-card-btn"
                        }>
                        <span className="mr-1">
                          <CheckIcon />
                        </span>
                        Place Event
                      </button>
                    )}
                  </>
                )}
              </>
            )}

            {/* place event dialog */}
            <DialogBox
              open={openPlace}
              close={handleClickClosePlace}
              actionFunc={placeEvent}
              actionBtnName={"Place Event"}
              title={`Do you want to place ${event.eventName} ?`}
              color={"green-600"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyEventCard;
