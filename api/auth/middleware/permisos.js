function validacionPermisos(allowedScopes) {
    return function(req, res, next) {
      if (!req.user || (req.user && !req.user.scopes)) {
        next('Faltan permisos');
      }
  
      // const hasAccess = allowedScopes
      //   .map(allowedScope => req.user.dataValues.user_name.includes(allowedScope))
      //   .find(allowed => Boolean(allowed));

      let hasAccess=true;
  
      if (hasAccess) {
        next();
      } else {
        next('Permisos insuficientes');
      }
    };
  }
  
  module.exports = validacionPermisos;