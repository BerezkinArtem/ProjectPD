<template>
  <q-layout view="hHh Lpr fFf" class="bg-grey-1">
    <!-- Шапка -->
    <q-header elevated class="bg-white text-black shadow-2">
      <q-toolbar class="q-px-md">
        <q-btn 
          flat 
          dense 
          round 
          icon="menu" 
          aria-label="Menu" 
          @click="toggleLeftDrawer" 
          class="text-grey-8"
        />

        <q-toolbar-title class="text-h5 text-weight-medium text-primary">
          ПОРТАЛ ВШЦТ
        </q-toolbar-title>

        <div class="row items-center q-gutter-sm">
          <q-btn 
            flat 
            round 
            dense 
            icon="telegram" 
            color="grey"
            href="https://t.me/aaafaaaaaaaaaaaaafffff"
            target="_blank"
          />
          <q-avatar 
            icon="account_circle" 
            size="md" 
            color="grey-3" 
            text-color="grey-8"
          />
          <span class="text-caption text-grey-8">{{ `${firstname} ${lastname}` }}</span>
          <q-btn 
            icon="logout" 
            color="grey-8" 
            dense 
            unelevated 
            round 
            size="sm"
            @click="onLogout"
          />
        </div>
      </q-toolbar>
    </q-header>

    <!-- Боковое меню -->
    <q-drawer 
      v-model="leftDrawerOpen" 
      show-if-above 
      bordered
      :width="240"
      class="bg-grey-2"
    >
      <SideMenu />
    </q-drawer>

    <!-- Основное содержимое -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SideMenu from 'components/SideMenu.vue'
import { useMainStore } from 'src/stores/main-store';
import { storeToRefs } from 'pinia';
import * as api from '../api/auth.api';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'MainLayout'
});

const mainStore = useMainStore();
const router = useRouter();

let { firstname, lastname } = storeToRefs(mainStore);

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const onLogout = () => {
  api.logout();
  router.push({ path: '/login' });
};
</script>

<style scoped>
.q-toolbar {
  min-height: 64px;
}

.q-avatar {
  font-size: 24px;
}

.q-btn--round {
  border-radius: 50%;
}

.q-drawer {
  border-right: 1px solid rgba(0, 0, 0, 0.08);
}
</style>