module.exports = (sequelize, type) => {
    return sequelize.define(
        "media",
        {
            mediaId: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            quejaId: {
                type: type.INTEGER,
                allowNull: false,
                references: {
                    model: "queja",
                    key: "quejaId",
                }
            },
            mimetype: {
                type: type.STRING(300),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            blob: {
                type: type.BLOB('long'),
                allowNull: false
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
