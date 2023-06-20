var admin = require("firebase-admin");

var serviceAccount = require("/etc/secrets/firebase-key.json");
//var serviceAccount = require("../../etc/secrets/firebase-key.json");

const BUCKET = "tb-koch.appspot.com"

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
});

const bucket = admin.storage.bucket;

const uploadNoticia = (req, res, next) => {
    if (!req.file) {
      return next();
    }
  
    const image = req.file;
    const nomeArquivo = Date.now() + "." + image.originalname.split(".").pop();
  
    const file = admin.storage().bucket(BUCKET).file("noticias/" + nomeArquivo);

  
    const stream = file.createWriteStream({
      metadata: {
        contentType: image.mimetype,
      },
      resumable: false, // Adicione essa linha se necessário
    });
  
    stream.on("error", (e) => {
      console.error(e);
      next(e); // Passe o erro para o próximo middleware
    });
  
    stream.on("finish", async () => {
      await file.makePublic();
  
      req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/noticias/${nomeArquivo}`;
  
      next();
    });
  
    stream.end(image.buffer);
  };

const uploadExame = (req, res, next) => {
    if (!req.file) {
      return next();
    }
  
    const image = req.file;
    const nomeArquivo = Date.now() + "." + image.originalname.split(".").pop();
  
    const file = admin.storage().bucket(BUCKET).file("exames/" + nomeArquivo);

  
    const stream = file.createWriteStream({
      metadata: {
        contentType: image.mimetype,
      },
      resumable: false, // Adicione essa linha se necessário
    });
  
    stream.on("error", (e) => {
      console.error(e);
      next(e); // Passe o erro para o próximo middleware
    });
  
    stream.on("finish", async () => {
      await file.makePublic();
  
      req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/exames/${nomeArquivo}`;
  
      next();
    });
  
    stream.end(image.buffer);
  };

module.exports = uploadNoticia;
module.exports = uploadExame;