import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { QuejaInsert } from '../components/base/QuejaInsert'

const QuejaPage = ({history}) => {
    const handleLogin=()=>{
        history.replace("/auth/login");
    }
    return (
        <>
            <Row className="align-items-center m-l-0">
                <Col />
                <Col className="text-right">
                    <Button variant="info" className="btn-sm btn-round has-ripple" onClick={()=>{handleLogin()}}>Ingresar<i className="feather icon-user" /></Button>
                </Col>
            </Row>
            <QuejaInsert />
        </>
    )
}

export default QuejaPage
