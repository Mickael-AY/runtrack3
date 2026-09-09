-- Création de la base de données utilisateurs
CREATE DATABASE IF NOT EXISTS utilisateurs CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE utilisateurs;

-- Création de la table utilisateurs
CREATE TABLE IF NOT EXISTS utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

-- Insertion de quelques utilisateurs de test
INSERT INTO utilisateurs (nom, prenom, email) VALUES
('Dupont', 'Jean', 'jean.dupont@email.com'),
('Martin', 'Marie', 'marie.martin@email.com'),
('Bernard', 'Pierre', 'pierre.bernard@email.com'),
('Durand', 'Sophie', 'sophie.durand@email.com'),
('Petit', 'Lucas', 'lucas.petit@email.com');
