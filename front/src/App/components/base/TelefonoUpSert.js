import React, { useState } from 'react'
import { Col, Form, Modal } from 'react-bootstrap';
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { useForm } from '../../hooks/useForm';
import Loading from './Loading';
export const TelefonoUpSert = ({ dataInicial, personaId, abrirModal, setAbrirModal, catTipoTelefono, GetTelefonos }) => {
    const [telefono, handleOnChange] = useForm(dataInicial);
    const [loading, setLoading] = useState(false)
    const NuevoRegistro = async () => {
        let response = await callApi('persona/telefono', {
            method: 'POST',
            body: JSON.stringify(telefono)
        });

        if (response) {
            alert_exitoso("Número de teléfono registrado exitosamente");
            GetTelefonos(personaId);
            setAbrirModal(false);
        }
    }
    const ActualizarRegistro = async () => {
        let response = await callApi('persona/telefono', {
            method: 'PUT',
            body: JSON.stringify(telefono)
        });

        if (response) {
            alert_exitoso(response);
            GetTelefonos(personaId);
        }
        setAbrirModal(false);
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (dataInicial.telefono_personaId > 0) {
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
                            <Modal.Title as="h5">{dataInicial.telefono_personaId > 0 ? 'Actualizar teléfono' : 'Nuevo teléfono'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ValidationForm onSubmit={handleOnSubmit} onErrorSubmit={handleErrorSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col} md="12">
                                        <Form.Label htmlFor="tipo_telefonoId">Tipo Identificación</Form.Label>
                                        <SelectGroup
                                            name="tipo_telefonoId"
                                            id="tipo_telefonoId"
                                            required
                                            value={telefono.tipo_telefonoId}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}>
                                            <option value="">Seleccione un tipo de teléfono</option>
                                            {
                                                catTipoTelefono.map(({ tipo_telefonoId, descripcion }) => (
                                                    <option value={tipo_telefonoId} key={tipo_telefonoId}>{descripcion}</option>
                                                )
                                                )
                                            }
                                        </SelectGroup>
                                    </Form.Group>

                                    <Form.Group as={Col} md="12">
                                        <Form.Label htmlFor="telefono">Número de teléfono</Form.Label>
                                        <TextInput
                                            name="telefono"
                                            id="telefono"
                                            required
                                            value={telefono.telefono}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}
                                            placeholder="Número de teléfono"
                                            autoComplete="off"
                                            minLength="8"
                                            type="number"
                                        />
                                    </Form.Group>
                                    {
                                        dataInicial.telefono_personaId > 0 &&
                                        <Form.Group as={Col} md="12">
                                            <Form.Label htmlFor="estadoId">Estado</Form.Label>
                                            <SelectGroup
                                                name="estadoId"
                                                id="estadoId"
                                                value={telefono.estadoId}
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
                                        <button type="submit" className="btn btn-success"> {dataInicial.telefono_personaId > 0 ? 'Actualizar' : 'Registrar'}</button>
                                    </div>
                                </Form.Row>
                            </ValidationForm>
                        </Modal.Body>
                    </>
            }
        </Modal>
    )
}
