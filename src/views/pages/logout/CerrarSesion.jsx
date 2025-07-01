
function CerrarSesion(navigate,logout,location) {
  logout();
   let  x = location.pathname;
     const destino = x.includes('/dashboard') ? '/iniciarsesion' : '/inicio'
  navigate(destino);
}
export default CerrarSesion;