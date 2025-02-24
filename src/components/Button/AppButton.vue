<script setup>
import { inject, useSlots, computed } from 'vue'

import { inArray } from '@/lib/utils/array.js'
import { VARIANTS } from './buttonConst.js'

const props = defineProps({
  variant: {
    type: String,
    validator: inArray(VARIANTS),
    default: 'default',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
})
const $validate = inject('$validate')
const emit = defineEmits(['click', 'keydown-enter'])
const slots = useSlots()

const buttonClasses = computed(() => {
  return {
    'app-button--disabled': props.disabled,
    'app-button--block': props.block,
    [`app-button--${props.variant}`]: true,
  }
})
const prependClasses = computed(() => {
  return {
    'app-button__prepend': isSlotDefault.value,
  }
})
const isSlotPrepend = computed(() => {
  return $validate.isNotEmptyArray(slots.prepend?.())
})
const isSlotDefault = computed(() => {
  return $validate.isNotEmptyArray(slots.default?.())
})

const handleClick = (e) => {
  e.preventDefault()

  if (!props.disabled) {
    emit('click', e)
  }
}
const handleKeydown = (e) => {
  e.preventDefault()

  if (!props.disabled && e.key === 'Enter') {
    emit('keydown-enter', e)
  }
}
</script>

<template>
  <button
    class="app-button"
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <span v-if="isSlotPrepend" :class="prependClasses">
      <slot name="prepend" />
    </span>

    <slot></slot>
  </button>
</template>

<style lang="less" scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  user-select: none;
  transition: 0.2s;
  white-space: nowrap;
  font-family: 'Montserrat', sans-serif;
  font-size: var(--font-size-s);
  font-weight: var(--font-weight-medium);
  padding: 10px;
  border-radius: 4px;
}
.app-button--default {
  background-color: var(--element-default);
  color: var(--text-primary);

  &:hover,
  &:active {
    background-color: var(--element-default-active);
  }
}
.app-button--accent {
  background-color: var(--element-accent);
  color: var(--text-white);

  &:hover,
  &:active {
    background-color: var(--element-accent-active);
  }
}
.app-button--text {
  background-color: transparent;
  color: var(--text-primary);

  &:hover,
  &:active {
    background-color: var(--element-default-active);
  }
}
.app-button--plain {
  background-color: transparent;
  color: var(--element-accent);
  padding: 0;

  &:hover,
  &:active {
    color: var(--element-accent-active);
  }
}
.app-button--block {
  width: 100%;
}
.app-button--disabled {
  cursor: not-allowed;
}
.app-button__prepend {
  margin-right: 4px;
}
</style>
