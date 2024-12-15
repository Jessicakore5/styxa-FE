<template>
  <button onclick="history.back()">Go back</button>
  <div class="flex flex-col items-center justify-center h-full">
    <h1 class="text-4xl font-bold">Point of interest Detail View</h1>
    <div class="name">
      <h2>{{ localPoi.poiname }}</h2>
    </div>

    <div class="description">
      <p>{{ localPoi.description }}</p>
    </div>

    <div class="map">
      <p>{{ localPoi.googmapurl }}</p>
    </div>

    <div class="image">
      <p>{{ localPoi.image }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePoiStore } from '@/stores/poistore'
import { computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const poiStore = usePoiStore()

const localPoi = computed(() => poiStore.poi)

onBeforeMount(async () => {
  const poiId = Number(route.params.id)
  await poiStore.getPoiById(poiId)
  console.log(poiStore.poi)
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

.map {
  align-content: flex-start;
}

.image {
  width: 20%;
  height: 10%;
}
</style>
