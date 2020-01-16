<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form @submit.stop.prevent="handleSubmit">
          <h1 class="mb-5">Sign in</h1>

          <div class="form-group">
            <label for="inputEmail">Email address</label>
            <input type="email" v-model="email" class="form-control" id="inputEmail" />
          </div>

          <div class="form-group mb-5">
            <label for="inputPassword">Password</label>
            <input type="password" v-model="password" class="form-control" id="inputPassword" />
          </div>

          <button
            type="submit"
            class="btn btn-lg btn-primary btn-block mb-3"
            :disabled="loading"
          >Sign in</button>

          <p class="text-center">
            No account yet?
            <router-link :to="{ name: 'users-register'}">Register</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import strapi from "~/utils/Strapi";

export default {
  data() {
    return {
      email: "",
      password: "",
      loading: false
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.loading = true;
        const response = await strapi.login(this.email, this.password);
        this.loading = false;
        this.setUser(response.user);
        this.$router.go(-1);
      } catch (err) {
        this.loading = false;
        alert(err.message || "An error occurred.");
      }
    },
    ...mapMutations({
      setUser: "auth/setUser"
    })
  }
};
</script>