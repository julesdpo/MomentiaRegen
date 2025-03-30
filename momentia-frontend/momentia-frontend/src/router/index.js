
import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import NewPostView from '../views/NewPostView.vue';
import FeedView from '../views/FeedView.vue';
import UserProfileView from '../views/UserProfileView.vue';
import SearchView from '../views/SearchView.vue';


const routes = [
  { path: '/feed', component: FeedView, name: 'feed' },
  { path: '/', redirect: '/feed'},
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/new-post', component: NewPostView  },
  { path: '/user/:id', component: UserProfileView },
  {
    path: '/me',
    redirect: () => {
      const user = JSON.parse(localStorage.getItem('user'));
      return user ? `/user/${user.id}` : '/login';
    },
  },
  { path: '/search', component: SearchView}
  

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
