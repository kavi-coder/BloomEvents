import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "img/logo.png";
import HeaderBtnLink from "./NavElement/HeaderBtnLink";

import { RouteName } from "constant/routeName";
import LoggedUserNav from "./Logged User/LoggedUserNav";
import UserMode from "./Nav Options/UserMode";
import ProviderMode from "./Nav Options/ProviderMode";
import UserServices from "Services/User/UserServices";
import jwtDecode from "jwt-decode";

function Header() {
  const navigate = useNavigate();

  // jwt
  const [token, setToken] = useState<any>();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setToken(JSON.parse(token));
      var decoded = jwtDecode(JSON.parse(token));

      console.log(decoded);
    } else {
      setToken(null);
    }
  }, []);

  const [user, setuser] = useState<any>();
  const [proMode, setproMode] = useState<boolean>(false);

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
            } else {
              localStorage.removeItem("loggedUser");
              localStorage.removeItem("ProviderMode");
              localStorage.removeItem("token");
              navigate(RouteName.Home);
            }
          }
        );
      } else {
        setuser(null);
        navigate(RouteName.Login);
      }
    }, 1000);
  }, [localStorage.getItem("loggedUser")]);

  useEffect(() => {
    let pro = localStorage.getItem("ProviderMode");
    if (pro) {
      setproMode(JSON.parse(pro));
    } else {
      setproMode(false);
    }
  }, [localStorage.getItem("ProviderMode")]);

  const handleClick = () => {
    if (proMode) {
      localStorage.setItem("ProviderMode", JSON.stringify(false));
      setproMode(false);
      navigate(RouteName.Services);
    } else {
      localStorage.setItem("ProviderMode", JSON.stringify(true));
      setproMode(true);
      navigate(RouteName.MyServices.replace(":userId", user.userId.toString()));
    }
  };

  return (
    <div>
      <header
        className={`py-[13px] text-center text-[#fff] bg-[#f3cd9ec4] w-full flex justify-between z-50 top-0  ease-in-out duration-200 fixed`}>
        <div className="w-2/12 pl-20 text-left">
          <Link to={RouteName.Home}>
            <img
              src={logo}
              alt=""
              className="w-28 hover:scale-[1.1] ease-in-out duration-200"
            />
          </Link>
        </div>

        {/* options */}
        {proMode ? (
          <div className="pl-20 text-left">
            <ProviderMode />
          </div>
        ) : (
          <div>
            <UserMode />
          </div>
        )}

        {/* for login btns */}
        {user ? (
          <div className="flex pr-8">
            <LoggedUserNav
              func={handleClick}
              promode={proMode}
              name={`${
                user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)
              } ${
                user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)
              }`}
              func1={setuser}
            />
          </div>
        ) : (
          <div className="right-0 text-right text-[#000]">
            <ul className="flex pt-4 pr-12 list-none">
              <HeaderBtnLink address={RouteName.Login} name={"Login"} />
              <HeaderBtnLink address={RouteName.Register} name={"Register"} />
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;
