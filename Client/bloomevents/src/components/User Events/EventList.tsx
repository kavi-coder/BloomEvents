import "styles/myEventsRadioBtns.css";
import MyEventCard from "components/Cards/MyEventCard";
import { RouteName } from "constant/routeName";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventServices from "Services/Event/EventServices";
import EventListSkeleton from "skeleton/My Event/EventListSkeleton";

function EventList(userid: any) {
  const navigate = useNavigate();
  const [user, setuser] = React.useState<any>("");

  useEffect(() => {
    setTimeout(() => {
      let logged = localStorage.getItem("loggedUser");
      if (logged) {
        setuser(JSON.parse(logged));
        if (JSON.parse(logged).userId !== userid) {
        }
      } else {
        setuser(null);
        navigate(RouteName.Login);
      }
    }, 1000);
  }, [localStorage.getItem("loggedUser")]);

  const [events, setEvents] = React.useState<Array<Event>>();
  const [filteredEvents, setFilteredEvents] = React.useState<Array<Event>>(); // for filter purpose

  const [listFound, setListFound] = React.useState<boolean>(false);

  React.useEffect(() => {
    EventServices.getEventsByUserId(userid.userid).then((res: any) => {
      if (res.data.status === 1) {
        setListFound(true);
        setEvents(res.data.data);
        setFilteredEvents(res.data.data);
        return;
      } else {
        setListFound(false);
      }
    });
  }, []);

  // handle list after deleting event
  const [deleteId, setDeleteId] = React.useState<any>();

  useEffect(() => {
    const filteredData = filteredEvents?.filter(
      (emp: any) => emp.eventId !== deleteId
    );
    setFilteredEvents(filteredData);

    const filteredEventData = events?.filter(
      (emp: any) => emp.eventId !== deleteId
    );
    setEvents(filteredEventData);
  }, [deleteId]);

  // rdio btn function
  const [filterEvents, setFilterEvents] = React.useState<any>();
  const handleFilterEvents = (e: any) => {
    setFilterEvents(e.target.value);
  };

  useEffect(() => {
    if (filterEvents === "1") {
      const filteredData = events?.filter(
        (emp: any) => emp.placed === true && emp.booked === false
      );
      setFilteredEvents(filteredData);
    } else if (filterEvents === "2") {
      const filteredData = events?.filter((emp: any) => emp.placed === false);
      setFilteredEvents(filteredData);
    } else if (filterEvents === "3") {
      const filteredData = events?.filter((emp: any) => emp.booked === true);
      setFilteredEvents(filteredData);
    } else {
      setFilteredEvents(events);
    }
  }, [filterEvents]);

  return (
    <div>
      {/* radio btns */}
      <div className="align-container">
        <input
          type="radio"
          id="align-left"
          name="alignment"
          value="0"
          defaultChecked
          onChange={handleFilterEvents}
        />
        <label htmlFor="align-left">All</label>

        <input
          type="radio"
          id="align-center"
          name="alignment"
          value="1"
          onChange={handleFilterEvents}
        />
        <label htmlFor="align-center">Placed</label>

        <input
          type="radio"
          id="align-center2"
          name="alignment"
          value="2"
          onChange={handleFilterEvents}
        />
        <label htmlFor="align-center2">Not Placed</label>

        <input
          type="radio"
          id="align-right"
          name="alignment"
          value="3"
          onChange={handleFilterEvents}
        />
        <label htmlFor="align-right">Booked</label>
      </div>

      <div>
        {filteredEvents && user ? (
          <>
            {filteredEvents.length == 0 && (
              <p className="mt-5 text-center">No Events</p>
            )}
            {filteredEvents.map((c: any, i: number) => (
              <div key={i}>
                <MyEventCard func={setDeleteId} event={c} />
              </div>
            ))}
          </>
        ) : (
          <>
            {listFound ? (
              <EventListSkeleton />
            ) : (
              <p className="mt-5 text-center">No Events</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default EventList;
