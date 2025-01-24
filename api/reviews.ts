import type { Reviews } from '~/types/reviews'

const reviewsAPI = {
  getReviews() {
    return useServerAPI<Reviews.Review[]>('/reviews', {
      method: 'get',
      key: 'getReviews',
    })
  },

  sendReview(payload: Reviews.Review) {
    return useServerAPI<Reviews.Review>('/reviews', {
      method: 'post',
      key: 'sendReview',
      body: payload,
    })
  },
}

export default reviewsAPI
