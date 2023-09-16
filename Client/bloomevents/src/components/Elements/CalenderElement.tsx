import EventServices from "Services/Event/EventServices";
import PrivateBookingService from "Services/Private Bookings/PrivateBookingService";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Calendar, { CalendarTileProperties } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AiOutlineClose } from "react-icons/ai";
import "styles/Calender.css";

function CalendarElement({ providerId }: any) {
  const [value, onChange] = useState();
  const [bookingDates, setBookingDates] = useState<Array<string>>();
  const [privateBookingDates, setPrivateBookingDates] =
    useState<Array<string>>();

  useEffect(() => {
    EventServices.getBookingDatesByProviderId(providerId).then((res: any) => {
      if (res.data.status === 1) {
        setBookingDates(res.data.data);
      }
    });

    PrivateBookingService.getPrivateBookingsByProviderId(providerId).then(
      (res: any) => {
        if (res.data.status === 1) {
          setPrivateBookingDates(res.data.data);
        }
      }
    );
  }, []);

  const tileContent = ({
    date,
    view,
  }: CalendarTileProperties): JSX.Element | null => {
    if (view === "month") {
      const formattedDate = dayjs(date).format("DD-MMM-YYYY");
      const count = bookingDates?.filter(
        (d: any) => d === formattedDate
      ).length;
      if (count && count > 0) {
        return (
          <div className="relative">
            <AiOutlineClose className="absolute top-0 left-0 w-full h-full font-bold text-red-600" />
            <div className="p-1 font-bold text-transparent rounded-full">
              {date.getDate()}
            </div>
          </div>
        );
      }

      const formattedDate1 = dayjs(date).format("DD-MMM-YYYY");
      const count1 = privateBookingDates?.filter(
        (d: any) => d.eventDate === formattedDate1
      ).length;
      if (count1 && count1 > 0) {
        return (
          <div className="relative">
            <AiOutlineClose className="absolute top-0 left-0 w-full h-full font-bold text-red-600" />
            <div className="p-1 font-bold text-transparent rounded-full">
              {date.getDate()}
            </div>
          </div>
        );
      }
    }
    return null;
  };

  const tileClassName = ({ date }: CalendarTileProperties): string => {
    const formattedDate = dayjs(date).format("DD-MMM-YYYY");
    const count = bookingDates?.filter((d: any) => d === formattedDate).length;
    if (count && count > 0) {
      return "booked-date";
    }

    const formattedDate1 = dayjs(date).format("DD-MMM-YYYY");
    const count1 = privateBookingDates?.filter(
      (d: any) => d.eventDate === formattedDate1
    ).length;
    if (count1 && count1 > 0) {
      return "booked-date";
    }
    return "";
  };

  const tileDisabled = ({ date, view }: CalendarTileProperties) =>
    view === "month" &&
    (date.getDay() === 0 ||
      date.getDay() === 1 ||
      date.getDay() === 2 ||
      date.getDay() === 3 ||
      date.getDay() === 4 ||
      date.getDay() === 5 ||
      date.getDay() === 6);

  return (
    <div>
      <Calendar
        value={value}
        tileContent={tileContent}
        selectRange={false}
        tileDisabled={tileDisabled}
        tileClassName={tileClassName}
        className="!bg-[#ffe6c7] rounded-lg"
      />
    </div>
  );
}

export default CalendarElement;
