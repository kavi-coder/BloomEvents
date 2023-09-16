import PackageServices from "Services/Packages/PackageService";
import ProviderService from "Services/Provider/ProviderServices";
import React, { useState } from "react";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BsShop } from "react-icons/bs";
import { FiPackage } from "react-icons/fi";
import { toast } from "react-toastify";
import { Package } from "types/Packages";
import { ServiceProvider } from "types/ServiceProvider";

function AccordianPackgeDetail({ addToEvent }: any) {
  const [pckage, setPckage] = useState<Package>();
  React.useEffect(() => {
    PackageServices.getPackageByPackageId(addToEvent.packagesPackageId).then(
      (res: any) => {
        if (res.data.status === 1) {
          setPckage(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      }
    );
  }, []);

  const [provider, setProvider] = React.useState<ServiceProvider>();
  React.useEffect(() => {
    if (pckage) {
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
  }, [pckage]);
  return (
    <>
      {pckage && provider && (
        <div className="grid grid-cols-3">
          {/* <p className="flex items-center mb-2 text-base font-semibold text-neutral-600 ">
            {addToEvent.addToEventId}
          </p> */}
          <p className="flex items-center mb-2 text-base font-semibold text-neutral-600 ">
            <BsShop className="mr-1 text-[#ffa537]" />
            {provider.businessName}
          </p>
          <p className="flex items-center mb-2 text-base font-semibold text-neutral-600 ">
            <FiPackage className="mr-1 text-[#ffa537]" />
            {pckage.packageName}
          </p>
          <p className="flex items-center mb-2 text-base font-semibold text-neutral-600 ">
            <AiOutlineDollarCircle className="mr-1 text-[#ffa537]" />
            {pckage.price}
          </p>
        </div>
      )}
    </>
  );
}

export default AccordianPackgeDetail;
