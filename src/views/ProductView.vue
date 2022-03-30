<template>
  <main class="">
    <section class="section-top mb-5">
      <div class="bg-top"></div>
    </section>
    <section class="container">
      <div class="row">
        <div class="products-items col">
          <div class="row">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link :to="`/`">首頁</router-link>
                </li>
                <li class="breadcrumb-item">
                  <router-link to="/products">商品一覽</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  {{ product.category }}
                </li>
              </ol>
            </nav>
            <div class="col col-md-6 px-lg-5">
              <ProductSwiper :swiperProduct="product"></ProductSwiper>
            </div>
            <div class="col col-md-6 px-lg-5 product-content mt-5">
              <h2>{{ product.title }}</h2>
              <span class="badge bg-secondary rounded-pill">{{
                product.category
              }}</span>
              <hr />
              <p>{{ product.content }}</p>
              <p>{{ product.description }}</p>
              <div class="price my-5">
                <div v-if="product.origin_price === product.price">
                  <span class="h5">NT${{ product.price }}</span>
                </div>
                <div v-else>
                  <span class="h5">NT${{ product.price }}&nbsp;</span>
                  <span class="text-decoration-line-through fw-light"
                    >NT${{ product.origin_price }}</span
                  >
                </div>
                <div class="input-group my-3">
                  <input
                    type="number"
                    class="form-control"
                    min="1"
                    v-model="qty"
                  />
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="addToCart(product.id)"
                  >
                    加入購物車
                  </button>
                </div>
                <button
                  type="button"
                  class="btn text-dark my-3"
                  @click="toggleFavorite(product.id)"
                >
                  <i
                    class="bi bi-heart-fill fs-4"
                    v-if="favoriteItems.includes(product.id)"
                  ></i>
                  <i class="bi bi-heart" v-else></i>
                  我的最愛
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <SuccessToast ref="SuccessToast" :message="toastMessage"></SuccessToast>
    <ErrorToast ref="ErrorToast" :message="toastMessage"></ErrorToast>
    <Loading ref="Loading"></Loading>
  </main>
</template>
<style lang="scss">
.breadcrumb a {
  text-decoration: none;
}
</style>
<script>
import ProductSwiper from '@/components/ProductSwiper.vue'
import emitter from '@/libs/emitter'
import Loading from '@/components/LoadingView.vue'
import SuccessToast from '@/components/SuccessToast.vue'
import ErrorToast from '@/components/ErrorToast.vue'
export default {
  name: 'ProductView',
  data () {
    return {
      product: {},
      qty: 1,
      favoriteItems: JSON.parse(localStorage.getItem('favorite')) || [],
      toastMessage: ''
    }
  },
  components: {
    ProductSwiper,
    Loading,
    SuccessToast,
    ErrorToast
  },
  methods: {
    getProducts () {
      const { id } = this.$route.params
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`
      this.$refs.Loading.ToggleLoading('on')
      this.$http(api)
        .then((res) => {
          this.product = res.data.product
        })
        .catch(() => {
          this.toastMessage = '發生錯誤，請重新整理'
          this.$refs.ErrorToast.openToasts()
        })
      this.$refs.Loading.ToggleLoading('off')
    },
    addToCart (id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      const data = {
        product_id: this.product.id,
        qty: this.qty
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
          alert('請再加入購物車一次')
        })
      this.isLoadingItem = ''
    },
    toggleFavorite (id) {
      const favIndex = this.favoriteItems.findIndex((item) => item === id)
      if (favIndex === -1) {
        this.favoriteItems.push(id)
        console.log('push', this.favoriteItems)
      } else {
        this.favoriteItems.splice(favIndex, 1)
        console.log('splice', this.favoriteItems)
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
