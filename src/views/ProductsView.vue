<template>
  <main class="">
    <section class="section-top mb-5">
      <div class="bg-top"></div>
    </section>
    <section class="container p-5">
      <div class="row gx-5">
        <ProductsList></ProductsList>
        <div class="products-items col-sm-9">
          <div class="products">
            <div class="row row-cols-1 row-cols-lg-3 g-lg-5">
              <div class="col align-items-center mb-5" v-for="product in products" :key="product.id">
                <div class="card-product" style="">
                  <router-link :to="`/f/product/${product.id}`">
                  <div class="pic ratio ratio-1x1">
                    <img
                      :src="product.imageUrl"
                      alt=""
                    />
                  </div>
                  </router-link>
                  <div class="card-body pb-0">
                    <h5 class="card-title text-center">{{product.title}}</h5>
                  </div>
                  <div class="price text-center">
                <div v-if="product.origin_price===product.price"><span class="h5">NT${{ product.price }}</span></div>
                <div v-else><span class="h5">NT${{ product.price }}&nbsp;</span>
                <span class="text-decoration-line-through fw-light"
                  >NT${{ product.origin_price }}</span
                ></div>
                <div class="btn-group mt-2">
                  <button
                    type="button"
                    class="btn text-dark"
                    @click="addToFavorite"
                  ><i class="bi bi-heart"></i>
                    加入追蹤清單
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary "
                    @click="addToCart"
                  >
                    加入購物車
                  </button>
                </div>
              </div>
                </div>
              </div>
            </div>
          </div>
          <Pagination :pages="pagination" @emitPages="getOrders"></Pagination>
        </div>
      </div>
    </section>
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
@media screen and (min-width: 576px) {

}
</style>

<script>
import ProductsList from '@/components/ProductsList.vue'
import Pagination from '@/components/PaginationView.vue'
export default {
  name: 'ProductsView',
  data () {
    return {
      products: [],
      pagination: {}
    }
  },
  components: {
    ProductsList,
    Pagination
  },
  methods: {
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${page}`
      this.$http(api)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          console.log(this.products)
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
