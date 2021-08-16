import React, { useEffect, useState } from 'react'
import { Table, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUserInfo } from '../../../actions/auth';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso } from '../../../helpers/Notificacion';
import { NoAutorizado } from './NoAutorizado';
import Loading from './Loading';
const menuId = 19;
export const MenuAcceso = ({ menuId: idMenu, abrirModal, setAbrirModal, catAcceso }) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [accesos, setAccesos] = useState([]);
    const [catAccesosAsignados, setCatAccesosAsignado] = useState([]);

    const GetAccesosByMenuId = () => {
        if (state?.accesos) {
            const { accesos } = state;
            const misAccesos = accesos.filter(item => item.menuId === menuId);
            setAccesos(misAccesos);
        }
        setLoading(false);
    }

    const NuevoRegistro = async (data) => {
        let response = await callApi('menuacceso', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        if (response) {
            alert_exitoso("Acceso asignado exitosamente");
            dispatch(UpdateUserInfo());
            GetAccesosAsignado(idMenu);
        }
    }
    const ActualizarRegistro = async (data) => {
        let response = await callApi('menuacceso', {
            method: 'PUT',
            body: JSON.stringify(data)
        });

        if (response) {
            alert_exitoso(response);
            dispatch(UpdateUserInfo());
            GetAccesosAsignado(idMenu);
        }
    }

    const handleChangeChecbox = async (menu_accesoId, accesoId, estadoId) => {
        setLoading(true);
        if (menu_accesoId === 0) {
            const data = {
                menuId: idMenu,
                accesoId,
                estadoId: 1
            };

            await NuevoRegistro(data);
        } else if (menu_accesoId > 0) {
            let estadoAux = 3;
            if (estadoId === 1) {
                estadoAux = 2;
            } else if (estadoId === 2) {
                estadoAux = 1;
            }
            const data = {
                menu_accesoId,
                accesoId,
                estadoId: estadoAux
            };
            await ActualizarRegistro(data);
        }
        setLoading(false);
    }
    const GetAccesosAsignado = async (id) => {
        if (accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3)) {
            setLoading(true);
            let response = await callApi(`menuacceso?menuId=${id}&estadoId=1;2`);
            if (response) {
                setCatAccesosAsignado(response);
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        GetAccesosByMenuId();
    }, []);

    useEffect(() => {
        GetAccesosAsignado(idMenu);
    }, [idMenu, accesos]);

    return (
        <Modal show={abrirModal} onHide={() => setAbrirModal(false)} size="lg">
            <Modal.Header closeButton>
                <Modal.Title as="h5">Acciones</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    loading === true ?
                        <Loading />
                        : <>
                            {
                                accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3) ?
                                    <Table striped hover responsive bordered id="mytable">
                                        <thead>
                                            <tr>
                                                <th>Codigo acceso</th>
                                                <th>Acceso</th>
                                                {
                                                    (accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 1) || accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 2)) &&
                                                    <th>Estado</th>
                                                }
                                            </tr>

                                        </thead>
                                        <tbody>
                                            {
                                                catAcceso.map(({ accesoId, descripcion }) => {
                                                    const filaAcceso = catAccesosAsignados.find(item => item.accesoId === accesoId);

                                                    let asignado = false;
                                                    const { menu_accesoId = 0, estadoId = 0 } = !!filaAcceso && filaAcceso;
                                                    if (estadoId === 1) {
                                                        asignado = true;
                                                    }
                                                    return (
                                                        (accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 1) || asignado || menu_accesoId > 0) &&
                                                        <tr key={accesoId}>
                                                            <td>{accesoId}</td>
                                                            <td>{descripcion}</td>
                                                            {
                                                                (estadoId === 1 || estadoId === 2) ?
                                                                    <>{
                                                                        accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 2) ?
                                                                            <td style={{ textAlign: "center" }}>
                                                                                <Form.Group>
                                                                                    <div className="switch switch-alternative d-inline m-r-10">
                                                                                        <Form.Control type="checkbox" id={`accesoid_${accesoId}`} checked={asignado} onChange={() => { handleChangeChecbox(menu_accesoId, accesoId, estadoId); }} />
                                                                                        <Form.Label htmlFor={`accesoid_${accesoId}`} className="cr" />
                                                                                    </div>
                                                                                    <Form.Label htmlFor={`accesoid_${accesoId}`}>{
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
                                                                            accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 1) &&
                                                                            <td style={{ textAlign: "center" }}>
                                                                                <Form.Group>
                                                                                    <div className="switch switch-alternative d-inline m-r-10">
                                                                                        <Form.Control type="checkbox" id={`accesoid_${accesoId}`} checked={asignado} onChange={() => { handleChangeChecbox(menu_accesoId, accesoId, estadoId); }} />
                                                                                        <Form.Label htmlFor={`accesoid_${accesoId}`} className="cr" />
                                                                                    </div>
                                                                                    <Form.Label htmlFor={`accesoid_${accesoId}`}>Asignar acceso a menu</Form.Label>
                                                                                </Form.Group>
                                                                            </td>
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
                            }
                        </>
                }
            </Modal.Body>
        </Modal>
    )
}
