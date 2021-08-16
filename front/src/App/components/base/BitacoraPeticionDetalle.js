
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import callApi from '../../../helpers/conectorApi';
import Prism from '../../components/Prism';
import Loading from './Loading';
export const BitacoraPeticionDetalle = ({ dataInicial, abrirModal, setAbrirModal }) => {
    const [infoDetalle, setInfoDetalle] = useState({});
    const [loading, setLoading] = useState(true)
    const GetDetalle = async () => {
        let response = await callApi(`bitacora/peticiones/${dataInicial.tipo}/${dataInicial.id}`);
        if (response) {
            setInfoDetalle(response);
        }
        setLoading(false);
    }
    useEffect(() => {
        GetDetalle();
    }, []);
    return (
        <Modal show={abrirModal} onHide={() => setAbrirModal(false)} size="xl">
            {/* {
                loading === true ?
                    <Loading />
                    : <> */}
                        <Modal.Header closeButton>
                            <Modal.Title as="h5">Detalle de Petición</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                infoDetalle &&
                                <Prism code={JSON.stringify(infoDetalle, null, 3)} language="json" />
                            }
                        </Modal.Body>
                    {/* </>
            } */}
        </Modal>
    )
}
