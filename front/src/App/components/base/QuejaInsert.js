import React, { useState } from 'react'
import Aux from '../../../hoc/_Aux'
import logoDark from './../../../assets/images/logoDiaco.jpg'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import { Link } from 'react-router-dom';
import { Col, Form } from 'react-bootstrap';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import callApi from '../../../helpers/conectorApi';
import Loading from './Loading';
export const QuejaInsert = ({ history }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false)
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let response = await callApi('resetpassword', {
            method: 'POST',
            body: JSON.stringify({ email })
        });

        if (response) {
            alert_exitoso(response);
            setEmail('');
            history.replace("/auth/login");
        }
        setLoading(false);
    }
    const handleCancelar = () => {
        history.replace("/auth/login");
    }
    const handleErrorSubmit = (e, formData, errorInputs) => {
        alert_warning("Por favor complete la información solicitada");
    };
    return (
        <Aux>
            <div className="auth-wrapper">

                <div className="card">
                    <div className="col-md-12">
                        <div className="card-body">
                            {
                                loading === true ?
                                    <Loading />
                                    : <>
                                        <img src={logoDark} alt="" className="img-fluid mb-4" />
                                        <h4 className="mb-3 f-w-400">Por favor complete toda la información solicitada por el formulario</h4>
                                        <ValidationForm onSubmit={handleOnSubmit} onErrorSubmit={handleErrorSubmit}>
                                            <Form.Row>
                                                <Form.Group as={Col} md="6">
                                                    <Form.Label htmlFor="nombre">Nombre</Form.Label>
                                                    <TextInput
                                                        name="nombre"
                                                        id="nombre"
                                                        required
                                                        value={email}
                                                        onChange={({ target: { value } }) => { setEmail(value) }}
                                                        errorMessage={""}
                                                        style={{ textTransform: "" }}
                                                        placeholder="Nombre"
                                                        autoComplete="off"
                                                        type="text"
                                                    />
                                                </Form.Group>
                                            </Form.Row>
                                            <hr></hr>
                                            <Form.Row>
                                                <Form.Group as={Col} md="6">
                                                    <button className="btn btn-block btn-danger mb-4" onClick={handleCancelar}>Cancelar</button>
                                                </Form.Group>
                                                <Form.Group as={Col} md="6">
                                                    <button className="btn btn-block btn-primary mb-4">Registrar</button>
                                                </Form.Group>
                                            </Form.Row>
                                        </ValidationForm>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Aux >
    )
}
