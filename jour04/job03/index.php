<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job 03 - Filtrer les Pokémon</title>
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }

        h1 {
            color: #fff;
            text-align: center;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .filter-form {
            background: #fff;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            margin-bottom: 24px;
        }

        .filter-form h2 {
            margin-top: 0;
            color: #333;
        }

        .form-group {
            margin-bottom: 16px;
        }

        label {
            display: block;
            margin-bottom: 6px;
            font-weight: 600;
            color: #555;
        }

        input[type="text"],
        select {
            width: 100%;
            padding: 10px 14px;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.2s;
        }

        input[type="text"]:focus,
        select:focus {
            outline: none;
            border-color: #667eea;
        }

        input[type="button"] {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #fff;
            border: none;
            padding: 12px 32px;
            font-size: 16px;
            font-weight: 600;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        input[type="button"]:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        #results {
            background: #fff;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }

        #results h2 {
            margin-top: 0;
            color: #333;
        }

        .pokemon-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 16px;
        }

        .pokemon-card {
            background: linear-gradient(145deg, #f0f0f0, #fff);
            border-radius: 10px;
            padding: 16px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s;
        }

        .pokemon-card:hover {
            transform: translateY(-4px);
        }

        .pokemon-id {
            font-size: 12px;
            color: #999;
            margin-bottom: 4px;
        }

        .pokemon-nom {
            font-size: 18px;
            font-weight: 700;
            color: #333;
            margin-bottom: 8px;
        }

        .pokemon-type {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            color: #fff;
        }

        /* Couleurs par type */
        .type-plante {
            background: #78C850;
        }

        .type-feu {
            background: #F08030;
        }

        .type-eau {
            background: #6890F0;
        }

        .type-insecte {
            background: #A8B820;
        }

        .type-vol {
            background: #A890F0;
        }

        .type-normal {
            background: #A8A878;
        }

        .type-poison {
            background: #A040A0;
        }

        .type-elektrik {
            background: #F8D030;
            color: #333;
        }

        .type-sol {
            background: #E0C068;
        }

        .no-results {
            text-align: center;
            color: #999;
            padding: 40px;
            font-style: italic;
        }

        .count {
            color: #666;
            margin-bottom: 16px;
        }
    </style>
</head>

<body>
    <h1>🔍 Filtrer les Pokémon</h1>

    <div class="filter-form">
        <h2>Critères de recherche</h2>
        <div class="form-group">
            <label for="filterId">ID :</label>
            <input type="text" id="filterId" name="id" placeholder="Ex: 25">
        </div>
        <div class="form-group">
            <label for="filterNom">Nom :</label>
            <input type="text" id="filterNom" name="nom" placeholder="Ex: Pikachu">
        </div>
        <div class="form-group">
            <label for="filterType">Type :</label>
            <select id="filterType" name="type">
                <option value="">-- Tous les types --</option>
                <option value="Plante">Plante</option>
                <option value="Feu">Feu</option>
                <option value="Eau">Eau</option>
                <option value="Insecte">Insecte</option>
                <option value="Vol">Vol</option>
                <option value="Normal">Normal</option>
                <option value="Poison">Poison</option>
                <option value="Électrik">Électrik</option>
                <option value="Sol">Sol</option>
            </select>
        </div>
        <input type="button" id="filterBtn" value="Filtrer">
    </div>

    <div id="results">
        <h2>Résultats</h2>
        <p class="no-results">Cliquez sur "Filtrer" pour afficher les Pokémon.</p>
    </div>

    <script src="script.js"></script>
</body>

</html>