/**
 * Job 02 - Script interactif Bootstrap
 * 
 * Fonctionnalités :
 * 1. Lien Accueil → La Plateforme (fait en HTML)
 * 2. Bouton Papillon → Modale de confirmation (fait en HTML avec data-bs-toggle)
 * 3. Bouton "Rebooter le Monde" → Citation aléatoire Blade Runner (1982)
 * 4. Pagination → Modifie le contenu du jumbotron
 */

$(document).ready(function() {
    
    // ============================================
    // CITATIONS BLADE RUNNER (1982)
    // Citations célèbres du film original de Ridley Scott
    // ============================================
    const bladeRunnerQuotes = [
        {
            quote: "J'ai vu tant de choses que vous, humains, ne pourriez pas croire. Des vaisseaux de guerre en feu surgissant de l'épaule d'Orion. J'ai vu des rayons C briller dans l'obscurité près de la porte de Tannhäuser. Tous ces moments se perdront dans le temps, comme les larmes dans la pluie. Il est temps de mourir.",
            author: "Roy Batty"
        },
        {
            quote: "C'est dommage qu'elle ne puisse pas vivre ! Mais qui le peut ?",
            author: "Gaff"
        },
        {
            quote: "Le commerce c'est notre but ici chez Tyrell. Plus humain que l'humain, c'est notre devise.",
            author: "Eldon Tyrell"
        },
        {
            quote: "Réveillez-vous ! Il est temps de mourir !",
            author: "Roy Batty"
        },
        {
            quote: "Je veux plus de vie, père !",
            author: "Roy Batty"
        },
        {
            quote: "Avez-vous déjà retiré un humain par erreur ? Non... mais il y a toujours une première fois.",
            author: "Rick Deckard"
        },
        {
            quote: "Si seulement tu pouvais voir ce que j'ai vu avec tes yeux.",
            author: "Roy Batty"
        },
        {
            quote: "Les souvenirs, vous parlez de souvenirs.",
            author: "Rachael"
        },
        {
            quote: "Peut-être qu'à une époque ça signifiait quelque chose. Plus maintenant.",
            author: "Rick Deckard"
        },
        {
            quote: "Assez bon pour être humain... mais pas humain.",
            author: "Rick Deckard"
        }
    ];

    // ============================================
    // CONTENUS POUR LA PAGINATION
    // ============================================
    const paginationContents = [
        {
            title: "Bienvenue sur MonSite",
            text: "Découvrez nos services et solutions adaptés à vos besoins. Une expérience utilisateur optimale grâce à Bootstrap 5."
        },
        {
            title: "Innovation & Créativité",
            text: "Nous repoussons les limites du possible pour créer des expériences digitales uniques. Notre équipe d'experts est prête à relever tous les défis."
        },
        {
            title: "Votre Succès, Notre Mission",
            text: "Depuis 2020, nous accompagnons plus de 500 entreprises dans leur transformation digitale. Rejoignez l'aventure et donnez vie à vos projets les plus ambitieux !"
        }
    ];

    // Variable pour stocker le contenu original
    let originalContent = {
        title: $('#jumbotron-title').text(),
        text: $('#jumbotron-text').text()
    };

    // ============================================
    // BOUTON "REBOOTER LE MONDE"
    // Affiche une citation aléatoire de Blade Runner
    // ============================================
    $('#rebootBtn').on('click', function() {
        // Sélectionner une citation aléatoire
        const randomIndex = Math.floor(Math.random() * bladeRunnerQuotes.length);
        const quote = bladeRunnerQuotes[randomIndex];

        // Animation de transition
        const $content = $('#jumbotron-content');
        $content.addClass('fade-out');

        setTimeout(function() {
            // Modifier le contenu du jumbotron
            $('#jumbotron-title').html(
                '<i class="bi bi-film me-2"></i>Blade Runner (1982)'
            );
            $('#jumbotron-text').html(
                `<blockquote class="blade-runner-quote">
                    "${quote.quote}"
                    <footer class="mt-2 text-white-50">— ${quote.author}</footer>
                </blockquote>`
            );

            // Retirer la classe active de la pagination
            $('#jumbotron-pagination .page-item').removeClass('active');

            // Retirer l'effet de fondu
            $content.removeClass('fade-out');
        }, 300);

        // Effet visuel sur le bouton
        $(this).html('<i class="bi bi-check-circle me-2"></i>Monde Rebooté !');
        
        setTimeout(() => {
            $(this).html('<i class="bi bi-arrow-clockwise me-2"></i>Rebooter le Monde');
        }, 2000);
    });

    // ============================================
    // PAGINATION
    // Modifie le contenu du jumbotron selon la page
    // ============================================
    $('#jumbotron-pagination .page-link').on('click', function() {
        const pageNumber = $(this).data('page');
        const content = paginationContents[pageNumber - 1];

        if (!content) return;

        // Mettre à jour l'état actif de la pagination
        $('#jumbotron-pagination .page-item').removeClass('active');
        $(this).parent().addClass('active');

        // Animation de transition
        const $content = $('#jumbotron-content');
        $content.addClass('fade-out');

        setTimeout(function() {
            // Modifier le contenu
            $('#jumbotron-title').text(content.title);
            $('#jumbotron-text').text(content.text);

            // Retirer l'effet de fondu
            $content.removeClass('fade-out');
        }, 300);
    });

    // ============================================
    // GESTION DE LA MODALE PAPILLON
    // (La modale fonctionne via Bootstrap data-bs-toggle,
    // mais on peut ajouter des effets supplémentaires)
    // ============================================
    $('#papillonModal').on('shown.bs.modal', function() {
        // Animation du papillon dans la modale
        const $butterfly = $(this).find('.display-1');
        $butterfly.css({
            'animation': 'flutter 0.5s ease-in-out',
            'display': 'inline-block'
        });
    });

    // ============================================
    // LISTE GROUPÉE INTERACTIVE
    // Cliquer sur un élément le rend actif
    // ============================================
    $('#interactiveList .list-group-item').on('click', function() {
        // Retirer la classe active de tous les éléments
        $('#interactiveList .list-group-item').removeClass('active');
        // Mettre à jour les icônes
        $('#interactiveList .list-group-item i').removeClass('bi-star-fill').addClass('bi-star');
        
        // Ajouter la classe active à l'élément cliqué
        $(this).addClass('active');
        // Changer l'icône de l'élément actif
        $(this).find('i').removeClass('bi-star').addClass('bi-star-fill');
    });

    // ============================================
    // PROGRESS BAR - Boutons + et -
    // ============================================
    let progressValue = 50;

    function updateProgressBar() {
        // Limiter entre 0 et 100
        progressValue = Math.max(0, Math.min(100, progressValue));
        
        // Mettre à jour la barre
        $('#progressBar')
            .css('width', progressValue + '%')
            .attr('aria-valuenow', progressValue);
        $('#progressValue').text(progressValue + '%');

        // Changer la couleur selon la valeur
        const $bar = $('#progressBar');
        $bar.removeClass('bg-danger bg-warning bg-info bg-success');
        
        if (progressValue < 25) {
            $bar.addClass('bg-danger');
        } else if (progressValue < 50) {
            $bar.addClass('bg-warning');
        } else if (progressValue < 75) {
            $bar.addClass('bg-info');
        } else {
            $bar.addClass('bg-success');
        }
    }

    // Bouton + (augmenter)
    $('#progressPlus').on('click', function() {
        progressValue += 10;
        updateProgressBar();
    });

    // Bouton - (diminuer)
    $('#progressMinus').on('click', function() {
        progressValue -= 10;
        updateProgressBar();
    });

    // ============================================
    // SÉQUENCE D + G + C
    // Affiche une modale avec récapitulatif du formulaire
    // ============================================
    let keySequence = [];
    const secretCode = ['d', 'g', 'c'];

    $(document).on('keydown', function(e) {
        const key = e.key.toLowerCase();
        
        // Ajouter la touche à la séquence
        keySequence.push(key);
        
        // Garder seulement les 3 dernières touches
        if (keySequence.length > 3) {
            keySequence.shift();
        }
        
        // Vérifier si la séquence correspond
        if (keySequence.join('') === secretCode.join('')) {
            // Récupérer les valeurs du formulaire
            const nom = $('#infoNom').val() || '(non renseigné)';
            const prenom = $('#infoPrenom').val() || '(non renseigné)';
            const ville = $('#infoVille').val() || '(non renseigné)';
            
            // Mettre à jour la modale
            $('#recapNom').text(nom);
            $('#recapPrenom').text(prenom);
            $('#recapVille').text(ville);
            
            // Afficher la modale
            const dgcModal = new bootstrap.Modal(document.getElementById('dgcModal'));
            dgcModal.show();
            
            // Réinitialiser la séquence
            keySequence = [];
            
            console.log('🔓 Code secret D+G+C activé !');
        }
    });

    // ============================================
    // FORMULAIRE LOGIN - Change couleur du spinner
    // ============================================
    const spinnerColors = [
        'text-primary',
        'text-secondary', 
        'text-success',
        'text-danger',
        'text-warning',
        'text-info',
        'text-light',
        'text-dark'
    ];

    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        
        const email = $('#loginEmail').val().trim();
        const password = $('#loginPassword').val().trim();
        
        // Vérifier que les champs ne sont pas vides
        if (email !== '' && password !== '') {
            // Choisir une couleur aléatoire
            const randomColor = spinnerColors[Math.floor(Math.random() * spinnerColors.length)];
            
            // Retirer toutes les classes de couleur existantes
            const $spinner = $('#mainSpinner');
            spinnerColors.forEach(color => $spinner.removeClass(color));
            
            // Appliquer la nouvelle couleur
            $spinner.addClass(randomColor);
            
            // Feedback visuel
            const $btn = $(this).find('button[type="submit"]');
            const originalText = $btn.html();
            $btn.html('<i class="bi bi-check-circle me-2"></i>Couleur changée !');
            $btn.removeClass('btn-dark').addClass('btn-success');
            
            setTimeout(() => {
                $btn.html(originalText);
                $btn.removeClass('btn-success').addClass('btn-dark');
            }, 2000);
            
            // Scroll vers le spinner pour voir le changement
            $('html, body').animate({
                scrollTop: $('#jumbotron').offset().top
            }, 500);
            
            console.log('🎨 Couleur du spinner changée en:', randomColor);
        } else {
            // Afficher un message d'erreur
            alert('Veuillez remplir l\'email et le mot de passe.');
        }
    });

    // ============================================
    // SCROLL FLUIDE POUR LES LIENS D'ANCRAGE
    // ============================================
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this).attr('href');
        if (target.length > 1 && $(target).length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $(target).offset().top - 70
            }, 500);
        }
    });

    // ============================================
    // CONSOLE LOG POUR LE DEBUG
    // ============================================
    console.log('🚀 Job 02 - Script chargé avec succès !');
    console.log('📌 Fonctionnalités actives :');
    console.log('   - Lien Accueil → La Plateforme');
    console.log('   - Bouton Papillon → Modale d\'achat');
    console.log('   - Bouton Rebooter → Citations Blade Runner');
    console.log('   - Pagination → Contenu dynamique');
    console.log('   - Liste groupée → Clic = actif');
    console.log('   - Progress bar → Boutons +/-');
    console.log('   - Code secret → D + G + C');
    console.log('   - Login → Change couleur spinner');
});
