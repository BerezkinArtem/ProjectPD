<template>
  <div class="fullscreen bg-grey-1 text-center q-pa-md flex flex-center">
    <div>
      <div class="text-grey-9" style="font-size: 20vh; font-weight: 300; line-height: 1">
        404
      </div>

      <div class="text-subtitle1 text-grey-7 q-mt-md">
        Страница не найдена
      </div>

      <q-btn
        class="q-mt-lg"
        unelevated
        color="grey-8"
        text-color="white"
        to="/"
        label="На главную"
        no-caps
        padding="10px 24px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ErrorNotFound'
});
</script>

<style scoped>
.q-btn {
  border-radius: 6px;
  font-weight: 500;
  letter-spacing: normal;
}
</style>