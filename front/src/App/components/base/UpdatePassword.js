import React, { useState } from 'react'
import Aux from '../../../hoc/_Aux'
import logoDark from './../../../assets/images/auth/auth-logo-dark.png'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import { Col, Form } from 'react-bootstrap';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { useForm } from '../../hooks/useForm';
import callApi from '../../../helpers/conectorApi';
import Loading from './Loading';
export const UpdatePassword = ({ match, history }) => {
    let { id } = match.params;
    const [loading, setLoading] = useState(false)
    const [values, , , setValues] = useForm({
        id: id,
        password: '',
        password_confirmar: ''
    });
    const hanldeOnChangePassword = ({ target: { name, value } }) => {
        setValues({ ...values, [name]: value });
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let response = await callApi('resetpassword', {
            method: 'PUT',
            body: JSON.stringify(values)
        });
        if (response) {
            alert_exitoso(response);
            history.replace("/auth/login");
        }
        setLoading(false);
    }
    const handleErrorSubmit = (e, formData, errorInputs) => {
        alert_warning("Por favor complete la información solicitada");
    };
    const confirmarPassWord = (value) => {
        return value && value === values.password;
    };
    const handleCancelar = () => {
        history.replace("/auth/login");
    }
    return (
        <Aux>
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="card">
                        <div className="row align-items-center text-center">
                            <div className="col-md-12">
                                <div className="card-body">
                                    {
                                        loading === true ?
                                            <Loading />
                                            : <>
                                                <img src={logoDark} alt="" className="img-fluid mb-4" />
                                                <h4 className="mb-3 f-w-400">Actualizar Contraseña</h4>
                                                <ValidationForm onSubmit={handleOnSubmit} onErrorSubmit={handleErrorSubmit}>
                                                    <Form.Row>
                                                        <Form.Group as={Col} md="12">
                                                            <TextInput
                                                                name="password"
                                                                id="password"
                                                                type="password"
                                                                placeholder="Nueva Contraseña"
                                                                required
                                                                pattern="(?=.*[A-Z]).{6,}"
                                                                errorMessage={{ required: "Ingrese la nueva contraseña", pattern: "La contraseña debe de tener al menos 6 caracteres y contener al menos una letra mayúscula" }}
                                                                value={values.password}
                                                                onChange={hanldeOnChangePassword}
                                                                autoComplete="off"
                                                            />
                                                        </Form.Group>

                                                        <Form.Group as={Col} md="12">
                                                            <TextInput
                                                                name="password_confirmar"
                                                                id="password_confirmar"
                                                                type="password"
                                                                placeholder="Confirmar Nueva Contraseña"
                                                                required
                                                                validator={confirmarPassWord}
                                                                errorMessage={{ required: "Por favor confirme la nueva contraseña", validator: "La contraseña no coincide" }}
                                                                value={values.password_confirmar}
                                                                onChange={hanldeOnChangePassword}
                                                                autoComplete="off"
                                                            />
                                                        </Form.Group>
                                                        <Form.Group as={Col} md="6">
                                                            <button className="btn btn-block btn-danger mb-4" onClick={handleCancelar}>Cancelar</button>
                                                        </Form.Group>
                                                        <Form.Group as={Col} md="6">
                                                            <button className="btn btn-block btn-primary mb-4">Actualizar</button>
                                                        </Form.Group>
                                                    </Form.Row>
                                                </ValidationForm>
                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    )
}
