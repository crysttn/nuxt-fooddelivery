<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form @submit.stop.prevent="handleSubmit">
          <h1 class="mb-5">Register</h1>
          <div class="form-group">
            <label for="inputUsername">Username</label>
            <input type="text" v-model="username" class="form-control" id="inputUsername" />
          </div>
          <div class="form-group">
            <label for="inputEmail">Email address</label>
            <input
              type="email"
              v-model="email"
              class="form-control"
              id="inputEmail"
              aria-describedby="usernameHelp"
            />
            <small
              id="usernameHelp"
              class="form-text text-muted"
            >We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group mb-5">
            <label for="inputPassword">Password</label>
            <input type="password" v-model="password" class="form-control" id="inputPassword" />
          </div>
          <button type="submit" class="btn btn-lg btn-primary btn-block mb-3" :disabled="loading">Submit</button>
          <p class="text-center">
            Already have an account?
            <router-link :to="{ name: 'users-signin'}">Sign in</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// Import mapMutations in order to call mutations from your store
import { mapMutations } from "vuex";
import strapi from "~/utils/Strapi";

export default {
  data() {
    return {
      email: "",
      password: "",
      username: "",
      loading: false
    };
  },
  methods: {
    // Method that will register your users
    async handleSubmit() {
      try {
        this.loading = true;
        const response = await strapi.register(
          this.username,
          this.email,
          this.password
        );
        this.loading = false;
        // Call your setUser mutation from your auth.js store file
        this.setUser(response.user);
        this.$router.go(-1);
      } catch (err) {
        this.loading = false;
        alert(err.message || "An error occurred.");
      }
    },
    // Define all your needed mutations, here: auth/setUser
    ...mapMutations({
      setUser: "auth/setUser"
    })
  }
};
</script>