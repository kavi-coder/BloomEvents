import { TableCell, TableRow } from "@mui/material";
import React from "react";

interface Data {
  ID: string;
  EventName: string;
  EventDate: string;
  EventTime: string;
}

function createData(
  ID: string,
  EventName: string,
  EventDate: string,
  EventTime: string
): Data {
  return {
    ID,
    EventName,
    EventDate,
    EventTime,
  };
}

function PrivateBookingDetails({ booking, columns, providerId }: any) {
  let row: any = createData(
    booking.privateBookingId,
    booking.eventName,
    booking.eventDate,
    booking.eventTime
  );
  return (
    <>
      {row && (
        <>
          <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={booking.privateBookingId}>
            {columns.map((column: any) => {
              const value = row[column.id];
              return (
                <TableCell key={column.id} align={column.align}>
                  <>
                    {column.format && typeof value === "number"
                      ? column.format(value)
                      : value}
                  </>
                </TableCell>
              );
            })}
          </TableRow>
        </>
      )}
    </>
  );
}

export default PrivateBookingDetails;
