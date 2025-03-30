<template>
  <div class="max-w-2xl mx-auto mt-10">
    <!-- En-tête profil -->
    <div class="flex items-center gap-4 mb-6">
      <img
        :src="user?.avatar_url || 'https://via.placeholder.com/80'"
        class="w-20 h-20 rounded-full border"
      />
      <div>
        <div class="flex items-center gap-2">
          <h2 class="text-2xl font-bold">{{ user?.username }}</h2>
          <!-- Bouton follow -->
          <button
            v-if="user && currentUser?.id !== user.id"
            @click="toggleFollow"
            class="text-sm text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
          >
            {{ isFollowing ? 'Se désabonner' : 'S’abonner' }}
          </button>
        </div>
        <p class="text-sm text-gray-500">{{ user?.email }}</p>
      </div>
    </div>

    <!-- Grille de posts -->
    <div class="grid grid-cols-3 gap-2">
      <div
        v-for="post in posts"
        :key="post.id"
        class="relative group hover:scale-105 transition"
      >
        <img :src="post.image_url" class="w-full h-40 object-cover rounded" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      posts: [],
      currentUser: null,
      isFollowing: false,
    };
  },
  async mounted() {
    const userId = this.$route.params.id;
    const userRes = await fetch(`http://localhost:3000/users/${userId}`);
    const postRes = await fetch(`http://localhost:3000/posts/by-user/${userId}`);
    this.user = await userRes.json();
    this.posts = await postRes.json();

    // Récupère l'utilisateur connecté
    const data = localStorage.getItem('user');
    if (data) {
      this.currentUser = JSON.parse(data);
      this.checkFollowStatus();
    }
  },
  methods: {
    async checkFollowStatus() {
      if (!this.currentUser || this.currentUser.id === this.user.id) return;

      const res = await fetch(
        `http://localhost:3000/follows/check?user_id=${this.currentUser.id}&target_id=${this.user.id}`
      );
      const data = await res.json();
      this.isFollowing = data.isFollowing;
    },
    async toggleFollow() {
      await fetch(`http://localhost:3000/follows/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: this.currentUser.id,
          target_id: this.user.id,
        }),
      });

      this.isFollowing = !this.isFollowing;
    },
  },
};
</script>
