module.exports = (sequelize, type) => {
    const Rol = sequelize.define(
        "cat_rol",
        {
            rolId: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nombre: {
                type: type.STRING(50),
                allowNull: false,
                unique: true,
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

    // Rol.associate = function(models) {
    //     console.log({models});
    //      Rol.hasMany(models.usuario,{as:'usuario', foreignKey:'rolId',sourceKey:'rolId'});
    // };

    //Nos sirve para poder validar algo antes de darle commit
    // Rol.beforeCreate((rol) => {
    //     const {nombre}=rol.dataValues;
    //     if (nombre != "Nuevo") {
    //         console.log(nombre);
    //         throw new Error("Los datos ingresados no son validos")
    //         console.log("El rol no esta autorizado");
    //     }
    // });
    return Rol;
};
