import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import Aux from '../../../hoc/_Aux';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { TipoDocumentoUpSert } from './TipoDocumentoUpSert';
import { NoAutorizado } from './NoAutorizado';
import Loading from './Loading';
const menuId = 5;
export const TipoDocumentoListar = () => {
    const state = useSelector(state => state);
    const [loading, setLoading] = useState(true)
    const [accesos, setAccesos] = useState([]);
    const [abrirModal, setAbrirModal] = useState(false);
    const [catTipoDocumento, setCatTipoDocumento] = useState([]);
    const initData = {
        tipo_documentoId: '',
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
    const GetTiposIdentificaciones = async () => {
        if (accesos.find(acceso => acceso.accesoId === 3)) {
            setLoading(true);
            let response = await callApi('tipodocumento?estadoId=1;2');
            if (response) {
                setCatTipoDocumento(response);
            }
        }
        setLoading(false);
    }
    const handleEditar = (id) => {
        const { tipo_documentoId, descripcion, estadoId } = catTipoDocumento.find(item => item.tipo_documentoId === id);
        setdataInicial({
            tipo_documentoId,
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
                let response = await callApi(`tipodocumento/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    let listActual = catTipoDocumento.filter(item => item.tipo_documentoId !== id);
                    setCatTipoDocumento(listActual);
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
        GetTiposIdentificaciones();
    }, [accesos]);
    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Tipos de documentos de identificación</Card.Title>
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
                                                    <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar Tipo Documento</Button>
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
                                                            catTipoDocumento.map(({ tipo_documentoId, descripcion, Estado: { descripcion: estado } }) => (
                                                                <tr key={tipo_documentoId}>
                                                                    <td>{tipo_documentoId}</td>
                                                                    <td>{descripcion}</td>
                                                                    <td>{estado}</td>
                                                                    {
                                                                        accesos.find(acceso => acceso.accesoId === 2 || acceso.accesoId === 4) &&
                                                                        <td style={{ textAlign: "center" }}>
                                                                            {
                                                                                accesos.find(acceso => acceso.accesoId === 2) &&
                                                                                <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleEditar(tipo_documentoId) }}><i className="feather icon-edit" /></button>
                                                                            }
                                                                            {
                                                                                accesos.find(acceso => acceso.accesoId === 4) &&
                                                                                <button className="btn-icon btn btn-danger btn-sm" onClick={() => { handleDelete(tipo_documentoId) }}><i className="feather icon-trash-2" /></button>
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
                                <TipoDocumentoUpSert abrirModal={abrirModal} setAbrirModal={setAbrirModal} GetTiposIdentificaciones={GetTiposIdentificaciones} dataInicial={dataInicial} />
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
