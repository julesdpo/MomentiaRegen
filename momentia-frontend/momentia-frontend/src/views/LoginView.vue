<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <form @submit.prevent="login" class="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 class="text-2xl mb-4 font-bold text-center">Connexion</h2>
  
        <input v-model="form.email" type="email" class="input" placeholder="Email" />
        <input v-model="form.password" type="password" class="input" placeholder="Mot de passe" />
  
        <button type="submit" class="w-full bg-violet-500 hover:bg-violet-600 text-white py-2 mt-4 rounded">
          Se connecter
        </button>
      </form>
    </div>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
      };
    },
    methods: {
      
      async login() {
        try {
          const res = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.form),
          });
  
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || data.error);
  
          alert('Connexion réussie !');
          localStorage.setItem('user', JSON.stringify(data.user));
          
          this.$router.push('/'); 
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
  