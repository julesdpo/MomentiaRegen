const express = require('express');
const router = express.Router();
const postController = require('../controllers/post_controller');
const path = require('path');

// Supprimé : const uploadMiddleware = require('../middleware/multer-config');

router.post('/', (req, res) => {
    try {
        postController.createPost(req, res);
    } catch (error) {
        console.error('Erreur dans la route POST:', error);
        res.status(500).json({ error: 'Erreur serveur dans la route POST' });
    }
});

module.exports = router;
