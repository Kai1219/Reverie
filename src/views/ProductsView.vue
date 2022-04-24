<template>
  <main>
    <section class="section-top mb-5">
      <div class="bg-top banner-products pic">
        <div class="text-center w-100 h-100 mask z-index-3 position-relative">
          <div class="position-absolute top-50 start-50 translate-middle">
            <h2>商店</h2>
            <p>Our Products</p>
          </div>
        </div>
      </div>
    </section>
    <section class="container p-md-5">
      <div class="row">
        <div class="col-lg-3 products-list pe-lg-5">
          <div
            class="list-group mb-5 justify-content-between flex-row flex-lg-column"
          >
            <a
              class="list-group-item list-group-item-action"
              :class="{ active: isActive === 1 }"
              data-bs-toggle="list"
              aria-current="true"
              @click.prevent="getCategory()"
            >
              全部商品
            </a>
            <a
              class="list-group-item list-group-item-action"
              :class="{ active: isActive === 2 }"
              data-bs-toggle="list"
              @click.prevent="getCategory('冰淇淋')"
              >冰淇淋</a
            >
            <a
              class="list-group-item list-group-item-action"
              :class="{ active: isActive === 3 }"
              data-bs-toggle="list"
              @click.prevent="getCategory('冰棒')"
              >冰棒</a
            >
            <a
              class="list-group-item list-group-item-action"
              :class="{ active: isActive === 4 }"
              data-bs-toggle="list"
              @click.prevent="getCategory('蛋糕')"
              >蛋糕</a
            >
            <a
              class="list-group-item list-group-item-action"
              :class="{ active: isActive === 5 }"
              data-bs-toggle="list"
              @click.prevent="getCategory('手工酥塔')"
              >手工酥塔</a
            >
          </div>
        </div>
        <div class="products-items col-lg-9">
          <div class="products">
            <div class="row row-cols-2 row-cols-md-3">
              <div
                class="col align-items-center mb-5"
                v-for="product in products"
                :key="product.id"
              >
                <div class="card-product border">
                  <router-link
                    :to="`/product/${product.id}`"
                    class="text-decoration-none text-dark hover-scale"
                  >
                    <div class="pic ratio ratio-1x1">
                      <img :src="product.imageUrl" :alt="product.title" />
                    </div>
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
                        <p class="fs-6 d-inline text-info fw-bold">
                          NT${{ product.price }}&nbsp;
                        </p>
                        <span class="text-decoration-line-through fw-light"
                          >NT${{ product.origin_price }}</span
                        >
                      </div>
                    </div>
                  </router-link>
                  <div class="btn-group mt-2 w-100 border border-primary">
                    <button
                      type="button"
                      class="btn text-dark w-25"
                      @click="toggleFavorite(product.id)"
                    >
                      <i
                        class="bi bi-heart-fill fs-3 text-info"
                        v-if="favoriteItems.includes(product.id)"
                      ></i>
                      <i class="bi bi-heart fs-3" v-else></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary w-50"
                      @click="addToCart(product.id)"
                      :disabled="isLoadingItem === product.id"
                    >
                      <div
                        class="mx-auto d-flex align-items-center justify-content-center text-white"
                        v-if="isLoadingItem === product.id"
                      >
                        <span
                          class="spinner-border me-2 d-none d-lg-block"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        <span>加入中...</span>
                      </div>
                      <i class="bi bi-cart3 fs-3" v-else></i>
                    </button>
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
    <ServiceList />
    <SuccessToast ref="SuccessToast" :message="toastMessage"></SuccessToast>
    <ErrorToast ref="ErrorToast" :message="toastMessage"></ErrorToast>
    <Loading ref="Loading"> </Loading>
  </main>
</template>

<script>
import Pagination from '@/components/PaginationView.vue'
import emitter from '@/libs/emitter'
import Loading from '@/components/LoadingView.vue'
import SuccessToast from '@/components/SuccessToast.vue'
import ErrorToast from '@/components/ErrorToast.vue'
import ServiceList from '@/components/ServiceList.vue'
export default {
  name: 'ProductsView',
  data () {
    return {
      products: [],
      pagination: {},
      isLoadingItem: '',
      favoriteItems: JSON.parse(localStorage.getItem('favorite')) || [],
      toastMessage: '',
      isActive: 1
    }
  },
  components: {
    Pagination,
    Loading,
    SuccessToast,
    ErrorToast,
    ServiceList
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
      setTimeout(() => {
        this.isLoadingItem = ''
      }, 1000)
    },
    getCategory (category) {
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`
      if (category) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?category=${category}`
      }
      this.$http(api)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
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
        emitter.emit('get-favorites', this.favoriteItems)
      } else {
        this.favoriteItems.splice(favIndex, 1)
        emitter.emit('get-favorites', this.favoriteItems)
      }
    },
    changeisActive (category) {
      switch (category) {
        case '冰淇淋':
          this.isActive = 2
          break
        case '冰棒':
          this.isActive = 3
          break
        case '蛋糕':
          this.isActive = 4
          break
        case '手工酥塔':
          this.isActive = 5
          break
        default:
          this.isActive = 1
      }
    }
  },
  watch: {
    favoriteItems: {
      handler () {
        localStorage.setItem('favorite', JSON.stringify(this.favoriteItems))
      },
      deep: true
    }
  },
  mounted () {
    this.getCategory(this.$route.query.category)
    this.changeisActive(this.$route.query.category)
  }
}
</script>

<style lang="scss">
.banner-products {
  background-image: url('@/assets/img/banner/banner-products.png');
}

.list-group {
  position: sticky;
  top: 100px;
  z-index: 3;
}

@media screen and (max-width: 767px) {
  .list-group {
    position: static;
    top: 0px;
  }
  .products-list {
    position: sticky;
    top: 80px;
    z-index: 3;
  }
}
</style>
