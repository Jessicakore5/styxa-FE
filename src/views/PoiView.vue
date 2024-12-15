<template>
  <div class="flex w-full justify-between items-center mb-8">
    <h1 class="text-2xl font-semibold text-gray-900">Point of interest</h1>

    <BaseButton
      :type="ButtonType.PRIMARY"
      text="Add New Point of interest"
      @click="isCreateModalOpen = true"
    />
  </div>
  <BaseTable
    :headers="poisHeader"
    :data="poiStore.pois"
    @on-row-click="onPoiTableRowClicked"
    @on-delete-click="onDeleteClick"
    @on-pencil-click="onEditClicked"
  />
  <!-- -->
  <BaseModal
    :is-open="isCreateModalOpen"
    :is-primary-button-disabled="poiStore.isLoading"
    primary-button-text="Create"
    @on-close="closeCreateModal"
    @on-action-click="addNewPoi"
  >
    <div class="sm:flex sm:items-start">
      <div
        class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:size-10"
      >
        <component :is="HomeIcon" class="size-6 text-indigo-500" aria-hidden="true" />
      </div>
      <div class="flex flex-col gap-y-8 ml-4">
        <h1 class="text-3xl font-semibold text-gray-900">Adding New Point of interest</h1>

        <div class="flex flex-col gap-y-4 w-[300px]">
          <BaseInput
            v-model="newPoi.poiname"
            :type="InputType.TEXT"
            label="Name"
            placeholder="Add your new point of interest name..."
          />
          <BaseInput
            v-model="newPoi.description"
            :type="InputType.TEXT"
            label="Description"
            placeholder="Add your new  point of interest  description..."
          />
          <BaseInput
            v-model="newPoi.googmapurl"
            :type="InputType.TEXT"
            label="GoogleMapUrl"
            placeholder="Add your new  point of interest map..."
          />
          <BaseInput
            v-model="newPoi.image"
            :type="InputType.TEXT"
            label="Image"
            placeholder="Add your new  point of interest  image..."
          />
        </div>
      </div>
    </div>
  </BaseModal>
  <BaseModal
    :is-open="isEditModalOpen"
    :is-primary-button-disabled="poiStore.isLoading"
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
        <h1 class="text-3xl font-semibold text-gray-900">Adding New Point of interest</h1>

        <div class="flex flex-col gap-y-4 w-[300px]">
          <BaseInput
            v-model="editedPoi.poiname"
            :type="InputType.TEXT"
            label="Name"
            placeholder="Add your new point of interest name..."
          />
          <BaseInput
            v-model="editedPoi.description"
            :type="InputType.TEXT"
            label="Description"
            placeholder="Add your new  point of interest  description..."
          />
          <BaseInput
            v-model="editedPoi.googmapurl"
            :type="InputType.TEXT"
            label="GoogleMapUrl"
            placeholder="Add your new  point of interest map..."
          />
          <BaseInput
            v-model="editedPoi.image"
            :type="InputType.TEXT"
            label="Image"
            placeholder="Add your new  point of interest  image..."
          />
          <!-- <BaseInput
            v-model="editedPoi.cityname"
            :type="InputType.TEXT"
            label="City"
            placeholder="Add your new  point of interest  city..."
          /> -->
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
          Are you sure you want to delete this Point of interest?
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
import { usePoiStore } from '@/stores/poistore'
import type { Poi } from '@/types/poi.ts'
import { InputType } from '@/types/input'
import { ButtonType } from '@/types/button'
import { useRouter } from 'vue-router'

const router = useRouter()

const poiStore = usePoiStore()

const poisHeader = ref([
  { label: 'Name', key: 'poiname' as keyof Poi },
  // { label: 'Description', key: 'description' as keyof Poi },
  { label: 'GoogleMapUrl', key: 'googmapurl' as keyof Poi },
  { label: 'Image', key: 'image' as keyof Poi },
  // { label: 'City', key: 'cityname' as keyof Poi },
])

const newPoi = ref(initializeNewPoi())
// const editPoi=ref(initializeEditPoi())
let editedPoi: Poi

const isCreateModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const isEditModalOpen = ref(false)

let poiToDeleteId: number | null
// let poiToEdit: Poi

function initializeNewPoi() {
  return {
    poiname: '',
    description: '',
    googmapurl: '',
    image: '',
    // cityname: '',
  }
}

function initializeEditPoi(poiToEdit: Poi) {
  return {
    id: poiToEdit.id,
    poiname: poiToEdit.poiname,
    description: poiToEdit.description,
    googmapurl: poiToEdit.googmapurl,
    image: poiToEdit.image,
    // cityname: poiToEdit.cityname,
  }
}

function closeCreateModal() {
  isCreateModalOpen.value = false
  newPoi.value = initializeNewPoi()
}
function closeEditModal() {
  isEditModalOpen.value = false
  // poiToEdit = {id:}
}

function onEditClicked(poiToEdit: Poi) {
  isEditModalOpen.value = true
  editedPoi = initializeEditPoi(poiToEdit)
}

function onEditConfirmed() {
  console.log(editedPoi, 'poiView')
  poiStore.updateById(editedPoi as Poi)
  closeEditModal()
}

function closeDeleteModal() {
  isDeleteModalOpen.value = false
  poiToDeleteId = null
}

function onDeleteClick(id: number) {
  isDeleteModalOpen.value = true
  poiToDeleteId = id
}

function onDeleteConfirmed() {
  poiStore.deleteById(poiToDeleteId as number)
  closeDeleteModal()
}

async function addNewPoi() {
  // validateData()

  poiStore.setIsLoading(true)
  await poiStore.addPoi(newPoi.value)
  closeCreateModal()
  poiStore.setIsLoading(false)
}

function onPoiTableRowClicked(id: number) {
  router.push(`/poi/${id}`)
}

onBeforeMount(async () => {
  await poiStore.getPois()
})
</script>
