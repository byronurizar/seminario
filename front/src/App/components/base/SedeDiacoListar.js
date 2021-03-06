import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useSelector } from 'react-redux';
import Aux from '../../../hoc/_Aux';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { limpiarEstiloTabla, asignarEstiloTabla } from '../../../helpers/estiloTabla';
import { NoAutorizado } from './NoAutorizado';
import Loading from './Loading';
import { SedeDiacoUpSert } from './SedeDiacoUpSert';
const menuId = 29;
const menuIdRegion = 8;
const menuIdDepartamento = 9;
const menuIdMunicipio = 10;
export const SedeDiacoListar = () => {
    const state = useSelector(state => state);
    const [loading, setLoading] = useState(true)
    const [accesos, setAccesos] = useState([]);
    const [abrirModal, setAbrirModal] = useState(false);
    const [catRegiones, setRegiones] = useState([]);
    const [listSedes, setListSedes] = useState([]);
    const initData = {
        codigo: '',
        nombre: '',
        municipioId: '',
        descripcion: '',
        departamentoId:'',
        regionId:'',
        estadoId: 1
    };

    const GetAccesosByMenuId = () => {
        if (state?.accesos) {
            const { accesos } = state;
            const misAccesos = accesos.filter(item => (item.menuId === menuId || item.menuId === menuIdRegion || item.menuId === menuIdDepartamento || item.menuId === menuIdMunicipio));
            setAccesos(misAccesos);
        }
        setLoading(false);
    }

    const [dataInicial, setdataInicial] = useState(initData);
    const handleOpenModal = () => {
        setAbrirModal(true);
        setdataInicial(initData);
    }

    const GetSedes = async () => {
        if (accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3)) {
            limpiarEstiloTabla("#mytable");
            setLoading(true);
            let response = await callApi('sedediaco?estadoId=1;2');
            if (response) {
                setListSedes(response);
            }
            setLoading(false);
            asignarEstiloTabla("#mytable");
        }
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
    
    const handleEditar = (id) => {
        const { sede_diacoId, codigo, nombre, municipioId, descripcion, estadoId,Municipio:{Departamento:{departamentoId,regionId}} } = listSedes.find(item => item.sede_diacoId === id);
        setdataInicial({
            sede_diacoId,
            codigo,
            nombre,
            municipioId,
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
                let response = await callApi(`sedediaco/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    limpiarEstiloTabla("#mytable");
                    let listActual = listSedes.filter(item => item.sede_diacoId !== id);
                    setListSedes(listActual);
                    asignarEstiloTabla("#mytable");
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
        GetSedes();
        GetRegiones();
    }, [accesos]);

    return (
        <Aux>

            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>

                        <Card.Header>
                            <Card.Title as="h5">Listado de Sedes Diaco</Card.Title>
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
                                                    <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar Sede</Button>
                                                }
                                            </Col>
                                        </Row>
                                        {
                                            accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3) ?
                                                <Table striped hover responsive bordered id="mytable">
                                                    <thead>
                                                        <tr>
                                                            <th>No</th>
                                                            <th>C??digo Interno</th>
                                                            <th>Nombre</th>
                                                            <th>Descripcion</th>
                                                            <th>Region</th>
                                                            <th>Departamento</th>
                                                            <th>Municipio</th>
                                                            <th>Fecha Ingreso</th>
                                                            <th>Estado</th>
                                                            {
                                                                accesos.find(acceso => (acceso.menuId === menuId && acceso.accesoId === 2) || (acceso.menuId === menuId && acceso.accesoId === 4)) &&
                                                                <th></th>
                                                            }
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            listSedes.map(({ sede_diacoId, codigo, nombre, descripcion, fecha_crea, Municipio, Estado: { descripcion: estado } }) => {
                                                                let { descripcion: descMunicipio, Departamento } = Municipio;
                                                                let { descripcion: descDepto, Region } = Departamento;
                                                                let { descripcion: descRegion } = Region;
                                                                return (
                                                                    <tr key={sede_diacoId}>
                                                                        <td>{sede_diacoId}</td>
                                                                        <td>{codigo}</td>
                                                                        <td>{nombre}</td>
                                                                        <td>{descripcion}</td>
                                                                        <td>{descRegion}</td>
                                                                        <td>{descDepto}</td>
                                                                        <td>{descMunicipio}</td>
                                                                        <td>{moment(fecha_crea).format('DD/MM/YYYY')}</td>
                                                                        <td>{estado}</td>
                                                                        {
                                                                            accesos.find(acceso => (acceso.menuId === menuId && acceso.accesoId === 2) || (acceso.menuId === menuId && acceso.accesoId === 4)) &&
                                                                            <td style={{ textAlign: "center" }}>
                                                                                {
                                                                                    accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 2) &&
                                                                                    <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleEditar(sede_diacoId) }}><i className="feather icon-edit" /></button>
                                                                                }
                                                                                {
                                                                                    accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 4) &&
                                                                                    <button className="btn-icon btn btn-danger btn-sm" onClick={() => { handleDelete(sede_diacoId) }}><i className="feather icon-trash-2" /></button>
                                                                                }
                                                                            </td>
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
                            {
                                abrirModal === true &&
                                <SedeDiacoUpSert abrirModal={abrirModal} setAbrirModal={setAbrirModal} catRegiones={catRegiones} GetSedes={GetSedes} dataInicial={dataInicial} accesos={accesos} />
                            }

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
