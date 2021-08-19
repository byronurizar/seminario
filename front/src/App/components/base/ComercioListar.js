import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useSelector } from 'react-redux';
import Aux from '../../../hoc/_Aux';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { NoAutorizado } from './NoAutorizado';
import Loading from './Loading';
import { asignarEstiloTabla, limpiarEstiloTabla } from '../../../helpers/estiloTabla';
import { ComercioUpSert } from './ComercioUpSert';
import { SucursalListar } from './SucursalListar';
const menuId = 30;
const menuIdSucursal = 31;
export const ComercioListar = () => {
    const state = useSelector(state => state);
    const [loading, setLoading] = useState(true)
    const [itemComercio, setItemComercio] = useState({
        comercioId:'',
        comercioNombre:'',
        mostrarSucursales:false
    });
    const [accesos, setAccesos] = useState([]);
    const [abrirModal, setAbrirModal] = useState(false);
    const [listComercios, setListComercios] = useState([]);
    const initData = {
        comercioId: '',
        nombre: '',
        razon_social: '',
        nit: '',
        telefono: '',
        correo: '',
        estadoId: 1
    };

    const FunMostrarComercios=()=>{
        setItemComercio({
            comercioId:'',
            comercioNombre:'',
            mostrarSucursales:false
        });
    }
    const GetAccesosByMenuId = () => {
        if (state?.accesos) {
            const { accesos } = state;
            const misAccesos = accesos.filter(item => item.menuId === menuId || item.menuId === menuIdSucursal);
            setAccesos(misAccesos);
        }
        setLoading(false);
    }

    const [dataInicial, setdataInicial] = useState(initData);
    const handleOpenModal = () => {
        setAbrirModal(true);
        setdataInicial(initData);
    }

    const GetComercios = async () => {
        if (accesos.find(acceso => acceso.accesoId === 3)) {
            limpiarEstiloTabla("#mytable");
            setLoading(true);
            let response = await callApi(`comercio?estadoId=1;2`);
            if (response) {
                setListComercios(response);
            }
            setLoading(false);
            asignarEstiloTabla("#mytable", 25);
        }
    }
    const handleEditar = (id) => {
        const { comercioId, nombre, razon_social, nit, telefono, correo, estadoId } = listComercios.find(item => item.comercioId === id);
        setdataInicial({
            comercioId,
            nombre,
            razon_social,
            nit,
            telefono,
            correo,
            estadoId
        });
        setAbrirModal(true);
    }
    const handleSucursales = (id,nombre) => {
        setItemComercio({
            comercioId:id,
            comercioNombre:nombre
        })
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
                let response = await callApi(`comercio/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    limpiarEstiloTabla("#mytable");
                    let aux = listComercios.filter(i => Number(i.comercioId) !== Number(id));
                    setListComercios(aux);
                    asignarEstiloTabla("#mytable", 25);
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
        GetComercios();
    }, [accesos]);
    return (
        <>
            {
                itemComercio.mostrarSucursales === false ?
                    <Aux>
                        <Row className='btn-page'>
                            <Col sm={12}>
                                <Card>
                                    <Card.Header>
                                        <Card.Title as="h5">Listado de Comercios</Card.Title>
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
                                                                <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar Comercio</Button>
                                                            }
                                                        </Col>
                                                    </Row>
                                                    {
                                                        accesos.find(acceso => acceso.accesoId === 3) ?
                                                            <Table striped hover responsive bordered id="mytable">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Código</th>
                                                                        <th>Nombre</th>
                                                                        <th>Razon Social</th>
                                                                        <th>Nit</th>
                                                                        <th>Teléfono</th>
                                                                        <th>Correo</th>
                                                                        <th>Estado</th>
                                                                        {
                                                                            accesos.find(acceso => acceso.accesoId === 3 && acceso.menuId === menuIdSucursal) &&
                                                                            <th>Sucursales</th>
                                                                        }
                                                                        {
                                                                            accesos.find(acceso => (acceso.accesoId === 2 && acceso.menuId === menuId) || acceso.accesoId === 4 && acceso.menuId === menuId) &&
                                                                            <th></th>
                                                                        }
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        listComercios.map(({ comercioId, nombre, razon_social, nit, telefono, correo, Estado: { descripcion: estado } }) => (
                                                                            <tr key={comercioId}>
                                                                                <td>{comercioId}</td>
                                                                                <td>{nombre}</td>
                                                                                <td>{razon_social}</td>
                                                                                <td>{nit}</td>
                                                                                <td>{telefono}</td>
                                                                                <td>{correo}</td>
                                                                                <td>{estado}</td>
                                                                                {
                                                                                    accesos.find(acceso => acceso.accesoId === 3 && acceso.menuId === menuIdSucursal) &&
                                                                                    <td style={{ textAlign: "center" }}>
                                                                                        <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleSucursales(comercioId,nombre) }}><i className="feather icon-list" /></button>
                                                                                    </td>
                                                                                }

                                                                                {
                                                                                    accesos.find(acceso => (acceso.accesoId === 2 && acceso.menuId === menuId) || (acceso.accesoId === 4 && acceso.menuId === menuId)) &&
                                                                                    <td style={{ textAlign: "center" }}>
                                                                                        {
                                                                                            accesos.find(acceso => acceso.accesoId === 2) &&
                                                                                            <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleEditar(comercioId) }}><i className="feather icon-edit" /></button>
                                                                                        }
                                                                                        {
                                                                                            accesos.find(acceso => acceso.accesoId === 4) &&
                                                                                            <button className="btn-icon btn btn-danger btn-sm" onClick={() => { handleDelete(comercioId) }}><i className="feather icon-trash-2" /></button>
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
                                            <ComercioUpSert abrirModal={abrirModal} setAbrirModal={setAbrirModal} GetComercios={GetComercios} dataInicial={dataInicial} />
                                        }
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Aux>
                    : <SucursalListar itemComercio={itemComercio}  FunMostrarComercios={FunMostrarComercios}/>
            }
        </>
    );
}
