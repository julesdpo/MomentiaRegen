const express = require('express');
const router = express.Router();
const supabase = require('../services/supabaseClient');

// ✅ Route : Liste des utilisateurs suivis par un utilisateur donné
router.get('/following-ids/:userId', async (req, res) => {
  const { userId } = req.params;

  const { data, error } = await supabase
    .from('follows')
    .select('following_id')
    .eq('follower_id', userId);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ✅ Route : Rechercher des utilisateurs avec enrichissement follow
router.get('/search-enriched', async (req, res) => {
  const { q, currentUser } = req.query;
  if (!q || !currentUser) return res.status(400).json({ error: 'Paramètres manquants' });

  const { data: users, error } = await supabase
    .from('users')
    .select('id, username, avatar_url')
    .ilike('username', `%${q}%`)
    .neq('id', currentUser);

  if (error) return res.status(500).json({ error: error.message });

  const { data: follows } = await supabase
    .from('follows')
    .select('id, following_id')
    .eq('follower_id', currentUser);

  const followedMap = Object.fromEntries(follows.map(f => [f.following_id, f.id]));

  const enriched = users.map(user => ({
    ...user,
    is_followed: followedMap[user.id] !== undefined,
    follow_id: followedMap[user.id] || null,
  }));

  res.json(enriched);
});

// ✅ Route basique (si t’en as encore besoin)
router.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Requête vide' });

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .ilike('username', `%${q}%`);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/stats/:userId', async (req, res) => {
  const { userId } = req.params;

  const [followers, following] = await Promise.all([
    supabase.from('follows').select('id', { count: 'exact' }).eq('following_id', userId),
    supabase.from('follows').select('id', { count: 'exact' }).eq('follower_id', userId)
  ]);

  res.json({
    followers: followers.count || 0,
    following: following.count || 0
  });
});

router.post('/follow', async (req, res) => {
  const { follower_id, following_id } = req.body;

  if (!follower_id || !following_id)
    return res.status(400).json({ error: 'Champs manquants' });

  const { error } = await supabase
    .from('follows')
    .insert([{ follower_id, following_id }]);

  if (error) return res.status(500).json({ error: error.message });

  res.json({ message: 'Follow success' });
});

router.post('/unfollow', async (req, res) => {
  const { follower_id, following_id } = req.body;
  const { error } = await supabase
    .from('follows')
    .delete()
    .eq('follower_id', follower_id)
    .eq('following_id', following_id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ message: 'Unfollowed' });
});

module.exports = router;
