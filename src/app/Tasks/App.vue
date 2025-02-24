<script setup>
import { computed } from 'vue'
import { useTaskStore } from '@/lib/stores/taskStore.js'
import { useRouter } from 'vue-router'

import RootLayout from '@/layouts/RootLayout/RootLayout.vue'

import AppButton from '@/components/Button/AppButton.vue'
import AppIcon from '@/components/Icon/AppIcon.vue'

import ItemTask from './components/ItemTask.vue'

const taskStore = useTaskStore()
const router = useRouter()

const sortedTasks = computed(() => {
  return [...taskStore.tasks].sort((a, b) => {
    return b.isBug - a.isBug
  })
})
const tasksDisplayCount = computed(() => {
  return `Задач: ${taskStore.totalCountTasks} / Багов : ${taskStore.totalCountBugs}`
})

const handleClickAddTask = () => {
  router.push({ name: 'TaskCreate' })
}
const handleEditTask = (item) => {
  router.push({ name: 'TaskEdit', params: { id: item.id } })
}
const handleDeleteTask = (item) => {
  taskStore.deleteTask(item.id)
}
</script>

<template>
  <root-layout class="tasks-view">
    <div class="container">
      <div class="tasks__list">
        <item-task
          v-for="item in sortedTasks"
          :key="item.id"
          :item="item"
          @edit="handleEditTask"
          @delete="handleDeleteTask"
        />
      </div>
    </div>

    <template #footer>
      <div class="tasks__actions-add">
        <span class="tasks__count">{{ tasksDisplayCount }}</span>

        <app-button
          variant="accent"
          @click="handleClickAddTask"
          @handleKeydownEnter="handleClickAddTask"
        >
          <template #prepend>
            <app-icon name="plus" />
          </template>

          Добавить задачу
        </app-button>
      </div>
    </template>
  </root-layout>
</template>

<style scoped lang="less">
.container {
  padding: 0 20px;
}
.tasks__actions-add {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tasks__count {
  display: block;
  margin-bottom: 16px;
}
</style>
