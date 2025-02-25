import { defineStore } from 'pinia'

export const userBreadCrumbListStore = defineStore('breadCrumbList', {
  state: () => ({
    breadCrumbList: []
  }),
  actions: {
    setBreadCrumbList(value) {
      if (value.length.length != 0) {
        this.breadCrumbList = []
        value.forEach(this.addBreadCrumbNameToList)
      }
    },
    addBreadCrumbNameToList(item){
        this.breadCrumbList.push(item)
    }
  }
})
