import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";
import CircularProgressItem from "components/CircularProgress/CircularProgressItem";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import PackageServices from "Services/Packages/PackageService";

function EditPackageDetails({ packge, providerId, token }: any) {
  // handle delete dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e: any) => {
    e.preventDefault();
    setOpen(true);
    if (backdropDelete === true) {
      setBackdropDelete(false);
    }
  };

  const handleClose = (e: any) => {
    e.preventDefault();
    setOpen(false);
  };

  // handle backdrop
  const [backdrop, setBackdrop] = useState<boolean>(false);
  //handle form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setBackdrop(true);
    const updatedPackage: any = {
      packageId: packge.packageId,
      packageName: data.packageName,
      price: data.price,
      description: data.description,
      providerId: providerId,
    };

    setTimeout(async () => {
      if (packge.packageId) {
        const result = await PackageServices.updatePackage(
          updatedPackage,
          packge.packageId,
          token
        );
        if (result.data.status == 1) {
          window.location.reload();
        }
      } else {
        if (token) {
          const result = await PackageServices.addPackage(
            updatedPackage,
            token
          );
          if (result.data.status == 1) {
            window.location.reload();
          }
        } else {
          let token1 = localStorage.getItem("token");
          if (token1) {
            token1 = JSON.parse(token1);
            const result = await PackageServices.addPackage(
              updatedPackage,
              token1
            );
            if (result.data.status == 1) {
              window.location.reload();
            }
          }
        }
      }
    }, 1000);
  };

  // handle delete backdrop
  const [backdropDelete, setBackdropDelete] = useState<boolean>(false);
  const handleDeletePackage = (e: any) => {
    e.preventDefault();
    setBackdropDelete(true);

    setTimeout(() => {
      PackageServices.deletePackage(packge.packageId, token).then(
        (res: any) => {
          if (res.data.status == 1) {
            window.location.reload();
          } else {
            toast.error(res.data.message);
          }
        }
      );
    }, 1000);
  };
  return (
    <div className="my-3">
      {packge ? (
        <form action="#" method="POST">
          <div className="overflow-hidden drop-shadow-lg sm:rounded-md">
            <div className="py-5 bg-white sm:p-6">
              <div>
                {packge.packageName ? (
                  <>
                    <h1 className="mb-3 text-3xl text-center">
                      Update{" "}
                      <span className="text-[#ffa537]">
                        {packge.packageName}
                      </span>{" "}
                      Package
                    </h1>
                  </>
                ) : (
                  <>
                    <h1 className="mb-3 text-3xl text-center">
                      New <span className="text-[#ffa537]">Package</span>
                    </h1>
                  </>
                )}
              </div>

              <div className="form-input-main-div">
                {/* business nanme */}
                <div className="form-input-sub-div">
                  <TextField
                    color="warning"
                    id="outlined"
                    label="Package Name"
                    defaultValue={packge.packageName}
                    className="form-textfield-double"
                    {...register("packageName", {
                      required: true,
                    })}
                    variant="outlined"
                  />
                  {errors.packageName && (
                    <p className="text-xs text-red-600">
                      Business name is required
                    </p>
                  )}
                </div>

                {/* price */}
                <div className="form-input-sub-div">
                  <TextField
                    color="warning"
                    id="outlined"
                    label="Price"
                    defaultValue={packge.price}
                    className="form-textfield-double"
                    {...register("price", {
                      required: true,
                      pattern: /^[0-9]+$/,
                    })}
                    variant="outlined"
                  />
                  {errors.price && (
                    <p className="text-xs text-red-600">Price is required</p>
                  )}
                </div>
              </div>

              {/* description */}
              <div className="block my-3 form-input-main-div">
                <TextField
                  color="warning"
                  id="outlined"
                  label="Description"
                  multiline
                  rows={6}
                  defaultValue={packge.description}
                  className="form-textfield-double"
                  {...register("description", {
                    required: true,
                    maxLength: 5000,
                  })}
                  variant="outlined"
                />
                {errors.description && (
                  <p className="text-xs text-red-600">
                    Description is required and maximum character count is 5000
                  </p>
                )}
              </div>
            </div>

            <div className="react-hook-form-btn-div">
              {packge.packageName && (
                <>
                  <button
                    type="submit"
                    onClick={handleClickOpen}
                    className="react-hook-form-btn react-hook-form-btn-delete"
                  >
                    Delete Package
                  </button>
                  {/*  delete dialog */}
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {`Do you want to delete ${packge.packageName} package ?`}
                    </DialogTitle>

                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <button
                        type="submit"
                        onClick={handleDeletePackage}
                        className="react-hook-form-btn react-hook-form-btn-delete"
                      >
                        {backdropDelete === true && (
                          <>
                            <div className="mr-3">
                              <CircularProgressItem />
                            </div>
                          </>
                        )}
                        Delete
                      </button>
                    </DialogActions>
                  </Dialog>
                </>
              )}

              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="react-hook-form-btn react-hook-form-btn-submit"
              >
                {backdrop === true && (
                  <>
                    <div className="mr-3">
                      <CircularProgressItem />
                    </div>
                  </>
                )}
                {packge.packageName ? "Save Changes" : "Add Package"}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
}

export default EditPackageDetails;
