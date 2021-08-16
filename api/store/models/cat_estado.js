module.exports = (sequelize, type) => {
    return sequelize.define(
        "cat_estado",
        {
            estadoId: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            descripcion: {
                type: type.STRING(50),
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty:{
                        msg:"El campo no puede ser vacio"
                    }
                }
            },
            activo: {
                type: type.BOOLEAN,
                allowNull: false,
                defaultValue: true,
                validate: {
                    notEmpty: true
                }
            }
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
};
