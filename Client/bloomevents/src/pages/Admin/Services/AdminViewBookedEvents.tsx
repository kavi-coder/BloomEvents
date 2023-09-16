import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import BookingService from "Services/Booking/BookingService";
import AccordianDetailComponent from "components/Admin/Bookings/Accordian/AccordianDetailComponent";
import AccordianSummeryComponent from "components/Admin/Bookings/Accordian/AccordianSummeryComponent";
import React, { useEffect, useState } from "react";

function AdminViewBookedEvents({ token }: any) {
  // accordian
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const [bookedEvents, setBookedEvents] = useState<any>();

  useEffect(() => {
    BookingService.getallBookings().then((res: any) => {
      if (res.data.status === 1) {
        setBookedEvents(res.data.data);
      }
    });
  }, []);

  return (
    <div>
      {bookedEvents &&
        bookedEvents?.map((event: any, i: number) => (
          <Accordion
            sx={{ marginBottom: "5px" }}
            key={i}
            expanded={expanded === `panel${i}`}
            onChange={handleChange(`panel${i}`)}>
            <AccordianSummeryComponent i={i} event={event} />
            <AccordianDetailComponent eventId={event.eventId} />
          </Accordion>
        ))}
    </div>
  );
}

export default AdminViewBookedEvents;
