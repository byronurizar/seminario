import React, { useState } from 'react'
import Aux from '../../../hoc/_Aux'
import logoDark from './../../../assets/images/logoDiaco.jpg'
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import { Link } from 'react-router-dom';
import { Col, Form } from 'react-bootstrap';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import callApi from '../../../helpers/conectorApi';
import Loading from './Loading';
import { useForm } from '../../hooks/useForm';
import { useEffect } from 'react';
export const QuejaInsert = ({ history }) => {
    const [values, handleOnChange] = useForm({

    });
    const [catRegiones, setRegiones] = useState([]);
    const [email, setEmail] = useState('');
    const [departamentos, setDepartamentos] = useState([]);
    const [listMunicipio, setListMunicipio] = useState([]);
    const [listComerciosXMunicipio, setListComerciosXMunicipio] = useState([]);
    const [listSucursalesComercio, setListSucursalesComercio] = useState([]);
    
    const [loading, setLoading] = useState(false)
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let response = await callApi('resetpassword', {
            method: 'POST',
            body: JSON.stringify({ email })
        });

        if (response) {
            alert_exitoso(response);
            setEmail('');
            history.replace("/auth/login");
        }
        setLoading(false);
    }

    const GetRegiones = async () => {
        let response = await callApi('region?include=0?estadoId=1');
        if (response) {
            setRegiones(response);
        }
    }

    const GetDepartamentos = async (regionId) => {
        let response = await callApi(`queja/deptos?include=0&estadoId=1`);
        if (response) {
            setDepartamentos(response);
        }
    }
    const GetComerciosxMunicipio = async (municipioId) => {
        let response = await callApi(`queja/comers?municipioId=${municipioId}`);
        if (response) {
            setListComerciosXMunicipio(response);
        }
    }
    const GetMunicipios = async (departamentoId) => {
        let response = await callApi(`queja/muns?include=0&departamentoId=${departamentoId}&estadoId=1`);
        if (response) {
            setListMunicipio(response);
        }
    }

    const GetSucursalesComercio = async (comercioId,municipioId) => {
        let response = await callApi(`queja/sucurs?comercioId=${comercioId}&municipioId=${municipioId}&estadoId=1`);
        if (response) {
            setListSucursalesComercio(response);
        }
    }


    const handleCancelar = () => {

    }
    const handleErrorSubmit = (e, formData, errorInputs) => {
        alert_warning("Por favor complete la información solicitada");
    };
    useEffect(() => {
        GetDepartamentos();
    }, [])

    useEffect(() => {
        if (values?.departamentoId > 0) {
            GetMunicipios(values.departamentoId);
        }
    }, [values.departamentoId]);

    useEffect(() => {
        if (values?.municipioId > 0) {
            GetComerciosxMunicipio(values.municipioId);
        }
    }, [values.municipioId]);

    useEffect(() => {
        if (values?.comercioId > 0 && values?.municipioId>0) {
            GetSucursalesComercio(values.comercioId,values.municipioId);
        }
    }, [values]);

    const errorMessage = "Campo obligatorio";
    return (
        <Aux>
            <div className="auth-wrapper">

                <div className="card">
                    <div className="col-md-12">
                        <div className="card-body">
                            {
                                loading === true ?
                                    <Loading />
                                    : <>
                                        <img src={logoDark} alt="" className="img-fluid mb-4" />
                                        <h4 className="mb-3 f-w-400">Por favor complete toda la información solicitada por el formulario</h4>
                                        <ValidationForm onSubmit={handleOnSubmit} onErrorSubmit={handleErrorSubmit}>
                                            <Form.Row>
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
                                                <Form.Group as={Col} md="6">
                                                    <Form.Label htmlFor="comercioId">Comercio</Form.Label>
                                                    <SelectGroup
                                                        name="comercioId"
                                                        id="comercioId"
                                                        required
                                                        value={values.comercioId}
                                                        onChange={handleOnChange}
                                                        errorMessage={errorMessage}>
                                                        <option value="">Seleccione un Comercio</option>
                                                        {
                                                            listComerciosXMunicipio.map(({ comercioId, razon_social }) => (
                                                                <option value={comercioId} key={`${comercioId}_comercios`}>{razon_social}</option>
                                                            )
                                                            )
                                                        }
                                                    </SelectGroup>
                                                </Form.Group>
                                            <Form.Group as={Col} md="6">
                                                    <Form.Label htmlFor="sucursalId">Sucursal</Form.Label>
                                                    <SelectGroup
                                                        name="sucursalId"
                                                        id="sucursalId"
                                                        required
                                                        value={values.sucursalId}
                                                        onChange={handleOnChange}
                                                        errorMessage={errorMessage}>
                                                        <option value="">Seleccione una Sucursal</option>
                                                        {
                                                            listSucursalesComercio.map(({ sucursalId, nombre }) => (
                                                                <option value={sucursalId} key={`${sucursalId}_sucursal`}>{nombre}</option>
                                                            )
                                                            )
                                                        }
                                                    </SelectGroup>
                                                </Form.Group>
                                            </Form.Row>

                                            <hr></hr>
                                            <Form.Row>
                                                <Form.Group as={Col} md="6">
                                                    <button className="btn btn-block btn-danger mb-4" onClick={handleCancelar}>Cancelar</button>
                                                </Form.Group>
                                                <Form.Group as={Col} md="6">
                                                    <button className="btn btn-block btn-primary mb-4">Registrar</button>
                                                </Form.Group>
                                            </Form.Row>
                                        </ValidationForm>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Aux >
    )
}
