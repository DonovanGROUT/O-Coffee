export const render404 = (req, res) => {
    // Rend la vue 404
    res.status(404).render('404', {
        title: "O'Coffee - Page non trouvée, c'est fort de café ça !",
        description: "Page non trouvée au café O'Coffee",
        stylesheets: ['/css/style-404.css'] // Feuille de style spécifique à cette page
    });
};