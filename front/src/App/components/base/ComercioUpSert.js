import React, { useState } from 'react'
import { Col, Form, Modal } from 'react-bootstrap';
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { useForm } from '../../hooks/useForm';
import Loading from './Loading';
export const ComercioUpSert = ({ dataInicial, abrirModal, setAbrirModal, GetComercios }) => {
    const [values, handleOnChange] = useForm(dataInicial);
    const [loading, setLoading] = useState(false)
    const NuevoRegistro = async () => {
        let response = await callApi('comercio', {
            method: 'POST',
            body: JSON.stringify(values)
        });

        if (response) {
            alert_exitoso("Comercio registrado exitosamente");
            GetComercios();
            setAbrirModal(false);
        }
    }
    const ActualizarRegistro = async () => {
        let response = await callApi('comercio', {
            method: 'PUT',
            body: JSON.stringify(values)
        });

        if (response) {
            alert_exitoso(response);
            GetComercios();
        }
        setAbrirModal(false);
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (dataInicial.comercioId > 0) {
            await ActualizarRegistro();
        } else {
            await NuevoRegistro();
        }
        setLoading(false);
    }
    const handleErrorSubmit = (e, formData, errorInputs) => {
        alert_warning("Por favor complete toda la información solicitada por el formulario");
    };

    const errorMessage = "Campo obligatorio";
    const textTransform = 'capitalize';
    return (
        <Modal show={abrirModal} onHide={() => setAbrirModal(false)} size="lg">
            {
                loading === true ?
                    <Loading />
                    : <>
                        <Modal.Header closeButton>
                            <Modal.Title as="h5">{dataInicial.comercioId > 0 ? 'Actualizar Información del Comercio' : 'Registrar Nuevo Comercio'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ValidationForm onSubmit={handleOnSubmit} onErrorSubmit={handleErrorSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label htmlFor="nombre">Nombre</Form.Label>
                                        <TextInput
                                            name="nombre"
                                            id="nombre"
                                            required
                                            value={values.nombre}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}
                                            placeholder="Nombre"
                                            style={{ textTransform: textTransform }}
                                            autoComplete="off"
                                            minLength="5"
                                            type="text"
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label htmlFor="razon_social">Razon Social</Form.Label>
                                        <TextInput
                                            name="razon_social"
                                            id="razon_social"
                                            required
                                            value={values.razon_social}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}
                                            placeholder="Razon Social"
                                            style={{ textTransform: textTransform }}
                                            autoComplete="off"
                                            type="text"
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label htmlFor="nit">Nit</Form.Label>
                                        <TextInput
                                            name="nit"
                                            id="nit"
                                            required
                                            value={values.nit}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}
                                            placeholder="Nit"
                                            style={{ textTransform: textTransform }}
                                            autoComplete="off"
                                            type="text"
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label htmlFor="telefono">Teléfono</Form.Label>
                                        <TextInput
                                            name="telefono"
                                            id="telefono"
                                            required
                                            value={values.telefono}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}
                                            placeholder="Teléfono"
                                            style={{ textTransform: textTransform }}
                                            autoComplete="off"
                                            type="text"
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label htmlFor="correo">Correo</Form.Label>
                                        <TextInput
                                            name="correo"
                                            id="correo"
                                            required
                                            value={values.correo}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}
                                            placeholder="Correo"
                                            style={{ textTransform: textTransform }}
                                            autoComplete="off"
                                            type="email"
                                        />
                                    </Form.Group>
                                    {
                                        dataInicial.comercioId > 0 &&
                                        <Form.Group as={Col} md="6">
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
                                    </Form.Row>
                                    <Form.Row>
                                    <div className="col-sm-3"></div>
                                    <div className="col-sm-3">
                                        <button type="button" onClick={() => { setAbrirModal(false) }} className="btn btn-warning"> Cancelar</button>
                                    </div>
                                    <div className="col-sm-3">
                                        <button type="submit" className="btn btn-success"> {dataInicial.comercioId > 0 ? 'Actualizar' : 'Registrar'}</button>
                                    </div>
                                </Form.Row>
                            </ValidationForm>
                        </Modal.Body>
                    </>
            }
        </Modal>
    )
}
