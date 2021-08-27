const bcrypt = require('bcrypt')

const Regiones = [
  { regionId: 1, descripcion: "METROPOLITANA", usuario_crea: 1 },
  { regionId: 2, descripcion: "NORTE", usuario_crea: 1 },
  { regionId: 3, descripcion: "NOR-ORIENTE", usuario_crea: 1 },
  { regionId: 4, descripcion: "SUR-ORIENTE", usuario_crea: 1 },
  { regionId: 5, descripcion: "CENTRAL", usuario_crea: 1 },
  { regionId: 6, descripcion: "SUR-OCCIDENTAL", usuario_crea: 1 },
  { regionId: 7, descripcion: "NOR-OCCIDENTAL", usuario_crea: 1 },
  { regionId: 8, descripcion: "PETEN", usuario_crea: 1 }
];
const Departamentos = [
  { departamentoId: 1, regionId: 1, descripcion: "GUATEMALA", usuario_crea: 1 },
  { departamentoId: 2, regionId: 3, descripcion: "EL PROGRESO", usuario_crea: 1 },
  { departamentoId: 3, regionId: 5, descripcion: "SACATEPEQUEZ", usuario_crea: 1 },
  { departamentoId: 4, regionId: 5, descripcion: "CHIMALTENANGO", usuario_crea: 1 },
  { departamentoId: 5, regionId: 5, descripcion: "ESCUINTLA", usuario_crea: 1 },
  { departamentoId: 6, regionId: 4, descripcion: "SANTA ROSA", usuario_crea: 1 },
  { departamentoId: 7, regionId: 6, descripcion: "SOLOLA", usuario_crea: 1 },
  { departamentoId: 8, regionId: 6, descripcion: "TOTONICAPAN", usuario_crea: 1 },
  { departamentoId: 9, regionId: 6, descripcion: "QUETZALTENANGO", usuario_crea: 1 },
  { departamentoId: 10, regionId: 6, descripcion: "SUCHITEPEQUEZ", usuario_crea: 1 },
  { departamentoId: 11, regionId: 6, descripcion: "RETALHULEU", usuario_crea: 1 },
  { departamentoId: 12, regionId: 6, descripcion: "SAN MARCOS", usuario_crea: 1 },
  { departamentoId: 13, regionId: 7, descripcion: "HUEHUETENANGO", usuario_crea: 1 },
  { departamentoId: 14, regionId: 7, descripcion: "EL QUICHE", usuario_crea: 1 },
  { departamentoId: 15, regionId: 2, descripcion: "BAJA VERAPAZ", usuario_crea: 1 },
  { departamentoId: 16, regionId: 2, descripcion: "ALTA VERAPAZ", usuario_crea: 1 },
  { departamentoId: 17, regionId: 8, descripcion: "PETEN", usuario_crea: 1 },
  { departamentoId: 18, regionId: 3, descripcion: "IZABAL", usuario_crea: 1 },
  { departamentoId: 19, regionId: 3, descripcion: "ZACAPA", usuario_crea: 1 },
  { departamentoId: 20, regionId: 3, descripcion: "CHIQUIMULA", usuario_crea: 1 },
  { departamentoId: 21, regionId: 4, descripcion: "JALAPA", usuario_crea: 1 },
  { departamentoId: 22, regionId: 4, descripcion: "JUTIAPA" }
];

