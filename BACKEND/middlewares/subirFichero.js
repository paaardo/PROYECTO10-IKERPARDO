const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const nombreArchivo = `${Date.now()}_${file.originalname}`;
    cb(null, nombreArchivo);
  }
});

const fileFilter = (req, file, cb) => {
  const extensionesPermitidas = /jpeg|jpg|png|gif/;
  const extension = path.extname(file.originalname).toLowerCase();

  if (extensionesPermitidas.test(extension)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo se permiten imágenes.'));
  }
};

const subirFichero = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

module.exports = subirFichero;
