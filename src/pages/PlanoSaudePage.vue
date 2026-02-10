<template>
  <q-page padding>
    <div class="q-mb-md">
      <div class="text-h4">Planos de Saúde</div>
      <div class="text-subtitle1">Lista de planos de saúde cadastrados</div>
    </div>

    <q-table
      title="Planos de Saúde"
      :rows="rows"
      :columns="columns"
      row-key="plan_codig"
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
  { name: 'plano_descricao', label: 'Descrição', field: 'plano_descricao', sortable: true, align: 'left' },
  { name: 'plano_telefone', label: 'Telefone', field: 'plano_telefone', sortable: true, align: 'left' },
  // Add other columns as needed
];

const fetchData = async () => {
  loading.value = true;
  try {
    const response = await api.get('/plano-saude');
    rows.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar planos de saúde:', error);
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
