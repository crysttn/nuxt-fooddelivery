<template>
  <div>
    <div class="row">
      <div class="col">
        <a class="btn btn-light mb-2" @click="$router.go(-1)">&lsaquo; Go back</a>
      </div>
    </div>

    <client-only placeholder="Chargement...">
      <div class="row">
        <div class="col-lg-8">
          <form @submit.stop.prevent="handleSubmit">
            <h1 class="mb-5">Checkout</h1>

            <div class="form-group">
              <label for="inputAddress">Address</label>
              <input class="form-control" v-model="address" type="text" id="inputAddress" />
            </div>

            <div class="form-group">
              <label for="inputCity">City</label>
              <input class="form-control" v-model="city" type="text" id="inputCity" />
            </div>

            <div class="form-group">
              <label for="inputPostalCode">Postal code</label>
              <input class="form-control" v-model="postalCode" type="text" id="inputPostalCode" />
            </div>

            <div class="form-group mb-5">
              <label for="inputCard">Card</label>
              <card
                ref="card-stripe"
                stripe="pk_test_eYNlUeG6mKkKSVB2QuwYsUxC00NoNh9xXo"
                @change="complete = $event.complete"
                id="inputCart"
              />
            </div>

            <button
              class="btn btn-lg btn-success btn-block"
              v-show="$route.path !== '/orders/checkout'"
              @click="handleSubmit"
              name="button"
            >Submit order (€ {{ price }})</button>
          </form>
        </div>
        <div class="col-lg-4">
          <Cart />
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import Cart from "~/components/Cart.vue";
import { Card, createToken } from "vue-stripe-elements-plus";
import strapi from "~/utils/Strapi";

export default {
  components: {
    Card,
    Cart
  },
  data() {
    return {
      address: "",
      postalCode: "",
      city: "",
      complete: false,
      loading: false
    };
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      let token;
      try {
        const response = await createToken();
        token = response.token.id;
      } catch (err) {
        alert("An error occurred.");
        this.loading = false;
        return;
      }
      try {
        await strapi.createEntry("orders", {
          amount: this.$store.getters["cart/price"],
          dishes: this.$store.getters["cart/items"],
          address: this.address,
          postalCode: this.postalCode,
          city: this.city,
          token
        });
        alert("Your order have been successfully submitted.");
        this.emptyCart();
        this.$router.push("/");
      } catch (err) {
        this.loading = false;
        alert("An error occurred.");
      }
    }
  }
};
</script>