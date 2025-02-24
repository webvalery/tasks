<template>
  <div
    class="app-icon"
    :style="stylesBuild"
    role="img"
    aria-hidden="true"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <div class="app-icon__internal" v-html="getSvgIcon(name)" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getSvgIcon } from '@/lib/utils/icons'

const props = defineProps({
  name: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    default: '16',
  },
  width: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: null,
  },
  height: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['click', 'keydown-enter'])

const stylesBuild = computed(() => {
  return {
    width: props.width ? `${props.width}px` : `${props.size}px`,
    height: props.height ? `${props.height}px` : `${props.size}px`,
    color: props.color,
  }
})

const handleClick = (e) => {
  e.preventDefault()
  emit('click', e)
}
const handleKeydown = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    emit('keydown-enter', e)
  }
}
</script>

<style lang="less" scoped>
.app-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: inherit;
}
.app-icon__internal {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:deep(svg) {
    width: 100%;
    height: 100%;
  }
}
</style>
