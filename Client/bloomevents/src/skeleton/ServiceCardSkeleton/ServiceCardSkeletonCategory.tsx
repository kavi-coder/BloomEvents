import { Skeleton } from "@mui/material";
import React from "react";

function ServiceCardSkeletonCategory() {
  return (
    <div className="flex justify-between w-8/12 mt-6">
      <div className="flex">
        <Skeleton variant="rectangular" width={20} height={20} />
        <div className="ml-2">
          <Skeleton variant="rectangular" width={150} height={20} />
        </div>
      </div>

      <div className="flex">
        <Skeleton variant="rectangular" width={20} height={20} />
        <div className="ml-2">
          <Skeleton variant="rectangular" width={150} height={20} />
        </div>
      </div>

      <div className="flex">
        <Skeleton variant="rectangular" width={20} height={20} />
        <div className="ml-2">
          <Skeleton variant="rectangular" width={150} height={20} />
        </div>
      </div>
    </div>
  );
}

export default ServiceCardSkeletonCategory;
