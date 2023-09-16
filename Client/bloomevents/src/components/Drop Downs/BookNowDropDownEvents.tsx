import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";

function BookNowDropDownEvents({ val, array, func, title }: any) {
  return (
    <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">{title}</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label "
        id="demo-simple-select-standard"
        value={val != 0 ? val : null}
        color="warning"
        onChange={(e) => func(e.target.value)}
        label={title}>
        {/* <MenuItem value="" disabled>
          <em>None</em>
        </MenuItem> */}

        {array?.map((e: any, i: number) => (
          // <>
          //   {dayjs(
          //     `${e?.eventDate} ${e?.eventTime}`,
          //     "DD-MMM-YYYY hh:mm A"
          //   ).isAfter(dayjs()) && (
          //     <MenuItem value={e.eventId.toString()} key={i + 1}>
          //       {e.eventName}
          //     </MenuItem>
          //   )}
          // </>
          <MenuItem value={e.eventId.toString()} key={i + 1}>
            {e.eventName}
          </MenuItem>
        ))}

        {/* <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
      </Select>
    </FormControl>
  );
}

export default BookNowDropDownEvents;
