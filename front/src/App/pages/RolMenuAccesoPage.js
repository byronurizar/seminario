import React from 'react'
import { RolMenuAccesoListar } from '../components/base/RolMenuAccesoListar';

const RolMenuAccesoPage = ({match}) => {
      let { idrol } = match.params;
    idrol = !idrol ? "" : idrol;
   let codigoRol=atob(idrol).split('=')[1];
    return (
      <RolMenuAccesoListar idrol={codigoRol}/>
    )
}

export default RolMenuAccesoPage;
