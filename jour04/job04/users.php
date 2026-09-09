<?php
// Configuration de l'en-tête pour retourner du JSON
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

// Paramètres de connexion à la base de données
$host = 'localhost';
$dbname = 'utilisateurs';
$username = 'root';
$password = '';  // Mot de passe vide par défaut sur Laragon

try {
    // Connexion à la base de données avec PDO
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );

    // Récupération de tous les utilisateurs
    $stmt = $pdo->query('SELECT id, nom, prenom, email FROM utilisateurs ORDER BY id');
    $utilisateurs = $stmt->fetchAll();

    // Retourne les données au format JSON
    echo json_encode($utilisateurs, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} catch (PDOException $e) {
    // En cas d'erreur, retourne un message d'erreur en JSON
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => 'Erreur de connexion à la base de données: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
