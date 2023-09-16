import { Box } from "@mui/material";
import BookingService from "Services/Booking/BookingService";
import React, { useEffect, useState } from "react";

function ProviderBookedEventDetails({ params, col }: any) {
  const [event, setEvent] = useState<any>();
  const { eventId } = params.row;
  useEffect(() => {
    BookingService.getBookingDetailsByEventId(eventId).then((res: any) => {
      if (res.data.status === 1) {
        setEvent(res.data.data);
      }
    });
  }, []);
  return (
    <div>
      {event && col === "bookingDate" && (
        <Box
          sx={{
            m: 1,
            position: "relative",
          }}>
          {event.bookingDate}
        </Box>
      )}

      {event && col === "bookingTime" && (
        <Box
          sx={{
            m: 1,
            position: "relative",
          }}>
          {event.bookingTime}
        </Box>
      )}

      {event && col === "paymentId" && (
        <Box
          sx={{
            m: 1,
            position: "relative",
          }}>
          {event.paymentId}
        </Box>
      )}
    </div>
  );
}

export default ProviderBookedEventDetails;
