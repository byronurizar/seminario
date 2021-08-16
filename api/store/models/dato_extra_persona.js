module.exports = (sequelize, type) => {
    return sequelize.define(
        "dato_extra_persona",
        {
            dato_extra_personaId: {
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
            tipo_sangreId: {
                type: type.INTEGER,
                references: {
                    model: "cat_tipo_sangre",
                    key: "tipo_sangreId",
                }
            },
            estado_civilId: {
                type: type.INTEGER,
                references: {
                    model: "cat_estado_civil",
                    key: "estado_civilId",
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
