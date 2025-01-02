// config/upload.js
import multer from 'multer';
import path from 'path';

// Configuration du stockage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/'); // Dossier où les fichiers seront stockés
    },
    filename: (req, file, cb) => {
        cb(null, req.body.reference + '.webp');
    }
});

// Initialisation de Multer
const upload = multer({ storage });

export default upload;
