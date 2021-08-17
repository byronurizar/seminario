module.exports = (sequelize, type) => {
    return sequelize.define(
        "queja",
        {
            quejaId: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            sede_diacoId: {
                type: type.INTEGER,
                allowNull: false,
                references: {
                    model: "cat_sede_diaco",
                    key: "sede_diacoId",
                }
            },
            sucursalId: {
                type: type.INTEGER,
                allowNull: false,
                references: {
                    model: "cat_sucursal",
                    key: "sucursalId",
                }
            },
            num_documento: {
                type: type.STRING(200)
            },
            fecha_documento: {
                type: type.DATE
            },
            descripcion: {
                type: type.STRING(3800),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            solicitud: {
                type: type.STRING(3800),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            solucion: {
                type: type.STRING(3800)
            },
            observaciones: {
                type: type.STRING(3800)
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
            estado_quejaId: {
                type: type.INTEGER,
                allowNull: false,
                defaultValue: 1,
                references: {
                    model: "cat_estado_queja",
                    key: "estado_quejaId",
                }
            }
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
};
