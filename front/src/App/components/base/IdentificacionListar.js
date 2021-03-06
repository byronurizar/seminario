import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useSelector } from 'react-redux';
import callApi from '../../../helpers/conectorApi';
import Aux from '../../../hoc/_Aux';
import { IdentificacionUpSert } from './IdentificacionUpSert';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { NoAutorizado } from './NoAutorizado';
import Loading from './Loading';
const menuId = 13;
const menuIdTipoDocumento = 5;
export const IdentificacionListar = ({ personaId }) => {
    const state = useSelector(state => state);
    const [loading, setLoading] = useState(true)
    const [accesos, setAccesos] = useState([]);
    const [abrirModal, setAbrirModal] = useState(false);
    const [catTipoDocumento, setCatTipoDocumento] = useState([]);
    const [identificaciones, setIdentificaciones] = useState([]);
    const initData = {
        personaId,
        tipo_documentoId: '',
        numero_identificacion: '',
        estadoId: 1
    };

    const GetAccesosByMenuId = () => {
        if (state?.accesos) {
            const { accesos } = state;
            const misAccesos = accesos.filter(item => item.menuId === menuId || item.menuId === menuIdTipoDocumento);
            setAccesos(misAccesos);
        }
        setLoading(false);
    }

    const [dataInicial, setdataInicial] = useState(initData);
    const handleOpenModal = () => {
        setAbrirModal(true);
        setdataInicial(initData);
    }
    const GetTiposIdentificaciones = async () => {
        if (accesos.find(acceso => acceso.menuId === menuIdTipoDocumento && acceso.accesoId === 3)) {
            setLoading(true);
            let response = await callApi('tipodocumento?estadoId=1&include=0');
            if (response) {
                setCatTipoDocumento(response);
            }
        } else {
            setCatTipoDocumento([{ tipo_documentoId: '', descripcion: 'No esta autorizado' }]);
        }
        setLoading(false);
    }
    const GetIdentificaciones = async (id) => {
        if (accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3)) {
            setLoading(true);
            let response = await callApi(`persona/identificacion?personaId=${id}&estadoId=1;2`);
            if (response) {
                setIdentificaciones(response);
            }
        }
        setLoading(false);
    }
    const handleEditar = (id) => {
        const { identificacion_personaId, tipo_documentoId, numero_identificacion, estadoId } = identificaciones.find(item => item.identificacion_personaId === id);
        setdataInicial({
            identificacion_personaId,
            tipo_documentoId,
            numero_identificacion,
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
                let response = await callApi(`persona/identificacion/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    GetIdentificaciones(personaId);
                }
            } else {
                alert_warning('No se elimin?? ning??n elemento');
            }
        });
    }

    useEffect(() => {
        GetAccesosByMenuId();
    }, []);

    useEffect(() => {
        GetTiposIdentificaciones();
        if (personaId) {
            GetIdentificaciones(personaId);
        }
    }, [personaId, accesos]);
    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Documentos de identificaci??n</Card.Title>
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
                                                    <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar documento</Button>
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
                                                            <th>N??mero</th>
                                                            <th>Estado</th>
                                                            {
                                                                accesos.find(acceso => (acceso.menuId === menuId && acceso.accesoId === 2) || (acceso.menuId === menuId && acceso.accesoId === 4)) &&
                                                                <th></th>
                                                            }
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            identificaciones.map(({ identificacion_personaId, TipoDocumento: { descripcion: tipoDoc }, numero_identificacion, Estado: { descripcion: estado } }) => (
                                                                <tr key={identificacion_personaId}>
                                                                    <td>{identificacion_personaId}</td>
                                                                    <td>{tipoDoc}</td>
                                                                    <td>{numero_identificacion}</td>
                                                                    <td>{estado}</td>
                                                                    {
                                                                        accesos.find(acceso => (acceso.menuId === menuId && acceso.accesoId === 2) || (acceso.menuId === menuId && acceso.accesoId === 4)) &&
                                                                        <td style={{ textAlign: "center" }}>
                                                                            {
                                                                                accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 2) &&
                                                                                <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleEditar(identificacion_personaId) }}><i className="feather icon-edit" /></button>
                                                                            }
                                                                            {
                                                                                accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 4) &&
                                                                                <button className="btn-icon btn btn-danger btn-sm" onClick={() => { handleDelete(identificacion_personaId) }}><i className="feather icon-trash-2" /></button>
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
                                <IdentificacionUpSert abrirModal={abrirModal} setAbrirModal={setAbrirModal} catTipoDocumento={catTipoDocumento} personaId={personaId} GetIdentificaciones={GetIdentificaciones} dataInicial={dataInicial} />
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
