import React, { useState } from 'react'
import { Col, Form, Modal } from 'react-bootstrap';
import { ValidationForm, SelectGroup } from 'react-bootstrap4-form-validation';
import callApi from '../../../helpers/conectorApi';
import { useForm } from '../../hooks/useForm';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import Loading from './Loading';
export const DatoExtraUpSert = ({ dataInicial, personaId, abrirModal, setAbrirModal, catTipoSangre, catEstadoCivil, GetDatoExtra }) => {
    const [datoExtra, handleOnChange] = useForm(dataInicial);
    const [loading, setLoading] = useState(false)
    const NuevoRegistro = async () => {
        let response = await callApi('persona/datoextra', {
            method: 'POST',
            body: JSON.stringify(datoExtra)
        });

        if (response) {
            alert_exitoso("Información adicional registrada exitosamente");
            GetDatoExtra(personaId);
            setAbrirModal(false);
        }
    }
    const ActualizarRegistro = async () => {
        let response = await callApi('persona/datoextra', {
            method: 'PUT',
            body: JSON.stringify(datoExtra)
        });

        if (response) {
            alert_exitoso(response);
            GetDatoExtra(personaId);
        }
        setAbrirModal(false);
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (dataInicial.dato_extra_personaId > 0) {
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
                            <Modal.Title as="h5">{dataInicial.dato_extra_personaId > 0 ? 'Actualizar información adicional' : 'Registrar información adicional'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ValidationForm onSubmit={handleOnSubmit} onErrorSubmit={handleErrorSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col} md="12">
                                        <Form.Label htmlFor="tipo_sangreId">Tipo sangre</Form.Label>
                                        <SelectGroup
                                            name="tipo_sangreId"
                                            id="tipo_sangreId"
                                            value={datoExtra.tipo_sangreId}
                                            onChange={handleOnChange}
                                            required
                                            errorMessage={errorMessage}>
                                            <option value="">Seleccione un tipo de sangre</option>
                                            {
                                                catTipoSangre.map(({ tipo_sangreId, descripcion }) => (
                                                    <option value={tipo_sangreId} key={tipo_sangreId}>{descripcion}</option>
                                                )
                                                )
                                            }
                                        </SelectGroup>
                                    </Form.Group>

                                    <Form.Group as={Col} md="12">
                                        <Form.Label htmlFor="estado_civilId">Estado civil</Form.Label>
                                        <SelectGroup
                                            name="estado_civilId"
                                            id="estado_civilId"
                                            value={datoExtra.estado_civilId}
                                            onChange={handleOnChange}
                                            required
                                            errorMessage={errorMessage}>
                                            <option value="">Seleccione un estado civil</option>
                                            {
                                                catEstadoCivil.map(({ estado_civilId, descripcion }) => (
                                                    <option value={estado_civilId} key={estado_civilId}>{descripcion}</option>
                                                )
                                                )
                                            }
                                        </SelectGroup>
                                    </Form.Group>

                                    {
                                        dataInicial.dato_extra_personaId > 0 &&
                                        <Form.Group as={Col} md="12">
                                            <Form.Label htmlFor="estadoId">Estado</Form.Label>
                                            <SelectGroup
                                                name="estadoId"
                                                id="estadoId"
                                                value={datoExtra.estadoId}
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
                                        <button type="submit" className="btn btn-success"> {dataInicial.dato_extra_personaId > 0 ? 'Actualizar' : 'Registrar'}</button>
                                    </div>
                                </Form.Row>
                            </ValidationForm>
                        </Modal.Body>
                    </>
            }
        </Modal>
    )
}
