import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";
import calendarApi from "../api/calendarApi";
import { convertToDateEvent } from "../helpers";
import Swal from "sweetalert2";


export const useCalendarStore = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar)
  const { user } = useSelector(state => state.auth)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  }

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        //Actualiza el evento
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
        dispatch(onUpdateEvent({ ...calendarEvent }));
        startLoadingEvents();

      } else {
        //Crea un evento y lo almacena en la base de datos
        const { data } = await calendarApi.post('/events', calendarEvent);

        dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }))
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar', error.response.data.msg, 'error')
    }
  }

  const startDeletingEvent = async() => {

    try {
      const {data} = await calendarApi.delete(`/events/${activeEvent.id}`)
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error)
      Swal.fire('Error', error.response.data.msg, 'error')
    } 
  }

  const startLoadingEvents = async () => {

    try {
      const { data } = await calendarApi.get('/events');
      const events = convertToDateEvent(data.eventos);
      dispatch(onLoadEvents(events))

    } catch (error) {
      console.log(error);
    }
  }

  return {
    //Propiedades
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    //Modulos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents
  }
}
