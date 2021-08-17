module.exports = (sequelize, type) => {
    return sequelize.define(
        "cat_sede_diaco",
        {
            sede_diacoId: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            codigo: {
                type: type.STRING(150),
                unique: true,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            nombre: {
                type: type.STRING(150),
                unique: true,
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
            descripcion: {
                type: type.STRING(300),
                allowNull: true,
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
