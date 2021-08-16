import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useSelector } from 'react-redux';
import Aux from '../../../hoc/_Aux';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { TipoTelefonoUpSert } from './TipoTelefonoUpSert';
import { NoAutorizado } from './NoAutorizado';
import Loading from './Loading';
const menuId = 7;
export const TipoTelefonoListar = () => {
    const state = useSelector(state => state);
    const [loading, setLoading] = useState(true)
    const [accesos, setAccesos] = useState([]);
    const [abrirModal, setAbrirModal] = useState(false);
    const [catTipoTelefono, setCatTipoTelefono] = useState([]);
    const initData = {
        tipo_telefonoId: '',
        descripcion: '',
        estadoId: 1
    };

    const GetAccesosByMenuId = () => {
        if (state?.accesos) {
            const { accesos } = state;
            const misAccesos = accesos.filter(item => item.menuId === menuId);
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
        if (accesos.find(acceso => acceso.accesoId === 3)) {
            setLoading(true);
            let response = await callApi('tipotelefono?estadoId=1;2');
            if (response) {
                setCatTipoTelefono(response);
            }
        }
        setLoading(false);
    }
    const handleEditar = (id) => {
        const { tipo_telefonoId, descripcion, estadoId } = catTipoTelefono.find(item => item.tipo_telefonoId === id);
        setdataInicial({
            tipo_telefonoId,
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
                let response = await callApi(`tipotelefono/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    let listActual = catTipoTelefono.filter(item => item.tipo_telefonoId !== id);
                    setCatTipoTelefono(listActual);
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
    }, [accesos]);
    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Tipos de Teléfono</Card.Title>
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
                                                    accesos.find(acceso => acceso.accesoId === 1) &&
                                                    <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar Tipo Teléfono</Button>
                                                }
                                            </Col>
                                        </Row>
                                        {
                                            accesos.find(acceso => acceso.accesoId === 3) ?
                                                <Table striped hover responsive bordered id="mytable">
                                                    <thead>
                                                        <tr>
                                                            <th>Código</th>
                                                            <th>Descripción</th>
                                                            <th>Estado</th>
                                                            {
                                                                accesos.find(acceso => acceso.accesoId === 2 || acceso.accesoId === 4) &&
                                                                <th></th>
                                                            }
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            catTipoTelefono.map(({ tipo_telefonoId, descripcion, Estado: { descripcion: estado } }) => (
                                                                <tr key={tipo_telefonoId}>
                                                                    <td>{tipo_telefonoId}</td>
                                                                    <td>{descripcion}</td>
                                                                    <td>{estado}</td>
                                                                    {
                                                                        accesos.find(acceso => acceso.accesoId === 2 || acceso.accesoId === 4) &&
                                                                        <td style={{ textAlign: "center" }}>
                                                                            {
                                                                                accesos.find(acceso => acceso.accesoId === 2) &&
                                                                                <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleEditar(tipo_telefonoId) }}><i className="feather icon-edit" /></button>
                                                                            }
                                                                            {
                                                                                accesos.find(acceso => acceso.accesoId === 4) &&
                                                                                <button className="btn-icon btn btn-danger btn-sm" onClick={() => { handleDelete(tipo_telefonoId) }}><i className="feather icon-trash-2" /></button>
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
                                <TipoTelefonoUpSert abrirModal={abrirModal} setAbrirModal={setAbrirModal} GetTipoTelefono={GetTipoTelefono} dataInicial={dataInicial} />
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
