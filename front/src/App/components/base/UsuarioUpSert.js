import React, { useState } from 'react'
import Select from 'react-select';
import { Col, Form, Modal } from 'react-bootstrap';
import moment from 'moment';
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { useForm } from '../../hooks/useForm';
import Loading from './Loading';
export const UsuarioUpSert = ({ dataInicial, personas, abrirModal, setAbrirModal, GetUsuarios }) => {
    const [values, handleOnChange, , setValues] = useForm(dataInicial);
    const [loading, setLoading] = useState(false)
    const NuevoRegistro = async () => {
        let response = await callApi('usuario', {
            method: 'POST',
            body: JSON.stringify(values)
        });

        if (response) {
            alert_exitoso("Usuario registrado exitosamente");
            GetUsuarios();
            setAbrirModal(false);
        }
    }
    const ActualizarRegistro = async () => {
        let response = await callApi('usuario', {
            method: 'PUT',
            body: JSON.stringify(values)
        });

        if (response) {
            alert_exitoso(response);
            GetUsuarios();
        }
        setAbrirModal(false);
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (dataInicial.usuarioId > 0) {
            await ActualizarRegistro();
        } else {
            await NuevoRegistro();
        }
        setLoading(false);
    }
    const handleChangePersona = ({ value }) => {
        setValues({ ...values, personaId: value });
    }
    const handleUserName = ({ target: { value } }) => {
        let auxUsername = String(value).trim().toUpperCase();
        setValues({ ...values, user_name: auxUsername });
    }
    const hanldeOnChangePassword = ({ target: { name, value } }) => {
        setValues({ ...values, [name]: value });
    }
    const handleDuracionContrasenia = ({ target: { value } }) => {
        let fechaActual = new Date();
        let nuevaFecha = moment(fechaActual, "YYYY/MM/DD").add("days", value);
        if (value > 0) {
            let fecha = moment(nuevaFecha).format('YYYY/MM/DD');
            setValues({ ...values, fecha_cambio_password: fecha, dias_cambio_password: value });
        } else {
            setValues({ ...values, fecha_cambio_password: "", dias_cambio_password: value });
        }
    }
    const handleChangeForzarCambioPass = () => {
        setValues({ ...values, forzar_cambio_password: !values.forzar_cambio_password });
    }
    const handleErrorSubmit = (e, formData, errorInputs) => {
        alert_warning("Por favor complete toda la información solicitada por el formulario");
    };
    const confirmarPassWord = (value) => {
        return value && value === values.password;
    };
    const errorMessage = "Campo obligatorio";
    return (
        <Modal show={abrirModal} onHide={() => setAbrirModal(false)}>
            {
                loading === true ?
                    <Loading />
                    : <>
                        <Modal.Header closeButton>
                            {
                                dataInicial.cambioPass === true &&
                                <Modal.Title as="h5">Cambio de contraseña</Modal.Title>
                            }
                            {
                                !dataInicial.cambioPass &&
                                <Modal.Title as="h5">{dataInicial.usuarioId > 0 ? 'Actualizar Usuario' : 'Nuevo Usuario'}</Modal.Title>
                            }
                        </Modal.Header>
                        <Modal.Body>
                            <ValidationForm onSubmit={handleOnSubmit} onErrorSubmit={handleErrorSubmit}>
                                <Form.Row>
                                    {
                                        !dataInicial.cambioPass &&
                                        <>
                                            <Form.Group as={Col} md="12">
                                                <Form.Label htmlFor="personaId">Persona</Form.Label>
                                                <Select
                                                    id="personaId"
                                                    name="personaId"
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                    defaultValue={personas.find(i => i.value === values.personaId)}
                                                    required
                                                    placeholder="Persona"
                                                    onChange={handleChangePersona}
                                                    options={personas}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="12">
                                                <Form.Label htmlFor="user_name">Nombre de Usuario</Form.Label>
                                                <TextInput
                                                    name="user_name"
                                                    id="user_name"
                                                    required
                                                    value={values.user_name}
                                                    onChange={handleUserName}
                                                    errorMessage={errorMessage}
                                                    placeholder="Nombre de Usuario"
                                                    autoComplete="off"
                                                    type="text"
                                                />
                                            </Form.Group>
                                        </>
                                    }

                                    {
                                        (!dataInicial.usuarioId || dataInicial.cambioPass === true) &&
                                        <>
                                            <Form.Group as={Col} md="12">
                                                <Form.Label htmlFor="password">{
                                                    dataInicial.cambioPass === true ? 'Nueva Contraseña' : 'Contraseña'
                                                }</Form.Label>
                                                <TextInput
                                                    name="password"
                                                    id="password"
                                                    type="password"
                                                    placeholder="Contraseña"
                                                    required
                                                    pattern="(?=.*[A-Z]).{6,}"
                                                    errorMessage={{ required: errorMessage, pattern: "La contraseña debe de tener al menos 6 caracteres y contener al menos una letra mayúscula" }}
                                                    value={values.password_nuevo}
                                                    onChange={hanldeOnChangePassword}
                                                    autoComplete="off"
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col} md="12">
                                                <Form.Label htmlFor="user_name">Confirmar Contraseña</Form.Label>
                                                <TextInput
                                                    name="password_confirmar"
                                                    id="password_confirmar"
                                                    type="password"
                                                    placeholder="Confirmar Nueva Contraseña"
                                                    required
                                                    validator={confirmarPassWord}
                                                    errorMessage={{ required: "Por favor confirme la nueva contraseña", validator: "La contraseña no coincide" }}
                                                    value={values.password_confirmar}
                                                    onChange={hanldeOnChangePassword}
                                                    autoComplete="off"
                                                />
                                            </Form.Group>
                                        </>
                                    }

                                    {
                                        !dataInicial.cambioPass &&
                                        <>
                                            <Form.Group as={Col} md="12">
                                                <Form.Label htmlFor="cambioContrasenia">Cambio de Contraseña</Form.Label>
                                                <SelectGroup
                                                    name="cambioContrasenia"
                                                    id="cambioContrasenia"
                                                    value={values.dias_cambio_password}
                                                    errorMessage={errorMessage}
                                                    onChange={handleDuracionContrasenia}>
                                                    <option value="">Seleccione</option>
                                                    <option value="30">30 días</option>
                                                    <option value="60">60 días</option>
                                                    <option value="90">90 días</option>
                                                    <option value="120">120 días</option>
                                                    <option value="0">Nunca</option>
                                                </SelectGroup>
                                            </Form.Group>
                                            <Form.Group as={Col} md="12">
                                                <div className="switch switch-alternative d-inline m-r-10">
                                                    <Form.Control type="checkbox" id="forzar_cambio_password" checked={values.forzar_cambio_password} onChange={handleChangeForzarCambioPass} />
                                                    <Form.Label htmlFor="forzar_cambio_password" className="cr" />
                                                </div>
                                                <Form.Label>Forzar Cambio de contraseña</Form.Label>
                                            </Form.Group>
                                            {
                                                dataInicial.usuarioId > 0 &&
                                                <Form.Group as={Col} md="12">
                                                    <Form.Label htmlFor="estadoId">Estado</Form.Label>
                                                    <SelectGroup
                                                        name="estadoId"
                                                        id="estadoId"
                                                        value={values.estadoId}
                                                        required
                                                        errorMessage={errorMessage}
                                                        onChange={handleOnChange}>
                                                        <option value="">Seleccione un estado</option>
                                                        <option value="1">Activo</option>
                                                        <option value="2">Inactivo</option>
                                                    </SelectGroup>
                                                </Form.Group>
                                            }
                                        </>
                                    }
                                    <div className="col-sm-3"></div>
                                    <div className="col-sm-3">
                                        <button type="button" onClick={() => { setAbrirModal(false) }} className="btn btn-warning"> Cancelar</button>
                                    </div>
                                    <div className="col-sm-3">
                                        <button type="submit" className="btn btn-success"> {dataInicial.usuarioId > 0 ? 'Actualizar' : 'Registrar'}</button>
                                    </div>
                                </Form.Row>
                            </ValidationForm>
                        </Modal.Body>
                    </>
            }
        </Modal>
    )
}
