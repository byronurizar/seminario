const response=require('./response');

function errors(error,req,res,next){
    //console.error('[error',error);
    const message=error.message || 'Error interno';
    const status=error.statusCode || 500;
    response.error(req,res,message,status);
    // const {errno:codigoError}=error;
    // console.log({codigoError});
    // console.log({error});
    // console.log("Codigo de error",error.parent.errno);
    //Codigo de error de unique 1062

}

module.exports=errors;