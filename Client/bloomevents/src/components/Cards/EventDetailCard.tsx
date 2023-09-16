import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { RouteName } from "constant/routeName";
import PackageServices from "Services/Packages/PackageService";
import { toast } from "react-toastify";
import ProviderService from "Services/Provider/ProviderServices";
import AddToEventService from "Services/AddToEvent/AddToEventService";
import FileUpload from "Services/FileUpload/FileUpload";
import dayjs from "dayjs";
import AddReviewDialog from "components/Dialog Boxes/AddReviewDialog";
import { ServiceProvider } from "types/ServiceProvider";

function EventDetailCard({
  addToEvent,
  setTotalPrice,
  totalPrice,
  setDeleteId,
  booked,
  eventDate,
  eventTime,
  userId,
}: any) {
  const [token, setToken] = useState<any>();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setToken(JSON.parse(token));
    } else {
      setToken(null);
    }
  }, []);

  const handleDeleteEvent = () => {
    setTotalPrice(totalPrice - Number(packge?.price));
    AddToEventService.deletePackage(addToEvent.addToEventId, token).then(
      (res: any) => {
        if (res.data.data === 1) {
          toast.success("Successfully Deleted");
        } else {
          toast.error(res.data.message);
        }
      }
    );
    setDeleteId(addToEvent.addToEventId);
  };

  const [packge, setPackge] = React.useState<any>();

  React.useEffect(() => {
    PackageServices.getPackageByPackageId(addToEvent.packagesPackageId).then(
      (res: any) => {
        if (res.data.status === 1) {
          setPackge(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      }
    );
  }, []);

  const [provider, setProvider] = React.useState<ServiceProvider>();
  React.useEffect(() => {
    if (packge) {
      ProviderService.getProviderByPackageId(addToEvent.packagesPackageId).then(
        (res: any) => {
          if (res.data.status === 1) {
            setProvider(res.data.data);
            // console.log(res.data.data);
            return;
          } else {
            toast.error(res.data.message);
          }
        }
      );
    }
  }, [packge]);

  const [picture, setPicture] = useState("");
  useEffect(() => {
    FileUpload.getProfilePicture(1).then((res: any) => {
      // console.log(res);
      if (res.status === 200) {
        setPicture(
          `${process.env.REACT_APP_BACKEND_SERVER}/upload/ProviderLogos/${provider?.providerId}`
        );
        return;
      }
    });
  }, [provider]);

  // review
  // handle payment

  const [openReview, setOpenReview] = React.useState(false);

  const handleClickOpenReview = () => {
    setOpenReview(true);
  };
  const handleClickCloseReview = () => {
    setOpenReview(false);
  };

  return (
    <div className="border-solid border-[2px] border-[#ffa537] rounded-xl hover:scale-105 ease-in-out duration-200">
      {packge && (
        <>
          <div className="w-full card glass">
            <Link
              to={{
                pathname: `${RouteName.ProviderDetails.replace(
                  ":providerId",
                  packge.providerId.toString()
                )}`,
              }}
              className="">
              <figure className="rounded-xl max-h-[250px] overflow-hidden">
                <img
                  src={picture}
                  alt="car!"
                  // width={"100%"}
                  className={
                    "rounded-t-xl p-1 !pb-0 mx-auto flex justify-center items-center"
                  }
                />
              </figure>
            </Link>

            {/* details */}
            <div className="grid items-center w-full grid-cols-3">
              <div className="col-span-2">
                <Link
                  to={{
                    pathname: `${RouteName.ProviderDetails.replace(
                      ":providerId",
                      packge.providerId.toString()
                    )}`,
                  }}
                  className="">
                  <div className="w-full px-4 py-2 card-body">
                    <h2 className=" text-[#ffa537]">
                      {provider?.businessName}
                    </h2>
                    <p className="text-[#000]">
                      {packge.packageName} - Rs. {packge.price}
                    </p>

                    <p className="text-[#000]">
                      Quantity - {addToEvent.quantity}
                    </p>
                  </div>
                </Link>
              </div>

              {/* delete btn */}
              <div className="">
                {addToEvent.approved === false ? (
                  <div className="flex items-center justify-end px-4 my-3 text-center card-actions">
                    <button
                      type="button"
                      onClick={handleDeleteEvent}
                      className="text-red-600 border-red-600 hover:bg-red-600 my-event-card-btn !rounded-full !p-2 !w-12 !h-12">
                      <span className="">
                        <DeleteIcon />
                      </span>
                    </button>
                  </div>
                ) : (
                  <>
                    {booked === true &&
                      dayjs(
                        `${eventDate} ${eventTime}`,
                        "DD-MMM-YYYY hh:mm A"
                      ).isBefore(dayjs()) && (
                        <>
                          {userId !== provider?.userId &&
                            addToEvent.reviewed === false && (
                              <div className="flex items-center justify-end px-4 my-3 text-center card-actions">
                                <button
                                  type="button"
                                  onClick={handleClickOpenReview}
                                  className={
                                    "border-green-600 bg-green-600 my-event-card-btn !text-sm !text-white"
                                  }>
                                  Add Review
                                </button>

                                <AddReviewDialog
                                  openReview={openReview}
                                  handleClickCloseReview={
                                    handleClickCloseReview
                                  }
                                  addToEventId={addToEvent.addToEventId}
                                  providerId={packge.providerId}
                                  userId={userId}
                                />
                              </div>
                            )}
                        </>
                      )}
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default EventDetailCard;
