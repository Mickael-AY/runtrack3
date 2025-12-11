/**
 * Script de validation pour le formulaire de connexion
 */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('submitBtn');
    
    // Initialisation
    Validator.initCSRF();
    Validator.initPasswordToggle();
    
    // État de validation
    const validationState = {
        email: false,
        password: false
    };
    
    /**
     * Valide le champ email
     */
    async function validateEmail() {
        const value = emailInput.value.trim();
        
        // Validation required
        let result = Validator.validateRequired(value, 'Email');
        if (!result.valid) {
            Validator.showError(emailInput, result.message);
            validationState.email = false;
            return false;
        }
        
        // Validation format email
        result = Validator.validateEmail(value);
        if (!result.valid) {
            Validator.showError(emailInput, result.message);
            validationState.email = false;
            return false;
        }
        
        Validator.clearError(emailInput);
        emailInput.classList.add('valid');
        validationState.email = true;
        return true;
    }
    
    /**
     * Valide le champ mot de passe
     */
    async function validatePassword() {
        const value = passwordInput.value;
        
        // Validation required
        let result = Validator.validateRequired(value, 'Mot de passe');
        if (!result.valid) {
            Validator.showError(passwordInput, result.message);
            validationState.password = false;
            return false;
        }
        
        // Pour la connexion, on vérifie juste que le champ n'est pas vide
        // La validation complète du format sera faite côté serveur
        if (value.length < 1) {
            Validator.showError(passwordInput, 'Mot de passe requis');
            validationState.password = false;
            return false;
        }
        
        Validator.clearError(passwordInput);
        passwordInput.classList.add('valid');
        validationState.password = true;
        return true;
    }
    
    // Écouteurs d'événements pour validation asynchrone
    emailInput.addEventListener('input', () => {
        Validator.validateAsync(emailInput, validateEmail);
    });
    
    emailInput.addEventListener('blur', validateEmail);
    
    passwordInput.addEventListener('input', () => {
        Validator.validateAsync(passwordInput, validatePassword);
    });
    
    passwordInput.addEventListener('blur', validatePassword);
    
    // Soumission du formulaire
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Empêcher les soumissions multiples
        if (submitBtn.classList.contains('loading')) {
            return;
        }
        
        // Valider tous les champs
        await Promise.all([
            validateEmail(),
            validatePassword()
        ]);
        
        // Vérifier si tous les champs sont valides
        const isValid = Object.values(validationState).every(v => v === true);
        
        if (!isValid) {
            // Focus sur le premier champ invalide
            if (!validationState.email) {
                emailInput.focus();
            } else if (!validationState.password) {
                passwordInput.focus();
            }
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
            alert('Connexion réussie ! (simulation)');
        }, 1500);
    });
});