const Municipios = [
  {
    "municipioId_depto": 1,
    "departamentoId": 1,
    "descripcion": "GUATEMALA",
    "usuario_crea": 1,
    "municipioId": 1
  },
  {
    "municipioId_depto": 2,
    "departamentoId": 1,
    "descripcion": "SANTA CATARINA PINULA",
    "usuario_crea": 1,
    "municipioId": 2
  },
  {
    "municipioId_depto": 3,
    "departamentoId": 1,
    "descripcion": "SAN JOSE PINULA",
    "usuario_crea": 1,
    "municipioId": 3
  },
  {
    "municipioId_depto": 4,
    "departamentoId": 1,
    "descripcion": "SAN JOSE DEL GOLFO",
    "usuario_crea": 1,
    "municipioId": 4
  },
  {
    "municipioId_depto": 5,
    "departamentoId": 1,
    "descripcion": "PALENCIA",
    "usuario_crea": 1,
    "municipioId": 5
  },
  {
    "municipioId_depto": 6,
    "departamentoId": 1,
    "descripcion": "CHINAUTLA",
    "usuario_crea": 1,
    "municipioId": 6
  },
  {
    "municipioId_depto": 7,
    "departamentoId": 1,
    "descripcion": "SAN PEDRO AYAMPUC",
    "usuario_crea": 1,
    "municipioId": 7
  },
  {
    "municipioId_depto": 8,
    "departamentoId": 1,
    "descripcion": "MIXCO",
    "usuario_crea": 1,
    "municipioId": 8
  },
  {
    "municipioId_depto": 9,
    "departamentoId": 1,
    "descripcion": "SAN PEDRO SACATEPEQUEZ",
    "usuario_crea": 1,
    "municipioId": 9
  },
  {
    "municipioId_depto": 10,
    "departamentoId": 1,
    "descripcion": "SAN JUAN SACATEPEQUEZ",
    "usuario_crea": 1,
    "municipioId": 10
  },
  {
    "municipioId_depto": 10,
    "departamentoId": 6,
    "descripcion": "SANTA MARIA IXHUATAN",
    "usuario_crea": 1,
    "municipioId": 11
  },
  {
    "municipioId_depto": 11,
    "departamentoId": 6,
    "descripcion": "GUAZACAPAN",
    "usuario_crea": 1,
    "municipioId": 12
  },
  {
    "municipioId_depto": 12,
    "departamentoId": 6,
    "descripcion": "SANTA CRUZ NARANJO",
    "usuario_crea": 1,
    "municipioId": 13
  },
  {
    "municipioId_depto": 13,
    "departamentoId": 6,
    "descripcion": "PUEBLO NUEVO VIÑAS",
    "usuario_crea": 1,
    "municipioId": 14
  },
  {
    "municipioId_depto": 14,
    "departamentoId": 6,
    "descripcion": "NUEVA SANTA ROSA",
    "usuario_crea": 1,
    "municipioId": 15
  },
  {
    "municipioId_depto": 1,
    "departamentoId": 7,
    "descripcion": "SOLOLA",
    "usuario_crea": 1,
    "municipioId": 16
  },
  {
    "municipioId_depto": 2,
    "departamentoId": 7,
    "descripcion": "SAN JOSE CHACAYA",
    "usuario_crea": 1,
    "municipioId": 17
  },
  {
    "municipioId_depto": 3,
    "departamentoId": 7,
    "descripcion": "SANTA MARIA VISITACION",
    "usuario_crea": 1,
    "municipioId": 18
  },
  {
    "municipioId_depto": 4,
    "departamentoId": 7,
    "descripcion": "SANTA LUCIA UTATLAN",
    "usuario_crea": 1,
    "municipioId": 19
  },
  {
    "municipioId_depto": 17,
    "departamentoId": 10,
    "descripcion": "SANTO TOMAS LA UNION",
    "usuario_crea": 1,
    "municipioId": 20
  },
  {
    "municipioId_depto": 18,
    "departamentoId": 10,
    "descripcion": "ZUNILITO",
    "usuario_crea": 1,
    "municipioId": 21
  },
  {
    "municipioId_depto": 19,
    "departamentoId": 10,
    "descripcion": "PUEBLO NUEVO",
    "usuario_crea": 1,
    "municipioId": 22
  },
  {
    "municipioId_depto": 20,
    "departamentoId": 10,
    "descripcion": "RIO BRAVO",
    "usuario_crea": 1,
    "municipioId": 23
  },
  {
    "municipioId_depto": 1,
    "departamentoId": 11,
    "descripcion": "RETALHULEU",
    "usuario_crea": 1,
    "municipioId": 24
  },
  {
    "municipioId_depto": 2,
    "departamentoId": 11,
    "descripcion": "SAN SEBASTIAN",
    "usuario_crea": 1,
    "municipioId": 25
  },
  {
    "municipioId_depto": 3,
    "departamentoId": 11,
    "descripcion": "SANTA CRUZ MULUA",
    "usuario_crea": 1,
    "municipioId": 26
  },
  {
    "municipioId_depto": 4,
    "departamentoId": 11,
    "descripcion": "SAN MARTIN ZAPOTITLAN",
    "usuario_crea": 1,
    "municipioId": 27
  },
  {
    "municipioId_depto": 5,
    "departamentoId": 11,
    "descripcion": "SAN FELIPE",
    "usuario_crea": 1,
    "municipioId": 28
  },
  {
    "municipioId_depto": 6,
    "departamentoId": 11,
    "descripcion": "SAN ANDRES VILLA SECA",
    "usuario_crea": 1,
    "municipioId": 29
  },
  {
    "municipioId_depto": 7,
    "departamentoId": 11,
    "descripcion": "CHAMPERICO",
    "usuario_crea": 1,
    "municipioId": 30
  },
  {
    "municipioId_depto": 7,
    "departamentoId": 14,
    "descripcion": "PATZITE",
    "usuario_crea": 1,
    "municipioId": 31
  },
  {
    "municipioId_depto": 8,
    "departamentoId": 14,
    "descripcion": "SAN ANTONIO ILOTENANGO",
    "usuario_crea": 1,
    "municipioId": 32
  },
  {
    "municipioId_depto": 9,
    "departamentoId": 14,
    "descripcion": "SAN PEDRO JOCOPILAS",
    "usuario_crea": 1,
    "municipioId": 33
  },
  {
    "municipioId_depto": 10,
    "departamentoId": 14,
    "descripcion": "CUNEN",
    "usuario_crea": 1,
    "municipioId": 34
  },
  {
    "municipioId_depto": 11,
    "departamentoId": 14,
    "descripcion": "SAN JUAN COTZAL",
    "usuario_crea": 1,
    "municipioId": 35
  },
  {
    "municipioId_depto": 12,
    "departamentoId": 14,
    "descripcion": "JOYABAJ",
    "usuario_crea": 1,
    "municipioId": 36
  },
  {
    "municipioId_depto": 13,
    "departamentoId": 14,
    "descripcion": "NEBAJ",
    "usuario_crea": 1,
    "municipioId": 37
  },
  {
    "municipioId_depto": 14,
    "departamentoId": 14,
    "descripcion": "SAN ANDRES SAJCABAJA",
    "usuario_crea": 1,
    "municipioId": 38
  },
  {
    "municipioId_depto": 15,
    "departamentoId": 14,
    "descripcion": "USPANTAN",
    "usuario_crea": 1,
    "municipioId": 39
  },
  {
    "municipioId_depto": 16,
    "departamentoId": 14,
    "descripcion": "SACAPULAS",
    "usuario_crea": 1,
    "municipioId": 40
  },
  {
    "municipioId_depto": 17,
    "departamentoId": 14,
    "descripcion": "SAN BARTOLOME JOCOTENANGO",
    "usuario_crea": 1,
    "municipioId": 41
  },
  {
    "municipioId_depto": 18,
    "departamentoId": 14,
    "descripcion": "CANILLA",
    "usuario_crea": 1,
    "municipioId": 42
  },
  {
    "municipioId_depto": 19,
    "departamentoId": 14,
    "descripcion": "CHICAMAN",
    "usuario_crea": 1,
    "municipioId": 43
  },
  {
    "municipioId_depto": 17,
    "departamentoId": 1,
    "descripcion": "SAN MIGUEL PETAPA",
    "usuario_crea": 1,
    "municipioId": 44
  },
  {
    "municipioId_depto": 10,
    "departamentoId": 11,
    "descripcion": "INVALIDO",
    "usuario_crea": 1,
    "municipioId": 45
  },
  {
    "municipioId_depto": 6,
    "departamentoId": 20,
    "descripcion": "INVALIDO-OLAPA",
    "usuario_crea": 1,
    "municipioId": 46
  },
  {
    "municipioId_depto": 11,
    "departamentoId": 1,
    "descripcion": "SAN RAYMUNDO",
    "usuario_crea": 1,
    "municipioId": 47
  },
  {
    "municipioId_depto": 12,
    "departamentoId": 1,
    "descripcion": "CHUARANCHO",
    "usuario_crea": 1,
    "municipioId": 48
  },
  {
    "municipioId_depto": 13,
    "departamentoId": 1,
    "descripcion": "FRAIJANES",
    "usuario_crea": 1,
    "municipioId": 49
  },
  {
    "municipioId_depto": 14,
    "departamentoId": 1,
    "descripcion": "AMATITLAN",
    "usuario_crea": 1,
    "municipioId": 50
  },
  {
    "municipioId_depto": 15,
    "departamentoId": 1,
    "descripcion": "VILLA NUEVA",
    "usuario_crea": 1,
    "municipioId": 51
  },
  {
    "municipioId_depto": 16,
    "departamentoId": 1,
    "descripcion": "VILLA CANALES",
    "usuario_crea": 1,
    "municipioId": 52
  },
  {
    "municipioId_depto": 1,
    "departamentoId": 2,
    "descripcion": "GUASTATOYA",
    "usuario_crea": 1,
    "municipioId": 53
  },
  {
    "municipioId_depto": 2,
    "departamentoId": 2,
    "descripcion": "MORAZAN",
    "usuario_crea": 1,
    "municipioId": 54
  },
  {
    "municipioId_depto": 3,
    "departamentoId": 2,
    "descripcion": "SAN AGUSTIN ACASAGUASTLAN",
    "usuario_crea": 1,
    "municipioId": 55
  },
  {
    "municipioId_depto": 4,
    "departamentoId": 2,
    "descripcion": "SAN CRISTOBAL ACASAGUASTLAN",
    "usuario_crea": 1,
    "municipioId": 56
  },
  {
    "municipioId_depto": 5,
    "departamentoId": 2,
    "descripcion": "EL JICARO",
    "usuario_crea": 1,
    "municipioId": 57
  },
  {
    "municipioId_depto": 6,
    "departamentoId": 2,
    "descripcion": "SANSARE",
    "usuario_crea": 1,
    "municipioId": 58
  },
  {
    "municipioId_depto": 7,
    "departamentoId": 2,
    "descripcion": "SANARATE",
    "usuario_crea": 1,
    "municipioId": 59
  },
  {
    "municipioId_depto": 8,
    "departamentoId": 2,
    "descripcion": "SAN ANTONIO LA PAZ",
    "usuario_crea": 1,
    "municipioId": 60
  },
  {
    "municipioId_depto": 1,
    "departamentoId": 3,
    "descripcion": "ANTIGUA GUATEMALA",
    "usuario_crea": 1,
    "municipioId": 61
  },
  {
    "municipioId_depto": 2,
    "departamentoId": 3,
    "descripcion": "JOCOTENANGO",
    "usuario_crea": 1,
    "municipioId": 62
  },
  {
    "municipioId_depto": 3,
    "departamentoId": 3,
    "descripcion": "PASTORES",
    "usuario_crea": 1,
    "municipioId": 63
  },
  {
    "municipioId_depto": 4,
    "departamentoId": 3,
    "descripcion": "SUMPANGO",
    "usuario_crea": 1,
    "municipioId": 64
  },
  {
    "municipioId_depto": 5,
    "departamentoId": 3,
    "descripcion": "SANTO DOMINGO XENACOJ",
    "usuario_crea": 1,
    "municipioId": 65
  },
  {
    "municipioId_depto": 6,
    "departamentoId": 3,
    "descripcion": "SANTIAGO SACATEPEQUEZ",
    "usuario_crea": 1,
    "municipioId": 66
  },
  {
    "municipioId_depto": 7,
    "departamentoId": 3,
    "descripcion": "SAN BARTOLOME MILPAS ALTAS",
    "usuario_crea": 1,
    "municipioId": 67
  },
  {
    "municipioId_depto": 8,
    "departamentoId": 3,
    "descripcion": "SAN LUCAS SACATEPEQUEZ",
    "usuario_crea": 1,
    "municipioId": 68
  },
  {
    "municipioId_depto": 9,
    "departamentoId": 3,
    "descripcion": "SANTA LUCIA MILPAS ALTAS",
    "usuario_crea": 1,
    "municipioId": 69
  },
  {
    "municipioId_depto": 10,
    "departamentoId": 3,
    "descripcion": "MAGDALENA MILPAS ALTAS",
    "usuario_crea": 1,
    "municipioId": 70
  },
  {
    "municipioId_depto": 11,
    "departamentoId": 3,
    "descripcion": "SANTA MARIA DE JESUS",
    "usuario_crea": 1,
    "municipioId": 71
  },
  {
    "municipioId_depto": 12,
    "departamentoId": 3,
    "descripcion": "CIUDAD VIEJA",
    "usuario_crea": 1,
    "municipioId": 72
  },
  {
    "municipioId_depto": 13,
    "departamentoId": 3,
    "descripcion": "SAN MIGUEL DUEÑAS",
    "usuario_crea": 1,
    "municipioId": 73
  },
  {
    "municipioId_depto": 14,
    "departamentoId": 3,
    "descripcion": "SAN JUAN ALOTENANGO",
    "usuario_crea": 1,
    "municipioId": 74
  },
  {
    "municipioId_depto": 15,
    "departamentoId": 3,
    "descripcion": "SAN ANTONIO AGUAS CALIENTES",
    "usuario_crea": 1,
    "municipioId": 75
  },
  {
    "municipioId_depto": 16,
    "departamentoId": 3,
    "descripcion": "SANTA CATARINA BARAHONA",
    "usuario_crea": 1,
    "municipioId": 76
  },
  {
    "municipioId_depto": 1,
    "departamentoId": 4,
    "descripcion": "CHIMALTENANGO",
    "usuario_crea": 1,
    "municipioId": 77
  },
  {
    "municipioId_depto": 2,
    "departamentoId": 4,
    "descripcion": "SAN JOSE POAQUIL",
    "usuario_crea": 1,
    "municipioId": 78
  },
  {
    "municipioId_depto": 3,
    "departamentoId": 4,
    "descripcion": "SAN MARTIN JILOTEPEQUE",
    "usuario_crea": 1,
    "municipioId": 79
  },
  {
    "municipioId_depto": 4,
    "departamentoId": 4,
    "descripcion": "SAN JUAN COMALAPA",
    "usuario_crea": 1,
    "municipioId": 80
  },
  {
    "municipioId_depto": 5,
    "departamentoId": 4,
    "descripcion": "SANTA APOLONIA",
    "usuario_crea": 1,
    "municipioId": 81
  },
  {
    "municipioId_depto": 6,
    "departamentoId": 4,
    "descripcion": "TECPAN GUATEMALA",
    "usuario_crea": 1,
    "municipioId": 82
  },
  {
    "municipioId_depto": 7,
    "departamentoId": 4,
    "descripcion": "PATZUN",
    "usuario_crea": 1,
    "municipioId": 83
  },
  {
    "municipioId_depto": 8,
    "departamentoId": 4,
    "descripcion": "POCHUTA",
    "usuario_crea": 1,
    "municipioId": 84
  },
  {
    "municipioId_depto": 9,
    "departamentoId": 4,
    "descripcion": "PATZICIA",
    "usuario_crea": 1,
    "municipioId": 85
  },
  {
    "municipioId_depto": 10,
    "departamentoId": 4,
    "descripcion": "SANTA CRUZ BALANYA",
    "usuario_crea": 1,
    "municipioId": 86
  },
  {
    "municipioId_depto": 11,
    "departamentoId": 4,
    "descripcion": "ACATENANGO",
    "usuario_crea": 1,
    "municipioId": 87
  },
  {
    "municipioId_depto": 12,
    "departamentoId": 4,
    "descripcion": "YEPOCAPA",
    "usuario_crea": 1,
    "municipioId": 88
  },
  {
    "municipioId_depto": 13,
    "departamentoId": 4,
    "descripcion": "SAN ANDRES ITZAPA",
    "usuario_crea": 1,
    "municipioId": 89
  },
  {
    "municipioId_depto": 14,
    "departamentoId": 4,
    "descripcion": "PARRAMOS",
    "usuario_crea": 1,
    "municipioId": 90
  },
  {
    "municipioId_depto": 15,
    "departamentoId": 4,
    "descripcion": "ZARAGOZA",
    "usuario_crea": 1,
    "municipioId": 91
  },
  {
    "municipioId_depto": 16,
    "departamentoId": 4,
    "descripcion": "EL TEJAR",
    "usuario_crea": 1,
    "municipioId": 92
  },
  {
    "municipioId_depto": 1,
    "departamentoId": 5,
    "descripcion": "ESCUINTLA",
    "usuario_crea": 1,
    "municipioId": 93
  },
  {
    "municipioId_depto": 2,
    "departamentoId": 5,
    "descripcion": "SANTA LUCIA COTZUMALGUAPA",
    "usuario_crea": 1,
    "municipioId": 94
  },
  {
    "municipioId_depto": 3,
    "departamentoId": 5,
    "descripcion": "LA DEMOCRACIA",
    "usuario_crea": 1,
    "municipioId": 95
  },
  {
    "municipioId_depto": 4,
    "departamentoId": 5,
    "descripcion": "SIQUINALA",
    "usuario_crea": 1,
    "municipioId": 96
  },
  {
    "municipioId_depto": 5,
    "departamentoId": 5,
    "descripcion": "MASAGUA",
    "usuario_crea": 1,
    "municipioId": 97
  },
  {
    "municipioId_depto": 6,
    "departamentoId": 5,
    "descripcion": "TIQUISATE",
    "usuario_crea": 1,
    "municipioId": 98
  },
  {
    "municipioId_depto": 7,
    "departamentoId": 5,
    "descripcion": "LA GOMERA",
    "usuario_crea": 1,
    "municipioId": 99
  },
  {
    "municipioId_depto": 8,
    "departamentoId": 5,
    "descripcion": "GUANAGAZAPA",
    "usuario_crea": 1,
    "municipioId": 100
  },
  {
    "municipioId_depto": 9,
    "departamentoId": 5,
    "descripcion": "PUERTO SAN JOSE",
    "usuario_crea": 1,
    "municipioId": 101
  },
  {
    "municipioId_depto": 10,
    "departamentoId": 5,
    "descripcion": "IZTAPA",
    "usuario_crea": 1,
    "municipioId": 102
  },
  {
    "municipioId_depto": 11,
    "departamentoId": 5,
    "descripcion": "PALIN",
    "usuario_crea": 1,
    "municipioId": 103
  },
  {
    "municipioId_depto": 12,
    "departamentoId": 5,
    "descripcion": "SAN VICENTE PACAYA",
    "usuario_crea": 1,
    "municipioId": 104
  },
  {
    "municipioId_depto": 13,
    "departamentoId": 5,
    "descripcion": "NUEVA CONCEPCION",
    "usuario_crea": 1,
    "municipioId": 105
  },
  {
    "municipioId_depto": 1,
    "departamentoId": 6,
    "descripcion": "CUILAPA",
    "usuario_crea": 1,
    "municipioId": 106
  },
  {
    "municipioId_depto": 2,
    "departamentoId": 6,
    "descripcion": "BARBERENA",
    "usuario_crea": 1,
    "municipioId": 107
  },
  {
    "municipioId_depto": 3,
    "departamentoId": 6,
    "descripcion": "SANTA ROSA DE LIMA",
    "usuario_crea": 1,
    "municipioId": 108
  },
  {
    "municipioId_depto": 4,
    "departamentoId": 6,
    "descripcion": "CASILLAS",
    "usuario_crea": 1,
    "municipioId": 109
  },
  {
    "municipioId_depto": 5,
    "departamentoId": 6,
    "descripcion": "SAN RAFAEL LAS FLORES",
    "usuario_crea": 1,
    "municipioId": 110
  },
  {
    "municipioId_depto": 6,
    "departamentoId": 6,
    "descripcion": "ORATORIO",
    "usuario_crea": 1,
    "municipioId": 111
  },
  {
    "municipioId_depto": 7,
    "departamentoId": 6,
    "descripcion": "SAN JUAN TECUACO",
    "usuario_crea": 1,
    "municipioId": 112
  },
  {
    "municipioId_depto": 8,
    "departamentoId": 6,
    "descripcion": "CHIQUIMULILLA",
    "usuario_crea": 1,
    "municipioId": 113
  },
  {
    "municipioId_depto": 9,
    "departamentoId": 6,
    "descripcion": "TAXISCO",
    "usuario_crea": 1,
    "municipioId": 114
  },
  {
    "municipioId_depto": 5,
    "departamentoId": 7,
    "descripcion": "NAHUALA",
    "usuario_crea": 1,
    "municipioId": 115
  },
  {
    "municipioId_depto": 6,
    "departamentoId": 7,
    "descripcion": "SANTA CATARINA IXTAHUACAN",
    "usuario_crea": 1,
    "municipioId": 116
  },
  {
    "municipioId_depto": 7,
    "departamentoId": 7,
    "descripcion": "SANTA CLARA LA LAGUNA",
    "usuario_crea": 1,
    "municipioId": 117
  },
  {
    "municipioId_depto": 8,
    "departamentoId": 7,
    "descripcion": "CONCEPCION",
    "usuario_crea": 1,
    "municipioId": 118
  },
  {
    "municipioId_depto": 9,
    "departamentoId": 7,
    "descripcion": "SAN ANDRES SEMETABAJ",
    "usuario_crea": 1,
    "municipioId": 119
  },
  {
    "municipioId_depto": 10,
    "departamentoId": 7,
    "descripcion": "PANAJACHEL",
    "usuario_crea": 1,
    "municipioId": 120
  },
  {
    "municipioId_depto": 11,
    "departamentoId": 7,
    "descripcion": "SANTA CATARINA PALOPO",
    "usuario_crea": 1,
    "municipioId": 121
  },
  {
    "municipioId_depto": 12,
    "departamentoId": 7,
    "descripcion": "SAN ANTONIO PALOPO",
    "usuario_crea": 1,
    "municipioId": 122
  },
  {
    "municipioId_depto": 13,
    "departamentoId": 7,
    "descripcion": "SAN LUCAS TOLIMAN",
    "usuario_crea": 1,
    "municipioId": 123
  },
  {
    "municipioId_depto": 14,
    "departamentoId": 7,
    "descripcion": "SANTA CRUZ LA LAGUNA",
    "usuario_crea": 1,
    "municipioId": 124
  },
  {
    "municipioId_depto": 15,
    "departamentoId": 7,
    "descripcion": "SAN PABLO LA LAGUNA",
    "usuario_crea": 1,
    "municipioId": 125
  },
  {
    "municipioId_depto": 16,
    "departamentoId": 7,
    "descripcion": "SAN MARCOS LA LAGUNA",
    "usuario_crea": 1,
    "municipioId": 126
  },
  {
    "municipioId_depto": 17,
    "departamentoId": 7,
    "descripcion": "SAN JUAN LA LAGUNA",
    "usuario_crea": 1,
    "municipioId": 127
  },
  {
    "municipioId_depto": 18,
    "departamentoId": 7,
    "descripcion": "SAN PEDRO LA LAGUNA",
    "usuario_crea": 1,
    "municipioId": 128
  },
  {
    "municipioId_depto": 19,
    "departamentoId": 7,
    "descripcion": "SANTIAGO ATITLAN",
    "usuario_crea": 1,
    "municipioId": 129
  },
  {
    "municipioId_depto": 1,
    "departamentoId": 8,
    "descripcion": "TOTONICAPAN",
    "usuario_crea": 1,
    "municipioId": 130
  },
  {
    "municipioId_depto": 2,
    "departamentoId": 8,
    "descripcion": "SAN CRISTOBAL TOTONICAPAN",
    "usuario_crea": 1,
    "municipioId": 131
  },
  {
    "municipioId_depto": 3,
    "departamentoId": 8,
    "descripcion": "SAN FRANCISCO EL ALTO",
    "usuario_crea": 1,
    "municipioId": 132
  },
  {
    "municipioId_depto": 4,
    "departamentoId": 8,
    "descripcion": "SAN ANDRES XECUL",
    "usuario_crea": 1,
    "municipioId": 133
  },
  {
    "municipioId_depto": 5,
    "departamentoId": 8,
    "descripcion": "MOMOSTENANGO",
    "usuario_crea": 1,
    "municipioId": 134
  },
  {
    "municipioId_depto": 6,
    "departamentoId": 8,
    "descripcion": "SANTA MARIA CHIQUIMULA",
    "usuario_crea": 1,
    "municipioId": 135
  },
  {
    "municipioId_depto": 7,
    "departamentoId": 8,
    "descripcion": "SANTA LUCIA LA REFORMA",
    "usuario_crea": 1,
    "municipioId": 136
  },
  {
    "municipioId_depto": 8,
    "departamentoId": 8,
    "descripcion": "SAN BARTOLO",
    "usuario_crea": 1,
    "municipioId": 137
  },
  {
    "municipioId_depto": 1,
    "departamentoId": 9,
    "descripcion": "QUETZALTENANGO",
    "usuario_crea": 1,
    "municipioId": 138
  },
  {
    "municipioId_depto": 2,
    "departamentoId": 9,
    "descripcion": "SALCAJA",
    "usuario_crea": 1,
    "municipioId": 139
  },
  {
    "municipioId_depto": 3,
    "departamentoId": 9,
    "descripcion": "OLINTEPEQUE",
    "usuario_crea": 1,
    "municipioId": 140
  },
  {
    "municipioId_depto": 4,
    "departamentoId": 9,
    "descripcion": "SAN CARLOS SIJA",
    "usuario_crea": 1,
    "municipioId": 141
  },
  {
    "municipioId_depto": 5,
    "departamentoId": 9,
    "descripcion": "SIBILIA",
    "usuario_crea": 1,
    "municipioId": 142
  },
  {
    "municipioId_depto": 6,
    "departamentoId": 9,
    "descripcion": "CABRICAN",
    "usuario_crea": 1,
    "municipioId": 143
  },
  {
    "municipioId_depto": 7,
    "departamentoId": 9,
    "descripcion": "CAJOLA",
    "usuario_crea": 1,
    "municipioId": 144
  },
  {
    "municipioId_depto": 8,
    "departamentoId": 9,
    "descripcion": "SAN MIGUEL SIGUILA",
    "usuario_crea": 1,
    "municipioId": 145
  },
  {
    "municipioId_depto": 9,
    "departamentoId": 9,
    "descripcion": "SAN JUAN OSTUNCALCO",
    "usuario_crea": 1,
    "municipioId": 146
  },
  {
    "municipioId_depto": 10,
    "departamentoId": 9,
    "descripcion": "SAN MATEO",
    "usuario_crea": 1,
    "municipioId": 147
  },
  {
    "municipioId_depto": 11,
    "departamentoId": 9,
    "descripcion": "CONCEPCION CHIQUIRICHAPA",
    "usuario_crea": 1,
    "municipioId": 148
  },
  {
    "municipioId_depto": 12,
    "departamentoId": 9,
    "descripcion": "SAN MARTIN SACATEPEQUEZ",
    "usuario_crea": 1,
    "municipioId": 149
  },
  {
    "municipioId_depto": 13,
    "departamentoId": 9,
    "descripcion": "ALMOLONGA",
    "usuario_crea": 1,
    "municipioId": 150
  },
  {
    "municipioId_depto": 14,
    "departamentoId": 9,
    "descripcion": "CANTEL",
    "usuario_crea": 1,
    "municipioId": 151
  },
  {
    "municipioId_depto": 15,
    "departamentoId": 9,
    "descripcion": "HUITAN",
    "usuario_crea": 1,
    "municipioId": 152
  },
  {
    "municipioId_depto": 16,
    "departamentoId": 9,
    "descripcion": "ZUNIL",
    "usuario_crea": 1,
    "municipioId": 153
  },
  {
    "municipioId_depto": 17,
    "departamentoId": 9,
    "descripcion": "COLOMBA",
    "usuario_crea": 1,
    "municipioId": 154
  },
  {
    "municipioId_depto": 18,
    "departamentoId": 9,
    "descripcion": "SAN FRANCISCO LA UNION",
    "usuario_crea": 1,
    "municipioId": 155
  },
  {
    "municipioId_depto": 19,
    "departamentoId": 9,
    "descripcion": "EL PALMAR",
    "usuario_crea": 1,
    "municipioId": 156
  },
  {
    "municipioId_depto": 20,
    "departamentoId": 9,
    "descripcion": "COATEPEQUE",
    "usuario_crea": 1,
    "municipioId": 157
  },
  {
    "municipioId_depto": 21,
    "departamentoId": 9,
    "descripcion": "GENOVA",
    "usuario_crea": 1,
    "municipioId": 158
  },
  {
    "municipioId_depto": 22,
    "departamentoId": 9,
    "descripcion": "FLORES COSTA CUCA",
    "usuario_crea": 1,
    "municipioId": 159
  },
  {
    "municipioId_depto": 23,
    "departamentoId": 9,
    "descripcion": "LA ESPERANZA",
    "usuario_crea": 1,
    "municipioId": 160
  },
  {
    "municipioId_depto": 24,
    "departamentoId": 9,
    "descripcion": "PALESTINA DE LOS ALTOS",
    "usuario_crea": 1,
    "municipioId": 161
  },
  {
    "municipioId_depto": 25,
    "departamentoId": 9,
    "descripcion": "SAN FRANCISCO(INVALIDO)",
    "usuario_crea": 1,
    "municipioId": 162
  },
  {
    "municipioId_depto": 32,
    "departamentoId": 13,
    "descripcion": "UNION CANTINIL",
    "usuario_crea": 1,
    "municipioId": 163
  },
  {
    "municipioId_depto": 18,
    "departamentoId": 16,
    "descripcion": "RAXRUHA",
    "usuario_crea": 1,
    "municipioId": 164
  },
  {
    "municipioId_depto": 1,
    "departamentoId": 10,
    "descripcion": "MAZATENANGO",
    "usuario_crea": 1,
    "municipioId": 165
  },
  {
    "municipioId_depto": 2,
    "departamentoId": 10,
    "descripcion": "CUYOTENANGO",
    "usuario_crea": 1,
    "municipioId": 166
  },
  {
    "municipioId_depto": 3,
    "departamentoId": 10,
    "descripcion": "SAN FRANCISCO ZAPOTITLAN",
    "usuario_crea": 1,
    "municipioId": 167
  },
  {
    "municipioId_depto": 4,
    "departamentoId": 10,
    "descripcion": "SAN BERNARDINO",
    "usuario_crea": 1,
    "municipioId": 168
  },
  {
    "municipioId_depto": 5,
    "departamentoId": 10,
    "descripcion": "SAN JOSE EL IDOLO",
    "usuario_crea": 1,
    "municipioId": 169
  },
  {
    "municipioId_depto": 6,
    "departamentoId": 10,
    "descripcion": "SANTO DOMINGO SUCHITEPEQUEZ",
    "usuario_crea": 1,
    "municipioId": 170
  },
  {
    "municipioId_depto": 7,
    "departamentoId": 10,
    "descripcion": "SAN LORENZO",
    "usuario_crea": 1,
    "municipioId": 171
  },
  {
    "municipioId_depto": 8,
    "departamentoId": 10,
    "descripcion": "SAMAYAC",
    "usuario_crea": 1,
    "municipioId": 172
  },
  {
    "municipioId_depto": 9,
    "departamentoId": 10,
    "descripcion": "SAN PABLO JOCOPILAS",
    "usuario_crea": 1,
    "municipioId": 173
  },
  {
    "municipioId_depto": 10,
    "departamentoId": 10,
    "descripcion": "SAN ANTONIO SUCHITEPEQUEZ",
    "usuario_crea": 1,
    "municipioId": 174
  },
  {
    "municipioId_depto": 11,
    "departamentoId": 10,
    "descripcion": "SAN MIGUEL PANAN",
    "usuario_crea": 1,
    "municipioId": 175
  },
  {
    "municipioId_depto": 12,
    "departamentoId": 10,
    "descripcion": "SAN GABRIEL",
    "usuario_crea": 1,
    "municipioId": 176
  },
  {
    "municipioId_depto": 13,
    "departamentoId": 10,
    "descripcion": "CHICACAO",
    "usuario_crea": 1,
    "municipioId": 177
  },
  {
    "municipioId_depto": 14,
    "departamentoId": 10,
    "descripcion": "PATULUL",
    "usuario_crea": 1,
    "municipioId": 178
  },
  {
    "municipioId_depto": 15,
    "departamentoId": 10,
    "descripcion": "SANTA BARBARA",
    "usuario_crea": 1,
    "municipioId": 179
  },
  {
    "municipioId_depto": 16,
    "departamentoId": 10,
    "descripcion": "SAN JUAN BAUTISTA",
    "usuario_crea": 1,
    "municipioId": 180
  },
  {
    "municipioId_depto": 8,
    "departamentoId": 11,
    "descripcion": "NUEVO SAN CARLOS",
    "usuario_crea": 1,
    "municipioId": 181
  },
  {
    "municipioId_depto": 9,
    "departamentoId": 11,
    "descripcion": "EL ASINTAL",
    "usuario_crea": 1,
    "municipioId": 182
  },
  {
    "municipioId_depto": 1,
    "departamentoId": 12,
    "descripcion": "SAN MARCOS",
    "usuario_crea": 1,
    "municipioId": 183
  },
  {
    "municipioId_depto": 2,
    "departamentoId": 12,
    "descripcion": "SAN PEDRO SACAT. S.M.",
    "usuario_crea": 1,
    "municipioId": 184
  },
  {
    "municipioId_depto": 3,
    "departamentoId": 12,
    "descripcion": "SAN ANTONIO SACATEPEQUEZ",
    "usuario_crea": 1,
    "municipioId": 185
  },
  {
    "municipioId_depto": 4,
    "departamentoId": 12,
    "descripcion": "COMITANCILLO",
    "usuario_crea": 1,
    "municipioId": 186
  },
  {
    "municipioId_depto": 5,
    "departamentoId": 12,
    "descripcion": "SAN MIGUEL IXTAHUACAN",
    "usuario_crea": 1,
    "municipioId": 187
  },
  {
    "municipioId_depto": 6,
    "departamentoId": 12,
    "descripcion": "CONCEPCION TUTUAPA",
    "usuario_crea": 1,
    "municipioId": 188
  },
  {
    "municipioId_depto": 7,
    "departamentoId": 12,
    "descripcion": "TACANA",
    "usuario_crea": 1,
    "municipioId": 189
  },
  {
    "municipioId_depto": 8,
    "departamentoId": 12,
    "descripcion": "SIBINAL",
    "usuario_crea": 1,
    "municipioId": 190
  },
  {
    "municipioId_depto": 9,
    "departamentoId": 12,
    "descripcion": "TAJUMULCO",
    "usuario_crea": 1,
    "municipioId": 191
  },
  {
    "municipioId_depto": 10,
    "departamentoId": 12,
    "descripcion": "TEJUTLA",
    "usuario_crea": 1,
    "municipioId": 192
  },
  {
    "municipioId_depto": 11,
    "departamentoId": 12,
    "descripcion": "SAN RAFAEL PIE DE LA CUESTA",
    "usuario_crea": 1,
    "municipioId": 193
  },
  {
    "municipioId_depto": 12,
    "departamentoId": 12,
    "descripcion": "NUEVO PROGRESO",
    "usuario_crea": 1,
    "municipioId": 194
  },
  {
    "municipioId_depto": 13,
    "departamentoId": 12,
    "descripcion": "EL TUMBADOR",
    "usuario_crea": 1,
    "municipioId": 195
  },
  {
    "municipioId_depto": 14,
    "departamentoId": 12,
    "descripcion": "EL RODEO",
    "usuario_crea": 1,
    "municipioId": 196
  },
  {
    "municipioId_depto": 15,
    "departamentoId": 12,
    "descripcion": "MALACATAN",
    "usuario_crea": 1,
    "municipioId": 197
  },
  {
    "municipioId_depto": 16,
    "departamentoId": 12,
    "descripcion": "CATARINA",
    "usuario_crea": 1,
    "municipioId": 198
  },
  {
    "municipioId_depto": 17,
    "departamentoId": 12,
    "descripcion": "AYUTLA",
    "usuario_crea": 1,
    "municipioId": 199
  },
  {
    "municipioId_depto": 18,
    "departamentoId": 12,
    "descripcion": "PUERTO DE OCOS",
    "usuario_crea": 1,
    "municipioId": 200
  },
  {
    "municipioId_depto": 19,
    "departamentoId": 12,
    "descripcion": "SAN PABLO",
    "usuario_crea": 1,
    "municipioId": 201
  },
  {
    "municipioId_depto": 20,
    "departamentoId": 12,
    "descripcion": "EL QUETZAL",
    "usuario_crea": 1,
    "municipioId": 202
  },
  {
    "municipioId_depto": 21,
    "departamentoId": 12,
    "descripcion": "LA REFORMA",
    "usuario_crea": 1,
    "municipioId": 203
  },
  {
    "municipioId_depto": 22,
    "departamentoId": 12,
    "descripcion": "PAJAPITA",
    "usuario_crea": 1,
    "municipioId": 204
  },
  {
    "municipioId_depto": 23,
    "departamentoId": 12,
    "descripcion": "IXCHIGUAN",
    "usuario_crea": 1,
    "municipioId": 205
  },
  {
    "municipioId_depto": 24,
    "departamentoId": 12,
    "descripcion": "SAN JOSE OJETENAM",
    "usuario_crea": 1,
    "municipioId": 206
  },
  {
    "municipioId_depto": 25,
    "departamentoId": 12,
    "descripcion": "SAN CRISTOBAL CUCHO",
    "usuario_crea": 1,
    "municipioId": 207
  },
  {
    "municipioId_depto": 26,
    "departamentoId": 12,
    "descripcion": "SIPACAPA",
    "usuario_crea": 1,
    "municipioId": 208
  },
  {
    "municipioId_depto": 27,
    "departamentoId": 12,
    "descripcion": "ESQUIPULAS PALO GORDO",
    "usuario_crea": 1,
    "municipioId": 209
  },
  {
    "municipioId_depto": 28,
    "departamentoId": 12,
    "descripcion": "RIO BLANCO",
    "usuario_crea": 1,
    "municipioId": 210
  },
  {
    "municipioId_depto": 29,
    "departamentoId": 12,
    "descripcion": "SAN LORENZO S.M.",
    "usuario_crea": 1,
    "municipioId": 211
  },
  {
    "municipioId_depto": 1,
    "departamentoId": 13,
    "descripcion": "HUEHUETENANGO",
    "usuario_crea": 1,
    "municipioId": 212
  },
  {
    "municipioId_depto": 2,
    "departamentoId": 13,
    "descripcion": "CHIANTLA",
    "usuario_crea": 1,
    "municipioId": 213
  },
  {
    "municipioId_depto": 3,
    "departamentoId": 13,
    "descripcion": "MALACATANCITO",
    "usuario_crea": 1,
    "municipioId": 214
  },
  {
    "municipioId_depto": 4,
    "departamentoId": 13,
    "descripcion": "CUILCO",
    "usuario_crea": 1,
    "municipioId": 215
  },
  {
    "municipioId_depto": 5,
    "departamentoId": 13,
    "descripcion": "NENTON",
    "usuario_crea": 1,
    "municipioId": 216
  },
  {
    "municipioId_depto": 6,
    "departamentoId": 13,
    "descripcion": "SAN PEDRO NECTA",
    "usuario_crea": 1,
    "municipioId": 217
  },
  {
    "municipioId_depto": 7,
    "departamentoId": 13,
    "descripcion": "JACALTENANGO",
    "usuario_crea": 1,
    "municipioId": 218
  },
  {
    "municipioId_depto": 8,
    "departamentoId": 13,
    "descripcion": "SOLOMA",
    "usuario_crea": 1,
    "municipioId": 219
  },
  {
    "municipioId_depto": 9,
    "departamentoId": 13,
    "descripcion": "IXTAHUACAN",
    "usuario_crea": 1,
    "municipioId": 220
  },
  {
    "municipioId_depto": 10,
    "departamentoId": 13,
    "descripcion": "SANTA BARBARA (HUEHUE)",
    "usuario_crea": 1,
    "municipioId": 221
  },
  {
    "municipioId_depto": 11,
    "departamentoId": 13,
    "descripcion": "LA LIBERTAD",
    "usuario_crea": 1,
    "municipioId": 222
  },
  {
    "municipioId_depto": 12,
    "departamentoId": 13,
    "descripcion": "LA DEMOCRACIA (HUEHUE)",
    "usuario_crea": 1,
    "municipioId": 223
  },
  {
    "municipioId_depto": 13,
    "departamentoId": 13,
    "descripcion": "SAN MIGUEL ACATAN",
    "usuario_crea": 1,
    "municipioId": 224
  },
  {
    "municipioId_depto": 14,
    "departamentoId": 13,
    "descripcion": "SAN RAFAEL INDEPENDENCIA",
    "usuario_crea": 1,
    "municipioId": 225
  },
  {
    "municipioId_depto": 15,
    "departamentoId": 13,
    "descripcion": "TODOS SANTOS CUCHUMATAN",
    "usuario_crea": 1,
    "municipioId": 226
  },
  {
    "municipioId_depto": 16,
    "departamentoId": 13,
    "descripcion": "SAN JUAN ATITAN",
    "usuario_crea": 1,
    "municipioId": 227
  },
  {
    "municipioId_depto": 17,
    "departamentoId": 13,
    "descripcion": "SANTA EULALIA",
    "usuario_crea": 1,
    "municipioId": 228
  },
  {
    "municipioId_depto": 18,
    "departamentoId": 13,
    "descripcion": "SAN MATEO IXTATAN",
    "usuario_crea": 1,
    "municipioId": 229
  },
  {
    "municipioId_depto": 19,
    "departamentoId": 13,
    "descripcion": "COLOTENANGO",
    "usuario_crea": 1,
    "municipioId": 230
  },
  {
    "municipioId_depto": 20,
    "departamentoId": 13,
    "descripcion": "SAN SEBASTIAN HUEHUETENANGO",
    "usuario_crea": 1,
    "municipioId": 231
  },
  {
    "municipioId_depto": 21,
    "departamentoId": 13,
    "descripcion": "TECTITAN",
    "usuario_crea": 1,
    "municipioId": 232
  },
  {
    "municipioId_depto": 22,
    "departamentoId": 13,
    "descripcion": "CONCEPCION HUISTA",
    "usuario_crea": 1,
    "municipioId": 233
  },
  {
    "municipioId_depto": 23,
    "departamentoId": 13,
    "descripcion": "SAN JUAN IXCOY",
    "usuario_crea": 1,
    "municipioId": 234
  },
  {
    "municipioId_depto": 24,
    "departamentoId": 13,
    "descripcion": "SAN ANTONIO HUISTA",
    "usuario_crea": 1,
    "municipioId": 235
  },
  {
    "municipioId_depto": 25,
    "departamentoId": 13,
    "descripcion": "SAN SEBASTIAN COATAN",
    "usuario_crea": 1,
    "municipioId": 236
  },
  {
    "municipioId_depto": 26,
    "departamentoId": 13,
    "descripcion": "BARILLAS",
    "usuario_crea": 1,
    "municipioId": 237
  },
  {
    "municipioId_depto": 27,
    "departamentoId": 13,
    "descripcion": "AGUACATAN",
    "usuario_crea": 1,
    "municipioId": 238
  },
  {
    "municipioId_depto": 28,
    "departamentoId": 13,
    "descripcion": "SAN RAFAEL PETZAL",
    "usuario_crea": 1,
    "municipioId": 239
  },
  {
    "municipioId_depto": 29,
    "departamentoId": 13,
    "descripcion": "SAN GASPAR IXCHIL",
    "usuario_crea": 1,
    "municipioId": 240
  },
  {
    "municipioId_depto": 30,
    "departamentoId": 13,
    "descripcion": "SANTIAGO CHIMALTENANGO",
    "usuario_crea": 1,
    "municipioId": 241
  },
  {
    "municipioId_depto": 31,
    "departamentoId": 13,
    "descripcion": "SANTA ANA HUISTA",
    "usuario_crea": 1,
    "municipioId": 242
  },
  {
    "municipioId_depto": 1,
    "departamentoId": 14,
    "descripcion": "SANTA CRUZ DEL QUICHE",
    "usuario_crea": 1,
    "municipioId": 243
  },
  {
    "municipioId_depto": 2,
    "departamentoId": 14,
    "descripcion": "CHICHE",
    "usuario_crea": 1,
    "municipioId": 244
  },
  {
    "municipioId_depto": 3,
    "departamentoId": 14,
    "descripcion": "CHINIQUE",
    "usuario_crea": 1,
    "municipioId": 245
  },
  {
    "municipioId_depto": 4,
    "departamentoId": 14,
    "descripcion": "ZACUALPA",
    "usuario_crea": 1,
    "municipioId": 246
  },
  {
    "municipioId_depto": 5,
    "departamentoId": 14,
    "descripcion": "CHAJUL",
    "usuario_crea": 1,
    "municipioId": 247
  },
  {
    "municipioId_depto": 6,
    "departamentoId": 14,
    "descripcion": "CHICHICASTENANGO",
    "usuario_crea": 1,
    "municipioId": 248
  },
  {
    "municipioId_depto": 20,
    "departamentoId": 14,
    "descripcion": "IXCAN",
    "usuario_crea": 1,
    "municipioId": 249
  },
  {
    "municipioId_depto": 21,
    "departamentoId": 14,
    "descripcion": "PACHALUM",
    "usuario_crea": 1,
    "municipioId": 250
  },
  {
    "municipioId_depto": 1,
    "departamentoId": 15,
    "descripcion": "SALAMA",
    "usuario_crea": 1,
    "municipioId": 251
  },
  {
    "municipioId_depto": 2,
    "departamentoId": 15,
    "descripcion": "SAN MIGUEL CHICAJ",
    "usuario_crea": 1,
    "municipioId": 252
  },
  {
    "municipioId_depto": 3,
    "departamentoId": 15,
    "descripcion": "RABINAL",
    "usuario_crea": 1,
    "municipioId": 253
  },
  {
    "municipioId_depto": 4,
    "departamentoId": 15,
    "descripcion": "CUBULCO",
    "usuario_crea": 1,
    "municipioId": 254
  },
  {
    "municipioId_depto": 5,
    "departamentoId": 15,
    "descripcion": "GRANADOS",
    "usuario_crea": 1,
    "municipioId": 255
  },
  {
    "municipioId_depto": 6,
    "departamentoId": 15,
    "descripcion": "EL CHOL",
    "usuario_crea": 1,
    "municipioId": 256
  },
  {
    "municipioId_depto": 7,
    "departamentoId": 15,
    "descripcion": "SAN JERONIMO",
    "usuario_crea": 1,
    "municipioId": 257
  },
  {
    "municipioId_depto": 8,
    "departamentoId": 15,
    "descripcion": "PURULHA",
    "usuario_crea": 1,
    "municipioId": 258
  },
  {
    "municipioId_depto": 1,
    "departamentoId": 16,
    "descripcion": "COBAN",
    "usuario_crea": 1,
    "municipioId": 259
  },
  {
    "municipioId_depto": 2,
    "departamentoId": 16,
    "descripcion": "SANTA CRUZ VERAPAZ",
    "usuario_crea": 1,
    "municipioId": 260
  },
  {
    "municipioId_depto": 3,
    "departamentoId": 16,
    "descripcion": "SAN CRISTOBAL VERAPAZ",
    "usuario_crea": 1,
    "municipioId": 261
  },
  {
    "municipioId_depto": 4,
    "departamentoId": 16,
    "descripcion": "TACTIC",
    "usuario_crea": 1,
    "municipioId": 262
  },
  {
    "municipioId_depto": 5,
    "departamentoId": 16,
    "descripcion": "TAMAHU",
    "usuario_crea": 1,
    "municipioId": 263
  },
  {
    "municipioId_depto": 6,
    "departamentoId": 16,
    "descripcion": "TUCURU",
    "usuario_crea": 1,
    "municipioId": 264
  },
  {
    "municipioId_depto": 7,
    "departamentoId": 16,
    "descripcion": "PANZOS",
    "usuario_crea": 1,
    "municipioId": 265
  },
  {
    "municipioId_depto": 8,
    "departamentoId": 16,
    "descripcion": "SENAHU",
    "usuario_crea": 1,
    "municipioId": 266
  },
  {
    "municipioId_depto": 9,
    "departamentoId": 16,
    "descripcion": "SAN PEDRO CARCHA",
    "usuario_crea": 1,
    "municipioId": 267
  },
  {
    "municipioId_depto": 10,
    "departamentoId": 16,
    "descripcion": "SAN JUAN CHAMELCO",
    "usuario_crea": 1,
    "municipioId": 268
  },
  {
    "municipioId_depto": 11,
    "departamentoId": 16,
    "descripcion": "LANQUIN",
    "usuario_crea": 1,
    "municipioId": 269
  },
  {
    "municipioId_depto": 12,
    "departamentoId": 16,
    "descripcion": "CAHABON",
    "usuario_crea": 1,
    "municipioId": 270
  },
  {
    "municipioId_depto": 13,
    "departamentoId": 16,
    "descripcion": "CHISEC",
    "usuario_crea": 1,
    "municipioId": 271
  },
  {
    "municipioId_depto": 14,
    "departamentoId": 16,
    "descripcion": "CHAHAL",
    "usuario_crea": 1,
    "municipioId": 272
  },
  {
    "municipioId_depto": 15,
    "departamentoId": 16,
    "descripcion": "FRAY BARTOLOME DE LAS CASAS",
    "usuario_crea": 1,
    "municipioId": 273
  },
  {
    "municipioId_depto": 16,
    "departamentoId": 16,
    "descripcion": "SAN CRISTOBAL",
    "usuario_crea": 1,
    "municipioId": 274
  },
  {
    "municipioId_depto": 17,
    "departamentoId": 16,
    "descripcion": "SANTA CATALINA LA TINTA",
    "usuario_crea": 1,
    "municipioId": 275
  },
  {
    "municipioId_depto": 1,
    "departamentoId": 17,
    "descripcion": "FLORES",
    "usuario_crea": 1,
    "municipioId": 276
  },
  {
    "municipioId_depto": 2,
    "departamentoId": 17,
    "descripcion": "SAN JOSE",
    "usuario_crea": 1,
    "municipioId": 277
  },
  {
    "municipioId_depto": 3,
    "departamentoId": 17,
    "descripcion": "SAN BENITO",
    "usuario_crea": 1,
    "municipioId": 278
  },
  {
    "municipioId_depto": 4,
    "departamentoId": 17,
    "descripcion": "SAN ANDRES",
    "usuario_crea": 1,
    "municipioId": 279
  },
  {
    "municipioId_depto": 5,
    "departamentoId": 17,
    "descripcion": "LA LIBERTAD (PETEN)",
    "usuario_crea": 1,
    "municipioId": 280
  },
  {
    "municipioId_depto": 6,
    "departamentoId": 17,
    "descripcion": "SAN FRANCISCO PETEN",
    "usuario_crea": 1,
    "municipioId": 281
  },
  {
    "municipioId_depto": 7,
    "departamentoId": 17,
    "descripcion": "SANTA ANA",
    "usuario_crea": 1,
    "municipioId": 282
  },
  {
    "municipioId_depto": 8,
    "departamentoId": 17,
    "descripcion": "DOLORES",
    "usuario_crea": 1,
    "municipioId": 283
  },
  {
    "municipioId_depto": 9,
    "departamentoId": 17,
    "descripcion": "SAN LUIS",
    "usuario_crea": 1,
    "municipioId": 284
  },
  {
    "municipioId_depto": 10,
    "departamentoId": 17,
    "descripcion": "SAYAXCHE",
    "usuario_crea": 1,
    "municipioId": 285
  },
  {
    "municipioId_depto": 11,
    "departamentoId": 17,
    "descripcion": "MELCHOR DE MENCOS",
    "usuario_crea": 1,
    "municipioId": 286
  },
  {
    "municipioId_depto": 12,
    "departamentoId": 17,
    "descripcion": "POPTUN",
    "usuario_crea": 1,
    "municipioId": 287
  },
  {
    "municipioId_depto": 1,
    "departamentoId": 18,
    "descripcion": "PUERTO BARRIOS",
    "usuario_crea": 1,
    "municipioId": 288
  },
  {
    "municipioId_depto": 2,
    "departamentoId": 18,
    "descripcion": "LIVINGSTON",
    "usuario_crea": 1,
    "municipioId": 289
  },
  {
    "municipioId_depto": 3,
    "departamentoId": 18,
    "descripcion": "EL ESTOR",
    "usuario_crea": 1,
    "municipioId": 290
  },
  {
    "municipioId_depto": 4,
    "departamentoId": 18,
    "descripcion": "MORALES",
    "usuario_crea": 1,
    "municipioId": 291
  },
  {
    "municipioId_depto": 5,
    "departamentoId": 18,
    "descripcion": "LOS AMATES",
    "usuario_crea": 1,
    "municipioId": 292
  },
  {
    "municipioId_depto": 1,
    "departamentoId": 19,
    "descripcion": "ZACAPA",
    "usuario_crea": 1,
    "municipioId": 293
  },
  {
    "municipioId_depto": 2,
    "departamentoId": 19,
    "descripcion": "ESTANZUELA",
    "usuario_crea": 1,
    "municipioId": 294
  },
  {
    "municipioId_depto": 3,
    "departamentoId": 19,
    "descripcion": "RIO HONDO",
    "usuario_crea": 1,
    "municipioId": 295
  },
  {
    "municipioId_depto": 4,
    "departamentoId": 19,
    "descripcion": "GUALAN",
    "usuario_crea": 1,
    "municipioId": 296
  },
  {
    "municipioId_depto": 5,
    "departamentoId": 19,
    "descripcion": "TECULUTAN",
    "usuario_crea": 1,
    "municipioId": 297
  },
  {
    "municipioId_depto": 6,
    "departamentoId": 19,
    "descripcion": "USUMATLAN",
    "usuario_crea": 1,
    "municipioId": 298
  },
  {
    "municipioId_depto": 7,
    "departamentoId": 19,
    "descripcion": "CABAÑAS",
    "usuario_crea": 1,
    "municipioId": 299
  },
  {
    "municipioId_depto": 8,
    "departamentoId": 19,
    "descripcion": "SAN DIEGO",
    "usuario_crea": 1,
    "municipioId": 300
  },
  {
    "municipioId_depto": 9,
    "departamentoId": 19,
    "descripcion": "LA UNION",
    "usuario_crea": 1,
    "municipioId": 301
  },
  {
    "municipioId_depto": 10,
    "departamentoId": 19,
    "descripcion": "HUITE",
    "usuario_crea": 1,
    "municipioId": 302
  },
  {
    "municipioId_depto": 1,
    "departamentoId": 20,
    "descripcion": "CHIQUIMULA",
    "usuario_crea": 1,
    "municipioId": 303
  },
  {
    "municipioId_depto": 2,
    "departamentoId": 20,
    "descripcion": "SAN JOSE LA ARADA",
    "usuario_crea": 1,
    "municipioId": 304
  },
  {
    "municipioId_depto": 3,
    "departamentoId": 20,
    "descripcion": "SAN JUAN ERMITA",
    "usuario_crea": 1,
    "municipioId": 305
  },
  {
    "municipioId_depto": 4,
    "departamentoId": 20,
    "descripcion": "JOCOTAN",
    "usuario_crea": 1,
    "municipioId": 306
  },
  {
    "municipioId_depto": 5,
    "departamentoId": 20,
    "descripcion": "CAMOTAN",
    "usuario_crea": 1,
    "municipioId": 307
  },
  {
    "municipioId_depto": 7,
    "departamentoId": 20,
    "descripcion": "ESQUIPULAS",
    "usuario_crea": 1,
    "municipioId": 308
  },
  {
    "municipioId_depto": 8,
    "departamentoId": 20,
    "descripcion": "CONCEPCION LAS MINAS",
    "usuario_crea": 1,
    "municipioId": 309
  },
  {
    "municipioId_depto": 9,
    "departamentoId": 20,
    "descripcion": "QUETZALTEPEQUE",
    "usuario_crea": 1,
    "municipioId": 310
  },
  {
    "municipioId_depto": 10,
    "departamentoId": 20,
    "descripcion": "OLOPA",
    "usuario_crea": 1,
    "municipioId": 311
  },
  {
    "municipioId_depto": 11,
    "departamentoId": 20,
    "descripcion": "IPALA",
    "usuario_crea": 1,
    "municipioId": 312
  },
  {
    "municipioId_depto": 12,
    "departamentoId": 20,
    "descripcion": "SAN JACINTO",
    "usuario_crea": 1,
    "municipioId": 313
  },
  {
    "municipioId_depto": 1,
    "departamentoId": 21,
    "descripcion": "JALAPA",
    "usuario_crea": 1,
    "municipioId": 314
  },
  {
    "municipioId_depto": 2,
    "departamentoId": 21,
    "descripcion": "SAN PEDRO PINULA",
    "usuario_crea": 1,
    "municipioId": 315
  },
  {
    "municipioId_depto": 3,
    "departamentoId": 21,
    "descripcion": "SAN LUIS JILOTEPEQUE",
    "usuario_crea": 1,
    "municipioId": 316
  },
  {
    "municipioId_depto": 4,
    "departamentoId": 21,
    "descripcion": "SAN MANUEL CHAPARRON",
    "usuario_crea": 1,
    "municipioId": 317
  },
  {
    "municipioId_depto": 5,
    "departamentoId": 21,
    "descripcion": "SAN CARLOS ALZATATE",
    "usuario_crea": 1,
    "municipioId": 318
  },
  {
    "municipioId_depto": 6,
    "departamentoId": 21,
    "descripcion": "MONJAS",
    "usuario_crea": 1,
    "municipioId": 319
  },
  {
    "municipioId_depto": 7,
    "departamentoId": 21,
    "descripcion": "MATAQUESCUINTLA",
    "usuario_crea": 1,
    "municipioId": 320
  },
  {
    "municipioId_depto": 1,
    "departamentoId": 22,
    "descripcion": "JUTIAPA",
    "usuario_crea": 1,
    "municipioId": 321
  },
  {
    "municipioId_depto": 2,
    "departamentoId": 22,
    "descripcion": "EL PROGRESO",
    "usuario_crea": 1,
    "municipioId": 322
  },
  {
    "municipioId_depto": 3,
    "departamentoId": 22,
    "descripcion": "SANTA CATARINA MITA",
    "usuario_crea": 1,
    "municipioId": 323
  },
  {
    "municipioId_depto": 4,
    "departamentoId": 22,
    "descripcion": "AGUA BLANCA",
    "usuario_crea": 1,
    "municipioId": 324
  },
  {
    "municipioId_depto": 5,
    "departamentoId": 22,
    "descripcion": "ASUNCION MITA",
    "usuario_crea": 1,
    "municipioId": 325
  },
  {
    "municipioId_depto": 6,
    "departamentoId": 22,
    "descripcion": "YUPILTEPEQUE",
    "usuario_crea": 1,
    "municipioId": 326
  },
  {
    "municipioId_depto": 7,
    "departamentoId": 22,
    "descripcion": "ATESCATEMPA",
    "usuario_crea": 1,
    "municipioId": 327
  },
  {
    "municipioId_depto": 8,
    "departamentoId": 22,
    "descripcion": "JEREZ",
    "usuario_crea": 1,
    "municipioId": 328
  },
  {
    "municipioId_depto": 9,
    "departamentoId": 22,
    "descripcion": "EL ADELANTO",
    "usuario_crea": 1,
    "municipioId": 329
  },
  {
    "municipioId_depto": 10,
    "departamentoId": 22,
    "descripcion": "ZAPOTITLAN",
    "usuario_crea": 1,
    "municipioId": 330
  },
  {
    "municipioId_depto": 11,
    "departamentoId": 22,
    "descripcion": "COMAPA",
    "usuario_crea": 1,
    "municipioId": 331
  },
  {
    "municipioId_depto": 12,
    "departamentoId": 22,
    "descripcion": "JALPATAGUA",
    "usuario_crea": 1,
    "municipioId": 332
  },
  {
    "municipioId_depto": 13,
    "departamentoId": 22,
    "descripcion": "CONGUACO",
    "usuario_crea": 1,
    "municipioId": 333
  },
  {
    "municipioId_depto": 14,
    "departamentoId": 22,
    "descripcion": "MOYUTA",
    "usuario_crea": 1,
    "municipioId": 334
  },
  {
    "municipioId_depto": 15,
    "departamentoId": 22,
    "descripcion": "PASACO",
    "usuario_crea": 1,
    "municipioId": 335
  },
  {
    "municipioId_depto": 16,
    "departamentoId": 22,
    "descripcion": "SAN JOSE ACATEMPA",
    "usuario_crea": 1,
    "municipioId": 336
  },
  {
    "municipioId_depto": 17,
    "departamentoId": 22,
    "descripcion": "QUESADA",
    "usuario_crea": 1,
    "municipioId": 337
  }
];

