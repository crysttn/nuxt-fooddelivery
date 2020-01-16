<template>
  <div class="row sticky-top">
    <div class="col">
      <h3 class="mb-3">Your cart</h3>

      <div class="table-responsive" v-if="price > 0">
        <table class="table mb-5">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dish in selectedDishes" v-bind:key="dish">
              <td scope="row">{{ dish.name }}</td>
              <td>€ {{ dish.price }}</td>
              <td>{{ dish.quantity }}</td>
              <td>
                <div class="btn-group" role="group" aria-label>
                  <button type="button" class="btn btn-sm btn-primary" @click="addToCart(dish)">+</button>
                  <button
                    type="button"
                    class="btn btn-sm btn-danger"
                    @click="removeFromCart(dish)"
                  >-</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <button
          class="btn btn-lg btn-success btn-block"
          name="button"
          @click="goToCheckout"
        >Proceed to checkout (€ {{ price }})</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations({
      addToCart: "cart/add",
      removeFromCart: "cart/remove"
    }),
    goToCheckout() {
      // Redirect to signin page if not logged in.
      const isConnected = this.$store.getters["auth/username"];
      if (!isConnected) {
        this.$router.push("/users/signin");
        return;
      }
      this.$router.push("/orders/checkout");
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    selectedDishes() {
      return this.$store.getters["cart/items"];
    },
    price() {
      return this.$store.getters["cart/price"];
    },
    numberOfItems() {
      return this.$store.getters["cart/numberOfItems"];
    }
  }
};
</script>