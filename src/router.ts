import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Home from "./pages/home/Home.vue";
import Login from "./pages/login/LoginPage.vue";
import Cadastro from "./pages/cadastro/CadastroPage.vue";
import Historico from "./domain/common/components/tables/table-historico/TableHistorico.vue";

const routes: RouteRecordRaw[] = [
  { path: "/home", component: Home },
  { path: "/", component: Login },
  { path: "/cadastro", component: Cadastro },
  { path: "/historico", component: Historico },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
