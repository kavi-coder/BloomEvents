import { Box, Button, Pagination, Tab, TextField } from "@mui/material";
import CalenderElement from "components/Elements/CalenderElement";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import logo from "img/logo.png";

import { AiOutlineClose } from "react-icons/ai";
import { RouteName } from "constant/routeName";
import ProviderDetailsCard from "components/Cards/ProviderDetailsCard";
import SuccessSnakBar from "components/Snak Bars/SuccessSnakBar";
import Carousel from "components/Carousel/Carousel";
import ServiceProviderSkeleton from "skeleton/Service Provider/ServiceProviderSkeleton";
import { toast } from "react-toastify";
import ProviderService from "Services/Provider/ProviderServices";
import React from "react";
import PackageServices from "Services/Packages/PackageService";
import { Package } from "types/Packages";
import BookNowDropdownPackages from "components/Drop Downs/BookNowDropdownPackages";
import BookNowDropDownEvents from "components/Drop Downs/BookNowDropDownEvents";
import EventServices from "Services/Event/EventServices";
import { AddToEvent } from "types/AddToEvent";
import AddToEventService from "Services/AddToEvent/AddToEventService";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Reviews from "components/Cards/Reviews";
import { Review } from "types/Review";
import ReviewService from "Services/ReviewService/ReviewService";
import ProviderPackageSwiper from "components/Carousel/ProviderPackageSwiper";
import FileUpload from "Services/FileUpload/FileUpload";
import dayjs from "dayjs";

