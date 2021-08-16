const Sequelize = require('sequelize');
const config = require('../config');
const { QueryTypes } = require('sequelize');


const confiBd = new Sequelize(
  config.bd.database,
  config.bd.username,
  config.bd.password,
  {
    host: config.bd.host,
    dialect: config.bd.dialect,
    port: config.bd.port,
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    logging: false, //Evitamos que nos muestre lo que hace con la bd
     timezone: "-06:00",
  }
);


const EstadoModel = require('./models/cat_estado');
const GeneroModel = require('./models/cat_genero');
const TipoSangreModel = require('./models/cat_tipo_sangre');
const EstadoCivilModel = require('./models/cat_estado_civil');
const TipoDocumentoModel = require('./models/cat_tipo_documento');
const TipoTelefonoModel = require('./models/cat_tipo_telefono');
const PaisModel = require('./models/cat_pais');
const DepartamentoModel = require('./models/cat_departamento');
const MunicipioModel = require('./models/cat_municipio');
const AccesoModel = require('./models/cat_acceso');
const MenuModel = require('./models/cat_menu');
const RolModel = require('./models/cat_rol');
const MenuAccesoModel = require('./models/menu_acceso');
const RolMenuAccesoModel = require('./models/rol_menu_acceso');
const BitacoraCambiosModel = require('./models/bitacora_cambios');
const BitacoraPeticionModel = require('./models/bitacora_peticion');
const PersonaModel = require('./models/persona');
const IdentificacionPersonaModel = require('./models/identificacion_persona');
const DireccionPersonaModel = require('./models/direccion_persona');
const DatoExtraPersonaModel = require('./models/dato_extra_persona');
const UsuarioModel = require('./models/usuario');
const UsuarioRolModel = require('./models/usuario_rol');
const FotoUsuarioModel = require('./models/foto_usuario');
const TelefonoPersonaModel = require('./models/telefono_persona');
const ResetPassWordModel = require('./models/reset_password');
const ParametroModel = require('./models/cat_parametro');


const Estado = EstadoModel(confiBd, Sequelize);
const Genero = GeneroModel(confiBd, Sequelize);
const TipoSangre = TipoSangreModel(confiBd, Sequelize);
const EstadoCivil = EstadoCivilModel(confiBd, Sequelize);
const TipoDocumento = TipoDocumentoModel(confiBd, Sequelize);
const TipoTelefono = TipoTelefonoModel(confiBd, Sequelize);
const Pais = PaisModel(confiBd, Sequelize);
const Departamento = DepartamentoModel(confiBd, Sequelize);
const Municipio = MunicipioModel(confiBd, Sequelize);
const Acceso = AccesoModel(confiBd, Sequelize);
const Menu = MenuModel(confiBd, Sequelize);
const Rol = RolModel(confiBd, Sequelize);
const MenuAcceso = MenuAccesoModel(confiBd, Sequelize);
const RolMenuAcceso = RolMenuAccesoModel(confiBd, Sequelize);
const BitacoraCambios = BitacoraCambiosModel(confiBd, Sequelize);
const BitacoraPeticion = BitacoraPeticionModel(confiBd, Sequelize);
const Persona = PersonaModel(confiBd, Sequelize);
const IdentificacionPersona = IdentificacionPersonaModel(confiBd, Sequelize);
const DireccionPersona = DireccionPersonaModel(confiBd, Sequelize);
const DatoExtraPersona = DatoExtraPersonaModel(confiBd, Sequelize);
const Usuario = UsuarioModel(confiBd, Sequelize);
const UsuarioRol = UsuarioRolModel(confiBd, Sequelize);
const FotoUsuario = FotoUsuarioModel(confiBd, Sequelize);
const TelefonoPersona = TelefonoPersonaModel(confiBd, Sequelize);
const ResetPassWord = ResetPassWordModel(confiBd, Sequelize);
const Parametro = ParametroModel(confiBd, Sequelize);

EstadoCivil.belongsTo(Estado,{
  as: "Estado",
  foreignKey: "estadoId",
  onDelete: "CASCADE",
});

Pais.belongsTo(Estado,{
  as: "Estado",
  foreignKey: "estadoId",
  onDelete: "CASCADE",
});