const Menus = [
  {
    menuId: 24,
    posicion: 0,
    descripcion: "Inicio",
    href: "/base/home",
    icono: "feather icon-sidebar",
    classes: "nav-item",
    type: "item",
    visible: true,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 23,
    posicion: 23,
    descripcion: "Seguridad",
    href: "",
    icono: "feather icon-sidebar",
    classes: "",
    type: "collapse",
    visible: true,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 22,
    posicion: 22,
    descripcion: "Catálogos",
    href: "",
    icono: "feather icon-sidebar",
    classes: "",
    type: "collapse",
    visible: true,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 1,
    posicion: 1,
    descripcion: "Acceso",
    href: "/base/seguridad/acceso",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 23,
    visible: true,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 2,
    posicion: 2,
    descripcion: "Estados",
    href: "",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 23,
    visible: false,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 3,
    posicion: 3,
    descripcion: "Generos",
    href: "",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 23,
    visible: false,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 4,
    posicion: 1,
    descripcion: "Estado Civil",
    href: "/base/catalogo/estadocivil",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 22,
    visible: true,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 5,
    posicion: 2,
    descripcion: "Tipo documento",
    href: "/base/catalogo/tipodocumento",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 22,
    visible: true,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 6,
    posicion: 3,
    descripcion: "Tipo de Sangre",
    href: "/base/catalogo/tiposangre",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 22,
    visible: true,
    usuario_crea: 1,
    fecha_crea: Date.now()
  }, {
    menuId: 7,
    posicion: 4,
    descripcion: "Tipo de Teléfono",
    href: "/base/catalogo/tipotelefono",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 22,
    visible: true,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 8,
    posicion: 5,
    descripcion: "Region",
    href: "/base/catalogo/region",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 22,
    visible: true,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 9,
    posicion: 6,
    descripcion: "Departamento",
    href: "/base/catalogo/departamento",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 22,
    visible: true,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 10,
    posicion: 7,
    descripcion: "Municipio",
    href: "/base/catalogo/municipio",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 22,
    visible: true,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 11,
    posicion: 8,
    descripcion: "Rol",
    href: "/base/seguridad/rol",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 23,
    visible: true,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 12,
    posicion: 9,
    descripcion: "Persona",
    href: "/base/catalogo/persona",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 22,
    visible: true,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 13,
    posicion: 10,
    descripcion: "Identificacion Persona",
    href: "",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 22,
    visible: false,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 14,
    posicion: 11,
    descripcion: "Telefono Persona",
    href: "",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 22,
    visible: false,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 15,
    posicion: 12,
    descripcion: "Direccion Persona",
    href: "",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 22,
    visible: false,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 16,
    posicion: 13,
    descripcion: "Dato extra persona",
    href: "",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 22,
    visible: false,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 17,
    posicion: 17,
    descripcion: "Usuario",
    href: "/base/seguridad/usuario",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 23,
    visible: true,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 18,
    posicion: 18,
    descripcion: "Usuario Rol",
    href: "",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 23,
    visible: false,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 19,
    posicion: 19,
    descripcion: "Menu Acceso",
    href: "",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 23,
    visible: false,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 20,
    posicion: 20,
    descripcion: "Rol Menu Acceso",
    href: "",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 23,
    visible: false,
    usuario_crea: 1,
    fecha_crea: Date.now()
  }, {
    menuId: 21,
    posicion: 21,
    descripcion: "Menu",
    href: "/base/seguridad/menu",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 23,
    visible: true,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 25,
    posicion: 24,
    descripcion: "Bitácora",
    href: "",
    icono: "",
    classes: "",
    type: "collapse",
    menu_padreId: 23,
    visible: true,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 26,
    posicion: 21,
    descripcion: "Peticiones",
    href: "/base/seguridad/bitacora/peticion",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 25,
    visible: true,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 27,
    posicion: 21,
    descripcion: "Cambios",
    href: "/base/seguridad/bitacora/cambios",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 25,
    visible: true,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 28,
    posicion: 0,
    descripcion: "Información Usuario",
    href: "/base/infouser",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 23,
    visible: false,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 29,
    posicion: 14,
    descripcion: "Sede Diaco",
    href: "/base/catalogo/sedediaco",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 22,
    visible: true,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 30,
    posicion: 15,
    descripcion: "Comercios",
    href: "/base/catalogo/comercio",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 22,
    visible: true,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 31,
    posicion: 15,
    descripcion: "Sucursales",
    href: "",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 22,
    visible: false,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 32,
    posicion: 16,
    descripcion: "Estado Queja",
    href: "/base/catalogo/estadoqueja",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 22,
    visible: true,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 33,
    posicion: 17,
    descripcion: "Queja",
    href: "/base/catalogo/queja",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 22,
    visible: true,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 34,
    posicion: 18,
    descripcion: "Media",
    href: "/base/catalogo/media",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 22,
    visible: false,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
  {
    menuId: 35,
    posicion: 18,
    descripcion: "Usuario Sede Diaco",
    href: "",
    icono: "",
    classes: "nav-item",
    type: "item",
    menu_padreId: 23,
    visible: false,
    usuario_crea: 1,
    fecha_crea: Date.now()
  },
];

const MenuAccesos = [
  {
    menuId: 1,
    accesoId: 1,
    usuario_crea: 1
  },
  {
    menuId: 1,
    accesoId: 2,
    usuario_crea: 1
  },
  {
    menuId: 1,
    accesoId: 3,
    usuario_crea: 1
  },
  {
    menuId: 2,
    accesoId: 1,
    usuario_crea: 1
  },
  {
    menuId: 2,
    accesoId: 2,
    usuario_crea: 1
  },
  {
    menuId: 2,
    accesoId: 3,
    usuario_crea: 1
  },
  {
    menuId: 3,
    accesoId: 1,
    usuario_crea: 1
  },
  {
    menuId: 3,
    accesoId: 2,
    usuario_crea: 1
  },
  {
    menuId: 3,
    accesoId: 3,
    usuario_crea: 1
  },
  {
    menuId: 4,
    accesoId: 1,
    usuario_crea: 1
  },
  {
    menuId: 4,
    accesoId: 2,
    usuario_crea: 1
  },
  {
    menuId: 4,
    accesoId: 3,
    usuario_crea: 1
  }, {
    menuId: 5,
    accesoId: 1,
    usuario_crea: 1
  },
  {
    menuId: 5,
    accesoId: 2,
    usuario_crea: 1
  },
  {
    menuId: 5,
    accesoId: 3,
    usuario_crea: 1
  },
  {
    menuId: 6,
    accesoId: 1,
    usuario_crea: 1
  },
  {
    menuId: 6,
    accesoId: 2,
    usuario_crea: 1
  },
  {
    menuId: 6,
    accesoId: 3,
    usuario_crea: 1
  },
  {
    menuId: 7,
    accesoId: 1,
    usuario_crea: 1
  },
  {
    menuId: 7,
    accesoId: 2,
    usuario_crea: 1
  },
  {
    menuId: 7,
    accesoId: 3,
    usuario_crea: 1
  },
  {
    menuId: 8,
    accesoId: 1,
    usuario_crea: 1
  },
  {
    menuId: 8,
    accesoId: 2,
    usuario_crea: 1
  },
  {
    menuId: 8,
    accesoId: 3,
    usuario_crea: 1
  },
  {
    menuId: 9,
    accesoId: 1,
    usuario_crea: 1
  },
  {
    menuId: 9,
    accesoId: 2,
    usuario_crea: 1
  },
  {
    menuId: 9,
    accesoId: 3,
    usuario_crea: 1
  },
  {
    menuId: 10,
    accesoId: 1,
    usuario_crea: 1
  },
  {
    menuId: 10,
    accesoId: 2,
    usuario_crea: 1
  },
  {
    menuId: 10,
    accesoId: 3,
    usuario_crea: 1
  },
  {
    menuId: 11,
    accesoId: 1,
    usuario_crea: 1
  },
  {
    menuId: 11,
    accesoId: 2,
    usuario_crea: 1
  },
  {
    menuId: 11,
    accesoId: 3,
    usuario_crea: 1
  },
  {
    menuId: 12,
    accesoId: 1,
    usuario_crea: 1
  },
  {
    menuId: 12,
    accesoId: 2,
    usuario_crea: 1
  },
  {
    menuId: 12,
    accesoId: 3,
    usuario_crea: 1
  }, {
    menuId: 13,
    accesoId: 1,
    usuario_crea: 1
  },
  {
    menuId: 13,
    accesoId: 2,
    usuario_crea: 1
  },
  {
    menuId: 13,
    accesoId: 3,
    usuario_crea: 1
  }, {
    menuId: 14,
    accesoId: 1,
    usuario_crea: 1
  },
  {
    menuId: 14,
    accesoId: 2,
    usuario_crea: 1
  },
  {
    menuId: 14,
    accesoId: 3,
    usuario_crea: 1
  }, {
    menuId: 15,
    accesoId: 1,
    usuario_crea: 1
  },
  {
    menuId: 15,
    accesoId: 2,
    usuario_crea: 1
  },
  {
    menuId: 15,
    accesoId: 3,
    usuario_crea: 1
  },
  {
    menuId: 16,
    accesoId: 1,
    usuario_crea: 1
  },
  {
    menuId: 16,
    accesoId: 2,
    usuario_crea: 1
  },
  {
    menuId: 16,
    accesoId: 3,
    usuario_crea: 1
  },
  {
    menuId: 17,
    accesoId: 1,
    usuario_crea: 1
  },
  {
    menuId: 17,
    accesoId: 2,
    usuario_crea: 1
  },
  {
    menuId: 17,
    accesoId: 3,
    usuario_crea: 1
  },
  {
    menuId: 18,
    accesoId: 1,
    usuario_crea: 1
  },
  {
    menuId: 18,
    accesoId: 2,
    usuario_crea: 1
  },
  {
    menuId: 18,
    accesoId: 3,
    usuario_crea: 1
  },
  {
    menuId: 19,
    accesoId: 1,
    usuario_crea: 1
  },
  {
    menuId: 19,
    accesoId: 2,
    usuario_crea: 1
  },
  {
    menuId: 19,
    accesoId: 3,
    usuario_crea: 1
  },
  {
    menuId: 20,
    accesoId: 1,
    usuario_crea: 1
  },
  {
    menuId: 20,
    accesoId: 2,
    usuario_crea: 1
  },
  {
    menuId: 20,
    accesoId: 3,
    usuario_crea: 1
  },
  {
    menuId: 21,
    accesoId: 1,
    usuario_crea: 1
  },
  {
    menuId: 21,
    accesoId: 2,
    usuario_crea: 1
  },
  {
    menuId: 21,
    accesoId: 3,
    usuario_crea: 1
  },
  {
    menuId: 22,
    accesoId: 3,
    usuario_crea: 1
  },
  {
    menuId: 23,
    accesoId: 3,
    usuario_crea: 1
  },
  {
    menuId: 24,
    accesoId: 3,
    usuario_crea: 1
  },
  {
    menuId: 25,
    accesoId: 3,
    usuario_crea: 1
  },
  {
    menuId: 26,
    accesoId: 3,
    usuario_crea: 1
  },
  {
    menuId: 27,
    accesoId: 3,
    usuario_crea: 1
  },
  {
    menuId: 28,
    accesoId: 1,
    usuario_crea: 1
  }
];

const MenuAccesosRol = [
  {
    rolId: 1,
    menu_accesoId: 1,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 2,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 3,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 4,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 5,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 6,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 7,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 8,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 9,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 10,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 11,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 12,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 13,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 14,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 15,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 16,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 17,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 18,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 19,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 20,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 21,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 22,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 23,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 24,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 25,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 26,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 27,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 28,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 29,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 30,
    usuario_crea: 1
  }, {
    rolId: 1,
    menu_accesoId: 31,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 32,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 33,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 34,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 35,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 36,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 37,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 38,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 39,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 40,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 41,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 42,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 43,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 44,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 45,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 46,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 47,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 48,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 49,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 50,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 51,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 52,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 53,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 54,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 55,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 56,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 57,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 58,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 59,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 60,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 61,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 62,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 63,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 64,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 65,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 66,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 67,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 68,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 69,
    usuario_crea: 1
  },
  {
    rolId: 1,
    menu_accesoId: 70,
    usuario_crea: 1
  }
];

const Estados = [
  {
    estadoId: 1,
    descripcion: "ACTIVO"
  },
  {
    estadoId: 2,
    descripcion: "INACTIVO"
  },
  {
    estadoId: 3,
    descripcion: "ELIMINADO",
    activo: false
  }
];

const Generos = [
  {
    generoId: 1,
    descripcion: "MASCULINO"
  },
  {
    generoId: 2,
    descripcion: "FEMENINO"
  }
];

const Personas = [
  {
    personaId: 1,
    nombre1: "BYRON",
    apellido1: "LOPEZ",
    fecha_nacimiento: "1991-07-18",
    email: "blu.urizar@gmail.com",
    generoId: 1
  }
];

const Usuarios = [
  {
    usuarioId: 1,
    personaId: 1,
    user_name: "BLOPEZ",
    password: bcrypt.hashSync('blopez', 10),
    forzar_cambio_password:0
  }
];

const UsuarioRoles = [
  {
    usuarioId: 1,
    rolId: 1,
    usuario_crea: 1
  }
];

const TiposDocumentos = [
  {
    tipo_documentoId: 1,
    descripcion: "DPI",
    usuario_crea: 1
  },
  {
    tipo_documentoId: 2,
    descripcion: "NIT",
    usuario_crea: 1
  }
];

const Accesos = [
  {
    accesoId: 1,
    descripcion: "CREAR",
    usuario_crea: 1
  },
  {
    accesoId: 2,
    descripcion: "ACTUALIZAR",
    usuario_crea: 1
  },
  {
    accesoId: 3,
    descripcion: "VISUALIZAR",
    usuario_crea: 1
  },
  {
    accesoId: 4,
    descripcion: "ELIMINAR",
    usuario_crea: 1
  }
];

const Roles = [
  {
    rolId: 1,
    nombre: "ADMINISTRADOR",
    descripcion: "ADMINISTRADOR DEL SISTEMA",
    usuario_crea: 1
  },
  {
    rolId: 2,
    nombre: "OPERADOR",
    descripcion: "ENCARGADO DE LLEVAR EL CONTROL BASICO",
    usuario_crea: 1
  }
];

const TiposTelefonos = [
  {
    tipo_telefonoId: 1,
    descripcion: "MOVIL",
    usuario_crea: 1
  },
  {
    tipo_telefonoId: 2,
    descripcion: "FIJO",
    usuario_crea: 1
  }
];

const EstadosCiviles = [
  {
    estado_civilId: 1,
    descripcion: "SOLTERO/A",
    usuario_crea: 1
  },
  {
    estado_civilId: 2,
    descripcion: "COMPROMETIDO/A",
    usuario_crea: 1
  },
  {
    estado_civilId: 3,
    descripcion: "EN RELACION",
    usuario_crea: 1
  },
  {
    estado_civilId: 4,
    descripcion: "UNION LIBRE O UNION DE HECHO",
    usuario_crea: 1
  },
  {
    estado_civilId: 5,
    descripcion: "SEPARADO/A",
    usuario_crea: 1
  },
  {
    estado_civilId: 6,
    descripcion: "DIVORCIADO/A",
    usuario_crea: 1
  },
  {
    estado_civilId: 7,
    descripcion: "VIUDO/A",
    usuario_crea: 1
  },
  {
    estado_civilId: 8,
    descripcion: "CASADO/A",
    usuario_crea: 1
  }
];

const TiposSangre = [
  {
    descripcion: "O NEGATIVO",
    usuario_crea: 1
  },
  {
    descripcion: "O POSITIVO",
    usuario_crea: 1
  },
  {
    descripcion: "A NEGATIVO",
    usuario_crea: 1
  },
  {
    descripcion: "A POSITIVO",
    usuario_crea: 1
  },
  {
    descripcion: "B POSITIVO",
    usuario_crea: 1
  },
  {
    descripcion: "AB NEGATIVO",
    usuario_crea: 1
  },
  {
    descripcion: "AB POSITIVO",
    usuario_crea: 1
  }
];

const Parametros = [
  {
    parametroId: 1,
    nombreGrupo: "CONFIG_EMISOR",
    tipoDato: "S",
    nombreVariable: "emailEmisor",
    valor: "urizarcode@gmail.com",
    descripcion: "Correo electrónico para el envio de correos",
    usuario_crea: 1
  },
  {
    parametroId: 2,
    nombreGrupo: "CONFIG_EMISOR",
    tipoDato: "S",
    nombreVariable: "passwordEmisor",
    valor: "",
    descripcion: "Contraseña del emisor de correo",
    usuario_crea: 1
  },
  {
    parametroId: 3,
    nombreGrupo: "CONFIG_EMISOR",
    tipoDato: "S",
    nombreVariable: "hostEmailEmisor",
    valor: "smtp.gmail.com",
    descripcion: "Host del emisor",
    usuario_crea: 1
  },
  {
    parametroId: 4,
    nombreGrupo: "CONFIG_EMISOR",
    tipoDato: "N",
    nombreVariable: "portHostEmisor",
    valor: "465",
    descripcion: "Puerto del emisor",
    usuario_crea: 1
  },
  {
    parametroId: 5,
    nombreGrupo: "CONFIG_EMISOR",
    tipoDato: "N",
    nombreVariable: "secureHostEmisor",
    valor: "true",
    descripcion: "Indica si el envio es por medio seguro",
    usuario_crea: 1
  },
  {
    parametroId: 6,
    nombreGrupo: "CONFIG_EMISOR",
    tipoDato: "N",
    nombreVariable: "minutosVigenciaEnlace",
    valor: "10",
    descripcion: "Minutos de vigencia del enlace enviado por correo",
    usuario_crea: 1
  },
  {
    parametroId: 7,
    nombreGrupo: "CONFIG_EMPRESA",
    tipoDato: "S",
    nombreVariable: "nombreEmpresa",
    valor: "NOMBRE DE LA EMPRESA",
    descripcion: "Nombre de la Empresa",
    usuario_crea: 1
  },
  {
    parametroId: 8,
    nombreGrupo: "CONFIG_EMPRESA",
    tipoDato: "S",
    nombreVariable: "direccionEmpresa",
    valor: "INDICAR LA DIRECCION DE LA EMPRESA",
    descripcion: "Dirección de la empresa",
    usuario_crea: 1
  },
  {
    parametroId: 9,
    nombreGrupo: "CONFIG_EMPRESA",
    tipoDato: "S",
    nombreVariable: "urlLogoEmpresa",
    valor: "https://png.pngtree.com/png-clipart/20190516/original/pngtree-human-character-with-green-tree-logo.-png-image_3732560.jpg",
    descripcion: "Url del logo de la empresa",
    usuario_crea: 1
  },
  {
    parametroId: 10,
    nombreGrupo: "CONFIG_EMPRESA",
    tipoDato: "S",
    nombreVariable: "urlWebResetPassWord",
    valor: "http://localhost:3001/app/auth/update-password/",
    descripcion: "Url que resolvera el reseteo de la contraseña",
    usuario_crea: 1
  }
];

const listSedesDiaco = [
  {
    sede_diacoId: 1,
    codigo: "CENTRAL",
    nombre: "CENTRAL",
    municipioId: 1,
    usuario_crea: 1
  },
  {
    sede_diacoId: 2,
    codigo: "CHIMALTENANGO",
    nombre: "CHIMALTENANGO - DIACO",
    municipioId: 77,
    usuario_crea: 1
  },
  {
    sede_diacoId: 3,
    codigo: "JUTIAPA",
    nombre: "JUTIAPA - DIACO",
    municipioId: 321,
    usuario_crea: 1
  },
  {
    sede_diacoId: 4,
    codigo: "SAN MARCOS",
    nombre: "SAN MARCOS - DIACO",
    municipioId: 183,
    usuario_crea: 1
  },
  {
    sede_diacoId: 5,
    codigo: "SUCHITEPEQUEZ",
    nombre: "SUCHITEPEQUEZ - DIACO",
    municipioId: 165,
    usuario_crea: 1
  },
  {
    sede_diacoId: 6,
    codigo: "JALAPA",
    nombre: "JALAPA - DIACO",
    municipioId: 314,
    usuario_crea: 1
  },
  {
    sede_diacoId: 7,
    codigo: "COBAN",
    nombre: "COBAN - DIACO",
    municipioId: 259,
    usuario_crea: 1
  },
  {
    sede_diacoId: 8,
    codigo: "CHIQUIMULA",
    nombre: "CHIQUIMULA - DIACO",
    municipioId: 303,
    usuario_crea: 1
  },
  {
    sede_diacoId: 9,
    codigo: "ESCUINTLA",
    nombre: "ESCUINTLA - DIACO",
    municipioId: 93,
    usuario_crea: 1
  },
  {
    sede_diacoId: 10,
    codigo: "HUEHUETENANGO",
    nombre: "HUEHUETENANGO - DIACO",
    municipioId: 212,
    usuario_crea: 1
  },
  {
    sede_diacoId: 11,
    codigo: "IZABAL",
    nombre: "IZABAL - DIACO",
    municipioId: 288,
    usuario_crea: 1
  },
  {
    sede_diacoId: 12,
    codigo: "PETEN",
    nombre: "PETEN - DIACO",
    municipioId: 280,
    usuario_crea: 1
  },
  {
    sede_diacoId: 13,
    codigo: "QUETZALTENANGO",
    nombre: "QUETZALTENANGO - DIACO",
    municipioId: 138,
    usuario_crea: 1
  },
  {
    sede_diacoId: 14,
    codigo: "QUICHE",
    nombre: "QUICHE - DIACO",
    municipioId: 243,
    usuario_crea: 1
  },
  {
    sede_diacoId: 15,
    codigo: "TOTONICAPAN",
    nombre: "TOTONICAPAN - DIACO",
    municipioId: 130,
    usuario_crea: 1
  },
  {
    sede_diacoId: 16,
    codigo: "ZACAPA",
    nombre: "ZACAPA - DIACO",
    municipioId: 293,
    usuario_crea: 1
  },
  {
    sede_diacoId: 17,
    codigo: "SACATEPEQUEZ",
    nombre: "SACATEPEQUEZ-DIACO",
    municipioId: 61,
    usuario_crea: 1
  },
  {
    sede_diacoId: 18,
    codigo: "BAJA VERAPAZ",
    nombre: "-DIACO- BAJA VERAPAZ",
    municipioId: 251,
    usuario_crea: 1
  },
  {
    sede_diacoId: 19,
    codigo: "SOLOLA",
    nombre: "SOLOLA - DIACO",
    municipioId: 16,
    usuario_crea: 1
  },
  {
    sede_diacoId: 20,
    codigo: "RETALHULEU",
    nombre: "RETALHULEU - DIACO",
    municipioId: 24,
    usuario_crea: 1
  },
  {
    sede_diacoId: 21,
    codigo: "MIXCO",
    nombre: "MIXCO DIACO",
    municipioId: 8,
    usuario_crea: 1
  },
  {
    sede_diacoId: 22,
    codigo: "VILLA NUEVA",
    nombre: "VILLA NUEVA - DIACO",
    municipioId: 51,
    usuario_crea: 1
  },
  {
    sede_diacoId: 24,
    codigo: "EL PROGRESO",
    nombre: "DIACO EL PROGRESO",
    municipioId: 322,
    usuario_crea: 1
  },
  {
    sede_diacoId: 25,
    codigo: "SANTA ROSA",
    nombre: "SANTA ROSA-DIACO",
    municipioId: 15,
    usuario_crea: 1
  },
  {
    sede_diacoId: 26,
    codigo: "SEDE-VILLA NUEVA",
    nombre: "SEDE-DIACO-VILLA NUEVA",
    municipioId: 51,
    usuario_crea: 1
  }
];

const listEstadoQueja = [
  {
    estado_quejaId: 1,
    descripcion: "ENVIADA",
    usuario_crea: 1
  },
  {
    estado_quejaId: 2,
    descripcion: "EN REVISION",
    usuario_crea: 1
  }, {
    estado_quejaId: 3,
    descripcion: "NO PROCEDE",
    usuario_crea: 1
  },
  {
    estado_quejaId: 4,
    descripcion: "CANCELADA",
    usuario_crea: 1
  },
  {
    estado_quejaId: 5,
    descripcion: "FINALIZADA",
    usuario_crea: 1
  }
];
const listComercios = [
  {
    "comercioId": 1,
    "nombre": "ADMINISTRADORA DE SERVICIOS S.A.",
    "razon_social": "ADMINISTRADORA DE SERVICIOS S.A.",
    "nit": "5832375­9",
    "telefono": "54859681",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 2,
    "nombre": "AEREO CAFE",
    "razon_social": "AEREO CAFE",
    "nit": "481772­9",
    "telefono": "54859682",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 3,
    "nombre": "AGENCIA IMPRESORA, SOCIEDAD ANONIMA",
    "razon_social": "AGENCIA IMPRESORA, SOCIEDAD ANONIMA",
    "nit": "76191176",
    "telefono": "54859683",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 4,
    "nombre": "AGENCIA Y FABRICA HONDA, S.A.",
    "razon_social": "AGENCIA Y FABRICA HONDA, S.A.",
    "nit": "96325­9",
    "telefono": "54859684",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 5,
    "nombre": "AGRICOLA LAS GARDENIAS, S.A",
    "razon_social": "AGRICOLA LAS GARDENIAS, S.A",
    "nit": "593383­8",
    "telefono": "54859685",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 6,
    "nombre": "ALIMENTOS XELAPAN SOCIEDAD ANONIMA",
    "razon_social": "ALIMENTOS XELAPAN SOCIEDAD ANONIMA",
    "nit": "589799­8",
    "telefono": "54859686",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 7,
    "nombre": "ALMACEN EL VAPOR S. A.",
    "razon_social": "ALMACEN EL VAPOR S. A.",
    "nit": "16969­2",
    "telefono": "54859687",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 8,
    "nombre": "ANTILLON",
    "razon_social": "ANTILLON",
    "nit": "338942­1",
    "telefono": "54859688",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 9,
    "nombre": "APROFAM",
    "razon_social": "APROFAM",
    "nit": "247043­8",
    "telefono": "54859689",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 10,
    "nombre": "AQUI ESTA, SOCIEDAD ANONIMA",
    "razon_social": "AQUI ESTA, SOCIEDAD ANONIMA",
    "nit": "741653­9",
    "telefono": "548596810",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 11,
    "nombre": "ARTE DIGITAL",
    "razon_social": "ARTE DIGITAL",
    "nit": "8354782­7",
    "telefono": "548596811",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 12,
    "nombre": "ARTICO PETEN",
    "razon_social": "ARTICO PETEN",
    "nit": "4530613­3",
    "telefono": "548596812",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 13,
    "nombre": "ASEPSIA,S.A.",
    "razon_social": "ASEPSIA,S.A.",
    "nit": "2726030­5",
    "telefono": "548596813",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 14,
    "nombre": "ASOCIACION CIVIL MAYA DE PEQUEÑOS AGRICULTORES",
    "razon_social": "ASOCIACION CIVIL MAYA DE PEQUEÑOS AGRICULTORES",
    "nit": "1819147­9",
    "telefono": "548596814",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 15,
    "nombre": "ASOCIADOS LA TROPICAL S.A.",
    "razon_social": "ASOCIADOS LA TROPICAL S.A.",
    "nit": "599795­k",
    "telefono": "548596815",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 16,
    "nombre": "AUTO REPUESTOS MOMOTIC",
    "razon_social": "AUTO REPUESTOS MOMOTIC",
    "nit": "440421­1",
    "telefono": "548596816",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 17,
    "nombre": "AUTOBUSES DEL NORTE ADN",
    "razon_social": "AUTOBUSES DEL NORTE ADN",
    "nit": "2739774­2",
    "telefono": "548596817",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 18,
    "nombre": "AUTOMOVILES Y VEHICULOS COMERCIALES,S.A.",
    "razon_social": "AUTOMOVILES Y VEHICULOS COMERCIALES,S.A.",
    "nit": "2230245­K",
    "telefono": "548596818",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 19,
    "nombre": "AUTORESPUESTOS Y MOTOPARTES EL EXITO",
    "razon_social": "AUTORESPUESTOS Y MOTOPARTES EL EXITO",
    "nit": "7830351­6",
    "telefono": "548596819",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 20,
    "nombre": "BANCO INDUSTRIAL",
    "razon_social": "BANCO INDUSTRIAL",
    "nit": "69765­6",
    "telefono": "548596820",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 21,
    "nombre": "BIENES RAICES SANTA TERESA, S.A.",
    "razon_social": "BIENES RAICES SANTA TERESA, S.A.",
    "nit": "395587­7",
    "telefono": "548596821",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 22,
    "nombre": "BIMAGUA, S.A.",
    "razon_social": "BIMAGUA, S.A.",
    "nit": "1654859­0",
    "telefono": "548596822",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 23,
    "nombre": "CAFE, S.A.",
    "razon_social": "CAFE, S.A.",
    "nit": "3703344­7",
    "telefono": "548596823",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 24,
    "nombre": "CAFETERIA LA DEPORTIVA",
    "razon_social": "CAFETERIA LA DEPORTIVA",
    "nit": "2898156­1",
    "telefono": "548596824",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 25,
    "nombre": "CARGO EXPRESO, S. A.",
    "razon_social": "CARGO EXPRESO, S. A.",
    "nit": "575081­4",
    "telefono": "548596825",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 26,
    "nombre": "CASA DEL PRADO CAFE BAR",
    "razon_social": "CASA DEL PRADO CAFE BAR",
    "nit": "540714­1",
    "telefono": "548596826",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 27,
    "nombre": "CASETA BLANQUI",
    "razon_social": "CASETA BLANQUI",
    "nit": "2690314­8",
    "telefono": "548596827",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 28,
    "nombre": "CASVACHI, R.L",
    "razon_social": "CASVACHI, R.L",
    "nit": "414346­9",
    "telefono": "548596828",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 29,
    "nombre": "CDP,S.A.",
    "razon_social": "CDP,S.A.",
    "nit": "993303­4",
    "telefono": "548596829",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 30,
    "nombre": "CELASA INGENIERIA Y EQUIPOS, S.A.",
    "razon_social": "CELASA INGENIERIA Y EQUIPOS, S.A.",
    "nit": "153916­7",
    "telefono": "548596830",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 31,
    "nombre": "CENTRAL AMERICANA DE DISTRIBUCION, S.A.",
    "razon_social": "CENTRAL AMERICANA DE DISTRIBUCION, S.A.",
    "nit": "1491931­1",
    "telefono": "548596831",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 32,
    "nombre": "CENTRO EDITORIAL VILE",
    "razon_social": "CENTRO EDITORIAL VILE",
    "nit": "8751­3",
    "telefono": "548596832",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 33,
    "nombre": "CENTRO KRATOS",
    "razon_social": "CENTRO KRATOS",
    "nit": "23315997",
    "telefono": "548596833",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 34,
    "nombre": "CENTRO PLASTICO MILTI PLASTIC",
    "razon_social": "CENTRO PLASTICO MILTI PLASTIC",
    "nit": "5225943­9",
    "telefono": "548596834",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 35,
    "nombre": "CLASSIC VENTANAS",
    "razon_social": "CLASSIC VENTANAS",
    "nit": "4291615­1",
    "telefono": "548596835",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 36,
    "nombre": "CLIMAS INDUSTRIALES",
    "razon_social": "CLIMAS INDUSTRIALES",
    "nit": "2313733­9",
    "telefono": "548596836",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 37,
    "nombre": "CLIMATIZACION CONTROLADA , S.A.",
    "razon_social": "CLIMATIZACION CONTROLADA , S.A.",
    "nit": "3685835­8",
    "telefono": "548596837",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 38,
    "nombre": "COLEGIO DE ABOGADOS Y NOTARIOS DE GUATEMALA",
    "razon_social": "COLEGIO DE ABOGADOS Y NOTARIOS DE GUATEMALA",
    "nit": "672681­K",
    "telefono": "548596838",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 39,
    "nombre": "COLEGIO DE CONTADORES PUBLICOS",
    "razon_social": "COLEGIO DE CONTADORES PUBLICOS",
    "nit": "4092862­4",
    "telefono": "548596839",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 40,
    "nombre": "COLEGIO DE ING. AGRONOMOS DE GUATEMALA",
    "razon_social": "COLEGIO DE ING. AGRONOMOS DE GUATEMALA",
    "nit": "460717­1",
    "telefono": "548596840",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 41,
    "nombre": "COMERCIAL TIVOLI, SOCIEDAD ANONIMA",
    "razon_social": "COMERCIAL TIVOLI, SOCIEDAD ANONIMA",
    "nit": "414915­7",
    "telefono": "548596841",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 42,
    "nombre": "COMIDAS Y SERVICIOS COBAN, S.A.",
    "razon_social": "COMIDAS Y SERVICIOS COBAN, S.A.",
    "nit": "6653088­1",
    "telefono": "548596842",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 43,
    "nombre": "COMPAÐIA DEL AGUA DEL MARISCAL, S.A.",
    "razon_social": "COMPAÐIA DEL AGUA DEL MARISCAL, S.A.",
    "nit": "418979­5",
    "telefono": "548596843",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 44,
    "nombre": "COMPAÑIA DE AUTOSERVICIOS COFAL,S.A.",
    "razon_social": "COMPAÑIA DE AUTOSERVICIOS COFAL,S.A.",
    "nit": "103556­8",
    "telefono": "548596844",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 45,
    "nombre": "COMPUZONE",
    "razon_social": "COMPUZONE",
    "nit": "3167280­9",
    "telefono": "548596845",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 46,
    "nombre": "COMUNICACIONES CELULARES, SOCIEDAD ANONIMA",
    "razon_social": "COMUNICACIONES CELULARES, SOCIEDAD ANONIMA",
    "nit": "5498104",
    "telefono": "548596846",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 47,
    "nombre": "CONSTRUCCIONES DIVERSIFICADAS, S.A.",
    "razon_social": "CONSTRUCCIONES DIVERSIFICADAS, S.A.",
    "nit": "4816102­0",
    "telefono": "548596847",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 48,
    "nombre": "CONSTRUCTORA MARHNOS, SOCIEDAD ANONIMA",
    "razon_social": "CONSTRUCTORA MARHNOS, SOCIEDAD ANONIMA",
    "nit": "980928­7",
    "telefono": "548596848",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 49,
    "nombre": "CONSULTORES ICYASA, S.A.",
    "razon_social": "CONSULTORES ICYASA, S.A.",
    "nit": "6815082­2",
    "telefono": "548596849",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 50,
    "nombre": "CONTRALORIA GENERAL DE CUENTAS",
    "razon_social": "CONTRALORIA GENERAL DE CUENTAS",
    "nit": "637672­K",
    "telefono": "548596850",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 51,
    "nombre": "CORPORACION  NETA INFORMATICA, S.A.",
    "razon_social": "CORPORACION  NETA INFORMATICA, S.A.",
    "nit": "6615450­2",
    "telefono": "548596851",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 52,
    "nombre": "CORPORACION BELEN S,A,",
    "razon_social": "CORPORACION BELEN S,A,",
    "nit": "6964316­4",
    "telefono": "548596852",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 53,
    "nombre": "CORPORACION SUR",
    "razon_social": "CORPORACION SUR",
    "nit": "8179831­8",
    "telefono": "548596853",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 54,
    "nombre": "CRECE PUBLICIDAD.COM",
    "razon_social": "CRECE PUBLICIDAD.COM",
    "nit": "3954932­1",
    "telefono": "548596854",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 55,
    "nombre": "CREDITO HIPOTECARIO NACIONAL DE GUATEMALA",
    "razon_social": "CREDITO HIPOTECARIO NACIONAL DE GUATEMALA",
    "nit": "33038­8",
    "telefono": "548596855",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 56,
    "nombre": "DATAFLEX S.A.",
    "razon_social": "DATAFLEX S.A.",
    "nit": "712717­0",
    "telefono": "548596856",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 57,
    "nombre": "DELTANET,S.A.",
    "razon_social": "DELTANET,S.A.",
    "nit": "7421695­3",
    "telefono": "548596857",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 58,
    "nombre": "DEPOSITO STHEPHANIE",
    "razon_social": "DEPOSITO STHEPHANIE",
    "nit": "1651806­3",
    "telefono": "548596858",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 59,
    "nombre": "DEPOSITO Y ABARROTERIA EL MERCADITO",
    "razon_social": "DEPOSITO Y ABARROTERIA EL MERCADITO",
    "nit": "3007277­8",
    "telefono": "548596859",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 60,
    "nombre": "DESARROLLOS HIDRO WESTFALIA, S.A.",
    "razon_social": "DESARROLLOS HIDRO WESTFALIA, S.A.",
    "nit": "2234225­7",
    "telefono": "548596860",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 61,
    "nombre": "DIARIO DE CENTRO AMERICA",
    "razon_social": "DIARIO DE CENTRO AMERICA",
    "nit": "5731300­8",
    "telefono": "548596861",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 62,
    "nombre": "DIESELDORFF KAFFEE, SOCIEDAD ANONIMA",
    "razon_social": "DIESELDORFF KAFFEE, SOCIEDAD ANONIMA",
    "nit": "8105569­2",
    "telefono": "548596862",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 63,
    "nombre": "DIGIKAR",
    "razon_social": "DIGIKAR",
    "nit": "4803656­0",
    "telefono": "548596863",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 64,
    "nombre": "DIMAGA",
    "razon_social": "DIMAGA",
    "nit": "6801891­6",
    "telefono": "548596864",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 65,
    "nombre": "DINA ELIZABETH TIAN JUCHAN",
    "razon_social": "DINA ELIZABETH TIAN JUCHAN",
    "nit": "3072108­3",
    "telefono": "548596865",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 66,
    "nombre": "DIRECCION GENERAL DE AERONAUTICA CIVIL",
    "razon_social": "DIRECCION GENERAL DE AERONAUTICA CIVIL",
    "nit": "344093­1",
    "telefono": "548596866",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 67,
    "nombre": "DISCOGUA",
    "razon_social": "DISCOGUA",
    "nit": "153222­7",
    "telefono": "548596867",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 68,
    "nombre": "DISTINTO, S.A.",
    "razon_social": "DISTINTO, S.A.",
    "nit": "8033233­1",
    "telefono": "548596868",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 69,
    "nombre": "DISTRIBUIDORA CENTROAMERICANA CEFESA,S.A.",
    "razon_social": "DISTRIBUIDORA CENTROAMERICANA CEFESA,S.A.",
    "nit": "2400904­0",
    "telefono": "548596869",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 70,
    "nombre": "DISTRIBUIDORA CENTROAMERICANA, SOCIEDAD ANONIMA",
    "razon_social": "DISTRIBUIDORA CENTROAMERICANA, SOCIEDAD ANONIMA",
    "nit": "159288­2",
    "telefono": "548596870",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 71,
    "nombre": "DISTRIBUIDORA COBANERA, S.A",
    "razon_social": "DISTRIBUIDORA COBANERA, S.A",
    "nit": "3213447",
    "telefono": "548596871",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 72,
    "nombre": "DISTRIBUIDORA D.F.",
    "razon_social": "DISTRIBUIDORA D.F.",
    "nit": "4688998­1",
    "telefono": "548596872",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 73,
    "nombre": "DISTRIBUIDORA DE ELECTRICIDAD DE OCCIDENTE, S.A",
    "razon_social": "DISTRIBUIDORA DE ELECTRICIDAD DE OCCIDENTE, S.A",
    "nit": "1494821­1",
    "telefono": "548596873",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 74,
    "nombre": "DISTRIBUIDORA DE ELECTRICIDAD DE ORIENTE  S.A.",
    "razon_social": "DISTRIBUIDORA DE ELECTRICIDAD DE ORIENTE  S.A.",
    "nit": "1494620­3",
    "telefono": "548596874",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 75,
    "nombre": "DISTRIBUIDORA DE MERCADEO, SOCIEDAD ANONIMA",
    "razon_social": "DISTRIBUIDORA DE MERCADEO, SOCIEDAD ANONIMA",
    "nit": "798150­3",
    "telefono": "548596875",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 76,
    "nombre": "DISTRIBUIDORA DE TECNOLOGIA Y SERVICIOS S.A.",
    "razon_social": "DISTRIBUIDORA DE TECNOLOGIA Y SERVICIOS S.A.",
    "nit": "5946355­4",
    "telefono": "548596876",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 77,
    "nombre": "DISTRIBUIDORA ELECTRONICA S.A.",
    "razon_social": "DISTRIBUIDORA ELECTRONICA S.A.",
    "nit": "97976­7",
    "telefono": "548596877",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 78,
    "nombre": "DISTRIBUIDORA HUEHUETECA S.A",
    "razon_social": "DISTRIBUIDORA HUEHUETECA S.A",
    "nit": "152487­9",
    "telefono": "548596878",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 79,
    "nombre": "DISTRIBUIDORA IZABAL S. A.",
    "razon_social": "DISTRIBUIDORA IZABAL S. A.",
    "nit": "321346­3",
    "telefono": "548596879",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 80,
    "nombre": "DISTRIBUIDORA JALAPEÑA, S.A.",
    "razon_social": "DISTRIBUIDORA JALAPEÑA, S.A.",
    "nit": "330622­4",
    "telefono": "548596880",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 81,
    "nombre": "DISTRIBUIDORA LA FAMILIA",
    "razon_social": "DISTRIBUIDORA LA FAMILIA",
    "nit": "249282­2",
    "telefono": "548596881",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 82,
    "nombre": "DISTRIBUIDORA LA REPUBLICA, S.A.",
    "razon_social": "DISTRIBUIDORA LA REPUBLICA, S.A.",
    "nit": "1690492­3",
    "telefono": "548596882",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 83,
    "nombre": "DISTRIBUIDORA POPS, S.A.",
    "razon_social": "DISTRIBUIDORA POPS, S.A.",
    "nit": "104729­9",
    "telefono": "548596883",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 84,
    "nombre": "DIVISION DMC GUATEMALA, S.A.",
    "razon_social": "DIVISION DMC GUATEMALA, S.A.",
    "nit": "1665427­4",
    "telefono": "548596884",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 85,
    "nombre": "DOCUMENTOS Y DIGITALES, S.A.",
    "razon_social": "DOCUMENTOS Y DIGITALES, S.A.",
    "nit": "57546­1",
    "telefono": "548596885",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 86,
    "nombre": "DQB,S.A.",
    "razon_social": "DQB,S.A.",
    "nit": "7248504­3",
    "telefono": "548596886",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 87,
    "nombre": "EL ROSARIO INVERSIONES Y MULTISERVICIOS, S. A.",
    "razon_social": "EL ROSARIO INVERSIONES Y MULTISERVICIOS, S. A.",
    "nit": "6999488­9",
    "telefono": "548596887",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 88,
    "nombre": "EL ZAPOTAL",
    "razon_social": "EL ZAPOTAL",
    "nit": "2519320­1",
    "telefono": "548596888",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 89,
    "nombre": "ELECTRONICA PANAMERICANA",
    "razon_social": "ELECTRONICA PANAMERICANA",
    "nit": "523013­6",
    "telefono": "548596889",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 90,
    "nombre": "ELECTRONICA, EQUIPOS Y SERVICIOS",
    "razon_social": "ELECTRONICA, EQUIPOS Y SERVICIOS",
    "nit": "2228114­2",
    "telefono": "548596890",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 91,
    "nombre": "ELECTROPUERTAS, S.A.",
    "razon_social": "ELECTROPUERTAS, S.A.",
    "nit": "2487831­6",
    "telefono": "548596891",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 92,
    "nombre": "EMETRA",
    "razon_social": "EMETRA",
    "nit": "835782­K",
    "telefono": "548596892",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 93,
    "nombre": "EMPAGUA",
    "razon_social": "EMPAGUA",
    "nit": "330651­8",
    "telefono": "548596893",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 94,
    "nombre": "EMPRESA CAMPESINA ASOCIATIVA ECA ASUNCION SEACAL",
    "razon_social": "EMPRESA CAMPESINA ASOCIATIVA ECA ASUNCION SEACAL",
    "nit": "7004973­4",
    "telefono": "548596894",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 95,
    "nombre": "EMPRESA ELECTRICA DE GUATEMALA,S.A.",
    "razon_social": "EMPRESA ELECTRICA DE GUATEMALA,S.A.",
    "nit": "32644­5",
    "telefono": "548596895",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 96,
    "nombre": "EMPRESA ELECTRICA MUNICIPALIDAD DE HUEHUETENANGO",
    "razon_social": "EMPRESA ELECTRICA MUNICIPALIDAD DE HUEHUETENANGO",
    "nit": "424104­5",
    "telefono": "548596896",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 97,
    "nombre": "EMPRESA HOSPITALARIA CEMESA,S.A.",
    "razon_social": "EMPRESA HOSPITALARIA CEMESA,S.A.",
    "nit": "33785­4",
    "telefono": "548596897",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 98,
    "nombre": "EMPRESA MUNICIPAL RURAL DE ELECTRICIDAD EMRE",
    "razon_social": "EMPRESA MUNICIPAL RURAL DE ELECTRICIDAD EMRE",
    "nit": "19920040",
    "telefono": "548596898",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 99,
    "nombre": "ENERGUATE",
    "razon_social": "ENERGUATE",
    "nit": "1494820­3",
    "telefono": "548596899",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 100,
    "nombre": "ESTACION DE SERVICIO LAS CASAS,S.A.",
    "razon_social": "ESTACION DE SERVICIO LAS CASAS,S.A.",
    "nit": "3908547­3",
    "telefono": "5485968100",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 101,
    "nombre": "ESTACION PETRO XOLBE, PETROLEOS DEL PAIS S.A.",
    "razon_social": "ESTACION PETRO XOLBE, PETROLEOS DEL PAIS S.A.",
    "nit": "5297244­5",
    "telefono": "5485968101",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 102,
    "nombre": "ESTACIONES DEL NORTE, S.A.",
    "razon_social": "ESTACIONES DEL NORTE, S.A.",
    "nit": "3908414­0",
    "telefono": "5485968102",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 103,
    "nombre": "FERRETERIA HERMANOS MERIDA",
    "razon_social": "FERRETERIA HERMANOS MERIDA",
    "nit": "2582066­4",
    "telefono": "5485968103",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 104,
    "nombre": "FERRETERIA ROTMANN RUIZ DOS, S.A.",
    "razon_social": "FERRETERIA ROTMANN RUIZ DOS, S.A.",
    "nit": "3021392­4",
    "telefono": "5485968104",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 105,
    "nombre": "FERRETERIAS EL TEJAR S.A.",
    "razon_social": "FERRETERIAS EL TEJAR S.A.",
    "nit": "452021­1",
    "telefono": "5485968105",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 106,
    "nombre": "FERRO MAYA",
    "razon_social": "FERRO MAYA",
    "nit": "473030­5",
    "telefono": "5485968106",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 107,
    "nombre": "FFACSA, SOCIEDAD ANONIMA",
    "razon_social": "FFACSA, SOCIEDAD ANONIMA",
    "nit": "2221623­5",
    "telefono": "5485968107",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 108,
    "nombre": "FIDEICOMISO FONDO DE TIERRAS ACUERDO DE PAZ",
    "razon_social": "FIDEICOMISO FONDO DE TIERRAS ACUERDO DE PAZ",
    "nit": "1762891­1",
    "telefono": "5485968108",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 109,
    "nombre": "FORTALEZA DEL SUR, SOCIEDAD ANONIMA",
    "razon_social": "FORTALEZA DEL SUR, SOCIEDAD ANONIMA",
    "nit": "5211956­4",
    "telefono": "5485968109",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 110,
    "nombre": "FRANQUICIA DE LIMPIEZA, SERVICIO Y CALIDAD,S.A.",
    "razon_social": "FRANQUICIA DE LIMPIEZA, SERVICIO Y CALIDAD,S.A.",
    "nit": "6814246­3",
    "telefono": "5485968110",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 111,
    "nombre": "FULL OFFICE, S. A.",
    "razon_social": "FULL OFFICE, S. A.",
    "nit": "4268201­0",
    "telefono": "5485968111",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 112,
    "nombre": "GASOLINAS UNIVERSAL, S.A.",
    "razon_social": "GASOLINAS UNIVERSAL, S.A.",
    "nit": "7807146­1",
    "telefono": "5485968112",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 113,
    "nombre": "GASOLINERA EL CENTRO",
    "razon_social": "GASOLINERA EL CENTRO",
    "nit": "2495770­4",
    "telefono": "5485968113",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 114,
    "nombre": "GASOLINERA SAN JOSE, SOCIEDAD ANONIMA",
    "razon_social": "GASOLINERA SAN JOSE, SOCIEDAD ANONIMA",
    "nit": "2740561­3",
    "telefono": "5485968114",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 115,
    "nombre": "GASOLINERA Y ESTACION DE SERVICIOS EL AMIGO",
    "razon_social": "GASOLINERA Y ESTACION DE SERVICIOS EL AMIGO",
    "nit": "5660548",
    "telefono": "5485968115",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 116,
    "nombre": "GEO DATA, SOCIEDAD ANONIMA",
    "razon_social": "GEO DATA, SOCIEDAD ANONIMA",
    "nit": "3722711­4",
    "telefono": "5485968116",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 117,
    "nombre": "GERHALEGER SOCIEDAD ANONIMA",
    "razon_social": "GERHALEGER SOCIEDAD ANONIMA",
    "nit": "7742720­3",
    "telefono": "5485968117",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 118,
    "nombre": "GERMAN LUX US",
    "razon_social": "GERMAN LUX US",
    "nit": "3335637­8",
    "telefono": "5485968118",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 119,
    "nombre": "GERSON AGUIRRE ARAGON",
    "razon_social": "GERSON AGUIRRE ARAGON",
    "nit": "2703866­1",
    "telefono": "5485968119",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 120,
    "nombre": "GHOST WHISPERER",
    "razon_social": "GHOST WHISPERER",
    "nit": "4417054­8",
    "telefono": "5485968120",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 121,
    "nombre": "GOGAS, SOCIEDAD ANÓNIMA",
    "razon_social": "GOGAS, SOCIEDAD ANÓNIMA",
    "nit": "7951933­4",
    "telefono": "5485968121",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 122,
    "nombre": "GRAFI ARQ",
    "razon_social": "GRAFI ARQ",
    "nit": "4744074­0",
    "telefono": "5485968122",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 123,
    "nombre": "GRUPO BISEL",
    "razon_social": "GRUPO BISEL",
    "nit": "5361132­2",
    "telefono": "5485968123",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 124,
    "nombre": "GRUPO CORPORATIVO GYP, S.A.",
    "razon_social": "GRUPO CORPORATIVO GYP, S.A.",
    "nit": "6367882­9",
    "telefono": "5485968124",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 125,
    "nombre": "GRUPO EXCELENCIA CENTROAMERICA, S.A.",
    "razon_social": "GRUPO EXCELENCIA CENTROAMERICA, S.A.",
    "nit": "3412559­0",
    "telefono": "5485968125",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 126,
    "nombre": "GRUPO LEON, SOCIEDAD ANONIMA",
    "razon_social": "GRUPO LEON, SOCIEDAD ANONIMA",
    "nit": "5914028­3",
    "telefono": "5485968126",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 127,
    "nombre": "GRUPO RAF DE GUATEMALA, S.A.",
    "razon_social": "GRUPO RAF DE GUATEMALA, S.A.",
    "nit": "5299110­5",
    "telefono": "5485968127",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 128,
    "nombre": "GRUPO SOLID GUATEMALA, S.A.",
    "razon_social": "GRUPO SOLID GUATEMALA, S.A.",
    "nit": "549234­3",
    "telefono": "5485968128",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 129,
    "nombre": "GRUPO TULAN S.A.",
    "razon_social": "GRUPO TULAN S.A.",
    "nit": "8125164­5",
    "telefono": "5485968129",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 130,
    "nombre": "HOTEL CAMINO REAL, S.A.",
    "razon_social": "HOTEL CAMINO REAL, S.A.",
    "nit": "32207­5",
    "telefono": "5485968130",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 131,
    "nombre": "HOTEL DEL PARQUE/SANTA CRUZ S.A.",
    "razon_social": "HOTEL DEL PARQUE/SANTA CRUZ S.A.",
    "nit": "535363­7",
    "telefono": "5485968131",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 132,
    "nombre": "HOTEL MAYA INTERNACIONAL",
    "razon_social": "HOTEL MAYA INTERNACIONAL",
    "nit": "532346­0",
    "telefono": "5485968132",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 133,
    "nombre": "IMAGINOVA, S.A.",
    "razon_social": "IMAGINOVA, S.A.",
    "nit": "6972312­5",
    "telefono": "5485968133",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 134,
    "nombre": "IMPERIO REAL, S.A.",
    "razon_social": "IMPERIO REAL, S.A.",
    "nit": "6610156­5",
    "telefono": "5485968134",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 135,
    "nombre": "IND DES. FUNERARIA CENTROAMERICANA,S.A.",
    "razon_social": "IND DES. FUNERARIA CENTROAMERICANA,S.A.",
    "nit": "4850907­8",
    "telefono": "5485968135",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 136,
    "nombre": "INDUSTRIA DE ALIMENTOS SANTA MARTHA S.A",
    "razon_social": "INDUSTRIA DE ALIMENTOS SANTA MARTHA S.A",
    "nit": "6672011­7",
    "telefono": "5485968136",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 137,
    "nombre": "INDUSTRIA DE HAMGURGUESAS, S. A.",
    "razon_social": "INDUSTRIA DE HAMGURGUESAS, S. A.",
    "nit": "452158­7",
    "telefono": "5485968137",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 138,
    "nombre": "INDUSTRIA DE PAPEL, S.A.",
    "razon_social": "INDUSTRIA DE PAPEL, S.A.",
    "nit": "2521208­7",
    "telefono": "5485968138",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 139,
    "nombre": "INDUSTRIA MILITAR",
    "razon_social": "INDUSTRIA MILITAR",
    "nit": "675697­2",
    "telefono": "5485968139",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 140,
    "nombre": "INDUSTRIA PANIFICADORA ISOPAN, S. A.",
    "razon_social": "INDUSTRIA PANIFICADORA ISOPAN, S. A.",
    "nit": "2526206­8",
    "telefono": "5485968140",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 141,
    "nombre": "INDUSTRIA PANIFICADORA Y PASTELERIA LIDO",
    "razon_social": "INDUSTRIA PANIFICADORA Y PASTELERIA LIDO",
    "nit": "225216­3",
    "telefono": "5485968141",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 142,
    "nombre": "INDUSTRIA PROCESADORA DE METALES,S.A.",
    "razon_social": "INDUSTRIA PROCESADORA DE METALES,S.A.",
    "nit": "2966249­4",
    "telefono": "5485968142",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 143,
    "nombre": "ING. EDMUNDO ASDRUBAL BONILLA REYES",
    "razon_social": "ING. EDMUNDO ASDRUBAL BONILLA REYES",
    "nit": "169243­7",
    "telefono": "5485968143",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 144,
    "nombre": "INGENIEROS ELECTRICISTAS,S.A.",
    "razon_social": "INGENIEROS ELECTRICISTAS,S.A.",
    "nit": "738539­0",
    "telefono": "5485968144",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 145,
    "nombre": "INGESCA, S. A.",
    "razon_social": "INGESCA, S. A.",
    "nit": "3547447­5",
    "telefono": "5485968145",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 146,
    "nombre": "INMOBILIARIA CIMIENTOS, S.A.",
    "razon_social": "INMOBILIARIA CIMIENTOS, S.A.",
    "nit": "1277841­9",
    "telefono": "5485968146",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 147,
    "nombre": "INNOVA",
    "razon_social": "INNOVA",
    "nit": "4933857­9",
    "telefono": "5485968147",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 148,
    "nombre": "INSTALACIONES MODERNAS, S.A.",
    "razon_social": "INSTALACIONES MODERNAS, S.A.",
    "nit": "84846­8",
    "telefono": "5485968148",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 149,
    "nombre": "INSTALACIONES PROFESIONALES",
    "razon_social": "INSTALACIONES PROFESIONALES",
    "nit": "6067183­1",
    "telefono": "5485968149",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 150,
    "nombre": "INTELAF S.A.",
    "razon_social": "INTELAF S.A.",
    "nit": "538207­6",
    "telefono": "5485968150",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 151,
    "nombre": "INTELIDENT, S.A.",
    "razon_social": "INTELIDENT, S.A.",
    "nit": "2501876­0",
    "telefono": "5485968151",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 152,
    "nombre": "INVERSIONES CASA INSTRUMENTAL SOCIEDAD ANONIMA",
    "razon_social": "INVERSIONES CASA INSTRUMENTAL SOCIEDAD ANONIMA",
    "nit": "821743­2",
    "telefono": "5485968152",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 153,
    "nombre": "INVERSIONES IXIMCHE S,A.",
    "razon_social": "INVERSIONES IXIMCHE S,A.",
    "nit": "4961631­5",
    "telefono": "5485968153",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 154,
    "nombre": "INVERSIONES REFORMA PALACE, S.A.",
    "razon_social": "INVERSIONES REFORMA PALACE, S.A.",
    "nit": "504924­5",
    "telefono": "5485968154",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 155,
    "nombre": "INVERSIONES SUCAMSA, S.A.",
    "razon_social": "INVERSIONES SUCAMSA, S.A.",
    "nit": "5550066­8",
    "telefono": "5485968155",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 156,
    "nombre": "INVERSIONES Y SERVICIOS AYALA, S.A.",
    "razon_social": "INVERSIONES Y SERVICIOS AYALA, S.A.",
    "nit": "7259535­3",
    "telefono": "5485968156",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 157,
    "nombre": "KLD LLANTAS Y SERVICIOS",
    "razon_social": "KLD LLANTAS Y SERVICIOS",
    "nit": "7986494­5",
    "telefono": "5485968157",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 158,
    "nombre": "LA RESTINGA, S.A.",
    "razon_social": "LA RESTINGA, S.A.",
    "nit": "8494656­3",
    "telefono": "5485968158",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 159,
    "nombre": "LA RUEDA RESTAURANTE Y DELICATESSEN",
    "razon_social": "LA RUEDA RESTAURANTE Y DELICATESSEN",
    "nit": "8149085­2",
    "telefono": "5485968159",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 160,
    "nombre": "LIBRERIA E IMPRENTA VIVIAN, S.A.",
    "razon_social": "LIBRERIA E IMPRENTA VIVIAN, S.A.",
    "nit": "485149­8",
    "telefono": "5485968160",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 161,
    "nombre": "LIBRERIA PAPELERIA E IMPRESOS LA CEIBA",
    "razon_social": "LIBRERIA PAPELERIA E IMPRESOS LA CEIBA",
    "nit": "212241­3",
    "telefono": "5485968161",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 162,
    "nombre": "LIBRERIA Y DISTRIBUIDORA UNIVERSAL",
    "razon_social": "LIBRERIA Y DISTRIBUIDORA UNIVERSAL",
    "nit": "3102891­8",
    "telefono": "5485968162",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 163,
    "nombre": "LIBRERIA Y PAPELERIA ATLANTIS",
    "razon_social": "LIBRERIA Y PAPELERIA ATLANTIS",
    "nit": "1613687­K",
    "telefono": "5485968163",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 164,
    "nombre": "LIBRERIA Y PAPELERIA E IMPRENTA EL EXITO",
    "razon_social": "LIBRERIA Y PAPELERIA E IMPRENTA EL EXITO",
    "nit": "6756878­5",
    "telefono": "5485968164",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 165,
    "nombre": "LIBRERIA Y PAPELERIA PROGRESO 2",
    "razon_social": "LIBRERIA Y PAPELERIA PROGRESO 2",
    "nit": "117805­9",
    "telefono": "5485968165",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 166,
    "nombre": "LIBRERIA­PAPELERIA PROGRESO, S.A.",
    "razon_social": "LIBRERIA­PAPELERIA PROGRESO, S.A.",
    "nit": "32165­6",
    "telefono": "5485968166",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 167,
    "nombre": "LIBRERIAS Y PAPELERIAS SCRIBE,S.A.",
    "razon_social": "LIBRERIAS Y PAPELERIAS SCRIBE,S.A.",
    "nit": "6665867­5",
    "telefono": "5485968167",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 168,
    "nombre": "LINEA DORADA JEMABAL, S.A.",
    "razon_social": "LINEA DORADA JEMABAL, S.A.",
    "nit": "1251505­1",
    "telefono": "5485968168",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 169,
    "nombre": "LIVIAN YANIRA GONZALEZ MEDINA DE HERNANDEZ",
    "razon_social": "LIVIAN YANIRA GONZALEZ MEDINA DE HERNANDEZ",
    "nit": "17862426",
    "telefono": "5485968169",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 170,
    "nombre": "LLANTAS VITATRAC, SOCIEDAD ANONIMA",
    "razon_social": "LLANTAS VITATRAC, SOCIEDAD ANONIMA",
    "nit": "104512­1",
    "telefono": "5485968170",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 171,
    "nombre": "LUBRI REPUESTOS LAS PALMAS",
    "razon_social": "LUBRI REPUESTOS LAS PALMAS",
    "nit": "294136­8",
    "telefono": "5485968171",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 172,
    "nombre": "MAYA CAFE",
    "razon_social": "MAYA CAFE",
    "nit": "765928­8",
    "telefono": "5485968172",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 173,
    "nombre": "MEGAROTULOS DE GUATEMALA",
    "razon_social": "MEGAROTULOS DE GUATEMALA",
    "nit": "7182871­0",
    "telefono": "5485968173",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 174,
    "nombre": "MERCADO FERRETERO SUPER GUATEMALA. S.A",
    "razon_social": "MERCADO FERRETERO SUPER GUATEMALA. S.A",
    "nit": "3844006­7",
    "telefono": "5485968174",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 175,
    "nombre": "MERENDERO LA OFICINA",
    "razon_social": "MERENDERO LA OFICINA",
    "nit": "3470224­5",
    "telefono": "5485968175",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 176,
    "nombre": "METRONET, S.A.",
    "razon_social": "METRONET, S.A.",
    "nit": "3122741­4",
    "telefono": "5485968176",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 177,
    "nombre": "MINELAC, S.A.",
    "razon_social": "MINELAC, S.A.",
    "nit": "986746­5",
    "telefono": "5485968177",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 178,
    "nombre": "MINISTERIO DE GOBERNACION",
    "razon_social": "MINISTERIO DE GOBERNACION",
    "nit": "249233­4",
    "telefono": "5485968178",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 179,
    "nombre": "MIRIAM ELIZABETH RIVERA BOSCH DE SOSA",
    "razon_social": "MIRIAM ELIZABETH RIVERA BOSCH DE SOSA",
    "nit": "187720­8",
    "telefono": "5485968179",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 180,
    "nombre": "MIRIAM ESTELA FERNANDEZ GODINEZ DE DIEGUEZ",
    "razon_social": "MIRIAM ESTELA FERNANDEZ GODINEZ DE DIEGUEZ",
    "nit": "4875072­7",
    "telefono": "5485968180",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 181,
    "nombre": "MIRIAM J. ESTRADA P.",
    "razon_social": "MIRIAM J. ESTRADA P.",
    "nit": "2479686­7",
    "telefono": "5485968181",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 182,
    "nombre": "MIRTHALA ROBLES REYES DE VALENZUELA",
    "razon_social": "MIRTHALA ROBLES REYES DE VALENZUELA",
    "nit": "661379­9",
    "telefono": "5485968182",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 183,
    "nombre": "MIZPA, S.A.",
    "razon_social": "MIZPA, S.A.",
    "nit": "2486519­2",
    "telefono": "5485968183",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 184,
    "nombre": "MOCAGILORE S.A.",
    "razon_social": "MOCAGILORE S.A.",
    "nit": "7827309­9",
    "telefono": "5485968184",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 185,
    "nombre": "MULSITERVICIOS IZABAL",
    "razon_social": "MULSITERVICIOS IZABAL",
    "nit": "2594920­9",
    "telefono": "5485968185",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 186,
    "nombre": "MULTISERVICIOS M &R",
    "razon_social": "MULTISERVICIOS M &R",
    "nit": "728407­1",
    "telefono": "5485968186",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 187,
    "nombre": "MULTISERVICIOS MEME´S, S.A.",
    "razon_social": "MULTISERVICIOS MEME´S, S.A.",
    "nit": "6785390­0",
    "telefono": "5485968187",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 188,
    "nombre": "MULTISERVICIOS MIRANDA",
    "razon_social": "MULTISERVICIOS MIRANDA",
    "nit": "705315­0",
    "telefono": "5485968188",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 189,
    "nombre": "MULTISERVICIOS TATO",
    "razon_social": "MULTISERVICIOS TATO",
    "nit": "2965814­4",
    "telefono": "5485968189",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 190,
    "nombre": "MUNDI TROFEOS S.A.",
    "razon_social": "MUNDI TROFEOS S.A.",
    "nit": "460558­6",
    "telefono": "5485968190",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 191,
    "nombre": "MUNICIPALIDAD DE  QUETZALTENANGO",
    "razon_social": "MUNICIPALIDAD DE  QUETZALTENANGO",
    "nit": "588364­4",
    "telefono": "5485968191",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 192,
    "nombre": "OCEANO AZUL COMUNICACIONES, SOCIEDAD ANONIMA",
    "razon_social": "OCEANO AZUL COMUNICACIONES, SOCIEDAD ANONIMA",
    "nit": "7399656­4",
    "telefono": "5485968192",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 193,
    "nombre": "OD GUATEMALA Y COMPAÐIA LIMITADA",
    "razon_social": "OD GUATEMALA Y COMPAÐIA LIMITADA",
    "nit": "5590541­2",
    "telefono": "5485968193",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 194,
    "nombre": "OPERADORA DE TIENDAS, S.A.",
    "razon_social": "OPERADORA DE TIENDAS, S.A.",
    "nit": "737810­6",
    "telefono": "5485968194",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 195,
    "nombre": "PALACE,S.A.",
    "razon_social": "PALACE,S.A.",
    "nit": "476106­5",
    "telefono": "5485968195",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 196,
    "nombre": "PANADERIA Y PASTELERIA LA BENDICION",
    "razon_social": "PANADERIA Y PASTELERIA LA BENDICION",
    "nit": "178769­1",
    "telefono": "5485968196",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 197,
    "nombre": "PAPELERA XELAJU",
    "razon_social": "PAPELERA XELAJU",
    "nit": "6285294­9",
    "telefono": "5485968197",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 198,
    "nombre": "PAPELERIA ARRIOLA, S.A.",
    "razon_social": "PAPELERIA ARRIOLA, S.A.",
    "nit": "3823142­5",
    "telefono": "5485968198",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 199,
    "nombre": "PASEO DEL CAPORAL  S.A.",
    "razon_social": "PASEO DEL CAPORAL  S.A.",
    "nit": "7879498­6",
    "telefono": "5485968199",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 200,
    "nombre": "PASTELERIA ITALIANA CIRO, S.A.",
    "razon_social": "PASTELERIA ITALIANA CIRO, S.A.",
    "nit": "509650­2",
    "telefono": "5485968200",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 201,
    "nombre": "PASTELERIA Y BANQUETES GARNISH",
    "razon_social": "PASTELERIA Y BANQUETES GARNISH",
    "nit": "7529582­2",
    "telefono": "5485968201",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 202,
    "nombre": "PATRICIA REYES ROSALES",
    "razon_social": "PATRICIA REYES ROSALES",
    "nit": "809413­6",
    "telefono": "5485968202",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 203,
    "nombre": "PATSY, S. A. (PASTELERIAS Y CAFETERIAS PATSY)",
    "razon_social": "PATSY, S. A. (PASTELERIAS Y CAFETERIAS PATSY)",
    "nit": "546406­4",
    "telefono": "5485968203",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 204,
    "nombre": "PINCHAZO PROFESIONAL",
    "razon_social": "PINCHAZO PROFESIONAL",
    "nit": "2954049­6",
    "telefono": "5485968204",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 205,
    "nombre": "PLASTIHOGAR S.A.",
    "razon_social": "PLASTIHOGAR S.A.",
    "nit": "2951290­5",
    "telefono": "5485968205",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 206,
    "nombre": "PLATINO,S.A.",
    "razon_social": "PLATINO,S.A.",
    "nit": "700141­K",
    "telefono": "5485968206",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 207,
    "nombre": "POLLO BRUJO DE CENTROAMERICA, S.A.",
    "razon_social": "POLLO BRUJO DE CENTROAMERICA, S.A.",
    "nit": "568686­5",
    "telefono": "5485968207",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 208,
    "nombre": "POLLO CAMPERO, S.A.",
    "razon_social": "POLLO CAMPERO, S.A.",
    "nit": "90494­5",
    "telefono": "5485968208",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 209,
    "nombre": "POLLO EXPRESS",
    "razon_social": "POLLO EXPRESS",
    "nit": "610860­1",
    "telefono": "5485968209",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 210,
    "nombre": "PRENSA LIBRE  S.A.",
    "razon_social": "PRENSA LIBRE  S.A.",
    "nit": "73384­9",
    "telefono": "5485968210",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 211,
    "nombre": "PRO AGUA  DEL PUEBLO O.N.G.",
    "razon_social": "PRO AGUA  DEL PUEBLO O.N.G.",
    "nit": "265002­9",
    "telefono": "5485968211",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 212,
    "nombre": "PRODUCTOS FERRETEROS DEL NORTE S.A.",
    "razon_social": "PRODUCTOS FERRETEROS DEL NORTE S.A.",
    "nit": "7295461­2",
    "telefono": "5485968212",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 213,
    "nombre": "PROGRESO CINCO, S.A.",
    "razon_social": "PROGRESO CINCO, S.A.",
    "nit": "732884­2",
    "telefono": "5485968213",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 214,
    "nombre": "PROMOCIONES Y NEGOCIOS, S. A.",
    "razon_social": "PROMOCIONES Y NEGOCIOS, S. A.",
    "nit": "414697­2",
    "telefono": "5485968214",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 215,
    "nombre": "PROTECCION DE ARCHIVOS Y SERVICIOS S.A",
    "razon_social": "PROTECCION DE ARCHIVOS Y SERVICIOS S.A",
    "nit": "7316926­9",
    "telefono": "5485968215",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 216,
    "nombre": "PROVEEDORA DE EQUIPOS Y SERVICIOS, S.A.",
    "razon_social": "PROVEEDORA DE EQUIPOS Y SERVICIOS, S.A.",
    "nit": "3733482­4",
    "telefono": "5485968216",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 217,
    "nombre": "PROVEEDORA MEDICA, S.A.",
    "razon_social": "PROVEEDORA MEDICA, S.A.",
    "nit": "726945­5",
    "telefono": "5485968217",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 218,
    "nombre": "RADIO FM 94.7 LA BUENA, S. A.",
    "razon_social": "RADIO FM 94.7 LA BUENA, S. A.",
    "nit": "3008185­8",
    "telefono": "5485968218",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 219,
    "nombre": "RADIO PERIÓDICO ENFOQUE",
    "razon_social": "RADIO PERIÓDICO ENFOQUE",
    "nit": "825230­0",
    "telefono": "5485968219",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 220,
    "nombre": "REGISTRO GENERAL DE LA PROPIEDAD",
    "razon_social": "REGISTRO GENERAL DE LA PROPIEDAD",
    "nit": "775643­7",
    "telefono": "5485968220",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 221,
    "nombre": "RENTABLE, S.A.",
    "razon_social": "RENTABLE, S.A.",
    "nit": "3839501­0",
    "telefono": "5485968221",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 222,
    "nombre": "RENTANETT EDUCACIONAL",
    "razon_social": "RENTANETT EDUCACIONAL",
    "nit": "603332­6",
    "telefono": "5485968222",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 223,
    "nombre": "REPUESTOS TOTAL SOCIEDAD ANONIMA",
    "razon_social": "REPUESTOS TOTAL SOCIEDAD ANONIMA",
    "nit": "476976­7",
    "telefono": "5485968223",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 224,
    "nombre": "RESTAURANTE SARITA, S.A.",
    "razon_social": "RESTAURANTE SARITA, S.A.",
    "nit": "3044990­1",
    "telefono": "5485968224",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 225,
    "nombre": "RESTAURANTE Y SERVICIOS, S.A.",
    "razon_social": "RESTAURANTE Y SERVICIOS, S.A.",
    "nit": "388231­4",
    "telefono": "5485968225",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 226,
    "nombre": "SAT",
    "razon_social": "SAT",
    "nit": "1669394­9",
    "telefono": "5485968226",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 227,
    "nombre": "SATELITE SISTEMAS LA MAQUINA",
    "razon_social": "SATELITE SISTEMAS LA MAQUINA",
    "nit": "747373­7",
    "telefono": "5485968227",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 228,
    "nombre": "SECURITY PROFESIONAL SYSTEMS, S.A.",
    "razon_social": "SECURITY PROFESIONAL SYSTEMS, S.A.",
    "nit": "3204326­0",
    "telefono": "5485968228",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 229,
    "nombre": "SEGUROS G&T S.A.",
    "razon_social": "SEGUROS G&T S.A.",
    "nit": "321737",
    "telefono": "5485968229",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 230,
    "nombre": "SERVICENTRO DEL NORTE, S. A.",
    "razon_social": "SERVICENTRO DEL NORTE, S. A.",
    "nit": "62363697",
    "telefono": "5485968230",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 231,
    "nombre": "SERVICENTRO EL SOL, S.A.",
    "razon_social": "SERVICENTRO EL SOL, S.A.",
    "nit": "3881648­2",
    "telefono": "5485968231",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 232,
    "nombre": "SERVICIOS DE SEGURIDAD INTEGRAL, S.A.",
    "razon_social": "SERVICIOS DE SEGURIDAD INTEGRAL, S.A.",
    "nit": "1193596­0",
    "telefono": "5485968232",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 233,
    "nombre": "SERVICIOS GENERALES LA COLMENA",
    "razon_social": "SERVICIOS GENERALES LA COLMENA",
    "nit": "2761003­9",
    "telefono": "5485968233",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 234,
    "nombre": "SERVICIOS MARTINEZ",
    "razon_social": "SERVICIOS MARTINEZ",
    "nit": "3146389­4",
    "telefono": "5485968234",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 235,
    "nombre": "SERVICIOS MONTUFAR, S.A.",
    "razon_social": "SERVICIOS MONTUFAR, S.A.",
    "nit": "6887557­6",
    "telefono": "5485968235",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 236,
    "nombre": "SERVICIOS TÉCNICOS MENDEZ DIAZ",
    "razon_social": "SERVICIOS TÉCNICOS MENDEZ DIAZ",
    "nit": "4817215­4",
    "telefono": "5485968236",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 237,
    "nombre": "SERVICIOS TECNICOS OSWALDOS",
    "razon_social": "SERVICIOS TECNICOS OSWALDOS",
    "nit": "382531­0",
    "telefono": "5485968237",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 238,
    "nombre": "SERVICIOS TECNOLOGICOS INTERWORLD",
    "razon_social": "SERVICIOS TECNOLOGICOS INTERWORLD",
    "nit": "4383612­7",
    "telefono": "5485968238",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 239,
    "nombre": "SERVICIOS VASQUEZ",
    "razon_social": "SERVICIOS VASQUEZ",
    "nit": "7405254­3",
    "telefono": "5485968239",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 240,
    "nombre": "SERVICOMP DE GUATEMALA, S.A.",
    "razon_social": "SERVICOMP DE GUATEMALA, S.A.",
    "nit": "3739191­7",
    "telefono": "5485968240",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 241,
    "nombre": "SERVIPRENSA S. A.",
    "razon_social": "SERVIPRENSA S. A.",
    "nit": "2452366­6",
    "telefono": "5485968241",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 242,
    "nombre": "SOLACON,S.A.",
    "razon_social": "SOLACON,S.A.",
    "nit": "4343994­2",
    "telefono": "5485968242",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 243,
    "nombre": "SONIDO SEGURO, S. A.",
    "razon_social": "SONIDO SEGURO, S. A.",
    "nit": "726752­5",
    "telefono": "5485968243",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 244,
    "nombre": "SUMINISTRO INTERNACIONAL DE MERCADERIAS, S. A.",
    "razon_social": "SUMINISTRO INTERNACIONAL DE MERCADERIAS, S. A.",
    "nit": "2539740­0",
    "telefono": "5485968244",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 245,
    "nombre": "SUPER AUTO REPUESTOS,S.A. ACQUARONI",
    "razon_social": "SUPER AUTO REPUESTOS,S.A. ACQUARONI",
    "nit": "2629333­1",
    "telefono": "5485968245",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 246,
    "nombre": "TALLER FERROARTE",
    "razon_social": "TALLER FERROARTE",
    "nit": "3098595­1",
    "telefono": "5485968246",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 247,
    "nombre": "TALLER Y ACUMULADORES EL BUEN SERVICIO",
    "razon_social": "TALLER Y ACUMULADORES EL BUEN SERVICIO",
    "nit": "3590488­7",
    "telefono": "5485968247",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 248,
    "nombre": "TECNOSTORE, SOCIEDAD ANONIMA",
    "razon_social": "TECNOSTORE, SOCIEDAD ANONIMA",
    "nit": "7354067­6",
    "telefono": "5485968248",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 249,
    "nombre": "TIENDA EL MANANTIAL",
    "razon_social": "TIENDA EL MANANTIAL",
    "nit": "3827153­2",
    "telefono": "5485968249",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 250,
    "nombre": "TIENDA LA PISTA",
    "razon_social": "TIENDA LA PISTA",
    "nit": "8049279­7",
    "telefono": "5485968250",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 251,
    "nombre": "TIENDA MEJIA",
    "razon_social": "TIENDA MEJIA",
    "nit": "3132818­0",
    "telefono": "5485968251",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 252,
    "nombre": "TIENDA SAN JOSE",
    "razon_social": "TIENDA SAN JOSE",
    "nit": "695264­K",
    "telefono": "5485968252",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 253,
    "nombre": "TIENDA Y REFRESQUERIA MARIELA",
    "razon_social": "TIENDA Y REFRESQUERIA MARIELA",
    "nit": "1628326­0",
    "telefono": "5485968253",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 254,
    "nombre": "TISSU, S.A.",
    "razon_social": "TISSU, S.A.",
    "nit": "7496381­3",
    "telefono": "5485968254",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 255,
    "nombre": "TOSTADURIA DE CAFE LEON S.A.",
    "razon_social": "TOSTADURIA DE CAFE LEON S.A.",
    "nit": "402664­0",
    "telefono": "5485968255",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 256,
    "nombre": "TRANSPORTE, EMPAQUE Y ALMACENAJE, SOCIEDAD ANONIM",
    "razon_social": "TRANSPORTE, EMPAQUE Y ALMACENAJE, SOCIEDAD ANONIM",
    "nit": "3037029­9",
    "telefono": "5485968256",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 257,
    "nombre": "TRANSPORTES MONJA BLANCA, S.A.",
    "razon_social": "TRANSPORTES MONJA BLANCA, S.A.",
    "nit": "2556765­9",
    "telefono": "5485968257",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 258,
    "nombre": "TRANSPORTES RAPIDOS DEL SUR",
    "razon_social": "TRANSPORTES RAPIDOS DEL SUR",
    "nit": "85826­9",
    "telefono": "5485968258",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 259,
    "nombre": "UNION FENOSA",
    "razon_social": "UNION FENOSA",
    "nit": "14946203",
    "telefono": "5485968259",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 260,
    "nombre": "UNISUPER, S.A.",
    "razon_social": "UNISUPER, S.A.",
    "nit": "2653247­6",
    "telefono": "5485968260",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 261,
    "nombre": "VENTAS IMPORTACIONES Y SERVICIOS COMERCIALES, S.A.",
    "razon_social": "VENTAS IMPORTACIONES Y SERVICIOS COMERCIALES, S.A.",
    "nit": "1251781­K",
    "telefono": "5485968261",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 262,
    "nombre": "VIDA SILVESTRE S.A.",
    "razon_social": "VIDA SILVESTRE S.A.",
    "nit": "6548521­1",
    "telefono": "5485968262",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 263,
    "nombre": "VIDRIERIA BARRIOS",
    "razon_social": "VIDRIERIA BARRIOS",
    "nit": "1730830­5",
    "telefono": "5485968263",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 264,
    "nombre": "VIDRIERIA ROJAS, S.A.",
    "razon_social": "VIDRIERIA ROJAS, S.A.",
    "nit": "603000­9",
    "telefono": "5485968264",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  },
  {
    "comercioId": 265,
    "nombre": "YI­HOU S.A.",
    "razon_social": "YI­HOU S.A.",
    "nit": "3658560­2",
    "telefono": "5485968265",
    "correo": "blu.urizar@gmail.com",
    "usuario_crea": 1
  }
];

const generarSucursales = () => {
  let sucursales = [];
  let sucursalId = 1;
  let maximoSucursales = 10;
  let totalMunicipios = Municipios.length;
  for (let comercio of listComercios) {
    let totalSucursales = getNumeroRandom(1, maximoSucursales);
    for (let i = 0; i < totalSucursales; i++) {
      let municipioId = getNumeroRandom(1, totalMunicipios);
      let { departamentoId, descripcion: nombreMunicipio } = Municipios.find(muni => Number(muni.municipioId) === Number(municipioId));
      let { regionId, descripcion: nombreDepartamento } = Departamentos.find(depto => Number(depto.departamentoId) === Number(departamentoId));
      let { descripcion: nombreRegion } = Regiones.find(reg => Number(reg.regionId) === Number(regionId));
      let nombreSucursal = `SUCURSAL - ${nombreMunicipio}`;
      let direccion = `${nombreMunicipio}, ${nombreDepartamento}, ${nombreRegion}, GUATEMALA`;
      let telefono = getNumeroRandom(30000000, 59999999);
      let existeSucursal = sucursales.filter(itemSuc => Number(itemSuc.comercioId) === Number(comercio.comercioId) && Number(itemSuc.municipioId) === Number(municipioId));
      if(existeSucursal.length>0){
        nombreSucursal=`${nombreSucursal} No.${existeSucursal.length+1}`;
      }
        sucursales.push({
          sucursalId,
          comercioId: comercio.comercioId,
          nombre: nombreSucursal,
          municipioId,
          direccion,
          telefono,
          correo: 'blopezu@miumg.edu.gt',
          usuario_crea: 1
        });
        sucursalId += 1;
      
    }
  }

  return sucursales;
};

function getNumeroRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  Estados,
  Generos,
  Personas,
  Usuarios,
  Regiones,
  Departamentos,
  Municipios,
  Menus,
  Accesos,
  MenuAccesos,
  Roles,
  UsuarioRoles,
  MenuAccesosRol,
  TiposDocumentos,
  TiposTelefonos,
  EstadosCiviles,
  TiposSangre,
  Parametros,
  listSedesDiaco,
  listEstadoQueja,
  listComercios,
  listSucursales: generarSucursales()
}