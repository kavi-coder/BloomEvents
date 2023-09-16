import PrettyRating from "pretty-rating-react";
import {
  faStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faStar as farStar,
} from "@fortawesome/free-regular-svg-icons";

const icons = {
  star: {
    complete: faStar,
    half: faStarHalfAlt,
    empty: farStar,
  }
};

const colors = {
 star: ['#000', '#000', '#434b4d'],
};

function Rating() {
  return (
    <div>
      <div>
        <h1>Assesment</h1>
        <PrettyRating rating={5} icons={icons.star} setColors={colors.star} />
      </div>

      <div>
        <h1>Assesment</h1>
        <PrettyRating rating={3.5} icons={icons.star} setColors={colors.star} />
      </div>

  </div>
  )
}

export default Rating