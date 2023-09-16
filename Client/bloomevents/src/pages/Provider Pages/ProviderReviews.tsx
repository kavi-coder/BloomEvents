import ReviewService from "Services/ReviewService/ReviewService";
import Reviews from "components/Cards/Reviews";
import React, { useEffect, useState } from "react";
import { Review } from "types/Review";

function ProviderReviews({ providerId, token }: any) {
  // get reviews
  const [reviews, setReviews] = useState<Array<Review>>();

  useEffect(() => {
    ReviewService.getReviewsByProviderId(providerId).then((res: any) => {
      if (res.data.status == 1) {
        setReviews(res.data.data);
        // console.log(res.data.data);
        return;
      } else {
        //toast.error(res.data.message);
      }
    });
  }, []);
  return (
    <div>
      {reviews ? (
        <>
          {reviews.map((review: any, i: number) => (
            <Reviews review={review} key={i} />
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProviderReviews;
