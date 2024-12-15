<template>
  <div class="flex w-full justify-between items-center mb-8">
    <h1 class="text-2xl font-semibold text-gray-900">Cities</h1>
    <BaseButton :type="ButtonType.PRIMARY" text="Add New City" @click="isCreateModalOpen = true" />
  </div>
  <BaseTable
    :headers="citiesHeader"
    :data="cityStore.cities"
    @on-row-click="onCityTableRowClicked"
    @on-delete-click="onDeleteClick"
    @on-pencil-click="onEditClicked"
  />

  <BaseModal
    :is-open="isCreateModalOpen"
    :is-primary-button-disabled="cityStore.isLoading"
    primary-button-text="Create"
    title="Create new city"
    description="This is a create new city modal"
    @on-close="closeCreateModal"
    @on-action-click="addNewCity"
  >
    <div class="sm:flex sm:items-start">
      <div
        class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:size-10"
      >
        <component :is="HomeIcon" class="size-6 text-indigo-500" aria-hidden="true" />
      </div>
      <div class="flex flex-col gap-y-8 ml-4">
        <h1 class="text-3xl font-semibold text-gray-900">Adding New City</h1>

        <div class="flex flex-col gap-y-4 w-[300px]">
          <BaseInput
            v-model="newCity.cityname"
            :type="InputType.TEXT"
            label="Name"
            placeholder="Add your new city's name..."
          />
          <BaseInput
            v-model="newCity.description"
            :type="InputType.TEXT"
            label="Description"
            placeholder="Add your new city's description..."
          />
          <BaseInput
            v-model="newCity.population"
            :type="InputType.NUMBER"
            label="Population"
            placeholder="Add your new city's population..."
          />
        </div>
      </div>
    </div>
  </BaseModal>
  <BaseModal
    :is-open="isEditModalOpen"
    :is-primary-button-disabled="cityStore.isLoading"
    primary-button-text="Edit"
    @on-close="closeEditModal"
    @on-action-click="onEditConfirmed"
  >
    <div class="sm:flex sm:items-start">
      <div
        class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:size-10"
      >
        <component :is="HomeIcon" class="size-6 text-indigo-500" aria-hidden="true" />
      </div>
      <div class="flex flex-col gap-y-8 ml-4">
        <h1 class="text-3xl font-semibold text-gray-900">Adding New City</h1>

        <div class="flex flex-col gap-y-4 w-[300px]">
          <BaseInput
            v-model="editedCity.cityname"
            :type="InputType.TEXT"
            label="Name"
            placeholder="Add your new city name..."
          />
          <BaseInput
            v-model="editedCity.description"
            :type="InputType.TEXT"
            label="Description"
            placeholder="Add your new cityi's  description..."
          />
          <BaseInput
            v-model="editedCity.population"
            :type="InputType.NUMBER"
            label="Population"
            placeholder="Add your new cityi's population..."
          />
        </div>
      </div>
    </div>
  </BaseModal>

  <BaseModal
    :is-open="isDeleteModalOpen"
    primary-button-text="Delete"
    @on-close="closeDeleteModal"
    @on-action-click="onDeleteConfirmed"
  >
    <div class="sm:flex sm:items-start">
      <div
        class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-indigo-123 sm:mx-0 sm:size-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="1 0 22 22"
          stroke-width="1.7"
          stroke="Red"
          class="size-16"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
      </div>
      <div class="flex flex-col gap-y-0.30 ml-4">
        <h1 class="text-2xl font-semibold text-gray-900">
          Are you sure you want to delete this city?
        </h1>
        <div class="flex flex-col gap-y-2 w-[300px]"></div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import BaseTable from '@/components/base/BaseTable.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { HomeIcon } from '@heroicons/vue/24/outline'
import { useCityStore } from '@/stores/citystore'
import type { City } from '@/types/city'
import { InputType } from '@/types/input'
import { ButtonType } from '@/types/button'
import { useRouter } from 'vue-router'

const router = useRouter()

const cityStore = useCityStore()

const citiesHeader = ref([
  { label: 'Name', key: 'cityname' as keyof City },
  // { label: 'Description', key: 'description' as keyof City },
  { label: 'Population', key: 'population' as keyof City },
  // { label: 'GoogleMapUrl', key: 'googmapurl' as keyof City },
])

const newCity = ref(initializeNewCity())

let editedCity: City

const isCreateModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const isEditModalOpen = ref(false)

let cityToDeleteId: number | null

function initializeNewCity() {
  return {
    cityname: '',
    description: '',
    population: 0,
  }
}

function initializeEditCity(cityToEdit: City) {
  return {
    id: cityToEdit.id,
    cityname: cityToEdit.cityname,
    description: cityToEdit.description,
    population: cityToEdit.population,
  }
}

function closeCreateModal() {
  isCreateModalOpen.value = false
  newCity.value = initializeNewCity()
}

function closeDeleteModal() {
  isDeleteModalOpen.value = false
  cityToDeleteId = null
}

function onDeleteClick(id: number) {
  isDeleteModalOpen.value = true
  cityToDeleteId = id
}

function onDeleteConfirmed() {
  cityStore.deleteById(cityToDeleteId as number)
  closeDeleteModal()
}

function closeEditModal() {
  isEditModalOpen.value = false
}
function onEditClicked(cityToEdit: City) {
  isEditModalOpen.value = true
  editedCity = initializeEditCity(cityToEdit)
}
function onEditConfirmed() {
  cityStore.updateById(editedCity as City)
  closeEditModal()
}

async function addNewCity() {
  // validateData()

  cityStore.setIsLoading(true)
  await cityStore.addCity(newCity.value)
  closeCreateModal()

  cityStore.setIsLoading(false)
}

function onCityTableRowClicked(id: number) {
  router.push(`/cities/${id}`)
}

onBeforeMount(async () => {
  await cityStore.getCities()
})
</script>
