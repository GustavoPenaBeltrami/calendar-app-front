import { Calendar } from "react-big-calendar";
import { Navbar } from "../components/Navbar";
import { CalendarEvents } from "../components/CalendarEvents";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer, getMessagesEs } from "../../helpers";
import { useEffect, useState } from "react";
import { CalendarModal } from "../components/CalendarModal";
import { useAuthStore, useUiStore } from "../../hooks";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { FabAddNew } from "../components/FabAddNew";
import { FabDelete } from "../components/FabDelete";



export const CalendarPage = () => {

  const { user} = useAuthStore();
  const {openDateModal} = useUiStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')
  const eventStleGetter = (event, start, end, isSelected) => {

    const isMyEvent = ( user.uid === event.user._id) || ( user.uid === event.user.uid);

    const style = {
      backgroundColor: isMyEvent ? "#367CF7" : '#465660',
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return {
      style,
    };
  };

  const {events, setActiveEvent, startLoadingEvents} = useCalendarStore();

  const onDoubleClick = (event) => {
    openDateModal();
  }
  const onSelect = (event) => {
    setActiveEvent(event)
  }
  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  }

  useEffect(() => {
    startLoadingEvents()
  }, [])
  

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: "calc(100vh - 80px)",
          width: "80%",
          margin: "0px auto",
        }}
        messages={getMessagesEs()}
        eventPropGetter={eventStleGetter}
        components={{
          event: CalendarEvents,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal/>
      <FabAddNew />
      <FabDelete />
    </>
  );
};
