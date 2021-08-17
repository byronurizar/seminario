import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useSelector } from 'react-redux';
import Aux from '../../../hoc/_Aux';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { DepartamentoUpSert } from './DepartamentoUpSert';
import { limpiarEstiloTabla, asignarEstiloTabla } from '../../../helpers/estiloTabla';
import { NoAutorizado } from './NoAutorizado';
import Loading from './Loading';
const menuId = 9;
const menuIdRegion = 8;
export const DepartamentoListar = () => {
    const state = useSelector(state => state);
    const [loading, setLoading] = useState(true)
    const [accesos, setAccesos] = useState([]);
    const [abrirModal, setAbrirModal] = useState(false);
    const [catRegiones, setRegiones] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const initData = {
        departamentoId: '',
        regionId: '',
        descripcion: '',
        estadoId: 1
    };

    const GetAccesosByMenuId = () => {
        if (state?.accesos) {
            const { accesos } = state;
            const misAccesos = accesos.filter(item => (item.menuId === menuId || item.menuId === menuIdRegion));
            setAccesos(misAccesos);
        }
        setLoading(false);
    }

    const [dataInicial, setdataInicial] = useState(initData);
    const handleOpenModal = () => {
        setAbrirModal(true);
        setdataInicial(initData);
    }
    const GetRegiones = async () => {
        if (accesos.find(acceso => acceso.menuId === menuIdRegion && acceso.accesoId === 3)) {
            let response = await callApi('region?include=0?estadoId=1');
            if (response) {
                setRegiones(response);
            }
        } else {
            setRegiones([{ regionId: '', descripcion: 'No esta autorizado' }]);
        }
    }
    const GetDepartamentos = async () => {
        if (accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3)) {
            limpiarEstiloTabla("#mytable");
            setLoading(true);
            let response = await callApi('departamento?estadoId=1;2');
            if (response) {
                setDepartamentos(response);
            }
            setLoading(false);
            asignarEstiloTabla("#mytable");
        }
    }
    const handleEditar = (id) => {
        const { departamentoId, regionId, descripcion, estadoId } = departamentos.find(item => item.departamentoId === id);
        setdataInicial({
            departamentoId,
            regionId,
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
                let response = await callApi(`departamento/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    let listActual = departamentos.filter(item => item.departamentoId !== id);
                    setDepartamentos(listActual);
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
        GetDepartamentos();
        GetRegiones();
    }, [accesos]);

    return (
        <Aux>

            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>

                        <Card.Header>
                            <Card.Title as="h5">Departamentos</Card.Title>
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
                                                    <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar departamento</Button>
                                                }
                                            </Col>
                                        </Row>
                                        {
                                            accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3) ?
                                                <Table striped hover responsive bordered id="mytable">
                                                    <thead>
                                                        <tr>
                                                            <th>Codigo</th>
                                                            <th>Departamento</th>
                                                            <th>Región</th>
                                                            <th>Estado</th>
                                                            {
                                                                accesos.find(acceso => (acceso.menuId === menuId && acceso.accesoId === 2) || (acceso.menuId === menuId && acceso.accesoId === 4)) &&
                                                                <th></th>
                                                            }
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            departamentos.map(({ departamentoId, descripcion, Region: { descripcion: region }, Estado: { descripcion: estado } }) => (
                                                                <tr key={departamentoId}>
                                                                    <td>{departamentoId}</td>
                                                                    <td>{descripcion}</td>
                                                                    <td>{region}</td>
                                                                    <td>{estado}</td>
                                                                    {
                                                                        accesos.find(acceso => (acceso.menuId === menuId && acceso.accesoId === 2) || (acceso.menuId === menuId && acceso.accesoId === 4)) &&
                                                                        <td style={{ textAlign: "center" }}>
                                                                            {
                                                                                accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 2) &&
                                                                                <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleEditar(departamentoId) }}><i className="feather icon-edit" /></button>
                                                                            }
                                                                            {
                                                                                accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 4) &&
                                                                                <button className="btn-icon btn btn-danger btn-sm" onClick={() => { handleDelete(departamentoId) }}><i className="feather icon-trash-2" /></button>
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
                                <DepartamentoUpSert abrirModal={abrirModal} setAbrirModal={setAbrirModal} catRegiones={catRegiones} GetDepartamentos={GetDepartamentos} dataInicial={dataInicial} />
                            }

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
