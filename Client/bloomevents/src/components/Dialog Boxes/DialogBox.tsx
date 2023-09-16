import { DialogTitle, DialogActions, Button, Dialog } from "@mui/material";

function DialogBox({
  open,
  close,
  actionFunc,
  actionBtnName,
  title,
  color,
}: any) {
  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="p-5">
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

      <DialogActions>
        {/* <Button onClick={close}>Cancel</Button> */}
        <button
          className={`text-${color} border-${color} hover:bg-${color} my-event-card-btn`}
          onClick={actionFunc}>
          {actionBtnName}
        </button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogBox;
