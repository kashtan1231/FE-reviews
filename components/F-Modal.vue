<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="modelValue" class="modal" v-bind="$attrs" @click.self="close">
        <div class="modal__wrapper">
          <FButton class="modal__close" visual-type="light" @click="close">
            <template #right>
              <crossSvg />
            </template>
          </FButton>

          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import crossSvg from '~/assets/cross-svg.vue'
import FButton from '~/components/Buttons/F-Button.vue'

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const close = () => {
  emit('update:modelValue', false)
}

defineOptions({
  inheritAttrs: false,
})
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 16px;
  background: rgba($black, 50%);

  &__wrapper {
    position: relative;
    width: 100%;
    max-width: 600px;
    height: fit-content;
    max-height: 80vh;
    padding: 24px;
    background-color: $white;
    border-radius: 16px;
  }

  &__close {
    position: absolute;
    bottom: calc(100% + 16px);
    left: calc(100% + 16px);
    z-index: 1;
    width: fit-content;
    color: $red;

    @include respond-to('mobile') {
      right: 0;
      left: unset;
    }
  }
}
</style>
