module.exports = (sequelize, type) => {
    return sequelize.define(
        "bitacora_cambios",
        {
            bitacora_cambiosId: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            tabla: {
                type: type.STRING(150),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            campo: {
                type: type.STRING(150),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            modificadoId: {
                type: type.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            tipo_dato: {
                type: type.STRING(150)
            },
            valor_anterior: {
                type: type.STRING(1000),
                allowNull: false
            },
            valor_nuevo: {
                type: type.STRING(1000),
                allowNull: false
            },
            usuario_crea: {
                type: type.INTEGER
            },
            fecha_crea: {
                type: type.DATE,
                allowNull: false,
                defaultValue: type.NOW
            }
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
};
