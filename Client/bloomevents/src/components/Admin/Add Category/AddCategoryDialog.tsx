import {
  Dialog,
  DialogTitle,
  Box,
  TextField,
  DialogActions,
} from "@mui/material";
import CategoryService from "Services/Category/CategoryService";
import CircularProgressItem from "components/CircularProgress/CircularProgressItem";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AddCategoryDialog({ openDialog, handleClickCloseDialog, token }: any) {
  const [value, setValue] = useState<string | "">("");

  const [backdrop, setBackdrop] = useState<boolean>(false);
  const addCategory = (e: any) => {
    e.preventDefault();

    if (value === "") {
      toast.error("Category name field can not be empty");
    } else {
      setBackdrop(true);
      const newCategory = {
        categoryId: 0,
        categoryName: value,
      };
      setTimeout(() => {
        CategoryService.addCategory(newCategory, token && token)
          .then((res: any) => {
            if (res.data.status === 1) {
              handleClickCloseDialog();
              setBackdrop(false);
              window.location.reload();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }, 1000);
    }
  };
  return (
    <div>
      <div>
        <Dialog
          open={openDialog}
          onClose={handleClickCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="p-5">
          <DialogTitle id="alert-dialog-title">
            <h1 className="mb-3 text-3xl text-center">
              Add <span className="text-[#ffa537]">Category</span>
            </h1>

            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
              }}>
              <TextField
                fullWidth
                variant="outlined"
                label="Category Name"
                id="fullWidth"
                color="warning"
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            </Box>
          </DialogTitle>

          <DialogActions>
            <button
              type="submit"
              onClick={addCategory}
              className="react-hook-form-btn react-hook-form-btn-submit">
              {backdrop === true && (
                <>
                  <div className="mr-3">
                    <CircularProgressItem />
                  </div>
                </>
              )}
              Add Category
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default AddCategoryDialog;
