<template>
  <div>
    <!-- You call your new Header component -->
    <Header />

    <div class="container pt-5">
      <!-- This is where all yours pages will be -->
      <nuxt />
    </div>
  </div>
</template>

<script>
// Import your new Header component
import Header from "~/components/Header.vue";
export default {
  components: {
    Header
  }
};
</script>