module.exports = (sequelize, type) => {
    return sequelize.define(
        "usuario",
        {
            usuarioId: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            personaId: {
                type: type.INTEGER,
                // references: {
                //     model: "persona",
                //     key: "personaId",
                // }
            },
            user_name: {
                type: type.STRING(50),
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: true
                }
            },
            password: {
                type: type.STRING(300),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            forzar_cambio_password:{
                type: type.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            fecha_cambio_password: {
                type: type.DATE
            },
            dias_cambio_password:{
                type: type.INTEGER,
                defaultValue:90
            },
            intentos_fallidos:{
                type: type.INTEGER,
                defaultValue: 0
            },
            usuario_crea: {
                type: type.INTEGER
            },
            fecha_crea: {
                type: type.DATE,
                allowNull: false,
                defaultValue: type.NOW
            },
            usuario_ult_mod: {
                type: type.INTEGER
            },
            fecha_ult_mod: {
                type: type.DATE
            },
            estadoId: {
                type: type.INTEGER,
                allowNull: false,
                defaultValue: 1,
                references: {
                    model: "cat_estado",
                    key: "estadoId",
                }
            }
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
};
