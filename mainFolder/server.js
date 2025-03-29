const express = require('express');
const cors = require('cors');

const db = require('./config/db');  // Import de la connexion DB

const app = express();
const PORT = 3000;
app.use(cors());
const postRoutes = require('./routes/post_routes');

const path = require('path'); 

// Update static file serving path
app.use('/uploads', express.static(path.join(__dirname, '../../frontend/public/images')));

app.use('/api/posts', postRoutes); // Use post routes without multer

// Route d'accueil
app.get('/', (req, res) => {
    res.send('Bienvenue sur lAPI Momentia 🚀');
});

// Route test de la base de données
app.get('/db-test', (req, res) => {
    db.query('SELECT NOW()', (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Connexion à la DB réussie', time: result[0] });
    });
});

app.get('/api/posts/:id', (req, res) => {
    const postId = req.params.id;
    db.query('SELECT * FROM posts WHERE id = ?', postId, (err, result) => {
        if (err) {
            console.error("❌ Erreur SQL :", err); // ✅ Ajoute ce log
            return res.status(500).json({ error: err.message });
        }
        console.log("✅ Post récupéré :", result); // ✅ Voir le contenu récupéré
        res.json(result[0]);
    });
});

app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.error("❌ Erreur SQL :", err); // ✅ Ajoute ce log
            return res.status(500).json({ error: err.message });
        }
        console.log("✅ Users récupérés :", result); // ✅ Voir le contenu récupéré
        res.json(result);
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
