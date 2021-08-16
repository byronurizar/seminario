import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useDispatch,useSelector } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import callApi from '../../../helpers/conectorApi';
import Aux from '../../../hoc/_Aux';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { RolMenuAccesoUpSert } from './RolMenuAccesoUpSert';
import { limpiarEstiloTabla, asignarEstiloTabla } from '../../../helpers/estiloTabla';
import { NoAutorizado } from './NoAutorizado';
import Loading from './Loading';
import { UpdateUserInfo } from '../../../actions/auth';
const menuId = 20;
const menuIdMenu = 21;
const menuIdRol = 11;
export const RolMenuAccesoListar = ({ idrol }) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const [accesos, setAccesos] = useState([]);
    const [loading, setLoading] = useState(true)
    const [abrirModal, setAbrirModal] = useState(false);
    const [catMenu, setCatMenu] = useState([]);
    const [rolMenuAcceso, setRolMenuAcceso] = useState([]);
    const [infoRol, setInfoRol] = useState([]);
    const initData = {
        menuId: '',
        rolId: idrol,
        menu_accesoId: '',
        estadoId: 1
    };

    const GetAccesosByMenuId = () => {
        if (state?.accesos) {
            const { accesos } = state;
            const misAccesos = accesos.filter(item => item.menuId === menuId || item.menuId === menuIdRol || item.menuId === menuIdMenu);
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
        if (accesos.find(acceso => acceso.menuId === menuIdMenu && acceso.accesoId === 3)) {
            setLoading(true);
            let response = await callApi('menu?estadoId=1');
            if (response) {
                setCatMenu(response);
            }
        } else {
            setCatMenu([{ menuId: '', descripcion: 'No esta autorizado' }]);
        }
        setLoading(false);
    }
    const GetRolMenuAcceso = async (id) => {
        if (accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3)) {
            limpiarEstiloTabla("#mytable");
            setLoading(true);
            let response = await callApi(`rolmenuacceso?rolId=${id}&estadoId=1;2`);
            if (response) {
                setRolMenuAcceso(response);
            }
        }
        setLoading(false);
        asignarEstiloTabla("#mytable");
    }
    const handleUpdate=(existeCambio)=>{
        setAbrirModal(false);
        if(existeCambio===true){
            GetRolMenuAcceso(dataInicial.rolId);
            dispatch(UpdateUserInfo());
        }
    }
    const GetInfoRol = async (id) => {
        if (accesos.find(acceso => acceso.menuId === menuIdRol && acceso.accesoId === 3)) {
            setLoading(true);
            let response = await callApi(`rol?id=${id}&include=0`);
            if (response) {
                setInfoRol(response[0]);
            }
        } else {
            setInfoRol([{ nombre: 'No esta autorizado' }]);
        }
        setLoading(false);
    }
    const handleEditar = (id) => {
        const { rol_menu_accesoId, rolId, menu_accesoId, estadoId, MenuAcceso: { menuId } } = rolMenuAcceso.find(item => item.rol_menu_accesoId === id);
        setdataInicial({
            rol_menu_accesoId,
            menu_accesoId,
            estadoId,
            menuId,
            rolId
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
                let response = await callApi(`rolmenuacceso/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    let listActual = rolMenuAcceso.filter(item => item.rol_menu_accesoId !== id);
                    setRolMenuAcceso(listActual);
                }
            } else {
                alert_warning('No se eliminó ningún elemento');
            }
        });
    }
    useEffect(() => {
        GetAccesosByMenuId();
    }, [state?.accesos]);

    useEffect(() => {
        GetCatMenu();
    }, [accesos]);

    useEffect(() => {
        GetInfoRol(idrol);
        GetRolMenuAcceso(idrol);
    }, [idrol, accesos])
    return (
        <Aux>
            {
                loading === true ?
                    <Loading />
                    : <>
                        <Row className='btn-page'>
                            <Col sm={12}>
                                {
                                    accesos.find(acceso => acceso.menuId === menuIdRol && acceso.accesoId === 3) ?
                                        <Card>
                                            <Card.Header>
                                                <Card.Title as="h5">{`${infoRol.nombre}`} Acceso</Card.Title>
                                            </Card.Header>
                                            <Card.Body>
                                                <Row className="align-items-center m-l-0">
                                                    <Col />
                                                    <Col className="text-right">
                                                        {
                                                            accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 1) &&
                                                            <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar Acceso</Button>
                                                        }
                                                    </Col>
                                                </Row>
                                                {
                                                    accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3) ?
                                                        <Table striped hover responsive bordered id="mytable">
                                                            <thead>
                                                                <tr>
                                                                    <th>Código</th>
                                                                    <th>Menu</th>
                                                                    <th>Acceso</th>
                                                                    <th>Estado</th>
                                                                    {
                                                                        accesos.find(acceso => (acceso.menuId === menuId && acceso.accesoId === 2) || (acceso.menuId === menuId && acceso.accesoId === 4)) &&
                                                                        <th></th>
                                                                    }
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    rolMenuAcceso.map(({ rol_menu_accesoId, MenuAcceso: { Menu: { descripcion: descMenu }, Acceso: { descripcion: desAcceso } }, Estado: { descripcion: descEstado } }) => {
                                                                        return (
                                                                            <tr key={rol_menu_accesoId}>
                                                                                <td>{rol_menu_accesoId}</td>
                                                                                <td>{descMenu}</td>
                                                                                <td>{desAcceso}</td>
                                                                                <td>{descEstado}</td>
                                                                                {
                                                                                    accesos.find(acceso => (acceso.menuId === menuId && acceso.accesoId === 2) || (acceso.menuId === menuId && acceso.accesoId === 4)) &&
                                                                                    <td style={{ textAlign: "center" }}>

                                                                                        {
                                                                                            accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 2) &&
                                                                                            <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleEditar(rol_menu_accesoId) }}><i className="feather icon-edit" /></button>
                                                                                        }
                                                                                        {
                                                                                            accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 4) &&
                                                                                            <button className="btn-icon btn btn-danger btn-sm" onClick={() => { handleDelete(rol_menu_accesoId) }}><i className="feather icon-trash-2" /></button>
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
                                                {
                                                    abrirModal === true &&
                                                    <RolMenuAccesoUpSert 
                                                        abrirModal={abrirModal} 
                                                        setAbrirModal={setAbrirModal} 
                                                        catMenu={catMenu} 
                                                        dataInicial={dataInicial} 
                                                        handleUpdate={handleUpdate} 
                                                         />
                                                }
                                            </Card.Body>
                                        </Card>
                                        : <NoAutorizado />
                                }
                            </Col>
                        </Row>
                    </>
            }
        </Aux>
    );
}
