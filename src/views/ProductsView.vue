<template>
  <main>
    <section class="section-top mb-5">
      <div class="bg-top"></div>
    </section>
    <section class="container p-5">
      <div class="row gx-5">
        <ProductsList @get-category="getCategory"></ProductsList>
        <div class="products-items col-sm-9">
          <div class="products">
            <div class="row row-cols-2 row-cols-lg-3 g-lg-5">
              <div
                class="col align-items-center mb-5"
                v-for="product in products"
                :key="product.id"
              >
                <div class="card-product" style="">
                  <router-link :to="`/product/${product.id}`">
                    <div
                      class="pic ratio ratio-1x1"
                      :style="{ backgroundImage: `url(${product.imageUrl})` }"
                    ></div>
                  </router-link>
                  <div class="card-body pb-0">
                    <p class="card-title text-center fs-6">
                      {{ product.title }}
                      <span class="badge bg-secondary rounded-pill">{{
                        product.category
                      }}</span>
                    </p>
                  </div>
                  <div class="price text-center">
                    <div v-if="product.origin_price === product.price">
                      <p class="fs-6 d-inline">NT${{ product.price }}</p>
                    </div>
                    <div v-else>
                      <p class="fs-6 d-inline">NT${{ product.price }}&nbsp;</p>
                      <span class="text-decoration-line-through fw-light"
                        >NT${{ product.origin_price }}</span
                      >
                    </div>
                    <div class="btn-group mt-2  w-100 border border-primary">
                      <button
                        type="button"
                        class="btn text-dark w-50"
                        @click="toggleFavorite(product.id)"
                      >
                        <i
                          class="bi bi-heart-fill fs-4 text-danger"
                          v-if="favoriteItems.includes(product.id)"
                        ></i>
                        <i class="bi bi-heart fs-4" v-else></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary w-50"
                        @click="addToCart(product.id)"
                      >
                        <i class="bi bi-cart3 fs-4"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Pagination
            :pages="pagination"
            @emit-pages="getProducts"
          ></Pagination>
        </div>
      </div>
    </section>
    <SuccessToast ref="SuccessToast" :message="toastMessage"></SuccessToast>
    <ErrorToast ref="ErrorToast" :message="toastMessage"></ErrorToast>
    <Loading ref="Loading"> </Loading>
  </main>
</template>

<style lang="scss">
.bg-top {
  height: 40vh;
  background-image: url('https://images.unsplash.com/photo-1471478108131-9b2335c21611?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.pic {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>

<script>
import ProductsList from '@/components/ProductsList.vue'
import Pagination from '@/components/PaginationVuew.vue'
import emitter from '@/libs/emitter'
import Loading from '@/components/LoadingView.vue'
import SuccessToast from '@/components/SuccessToast.vue'
import ErrorToast from '@/components/ErrorToast.vue'
export default {
  name: 'ProductsView',
  data () {
    return {
      products: [],
      pagination: {},
      isLoadingItem: '',
      favoriteItems: JSON.parse(localStorage.getItem('favorite')) || [],
      toastMessage: ''
    }
  },
  components: {
    ProductsList,
    Pagination,
    Loading,
    SuccessToast,
    ErrorToast
  },
  methods: {
    getProducts (page = 1) {
      this.$refs.Loading.ToggleLoading('on')
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${page}`
      this.$http(api)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
        .catch(() => {
          this.toastMessage = '發生錯誤，請重新整理'
          this.$refs.ErrorToast.openToasts()
        })
      this.$refs.Loading.ToggleLoading('off')
    },
    addToCart (id, qty = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      const data = {
        product_id: id,
        qty
      }
      this.isLoadingItem = id
      this.$http
        .post(api, { data })
        .then((res) => {
          this.toastMessage = res.data.message
          this.$refs.SuccessToast.openToasts()
          emitter.emit('get-cart')
        })
        .catch(() => {
          this.toastMessage = '發生錯誤，請重新加入購物車'
          this.$refs.ErrorToast.openToasts()
        })
      this.isLoadingItem = ''
    },
    getCategory (category) {
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`
      if (category) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?category=${category}`
      }
      this.$http(api)
        .then((res) => {
          this.products = res.data.products
        })
        .catch(() => {
          this.toastMessage = '發生錯誤，請重新選擇'
          this.$refs.ErrorToast.openToasts()
        })
    },
    toggleFavorite (id) {
      const favIndex = this.favoriteItems.findIndex((item) => item === id)
      if (favIndex === -1) {
        this.favoriteItems.push(id)
      } else {
        this.favoriteItems.splice(favIndex, 1)
      }
    }
  },
  watch: {
    favoriteItems: {
      handler () {
        // localStorage的自訂欄位,要存入的JSON內容
        localStorage.setItem('favorite', JSON.stringify(this.favoriteItems))
      },
      deep: true
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
