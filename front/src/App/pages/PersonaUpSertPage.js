import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Tab, Nav } from 'react-bootstrap';
import Aux from '../../hoc/_Aux'
import { PersonaRegistrar } from '../components/base/PersonaRegistrar'
import { IdentificacionListar } from '../components/base/IdentificacionListar';
import { DireccionListar } from '../components/base/DireccionListar';
import { TelefonoListar } from '../components/base/TelefonoListar';
import { DatoExtraListar } from '../components/base/DatoExtraListar';
import { useSelector } from 'react-redux';
const menuId = 12;
const menuIdIdentificacionPersona = 13;
const menuIdTelefonoPersona = 14;
const menuIdDireccionPersona = 15;
const menuIdDatoExtraPersona = 16;

const PersonaUpSertPage = ({ match }) => {
    const state = useSelector(state => state);
    const [accesos, setAccesos] = useState([]);
    let { idpersona } = match.params;
    idpersona = !idpersona ? "" : idpersona;
    let codigoPersona=atob(idpersona).split('=')[1];
    const [personaId, setPersonaId] = useState(codigoPersona);
    const handleSetIdPersona = (id) => {
        setPersonaId(id);
    }

    const GetAccesosByMenuId = () => {
        if (state?.accesos) {
            const { accesos } = state;
            const misAccesos = accesos.filter(item => (item.menuId === menuId || item.menuId === menuIdIdentificacionPersona || item.menuId === menuIdTelefonoPersona || item.menuId === menuIdDireccionPersona || item.menuId === menuIdDatoExtraPersona));
            setAccesos(misAccesos);
        }
    }

    useEffect(() => {
        GetAccesosByMenuId();
    }, []);


    return (
        <Aux>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as='h5'>
                                {
                                    personaId > 0 ? 'Actualización de Información de Persona' : 'Registro de Información de Persona'
                                }
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Tab.Container defaultActiveKey="persona">
                                <Row>
                                    <Col sm={2}>
                                        <Nav variant="pills" className="flex-column">
                                            {
                                                accesos.find(acceso => acceso.menuId === menuId) &&
                                                <Nav.Item>
                                                    <Nav.Link eventKey="persona">Persona</Nav.Link>
                                                </Nav.Item>
                                            }

                                            {
                                                accesos.find(acceso => acceso.menuId === menuIdIdentificacionPersona) &&
                                                <Nav.Item>
                                                    <Nav.Link eventKey="identificaciones" disabled={personaId <= 0 ? true : false}>Identificaciones</Nav.Link>
                                                </Nav.Item>}
                                            {
                                                accesos.find(acceso => acceso.menuId === menuIdDireccionPersona) &&
                                                <Nav.Item>
                                                    <Nav.Link eventKey="direcciones" disabled={personaId <= 0 ? true : false}>Direcciones</Nav.Link>
                                                </Nav.Item>}
                                            {
                                                accesos.find(acceso => acceso.menuId === menuIdTelefonoPersona) &&
                                                <Nav.Item>
                                                    <Nav.Link eventKey="telefonos" disabled={personaId <= 0 ? true : false}>Teléfonos</Nav.Link>
                                                </Nav.Item>
                                            }
                                            {
                                                accesos.find(acceso => acceso.menuId === menuIdDatoExtraPersona) &&
                                                <Nav.Item>
                                                    <Nav.Link eventKey="datosExtra" disabled={personaId <= 0 ? true : false}>Información Adicional</Nav.Link>
                                                </Nav.Item>
                                            }
                                        </Nav>
                                    </Col>
                                    <Col sm={10}>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="persona">
                                                <PersonaRegistrar handleSetIdPersona={handleSetIdPersona} personaId={personaId} />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="identificaciones">
                                                <IdentificacionListar personaId={personaId} />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="direcciones">
                                                <DireccionListar personaId={personaId} />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="telefonos">
                                                <TelefonoListar personaId={personaId} />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="datosExtra">
                                                <DatoExtraListar personaId={personaId} />
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    )
}

export default PersonaUpSertPage;