const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const supabase = require('../services/supabaseClient');

// POST : Créer un post
router.post(
  '/',
  postController.uploadMiddleware,
  postController.createPost
);

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*, users(id, username, avatar_url)')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});


// GET : Posts par utilisateur
router.get('/by-user/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;
