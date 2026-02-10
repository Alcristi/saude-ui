<template>
  <q-item clickable :tag="link?.startsWith('http') ? 'a' : 'div'" :target="link?.startsWith('http') ? '_blank' : undefined" :href="link?.startsWith('http') ? link : undefined" :to="!link?.startsWith('http') ? link : undefined">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface MenuProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}

withDefaults(defineProps<MenuProps>(), {
  caption: '',
  link: '#',
  icon: '',
});
</script>
