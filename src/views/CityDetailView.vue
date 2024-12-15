<template>
  <div class="arrow">
    <div class="button">
      <button onclick="history.back()">Go back</button>
    </div>
  </div>
  <div class="flex flex-col items-center justify-center h-full content">
    <h1 class="text-4xl font-bold">City Detail View</h1>
    <div class="name">
      <h2>{{ localCity.cityname }}</h2>
    </div>
    <div class="description">
      <p>{{ localCity.description }}</p>
    </div>
    <div class="population">
      <!-- <p>{{ localCity.population }}</p> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCityStore } from '@/stores/citystore'
import { computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const cityStore = useCityStore()

const localCity = computed(() => cityStore.city)

onBeforeMount(async () => {
  const cityId = Number(route.params.id)
  await cityStore.getCityById(cityId)
  console.log(cityStore.city)
})
</script>
<style>
.content {
  text-align: center;
  font-size: large;
}

.name {
  font-weight: bolder;
  font-size: x-large;
  font-style: initial;
}

.description {
  font-size: larger;
  font-style: inherit;
  text-align: justify;
}
</style>
