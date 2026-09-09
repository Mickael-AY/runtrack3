<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulaire d'inscription</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Font Awesome pour les icônes -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>

<body class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
    <!-- Header avec navigation - Job 02 -->
    <header class="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
        <nav class="container mx-auto px-6 py-4">
            <ul class="flex justify-center space-x-8">
                <li><a href="index.php" class="text-white hover:text-indigo-200 transition duration-300 font-semibold flex items-center gap-2">
                        <i class="fas fa-home"></i> Accueil
                    </a></li>
                <li><a href="index.php" class="text-white hover:text-indigo-200 transition duration-300 font-semibold flex items-center gap-2">
                        <i class="fas fa-user-plus"></i> Inscription
                    </a></li>
                <li><a href="index.php" class="text-white hover:text-indigo-200 transition duration-300 font-semibold flex items-center gap-2">
                        <i class="fas fa-sign-in-alt"></i> Connexion
                    </a></li>
                <li><a href="index.php" class="text-white hover:text-indigo-200 transition duration-300 font-semibold flex items-center gap-2">
                        <i class="fas fa-search"></i> Rechercher
                    </a></li>
            </ul>
        </nav>
    </header>

    <!-- Section avec formulaire de création de compte - Job 04 -->
    <section class="container mx-auto px-6 py-12">
        <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
            <h1 class="text-4xl font-bold text-center text-indigo-600 mb-8 flex items-center justify-center gap-3">
                <i class="fas fa-user-circle"></i> Créer un compte
            </h1>

            <form action="index.php" method="POST" class="space-y-6">
                <!-- Civilité -->
                <fieldset class="border-2 border-indigo-200 rounded-lg p-4 bg-indigo-50">
                    <legend class="text-lg font-semibold text-indigo-700 px-2">
                        <i class="fas fa-venus-mars"></i> Civilité
                    </legend>
                    <div class="flex gap-6 mt-2">
                        <label class="flex items-center cursor-pointer hover:text-indigo-600 transition">
                            <input type="radio" name="civilite" value="Monsieur" required class="w-4 h-4 text-indigo-600 focus:ring-indigo-500">
                            <span class="ml-2">Monsieur</span>
                        </label>
                        <label class="flex items-center cursor-pointer hover:text-indigo-600 transition">
                            <input type="radio" name="civilite" value="Madame" required class="w-4 h-4 text-indigo-600 focus:ring-indigo-500">
                            <span class="ml-2">Madame</span>
                        </label>
                        <label class="flex items-center cursor-pointer hover:text-indigo-600 transition">
                            <input type="radio" name="civilite" value="Autre" required class="w-4 h-4 text-indigo-600 focus:ring-indigo-500">
                            <span class="ml-2">Autre</span>
                        </label>
                    </div>
                </fieldset>

                <!-- Prénom -->
                <div class="relative">
                    <label for="prenom" class="block text-sm font-semibold text-gray-700 mb-2">
                        <i class="fas fa-user text-indigo-500"></i> Prénom
                    </label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <i class="fas fa-user"></i>
                        </span>
                        <input type="text" id="prenom" name="prenom" required
                            class="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm hover:shadow-md">
                    </div>
                </div>

                <!-- Nom -->
                <div class="relative">
                    <label for="nom" class="block text-sm font-semibold text-gray-700 mb-2">
                        <i class="fas fa-user-tag text-indigo-500"></i> Nom
                    </label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <i class="fas fa-user-tag"></i>
                        </span>
                        <input type="text" id="nom" name="nom" required
                            class="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm hover:shadow-md">
                    </div>
                </div>

                <!-- Adresse -->
                <div class="relative">
                    <label for="adresse" class="block text-sm font-semibold text-gray-700 mb-2">
                        <i class="fas fa-map-marker-alt text-indigo-500"></i> Adresse
                    </label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <i class="fas fa-map-marker-alt"></i>
                        </span>
                        <input type="text" id="adresse" name="adresse" required
                            class="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm hover:shadow-md">
                    </div>
                </div>

                <!-- Email -->
                <div class="relative">
                    <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                        <i class="fas fa-envelope text-indigo-500"></i> Adresse email
                    </label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <i class="fas fa-envelope"></i>
                        </span>
                        <input type="email" id="email" name="email" required
                            class="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm hover:shadow-md">
                    </div>
                </div>

                <!-- Password -->
                <div class="relative">
                    <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
                        <i class="fas fa-lock text-indigo-500"></i> Mot de passe
                    </label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <i class="fas fa-lock"></i>
                        </span>
                        <input type="password" id="password" name="password" required
                            class="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm hover:shadow-md">
                    </div>
                </div>

                <!-- Validation du password -->
                <div class="relative">
                    <label for="password_confirm" class="block text-sm font-semibold text-gray-700 mb-2">
                        <i class="fas fa-check-circle text-indigo-500"></i> Confirmer le mot de passe
                    </label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <i class="fas fa-check-circle"></i>
                        </span>
                        <input type="password" id="password_confirm" name="password_confirm" required
                            class="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm hover:shadow-md">
                    </div>
                </div>

                <!-- Passions -->
                <fieldset class="border-2 border-purple-200 rounded-lg p-4 bg-purple-50">
                    <legend class="text-lg font-semibold text-purple-700 px-2">
                        <i class="fas fa-heart"></i> Vos passions
                    </legend>
                    <div class="grid grid-cols-2 gap-4 mt-3">
                        <label class="flex items-center cursor-pointer hover:text-purple-600 transition bg-white p-3 rounded-lg shadow-sm hover:shadow-md">
                            <input type="checkbox" name="passions[]" value="informatique" class="w-5 h-5 text-purple-600 focus:ring-purple-500 rounded">
                            <span class="ml-3 flex items-center gap-2">
                                <i class="fas fa-laptop-code"></i> Informatique
                            </span>
                        </label>
                        <label class="flex items-center cursor-pointer hover:text-purple-600 transition bg-white p-3 rounded-lg shadow-sm hover:shadow-md">
                            <input type="checkbox" name="passions[]" value="voyages" class="w-5 h-5 text-purple-600 focus:ring-purple-500 rounded">
                            <span class="ml-3 flex items-center gap-2">
                                <i class="fas fa-plane"></i> Voyages
                            </span>
                        </label>
                        <label class="flex items-center cursor-pointer hover:text-purple-600 transition bg-white p-3 rounded-lg shadow-sm hover:shadow-md">
                            <input type="checkbox" name="passions[]" value="sport" class="w-5 h-5 text-purple-600 focus:ring-purple-500 rounded">
                            <span class="ml-3 flex items-center gap-2">
                                <i class="fas fa-futbol"></i> Sport
                            </span>
                        </label>
                        <label class="flex items-center cursor-pointer hover:text-purple-600 transition bg-white p-3 rounded-lg shadow-sm hover:shadow-md">
                            <input type="checkbox" name="passions[]" value="lecture" class="w-5 h-5 text-purple-600 focus:ring-purple-500 rounded">
                            <span class="ml-3 flex items-center gap-2">
                                <i class="fas fa-book"></i> Lecture
                            </span>
                        </label>
                    </div>
                </fieldset>

                <!-- Bouton de validation -->
                <div class="pt-4">
                    <button type="submit" class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300 flex items-center justify-center gap-2">
                        <i class="fas fa-paper-plane"></i> Valider mon inscription
                    </button>
                </div>
            </form>
        </div>
    </section>

    <!-- Footer avec liste de liens - Job 03 -->
    <footer class="bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-12">
        <div class="container mx-auto px-6 py-8">
            <ul class="flex justify-center space-x-8 flex-wrap">
                <li><a href="index.php" class="hover:text-indigo-400 transition duration-300 flex items-center gap-2 font-medium">
                        <i class="fas fa-home"></i> Accueil
                    </a></li>
                <li><a href="index.php" class="hover:text-indigo-400 transition duration-300 flex items-center gap-2 font-medium">
                        <i class="fas fa-user-plus"></i> Inscription
                    </a></li>
                <li><a href="index.php" class="hover:text-indigo-400 transition duration-300 flex items-center gap-2 font-medium">
                        <i class="fas fa-sign-in-alt"></i> Connexion
                    </a></li>
                <li><a href="index.php" class="hover:text-indigo-400 transition duration-300 flex items-center gap-2 font-medium">
                        <i class="fas fa-search"></i> Rechercher
                    </a></li>
            </ul>
            <p class="text-center text-gray-400 mt-6 text-sm">
                © 2025 - Tous droits réservés
            </p>
        </div>
    </footer>
</body>

</html>