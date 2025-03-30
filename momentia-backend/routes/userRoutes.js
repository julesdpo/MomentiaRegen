// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const supabase = require('../services/supabaseClient');

router.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Requête vide' });

  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, username, email, avatar_url')
      .ilike('username', `%${q}%`);

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('Erreur search users:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('users')
    .select('id, username, email, avatar_url')
    .eq('id', id)
    .maybeSingle(); 

  if (error) return res.status(500).json({ error: error.message });
  if (!data) return res.status(404).json({ error: 'Utilisateur introuvable' });

  res.json(data);
});




module.exports = router;
