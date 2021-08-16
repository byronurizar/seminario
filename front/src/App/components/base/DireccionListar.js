import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useSelector } from 'react-redux';
import Aux from '../../../hoc/_Aux';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { DireccionUpSert } from './DireccionUpSert';
import { NoAutorizado } from './NoAutorizado';
import Loading from './Loading';
const menuId = 15;
const menuIdDepartamento = 9;
export const DireccionListar = ({ personaId }) => {
    const state = useSelector(state => state);
    const [loading, setLoading] = useState(true)
    const [accesos, setAccesos] = useState([]);
    const [abrirModal, setAbrirModal] = useState(false);
    const [catDepartamento, setCatDepartamento] = useState([]);
    const [direcciones, setDirecciones] = useState([]);
    const initData = {
        personaId,
        municipioId: '',
        direccion: '',
        punto_referencia: '',
        estadoId: 1
    };
    const GetAccesosByMenuId = () => {
        if (state?.accesos) {
            const { accesos } = state;
            const misAccesos = accesos.filter(item => item.menuId === menuId || item.menuId === menuIdDepartamento);
            setAccesos(misAccesos);
        }
        setLoading(false);
    }

    const [dataInicial, setdataInicial] = useState(initData);
    const handleOpenModal = () => {
        setAbrirModal(true);
        setdataInicial(initData);
    }
    const GetDepartamentos = async () => {
        if (accesos.find(acceso => acceso.menuId === menuIdDepartamento && acceso.accesoId === 3)) {
            setLoading(true);
            let response = await callApi('departamento?estadoId=1&include=0');
            if (response) {
                setCatDepartamento(response);
            }
        } else {
            setCatDepartamento([{ departamentoId: '', descripcion: 'No esta autorizado' }]);
        }
        setLoading(false);
    }
    const GetDirecciones = async (id) => {
        if (accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3)) {
            setLoading(true);
            let response = await callApi(`persona/direccion?personaId=${id}&estadoId=1;2`);
            if (response) {
                setDirecciones(response);
            }
        }
        setLoading(false);
    }
    const handleEditar = (id) => {
        const { direccion_personaId, municipioId, direccion, punto_referencia, estadoId, Municipio: { Departamento: { departamentoId } } } = direcciones.find(item => item.direccion_personaId === id);
        setdataInicial({
            direccion_personaId,
            municipioId,
            direccion,
            punto_referencia,
            departamentoId,
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
                let response = await callApi(`persona/direccion/${id}&estadoId=1;2`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    GetDirecciones(personaId);
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
        if(personaId){
        GetDirecciones(personaId);
        }
    }, [personaId, accesos]);
    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Direcciones</Card.Title>
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
                                                    <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar dirección</Button>
                                                }
                                            </Col>
                                        </Row>
                                        {
                                            accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3) ?
                                                <Table striped hover responsive bordered id="table_dentificaciones_persona">
                                                    <thead>
                                                        <tr>
                                                            <th>No.</th>
                                                            <th>Departamento</th>
                                                            <th>Municipio</th>
                                                            <th>Direccion</th>
                                                            <th>Punto de Referencia</th>
                                                            <th>Estado</th>
                                                            {
                                                                accesos.find(acceso => (acceso.menuId === menuId && acceso.accesoId === 2) || (acceso.menuId === menuId && acceso.accesoId === 4)) &&
                                                                <th></th>
                                                            }
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            direcciones.map(({ direccion_personaId, direccion, punto_referencia, Municipio: { descripcion: municipio, Departamento: { descripcion: departamento } }, Estado: { descripcion: estado } }) => (
                                                                <tr key={direccion_personaId}>
                                                                    <td>{direccion_personaId}</td>
                                                                    <td>{departamento}</td>
                                                                    <td>{municipio}</td>
                                                                    <td>{direccion}</td>
                                                                    <td>{punto_referencia}</td>
                                                                    <td>{estado}</td>
                                                                    {
                                                                        accesos.find(acceso => (acceso.menuId === menuId && acceso.accesoId === 2) || (acceso.menuId === menuId && acceso.accesoId === 4)) &&
                                                                        <td style={{ textAlign: "center" }}>
                                                                            {
                                                                                accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 2) &&
                                                                                <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleEditar(direccion_personaId) }}><i className="feather icon-edit" /></button>
                                                                            }
                                                                            {
                                                                                accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 4) &&
                                                                                <button className="btn-icon btn btn-danger btn-sm" onClick={() => { handleDelete(direccion_personaId) }}><i className="feather icon-trash-2" /></button>
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
                                <DireccionUpSert abrirModal={abrirModal} setAbrirModal={setAbrirModal} catDepartamento={catDepartamento} personaId={personaId} GetDirecciones={GetDirecciones} dataInicial={dataInicial} />
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
