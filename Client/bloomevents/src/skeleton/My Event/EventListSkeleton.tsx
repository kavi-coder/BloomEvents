import { Stack, Skeleton } from "@mui/material";
import React from "react";

function EventListSkeleton() {
  return (
    <div>
      <Stack spacing={1}>
        <Skeleton
          variant="rectangular"
          height={115}
          animation="wave"
          className="rounded-lg"
        />
        <Skeleton
          variant="rectangular"
          height={115}
          animation="wave"
          className="rounded-lg"
        />
        <Skeleton
          variant="rectangular"
          height={115}
          animation="wave"
          className="rounded-lg"
        />
        <Skeleton
          variant="rectangular"
          height={115}
          animation="wave"
          className="rounded-lg"
        />
        <Skeleton
          variant="rectangular"
          height={115}
          animation="wave"
          className="rounded-lg"
        />
      </Stack>
    </div>
  );
}

export default EventListSkeleton;
