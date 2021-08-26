module.exports = (sequelize, type) => {
    return sequelize.define(
        "usuario_sede_diaco",
        {
            usuario_sede_diacoId: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            sede_diacoId: {
                type: type.INTEGER,
                references: {
                    model: "cat_sede_diaco",
                    key: "sede_diacoId",
                }
            },
            usuarioId: {
                type: type.INTEGER,
                references: {
                    model: "usuario",
                    key: "usuarioId",
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
