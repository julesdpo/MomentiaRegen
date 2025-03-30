<template>
    <div class="max-w-md mx-auto bg-white p-6 rounded shadow-md mt-10">
      <h2 class="text-xl font-bold mb-4 text-center">Créer un post</h2>
  
      <form @submit.prevent="submitPost">
        <input v-model="form.content" class="input" placeholder="Écris quelque chose..." />
  
        <input type="file" @change="handleFile" class="mt-2" />
  
        <button
          type="submit"
          class="w-full bg-green-500 hover:bg-green-600 text-white py-2 mt-4 rounded"
        >
          Publier
        </button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          content: '',
          image: null,
          user_id: '', // à remplir dynamiquement
        },
      };
    },
    mounted() {
  const userData = localStorage.getItem('user');
  if (userData) {
    const user = JSON.parse(userData);
    this.form.user_id = user.id;
  } else {
    alert("Vous devez être connecté pour publier.");
    this.$router.push('/login'); // ou autre redirection
  }
},

    methods: {
      handleFile(event) {
        this.form.image = event.target.files[0];
      },
      async submitPost() {
        if (!this.form.image || !this.form.content) {
          alert('Veuillez ajouter une image et une description.');
          return;
        }
  
        const formData = new FormData();
        formData.append('image', this.form.image);
        formData.append('content', this.form.content);
        formData.append('user_id', this.form.user_id);
  
        try {
          const res = await fetch('http://localhost:3000/posts', {
            method: 'POST',
            body: formData,
          });
  
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || data.message);
  
          alert('Post publié avec succès !');
          this.form.content = '';
          this.form.image = null;
        } catch (err) {
          alert(err.message);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .input {
    @apply w-full p-2 border border-gray-300 rounded;
  }
  </style>
  