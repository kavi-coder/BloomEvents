import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import EventIcon from "@mui/icons-material/Event";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";

import Switch from "@mui/material/Switch";
import { Link, useNavigate } from "react-router-dom";
import { RouteName } from "constant/routeName";

import { useEffect, useState } from "react";
import { Role } from "Enums/Role";
import FileUpload from "Services/FileUpload/FileUpload";
import { Badge } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AddToEventService from "Services/AddToEvent/AddToEventService";

function LoggedUserNav({ func, promode, name, func1 }: any) {
  const [admin, setAdmin] = useState<boolean>(false);
  const [provider, setProvider] = useState<boolean>(false);
  const navigate = useNavigate();

  const [user, setUser] = useState<any>();

  useEffect(() => {
    let logged = localStorage.getItem("loggedUser");
    if (logged) {
      setUser(JSON.parse(logged));
      if (JSON.parse(logged).role === Role.ADMIN) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    } else {
      setUser(null);
    }
  }, [localStorage.getItem("loggedUser")]);

  //console.log(provider);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // switch
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("token");
    localStorage.removeItem("ProviderMode");
    func1();
    navigate(RouteName.Home);
  };

  //get profile picture
  const [propic, setPropic] = useState<any>("");
  useEffect(() => {
    FileUpload.getProfilePicture(1).then((res: any) => {
      // console.log(res);
      if (res.status == 200) {
        setPropic(
          `${process.env.REACT_APP_BACKEND_SERVER}/upload/profilePic/${user?.userId}`
        );
        return;
      } else {
        // setPropic(res.status);
      }
    });
  }, [user]);

  // notification
  function notificationsLabel(count: number) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 10) {
      return "more than 10 notifications";
    }
    return `${count} notifications`;
  }

  const [reqCount, serReqCount] = useState<any>();
  useEffect(() => {
    if (user) {
      AddToEventService.getRequestCountByUserId(user.userId).then(
        (res: any) => {
          if (res.data.status === 1) {
            serReqCount(res.data.data);
          } else {
            serReqCount(0);
          }
        }
      );
    }
  }, [user]);

  return (
    <div>
      {user && (
        <React.Fragment>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
            <Typography sx={{ minWidth: 100 }} className="items-center">
              {reqCount > 0 && (
                <IconButton
                  aria-label={notificationsLabel(reqCount)}
                  sx={{
                    marginRight: "10px",
                  }}>
                  <Badge badgeContent={reqCount} color="error">
                    <NotificationsActiveIcon />
                  </Badge>
                </IconButton>
              )}
              Switch to Provider Mode
              <Switch
                {...label}
                onChange={func}
                checked={promode ? true : false}
              />
            </Typography>

            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}>
                {propic != "" && user && (
                  <>
                    <img
                      src={propic}
                      className={"logged-nav-bar-propic"}
                      alt=""
                    />
                  </>
                )}
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
            {promode !== true && (
              <>
                <Link
                  to={{
                    pathname: `${RouteName.Profile.replace(
                      ":userId",
                      user.userId.toString()
                    )}`,
                  }}>
                  <MenuItem>
                    {propic !== "" && user ? (
                      <>
                        <img
                          src={propic}
                          className={"logged-nav-bar-propic mr-2"}
                          alt=""
                        />
                      </>
                    ) : (
                      <>
                        <Avatar />{" "}
                      </>
                    )}
                    {name}
                  </MenuItem>
                </Link>
                <Divider />
              </>
            )}

            {admin && promode !== true && (
              <>
                <Link
                  to={{
                    pathname: `${RouteName.AdminDashboard.replace(
                      ":id",
                      user.userId.toString()
                    )}`,
                  }}>
                  <MenuItem>
                    <AdminPanelSettingsIcon className="mr-[7px] my-1" />
                    Admin Dashboard
                  </MenuItem>
                </Link>
                <Divider />
              </>
            )}

            {/* check Pro mode to visible my events */}
            {promode ? (
              <></>
            ) : (
              <MenuItem>
                <Link
                  to={{
                    pathname: `${RouteName.MyEvents.replace(
                      ":userId",
                      user.userId.toString()
                    )}`,
                  }}>
                  <ListItemIcon>
                    <EventIcon fontSize="small" />
                  </ListItemIcon>
                  My Events
                </Link>
              </MenuItem>
            )}

            {/* <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem> */}
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </div>
  );
}

export default LoggedUserNav;
