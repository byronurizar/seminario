// export default {
//     items: [
//         {
//             "id": "support",
//             "title": "Navigation",
//             "type": "group",
//             "icon": "icon-support",
//             "children": [
//                 {
//                     "id": 22,
//                     "title": "Catálogos",
//                     "type": "collapse",
//                     "icon": "feather icon-sidebar",
//                     "children": [
//                         {
//                             "id": 1,
//                             "title": "Accesos",
//                             "type": "item",
//                             "url": "/seguridad/acceso",
//                             "classes": "nav-item"
//                         },
//                         {
//                             "id": 4,
//                             "title": "Estado Civil",
//                             "type": "item",
//                             "url": "/catalogo/estadocivil",
//                             "classes": "nav-item"
//                         },
//                         {
//                             "id": 5,
//                             "title": "Tipo documento",
//                             "type": "item",
//                             "url": "/catalogo/tipodocumento",
//                             "classes": "nav-item"
//                         },
//                         {
//                             "id": 6,
//                             "title": "Tipo de Sangre",
//                             "type": "item",
//                             "url": "/catalogo/tiposangre",
//                             "classes": "nav-item"
//                         },
//                         {
//                             "id": 7,
//                             "title": "Tipo de Teléfono",
//                             "type": "item",
//                             "url": "/catalogo/tipotelefono",
//                             "classes": "nav-item"
//                         },
//                         {
//                             "id": 8,
//                             "title": "Pais",
//                             "type": "item",
//                             "url": "/catalogo/pais",
//                             "classes": "nav-item"
//                         },
//                         {
//                             "id": 9,
//                             "title": "Departamento",
//                             "type": "item",
//                             "url": "/catalogo/departament",
//                             "classes": "nav-item"
//                         },
//                         {
//                             "id": 10,
//                             "title": "Municipio",
//                             "type": "item",
//                             "url": "/catalogo/municipio",
//                             "classes": "nav-item"
//                         },
//                         {
//                             "id": 12,
//                             "title": "Persona",
//                             "type": "item",
//                             "url": "/catalogo/persona",
//                             "classes": "nav-item"
//                         }
//                     ]
//                 },
//                 {
//                     "id": 23,
//                     "title": "Seguridad",
//                     "type": "collapse",
//                     "icon": "feather icon-sidebar",
//                     "children": [
//                         {
//                             "id": 11,
//                             "title": "Rol",
//                             "type": "item",
//                             "url": "/seguridad/rol",
//                             "classes": "nav-item"
//                         },
//                         {
//                             "id": 17,
//                             "title": "Usuario",
//                             "type": "item",
//                             "url": "/seguridad/usuario",
//                             "classes": "nav-item"
//                         },
//                         {
//                             "id": 21,
//                             "title": "Menu",
//                             "type": "item",
//                             "url": "/seguridad/menu",
//                             "classes": "nav-item"
//                         }
//                     ]
//                 }
//             ]
//         }
//     ]
// }


export default {
    items: [
        {
            id: 'support',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-support',
            children: [
                {
                    id: 'sample-page',
                    title: 'Sample Page',
                    type: 'item',
                    url: '/sample-page',
                    classes: 'nav-item',
                    icon: 'feather icon-sidebar'
                },{
                id: 'catalogos',
                title: 'Catálogos',
                type: 'collapse',
                icon: 'feather icon-sidebar',
                children:[
                    {
                        id: 'pais',
                        title: 'Pais',
                        type: 'item',
                        url: '/catalogo/pais',
                        classes: 'nav-item',
                    },
                    {
                        id: 'departamento',
                        title: 'Departamento',
                        type: 'item',
                        url: '/catalogo/departamento',
                        classes: 'nav-item',
                    },
                    {
                        id: 'municipio',
                        title: 'Municipio',
                        type: 'item',
                        url: '/catalogo/municipio',
                        classes: 'nav-item',
                    },
                    {
                        id: 'tipodocumento',
                        title: 'Tipo Documento',
                        type: 'item',
                        url: '/catalogo/tipodocumento',
                        classes: 'nav-item',
                    },
                    {
                        id: 'tipotelefono',
                        title: 'Tipo Teléfono',
                        type: 'item',
                        url: '/catalogo/tipotelefono',
                        classes: 'nav-item',
                    },
                    {
                        id: 'tiposangre',
                        title: 'Tipo Sangre',
                        type: 'item',
                        url: '/catalogo/tiposangre',
                        classes: 'nav-item',
                    },
                    {
                        id: 'estadocivil',
                        title: 'Estado Civil',
                        type: 'item',
                        url: '/catalogo/estadocivil',
                        classes: 'nav-item',
                    },
                    {
                        id: 'persona',
                        title: 'Persona',
                        type: 'item',
                        url: '/catalogo/persona',
                        classes: 'nav-item',
                    },
                ]
            },
            {
                id: 'seguridad',
                title: 'Seguridad',
                type: 'collapse',
                icon: 'feather icon-sidebar',
                children: [
                    {
                        id: 'login',
                        title: 'Login',
                        type: 'item',
                        url: '/auth/login',
                        classes: 'nav-item',
                    },
                    {
                        id: 'acceso',
                        title: 'Accesos',
                        type: 'item',
                        url: '/seguridad/acceso',
                        classes: 'nav-item',
                    },
                    {
                        id: 'menu',
                        title: 'Menu',
                        type: 'item',
                        url: '/seguridad/menu',
                        classes: 'nav-item',
                    },
                    {
                        id: 'rol',
                        title: 'Rol',
                        type: 'item',
                        url: '/seguridad/rol',
                        classes: 'nav-item',
                    },
                    {
                        id: 'rolmenuacceso',
                        title: 'Rol Menu Acceso',
                        type: 'item',
                        url: '/seguridad/rolmenuacceso/1',
                        classes: 'nav-item',
                    },
                    {
                        id: 'usuario',
                        title: 'Usuarios',
                        type: 'item',
                        url: '/seguridad/usuario',
                        classes: 'nav-item',
                    }
                ]
            }
            ]
        }
    ]
}