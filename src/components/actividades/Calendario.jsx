import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { es } from "date-fns/locale";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";

const messages = {
  allDay: "Todo el día",
  previous: "Anterior",
  next: "Siguiente",
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  noEventsInRange: "No hay eventos en este rango",
  showMore: total => `+ Ver más (${total})`
};

const locales = {
  "es": es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Reunión TCC",
    start: new Date(2022, 8, 5),
    end: new Date(2022, 8, 5)
  },
  {
    title: "Reunión TCC",
    start: new Date(2022, 8, 12),
    end: new Date(2022, 8, 12)
  }
  ,
  {
    title: "Reunión TCC",
    start: new Date(2022, 8, 19),
    end: new Date(2022, 8, 19)
  }
  ,
  {
    title: "Reunión TCC",
    start: new Date(2022, 8, 26),
    end: new Date(2022, 8, 26)
  }
];

const Calendario = () => (
  <section className="mt-4">
    <div className="bg-white rounded-lg table my-0 mx-auto">
      <Calendar
        culture={"es"}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  </section>
)

export default Calendario;