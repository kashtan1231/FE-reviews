<template>
  <component
    :is="computedTag"
    :aria-label="ariaLabel || text"
    :class="[
      'button',
      `button--${visualType}`,
      `button--${size}`,
      { 'button--full-width': isFullWidth },
    ]"
    :disabled="disabled"
  >
    <slot name="left" />
    {{ shownText }}
    <slot name="right" />
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text?: string
    visualType?: 'primary' | 'light'
    tag?: 'a' | 'button'
    size?: 'large' | 'medium' | 'small'
    ariaLabel?: string
    disabled?: boolean
    isFullWidth?: boolean
  }>(),
  {
    text: '',
    visualType: 'primary',
    tag: 'button',
    ariaLabel: undefined,
    size: 'medium',
    disabled: false,
  }
)

const computedTag = computed(() => {
  if (props.tag === 'a') return resolveComponent('NuxtLink')
  return h('button', { type: 'button' })
})

const shownText = computed(() => {
  return props.text
})
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-width: fit-content;
  padding: 12px 20px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border-radius: 8px;
  transition-duration: $transition-duration;

  @include respond-to('mobile') {
    width: 100%;
  }

  &--primary {
    color: $white;
    background-image: linear-gradient(90.66deg, $green 20.57%, $blue 99.43%);
    background-position: 50% 0%;
    background-size: 200% 100%;
    transition: background-position 0.3s ease;

    &:hover {
      background-position: 0% 0%;
    }
  }

  &--light {
    color: $black;
    background-color: $gray-light;
    box-shadow: inset 0 0 0 1px $gray;

    &:hover {
      color: $white;
      background-color: $green;
      box-shadow: none;
    }
  }

  &--medium {
    @extend %p;

    height: 48px;
  }

  &--large {
    height: 56px;
    padding: 16px 24px;
    font-size: 16px;
    line-height: 24px;
    text-transform: uppercase;

    @include respond-to('mobile') {
      padding: 12px 16px;
    }
  }

  &--small {
    @extend %p;

    height: 36px;
    padding: 8px 20px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &--full-width {
    width: 100%;
  }
}
</style>
