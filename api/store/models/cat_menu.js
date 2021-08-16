module.exports = (sequelize, type) => {
    return sequelize.define(
        "cat_menu",
        {
            menuId: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            posicion: {
                type: type.INTEGER
            },
            descripcion: {
                type: type.STRING(50),
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: true
                }
            },
            href: {
                type: type.STRING(150)
            },
            icono: {
                type: type.STRING(150)
            },
            classes: {
                type: type.STRING(150)
            },
            type: {
                type: type.STRING(150)
            },
            menu_padreId: {
                type: type.INTEGER
            },
            visible: {
                type: type.INTEGER,
                allowNull: false,
                defaultValue: 1
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
