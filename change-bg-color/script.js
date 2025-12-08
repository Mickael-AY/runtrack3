function changerCouleur(couleur) {
    let zone = document.getElementById('zone');
    zone.style.backgroundColor = couleur;

    // Bonus : texte blanc si couleur foncée
    if (couleur === 'blue' || couleur === 'green') {
        zone.style.color = 'white';
    } else {
        zone.style.color = 'black';
    }
}