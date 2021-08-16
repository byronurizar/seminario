import React, { useState, useEffect } from 'react'
import { Col, Form, Modal } from 'react-bootstrap';
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { useForm } from '../../hooks/useForm';
import Loading from './Loading';
export const MunicipioUpSert = ({ dataInicial, abrirModal, setAbrirModal, catPaises, GetMunicipios }) => {
    const [values, handleOnChange] = useForm(dataInicial);
    const [loading, setLoading] = useState(false)
    const [departamentos, setDepartamentos] = useState([]);
    const [infoPais, handleChangeAuxPais] = useState(dataInicial.paisId);

    const handleChangePais = ({ target: { value } }) => {
        GetDepartamentos(value);
        handleChangeAuxPais(value);
    }
    const GetDepartamentos = async (id) => {
        setLoading(true);
        let response = await callApi(`departamento?paisId=${id}&estadoId=1&include=0`);
        setDepartamentos(response);
        setLoading(false);
    }
    const NuevoRegistro = async () => {
        let response = await callApi('municipio', {
            method: 'POST',
            body: JSON.stringify(values)
        });

        if (response) {
            alert_exitoso("Municipio registrado exitosamente");
            GetMunicipios(values.departamentoId);
            setAbrirModal(false);
        }
    }
    const ActualizarRegistro = async () => {
        let response = await callApi('municipio', {
            method: 'PUT',
            body: JSON.stringify(values)
        });

        if (response) {
            alert_exitoso(response);
            GetMunicipios(values.departamentoId);
        }
        setAbrirModal(false);
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (dataInicial.municipioId > 0) {
            await ActualizarRegistro();
        } else {
            await NuevoRegistro();
        }
        setLoading(false);
    }
    const handleErrorSubmit = (e, formData, errorInputs) => {
        alert_warning("Por favor complete toda la información solicitada por el formulario");
    };

    useEffect(() => {
        GetDepartamentos(dataInicial.paisId);
    }, []);

    const errorMessage = "Campo obligatorio";
    const textTransform = 'capitalize';
    return (
        <Modal show={abrirModal} onHide={() => setAbrirModal(false)}>
            {
                loading === true ?
                    <Loading />
                    : <>
                        <Modal.Header closeButton>
                            <Modal.Title as="h5">{dataInicial.municipioId > 0 ? 'Actualizar Municipio' : 'Nuevo Municipio'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ValidationForm onSubmit={handleOnSubmit} onErrorSubmit={handleErrorSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col} md="12">
                                        <Form.Label htmlFor="paisId">Pais</Form.Label>
                                        <SelectGroup
                                            name="paisId"
                                            id="paisId"
                                            required
                                            onChange={handleChangePais}
                                            value={infoPais}
                                            errorMessage={errorMessage}>
                                            <option value="">Seleccione un Pais</option>
                                            {
                                                catPaises.map(({ paisId, descripcion }) => (
                                                    <option value={paisId} key={paisId}>{descripcion}</option>
                                                )
                                                )
                                            }
                                        </SelectGroup>
                                    </Form.Group>

                                    <Form.Group as={Col} md="12">
                                        <Form.Label htmlFor="departamentoId">Departamento</Form.Label>
                                        <SelectGroup
                                            name="departamentoId"
                                            id="departamentoId"
                                            required
                                            value={values.departamentoId}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}>
                                            <option value="">Seleccione un Departamento</option>
                                            {
                                                departamentos.map(({ departamentoId, descripcion }) => (
                                                    <option value={departamentoId} key={departamentoId}>{descripcion}</option>
                                                )
                                                )
                                            }
                                        </SelectGroup>
                                    </Form.Group>
                                    <Form.Group as={Col} md="12">
                                        <Form.Label htmlFor="municipioId_depto">Código de Municipio</Form.Label>
                                        <TextInput
                                            name="municipioId_depto"
                                            id="municipioId_depto"
                                            required
                                            value={values.municipioId_depto}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}
                                            placeholder="Código de municipio según departamento"
                                            autoComplete="off"
                                            type="number"
                                        />
                                    </Form.Group>
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
                                            autoComplete="off"
                                            style={{ textTransform: textTransform }}
                                            type="text"
                                        />
                                    </Form.Group>
                                    {
                                        dataInicial.municipioId > 0 &&
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
                                        <button type="submit" className="btn btn-success"> {dataInicial.municipioId > 0 ? 'Actualizar' : 'Registrar'}</button>
                                    </div>
                                </Form.Row>
                            </ValidationForm>
                        </Modal.Body>
                    </>
            }
        </Modal>
    )
}
