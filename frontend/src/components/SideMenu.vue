<template>
    <q-list class="q-pa-sm">
      <!-- Админ-раздел -->
      <template v-if="isAdmin()">
        <q-item-label 
          header
          class="text-weight-medium text-grey-8 q-px-none"
        >
          АДМИНИСТРИРОВАНИЕ
        </q-item-label>
  
        <q-item 
          clickable 
          to="/users"
          class="q-my-xs rounded-borders"
          active-class="bg-grey-3 text-black"
        >
          <q-item-section avatar>
            <q-icon 
              name="people" 
              size="sm"
              color="grey-7"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-grey-9">
              Пользователи
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
  
      <!-- Основной раздел -->
      <template v-if="isUser()">
        <q-item-label 
          header
          class="text-weight-medium text-grey-8 q-px-none q-mt-md"
        >
          ОСНОВНОЙ РАЗДЕЛ
        </q-item-label>
  
        <q-item 
          clickable 
          to="/tasks"
          class="q-my-xs rounded-borders"
          active-class="bg-grey-3 text-black"
        >
          <q-item-section avatar>
            <q-icon 
              name="fact_check" 
              size="sm"
              color="grey-7"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-grey-9">
              Задачи
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </template>
  
  <script lang="ts" setup>
  import { useMainStore } from 'src/stores/main-store';
  const { isUser, isAdmin } = useMainStore();
  </script>
  
  <style scoped>
  .rounded-borders {
    border-radius: 6px;
  }
  
  .q-item {
    padding: 8px 12px;
  }
  
  .q-item__label--header {
    font-size: 0.75rem;
    letter-spacing: 0.5px;
    padding-left: 12px;
  }
  
  .q-item--active {
    background-color: rgba(0, 0, 0, 0.04);
  }
  </style>