import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import React from "react";

function ImageInformationSkeleton() {
  return (
    <div>
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width={200} height={200} />
      </Stack>
    </div>
  );
}

export default ImageInformationSkeleton;
