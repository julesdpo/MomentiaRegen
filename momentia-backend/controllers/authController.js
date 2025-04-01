const supabase = require('../services/supabaseClient');
const bcryptjs = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

/**
 * REGISTER — Inscription
 */
exports.register = async (req, res) => {
  const { username, email, password, avatar_url } = req.body;

  try {
    // Vérifie si l'email existe déjà
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          id: uuidv4(),
          username,
          email,
          password: hashedPassword,
          avatar_url
        }
      ]);

    if (error) throw error;

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * LOGIN — Connexion
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (!user) return res.status(401).json({ message: 'Identifiants incorrects' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Mot de passe incorrect' });

    res.status(200).json({
      message: 'Connexion réussie',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar_url: user.avatar_url
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
