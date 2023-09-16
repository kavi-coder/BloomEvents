import { TableContainer, Table, TableHead, Box } from "@mui/material";
import { red } from "@mui/material/colors";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import PrivateBookingService from "Services/Private Bookings/PrivateBookingService";
import ActionBtn from "components/Admin/Action btn/ActionBtn";
import AddPrivateBooking from "components/Provider/Private Bookings/AddPrivateBooking";
import events from "events";
import { useEffect, useMemo, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { PrivateBooking } from "types/PrivateBooking";

function PrivateBookings({ providerId, token }: any) {
  const [backdropDelete, setBackdropDelete] = useState<boolean>(false);
  const [bookings, setBookings] = useState<Array<PrivateBooking>>();

  useEffect(() => {
    PrivateBookingService.getPrivateBookingsByProviderId(providerId).then(
      (res: any) => {
        if (res.data.status === 1) {
          setBookings(res.data.data);
          console.log(res.data.data);
          return;
        } else {
          //toast.error(res.data.message);
        }
      }
    );
  }, [providerId]);

  const [deleteId, setDeleteId] = useState<any>();
  useEffect(() => {
    const filteredData = bookings?.filter(
      (event: any) => event.privateBookingId !== deleteId
    );
    setBookings(filteredData);
  }, [deleteId]);

  const columns = useMemo(
    () => [
      { field: "privateBookingId", headerName: "ID", width: 250 },
      {
        field: "eventName",
        headerName: "Event Name",

        width: 250,
      },

      {
        field: "eventDate",
        headerName: "Event Date",
        width: 250,
      },

      {
        field: "eventTime",
        headerName: "Event Time",
        width: 250,
      },

      {
        field: "reject",
        headerName: "Delete",
        width: 250,
        type: "actions",
        renderCell: (params: any) => {
          const { privateBookingId } = params.row;
          const RejectEvent = async () => {
            setBackdropDelete(true);
            setTimeout(() => {
              PrivateBookingService.deletePrivateBookingById(
                privateBookingId,
                token
              ).then((res: any) => {
                if (res.data.status === 1) {
                  setDeleteId(privateBookingId);
                  setBackdropDelete(false);
                }
              });
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
    <div>
      {bookings ? (
        <>
          <div className="w-full">
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead sx={{ backgroundColor: "red" }}>
                  <AddPrivateBooking providerId={providerId} />
                </TableHead>
              </Table>
            </TableContainer>
          </div>

          <div className="relative">
            {events && (
              <Box sx={{ width: "100%", height: "700px" }}>
                <DataGrid
                  checkboxSelection={true}
                  components={{ Toolbar: GridToolbar }}
                  rowHeight={60}
                  columns={columns}
                  rows={bookings}
                  getRowId={(row) => row?.privateBookingId}
                />
              </Box>
            )}
          </div>
        </>
      ) : (
        <>{/* <h1>No Private Bookings</h1> */}</>
      )}
    </div>
  );
}

export default PrivateBookings;
