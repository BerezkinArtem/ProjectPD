<template>
  <div class="q-pa-md">
    <!-- Панель управления -->
    <div class="bg-white rounded-borders shadow-1 q-pa-md q-mb-md">
      <div class="row items-center">
        <q-btn 
          unelevated
          color="grey-8"
          text-color="white"
          icon="add"
          label="Создать"
          @click="onNewClick"
          class="q-mr-md"
          dense
        />
      </div>
    </div>

    <!-- Таблица пользователей -->
    <div class="bg-white rounded-borders shadow-1">
      <TIUUserDataTable 
        :users="usersList" 
        @user-click="onUserClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TIUUserDataTable from 'src/components/TIUUserDataTable.vue';
import * as api from '../api/users.api';
import { SecuredUser } from '../../../backend/src/common/types';
import { useRouter } from 'vue-router';

const router = useRouter();
const usersList = ref<SecuredUser[]>([]);

onMounted(async () => {
  try {
    usersList.value = await api.getAll();
  } catch (error) {
    console.error('Ошибка загрузки пользователей:', error);
  }
});

const onUserClick = (row: SecuredUser) => {
  router.push({ path: `/users/${row.id}` });
};

const onNewClick = () => {
  router.push({ path: '/users/new' });
};
</script>

<style scoped>
.rounded-borders {
  border-radius: 8px;
}

.q-btn {
  min-width: 120px;
  letter-spacing: normal;
}
</style>