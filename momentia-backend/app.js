const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const likeRoutes = require('./routes/likeRoutes');
const commentRoutes = require('./routes/commentRoutes');
const userRoutes = require('./routes/userRoutes');
const followRoutes = require('./routes/followRoutes');


// Middlewares
app.use(cors());
app.use(express.json());

// Routes (on les ajoutera ici au fur et à mesure)
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/likes', likeRoutes);
app.use('/comments', commentRoutes);
app.use('/users', userRoutes);
app.use('/follows', followRoutes);


app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Momentia Backend is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


