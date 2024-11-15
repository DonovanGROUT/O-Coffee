import express from 'express';

const router = express.Router();

// Route pour récupérer la clé publique EmailJS
router.get('/api/emailjs-key', (req, res) => {
    // Envoie la clé publique EmailJS stockée dans les variables d'environnement
    res.send(process.env.EMAILJS_PUBLIC_KEY);
});

export default router;