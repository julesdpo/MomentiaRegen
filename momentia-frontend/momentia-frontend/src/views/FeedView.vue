<template>
  <div class="max-w-xl mx-auto mt-8 space-y-8">
    <div
      v-for="post in posts"
      :key="post.id"
      class="bg-white rounded-xl shadow overflow-hidden"
    >
      <!-- Auteur -->
      <div class="flex items-center p-4">
        <img
          :src="post.users?.avatar_url || 'https://i.pravatar.cc/80?u=placeholder'"
          class="w-12 h-12 rounded-full mr-3"
        />
        <span class="font-semibold">
          {{ post.users?.username || 'Utilisateur inconnu' }}
        </span>
      </div>

      <!-- Image -->
      <img
        :src="post.image_url"
        alt="post"
        class="w-full object-cover max-h-[600px]"
      />

      <!-- Contenu -->
      <div class="p-4 space-y-3">
        <p>{{ post.content }}</p>

        <!-- Likes -->
        <div class="flex items-center gap-3">
          <button
            @click="likePost(post.id)"
            class="text-red-500 hover:scale-105 transition"
          >
            ❤️ J’aime
          </button>
          <span class="text-sm text-gray-500">
            {{ likeCountByPost[post.id] || 0 }} like(s)
          </span>
        </div>

        <!-- Voir les commentaires -->
        <button
          class="text-blue-600 text-sm"
          @click="toggleComments(post.id)"
        >
          {{ showComments[post.id] ? 'Masquer les commentaires' : 'Voir les commentaires' }}
        </button>

        <!-- Commentaires -->
        <div v-if="showComments[post.id]">
          <h4 class="font-semibold mt-2">Commentaires :</h4>
          <div v-if="commentsByPost[post.id]?.length" class="space-y-1 text-sm mt-1">
            <div v-for="comment in commentsByPost[post.id]" :key="comment.id">
              <strong>{{ comment.users?.username || 'Inconnu' }}:</strong>
              {{ comment.content }}
            </div>
          </div>
          <div v-else class="text-sm text-gray-400 mt-1">Aucun commentaire.</div>

          <!-- Ajouter un commentaire -->
          <form
            @submit.prevent="addComment(post.id, newComment[post.id])"
            class="mt-2 flex gap-2"
          >
            <input
              v-model="newComment[post.id]"
              placeholder="Ajouter un commentaire..."
              class="flex-1 border p-1 rounded"
            />
            <button type="submit" class="text-blue-600">Envoyer</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      commentsByPost: {},
      likeCountByPost: {},
      newComment: {},
      showComments: {},
      user: null,
    };
  },
  async mounted() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }

    await this.loadPosts();
  },
  methods: {
    async loadPosts() {
      try {
        const res = await fetch('http://localhost:3000/posts');
        const data = await res.json();
        this.posts = data;

        // Initialiser les commentaires, les likes, etc.
        data.forEach(post => {
          this.loadComments(post.id);
          this.loadLikeCount(post.id);
          this.showComments[post.id] = false;
        });
      } catch (err) {
        console.error('Erreur lors du fetch des posts :', err);
      }
    },

    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleString();
    },

    toggleComments(postId) {
      this.showComments[postId] = !this.showComments[postId];
    },

    async likePost(postId) {
      if (!this.user) return alert('Connecte-toi pour liker !');

      try {
        await fetch('http://localhost:3000/likes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: this.user.id,
            post_id: postId,
          }),
        });
        await this.loadLikeCount(postId); // on recharge uniquement les likes
      } catch (err) {
        console.error('Erreur like :', err);
      }
    },

    async loadLikeCount(postId) {
      try {
        const res = await fetch(`http://localhost:3000/likes/count/${postId}`);
        const { count } = await res.json();
        this.likeCountByPost[postId] = count;
      } catch (err) {
        console.error('Erreur fetch like count :', err);
      }
    },

    async loadComments(postId) {
      const res = await fetch(`http://localhost:3000/comments/${postId}`);
      const data = await res.json();
      this.commentsByPost[postId] = data;
    },

    async addComment(postId, content) {
      if (!this.user || !content) return;

      await fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post_id: postId,
          user_id: this.user.id,
          content,
        }),
      });

      this.newComment[postId] = '';
      await this.loadComments(postId);
    },
  },
};
</script>
