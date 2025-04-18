<template>
  <div class="q-pa-md">
    <!-- Панель управления -->
    <div class="bg-white rounded-borders shadow-1 q-pa-md q-mb-md">
      <div class="row items-center q-gutter-md no-wrap">
        <q-btn 
          unelevated
          color="grey-8"
          text-color="white"
          icon="add"
          label="Создать"
          @click="onNewClick"
          class="col-auto"
          dense
        />
        
        <q-separator vertical inset color="grey-4" class="col-auto" />
        
        <div class="text-caption text-grey-8 col-auto">Фильтр:</div>
        
        <q-checkbox 
          v-model="onlyMyTasks" 
          label="Только мои"
          color="grey-8"
          dense
          class="col-auto"
        />
        
        <q-input 
          outlined 
          dense 
          v-model="searchText" 
          placeholder="Поиск задач..."
          class="col-grow search-input"
          clearable
        >
          <template v-slot:prepend>
            <q-icon name="search" color="grey-6" />
          </template>
        </q-input>
        
        <q-btn 
          flat
          icon="refresh" 
          label="Сбросить" 
          @click="onFilterReset"
          color="grey-8"
          class="col-auto"
          dense
        />
      </div>
    </div>

    <!-- Колонки задач -->
    <div class="row q-col-gutter-md">
      <div class="col">
        <q-card flat bordered class="full-height">
          <q-card-section class="bg-grey-2">
            <div class="text-subtitle1 text-center text-weight-medium">Новые</div>
          </q-card-section>
          <q-card-section class="q-pa-none scroll">
            <TaskComponent
              v-for="task in newTasks"
              :key="task.id"
              :value="task"
              @onEditClick="onTaskEdit"
              class="q-pa-sm bordered-task"
            />
          </q-card-section>
        </q-card>
      </div>
      
      <div class="col">
        <q-card flat bordered class="full-height">
          <q-card-section class="bg-grey-2">
            <div class="text-subtitle1 text-center text-weight-medium">В работе</div>
          </q-card-section>
          <q-card-section class="q-pa-none scroll">
            <TaskComponent
              v-for="task in inProgressTasks"
              :key="task.id"
              :value="task"
              @onEditClick="onTaskEdit"
              class="q-pa-sm bordered-task"
            />
          </q-card-section>
        </q-card>
      </div>
      
      <div class="col">
        <q-card flat bordered class="full-height">
          <q-card-section class="bg-grey-2">
            <div class="text-subtitle1 text-center text-weight-medium">Выполненные</div>
          </q-card-section>
          <q-card-section class="q-pa-none scroll">
            <TaskComponent
              v-for="task in doneTasks"
              :key="task.id"
              :value="task"
              @onEditClick="onTaskEdit"
              class="q-pa-sm bordered-task"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import TaskEditForm from '../components/TaskEditForm.vue';
import TaskComponent from 'src/components/TaskComponent.vue';
import { computed, onMounted, ref } from 'vue';
import * as api from '../api/tasks.api';
import { TaskDto, TaskStatus } from '../../../backend/src/common/types';
import { useMainStore } from 'src/stores/main-store';
import { storeToRefs } from 'pinia';

const $q = useQuasar();
const mainStore = useMainStore();
let { userId } = storeToRefs(mainStore);

const onlyMyTasks = ref(false);
const searchText = ref('');
const allTasks = ref([] as TaskDto[]);

const filteredTasks = computed(() => {
  return allTasks.value.filter(task => {
    let visible = true;
    if (onlyMyTasks.value && task.assignee.id != userId.value) {
      visible = false;
    }

    if (searchText.value.length > 1 && 
        !task.title.toLowerCase().includes(searchText.value.toLowerCase())) {
      visible = false;
    }

    return visible;
  });
});

const newTasks = computed(() => filteredTasks.value.filter(v => v.status == TaskStatus.new));
const inProgressTasks = computed(() => filteredTasks.value.filter(v => v.status == TaskStatus.inProgress));
const doneTasks = computed(() => filteredTasks.value.filter(v => v.status == TaskStatus.done));

const getTasksFromServer = async () => {
  const response = await api.getTasks();
  allTasks.value = response;
};

onMounted(async () => {
  await getTasksFromServer();
});

const onNewClick = async () => {
  $q.dialog({
    component: TaskEditForm,
    componentProps: { new: true },
  }).onOk(async () => await getTasksFromServer());
};

const onTaskEdit = (value: TaskDto) => {
  $q.dialog({
    component: TaskEditForm,
    componentProps: { new: false, task: value },
  }).onOk(async () => await getTasksFromServer());
};

const onFilterReset = () => {
  onlyMyTasks.value = false;
  searchText.value = '';
};
</script>

<style scoped>
.q-card {
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.full-height {
  height: calc(100vh - 180px);
  display: flex;
  flex-direction: column;
}

.scroll {
  overflow-y: auto;
  flex-grow: 1;
}

.bordered-task {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.bordered-task:last-child {
  border-bottom: none;
}

.search-input {
  min-width: 200px;
  background-color: #f5f5f5;
  border-radius: 6px;
}

.search-input .q-field__control {
  height: 36px;
}

@media (max-width: 768px) {
  .row {
    flex-direction: column;
  }
  .col {
    width: 100%;
    margin-bottom: 16px;
  }
  .full-height {
    height: auto;
  }
}
</style>