export const errorHandler = (err, req, res, next) => {
    console.error(err); // Log l'erreur pour le débogage

    // Vérifie si l'erreur a un statut spécifique
    if (err.status) {
        return res.status(err.status).json({ success: false, error: err.message });
    }

    // Par défaut, renvoie une erreur 500
    res.status(500).json({ success: false, error: "Une erreur interne est survenue." });
};
