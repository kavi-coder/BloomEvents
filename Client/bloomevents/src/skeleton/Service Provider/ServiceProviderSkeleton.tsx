import { Stack, Skeleton } from "@mui/material";
import React from "react";

function ServiceProviderSkeleton() {
  return (
    <div className="mx-auto">
      {/* courosal */}
      <div className="flex justify-center w-full px-10 pt-28">
        <div className="w-8/12">
          <Stack spacing={1}>
            <div className="flex justify-start">
              <Skeleton variant="rectangular" width={60} height={60} />
              <div className="ml-5">
                <Stack spacing={1}>
                  <Skeleton variant="rectangular" width={400} height={35} />
                  <Skeleton variant="rectangular" width={200} height={15} />
                </Stack>
              </div>
            </div>

            <Skeleton variant="rectangular" width={900} height={450} />
          </Stack>
        </div>

        <div className="w-4/12 !pl-0 mt-24">
          <Stack spacing={1}>
            <Skeleton variant="rectangular" width={200} height={35} />
            <Skeleton variant="rectangular" width={350} height={350} />
          </Stack>
        </div>
      </div>

      {/* package and comments */}
      <div className="flex justify-center w-full px-10 mt-10">
        <div className="w-8/12">
          <Stack spacing={1}>
            <div className="flex justify-start">
              <div>
                <Stack spacing={1}>
                  <Skeleton variant="rectangular" width={150} height={60} />
                  <Skeleton variant="rectangular" width={150} height={60} />
                  <Skeleton variant="rectangular" width={150} height={60} />
                  <Skeleton variant="rectangular" width={150} height={60} />
                  <Skeleton variant="rectangular" width={150} height={60} />
                  <Skeleton variant="rectangular" width={150} height={60} />
                </Stack>
              </div>
              <div className="ml-5">
                <Stack spacing={1}>
                  <Skeleton variant="rectangular" width={750} height={450} />
                </Stack>
              </div>
            </div>
          </Stack>
        </div>

        <div className="w-4/12 !pl-0">
          <Stack spacing={1}>
            <Skeleton variant="rectangular" width={400} height={450} />
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default ServiceProviderSkeleton;
