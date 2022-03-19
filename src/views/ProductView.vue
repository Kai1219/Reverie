<template>
  <main class="">
    <section class="section-top mb-5">
      <div class="bg-top"></div>
    </section>
    <section class="container p-5">
      <div class="row gx-5">
        <ProductsList></ProductsList>
        <div class="products-items col-sm-9">
          <div class="row">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link :to="`/`">首頁</router-link>
                  </li>
                  <li class="breadcrumb-item">
                    <router-link to="/f/products">甜蜜食光</router-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    {{ product.category }}
                  </li>
                </ol>
              </nav>
            <div class="col-sm-6">
              <ProductSwiper :swiperProduct="product"></ProductSwiper>
            </div>
            <div class="col-sm-6 product-content">
              <h2>{{ product.title }}</h2>
              <p>{{ product.description }}</p>
              <hr />
              <p>{{ product.content }}</p>
              <div class="price my-5">
                <div v-if="product.origin_price===product.price"><span class="h5">NT${{ product.price }}</span></div>
                <div v-else><span class="h5">NT${{ product.price }}&nbsp;</span>
                <span class="text-decoration-line-through fw-light"
                  >NT${{ product.origin_price }}</span
                ></div>
                <div class="input-group my-3">
                  <input
                    type="number"
                    class="form-control"
                    min="1"
                    v-model="qty"
                  />
                  <button
                    type="button"
                    class="btn btn-primary "
                    @click="addToCart"
                  >
                    加入購物車
                  </button>
                </div>
                <button
                    type="button"
                    class="btn text-dark my-3"
                    @click="addToFavorite"
                  ><i class="bi bi-heart"></i>
                    加入追蹤清單
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<style lang="scss">
.breadcrumb a {
  text-decoration: none;
}
</style>
<script>
import ProductsList from '@/components/ProductsList.vue'
import ProductSwiper from '@/components/ProductSwiper.vue'
export default {
  name: 'ProductView',
  data () {
    return {
      product: {},
      qty: 1
    }
  },
  components: {
    ProductsList,
    ProductSwiper
  },
  methods: {
    getProducts () {
      const { id } = this.$route.params
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`
      this.$http(api)
        .then((res) => {
          this.product = res.data.product
        })
        .catch((error) => {
          alert(error.data.message)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
