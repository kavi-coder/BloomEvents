import { useEffect, useState } from "react";
import { TextField } from "@mui/material";

import { districts } from "docs/districts";
import SignupDropDown from "components/Drop Downs/SignupDropdown";
import { useNavigate, useParams } from "react-router-dom";
import { RouteName } from "constant/routeName";
import { useForm } from "react-hook-form";
import LoginDetailsServices from "Services/Login Details/LoginDetailsServices";
import UserServices from "Services/User/UserServices";
import { toast } from "react-toastify";
import ChangePassword from "./ChangePassword";
import FileUpload from "Services/FileUpload/FileUpload";
import profile from "img/no-profile.jpg";
import Avatar from "react-avatar-edit";
import { Role } from "Enums/Role";
import UpdateUserProfilePic from "./UpdateUserProfilePic";
import CircularProgressItem from "components/CircularProgress/CircularProgressItem";

function UserProfile() {
  let { userId } = useParams();
  const [userEmail, setUserEmail] = useState<any>();

  // check logged user
  const navigate = useNavigate();
  const [user, setuser] = useState<any>();
  useEffect(() => {
    let logged = localStorage.getItem("loggedUser");
    if (logged) {
      setuser(JSON.parse(logged));
      setDistrict(JSON.parse(logged).district);
      if (logged) {
        LoginDetailsServices.getEmailByUserId(JSON.parse(logged).userId).then(
          (res: any) => {
            if (res.data.status == 1) {
              setUserEmail(res.data.data);
              return;
            }
          }
        );
      }

      if (
        JSON.parse(logged).userId != userId &&
        JSON.parse(logged).role != Role.ADMIN
      ) {
        localStorage.removeItem("loggedUser");
        localStorage.removeItem("token");
        localStorage.removeItem("ProviderMode");
        navigate(RouteName.Home);
      }
    } else {
      setuser(null);
      navigate(RouteName.Login);
    }
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
  // console.log(user);

  // set district
  const [district, setDistrict] = useState<any>();

  // handle backdrop
  const [backdrop, setBackdrop] = useState<boolean>(false);

  //handle form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setBackdrop(true);
    const updatedUser: any = {
      userId: user.userId,
      district: data.district,
      firstName: data.firstName,
      lastName: data.lastName,
      mobile: data.mobile,
    };

    setTimeout(async () => {
      const result = await UserServices.updateUser(updatedUser, token);
      if (result.data.status == 1) {
        const newUser = await UserServices.getUserByUserId(user.userId);
        if (newUser) {
          localStorage.setItem("loggedUser", JSON.stringify(newUser.data.data));
          toast.success("Profile Updated");
          window.location.reload();
        }
      } else {
        console.log("failed");
      }
    }, 1000);
  };

  // change password
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //get profile picture
  const [propic, setPropic] = useState<any>("");
  useEffect(() => {
    FileUpload.getProfilePicture(user?.userId).then((res: any) => {
      // console.log(res);
      if (res.status == 200) {
        setPropic(
          `${process.env.REACT_APP_BACKEND_SERVER}/upload/profilePic/${user?.userId}`
        );
        return;
      }
    });
  }, [user]);

  return (
    <div className="flex w-11/12 mb-20 pt-28">
      {user && userEmail && (
        <>
          <div className="w-6/12 mx-auto mt-5">
            <UpdateUserProfilePic user={user} />
          </div>

          <div className="w-6/12 pt-14">
            <div className="mt-10 sm:mt-0">
              <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                <div className="overflow-hidden drop-shadow-2xl sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <h1 className="mb-3 text-3xl text-left">
                      Update <span className="text-[#ffa537]">Account</span>
                    </h1>

                    {/* first name and last name */}
                    <div className="form-input-main-div">
                      <div className="form-input-sub-div">
                        <TextField
                          color="warning"
                          id="outlined"
                          label="First Name"
                          defaultValue={user.firstName}
                          className="form-textfield-double"
                          {...register("firstName", {
                            required: true,
                          })}
                          variant="outlined"
                        />
                        {errors.firstName && (
                          <p className="text-xs text-red-600">
                            First name is required
                          </p>
                        )}
                      </div>

                      <div className="form-input-sub-div">
                        <TextField
                          color="warning"
                          id="outlined"
                          label="Last Name"
                          className="form-textfield-double"
                          {...register("lastName", {
                            required: true,
                          })}
                          variant="outlined"
                          defaultValue={user.lastName}
                        />
                        {errors.lastName && (
                          <p className="text-xs text-red-600">
                            Last name is required
                          </p>
                        )}
                      </div>
                    </div>

                    {/* district and mobile */}
                    <div className="form-input-main-div">
                      <div className="form-input-sub-div">
                        <SignupDropDown
                          array={districts}
                          title="District"
                          func={setDistrict}
                          func1={register}
                          userDistrict={user.district}
                        />
                        {errors.district && (
                          <p className="text-xs text-red-600">
                            District is required
                          </p>
                        )}
                      </div>

                      <div className="form-input-sub-div">
                        <TextField
                          id="outlined"
                          label="Mobile"
                          color="warning"
                          className="form-textfield-double"
                          {...register("mobile", {
                            required: true,
                            maxLength: 10,
                            minLength: 10,
                            pattern: /^[0-9]+$/,
                          })}
                          variant="outlined"
                          defaultValue={`0${user.mobile}`}
                        />
                        {errors.mobile && (
                          <p className="text-xs text-red-600">
                            Mobile Number is required
                          </p>
                        )}
                      </div>
                    </div>

                    {/* email */}
                    <div className="col-span-6 my-3 buttonIn sm:col-span-4">
                      <TextField
                        id="outlined"
                        label="Email address"
                        className="w-full"
                        variant="outlined"
                        disabled
                        color="warning"
                        defaultValue={userEmail}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600">
                          Please check the Email
                        </p>
                      )}
                    </div>

                    <p
                      className="text-left hover:text-[#ffa537] cursor-pointer mt-6"
                      onClick={handleClickOpen}>
                      Change Password
                    </p>

                    {/* change password dialog */}
                    <div>
                      <ChangePassword
                        open={open}
                        handleClose={handleClose}
                        userId={user.userId}
                      />
                    </div>
                  </div>

                  <div className="react-hook-form-btn-div">
                    <button
                      type="submit"
                      className="react-hook-form-btn react-hook-form-btn-submit">
                      {backdrop === true && (
                        <>
                          <div className="mr-3">
                            <CircularProgressItem />
                          </div>
                        </>
                      )}
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserProfile;
