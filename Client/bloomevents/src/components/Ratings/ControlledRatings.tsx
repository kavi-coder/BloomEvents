import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";

function ControlledRatings({ ratings, setRatings }: any) {
  return (
    <Stack spacing={1}>
      <Rating
        name="half-rating"
        precision={0.5}
        value={ratings}
        onChange={(event, newValue) => {
          setRatings(newValue);
        }}
      />
    </Stack>
  );
}

export default ControlledRatings;
