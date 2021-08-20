import React from 'react';

const Login=React.lazy(() => import('./App/components/base/Login'));
const Actualizarcontrasenia=React.lazy(() => import('./App/components/base/ActualizacionContrasenia'));
const QuejaPage=React.lazy(() => import('./App/pages/QuejaPage'));
const route = [
    { path: '/auth/login', exact: true, name: 'Login', component: Login },
    { path: '/admin/change-password', exact: true, name: 'Actualizar Contraseña', component: Actualizarcontrasenia }
    { path: '/queja', exact: true, name: 'Registro de Quejas', component: QuejaPage }
];

export default route;