function estPremier(n) {
    if (n <= 1) return false;

    // Math.sqrt calucule la racine carré d'un nombre
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function sommeNombresPremiers(a, b) {
    if (estPremier(a) && estPremier(b)) {
        return a + b;
    } else {
        return false;
    }
}

console.log(sommeNombresPremiers(3, 5));
console.log(sommeNombresPremiers(4, 7));
console.log(sommeNombresPremiers(11, 13));