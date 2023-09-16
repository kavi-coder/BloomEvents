import { Skeleton } from "@mui/material";
import React from "react";

function ServiceCardSkeletonDescription() {
  return (
    <div className="mt-6">
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
    </div>
  );
}

export default ServiceCardSkeletonDescription;
