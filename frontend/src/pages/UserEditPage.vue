<template>
  <div class="q-pa-md" style="max-width: 600px; margin: 0 auto;">
    <!-- Заголовок -->
    <div class="text-subtitle1 text-weight-medium text-center text-grey-9 q-mb-md">
      {{ mode === 'update' ? 'РЕДАКТИРОВАНИЕ ПОЛЬЗОВАТЕЛЯ' : 'СОЗДАНИЕ ПОЛЬЗОВАТЕЛЯ' }}
    </div>

    <!-- Форма -->
    <div class="bg-white rounded-borders q-pa-md shadow-1">
      <q-input 
        outlined
        dense
        v-model="name" 
        label="Логин"
        class="q-mb-md"
        :rules="[val => !!val || 'Обязательное поле']"
      />

      <div class="row q-col-gutter-md">
        <div class="col">
          <q-input 
            outlined
            dense
            v-model="firstname" 
            label="Имя"
            class="q-mb-md"
          />
        </div>
        <div class="col">
          <q-input 
            outlined
            dense
            v-model="lastname" 
            label="Фамилия"
            class="q-mb-md"
          />
        </div>
      </div>

      <q-input 
        v-if="mode === 'new'"
        outlined
        dense
        type="password" 
        label="Пароль"
        v-model="password"
        class="q-mb-md"
        :rules="[val => !!val || 'Обязательное поле']"
      />

      <q-select 
        outlined
        dense
        v-model="roles" 
        multiple 
        use-chips 
        :options="rolesDict" 
        label="Роли"
        class="q-mb-md"
      />

      <q-select 
        outlined
        dense
        v-model="status" 
        :options="statusDict" 
        label="Статус"
        class="q-mb-md"
      />

      <!-- Кнопки -->
      <div class="text-right q-pt-sm">
        <q-btn 
          unelevated
          color="grey-8"
          text-color="white"
          label="Сохранить"
          @click="onSave"
          :loading="loading"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CreateUserDto, Role, UpdateUserDto, UserAccountStatus } from '../../../backend/src/common/types';
import { useRoute, useRouter } from 'vue-router';
import * as api from '../api/users.api';
import { useQuasar } from 'quasar';

type Mode = 'new' | 'update';

const $q = useQuasar();
const route = useRoute();
const router = useRouter();

const mode = ref<Mode>('new');
const loading = ref(false);

// Данные формы
const id = ref(-1);
const name = ref('');
const firstname = ref('');
const lastname = ref('');
const password = ref('');
const roles = ref<Role[]>([Role.user]);
const status = ref<UserAccountStatus>(UserAccountStatus.active);

// Справочники
const rolesDict = [Role.admin, Role.user];
const statusDict = [UserAccountStatus.active, UserAccountStatus.inactive, UserAccountStatus.pending];

// Загрузка данных
onMounted(async () => {
  if (route.params.id !== 'new') {
    mode.value = 'update';
    id.value = +route.params.id;
    await loadUserData();
  }
});

const loadUserData = async () => {
  try {
    loading.value = true;
    const response = await api.get(id.value);
    if (response) {
      name.value = response.name;
      firstname.value = response.firstname;
      lastname.value = response.lastname;
      roles.value = response.roles;
      status.value = response.status;
    }
  } finally {
    loading.value = false;
  }
};

// Сохранение
const onSave = async () => {
  try {
    loading.value = true;
    
    if (mode.value === 'new') {
      const newUser: CreateUserDto = {
        name: name.value,
        firstname: firstname.value,
        lastname: lastname.value,
        password: password.value,
        roles: roles.value,
        status: status.value
      };

      const response = await api.create(newUser);
      if (response) {
        router.push({ path: `/users/${response.id}` });
      }
    } else {
      const updatedUser: UpdateUserDto = {
        name: name.value,
        firstname: firstname.value,
        lastname: lastname.value,
        roles: roles.value,
        status: status.value
      };

      await api.update(id.value, updatedUser);
      $q.notify({
        message: 'Сохранено',
        color: 'positive',
        icon: 'save'
      });
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.rounded-borders {
  border-radius: 8px;
}

.q-field {
  font-size: 14px;
}

.q-btn {
  min-width: 120px;
  text-transform: none;
  letter-spacing: normal;
}
</style>