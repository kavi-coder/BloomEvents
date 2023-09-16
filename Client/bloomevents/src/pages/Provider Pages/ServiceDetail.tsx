import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EditServiceDetail from "./EditService/EditServiceDetail";
import ChangePackageDetails from "./EditService/ChangePackageDetails";
import ProviderService from "Services/Provider/ProviderServices";
import ProviderReviews from "./ProviderReviews";
import PlacedEvents from "./PlacedEvents";
import ApprovedEvents from "./ApprovedEvents";
import BookedEvents from "./BookedEvents";
import PrivateBookings from "./PrivateBookings";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function ServiceDetail() {
  let { providerId } = useParams();

  const [token, setToken] = useState<any>();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setToken(JSON.parse(token));
    } else {
      setToken(null);
    }
  }, []);

  const [provider, setProvider] = useState<any>();
  React.useEffect(() => {
    ProviderService.getProvider(providerId).then((res: any) => {
      if (res.data.status === 1) {
        setProvider(res.data.data);
        // console.log(res.data.data);
      } else {
        setProvider(null);
      }
    });
  }, [providerId]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="px-5 pt-28">
      {provider && token && (
        <>
          <div className="w-full p-3 my-3 text-center bg-white">
            <h1 className="text-4xl font-bold">
              <span className="text-[#ffa537]">{provider.businessName}</span>
            </h1>
          </div>
          <div>
            <Box
              sx={{
                flexGrow: 1,
                bgcolor: "background.paper",
                display: "flex",
                // height: 600,
                minHeight: 600,
              }}>
              <Tabs
                orientation="vertical"
                //   variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{
                  borderRight: 1,
                  borderColor: "divider",
                  width: "100%",
                }}>
                <Tab label="Provider Details" {...a11yProps(0)} />
                <Tab label="Package Information" {...a11yProps(1)} />
                <Tab label="Placed Events" {...a11yProps(2)} />
                <Tab label="Approved Events" {...a11yProps(3)} />
                <Tab label="Booked Events" {...a11yProps(4)} />
                <Tab label="Add Private Bookings" {...a11yProps(5)} />
                <Tab label="Reviews" {...a11yProps(6)} />
              </Tabs>

              <div className="w-full">
                <TabPanel value={value} index={0}>
                  <EditServiceDetail provider={provider} token={token} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <ChangePackageDetails providerId={providerId} token={token} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <PlacedEvents providerId={providerId} token={token} />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <ApprovedEvents providerId={providerId} token={token} />
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <BookedEvents providerId={providerId} token={token} />
                </TabPanel>
                <TabPanel value={value} index={5}>
                  <PrivateBookings providerId={providerId} token={token} />
                </TabPanel>
                <TabPanel value={value} index={6}>
                  <ProviderReviews providerId={providerId} token={token} />
                </TabPanel>
              </div>
            </Box>
          </div>
        </>
      )}
    </div>
  );
}

export default ServiceDetail;
