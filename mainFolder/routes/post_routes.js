const express = require('express');
const router = express.Router();
const postController = require('../controllers/post_controller');

// GET all posts
router.get('/', (req, res) => {
    try {
        postController.getAllPosts(req, res);
    } catch (error) {
        console.error('Erreur dans la route GET /:', error);
        res.status(500).json({ error: 'Erreur serveur dans la route GET /' });
    }
});

// Autres routes GET si besoin ici...

module.exports = router;
