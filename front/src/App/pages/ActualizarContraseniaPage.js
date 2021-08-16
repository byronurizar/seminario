import React from 'react'
import Aux from '../../hoc/_Aux'
import { ActualizacionContrasenia } from '../components/base/ActualizacionContrasenia'

const ActualizarContraseniaPage = (props) => {
    return (
        <Aux>
            <div className="auth-wrapper">
                <div className="blur-bg-images" />
                <div className="auth-content">
                    <div className="card">
                        <ActualizacionContrasenia {...props} />
                    </div>
                </div>
            </div>
        </Aux>
    )
}

export default ActualizarContraseniaPage

