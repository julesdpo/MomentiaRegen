const supabase = require('../services/supabaseClient');
const { v4: uuidv4 } = require('uuid');

// Ajouter un commentaire
exports.addComment = async (req, res) => {
  const { user_id, post_id, content } = req.body;

  try {
    const { data, error } = await supabase.from('comments').insert([
      {
        id: uuidv4(),
        user_id,
        post_id,
        content,
      },
    ]);

    if (error) throw error;

    res.status(201).json({ message: 'Commentaire ajouté' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer les commentaires d’un post
exports.getComments = async (req, res) => {
  const { post_id } = req.params;

  try {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        id,
        content,
        created_at,
        users (
          username,
          avatar_url
        )
      `)
      .eq('post_id', post_id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
