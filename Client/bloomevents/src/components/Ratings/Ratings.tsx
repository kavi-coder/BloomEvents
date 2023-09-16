import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

function Ratings({ rating }: any) {
  const [value, setValue] = React.useState<number | null>(2);

  return (
    <div>
      <Stack spacing={1}>
        <Rating
          name="half-rating-read"
          defaultValue={0}
          precision={0.5}
          value={rating}
          readOnly
        />
      </Stack>
    </div>
  );
}

export default Ratings;
