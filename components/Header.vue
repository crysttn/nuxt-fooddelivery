<template>
  <client-only>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Nom</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/">
              Home
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/restaurants">Restaurants</a>
          </li>
        </ul>
        <ul class="navbar-nav" v-if="username">
          <li class="nav-item">
            <a href="#" class="nav-link">
              <img
                src="https://www.feralinteractive.com/data/games/legomovie/images/characters/full/benny.png"
                class="img-thumbnail"
                height="24"
                width="24"
                alt
              />
              {{ username }}
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" @click="logout">Log out</a>
          </li>
        </ul>
        <ul class="navbar-nav" v-else>
          <li class="nav-item">
            <a href="/users/register" class="nav-link">Register</a>
          </li>
          <li class="nav-item">
            <a href="/users/signin" class="nav-link">Sign in</a>
          </li>
        </ul>
      </div>
    </nav>
  </client-only>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  computed: {
    // Set your username thanks to your getter
    username() {
      return this.$store.getters["auth/username"];
    }
  },
  methods: {
    // Define your needed mutations, here: auth/logout
    ...mapMutations({
      logout: "auth/logout"
    })
  }
};
</script>