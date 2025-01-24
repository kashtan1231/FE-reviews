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
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useReviewsStore } from '~/stores/reviews'
import FReview from '~/components/F-Review.vue'

const reviewsStore = useReviewsStore()

await reviewsStore.GET_REVIEWS()
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  height: 100vh;
  padding: 80px 20px;
}
</style>
