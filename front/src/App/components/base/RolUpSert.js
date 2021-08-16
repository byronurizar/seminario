import React, { useState } from 'react'
import { Col, Form, Modal } from 'react-bootstrap';
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import { useDispatch } from 'react-redux';
import { UpdateUserInfo } from '../../../actions/auth';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { useForm } from '../../hooks/useForm';
import Loading from './Loading';
export const RolUpSert = ({ dataInicial, abrirModal, setAbrirModal, GetCatRol }) => {
    const [loading, setLoading] = useState(false)
    const [values, handleOnChange] = useForm(dataInicial);
    const dispatch = useDispatch();
    const NuevoRegistro = async () => {
        let response = await callApi('rol', {
            method: 'POST',
            body: JSON.stringify(values)
        });

        if (response) {
            alert_exitoso("Rol Registrado exitosamente");
            GetCatRol();
            setAbrirModal(false);
        }
    }
    const ActualizarRegistro = async () => {
        let response = await callApi('rol', {
            method: 'PUT',
            body: JSON.stringify(values)
        });

        if (response) {
            alert_exitoso(response);
            dispatch(UpdateUserInfo());
            GetCatRol();
        }
        setAbrirModal(false);
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (dataInicial.rolId > 0) {
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
                            <Modal.Title as="h5">{dataInicial.rolId > 0 ? 'Actualizar Rol' : 'Nuevo Rol'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ValidationForm onSubmit={handleOnSubmit} onErrorSubmit={handleErrorSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col} md="12">
                                        <Form.Label htmlFor="nombre">Nombre</Form.Label>
                                        <TextInput
                                            name="nombre"
                                            id="nombre"
                                            required
                                            value={values.nombre}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}
                                            placeholder="Nombre"
                                            autoComplete="off"
                                            style={{ textTransform: textTransform }}
                                            type="text"
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="12">
                                        <Form.Label htmlFor="descripcion">Descripción</Form.Label>
                                        <TextInput
                                            name="descripcion"
                                            id="descripcion"
                                            required
                                            value={values.descripcion}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}
                                            placeholder="Descripción"
                                            autoComplete="off"
                                            style={{ textTransform: textTransform }}
                                            type="text"
                                        />
                                    </Form.Group>
                                    {
                                        dataInicial.rolId > 0 &&
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
                                        <button type="submit" className="btn btn-success"> {dataInicial.rolId > 0 ? 'Actualizar' : 'Registrar'}</button>
                                    </div>
                                </Form.Row>
                            </ValidationForm>
                        </Modal.Body>
                    </>
            }
        </Modal>
    )
}
