import { useNavigate } from "react-router-dom";
import calendarFormats from "../../../assets/js/CalendarioEspanol";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import { CitasContext, useCitasContext } from "../../../contexts/CitasContext";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import es from "date-fns/locale/es";
import useListarCitas from "../../../hooks/useListarCitas";
import "react-big-calendar/lib/css/react-big-calendar.css";
const locales = {
  es: es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { locale: es }),
  getDay,
  locales,
});

function CalendarioCitas() {
  const { selectedCitas, setSelectedCitas } = useCitasContext();
  const navigate = useNavigate();
  const { citas: todasLasCitas, cargando: cargandoCitas } = useListarCitas();
  const citasAMostrar = todasLasCitas;
  const selectCitas = (citas) => {
    setSelectedCitas(citas);
    navigate("/detallesCitas");
  };
  if (cargandoCitas) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <div>Cargando calendario</div>
      </div>
    );
  }

  const eventosCalendario = citasAMostrar.map((cita) => ({
    title: `${
      cita.tipo === "evaluacion" ? "🩺 Evaluación" : "⚕️ Procedimiento"
    } - ${cita.usuario?.nombre || "Paciente"}`,
    start: new Date(cita.fecha),
    end: new Date(new Date(cita.fecha).getTime() + 30 * 60000),
    resource: cita,
  }));

  const customEventStyleGetter = (event) => {
    let backgroundColor = "#007bff";

    if (event.resource.tipo === "evaluacion") {
      backgroundColor = "#17a2b8";
    } else if (event.resource.tipo === "procedimiento") {
      backgroundColor = "#28a745";
    }
    return {
      style: {
        backgroundColor,
        borderRadius: "5px",
        color: "white",
        border: "none",
        display: "block",
      },
    };
  };
  return (
    <CitasContext.Provider value={{ selectedCitas, setSelectedCitas }}>
        <div className="card-body">

        <h5>Vista de Calendario</h5>
        <div style={{ height: "600px" }}>
          <Calendar
            localizer={localizer}
            events={eventosCalendario}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            defaultView="week"
            views={["day", "week", "month"]}
            eventPropGetter={customEventStyleGetter}
            onSelectEvent={(event) => {
              selectCitas(event.resource);
            }}
            messages={{
              next: "Siguiente",
              previous: "Anterior",
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              day: "Día",
              agenda: "Agenda",
              date: "Fecha",
              time: "Hora",
              event: "Cita",
              noEventsInRange: "No hay citas en este rango.",
            }}
            formats={calendarFormats}
          />
        </div>
      </div>
    </CitasContext.Provider>
  );
}
export default CalendarioCitas;