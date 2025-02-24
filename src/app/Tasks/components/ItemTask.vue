<script setup>
import { computed, inject } from 'vue'

import AppButton from '@/components/Button/AppButton.vue'
import AppIcon from '@/components/Icon/AppIcon.vue'

const $validate = inject('$validate')
const emit = defineEmits(['edit', 'delete'])

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
})

const taskItemClasses = computed(() => {
  return {
    'task-item--warning': $validate.isNotEmptyObject(props.item) ? props.item.isBug : false,
  }
})

const handleClickEdit = () => {
  emit('edit', props.item)
}
const handleClickDelete = () => {
  emit('delete', props.item)
}
</script>

<template>
  <div v-if="$validate.isNotEmptyObject(item)" class="task-item" :class="taskItemClasses">
    <div class="task-item__text">
      <span class="task-item__id"># {{ props.item.id }}</span>

      {{ props.item.name }}
    </div>

    <div class="task-item__actions">
      <div class="task-item__edit">
        <app-button variant="plain" @click="handleClickEdit">
          <template #prepend>
            <app-icon name="edit" size="20" />
          </template>
        </app-button>
      </div>

      <app-button variant="plain" @click="handleClickDelete">
        <template #prepend>
          <app-icon name="delete" size="20" />
        </template>
      </app-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px 19px 8px;

  &:not(:last-child) {
    border-bottom: 1px solid var(--border-silver);
    margin-bottom: 16px;
  }
}
.task-item__text,
.task-item__actions {
  display: flex;
  align-items: center;
}
.task-item__text {
  font-size: var(--font-size-s);
  font-weight: var(--font-weight-regular);
  color: var(--text-primary);
}
.task-item__id {
  font-size: var(--font-size-s);
  font-weight: var(--font-weight-bold);
  color: var(--text-medium-gray);
  margin-right: 4px;
}
.task-item__edit {
  margin-right: 4px;
  display: flex;
}
.task-item--warning .task-item__text {
  color: var(--text-red);
}
</style>
