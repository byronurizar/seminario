import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import callApi from '../../../helpers/conectorApi';
import withReactContent from 'sweetalert2-react-content';
import { useSelector } from 'react-redux';
import Aux from '../../../hoc/_Aux';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { DatoExtraUpSert } from './DatoExtraUpSert';
import { NoAutorizado } from './NoAutorizado';
import Loading from './Loading';
const menuId = 16;
const menuIdEstadoCivil = 4;
const menuIdTipoSangre = 6;
export const DatoExtraListar = ({ personaId }) => {
    const state = useSelector(state => state);
    const [loading, setLoading] = useState(true)
    const [accesos, setAccesos] = useState([]);
    const [abrirModal, setAbrirModal] = useState(false);
    const [catTipoSangre, setTipoSangre] = useState([]);
    const [catEstadoCivil, setCatEstadoCivil] = useState([]);
    const [datoExtra, setDatoExtra] = useState([]);
    const initData = {
        personaId,
        tipo_sangreId: '',
        estado_civilId: '',
        estadoId: 1
    };

    const GetAccesosByMenuId = () => {
        if (state?.accesos) {
            const { accesos } = state;
            const misAccesos = accesos.filter(item => item.menuId === menuId || item.menuId === menuIdEstadoCivil || item.menuId === menuIdTipoSangre);
            setAccesos(misAccesos);
        }
        setLoading(false);
    }

    const [dataInicial, setdataInicial] = useState(initData);
    const handleOpenModal = () => {
        setAbrirModal(true);
        setdataInicial(initData);
    }
    const GetTipoSangre = async () => {
        if (accesos.find(acceso => acceso.menuId === menuIdTipoSangre && acceso.accesoId === 3)) {
            setLoading(true);
            let response = await callApi('tiposangre?estadoId=1&include=0');
            if (response) {
                setTipoSangre(response);
            }
        } else {
            setTipoSangre([{ tipo_sangreId: '', descripcion: 'No esta autorizado' }]);
        }
        setLoading(false);
    }
    const GetEstadoCivil = async () => {
        if (accesos.find(acceso => acceso.menuId === menuIdEstadoCivil && acceso.accesoId === 3)) {
            setLoading(true);
            let response = await callApi('estadocivil?estadoId=1&include=0');
            if (response) {
                setCatEstadoCivil(response);
            }
        } else {
            setCatEstadoCivil([{ estado_civilId: '', descripcion: 'No esta autorizado' }]);
        }
        setLoading(false);
    }
    const GetDatoExtra = async (id) => {
        if (accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3)) {
            setLoading(true);
            let response = await callApi(`persona/datoextra?personaId=${id}&estadoId=1;2`);
            if (response) {
                setDatoExtra(response);
            }
            setLoading(false);
        }
    }
    const handleEditar = (id) => {
        const { dato_extra_personaId, tipo_sangreId, estado_civilId, estadoId } = datoExtra.find(item => item.dato_extra_personaId === id);
        setdataInicial({
            dato_extra_personaId,
            tipo_sangreId,
            estado_civilId,
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
                let response = await callApi(`persona/datoextra/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    GetDatoExtra(personaId);
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
        GetTipoSangre();
        GetEstadoCivil();
        if (personaId) {
            GetDatoExtra(personaId);
        }
    }, [personaId, accesos]);
    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Información adicional</Card.Title>
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
                                                    (accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 1) && datoExtra.length <= 0) &&
                                                    <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar Información adicional</Button>
                                                }
                                            </Col>
                                        </Row>
                                        {
                                            accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3) ?
                                                <Table striped hover responsive bordered id="table_dentificaciones_persona">
                                                    <thead>
                                                        <tr>
                                                            <th>No.</th>
                                                            <th>Tipo de Sangre</th>
                                                            <th>Estado Civil</th>
                                                            <th>Estado</th>
                                                            {
                                                                accesos.find(acceso => (acceso.menuId === menuId && acceso.accesoId === 2) || (acceso.menuId === menuId && acceso.accesoId === 4)) &&
                                                                <th></th>
                                                            }
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            datoExtra.map((item) => {
                                                                const { dato_extra_personaId, TipoSangre, EstadoCivil, Estado: { descripcion: estado } } = item;
                                                                const { descripcion: tipoSangre } = !!TipoSangre && TipoSangre;
                                                                const { descripcion: estadoCivil } = !!EstadoCivil && EstadoCivil;
                                                                return (
                                                                    <tr key={dato_extra_personaId}>
                                                                        <td>{dato_extra_personaId}</td>
                                                                        <td>{tipoSangre}</td>
                                                                        <td>{estadoCivil}</td>
                                                                        <td>{estado}</td>
                                                                        {
                                                                            accesos.find(acceso => (acceso.menuId === menuId && acceso.accesoId === 2) || (acceso.menuId === menuId && acceso.accesoId === 4)) &&
                                                                            <td style={{ textAlign: "center" }}>
                                                                                {
                                                                                    accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 2) &&
                                                                                    <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleEditar(dato_extra_personaId) }}><i className="feather icon-edit" /></button>
                                                                                }
                                                                                {
                                                                                    accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 4) &&
                                                                                    <button className="btn-icon btn btn-danger btn-sm" onClick={() => { handleDelete(dato_extra_personaId) }}><i className="feather icon-trash-2" /></button>
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
                                <DatoExtraUpSert abrirModal={abrirModal} setAbrirModal={setAbrirModal} catTipoSangre={catTipoSangre} catEstadoCivil={catEstadoCivil} personaId={personaId} GetDatoExtra={GetDatoExtra} dataInicial={dataInicial} />
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
