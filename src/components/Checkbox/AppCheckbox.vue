<script setup>
import { inject, ref, computed } from 'vue'
import { generateRandomString } from '@/lib/utils/string.js'

import AppIcon from '@/components/Icon/AppIcon.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'change'])
const $validate = inject('$validate')

const uniqueId = ref(generateRandomString())

const inputClasses = computed(() => {
  return {
    'app-checkbox--disabled': props.disabled,
  }
})

const updateChecked = (e) => {
  if (!props.disabled) {
    emit('update:modelValue', e.target.checked)
    emit('change', e.target.checked)
  }
}
</script>

<template>
  <div class="app-checkbox" :class="inputClasses">
    <input
      :checked="modelValue"
      :id="uniqueId"
      :disabled="disabled"
      class="checkbox__input"
      type="checkbox"
      @change="updateChecked"
    />

    <label class="checkbox__label-wrapper" :for="uniqueId">
      <div class="checkbox__custom">
        <div class="checkbox__icon">
          <app-icon name="check" width="8" height="6" />
        </div>
      </div>

      <span v-if="$validate.isNotEmptyString(label)" class="checkbox__label">{{ label }}</span>
    </label>
  </div>
</template>

<style lang="less" scoped>
.app-checkbox {
  display: flex;
}
.app-checkbox--disabled .checkbox__label-wrapper {
  cursor: not-allowed;
}
.checkbox__input {
  display: none;

  &:checked + .checkbox__label-wrapper .checkbox__custom {
    border: 1px solid transparent;
    background-color: var(--element-accent);
  }

  &:checked + .checkbox__label-wrapper .checkbox__custom .checkbox__icon {
    display: block;
  }
}
.checkbox__label-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.checkbox__custom {
  width: 18px;
  height: 18px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-radius: 4px;
  border: 1px solid var(--border-muted);

  .checkbox__icon {
    display: none;
  }
}
.checkbox__icon {
  color: var(--element-white);
  width: 8px;
  height: 6px;
}
.checkbox__label {
  margin-left: 8px;
  font-size: var(--font-size-s);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  user-select: none;
}
</style>
