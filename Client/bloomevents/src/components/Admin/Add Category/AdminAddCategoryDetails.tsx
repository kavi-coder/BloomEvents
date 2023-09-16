import { Box } from "@mui/material";
import PackageServices from "Services/Packages/PackageService";
import ProviderService from "Services/Provider/ProviderServices";
import React, { useState } from "react";

function AdminAddCategoryDetails({ params, col }: any) {
  const [providerCount, setProviderCount] = useState<any>();
  const { categoryId } = params.row;
  ProviderService.getProviderCountByCategoryId(categoryId).then((res: any) => {
    if (res.data.status === 1) {
      setProviderCount(res.data.data);
    }
  });

  const [packageCount, setPackageCount] = useState<any>();
  PackageServices.getPackageCountByCategoryId(categoryId).then((res: any) => {
    if (res.data.status === 1) {
      setPackageCount(res.data.data);
    }
  });
  return (
    <div>
      {providerCount &&
        col === "providers" &&
        (providerCount > 0 ? (
          <Box
            sx={{
              m: 1,
              position: "relative",
            }}>
            {providerCount}
          </Box>
        ) : (
          <></>
        ))}

      {packageCount &&
        col === "package" &&
        (packageCount > 0 ? (
          <Box
            sx={{
              m: 1,
              position: "relative",
            }}>
            {packageCount}
          </Box>
        ) : (
          <></>
        ))}
    </div>
  );
}

export default AdminAddCategoryDetails;
