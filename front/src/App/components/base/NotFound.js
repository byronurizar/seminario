import React from 'react'
import { Breadcrumb } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import img404 from '../../../assets/images/maintenance/404.png';
import Aux from '../../../hoc/_Aux';
export const NotFound = () => {
    return (
        <Aux>
        {/* <Breadcrumb/> */}
        <div className="auth-wrapper maintenance">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="text-center">
                        <img src={img404} alt="" className="img-fluid" />
                        <h5 className="text-muted mb-4">Ups! Página no encontrada!</h5>
                        <NavLink to="/" className="btn btn-danger mb-4"><i className="feather icon-refresh-ccw mr-2"/>Reload</NavLink>
                    </div>
                </div>
            </div>
        </div>
    </Aux>
    )
}
