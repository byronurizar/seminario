module.exports = (sequelize, type) => {
    return sequelize.define(
        "menu_acceso",
        {
            menu_accesoId: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            menuId: {
                type: type.INTEGER,
                references: {
                    model: "cat_menu",
                    key: "menuId",
                }
            },
            accesoId: {
                type: type.INTEGER,
                references: {
                    model: "cat_acceso",
                    key: "accesoId",
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
