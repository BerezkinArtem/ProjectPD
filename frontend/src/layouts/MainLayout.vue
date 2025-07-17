<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated class="header">
      <q-toolbar>
        <div class="row items-center q-gutter-md">
          <q-avatar 
            icon="account_circle" 
            size="md" 
            color="grey-7" 
            text-color="white"
          />
          
          <div class="column">
            <span 
              class="user-name text-subtitle1"
              @click="openUserProfile"
            >
              {{ `${firstname} ${lastname}` }}
            </span>
            <span class="user-role text-caption text-grey-4" v-if="formattedRoles.length > 0">
              {{ formattedRoles.join(', ') }}
            </span>
          </div>
        </div>

        <q-space />

        <div class="row q-gutter-sm">
          <q-btn
            v-if="showAdminButton"
            flat
            label="Админка"
            @click="goToAdmin"
            class="nav-btn"
          />
          <q-btn
            v-if="showProjectsButton"
            flat
            label="Проекты"
            @click="goToProjects"
            class="nav-btn"
          />
          <q-btn 
            flat 
            label="Биржа" 
            @click="goToMarketplace" 
            class="nav-btn"
          />
          <q-btn 
            flat 
            label="Идеи" 
            @click="goToIdeas" 
            class="nav-btn"
          />
          <q-btn 
            flat 
            label="Команды" 
            @click="goToTeams" 
            class="nav-btn"
          />
        </div>

        <q-space />

        <div class="row items-center q-gutter-sm">
          <q-btn
            :icon="isDark ? 'light_mode' : 'dark_mode'"
            flat
            dense
            round
            @click="toggleDarkMode"
          />
          <q-btn 
            icon="logout" 
            flat 
            dense 
            round 
            @click="onLogout" 
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <UserProfile ref="userProfile" :roles="formattedRoles" />
    <PendingRequestsDialog ref="pendingRequestsDialog" />
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useMainStore } from 'src/stores/main-store';
import { storeToRefs } from 'pinia';
import * as api from '../api/auth.api';
import { useRouter } from 'vue-router';
import UserProfile from './UserProfile.vue';
import { useQuasar } from 'quasar';
import PendingRequestsDialog from 'src/pages/PendingRequestsDialog.vue';

defineOptions({
  name: 'MainLayout',
});

const mainStore = useMainStore();
const router = useRouter();
const userProfile = ref();
const $q = useQuasar();

const isDark = ref($q.dark.isActive);
const toggleDarkMode = () => {
  $q.dark.toggle();
  isDark.value = $q.dark.isActive;
  localStorage.setItem('darkMode', String(isDark.value));
};

const pendingRequestsDialog = ref<InstanceType<typeof PendingRequestsDialog>>();

const checkPendingRequests = async () => {
  if (mainStore.team_leader) {
    const { hasRequests, teamName, pendingUsers } = await mainStore.hasPendingRequests();
    if (hasRequests) {
      $q.notify({
        message: `Имеются нерассмотренные заявки на вступление в команду "${teamName}"`,
        color: 'info',
        icon: 'people',
        timeout: 0,
        actions: [
          {
            label: 'Просмотреть',
            color: 'white',
            handler: () => {
              pendingRequestsDialog.value?.open(pendingUsers, teamName, mainStore.team_leader?.id);
            }
          }
        ]
      });
    }
  }
};
checkPendingRequests();

let { firstname, lastname, roles } = storeToRefs(mainStore);

const formattedRoles = computed(() => {
  return roles.value.map((role) => {
    switch (role) {
      case 'admin': return 'Администратор';
      case 'customer': return 'Заказчик';
      case 'directorate': return 'Дирекция ВШЦТ';
      case 'expert': return 'Эксперт';
      case 'user': return 'Студент';
      default: return role;
    }
  });
});

const showProjectsButton = computed(() => {
  return roles.value.some(role => ['admin', 'directorate', 'customer'].includes(role));
});

const showAdminButton = computed(() => {
  return roles.value.some(role => ['admin', 'directorate'].includes(role));
});

const onLogout = () => {
  api.logout();
  router.push({ path: '/login' });
};

const goToProjects = () => router.push('/projects');
const goToAdmin = () => router.push('/admin');
const goToMarketplace = () => router.push('/marketplace');
const goToIdeas = () => router.push('/ideas');
const goToTeams = () => router.push('/teams');
const openUserProfile = () => userProfile.value.open();
</script>

<style scoped>
.header {
  background-color: #424242;
  border-bottom: 1px solid #616161;
}

.user-name {
  color: white;
  cursor: pointer;
  transition: color 0.2s ease;
  font-weight: 500;
}

.user-name:hover {
  color: #bdbdbd;
}

.user-role {
  line-height: 1.2;
}

.nav-btn {
  color: white;
  letter-spacing: 0.5px;
  text-transform: none;
  font-weight: 400;
}

.nav-btn:hover {
  color: #bdbdbd;
  background-color: rgba(255, 255, 255, 0.05);
}

.q-btn--flat:hover::before {
  opacity: 0.1;
}

.q-toolbar {
  padding: 0 16px;
  min-height: 64px;
}
</style>

<style>
.body--dark .header {
  background-color: #212121;
  border-bottom: 1px solid #424242;
}

.body--dark .nav-btn:hover {
  background-color: rgba(255, 255, 255, 0.08);
}
</style>