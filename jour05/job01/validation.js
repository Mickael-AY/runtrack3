/**
 * Module de validation asynchrone des formulaires
 * Sécurités front-end implémentées :
 * 
 * 1. Validation en temps réel (asynchrone avec debounce)
 * 2. Sanitisation des entrées (XSS prevention)
 * 3. Validation regex stricte
 * 4. Protection contre les soumissions multiples
 * 5. Token CSRF (simulé)
 * 6. Indicateur de force du mot de passe
 * 7. Messages d'erreur accessibles (ARIA)
 * 8. Rate limiting sur la validation
 */

const Validator = {
    // Debounce timers pour validation asynchrone
    timers: {},
    
    // Délai de debounce en ms
    debounceDelay: 300,
    
    // Patterns de validation
    patterns: {
        email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        // Mot de passe : min 8 chars, 1 lettre, 1 chiffre, 1 caractère spécial
        password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.,:;_\-+=])[A-Za-z\d@$!%*#?&.,:;_\-+=]{8,}$/,
        // Nom/Prénom : lettres, espaces, tirets, apostrophes
        name: /^[a-zA-ZÀ-ÿ\s\-']{2,50}$/,
        // Code postal français
        codePostal: /^[0-9]{5}$/,
        // Adresse
        adresse: /^[a-zA-Z0-9À-ÿ\s\-',\.]{5,200}$/,
        // Ville
        ville: /^[a-zA-ZÀ-ÿ\s\-']{2,100}$/
    },
    
    // Messages d'erreur
    messages: {
        required: (field) => `${field} est requis`,
        minLength: (field, min) => `${field} doit contenir au moins ${min} caractères`,
        maxLength: (field, max) => `${field} ne doit pas dépasser ${max} caractères`,
        email: 'Adresse email invalide',
        password: 'Minimum 8 caractères, 1 lettre, 1 chiffre et 1 caractère spécial',
        passwordMatch: 'Les mots de passe ne correspondent pas',
        name: 'Caractères non autorisés (lettres, espaces, tirets uniquement)',
        codePostal: 'Code postal invalide (5 chiffres)',
        adresse: 'Adresse invalide',
        ville: 'Ville invalide'
    },
    
    /**
     * Sanitise une chaîne pour prévenir XSS
     */
    sanitize(str) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '/': '&#x2F;'
        };
        return str.replace(/[&<>"'/]/g, char => map[char]);
    },
    
    /**
     * Validation asynchrone avec debounce
     */
    validateAsync(input, validationFn, delay = this.debounceDelay) {
        return new Promise((resolve) => {
            const inputId = input.id;
            
            // Clear previous timer
            if (this.timers[inputId]) {
                clearTimeout(this.timers[inputId]);
            }
            
            // Set input to validating state
            input.classList.remove('valid', 'invalid');
            input.classList.add('validating');
            
            // Debounced validation
            this.timers[inputId] = setTimeout(async () => {
                const result = await validationFn(input);
                input.classList.remove('validating');
                
                if (result.valid) {
                    input.classList.remove('invalid');
                    input.classList.add('valid');
                } else {
                    input.classList.remove('valid');
                    input.classList.add('invalid');
                }
                
                resolve(result);
            }, delay);
        });
    },
    
    /**
     * Affiche un message d'erreur
     */
    showError(input, message) {
        const errorEl = document.getElementById(`${input.id}-error`);
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.style.display = 'block';
        }
        input.classList.remove('valid');
        input.classList.add('invalid');
        input.setAttribute('aria-invalid', 'true');
    },
    
    /**
     * Efface le message d'erreur
     */
    clearError(input) {
        const errorEl = document.getElementById(`${input.id}-error`);
        if (errorEl) {
            errorEl.textContent = '';
        }
        input.classList.remove('invalid');
        input.removeAttribute('aria-invalid');
    },
    
    /**
     * Affiche un message de succès
     */
    showSuccess(input, message) {
        const successEl = document.getElementById(`${input.id}-success`);
        if (successEl) {
            successEl.textContent = message;
        }
        input.classList.remove('invalid');
        input.classList.add('valid');
    },
    
    /**
     * Valide un champ requis
     */
    validateRequired(value, fieldName) {
        if (!value || value.trim() === '') {
            return { valid: false, message: this.messages.required(fieldName) };
        }
        return { valid: true };
    },
    
    /**
     * Valide la longueur minimale
     */
    validateMinLength(value, min, fieldName) {
        if (value.length < min) {
            return { valid: false, message: this.messages.minLength(fieldName, min) };
        }
        return { valid: true };
    },
    
    /**
     * Valide la longueur maximale
     */
    validateMaxLength(value, max, fieldName) {
        if (value.length > max) {
            return { valid: false, message: this.messages.maxLength(fieldName, max) };
        }
        return { valid: true };
    },
    
    /**
     * Valide un email
     */
    validateEmail(value) {
        if (!this.patterns.email.test(value)) {
            return { valid: false, message: this.messages.email };
        }
        return { valid: true };
    },
    
    /**
     * Valide un mot de passe
     */
    validatePassword(value) {
        if (!this.patterns.password.test(value)) {
            return { valid: false, message: this.messages.password };
        }
        return { valid: true };
    },
    
    /**
     * Valide la confirmation du mot de passe
     */
    validatePasswordMatch(password, confirmation) {
        if (password !== confirmation) {
            return { valid: false, message: this.messages.passwordMatch };
        }
        return { valid: true };
    },
    
    /**
     * Valide un nom/prénom
     */
    validateName(value, fieldName) {
        if (!this.patterns.name.test(value)) {
            return { valid: false, message: `La taille de votre ${fieldName.toLowerCase()} est trop petite` };
        }
        return { valid: true };
    },
    
    /**
     * Valide un code postal
     */
    validateCodePostal(value) {
        if (!this.patterns.codePostal.test(value)) {
            return { valid: false, message: this.messages.codePostal };
        }
        return { valid: true };
    },
    
    /**
     * Valide une adresse
     */
    validateAdresse(value) {
        if (!this.patterns.adresse.test(value)) {
            return { valid: false, message: this.messages.adresse };
        }
        return { valid: true };
    },
    
    /**
     * Valide une ville
     */
    validateVille(value) {
        if (!this.patterns.ville.test(value)) {
            return { valid: false, message: this.messages.ville };
        }
        return { valid: true };
    },
    
    /**
     * Calcule la force du mot de passe
     */
    getPasswordStrength(password) {
        let score = 0;
        
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[@$!%*#?&.,:;_\-+=]/.test(password)) score++;
        
        if (score <= 1) return { level: 'weak', text: 'Faible', percent: 25 };
        if (score === 2) return { level: 'fair', text: 'Moyen', percent: 50 };
        if (score === 3) return { level: 'good', text: 'Bon', percent: 75 };
        return { level: 'strong', text: 'Fort', percent: 100 };
    },
    
    /**
     * Met à jour l'indicateur de force du mot de passe
     */
    updatePasswordStrength(input) {
        const strengthEl = document.getElementById('password-strength');
        if (!strengthEl) return;
        
        const password = input.value;
        
        if (password.length === 0) {
            strengthEl.classList.remove('visible');
            return;
        }
        
        strengthEl.classList.add('visible');
        const strength = this.getPasswordStrength(password);
        
        const bar = strengthEl.querySelector('.strength-bar');
        const text = strengthEl.querySelector('.strength-text');
        
        bar.className = 'strength-bar ' + strength.level;
        text.className = 'strength-text ' + strength.level;
        text.textContent = strength.text;
    },
    
    /**
     * Génère un token CSRF (simulation)
     */
    generateCSRFToken() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    },
    
    /**
     * Initialise le token CSRF
     */
    initCSRF() {
        const tokenInput = document.getElementById('csrf_token');
        if (tokenInput) {
            tokenInput.value = this.generateCSRFToken();
        }
    },
    
    /**
     * Toggle visibilité mot de passe
     */
    initPasswordToggle() {
        document.querySelectorAll('.toggle-password').forEach(btn => {
            btn.addEventListener('click', () => {
                const input = btn.parentElement.querySelector('input');
                const type = input.type === 'password' ? 'text' : 'password';
                input.type = type;
                btn.textContent = type === 'password' ? '👁️' : '🙈';
                btn.setAttribute('aria-label', 
                    type === 'password' ? 'Afficher le mot de passe' : 'Masquer le mot de passe'
                );
            });
        });
    }
};

// Export pour utilisation dans d'autres scripts
window.Validator = Validator;
