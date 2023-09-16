import { RouteName } from "constant/routeName";
import React from "react";
import NavElement from "../NavElement/NavElement";

function UserMode() {
  return (
    <div>
      <ul className={`pt-4 ml-10 text-center flex text-base`}>
        <NavElement linkAddress={RouteName.Home} name={"Home"} />
        <NavElement linkAddress={RouteName.Services} name={"Services"} />
        <NavElement linkAddress={RouteName.Aboutus} name={"About Us"} />
        <NavElement linkAddress={RouteName.Contactus} name={"Contact Us"} />
      </ul>
    </div>
  );
}

export default UserMode;
