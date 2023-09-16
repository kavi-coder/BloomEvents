import dayjs, { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker, MobileTimePicker } from "@mui/x-date-pickers";

function DatePicker({ datefunc, dateval, timefunc, timeval }: any) {
  const handleChange = (newValue: Dayjs | null) => {
    // alert(dayjs(newValue));
    datefunc(newValue);
    timefunc(newValue);
    console.log(dayjs(newValue).format("hh:mm A"));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} color="warning">
      <Stack spacing={3}>
        <MobileDatePicker
          label="Event Date"
          value={dateval}
          onChange={handleChange}
        />

        <MobileTimePicker
          label="Time"
          value={timeval}
          onChange={handleChange}
        />
      </Stack>
    </LocalizationProvider>
  );
}

export default DatePicker;
