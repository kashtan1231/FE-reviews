import type { Reviews } from '~/types/reviews'

const reviewsAPI = {
  getReviews() {
    return useServerAPI<Reviews.Review[]>('/reviews', {
      method: 'get',
      key: 'getReviews',
    })
  },
}

export default reviewsAPI
