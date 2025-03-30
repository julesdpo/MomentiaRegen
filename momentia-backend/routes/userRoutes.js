const express = require('express');
const router = express.Router();
const supabase = require('../services/supabaseClient');

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('users')
    .select('id, username, email, avatar_url')
    .eq('id', id)
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});
router.get('/search', async (req, res) => {
  const { q } = req.query;
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .ilike('username', `%${q}%`)
    .limit(20);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/following-ids/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('follows')
    .select('following_id')
    .eq('follower_id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/search/:query', async (req, res) => {
  const { query } = req.params;
  const { data, error } = await supabase
    .from('users')
    .select('id, username, email, avatar_url')
    .ilike('username', `%${query}%`);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});


module.exports = router;
