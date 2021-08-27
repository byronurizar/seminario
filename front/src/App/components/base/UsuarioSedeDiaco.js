import React, { useEffect, useState } from 'react'
import { Table, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUserInfo } from '../../../actions/auth';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso } from '../../../helpers/Notificacion';
import { NoAutorizado } from './NoAutorizado';
import Loading from './Loading';
import { Col, Alert } from 'react-bootstrap';
const menuId = 35;
const menuIdSede = 29;
export const UsuarioSedeDiaco = ({ usuarioId, abrirModal, setAbrirModal, listSedesDiaco }) => {
    const state = useSelector(state => state);
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    const [accesos, setAccesos] = useState([]);
    const [sedesAsignadas, setSedesAsignadas] = useState([]);

    const GetAccesosByMenuId = () => {
        if (state?.accesos) {
            const { accesos } = state;
            const misAccesos = accesos.filter(item => item.menuId === menuId || item.menuId === menuIdSede);
            setAccesos(misAccesos);
        }
        setLoading(false);
    }

    const NuevoRegistro = async (data) => {
        let response = await callApi('usuario/sedediaco', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        if (response) {
            alert_exitoso("Sede Asignada exitosamente");
            GetSedesAsignados(usuarioId);
        }
    }
    const ActualizarRegistro = async (data) => {
        let response = await callApi('usuario/sedediaco', {
            method: 'PUT',
            body: JSON.stringify(data)
        });

        if (response) {
            alert_exitoso(response);
            GetSedesAsignados(usuarioId);
        }
    }

    const handleChangeChecbox = async (usuario_sede_diacoId, sede_diacoId, estadoId) => {
        setLoading(true);
        if (usuario_sede_diacoId === 0) {
            const data = {
                usuarioId,
                sede_diacoId,
                estadoId: 1
            };

            await NuevoRegistro(data);
        } else if (usuario_sede_diacoId > 0) {
            let estadoAux = 3;
            if (estadoId === 1) {
                estadoAux = 2;
            } else if (estadoId === 2) {
                estadoAux = 1;
            }
            const data = {
                usuario_sede_diacoId,
                estadoId: estadoAux
            };
            await ActualizarRegistro(data);
        }
        setLoading(false);
    }
    const GetSedesAsignados = async (id) => {
        if (accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3)) {
            setLoading(true);
            dispatch(UpdateUserInfo());
            let response = await callApi(`usuario/sedediaco?usuarioId=${id}&estadoId=1;2`);
            if (response) {
                setSedesAsignadas(response);
            }
            setLoading(false);
        }
    }

    useEffect(() => {
        GetAccesosByMenuId();
    }, []);

    useEffect(() => {
        GetSedesAsignados(usuarioId);
    }, [usuarioId, accesos]);

    return (
        <Modal show={abrirModal} onHide={() => setAbrirModal(false)} size="lg">
            {
                loading === true ?
                    <Loading />
                    : <>
                        <Modal.Header closeButton>
                            <Modal.Title as="h5">Listado de Sedes</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <>
                                <Row>
                                    <Col>
                                        <Alert variant="warning">
                                            <Alert.Heading as="h4">Información!</Alert.Heading>
                                            <p>El usuario podrá dar seguimiento a todas las quejas que se registren en el sistema,de las sucursales de los comercios que esten en el departamento que tiene asignado dicha Sede de la DIACO</p>
                                            <hr />
                                            <p className="mb-0">Si tiene dudas comuniquese con el departamento de Soporte</p>
                                        </Alert>
                                    </Col>
                                </Row>
                                {
                                    accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3) ?
                                        accesos.find(acceso => acceso.menuId === menuIdSede && acceso.accesoId === 3) ?
                                            <Table striped hover responsive bordered id="mytable">
                                                <thead>
                                                    <tr>
                                                        <th>Codigo Sede</th>
                                                        <th>Sede</th>
                                                        {
                                                            (accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 2) || accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 1)) &&
                                                            <th></th>
                                                        }
                                                    </tr>

                                                </thead>
                                                <tbody>
                                                    {
                                                        listSedesDiaco.map(({ sede_diacoId, nombre }) => {
                                                            const filaRol = sedesAsignadas.find(item => item.sede_diacoId === sede_diacoId);
                                                            let asignado = false;
                                                            const { usuario_sede_diacoId = 0, estadoId = 0 } = !!filaRol && filaRol;
                                                            if (estadoId === 1) {
                                                                asignado = true;
                                                            }
                                                            return (
                                                                (accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 1) || asignado || usuario_sede_diacoId > 0) &&
                                                                <tr key={sede_diacoId}>
                                                                    <td>{sede_diacoId}</td>
                                                                    <td>{nombre}</td>
                                                                    {
                                                                        (estadoId === 1 || estadoId === 2) ?
                                                                            <>{
                                                                                accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 2) ?
                                                                                    <td style={{ textAlign: "center" }}>
                                                                                        <Form.Group>
                                                                                            <div className="switch switch-alternative d-inline m-r-10">
                                                                                                <Form.Control type="checkbox" id={`sede_diacoId_${sede_diacoId}`} checked={asignado} onChange={() => { handleChangeChecbox(usuario_sede_diacoId, sede_diacoId, estadoId); }} />
                                                                                                <Form.Label htmlFor={`sede_diacoId_${sede_diacoId}`} className="cr" />
                                                                                            </div>
                                                                                            <Form.Label htmlFor={`sede_diacoId_${sede_diacoId}`}>{
                                                                                                asignado ? 'Activo' : 'Inactivo'
                                                                                            }</Form.Label>
                                                                                        </Form.Group>
                                                                                    </td>
                                                                                    :
                                                                                    accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 1) &&
                                                                                    <td style={{ textAlign: "center" }}><label className="text-danger">No Autorizado</label></td>
                                                                            }
                                                                            </>
                                                                            :
                                                                            <>
                                                                                {
                                                                                    accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 1) ?
                                                                                        <td style={{ textAlign: "center" }}>
                                                                                            <Form.Group>
                                                                                                <div className="switch switch-alternative d-inline m-r-10">
                                                                                                    <Form.Control type="checkbox" id={`sede_diacoId_${sede_diacoId}`} checked={asignado} onChange={() => { handleChangeChecbox(usuario_sede_diacoId, sede_diacoId, estadoId); }} />
                                                                                                    <Form.Label htmlFor={`sede_diacoId_${sede_diacoId}`} className="cr" />
                                                                                                </div>
                                                                                                <Form.Label htmlFor={`sede_diacoId_${sede_diacoId}`}>Asignar Sede</Form.Label>
                                                                                            </Form.Group>
                                                                                        </td> : <td></td>
                                                                                }
                                                                            </>
                                                                    }
                                                                </tr>
                                                            )
                                                        })
                                                    }

                                                </tbody>
                                            </Table>
                                            : <NoAutorizado />
                                        : <NoAutorizado />
                                }
                            </>
                        </Modal.Body>
                    </>
            }
        </Modal>
    )
}
