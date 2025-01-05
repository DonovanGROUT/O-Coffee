import { getViewConfig } from '../../config/viewConfig.js';
import emailValidator from "email-validator";
import Passwordvalidator from "password-validator";
import argon2 from "argon2";
import User from '../models/User.model.js';
import { errorHandler } from '../middlewares/errorHandler.js';

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
            ...getViewConfig('signup')
        });
    },

    getLoginPage: (req, res) => {
        res.status(200).render("login", {
            error: null,
            data: null,
            ...getViewConfig('login')
        });
    },

    // Méthode de vérification et d'envoi de l'inscription
    handleSignUpSubmissionForm: async (req, res) => {
        try {
            const { firstname, lastname, email, password, confirmation } = req.body;

            if (!email || !password) {
                return errorHandler({ status: 400, message: "Veuillez remplir le champ email / password" }, req, res);
            }

            if (!emailValidator.validate(email)) {
                return errorHandler({ status: 400, message: "Votre email est invalide" }, req, res);
            }

            const failingRules = schema.validate(password, { list: true });
            if (failingRules.length > 0) {
                let errorMessage = "Le mot de passe ne respecte pas les critères suivants : ";
                if (failingRules.includes("min")) errorMessage += "au moins 6 caractères, ";
                if (failingRules.includes("max")) errorMessage += "maximum 64 caractères, ";
                if (failingRules.includes("uppercase")) errorMessage += "au moins une majuscule, ";
                if (failingRules.includes("lowercase")) errorMessage += "au moins une minuscule, ";
                if (failingRules.includes("digits")) errorMessage += "au moins un chiffre, ";
                if (failingRules.includes("spaces")) errorMessage += "pas d'espaces, ";

                errorMessage = errorMessage.slice(0, -2); // Enlève la dernière virgule et l'espace

                return errorHandler({ status: 400, message: errorMessage }, req, res);
            }

            if (password !== confirmation) {
                return errorHandler({ status: 400, message: "Le mot de passe et sa confirmation sont différents" }, req, res);
            }

            // Vérifie si l'utilisateur existe déjà
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return errorHandler({ status: 400, message: "Cet email est déjà utilisé !" }, req, res);
            }

            // Insère le nouvel utilisateur
            await User.create({
                firstname,
                lastname,
                email,
                password: await argon2.hash(password)
            });

            res.redirect("/login");
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
            return errorHandler(error, req, res);
        }
    },

    // Méthode de vérification et de connexion à un compte utilisateur
    handleLoginFormSubmission: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Cherche l'utilisateur par email
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return errorHandler({ status: 404, message: `Le compte demandé n'existe pas. Vérifiez votre adresse email.` }, req, res);
            }

            // Vérifie le mot de passe
            const hasMatchingPassword = await argon2.verify(user.password, password);

            if (!hasMatchingPassword) {
                return errorHandler({ status: 401, message: `Le mot de passe n'est pas correct, veuillez réessayer` }, req, res);
            }

            // Ajoute l'utilisateur à la session
            req.session.user = user;

            res.redirect("/admin");
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            return errorHandler(error, req, res);
        }
    },
    handleLogout: (req, res) => {
        req.session.destroy(err => {
            if (err) {
                console.error('Erreur lors de la déconnexion:', err);
                return res.redirect('/');
            }
            res.redirect('/');
        });
    },
};

export default authController;
