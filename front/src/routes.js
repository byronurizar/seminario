import React from 'react';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;

const home=React.lazy(() => import('./App/pages/HomePage'));
const pais=React.lazy(() => import('./App/pages/PaisPage'));
const departamento=React.lazy(() => import('./App/pages/DepartamentoPage'));
const municipio=React.lazy(() => import('./App/pages/MunicipioPage'));
const tipodocumento=React.lazy(() => import('./App/pages/TipoDocumentoPage'));
const tipotelefono=React.lazy(() => import('./App/pages/TipoTelefonoPage'));
const tiposangre=React.lazy(() => import('./App/pages/TipoSangrePage'));
const estadocivil=React.lazy(() => import('./App/pages/EstadoCivilPage'));
const acceso=React.lazy(() => import('./App/pages/AccesoPage'));
const menu=React.lazy(() => import('./App/pages/MenuPage'));
const rol=React.lazy(() => import('./App/pages/RolPage'));
const rolmenuacceso=React.lazy(() => import('./App/pages/RolMenuAccesoPage'));
const persona = React.lazy(() => import('./App/pages/PersonaPage'));
const personaupsert = React.lazy(() => import('./App/pages/PersonaUpSertPage'));
const usuario = React.lazy(() => import('./App/pages/UsuarioPage'));
const peticion = React.lazy(() => import('./App/pages/BitacoraPeticionesPage'));
const cambios = React.lazy(() => import('./App/pages/BitacoraCambiosPage'));
const infoUser = React.lazy(() => import('./App/pages/InformacionUsuario'));
const noEncontrado = React.lazy(() => import('./App/pages/NoEncontradoPage'));
const routes = [
    { path: '/base/home', exact: true, name: 'Inicio', component: home },
    { path: '/base/catalogo/pais', exact: true, name: 'Pais', component: pais },
    { path: '/base/catalogo/departamento', exact: true, name: 'Departamento', component: departamento },
    { path: '/base/catalogo/municipio', exact: true, name: 'Municipio', component: municipio },
    { path: '/base/catalogo/tipodocumento', exact: true, name: 'TipoDocumento', component: tipodocumento },
    { path: '/base/catalogo/tiposangre', exact: true, name: 'TipoSangre', component: tiposangre },
    { path: '/base/catalogo/tipotelefono', exact: true, name: 'TipoTelefono', component: tipotelefono },
    { path: '/base/catalogo/estadocivil', exact: true, name: 'EstadoCivil', component: estadocivil },
    { path: '/base/catalogo/persona', exact: true, name: 'persona', component: persona },
    { path: '/base/catalogo/personaupsert/:idpersona', exact: true, name: 'personaUpSert', component: personaupsert },
    { path: '/base/catalogo/personaupsert', exact: true, name: 'personaUpSert', component: personaupsert },
    { path: '/base/seguridad/rolmenuacceso/:idrol', exact: true, name: 'RolMenuAcceso', component: rolmenuacceso },
    { path: '/base/seguridad/usuario', exact: true, name: 'Usuario', component: usuario },
    { path: '/base/seguridad/acceso', exact: true, name: 'Acceso', component: acceso },
    { path: '/base/seguridad/menu', exact: true, name: 'Menu', component: menu },
    { path: '/base/seguridad/rol', exact: true, name: 'Rol', component: rol },
    { path: '/base/seguridad/bitacora/peticion', exact: true, name: 'peticion', component: peticion },
    { path: '/base/seguridad/bitacora/cambios', exact: true, name: 'cambios', component: cambios },
    { path: '/base/infouser', exact: true, name: 'infouser', component: infoUser },
    { name: 'noEncontrado', component: noEncontrado }
];

export default routes;