Departamento.belongsTo(Estado,{
  as: "Estado",
  foreignKey: "estadoId",
  onDelete: "CASCADE",
});

Departamento.belongsTo(Pais,{
  as: "Pais",
  foreignKey: "paisId",
  onDelete: "CASCADE",
});

Municipio.belongsTo(Estado,{
  as: "Estado",
  foreignKey: "estadoId",
  onDelete: "CASCADE",
});

Municipio.belongsTo(Departamento,{
  as: "Departamento",
  foreignKey: "departamentoId",
  onDelete: "CASCADE",
});

TipoDocumento.belongsTo(Estado,{
  as: "Estado",
  foreignKey: "estadoId",
  onDelete: "CASCADE",
});

TipoTelefono.belongsTo(Estado,{
  as: "Estado",
  foreignKey: "estadoId",
  onDelete: "CASCADE",
});

TipoSangre.belongsTo(Estado,{
  as: "Estado",
  foreignKey: "estadoId",
  onDelete: "CASCADE",
});

Acceso.belongsTo(Estado,{
  as: "Estado",
  foreignKey: "estadoId",
  onDelete: "CASCADE",
});

Rol.belongsTo(Estado,{
  as: "Estado",
  foreignKey: "estadoId",
  onDelete: "CASCADE",
});

Persona.belongsTo(Estado,{
  as: "Estado",
  foreignKey: "estadoId",
  onDelete: "CASCADE",
});

Persona.belongsTo(Genero,{
  as: "Genero",
  foreignKey: "generoId",
  onDelete: "CASCADE",
});

Persona.hasMany(Usuario,{
  as: "Usuario",
  foreignKey: "personaId",
  onDelete: "CASCADE",
});

Persona.hasMany(IdentificacionPersona,{
  as: "IdentificacionPersona",
  foreignKey: "personaId",
  onDelete: "CASCADE",
});

Persona.hasMany(DireccionPersona,{
  as: "DireccionPersona",
  foreignKey: "personaId",
  onDelete: "CASCADE",
});

Persona.hasMany(TelefonoPersona,{
  as: "TelefonoPersona",
  foreignKey: "personaId",
  onDelete: "CASCADE",
});

Persona.hasMany(DatoExtraPersona,{
  as: "DatoExtraPersona",
  foreignKey: "personaId",
  onDelete: "CASCADE",
});

IdentificacionPersona.belongsTo(Estado,{
  as: "Estado",
  foreignKey: "estadoId",
  onDelete: "CASCADE",
});

IdentificacionPersona.belongsTo(TipoDocumento,{
  as: "TipoDocumento",
  foreignKey: "tipo_documentoId",
  onDelete: "CASCADE",
});

TelefonoPersona.belongsTo(Estado,{
  as: "Estado",
  foreignKey: "estadoId",
  onDelete: "CASCADE",
});

TelefonoPersona.belongsTo(TipoTelefono,{
  as: "TipoTelefono",
  foreignKey: "tipo_telefonoId",
  onDelete: "CASCADE",
});

DireccionPersona.belongsTo(Estado,{
  as: "Estado",
  foreignKey: "estadoId",
  onDelete: "CASCADE",
});

DireccionPersona.belongsTo(Municipio,{
  as: "Municipio",
  foreignKey: "municipioId",
  onDelete: "CASCADE",
});

DatoExtraPersona.belongsTo(Estado,{
  as: "Estado",
  foreignKey: "estadoId",
  onDelete: "CASCADE",
});

DatoExtraPersona.belongsTo(TipoSangre,{
  as: "TipoSangre",
  foreignKey: "tipo_sangreId",
  onDelete: "CASCADE",
});

DatoExtraPersona.belongsTo(EstadoCivil,{
  as: "EstadoCivil",
  foreignKey: "estado_civilId",
  onDelete: "CASCADE",
});

Usuario.belongsTo(Estado,{
  as: "Estado",
  foreignKey: "estadoId",
  onDelete: "CASCADE",
});

Usuario.belongsTo(Persona,{
  as: "Persona",
  foreignKey: "personaId",
  onDelete: "CASCADE",
});

