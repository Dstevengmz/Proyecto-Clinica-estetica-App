import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import { Button, Alert, Spinner } from "react-bootstrap";
import "leaflet/dist/leaflet.css";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const clinicaUbicacion = [2.444814, -76.614739]; // Clínica

function MapaConRuta() {
  const [posCliente, setPosCliente] = useState(null);
  const [ruta, setRuta] = useState(null);
  const [error, setError] = useState(null);
  const [solicitandoUbicacion, setSolicitandoUbicacion] = useState(false);

  const solicitarUbicacion = () => {
    setSolicitandoUbicacion(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("La geolocalización no está disponible en este navegador");
      setSolicitandoUbicacion(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const origen = [pos.coords.latitude, pos.coords.longitude];
        setPosCliente(origen);
        setSolicitandoUbicacion(false);

        // Llamada al servicio de rutas OSRM (gratis)
        fetch(
          `https://router.project-osrm.org/route/v1/driving/${origen[1]},${origen[0]};${clinicaUbicacion[1]},${clinicaUbicacion[0]}?overview=full&geometries=geojson`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.routes && data.routes.length > 0) {
              const coords = data.routes[0].geometry.coordinates.map((c) => [
                c[1],
                c[0],
              ]);
              setRuta(coords);
            } else {
              setError("No se pudo calcular la ruta");
            }
          })
          .catch(() => setError("Error al obtener la ruta"));
      },
      (err) => {
        setSolicitandoUbicacion(false);
        let errorMessage = "No se pudo obtener tu ubicación. ";
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage += "Permiso denegado. Activa la ubicación en tu navegador.";
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage += "Ubicación no disponible.";
            break;
          case err.TIMEOUT:
            errorMessage += "Tiempo de espera agotado.";
            break;
          default:
            errorMessage += "Error desconocido.";
        }
        setError(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  return (
    <div>
      {/* Mapa */}
      <MapContainer center={clinicaUbicacion} zoom={14} style={containerStyle}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marcador clínica */}
        <Marker position={clinicaUbicacion}>
          <Popup>Clínica</Popup>
        </Marker>

        {/* Marcador cliente */}
        {posCliente && (
          <Marker position={posCliente}>
            <Popup>Tú</Popup>
          </Marker>
        )}

        {/* Ruta en azul */}
        {ruta && <Polyline positions={ruta} color="blue" />}
      </MapContainer>

      {/* Botón y mensajes */}
      <div className="text-center mt-3">
        {!posCliente && !error && (
          <div>
            <Button
              variant="primary"
              onClick={solicitarUbicacion}
              disabled={solicitandoUbicacion}
            >
              {solicitandoUbicacion ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Obteniendo ubicación...
                </>
              ) : (
                <>📍 Obtener mi ubicación y ruta</>
              )}
            </Button>
            <p className="text-muted mt-2 small">
              Haz clic para permitir el acceso a tu ubicación y ver la ruta a la clínica
            </p>
          </div>
        )}

        {/* Errores con Alert */}
        {error && (
          <Alert variant="warning" className="mt-3">
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default MapaConRuta;
