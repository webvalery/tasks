import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

import { getMaxValue } from '@/lib/utils/array.js'

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref(JSON.parse(localStorage.getItem('tasks')) || [])

  const nextId = computed(() => {
    return getMaxValue(tasks.value, 'id') + 1
  })
  const totalCountTasks = computed(() => {
    return tasks.value.length
  })
  const totalCountBugs = computed(() => {
    return tasks.value.filter((task) => task.isBug).length
  })

  const createTask = (task) => {
    if (task.name.trim() === '') return

    const newTask = {
      name: task.name,
      isBug: task.isBug,
      id: nextId.value,
    }

    tasks.value.push(newTask)
  }
  const deleteTask = (id) => {
    const index = tasks.value.findIndex((task) => task.id === id)

    if (index !== -1) {
      tasks.value.splice(index, 1)
    }
  }
  const updateTask = (id, updatedTask) => {
    const taskIndex = tasks.value.findIndex((task) => task.id === id)

    if (taskIndex !== -1) {
      tasks.value[taskIndex] = { ...tasks.value[taskIndex], ...updatedTask }
    }
  }

  watch(
    tasks,
    () => {
      localStorage.setItem('tasks', JSON.stringify(tasks.value))
    },
    { deep: true },
  )

  return { tasks, nextId, totalCountTasks, totalCountBugs, createTask, deleteTask, updateTask }
})
