import React, { useEffect, useState } from 'react'
import { Table, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUserInfo } from '../../../actions/auth';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso } from '../../../helpers/Notificacion';
import { NoAutorizado } from './NoAutorizado';
import Loading from './Loading';
const menuId = 18;
const menuIdRol = 11;
export const UsuarioRol = ({ usuarioId, abrirModal, setAbrirModal, catRol }) => {
    const state = useSelector(state => state);
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    const [accesos, setAccesos] = useState([]);
    const [catRolesAsignados, setRolesAsignados] = useState([]);

    const GetAccesosByMenuId = () => {
        if (state?.accesos) {
            const { accesos } = state;
            const misAccesos = accesos.filter(item => item.menuId === menuId || item.menuId === menuIdRol);
            setAccesos(misAccesos);
        }
        setLoading(false);
    }

    const NuevoRegistro = async (data) => {
        let response = await callApi('usuario/rol', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        if (response) {
            alert_exitoso("Perfil Asignado exitosamente");
            GetRolesAsignados(usuarioId);
        }
    }
    const ActualizarRegistro = async (data) => {
        let response = await callApi('usuario/rol', {
            method: 'PUT',
            body: JSON.stringify(data)
        });

        if (response) {
            alert_exitoso(response);
            GetRolesAsignados(usuarioId);
        }
    }

    const handleChangeChecbox = async (usuario_rolId, rolId, estadoId) => {
        setLoading(true);
        if (usuario_rolId === 0) {
            const data = {
                usuarioId,
                rolId,
                estadoId: 1
            };

            await NuevoRegistro(data);
        } else if (usuario_rolId > 0) {
            let estadoAux = 3;
            if (estadoId === 1) {
                estadoAux = 2;
            } else if (estadoId === 2) {
                estadoAux = 1;
            }
            const data = {
                usuario_rolId,
                estadoId: estadoAux
            };
            await ActualizarRegistro(data);
        }
        setLoading(false);
    }
    const GetRolesAsignados = async (id) => {
        if (accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3)) {
            setLoading(true);
            dispatch(UpdateUserInfo());
            let response = await callApi(`usuario/rol?usuarioId=${id}&estadoId=1;2`);
            if (response) {
                setRolesAsignados(response);
            }
            setLoading(false);
        }
    }

    useEffect(() => {
        GetAccesosByMenuId();
    }, []);

    useEffect(() => {
        GetRolesAsignados(usuarioId);
    }, [usuarioId, accesos]);

    return (
        <Modal show={abrirModal} onHide={() => setAbrirModal(false)} size="lg">
            {
                loading === true ?
                    <Loading />
                    : <>
                        <Modal.Header closeButton>
                            <Modal.Title as="h5">Perfiles</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3) ?
                                    accesos.find(acceso => acceso.menuId === menuIdRol && acceso.accesoId === 3) ?
                                        <Table striped hover responsive bordered id="mytable">
                                            <thead>
                                                <tr>
                                                    <th>Codigo acceso</th>
                                                    <th>Acceso</th>
                                                    {
                                                        (accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 2) || accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 1)) &&
                                                        <th></th>
                                                    }
                                                </tr>

                                            </thead>
                                            <tbody>
                                                {
                                                    catRol.map(({ rolId, nombre }) => {
                                                        const filaRol = catRolesAsignados.find(item => item.rolId === rolId);
                                                        let asignado = false;
                                                        const { usuario_rolId = 0, estadoId = 0 } = !!filaRol && filaRol;
                                                        if (estadoId === 1) {
                                                            asignado = true;
                                                        }
                                                        return (
                                                            (accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 1) || asignado || usuario_rolId > 0) &&
                                                            <tr key={rolId}>
                                                                <td>{rolId}</td>
                                                                <td>{nombre}</td>
                                                                {
                                                                    (estadoId === 1 || estadoId === 2) ?
                                                                        <>{
                                                                            accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 2) ?
                                                                                <td style={{ textAlign: "center" }}>
                                                                                    <Form.Group>
                                                                                        <div className="switch switch-alternative d-inline m-r-10">
                                                                                            <Form.Control type="checkbox" id={`rolId_${rolId}`} checked={asignado} onChange={() => { handleChangeChecbox(usuario_rolId, rolId, estadoId); }} />
                                                                                            <Form.Label htmlFor={`rolId_${rolId}`} className="cr" />
                                                                                        </div>
                                                                                        <Form.Label htmlFor={`rolId_${rolId}`}>{
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
                                                                                                <Form.Control type="checkbox" id={`rolId_${rolId}`} checked={asignado} onChange={() => { handleChangeChecbox(usuario_rolId, rolId, estadoId); }} />
                                                                                                <Form.Label htmlFor={`rolId_${rolId}`} className="cr" />
                                                                                            </div>
                                                                                            <Form.Label htmlFor={`rolId_${rolId}`}>Asignar Perfil</Form.Label>
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
                        </Modal.Body>
                    </>
            }
        </Modal>
    )
}
