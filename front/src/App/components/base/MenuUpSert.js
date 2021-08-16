import React, { useState } from 'react'
import { Col, Form, Modal } from 'react-bootstrap';
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import { useDispatch } from 'react-redux';
import { UpdateUserInfo } from '../../../actions/auth';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { useForm } from '../../hooks/useForm';
import Loading from './Loading';
export const MenuUpSert = ({ dataInicial, abrirModal, setAbrirModal, catMenu, GetCatMenu }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [values, handleOnChange] = useForm(dataInicial);
    const NuevoRegistro = async () => {
        let response = await callApi('menu', {
            method: 'POST',
            body: JSON.stringify(values)
        });

        if (response) {
            alert_exitoso("Menu registrado exitosamente");
            GetCatMenu();
            setAbrirModal(false);
        }
    }
    const ActualizarRegistro = async () => {
        let response = await callApi('menu', {
            method: 'PUT',
            body: JSON.stringify(values)
        });

        if (response) {
            alert_exitoso(response);
            dispatch(UpdateUserInfo());
            GetCatMenu();
        }
        setAbrirModal(false);
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (dataInicial.menuId > 0) {
            await ActualizarRegistro();
        } else {
            await NuevoRegistro();
        }
        setLoading(false);
    }
    const handleErrorSubmit = (e, formData, errorInputs) => {
        alert_warning("Por favor complete toda la información solicitada por el formulario");
    };

    const errorMessage = "Campo obligatorio";
    const textTransform = 'capitalize';
    return (
        <Modal show={abrirModal} onHide={() => setAbrirModal(false)} size="xl">
            {
                loading === true ?
                    <Loading />
                    : <>
                        <Modal.Header closeButton>
                            <Modal.Title as="h5">{dataInicial.menuId > 0 ? 'Actualizar Menu' : 'Nuevo Menu'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ValidationForm onSubmit={handleOnSubmit} onErrorSubmit={handleErrorSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label htmlFor="descripcion">Descripción</Form.Label>
                                        <TextInput
                                            name="descripcion"
                                            id="descripcion"
                                            required
                                            value={values.descripcion}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}
                                            placeholder="Descripción"
                                            autoComplete="off"
                                            style={{ textTransform: textTransform }}
                                            type="text"
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label htmlFor="posicion">Posición</Form.Label>
                                        <TextInput
                                            name="posicion"
                                            id="posicion"
                                            required
                                            value={values.posicion}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}
                                            placeholder="Posición"
                                            autoComplete="off"
                                            type="number"
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label htmlFor="classes">Classes</Form.Label>
                                        <TextInput
                                            name="classes"
                                            id="classes"
                                            required
                                            value={values.classes}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}
                                            placeholder="Classes"
                                            autoComplete="off"
                                            type="text"
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label htmlFor="type">Tipo</Form.Label>
                                        <TextInput
                                            name="type"
                                            id="type"
                                            required
                                            value={values.type}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}
                                            placeholder="Tipo"
                                            autoComplete="off"
                                            type="text"
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label htmlFor="href">Href</Form.Label>
                                        <TextInput
                                            name="href"
                                            id="href"
                                            value={values.href}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}
                                            placeholder="Href"
                                            autoComplete="off"
                                            style={{ textTransform: 'lowercase' }}
                                            type="text"
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label htmlFor="icono">Icono</Form.Label>
                                        <TextInput
                                            name="icono"
                                            id="icono"
                                            value={values.icono}
                                            onChange={handleOnChange}
                                            errorMessage={errorMessage}
                                            placeholder="Icono"
                                            autoComplete="off"
                                            style={{ textTransform: 'lowercase' }}
                                            type="text"
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label htmlFor="menu_padreId">Padre</Form.Label>
                                        <SelectGroup
                                            name="menu_padreId"
                                            id="menu_padreId"
                                            value={values.menu_padreId}
                                            errorMessage={errorMessage}
                                            onChange={handleOnChange}>
                                            <option value="0">Seleccione un menu</option>
                                            {
                                                catMenu.map(({ menuId, descripcion }) => (
                                                    <option value={menuId} key={menuId}>{descripcion}</option>
                                                ))
                                            }
                                        </SelectGroup>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label htmlFor="visible">Visible</Form.Label>
                                        <SelectGroup
                                            name="visible"
                                            id="visible"
                                            value={values.visible}
                                            required
                                            errorMessage={errorMessage}
                                            onChange={handleOnChange}>
                                            <option value="">Seleccione</option>
                                            <option value="1">Si</option>
                                            <option value="0">No</option>
                                        </SelectGroup>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    {
                                        dataInicial.menuId > 0 &&
                                        <Form.Group as={Col} md="6">
                                            <Form.Label htmlFor="estadoId">Estado</Form.Label>
                                            <SelectGroup
                                                name="estadoId"
                                                id="estadoId"
                                                value={values.estadoId}
                                                required
                                                errorMessage={errorMessage}
                                                onChange={handleOnChange}>
                                                <option value="">Seleccione un estado</option>
                                                <option value="1">Activo</option>
                                                <option value="2">Inactivo</option>
                                            </SelectGroup>
                                        </Form.Group>
                                    }
                                </Form.Row>
                                <Form.Row>
                                    <div className="col-sm-3"></div>
                                    <div className="col-sm-3">
                                        <button type="button" onClick={() => { setAbrirModal(false) }} className="btn btn-warning"> Cancelar</button>
                                    </div>
                                    <div className="col-sm-3">
                                        <button type="submit" className="btn btn-success"> {dataInicial.menuId > 0 ? 'Actualizar' : 'Registrar'}</button>
                                    </div>
                                </Form.Row>
                            </ValidationForm>
                        </Modal.Body>
                    </>
            }
        </Modal >
    )
}
