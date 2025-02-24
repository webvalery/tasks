<script setup>
import { inject, ref, onBeforeMount } from 'vue'
import { useTaskStore } from '@/lib/stores/taskStore.js'
import { useRouter } from 'vue-router'

import RootLayout from '@/layouts/RootLayout/RootLayout.vue'

import AppInput from '@/components/Input/AppInput.vue'
import AppButton from '@/components/Button/AppButton.vue'
import AppCheckbox from '@/components/Checkbox/AppCheckbox.vue'
import AppIcon from '@/components/Icon/AppIcon.vue'

const taskStore = useTaskStore()
const router = useRouter()
const $validate = inject('$validate')

const props = defineProps({
  id: {
    type: String,
    default: () => '',
  },
})

onBeforeMount(() => {
  loadTask()
})

const titleTask = ref('')
const isBug = ref(false)

const loadTask = () => {
  const task = taskStore.tasks.find((t) => t.id === parseInt(+props.id))

  if ($validate.isNotEmptyObject(task)) {
    titleTask.value = task.name
    isBug.value = task.isBug

    return
  }

  router.push({ name: 'Tasks' })
}

const resetForm = () => {
  titleTask.value = ''
  isBug.value = false
}
const handleClickComeBack = () => {
  resetForm()
  router.push({ name: 'Tasks' })
}
const handleClickDeleteTask = () => {
  taskStore.deleteTask(+props.id)

  resetForm()
  router.push({ name: 'Tasks' })
}
const handleClickSaveTask = () => {
  taskStore.updateTask(+props.id, {
    name: titleTask.value,
    isBug: isBug.value,
  })

  resetForm()
  router.push({ name: 'Tasks' })
}
</script>

<template>
  <root-layout class="task-edit">
    <div class="container">
      <div class="task-edit__title">
        <app-input
          v-model="titleTask"
          placeholder="Введите название"
          @keydown-enter="handleClickSaveTask"
        />
      </div>

      <app-checkbox v-model="isBug" label="Является багом" />
    </div>

    <template #footer>
      <div class="task-edit__actions">
        <app-button @click="handleClickComeBack">Вернуться</app-button>

        <div class="task-edit__group-actions">
          <div class="task-edit__action-delete">
            <app-button variant="default" @click="handleClickDeleteTask">
              <template #prepend>
                <div class="task-edit__delete-icon">
                  <app-icon name="delete" size="18" />
                </div>
              </template>
            </app-button>
          </div>

          <app-button variant="accent" @click="handleClickSaveTask">Сохранить</app-button>
        </div>
      </div>
    </template>
  </root-layout>
</template>

<style lang="less" scoped>
.container {
  padding: 0 50px;
}
.task-edit__title {
  margin-bottom: 20px;
}
.task-edit__actions {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.task-edit__group-actions {
  display: flex;
  justify-content: space-between;
}
.task-edit__action-delete {
  margin: 0 8px;
}
.task-edit__delete-icon {
  color: var(--element-muted);
}
</style>
