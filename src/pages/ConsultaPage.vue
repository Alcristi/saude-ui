<template>
  <q-page padding>
    <div class="q-mb-md">
      <div class="text-h4">Consultas</div>
      <div class="text-subtitle1">Lista de consultas agendadas</div>
    </div>

    <q-table
      title="Consultas"
      :rows="rows"
      :columns="columns"
      row-key="cons_codigo"
      :loading="loading"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import { useQuasar, date } from 'quasar';

const $q = useQuasar();
const loading = ref(false);
const rows = ref([]);

const columns = [
  { 
    name: 'data', 
    label: 'Data', 
    field: 'data', 
    sortable: true, 
    align: 'left',
    format: (val: string) => date.formatDate(val, 'DD/MM/YYYY')
  },
  { 
    name: 'hora', 
    label: 'Hora', 
    field: 'hora', 
    sortable: true, 
    align: 'left',
    format: (val: string) => date.formatDate(val, 'HH:mm')
  },
  { name: 'particular', label: 'Particular', field: 'particular', sortable: true, align: 'left' },
    // Add other columns as needed
];

const fetchData = async () => {
  loading.value = true;
  try {
    const response = await api.get('/consulta');
    rows.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar consultas:', error);
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
