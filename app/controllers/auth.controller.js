import emailValidator from "email-validator";
import Passwordvalidator from "password-validator";
import argon2 from "argon2";
import client from '../database.js';

const schema = new Passwordvalidator();

schema
    .is()
    .min(6) // Doit faire minimum 6 caractères
    .is()
    .max(64) // Doit faire 64 caractères max
    .has()
    .uppercase() // Doit contenir une majuscule minimum
    .has()
    .lowercase() // Doit contenir une minuscule minimum
    .has()
    .digits(1) // Doit contenir au moins un chiffre
    .has()
    .not()
    .spaces(); // Ne doit pas contenir d'espaces

const authController = {
    // Méthode d'affichage de la page signup
    getSignUpPage: (req, res) => {
        res.status(200).render("signup", {
            error: null,
            data: null,
            title: "O'Coffee - Inscription",
            description: "Page d'inscription pour créer un compte O'Coffee.",
            stylesheets: ['/css/style-admin.css']
        });
    },

    getLoginPage: (req, res) => {
        res.status(200).render("login", {
            error: null,
            data: null,
            title: "O'Coffee - Connexion",
            description: "Page de connexion pour accéder à votre compte O'Coffee.",
            stylesheets: ['/css/style-admin.css']
        });
    },

    // Méthode de vérification et d'envoi de l'inscription
    handleSignUpSubmissionForm: async (req, res) => {
        try {
            const { firstname, lastname, email, password, confirmation } =
                req.body;
            if (!email || !password) {
                return res.status(400).render("signup", {
                    error: "Veuillez remplir le champ email / password",
                    data: req.body,
                    title: "O'Coffee - Inscription",
                    description: "Page d'inscription pour créer un compte O'Coffee.",
                    stylesheets: ['/css/style-admin.css']
                });
            }

            if (!emailValidator.validate(email)) {
                return res.status(400).render("signup", {
                    error: "Votre email est invalide",
                    data: req.body,
                    title: "O'Coffee - Inscription",
                    description: "Page d'inscription pour créer un compte O'Coffee.",
                    stylesheets: ['/css/style-admin.css']
                });
            }

            const failingRules = schema.validate(password, { list: true });
            if (failingRules.length > 0) {
                let errorMessage =
                    "Le mot de passe ne respecte pas les critères suivants : ";
                if (failingRules.includes("min"))
                    errorMessage += "au moins 6 caractères, ";
                if (failingRules.includes("max"))
                    errorMessage += "maximum 64 caractères, ";
                if (failingRules.includes("uppercase"))
                    errorMessage += "au moins une majuscule, ";
                if (failingRules.includes("lowercase"))
                    errorMessage += "au moins une minuscule, ";
                if (failingRules.includes("digits"))
                    errorMessage += "au moins un chiffre, ";
                if (failingRules.includes("spaces"))
                    errorMessage += "pas d'espaces, ";

                errorMessage = errorMessage.slice(0, -2); // Enlève la dernière virgule et l'espace

                return res.status(400).render("signup", {
                    error: errorMessage,
                    data: req.body,
                    title: "O'Coffee - Inscription",
                    description: "Page d'inscription pour créer un compte O'Coffee.",
                    stylesheets: ['/css/style-admin.css']
                });
            }

            if (password !== confirmation) {
                const errorMessage =
                    "Le mot de passe et sa confirmation sont différents";
                return res.status(400).render("signup", {
                    error: errorMessage,
                    data: req.body,
                    title: "O'Coffee - Inscription",
                    description: "Page d'inscription pour créer un compte O'Coffee.",
                    stylesheets: ['/css/style-admin.css']
                });
            }

            // Vérifie si l'utilisateur existe déjà
            const existingUserResult = await client.query('SELECT * FROM users WHERE email = $1', [email]);
            if (existingUserResult.rows.length > 0) {
                return res.status(400).render("signup", {
                    error: "Cet email est déjà utilisé !",
                    data: req.body,
                    title: "O'Coffee - Inscription",
                    description: "Page d'inscription pour créer un compte O'Coffee.",
                    stylesheets: ['/css/style-admin.css']
                });
            }

            // Insère le nouvel utilisateur
            await client.query('INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)',
                [firstname, lastname, email, await argon2.hash(password)]);

            res.redirect("/login");
        } catch (error) {
            console.error(error);
            // Ajout du rendu en cas d'erreur générique
            return res.status(500).render("signup", {
                error: "Une erreur est survenue lors de l'inscription.",
                data: req.body,
                title: "O'Coffee - Inscription",
                description: "Page d'inscription pour créer un compte O'Coffee.",
                stylesheets: ['/css/style-admin.css']
            });
        }
    },

    // Méthode de vérification et de connexion à un compte utilisateur
    handleLoginFormSubmission: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Cherche l'utilisateur par email
            const userResult = await client.query('SELECT * FROM users WHERE email = $1', [email]);

            if (userResult.rows.length === 0) {
                return res.render("login", {
                    data: req.body,
                    error: `Le compte demandé n'existe pas. Vérifiez votre adresse email.`,
                    title: "O'Coffee - Connexion",
                    description: "Page de connexion pour accéder à votre compte O'Coffee.",
                    stylesheets: ['/css/style-admin.css']
                });
            }

            const user = userResult.rows[0];

            // Vérifie le mot de passe
            const hasMatchingPassword = await argon2.verify(user.password, password);

            if (!hasMatchingPassword) {
                return res.render("login", {
                    data: req.body,
                    error: `Le mot de passe n'est pas correct, veuillez réessayer`,
                    title: "O'Coffee - Connexion",
                    description: "Page de connexion pour accéder à votre compte O'Coffee.",
                    stylesheets: ['/css/style-admin.css']
                });
            }

            // Ajoute l'utilisateur à la session
            req.session.user = user;

            res.redirect("/admin");
        } catch (error) {
            console.error(error);
            // Ajout du rendu en cas d'erreur générique
            return res.status(500).render("login", {
                error: "Une erreur est survenue lors de la connexion.",
                data: req.body,
                title: "O'Coffee - Connexion",
                description: "Page de connexion pour accéder à votre compte O'Coffee.",
                stylesheets: ['/css/style-admin.css']
            });
        }
    },
};

export default authController;
