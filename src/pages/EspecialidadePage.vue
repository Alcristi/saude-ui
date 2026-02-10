<template>
  <q-page padding>
    <div class="q-mb-md">
      <div class="text-h4">Especialidades</div>
      <div class="text-subtitle1">Lista de especialidades cadastradas</div>
    </div>

    <q-table
      title="Especialidades"
      :rows="rows"
      :columns="columns"
      row-key="espec_codigp"
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
  { name: 'espec_nome', label: 'Nome', field: 'espec_nome', sortable: true, align: 'left' },
  // Add other columns as needed based on API response
];

const fetchData = async () => {
  loading.value = true;
  try {
    const response = await api.get('/especialidade');
    rows.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar especialidades:', error);
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
