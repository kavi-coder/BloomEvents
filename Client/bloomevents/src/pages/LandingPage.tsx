import Carousel from "components/Carousel/Carousel";
import SuccessCard from "components/Cards/SuccessCard";
import "styles/btns.css";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineCamera, AiOutlineCalendar } from "react-icons/ai";
import { FiUsers, FiPackage } from "react-icons/fi";
import SwiperElemet from "components/Carousel/SwiperElemet";
import { RouteName } from "constant/routeName";
import { useState, useEffect } from "react";

function LandingPage() {
  const navigate = useNavigate();
  const [user, setuser] = useState<any>();

  useEffect(() => {
    let logged = localStorage.getItem("loggedUser");
    if (logged) {
      setuser(JSON.parse(logged));
      let pro = localStorage.getItem("ProviderMode");
      if (pro) {
        if (JSON.parse(pro)) {
          navigate(
            RouteName.MyServices.replace(":userId", JSON.parse(logged).userId)
          );
        }
      }
      // navigate(RouteName.Services);
    } else {
      setuser(null);
    }
  }, [localStorage.getItem("loggedUser")]);
  const cardDetails = [
    {
      id: 0,
      url: FiUsers,
      title: "Customers",
      count: "100+",
    },
    {
      id: 1,
      url: AiOutlineCamera,
      title: "Service Providers",
      count: "100+",
    },
    {
      id: 2,
      url: FiPackage,
      title: "Packages",
      count: "100+",
    },
    {
      id: 3,
      url: AiOutlineCalendar,
      title: "Events",
      count: "100+",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="w-full h-[700px]">
        <div className="absolute left-16 flex text-[#fff] w-8/12 z-20 ml-10 mt-[150px]  p-12">
          <div className="bg-[#0000003d] p-10">
            <h1 className="text-5xl">
              Get ready for a <span className="text-[#ffc277]">Event</span>
            </h1>
            <p className="mt-5 text-base text-left">
              We bring dedicated design teams to entrepreneurs seeking talents
              to grow their brands. Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Sunt ratione, doloribus voluptatibus quo,
              quibusdam officiis numquam ut ipsa voluptatum vero repellat
              accusamus
              <br /> tenetur eum sed, aliquid quae?
            </p>

            <Link to="/services">
              <button className="mt-8 rounded-full custom-btn btn-1">
                Get Started
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full">
          <SwiperElemet
            width={"100%"}
            height={"720px"}
            thumbnails={false}
            time={3000}
            b_radius={"0px"}
          />
        </div>
      </div>

      {/* Section 2 */}
      <div className="text-[#000] my-24">
        <p className="w-4/12 mx-auto mb-24 text-xl text-center">
          We bring dedicated design teams to entrepreneurs seeking talents to
          grow their brands.
        </p>

        <div className="flex justify-around w-9/12 mx-auto">
          {cardDetails.map((c) => (
            <SuccessCard
              key={c.id}
              url={<c.url className="mx-auto" />}
              title={c.title}
              count={c.count}
            />
          ))}
        </div>
      </div>

      {/* Section 3 */}
      <div className="text-center">
        <h2 className="text-4xl uppercase">We bring dedicated</h2>

        <div className="my-14 parallax"></div>

        <p className="w-8/12 mx-auto text-lg text-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
          deserunt maxime, voluptatibus dignissimos minima laudantium
          blanditiis? Fugit, deleniti. Iusto in, odio non neque error fugit
          dolore! Quam eligendi exercitationem impedit?
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
