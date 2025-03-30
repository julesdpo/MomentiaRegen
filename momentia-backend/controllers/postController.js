const supabase = require('../services/supabaseClient');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');

// Config multer pour stockage local
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${uuidv4()}${ext}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });
exports.uploadMiddleware = upload.single('image');


exports.createPost = async (req, res) => {
  const { user_id, content } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ error: 'Image requise' });

  const image_url = `http://localhost:3000/uploads/${file.filename}`;

  try {
    const { data, error } = await supabase.from('posts').insert([
      {
        id: uuidv4(),
        user_id,
        content,
        image_url,
      },
    ]);

    if (error) throw error;

    res.status(201).json({ message: 'Post créé avec succès', post: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          content,
          image_url,
          created_at,
          user_id,
          users (
            username,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });
  
      if (error) throw error;
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  