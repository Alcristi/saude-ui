<template>
  <q-page padding>
    <div class="q-mb-md">
      <div class="text-h4">Médicos</div>
      <div class="text-subtitle1">Lista de médicos cadastrados</div>
    </div>

    <q-table
      title="Médicos"
      :rows="rows"
      :columns="columns"
      row-key="med_codigo"
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
  { name: 'med_nome', label: 'Nome', field: 'med_nome', sortable: true, align: 'left' },
  { name: 'med_CRM', label: 'CRM', field: 'med_CRM', sortable: true, align: 'left' },
    // Add other columns as needed
];

const fetchData = async () => {
  loading.value = true;
  try {
    const response = await api.get('/medico');
    rows.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar médicos:', error);
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
