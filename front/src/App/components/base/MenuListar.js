import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import Aux from '../../../hoc/_Aux';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { MenuUpSert } from './MenuUpSert';
import { MenuAcceso } from './MenuAcceso';
import { limpiarEstiloTabla, asignarEstiloTabla } from '../../../helpers/estiloTabla';
import { NoAutorizado } from './NoAutorizado';
import { UpdateUserInfo } from '../../../actions/auth';
import Loading from './Loading';
const menuId = 21;
const menuIdAcceso = 1;
export const MenuListar = () => {
    const state = useSelector(state => state);
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    const [accesos, setAccesos] = useState([]);
    const [abrirModal, setAbrirModal] = useState(false);
    const [abrirModalacceso, setAbrirModalAcceso] = useState(false);
    const [catMenu, setCatMenu] = useState([]);
    const [catAcceso, setCatAcceso] = useState([]);
    const initData = {
        menuId: '',
        posicion: '',
        descripcion: '',
        href: '',
        visible: '',
        classes: '',
        type: '',
        icono: '',
        menu_padreId: 0,
        estadoId: 1
    };

    const GetAccesosByMenuId = () => {
        if (state?.accesos) {
            const { accesos } = state;
            const misAccesos = accesos.filter(item => item.menuId === menuId || item.menuId === menuIdAcceso);
            setAccesos(misAccesos);
        }
        setLoading(false);
    }

    const [dataInicial, setdataInicial] = useState(initData);
    const handleOpenModal = () => {
        setAbrirModal(true);
        setdataInicial(initData);
    }
    const GetCatMenu = async () => {
        if (accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3)) {
            limpiarEstiloTabla("#mytable");
            setLoading(true);
            let response = await callApi('menu?estadoId=1;2');
            if (response) {
                setCatMenu(response);
            }
        }
        setLoading(false);
        asignarEstiloTabla("#mytable");
    }
    const handleEditar = (id) => {
        const { menuId, posicion, descripcion, href, icono, menu_padreId, estadoId, visible, classes, type } = catMenu.find(item => item.menuId === id);
        setdataInicial({
            menuId,
            posicion,
            descripcion,
            href,
            icono,
            visible,
            classes,
            type,
            menu_padreId,
            estadoId
        });
        setAbrirModal(true);
    }
    const handleAcceso = (id) => {
        const { menuId, posicion, descripcion, href, icono, menu_padreId, estadoId } = catMenu.find(item => item.menuId === id);
        setdataInicial({
            menuId,
            posicion,
            descripcion,
            href,
            icono,
            menu_padreId,
            estadoId
        });
        setAbrirModalAcceso(true);
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
                let response = await callApi(`menu/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    dispatch(UpdateUserInfo());
                    let listActual = catMenu.filter(item => item.menuId !== id);
                    setCatMenu(listActual);
                }
            } else {
                alert_warning('No se eliminó ningún elemento');
            }
        });
    }
    const GetAccesos = async () => {
        if (accesos.find(acceso => acceso.menuId === menuIdAcceso && acceso.accesoId === 3)) {
            let response = await callApi('acceso?estadoId=1');
            if (response) {
                setCatAcceso(response);
            }
        }
    }

    useEffect(() => {
        GetAccesosByMenuId();
    }, []);

    useEffect(() => {
        GetCatMenu();
        GetAccesos();
    }, [accesos]);
    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Menu</Card.Title>
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
                                                    <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar Menu</Button>
                                                }
                                            </Col>
                                        </Row>
                                        {
                                            accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3) ?
                                                <Table striped hover responsive bordered id="mytable">
                                                    <thead>
                                                        <tr>
                                                            <th>Código</th>
                                                            <th>Descripción</th>
                                                            <th>Posición</th>
                                                            <th>Href</th>
                                                            <th>Icono</th>
                                                            <th>Menu Padre</th>
                                                            <th>Estado</th>
                                                            {
                                                                accesos.find(acceso => acceso.menuId === menuIdAcceso && acceso.accesoId === 3) && <th>Acciones</th>
                                                            }
                                                            {
                                                                accesos.find(acceso => (acceso.menuId === menuId && acceso.accesoId === 2) || (acceso.menuId === menuId && acceso.accesoId === 4)) &&
                                                                <th></th>
                                                            }
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            catMenu.map(({ menuId: id, descripcion, posicion, href, icono, menu_padreId, MenuPadre, Estado: { descripcion: estado } }) => {
                                                                let { descripcion: descPadre = "" } = !!MenuPadre && MenuPadre;
                                                                return (
                                                                    <tr key={id}>
                                                                        <td>{id}</td>
                                                                        <td>{descripcion}</td>
                                                                        <td>{posicion}</td>
                                                                        <td>{href}</td>
                                                                        <td>{icono}</td>
                                                                        <td>{descPadre}</td>
                                                                        <td>{estado}</td>
                                                                        {
                                                                            accesos.find(acceso => acceso.menuId === menuIdAcceso && acceso.accesoId === 3) &&
                                                                            <td style={{ textAlign: "center" }}>
                                                                                <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleAcceso(id) }}><i className="feather icon-zap" /></button>
                                                                            </td>
                                                                        }
                                                                        {
                                                                            accesos.find(acceso => (acceso.menuId === menuId && acceso.accesoId === 2) || (acceso.menuId === menuId && acceso.accesoId === 4)) &&
                                                                            <td style={{ textAlign: "center" }}>

                                                                                {
                                                                                    accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 2) &&
                                                                                    <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleEditar(id) }}><i className="feather icon-edit" /></button>
                                                                                }
                                                                                {
                                                                                    accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 4) &&
                                                                                    <button className="btn-icon btn btn-danger btn-sm" onClick={() => { handleDelete(id) }}><i className="feather icon-trash-2" /></button>
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
                                <MenuUpSert abrirModal={abrirModal} setAbrirModal={setAbrirModal} GetCatMenu={GetCatMenu} catMenu={catMenu} dataInicial={dataInicial} />
                            }
                            {
                                abrirModalacceso === true &&
                                <MenuAcceso abrirModal={abrirModalacceso} setAbrirModal={setAbrirModalAcceso} catAcceso={catAcceso} menuId={dataInicial.menuId} />
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
