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
  { municipioId_depto: 1, departamentoId: 1, descripcion: "GUATEMALA", usuario_crea: 1 },
  { municipioId_depto: 2, departamentoId: 1, descripcion: "SANTA CATARINA PINULA", usuario_crea: 1 },
  { municipioId_depto: 3, departamentoId: 1, descripcion: "SAN JOSE PINULA", usuario_crea: 1 },
  { municipioId_depto: 4, departamentoId: 1, descripcion: "SAN JOSE DEL GOLFO", usuario_crea: 1 },
  { municipioId_depto: 5, departamentoId: 1, descripcion: "PALENCIA", usuario_crea: 1 },
  { municipioId_depto: 6, departamentoId: 1, descripcion: "CHINAUTLA", usuario_crea: 1 },
  { municipioId_depto: 7, departamentoId: 1, descripcion: "SAN PEDRO AYAMPUC", usuario_crea: 1 },
  { municipioId_depto: 8, departamentoId: 1, descripcion: "MIXCO", usuario_crea: 1 },
  { municipioId_depto: 9, departamentoId: 1, descripcion: "SAN PEDRO SACATEPEQUEZ", usuario_crea: 1 },
  { municipioId_depto: 10, departamentoId: 1, descripcion: "SAN JUAN SACATEPEQUEZ", usuario_crea: 1 },
  { municipioId_depto: 10, departamentoId: 6, descripcion: "SANTA MARIA IXHUATAN", usuario_crea: 1 },
  { municipioId_depto: 11, departamentoId: 6, descripcion: "GUAZACAPAN", usuario_crea: 1 },
  { municipioId_depto: 12, departamentoId: 6, descripcion: "SANTA CRUZ NARANJO", usuario_crea: 1 },
  { municipioId_depto: 13, departamentoId: 6, descripcion: "PUEBLO NUEVO VIÑAS", usuario_crea: 1 },
  { municipioId_depto: 14, departamentoId: 6, descripcion: "NUEVA SANTA ROSA", usuario_crea: 1 },
  { municipioId_depto: 1, departamentoId: 7, descripcion: "SOLOLA", usuario_crea: 1 },
  { municipioId_depto: 2, departamentoId: 7, descripcion: "SAN JOSE CHACAYA", usuario_crea: 1 },
  { municipioId_depto: 3, departamentoId: 7, descripcion: "SANTA MARIA VISITACION", usuario_crea: 1 },
  { municipioId_depto: 4, departamentoId: 7, descripcion: "SANTA LUCIA UTATLAN", usuario_crea: 1 },
  { municipioId_depto: 17, departamentoId: 10, descripcion: "SANTO TOMAS LA UNION", usuario_crea: 1 },
  { municipioId_depto: 18, departamentoId: 10, descripcion: "ZUNILITO", usuario_crea: 1 },
  { municipioId_depto: 19, departamentoId: 10, descripcion: "PUEBLO NUEVO", usuario_crea: 1 },
  { municipioId_depto: 20, departamentoId: 10, descripcion: "RIO BRAVO", usuario_crea: 1 },
  { municipioId_depto: 1, departamentoId: 11, descripcion: "RETALHULEU", usuario_crea: 1 },
  { municipioId_depto: 2, departamentoId: 11, descripcion: "SAN SEBASTIAN", usuario_crea: 1 },
  { municipioId_depto: 3, departamentoId: 11, descripcion: "SANTA CRUZ MULUA", usuario_crea: 1 },
  { municipioId_depto: 4, departamentoId: 11, descripcion: "SAN MARTIN ZAPOTITLAN", usuario_crea: 1 },
  { municipioId_depto: 5, departamentoId: 11, descripcion: "SAN FELIPE", usuario_crea: 1 },
  { municipioId_depto: 6, departamentoId: 11, descripcion: "SAN ANDRES VILLA SECA", usuario_crea: 1 },
  { municipioId_depto: 7, departamentoId: 11, descripcion: "CHAMPERICO", usuario_crea: 1 },
  { municipioId_depto: 7, departamentoId: 14, descripcion: "PATZITE", usuario_crea: 1 },
  { municipioId_depto: 8, departamentoId: 14, descripcion: "SAN ANTONIO ILOTENANGO", usuario_crea: 1 },
  { municipioId_depto: 9, departamentoId: 14, descripcion: "SAN PEDRO JOCOPILAS", usuario_crea: 1 },
  { municipioId_depto: 10, departamentoId: 14, descripcion: "CUNEN", usuario_crea: 1 },
  { municipioId_depto: 11, departamentoId: 14, descripcion: "SAN JUAN COTZAL", usuario_crea: 1 },
  { municipioId_depto: 12, departamentoId: 14, descripcion: "JOYABAJ", usuario_crea: 1 },
  { municipioId_depto: 13, departamentoId: 14, descripcion: "NEBAJ", usuario_crea: 1 },
  { municipioId_depto: 14, departamentoId: 14, descripcion: "SAN ANDRES SAJCABAJA", usuario_crea: 1 },
  { municipioId_depto: 15, departamentoId: 14, descripcion: "USPANTAN", usuario_crea: 1 },
  { municipioId_depto: 16, departamentoId: 14, descripcion: "SACAPULAS", usuario_crea: 1 },
  { municipioId_depto: 17, departamentoId: 14, descripcion: "SAN BARTOLOME JOCOTENANGO", usuario_crea: 1 },
  { municipioId_depto: 18, departamentoId: 14, descripcion: "CANILLA", usuario_crea: 1 },
  { municipioId_depto: 19, departamentoId: 14, descripcion: "CHICAMAN", usuario_crea: 1 },
  { municipioId_depto: 17, departamentoId: 1, descripcion: "SAN MIGUEL PETAPA", usuario_crea: 1 },
  { municipioId_depto: 10, departamentoId: 11, descripcion: "INVALIDO", usuario_crea: 1 },
  { municipioId_depto: 6, departamentoId: 20, descripcion: "INVALIDO-OLAPA", usuario_crea: 1 },
  { municipioId_depto: 11, departamentoId: 1, descripcion: "SAN RAYMUNDO", usuario_crea: 1 },
  { municipioId_depto: 12, departamentoId: 1, descripcion: "CHUARANCHO", usuario_crea: 1 },
  { municipioId_depto: 13, departamentoId: 1, descripcion: "FRAIJANES", usuario_crea: 1 },
  { municipioId_depto: 14, departamentoId: 1, descripcion: "AMATITLAN", usuario_crea: 1 },
  { municipioId_depto: 15, departamentoId: 1, descripcion: "VILLA NUEVA", usuario_crea: 1 },
  { municipioId_depto: 16, departamentoId: 1, descripcion: "VILLA CANALES", usuario_crea: 1 },
  { municipioId_depto: 1, departamentoId: 2, descripcion: "GUASTATOYA", usuario_crea: 1 },
  { municipioId_depto: 2, departamentoId: 2, descripcion: "MORAZAN", usuario_crea: 1 },
  { municipioId_depto: 3, departamentoId: 2, descripcion: "SAN AGUSTIN ACASAGUASTLAN", usuario_crea: 1 },
  { municipioId_depto: 4, departamentoId: 2, descripcion: "SAN CRISTOBAL ACASAGUASTLAN", usuario_crea: 1 },
  { municipioId_depto: 5, departamentoId: 2, descripcion: "EL JICARO", usuario_crea: 1 },
  { municipioId_depto: 6, departamentoId: 2, descripcion: "SANSARE", usuario_crea: 1 },
  { municipioId_depto: 7, departamentoId: 2, descripcion: "SANARATE", usuario_crea: 1 },
  { municipioId_depto: 8, departamentoId: 2, descripcion: "SAN ANTONIO LA PAZ", usuario_crea: 1 },
  { municipioId_depto: 1, departamentoId: 3, descripcion: "ANTIGUA GUATEMALA", usuario_crea: 1 },
  { municipioId_depto: 2, departamentoId: 3, descripcion: "JOCOTENANGO", usuario_crea: 1 },
  { municipioId_depto: 3, departamentoId: 3, descripcion: "PASTORES", usuario_crea: 1 },
  { municipioId_depto: 4, departamentoId: 3, descripcion: "SUMPANGO", usuario_crea: 1 },
  { municipioId_depto: 5, departamentoId: 3, descripcion: "SANTO DOMINGO XENACOJ", usuario_crea: 1 },
  { municipioId_depto: 6, departamentoId: 3, descripcion: "SANTIAGO SACATEPEQUEZ", usuario_crea: 1 },
  { municipioId_depto: 7, departamentoId: 3, descripcion: "SAN BARTOLOME MILPAS ALTAS", usuario_crea: 1 },
  { municipioId_depto: 8, departamentoId: 3, descripcion: "SAN LUCAS SACATEPEQUEZ", usuario_crea: 1 },
  { municipioId_depto: 9, departamentoId: 3, descripcion: "SANTA LUCIA MILPAS ALTAS", usuario_crea: 1 },
  { municipioId_depto: 10, departamentoId: 3, descripcion: "MAGDALENA MILPAS ALTAS", usuario_crea: 1 },
  { municipioId_depto: 11, departamentoId: 3, descripcion: "SANTA MARIA DE JESUS", usuario_crea: 1 },
  { municipioId_depto: 12, departamentoId: 3, descripcion: "CIUDAD VIEJA", usuario_crea: 1 },
  { municipioId_depto: 13, departamentoId: 3, descripcion: "SAN MIGUEL DUEÑAS", usuario_crea: 1 },
  { municipioId_depto: 14, departamentoId: 3, descripcion: "SAN JUAN ALOTENANGO", usuario_crea: 1 },
  { municipioId_depto: 15, departamentoId: 3, descripcion: "SAN ANTONIO AGUAS CALIENTES", usuario_crea: 1 },
  { municipioId_depto: 16, departamentoId: 3, descripcion: "SANTA CATARINA BARAHONA", usuario_crea: 1 },
  { municipioId_depto: 1, departamentoId: 4, descripcion: "CHIMALTENANGO", usuario_crea: 1 },
  { municipioId_depto: 2, departamentoId: 4, descripcion: "SAN JOSE POAQUIL", usuario_crea: 1 },
  { municipioId_depto: 3, departamentoId: 4, descripcion: "SAN MARTIN JILOTEPEQUE", usuario_crea: 1 },
  { municipioId_depto: 4, departamentoId: 4, descripcion: "SAN JUAN COMALAPA", usuario_crea: 1 },
  { municipioId_depto: 5, departamentoId: 4, descripcion: "SANTA APOLONIA", usuario_crea: 1 },
  { municipioId_depto: 6, departamentoId: 4, descripcion: "TECPAN GUATEMALA", usuario_crea: 1 },
  { municipioId_depto: 7, departamentoId: 4, descripcion: "PATZUN", usuario_crea: 1 },
  { municipioId_depto: 8, departamentoId: 4, descripcion: "POCHUTA", usuario_crea: 1 },
  { municipioId_depto: 9, departamentoId: 4, descripcion: "PATZICIA", usuario_crea: 1 },
  { municipioId_depto: 10, departamentoId: 4, descripcion: "SANTA CRUZ BALANYA", usuario_crea: 1 },
  { municipioId_depto: 11, departamentoId: 4, descripcion: "ACATENANGO", usuario_crea: 1 },
  { municipioId_depto: 12, departamentoId: 4, descripcion: "YEPOCAPA", usuario_crea: 1 },
  { municipioId_depto: 13, departamentoId: 4, descripcion: "SAN ANDRES ITZAPA", usuario_crea: 1 },
  { municipioId_depto: 14, departamentoId: 4, descripcion: "PARRAMOS", usuario_crea: 1 },
  { municipioId_depto: 15, departamentoId: 4, descripcion: "ZARAGOZA", usuario_crea: 1 },
  { municipioId_depto: 16, departamentoId: 4, descripcion: "EL TEJAR", usuario_crea: 1 },
  { municipioId_depto: 1, departamentoId: 5, descripcion: "ESCUINTLA", usuario_crea: 1 },
  { municipioId_depto: 2, departamentoId: 5, descripcion: "SANTA LUCIA COTZUMALGUAPA", usuario_crea: 1 },
  { municipioId_depto: 3, departamentoId: 5, descripcion: "LA DEMOCRACIA", usuario_crea: 1 },
  { municipioId_depto: 4, departamentoId: 5, descripcion: "SIQUINALA", usuario_crea: 1 },
  { municipioId_depto: 5, departamentoId: 5, descripcion: "MASAGUA", usuario_crea: 1 },
  { municipioId_depto: 6, departamentoId: 5, descripcion: "TIQUISATE", usuario_crea: 1 },
  { municipioId_depto: 7, departamentoId: 5, descripcion: "LA GOMERA", usuario_crea: 1 },
  { municipioId_depto: 8, departamentoId: 5, descripcion: "GUANAGAZAPA", usuario_crea: 1 },
  { municipioId_depto: 9, departamentoId: 5, descripcion: "PUERTO SAN JOSE", usuario_crea: 1 },
  { municipioId_depto: 10, departamentoId: 5, descripcion: "IZTAPA", usuario_crea: 1 },
  { municipioId_depto: 11, departamentoId: 5, descripcion: "PALIN", usuario_crea: 1 },
  { municipioId_depto: 12, departamentoId: 5, descripcion: "SAN VICENTE PACAYA", usuario_crea: 1 },
  { municipioId_depto: 13, departamentoId: 5, descripcion: "NUEVA CONCEPCION", usuario_crea: 1 },
  { municipioId_depto: 1, departamentoId: 6, descripcion: "CUILAPA", usuario_crea: 1 },
  { municipioId_depto: 2, departamentoId: 6, descripcion: "BARBERENA", usuario_crea: 1 },
  { municipioId_depto: 3, departamentoId: 6, descripcion: "SANTA ROSA DE LIMA", usuario_crea: 1 },
  { municipioId_depto: 4, departamentoId: 6, descripcion: "CASILLAS", usuario_crea: 1 },
  { municipioId_depto: 5, departamentoId: 6, descripcion: "SAN RAFAEL LAS FLORES", usuario_crea: 1 },
  { municipioId_depto: 6, departamentoId: 6, descripcion: "ORATORIO", usuario_crea: 1 },
  { municipioId_depto: 7, departamentoId: 6, descripcion: "SAN JUAN TECUACO", usuario_crea: 1 },
  { municipioId_depto: 8, departamentoId: 6, descripcion: "CHIQUIMULILLA", usuario_crea: 1 },
  { municipioId_depto: 9, departamentoId: 6, descripcion: "TAXISCO", usuario_crea: 1 },
  { municipioId_depto: 5, departamentoId: 7, descripcion: "NAHUALA", usuario_crea: 1 },
  { municipioId_depto: 6, departamentoId: 7, descripcion: "SANTA CATARINA IXTAHUACAN", usuario_crea: 1 },
  { municipioId_depto: 7, departamentoId: 7, descripcion: "SANTA CLARA LA LAGUNA", usuario_crea: 1 },
  { municipioId_depto: 8, departamentoId: 7, descripcion: "CONCEPCION", usuario_crea: 1 },
  { municipioId_depto: 9, departamentoId: 7, descripcion: "SAN ANDRES SEMETABAJ", usuario_crea: 1 },
  { municipioId_depto: 10, departamentoId: 7, descripcion: "PANAJACHEL", usuario_crea: 1 },
  { municipioId_depto: 11, departamentoId: 7, descripcion: "SANTA CATARINA PALOPO", usuario_crea: 1 },
  { municipioId_depto: 12, departamentoId: 7, descripcion: "SAN ANTONIO PALOPO", usuario_crea: 1 },
  { municipioId_depto: 13, departamentoId: 7, descripcion: "SAN LUCAS TOLIMAN", usuario_crea: 1 },
  { municipioId_depto: 14, departamentoId: 7, descripcion: "SANTA CRUZ LA LAGUNA", usuario_crea: 1 },
  { municipioId_depto: 15, departamentoId: 7, descripcion: "SAN PABLO LA LAGUNA", usuario_crea: 1 },
  { municipioId_depto: 16, departamentoId: 7, descripcion: "SAN MARCOS LA LAGUNA", usuario_crea: 1 },
  { municipioId_depto: 17, departamentoId: 7, descripcion: "SAN JUAN LA LAGUNA", usuario_crea: 1 },
  { municipioId_depto: 18, departamentoId: 7, descripcion: "SAN PEDRO LA LAGUNA", usuario_crea: 1 },
  { municipioId_depto: 19, departamentoId: 7, descripcion: "SANTIAGO ATITLAN", usuario_crea: 1 },
  { municipioId_depto: 1, departamentoId: 8, descripcion: "TOTONICAPAN", usuario_crea: 1 },
  { municipioId_depto: 2, departamentoId: 8, descripcion: "SAN CRISTOBAL TOTONICAPAN", usuario_crea: 1 },
  { municipioId_depto: 3, departamentoId: 8, descripcion: "SAN FRANCISCO EL ALTO", usuario_crea: 1 },
  { municipioId_depto: 4, departamentoId: 8, descripcion: "SAN ANDRES XECUL", usuario_crea: 1 },
  { municipioId_depto: 5, departamentoId: 8, descripcion: "MOMOSTENANGO", usuario_crea: 1 },
  { municipioId_depto: 6, departamentoId: 8, descripcion: "SANTA MARIA CHIQUIMULA", usuario_crea: 1 },
  { municipioId_depto: 7, departamentoId: 8, descripcion: "SANTA LUCIA LA REFORMA", usuario_crea: 1 },
  { municipioId_depto: 8, departamentoId: 8, descripcion: "SAN BARTOLO", usuario_crea: 1 },
  { municipioId_depto: 1, departamentoId: 9, descripcion: "QUETZALTENANGO", usuario_crea: 1 },
  { municipioId_depto: 2, departamentoId: 9, descripcion: "SALCAJA", usuario_crea: 1 },
  { municipioId_depto: 3, departamentoId: 9, descripcion: "OLINTEPEQUE", usuario_crea: 1 },
  { municipioId_depto: 4, departamentoId: 9, descripcion: "SAN CARLOS SIJA", usuario_crea: 1 },
  { municipioId_depto: 5, departamentoId: 9, descripcion: "SIBILIA", usuario_crea: 1 },
  { municipioId_depto: 6, departamentoId: 9, descripcion: "CABRICAN", usuario_crea: 1 },
  { municipioId_depto: 7, departamentoId: 9, descripcion: "CAJOLA", usuario_crea: 1 },
  { municipioId_depto: 8, departamentoId: 9, descripcion: "SAN MIGUEL SIGUILA", usuario_crea: 1 },
  { municipioId_depto: 9, departamentoId: 9, descripcion: "SAN JUAN OSTUNCALCO", usuario_crea: 1 },
  { municipioId_depto: 10, departamentoId: 9, descripcion: "SAN MATEO", usuario_crea: 1 },
  { municipioId_depto: 11, departamentoId: 9, descripcion: "CONCEPCION CHIQUIRICHAPA", usuario_crea: 1 },
  { municipioId_depto: 12, departamentoId: 9, descripcion: "SAN MARTIN SACATEPEQUEZ", usuario_crea: 1 },
  { municipioId_depto: 13, departamentoId: 9, descripcion: "ALMOLONGA", usuario_crea: 1 },
  { municipioId_depto: 14, departamentoId: 9, descripcion: "CANTEL", usuario_crea: 1 },
  { municipioId_depto: 15, departamentoId: 9, descripcion: "HUITAN", usuario_crea: 1 },
  { municipioId_depto: 16, departamentoId: 9, descripcion: "ZUNIL", usuario_crea: 1 },
  { municipioId_depto: 17, departamentoId: 9, descripcion: "COLOMBA", usuario_crea: 1 },
  { municipioId_depto: 18, departamentoId: 9, descripcion: "SAN FRANCISCO LA UNION", usuario_crea: 1 },
  { municipioId_depto: 19, departamentoId: 9, descripcion: "EL PALMAR", usuario_crea: 1 },
  { municipioId_depto: 20, departamentoId: 9, descripcion: "COATEPEQUE", usuario_crea: 1 },
  { municipioId_depto: 21, departamentoId: 9, descripcion: "GENOVA", usuario_crea: 1 },
  { municipioId_depto: 22, departamentoId: 9, descripcion: "FLORES COSTA CUCA", usuario_crea: 1 },
  { municipioId_depto: 23, departamentoId: 9, descripcion: "LA ESPERANZA", usuario_crea: 1 },
  { municipioId_depto: 24, departamentoId: 9, descripcion: "PALESTINA DE LOS ALTOS", usuario_crea: 1 },
  { municipioId_depto: 25, departamentoId: 9, descripcion: "SAN FRANCISCO(INVALIDO)", usuario_crea: 1 },
  { municipioId_depto: 32, departamentoId: 13, descripcion: "UNION CANTINIL", usuario_crea: 1 },
  { municipioId_depto: 18, departamentoId: 16, descripcion: "RAXRUHA", usuario_crea: 1 },
  { municipioId_depto: 1, departamentoId: 10, descripcion: "MAZATENANGO", usuario_crea: 1 },
  { municipioId_depto: 2, departamentoId: 10, descripcion: "CUYOTENANGO", usuario_crea: 1 },
  { municipioId_depto: 3, departamentoId: 10, descripcion: "SAN FRANCISCO ZAPOTITLAN", usuario_crea: 1 },
  { municipioId_depto: 4, departamentoId: 10, descripcion: "SAN BERNARDINO", usuario_crea: 1 },
  { municipioId_depto: 5, departamentoId: 10, descripcion: "SAN JOSE EL IDOLO", usuario_crea: 1 },
  { municipioId_depto: 6, departamentoId: 10, descripcion: "SANTO DOMINGO SUCHITEPEQUEZ", usuario_crea: 1 },
  { municipioId_depto: 7, departamentoId: 10, descripcion: "SAN LORENZO", usuario_crea: 1 },
  { municipioId_depto: 8, departamentoId: 10, descripcion: "SAMAYAC", usuario_crea: 1 },
  { municipioId_depto: 9, departamentoId: 10, descripcion: "SAN PABLO JOCOPILAS", usuario_crea: 1 },
  { municipioId_depto: 10, departamentoId: 10, descripcion: "SAN ANTONIO SUCHITEPEQUEZ", usuario_crea: 1 },
  { municipioId_depto: 11, departamentoId: 10, descripcion: "SAN MIGUEL PANAN", usuario_crea: 1 },
  { municipioId_depto: 12, departamentoId: 10, descripcion: "SAN GABRIEL", usuario_crea: 1 },
  { municipioId_depto: 13, departamentoId: 10, descripcion: "CHICACAO", usuario_crea: 1 },
  { municipioId_depto: 14, departamentoId: 10, descripcion: "PATULUL", usuario_crea: 1 },
  { municipioId_depto: 15, departamentoId: 10, descripcion: "SANTA BARBARA", usuario_crea: 1 },
  { municipioId_depto: 16, departamentoId: 10, descripcion: "SAN JUAN BAUTISTA", usuario_crea: 1 },
  { municipioId_depto: 8, departamentoId: 11, descripcion: "NUEVO SAN CARLOS", usuario_crea: 1 },
  { municipioId_depto: 9, departamentoId: 11, descripcion: "EL ASINTAL", usuario_crea: 1 },
  { municipioId_depto: 1, departamentoId: 12, descripcion: "SAN MARCOS", usuario_crea: 1 },
  { municipioId_depto: 2, departamentoId: 12, descripcion: "SAN PEDRO SACAT. S.M.", usuario_crea: 1 },
  { municipioId_depto: 3, departamentoId: 12, descripcion: "SAN ANTONIO SACATEPEQUEZ", usuario_crea: 1 },
  { municipioId_depto: 4, departamentoId: 12, descripcion: "COMITANCILLO", usuario_crea: 1 },
  { municipioId_depto: 5, departamentoId: 12, descripcion: "SAN MIGUEL IXTAHUACAN", usuario_crea: 1 },
  { municipioId_depto: 6, departamentoId: 12, descripcion: "CONCEPCION TUTUAPA", usuario_crea: 1 },
  { municipioId_depto: 7, departamentoId: 12, descripcion: "TACANA", usuario_crea: 1 },
  { municipioId_depto: 8, departamentoId: 12, descripcion: "SIBINAL", usuario_crea: 1 },
  { municipioId_depto: 9, departamentoId: 12, descripcion: "TAJUMULCO", usuario_crea: 1 },
  { municipioId_depto: 10, departamentoId: 12, descripcion: "TEJUTLA", usuario_crea: 1 },
  { municipioId_depto: 11, departamentoId: 12, descripcion: "SAN RAFAEL PIE DE LA CUESTA", usuario_crea: 1 },
  { municipioId_depto: 12, departamentoId: 12, descripcion: "NUEVO PROGRESO", usuario_crea: 1 },
  { municipioId_depto: 13, departamentoId: 12, descripcion: "EL TUMBADOR", usuario_crea: 1 },
  { municipioId_depto: 14, departamentoId: 12, descripcion: "EL RODEO", usuario_crea: 1 },
  { municipioId_depto: 15, departamentoId: 12, descripcion: "MALACATAN", usuario_crea: 1 },
  { municipioId_depto: 16, departamentoId: 12, descripcion: "CATARINA", usuario_crea: 1 },
  { municipioId_depto: 17, departamentoId: 12, descripcion: "AYUTLA", usuario_crea: 1 },
  { municipioId_depto: 18, departamentoId: 12, descripcion: "PUERTO DE OCOS", usuario_crea: 1 },
  { municipioId_depto: 19, departamentoId: 12, descripcion: "SAN PABLO", usuario_crea: 1 },
  { municipioId_depto: 20, departamentoId: 12, descripcion: "EL QUETZAL", usuario_crea: 1 },
  { municipioId_depto: 21, departamentoId: 12, descripcion: "LA REFORMA", usuario_crea: 1 },
  { municipioId_depto: 22, departamentoId: 12, descripcion: "PAJAPITA", usuario_crea: 1 },
  { municipioId_depto: 23, departamentoId: 12, descripcion: "IXCHIGUAN", usuario_crea: 1 },
  { municipioId_depto: 24, departamentoId: 12, descripcion: "SAN JOSE OJETENAM", usuario_crea: 1 },
  { municipioId_depto: 25, departamentoId: 12, descripcion: "SAN CRISTOBAL CUCHO", usuario_crea: 1 },
  { municipioId_depto: 26, departamentoId: 12, descripcion: "SIPACAPA", usuario_crea: 1 },
  { municipioId_depto: 27, departamentoId: 12, descripcion: "ESQUIPULAS PALO GORDO", usuario_crea: 1 },
  { municipioId_depto: 28, departamentoId: 12, descripcion: "RIO BLANCO", usuario_crea: 1 },
  { municipioId_depto: 29, departamentoId: 12, descripcion: "SAN LORENZO S.M.", usuario_crea: 1 },
  { municipioId_depto: 1, departamentoId: 13, descripcion: "HUEHUETENANGO", usuario_crea: 1 },
  { municipioId_depto: 2, departamentoId: 13, descripcion: "CHIANTLA", usuario_crea: 1 },
  { municipioId_depto: 3, departamentoId: 13, descripcion: "MALACATANCITO", usuario_crea: 1 },
  { municipioId_depto: 4, departamentoId: 13, descripcion: "CUILCO", usuario_crea: 1 },
  { municipioId_depto: 5, departamentoId: 13, descripcion: "NENTON", usuario_crea: 1 },
  { municipioId_depto: 6, departamentoId: 13, descripcion: "SAN PEDRO NECTA", usuario_crea: 1 },
  { municipioId_depto: 7, departamentoId: 13, descripcion: "JACALTENANGO", usuario_crea: 1 },
  { municipioId_depto: 8, departamentoId: 13, descripcion: "SOLOMA", usuario_crea: 1 },
  { municipioId_depto: 9, departamentoId: 13, descripcion: "IXTAHUACAN", usuario_crea: 1 },
  { municipioId_depto: 10, departamentoId: 13, descripcion: "SANTA BARBARA (HUEHUE)", usuario_crea: 1 },
  { municipioId_depto: 11, departamentoId: 13, descripcion: "LA LIBERTAD", usuario_crea: 1 },
  { municipioId_depto: 12, departamentoId: 13, descripcion: "LA DEMOCRACIA (HUEHUE)", usuario_crea: 1 },
  { municipioId_depto: 13, departamentoId: 13, descripcion: "SAN MIGUEL ACATAN", usuario_crea: 1 },
  { municipioId_depto: 14, departamentoId: 13, descripcion: "SAN RAFAEL INDEPENDENCIA", usuario_crea: 1 },
  { municipioId_depto: 15, departamentoId: 13, descripcion: "TODOS SANTOS CUCHUMATAN", usuario_crea: 1 },
  { municipioId_depto: 16, departamentoId: 13, descripcion: "SAN JUAN ATITAN", usuario_crea: 1 },
  { municipioId_depto: 17, departamentoId: 13, descripcion: "SANTA EULALIA", usuario_crea: 1 },
  { municipioId_depto: 18, departamentoId: 13, descripcion: "SAN MATEO IXTATAN", usuario_crea: 1 },
  { municipioId_depto: 19, departamentoId: 13, descripcion: "COLOTENANGO", usuario_crea: 1 },
  { municipioId_depto: 20, departamentoId: 13, descripcion: "SAN SEBASTIAN HUEHUETENANGO", usuario_crea: 1 },
  { municipioId_depto: 21, departamentoId: 13, descripcion: "TECTITAN", usuario_crea: 1 },
  { municipioId_depto: 22, departamentoId: 13, descripcion: "CONCEPCION HUISTA", usuario_crea: 1 },
  { municipioId_depto: 23, departamentoId: 13, descripcion: "SAN JUAN IXCOY", usuario_crea: 1 },
  { municipioId_depto: 24, departamentoId: 13, descripcion: "SAN ANTONIO HUISTA", usuario_crea: 1 },
  { municipioId_depto: 25, departamentoId: 13, descripcion: "SAN SEBASTIAN COATAN", usuario_crea: 1 },
  { municipioId_depto: 26, departamentoId: 13, descripcion: "BARILLAS", usuario_crea: 1 },
  { municipioId_depto: 27, departamentoId: 13, descripcion: "AGUACATAN", usuario_crea: 1 },
  { municipioId_depto: 28, departamentoId: 13, descripcion: "SAN RAFAEL PETZAL", usuario_crea: 1 },
  { municipioId_depto: 29, departamentoId: 13, descripcion: "SAN GASPAR IXCHIL", usuario_crea: 1 },
  { municipioId_depto: 30, departamentoId: 13, descripcion: "SANTIAGO CHIMALTENANGO", usuario_crea: 1 },
  { municipioId_depto: 31, departamentoId: 13, descripcion: "SANTA ANA HUISTA", usuario_crea: 1 },
  { municipioId_depto: 1, departamentoId: 14, descripcion: "SANTA CRUZ DEL QUICHE", usuario_crea: 1 },
  { municipioId_depto: 2, departamentoId: 14, descripcion: "CHICHE", usuario_crea: 1 },
  { municipioId_depto: 3, departamentoId: 14, descripcion: "CHINIQUE", usuario_crea: 1 },
  { municipioId_depto: 4, departamentoId: 14, descripcion: "ZACUALPA", usuario_crea: 1 },
  { municipioId_depto: 5, departamentoId: 14, descripcion: "CHAJUL", usuario_crea: 1 },
  { municipioId_depto: 6, departamentoId: 14, descripcion: "CHICHICASTENANGO", usuario_crea: 1 },
  { municipioId_depto: 20, departamentoId: 14, descripcion: "IXCAN", usuario_crea: 1 },
  { municipioId_depto: 21, departamentoId: 14, descripcion: "PACHALUM", usuario_crea: 1 },
  { municipioId_depto: 1, departamentoId: 15, descripcion: "SALAMA", usuario_crea: 1 },
  { municipioId_depto: 2, departamentoId: 15, descripcion: "SAN MIGUEL CHICAJ", usuario_crea: 1 },
  { municipioId_depto: 3, departamentoId: 15, descripcion: "RABINAL", usuario_crea: 1 },
  { municipioId_depto: 4, departamentoId: 15, descripcion: "CUBULCO", usuario_crea: 1 },
  { municipioId_depto: 5, departamentoId: 15, descripcion: "GRANADOS", usuario_crea: 1 },
  { municipioId_depto: 6, departamentoId: 15, descripcion: "EL CHOL", usuario_crea: 1 },
  { municipioId_depto: 7, departamentoId: 15, descripcion: "SAN JERONIMO", usuario_crea: 1 },
  { municipioId_depto: 8, departamentoId: 15, descripcion: "PURULHA", usuario_crea: 1 },
  { municipioId_depto: 1, departamentoId: 16, descripcion: "COBAN", usuario_crea: 1 },
  { municipioId_depto: 2, departamentoId: 16, descripcion: "SANTA CRUZ VERAPAZ", usuario_crea: 1 },
  { municipioId_depto: 3, departamentoId: 16, descripcion: "SAN CRISTOBAL VERAPAZ", usuario_crea: 1 },
  { municipioId_depto: 4, departamentoId: 16, descripcion: "TACTIC", usuario_crea: 1 },
  { municipioId_depto: 5, departamentoId: 16, descripcion: "TAMAHU", usuario_crea: 1 },
  { municipioId_depto: 6, departamentoId: 16, descripcion: "TUCURU", usuario_crea: 1 },
  { municipioId_depto: 7, departamentoId: 16, descripcion: "PANZOS", usuario_crea: 1 },
  { municipioId_depto: 8, departamentoId: 16, descripcion: "SENAHU", usuario_crea: 1 },
  { municipioId_depto: 9, departamentoId: 16, descripcion: "SAN PEDRO CARCHA", usuario_crea: 1 },
  { municipioId_depto: 10, departamentoId: 16, descripcion: "SAN JUAN CHAMELCO", usuario_crea: 1 },
  { municipioId_depto: 11, departamentoId: 16, descripcion: "LANQUIN", usuario_crea: 1 },
  { municipioId_depto: 12, departamentoId: 16, descripcion: "CAHABON", usuario_crea: 1 },
  { municipioId_depto: 13, departamentoId: 16, descripcion: "CHISEC", usuario_crea: 1 },
  { municipioId_depto: 14, departamentoId: 16, descripcion: "CHAHAL", usuario_crea: 1 },
  { municipioId_depto: 15, departamentoId: 16, descripcion: "FRAY BARTOLOME DE LAS CASAS", usuario_crea: 1 },
  { municipioId_depto: 16, departamentoId: 16, descripcion: "SAN CRISTOBAL", usuario_crea: 1 },
  { municipioId_depto: 17, departamentoId: 16, descripcion: "SANTA CATALINA LA TINTA", usuario_crea: 1 },
  { municipioId_depto: 1, departamentoId: 17, descripcion: "FLORES", usuario_crea: 1 },
  { municipioId_depto: 2, departamentoId: 17, descripcion: "SAN JOSE", usuario_crea: 1 },
  { municipioId_depto: 3, departamentoId: 17, descripcion: "SAN BENITO", usuario_crea: 1 },
  { municipioId_depto: 4, departamentoId: 17, descripcion: "SAN ANDRES", usuario_crea: 1 },
  { municipioId_depto: 5, departamentoId: 17, descripcion: "LA LIBERTAD (PETEN)", usuario_crea: 1 },
  { municipioId_depto: 6, departamentoId: 17, descripcion: "SAN FRANCISCO PETEN", usuario_crea: 1 },
  { municipioId_depto: 7, departamentoId: 17, descripcion: "SANTA ANA", usuario_crea: 1 },
  { municipioId_depto: 8, departamentoId: 17, descripcion: "DOLORES", usuario_crea: 1 },
  { municipioId_depto: 9, departamentoId: 17, descripcion: "SAN LUIS", usuario_crea: 1 },
  { municipioId_depto: 10, departamentoId: 17, descripcion: "SAYAXCHE", usuario_crea: 1 },
  { municipioId_depto: 11, departamentoId: 17, descripcion: "MELCHOR DE MENCOS", usuario_crea: 1 },
  { municipioId_depto: 12, departamentoId: 17, descripcion: "POPTUN", usuario_crea: 1 },
  { municipioId_depto: 1, departamentoId: 18, descripcion: "PUERTO BARRIOS", usuario_crea: 1 },
  { municipioId_depto: 2, departamentoId: 18, descripcion: "LIVINGSTON", usuario_crea: 1 },
  { municipioId_depto: 3, departamentoId: 18, descripcion: "EL ESTOR", usuario_crea: 1 },
  { municipioId_depto: 4, departamentoId: 18, descripcion: "MORALES", usuario_crea: 1 },
  { municipioId_depto: 5, departamentoId: 18, descripcion: "LOS AMATES", usuario_crea: 1 },
  { municipioId_depto: 1, departamentoId: 19, descripcion: "ZACAPA", usuario_crea: 1 },
  { municipioId_depto: 2, departamentoId: 19, descripcion: "ESTANZUELA", usuario_crea: 1 },
  { municipioId_depto: 3, departamentoId: 19, descripcion: "RIO HONDO", usuario_crea: 1 },
  { municipioId_depto: 4, departamentoId: 19, descripcion: "GUALAN", usuario_crea: 1 },
  { municipioId_depto: 5, departamentoId: 19, descripcion: "TECULUTAN", usuario_crea: 1 },
  { municipioId_depto: 6, departamentoId: 19, descripcion: "USUMATLAN", usuario_crea: 1 },
  { municipioId_depto: 7, departamentoId: 19, descripcion: "CABAÑAS", usuario_crea: 1 },
  { municipioId_depto: 8, departamentoId: 19, descripcion: "SAN DIEGO", usuario_crea: 1 },
  { municipioId_depto: 9, departamentoId: 19, descripcion: "LA UNION", usuario_crea: 1 },
  { municipioId_depto: 10, departamentoId: 19, descripcion: "HUITE", usuario_crea: 1 },
  { municipioId_depto: 1, departamentoId: 20, descripcion: "CHIQUIMULA", usuario_crea: 1 },
  { municipioId_depto: 2, departamentoId: 20, descripcion: "SAN JOSE LA ARADA", usuario_crea: 1 },
  { municipioId_depto: 3, departamentoId: 20, descripcion: "SAN JUAN ERMITA", usuario_crea: 1 },
  { municipioId_depto: 4, departamentoId: 20, descripcion: "JOCOTAN", usuario_crea: 1 },
  { municipioId_depto: 5, departamentoId: 20, descripcion: "CAMOTAN", usuario_crea: 1 },
  { municipioId_depto: 7, departamentoId: 20, descripcion: "ESQUIPULAS", usuario_crea: 1 },
  { municipioId_depto: 8, departamentoId: 20, descripcion: "CONCEPCION LAS MINAS", usuario_crea: 1 },
  { municipioId_depto: 9, departamentoId: 20, descripcion: "QUETZALTEPEQUE", usuario_crea: 1 },
  { municipioId_depto: 10, departamentoId: 20, descripcion: "OLOPA", usuario_crea: 1 },
  { municipioId_depto: 11, departamentoId: 20, descripcion: "IPALA", usuario_crea: 1 },
  { municipioId_depto: 12, departamentoId: 20, descripcion: "SAN JACINTO", usuario_crea: 1 },
  { municipioId_depto: 1, departamentoId: 21, descripcion: "JALAPA", usuario_crea: 1 },
  { municipioId_depto: 2, departamentoId: 21, descripcion: "SAN PEDRO PINULA", usuario_crea: 1 },
  { municipioId_depto: 3, departamentoId: 21, descripcion: "SAN LUIS JILOTEPEQUE", usuario_crea: 1 },
  { municipioId_depto: 4, departamentoId: 21, descripcion: "SAN MANUEL CHAPARRON", usuario_crea: 1 },
  { municipioId_depto: 5, departamentoId: 21, descripcion: "SAN CARLOS ALZATATE", usuario_crea: 1 },
  { municipioId_depto: 6, departamentoId: 21, descripcion: "MONJAS", usuario_crea: 1 },
  { municipioId_depto: 7, departamentoId: 21, descripcion: "MATAQUESCUINTLA", usuario_crea: 1 },
  { municipioId_depto: 1, departamentoId: 22, descripcion: "JUTIAPA", usuario_crea: 1 },
  { municipioId_depto: 2, departamentoId: 22, descripcion: "EL PROGRESO", usuario_crea: 1 },
  { municipioId_depto: 3, departamentoId: 22, descripcion: "SANTA CATARINA MITA", usuario_crea: 1 },
  { municipioId_depto: 4, departamentoId: 22, descripcion: "AGUA BLANCA", usuario_crea: 1 },
  { municipioId_depto: 5, departamentoId: 22, descripcion: "ASUNCION MITA", usuario_crea: 1 },
  { municipioId_depto: 6, departamentoId: 22, descripcion: "YUPILTEPEQUE", usuario_crea: 1 },
  { municipioId_depto: 7, departamentoId: 22, descripcion: "ATESCATEMPA", usuario_crea: 1 },
  { municipioId_depto: 8, departamentoId: 22, descripcion: "JEREZ", usuario_crea: 1 },
  { municipioId_depto: 9, departamentoId: 22, descripcion: "EL ADELANTO", usuario_crea: 1 },
  { municipioId_depto: 10, departamentoId: 22, descripcion: "ZAPOTITLAN", usuario_crea: 1 },
  { municipioId_depto: 11, departamentoId: 22, descripcion: "COMAPA", usuario_crea: 1 },
  { municipioId_depto: 12, departamentoId: 22, descripcion: "JALPATAGUA", usuario_crea: 1 },
  { municipioId_depto: 13, departamentoId: 22, descripcion: "CONGUACO", usuario_crea: 1 },
  { municipioId_depto: 14, departamentoId: 22, descripcion: "MOYUTA", usuario_crea: 1 },
  { municipioId_depto: 15, departamentoId: 22, descripcion: "PASACO", usuario_crea: 1 },
  { municipioId_depto: 16, departamentoId: 22, descripcion: "SAN JOSE ACATEMPA", usuario_crea: 1 },
  { municipioId_depto: 17, departamentoId: 22, descripcion: "QUESADA", usuario_crea: 1 }
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
    posicion: 4,
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
    posicion: 5,
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
    posicion: 6,
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
    posicion: 7,
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
    posicion: 8,
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
    posicion: 9,
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
    posicion: 10,
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
    posicion: 11,
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
    posicion: 12,
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
    posicion: 13,
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
    posicion: 14,
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
    posicion: 15,
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
    posicion: 16,
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
    posicion: 15,
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
    password: bcrypt.hashSync('blopez', 10)
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

