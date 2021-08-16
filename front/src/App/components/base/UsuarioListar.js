import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import callApi from '../../../helpers/conectorApi';
import Aux from '../../../hoc/_Aux';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { UsuarioUpSert } from './UsuarioUpSert';
import { UsuarioRol } from './UsuarioRol';
import { NoAutorizado } from './NoAutorizado';
import Loading from './Loading';
import { asignarEstiloTabla, limpiarEstiloTabla } from '../../../helpers/estiloTabla';
const menuId = 17;
const menuIdRol = 11;
const menuIdPersona = 12;
const menuIdUsuarioRol = 18;
export const UsuarioListar = () => {
    const state = useSelector(state => state);
    const [loading, setLoading] = useState(true)
    const [accesos, setAccesos] = useState([]);
    const [abrirModal, setAbrirModal] = useState(false);
    const [abrirModalUsuarioRol, setAbrirModalUsuarioRol] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [personas, setPersonas] = useState([]);
    const [catRol, setCatRol] = useState([]);
    const initData = {
        personaId: '',
        user_name: '',
        password: '',
        forzar_cambio_password: false,
        fecha_cambio_password: '',
        dias_cambio_password: 0,
        estadoId: 1
    };

    const GetAccesosByMenuId = () => {
        if (state?.accesos) {
            const { accesos } = state;
            const misAccesos = accesos.filter(item => item.menuId === menuId || item.menuId === menuIdRol || item.menuId === menuIdPersona || item.menuId === menuIdUsuarioRol);
            setAccesos(misAccesos);
        }
        setLoading(false);
    }

    const [dataInicial, setdataInicial] = useState(initData);
    const handleOpenModal = () => {
        setAbrirModal(true);
        setdataInicial(initData);
    }
    const GetUsuarios = async () => {
        if (accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3)) {
            limpiarEstiloTabla("#mytable");
            setLoading(true);
            let response = await callApi('usuario?estadoId=1;2');
            if (response) {
                setUsuarios(response);
            }
        }
        setLoading(false);
        asignarEstiloTabla("#mytable");
    }
    const GetPersonas = async () => {
        if (accesos.find(acceso => acceso.menuId === menuIdPersona && acceso.accesoId === 3)) {
            setLoading(true);
            let response = await callApi('persona?include=0&estadoId=1');
            if (response) {
                let listPersonas = [];
                response.map(({ personaId, nombre1, nombre2, nombre_otros, apellido1, apellido2, apellido_casada, email }) => {
                    let nombreCompleto = nombre1;
                    if (nombre2) {
                        nombreCompleto += " " + nombre2;
                    }
                    if (nombre_otros) {
                        nombreCompleto += " " + nombre_otros;
                    }
                    nombreCompleto += " " + apellido1;

                    if (apellido2) {
                        nombreCompleto += " " + apellido2;
                    }
                    if (apellido_casada) {
                        nombreCompleto += " " + apellido_casada;
                    }
                    let item = {
                        value: personaId,
                        label: nombreCompleto,
                    }
                    listPersonas.push(item);
                });

                setPersonas(listPersonas);
            }
        } else {
            setPersonas([{ value: '', label: 'No esta autorizado' }]);
        }
        setLoading(false);
    }
    const handleEditar = (id) => {
        let { usuarioId, personaId, user_name, forzar_cambio_password, dias_cambio_password, estadoId } = usuarios.find(item => item.usuarioId === id);
        if (dias_cambio_password === null) {
            dias_cambio_password = 0;
        }
        setdataInicial({
            usuarioId,
            personaId,
            user_name,
            forzar_cambio_password,
            dias_cambio_password,
            estadoId
        });
        setAbrirModal(true);
    }

    const handleUsuarioRol = (id) => {
        let { usuarioId } = usuarios.find(item => item.usuarioId === id);
        setdataInicial({
            usuarioId
        });
        setAbrirModalUsuarioRol(true);
    }


    const GetCatRol = async () => {
        if (accesos.find(acceso => acceso.menuId === menuIdRol && acceso.accesoId === 3)) {
            setLoading(true);
            let response = await callApi('rol?estadoId=1&include=0');
            if (response) {
                setCatRol(response);
            }
        }
        setLoading(false);
    }
    const handleCanbioPass = (id) => {
        let { usuarioId } = usuarios.find(item => item.usuarioId === id);
        setdataInicial({
            usuarioId,
            password: '',
            cambioPass: true
        });
        setAbrirModal(true);
    }

    const handleDelete = (id) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: 'Alerta?',
            text: 'Esta seguro que desea eliminar el elemento',
            type: 'warning',
            showCloseButton: true,
            showCancelButton: true
        }).then(async (willDelete) => {
            if (willDelete.value) {
                let method = 'DELETE';
                let response = await callApi(`usuario/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    let listActual = usuarios.filter(item => item.usuarioId !== id);
                    setUsuarios(listActual);
                }
            } else {
                alert_warning('No se eliminó ningún elemento');
            }
        });
    }

    useEffect(() => {
        GetAccesosByMenuId();
    }, [state?.accesos]);

    useEffect(() => {
        GetUsuarios();
        GetPersonas();
        GetCatRol();
    }, [accesos]);
    return (
        accesos.length > 0 &&
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Usuarios</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            {
                                loading === true ?
                                    <Loading />
                                    : <>
                                        <Row className="align-items-center m-l-0">
                                            <Col />
                                            <Col className="text-right">
                                                {
                                                    accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 1) &&
                                                    <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar Usuario</Button>
                                                }
                                            </Col>
                                        </Row>
                                        {
                                            accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3) ?
                                                <Table striped hover responsive bordered id="mytable">
                                                    <thead>
                                                        <tr>
                                                            <th>Código</th>
                                                            <th>Nombre</th>
                                                            <th>Usuario</th>
                                                            <th>Correo</th>
                                                            <th>Fecha Vencimiento Contraseña</th>
                                                            <th>Fecha Creación</th>
                                                            <th>Estado</th>
                                                            {
                                                                accesos.find(acceso => acceso.menuId === menuIdUsuarioRol && acceso.accesoId === 3) &&
                                                                <th>Perfiles</th>
                                                            }
                                                            <th>Cambio Contraseña</th>
                                                            {
                                                                accesos.find(acceso => (acceso.menuId === menuId && acceso.accesoId === 2) || (acceso.menuId === menuId && acceso.accesoId === 4)) &&
                                                                <th></th>
                                                            }
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            usuarios.map(({ usuarioId, user_name, fecha_cambio_password, fecha_crea, Persona: { nombre1, nombre2, nombre_otros, apellido1, apellido2, apellido_casada, email }, Estado: { descripcion: estado } }) => {
                                                                let nombreCompleto = nombre1;
                                                                if (nombre2) {
                                                                    nombreCompleto += " " + nombre2;
                                                                }
                                                                if (nombre_otros) {
                                                                    nombreCompleto += " " + nombre_otros;
                                                                }
                                                                nombreCompleto += " " + apellido1;

                                                                if (apellido2) {
                                                                    nombreCompleto += " " + apellido2;
                                                                }
                                                                if (apellido_casada) {
                                                                    nombreCompleto += " " + apellido_casada;
                                                                }
                                                                return (
                                                                    <tr key={usuarioId}>
                                                                        <td>{usuarioId}</td>
                                                                        <td>{nombreCompleto}</td>
                                                                        <td>{user_name}</td>
                                                                        <td>{email}</td>
                                                                        <td>{
                                                                            fecha_cambio_password !== null &&
                                                                            moment(fecha_cambio_password).format('DD/MM/YYYY')
                                                                        }
                                                                        </td>
                                                                        <td>{moment(fecha_crea).format('DD/MM/YYYY')}</td>
                                                                        <td>{estado}</td>
                                                                        {
                                                                            accesos.find(acceso => acceso.menuId === menuIdUsuarioRol && acceso.accesoId === 3) &&
                                                                            <td style={{ textAlign: "center" }}>
                                                                                <button className="btn-icon btn btn-warning btn-sm" onClick={() => { handleUsuarioRol(usuarioId) }}><i className="feather icon-check-square" /></button>
                                                                            </td>
                                                                        }
                                                                        {
                                                                            accesos.find(acceso => (acceso.menuId === menuId && acceso.accesoId === 2) || (acceso.menuId === menuId && acceso.accesoId === 4)) &&
                                                                            <>
                                                                                {
                                                                                    accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 2) &&
                                                                                    <td style={{ textAlign: "center" }}>
                                                                                        <button className="btn-icon btn btn-success btn-sm" onClick={() => { handleCanbioPass(usuarioId) }}><i className="feather icon-unlock" /></button>
                                                                                    </td>
                                                                                }
                                                                                <td style={{ textAlign: "center" }}>
                                                                                    {
                                                                                        accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 2) &&
                                                                                        <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleEditar(usuarioId) }}><i className="feather icon-edit" /></button>
                                                                                    }
                                                                                    {
                                                                                        accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 4) &&
                                                                                        <button className="btn-icon btn btn-danger btn-sm" onClick={() => { handleDelete(usuarioId) }}><i className="feather icon-trash-2" /></button>
                                                                                    }
                                                                                </td>
                                                                            </>
                                                                        }
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
                                <UsuarioUpSert abrirModal={abrirModal} setAbrirModal={setAbrirModal} personas={personas} GetUsuarios={GetUsuarios} dataInicial={dataInicial} />
                            }
                            {
                                abrirModalUsuarioRol === true &&
                                <UsuarioRol abrirModal={abrirModalUsuarioRol} setAbrirModal={setAbrirModalUsuarioRol} catRol={catRol} usuarioId={dataInicial.usuarioId} />
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
