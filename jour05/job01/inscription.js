/**
 * Script de validation pour le formulaire d'inscription
 */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const globalErrors = document.getElementById('global-errors');
    const submitBtn = document.getElementById('submitBtn');
    
    // Champs du formulaire
    const fields = {
        prenom: document.getElementById('prenom'),
        nom: document.getElementById('nom'),
        email: document.getElementById('email'),
        password: document.getElementById('password'),
        password_confirm: document.getElementById('password_confirm'),
        adresse: document.getElementById('adresse'),
        code_postal: document.getElementById('code_postal'),
        ville: document.getElementById('ville')
    };
    
    // État de validation
    const validationState = {
        prenom: false,
        nom: false,
        email: false,
        password: false,
        password_confirm: false,
        adresse: false,
        code_postal: false,
        ville: false
    };
    
    // Initialisation
    Validator.initCSRF();
    Validator.initPasswordToggle();
    
    /**
     * Valide le prénom
     */
    async function validatePrenom() {
        const value = fields.prenom.value.trim();
        
        let result = Validator.validateRequired(value, 'Prénom');
        if (!result.valid) {
            Validator.showError(fields.prenom, result.message);
            validationState.prenom = false;
            return false;
        }
        
        result = Validator.validateMinLength(value, 2, 'Prénom');
        if (!result.valid) {
            Validator.showError(fields.prenom, 'La taille de votre prénom est trop petite');
            validationState.prenom = false;
            return false;
        }
        
        result = Validator.validateName(value, 'Prénom');
        if (!result.valid) {
            Validator.showError(fields.prenom, result.message);
            validationState.prenom = false;
            return false;
        }
        
        Validator.clearError(fields.prenom);
        fields.prenom.classList.add('valid');
        validationState.prenom = true;
        return true;
    }
    
    /**
     * Valide le nom
     */
    async function validateNom() {
        const value = fields.nom.value.trim();
        
        let result = Validator.validateRequired(value, 'Nom');
        if (!result.valid) {
            Validator.showError(fields.nom, result.message);
            validationState.nom = false;
            return false;
        }
        
        result = Validator.validateMinLength(value, 2, 'Nom');
        if (!result.valid) {
            Validator.showError(fields.nom, 'La taille de votre nom est trop petite');
            validationState.nom = false;
            return false;
        }
        
        result = Validator.validateName(value, 'Nom');
        if (!result.valid) {
            Validator.showError(fields.nom, result.message);
            validationState.nom = false;
            return false;
        }
        
        Validator.clearError(fields.nom);
        fields.nom.classList.add('valid');
        validationState.nom = true;
        return true;
    }
    
    /**
     * Valide l'email avec vérification asynchrone simulée
     */
    async function validateEmail() {
        const value = fields.email.value.trim();
        
        let result = Validator.validateRequired(value, 'Email');
        if (!result.valid) {
            Validator.showError(fields.email, result.message);
            validationState.email = false;
            return false;
        }
        
        result = Validator.validateEmail(value);
        if (!result.valid) {
            Validator.showError(fields.email, result.message);
            validationState.email = false;
            return false;
        }
        
        // Simulation de vérification asynchrone (email déjà pris)
        // En production, cela ferait un appel API
        const emailExists = await simulateEmailCheck(value);
        if (emailExists) {
            Validator.showError(fields.email, 'Cette adresse email est déjà utilisée');
            validationState.email = false;
            return false;
        }
        
        Validator.clearError(fields.email);
        Validator.showSuccess(fields.email, '✓ Email disponible');
        fields.email.classList.add('valid');
        validationState.email = true;
        return true;
    }
    
    /**
     * Simule une vérification d'email (async)
     */
    function simulateEmailCheck(email) {
        return new Promise(resolve => {
            setTimeout(() => {
                // Simuler quelques emails "déjà pris"
                const takenEmails = ['test@test.com', 'admin@admin.com'];
                resolve(takenEmails.includes(email.toLowerCase()));
            }, 300);
        });
    }
    
    /**
     * Valide le mot de passe
     */
    async function validatePassword() {
        const value = fields.password.value;
        
        // Mettre à jour l'indicateur de force
        Validator.updatePasswordStrength(fields.password);
        
        let result = Validator.validateRequired(value, 'Mot de passe');
        if (!result.valid) {
            Validator.showError(fields.password, result.message);
            validationState.password = false;
            return false;
        }
        
        result = Validator.validatePassword(value);
        if (!result.valid) {
            Validator.showError(fields.password, result.message);
            validationState.password = false;
            return false;
        }
        
        Validator.clearError(fields.password);
        fields.password.classList.add('valid');
        validationState.password = true;
        
        // Revalider la confirmation si elle est remplie
        if (fields.password_confirm.value) {
            validatePasswordConfirm();
        }
        
        return true;
    }
    
    /**
     * Valide la confirmation du mot de passe
     */
    async function validatePasswordConfirm() {
        const value = fields.password_confirm.value;
        const password = fields.password.value;
        
        let result = Validator.validateRequired(value, 'Confirmation du mot de passe');
        if (!result.valid) {
            Validator.showError(fields.password_confirm, result.message);
            validationState.password_confirm = false;
            return false;
        }
        
        result = Validator.validatePasswordMatch(password, value);
        if (!result.valid) {
            Validator.showError(fields.password_confirm, result.message);
            validationState.password_confirm = false;
            return false;
        }
        
        Validator.clearError(fields.password_confirm);
        fields.password_confirm.classList.add('valid');
        validationState.password_confirm = true;
        return true;
    }
    
    /**
     * Valide l'adresse
     */
    async function validateAdresse() {
        const value = fields.adresse.value.trim();
        
        let result = Validator.validateRequired(value, 'Adresse');
        if (!result.valid) {
            Validator.showError(fields.adresse, result.message);
            validationState.adresse = false;
            return false;
        }
        
        result = Validator.validateMinLength(value, 5, 'Adresse');
        if (!result.valid) {
            Validator.showError(fields.adresse, result.message);
            validationState.adresse = false;
            return false;
        }
        
        result = Validator.validateAdresse(value);
        if (!result.valid) {
            Validator.showError(fields.adresse, result.message);
            validationState.adresse = false;
            return false;
        }
        
        Validator.clearError(fields.adresse);
        fields.adresse.classList.add('valid');
        validationState.adresse = true;
        return true;
    }
    
    /**
     * Valide le code postal
     */
    async function validateCodePostal() {
        const value = fields.code_postal.value.trim();
        
        let result = Validator.validateRequired(value, 'Code postal');
        if (!result.valid) {
            Validator.showError(fields.code_postal, result.message);
            validationState.code_postal = false;
            return false;
        }
        
        result = Validator.validateCodePostal(value);
        if (!result.valid) {
            Validator.showError(fields.code_postal, result.message);
            validationState.code_postal = false;
            return false;
        }
        
        Validator.clearError(fields.code_postal);
        fields.code_postal.classList.add('valid');
        validationState.code_postal = true;
        return true;
    }
    
    /**
     * Valide la ville
     */
    async function validateVille() {
        const value = fields.ville.value.trim();
        
        let result = Validator.validateRequired(value, 'Ville');
        if (!result.valid) {
            Validator.showError(fields.ville, result.message);
            validationState.ville = false;
            return false;
        }
        
        result = Validator.validateVille(value);
        if (!result.valid) {
            Validator.showError(fields.ville, result.message);
            validationState.ville = false;
            return false;
        }
        
        Validator.clearError(fields.ville);
        fields.ville.classList.add('valid');
        validationState.ville = true;
        return true;
    }
    
    // Mapping des validateurs
    const validators = {
        prenom: validatePrenom,
        nom: validateNom,
        email: validateEmail,
        password: validatePassword,
        password_confirm: validatePasswordConfirm,
        adresse: validateAdresse,
        code_postal: validateCodePostal,
        ville: validateVille
    };
    
    // Attacher les écouteurs d'événements pour validation asynchrone
    Object.entries(fields).forEach(([name, input]) => {
        if (!input) return;
        
        input.addEventListener('input', () => {
            Validator.validateAsync(input, validators[name]);
        });
        
        input.addEventListener('blur', validators[name]);
    });
    
    // Affiche les erreurs globales
    function showGlobalErrors(errors) {
        globalErrors.innerHTML = errors.map(err => `<p>${err}</p>`).join('');
    }
    
    // Soumission du formulaire
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Empêcher les soumissions multiples
        if (submitBtn.classList.contains('loading')) {
            return;
        }
        
        // Effacer les erreurs globales
        globalErrors.innerHTML = '';
        
        // Valider tous les champs
        const validations = await Promise.all([
            validatePrenom(),
            validateNom(),
            validateEmail(),
            validatePassword(),
            validatePasswordConfirm(),
            validateAdresse(),
            validateCodePostal(),
            validateVille()
        ]);
        
        // Collecter les erreurs pour affichage global
        const errors = [];
        if (!validationState.prenom) errors.push('Firstname is required');
        if (!validationState.nom) errors.push('Lastname is required');
        if (!validationState.password) errors.push('Password is required');
        if (!Validator.patterns.password.test(fields.password.value)) {
            errors.push('Password format is wrong');
        }
        
        if (errors.length > 0) {
            showGlobalErrors(errors);
            // Focus sur le premier champ invalide
            for (const [name, isValid] of Object.entries(validationState)) {
                if (!isValid && fields[name]) {
                    fields[name].focus();
                    break;
                }
            }
            return;
        }
        
        // Vérifier si tous les champs sont valides
        const isValid = Object.values(validationState).every(v => v === true);
        
        if (!isValid) {
            return;
        }
        
        // Afficher le loader
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simuler un envoi au serveur
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Afficher un message de succès (simulation)
            alert('Inscription réussie ! (simulation)');
            form.reset();
            
            // Réinitialiser l'état de validation
            Object.keys(validationState).forEach(key => validationState[key] = false);
            Object.values(fields).forEach(input => {
                if (input) {
                    input.classList.remove('valid', 'invalid');
                }
            });
        }, 1500);
    });
});
