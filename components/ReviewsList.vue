<template>
  <div class="reviews-list">
    <div v-for="review in reviews" :key="review.id" class="list-item" @click="openModal(review)">
      <h4 class="list-item__title">{{ review.name }}</h4>
      <p class="list-item__text">{{ review.text }}</p>

      <h3
        :class="[
          'list-item__rating',
          {
            'list-item__rating--good': review.rating >= 66,
            'list-item__rating--bad': review.rating < 33,
          },
        ]"
      >
        {{ review.rating }}
      </h3>
    </div>
  </div>

  <FModal v-model="isModalOpen">
    <div class="modal-content">
      <div class="modal-content__header">
        <h3 class="modal-content__header-name">{{ currentReview?.name }}</h3>
        <h3
          :class="[
            'modal-content__header-rating',
            {
              'modal-content__header-rating--good': (currentReview?.rating || 0) >= 66,
              'modal-content__header-rating--bad': (currentReview?.rating || 0) < 33,
            },
          ]"
        >
          {{ currentReview?.rating }}
        </h3>
      </div>

      <p class="modal-content__text">{{ currentReview?.text }}</p>
    </div>
  </FModal>
</template>

<script setup lang="ts">
import type { Reviews } from '~/types/reviews'
import FModal from '~/components/F-Modal.vue'

const reviewsStore = useReviewsStore()
const reviews = computed(() => [...reviewsStore.REVIEWS].reverse())

const currentReview = ref<Nullable<Reviews.Review>>(null)
const isModalOpen = ref(false)

const openModal = (review: Reviews.Review) => {
  currentReview.value = review
  isModalOpen.value = true
}
</script>

<style lang="scss" scoped>
.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 20px;
  background-color: $white;

  .list-item {
    display: flex;
    gap: 24px;
    align-items: center;
    padding: 24px 16px;
    background-color: $white;
    border-radius: 16px;
    box-shadow: inset 0 0 0 2px $gray-light;
    transition-duration: $transition-duration;

    &:hover {
      cursor: pointer;
      background-color: $gray-light;
    }

    &__text {
      flex: 1;

      @include max-lines(1);

      @include respond-to('mobile') {
        display: none;
      }
    }

    &__rating {
      margin-left: auto;
      color: $yellow;

      &--good {
        color: $green;
      }

      &--bad {
        color: $red;
      }
    }
  }
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__header {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: space-between;

    &-rating {
      color: $yellow;

      &--good {
        color: $green;
      }

      &--bad {
        color: $red;
      }
    }
  }

  &__text {
    max-height: 400px;
    overflow: auto;
  }
}
</style>
