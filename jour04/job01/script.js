// Récupération du bouton par son id
const button = document.getElementById('button');

// Ajout d'un événement click sur le bouton
button.addEventListener('click', function() {
    // Utilisation de Fetch pour récupérer le contenu du fichier expression.txt
    fetch('expression.txt')
        .then(function(response) {
            // Vérification que la requête a réussi
            if (!response.ok) {
                throw new Error('Erreur lors du chargement du fichier');
            }
            // Retourne le contenu textuel de la réponse
            return response.text();
        })
        .then(function(data) {
            // Création d'un élément paragraphe
            const paragraph = document.createElement('p');
            // Insertion du contenu récupéré dans le paragraphe
            paragraph.textContent = data;
            // Ajout du paragraphe dans le corps de la page
            document.body.appendChild(paragraph);
        })
        .catch(function(error) {
            // Gestion des erreurs
            console.error('Erreur:', error);
        });
});
