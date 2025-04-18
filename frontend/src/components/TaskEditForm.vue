<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="width: 500px; max-width: 90vw;">
      <!-- Заголовок -->
      <q-card-section class="bg-grey-2">
        <div class="text-subtitle1 text-weight-medium text-center text-grey-9">
          {{ props.new ? 'НОВАЯ ЗАДАЧА' : 'РЕДАКТИРОВАНИЕ' }}
        </div>
      </q-card-section>

      <!-- Форма -->
      <q-card-section class="q-pt-md">
        <q-input 
          outlined
          dense
          v-model="description" 
          label="Описание"
          class="q-mb-md"
        />

        <q-select
          outlined
          dense
          v-model="status"
          :options="statusesDict"
          label="Статус"
          emit-value
          map-options
          class="q-mb-md"
          :display-value="getStatusLabel(status)"
        />

        <q-select
          outlined
          dense
          v-model="assignee"
          :options="usersDict"
          label="Исполнитель"
          option-value="id"
          :option-label="(item) => `${item.lastname} ${item.firstname}`"
          :display-value="assignee ? `${assignee.lastname} ${assignee.firstname}` : ''"
          @filter="filterFn"
          use-input
        />
      </q-card-section>

      <!-- Кнопки -->
      <q-card-actions align="right" class="q-px-md q-pb-md">
        <q-btn 
          v-if="!props.new"
          flat
          label="Удалить"
          color="grey-7"
          @click="onDelete"
          class="q-mr-auto"
        />
        
        <q-btn 
          flat
          label="Отмена"
          color="grey-7"
          @click="onDialogCancel"
          class="q-mr-sm"
        />
        
        <q-btn 
          unelevated
          label="Сохранить"
          color="grey-8"
          text-color="white"
          @click="onOKClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import {
  CreateUpdateTaskDto,
  SecuredUser,
  TaskDto,
  TaskStatus,
} from '../../../backend/src/common/types';
import { Ref, ref } from 'vue';
import * as api from '../api/tasks.api';
import * as userApi from '../api/users.api';
import { useMainStore } from 'src/stores/main-store';

interface TaskEditProps {
  new: boolean;
  task?: TaskDto;
}

type StatusRecord = {
  label: string;
  value: TaskStatus;
};

const mainStore = useMainStore();
const props = defineProps<TaskEditProps>();
defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const description = ref(props.task ? props.task.title : '');
const status: Ref<TaskStatus> = ref(
  props.task ? props.task.status : TaskStatus.new
);

const statusesDict: StatusRecord[] = [
  { label: 'Новая', value: TaskStatus.new },
  { label: 'В работе', value: TaskStatus.inProgress },
];

if (!props.new) {
  statusesDict.push({ label: 'Выполнена', value: TaskStatus.done });
}

const getStatusLabel = (status: TaskStatus) => {
  const statusOption = statusesDict.find((v) => v.value == status);
  return statusOption ? statusOption.label : 'Неизвестно';
};

const usersDict = ref<SecuredUser[]>([]);
const assignee = ref<SecuredUser>(props.task?.assignee || mainStore.getCurrentUser());

const onOKClick = async () => {
  const taskData: CreateUpdateTaskDto = {
    title: description.value,
    status: status.value,
    assignee: assignee.value,
  };

  if (props.new) {
    await api.create(taskData);
  } else if (props.task) {
    await api.update(props.task.id, taskData);
  }

  onDialogOK();
};

const onDelete = async () => {
  if (props.task) {
    await api.remove(props.task.id);
    onDialogOK();
  }
};

const filterFn = async (val: string, update: (cb: () => void) => void) => {
  if (usersDict.value.length > 0) {
    update(() => {
      // Явное обновление без изменений
      usersDict.value = [...usersDict.value];
    });
    return;
  }

  const users = await userApi.getAll();
  update(() => {
    usersDict.value = users;
  });
};
</script>

<style scoped>
.q-dialog-plugin {
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.q-card__section {
  padding: 16px;
}

.q-btn {
  min-width: 90px;
  letter-spacing: normal;
}
</style>