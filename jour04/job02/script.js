/**
 * Fonction qui retourne la valeur liée à une clé dans une chaîne JSON
 * @param {string} jsonString - Chaîne de caractères au format JSON
 * @param {string} key - Clé dont on veut récupérer la valeur
 * @returns {*} La valeur associée à la clé, ou undefined si la clé n'existe pas
 */
function jsonValueKey(jsonString, key) {
    // Conversion de la chaîne JSON en objet JavaScript
    const jsonObject = JSON.parse(jsonString);
    
    // Retourne la valeur associée à la clé
    return jsonObject[key];
}

// Exemple d'utilisation
const jsonData = '{"name": "La Plateforme_", "address": "8 rue d\'hozier", "city": "Marseille", "nb_staff": "11", "creation": "2019"}';

// Test de la fonction avec la clé "city"
console.log(jsonValueKey(jsonData, "city")); // Affiche : Marseille
