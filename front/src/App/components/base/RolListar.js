import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import callApi from '../../../helpers/conectorApi';
import Aux from '../../../hoc/_Aux';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { RolUpSert } from './RolUpSert';
import { Link } from 'react-router-dom';
import { NoAutorizado } from './NoAutorizado';
import { UpdateUserInfo } from '../../../actions/auth';
import Loading from './Loading';
const menuId = 11;
const menuIdRolMenuAcceso = 20;
export const RolListar = () => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [accesos, setAccesos] = useState([]);
    const [abrirModal, setAbrirModal] = useState(false);
    const [catRol, setCatRol] = useState([]);
    const initData = {
        rolId: '',
        nombre: '',
        descripcion: '',
        estadoId: 1
    };

    const GetAccesosByMenuId = () => {
        if (state?.accesos) {
            const { accesos } = state;
            const misAccesos = accesos.filter(item => (item.menuId === menuId || item.menuId === menuIdRolMenuAcceso));
            setAccesos(misAccesos);
        }
        setLoading(false);
    }


    const [dataInicial, setdataInicial] = useState(initData);
    const handleOpenModal = () => {
        setAbrirModal(true);
        setdataInicial(initData);
    }
    const GetCatRol = async () => {
        if (accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3)) {
            setLoading(true);
            let response = await callApi('rol?estadoId=1;2');
            if (response) {
                setCatRol(response);
            }
        }
        setLoading(false);
    }
    const handleEditar = (id) => {
        const { rolId, nombre, descripcion, estadoId } = catRol.find(item => item.rolId === id);
        setdataInicial({
            rolId,
            nombre,
            descripcion,
            estadoId
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
                let response = await callApi(`rol/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    dispatch(UpdateUserInfo());
                    let listActual = catRol.filter(item => item.rolId !== id);
                    setCatRol(listActual);
                }
            } else {
                alert_warning('No se eliminó ningún elemento');
            }
        });
    }

    useEffect(() => {
        GetAccesosByMenuId();
    }, []);


    useEffect(() => {
        GetCatRol();
    }, [accesos]);
    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Roles</Card.Title>
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
                                                    <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar Nuevo Rol</Button>
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
                                                            <th>Descripción</th>
                                                            <th>Estado</th>
                                                            {
                                                                accesos.find(acceso => acceso.menuId === menuIdRolMenuAcceso && acceso.accesoId === 3) &&
                                                                <th>Accesos</th>
                                                            }
                                                            {
                                                                accesos.find(acceso => (acceso.menuId === menuId && acceso.accesoId === 2) || (acceso.menuId === menuId && acceso.accesoId === 4)) &&
                                                                <th></th>
                                                            }
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            catRol.map(({ rolId, nombre, descripcion, Estado: { descripcion: estado } }) => (
                                                                <tr key={rolId}>
                                                                    <td>{rolId}</td>
                                                                    <td>{nombre}</td>
                                                                    <td>{descripcion}</td>
                                                                    <td>{estado}</td>{
                                                                        accesos.find(acceso => acceso.menuId === menuIdRolMenuAcceso && acceso.accesoId === 3) &&
                                                                        <td style={{ textAlign: "center" }}>
                                                                            <Link className="btn-icon btn btn-info btn-sm" to={`/base/seguridad/rolmenuacceso/${btoa(`idrol=${rolId}`)}`}><i className="feather icon-lock" /></Link>
                                                                        </td>
                                                                    }

                                                                    {
                                                                        accesos.find(acceso => (acceso.menuId === menuId && acceso.accesoId === 2) || (acceso.menuId === menuId && acceso.accesoId === 4)) &&
                                                                        <td style={{ textAlign: "center" }}>
                                                                            {
                                                                                accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 2) &&
                                                                                <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleEditar(rolId) }}><i className="feather icon-edit" /></button>
                                                                            }
                                                                            {
                                                                                accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 4) &&
                                                                                <button className="btn-icon btn btn-danger btn-sm" onClick={() => { handleDelete(rolId) }}><i className="feather icon-trash-2" /></button>
                                                                            }
                                                                        </td>
                                                                    }
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </Table>
                                                : <NoAutorizado />
                                        }
                                    </>
                            }
                            {
                                abrirModal === true &&
                                <RolUpSert abrirModal={abrirModal} setAbrirModal={setAbrirModal} GetCatRol={GetCatRol} dataInicial={dataInicial} />
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
