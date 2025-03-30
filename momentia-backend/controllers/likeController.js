const supabase = require('../services/supabaseClient');
const { v4: uuidv4 } = require('uuid');

exports.likePost = async (req, res) => {
  const { user_id, post_id } = req.body;

  try {
    const { data: existing } = await supabase
      .from('likes')
      .select('*')
      .eq('user_id', user_id)
      .eq('post_id', post_id)
      .single();

    if (existing) {
      await supabase.from('likes').delete().eq('id', existing.id);
      return res.status(200).json({ message: 'Like retiré' });
    }

    await supabase.from('likes').insert([
      { id: uuidv4(), user_id, post_id },
    ]);

    res.status(201).json({ message: 'Like ajouté' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
