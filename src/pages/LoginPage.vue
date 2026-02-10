<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-md shadow-2 my-card" style="width: 100%; max-width: 400px">
      <q-card-section class="text-center">
        <div class="text-h5 text-primary text-weight-bold">TiSaude</div>
        <div class="text-subtitle2 text-grey-7">Faça login na sua conta</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            filled
            v-model="email"
            label="Email"
            type="email"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Por favor digite seu email']"
          />

          <q-input
            filled
            v-model="password"
            label="Senha"
            :type="isPwdVisible ? 'text' : 'password'"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Por favor digite sua senha']"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwdVisible ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="isPwdVisible = !isPwdVisible"
              />
            </template>
          </q-input>

          <div>
            <q-btn label="Entrar" type="submit" color="primary" class="full-width q-mt-md" unelevated size="lg" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

defineOptions({
  name: 'LoginPage'
});

const $q = useQuasar();
const router = useRouter();
    const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const isPwdVisible = ref(false);

const onSubmit = async () => {
  if (email.value && password.value) {
    try {
      await authStore.login(email.value, password.value);
      
      $q.notify({
        color: 'positive',
        textColor: 'white',
        icon: 'check',
        message: 'Login realizado com sucesso!'
      });

      await router.push({ name: 'home' });
    } catch (error: any) {
      console.error('Erro no login:', error);
      $q.notify({
        color: 'negative',
        message: error.message || 'Erro ao realizar login. Verifique suas credenciais.'
      });
    }
  } else {
    $q.notify({
      color: 'negative',
      message: 'Preencha todos os campos corretamente.'
    });
  }
};
</script>

<style scoped>
.my-card {
  border-radius: 8px;
}
.hover-underline:hover {
  text-decoration: underline;
}
</style>
