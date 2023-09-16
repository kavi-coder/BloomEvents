import { Box, Fab } from "@mui/material";
import CircularProgressItem from "components/CircularProgress/CircularProgressItem";

function ActionBtn({ loading, func, bgColor, hoverBgColor, icon }: any) {
  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}>
      <Fab
        color="warning"
        sx={{
          width: 40,
          height: 40,
          bgcolor: bgColor,
          "&:hover": { bgcolor: hoverBgColor },
        }}
        className="cursor-pointer"
        onClick={func}>
        {loading ? (
          <>
            <CircularProgressItem />
          </>
        ) : (
          <>{icon}</>
        )}
      </Fab>
    </Box>
  );
}

export default ActionBtn;
