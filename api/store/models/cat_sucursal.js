module.exports = (sequelize, type) => {
    return sequelize.define(
        "cat_sucursal",
        {
            sucursalId: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            comercioId: {
                type: type.INTEGER,
                allowNull: false,
                references: {
                    model: "cat_comercio",
                    key: "comercioId",
                }
            },
            nombre: {
                type: type.STRING(500),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            municipioId: {
                type: type.INTEGER,
                allowNull: false,
                references: {
                    model: "cat_municipio",
                    key: "municipioId",
                }
            },
            direccion: {
                type: type.STRING(500),
            },
            telefono: {
                type: type.STRING(150),
                allowNull: true
            },
            correo: {
                type: type.STRING(100),
                allowNull: false,
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
