<template>
  <section class="container">
    <div>
      <h1 class="my-4">
        <a class="btn btn-light mb-2" @click="$router.go(-1)">
          &lsaquo; Go back
        </a>
        Dishes
      </h1>
      <div class="row">
        <div class="col-md-8">
          <div class="card-columns">
            <div v-for="dish in dishes" :key="dish.id" class="card">
              <img :src="dish.image.url" class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title">{{ dish.name }}</h5>
                <p class="card-text">
                  {{ dish.description || 'No description provided.' }}
                </p>
                <p class="card-text">€ {{ dish.price }}</p>
                <button class="btn btn-primary" @click="addToCart(dish)">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
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
              <h5 class="card-text mb-4">Cart total: € {{ price }}</h5>
              <button
                :disabled="!selectedDishes.length"
                class="btn btn-lg btn-block btn-success"
                @click="goToCheckout"
              >
                Place order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337/'
const strapi = new Strapi(apiUrl)
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      complete: false
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
  async fetch({ store, params }) {
    store.commit('dishes/emptyList')
    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
            restaurant(id: "${params.id}") {
              id
              name
              dishes {
                id
                name
                description
                price
                image {
                  url
                }
              }
            }
          }
          `
      }
    })
    response.data.restaurant.dishes.forEach(dish => {
      dish.image.url = `${apiUrl}${dish.image.url}`
      store.commit('dishes/add', {
        id: dish.id,
        ...dish
      })
    })
  },
  methods: {
    ...mapMutations({
      addToCart: 'cart/add',
      removeFromCart: 'cart/remove',
      emptyCart: 'cart/emptyList'
    }),
    goToCheckout() {
      // Redirect to signin page if not logged in.
      const isConnected = this.$store.getters['auth/username']
      if (!isConnected) {
        this.$router.push('/signin')
        return
      }
      this.$router.push('/checkout')
    }
  }
}
</script>
