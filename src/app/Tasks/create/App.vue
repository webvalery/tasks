<script setup>
import { inject, ref } from 'vue'
import { useTaskStore } from '@/lib/stores/taskStore.js'
import { useRouter } from 'vue-router'

import RootLayout from '@/layouts/RootLayout/RootLayout.vue'

import AppInput from '@/components/Input/AppInput.vue'
import AppButton from '@/components/Button/AppButton.vue'
import AppCheckbox from '@/components/Checkbox/AppCheckbox.vue'

const taskStore = useTaskStore()
const router = useRouter()
const $validate = inject('$validate')

const titleTask = ref('')
const isBug = ref(false)

const resetForm = () => {
  titleTask.value = ''
  isBug.value = false
}
const handleClickComeBack = () => {
  resetForm()
  router.push({ name: 'Tasks' })
}
const handleClickAddTask = () => {
  if ($validate.isNotEmptyString(titleTask.value)) {
    taskStore.createTask({
      name: titleTask.value,
      isBug: isBug.value,
    })

    router.push({ name: 'Tasks' })
    resetForm()
  }
}
</script>

<template>
  <root-layout class="task-create">
    <div class="container">
      <div class="task-create__title">
        <app-input
          v-model="titleTask"
          label="Название задачи"
          placeholder="Введите название"
          subtext="Будет отображаться на главной странице"
          @keydown-enter="handleClickAddTask"
        />
      </div>

      <app-checkbox v-model="isBug" label="Является багом" />
    </div>

    <template #footer>
      <div class="task-create__actions">
        <app-button @click="handleClickComeBack">Вернуться</app-button>
        <app-button variant="accent" @click="handleClickAddTask">Создать</app-button>
      </div>
    </template>
  </root-layout>
</template>

<style lang="less" scoped>
.container {
  padding: 0 50px;
}
.task-create__title {
  margin-bottom: 20px;
}
.task-create__actions {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
