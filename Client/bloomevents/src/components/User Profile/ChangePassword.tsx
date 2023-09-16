import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";
import CircularProgressItem from "components/CircularProgress/CircularProgressItem";
import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import LoginDetailsServices from "Services/Login Details/LoginDetailsServices";

function ChangePassword({ open, handleClose, userId }: any) {
  const [token, setToken] = useState<any>();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setToken(JSON.parse(token));
    } else {
      setToken(null);
    }
  }, []);
  // show password - old
  const [oldShowPw, setOldShowPw] = useState<boolean>(false);
  const showOldPassword = () => {
    if (oldShowPw) {
      setOldShowPw(false);
    } else {
      setOldShowPw(true);
    }
  };

  // show password - new
  const [newShowPw, setNewShowPw] = useState<boolean>(false);
  const showNewPassword = () => {
    if (newShowPw) {
      setNewShowPw(false);
    } else {
      setNewShowPw(true);
    }
  };

  // password validation
  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+-=])[A-Za-z\d!@#$%^&*()_+-=]{8,}$/;
    return passwordRegex.test(password);
  };

  // handle backdrop
  const [backdrop, setBackdrop] = useState<boolean>(false);

  const [oldPw, setOldPw] = useState<string>("");
  const [newPw, setNewPw] = useState<string>("");
  useEffect(() => {
    setOldPw("");
    setNewPw("");

    setNewShowPw(false);
    setOldShowPw(false);
  }, [open]);

  const onSubmitPassword = async (e: any) => {
    e.preventDefault();
    setBackdrop(true);
    if (oldPw == "" || newPw == "") {
      toast.error("Both passwords are required.");
    } else {
      if (validatePassword(newPw)) {
        const updatePwRequest: any = {
          oldPw: oldPw,
          newPw: newPw,
        };
        setTimeout(async () => {
          const result = await LoginDetailsServices.updatePassword(
            userId,
            updatePwRequest,
            token
          );

          if (result.data.status == 1) {
            toast.success(result.data.data);
            handleClose();
          } else {
            toast.error(result.data.message);
          }
        }, 1000);
      } else {
        toast.error(
          "Password must contain atleast 8 characters and one uppercase and lowercase letter, one number and one symbol"
        );
      }
    }
  };

  return (
    <div className="w-full">
      <Dialog
        fullWidth
        // style={{ padding: "10px 10px 10px 10px" }}
        sx={{
          ".MuiPaper-root": {
            padding: 2,
          },
        }}
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        {/* title */}
        <DialogTitle id="alert-dialog-title" style={{ paddingLeft: "2px" }}>
          <h2 className="text-3xl text-left">
            Update <span className="text-[#ffa537]">Password</span>
          </h2>
        </DialogTitle>
        {/* old password */}
        <div className="flex w-full col-span-6 mt-5 buttonIn sm:col-span-4">
          <div className="w-full">
            <TextField
              id="outlined"
              color="warning"
              type={oldShowPw ? "text" : "password"}
              label="Current Password"
              className="w-full rounded-[5px] outline-none p-0 "
              variant="outlined"
              onChange={(e) => {
                setOldPw(e.target.value);
              }}
            />
          </div>
          <h1 id="clear" className="showPw" onClick={showOldPassword}>
            {oldShowPw ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </h1>
        </div>

        {/* new password */}
        <div className="flex w-full col-span-6 mt-5 buttonIn sm:col-span-4">
          <div className="w-full">
            <TextField
              id="outlined"
              color="warning"
              type={newShowPw ? "text" : "password"}
              label="New Password"
              className="w-full rounded-[5px] outline-none p-0 "
              variant="outlined"
              onChange={(e) => {
                setNewPw(e.target.value);
              }}
            />
          </div>
          <h1 id="clear" className="showPw" onClick={showNewPassword}>
            {newShowPw ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </h1>
        </div>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <button
            type="submit"
            onClick={onSubmitPassword}
            className="react-hook-form-btn react-hook-form-btn-submit">
            {backdrop === true && (
              <>
                <div className="mr-3">
                  <CircularProgressItem />
                </div>
              </>
            )}
            Update Password
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ChangePassword;
