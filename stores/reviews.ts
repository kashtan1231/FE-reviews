import { defineStore } from 'pinia'
import reviewsAPI from '~/api/reviews'
import type { Reviews } from '~/types/reviews'

type State = {
  reviews: Reviews.Review[]
}

export const useReviewsStore = defineStore('reviews', {
  state: (): State => ({
    reviews: [],
  }),
  actions: {
    async GET_REVIEWS() {
      const { data, error } = await reviewsAPI.getReviews()
      if (data.value && !error.value) {
        this.reviews = data.value
      }
    },
  },
  getters: {
    REVIEWS: (state) => state.reviews,
    RATING: (state) =>
      state.reviews.reduce((acc, review) => acc + review.rating, 0) / state.reviews.length,
    COUNT: (state) => state.reviews.length,
  },
})
