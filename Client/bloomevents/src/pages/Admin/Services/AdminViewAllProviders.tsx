import { Box } from "@mui/material";
import ProviderService from "Services/Provider/ProviderServices";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ServiceProvider } from "types/ServiceProvider";
import ActionBtn from "components/Admin/Action btn/ActionBtn";
import { BiTrash } from "react-icons/bi";
import { red } from "@mui/material/colors";

function AdminViewAllProviders({ token }: any) {
  const [providers, setProviders] = useState<Array<ServiceProvider>>([]);
  const [deleteId, setDeleteId] = useState();
  const [deleteLoading, setDeleteLoadng] = useState(false);

  useEffect(() => {
    ProviderService.getAllServices()
      .then((res: any) => {
        if (res.data.status === 1) {
          setProviders(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch providers");
      });
  }, []);

  useEffect(() => {
    const filteredData = providers?.filter(
      (emp) => emp.providerId !== deleteId
    );
    setProviders(filteredData);
  }, [deleteId]);

  const columns = useMemo(
    () => [
      { field: "providerId", headerName: "Provider ID", width: 100 },
      {
        field: "businessName",
        headerName: "Business Name",
        width: 150,
        editable: true,
      },
      {
        field: "categoryName",
        headerName: "Category",
        width: 150,
        editable: true,
      },
      {
        field: "district",
        headerName: "District",
        width: 150,
        editable: true,
      },
      {
        field: "mobile",
        headerName: "Mobile",
        width: 100,
        editable: true,
      },
      {
        field: "facebook",
        headerName: "Facebook",
        width: 150,
        editable: true,
      },
      {
        field: "instagram",
        headerName: "Instagram",
        width: 150,
        editable: true,
      },
      {
        field: "web",
        headerName: "Website",
        width: 150,
        editable: true,
      },
      {
        field: "rating",
        headerName: "Rating",
        width: 100,
        editable: true,
      },

      {
        field: "userId",
        headerName: "User ID",
        width: 100,
        editable: true,
      },
      {
        field: "action",
        headerName: "Action",
        type: "actions",
        renderCell: (params: any) => {
          const handleDelete = async () => {
            setDeleteLoadng(true);
            setTimeout(async () => {
              const { providerId } = params.row;
              const result = await ProviderService.deleteProvider(
                providerId,
                token
              );
              if (result.data.status === 1) {
                toast.success(`Provider ${providerId} is deleted`);
                setDeleteId(providerId);
                setDeleteLoadng(false);
              }
            }, 1500);
          };
          return (
            <>
              <ActionBtn
                loading={deleteLoading}
                func={handleDelete}
                bgColor={red[500]}
                hoverBgColor={red[700]}
                icon={
                  <BiTrash className="text-xl text-white row-commit-icon" />
                }
              />
            </>
          );
        },
        width: 120,
      },
    ],
    []
  );

  return (
    <div className="relative">
      {providers && (
        <Box sx={{ width: "100%", height: "700px" }}>
          <DataGrid
            checkboxSelection={true}
            components={{ Toolbar: GridToolbar }}
            rowHeight={60}
            columns={columns}
            rows={providers}
            getRowId={(row) => row?.providerId}
          />
        </Box>
      )}
    </div>
  );
}

export default AdminViewAllProviders;
