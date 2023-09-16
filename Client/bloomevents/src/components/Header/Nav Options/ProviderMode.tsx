import { RouteName } from "constant/routeName";
import { useEffect, useState } from "react";
import NavElement from "../NavElement/NavElement";

function ProviderMode() {
  const [user, setuser] = useState<any>();

  useEffect(() => {
    let logged = localStorage.getItem("loggedUser");
    if (logged) {
      setuser(JSON.parse(logged));
    } else {
      setuser(null);
    }
  }, [localStorage.getItem("loggedUser")]);

  // console.log(user);
  return (
    <div>
      <ul className={`pt-4 ml-10 text-center flex text-base`}>
        <NavElement
          linkAddress={RouteName.MyServices.replace(
            ":userId",
            user?.userId.toString()
          )}
          name={"My Services"}
        />
        <NavElement
          linkAddress={RouteName.AddNewService.replace(
            ":userId",
            user?.userId.toString()
          )}
          name={"Add New Service"}
        />
      </ul>
    </div>
  );
}

export default ProviderMode;
