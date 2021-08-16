import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import moment from 'moment';
import DatePicker from "react-datepicker";
import { useSelector } from 'react-redux';
import { Form, Row, Col, Card, Table } from 'react-bootstrap';
import { ValidationForm } from 'react-bootstrap4-form-validation';
import Aux from '../../../hoc/_Aux';
import callApi from '../../../helpers/conectorApi';
import { useForm } from '../../hooks/useForm';
import { asignarEstiloTabla, limpiarEstiloTabla } from '../../../helpers/estiloTabla';
import { NoAutorizado } from './NoAutorizado';
import Loading from './Loading';
const menuId = 27;
const menuIdUsuario = 17;
export const BitacoraCambiosListar = () => {
    const state = useSelector(state => state);
    const [loading, setLoading] = useState(true)
    const [accesos, setAccesos] = useState([]);
    const [tablas, setTablas] = useState([]);
    const [peticiones, setCambios] = useState([]);
    const [fechaInicial, setFechaInicial] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [values, , , setValues] = useForm({
        tabla: '',
        usuarioId: '',
        fechaInicial: '',
        fechaFinal: ''
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
    const GetTablas = async () => {
        let lista = [];
        if (accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3)) {
            setLoading(true);
            lista.push({
                value: "",
                label: "Todas",
            })
            let response = await callApi('bitacora/cambios/tablas');
            if (response) {
                response.map((item) => {
                    let [nombre] = Object.keys(item);
                    let valueAux = item[`${nombre}`];
                    lista.push({
                        value: valueAux,
                        label: valueAux
                    });
                });

            }
        } else {
            lista.push({
                value: "-1",
                label: "No Autorizado",
            })
        }
        setTablas(lista);
        setLoading(false);
    }

    const Cambios = async () => {
        if (accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3)) {
            setLoading(true);
            limpiarEstiloTabla("#mytable");
            let response = await callApi('bitacora/cambios', {
                method: 'POST',
                body: JSON.stringify(values)
            });
            if (response) {
                setCambios(response);
            }
            setLoading(false);
            asignarEstiloTabla("#mytable", 25);
        }
    }

    const handleChangeUsuario = ({ value }) => {
        setValues({ ...values, usuarioId: value });
    }
    const handleChangeTabla = ({ value }) => {
        setValues({ ...values, tabla: value });
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        Cambios();
    }

    const onchangeFechaIncial = (fecha) => {
        const fechaFormat = moment(fecha).format('YYYY/MM/DD');
        setValues({ ...values, fechaInicial: fechaFormat });
        setFechaInicial(fecha);
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
        GetTablas();
        GetUsuarios();
    }, [accesos])

    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Listado de Cambios</Card.Title>
                        </Card.Header>
                        <Card.Body>

                            <Row className="align-items-center m-l-0">
                                <Col>
                                    <ValidationForm onSubmit={handleOnSubmit} >
                                        <Form.Row>
                                            <Form.Group as={Col} md="6">
                                                <Form.Label htmlFor="tabla">Tabla</Form.Label>
                                                <Select
                                                    id="tabla"
                                                    name="tabla"
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                    required
                                                    placeholder="Tabla"
                                                    onChange={handleChangeTabla}
                                                    options={tablas}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="6">
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
                                        </Form.Row>
                                        <Form.Row>
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
                                                            <th>Tabla</th>
                                                            <th>Campo</th>
                                                            <th>Id Modificado</th>
                                                            <th>Tipo de Dato</th>
                                                            <th>Valor Anterior</th>
                                                            <th>Valor Nuevo</th>
                                                            <th>Usuario</th>
                                                            <th>Fecha</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            peticiones.map(({ bitacora_cambiosId, tabla, campo, modificadoId, tipo_dato, valor_anterior, valor_nuevo, Usuario, fecha_crea }) => {
                                                                let nombreUsuario = "N/A";
                                                                if (Usuario) {
                                                                    nombreUsuario = Usuario?.user_name ?? "N/A";
                                                                }
                                                                return (
                                                                    <tr key={bitacora_cambiosId}>
                                                                        <td>{bitacora_cambiosId}</td>
                                                                        <td>{tabla}</td>
                                                                        <td>{campo}</td>
                                                                        <td>{modificadoId}</td>
                                                                        <td>{tipo_dato}</td>
                                                                        <td>{valor_anterior}</td>
                                                                        <td>{valor_nuevo}</td>
                                                                        <td>{nombreUsuario}</td>
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
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
