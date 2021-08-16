import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useSelector } from 'react-redux';
import Aux from '../../../hoc/_Aux';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { TelefonoUpSert } from './TelefonoUpSert';
import { NoAutorizado } from './NoAutorizado';
import Loading from './Loading';
const menuId = 14;
const menuIdTipoTelefono = 7;
export const TelefonoListar = ({ personaId }) => {
    const state = useSelector(state => state);
    const [accesos, setAccesos] = useState([]);
    const [loading, setLoading] = useState(true)
    const [abrirModal, setAbrirModal] = useState(false);
    const [catTipoTelefono, setCatTipoTelefono] = useState([]);
    const [telefonos, setTelefonos] = useState([]);
    const initData = {
        personaId,
        tipo_telefonoId: '',
        telefono: '',
        estadoId: 1
    };

    const GetAccesosByMenuId = () => {
        if (state?.accesos) {
            const { accesos } = state;
            const misAccesos = accesos.filter(item => item.menuId === menuId || item.menuId === menuIdTipoTelefono);
            setAccesos(misAccesos);
        }
        setLoading(false);
    }

    const [dataInicial, setdataInicial] = useState(initData);
    const handleOpenModal = () => {
        setAbrirModal(true);
        setdataInicial(initData);
    }
    const GetTipoTelefono = async () => {
        if (accesos.find(acceso => acceso.menuId === menuIdTipoTelefono && acceso.accesoId === 3)) {
            setLoading(true);
            let response = await callApi('tipotelefono?estadoId=1&include=0');
            if (response) {
                setCatTipoTelefono(response);
            }
        } else {
            setCatTipoTelefono([{ tipo_telefonoId: '', descripcion: 'No esta autorizado' }]);
        }
        setLoading(false);
    }
    const GetTelefonos = async (id) => {
        if (accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3)) {
            setLoading(true);
            let response = await callApi(`persona/telefono?personaId=${id}&estadoId=1;2`);
            if (response) {
                setTelefonos(response);
            }
        }
        setLoading(false);
    }

    const handleEditar = (id) => {
        const { telefono_personaId, tipo_telefonoId, telefono, estadoId } = telefonos.find(item => item.telefono_personaId === id);
        setdataInicial({
            telefono_personaId,
            tipo_telefonoId,
            telefono,
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
                let response = await callApi(`persona/telefono/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    GetTelefonos(personaId);
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
        GetTipoTelefono();
        if (personaId) {
            GetTelefonos(personaId);
        }
    }, [personaId, accesos]);
    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Documentos de identificación</Card.Title>
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
                                                    <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar teléfono</Button>
                                                }
                                            </Col>
                                        </Row>
                                        {
                                            accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3) ?
                                                <Table striped hover responsive bordered id="table_dentificaciones_persona">
                                                    <thead>
                                                        <tr>
                                                            <th>No.</th>
                                                            <th>Tipo</th>
                                                            <th>Número</th>
                                                            <th>Estado</th>
                                                            {
                                                                accesos.find(acceso => (acceso.menuId === menuId && acceso.accesoId === 2) || (acceso.menuId === menuId && acceso.accesoId === 4)) &&
                                                                <th></th>
                                                            }
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            telefonos.map(({ telefono_personaId, TipoTelefono: { descripcion: tipoTelefono }, telefono, Estado: { descripcion: estado } }) => (
                                                                <tr key={telefono_personaId}>
                                                                    <td>{telefono_personaId}</td>
                                                                    <td>{tipoTelefono}</td>
                                                                    <td>{telefono}</td>
                                                                    <td>{estado}</td>
                                                                    {
                                                                        accesos.find(acceso => (acceso.menuId === menuId && acceso.accesoId === 2) || (acceso.menuId === menuId && acceso.accesoId === 4)) &&
                                                                        <td style={{ textAlign: "center" }}>
                                                                            {
                                                                                accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 2) &&
                                                                                <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleEditar(telefono_personaId) }}><i className="feather icon-edit" /></button>
                                                                            }
                                                                            {
                                                                                accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 4) &&
                                                                                <button className="btn-icon btn btn-danger btn-sm" onClick={() => { handleDelete(telefono_personaId) }}><i className="feather icon-trash-2" /></button>
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
                                <TelefonoUpSert abrirModal={abrirModal} setAbrirModal={setAbrirModal} catTipoTelefono={catTipoTelefono} personaId={personaId} GetTelefonos={GetTelefonos} dataInicial={dataInicial} />
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
