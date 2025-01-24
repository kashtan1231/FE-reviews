<template>
  <div class="review">
    <div class="review__content">
      <div class="logo-and-title">
        <slot name="img" />

        <h4 class="logo-and-title__title">
          {{ title }}
        </h4>
      </div>

      <div class="ratings">
        <h2 class="ratings__rating">
          {{ rating }}
        </h2>

        <div class="ratings__stars">
          <div
            v-for="item in 5"
            :key="item"
            :alt="getStarType(item)"
            :class="`ratings__stars-item ratings__stars-item--${getStarType(item)}`"
            width="20"
            height="20"
          />
        </div>

        <div class="ratings__count"> {{ count }} відгуків </div>
      </div>
    </div>

    <div class="review__buttons">
      <FButton
        tag="a"
        to="https://github.com/kashtan1231"
        target="_blank"
        visual-type="light"
        text="Переглянути"
      />
      <FButton text="Написати" @click="openModal" />
    </div>
  </div>

  <FModal v-model="isModalOpen">
    <div class="modal-review">
      <h3 class="modal-review__title">Написати відгук</h3>

      <FInput
        id="name"
        v-model="name"
        label="Ім'я *"
        placeholder="Катерина"
        :error-text="errors.name"
      />

      <FInput
        v-model="currentRating"
        id="rating"
        label="Рейтинг *"
        placeholder="Від 1 до 100"
        type="number"
        :min="1"
        :max="100"
        :error-text="errors.currentRating"
      />

      <FInput
        id="review"
        v-model="review"
        label="Відгук"
        placeholder="Відгук"
        :area-lines="4"
        is-area
      />

      <form class="modal-review__buttons" @submit.prevent="handleSubmit">
        <FButton is-full-width visual-type="light" text="Відмінити" />
        <FButton type="submit" :disabled="!meta.valid" is-full-width text="Написати" />
      </form>
    </div>
  </FModal>
</template>

<script setup lang="ts">
import FButton from '~/components/Buttons/F-Button.vue'
import FInput from '~/components/Inputs/F-Input.vue'
import FModal from '~/components/F-Modal.vue'
import * as yup from 'yup'

// test

const props = defineProps<{
  title: string
  rating: number
  count: number
}>()

const reviewsStore = useReviewsStore()

const isModalOpen = ref(false)

const schema = toTypedSchema(
  yup.object({
    name: yup.string().required("Ім'я є обов'язковим"),
    currentRating: yup
      .number()
      .required("Рейтинг є обов'язковим")
      .min(1, 'Рейтинг не може бути менше 1')
      .max(100, 'Рейтинг не може бути більше 100'),
    review: yup.string(),
  })
)

const { errors, meta, defineField, resetField } = useForm<{
  name: string
  currentRating: number
  review: string
}>({
  validationSchema: schema,
})

const [name] = defineField('name')
const [currentRating] = defineField('currentRating')
const [review] = defineField('review')

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

const openModal = () => {
  isModalOpen.value = true
}

const handleSubmit = async () => {
  await reviewsStore.SEND_REVIEW({
    name: name.value,
    rating: currentRating.value,
    text: review.value,
    id: reviewsStore.REVIEWS.length + 1,
  })

  isModalOpen.value = false
  resetField('name')
  resetField('currentRating')
  resetField('review')
}
</script>

<style lang="scss" scoped>
.review {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1458px;
  padding: 30px;
  background-color: $white;
  box-shadow: 0 4px 15px 0 rgba($black, 0.1);

  @include respond-to('mobile') {
    flex-direction: column;
    gap: 20px;
  }

  &__content {
    display: flex;
    gap: 60px;
    align-items: center;

    @include respond-to('laptop') {
      flex-direction: column;
      gap: 10px;
    }

    .logo-and-title {
      display: flex;
      gap: 20px;
      align-items: center;
    }

    .ratings {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 20px;
      align-items: center;

      &__stars {
        display: flex;
        gap: 4px;
        align-items: center;

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
    }
  }

  &__buttons {
    display: flex;
    gap: 10px;

    @include respond-to('mobile') {
      flex-direction: column;
      width: 100%;
    }
  }
}

.modal-review {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;

  &__buttons {
    display: flex;
    gap: 16px;
    width: 100%;
  }
}
</style>
