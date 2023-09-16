import { Box } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import LoginDetailsServices from "Services/Login Details/LoginDetailsServices";
import UserServices from "Services/User/UserServices";
import ActionBtn from "components/Admin/Action btn/ActionBtn";
import AdminUserActionComponent from "components/Admin/View Users/AdminUserActionComponent";
import { useEffect, useMemo, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { FiSettings, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
import { User1 } from "types/User";

function AdminViewAllUsers({ loggedUserId, token }: any) {
  // back drops
  const [deleteLoading, setDeleteLoadng] = useState<boolean>(false);
  const [backdropPW, setBackdropPW] = useState<boolean>(false);
  const [backdropRole, setBackdropRole] = useState<boolean>(false);

  const [users, setUsers] = useState<Array<User1>>([]);
  useEffect(() => {
    UserServices.getAllUsers()
      .then((res: any) => {
        if (res.data.status === 1) {
          setUsers(res.data.data);
          return;
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch providers");
      });
  }, []);

  const [deleteId, setDeleteId] = useState<any>();
  useEffect(() => {
    const filteredData = users?.filter((user: any) => user.userId !== deleteId);
    setUsers(filteredData);
  }, [deleteId]);

  const columns = useMemo(
    () => [
      { field: "userId", headerName: "User ID", width: 80 },
      {
        field: "firstName",
        headerName: "First Name",
        width: 130,
        editable: true,
      },
      {
        field: "lastName",
        headerName: "Last Name",
        width: 130,
        editable: true,
      },
      {
        field: "district",
        headerName: "District",
        width: 100,
        editable: true,
      },
      {
        field: "mobile",
        headerName: "Mobile",
        width: 100,
        editable: true,
      },
      {
        field: "email",
        headerName: "Email",
        width: 180,
        type: "actions",
        renderCell: (params: any) => (
          <AdminUserActionComponent {...{ params }} />
        ),
      },
      {
        field: "changePassword",
        headerName: "Change Password",
        width: 180,
        type: "actions",
        renderCell: (params: any) => {
          const setDefaultPw = (e: any) => {
            setBackdropPW(true);
            setTimeout(() => {
              const { userId } = params.row;
              LoginDetailsServices.setDefaultPW(userId, token).then(
                (res: any) => {
                  if (res.data.status === 1) {
                    setBackdropPW(false);
                    toast.success("Password changed to default PW");
                  } else {
                    toast.error(res.data.message);
                  }
                }
              );
              setBackdropPW(false);
            }, 1500);
          };
          return (
            <ActionBtn
              loading={backdropPW}
              func={setDefaultPw}
              bgColor={green[500]}
              hoverBgColor={green[700]}
              icon={
                <FiSettings className="text-xl text-white row-commit-icon" />
              }
            />
          );
        },
      },
      {
        field: "role",
        headerName: "Role",
        width: 100,
        editable: false,
      },
      {
        field: "changeRole",
        headerName: "Change Role",
        width: 110,
        type: "actions",
        renderCell: (params: any) => {
          const { userId } = params.row;
          const handleDeleteUser = async () => {
            setBackdropRole(true);
            setTimeout(() => {
              UserServices.changeRole(userId, token).then((res: any) => {
                if (res.data.status === 1) {
                  window.location.reload();
                } else {
                  setBackdropRole(false);
                  toast.error("Cant't change role");
                }
              });
            }, 1500);
          };
          return (
            <>
              {Number(loggedUserId) !== userId && (
                <ActionBtn
                  loading={backdropRole}
                  func={handleDeleteUser}
                  bgColor={blue[500]}
                  hoverBgColor={blue[700]}
                  icon={
                    <FiUser className="text-xl text-white row-commit-icon" />
                  }
                />
              )}
            </>
          );
        },
      },
      {
        field: "deleteUser",
        headerName: "Delete User",
        width: 110,
        type: "actions",
        renderCell: (params: any) => {
          const { userId } = params.row;
          const { role } = params.row;
          const handleDeleteUser = async () => {
            setDeleteLoadng(true);
            setTimeout(async () => {
              const result = await UserServices.deleteUserByUserId(
                userId,
                token
              );
              if (result.data.status === 1) {
                toast.success(`Provider ${userId} is deleted`);
                setDeleteId(userId);
                setDeleteLoadng(false);
              }
              setDeleteId(userId);
              setDeleteLoadng(false);
            }, 1500);
          };
          return (
            <>
              {role === "USER" && (
                <ActionBtn
                  loading={deleteLoading}
                  func={handleDeleteUser}
                  bgColor={red[500]}
                  hoverBgColor={red[700]}
                  icon={
                    <BiTrash className="text-xl text-white row-commit-icon" />
                  }
                />
              )}
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="relative">
      {users && (
        <Box sx={{ width: "100%", height: "700px" }}>
          <DataGrid
            checkboxSelection={true}
            components={{ Toolbar: GridToolbar }}
            rowHeight={60}
            columns={columns}
            rows={users}
            getRowId={(row) => row?.userId}
          />
        </Box>
      )}
    </div>
  );
}

export default AdminViewAllUsers;
