document.addEventListener('DOMContentLoaded', function () {
    const updateBtn = document.getElementById('updateBtn');
    const usersBody = document.getElementById('usersBody');
    const countSpan = document.getElementById('count');
    const lastUpdateDiv = document.getElementById('lastUpdate');

    // Charger les utilisateurs au clic sur le bouton Update
    updateBtn.addEventListener('click', loadUsers);

    function loadUsers() {
        // Afficher l'état de chargement
        updateBtn.classList.add('loading');
        updateBtn.disabled = true;
        usersBody.innerHTML = '<tr><td colspan="4" class="status">Chargement en cours...</td></tr>';

        // Utiliser Fetch pour récupérer les données depuis users.php
        fetch('users.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur serveur: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                // Vérifier si c'est une erreur retournée par le serveur
                if (data.error) {
                    throw new Error(data.message);
                }

                // Afficher les utilisateurs dans le tableau
                displayUsers(data);

                // Mettre à jour l'heure de dernière mise à jour
                const now = new Date();
                lastUpdateDiv.textContent = 'Dernière mise à jour : ' + now.toLocaleString('fr-FR');
            })
            .catch(error => {
                usersBody.innerHTML = `
                    <tr>
                        <td colspan="4" class="status error">
                            ❌ ${error.message}
                        </td>
                    </tr>
                `;
                countSpan.textContent = '';
            })
            .finally(() => {
                // Retirer l'état de chargement
                updateBtn.classList.remove('loading');
                updateBtn.disabled = false;
            });
    }

    function displayUsers(users) {
        // Si aucun utilisateur
        if (users.length === 0) {
            usersBody.innerHTML = `
                <tr>
                    <td colspan="4" class="empty-message">
                        Aucun utilisateur dans la base de données.
                    </td>
                </tr>
            `;
            countSpan.textContent = '0 utilisateur';
            return;
        }

        // Générer les lignes du tableau
        let html = '';
        users.forEach(user => {
            html += `
                <tr>
                    <td class="id-cell">${user.id}</td>
                    <td>${escapeHtml(user.nom)}</td>
                    <td>${escapeHtml(user.prenom)}</td>
                    <td class="email-cell">${escapeHtml(user.email)}</td>
                </tr>
            `;
        });

        usersBody.innerHTML = html;
        countSpan.textContent = users.length + ' utilisateur' + (users.length > 1 ? 's' : '');
    }

    // Fonction pour échapper les caractères HTML (sécurité XSS)
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
