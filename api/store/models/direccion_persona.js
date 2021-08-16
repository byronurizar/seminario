module.exports = (sequelize, type) => {
    return sequelize.define(
        "direccion_persona",
        {
            direccion_personaId: {
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
            municipioId: {
                type: type.INTEGER,
                references: {
                    model: "cat_municipio",
                    key: "municipioId",
                }
            },
            direccion: {
                type: type.STRING(500),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            punto_referencia: {
                type: type.STRING(500)
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
                // references: {
                //     model: "cat_estado",
                //     key: "estadoId",
                // }
            }
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
};
