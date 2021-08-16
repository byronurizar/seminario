module.exports = (sequelize, type) => {
    return sequelize.define(
        "rol_menu_acceso",
        {
            rol_menu_accesoId: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            rolId: {
                type: type.INTEGER,
                references: {
                    model: "cat_rol",
                    key: "rolId",
                }
            },
            menu_accesoId: {
                type: type.INTEGER,
                references: {
                    model: "menu_acceso",
                    key: "menu_accesoId",
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
