<template>
  <q-page class="row items-center justify-evenly">
    <q-card flat bordered class="auth-card">
      <q-card-section>
        <div class="text-h4 text-center q-mb-md">Авторизация</div>
        <div class="text-subtitle2 text-center q-mb-md text-grey-7">
          Введите адрес электронной почты и пароль
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          v-model="login"
          label="Логин"
          dense
          outlined
          class="q-mb-md"
          placeholder="example_mail@std.tyulu.ru"
        />
        <q-input
          type="password"
          v-model="password"
          label="Пароль"
          dense
          outlined
          class="q-mb-md"
          placeholder="**********"
        />
      </q-card-section>

      <q-card-section class="q-pt-none text-center">
        <a href="#" class="text-caption text-grey-7" @click.prevent="onForgotPassword">
          Забыли пароль?
        </a>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          unelevated
          label="Войти"
          @click="onLogin"
          class="auth-btn q-mb-md"
        />
      </q-card-actions>

      <q-card-section class="text-center">
        <q-btn
          label="Регистрация"
          flat
          @click="onSignUp"
          class="text-grey-7"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import * as api from '../api/auth.api';
import { useMainStore } from 'src/stores/main-store';
import { useQuasar } from 'quasar';

const router = useRouter();
const mainStore = useMainStore();
const $q = useQuasar();

const login = ref('');
const password = ref('');

const onLogin = async () => {
  let response;

  try {
    response = await api.login(login.value, password.value);
  } catch {
    console.log('Login failed');
  }

  if (response) {
    mainStore.initAppState(response);
    router.push({ path: '/' });
    setTimeout(() => window.location.reload(), 10);
  } else {
    $q.notify({
      message: 'Войти не удалось',
      caption: 'Удостоверьтесь в правильности введеного ВАМИ логина и пароля.',
      color: 'negative',
      icon: 'error',
    });
  }
};

const onSignUp = () => {
  router.push({ path: '/signup' });
};

const onForgotPassword = () => {
  console.log('Забыли пароль?');
  $q.notify({
    message: 'Попробуйте вспомнить пароль',
  })
};
</script>

<style scoped>
.q-page {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.auth-card {
  width: 400px;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  background: white;
  border: none;
}

.auth-btn {
  width: 100%;
  background-color: #424242;
  color: white;
  border-radius: 6px;
  padding: 8px;
  transition: all 0.3s ease;
}

.auth-btn:hover {
  background-color: #616161;
}

.q-field--outlined .q-field__control {
  border-radius: 6px;
  border-color: #e0e0e0;
}

.q-field--outlined:hover .q-field__control {
  border-color: #bdbdbd;
}

.q-field__label {
  color: #757575;
}

.q-input {
  font-size: 14px;
}

.text-h4 {
  color: #424242;
  font-weight: 500;
  letter-spacing: 0.5px;
}

a {
  text-decoration: none;
  transition: color 0.2s;
}

a:hover {
  color: #424242;
}
</style>

<style>
.body--dark .q-page {
  background-color: #212121;
}

.body--dark .auth-card {
  background-color: #424242;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.body--dark .text-h4,
.body--dark .auth-btn {
  color: white;
}

.body--dark .auth-btn {
  background-color: #616161;
}

.body--dark .auth-btn:hover {
  background-color: #757575;
}

.body--dark .q-field--outlined .q-field__control {
  border-color: #616161;
  background-color: rgba(255, 255, 255, 0.05);
}

.body--dark .q-field--outlined:hover .q-field__control {
  border-color: #9e9e9e;
}

.body--dark .q-field__label {
  color: #bdbdbd;
}

.body--dark .text-subtitle2,
.body--dark .text-caption {
  color: #e0e0e0 !important;
}

.body--dark a:hover {
  color: #e0e0e0;
}
</style>