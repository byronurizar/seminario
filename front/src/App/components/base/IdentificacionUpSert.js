import React, { useState } from 'react'
import { Col, Form, Modal } from 'react-bootstrap';
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { useForm } from '../../hooks/useForm';
import Loading from './Loading';
export const IdentificacionUpSert = ({ dataInicial, personaId, abrirModal, setAbrirModal, catTipoDocumento, GetIdentificaciones }) => {
    const [documento, handleOnChange] = useForm(dataInicial);
    const [loading, setLoading] = useState(false)
    const NuevoRegistro = async () => {
        let response = await callApi('persona/identificacion', {
            method: 'POST',
            body: JSON.stringify(documento)
        });

        if (response) {
            alert_exitoso("Documento de identificación registrado exitosamente");
            GetIdentificaciones(personaId);
            setAbrirModal(false);
        }
    }
    const ActualizarRegistro = async () => {
        let response = await callApi('persona/identificacion', {
            method: 'PUT',
            body: JSON.stringify(documento)
        });

        if (response) {
            alert_exitoso(response);
            GetIdentificaciones(personaId);
        }
        setAbrirModal(false);
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (dataInicial.identificacion_personaId > 0) {
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
    return (
        <Modal show={abrirModal} onHide={() => setAbrirModal(false)}>
            {
                loading === true ?
                    <Loading />
                    : <>
                        <Modal.Header closeButton>
                            <Modal.Title as="h5">{dataInicial.identificacion_personaId > 0 ? 'Actualizar documento' : 'Nuevo Documento'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ValidationForm onSubmit={handleOnSubmit} onErrorSubmit={handleErrorSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col} md="12">
                                        <Form.Label htmlFor="tipo_documentoId">Tipo Identificación</Form.Label>
                                        <SelectGroup
                                            name="tipo_documentoId"
                                            id="tipo_documentoId"
                                            required
                                            value={documento.tipo_documentoId}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}>
                                            <option value="">Seleccione un tipo de identificación</option>
                                            {
                                                catTipoDocumento.map(({ tipo_documentoId, descripcion }) => (
                                                    <option value={tipo_documentoId} key={tipo_documentoId}>{descripcion}</option>
                                                )
                                                )
                                            }
                                        </SelectGroup>
                                    </Form.Group>

                                    <Form.Group as={Col} md="12">
                                        <Form.Label htmlFor="numero_identificacion">Número de Identificación</Form.Label>
                                        <TextInput
                                            name="numero_identificacion"
                                            id="numero_identificacion"
                                            required
                                            value={documento.numero_identificacion}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}
                                            minLength={documento.tipo_documentoId === "1" ? "13" : "0"}
                                            placeholder="Número de identificación"
                                            autoComplete="off"
                                            type="number"
                                        />
                                    </Form.Group>
                                    {
                                        dataInicial.identificacion_personaId > 0 &&
                                        <Form.Group as={Col} md="12">
                                            <Form.Label htmlFor="estadoId">Estado</Form.Label>
                                            <SelectGroup
                                                name="estadoId"
                                                id="estadoId"
                                                value={documento.estadoId}
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
                                        <button type="submit" className="btn btn-success"> {dataInicial.identificacion_personaId > 0 ? 'Actualizar' : 'Registrar'}</button>
                                    </div>
                                </Form.Row>
                            </ValidationForm>
                        </Modal.Body>
                    </>
            }
        </Modal>
    )
}
