module.exports = (sequelize, type) => {
    return sequelize.define(
        "persona",
        {
            personaId: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nombre1: {
                type: type.STRING(50),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            nombre2: {
                type: type.STRING(50)
            },
            nombre_otros: {
                type: type.STRING(50)
            },
            apellido1: {
                type: type.STRING(50),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            apellido2: {
                type: type.STRING(50)
            },
            apellido_casada: {
                type: type.STRING(50)
            },
            fecha_nacimiento: {
                type: type.DATE,
                allowNull: false
            },
            generoId: {
                type: type.INTEGER,
                references: {
                    model: "cat_genero",
                    key: "generoId",
                }
            },
            email: {
                type: type.STRING(150),
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: true,
                    isEmail: true
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
