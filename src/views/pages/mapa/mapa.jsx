import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import { Button, Alert, Spinner } from "react-bootstrap";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultLeafletIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const containerStyle = {
  width: "100%",
  height: "400px",
};


const clinicaUbicacion = [2.444814, -76.614739]; 

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
      async (pos) => {
        try {
          const origen = [pos.coords.latitude, pos.coords.longitude];
          setPosCliente(origen);

          const res = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${origen[1]},${origen[0]};${clinicaUbicacion[1]},${clinicaUbicacion[0]}?overview=full&geometries=geojson`
          );
          const data = await res.json();
          if (data.routes && data.routes.length > 0) {
            const coords = data.routes[0].geometry.coordinates.map((c) => [
              c[1],
              c[0],
            ]);
            setRuta(coords);
          } else {
            setError("No se pudo calcular la ruta");
          }
        } catch {
          setError("Error al obtener la ruta");
        } finally {
          setSolicitandoUbicacion(false);
        }
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
      <MapContainer center={clinicaUbicacion} zoom={14} style={containerStyle}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={clinicaUbicacion} icon={defaultLeafletIcon}>
          <Popup>Clínica</Popup>
        </Marker>

        {posCliente && (
          <Marker position={posCliente} icon={defaultLeafletIcon}>
            <Popup>Tú</Popup>
          </Marker>
        )}

        {ruta && <Polyline positions={ruta} color="blue" />}
      </MapContainer>

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
