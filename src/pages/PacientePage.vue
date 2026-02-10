<template>
  <q-page padding>
    <div class="q-mb-md">
      <div class="text-h4">Pacientes</div>
      <div class="text-subtitle1">Lista de pacientes cadastrados</div>
    </div>

    <q-table
      title="Pacientes"
      :rows="rows"
      :columns="columns"
      row-key="pac_codigo"
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
  { name: 'pac_nome', label: 'Nome', field: 'pac_nome', sortable: true, align: 'left' },
  { 
    name: 'pac_dataNascimento', 
    label: 'Data Nascimento', 
    field: 'pac_dataNascimento', 
    sortable: true, 
    align: 'left',
    format: (val: string) => date.formatDate(val, 'DD/MM/YYYY')
  },
  // Add other columns as needed
];

const fetchData = async () => {
  loading.value = true;
  try {
    const response = await api.get('/paciente');
    rows.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error);
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
