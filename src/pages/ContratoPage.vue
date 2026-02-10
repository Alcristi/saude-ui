<template>
  <q-page padding>
    <div class="q-mb-md">
      <div class="text-h4">Contratos</div>
      <div class="text-subtitle1">Lista de contratos cadastrados</div>
    </div>

    <q-table
      title="Contratos"
      :rows="rows"
      :columns="columns"
      row-key="nr_contrato"
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
  { name: 'nr_contrato', label: 'Número', field: 'nr_contrato', sortable: true, align: 'left' },
  { name: 'vinculo', label: 'Vínculo', field: 'vinculo', sortable: true, align: 'left' },
  { name: 'pac_codigo', label: 'Paciente ID', field: 'pac_codigo', sortable: true, align: 'left' },
  { name: 'plan_codig', label: 'Plano ID', field: 'plan_codig', sortable: true, align: 'left' },
  // Add other columns as needed based on API response
];

const fetchData = async () => {
  loading.value = true;
  try {
    const response = await api.get('/contrato');
    rows.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar contratos:', error);
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
