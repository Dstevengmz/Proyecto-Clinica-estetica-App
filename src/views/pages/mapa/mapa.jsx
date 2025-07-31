import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const clinicaUbicacion = {
  lat: 2.444814,
  lng: -76.614739,
};

function MapaConRuta() {
  const [direccion, setDireccion] = useState(null);
  const [posCliente, setPosCliente] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [solicitandoUbicacion, setSolicitandoUbicacion] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
    libraries: ["places"],
  });

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
        const origen = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setPosCliente(origen);
        setSolicitandoUbicacion(false);

        if (window.google && window.google.maps) {
          const directionsService = new window.google.maps.DirectionsService();
          directionsService.route(
            {
              origin: origen,
              destination: clinicaUbicacion,
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === "OK") {
                setDireccion(result);
              } else {
                setError("No se pudo calcular la ruta: " + status);
              }
            }
          );
        } else {
          setError("Google Maps no está disponible");
        }
      },
      (error) => {
        setSolicitandoUbicacion(false);
        let errorMessage = "No se pudo obtener tu ubicación. ";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            if (
              window.location.protocol === "http:" &&
              !window.location.hostname.includes("localhost")
            ) {
              errorMessage +=
                "Los navegadores requieren HTTPS para geolocalización. Prueba accediendo desde localhost o configura HTTPS.";
            } else {
              errorMessage +=
                "Permiso denegado. Por favor, permite el acceso a la ubicación en tu navegador.";
            }
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += "Ubicación no disponible.";
            break;
          case error.TIMEOUT:
            errorMessage += "Tiempo de espera agotado.";
            break;
          default:
            errorMessage += "Error desconocido.";
            break;
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

  useEffect(() => {
    if (!isLoaded) return;
    if (loadError) {
      setError("Error cargando Google Maps: " + loadError.message);
      setLoading(false);
      return;
    }

    setLoading(false);

    // Verificar si geolocation está disponible
    if (!navigator.geolocation) {
      setError("La geolocalización no está disponible en este navegador");
      return;
    }
  }, [isLoaded, loadError]);

  // Manejo de errores de carga
  if (loadError) {
    return (
      <div className="text-center my-5">
        <div className="alert alert-danger">
          <h5>Error cargando Google Maps</h5>
          <p>
            <strong>Error:</strong> {loadError.message}
          </p>
          <hr />
          <h6>Posibles soluciones:</h6>
          <ul className="text-start">
            <li>
              Verifica la configuración de tu API key en Google Cloud Console
            </li>
            <li>
              Asegúrate de que las APIs estén habilitadas (Maps JavaScript API,
              Directions API)
            </li>
            <li>Revisa las restricciones de dominio de la API key</li>
          </ul>
        </div>
      </div>
    );
  }

  if (!isLoaded || loading)
    return <p className="text-center my-5">Cargando mapa...</p>;

  if (error) {
    return (
      <div className="text-center my-5">
        <div className="alert alert-warning">
          <h6>Aviso</h6>
          <p>{error}</p>
        </div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={clinicaUbicacion}
          zoom={13}
        >
          <Marker position={clinicaUbicacion} label="Clínica" />
        </GoogleMap>
        <p className="text-muted mt-2">
          Mapa básico mostrando solo la ubicación de la clínica
        </p>
      </div>
    );
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={clinicaUbicacion}
        zoom={13}
      >
        <Marker position={clinicaUbicacion} label="Clínica" />
        {posCliente && <Marker position={posCliente} label="Tú" />}
        {direccion && <DirectionsRenderer directions={direccion} />}
      </GoogleMap>

      <div className="text-center mt-3">
        {!posCliente && !error && (
          <div>
            <button
              className="btn btn-primary"
              onClick={solicitarUbicacion}
              disabled={solicitandoUbicacion}
            >
              {solicitandoUbicacion ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Obteniendo ubicación...
                </>
              ) : (
                <>📍 Obtener mi ubicación y ruta</>
              )}
            </button>
            <p className="text-muted mt-2 small">
              Haz clic para permitir el acceso a tu ubicación y ver la ruta a la
              clínica
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MapaConRuta;
