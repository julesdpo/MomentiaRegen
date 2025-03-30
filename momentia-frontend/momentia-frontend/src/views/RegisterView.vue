<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <form @submit.prevent="register" class="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 class="text-2xl mb-4 font-bold text-center">Inscription</h2>
  
        <input v-model="form.username" class="input" placeholder="Nom d'utilisateur" />
        <input v-model="form.email" type="email" class="input" placeholder="Email" />
        <input v-model="form.password" type="password" class="input" placeholder="Mot de passe" />
        <input v-model="form.avatar_url" class="input" placeholder="URL de l'avatar (optionnel)" />
  
        <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 mt-4 rounded">
          S'inscrire
        </button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          username: '',
          email: '',
          password: '',
          avatar_url: '',
        },
      };
    },
    methods: {
      async register() {
        try {
          const res = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.form),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || data.error);
          alert('Inscription réussie !');
          this.$router.push('/login');
        } catch (err) {
          alert(err.message);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .input {
    @apply w-full p-2 border border-gray-300 rounded mt-2;
  }
  </style>
  