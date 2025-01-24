<template>
  <div :class="['input', { 'input--full-width': isFullWidth }]">
    <label v-if="label" class="input__label" :for="id" v-html="label"></label>
    <textarea
      v-if="isArea"
      :id="id"
      :name="name || id"
      class="input__input-text-area"
      :value="modelValue"
      @input="onInput"
    />

    <div v-else class="input__input-area" @click="inputRef?.focus()">
      <slot name="before" />

      <input
        :id="id"
        ref="inputRef"
        class="input__input-area-field"
        :name="name || id"
        :type="isPasswordShow ? 'text' : type"
        :max="max"
        :placeholder="placeholder"
        :value="modelValue"
        :maxlength="100"
        :autocomplete="id"
        :disabled="disabled"
        :aria-invalid="errorText ? true : false"
        @input="onInput"
      />

      <slot name="after" />
    </div>
    <p v-if="errorText" class="input__error">{{ errorText }}</p>
  </div>
</template>

<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'

type value = string | number

const props = withDefaults(
  defineProps<{
    modelValue: Nullable<value>
    placeholder?: string
    type?: InputHTMLAttributes['type']
    label?: string
    id: string
    name?: string
    errorText?: Nullable<string>
    max?: number
    disabled?: boolean
    isArea?: boolean
    areaLines?: number
    isFullWidth?: boolean
  }>(),
  {
    placeholder: '',
    type: 'text',
    label: '',
    errorText: '',
    name: '',
    max: undefined,
    areaLines: 3,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: value): void
}>()

const inputRef = ref<Nullable<HTMLInputElement>>(null)

const isPasswordShow = ref(false)

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement

  let value: value = target.value

  if (props.type === 'number') {
    value = +target.value
  }

  emit('update:modelValue', value)
}
</script>

<style lang="scss" scoped>
.input {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__label {
    display: block;
    margin-bottom: 8px;
    font-size: 12px;
    line-height: 16px;
  }

  &__input-area {
    display: flex;
    gap: 12px;
    align-items: center;
    width: 100%;
    padding: 12px 16px;
    cursor: text;
    border-radius: 4px;
    box-shadow: inset 0 0 0 1px $gray;
    transition-duration: $transition-duration;

    &:focus-within {
      background-color: rgba($color: $blue, $alpha: 5%);
      box-shadow: inset 0 0 0 1px $blue;
    }

    &:has(:disabled) {
      background-color: $gray-light;
      box-shadow: inset 0 0 0 1px $gray;
    }

    &:has([aria-invalid='true']:not(:disabled)) {
      box-shadow: inset 0 0 0 1px $red;

      &:focus-within {
        background-color: rgba($color: $red, $alpha: 5%);
      }
    }

    &-field {
      @extend %p;

      width: 100%;
      color: $black;

      &::placeholder {
        color: $gray;
      }

      &:disabled {
        cursor: not-allowed;
      }

      &[aria-invalid='true']:not(:disabled) {
        &::placeholder {
          color: $red;
        }
      }
    }

    &-clear {
      min-width: 12px;
      max-width: 12px;
      min-height: 12px;
      max-height: 12px;
      color: $gray-dark;
      cursor: pointer;
    }
  }

  &__input-text-area {
    @extend %p;

    min-height: calc(24px * v-bind('areaLines') + 12px * 2);
    padding: 12px 16px;
    resize: vertical;
    border-radius: 4px;
    box-shadow: inset 0 0 0 1px $gray;
    transition:
      box-shadow,
      background-color $transition-duration;

    &:focus {
      background-color: rgba($color: $blue, $alpha: 5%);
      box-shadow: inset 0 0 0 1px $blue;
    }
  }

  &__error {
    @extend %p-small;

    margin-top: 8px;
    color: $red;
  }
}
</style>
