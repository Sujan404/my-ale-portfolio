<template>
  <div>
    <div class="sticky">
      <div class=" absolute right-0 top-0">
        <div v-if="showSuccess" id="toast-success"
          class="toast flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert">
          <!-- :class="{ hidden: !isOnline, 'animate-fadeOut' : !hideAgain }" -->
          <div
            class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
              viewBox="0 0 20 20">
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="sr-only">Check icon</span>
          </div>
          <div class="ms-3 text-sm font-normal">Internet is connected.</div>
        </div>

        <div v-if="showWarning" id="toast-warning"
          class="toast opacity-90 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 animate-fadeOut"
          role="alert">
          <!-- :class="{ hidden: isOnline , 'animate-fadeOut' : hideAgain}" -->
          <div
            class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
              viewBox="0 0 20 20">
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
            </svg>
            <span class="sr-only">Warning icon</span>
          </div>
          <div class="ms-3 text-sm font-normal">Internet is disconnected.</div>
        </div>
      </div>
    </div>
    <router-view> </router-view>
    <router-view name="a"></router-view>
    <router-view name="b"></router-view>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

<script>
import { SITE_INFO } from "@/queries";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { computed } from 'vue';
import { useHead } from '@unhead/vue'

export default {
  setup() {
    useHead({
      title: "Sujan Ale",
      meta: [
        {
          name: "og:description",
          content: "My software engineering blog website.",
        },
      ],
    });
    const route = useRoute();


    return { route }
  },

  data() {
    return {
      mySite: null,
    }
  },
  setup() {
    const showSuccess = ref(false);
    const showWarning = ref(false);

    // Handle online status
    window.addEventListener("online", () => {
      showWarning.value = false;
      showSuccess.value = true;

      // Fade out the success toast after 1.5 seconds
      setTimeout(() => {
        showSuccess.value = false;
      }, 3000);
    });

    // Handle offline status
    window.addEventListener("offline", () => {
      showSuccess.value = false;
      showWarning.value = true;

      // Keep the warning toast visible until back online
    });

    return { showSuccess, showWarning };
  },

  methods: {
    async logout() {
      this.userStore.removeToken();
      this.userStore.removeUser();
      this.$router.push({ name: "SignIn" });
    }
  }

};
</script>