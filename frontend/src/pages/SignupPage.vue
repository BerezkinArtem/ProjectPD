<template>
  <q-page class="row items-center justify-evenly">
    <q-card flat bordered class="auth-card">
      <q-card-section>
        <div class="text-h4 text-center q-mb-sm">Регистрация</div>
        <div class="text-subtitle2 text-center q-mb-sm text-grey-7">
          Введите данные для регистрации
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          v-model="login"
          label="Логин"
          dense
          outlined
          class="q-mb-sm"
          placeholder="example@example.com"
          :rules="[val => !!val && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Введите корректный email']"
          no-error-icon
        />
        <q-input
          v-model="firstname"
          label="Имя"
          dense
          outlined
          class="q-mb-sm"
          :rules="[val => !!val && /^[а-яА-ЯёЁa-zA-Z]+$/.test(val) || 'Только буквы']"
          no-error-icon
        />
        <q-input
          v-model="lastname"
          label="Фамилия"
          dense
          outlined
          class="q-mb-sm"
          :rules="[val => !!val && /^[а-яА-ЯёЁa-zA-Z]+$/.test(val) || 'Только буквы']"
          no-error-icon
        />
        <q-input
          :type="isPwdVisible ? 'text' : 'password'"
          v-model="password"
          label="Пароль"
          dense
          outlined
          class="q-mb-sm"
          placeholder="********"
          :rules="[val => !!val && /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(val) || 'Пароль должен содержать хотя бы одну букву, одну цифру и быть не менее 8 символов']"
          no-error-icon
        >
          <template v-slot:append>
            <q-icon
              v-if="password"
              :name="isPwdVisible ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwdVisible = !isPwdVisible"
            />
          </template>
        </q-input>
        <q-input
          :type="isPwdVisible ? 'text' : 'password'"
          v-model="confirmPassword"
          label="Подтверждение пароля"
          dense
          outlined
          class="q-mb-sm"
          placeholder="********"
          :rules="[val => val === password || 'Пароли не совпадают']"
          no-error-icon
        />
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          unelevated
          label="Зарегистрироваться"
          @click="onSignUp"
          class="auth-btn q-mb-sm"
          :disable="!isFormValid"
        />
      </q-card-actions>

      <q-card-section class="text-center">
        <q-btn
          label="Назад"
          flat
          @click="onReturn"
          class="text-grey-7"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import * as api from 'src/api/auth.api';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const $q = useQuasar();

const login = ref('');
const password = ref('');
const confirmPassword = ref('');
const firstname = ref('');
const lastname = ref('');
const isPwdVisible = ref(false);

const isFormValid = computed(() => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
  return (
    login.value &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login.value) &&
    password.value &&
    passwordRegex.test(password.value) &&
    confirmPassword.value === password.value &&
    /^[а-яА-ЯёЁa-zA-Z]+$/.test(firstname.value) &&
    /^[а-яА-ЯёЁa-zA-Z]+$/.test(lastname.value)
  );
});

const onReturn = () => {
  router.push({ path: '/login' });
};

const onSignUp = async () => {
  if (!isFormValid.value) {
    $q.notify({
      message: 'Ошибка валидации',
      caption: 'Пожалуйста, проверьте введенные данные.',
      color: 'negative',
      icon: 'error',
    });
    return;
  }

  try {
    const response = await api.signup({
      username: login.value,
      password: password.value,
      firstname: firstname.value,
      lastname: lastname.value,
    });

    if (response && response.success) {
      $q.notify({
        message: 'Пользователь успешно создан',
        caption: 'Можете войти в систему',
        color: 'positive',
        icon: 'verified',
      });

      setTimeout(() => {
        router.push({ path: '/login' });
      }, 2000);
    } else {
      $q.notify({
        message: 'Создать пользователя не удалось',
        caption: 'Возможно, пользователь с таким логином уже существует. Попробуйте другой.',
        color: 'negative',
        icon: 'error',
      });
    }
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    $q.notify({
      message: 'Ошибка регистрации',
      caption: 'Попробуйте позже или обратитесь к администратору.',
      color: 'negative',
      icon: 'error',
    });
  }
};
</script>

<style scoped>
.q-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.auth-card {
  width: 420px;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  background: white;
  border: none;
}

.auth-btn {
  width: 100%;
  background-color: #424242;
  color: white;
  border-radius: 6px;
  padding: 8px;
  transition: all 0.2s ease;
}

.auth-btn:hover {
  background-color: #616161;
}

.auth-btn:disabled {
  background-color: #e0e0e0;
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
  font-size: 14px;
}

.text-h4 {
  color: #424242;
  font-weight: 500;
  letter-spacing: 0.25px;
}

.q-btn {
  text-transform: none;
  font-size: 14px;
  letter-spacing: 0.5px;
}
</style>

<style>
.body--dark .q-page {
  background-color: #212121;
}

.body--dark .auth-card {
  background-color: #424242;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}

.body--dark .text-h4 {
  color: white;
}

.body--dark .auth-btn {
  background-color: #616161;
}

.body--dark .auth-btn:hover {
  background-color: #757575;
}

.body--dark .auth-btn:disabled {
  background-color: #9e9e9e;
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
</style>