

## 🌟 Momentia – README

### 📁 Structure du projet

```
momentia/
├── momentia-frontend/   # Frontend Vue.js (Vite + Tailwind)
├── momentia-backend/    # Backend Node.js + Express
└── README.md
```

---

## 🚀 Installation rapide

### ⚙️ Prérequis

- Node.js (v16 ou +)
- NPM
- Supabase (compte + projet créé)
- Git (optionnel)

---

## 🔧 Étapes backend (`momentia-backend/`)

### 1. Accéder au dossier
```bash
cd momentia-backend
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer `.env`
Créer un fichier `.env` dans `momentia-backend/` :

```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=xxxxxxxxxxxxxxxxxxxx
PORT=3000
```

### 4. Lancer le serveur
```bash
node app.js
```

📍 L’API tourne sur : `http://localhost:3000`

---

## 💻 Étapes frontend (`momentia-frontend/`)

### 1. Accéder au dossier
```bash
cd momentia-frontend
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer le serveur Vite
```bash
npm run dev
```

📍 L’app tourne sur : `http://localhost:5173`

---

## 🧠 Fonctionnalités disponibles

- ✅ Inscription / Connexion
- ✅ Fil d’actualité (posts)
- ✅ Création de posts avec image
- ✅ Page profil dynamique
- ✅ Likes, commentaires
- ✅ Suivre / se désabonner
- ✅ Recherche d’utilisateurs
- ✅ Barre latérale fixe
- ✅ Responsive design (mobile inclus)

---

## 🔜 Fonctionnalités à venir (Roadmap)

- [ ] Scroll infini ou pagination
- [ ] Upload photo de profil
- [ ] Notifications
- [ ] Stories
- [ ] Thème sombre 🌙

---

## 🛠 Stack technique

- **Frontend** : Vue 3, Vite, Tailwind CSS
- **Backend** : Node.js, Express
- **BaaS** : Supabase (auth, DB)
- **DB** : PostgreSQL via Supabase

---

## 🤝 Collaboration

Cloner le repo :
```bash
git clone https://github.com/tonrepo/momentia.git
cd momentia
```

---

## 📸 Aperçu

Ajoute ici une capture d’écran ou une GIF du projet ✨

---

## 📄 Licence

Projet personnel libre de droit pour apprendre, cloner, et modifier.

