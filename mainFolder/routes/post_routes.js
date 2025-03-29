const express = require('express');
const router = express.Router();
const postController = require('../controllers/post_controller');
const path = require('path');



router.post('/', (req, res) => {
    try {
        postController.createPost(req, res);
    } catch (error) {
        console.error('Erreur dans la route POST:', error);
        res.status(500).json({ error: 'Erreur serveur dans la route POST' });
    }
});

router.get('/', (req, res) => {
    try {
        postController.getAllPosts(req, res);
    } catch (error) {
        console.error('Erreur dans la route GET /:', error);
        res.status(500).json({ error: 'Erreur serveur dans la route GET /' });
    }
});

module.exports = router;
