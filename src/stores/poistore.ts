import { defineStore } from 'pinia'
import type { Poi } from '@/types/poi'

export const usePoiStore = defineStore('poi', {
  state: () => ({
    pois: [] as Poi[],
    poi: {} as Poi,
    isLoading: false,
  }),
  actions: {
    setIsLoading(value: boolean) {
      this.isLoading = value
    },

    async getPois() {
      try {
        this.isLoading = true
        const response = await fetch('http://localhost:3000/poi')
        const data = await response.json()
        if (data) {
          this.pois = data
          // console.log(this.pois)
        }
      } catch (error) {
        console.error('Error getting point of interest: ', error)
      } finally {
        this.isLoading = false
      }
    },

    async getPoiById(id: number) {
      try {
        const response = await fetch(`http://localhost:3000/poi/${id}`)
        const data = await response.json()
        if (data) {
          this.poi = data[0]
        }
      } catch (error) {
        console.error('Error getting poi by id: ', error)
      }
    },

    async addPoi(poi: Partial<Poi>) {
      try {
        const response = await fetch('http://localhost:3000/poi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(poi),
        })
        const data = await response.json()
        console.log(data)
        if (data) {
          // this.pois.push(data)
          this.getPois()
        }
      } catch (error) {
        console.error('Error adding a new point of interest: ', error)
      }
    },

    async updateById(poi: Poi) {
      try {
        const response = await fetch(`http://localhost:3000/poi/${poi.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(poi),
        })
        const data = await response.json()
        this.getPois()
        if (data) {
          this.poi = data[0]
        }
      } catch (error) {
        console.error('Error updateing poi:', error)
      }
    },
    async deleteById(id: number) {
      try {
        const response = await fetch(`http://localhost:3000/poi/${id}`, {
          method: 'DELETE',
        })
        const data = await response.json()
        this.getPois()
        if (data) {
          this.poi = data[0]
        }
      } catch (error) {
        console.error('Error deleting poi:', error)
      }
    },
  },
})
