<template>
  <div class="max-w-5xl mx-auto px-4 mt-10">
    <!-- Profil Header -->
    <div class="flex flex-col md:flex-row items-center gap-8 mb-10">
      <img
        :src="user?.avatar_url || 'https://i.pravatar.cc/150?u=' + user?.id"
        class="w-32 h-32 rounded-full border-[5px] border-pink-500 shadow-lg object-cover"
      />
      <div class="text-center md:text-left space-y-2 flex-1">
        <div class="flex items-center gap-4 justify-center md:justify-start">
          <h2 class="text-3xl font-extrabold text-gray-800">{{ user?.username }}</h2>
          <button
            v-if="user && currentUser?.id !== user.id"
            @click="toggleFollow"
            class="text-sm px-4 py-1 rounded-full shadow text-white font-semibold transition"
            :class="isFollowing ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'"
          >
            {{ isFollowing ? 'Se désabonner' : 'S’abonner' }}
          </button>
        </div>
        <p class="text-gray-500 text-sm">{{ user?.email }}</p>
        <div class="flex gap-6 justify-center md:justify-start text-sm text-gray-600 font-medium">
          <span><strong>{{ posts.length }}</strong> publications</span>
          <span><strong>{{ followers }}</strong> abonnés</span>
          <span><strong>{{ following }}</strong> abonnements</span>
        </div>
      </div>
    </div>

    <!-- Loader -->
    <div v-if="loading" class="text-center text-gray-500 py-10">Chargement du profil...</div>

    <!-- Posts -->
    <div v-else>
      <div v-if="posts.length" class="grid md:grid-cols-2 gap-6">
        <div
          v-for="post in posts"
          :key="post.id"
          class="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
        >
          <img :src="post.image_url" class="w-full object-cover h-64" />
          <div class="p-4">
            <p class="text-sm text-gray-800 mb-2">{{ post.content }}</p>
            <p class="text-xs text-gray-400">{{ formatDate(post.created_at) }}</p>
          </div>
        </div>
      </div>
      <p v-else class="text-center text-gray-400 text-sm mt-10">Aucun post pour l’instant 🥲</p>
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
      followers: 0,
      following: 0,
      loading: false,
    };
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(newId) {
        this.loadProfile(newId);
      },
    },
  },
  mounted() {
    const data = localStorage.getItem('user');
    if (data) {
      this.currentUser = JSON.parse(data);
    }
  },
  methods: {
    async loadProfile(userId) {
      this.loading = true;
      try {
        const [userRes, postRes] = await Promise.all([
          fetch(`http://localhost:3000/users/${userId}`),
          fetch(`http://localhost:3000/posts/by-user/${userId}`)
        ]);

        this.user = await userRes.json();
        this.posts = await postRes.json();

        await this.checkFollowStatus();
        await this.getFollowCounts();
      } catch (err) {
        console.error('Erreur chargement profil :', err);
      } finally {
        this.loading = false;
      }
    },
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
      await this.getFollowCounts();
    },
    async getFollowCounts() {
      const res = await fetch(`http://localhost:3000/follows/stats/${this.user.id}`);
      const data = await res.json();
      this.followers = data.followers;
      this.following = data.following;
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleString();
    },
  },
};
</script>

<style scoped>
/* Ajoute ici un hover sympa si besoin, ou une animation */
</style>
