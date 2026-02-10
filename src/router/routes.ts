import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    name: 'home',
    children: [
      { path: '', redirect: '/usuarios' },
      { path: 'especialidades', component: () => import('pages/EspecialidadePage.vue') },
      { path: 'planos-saude', component: () => import('pages/PlanoSaudePage.vue') },
      { path: 'procedimentos', component: () => import('pages/ProcedimentoPage.vue') },
      { path: 'pacientes', component: () => import('pages/PacientePage.vue') },
      { path: 'medicos', component: () => import('pages/MedicoPage.vue') },
      { path: 'contratos', component: () => import('pages/ContratoPage.vue') },
      { path: 'consultas', component: () => import('pages/ConsultaPage.vue') },
      { path: 'usuarios', component: () => import('pages/UsuarioPage.vue') },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
    meta: { guestOnly: true },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
