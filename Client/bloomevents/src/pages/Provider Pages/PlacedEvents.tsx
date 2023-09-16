import { Box } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AddToEventService from "Services/AddToEvent/AddToEventService";
import EventServices from "Services/Event/EventServices";
import ActionBtn from "components/Admin/Action btn/ActionBtn";
import AdminBookedPackagesAction from "components/Admin/Booked Packages/AdminBookedPackagesAction";
import React, { useEffect, useMemo, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { MdOutlineDone } from "react-icons/md";
import { AddToEvent } from "types/AddToEvent";

function PlacedEvents({ providerId, token }: any) {
  const [approveLoading, setApproveLoading] = useState<boolean>(false);
  const [backdropDelete, setBackdropDelete] = useState<boolean>(false);

  const [events, setEvents] = useState<Array<AddToEvent>>();

  useEffect(() => {
    AddToEventService.getPlacedPackagesByProviderId(providerId).then(
      (res: any) => {
        if (res.data.status === 1) {
          setEvents(res.data.data);
          // console.log(res.data.data);
          return;
        } else {
          //toast.error(res.data.message);
        }
      }
    );
  }, [providerId]);

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
        width: 120,
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
        width: 100,
        renderCell: (params: any) => (
          <AdminBookedPackagesAction {...{ params }} col={"eventTime"} />
        ),
      },
      {
        field: "userName",
        headerName: "User Name",
        width: 200,
        renderCell: (params: any) => (
          <AdminBookedPackagesAction {...{ params }} col={"userName"} />
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
        width: 80,
      },
      {
        field: "approve",
        headerName: "Approve",
        width: 110,
        type: "actions",
        renderCell: (params: any) => {
          const { addToEventId } = params.row;
          const ApproveEvent = async () => {
            console.log(token);
            setApproveLoading(true);
            setTimeout(() => {
              AddToEventService.approvePackage(addToEventId, token).then(
                (res: any) => {
                  if (res.data.status === 1) {
                    setDeleteId(addToEventId);
                    setApproveLoading(false);
                  }
                }
              );
            }, 1500);
          };
          return (
            <>
              <ActionBtn
                loading={approveLoading}
                func={ApproveEvent}
                bgColor={green[500]}
                hoverBgColor={green[700]}
                icon={
                  <MdOutlineDone className="text-xl text-white row-commit-icon" />
                }
              />
            </>
          );
        },
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
      {events && token && (
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

export default PlacedEvents;
