import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AddToEventService from "Services/AddToEvent/AddToEventService";
import EventServices from "Services/Event/EventServices";
import AdminBookedPackagesAction from "components/Admin/Booked Packages/AdminBookedPackagesAction";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { AddToEvent } from "types/AddToEvent";
import { Package } from "types/Packages";

function AdminViewBookedPackages() {
  const [packages, setPackages] = useState<Array<AddToEvent>>([]);
  useEffect(() => {
    AddToEventService.getAllBookedPackages()
      .then((res: any) => {
        if (res.data.status === 1) {
          setPackages(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch providers");
      });
  }, []);

  const getEventName = async (eventId: any) => {
    const result = await EventServices.getEventById(eventId);
    if (result.data.status === 1) {
      return result.data.data.eventName;
    }
  };

  const columns = useMemo(
    () => [
      { field: "addToEventId", headerName: "ID", width: 100 },
      {
        field: "eventId",
        headerName: "Event ID",
        width: 150,
        editable: true,
      },
      {
        field: "eventName",
        headerName: "Event Name",
        type: "actions",
        renderCell: (params: any) => (
          <AdminBookedPackagesAction {...{ params }} col={"eventName"} />
        ),
        width: 120,
      },

      {
        field: "eventTime",
        headerName: "Event Time",
        width: 200,
        renderCell: (params: any) => (
          <AdminBookedPackagesAction {...{ params }} col={"eventTime"} />
        ),
      },
      {
        field: "userId",
        headerName: "user ID",
        width: 100,
        renderCell: (params: any) => (
          <AdminBookedPackagesAction {...{ params }} col={"userId"} />
        ),
      },
      {
        field: "userName",
        headerName: "User Name",
        width: 250,
        renderCell: (params: any) => (
          <AdminBookedPackagesAction {...{ params }} col={"userName"} />
        ),
      },
      {
        field: "businessName",
        headerName: "Provider Name",
        width: 150,
        renderCell: (params: any) => (
          <AdminBookedPackagesAction {...{ params }} col={"businessName"} />
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
        field: "price",
        headerName: "Price",
        width: 150,
        renderCell: (params: any) => (
          <AdminBookedPackagesAction {...{ params }} col={"price"} />
        ),
      },
    ],
    []
  );

  return (
    <div className="relative">
      {packages && (
        <Box sx={{ width: "100%", height: "700px" }}>
          <DataGrid
            checkboxSelection={true}
            components={{ Toolbar: GridToolbar }}
            rowHeight={60}
            columns={columns}
            rows={packages}
            getRowId={(row) => row?.addToEventId}
          />
        </Box>
      )}
    </div>
  );
}

export default AdminViewBookedPackages;
