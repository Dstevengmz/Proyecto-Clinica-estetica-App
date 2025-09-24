import Swal from "sweetalert2";

/**
 * Centraliza todas las alertas relacionadas con el flujo de usuarios:
 * - Registro / Pre-registro
 * - Verificación de correo por código
 * - Errores y validaciones comunes
 *
 * Cada método retorna la promesa de SweetAlert (para poder await y encadenar).
 */
class AlertaUsuario {
	// ============ GENÉRICAS ============
	alertaError(mensaje = "Ha ocurrido un error inesperado") {
		return Swal.fire({
			icon: "error",
			title: "Error",
			text: mensaje,
			confirmButtonText: "Entendido",
		});
	}

	alertaExito(mensaje = "Operación realizada correctamente") {
		return Swal.fire({
			icon: "success",
			title: "Éxito",
			text: mensaje,
			confirmButtonText: "Continuar",
		});
	}

	alertaInfo(mensaje, titulo = "Información") {
		return Swal.fire({
			icon: "info",
			title: titulo,
			html: mensaje,
			confirmButtonText: "Cerrar",
		});
	}

	alertaWarning(mensaje, titulo = "Aviso") {
		return Swal.fire({
			icon: "warning",
			title: titulo,
			text: mensaje,
			confirmButtonText: "Aceptar",
		});
	}

	// ============ VALIDACIONES DE REGISTRO ============
	alertaTerminosNoAceptados() {
		return this.alertaWarning(
			"Debes aceptar los términos y condiciones para continuar.",
			"Términos requeridos"
		);
	}

	alertaContrasenasNoCoinciden() {
		return this.alertaError("Las contraseñas no coinciden");
	}

	alertaCorreoYaRegistrado(correo) {
		return this.alertaWarning(
			`El correo <strong>${correo}</strong> ya se encuentra registrado. Intenta iniciar sesión o recupera tu contraseña.`,
			"Correo en uso"
		);
	}

	alertaPreRegistroExitoso(correo) {
		return Swal.fire({
			icon: "success",
			title: "Código enviado",
			html: `Hemos enviado un código de verificación a <strong>${correo}</strong>. Revisa tu bandeja de entrada y spam.`,
			confirmButtonText: "Ingresar código",
		});
	}

	alertaCuentaVerificada() {
		return Swal.fire({
			icon: "success",
			title: "Cuenta verificada",
			text: "Tu cuenta ha sido creada y verificada exitosamente.",
			confirmButtonText: "Continuar",
		});
	}

	alertaBloqueoIntentos(minutes = 5) {
		return this.alertaError(
			`Has superado el número de intentos. Intenta nuevamente en ${minutes} minutos.`
		);
	}

	// ============ VERIFICACIÓN DE CÓDIGO ============
	/**
	 * Muestra un modal para ingresar código de verificación.
	 * @param {Object} opts
	 * @param {String} opts.correo - correo del usuario
	 * @param {Function} opts.onConfirm - función async que recibe (codigo) y debe retornar { success, error?, blocked?, token?, usuario? }
	 * @param {Function} [opts.onResend] - función async para reenviar el código
	 * @param {Number} [opts.maxReintentos=3] - número de intentos antes de mostrar mensaje de advertencia adicional
	 */
	solicitarCodigoVerificacion({
		correo,
		onConfirm,
		onResend,
		maxReintentos = 3,
	}) {
		let intentos = 0;

		return Swal.fire({
			title: "Verifica tu correo",
			html: `<p>Ingresa el código enviado a <strong>${correo}</strong>.</p>` +
				`<p style="font-size:0.8rem;color:#888;margin-top:4px;">Si no lo ves, revisa también tu carpeta de spam.</p>`,
			input: "text",
			inputLabel: "Código de verificación",
			inputPlaceholder: "Ej: 123456",
			showCancelButton: true,
			confirmButtonText: "Confirmar",
			cancelButtonText: "Cancelar",
			allowOutsideClick: false,
			showLoaderOnConfirm: true,
			footer: onResend
				? '<button id="btnReenviarCodigo" class="swal2-styled" style="background:#6c757d;margin-top:8px;">Reenviar código</button>'
				: undefined,
			preConfirm: async (value) => {
				const codigo = (value || "").trim();
				if (!codigo) {
					Swal.showValidationMessage("Ingresa el código");
					return false;
				}
				try {
					const resp = await onConfirm(codigo);
					if (!resp?.success) {
						intentos += 1;
						if (resp?.blocked) {
							Swal.showValidationMessage(
								resp.message ||
									"Has sido bloqueado temporalmente por múltiples intentos fallidos."
							);
							return false;
						}
						const extra =
							intentos >= maxReintentos
								? "<br/><small>Verifica que el código sea el último enviado.</small>"
								: "";
						Swal.showValidationMessage(
							(resp?.message || resp?.error || "Código incorrecto") + extra
						);
						return false;
					}
					return resp; // éxito -> se pasa al then
			} catch {
					Swal.showValidationMessage(
						"Error al verificar el código. Intenta nuevamente."
					);
					return false;
				}
			},
			didOpen: () => {
				if (onResend) {
					const btn = document.getElementById("btnReenviarCodigo");
						if (btn) {
							btn.addEventListener("click", async (ev) => {
								ev.preventDefault();
								btn.disabled = true;
								const original = btn.textContent;
								btn.textContent = "Enviando...";
								try {
									await onResend();
									Swal.showValidationMessage(
										"Nuevo código enviado. Revisa tu correo." +
											(intentos ? ` (Intentos fallidos: ${intentos})` : "")
									);
								} catch {
									Swal.showValidationMessage(
										"No se pudo reenviar el código. Intenta nuevamente."
									);
								} finally {
									setTimeout(() => {
										btn.disabled = false;
										btn.textContent = original;
									}, 4000);
								}
							});
						}
				}
			},
		});
	}

	// ============ CONFIRMACIONES / ACCIONES ============
	confirmarAccion({
		titulo = "¿Estás seguro?",
		texto = "Esta acción no se puede deshacer.",
		icon = "warning",
		confirmButtonText = "Sí",
		cancelButtonText = "Cancelar",
	} = {}) {
		return Swal.fire({
			title: titulo,
			text: texto,
			icon,
			showCancelButton: true,
			confirmButtonText,
			cancelButtonText,
		});
	}
}
export default AlertaUsuario;