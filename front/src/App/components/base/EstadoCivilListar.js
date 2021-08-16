import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useSelector } from 'react-redux';
import Aux from '../../../hoc/_Aux';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { EstadoCivilUpSert } from './EstadoCivilUpSert';
import { NoAutorizado } from './NoAutorizado';
import Loading from './Loading';
import { asignarEstiloTabla, limpiarEstiloTabla } from '../../../helpers/estiloTabla';
const menuId = 4;
export const EstadoCivilListar = () => {
    const state = useSelector(state => state);
    const [loading, setLoading] = useState(true)
    const [accesos, setAccesos] = useState([]);
    const [abrirModal, setAbrirModal] = useState(false);
    const [catEstadoCivil, setCatEstadoCivil] = useState([]);
    const initData = {
        estado_civilId: '',
        descripcion: '',
        estadoId: 1
    };

    const [dataInicial, setdataInicial] = useState(initData);
    const GetAccesosByMenuId = () => {
        if (state?.accesos) {
            const { accesos } = state;
            const misAccesos = accesos.filter(item => item.menuId === menuId);
            setAccesos(misAccesos);
        }
        setLoading(false);
    }
    const handleOpenModal = () => {
        setAbrirModal(true);
        setdataInicial(initData);
    }
    const GetCatEstadoCivil = async () => {
        if (accesos.find(acceso => acceso.accesoId === 3)) {
            limpiarEstiloTabla("#mytable");
            setLoading(true);
            let response = await callApi('estadocivil?estadoId=1;2');
            if (response) {
                setCatEstadoCivil(response);
            }
            setLoading(false);
            asignarEstiloTabla("#mytable");
        }
    }
    const handleEditar = (id) => {
        const { estado_civilId, descripcion, estadoId } = catEstadoCivil.find(item => item.estado_civilId === id);
        setdataInicial({
            estado_civilId,
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
                let response = await callApi(`estadocivil/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    let listActual = catEstadoCivil.filter(item => item.estado_civilId !== id);
                    setCatEstadoCivil(listActual);
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
        GetCatEstadoCivil();
    }, [accesos]);
    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Estado Civil</Card.Title>
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
                                                    <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar Estado Civil</Button>
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
                                                            catEstadoCivil.map(({ estado_civilId, descripcion, Estado: { descripcion: estado } }) => (
                                                                <tr key={estado_civilId}>
                                                                    <td>{estado_civilId}</td>
                                                                    <td>{descripcion}</td>
                                                                    <td>{estado}</td>
                                                                    {
                                                                        accesos.find(acceso => acceso.accesoId === 2 || acceso.accesoId === 4) &&
                                                                        <td style={{ textAlign: "center" }}>
                                                                            {
                                                                                accesos.find(acceso => acceso.accesoId === 2) &&
                                                                                <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleEditar(estado_civilId) }}><i className="feather icon-edit" /></button>
                                                                            }
                                                                            {
                                                                                accesos.find(acceso => acceso.accesoId === 4) &&
                                                                                <button className="btn-icon btn btn-danger btn-sm" onClick={() => { handleDelete(estado_civilId) }}><i className="feather icon-trash-2" /></button>
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
                                <EstadoCivilUpSert abrirModal={abrirModal} setAbrirModal={setAbrirModal} GetCatEstadoCivil={GetCatEstadoCivil} dataInicial={dataInicial} />
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
