const supabase = require('../services/supabaseClient');
const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');

router.post('/', likeController.likePost);

router.get('/count/:post_id', async (req, res) => {
    const { post_id } = req.params;
    const { data, error, count } = await supabase
      .from('likes')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', post_id);
  
    if (error) return res.status(500).json({ error: error.message });
    res.json({ count });
  });


module.exports = router;
