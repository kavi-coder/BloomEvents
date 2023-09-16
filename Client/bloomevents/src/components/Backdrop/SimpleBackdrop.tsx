import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function SimpleBackdrop() {
  return (
    <div>
      {/* <Button onClick={handleToggle}>Show backdrop</Button> */}
      <Backdrop sx={{ color: "#F5D5A6" }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
