import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import moment from 'moment';
import DatePicker from "react-datepicker";
import { Form, Row, Col, Card, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import callApi from '../../../helpers/conectorApi';
import Aux from '../../../hoc/_Aux';
import { NoAutorizado } from './NoAutorizado';
import { useForm } from '../../hooks/useForm';
import { asignarEstiloTabla, limpiarEstiloTabla } from '../../../helpers/estiloTabla';
import { BitacoraPeticionDetalle } from './BitacoraPeticionDetalle';
import Loading from './Loading';
const menuId = 26;
const menuIdUsuario = 17;
export const BitacoraPeticionListar = () => {
    const state = useSelector(state => state);
    const [loading, setLoading] = useState(true)
    const [abrirModal, setAbrirModal] = useState(false);
    const [dataInicial, setDataInicial] = useState({});
    const [accesos, setAccesos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [peticiones, setPeticiones] = useState([]);
    const [fechaInicial, setFechaInicial] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const [values, handleOnChange, , setValues] = useForm({
        baseUrl: '',
        method: "",
        status: "",
        error: '',
        usuarioId: '',
        fechaInicial: '',
        fechaFinal: '',
        ip_origen: ''
    });

    const GetAccesosByMenuId = () => {
        if (state?.accesos) {
            const { accesos } = state;
            const misAccesos = accesos.filter(item => (item.menuId === menuId || item.menuId === menuIdUsuario));
            setAccesos(misAccesos);
        }
        setLoading(false);
    }
    const GetUsuarios = async () => {
        let listUsuario = [];
        if (accesos.find(acceso => acceso.menuId === menuIdUsuario && acceso.accesoId === 3)) {
            setLoading(true);
            listUsuario.push({
                value: "0",
                label: "Todos",
            })
            let response = await callApi('usuario?estadoId=1&include=0');
            if (response) {
                response.map(({ usuarioId, user_name }) => {
                    listUsuario.push({
                        value: usuarioId,
                        label: user_name,
                    })
                });

            }
        } else {
            listUsuario.push({
                value: "-1",
                label: "No Autorizado",
            })
        }
        setUsuarios(listUsuario);
        setLoading(false);
    }

    const Peticiones = async () => {
        if (accesos.find(acceso => acceso.menuId === menuIdUsuario && acceso.accesoId === 3)) {
            limpiarEstiloTabla("#mytable");
            setLoading(true);
            let response = await callApi('bitacora/peticiones', {
                method: 'POST',
                body: JSON.stringify(values)
            });
            if (response) {
                setPeticiones(response);
            }
            setLoading(false);
            asignarEstiloTabla("#mytable", 25);
        }
    }

    const handleChangeUsuario = ({ value }) => {
        setValues({ ...values, usuarioId: value });
    }
    const onchangeBaseUrl = ({ target: { value } }) => {
        setValues({ ...values, baseUrl: value.toLowerCase() });
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        Peticiones();
    }

    const onchangeFechaIncial = (fecha) => {
        const fechaFormat = moment(fecha).format('YYYY/MM/DD');
        setValues({ ...values, fechaInicial: fechaFormat });
        setFechaInicial(fecha);
    }

    const handleDetalle = (id, tipo) => {
        setDataInicial({
            id,
            tipo
        })
        setAbrirModal(true);
    }
    const onchangeFechaFinal = (fecha) => {
        const fechaFormat = moment(fecha).format('YYYY/MM/DD');
        setValues({ ...values, fechaFinal: fechaFormat });
        setFechaFinal(fecha);
    }
    useEffect(() => {
        GetAccesosByMenuId();
    }, []);

    useEffect(() => {
        GetUsuarios();
    }, [accesos])

    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Listado de Peticiones</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row className="align-items-center m-l-0">
                                <Col>
                                    <ValidationForm onSubmit={handleOnSubmit} >
                                        <Form.Row>
                                            <Form.Group as={Col} md="3">
                                                <Form.Label htmlFor="baseUrl">Base Url</Form.Label>
                                                <TextInput
                                                    name="baseUrl"
                                                    placeholder="Base Url"
                                                    autoComplete="off"
                                                    type="text"
                                                    value={values.baseUrl}
                                                    onChange={onchangeBaseUrl}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="3">
                                                <Form.Label htmlFor="method">Metodo</Form.Label>
                                                <SelectGroup
                                                    name="method"
                                                    id="method"
                                                    value={values.method}
                                                    onChange={handleOnChange}
                                                >
                                                    <option value="">Todos</option>
                                                    <option value="POST">POST</option>
                                                    <option value="GET">GET</option>
                                                    <option value="PUT">PUT</option>
                                                    <option value="PATCH">PATCH</option>
                                                    <option value="DELETE">DELETE</option>
                                                </SelectGroup>
                                            </Form.Group>
                                            <Form.Group as={Col} md="3">
                                                <Form.Label htmlFor="status">Código Estado Http</Form.Label>
                                                <TextInput
                                                    name="status"
                                                    id="status"
                                                    placeholder="Código de estado"
                                                    autoComplete="off"
                                                    type="number"
                                                    value={values.status}
                                                    onChange={handleOnChange}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="3">
                                                <Form.Label htmlFor="status">Ip Cliente</Form.Label>
                                                <TextInput
                                                    name="ip_origen"
                                                    id="ip_origen"
                                                    placeholder="Ip Cliente"
                                                    autoComplete="off"
                                                    type="text"
                                                    value={values.ip_origen}
                                                    onChange={handleOnChange}
                                                />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md="3">
                                                <Form.Label htmlFor="usuarioId">Usuario</Form.Label>
                                                <Select
                                                    id="usuarioId"
                                                    name="usuarioId"
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                    required
                                                    placeholder="Usuario"
                                                    onChange={handleChangeUsuario}
                                                    options={usuarios}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="3">
                                                <Form.Label htmlFor="fechaInicial">Fecha Inicial</Form.Label>
                                                <div className="form-group">
                                                    <DatePicker
                                                        id="fechaInicial"
                                                        name="fechaInicial"
                                                        dateFormat="dd/MM/yyyy"
                                                        selected={fechaInicial}
                                                        onChange={onchangeFechaIncial}
                                                        className="form-control"
                                                        placeholderText="dd/MM/yyyy"
                                                        autoComplete="off"
                                                        maxDate={new Date()}
                                                    />
                                                </div>
                                            </Form.Group>
                                            <Form.Group as={Col} md="3">
                                                <Form.Label htmlFor="fechaFinal">Fecha Final</Form.Label>
                                                <div className="form-group">
                                                    <DatePicker
                                                        id="fechaFinal"
                                                        name="fechaFinal"
                                                        dateFormat="dd/MM/yyyy"
                                                        selected={fechaFinal}
                                                        onChange={onchangeFechaFinal}
                                                        className="form-control"
                                                        placeholderText="dd/MM/yyyy"
                                                        autoComplete="off"
                                                        maxDate={new Date()}
                                                    />
                                                </div>
                                            </Form.Group>
                                            <Form.Group as={Col} md="2">
                                                <Form.Label htmlFor="error">Estado</Form.Label>
                                                <SelectGroup
                                                    name="error"
                                                    id="error"
                                                    value={values.error}
                                                    onChange={handleOnChange}
                                                >
                                                    <option value="">Todos</option>
                                                    <option value="0">Satisfactoria</option>
                                                    <option value="1">Erronea</option>
                                                </SelectGroup>
                                            </Form.Group>
                                            <Form.Group as={Col} md="1">
                                                <Form.Label htmlFor="status">&nbsp;&nbsp;</Form.Label>
                                                <button className="btn btn-block btn-primary mb-0" type="submit">Buscar<i className="feather icon-search" /></button>
                                            </Form.Group>
                                        </Form.Row>
                                    </ValidationForm>
                                </Col>
                            </Row>
                            <hr></hr>
                                {
                                    loading === true ?
                                        <Loading />
                                        : <>
                                            {
                                                accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3) ?
                                                    <Table striped hover responsive bordered id="mytable">
                                                        <thead>
                                                            <tr>
                                                                <th>Codigo</th>
                                                                <th>Base Url</th>
                                                                <th>Method</th>
                                                                <th>Codigo Estado Http</th>
                                                                <th>Resultado</th>
                                                                <th>Request</th>
                                                                <th>Response</th>
                                                                <th>Usuario</th>
                                                                <th>Ip Cliente</th>
                                                                <th>Fecha</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                peticiones.map(({ bitacora_peticionId, baseUrl, method, status, error, Usuario, ip_origen, fecha_crea }) => {
                                                                    let nombreUsuario = "N/A";
                                                                    if (Usuario) {
                                                                        nombreUsuario = Usuario?.user_name ?? "N/A";
                                                                    }
                                                                    return (
                                                                        <tr key={bitacora_peticionId}>
                                                                            <td>{bitacora_peticionId}</td>
                                                                            <td>{baseUrl}</td>
                                                                            <td>{method}</td>
                                                                            <td>{status}</td>
                                                                            {
                                                                                !error ?
                                                                                    <td className="text-center"><label className="badge badge-success">Satisfactoria</label></td>
                                                                                    :
                                                                                    <td className="text-center"><label className="badge badge-danger">Erronea</label></td>
                                                                            }
                                                                            <td className="text-center"> <button className="btn-icon btn btn-primary btn-sm" onClick={() => { handleDetalle(bitacora_peticionId, 'request') }}><i className="feather icon-eye" /></button></td>
                                                                            <td className="text-center"> <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleDetalle(bitacora_peticionId, 'response') }}><i className="feather icon-eye" /></button></td>
                                                                            <td>{nombreUsuario}</td>
                                                                            <td>{ip_origen}</td>
                                                                            <td>{fecha_crea}</td>

                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </Table>
                                                    : <NoAutorizado />
                                            }
                                        </>
                                }
                            {
                                abrirModal === true &&
                                <BitacoraPeticionDetalle abrirModal={abrirModal} setAbrirModal={setAbrirModal} dataInicial={dataInicial} />
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
