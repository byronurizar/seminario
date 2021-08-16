import React, { useState } from 'react'
import { Col, Form } from 'react-bootstrap';
import { DropzoneComponent } from 'react-dropzone-component';
import { useDispatch } from 'react-redux';
import Aux from '../../../hoc/_Aux';
import { UpdateUserInfo } from '../../../actions/auth';
import callApi from '../../../helpers/conectorApi';
import { alert_error, alert_exitoso } from '../../../helpers/Notificacion';
import Loading from './Loading';
export const UploadImagen = ({ setAbrirModal }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const config = {
        iconFiletypes: ['.jpg', '.png', '.jpeg'],
        showFiletypeIcon: true,
        postUrl: '/'
    };

    const djsConfig = {
        addRemoveLinks: true,
        acceptedFiles: "image/jpeg,image/png"
    };
    var eventHandlers = { addedfile: (file) => setFile(file) }

    const handleSubmit = async () => {
        setLoading(true);
        if (file) {
            const data = new FormData();
            data.append("file", file, file.name);
            data.append("usuarioId", 1);
            data.append("descripcion", "Prueba desde Front");

            let response = await callApi('usuario/foto', {
                method: 'POST',
                body: data
            }, true);
            if (response) {
                alert_exitoso("Imagen registrada exitosamente");
                dispatch(UpdateUserInfo());
                setAbrirModal(false);
            }
        } else {
            alert_error("Debe de cargar una imagen");
        }
        setLoading(false);
    }
    const handleCancelar = () => {
        setAbrirModal(false);
    }
    return (
        <Aux>
            {
                loading === true ?
                    <Loading />
                    : <>
                        <Form.Row>
                            <Form.Group as={Col} md="12">
                                <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="6">
                                <button className="btn btn-block btn-danger mb-4" onClick={handleCancelar}>Cancelar</button>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <button className="btn btn-block btn-primary mb-4" onClick={handleSubmit}>Cargar</button>
                            </Form.Group>
                        </Form.Row>
                    </>
            }
        </Aux>
    )
}
