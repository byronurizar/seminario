import $ from 'jquery';
$.DataTable = require('datatables.net-bs');
require('datatables.net-responsive-bs');

export const asignarEstiloTabla = (selector,filas=10) => {
    $(selector).DataTable({
        searching: true,
        bLengthChange: false,
        bAutoWidth: false,
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
        displayLength: filas,
        language: {
            processing: "Cargando información",
            search: "Filtrar por:",
            lengthMenu: "Mostrar _MENU_ filas",
            info: "Vizualización  _END_ de _TOTAL_ filas",
            infoEmpty: "Vizualización del elemento 0 a 0 de 0 filas",
            infoFiltered: "(Filtrado de _MAX_ filas en total)",
            infoPostFix: "",
            loadingRecords: "Cargando...",
            zeroRecords: "No se logró encontrar ninguna coincidencia",
            emptyTable: "No existen registros",
            paginate: {
                first: "Primera",
                previous: "Anterior",
                next: "Siguiente",
                last: "Ultima"
            },
            aria: {
                sortAscending: ": active para ordenar la columna en orden ascendente",
                sortDescending: ": active para ordenar la columna en orden descendente"
            }
        }
    });
}
export const limpiarEstiloTabla=(selector)=>{
        $(selector).DataTable().destroy();
}