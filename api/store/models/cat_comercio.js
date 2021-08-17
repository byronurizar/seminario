module.exports = (sequelize, type) => {
    return sequelize.define(
        "cat_comercio",
        {
            comercioId: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nombre: {
                type: type.STRING(500),
                unique: true,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            razon_social: {
                type: type.STRING(500),
                unique: true,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            nit: {
                type: type.STRING(20),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            telefono: {
                type: type.STRING(150),
                allowNull: true
            },
            correo: {
                type: type.STRING(20),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
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
