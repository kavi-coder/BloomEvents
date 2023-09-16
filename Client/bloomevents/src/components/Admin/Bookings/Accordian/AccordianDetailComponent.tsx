import { AccordionDetails, Typography } from "@mui/material";
import AddToEventService from "Services/AddToEvent/AddToEventService";
import React from "react";
import { toast } from "react-toastify";
import AccordianPackgeDetail from "./AccordianPackgeDetail";

function AccordianDetailComponent({ eventId }: any) {
  const [packages, setPackages] = React.useState<Array<Event>>();
  React.useEffect(() => {
    AddToEventService.getPackagesByEventId(eventId).then((res: any) => {
      if (res.data.status === 1) {
        setPackages(res.data.data);
        return;
      } else {
        toast.error(res.data.message);
      }
    });
  }, []);

  return (
    <div>
      <AccordionDetails>
        {packages?.map((p: any, i: number) => (
          <>
            <Typography key={i}>
              <AccordianPackgeDetail addToEvent={p} />
            </Typography>
          </>
        ))}
      </AccordionDetails>
    </div>
  );
}

export default AccordianDetailComponent;
