import React, { useState } from 'react'
import { useEffect } from 'react';
import { Col, Form, Modal } from 'react-bootstrap';
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { useForm } from '../../hooks/useForm';
import Loading from './Loading';
const menuIdDepartamento = 9;
const menuIdMunicipio = 10;
export const SedeDiacoUpSert = ({ accesos, dataInicial, abrirModal, setAbrirModal, catRegiones, GetSedes }) => {
    const [values, handleOnChange] = useForm(dataInicial);
    const [loading, setLoading] = useState(false);
    const [departamentos, setDepartamentos] = useState([]);
    const [listMunicipio, setListMunicipio] = useState([]);
    const NuevoRegistro = async () => {
        let response = await callApi('sedediaco', {
            method: 'POST',
            body: JSON.stringify(values)
        });

        if (response) {
            alert_exitoso("Sede registrada exitosamente");
            GetSedes();
            setAbrirModal(false);
        }
    }
    const GetDepartamentos = async (regionId) => {
        if (accesos.find(acceso => acceso.menuId === menuIdDepartamento && acceso.accesoId === 3)) {
            let response = await callApi(`departamento?include=0&regionId=${regionId}`);
            if (response) {
                setDepartamentos(response);
            } else {
                setDepartamentos([{ departamentoId: '', descripcion: 'NO ESTA AUTORIZADO' }]);
            }
        }
    }
    const GetMunicipios = async (departamentoId) => {
        if (accesos.find(acceso => acceso.menuId === menuIdMunicipio && acceso.accesoId === 3)) {
            let response = await callApi(`municipio?include=0&departamentoId=${departamentoId}`);
            if (response) {
                setListMunicipio(response);
            }
        }
    }

    const ActualizarRegistro = async () => {
        let response = await callApi('sedediaco', {
            method: 'PUT',
            body: JSON.stringify(values)
        });

        if (response) {
            alert_exitoso(response);
            GetSedes();
        }
        setAbrirModal(false);
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (dataInicial.sede_diacoId > 0) {
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
        if (values?.regionId > 0) {
            GetDepartamentos(values.regionId);
        }
    }, [values.regionId]);

    useEffect(() => {
        if (values?.regionId > 0) {
            GetDepartamentos(values.regionId);
            setListMunicipio([]);
        }
    }, [values.regionId]);

    useEffect(() => {
        if (values?.departamentoId > 0) {
            GetMunicipios(values.departamentoId);
        }
    }, [values.departamentoId]);


    const errorMessage = "Campo obligatorio";
    const textTransform = 'capitalize';
    return (
        <Modal show={abrirModal} onHide={() => setAbrirModal(false)} size="xl">
            {
                loading === true ?
                    <Loading />
                    : <>
                        <Modal.Header closeButton>
                            <Modal.Title as="h5">{dataInicial.sede_diacoId > 0 ? 'Actualizar Sede' : 'Nueva Sede'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ValidationForm onSubmit={handleOnSubmit} onErrorSubmit={handleErrorSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label htmlFor="codigo">Código Interno</Form.Label>
                                        <TextInput
                                            name="codigo"
                                            id="codigo"
                                            required
                                            value={values.codigo}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}
                                            style={{ textTransform: textTransform }}
                                            placeholder="Código Interno"
                                            autoComplete="off"
                                            type="text"
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label htmlFor="nombre">Nombre</Form.Label>
                                        <TextInput
                                            name="nombre"
                                            id="nombre"
                                            required
                                            value={values.nombre}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}
                                            style={{ textTransform: textTransform }}
                                            placeholder="Nombre"
                                            autoComplete="off"
                                            type="text"
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="12">
                                        <Form.Label htmlFor="descripcion">Descripción</Form.Label>
                                        <TextInput
                                            name="descripcion"
                                            id="descripcion"
                                            required
                                            multiline
                                            value={values.descripcion ?? ''}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}
                                            placeholder="Descripción"
                                            autoComplete="off"
                                            rows="3"
                                            minLength="5"
                                            style={{ textTransform: textTransform }}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} md="6">
                                        <Form.Label htmlFor="regionId">Region</Form.Label>
                                        <SelectGroup
                                            name="regionId"
                                            id="regionId"
                                            required
                                            value={values.regionId}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}>
                                            <option value="">Seleccione una Región</option>
                                            {
                                                catRegiones.map(({ regionId, descripcion }) => (
                                                    <option value={regionId} key={regionId}>{descripcion}</option>
                                                )
                                                )
                                            }
                                        </SelectGroup>
                                    </Form.Group>

                                    <Form.Group as={Col} md="6">
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
                                                    <option value={departamentoId} key={`${departamentoId}_depto`}>{descripcion}</option>
                                                )
                                                )
                                            }
                                        </SelectGroup>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label htmlFor="municipioId">Municipio</Form.Label>
                                        <SelectGroup
                                            name="municipioId"
                                            id="municipioId"
                                            required
                                            value={values.municipioId}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}>
                                            <option value="">Seleccione un Municipio</option>
                                            {
                                                listMunicipio.map(({ municipioId, descripcion }) => (
                                                    <option value={municipioId} key={`${municipioId}_muns`}>{descripcion}</option>
                                                )
                                                )
                                            }
                                        </SelectGroup>
                                    </Form.Group>
                                    {
                                        dataInicial.sede_diacoId > 0 &&
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
                                        <button type="submit" className="btn btn-success"> {dataInicial.sede_diacoId > 0 ? 'Actualizar' : 'Registrar'}</button>
                                    </div>
                                </Form.Row>
                            </ValidationForm>
                        </Modal.Body>
                    </>
            }
        </Modal>
    )
}
