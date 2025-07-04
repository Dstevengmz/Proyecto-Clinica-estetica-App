import Swal from "sweetalert2";
import CerrarSesion from "../../views/pages/logout/CerrarSesion";
const manejarCerrarSesion = (navigate, logout, location) => {
  Swal.fire({
    title: "¿Estás seguro de cerrar sesión?",
    text: "¡No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, cerrar sesión",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Sesión cerrada correctamente",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        CerrarSesion(navigate, logout, location);
      });
    }
  });
};

export default manejarCerrarSesion;
