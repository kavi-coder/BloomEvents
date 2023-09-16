import {
  Autocomplete,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CircularProgressItem from "components/CircularProgress/CircularProgressItem";
import SignupDropDown from "components/Drop Downs/SignupDropdown";
import { RouteName } from "constant/routeName";
import { districts } from "docs/districts";
import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiImageAddLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryService from "Services/Category/CategoryService";
import FileUpload from "Services/FileUpload/FileUpload";
import ProviderService from "Services/Provider/ProviderServices";

function AddNewServices() {
  let { userId } = useParams();

  const [token, setToken] = useState<any>();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setToken(JSON.parse(token));
    } else {
      setToken(null);
    }
  }, []);

  const navigate = useNavigate();
  const [user, setuser] = React.useState<any>("");

  useEffect(() => {
    setTimeout(() => {
      let logged = localStorage.getItem("loggedUser");
      if (logged) {
        setuser(JSON.parse(logged));
        if (JSON.parse(logged).userId != userId) {
          localStorage.removeItem("loggedUser");
          navigate(RouteName.Home);
        }
      } else {
        setuser(null);
        navigate(RouteName.Login);
      }
    }, 1000);
  }, []);

  // get service provider logo
  const [picture, setPicture] = useState("");
  useEffect(() => {
    setPicture(
      `${process.env.REACT_APP_BACKEND_SERVER}/upload/ProviderLogos/0`
    );
  }, []);

  // get new profile picture
  const [changeImg, setChangeImg] = useState<boolean>(false);
  function handleFileUpload(event: any) {
    setChangeImg(true);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPicture(reader.result as string);
    };
  }

  // district
  const [district, setDistrict] = useState<string | "">("");

  //category
  const [categories, setCategories] = useState<any>();
  useEffect(() => {
    CategoryService.getAllCategories().then((res: any) => {
      if (res.data.status === 1) {
        const arr: any = res.data.data.map((item: any) => ({
          id: item.categoryId,
          label: item.categoryName,
        }));
        setCategories(arr);
        return;
      } else {
        setCategories(null);
      }
    });
  }, []);

  // handle backdrop
  const [backdrop, setBackdrop] = useState<boolean>(false);

  // handle category error
  const [caterr, setCaterr] = useState<string>("");
  //get category
  const [category, setCategory] = React.useState<any | null>(null);
  const handleCategory = (event: any, newValue: any | null) => {
    setCategory(newValue.id);
    setCaterr("");
  };

  //handle form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    if (category !== null) {
      // console.log(data);
      setBackdrop(true);

      const newService: any = {
        district: data.district,
        businessName: data.businessName,
        description: data.description,
        mobile: data.mobile,
        web: data.web,
        facebook: data.facebook,
        instagram: data.instagram,
        categoryId: category,
        userId: userId,
      };
      console.log(newService);

      setTimeout(async () => {
        const result = await ProviderService.addProvider(newService, token);
        console.log(result);
        if (result.data.status === 1) {
          if (changeImg) {
            const file = FileUpload.convertBase64ToFile(picture, "aa.png");
            let formData = new FormData();
            formData.append("file", file);

            FileUpload.uploadServiceLogo(
              result.data.data?.providerId,
              formData,
              token
            );
          }
          toast.success("Service Details Updated");
          // window.location.reload();
          navigate(
            `${RouteName.ServiceDetails.replace(
              ":providerId",
              result.data.data.providerId.toString()
            )}`
          );
        } else {
          console.log("failed");
        }
      }, 1000);
    }
  };

  const handleCatError = () => {
    if (caterr === "" && category === null) {
      setCaterr("Category is Required");
    }
  };

  return (
    <div className="w-9/12 px-5 mx-auto pt-28">
      <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
        <div className="overflow-hidden drop-shadow-xl sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div>
              <h1 className="mb-3 text-3xl text-center">
                Add <span className="text-[#ffa537]">Service</span>
              </h1>

              {/* service logo */}
              <div className="flex justify-center mx-auto my-3 mb-5">
                <input
                  type="file"
                  name=""
                  id=""
                  style={{
                    backgroundImage: `url(${picture})`,
                    backgroundSize: `cover`,
                  }}
                  onChange={handleFileUpload}
                  className="absolute duration-300 ease-in-out cursor-pointer hover:opacity-25 logo-file-upload z-1"
                />

                <div className="flex justify-center text-7xl duration-300 items-center text-[#747474bd] z-1 h-[300px] w-[310px] rounded-full bg-gray-200">
                  <RiImageAddLine />
                </div>
              </div>
            </div>

            {/* business name */}
            <div className="form-input-main-div">
              <div className="form-input-sub-div">
                <TextField
                  color="warning"
                  id="outlined"
                  label="Business Name"
                  className="form-textfield-double"
                  {...register("businessName", {
                    required: true,
                  })}
                  variant="outlined"
                />
                {errors.businessName && (
                  <p className="text-xs text-red-600">
                    Business name is required
                  </p>
                )}
              </div>

              <div className="form-input-sub-div">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={categories}
                  // sx={{ width: 300 }}
                  onChange={handleCategory}
                  getOptionLabel={(option: any) => option.label}
                  renderInput={(params) => (
                    <TextField {...params} label="Category" />
                  )}
                />
                {caterr && <p className="text-xs text-red-600">{caterr}</p>}
              </div>
            </div>

            {/* category */}
            {/* <div className="block my-3 mb-1 form-input-main-div">
              
            </div> */}

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
                  <p className="text-xs text-red-600">District is required</p>
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
                />
                {errors.mobile && (
                  <p className="text-xs text-red-600">
                    Mobile Number is required
                  </p>
                )}
              </div>
            </div>

            {/* description */}
            <div className="block form-input-main-div">
              <TextField
                color="warning"
                id="outlined"
                label="Description"
                multiline
                rows={6}
                className="form-textfield-double"
                {...register("description", {
                  required: true,
                  maxLength: 350,
                })}
                variant="outlined"
              />
              {errors.description && (
                <p className="text-xs text-red-600">
                  Description is required and Maximum 350 characters
                </p>
              )}
            </div>

            {/* web */}
            <div className="my-3 form-input-main-div">
              <TextField
                color="warning"
                id="outlined"
                label="Website"
                className="form-textfield-double"
                {...register("web", {})}
                variant="outlined"
              />
              {errors.web && (
                <p className="text-xs text-red-600">Website is required</p>
              )}
            </div>

            {/* facebook */}
            <div className="my-3 form-input-main-div">
              <TextField
                color="warning"
                id="outlined"
                label="Facebook"
                className="form-textfield-double"
                {...register("facebook", {})}
                variant="outlined"
              />
              {errors.facebook && (
                <p className="text-xs text-red-600">Facebook is required</p>
              )}
            </div>

            {/* instagram */}
            <div className="my-3 form-input-main-div">
              <TextField
                color="warning"
                id="outlined"
                label="Instagram"
                className="form-textfield-double"
                {...register("instagram", {})}
                variant="outlined"
              />
              {errors.instagram && (
                <p className="text-xs text-red-600">Instagram is required</p>
              )}
            </div>
          </div>

          <div className="react-hook-form-btn-div">
            <button
              type="submit"
              onClick={handleCatError}
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
  );
}

export default AddNewServices;
