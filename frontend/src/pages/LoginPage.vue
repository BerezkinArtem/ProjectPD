<template>
  <q-page class="row items-center justify-evenly bg-grey-2">
    <q-card flat class="auth-card" style="width: 100%; max-width: 400px;">
      <!-- Логотип или название приложения -->
      <div class="text-center q-pt-xl">
        <div class="text-h4 text-weight-thin">Вход</div>
        <div class="text-subtitle2 text-grey-7 q-mt-sm">Добро пожаловать </div>
      </div>

      <q-card-section class="q-px-xl q-py-lg">
        <q-input 
          v-model="login" 
          label="Логин" 
          outlined
          color="grey-8"
          class="q-mb-md"
          dense
          :rules="[val => !!val || 'Поле обязательно']"
        >
          <template v-slot:prepend>
            <q-icon name="person_outline" size="xs" />
          </template>
        </q-input>

        <q-input 
          type="password"
          v-model="password" 
          label="Пароль" 
          outlined
          color="grey-8"
          dense
          :rules="[val => !!val || 'Поле обязательно']"
        >
          <template v-slot:prepend>
            <q-icon name="lock_outline" size="xs" />
          </template>
        </q-input>

        <div class="text-right q-mt-sm">
          <a href="#" class="text-caption text-grey-6" style="text-decoration: none;">Забыли пароль?</a>
        </div>
      </q-card-section>

      <q-card-actions vertical class="q-px-xl q-pb-xl">
        <q-btn 
          unelevated
          color="black"
          text-color="white"
          @click="onLogin"
          class="full-width q-py-sm"
          label="Войти"
        />
        
        <div class="row items-center q-mt-md">
          <q-separator class="col" />
          <span class="text-caption text-grey-6 q-px-sm">или</span>
          <q-separator class="col" />
        </div>

        <q-btn 
          flat
          @click="onSignUp"
          class="full-width q-mt-md"
          label="Создать аккаунт"
          color="grey-8"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import * as api from '../api/auth.api';
import { useMainStore } from 'src/stores/main-store';
import { useQuasar } from 'quasar';
// import { storeToRefs } from 'pinia';

const router = useRouter();
const mainStore = useMainStore();
const $q = useQuasar();
// let { initAppState } = storeToRefs(mainStore);

const login = ref('');
const password = ref('');

const onLogin = async () => {
  let response;

  try {
    response = await api.login(login.value, password.value);

  } catch {
    console.log('Login failed');
  }

  console.log('login: ', response);

  if (response) {
    // save user into store
    mainStore.initAppState(response)
    router.push({ path: '/' })
  } else {
    $q.notify({
      message: 'Войти не удалось',
      caption: 'Удостоверьтесь в правильности введеного Вами логина и пароля.',
      color: 'red',
      icon: 'error'
    })
  }
}

const onSignUp = () => {
  router.push({ path: '\signup' })
}

</script>
