module.exports = (sequelize, type) => {
    return sequelize.define(
        "usuario_rol",
        {
            usuario_rolId: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            usuarioId: {
                type: type.INTEGER,
                references: {
                    model: "usuario",
                    key: "usuarioId",
                }
            },
            rolId: {
                type: type.INTEGER,
                references: {
                    model: "cat_rol",
                    key: "rolId",
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
