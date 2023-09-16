import AddToEventService from "Services/AddToEvent/AddToEventService";
import { useEffect, useMemo, useState } from "react";
import { AddToEvent } from "types/AddToEvent";

import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AdminBookedPackagesAction from "components/Admin/Booked Packages/AdminBookedPackagesAction";
import ProviderBookedEventDetails from "components/Provider/Booked Events/ProviderBookedEventDetails";

function BookedEvents({ providerId }: any) {
  const [events, setEvents] = useState<Array<AddToEvent>>();

  useEffect(() => {
    AddToEventService.getBookedPackagesByProviderId(providerId).then(
      (res: any) => {
        if (res.data.status === 1) {
          setEvents(res.data.data);
          console.log(res.data.data);
          return;
        } else {
          //toast.error(res.data.message);
        }
      }
    );
  }, [providerId]);

  const columns = useMemo(
    () => [
      { field: "addToEventId", headerName: "ID", width: 50 },
      {
        field: "eventName",
        headerName: "Event Name",
        type: "actions",
        renderCell: (params: any) => (
          <AdminBookedPackagesAction {...{ params }} col={"eventName"} />
        ),
        width: 150,
      },

      {
        field: "eventDate",
        headerName: "Event Date",
        width: 150,
        renderCell: (params: any) => (
          <AdminBookedPackagesAction {...{ params }} col={"eventDate"} />
        ),
      },

      {
        field: "eventTime",
        headerName: "Event Time",
        width: 120,
        renderCell: (params: any) => (
          <AdminBookedPackagesAction {...{ params }} col={"eventTime"} />
        ),
      },
      {
        field: "userName",
        headerName: "Client Name",
        width: 230,
        renderCell: (params: any) => (
          <AdminBookedPackagesAction {...{ params }} col={"userName"} />
        ),
      },
      {
        field: "packageName",
        headerName: "Package",
        width: 150,
        renderCell: (params: any) => (
          <AdminBookedPackagesAction {...{ params }} col={"packageName"} />
        ),
      },
      {
        field: "bookingDate",
        headerName: "Booked Date",
        width: 120,
        renderCell: (params: any) => (
          <ProviderBookedEventDetails {...{ params }} col={"bookingDate"} />
        ),
      },
      {
        field: "bookingTime",
        headerName: "Booked Time",
        width: 120,
        renderCell: (params: any) => (
          <ProviderBookedEventDetails {...{ params }} col={"bookingTime"} />
        ),
      },
      {
        field: "packageName",
        headerName: "Package Name",
        width: 120,
        type: "actions",
        renderCell: (params: any) => (
          <AdminBookedPackagesAction {...{ params }} col={"packageName"} />
        ),
      },
      {
        field: "quantity",
        headerName: "Quantity",
        width: 100,
      },
      {
        field: "paymentId",
        headerName: "Payment ID",
        width: 100,
        renderCell: (params: any) => (
          <ProviderBookedEventDetails {...{ params }} col={"paymentId"} />
        ),
      },
    ],
    []
  );

  return (
    <div className="relative">
      {events && (
        <Box sx={{ width: "100%", height: "700px" }}>
          <DataGrid
            checkboxSelection={true}
            components={{ Toolbar: GridToolbar }}
            rowHeight={60}
            columns={columns}
            rows={events}
            getRowId={(row) => row?.addToEventId}
          />
        </Box>
      )}
    </div>
  );
}

export default BookedEvents;
