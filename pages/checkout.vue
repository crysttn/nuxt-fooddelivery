<template>
  <section class="container py-5">
    <div>
      <h1 class="my-4">
        <a class="btn btn-light mb-2" @click="$router.go(-1)">
          &lsaquo; Go back
        </a>
        Checkout
      </h1>
      <div class="row">
        <div class="col-md-6 offset-md-3 mt-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                Your cart
                <span v-if="selectedDishes.length">
                  ({{ numberOfItems }} items)
                </span>
              </h5>
              <p v-if="!selectedDishes.length">
                Your cart is currently empty.
              </p>
              <div class="table-responsive">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="dish in selectedDishes" :key="dish.id">
                      <th scope="row">{{ dish.name }}</th>
                      <td>€ {{ dish.price }}</td>
                      <td>{{ dish.quantity }}</td>
                      <td>
                        <div
                          class="btn-group"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            type="button"
                            class="btn btn-sm btn-light"
                            @click="addToCart(dish)"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            class="btn btn-sm btn-light"
                            @click="removeFromCart(dish)"
                          >
                            -
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h5 class="card-text mt-4">Cart total: ${{ price }}</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 offset-md-3 mt-3">
          <form autocomplete="off" @submit.stop.prevent="handleSubmit">
            <div class="form-group">
              <label for="address">Address</label>
              <b-form-input
                id="address"
                v-model="address"
                type="text"
                autofocus="true"
                placeholder="Enter your address"
                required
              />
            </div>
            <div class="form-group">
              <label for="postalCode">Postal Code</label>
              <b-form-input
                id="postalCode"
                v-model="postalCode"
                type="text"
                autofocus="true"
                placeholder="Enter your postal code"
                required
              />
            </div>
            <div class="form-group">
              <label for="city">City</label>
              <b-form-input
                id="city"
                v-model="city"
                type="text"
                autofocus="true"
                placeholder="Enter your city"
                required
              />
            </div>
            <div class="form-group">
              <label for="card">Card</label>
              <card
                class="form-control"
                stripe="pk_test_eYNlUeG6mKkKSVB2QuwYsUxC00NoNh9xXo"
              />
            </div>
            <button
              :disabled="loading"
              type="submit"
              class="btn btn-lg btn-success btn-block mt-4"
            >
              Pay
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Card, createToken } from 'vue-stripe-elements-plus'
import { mapMutations } from 'vuex'
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337/'
const strapi = new Strapi(apiUrl)
export default {
  components: {
    Card
  },
  data() {
    return {
      address: '',
      postalCode: '',
      city: '',
      loading: false
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    dishes() {
      return this.$store.getters['dishes/list']
    },
    selectedDishes() {
      return this.$store.getters['cart/items']
    },
    price() {
      return this.$store.getters['cart/price']
    },
    numberOfItems() {
      return this.$store.getters['cart/numberOfItems']
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true
      let token
      try {
        const response = await createToken()
        token = response.token.id
      } catch (err) {
        alert('An error occurred.')
        this.loading = false
        return
      }
      try {
        await strapi.createEntry('orders', {
          amount: this.$store.getters['cart/price'],
          dishes: this.$store.getters['cart/items'],
          address: this.address,
          postalCode: this.postalCode,
          city: this.city,
          token
        })
        alert('Your order have been successfully submitted.')
        this.emptyCart()
        this.$router.push('/')
      } catch (err) {
        this.loading = false
        alert('An error occurred.')
      }
    },
    ...mapMutations({
      addToCart: 'cart/add',
      removeFromCart: 'cart/remove',
      emptyCart: 'cart/emptyList'
    })
  }
}
</script>
