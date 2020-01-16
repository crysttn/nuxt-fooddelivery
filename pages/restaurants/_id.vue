<template>
  <div>
    <div class="row">
      <div class="col">
        <a class="btn btn-light mb-2" @click="$router.go(-1)">&lsaquo; Go back</a>
        <h1 class="mb-5">{{ restaurant.name }}</h1>
      </div>
    </div>
    <client-only>
      <div class="row">
        <div class="col-lg-8">
          <div class="card-deck">
            <div class="card" v-for="dish in restaurant.dishes" v-bind:key="dish">
              <img class="card-img-top" :src="'https://hidden-springs-04285.herokuapp.com/' + dish.image[0].url" alt />
              <div class="card-body">
                <h5 class="card-title">
                  {{ dish.name }}
                  <span>€ {{ dish.price }}</span>
                </h5>
                <p class="card-text">{{ dish.description }}</p>
                <a href="#" class="btn btn-primary" @click="addToCart(dish)">&plus; Add to cart</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <Cart />
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Cart from "~/components/Cart.vue";
import restaurantQuery from "~/apollo/queries/restaurant/restaurant";

export default {
  data() {
    return {
      restaurant: Object
    };
  },
  apollo: {
    restaurant: {
      prefetch: true,
      query: restaurantQuery,
      variables() {
        return { id: this.$route.params.id };
      }
    }
  },
  components: {
    Cart
  },
  methods: {
    ...mapMutations({
      addToCart: "cart/add",
      removeFromCart: "cart/remove"
    })
  }
};
</script>