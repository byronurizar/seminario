
import config from '../config';
import Cookies from 'js-cookie'
import { alert_error, alert_warning } from './Notificacion';
const BASE_URL = config.urlApi;
const callApi = async (endpoint, options = {}, isFormData = false, manejarRespuesta = 0) => {
    try {
        let token = Cookies.get("auth");
        if (token) {
            token = atob(token);
        }
        if (isFormData === true) {
            options.headers = {
                'Authorization': `Bearer ${token}`
            };
        } else {
            options.headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            };
        }
        if (endpoint === "/auth") {
            delete options.headers.Authorization;
        }
        const url = BASE_URL + endpoint;
        const response = await fetch(url, options);
        if (response.status === 401) {
            alert_error("El token enviado no es válido");
            return false;
        } else {
            const result = await response.json();
            if (manejarRespuesta === 0) {
                if (result) {
                    const { error, status, body } = result;
                    if (error === true) {
                        if (body === "Validation error") {
                            alert_error("Ocurrió un error de validación");
                            return false;
                        } else {
                            alert_error("Ocurrió un error al realizar la petición");
                            return false;
                        }
                    } else {
                        if (body) {
                            const { code, data } = body;
                            if (code === 0) {
                                alert_warning(data);
                                return false;
                            } else if (code === 1) {
                                return data;
                            } else {
                                alert_error(data);
                                return false;
                            }
                        } else {
                            alert_error("El servicio no retorno información");
                            return false;
                        }
                    }
                } else {
                    alert_error("Ocurrió un error al realizar la acción");
                    return false;
                }
            } else {
                return result;
            }
        }
    } catch (mensajeError) {
        // console.log({ mensajeError })
        alert_error("Ocurrió un error en el conector, por favor comuniquese con Soporte");
        return false;
    }
}

export default callApi;