UsuarioRol.belongsTo(Estado,{
  as: "Estado",
  foreignKey: "estadoId",
  onDelete: "CASCADE",
});

UsuarioRol.belongsTo(Rol,{
  as: "Rol",
  foreignKey: "rolId",
  onDelete: "CASCADE",
});

UsuarioRol.belongsTo(Usuario,{
  as: "Usuario",
  foreignKey: "usuarioId",
  onDelete: "CASCADE",
});

MenuAcceso.belongsTo(Menu,{
  as: "Menu",
  foreignKey: "menuId",
  onDelete: "CASCADE",
});

MenuAcceso.belongsTo(Estado,{
  as: "Estado",
  foreignKey: "estadoId",
  onDelete: "CASCADE",
});

MenuAcceso.belongsTo(Acceso,{
  as: "Acceso",
  foreignKey: "accesoId",
  onDelete: "CASCADE",
});

RolMenuAcceso.belongsTo(Estado,{
  as: "Estado",
  foreignKey: "estadoId",
  onDelete: "CASCADE",
});

RolMenuAcceso.belongsTo(MenuAcceso,{
  as: "MenuAcceso",
  foreignKey: "menu_accesoId",
  onDelete: "CASCADE",
});

Menu.belongsTo(Estado,{
  as: "Estado",
  foreignKey: "estadoId",
  onDelete: "CASCADE",
});

Menu.belongsTo(Menu,{
  as: "MenuPadre",
  foreignKey: "menu_padreId",
  onDelete: "CASCADE",
});

BitacoraCambios.belongsTo(Usuario,{
  as: "Usuario",
  foreignKey: "usuario_crea",
  onDelete: "CASCADE",
});

BitacoraPeticion.belongsTo(Usuario,{
  as: "Usuario",
  foreignKey: "usuario_crea",
  onDelete: "CASCADE",
});

try {
  confiBd.sync({
    force: false,
  }).then(() => {
    const { Estados, Generos, Personas, Usuarios, Paises, Departamentos, Municipios, Menus, Accesos, MenuAccesos, TiposDocumentos, Roles, MenuAccesosRol, TiposTelefonos, EstadosCiviles, TiposSangre, UsuarioRoles, Parametros } = require('./data');
    confiBd.query("select count(*) as total from cat_estado", {
      type: QueryTypes.SELECT
    }).then(async (resultado) => {
      if (resultado[0].total === 0) {
        await Estado.bulkCreate(Estados);
        await Genero.bulkCreate(Generos);
        await Persona.bulkCreate(Personas);
        await Usuario.bulkCreate(Usuarios);
        await Pais.bulkCreate(Paises);
        await Departamento.bulkCreate(Departamentos);
        await Municipio.bulkCreate(Municipios);
        await Menu.bulkCreate(Menus);
        await Acceso.bulkCreate(Accesos);
        await MenuAcceso.bulkCreate(MenuAccesos)
        await TipoDocumento.bulkCreate(TiposDocumentos);
        await Rol.bulkCreate(Roles);
        await RolMenuAcceso.bulkCreate(MenuAccesosRol);
        await TipoTelefono.bulkCreate(TiposTelefonos);
        await EstadoCivil.bulkCreate(EstadosCiviles);
        await TipoSangre.bulkCreate(TiposSangre);
        await UsuarioRol.bulkCreate(UsuarioRoles);
        await Parametro.bulkCreate(Parametros);
      }
    });
  });
} catch (e) {
  console.error(e);
}

module.exports = {
  Estado,
  Genero,
  TipoSangre,
  EstadoCivil,
  TipoDocumento,
  TipoTelefono,
  Pais,
  Departamento,
  Municipio,
  Acceso,
  Menu,
  Rol,
  MenuAcceso,
  RolMenuAcceso,
  BitacoraCambios,
  BitacoraPeticion,
  Persona,
  IdentificacionPersona,
  DireccionPersona,
  DatoExtraPersona,
  Usuario,
  UsuarioRol,
  FotoUsuario,
  TelefonoPersona,
  ResetPassWord,
  Parametro,
  bd: confiBd
}


