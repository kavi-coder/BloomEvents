import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Tab } from "@mui/material";
import React, { useState } from "react";
import PackageServices from "Services/Packages/PackageService";
import EditPackageDetails from "./EditPackageDetails";

function ChangePackageDetails({ providerId, token }: any) {
  let newPackage = {
    packageId: "",
    packageName: "",
    price: "",
    description: "",
    providerId: "",
  };

  // get packages
  const [packages, setPackages] = useState<any>();
  const [value, setValue] = useState("0");

  React.useEffect(() => {
    PackageServices.getPackagesByProviderId(providerId).then((res: any) => {
      if (res.data.status === 1) {
        setPackages(res.data.data);
        // console.log(res.data.data);
        setValue(res.data.data[0].packageId);
        return;
      }
    });
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="w-full mx-auto">
      <div className="z-10 w-full p-3  my-3 !mt-6 text-center bg-white">
        <h1 className="text-4xl font-bold">
          Package <span className="text-[#ffa537]">Infromation</span>
        </h1>
      </div>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              {packages?.map((p: any, i: number) => (
                <Tab label={p.packageName} value={p.packageId} key={i} />
              ))}

              {packages?.length < 5 && (
                <Tab label={"+ Add New Package"} value="0" />
              )}
            </TabList>
          </Box>
          {packages?.map((p: any, i: number) => (
            <TabPanel value={p.packageId} key={i}>
              <EditPackageDetails
                packge={p}
                providerId={providerId}
                token={token}
              />
            </TabPanel>
          ))}

          {packages?.length < 5 && (
            <TabPanel value="0">
              <EditPackageDetails
                packge={newPackage}
                providerId={providerId}
                token={token}
              />
            </TabPanel>
          )}

          {!packages && (
            <TabPanel value="0">
              <EditPackageDetails packge={newPackage} providerId={providerId} />
            </TabPanel>
          )}
        </TabContext>
      </Box>
    </div>
  );
}

export default ChangePackageDetails;
