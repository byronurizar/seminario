import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react'
import { Button,Col, Form, Modal } from 'react-bootstrap';
import { ValidationForm, SelectGroup } from 'react-bootstrap4-form-validation';
import { UpdateUserInfo } from '../../../actions/auth';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { useForm } from '../../hooks/useForm';
import Loading from './Loading';
import { useDispatch,useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { Controls } from 'reactour';
const menuIdMenuAcceso = 19;
export const RolMenuAccesoUpSert = ({ dataInicial, abrirModal, catMenu, handleUpdate }) => {
    
    const state = useSelector(state => state);
    const [loading, setLoading] = useState(false)
    const [existeCambio, setExisteCambio] = useState(false)
    const [accesos, setAccesos] = useState([]);
    const [menuId, setMenuid] = useState(dataInicial.menuId);
    const [menuAcceso, setMenuAcceso] = useState([]);
    const [listAsignados, setListAsignados] = useState([]);
    const [menuEdit, setMenuEdit] = useState(null);
    const GetAccesosByMenuId = () => {
        if (state?.accesos) {
            const { accesos } = state;
            const misAccesos = accesos.filter(item => (item.menuId === menuIdMenuAcceso));
            setAccesos(misAccesos);
        }
    }

    const hadleSetValueList=()=>{
        let item=catMenu.find(i=>Number(i.menuId)===Number(menuId));
        setMenuEdit(item);
    }
    const NuevoRegistro = async (data) => {
        setLoading(true);
        let response = await callApi('rolmenuacceso', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        if (response) {
            alert_exitoso("Permiso registrado exitosamente");
            GetMenuAcceso(menuId);
            setExisteCambio(true);
        }
        setLoading(false);
    }
    const ActualizarRegistro = async (data) => {
        setLoading(true);
        let response = await callApi('rolmenuacceso', {
            method: 'PUT',
            body: JSON.stringify(data)
        });

        if (response) {
            alert_exitoso(response);
            GetMenuAcceso(menuId);
            GetPermisosAsignados();
            setExisteCambio(true);
        }
        setLoading(false);
    }
    const handleOnChangeMenu = (event, nuevoValor) => {
        if(nuevoValor){
        let { menuId = 0 } = nuevoValor;
        setMenuEdit(nuevoValor);
        setMenuid(menuId);
        }
    }
    const GetMenuAcceso = async (id) => {
        if (accesos.find(acceso => acceso.menuId === menuIdMenuAcceso && acceso.accesoId === 3)) {
            setLoading(true);
            if (id != 0) {
                let response = await callApi(`menuacceso?menuId=${id}&estadoId=1`);
                if (response) {
                    setMenuAcceso(response);
                    GetPermisosAsignados();
                }
            }
        }
        setLoading(false);
    }

    const GetPermisosAsignados = async () => {
        if (accesos.find(acceso => acceso.menuId === menuIdMenuAcceso && acceso.accesoId === 3)) {
            setLoading(true);
            if (menuId != 0) {
                let response = await callApi(`rolmenuacceso?menuId=${menuId}`);
                if (response) {
                    setListAsignados(response);
                }
            }
        }
        setLoading(false);
    }


    const handleChangeChecbox = async (rol_menu_accesoId, menu_accesoId, asignado) => {

        if (rol_menu_accesoId > 0) {
            let estadoId = 1;
            if (asignado) {
                estadoId = 2;
            }
            let data = {
                rol_menu_accesoId,
                menu_accesoId,
                estadoId
            }
            ActualizarRegistro(data);
        } else {
            let data = {
                rolId: dataInicial.rolId,
                menu_accesoId
            }
            NuevoRegistro(data);
        }
    }

    useEffect(() => {
        GetPermisosAsignados();
    }, []);

    useEffect(() => {
        GetAccesosByMenuId();
    }, []);
    useEffect(() => {
        GetMenuAcceso(menuId);
        hadleSetValueList();
    }, [menuId, accesos]);

    
    return (
        <Modal show={abrirModal} onHide={() => handleUpdate(existeCambio)} size="lg">
            {
                loading === true ?
                    <Loading />
                    : <>
                        <Modal.Header closeButton>
                            <Modal.Title as="h5">{dataInicial.rol_menu_accesoId > 0 ? 'Actualizar Permiso' : 'Nuevo Permiso'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Autocomplete
                                value={menuEdit || null}
                                id="menuId"
                                name="menuId"
                                options={catMenu || []}
                                getOptionLabel={(option) => option.descripcion}
                                style={{ width: 600 }}
                                size="small"
                                onChange={handleOnChangeMenu}
                                renderInput={(params) => <TextField {...params} label="Nombre Menu" />}
                            />

                            <br></br>
                            <br></br>
                            <h5>Accesos disponibles</h5>
                            <hr />
                            {
                                menuAcceso.length > 0 &&
                                    <Table striped hover responsive bordered id="mytable">
                                        <thead>
                                            <tr>
                                                <th>Código</th>
                                                <th>Acceso</th>
                                                {
                                                    (accesos.find(acceso => acceso.menuId === menuIdMenuAcceso && acceso.accesoId === 1) || accesos.find(acceso => acceso.menuId === menuIdMenuAcceso && acceso.accesoId === 2)) &&
                                                    <th>Estado</th>
                                                }
                                            </tr>

                                        </thead>
                                        <tbody>
                                            {
                                                menuAcceso.map(({ menu_accesoId, Acceso }) => {
                                                    let existe = listAsignados.find(i => Number(i.menu_accesoId) === Number(menu_accesoId));
                                                    let rol_menu_accesoId = 0;
                                                    let estadoId = 0;
                                                    if (existe) {
                                                        rol_menu_accesoId = existe.rol_menu_accesoId;
                                                        estadoId = existe.estadoId;
                                                    }
                                                    let asignado = false;
                                                    if (estadoId === 1) {
                                                        asignado = true;
                                                    }
                                                    return (
                                                        <tr key={menu_accesoId}>
                                                            <td>{menu_accesoId}</td>
                                                            <td>{Acceso.descripcion}</td>
                                                            {
                                                                accesos.find(i => i.accesoId === 1 || i.accesoId === 2) ?
                                                                    <td style={{ textAlign: "center" }}>
                                                                        <Form.Group>
                                                                            <div className="switch switch-alternative d-inline m-r-10">
                                                                                <Form.Control type="checkbox" id={`menu_accesoId_${menu_accesoId}`} checked={asignado} onChange={() => { handleChangeChecbox(rol_menu_accesoId, menu_accesoId, asignado); }} />
                                                                                <Form.Label htmlFor={`menu_accesoId_${menu_accesoId}`} className="cr" />
                                                                            </div>
                                                                            <Form.Label htmlFor={`menu_accesoId_${menu_accesoId}`}>{
                                                                                asignado ? 'Activo' : 'Inactivo'
                                                                            }</Form.Label>
                                                                        </Form.Group>
                                                                    </td> : <td style={{ textAlign: "center" }}><label className="text-danger">No Autorizado</label></td>
                                                            }
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="warning" onClick={() => { handleUpdate(existeCambio) }}>Salir</Button>
                        </Modal.Footer>

                    </>
            }
        </Modal>
    )
}
