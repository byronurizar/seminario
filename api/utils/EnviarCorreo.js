const nodemailer = require('nodemailer');
const sendMail = async (config, destinatario, asunto, texto, html) => {
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass
    }
  });
  let mailOptions = {};
  let { adjuntos = [] } = config;

  let attachmentsAux = adjuntos.map(({ nombre, path, mimetype }) => {
    return {
      filename: nombre,
      path: path,
      contentType: mimetype
    }
  });

  mailOptions.from = config.user,
    mailOptions.to = destinatario;
  mailOptions.subject = asunto;
  mailOptions.text = texto;
  mailOptions.html = html;
  if (attachmentsAux.length > 0) {
    mailOptions.attachments = attachmentsAux;
  }
  if (config.cc) {
    mailOptions.cc = config.cc;
  }
  let resp = await transporter.sendMail(mailOptions);
  return resp;
}

module.exports = {
  sendMail
}
