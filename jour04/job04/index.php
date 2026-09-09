<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job 04 - Liste des Utilisateurs</title>
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            min-height: 100vh;
        }

        h1 {
            color: #fff;
            text-align: center;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .container {
            background: #fff;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .header h2 {
            margin: 0;
            color: #333;
        }

        #updateBtn {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: #fff;
            border: none;
            padding: 12px 24px;
            font-size: 16px;
            font-weight: 600;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        #updateBtn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(30, 60, 114, 0.4);
        }

        #updateBtn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        #updateBtn .spinner {
            display: none;
            width: 16px;
            height: 16px;
            border: 2px solid #fff;
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }

        #updateBtn.loading .spinner {
            display: inline-block;
        }

        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 16px;
        }

        thead {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: #fff;
        }

        th,
        td {
            padding: 14px 16px;
            text-align: left;
            border-bottom: 1px solid #e0e0e0;
        }

        th {
            font-weight: 600;
            text-transform: uppercase;
            font-size: 13px;
            letter-spacing: 0.5px;
        }

        tbody tr {
            transition: background-color 0.2s;
        }

        tbody tr:hover {
            background-color: #f5f7fa;
        }

        tbody tr:nth-child(even) {
            background-color: #fafbfc;
        }

        tbody tr:nth-child(even):hover {
            background-color: #f0f2f5;
        }

        .id-cell {
            font-weight: 600;
            color: #1e3c72;
        }

        .email-cell {
            color: #2a5298;
        }

        .status {
            text-align: center;
            padding: 40px;
            color: #666;
        }

        .status.error {
            color: #e74c3c;
        }

        .count {
            color: #666;
            font-size: 14px;
        }

        .empty-message {
            text-align: center;
            padding: 40px;
            color: #999;
            font-style: italic;
        }

        .last-update {
            font-size: 12px;
            color: #999;
            margin-top: 16px;
            text-align: right;
        }
    </style>
</head>

<body>
    <h1>👥 Gestion des Utilisateurs</h1>

    <div class="container">
        <div class="header">
            <div>
                <h2>Liste des utilisateurs</h2>
                <span id="count" class="count"></span>
            </div>
            <button id="updateBtn">
                <span class="spinner"></span>
                🔄 Update
            </button>
        </div>

        <table id="usersTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody id="usersBody">
                <tr>
                    <td colspan="4" class="status">Cliquez sur "Update" pour charger les utilisateurs.</td>
                </tr>
            </tbody>
        </table>

        <div id="lastUpdate" class="last-update"></div>
    </div>

    <script src="script.js"></script>
</body>

</html>