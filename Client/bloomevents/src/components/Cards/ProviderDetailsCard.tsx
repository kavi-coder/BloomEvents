import { DialogContentText } from "@mui/material";
import Ratings from "components/Ratings/Ratings";
import React from "react";
import { useState } from "react";
import {
  AiOutlineStar,
  AiOutlinePhone,
  AiOutlineInstagram,
  AiOutlineFacebook,
} from "react-icons/ai";
import { BiCategory, BiWorld } from "react-icons/bi";
import { BsBriefcase } from "react-icons/bs";
import { FiPackage } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { toast } from "react-toastify";
import PackageServices from "Services/Packages/PackageService";

function ProviderDetailsCard({ providerDetails }: any) {
  const [packageCount, setPackageCount] = useState<any>();

  React.useEffect(() => {
    PackageServices.getPackageCountByProviderId(
      providerDetails.providerId
    ).then((res: any) => {
      if (res.data.status == 1) {
        setPackageCount(res.data.data);
        console.log(res.data.data);
        return;
      } else {
        toast.error(res.data.message);
      }
    });
  }, []);

  console.log(providerDetails);

  return (
    <DialogContentText id="alert-dialog-description">
      <div className="text-xl">
        <h3 className="pro-dialog-h3">
          <BsBriefcase className="service-card-icon !text-[#c26d06]" />
          <span className="pro-dialog-span">Provider Name : </span>{" "}
          {providerDetails.businessName}
        </h3>
        <h3 className="pro-dialog-h3">
          <GoLocation className="service-card-icon !text-[#c26d06]" />
          <span className="pro-dialog-span">District : </span>{" "}
          {providerDetails.district}
        </h3>
        <h3 className="pro-dialog-h3">
          <BiCategory className="service-card-icon !text-[#c26d06]" />
          <span className="pro-dialog-span">Category : </span>{" "}
          {providerDetails.categoryName}
        </h3>
        <h3 className="pro-dialog-h3">
          <FiPackage className="service-card-icon !text-[#c26d06]" />
          <span className="pro-dialog-span">No of Packages : </span>{" "}
          {packageCount}
        </h3>
        <h3 className="pro-dialog-h3">
          <AiOutlineStar className="service-card-icon !text-[#c26d06]" />
          <span className="pro-dialog-span">Ratings : </span>{" "}
          {/* {providerDetails.rating} */}
          <Ratings rating={providerDetails.rating} />
        </h3>
        <h3 className="pro-dialog-h3">
          <AiOutlinePhone className="service-card-icon !text-[#c26d06]" />
          <span className="pro-dialog-span">Mobile : </span>{" "}
          {providerDetails.mobile}
        </h3>
      </div>

      <div className="flex justify-around w-6/12 mx-auto my-3 text-lg">
        {providerDetails.instagram && (
          <a
            href={providerDetails.instagram}
            target="blank"
            className="provider-detail-dialog-box-icon"
            rel="noreferrer">
            <AiOutlineInstagram />
          </a>
        )}

        {providerDetails.facebook && (
          <a
            href={providerDetails.facebook}
            target="blank"
            className="provider-detail-dialog-box-icon"
            rel="noreferrer">
            <AiOutlineFacebook />
          </a>
        )}

        {providerDetails.web && (
          <a
            href={providerDetails.web}
            target="blank"
            className="provider-detail-dialog-box-icon"
            rel="noreferrer">
            <BiWorld />
          </a>
        )}

        {/* <a
          href={providerDetails.facebook}
          target="_blank"
          className="provider-detail-dialog-box-icon"
          rel="noreferrer">
          <AiOutlineFacebook />
        </a>
        <a
          href={providerDetails.web}
          target="_blank"
          className="provider-detail-dialog-box-icon"
          rel="noreferrer">
          <BiWorld />
        </a> */}
      </div>
    </DialogContentText>
  );
}

export default ProviderDetailsCard;
