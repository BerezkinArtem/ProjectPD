<template>
  <q-page class="row items-center justify-evenly bg-grey-2">
    <q-card flat class="auth-card" style="width: 100%; max-width: 400px;">
      <!-- Заголовок -->
      <div class="text-center q-pt-xl">
        <div class="text-h4 text-weight-thin">Регистрация</div>
        <div class="text-subtitle2 text-grey-7 q-mt-sm">Создайте новый аккаунт</div>
      </div>

      <q-card-section class="q-px-xl q-py-lg">
        <!-- Поля формы -->
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
          class="q-mb-md"
          dense
          :rules="[val => !!val || 'Поле обязательно', val => val.length >= 6 || 'Минимум 6 символов']"
        >
          <template v-slot:prepend>
            <q-icon name="lock_outline" size="xs" />
          </template>
        </q-input>

        <q-input 
          v-model="firstname" 
          label="Имя" 
          outlined
          color="grey-8"
          class="q-mb-md"
          dense
          :rules="[val => !!val || 'Поле обязательно']"
        >
          <template v-slot:prepend>
            <q-icon name="badge" size="xs" />
          </template>
        </q-input>

        <q-input 
          v-model="lastname" 
          label="Фамилия" 
          outlined
          color="grey-8"
          dense
          :rules="[val => !!val || 'Поле обязательно']"
        >
          <template v-slot:prepend>
            <q-icon name="people" size="xs" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions vertical class="q-px-xl q-pb-xl">
        <!-- Кнопка регистрации -->
        <q-btn 
          unelevated
          color="black"
          text-color="white"
          @click="onSignUp"
          class="full-width q-py-sm"
          label="Зарегистрироваться"
          :loading="loading"
        />
        
        <!-- Разделитель -->
        <div class="row items-center q-mt-md">
          <q-separator class="col" />
          <span class="text-caption text-grey-6 q-px-sm">или</span>
          <q-separator class="col" />
        </div>

        <!-- Кнопка возврата -->
        <q-btn 
          flat
          @click="onReturn"
          class="full-width q-mt-md"
          label="Вернуться к входу"
          color="grey-8"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import * as api from 'src/api/auth.api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const $q = useQuasar();

const login = ref('');
const password = ref('');
const firstname = ref('');
const lastname = ref('');
const loading = ref(false);

const onReturn = () => {
  router.push({ path: '/login' });
};

const onSignUp = async () => {
  loading.value = true;
  
  try {
    const response = await api.signup({ 
      username: login.value, 
      password: password.value, 
      firstname: firstname.value, 
      lastname: lastname.value 
    });

    if (response && response.success) {
      $q.notify({
        message: 'Пользователь успешно создан',
        caption: 'Ожидайте активации администратором',
        color: 'positive',
        icon: 'verified'
      });
      router.push({ path: '/login' });
    }
  } catch {
    $q.notify({
      message: 'Ошибка регистрации',
      caption: 'Возможно, пользователь с таким логином уже существует',
      color: 'negative',
      icon: 'error'
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-card {
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
}

.q-input {
  font-size: 14px;
}

.q-btn {
  letter-spacing: 0.5px;
  font-weight: 500;
}
</style>