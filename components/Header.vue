<template>
  <nav
    class="navbar navbar-expand navbar-light fixed-top"
    style="background-color: #F6C330;"
  >
    <div class="container px-md-3">
      <router-link tag="a" class="navbar-brand" to="/" exact>
        Restos
      </router-link>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">
          <li v-if="username" class="nav-item">
            <a href="#" class="nav-link"> Hello {{ username }} </a>
          </li>
          <li v-if="username" class="nav-item">
            <a href="#" class="nav-link" @click="logout">
              Logout
            </a>
          </li>
          <li v-if="!username" class="nav-item">
            <router-link
              v-if="!username"
              tag="a"
              class="nav-link"
              to="/signin"
              exact
            >
              Sign in
            </router-link>
          </li>
          <li v-if="!username" class="nav-item">
            <router-link
              v-if="!username"
              tag="a"
              class="nav-link"
              to="/signup"
              exact
            >
              Sign up
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  computed: {
    username() {
      return this.$store.getters['auth/username']
    }
  },
  methods: {
    ...mapMutations({
      logout: 'auth/logout'
    })
  }
}
</script>
