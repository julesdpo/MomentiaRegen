<template>
  <div class="max-w-xl mx-auto mt-6">
    <input
      v-model="query"
      @input="searchUsers"
      placeholder="Rechercher un utilisateur..."
      class="w-full p-2 border rounded mb-4"
    />

    <div v-if="results.length === 0 && query.length > 1" class="text-center text-gray-400">
      Aucun utilisateur trouvé 🧐
    </div>

    <div
      v-for="user in results"
      :key="user.id"
      class="flex items-center justify-between p-3 bg-white rounded shadow mb-3"
    >
      <div class="flex items-center gap-3">
        <img
          :src="user.avatar_url || `https://i.pravatar.cc/40?u=${user.id}`"
          class="w-10 h-10 rounded-full"
        />
        <div>
          <router-link
            :to="`/user/${user.id}`"
            class="font-semibold text-blue-600 hover:underline"
          >
            {{ user.username || 'Utilisateur inconnu' }}
          </router-link>
          <p class="text-sm text-gray-400">{{ user.email }}</p>
        </div>
      </div>
      <button
        v-if="user.id !== currentUser?.id"
        @click="toggleFollow(user.id)"
        class="text-sm text-white px-3 py-1 rounded"
        :class="isFollowing(user.id) ? 'bg-red-500' : 'bg-blue-500'"
      >
        {{ isFollowing(user.id) ? 'Se désabonner' : 'S’abonner' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      results: [],
      currentUser: null,
      followingIds: [],
    };
  },
  async mounted() {
    const data = localStorage.getItem('user');
    if (data) {
      this.currentUser = JSON.parse(data);
      await this.fetchFollowing();
    }
  },
  methods: {
    async searchUsers() {
      if (this.query.length < 2) {
        this.results = [];
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/users/search?q=${this.query}`);
        if (!res.ok) throw new Error('Recherche échouée');
        this.results = await res.json();
      } catch (err) {
        console.error('Erreur recherche utilisateur:', err.message);
        this.results = [];
      }
    },

    async fetchFollowing() {
      try {
        const res = await fetch(`http://localhost:3000/follows/following-ids/${this.currentUser.id}`);
        if (!res.ok) throw new Error('Erreur suivi');
        const data = await res.json();
        this.followingIds = data.map(f => f.following_id);
      } catch (err) {
        console.error(err);
        this.followingIds = [];
      }
    },

    isFollowing(userId) {
      return this.followingIds.includes(userId);
    },

    async toggleFollow(userId) {
      const route = this.isFollowing(userId) ? 'unfollow' : 'follow';
      try {
        const res = await fetch(`http://localhost:3000/follows/${route}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            follower_id: this.currentUser.id,
            following_id: userId,
          }),
        });
        if (!res.ok) throw new Error('Échec toggle follow');
        await this.fetchFollowing();
      } catch (err) {
        console.error(err.message);
      }
    },
  },
};
</script>
