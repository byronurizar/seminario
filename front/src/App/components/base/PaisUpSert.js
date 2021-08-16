import React, { useState } from 'react'
import { Col, Form, Modal } from 'react-bootstrap';
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { useForm } from '../../hooks/useForm';
import Loading from './Loading';
export const PaisUpSert = ({ dataInicial, abrirModal, setAbrirModal, GetPaises }) => {
    const [values, handleOnChange] = useForm(dataInicial);
    const [loading, setLoading] = useState(false)
    const NuevoRegistro = async () => {
        let response = await callApi('pais', {
            method: 'POST',
            body: JSON.stringify(values)
        });

        if (response) {
            alert_exitoso("El pais fue registrado exitosamente");
            GetPaises();
            setAbrirModal(false);
        }
    }
    const ActualizarRegistro = async () => {
        let response = await callApi('pais', {
            method: 'PUT',
            body: JSON.stringify(values)
        });

        if (response) {
            alert_exitoso(response);
            GetPaises();
        }
        setAbrirModal(false);
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (dataInicial.paisId > 0) {
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
        <Modal show={abrirModal} onHide={() => setAbrirModal(false)}>
            {
                loading === true ?
                    <Loading />
                    : <>
                        <Modal.Header closeButton>
                            <Modal.Title as="h5">{dataInicial.paisId > 0 ? 'Actualizar Información del Pais' : 'Registrar Nuevo Pais'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ValidationForm onSubmit={handleOnSubmit} onErrorSubmit={handleErrorSubmit}>
                                <Form.Row>
                                    {
                                        dataInicial.paisId <= 0 &&
                                        <Form.Group as={Col} md="12">
                                            <Form.Label htmlFor="paisId">Código</Form.Label>
                                            <TextInput
                                                name="paisId"
                                                id="paisId"
                                                required
                                                value={values.paisId}
                                                onChange={handleOnChange}
                                                errorMessage={errorMessage}
                                                placeholder="Código"
                                                autoComplete="off"
                                                type="numer"
                                            />
                                        </Form.Group>
                                    }
                                    <Form.Group as={Col} md="12">
                                        <Form.Label htmlFor="descripcion">Nombre</Form.Label>
                                        <TextInput
                                            name="descripcion"
                                            id="descripcion"
                                            required
                                            value={values.descripcion}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}
                                            placeholder="Nombre"
                                            style={{ textTransform: textTransform }}
                                            autoComplete="off"
                                            minLength="5"
                                            type="text"
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="12">
                                        <Form.Label htmlFor="nacionalidad">Nacionalidad</Form.Label>
                                        <TextInput
                                            name="nacionalidad"
                                            id="nacionalidad"
                                            required
                                            value={values.nacionalidad}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}
                                            placeholder="Nacionalidad"
                                            style={{ textTransform: textTransform }}
                                            autoComplete="off"
                                            minLength="5"
                                            type="text"
                                        />
                                    </Form.Group>
                                    {
                                        dataInicial.paisId > 0 &&
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
                                    <div className="col-sm-3"></div>
                                    <div className="col-sm-3">
                                        <button type="button" onClick={() => { setAbrirModal(false) }} className="btn btn-warning"> Cancelar</button>
                                    </div>
                                    <div className="col-sm-3">
                                        <button type="submit" className="btn btn-success"> {dataInicial.paisId > 0 ? 'Actualizar' : 'Registrar'}</button>
                                    </div>
                                </Form.Row>
                            </ValidationForm>
                        </Modal.Body>
                    </>
            }
        </Modal>
    )
}
