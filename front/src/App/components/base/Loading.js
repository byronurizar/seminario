import React from 'react'
import { Col, Row } from 'react-bootstrap'
import ReactLoading from "react-loading";
import Aux from '../../../hoc/_Aux'
const Loading = () => {
    return (
        <Aux>
            <Row>
                <Col>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="items-center justify-center flex flex-column flex-wrap">
                            <ReactLoading type="bars" color="#4681FF" />
                            <h5 className="f5 f4-ns mb0 white">Cargando...</h5>
                        </div>
                    </div>
                </Col>
            </Row>
        </Aux>
    )
}

export default Loading;
