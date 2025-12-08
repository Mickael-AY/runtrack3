let compteur = 0;

function incrementer() {
    compteur++;
    document.getElementById('compteur').textContent = compteur;
}

function decrementer() {
    compteur--;
    document.getElementById('compteur').textContent = compteur;
}

function reset() {
    compteur = 0;
    document.getElementById('compteur').textContent = compteur;
}