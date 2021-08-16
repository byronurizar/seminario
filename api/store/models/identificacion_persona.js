module.exports = (sequelize, type) => {
    return sequelize.define(
        "identificacion_persona",
        {
            identificacion_personaId: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            personaId: {
                type: type.INTEGER,
                references: {
                    model: "persona",
                    key: "personaId",
                }
            },
            tipo_documentoId: {
                type: type.INTEGER,
                references: {
                    model: "cat_tipo_documento",
                    key: "tipo_documentoId",
                }
            },
            numero_identificacion: {
                type: type.STRING(50),
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: true
                }
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
