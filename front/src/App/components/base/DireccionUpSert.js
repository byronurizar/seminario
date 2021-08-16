import React, { useEffect, useState } from 'react'
import { Col, Form, Modal } from 'react-bootstrap';
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import { useSelector } from 'react-redux';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { useForm } from '../../hooks/useForm';
import Loading from './Loading';
const menuIdMunicipio = 10;
export const DireccionUpSert = ({ dataInicial, personaId, abrirModal, setAbrirModal, catDepartamento, GetDirecciones }) => {
    const state = useSelector(state => state);
    const [accesos, setAccesos] = useState([]);
    const [loading, setLoading] = useState(false)
    const [direccion, handleOnChange] = useForm(dataInicial);
    const [departamentoId, setDepartamentoId] = useState('');
    const [catMunicipio, setCatMunicipio] = useState([]);

    const GetAccesosByMenuId = () => {
        if (state?.accesos) {
            const { accesos } = state;
            const misAccesos = accesos.filter(item => item.menuId === menuIdMunicipio);
            setAccesos(misAccesos);
        }
    }

    const onchangeDepartamento = ({ target }) => {
        setDepartamentoId(target.value)
    }
    const NuevoRegistro = async () => {
        let response = await callApi('persona/direccion', {
            method: 'POST',
            body: JSON.stringify(direccion)
        });

        if (response) {
            alert_exitoso("Dirección registrada exitosamente");
            GetDirecciones(personaId);
            setAbrirModal(false);
        }
    }
    const ActualizarRegistro = async () => {
        let response = await callApi('persona/direccion', {
            method: 'PUT',
            body: JSON.stringify(direccion)
        });

        if (response) {
            alert_exitoso(response);
            GetDirecciones(personaId);
        }
        setAbrirModal(false);
    }
    useEffect(() => {
        if (dataInicial.departamentoId) {
            setDepartamentoId(dataInicial.departamentoId);
        }
    }, [dataInicial.departamentoId])
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (dataInicial.direccion_personaId > 0) {
            await ActualizarRegistro();
        } else {
            await NuevoRegistro();
        }
        setLoading(false);
    }
    const handleErrorSubmit = (e, formData, errorInputs) => {
        alert_warning("Por favor complete toda la información solicitada por el formulario");
    };
    const GetMunicipio = async (id) => {
        if (id > 0) {
            if (accesos.find(acceso => acceso.menuId === menuIdMunicipio && acceso.accesoId === 3)) {
                setLoading(true);
                let response = await callApi(`municipio?departamentoId=${id}&estadoId=1&include=0`);
                if (response) {
                    setCatMunicipio(response);
                }
            } else {
                setCatMunicipio([{ municipioId: '', descripcion: 'No esta autorizado' }]);
            }
        }
        setLoading(false);
    }
    useEffect(() => {
        GetAccesosByMenuId();
    }, []);

    useEffect(() => {
        GetMunicipio(departamentoId);
    }, [departamentoId, accesos]);
    const errorMessage = "Campo obligatorio";
    const textTransform = 'capitalize';
    return (
        <Modal show={abrirModal} onHide={() => setAbrirModal(false)} size='lg'>
            {
                loading === true ?
                    <Loading />
                    : <>
                        <Modal.Header closeButton>
                            <Modal.Title as="h5">{dataInicial.direccion_personaId > 0 ? 'Actualizar dirección' : 'Nueva dirección'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ValidationForm onSubmit={handleOnSubmit} onErrorSubmit={handleErrorSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col} md="12">
                                        <Form.Label htmlFor="departamentoId">Departamento</Form.Label>
                                        <SelectGroup
                                            name="departamentoId"
                                            id="departamentoId"
                                            required
                                            value={departamentoId}
                                            onChange={onchangeDepartamento}
                                            errorMessage={errorMessage}>
                                            <option value="">Seleccione un departamento</option>
                                            {
                                                catDepartamento.map(({ departamentoId, descripcion }) => (
                                                    <option value={departamentoId} key={departamentoId}>{descripcion}</option>
                                                )
                                                )
                                            }
                                        </SelectGroup>
                                    </Form.Group>

                                    <Form.Group as={Col} md="12">
                                        <Form.Label htmlFor="municipioId">Municipio</Form.Label>
                                        <SelectGroup
                                            name="municipioId"
                                            id="municipioId"
                                            required
                                            value={direccion.municipioId}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}>
                                            <option value="">Seleccione un municipio</option>
                                            {
                                                catMunicipio.map(({ municipioId, descripcion }) => (
                                                    <option value={municipioId} key={municipioId}>{descripcion}</option>
                                                ))
                                            }
                                        </SelectGroup>
                                    </Form.Group>

                                    <Form.Group as={Col} md="12">
                                        <Form.Label htmlFor="direccion">Dirección</Form.Label>
                                        <TextInput
                                            name="direccion"
                                            id="direccion"
                                            required
                                            multiline
                                            value={direccion.direccion}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}
                                            placeholder="Dirección"
                                            autoComplete="off"
                                            rows="3"
                                            minLength="5"
                                            style={{ textTransform: textTransform }}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="12">
                                        <Form.Label htmlFor="punto_referencia">Punto de referencia</Form.Label>
                                        <TextInput
                                            name="punto_referencia"
                                            id="punto_referencia"
                                            required
                                            multiline
                                            value={direccion.punto_referencia}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}
                                            placeholder="Punto de referencia"
                                            autoComplete="off"
                                            rows="3"
                                            minLength="5"
                                            style={{ textTransform: textTransform }}
                                        />
                                    </Form.Group>
                                    {
                                        dataInicial.direccion_personaId > 0 &&
                                        <Form.Group as={Col} md="12">
                                            <Form.Label htmlFor="estadoId">Estado</Form.Label>
                                            <SelectGroup
                                                name="estadoId"
                                                id="estadoId"
                                                value={direccion.estadoId}
                                                required
                                                errorMessage={errorMessage}
                                                onChange={handleOnChange}>
                                                <option value="">Seleccione un estado</option>
                                                <option value="1">Activo</option>
                                                <option value="2">Inactivo</option>
                                            </SelectGroup>
                                        </Form.Group>
                                    }
                                    <div className="col-sm-3"></div>
                                    <div className="col-sm-3">
                                        <button type="button" onClick={() => { setAbrirModal(false) }} className="btn btn-warning"> Cancelar</button>
                                    </div>
                                    <div className="col-sm-3">
                                        <button type="submit" className="btn btn-success"> {dataInicial.direccion_personaId > 0 ? 'Actualizar' : 'Registrar'}</button>
                                    </div>
                                </Form.Row>
                            </ValidationForm>
                        </Modal.Body>
                    </>
            }
        </Modal>
    )
}
