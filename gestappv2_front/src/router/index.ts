import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import UserView from "../views/UserView.vue";
import AdminView from "../views/AdminView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/user", component: UserView },
  { path: "/admin", component: AdminView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
