<template>
  <div class="row">
    <div class="col">
      <h1 class="mb-3">Restaurants</h1>
      <form class="mb-5">
        <input
          class="form-control"
          v-model="query"
          type="search"
          placeholder="Start typing to search for a restaurant..."
          aria-label="Search"
        />
      </form>
      <div class="card-deck">
        <div
          class="card"
          v-for="restaurant in filteredList"
          v-bind:key="restaurant"
        >
          <img class="card-img-top" :src="'http://localhost:1337/' + restaurant.image[0].url" alt />
          <div class="card-body">
            <h5 class="card-title">{{ restaurant.name }}</h5>
            <p class="card-text">{{ restaurant.description }}</p>
            <router-link
              :to="{ name: 'restaurants-id', params: { id: restaurant.id }}"
              tag="a"
              class="btn btn-primary"
            >See dishes</router-link>
          </div>
        </div>
      </div>

      <div class="text-center" v-if="filteredList.length == 0">
        <img
          src="https://assets-ouch.icons8.com/preview/19/52de2377-696e-4194-8c63-0a81aef60b4f.png"
          height="384"
          width="auto"
        />
        <p class="h3">No restaurants found</p>
      </div>
    </div>
  </div>
</template>

<script>
// Import the restaurants query
import restaurantsQuery from "~/apollo/queries/restaurant/restaurants";

export default {
  data() {
    return {
      // Initialize an empty restaurants variabkle
      restaurants: [],
      query: ""
    };
  },
  apollo: {
    restaurants: {
      prefetch: true,
      query: restaurantsQuery
    }
  },
  computed: {
    // Search system
    filteredList() {
      return this.restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(this.query.toLowerCase());
      });
    }
  }
};
</script>