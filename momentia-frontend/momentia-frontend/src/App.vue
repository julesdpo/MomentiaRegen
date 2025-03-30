<template>
  <div class="flex min-h-screen bg-gray-100 text-gray-800">
    <!-- Sidebar -->
    <aside class="w-20 md:w-64 bg-white border-r fixed top-0 left-0 h-full flex flex-col items-center py-6 z-10">
      <div class="text-2xl font-bold mb-6">
        <router-link to="/">🌟</router-link>
      </div>

      <nav class="flex flex-col gap-6 w-full items-center md:items-start px-2">
        <router-link
          v-if="!isLoggedIn"
          to="/login"
          class="sidebar-link"
        >
          🔐 <span class="hidden md:inline ml-2">Se connecter</span>
        </router-link>
        <router-link
          v-if="!isLoggedIn"
          to="/register"
          class="sidebar-link"
        >
          ✍️ <span class="hidden md:inline ml-2">S'inscrire</span>
        </router-link>
        <router-link
          v-if="isLoggedIn"
          to="/"
          class="sidebar-link"
        >
          📰 <span class="hidden md:inline ml-2">Fil d'actu</span>
        </router-link>
        <router-link
          v-if="isLoggedIn"
          to="/new-post"
          class="sidebar-link"
        >
          ➕ <span class="hidden md:inline ml-2">Poster</span>
        </router-link>
        <router-link 
          v-if="isLoggedIn"
          to="/search"
          class="sidebar-link"
        >
          🔍 <span class="hidden md:inline ml-2">Recherche</span>
        </router-link>
        <router-link
          v-if="isLoggedIn"
          to="/me"
          class="sidebar-link"
        >
          👤 <span class="hidden md:inline ml-2">Mon profil</span>
        </router-link>
        <button
          v-if="isLoggedIn"
          @click="logout"
          class="sidebar-link text-red-500"
        >
          🚪 <span class="hidden md:inline ml-2">Déconnexion</span>
        </button>
      </nav>
    </aside>

    <!-- Contenu principal -->
    <main class="ml-20 md:ml-64 w-full px-4 py-6">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
  mounted() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      this.isLoggedIn = !!localStorage.getItem('user');
    },
    logout() {
      localStorage.removeItem('user');
      this.isLoggedIn = false;
      this.$router.push('/login');
    },
  },
  watch: {
    $route() {
      this.checkAuth();
    },
  },
};
</script>

<style scoped>
.sidebar-link {
  @apply flex items-center text-gray-700 hover:text-blue-600 text-sm md:text-base font-medium transition duration-200;
}
</style>
