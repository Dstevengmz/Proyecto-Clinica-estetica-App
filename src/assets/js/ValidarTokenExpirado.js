class ValidacionEfectivas {
  static obtenerToken() {
    return localStorage.getItem("token");
  }

  static tokenEsValido(token) {
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const exp = payload.exp * 1000;
      return Date.now() < exp;
    } catch {
      return false;
    }
  }
}

export default ValidacionEfectivas;
