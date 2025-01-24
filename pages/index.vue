<template>
  <NuxtLayout>
    <div class="home">
      <h1>Відгуки</h1>

      <FReview
        title="Відгуки наших клієнтів у Google"
        :rating="Number((reviewsStore.RATING / 20 + 1).toFixed(1))"
        :count="reviewsStore.REVIEWS.length"
      >
        <template #img>
          <img src="~/assets/google.svg" alt="Google" />
        </template>
      </FReview>

      <ReviewsList />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useReviewsStore } from '~/stores/reviews'

import FReview from '~/components/F-Review.vue'
import ReviewsList from '~/components/ReviewsList.vue'

const reviewsStore = useReviewsStore()

await reviewsStore.GET_REVIEWS()
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  padding: 80px 20px;
  background-color: $gray-light;
}
</style>
