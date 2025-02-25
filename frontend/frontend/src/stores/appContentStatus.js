import { defineStore } from "pinia";

export const useAppContentStatusStore = defineStore({
    "id": "appContentStatus",
    state: () => ({
        currentUrl:  localStorage.getItem("currentUrl") || null
    }),
    getters:{
        getCurrentUrl : (state) => state.currentUrl
    },
    actions:{
        setCurrentUrl(url){
            this.currentUrl = url;

            // Save token to local storage
            localStorage.setItem("currentUrl", this.currentUrl);
        },
    }
})