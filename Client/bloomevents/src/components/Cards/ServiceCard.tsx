import { BiCategory } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { FiPackage } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PackageServices from "Services/Packages/PackageService";
import Ratings from "components/Ratings/Ratings";
import FileUpload from "Services/FileUpload/FileUpload";
// import image from 'img/dj.jpg';

function ServiceCard({ provider }: any) {
  // console.log(provider);
  const [packageCount, setPackageCount] = useState<any>(0);

  React.useEffect(() => {
    PackageServices.getPackageCountByProviderId(provider.providerId).then(
      (res: any) => {
        if (res.data.status == 1) {
          setPackageCount(res.data.data.toString());
          // console.log(provider.providerId + " - " + res.data.data);
          return;
        } else {
          setPackageCount(0);
          toast.error(res.data.message);
        }
      }
    );
  }, []);

  const [picture, setPicture] = useState("");
  useEffect(() => {
    FileUpload.getProfilePicture(1).then((res: any) => {
      // console.log(res);
      if (res.status == 200) {
        setPicture(
          `${process.env.REACT_APP_BACKEND_SERVER}/upload/ProviderLogos/${provider?.providerId}`
        );
        return;
      } else {
        // setPropic(res.status);
      }
    });
  }, [provider]);

  return (
    <div className="w-full min-h-56 service-card duration-200 ease-in-out hover:scale-[1.01]">
      <div
        id="back-img"
        className="w-[20%] h-56 bg-center"
        // style={{
        //   background: `url(${picture}) no-repeat center`,
        //   backgroundSize: "cover",
        // }}
      >
        <img
          src={picture}
          alt={provider.businessName}
          // className="w-full bg-center bg-cover"
          style={{ width: "250px", height: "250px" }}
        />
      </div>

      <div className="w-[80%] px-6 py-2 text-left">
        <h2 className="mb-2 text-xl text-[#c26d06]">{provider.businessName}</h2>
        <h3 className="flex items-center mr-6 text-[#464646]">
          {/* <AiOutlineStar className="service-card-icon" /> {provider.rating}{" "} */}
          <Ratings rating={provider.rating} />
        </h3>

        {packageCount && (
          <div className="grid w-8/12 grid-cols-3 mb-1">
            <h3 className="flex items-center mr-6 text-[#464646]">
              <GoLocation className="service-card-icon" /> {provider.district}
            </h3>

            <h3 className="flex items-center mr-6 text-[#464646]">
              <BiCategory className="service-card-icon" />{" "}
              {provider.categoryName}
            </h3>

            <h3 className="flex items-center mr-6 text-[#464646]">
              <FiPackage className="service-card-icon" /> {packageCount}{" "}
              Packages
            </h3>
          </div>
        )}

        <div className="mt-5 text-[#000]">
          <p>{provider.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
