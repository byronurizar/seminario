import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './../../../assets/scss/style.scss';
import Aux from '../../../hoc/_Aux';
import authLogo from './../../../assets/images/auth/auth-logo.png'
import authLogoDark from './../../../assets/images/auth/auth-logo-dark.png'
import { loginBackend } from '../../../actions/auth';
import { useForm } from '../../hooks/useForm';
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import { alert_warning } from '../../../helpers/Notificacion';
import config from '../../../config';
import Loading from './Loading';
const Login = ({ history, location }) => {
    const dispatch = useDispatch();
    const { logged } = useSelector(state => state);
    const [loading, setLoading] = useState(false)
    const [values, , , setValues] = useForm({
        user_name: 'BLOPEZ',
        password: 'blopez',
        recordarme: false
    });
    const handleUserName = ({ target: { value } }) => {
        let auxUsername = String(value).trim().toUpperCase();
        setValues({ ...values, user_name: auxUsername });
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(loginBackend(values));
        setLoading(false);
    }
    const handleErrorSubmit = (e, formData, errorInputs) => {
        alert_warning("Por favor complete la información solicitada");
    };
    const hanldeOnChangePassword = ({ target: { value } }) => {
        setValues({ ...values, password: value });
    }
    const validarLogin = () => {
        if (logged === true) {
            history.replace(config.defaultPath);
        }
    }
    const validarSesion = () => {
        dispatch(loginBackend());
    }
    useEffect(() => {
        validarLogin();
    }, [logged]);
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
        window.history.pushState(null, "", window.location.href);
    };
    useEffect(() => {
        validarSesion();
    }, [])
    return (
        <Aux>
            <ValidationForm onSubmit={handleOnSubmit} onErrorSubmit={handleErrorSubmit}>
                <div className="auth-wrapper align-items-stretch aut-bg-img">
                    <div className="flex-grow-1">
                        <div className="h-100 d-md-flex align-items-center auth-side-img">
                            <div className="col-sm-10 auth-content w-auto">
                                <img src={authLogo} alt="" className="img-fluid" />
                                <h1 className="text-white my-4">Bienvenido Nombre de la empresa</h1>
                                <h4 className="text-white font-weight-normal">Inicie sesión con su cuenta y explore el sistema</h4>
                            </div>
                        </div>
                        <div className="auth-side-form">
                            <div className=" auth-content">
                                <img src={authLogoDark} alt="" className="img-fluid mb-4 d-block d-xl-none d-lg-none" />
                                <h3 className="mb-4 f-w-400">Iniciar Sesión</h3>
                                {
                                    loading === true ?
                                        <Loading />
                                        : <>
                                            <Form.Row>
                                                <Form.Group as={Col} md="12">
                                                    <TextInput
                                                        name="user_name"
                                                        id="user_name"
                                                        required
                                                        errorMessage="Por favor ingrese el nombre de usuario"
                                                        value={values.user_name}
                                                        onChange={handleUserName}
                                                        placeholder="Nombre de Usuario"
                                                        autoComplete="off"
                                                        type="text"
                                                    />
                                                </Form.Group>
                                                <Form.Group as={Col} md="12">
                                                    <TextInput
                                                        name="password"
                                                        id="password"
                                                        required
                                                        value={values.password}
                                                        onChange={hanldeOnChangePassword}
                                                        errorMessage="Por favor ingrese su contraseña"
                                                        placeholder="Contraseña"
                                                        autoComplete="off"
                                                        type="password"
                                                    />
                                                </Form.Group>
                                            </Form.Row>
                                            <div className="form-group text-left mt-2">
                                                <div className="checkbox checkbox-primary d-inline">
                                                    <input type="checkbox" name="checkbox-p-1" id="checkbox-p-1" checked={values.recordarme} onChange={() => { setValues({ ...values, recordarme: !values.recordarme }) }} />
                                                    <label htmlFor="checkbox-p-1" className="cr">Recordarme</label>
                                                </div>
                                            </div>
                                            <button className="btn btn-block btn-primary mb-0" type="submit">Ingresar</button>
                                            <div className="text-center">

                                                {/* <p className="mb-2 text-muted"><NavLink to="/auth/update-password" className="f-w-400">¿Has olvidado la contraseña?</NavLink></p> */}
                                                <p className="mb-2 text-muted"><NavLink to="/auth/reset-password" className="f-w-400">¿Has olvidado la contraseña?</NavLink></p>
                                            </div>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </ValidationForm>
        </Aux>
    )
}

export default Login;