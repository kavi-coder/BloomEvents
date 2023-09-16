import { Stack, Skeleton } from "@mui/material";
import ServiceCardSkeletonCategory from "./ServiceCardSkeletonCategory";
import ServiceCardSkeletonDescription from "./ServiceCardSkeletonDescription";

function ServiceCardSkeleton() {
  return (
    <div className="w-full service-card !border-none hover:bg-[#fff0]">
      <Stack spacing={1} className="w-3/12">
        <Skeleton variant="rectangular" width={340} height={250} />
      </Stack>

      <Stack className="w-9/12 ml-5">
        <Skeleton variant="rectangular" width={300} height={25} />
        <ServiceCardSkeletonCategory />
        <ServiceCardSkeletonDescription />
      </Stack>
    </div>
  );
}

export default ServiceCardSkeleton;
