import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useSelector } from 'react-redux'; 
import Aux from '../../../hoc/_Aux';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { PaisUpSert } from './PaisUpSert';
import { NoAutorizado } from './NoAutorizado';
import Loading from './Loading';
const menuId = 8;
export const PaisListar = () => {
    const state = useSelector(state => state);
    const [loading, setLoading] = useState(true)
    const [accesos, setAccesos] = useState([]);
    const [abrirModal, setAbrirModal] = useState(false);
    const [paises, setPaises] = useState([]);
    const initData = {
        paisId: '',
        descripcion: '',
        nacionalidad: '',
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

    const GetPaises = async () => {
        if (accesos.find(acceso => acceso.accesoId === 3)) {
            setLoading(true);
            let response = await callApi(`pais?estadoId=1;2`);
            if (response) {
                setPaises(response);
            }
        }
        setLoading(false);
    }
    const handleEditar = (id) => {
        const { paisId, descripcion, nacionalidad, estadoId } = paises.find(item => item.paisId === id);
        setdataInicial({
            paisId,
            descripcion,
            nacionalidad,
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
                let response = await callApi(`pais/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    GetPaises();
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
        GetPaises();
    }, [accesos]);
    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Pais</Card.Title>
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
                                                    <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar Pais</Button>
                                                }
                                            </Col>
                                        </Row>
                                        {
                                            accesos.find(acceso => acceso.accesoId === 3) ?
                                                <Table striped hover responsive bordered id="table_dentificaciones_persona">
                                                    <thead>
                                                        <tr>
                                                            <th>Código</th>
                                                            <th>Nombre</th>
                                                            <th>Nacionalidad</th>
                                                            <th>Estado</th>
                                                            {
                                                                accesos.find(acceso => acceso.accesoId === 2 || acceso.accesoId === 4) &&
                                                                <th></th>
                                                            }
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            paises.map(({ paisId, descripcion, nacionalidad, Estado: { descripcion: estado } }) => (
                                                                <tr key={paisId}>
                                                                    <td>{paisId}</td>
                                                                    <td>{descripcion}</td>
                                                                    <td>{nacionalidad}</td>
                                                                    <td>{estado}</td>
                                                                    {
                                                                        accesos.find(acceso => acceso.accesoId === 2 || acceso.accesoId === 4) &&
                                                                        <td style={{ textAlign: "center" }}>
                                                                            {
                                                                                accesos.find(acceso => acceso.accesoId === 2) &&
                                                                                <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleEditar(paisId) }}><i className="feather icon-edit" /></button>
                                                                            }
                                                                            {
                                                                                accesos.find(acceso => acceso.accesoId === 4) &&
                                                                                <button className="btn-icon btn btn-danger btn-sm" onClick={() => { handleDelete(paisId) }}><i className="feather icon-trash-2" /></button>
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
                                <PaisUpSert abrirModal={abrirModal} setAbrirModal={setAbrirModal} GetPaises={GetPaises} dataInicial={dataInicial} />
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
