import { useEffect, useState } from "react";
import image from "img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { districts } from "docs/districts";
import SignupDropDown from "components/Drop Downs/SignupDropdown";
import { RouteName } from "constant/routeName";
import { useForm } from "react-hook-form";
import AuthService from "Services/Authencation/AuthService";
import { toast } from "react-toastify";
import UploadProPic from "components/UploadImages/UploadProPic";
import axios from "axios";
import FileUpload from "Services/FileUpload/FileUpload";
import CircularProgressItem from "components/CircularProgress/CircularProgressItem";

function Signup() {
  //navigate
  const navigate = useNavigate();

  //if already has logged user
  const logged = localStorage.getItem("loggedUser");
  useEffect(() => {
    if (logged) {
      navigate(RouteName.Services);
    }
  }, []);

  // show password
  const [showPw, setShowPw] = useState<boolean>(false);
  const showPassword = () => {
    if (showPw) {
      setShowPw(false);
    } else {
      setShowPw(true);
    }
  };

  const [district, setDistrict] = useState<string | "">("");

  // profile picture
  const [preview, setPreview] = useState<any>();
  const handlePropic = (userId: any, token: any) => {
    const file = FileUpload.convertBase64ToFile(preview, "aa.png");

    let formData = new FormData();
    formData.append("file", file);

    FileUpload.uploadProfilePicture(userId, formData, token);
  };

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

    setTimeout(async () => {
      const result = await AuthService.Register(data);
      // console.log(result);
      if (result.data.status === 1) {
        localStorage.setItem(
          "loggedUser",
          JSON.stringify(result.data.data.user)
        );
        localStorage.setItem("token", JSON.stringify(result.data.data.token));
        if (preview) {
          handlePropic(result.data.data.user.userId, result.data.data.token);
          setTimeout(() => {
            navigate(RouteName.Services);
            toast.success("Registration Successfull");
          }, 1000);
        } else {
          navigate(RouteName.Services);
          toast.success("Registration Successfull");
        }
      } else {
        toast.error("Registration Failed");
      }
    }, 1000);
  };

  return (
    <div className="flex items-center w-11/12 mb-20 pt-28">
      <div className="w-6/12">
        <img src={image} alt="" className="w-full" />
      </div>

      <div className="w-6/12 ">
        <div className="mt-10 sm:mt-0">
          <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div className="overflow-hidden drop-shadow-2xl sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <h1 className="mb-3 text-3xl text-left">
                  Create <span className="text-[#ffa537]">Account</span>
                </h1>

                {/* first name and last name */}
                <div className="form-input-main-div">
                  <div className="form-input-sub-div">
                    <TextField
                      id="outlined"
                      color="warning"
                      label="First Name"
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
                      id="outlined"
                      color="warning"
                      label="Last Name"
                      className="form-textfield-double"
                      {...register("lastName", {
                        required: true,
                      })}
                      variant="outlined"
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
                      color="warning"
                      label="Mobile"
                      className="form-textfield-double"
                      {...register("mobile", {
                        required: true,
                        maxLength: 10,
                        minLength: 10,
                        pattern: /^[0-9]+$/,
                      })}
                      variant="outlined"
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
                    color="warning"
                    label="Email address"
                    className="w-full"
                    {...register("email", {
                      required: true,
                      pattern:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                    variant="outlined"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600">
                      Please check the Email
                    </p>
                  )}
                </div>

                {/* password */}
                <div className="flex w-full col-span-6 mt-5 buttonIn sm:col-span-4">
                  <div className="w-full">
                    <TextField
                      id="outlined"
                      color="warning"
                      type={showPw ? "text" : "password"}
                      label="Password"
                      className="w-full rounded-[5px] outline-none p-0 "
                      {...register("password", {
                        required: true,
                        minLength: 8,
                        pattern:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                      })}
                      variant="outlined"
                    />
                    {errors.password && (
                      <p className="text-xs text-red-600">
                        Password must contain atleast 8 characters and one
                        uppercase and lowercase letter, one number and one
                        symbol{" "}
                      </p>
                    )}
                  </div>
                  <h1 id="clear" className="showPw" onClick={showPassword}>
                    {showPw ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </h1>
                </div>

                {/* upload profile picture */}
                <div className="flex justify-center w-full mt-5">
                  <UploadProPic setPreview={setPreview} />
                </div>
              </div>

              <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                <p className="text-left">
                  Already Have An Account?{" "}
                  <Link to={RouteName.Login} className="text-[#e17c01]">
                    Log In
                  </Link>
                </p>
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
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
