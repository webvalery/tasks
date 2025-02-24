<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  subtext: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  maxLength: {
    type: Number,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'update:modelValue',
  'input',
  'focus',
  'blur',
  'paste',
  'keydown-enter',
  'keydown-tab',
])

const input = ref(null)

const inputClasses = computed(() => ({
  'app-input--disabled': props.disabled,
}))

const handleInputChange = (e) => {
  emit('update:modelValue', e.target.value)
  emit('input', e)
}
const handleFocusInput = (e) => {
  input.value?.focus()
  emit('focus', e)
}
const handleBlurInput = (e) => {
  emit('blur', e)
}
const handlePasteInput = (e) => {
  emit('paste', e)
}
const handleEnterInput = (e) => {
  emit('keydown-enter', e)
}
const handleTabInput = (e) => {
  emit('keydown-tab', e)
}
</script>

<template>
  <div class="app-input" :class="inputClasses">
    <label v-if="label" class="app-input__label" @click="handleFocusInput">
      {{ label }}
    </label>

    <div class="app-input__container">
      <input
        :value="modelValue"
        @input="handleInputChange"
        ref="input"
        class="app-input__root"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxLength"
        @blur="handleBlurInput"
        @paste="handlePasteInput"
        @keydown.enter="handleEnterInput"
        @keydown.tab="handleTabInput"
      />
    </div>

    <label v-if="subtext" class="app-input__subtext" @click="handleFocusInput">
      {{ subtext }}
    </label>
  </div>
</template>

<style lang="less" scoped>
.app-input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: inherit;
}
.app-input__label {
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-s);
  color: var(--text-primary);
  cursor: text;
  margin-bottom: 7px;
}
.app-input__subtext {
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  cursor: text;
  margin-top: 4px;
}
.app-input__container {
  width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--bg-white);
  border: 1px solid var(--border-normal);
  border-radius: 4px;
  cursor: text;

  &:focus-within {
    border: 1px solid var(--border-accent);
  }
}
.app-input__root {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  font-size: var(--font-size-s);
  font-weight: var(--font-weight-regular);
  color: var(--text-primary);
  appearance: none;
  cursor: inherit;
  border: 0;
  outline: none;
  font-family: inherit;
  background: transparent;
  border-radius: inherit;

  &::placeholder {
    color: var(--text-tertiary);
  }
}
</style>
