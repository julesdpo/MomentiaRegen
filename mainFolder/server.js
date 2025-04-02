const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('./config/db');
const postController = require('./controllers/post_controller');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());

const uploadsDir = process.env.UPLOADS_DIR;
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log(`📂 Directory created: ${uploadsDir}`);
}

const storage = multer.diskStorage({
    destination: uploadsDir,
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Upload and create post route
app.post('/api/posts', upload.single('image'), postController.createPost);

// Static serving for uploaded images
app.use('/uploads', express.static(uploadsDir));

// Load other post routes (GETs)
const postRoutes = require('./routes/post_routes');
app.use('/api/posts', postRoutes);

// Home route
app.get('/', (req, res) => {
    res.send('Bienvenue sur lAPI Momentia 🚀');
});

// Error handling for multer and general errors
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        console.error("❌ Multer Error:", err.message);
        return res.status(400).json({ error: err.message });
    } else if (err.message === 'Unexpected end of form') {
        console.error("❌ Form Error:", err.message);
        return res.status(400).json({ error: 'Incomplete form submission' });
    } else if (err) {
        console.error("❌ Unexpected Error:", err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
    next();
});

// DB test route
app.get('/db-test', (req, res) => {
    db.query('SELECT NOW()', (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Connexion à la DB réussie', time: result[0] });
    });
});

// Get single post
app.get('/api/posts/:id', (req, res) => {
    const postId = req.params.id;
    db.query('SELECT * FROM posts WHERE id = ?', postId, ( (err, result) => {
        if (err) {
            console.error("❌ Erreur SQL :", err);
            return res.status(500).json({ error: err.message });
        }
        console.log("✅ Post récupéré :", result);
        res.json(result[0]);
    }));
});

// Get all users
app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.error("❌ Erreur SQL :", err);
            return res.status(500).json({ error: err.message });
        }
        console.log("✅ Users récupérés :", result);
        res.json(result);
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
