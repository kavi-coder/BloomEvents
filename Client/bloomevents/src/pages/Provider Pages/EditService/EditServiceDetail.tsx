import { RouteName } from "constant/routeName";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageInformation from "./ImageInformation";
import BasicServiceDetails from "./BasicServiceDetails";

function EditServiceDetail({ provider, token }: any) {
  const navigate = useNavigate();
  const [user, setuser] = React.useState<any>();

  useEffect(() => {
    setTimeout(() => {
      let logged = localStorage.getItem("loggedUser");
      if (logged) {
        setuser(JSON.parse(logged));
      } else {
        setuser(null);
        navigate(RouteName.Login);
      }
    }, 1000);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("token");
    localStorage.removeItem("ProviderMode");
    navigate(RouteName.Home);
  };

  if (user && provider) {
    if (user?.userId !== provider.userId) {
      handleLogout();
    }
  }

  return (
    <div className="w-full mx-auto">
      {provider && (
        <>
          {/* basic info */}
          <div className="w-full p-3 my-3 text-center bg-white">
            <h1 className="text-4xl font-bold">
              Business <span className="text-[#ffa537]">Infromation</span>
            </h1>
          </div>
          <BasicServiceDetails
            providerId={provider.providerId}
            provider={provider}
            token={token}
          />

          {/* provider image info */}
          <div className="w-full p-3 my-3 text-center bg-white">
            <h1 className="text-4xl font-bold">
              Image <span className="text-[#ffa537]">Infromation</span>
            </h1>
          </div>
          <ImageInformation providerId={provider.providerId} token={token} />
        </>
      )}
    </div>
  );
}

export default EditServiceDetail;
