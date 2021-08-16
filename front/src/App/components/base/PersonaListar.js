import React, { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Card,
    Table
} from 'react-bootstrap';
import Swal from 'sweetalert2';
import moment from 'moment';
import withReactContent from 'sweetalert2-react-content';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Aux from '../../../hoc/_Aux';
import callApi from '../../../helpers/conectorApi';
import { limpiarEstiloTabla, asignarEstiloTabla } from '../../../helpers/estiloTabla';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { NoAutorizado } from './NoAutorizado';
import Loading from './Loading';
const menuId = 12;
export const PersonaListar = () => {
    const state = useSelector(state => state);
    const [loading, setLoading] = useState(true)
    const [accesos, setAccesos] = useState([]);
    const [personas, setPersonas] = useState([]);

    const GetAccesosByMenuId = () => {
        if (state?.accesos) {
            const { accesos } = state;
            const misAccesos = accesos.filter(item => item.menuId === menuId);
            setAccesos(misAccesos);
        }
        setLoading(false);
    }

    const GetPersonas = async () => {
        if (accesos.find(acceso => acceso.accesoId === 3)) {
            limpiarEstiloTabla("#mytable");
            setLoading(true);
            let response = await callApi(`persona?&estadoId=1;2`);
            if (response) {
                setPersonas(response);
            }
        }
        setLoading(false);
        asignarEstiloTabla("#mytable");
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
                let response = await callApi(`persona/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    let listActual = personas.filter(item => item.personaId !== id);
                    setPersonas(listActual);
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
        GetPersonas();
    }, [accesos]);

    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
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
                                                    <Link variant="success" className="btn-sm btn-round has-ripple" to="/base/catalogo/personaupsert"><i className="feather icon-plus" /> Nueva Persona</Link>
                                                }
                                            </Col>
                                        </Row>
                                        {
                                            accesos.find(acceso => acceso.accesoId === 3) ?
                                                <Table striped hover responsive bordered id="mytable">
                                                    <thead>
                                                        <tr>
                                                            <th>Codigo</th>
                                                            <th>Nombre</th>
                                                            <th>Fecha de Nacimiento</th>
                                                            <th>Correo</th>
                                                            <th>Genero</th>
                                                            <th>Estado</th>
                                                            {
                                                                accesos.find(acceso => acceso.accesoId === 2 || acceso.accesoId === 4) &&
                                                                <th></th>
                                                            }
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            personas.map((item) => {
                                                                const { personaId,
                                                                    nombre1,
                                                                    nombre2,
                                                                    nombre_otros,
                                                                    apellido1,
                                                                    apellido2,
                                                                    apellido_casada,
                                                                    email,
                                                                    fecha_nacimiento, Genero: { descripcion: genero }, Estado: { descripcion: estado } } = item;
                                                                let nombreCompleto = nombre1;
                                                                if (nombre2) {
                                                                    nombreCompleto += " " + nombre2;
                                                                }
                                                                if (nombre_otros) {
                                                                    nombreCompleto += " " + nombre_otros;
                                                                }
                                                                nombreCompleto += " " + apellido1;

                                                                if (apellido2) {
                                                                    nombreCompleto += " " + apellido2;
                                                                }
                                                                if (apellido_casada) {
                                                                    nombreCompleto += " " + apellido_casada;
                                                                }
                                                                return (
                                                                    <tr key={personaId}>
                                                                        <td>{personaId}</td>
                                                                        <td>{nombreCompleto}</td>
                                                                        <td>{moment(fecha_nacimiento).format('DD/MM/YYYY')}</td>
                                                                        <td>{email}</td>
                                                                        <td>{genero}</td>
                                                                        <td>{estado}</td>
                                                                        {
                                                                            accesos.find(acceso => acceso.accesoId === 2 || acceso.accesoId === 4) &&
                                                                            <td style={{ textAlign: "center" }}>
                                                                                {
                                                                                    accesos.find(acceso => acceso.accesoId === 2) &&
                                                                                    <Link className="btn-icon btn btn-info btn-sm" to={`/base/catalogo/personaupsert/${btoa(`idpersona=${item.personaId}`)}`}><i className="feather icon-edit" /></Link>
                                                                                }
                                                                                {
                                                                                    accesos.find(acceso => acceso.accesoId === 4) &&
                                                                                    <button className="btn-icon btn btn-danger btn-sm" onClick={() => { handleDelete(item.personaId) }}><i className="feather icon-trash-2" /></button>}
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
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>

    )
}