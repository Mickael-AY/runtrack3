document.addEventListener('DOMContentLoaded', function () {
    const filterBtn = document.getElementById('filterBtn');
    const filterId = document.getElementById('filterId');
    const filterNom = document.getElementById('filterNom');
    const filterType = document.getElementById('filterType');
    const resultsDiv = document.getElementById('results');

    filterBtn.addEventListener('click', filtrerPokemon);

    // Permettre de filtrer avec Entrée
    [filterId, filterNom, filterType].forEach(el => {
        el.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                filtrerPokemon();
            }
        });
    });

    function filtrerPokemon() {
        // Récupérer les valeurs des filtres
        const idValue = filterId.value.trim();
        const nomValue = filterNom.value.trim().toLowerCase();
        const typeValue = filterType.value;

        // Utiliser Fetch pour récupérer le fichier JSON
        fetch('pokemon.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement du fichier JSON');
                }
                return response.json();
            })
            .then(data => {
                // Filtrer les données selon les critères
                let resultats = data.filter(pokemon => {
                    let matchId = true;
                    let matchNom = true;
                    let matchType = true;

                    // Filtre par ID (si renseigné)
                    if (idValue !== '') {
                        matchId = pokemon.id.toString() === idValue;
                    }

                    // Filtre par nom (recherche partielle, insensible à la casse)
                    if (nomValue !== '') {
                        matchNom = pokemon.nom.toLowerCase().includes(nomValue);
                    }

                    // Filtre par type (si sélectionné)
                    if (typeValue !== '') {
                        matchType = pokemon.type === typeValue;
                    }

                    return matchId && matchNom && matchType;
                });

                // Afficher les résultats
                afficherResultats(resultats);
            })
            .catch(error => {
                resultsDiv.innerHTML = `
                    <h2>Résultats</h2>
                    <p class="no-results" style="color: red;">❌ ${error.message}</p>
                `;
            });
    }

    function afficherResultats(pokemons) {
        if (pokemons.length === 0) {
            resultsDiv.innerHTML = `
                <h2>Résultats</h2>
                <p class="no-results">Aucun Pokémon ne correspond aux critères.</p>
            `;
            return;
        }

        // Générer le HTML des cartes Pokémon
        let html = `
            <h2>Résultats</h2>
            <p class="count">${pokemons.length} Pokémon trouvé${pokemons.length > 1 ? 's' : ''}</p>
            <div class="pokemon-list">
        `;

        pokemons.forEach(pokemon => {
            const typeClass = 'type-' + normalizeType(pokemon.type);
            html += `
                <div class="pokemon-card">
                    <div class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</div>
                    <div class="pokemon-nom">${pokemon.nom}</div>
                    <span class="pokemon-type ${typeClass}">${pokemon.type}</span>
                </div>
            `;
        });

        html += '</div>';
        resultsDiv.innerHTML = html;
    }

    // Normalise le type pour la classe CSS
    function normalizeType(type) {
        return type
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, ''); // Enlève les accents
    }
});
