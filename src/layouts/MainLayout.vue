<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> TiSaude </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-scroll-area style="height: calc(100% - 50px); margin-top: 50px; border-right: 1px solid #ddd">
        <q-list>
          <q-item-label header>
            Menu
          </q-item-label>

          <Menu
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Menu, { MenuProps } from 'components/Menu.vue';
import { useAuthStore } from 'stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const essentialLinks: MenuProps[] = [
  {
    title: 'Usuários',
    caption: 'Gerenciar usuários',
    icon: 'admin_panel_settings',
    link: '/usuarios',
  },
  {
    title: 'Especialidades',
    caption: 'Gerenciar especialidades',
    icon: 'medical_services',
    link: '/especialidades',
  },
  {
    title: 'Planos de Saúde',
    caption: 'Gerenciar planos',
    icon: 'health_and_safety',
    link: '/planos-saude',
  },
  {
    title: 'Procedimentos',
    caption: 'Gerenciar procedimentos',
    icon: 'healing',
    link: '/procedimentos',
  },
  {
    title: 'Pacientes',
    caption: 'Gerenciar pacientes',
    icon: 'person',
    link: '/pacientes',
  },
  {
    title: 'Médicos',
    caption: 'Gerenciar médicos',
    icon: 'supervisor_account',
    link: '/medicos',
  },
  {
    title: 'Contratos',
    caption: 'Gerenciar contratos',
    icon: 'description',
    link: '/contratos',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
