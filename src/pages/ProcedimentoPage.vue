<template>
  <q-page padding>
    <div class="q-mb-md">
      <div class="text-h4">Procedimentos</div>
      <div class="text-subtitle1">Lista de procedimentos cadastrados</div>
    </div>

    <q-table
      title="Procedimentos"
      :rows="rows"
      :columns="columns"
      row-key="proc_codigo"
      :loading="loading"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const loading = ref(false);
const rows = ref([]);

const columns = [
  { name: 'proc_nome', label: 'Nome', field: 'proc_nome', sortable: true, align: 'left' },
  { name: 'proc_valor', label: 'Valor', field: 'proc_valor', sortable: true, align: 'left' },
  // Add other columns as needed
];

const fetchData = async () => {
  loading.value = true;
  try {
    const response = await api.get('/procedimento');
    rows.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar procedimentos:', error);
    $q.notify({
      color: 'negative',
      message: 'Falha ao carregar dados.'
    });
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>
