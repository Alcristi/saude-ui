<template>
  <q-page padding>
    <div class="q-mb-md row justify-between items-center">
      <div>
        <div class="text-h4">Usuários</div>
        <div class="text-subtitle1">Lista de usuários do sistema</div>
      </div>
      <q-btn color="primary" label="Novo Usuário" icon="add" @click="openCreateDialog" />
    </div>

    <q-table
      title="Usuários"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :loading="loading"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat round color="primary" icon="edit" @click="openEditDialog(props.row)" />
          <q-btn flat round color="negative" icon="delete" @click="confirmDelete(props.row)" />
        </q-td>
      </template>
    </q-table>

    <!-- Components -->
    <UserFormDialog
      v-model="dialogOpen"
      :user-to-edit="userToEdit"
      @save="saveUser"
    />

    <DeleteConfirmationDialog
      v-model="deleteDialogOpen"
      message="Tem certeza que deseja excluir este usuário?"
      @confirm="deleteUser"
    />

  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';
import UserFormDialog from 'components/UserFormDialog.vue';
import DeleteConfirmationDialog from 'components/DeleteConfirmationDialog.vue';

const $q = useQuasar();
const loading = ref(false);
const rows = ref([]);
const dialogOpen = ref(false);
const deleteDialogOpen = ref(false);
const userToEdit = ref(null);
const userToDelete = ref(null);

const columns = [
  { name: 'name', label: 'Nome', field: 'name', sortable: true, align: 'left' },
  { name: 'email', label: 'Email', field: 'email', sortable: true, align: 'left' },
  { name: 'actions', label: 'Ações', field: 'actions', align: 'right' }
];

const fetchData = async () => {
  loading.value = true;
  try {
    const response = await api.get('/usuario');
    rows.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    $q.notify({
      color: 'negative',
      message: 'Falha ao carregar dados.'
    });
  } finally {
    loading.value = false;
  }
};

const openCreateDialog = () => {
  userToEdit.value = null;
  dialogOpen.value = true;
};

const openEditDialog = (user: any) => {
  userToEdit.value = user;
  dialogOpen.value = true;
};

const saveUser = async (formData: any) => {
  try {
    if (formData.isEditing) {
      const payload: any = {
        name: formData.name,
        email: formData.email
      };
      if (formData.password) {
        payload.password = formData.password;
      }
      await api.patch(`/usuario/${formData.id}`, payload);
      $q.notify({ color: 'positive', message: 'Usuário atualizado com sucesso!' });
    } else {
      await api.post('/usuario', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      $q.notify({ color: 'positive', message: 'Usuário criado com sucesso!' });
    }
    dialogOpen.value = false;
    fetchData();
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    $q.notify({
      color: 'negative',
      message: 'Erro ao salvar usuário. Verifique os dados.'
    });
  }
};

const confirmDelete = (user: any) => {
  userToDelete.value = user;
  deleteDialogOpen.value = true;
};

const deleteUser = async () => {
  if (!userToDelete.value) return;
  try {
    // @ts-ignore
    await api.delete(`/usuario/${userToDelete.value.id}`);
    $q.notify({ color: 'positive', message: 'Usuário excluído com sucesso!' });
    fetchData();
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    $q.notify({
      color: 'negative',
      message: 'Erro ao excluir usuário.'
    });
  } finally {
    userToDelete.value = null;
  }
};

onMounted(() => {
  fetchData();
});
</script>
