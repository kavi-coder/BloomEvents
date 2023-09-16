import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

function CircularProgressItem() {
  return (
    <div>
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        {/* <CircularProgress color="secondary" /> */}
        <CircularProgress
          disableShrink
          style={{
            color: "#ffff",
            fontSize: "5px",
            width: "20px",
            height: "20px",
          }}
        />
        {/* <CircularProgress color="inherit" /> */}
      </Stack>
    </div>
  );
}

export default CircularProgressItem;
