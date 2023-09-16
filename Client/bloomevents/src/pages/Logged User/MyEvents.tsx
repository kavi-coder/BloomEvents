import UserServices from "Services/User/UserServices";
import AddEventForm from "components/User Events/AddEventForm";
import EventList from "components/User Events/EventList";
import { RouteName } from "constant/routeName";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MyEvents() {
  let { userId } = useParams();
  // console.log(userId);

  const navigate = useNavigate();
  const [user, setuser] = React.useState<any>("");

  useEffect(() => {
    setTimeout(() => {
      let logged = localStorage.getItem("loggedUser");
      if (logged) {
        setuser(JSON.parse(logged));
        if (JSON.parse(logged).userId != userId) {
          localStorage.removeItem("loggedUser");
          localStorage.removeItem("token");
          localStorage.removeItem("ProviderMode");
          navigate(RouteName.Home);
        } else {
          UserServices.getUserByUserId(JSON.parse(logged).userId).then(
            (res: any) => {
              if (res.data.status === 1) {
                setuser(res.data.data);
                localStorage.setItem(
                  "loggedUser",
                  JSON.stringify(res.data.data)
                );
              }
            }
          );
        }
      } else {
        setuser(null);
        navigate(RouteName.Login);
      }
    }, 1000);
  }, [localStorage.getItem("loggedUser")]);

  // const [reRender, setReRender] = useState<any>("");

  return (
    <div className="flex justify-around w-full mx-auto">
      <div className="top-0 items-center w-8/12 px-8 mx-auto pt-28">
        <EventList userid={userId} />
      </div>

      <div className="top-0 items-center w-4/12 px-8 mx-auto">
        <AddEventForm userid={userId} />
      </div>
    </div>
  );
}

export default MyEvents;
