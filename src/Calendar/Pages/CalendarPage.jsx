import { NavBar } from "../components/NavBar"
import { Calendar,dateFnsLocalizer } from "react-big-calendar"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import enUS from 'date-fns/locale/en-US'
import enES from 'date-fns/locale/es'
import { format,parse,startOfWeek,getDay} from "date-fns"
import { getMessagesES } from "../../helpers/getMessages"
import { CalendarEvent } from "../components/CalendarEvent"
import { useState } from "react"
import { CalendarModal } from "../components/CalendarModal"
import { useUIModal } from "../../Hooks/useUIModal"
import { useDispatch } from "react-redux"
import { useCalendarStore } from "../../Hooks/useCalendarStore"
import { AddNew } from "../components/AddNew"
import { FabDelete } from "../components/FabDelete"
import { useEffect } from "react"

const locales={
  'en-US':enUS,
  'es':enES
}

const localizer=dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

export const CalendarPage = () => {


  const {onToogleModal}=useUIModal();

  const {eventos,onSetActiveEvent,onLoadEventos}=useCalendarStore();

  useEffect(()=>{
    onLoadEventos();
  },[])

  const [lastView,setlastView]=useState(localStorage.getItem('lastView') || 'month');

  const eventoStyleGetter=(event,start,end,isSelected)=>{
    const style={
      backgroundColor:'#347CF7',
      borderRadius:'0px',
      opacity:0.8,
      color:'white'
    }

    return {
      style
    }
  }

  const onDoubleClick=(evento)=>{
    onToogleModal();
  }

  const onSelect=(evento)=>{
    onSetActiveEvent(evento);
  }

  const onViewChanged=(evento)=>{
    localStorage.setItem('lastView',evento);
    setlastView(evento);
  }

  return (
    <>
      <NavBar/>
      <Calendar
      culture='es'
      localizer={localizer}
      events={eventos}
      defaultView={lastView}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc(100vh - 80px)' }}
      messages={getMessagesES()}
      eventPropGetter={eventoStyleGetter}
      components={{
        event:CalendarEvent
      }}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelect}
      onView={onViewChanged}
    />
     <CalendarModal/>
     <AddNew/>
     <FabDelete/>
    </>
  )
}
