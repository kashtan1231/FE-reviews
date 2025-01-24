<template>
  <div class="review">
    <h4 class="review__title">
      {{ title }}
    </h4>

    <h2 class="review__rating">
      {{ rating }}
    </h2>

    <div class="review__stars">
      <div
        v-for="item in 5"
        :key="item"
        :alt="getStarType(item)"
        :class="`review__stars-item review__stars-item--${getStarType(item)}`"
        width="20"
        height="20"
      />
    </div>

    <div class="review__count"> {{ count }} відгуків </div>

    <div class="review__buttons">
      <FButton text="Написати" />
      <FButton
        tag="a"
        to="https://github.com/kashtan1231"
        target="_blank"
        visual-type="light"
        text="Переглянути"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import FButton from '~/Buttons/F-Button.vue'

const props = defineProps<{
  title: string
  rating: number
  count: number
}>()

const getStarType = (position: number) => {
  const fullStars = Math.floor(props.rating)
  const hasHalfStar = props.rating % 1 >= 0.1

  if (position <= fullStars) {
    return 'full'
  } else if (position === fullStars + 1 && hasHalfStar) {
    return 'half'
  }
  return 'empty'
}
</script>

<style lang="scss" scoped>
.review {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1458px;
  padding: 30px;
  box-shadow: 0 4px 15px 0 rgba($black, 0.1);

  &__title {
    margin-right: 50px;
  }

  &__rating {
    margin-right: 20px;
  }

  &__stars {
    display: flex;
    gap: 4px;
    align-items: center;
    margin-right: 20px;

    &-item {
      width: 30px;
      height: 30px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;

      &--full {
        background-image: url('~/assets/full-star.svg');
      }

      &--half {
        background-image: url('~/assets/half-star.svg');
      }

      &--empty {
        background-image: url('~/assets/empty-star.svg');
      }
    }
  }

  &__count {
    margin-right: 20px;
    color: $gray-dark;
  }

  &__buttons {
    display: flex;
    gap: 10px;
    margin-left: auto;
  }
}
</style>
