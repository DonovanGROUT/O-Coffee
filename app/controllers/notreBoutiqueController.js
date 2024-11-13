export const renderNotreBoutique = (req, res) => {
    res.render('notre-boutique', {
        title: "O'Coffee - Notre Boutique",
        description: "Découvrez l'histoire et l'ambiance unique de notre boutique O'Coffee.",
        stylesheets: ['/css/style-notre-boutique.css']
    });
};