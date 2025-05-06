import multer from 'multer';

// Configuration du stockage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/'); // Dossier où les fichiers seront stockés
    },
    filename: (req, file, cb) => {
        cb(null, req.body.reference + '.webp');
    }
});

// Options multer
const multerOptions = {
    storage,
    // Fonction pour extraire le token CSRF avant de continuer
    fileFilter: (req, file, cb) => {
        // Si on a un token CSRF dans le formulaire, 
        // on l'ajoute à l'en-tête pour validation ultérieure
        if (req.body && req.body._csrf) {
            req.headers['csrf-token'] = req.body._csrf;
        }
        cb(null, true);
    }
};

// Initialisation de Multer
const upload = multer(multerOptions);

export default upload;
