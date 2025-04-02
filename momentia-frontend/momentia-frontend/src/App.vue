<template>
  <div class="flex min-h-screen bg-gray-100 text-gray-800">
    <aside class="w-20 md:w-64 bg-gradient-to-b from-purple-800 to-purple-950 text-white fixed top-0 left-0 h-full flex flex-col px-4 py-6 z-10 shadow-xl font-[Inter,sans-serif]">
      <router-link to="/" class="flex items-center md:justify-start justify-center mb-12 space-x-3">
        <img src="./assets/logomomentia.png" alt="Momentia Logo" class="w-8 h-8 md:w-10 md:h-10" />
        <span class="hidden md:inline-block text-2xl font-bold text-white tracking-tight">Momentia</span>
      </router-link>

      <nav class="flex flex-col gap-2 text-[15px]">

        <router-link v-if="!isLoggedIn" to="/login" class="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-purple-800 transition w-full">
          <svg style="width: 20px; height: 20px; padding: 1px; min-width: 20px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h9a2.25 2.25 0 002.25-2.25V15" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M18 12h-7.5m0 0l3-3m-3 3l3 3" />
          </svg>
          <span class="opacity-0 md:opacity-100 transition-opacity">Se connecter</span>
        </router-link>
          <router-link v-if="!isLoggedIn" to="/register" class="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-purple-800 transition w-full">
          <svg style="width: 20px; height: 20px; padding: 1px; min-width: 20px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M16.5 21v-2.25A4.5 4.5 0 0012 14.25h-1.5a4.5 4.5 0 00-4.5 4.5V21M12 11.25a3 3 0 100-6 3 3 0 000 6z" />
          </svg>
          <span class="opacity-0 md:opacity-100 transition-opacity">S'inscrire</span>
        </router-link>
        <router-link v-if="isLoggedIn" to="/" class="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-purple-800 transition w-full">
          <svg style="width: 20px; height: 20px; padding: 1px; min-width: 20px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M3 12l9-9 9 9M4.5 10.5v9a1.5 1.5 0 001.5 1.5h3.75v-6.75h3v6.75H18a1.5 1.5 0 001.5-1.5v-9" />
          </svg>
          <span class="opacity-0 md:opacity-100 transition-opacity">Fil d'actu</span>

        </router-link>
          <router-link v-if="isLoggedIn" to="/new-post" class="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-purple-800 transition w-full">
          <svg style="width: 20px; height: 20px; padding: 1px; min-width: 20px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span class="opacity-0 md:opacity-100 transition-opacity">Poster</span>
        </router-link>
        <router-link v-if="isLoggedIn" to="/search" class="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-purple-800 transition w-full">
          <svg style="width: 20px; height: 20px; padding: 1px; min-width: 20px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 111.09-11.25 7.5 7.5 0 01-1.09 11.25z" />
          </svg>
          <span class="opacity-0 md:opacity-100 transition-opacity">Recherche</span>
        </router-link>
        <router-link v-if="isLoggedIn" to="/me" class="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-purple-800 transition w-full">
          <svg style="width: 20px; height: 20px; padding: 1px; min-width: 20px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M15.75 18a6.75 6.75 0 00-13.5 0M12 10.5a3.75 3.75 0 110-7.5 3.75 3.75 0 010 7.5z" />
          </svg>
          <span class="opacity-0 md:opacity-100 transition-opacity">Mon profil</span>
        </router-link>
        <button v-if="isLoggedIn" @click="logout" class="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:text-white hover:bg-red-600 transition w-full">
          <svg style="width: 20px; height: 20px; padding: 1px; min-width: 20px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h9a2.25 2.25 0 002.25-2.25V15m-3-3H21m0 0l-3-3m3 3l-3 3" />
          </svg>
          <span class="opacity-0 md:opacity-100 transition-opacity">Déconnexion</span>
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