const moment = require('moment');
const { BitacoraCambios } = require('../store/db');
const config = require('../config');
const registrarBitacora = async (tabla, modificadoId, dataAnterior, dataNueva) => {
    if (config.api.bitacora_cambios) {
        try {
            
            delete  dataNueva.fecha_crea;
            delete  dataNueva.fecha_ult_mod;
            let keys = Object.keys(dataNueva);
            let { usuario_ult_mod } = dataNueva;
            // console.log({ dataNueva, dataAnterior });
            keys.map(async (campo) => {
                let valor_anterior = dataAnterior[campo];
                let valor_nuevo = dataNueva[campo];
                let tipo_dato;
                if (valor_anterior == null) {
                    valor_anterior = 'null';
                    tipo_dato = 'string';
                }

                // if (valor_anterior !== valor_nuevo && (valor_anterior && valor_nuevo)) {
                if (valor_anterior != valor_nuevo) {
                    tipo_dato = !tipo_dato && typeof(valor_anterior);
                    if (tipo_dato === 'object') {
                        valor_anterior = moment(valor_anterior).format('YYYY/MM/DD HH:mm');
                        valor_nuevo = moment(valor_nuevo).format('YYYY/MM/DD HH:mm');
                    }
                    let data = {
                        tabla,
                        campo,
                        modificadoId,
                        tipo_dato,
                        valor_anterior,
                        valor_nuevo,
                        usuario_crea: usuario_ult_mod
                    }
                    resultado = await BitacoraCambios.create(data);
                }
            });

        } catch (error) {
            console.log("Ocurrio un error al registrar la bitacora", error);
        }
    }
}

module.exports = {
    registrarBitacora
}