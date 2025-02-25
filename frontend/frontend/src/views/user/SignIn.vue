<template>
  <div class="flex flex-col min-h-screen w-full">
    <Navigation />
    <div class="flex flex-col flex-grow justify-center mx-auto">
      <h1 class="justify-center text-center bg-teal-500 p-3 rounded-md text-white">Log in to go access</h1>

      <div class="mx-auto w-full">
        <form action="POST" @submit.prevent="userSignIn()">
          <div class="bg-white rounded-xl w-full">
            <div class="space-y-4">
              <!-- show error if there is -->
              <ul v-if="errors.length">
                <li v-for="error in errors" class="text-center text-red-600/100 bg-yellow-300">{{ error }}</li>
              </ul>
              <div>
                <label for="email" class="block mb-1 text-gray-600 font-medium">Username</label>
                <input type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-300 focus:ring-opacity-50"
                  v-model="signInDetails.username" />
              </div>
              <div>
                <label for="email" class="block mb-1 text-gray-600 font-medium">Password</label>
                <input type="password"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-300 focus:ring-opacity-50"
                  v-model="signInDetails.password" />
              </div>
            </div>
            <button
              class="mt-4 w-full bg-teal-500 hover:bg-teal-700 focus:ring focus:ring-teal-100 text-white py-2 rounded-md text-lg tracking-wide">
              Sign In
            </button>
            <div class="text-right">
              <small>Don't have an account? Try
                <router-link to="/signup" class="text-teal-500 hover:underline">Sign Up</router-link>
                first.</small>
            </div>
          </div>
        </form>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { userUserStore } from "@/stores/user";
import { USER_SIGNIN } from "@/mutations";
import NavBar from "@/views/home/Navigation.vue";
import Footer from "@/views/home/Footer.vue";
import Navigation from "../home/Navigation.vue";

export default {
  name: "SignInView",

  components: {
    Navigation,
    Footer
  },
  setup() {
    const userStore = userUserStore();
    return { userStore };
  },

  data() {
    return {
      signInDetails: {
        username: "",
        password: "",
      },
      errors: [],
    };
  },
  methods: {
    async userSignIn(forceLogout = false) {
      try {
        const user = await this.$apollo.mutate({
          mutation: USER_SIGNIN,
          variables: {
            username: this.signInDetails.username,
            password: this.signInDetails.password,
            forceLogout
          },
        });
        this.userStore.setToken(user.data.tokenAuth.token);
        this.userStore.setUser(user.data.tokenAuth.user);
        var userId = (this.userStore.getUser)['id']
        this.$router.push({
          name: "User",
          params: { userId }
        })
      } catch (error) {
        if (error.message.includes("Do you want to log out from the previous session?")) {
          const confirmLogout = confirm(
            "You are already logged in on another device. Do you want to log out from the previous session?"
          );
          if (confirmLogout) {
            this.userSignIn(true); // Retry login with forceLogout = true
          }
        } else {
          this.errors = [];
          this.errors.push(error.message);
        }
      }
    },
  },
};
</script>