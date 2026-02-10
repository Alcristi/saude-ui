<template>
  <q-dialog v-model="isOpen" @hide="onHide">
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="warning" color="negative" text-color="white" />
        <span class="q-ml-sm">{{ message }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" v-close-popup />
        <q-btn flat label="Excluir" color="negative" @click="onConfirm" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: boolean;
  message?: string;
}>();

const emit = defineEmits(['update:modelValue', 'confirm']);

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const message = computed(() => props.message || 'Tem certeza que deseja excluir este item?');

const onHide = () => {
    if(!props.modelValue) {
        emit('update:modelValue', false);
    }
}

const onConfirm = () => {
  emit('confirm');
};
</script>
