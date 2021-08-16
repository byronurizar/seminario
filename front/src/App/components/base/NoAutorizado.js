import React from 'react'
import { Row, Col, Alert } from 'react-bootstrap';
import Aux from '../../../hoc/_Aux';
export const NoAutorizado = () => {
    return (
        <Aux>
            <Row>
                <Col>
                    <Alert variant="danger">
                        <Alert.Heading as="h4">Información!</Alert.Heading>
                        <p>No esta autorizado para poder visualizar los elementos</p>
                        <hr />
                        <p className="mb-0">Comuniquese con el administrador para la asignación de permisos</p>
                    </Alert>
                </Col>
            </Row>
        </Aux>
    )
}
