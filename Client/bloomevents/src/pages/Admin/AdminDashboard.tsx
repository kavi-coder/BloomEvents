import { Box, Typography, Tabs, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminViewAllProviders from "./Services/AdminViewAllProviders";
import AdminViewAllUsers from "./Services/AdminViewAllUsers";
import AdminViewBookedEvents from "./Services/AdminViewBookedEvents";
import { useNavigate, useParams } from "react-router-dom";
import { RouteName } from "constant/routeName";
import { Role } from "Enums/Role";
import UserServices from "Services/User/UserServices";
import AdminViewBookedPackages from "./Services/AdminViewBookedPackages";
import AdminAddCategory from "./Services/AdminAddCategory";

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

function AdminDashboard() {
  // check user is admin
  const navigate = useNavigate();
  const [user, setuser] = React.useState<any>("");
  const { id } = useParams();

  useEffect(() => {
    setTimeout(() => {
      let logged = localStorage.getItem("loggedUser");
      if (logged) {
        setuser(JSON.parse(logged));
        UserServices.getUserByUserId(JSON.parse(logged).userId).then(
          (res: any) => {
            if (res.data.status === 1) {
              setuser(res.data.data);
              localStorage.setItem("loggedUser", JSON.stringify(res.data.data));
              if (res.data.data.role !== Role.ADMIN) {
                localStorage.removeItem("loggedUser");
                localStorage.removeItem("token");
                localStorage.removeItem("ProviderMode");
                navigate(RouteName.Home);
              }
            }
          }
        );
      } else {
        setuser(null);
        navigate(RouteName.Login);
      }
    }, 1000);
  }, [localStorage.getItem("loggedUser")]);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [token, setToken] = useState<any>();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setToken(JSON.parse(token));
    } else {
      setToken(null);
    }
  }, []);

  return (
    <>
      {token && (
        <div className="px-5 pt-28">
          <div className="w-full p-3 my-3 text-center bg-white">
            <h1 className="text-4xl font-bold">
              Admin
              <span className="text-[#ffa537]"> Dashboard</span>
            </h1>
          </div>

          <div>
            <Box
              sx={{
                flexGrow: 1,
                bgcolor: "background.paper",
                display: "flex",
                // height: 600,
                minHeight: 500,
              }}>
              <div className="w-2/12">
                <Tabs
                  orientation="vertical"
                  //   variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  sx={{
                    borderRight: 1,
                    borderColor: "divider",
                    width: "100% !important",
                  }}>
                  <Tab label="User Details" {...a11yProps(0)} />
                  <Tab label="Provider Details" {...a11yProps(1)} />
                  <Tab label="Manage Categories" {...a11yProps(2)} />
                  <Tab label="Booking Details" {...a11yProps(3)} />
                  <Tab label="Booked Packages" {...a11yProps(4)} />
                </Tabs>
              </div>

              <div className="w-10/12">
                <TabPanel value={value} index={0}>
                  <AdminViewAllUsers loggedUserId={id} token={token} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <AdminViewAllProviders token={token} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <AdminAddCategory token={token} />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <AdminViewBookedEvents token={token} />
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <AdminViewBookedPackages />
                </TabPanel>
              </div>
            </Box>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminDashboard;
