import React from 'react';

const Login=React.lazy(() => import('./App/components/base/Login'));
const Actualizarcontrasenia=React.lazy(() => import('./App/components/base/ActualizacionContrasenia'));
const route = [
    { path: '/auth/login', exact: true, name: 'Login', component: Login },
    { path: '/admin/change-password', exact: true, name: 'Actualizar Contraseña', component: Actualizarcontrasenia }
];

export default route;