function ProviderDetails() {
  let { providerId } = useParams();
  let iid = 0;

  const [user, setuser] = useState<any>();
  const [provider, setProvider] = useState<any>();

  useEffect(() => {
    setTimeout(() => {
      let logged = localStorage.getItem("loggedUser");
      if (logged) {
        setuser(JSON.parse(logged));
        iid = JSON.parse(logged).userId;
        let ProviderMode = localStorage.getItem("ProviderMode");
        if (ProviderMode) {
          ProviderMode = JSON.parse(ProviderMode);
          if (ProviderMode) {
            navigate(
              RouteName.MyServices.replace(":id", user?.userId.toString())
            );
          }
        }
      } else {
        setuser(null);
      }
    }, 1000);
  }, [
    localStorage.getItem("loggedUser"),
    localStorage.getItem("ProviderMode"),
  ]);

  const [token, setToken] = useState<any>();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setToken(JSON.parse(token));
    } else {
      setToken(null);
    }
  }, []);

  React.useEffect(() => {
    ProviderService.getProvider(providerId).then((res: any) => {
      if (res.data.status == 1) {
        setProvider(res.data.data);
        return;
      } else {
      }
    });
  }, []);

  // get packages
  const [packages, setPackages] = useState<Array<Package>>();

  React.useEffect(() => {
    PackageServices.getPackagesByProviderId(providerId).then((res: any) => {
      if (res.data.status === 1) {
        setPackages(res.data.data);
        return;
      }
    });
  }, []);

  // get user events
  const [events, setEvents] = useState<any>(null);
  React.useEffect(() => {
    setTimeout(() => {
      EventServices.getEventsByUserId(iid).then((res: any) => {
        if (res.data.status === 1) {
          const filteredData = res.data.data?.filter(
            (emp: any) =>
              emp.placed === false &&
              dayjs(
                `${emp?.eventDate} ${emp?.eventTime}`,
                "DD-MMM-YYYY hh:mm A"
              ).isAfter(dayjs())
          );
          setEvents(filteredData);
          return;
        } else {
          //toast.error(res.data.message);
        }
      });
    }, 1500);
  }, []);
  // console.log(events);

  // more Info
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //book Now
  const navigate = useNavigate();
  const [openbook, setOpenbook] = useState(false);

  const handleClickOpenBook = () => {
    if (user) {
      setOpenbook(true);
    } else {
      navigate(RouteName.Login);
    }
  };

  const handleCloseBook = () => {
    setOpenbook(false);
  };

  // choose event
  const [successAddEvent, setSuccessAddEvent] = useState<boolean>(false);
  const [emptyField, setEmptyFeild] = useState<boolean>(false);

  const [eventId, setEventId] = useState<any | 0>(0);
  const [quantity, setQuantity] = useState<any | 1>(1);
  const [packageId, setPackageId] = useState<any | 0>(0);
  const [userId, setUserId] = useState<any | 0>(0);
  const [timestamp, setTimestamp] = useState<any | null>(null);

  const [values, setValues] = useState<AddToEvent>({
    addToEventId: 0,
    eventId: 0,
    packagesPackageId: 0,
    isApproved: false,
    isPlaced: false,
    reviewed: false,
    quantity: 1,
  });

  useEffect(() => {
    setValues({
      addToEventId: 0,
      eventId: eventId,
      packagesPackageId: packageId,
      isApproved: false,
      isPlaced: false,
      reviewed: false,
      quantity: quantity,
    });
    setSuccessAddEvent(successAddEvent);
  }, [eventId, packageId, userId, successAddEvent, quantity]);

  const handleAddToEvent = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (values.eventId === 0 || values.packagesPackageId === 0) {
      setEmptyFeild(true);
    } else {
      if (user == null) {
        navigate(RouteName.Login);
        return;
      }
      setTimeout(async () => {
        const result = await AddToEventService.addPackageToEvent(values, token);
        //console.log(result);
        if (result.data.status == 1) {
          setOpenbook(false);
          setSuccessAddEvent(true);
          console.log(values);
        } else {
          toast.error("Adding Failed");
        }
      }, 1000);
    }
  };

  // package and review
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // get reviews
  const [reviews, setReviews] = useState<Array<Review>>();

  useEffect(() => {
    ReviewService.getReviewsByProviderId(providerId).then((res: any) => {
      if (res.data.status == 1) {
        setReviews(res.data.data);
        // console.log(res.data.data);
        return;
      } else {
        //toast.error(res.data.message);
      }
    });
  }, []);

  // get provider logo
  const [picture, setPicture] = useState("");
  useEffect(() => {
    FileUpload.getProfilePicture(1).then((res: any) => {
      // console.log(res);
      if (res.status == 200) {
        setPicture(
          `${process.env.REACT_APP_BACKEND_SERVER}/upload/ProviderLogos/${provider?.providerId}`
        );
        return;
      }
    });
  }, [provider]);

  // add pagination for review
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const itemsForCurrentPage = reviews?.slice(startIndex, endIndex);

  return (
    <div>
      {provider ? (
        <div>
          {/* <ServiceProviderSkeleton /> */}
          <div className="flex justify-around w-full pt-28 h-[800px]">
            <div className="w-8/12 px-16">
              <div className="flex items-center">
                <div className="mr-3 rounded-full">
                  <img
                    src={picture}
                    alt=""
                    className="w-20 h-20 rounded-full"
                  />
                </div>
                <div>
                  <h1 className="text-4xl text-[#c26d06]">
                    {provider.businessName}
                  </h1>
                  <h1 className="text-lg">{provider.categoryName}</h1>
                </div>
              </div>

              {/* <SwiperElemet width={"850px"} height={"500px"} thumbnails={true} time={4000} b_radius={"10px"}/> */}
              <Carousel providerId={provider?.providerId} />
            </div>

            <div className="w-4/12 block items-center px-8 mt-[160px]">
              <div>
                <h1 className="text-xl text-center text-[#000] uppercase">
                  Avalble Slots
                </h1>
                <div className="bottom-0 flex justify-center w-full mt-5">
                  <CalenderElement providerId={providerId} />
                </div>
              </div>

              <div className="">
                <div className="flex justify-around w-8/12 mx-auto mt-5">
                  <Button
                    variant="contained"
                    color="success"
                    className="!bg-[#bd6800] hover:!bg-[#965200]"
                    onClick={handleClickOpen}>
                    More Infomation
                  </Button>

                  {events && packages && user && (
                    <Button
                      variant="contained"
                      color="secondary"
                      className="!bg-[#bd6800] hover:!bg-[#965200]"
                      onClick={handleClickOpenBook}>
                      Add to Event
                    </Button>
                  )}
                </div>

                {/* // more information */}
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description">
                  <DialogActions>
                    <h1 onClick={handleClose}>
                      <AiOutlineClose className="p-1 text-2xl text-red-700 hover:bg-red-300" />
                    </h1>
                  </DialogActions>

                  <DialogTitle id="alert-dialog-title">
                    <div className="flex items-center">
                      <img src={logo} alt="" className="w-20" />
                      <h1 className="text-3xl">{provider.businessName}</h1>
                    </div>
                  </DialogTitle>

                  <DialogContent>
                    <ProviderDetailsCard providerDetails={provider} />
                  </DialogContent>
                </Dialog>

                {/* //add to Event */}
                <div className="flex items-center justify-start w-4/12 px-16 mt-16">
                  <Dialog open={openbook} onClose={handleCloseBook}>
                    <DialogActions>
                      <h1 onClick={handleCloseBook}>
                        <AiOutlineClose className="p-1 text-2xl text-red-700 hover:bg-red-300" />
                      </h1>
                    </DialogActions>

                    <DialogTitle>
                      Make your day with {provider.businessName}
                    </DialogTitle>

                    <DialogContent>
                      <div className="w-[11/12]">
                        {events && user && (
                          <BookNowDropDownEvents
                            array={events}
                            title="Event"
                            func={setEventId}
                            val={values.eventId}
                          />
                        )}

                        {packages && user && (
                          <BookNowDropdownPackages
                            array={packages}
                            title="Package"
                            func={setPackageId}
                            val={values.packagesPackageId}
                          />
                        )}

                        <TextField
                          color="warning"
                          id="outlined"
                          type={"text"}
                          label="Package Quantity"
                          variant="outlined"
                          className="form-textfield-double"
                          onChange={(e) => {
                            setQuantity(e.target.value);
                          }}
                        />
                      </div>
                    </DialogContent>

                    <DialogActions>
                      <Button
                        onClick={handleAddToEvent}
                        variant="contained"
                        className="!bg-[#bd6800] hover:!bg-[#965200]">
                        Add to Event
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>

          {/* package Details */}
          <div>
            <Box
              sx={{ width: "80%", margin: "10px auto", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example">
                    <Tab label="Packages" value="1" />
                    <Tab label="Customer Reviews" value="2" />
                    {/* <Tab label="Item Three" value="3" /> */}
                  </TabList>
                </Box>

                <TabPanel value="1">
                  {/* {packages ? <PackageList packages={packages} /> : <></>} */}
                  {packages ? (
                    <ProviderPackageSwiper
                      packages={packages}
                      image={picture}
                    />
                  ) : (
                    <></>
                  )}
                </TabPanel>

                <TabPanel value="2">
                  {reviews ? (
                    <>
                      {itemsForCurrentPage?.map((review: any, i: number) => (
                        <Reviews review={review} key={i} />
                      ))}
                      <div className="flex justify-center w-full">
                        <Pagination
                          count={Math.ceil(reviews?.length / perPage)}
                          page={page}
                          onChange={handlePageChange}
                          variant="outlined"
                          shape="rounded"
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </TabPanel>
              </TabContext>
            </Box>
          </div>

          <div className="absolute bottom-0 left-0">
            {successAddEvent && (
              <SuccessSnakBar
                func={setSuccessAddEvent}
                type="success"
                val={successAddEvent}
                msg={"Successfully Added !"}
              />
            )}
            {emptyField && (
              <SuccessSnakBar
                func={setEmptyFeild}
                type="error"
                val={emptyField}
                msg={"You can not have empty fields !"}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="w-full">
          <ServiceProviderSkeleton />
        </div>
      )}
    </div>
  );
}

export default ProviderDetails;
