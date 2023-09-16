import { TableRow, TableCell, TextField, Stack, Button } from "@mui/material";
import {
  LocalizationProvider,
  MobileDatePicker,
  MobileTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CircularProgressItem from "components/CircularProgress/CircularProgressItem";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { PrivateBooking } from "types/PrivateBooking";
import PrivateBookingService from "Services/Private Bookings/PrivateBookingService";
import { toast } from "react-toastify";

interface Column {
  id: "EventName" | "EventDate" | "EventTime" | "Action";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "EventName", label: "Event Name", minWidth: 340 },
  {
    id: "EventDate",
    label: "Event Date",
    minWidth: 340,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "EventTime",
    label: "Event Time",
    minWidth: 340,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "Action",
    label: "",
    minWidth: 100,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
];

function AddPrivateBooking({ providerId }: any) {
  const [token, setToken] = useState<any>();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setToken(JSON.parse(token));
    } else {
      setToken(null);
    }
  }, []);

  const [eventname, seteventname] = useState<string | "">("");
  const [date, setdate] = useState<any>(dayjs());
  const [time, settime] = useState<any>(dayjs());

  const handleChange = (newValue: Dayjs | null) => {
    // alert(dayjs(newValue));
    setdate(newValue);
    settime(newValue);
    console.log(dayjs(newValue).format("hh:mm A"));
  };

  const [values, setValues] = useState<PrivateBooking>({
    privateBookingId: 0,
    eventName: "",
    eventDate: "",
    eventTime: "",
    providerId: providerId,
  });

  useEffect(() => {
    setValues({
      privateBookingId: 0,
      eventDate: dayjs(date).format("DD-MMM-YYYY").toString(),
      eventName: eventname,
      eventTime: dayjs(time).format("hh:mm A").toString(),
      providerId: providerId,
    });
  }, [eventname, date, time]);

  const [backdropApprove, setBackdropApprove] = useState<boolean>(false);
  const handleApprove = (e: any) => {
    e.preventDefault();
    setBackdropApprove(true);

    setTimeout(async () => {
      const result = await PrivateBookingService.addPrivateBooking(
        values,
        token
      );
      console.log(result);
      if (result.data.status === 1) {
        window.location.reload();
      } else {
        toast.error("Adding Failed");
      }
      setBackdropApprove(false);
    }, 1500);
  };

  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.id}
          align={column.align}
          style={{ minWidth: column.minWidth }}>
          {/* Event name */}
          {column.id === "EventName" && (
            <TextField
              id="outlined"
              color="warning"
              label={column.label}
              className="form-textfield-double"
              variant="outlined"
              onChange={(e) => {
                seteventname(e.target.value);
              }}
            />
          )}

          {column.id === "EventDate" && (
            <LocalizationProvider dateAdapter={AdapterDayjs} color="warning">
              <Stack spacing={3}>
                <MobileDatePicker
                  label="Event Date"
                  value={date}
                  onChange={handleChange}
                />
              </Stack>
            </LocalizationProvider>
          )}

          {column.id === "EventTime" && (
            <LocalizationProvider dateAdapter={AdapterDayjs} color="warning">
              <Stack spacing={3}>
                <MobileTimePicker
                  label="Event Time"
                  value={time}
                  onChange={handleChange}
                />
              </Stack>
            </LocalizationProvider>
          )}

          {column.id === "Action" && (
            <Button
              variant="contained"
              color="success"
              onClick={handleApprove}
              className="text-lg">
              {backdropApprove ? (
                <CircularProgressItem />
              ) : (
                <>
                  <AddCircleOutlineIcon /> <span className="ml-3 ">Add</span>
                </>
              )}
            </Button>
          )}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default AddPrivateBooking;
