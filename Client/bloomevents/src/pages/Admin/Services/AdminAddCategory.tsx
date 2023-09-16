import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CategoryService from "Services/Category/CategoryService";
import AdminAddCategoryDetails from "components/Admin/Add Category/AdminAddCategoryDetails";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddCategoryDialog from "components/Admin/Add Category/AddCategoryDialog";

function AdminAddCategory({ token }: any) {
  const [category, setCategory] = useState<any>();
  useEffect(() => {
    CategoryService.getAllCategories()
      .then((res: any) => {
        if (res.data.status === 1) {
          setCategory(res.data.data);
          //   console.log(res.data.data);
          return;
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch categories");
      });
  }, []);

  const columns = useMemo(
    () => [
      { field: "categoryId", headerName: "Category ID", width: 200 },
      {
        field: "categoryName",
        headerName: "Category Name",
        width: 300,
        editable: true,
      },
      {
        field: "noOfProvider",
        headerName: "No of Providers",
        width: 150,
        renderCell: (params: any) => (
          <AdminAddCategoryDetails {...{ params }} col={"providers"} />
        ),
      },
      {
        field: "noOfPackage",
        headerName: "No of Packages",
        width: 150,
        renderCell: (params: any) => (
          <AdminAddCategoryDetails {...{ params }} col={"package"} />
        ),
      },
    ],
    []
  );

  // add category
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleClickCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="relative">
      <div className="flex justify-start mb-3">
        <button
          type="submit"
          onClick={handleClickOpenDialog}
          className={`react-hook-form-btn react-hook-form-btn-submit `}>
          <div className="mr-3">
            <AddCircleOutlineIcon />
          </div>
          Add Category
        </button>

        {/* add category dialog */}
        <AddCategoryDialog
          openDialog={openDialog}
          handleClickCloseDialog={handleClickCloseDialog}
          token={token}
        />
      </div>
      {category && (
        <Box sx={{ width: "100%", height: "500px" }}>
          <DataGrid
            checkboxSelection={true}
            components={{ Toolbar: GridToolbar }}
            rowHeight={60}
            columns={columns}
            rows={category}
            getRowId={(row) => row?.categoryId}
          />
        </Box>
      )}
    </div>
  );
}

export default AdminAddCategory;
