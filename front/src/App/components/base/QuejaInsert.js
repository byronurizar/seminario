import React, { useState } from 'react'
import Aux from '../../../hoc/_Aux'
import logoDark from './../../../assets/images/logoDiaco.jpg'
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import { Link } from 'react-router-dom';
import { Col, Form } from 'react-bootstrap';
import { alert_error, alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import callApi from '../../../helpers/conectorApi';
import Loading from './Loading';
import { DropzoneComponent } from 'react-dropzone-component';
import { useForm } from '../../hooks/useForm';
import { useEffect } from 'react';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import config from '../../../config';
const BASE_URL = config.urlApi;
const dataInicial={
    departamentoId: '',
    municipioId: '',
    comercioId: '',
    sucursalId: '',
    num_documento: '',
    fecha_documento: '',
    descripcion: '',
    solicitud: ''
};
export const QuejaInsert = ({ history }) => {
    const [values, handleOnChange,,setValues] = useForm(dataInicial);
    const [catRegiones, setRegiones] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [listMunicipio, setListMunicipio] = useState([]);
    const [listComerciosXMunicipio, setListComerciosXMunicipio] = useState([]);
    const [listSucursalesComercio, setListSucursalesComercio] = useState([]);
    const [file, setFile] = useState(null);

    const config = {
        iconFiletypes: ['.jpg', '.png', '.jpeg'],
        showFiletypeIcon: true,
        postUrl: '/'
    };

    const djsConfig = {
        addRemoveLinks: true,
        acceptedFiles: "image/jpeg,image/png"
    };
    var eventHandlers = { addedfiles: (files) => setFile(files) }

    
    const [loading, setLoading] = useState(false)
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();

        data.append("datos", JSON.stringify(values));

        let contador=1;
        if(file){
        for await (let item of file) {
            data.append("files", item,`img_${contador}`);
            contador++;
        }
    }

        const url = BASE_URL + "queja";
        let options = {};
        options.method = 'POST';
        options.body = data;

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setLoading(false);
            if (result) {
                const { error, status, body } = result;
                if (error === true) {
                    if (body === "Validation error") {
                        mostrarMensaje("Ocurri?? un error de validaci??n","error");
                    } else {
                        mostrarMensaje("Ocurri?? un error al intentar registrar la queja","error");
                    }
                } else {
                    if (body) {
                        const { code, data } = body;
                        if (code === 0) {
                            mostrarMensaje(data,"warning");
                        } else if (code === 1) {
                            setValues(dataInicial);
                            mostrarMensaje(data,"success");
                        } else {
                            mostrarMensaje(data,"error");
                        }
                    } else {
                        mostrarMensaje("El servicio no retorno informaci??n","error");
                    }
                }
            } else {
                mostrarMensaje("Ocurri?? un error al realizar la acci??n","error");
            }
        } catch (error) {
            mostrarMensaje("Ocurri?? un error en la aplicaci??n","error");
        }

        
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

    const GetSucursalesComercio = async (comercioId, municipioId) => {
        let response = await callApi(`queja/sucurs?comercioId=${comercioId}&municipioId=${municipioId}&estadoId=1`);
        if (response) {
            setListSucursalesComercio(response);
        }
    }


    const handleCancelar = () => {

    }
    const handleErrorSubmit = (e, formData, errorInputs) => {
        alert_warning("Por favor complete la informaci??n solicitada");
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
        if (values?.comercioId > 0 && values?.municipioId > 0) {
            GetSucursalesComercio(values.comercioId, values.municipioId);
        }
    }, [values.comercioId]);

    const mostrarMensaje=(mensaje,tipoAlerta)=>{
            const MySwal = withReactContent(Swal);
            MySwal.fire({
                title: 'Informaci??n!',
                text: mensaje,
                type:tipoAlerta,
                showCloseButton: true,
                showCancelButton: false
            });
    }
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
                                    <div className="d-flex justify-content-center">
                                        <img src={logoDark} alt="" className="img-fluid mb-4" />
                                        </div>
                                        <h4 className="mb-3 f-w-400">Por favor complete toda la informaci??n solicitada por el formulario</h4>
                                        <hr></hr>
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
                                                <Form.Group as={Col} md="6">
                                                    <Form.Label htmlFor="num_documento">N??mero de Factura</Form.Label>
                                                    <TextInput
                                                        name="num_documento"
                                                        id="num_documento"
                                                        value={values.num_documento}
                                                        onChange={handleOnChange}
                                                        errorMessage={errorMessage}
                                                        placeholder="N??mero de Factura"
                                                        autoComplete="off"
                                                        type="text"
                                                    />
                                                </Form.Group>
                                                <div className="col-md-6">
                                                    <div className="form-group col">
                                                        <label className="form-label">Fecha de Factura</label>
                                                        <input
                                                            type="date"
                                                            id="fecha_documento"
                                                            name="fecha_documento"
                                                            value={values.fecha_documento}
                                                            onChange={handleOnChange}
                                                            className="form-control" />
                                                    </div>
                                                </div>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} md="12">
                                                    <Form.Label htmlFor="descripcion">Descripci??n</Form.Label>
                                                    <TextInput
                                                        name="descripcion"
                                                        id="descripcion"
                                                        required
                                                        multiline
                                                        value={values.descripcion}
                                                        onChange={handleOnChange}
                                                        errorMessage={errorMessage}
                                                        placeholder="Descripci??n"
                                                        autoComplete="off"
                                                        rows="3"
                                                        minLength="50"
                                                    />
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} md="12">
                                                    <Form.Label htmlFor="solicitud">Solicita</Form.Label>
                                                    <TextInput
                                                        name="solicitud"
                                                        id="solicitud"
                                                        required
                                                        multiline
                                                        value={values.solicitud}
                                                        onChange={handleOnChange}
                                                        errorMessage={errorMessage}
                                                        placeholder="Solicitud"
                                                        autoComplete="off"
                                                        rows="3"
                                                        minLength="50"
                                                    />
                                                </Form.Group>
                                            </Form.Row>
                                            <hr></hr>
                                            <h6 className="mb-3 f-w-400">Adjuntar im??genes (opcional)</h6>
                                            <Form.Row>
                                                <Form.Group as={Col} md="12">
                                                    <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
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
