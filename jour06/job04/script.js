/**
 * Job 04 - Script complet avec toutes les fonctionnalités
 * 
 * Fonctionnalités :
 * 1. Lien Accueil → La Plateforme
 * 2. Bouton Papillon → Modale de confirmation
 * 3. Bouton "Rebooter le Monde" → Citation Blade Runner (1982)
 * 4. Pagination → Modifie le contenu du jumbotron
 * 5. Liste groupée → Clic rend l'élément actif
 * 6. Progress bar → Boutons +/-
 * 7. D + G + C → Modale récapitulatif
 * 8. Login → Change couleur spinner
 */

$(document).ready(function() {
    
    // ============================================
    // CITATIONS BLADE RUNNER (1982)
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
            quote: "Si seulement tu pouvais voir ce que j'ai vu avec tes yeux.",
            author: "Roy Batty"
        },
        {
            quote: "Les souvenirs, vous parlez de souvenirs.",
            author: "Rachael"
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
            title: "Bonjour, monde!",
            lead: "Il existe plusieurs visions du terme :",
            text: "le monde est la matière, l'espace et les phénomènes qui nous sont accessibles par les sens, l'expérience ou la raison.",
            text2: "Le sens le plus courant désigne notre planète, la Terre, avec ses habitants, et son environnement plus ou moins naturel.",
            footer: "Le sens étendu désigne l'univers dans son ensemble."
        },
        {
            title: "Page 2 - Innovation",
            lead: "La technologie au service de l'humain :",
            text: "Nous repoussons les limites du possible pour créer des expériences digitales uniques.",
            text2: "Notre équipe d'experts est prête à relever tous les défis techniques.",
            footer: "L'innovation est notre moteur quotidien."
        },
        {
            title: "Page 3 - Notre Mission",
            lead: "Votre succès est notre priorité :",
            text: "Depuis 2020, nous accompagnons plus de 500 entreprises dans leur transformation digitale.",
            text2: "Rejoignez l'aventure et donnez vie à vos projets les plus ambitieux !",
            footer: "Ensemble, construisons l'avenir."
        }
    ];

    let currentPage = 1;

    // ============================================
    // BOUTON "REBOOTER LE MONDE"
    // Affiche une citation aléatoire de Blade Runner
    // ============================================
    $('#rebootBtn').on('click', function() {
        const randomIndex = Math.floor(Math.random() * bladeRunnerQuotes.length);
        const quote = bladeRunnerQuotes[randomIndex];

        const $content = $('#jumbotron-content');
        $content.addClass('fade-out');

        setTimeout(function() {
            $('#jumbotron-title').html('<i class="bi bi-film me-2"></i>Blade Runner (1982)');
            $('#jumbotron-lead').text('Citation célèbre :');
            $('#jumbotron-text').html(`<em>"${quote.quote}"</em>`);
            $('#jumbotron-text2').text('');
            $('#jumbotron-footer').text('— ' + quote.author);

            // Retirer la classe active de la pagination
            $('#jumbotron-pagination .page-item').removeClass('active');

            $content.removeClass('fade-out');
        }, 300);

        $(this).html('<i class="bi bi-check me-1"></i>Rebooté !');
        setTimeout(() => {
            $(this).text('Rebooter le Monde');
        }, 2000);
    });

    // ============================================
    // PAGINATION
    // ============================================
    $('#jumbotron-pagination .page-link').on('click', function() {
        const page = $(this).data('page');
        
        if (page === 'prev') {
            currentPage = Math.max(1, currentPage - 1);
        } else if (page === 'next') {
            currentPage = Math.min(3, currentPage + 1);
        } else {
            currentPage = parseInt(page);
        }

        const content = paginationContents[currentPage - 1];
        if (!content) return;

        // Mise à jour pagination active
        $('#jumbotron-pagination .page-item').removeClass('active');
        $(`#jumbotron-pagination .page-link[data-page="${currentPage}"]`).parent().addClass('active');

        const $content = $('#jumbotron-content');
        $content.addClass('fade-out');

        setTimeout(function() {
            $('#jumbotron-title').text(content.title);
            $('#jumbotron-lead').text(content.lead);
            $('#jumbotron-text').text(content.text);
            $('#jumbotron-text2').text(content.text2);
            $('#jumbotron-footer').text(content.footer);
            $content.removeClass('fade-out');
        }, 300);
    });

    // ============================================
    // LISTE GROUPÉE INTERACTIVE
    // Cliquer rend l'élément actif
    // ============================================
    $('#interactiveList .list-group-item').on('click', function() {
        $('#interactiveList .list-group-item').removeClass('active');
        $(this).addClass('active');
    });

    // ============================================
    // PROGRESS BAR
    // ============================================
    let progressValue = 75;

    function updateProgressBar() {
        progressValue = Math.max(0, Math.min(100, progressValue));
        $('#progressBar')
            .css('width', progressValue + '%')
            .attr('aria-valuenow', progressValue);
    }

    $('#progressPlus').on('click', function() {
        progressValue += 10;
        updateProgressBar();
    });

    $('#progressMinus').on('click', function() {
        progressValue -= 10;
        updateProgressBar();
    });

    // ============================================
    // SÉQUENCE D + G + C
    // ============================================
    let keySequence = [];
    const secretCode = ['d', 'g', 'c'];

    $(document).on('keydown', function(e) {
        const key = e.key.toLowerCase();
        keySequence.push(key);
        
        if (keySequence.length > 3) {
            keySequence.shift();
        }
        
        if (keySequence.join('') === secretCode.join('')) {
            const nom = $('#infoNom').val() || '(non renseigné)';
            const prenom = $('#infoPrenom').val() || '(non renseigné)';
            const ville = $('#infoVille').val() || '(non renseigné)';
            
            $('#recapNom').text(nom);
            $('#recapPrenom').text(prenom ? '********' : '(non renseigné)');
            $('#recapVille').text(ville);
            
            const dgcModal = new bootstrap.Modal(document.getElementById('dgcModal'));
            dgcModal.show();
            
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
        'text-dark'
    ];

    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        
        const email = $('#loginEmail').val().trim();
        const password = $('#loginPassword').val().trim();
        
        if (email !== '' && password !== '') {
            const randomColor = spinnerColors[Math.floor(Math.random() * spinnerColors.length)];
            
            const $spinner = $('#mainSpinner');
            spinnerColors.forEach(color => $spinner.removeClass(color));
            $spinner.addClass(randomColor);
            
            const $btn = $(this).find('button[type="submit"]');
            const originalText = $btn.html();
            $btn.html('<i class="bi bi-check me-1"></i>Couleur changée !');
            $btn.removeClass('btn-primary').addClass('btn-success');
            
            setTimeout(() => {
                $btn.html(originalText);
                $btn.removeClass('btn-success').addClass('btn-primary');
            }, 2000);
            
            // Scroll vers le spinner
            $('html, body').animate({
                scrollTop: 0
            }, 500);
            
            console.log('🎨 Couleur du spinner changée en:', randomColor);
        } else {
            alert('Veuillez remplir l\'email et le mot de passe.');
        }
    });

    // ============================================
    // CONSOLE LOG
    // ============================================
    console.log('🚀 Job 04 - Script chargé !');
    console.log('📌 Fonctionnalités :');
    console.log('   - Lien Accueil → La Plateforme');
    console.log('   - Bouton Papillon → Modale');
    console.log('   - Rebooter → Blade Runner');
    console.log('   - Pagination → Contenu dynamique');
    console.log('   - Liste → Clic = actif');
    console.log('   - Progress bar → +/-');
    console.log('   - D+G+C → Récapitulatif');
    console.log('   - Login → Spinner couleur');
});
