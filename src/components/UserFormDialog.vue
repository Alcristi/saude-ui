<template>
  <q-dialog v-model="isOpen" @hide="onHide">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">{{ isEditing ? 'Editar Usuário' : 'Novo Usuário' }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            filled
            v-model="form.name"
            label="Nome"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Nome é obrigatório']"
          />
          <q-input
            filled
            v-model="form.email"
            label="Email"
            type="email"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Email é obrigatório']"
          />
          <q-input
            v-if="!isEditing"
            filled
            v-model="form.password"
            label="Senha"
            type="password"
            lazy-rules
            :rules="[ val => val && val.length >= 6 || 'Senha deve ter no mínimo 6 caracteres']"
          />
          <!-- Password optional for edit -->
          <q-input
            v-if="isEditing"
            filled
            v-model="form.password"
            label="Nova Senha (opcional)"
            type="password"
            hint="Deixe em branco para manter a atual"
          />

          <div class="row justify-end">
            <q-btn label="Cancelar" color="primary" flat v-close-popup />
            <q-btn :label="isEditing ? 'Atualizar' : 'Salvar'" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue';

const props = defineProps<{
  modelValue: boolean;
  userToEdit: any;
}>();

const emit = defineEmits(['update:modelValue', 'save']);

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const isEditing = computed(() => !!props.userToEdit);

const form = reactive({
  id: null,
  name: '',
  email: '',
  password: ''
});

// Watch for changes in userToEdit to populate the form
watch(() => props.userToEdit, (newUser) => {
  if (newUser) {
    form.id = newUser.id;
    form.name = newUser.name;
    form.email = newUser.email;
    form.password = '';
  } else {
    // Reset form for new user
    form.id = null;
    form.name = '';
    form.email = '';
    form.password = '';
  }
}, { immediate: true });

const onHide = () => {
    // Optional: reset form on close if needed, but watch handles it when userToEdit changes
    if(!props.modelValue) {
        emit('update:modelValue', false);
    }
}

const onSubmit = () => {
  emit('save', { ...form, isEditing: isEditing.value });
};
</script>
