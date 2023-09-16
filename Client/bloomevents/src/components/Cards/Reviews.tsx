import ControlledRatings from "components/Ratings/ControlledRatings";
import Ratings from "components/Ratings/Ratings";
import { useEffect, useState } from "react";
import { FaQuoteRight } from "react-icons/fa";
import FileUpload from "Services/FileUpload/FileUpload";
import UserServices from "Services/User/UserServices";
import "styles/review.css";
import { User1 } from "types/User";

const Review = ({ review }: any) => {
  // console.log(review);
  const [propic, setPropic] = useState<any>("");
  useEffect(() => {
    FileUpload.getProfilePicture(1).then((res: any) => {
      // console.log(res);
      if (res.status == 200) {
        setPropic(
          `${process.env.REACT_APP_BACKEND_SERVER}/upload/profilePic/${
            review ? review.userId : "0"
          }`
          // `${process.env.REACT_APP_BACKEND_SERVER}/upload/profilePic/0`
        );
        return;
      } else {
        // setPropic(res.status);
      }
    });
  }, []);

  const [user, setUser] = useState<User1>();
  useEffect(() => {
    UserServices.getUserByUserId(review?.userId).then((res: any) => {
      // console.log(res);
      if (res.data.status === 1) {
        setUser(res.data.data);
        return;
      }
    });
  }, []);

  return (
    <div>
      {user && (
        <article className="grid items-center grid-cols-4 my-2 review hover:shadow-[0_0_50px_rgba(0, 0, 0, 0.4)] hover:scale-[1.01]">
          <div className="items-center img-container">
            <img src={propic} className="person-img" />
            <span className="quote-icon">
              <FaQuoteRight />
            </span>
          </div>

          <div className="col-span-3 text-left">
            <h4 className="text-lg capitalize author">
              {`${user.firstName} ${user.lastName} `}
            </h4>
            <Ratings rating={review.rate} />
            <p className="job ">{review.timestamp}</p>
            <p className="info">{review.review}</p>
          </div>
        </article>
      )}
    </div>
  );
};

export default Review;
