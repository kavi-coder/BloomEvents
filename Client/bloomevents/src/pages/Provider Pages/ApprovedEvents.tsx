import AddToEventService from "Services/AddToEvent/AddToEventService";
import { useEffect, useMemo, useState } from "react";
import { AddToEvent } from "types/AddToEvent";

import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AdminBookedPackagesAction from "components/Admin/Booked Packages/AdminBookedPackagesAction";
import ActionBtn from "components/Admin/Action btn/ActionBtn";
import { green, red } from "@mui/material/colors";
import { MdOutlineDone } from "react-icons/md";
import { BiTrash } from "react-icons/bi";

function ApprovedEvents({ providerId, token }: any) {
  const [events, setEvents] = useState<Array<AddToEvent>>();

  useEffect(() => {
    AddToEventService.getApprovedPackagesByProviderId(providerId).then(
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

  const [backdropDelete, setBackdropDelete] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>();
  useEffect(() => {
    const filteredData = events?.filter(
      (event: any) => event.addToEventId !== deleteId
    );
    setEvents(filteredData);
  }, [deleteId]);

  const columns = useMemo(
    () => [
      { field: "addToEventId", headerName: "ID", width: 80 },
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
        headerName: "User Name",
        width: 250,
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
        field: "placedDate",
        headerName: "Placed Date",
        width: 120,
        type: "actions",
        renderCell: (params: any) => (
          <AdminBookedPackagesAction {...{ params }} col={"placedDate"} />
        ),
      },
      {
        field: "placedTime",
        headerName: "Placed Time",
        width: 120,
        type: "actions",
        renderCell: (params: any) => (
          <AdminBookedPackagesAction {...{ params }} col={"placedTime"} />
        ),
      },

      {
        field: "quantity",
        headerName: "Quantity",
        width: 100,
      },
      {
        field: "reject",
        headerName: "Reject",
        width: 110,
        type: "actions",
        renderCell: (params: any) => {
          const { addToEventId } = params.row;
          const RejectEvent = async () => {
            setBackdropDelete(true);
            setTimeout(() => {
              AddToEventService.deletePackage(addToEventId, token).then(
                (res: any) => {
                  if (res.data.status === 1) {
                    setDeleteId(addToEventId);
                    setBackdropDelete(false);
                  }
                }
              );
            }, 1500);
          };
          return (
            <>
              <ActionBtn
                loading={backdropDelete}
                func={RejectEvent}
                bgColor={red[500]}
                hoverBgColor={red[700]}
                icon={
                  <BiTrash className="text-xl text-white row-commit-icon" />
                }
              />
            </>
          );
        },
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

export default ApprovedEvents;
