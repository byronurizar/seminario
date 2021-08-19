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
const menuId = 31;
const menuIdRegion = 8;
const menuIdDepartamento = 9;
const menuIdMunicipio = 10;
export const SucursalListar = ({itemComercio,FunMostrarComercios}) => {
    const state = useSelector(state => state);
    const [loading, setLoading] = useState(true)
    const [accesos, setAccesos] = useState([]);
    const [abrirModal, setAbrirModal] = useState(false);
    const [catRegiones, setRegiones] = useState([]);
    const [listSucursales, setListSucursales] = useState([]);
    const initData = {
        comercioId: '',
        nombre: '',
        municipioId: '',
        direccion: '',
        telefono:'',
        correo:'',
        regionId:'',
        departamentoId:'',
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

    const GetSucursales = async (comercioId) => {
        if (accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3)) {
            limpiarEstiloTabla("#tableSucursales");
            setLoading(true);
            let response = await callApi(`sucursal?comercioId=${itemComercio.comercioId}&estado=1;2`);
            if (response) {
                setListSucursales(response);
            }
            setLoading(false);
            asignarEstiloTabla("#tableSucursales");
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
        const { sucursalId, comercioId, nombre, municipioId, direccion,telefono,correo, estadoId,Municipio:{Departamento:{departamentoId,regionId}} } = listSucursales.find(item => item.sucursalId === id);
        setdataInicial({
            sucursalId,
            comercioId,
            nombre,
            municipioId,
            direccion,
            telefono,
            correo,
            regionId,
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
                let response = await callApi(`sucursal/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    limpiarEstiloTabla("#tableSucursales");
                    let listActual = listSucursales.filter(item => item.sucursalId !== id);
                    setListSucursales(listActual);
                    asignarEstiloTabla("#tableSucursales");
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
        GetSucursales(itemComercio.comercioId);
        GetRegiones();
    }, [accesos]);

    return (
        <Aux>

            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>

                        <Card.Header>
                            <Card.Title as="h5">{`Listado de Sucursales del Comercio - ${itemComercio.comercioNombre}`}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            {
                                loading === true ?
                                    <Loading />
                                    : <>
                                        <Row className="align-items-center m-l-0">
                                        <Col className="text-left">
                                                    <Button variant="warning" className="btn-sm btn-round has-ripple" onClick={()=>{FunMostrarComercios()}}><i className="feather icon-arrow-left" /> Regresar</Button>
                                            </Col>
                                            <Col className="text-right">
                                                {
                                                    accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 1) &&
                                                    <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar Sucursal</Button>
                                                }
                                            </Col>
                                        </Row>
                                        {
                                            accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3) ?
                                                <Table striped hover responsive bordered id="tableSucursales">
                                                    <thead>
                                                        <tr>
                                                            <th>No</th>
                                                            <th>Nombre</th>
                                                            <th>Region</th>
                                                            <th>Departamento</th>
                                                            <th>Municipio</th>
                                                            <th>Dirección</th>
                                                            <th>Teléfono</th>
                                                            <th>Correo</th>
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
                                                            listSucursales.map(({ sucursalId, nombre, direccion, fecha_crea,telefono,correo, Municipio, Estado: { descripcion: estado } }) => {
                                                                let { descripcion: descMunicipio, Departamento } = Municipio;
                                                                let { descripcion: descDepto, Region } = Departamento;
                                                                let { descripcion: descRegion } = Region;
                                                                return (
                                                                    <tr key={sucursalId}>
                                                                        <td>{sucursalId}</td>
                                                                        <td>{nombre}</td>
                                                                        <td>{descRegion}</td>
                                                                        <td>{descDepto}</td>
                                                                        <td>{descMunicipio}</td>
                                                                        <td>{direccion}</td>
                                                                        <td>{telefono}</td>
                                                                        <td>{correo}</td>
                                                                        <td>{moment(fecha_crea).format('DD/MM/YYYY')}</td>
                                                                        <td>{estado}</td>
                                                                        {
                                                                            accesos.find(acceso => (acceso.menuId === menuId && acceso.accesoId === 2) || (acceso.menuId === menuId && acceso.accesoId === 4)) &&
                                                                            <td style={{ textAlign: "center" }}>
                                                                                {
                                                                                    accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 2) &&
                                                                                    <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleEditar(sucursalId) }}><i className="feather icon-edit" /></button>
                                                                                }
                                                                                {
                                                                                    accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 4) &&
                                                                                    <button className="btn-icon btn btn-danger btn-sm" onClick={() => { handleDelete(sucursalId) }}><i className="feather icon-trash-2" /></button>
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
                                <SedeDiacoUpSert abrirModal={abrirModal} setAbrirModal={setAbrirModal} catRegiones={catRegiones} GetSucursales={GetSucursales} dataInicial={dataInicial} accesos={accesos} />
                            }

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
