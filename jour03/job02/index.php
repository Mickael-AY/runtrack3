<!doctype html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Job 02 - Arc-en-ciel</title>
    <style>
        :root {
            --slot-w: 180px;
            --slot-h: 340px;
            --overlap: 42px
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            padding: 20px;
            background: #fbfdff;
        }

        .controls {
            margin-bottom: 12px;
        }

        button {
            margin-right: 8px;
            padding: 8px 12px;
        }

        .board {
            display: flex;
            flex-direction: column;
            gap: 16px;
            align-items: stretch;
        }

        .palette,
        .slots {
            border: 2px dashed #ddd;
            padding: 12px;
            border-radius: 6px;
        }

        /* Palette en ligne avec miniatures */
        .palette {
            width: 100%;
            min-height: 90px;
            display: flex;
            flex-direction: row;
            gap: 8px;
            align-items: center;
            overflow-x: auto;
        }

        /* Slots : affichage en ligne pour permettre chevauchement des tranches */
        .slots {
            display: flex;
            gap: 0;
            /* on gère le chevauchement via margin négatif sur les images */
            padding: 6px 0;
            justify-content: center;
            align-items: flex-end;
        }

        /* Hauteur/largeur des tranches; background transparent pour un rendu naturel */
        .slot {
            position: relative;
            width: var(--slot-w);
            height: var(--slot-h);
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: visible;
        }

        /* afficher le numéro du slot (repère) */
        .slot::before {
            content: attr(data-pos);
            position: absolute;
            left: 8px;
            top: 6px;
            font-size: 12px;
            color: #666;
            background: rgba(255, 255, 255, 0.6);
            padding: 2px 6px;
            border-radius: 3px;
        }

        /* En palette, les images gardent leur ratio; dans un slot elles remplissent le conteneur */
        /* Miniatures dans la palette */
        .palette img.piece {
            width: 120px;
            height: auto;
            object-fit: cover;
            cursor: grab;
            display: block;
        }

        /* Dans les slots, afficher la tranche et la chevaucher légèrement vers la gauche */
        .slot img.piece {
            height: 100%;
            width: auto;
            object-fit: contain;
            cursor: grab;
            display: block;
            /* chevauchement : décaler à gauche pour masquer les joints */
            margin-left: calc(-1 * var(--overlap));
            transition: transform 140ms ease, box-shadow 120ms ease;
        }

        /* première tranche non décalée */
        .slot:first-child img.piece {
            margin-left: 0
        }

        /* empilement : tranches à droite au-dessus des précédentes */
        .slot:nth-child(1) {
            z-index: 1
        }

        .slot:nth-child(2) {
            z-index: 2
        }

        .slot:nth-child(3) {
            z-index: 3
        }

        .slot:nth-child(4) {
            z-index: 4
        }

        .slot:nth-child(5) {
            z-index: 5
        }

        .slot:nth-child(6) {
            z-index: 6
        }

        /* léger effet au survol pour indiquer déplacement */
        .slot img.piece:hover {
            transform: translateY(-6px);
            box-shadow: 0 8px 24px rgba(20, 30, 60, 0.12)
        }

        .msg {
            margin-top: 12px;
            font-weight: 700;
        }

        .hidden {
            display: none;
        }
    </style>
</head>

<body>
    <h1>Job 02 — Reconstituer l'arc-en-ciel</h1>

    <div class="controls">
        <button id="shuffleBtn">Mélanger</button>
        <button id="checkBtn">Vérifier</button>
        <button id="resetBtn">Réinitialiser</button>
    </div>

    <div class="board">
        <div class="palette" id="palette" aria-label="Palette des pièces">
            <strong>Pièces (glisser)</strong>
        </div>

        <div>
            <div class="slots" id="slots" aria-label="Emplacements de l'arc-en-ciel">
                <!-- 6 slots verticalement (les numéros apparaissent via CSS) -->
                <div class="slot" data-pos="1"></div>
                <div class="slot" data-pos="2"></div>
                <div class="slot" data-pos="3"></div>
                <div class="slot" data-pos="4"></div>
                <div class="slot" data-pos="5"></div>
                <div class="slot" data-pos="6"></div>
            </div>
        </div>
    </div>

    <div id="result" class="msg hidden" role="status" aria-live="polite"></div>

    <script src="script.js"></script>
</body>

</html>