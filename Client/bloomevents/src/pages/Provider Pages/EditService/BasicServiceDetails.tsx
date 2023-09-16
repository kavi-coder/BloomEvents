import { TextField } from "@mui/material";
import CircularProgressItem from "components/CircularProgress/CircularProgressItem";
import SignupDropDown from "components/Drop Downs/SignupDropdown";
import { districts } from "docs/districts";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiImageAddLine } from "react-icons/ri";
import { toast } from "react-toastify";
import FileUpload from "Services/FileUpload/FileUpload";
import ProviderService from "Services/Provider/ProviderServices";

function BasicServiceDetails({ providerId, provider, token }: any) {
  // get service provider logo
  const [picture, setPicture] = useState("");
  useEffect(() => {
    setPicture(
      `${process.env.REACT_APP_BACKEND_SERVER}/upload/ProviderLogos/${provider?.providerId}`
    );
  }, [provider]);

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

  // handle backdrop
  const [backdrop, setBackdrop] = useState<boolean>(false);

  // handle form
  // set district
  const [district, setDistrict] = useState<any>();

  //handle form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setBackdrop(true);
    const updatedService: any = {
      providerId: provider.providerId,
      district: data.district,
      businessName: data.businessName,
      description: data.description,
      mobile: data.mobile,
      web: data.web,
      facebook: data.facebook,
      instagram: data.instagram,
    };
    // console.log(updatedService);
    setTimeout(async () => {
      const result = await ProviderService.updateProvider(
        updatedService,
        token
      );
      // console.log(result);
      if (result.data.status == 1) {
        if (changeImg) {
          handleServiceLogo();
        }
        toast.success("Service Details Updated");
        window.location.reload();
      } else {
        console.log("failed");
      }
    }, 1000);
  };

  const handleServiceLogo = () => {
    // e.preventDefault();
    const file = FileUpload.convertBase64ToFile(picture, "aa.png");
    // console.log(file);
    let formData = new FormData();
    formData.append("file", file);

    FileUpload.uploadServiceLogo(provider?.providerId, formData, token);
  };
  return (
    <div>
      {provider ? (
        <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
          <div className="overflow-hidden drop-shadow-xl sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div>
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
              <div className="block form-input-main-div">
                <TextField
                  color="warning"
                  id="outlined"
                  label="Business Name"
                  defaultValue={provider.businessName}
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

              {/* district and mobile */}
              <div className="form-input-main-div">
                <div className="form-input-sub-div">
                  <SignupDropDown
                    array={districts}
                    title="District"
                    func={setDistrict}
                    func1={register}
                    userDistrict={provider.district}
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
                    defaultValue={`${provider.mobile}`}
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
                  defaultValue={provider.description}
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
                  defaultValue={provider.web}
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
                  defaultValue={provider.facebook}
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
                  defaultValue={provider.instagram}
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
                // onClick={handleServiceLogo}
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
      ) : (
        <></>
      )}
    </div>
  );
}

export default BasicServiceDetails;