const listSedesDiaco=[
  {
      sede_diacoId: 1,
      codigo: "CENTRAL",
      nombre: "CENTRAL",
      municipioId:1,
      usuario_crea: 1
  },
  {
      sede_diacoId: 2,
      codigo: "CHIMALTENANGO",
      nombre: "CHIMALTENANGO - DIACO",
      municipioId:77,
      usuario_crea: 1
  },
  {
      sede_diacoId: 3,
      codigo: "JUTIAPA",
      nombre: "JUTIAPA - DIACO",
      municipioId:321,
      usuario_crea: 1
  },
  {
      sede_diacoId: 4,
      codigo: "SAN MARCOS",
      nombre: "SAN MARCOS - DIACO",
      municipioId:183,
      usuario_crea: 1
  },
  {
      sede_diacoId: 5,
      codigo: "SUCHITEPEQUEZ",
      nombre: "SUCHITEPEQUEZ - DIACO",
      municipioId:165,
      usuario_crea: 1
  },
  {
      sede_diacoId: 6,
      codigo: "JALAPA",
      nombre: "JALAPA - DIACO",
      municipioId:314,
      usuario_crea: 1
  },
  {
      sede_diacoId: 7,
      codigo: "COBAN",
      nombre: "COBAN - DIACO",
      municipioId:259,
      usuario_crea: 1
  },
  {
      sede_diacoId: 8,
      codigo: "CHIQUIMULA",
      nombre: "CHIQUIMULA - DIACO",
      municipioId:303,
      usuario_crea: 1
  },
  {
      sede_diacoId: 9,
      codigo: "ESCUINTLA",
      nombre: "ESCUINTLA - DIACO",
      municipioId:93,
      usuario_crea: 1
  },
  {
      sede_diacoId: 10,
      codigo: "HUEHUETENANGO",
      nombre: "HUEHUETENANGO - DIACO",
      municipioId:212,
      usuario_crea: 1
  },
  {
      sede_diacoId: 11,
      codigo: "IZABAL",
      nombre: "IZABAL - DIACO",
      municipioId:288,
      usuario_crea: 1
  },
  {
      sede_diacoId: 12,
      codigo: "PETEN",
      nombre: "PETEN - DIACO",
      municipioId:280,
      usuario_crea: 1
  },
  {
      sede_diacoId: 13,
      codigo: "QUETZALTENANGO",
      nombre: "QUETZALTENANGO - DIACO",
      municipioId:138,
      usuario_crea: 1
  },
  {
      sede_diacoId: 14,
      codigo: "QUICHE",
      nombre: "QUICHE - DIACO",
      municipioId:243,
      usuario_crea: 1
  },
  {
      sede_diacoId: 15,
      codigo: "TOTONICAPAN",
      nombre: "TOTONICAPAN - DIACO",
      municipioId:130,
      usuario_crea: 1
  },
  {
      sede_diacoId: 16,
      codigo: "ZACAPA",
      nombre: "ZACAPA - DIACO",
      municipioId:293,
      usuario_crea: 1
  },
  {
      sede_diacoId: 17,
      codigo: "SACATEPEQUEZ",
      nombre: "SACATEPEQUEZ-DIACO",
      municipioId:61,
      usuario_crea: 1
  },
  {
      sede_diacoId: 18,
      codigo: "BAJA VERAPAZ",
      nombre: "-DIACO- BAJA VERAPAZ",
      municipioId:251,
      usuario_crea: 1
  },
  {
      sede_diacoId: 19,
      codigo: "SOLOLA",
      nombre: "SOLOLA - DIACO",
      municipioId:16,
      usuario_crea: 1
  },
  {
      sede_diacoId: 20,
      codigo: "RETALHULEU",
      nombre: "RETALHULEU - DIACO",
      municipioId:24,
      usuario_crea: 1
  },
  {
      sede_diacoId: 21,
      codigo: "MIXCO",
      nombre: "MIXCO DIACO",
      municipioId:8,
      usuario_crea: 1
  },
  {
      sede_diacoId: 22,
      codigo: "VILLA NUEVA",
      nombre: "VILLA NUEVA - DIACO",
      municipioId:51,
      usuario_crea: 1
  },
  {
      sede_diacoId: 24,
      codigo: "EL PROGRESO",
      nombre: "DIACO EL PROGRESO",
      municipioId:322,
      usuario_crea: 1
  },
  {
      sede_diacoId: 25,
      codigo: "SANTA ROSA",
      nombre: "SANTA ROSA-DIACO",
      municipioId:15,
      usuario_crea: 1
  },
  {
      sede_diacoId: 26,
      codigo: "SEDE-VILLA NUEVA",
      nombre: "SEDE-DIACO-VILLA NUEVA",
      municipioId:51,
      usuario_crea: 1
  }
];
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
  listSedesDiaco
}