import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import { Col, Card, Form, Button } from 'react-bootstrap';
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import { useSelector } from 'react-redux';
import validator from 'validator';
import moment from 'moment';
import { useForm } from '../../hooks/useForm';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { NoAutorizado } from './NoAutorizado';
import Loading from './Loading';
const menuId = 12;
export const PersonaRegistrar = ({ handleSetIdPersona, personaId }) => {
    const state = useSelector(state => state);
    const [loading, setLoading] = useState(true)
    const [accesos, setAccesos] = useState([]);
    const [persona, handleOnChange, , setValues] = useForm({
        nombre1: '',
        nombre2: '',
        nombre_otros: '',
        apellido1: '',
        apellido2: '',
        apellido_casada: '',
        fecha_nacimiento: '',
        email: '',
        generoId: '',
        estadoId: 1
    });

    const GetAccesosByMenuId = () => {
        if (state?.accesos) {
            const { accesos } = state;
            const misAccesos = accesos.filter(item => item.menuId === menuId);
            setAccesos(misAccesos);
        }
        setLoading(false);
    }

    const [edit, setEdit] = useState(true);
    const [fNacimiento, setfNacimiento] = useState('');

    const NuevoRegistro = async () => {
        let response = await callApi('persona', {
            method: 'POST',
            body: JSON.stringify(persona)
        });
        if (response) {
            alert_exitoso("Persona registrada exitosamente");
            const { personaId: id } = response;
            handleSetIdPersona(id);
            setEdit(false);
        }
    }
    const ActualizarRegistro = async () => {
        let response = await callApi('persona', {
            method: 'PUT',
            body: JSON.stringify(persona)
        });

        if (response) {
            alert_exitoso(response);
            setEdit(false);
        }
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (personaId > 0) {
            await ActualizarRegistro();
        } else {
            await NuevoRegistro();
        }
        setLoading(false);
    }

    const GetInfoPersona = async (id) => {
        if (id > 0) {
            if (accesos.find(acceso => acceso.accesoId === 3)) {
                setLoading(true);
                let response = await callApi(`persona?id=${id}&include=0`);
                if (response) {
                    setValues(response[0]);
                    setfNacimiento(new Date(response[0].fecha_nacimiento));
                    setEdit(false);
                }
            }
        }
        setLoading(false);
    }

    const handleErrorSubmit = (e, formData, errorInputs) => {
        alert_warning("Por favor complete toda la información solicitada por el formulario");
    };

    const handleSetFecha = (fecha) => {
        const fechaFormat = moment(fecha).format('YYYY/MM/DD');
        setValues({ ...persona, fecha_nacimiento: fechaFormat });
        setfNacimiento(fecha);
    }

    useEffect(() => {
        GetAccesosByMenuId();
    }, [state.accesos]);

    useEffect(() => {
        if (personaId) {
            GetInfoPersona(personaId);
        }
    }, [personaId, accesos])

    const errorMessage = "Campo obligatorio";
    const textTransform = 'uppercase';
    return (
        <>
            {
                loading === true ?
                    <Loading />
                    : <>
                        {
                            accesos.find(acceso => acceso.accesoId === 1 || acceso.accesoId === 2) ?
                                <Card>
                                    <Card.Header>
                                        <Card.Title as="h5">Datos Personales</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <ValidationForm onSubmit={handleOnSubmit} onErrorSubmit={handleErrorSubmit}>
                                            <Form.Row>
                                                <Form.Group as={Col} md="6">
                                                    <Form.Label htmlFor="nombre1">Primer Nombre</Form.Label>
                                                    <TextInput
                                                        name="nombre1"
                                                        id="nombre1"
                                                        errorMessage={errorMessage}
                                                        placeholder="Primer Nombre"
                                                        required value={persona.nombre1}
                                                        onChange={handleOnChange}
                                                        autoComplete="off"
                                                        readOnly={!edit}
                                                        style={{ textTransform: textTransform }}
                                                    />
                                                </Form.Group>
                                                <Form.Group as={Col} md="6">
                                                    <Form.Label htmlFor="nombre2">Segundo Nombre</Form.Label>
                                                    <TextInput
                                                        name="nombre2"
                                                        id="nombre2"
                                                        placeholder="Segundo Nombre"
                                                        value={persona.nombre2}
                                                        onChange={handleOnChange}
                                                        autoComplete="off"
                                                        readOnly={!edit}
                                                        style={{ textTransform: textTransform }}
                                                    />
                                                </Form.Group>
                                                <Form.Group as={Col} md="6">
                                                    <Form.Label htmlFor="nombre_otros">Otros Nombres</Form.Label>
                                                    <TextInput
                                                        name="nombre_otros"
                                                        id="nombre_otros"
                                                        placeholder="Otros Nombres"
                                                        value={persona.nombre_otros}
                                                        onChange={handleOnChange}
                                                        autoComplete="off"
                                                        readOnly={!edit}
                                                        style={{ textTransform: textTransform }}
                                                    />
                                                </Form.Group>
                                                <Form.Group as={Col} md="6">
                                                    <Form.Label htmlFor="apellido1">Primer Apellido</Form.Label>
                                                    <TextInput
                                                        name="apellido1"
                                                        id="apellido1"
                                                        placeholder="Primer Apellido"
                                                        errorMessage={errorMessage}
                                                        required
                                                        value={persona.apellido1}
                                                        onChange={handleOnChange}
                                                        autoComplete="off"
                                                        readOnly={!edit}
                                                        style={{ textTransform: textTransform }}
                                                    />
                                                </Form.Group>
                                                <Form.Group as={Col} md="6">
                                                    <Form.Label htmlFor="apellido2">Segundo Apellido</Form.Label>
                                                    <TextInput
                                                        name="apellido2"
                                                        id="apellido2"
                                                        placeholder="Segundo Apellido"
                                                        value={persona.apellido2}
                                                        onChange={handleOnChange}
                                                        autoComplete="off"
                                                        readOnly={!edit}
                                                        style={{ textTransform: textTransform }}
                                                    />
                                                </Form.Group>
                                                <Form.Group as={Col} md="6">
                                                    <Form.Label htmlFor="apellido_casada">Apellido de Casada</Form.Label>
                                                    <TextInput
                                                        name="apellido_casada"
                                                        id="apellido_casada"
                                                        placeholder="Apellido de Casada"
                                                        value={persona.apellido_casada}
                                                        onChange={handleOnChange}
                                                        autoComplete="off"
                                                        readOnly={!edit}
                                                        style={{ textTransform: textTransform }}
                                                    />
                                                </Form.Group>

                                                <Form.Group as={Col} md="6">
                                                    <Form.Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Form.Label>
                                                    <div className="form-group">
                                                        <DatePicker
                                                            id="fecha_nacimiento"
                                                            name="fecha_nacimiento"
                                                            dateFormat="dd/MM/yyyy"
                                                            selected={fNacimiento}
                                                            onChange={handleSetFecha}
                                                            required
                                                            errorMessage={errorMessage}
                                                            className="form-control"
                                                            placeholderText="dd/MM/yyyy"
                                                            autoComplete="off"
                                                            maxDate={new Date()}
                                                            readOnly={!edit}
                                                        />
                                                    </div>
                                                </Form.Group>

                                                <Form.Group as={Col} md="6">
                                                    <Form.Label htmlFor="email">Correo Electrónico</Form.Label>
                                                    <TextInput
                                                        name="email"
                                                        id="email"
                                                        type="email"
                                                        placeholder="Correo Electrónico"
                                                        validator={validator.isEmail}
                                                        required
                                                        errorMessage={{ validator: "Por favor ingrese un correo válido" }}
                                                        value={persona.email}
                                                        onChange={handleOnChange}
                                                        autoComplete="off"
                                                        readOnly={!edit}
                                                        style={{ textTransform: 'lowercase' }}
                                                    />
                                                </Form.Group>

                                                <Form.Group as={Col} md="6">
                                                    <Form.Label htmlFor="generoId">Género</Form.Label>
                                                    <SelectGroup
                                                        name="generoId"
                                                        id="generoId"
                                                        value={persona.generoId}
                                                        disabled={!edit}
                                                        required
                                                        errorMessage={errorMessage}
                                                        onChange={handleOnChange}>
                                                        <option value="">Seleccione un género</option>
                                                        <option value="1">Masculino</option>
                                                        <option value="2">Femenino</option>
                                                    </SelectGroup>
                                                </Form.Group>

                                                {
                                                    personaId > 0 &&
                                                    <Form.Group as={Col} md="6">
                                                        <Form.Label htmlFor="estadoId">Estado</Form.Label>
                                                        <SelectGroup
                                                            name="estadoId"
                                                            id="estadoId"
                                                            value={persona.estadoId}
                                                            disabled={!edit}
                                                            required
                                                            errorMessage={errorMessage}
                                                            onChange={handleOnChange}>
                                                            <option value="">Seleccione un estado</option>
                                                            <option value="1">Activo</option>
                                                            <option value="2">Inactivo</option>
                                                        </SelectGroup>
                                                    </Form.Group>
                                                }

                                                <Form.Group as={Col} sm={12} className="mt-3">
                                                    <Button type="submit" className="btn btn-primary mr-2" disabled={(!edit && personaId > 0)}>{personaId > 0 ? 'Actualizar' : 'Registrar'}</Button>
                                                    {
                                                        personaId > 0 &&
                                                        <Button type="button" className="btn btn-success" disabled={edit} onClick={() => { setEdit(!edit) }}>Editar</Button>
                                                    }
                                                </Form.Group>
                                            </Form.Row>
                                        </ValidationForm>

                                    </Card.Body>
                                </Card>
                                : <NoAutorizado />
                        }
                    </>
            }
        </>
    );
}
