import React, { useState } from 'react'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import callApi from '../../../helpers/conectorApi';
import Aux from '../../../hoc/_Aux';
import withReactContent from 'sweetalert2-react-content';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { DepartamentoUpSert } from './DepartamentoUpSert';
import $ from 'jquery';

const accesos = [1, 2, 3, 4];
const initData = {
    departamentoId: '',
    paisId: '',
    descripcion: '',
    estadoId: 1
};

$.DataTable = require('datatables.net-bs');
require('datatables.net-responsive-bs');

function atable() {
    let tableZero = '#data-table-zero';
    $.fn.dataTable.ext.errMode = 'throw';

    $(tableZero).DataTable();
}

class UtilizacionDeClase extends React.Component {
    constructor(props) {
        super(props);
        this.GetDepartamentos();
        this.GetPaises();
    }
    state = {
        abrirModal: false,
        catPaises: [],
        departamentos: [],
        initData
    };

    GetPaises = async () => {
        let response = await callApi('pais?include=0?estadoId=1');
        this.setState({ ...this.state, catPaises: response });
    }

    handleOpenModal = () => {
        this.setState({ ...this.state, abrirModal: !this.state.abrirModal });
    }

    GetDepartamentos = async () => {
        let response = await callApi('departamento?estadoId=1;2');
        this.setState({ ...this.state, departamentos: response });
    }
    handleEditar = (id) => {
        const { departamentoId, paisId, descripcion, estadoId } = this.state.departamentos.find(item => item.departamentoId === id);
        const nuevaInfo = {
            departamentoId,
            paisId,
            descripcion,
            estadoId
        };
        this.setState({ ...this.state, initData: nuevaInfo, abrirModal: true });
    }
    handleDelete = (id) => {
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
                    this.GetDepartamentos();
                }
            } else {
                alert_warning('No se eliminó ningún elemento');
            }
        });
    }

    componentDidMount() {

    }




    render() {
        return (
            <Aux>
                <Row className='btn-page'>
                    <Col sm={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Departamentos</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Row className="align-items-center m-l-0">
                                    <Col />
                                    <Col className="text-right">
                                        {
                                            accesos.find(acceso => acceso === 1) &&
                                            <Button variant="success" className="btn-sm btn-round has-ripple" onClick={this.handleOpenModal}><i className="feather icon-plus" /> Agregar departamento</Button>
                                        }
                                    </Col>
                                </Row>
                                {
                                    accesos.find(acceso => acceso === 2) &&
                                    <Table striped hover responsive bordered id="data-table-zero">
                                        <thead>
                                            <tr>
                                                <th>Codigo</th>
                                                <th>Departamento</th>
                                                <th>Pais</th>
                                                <th>Estado</th>
                                                {
                                                    accesos.find(acceso => acceso === 3 || acceso === 4) &&
                                                    <th></th>
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.departamentos.map(({ departamentoId, descripcion, Pais: { descripcion: pais }, Estado: { descripcion: estado } }) => (
                                                    <tr key={departamentoId}>
                                                        <td>{departamentoId}</td>
                                                        <td>{descripcion}</td>
                                                        <td>{pais}</td>
                                                        <td>{estado}</td>
                                                        {
                                                            accesos.find(acceso => acceso === 3 || acceso === 4) &&
                                                            <td style={{ textAlign: "center" }}>
                                                                {
                                                                    accesos.find(acceso => acceso === 3) &&
                                                                    <button className="btn-icon btn btn-info btn-sm" onClick={() => { this.handleEditar(departamentoId) }}><i className="feather icon-edit" /></button>
                                                                }
                                                                {
                                                                    accesos.find(acceso => acceso === 4) &&
                                                                    <button className="btn-icon btn btn-danger btn-sm" onClick={() => { this.handleDelete(departamentoId) }}><i className="feather icon-trash-2" /></button>
                                                                }
                                                            </td>
                                                        }
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                }
                                {
                                    this.state.abrirModal === true &&
                                    <DepartamentoUpSert abrirModal={this.state.abrirModal} setAbrirModal={this.handleOpenModal} catPaises={this.state.catPaises} GetDepartamentos={this.GetDepartamentos} dataInicial={this.state.initData} />
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default UtilizacionDeClase;
