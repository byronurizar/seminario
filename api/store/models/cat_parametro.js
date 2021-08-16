module.exports = (sequelize, type) => {
    return sequelize.define(
        "cat_parametro",
        {
            parametroId: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nombreGrupo: {
                type: type.STRING(100),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            tipoDato: {
                type: type.STRING(20),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            nombreVariable: {
                type: type.STRING(100),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            valor: {
                type: type.STRING(500),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            descripcion: {
                type: type.STRING(300)
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
