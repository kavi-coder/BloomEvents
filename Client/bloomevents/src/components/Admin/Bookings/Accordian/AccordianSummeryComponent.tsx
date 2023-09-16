import { AccordionSummary, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EventServices from "Services/Event/EventServices";
import {
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineDollarCircle,
} from "react-icons/ai";
import { FiPackage } from "react-icons/fi";
import PackageServices from "Services/Packages/PackageService";
import AddToEventService from "Services/AddToEvent/AddToEventService";

function AccordianSummeryComponent({ i, event }: any) {
  const [bookedevent, setBookedEvent] = useState<any>();
  useEffect(() => {
    EventServices.getEventById(event.eventId).then((res: any) => {
      if (res.data.status === 1) {
        setBookedEvent(res.data.data);
      }
    });
  }, []);

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    PackageServices.getTotalPriceByEventId(event.eventId).then((res: any) => {
      if (res.data.status === 1) {
        setTotalPrice(res.data.data);
        return;
      }
    });
  }, []);

  // get approved package count
  const [packageCount, setPackageCount] = useState<number>(0);
  useEffect(() => {
    AddToEventService.getpackagecountbyeventid(event.eventId).then(
      (res: any) => {
        if (res.data.status === 1) {
          setPackageCount(res.data.data);
          return;
        }
      }
    );
  }, []);

  return (
    <div>
      <AccordionSummary
        sx={{ backgroundColor: "#FFFDE7" }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${i}bh-content`}
        id={`panel${i}bh-header`}>
        <Typography sx={{ width: "20%", flexShrink: 0, fontWeight: "700" }}>
          {bookedevent?.eventName}
        </Typography>
        <Typography sx={{ width: "20%", color: "text.secondary" }}>
          <p className="flex items-center mb-2 text-base font-semibold text-neutral-600 ">
            <AiOutlineCalendar className="mr-1 text-[#ffa537]" />
            Date : {bookedevent?.eventDate}
          </p>
        </Typography>

        <Typography sx={{ width: "20%", color: "text.secondary" }}>
          <p className="flex items-center mb-2 text-base font-semibold text-neutral-600 ">
            <AiOutlineClockCircle className="mr-1 text-[#ffa537]" />
            Time : {bookedevent?.eventTime}
          </p>
        </Typography>

        <Typography sx={{ width: "20%", color: "text.secondary" }}>
          <p className="flex items-center mb-2 text-base font-semibold text-neutral-600 ">
            <FiPackage className="mr-1 text-[#ffa537]" />
            Packages : {packageCount}
          </p>
        </Typography>

        <Typography sx={{ width: "20%", color: "text.secondary" }}>
          <p className="flex items-center mb-2 text-base font-semibold text-neutral-600 ">
            <AiOutlineDollarCircle className="mr-1 text-[#ffa537]" />
            Total Price : Rs {totalPrice}
          </p>
        </Typography>
      </AccordionSummary>
    </div>
  );
}

export default AccordianSummeryComponent;
