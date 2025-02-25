import { defineStore } from 'pinia';

export const userSpinnerStore = defineStore('spinnerStore', {
  state: () => ({
    showSpinner: false,
  }),
  actions: {
    setSpinner(value) {
      this.showSpinner = value;
    },
  },
});
