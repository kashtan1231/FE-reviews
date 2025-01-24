<template>
  <div class="review">
    <h4 class="review__title">
      {{ title }}
    </h4>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  rating: number
  count: number
}>()
</script>

<style lang="scss" scoped>
.review {
  display: flex;
  gap: 16px;
  padding: 30px;
  box-shadow: 0 4px 15px 0 rgba($black, 0.1);
}
</style>
