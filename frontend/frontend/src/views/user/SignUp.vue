<template>
  <div class="flex flex-col min-h-screen w-full">
    <Navigation />
    <div class="flex flex-col flex-grow justify-center mx-auto">
      <h1 class="justify-center text-center bg-teal-500 p-3 rounded-md text-white">Create a new account</h1>

      <div class="mx-auto w-full">
        <form action="POST" @submit.prevent="userSignUp">
          <div class="bg-white rounded-xl w-full">
            <div class="space-y-4">
              <p v-if="errors.length">
              <ul>
                <li v-for="error in errors" class="text-center text-red-600/100 bg-yellow-300">{{ error }}</li>
              </ul>
              </p>
              <div>
                <label for="email" class="block mb-1 text-gray-600 font-medium">Username</label>
                <input type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-300 focus:ring-opacity-50"
                  v-model="signUpDetails.username" />
              </div>
              <div>
                <label for="email" class="block mb-1 text-gray-600 font-medium">Email</label>
                <input type="email"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-300 focus:ring-opacity-50"
                  v-model="signUpDetails.email" />
              </div>
              <div>
                <label for="email" class="block mb-1 text-gray-600 font-medium">Password</label>
                <input type="password"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-300 focus:ring-opacity-50"
                  v-model="signUpDetails.password" />
              </div>
            </div>
            <button
              class="mt-4 w-full bg-teal-500 hover:bg-teal-700 focus:ring focus:ring-teal-100 text-white py-2 rounded-md text-lg tracking-wide">
              Sign Up
            </button>
            <div class="text-right">
              <small>Already have an account? Try
                <router-link to="/signin" class="text-teal-500 hover:underline">Sign In</router-link>
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
import { USER_SIGNUP, USER_SIGNIN } from "@/mutations";
import Footer from "@/views/home/Footer.vue";
import Navigation from "../home/Navigation.vue";

export default {
  name: "SignUpView",

  components: {
    Footer,
    Navigation
  },

  setup() {
    const userStore = userUserStore();
    return { userStore };
  },

  data() {
    return {
      signUpDetails: {
        username: "",
        email: "",
        password: "",
      },
      errors: [],
    };
  },
  methods: {

    async userSignUp() {
      // Register user
      try {
        if (this.signUpDetails.username.length != 0 || this.signUpDetails.email != 0 || this.signUpDetails.password != 0) {
          console.log("I am not empty")
          const user = await this.$apollo.mutate({
            mutation: USER_SIGNUP,
            variables: {
              username: this.signUpDetails.username,
              email: this.signUpDetails.email,
              password: this.signUpDetails.password,
            },
          });
          console.log(user.data)
          this.$router.push({
            name: "SignIn",
          })
        } else {
          this.errors.push("Fields are empty")
          console.log(" Empty")
        }
      } catch (errors) {
        console.log(errors.message)
        this.errors = [];
        this.errors.push(errors.message)
      }

      // Sign in
      // const user = await apolloClient.mutate({
      //   mutation: USER_SIGNIN,
      //   variables: {
      //     username: this.signUpDetails.username,
      //     password: this.signUpDetails.password,
      //   },
      // });

      // this.userStore.setToken(user.data.tokenAuth.token);
      // this.userStore.setUser(user.data.tokenAuth.user);
    }
  },
};
</script>