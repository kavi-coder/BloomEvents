import SimpleBackdrop from "components/Backdrop/SimpleBackdrop";
import MyServicesCard from "components/Cards/Provider/MyServicesCard";
import { RouteName } from "constant/routeName";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProviderService from "Services/Provider/ProviderServices";

function ProviderDashboard() {
  let { userId } = useParams();

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
        }
      } else {
        setuser(null);
        navigate(RouteName.Login);
      }
    }, 1000);
  }, [localStorage.getItem("loggedUser")]);

  //get provider list
  const [services, setServices] = useState<any>();
  useEffect(() => {
    setTimeout(() => {
      ProviderService.getProvidersByUserId(userId).then((res: any) => {
        if (res.data.status === 1) {
          setServices(res.data.data);
          console.log(res.data);
        } else {
          setServices(null);
          // toast.error("No Services Found");
          if (userId) {
            navigate(RouteName.AddNewService.replace(":userId", userId));
          }
          return;
        }
      });
    }, 1000);
  }, []);

  return (
    <div className="pt-28">
      {services ? (
        <>
          <div className="mx-auto mb-4">
            <h1 className="text-3xl font-bold text-center uppercase">
              My <span className="text-[#ffa63a]">Services</span>
            </h1>
          </div>

          <div className="grid w-11/12 grid-cols-3 gap-4 mx-auto">
            {services?.map((c: any, i: number) => (
              <MyServicesCard provider={c} key={i} />
            ))}
          </div>
        </>
      ) : (
        <>
          <SimpleBackdrop />
        </>
      )}
    </div>
  );
}

export default ProviderDashboard;
