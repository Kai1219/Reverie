<template>
  <loading v-model:active="isLoading" :is-full-page="fullPage"> </loading>

  <header>
    <section class="section-hmoepage">
      <div class="hmoepage position-relative">
        <div class="pic mw-100">
          <img
            src="https://images.unsplash.com/photo-1602492383546-6f5a348c2a0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80"
            alt=""
            class="w-100 h-100"
          />
        </div>
        <div class="text-center w-100 h-100">
          <div
            class="text shadow-sm m-0 position-absolute top-0 start-0 bottom-0 end-0"
          >
            <h3 class="mt-5">白日夢</h3>
            <p class="mb-4">被生活壓的喘不過氣時，來這裡，做個白日夢</p>
            <button type="button" class="btn btn-primary">查看更多</button>
          </div>
        </div>
      </div>
    </section>
  </header>
  <Front-nav></Front-nav>
  <main>
    <section class="section-recommend container py-5">
      <div class="title text-center mb-5">
        <h2 class="title"><sapn>熱門推薦</sapn></h2>
      </div>
      <div class="products container px-5">
        <div class="row row-cols-1 row-cols-lg-4 g-lg-5">
          <div
            class="col-6 align-items-center mb-5"
            v-for="product in products.slice(0, 4)"
            :key="product.id"
          >
            <div class="card-product" style="">
              <router-link :to="`/product/${product.id}`">
                <div class="pic ratio ratio-1x1">
                  <img :src="product.imageUrl" alt="" />
                </div>
              </router-link>
              <div class="card-body pb-0">
                <h5 class="card-title text-center">{{ product.title }}</h5>
              </div>
              <div class="price text-center">
                <div v-if="product.origin_price === product.price">
                  <h5 class="">NT${{ product.price }}</h5>
                </div>
                <div v-else>
                  <h5 class="">NT${{ product.price }}&nbsp;</h5>
                  <p class="text-decoration-line-through fw-light">
                    NT${{ product.origin_price }}
                  </p>
                </div>
                <div class="btn-group mt-2">
                  <button
                    type="button"
                    class="btn text-dark"
                    @click="addToFavorite"
                  >
                    <i class="bi bi-heart"></i>
                    加入追蹤清單
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="addToCart(product.id)"
                  >
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section-brand container py-5">
      <div class="brand row">
        <div class="pic col-sm-12 col-lg-6">
          <img
            src="https://images.unsplash.com/photo-1613687959001-1d02cac9a137?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
            alt=""
            class="w-100 h-100"
          />
        </div>
        <div class="text col-sm-12 col-lg-6 my-auto position-relative">
          <h2 class="fs-1 mb-3">品牌沿革</h2>
          <p class="fs-5 mb-4">
            使用寬度和高度通用類別，可以輕鬆地將一個元素加寬或增高。使用寬度和高度通用類別，可以輕鬆地將一個元素加寬或增高。使用寬度和高度通用類別，可以輕鬆地將一個元素加寬或增高。使用寬度和高度通用類別，可以輕鬆地將一個元素加寬或增高。使用寬度和高度通用類別，可以輕鬆地將一個元素加寬或增高。使用寬度和高度通用類別，可以輕鬆地將一個元素加寬或增高。使用寬度和高度通用類別
          </p>
          <button type="button" class="btn btn-primary position-absolute">
            查看更多
          </button>
        </div>
      </div>
    </section>
    <section class="section-service container py-5">
      <h2 class="text-center title mb-5"><sapn>常見問題</sapn></h2>
      <div class="services row row-cols-1 row-cols-sm-2 row-cols-md-4 g-5">
        <div class="col">
          <div class="service text-center py-3">
            <i class="bi bi-bag"></i>
            <h4 class="mt-3">購物流程</h4>
          </div>
        </div>
        <div class="col">
          <div class="service text-center py-3">
            <i class="bi bi-exclamation-square"></i>
            <h4 class="mt-3">注意事項</h4>
          </div>
        </div>
        <div class="col">
          <div class="service text-center py-3">
            <i class="bi bi-box2"></i>
            <h4 class="mt-3">配送方式</h4>
          </div>
        </div>
        <div class="col">
          <div class="service text-center py-3">
            <i class="bi bi-shop"></i>
            <h4 class="mt-3">售後服務</h4>
          </div>
        </div>
      </div>
    </section>
  </main>
  <Footer></Footer>
</template>

<style lang="scss">
.hmoepage {
  position: relative;
}

.hmoepage .pic {
  max-height: 90vh;
  overflow: hidden;
}

.hmoepage .pic img {
  object-fit: cover;
}

.hmoepage .text {
  background-color: #fff9;
  padding: 5%;
  /* position: absolute;
  width: 90%;
  height: 90%;
  left: 0%;
  right: 0%;
  margin: 1rem auto;
  border: 10px solid #FFF;*/
}

@media screen and (min-width: 576px) {
  .hmoepage .text {
    padding: 15%;
  }
}

/*section-recommend*/
.card-product .pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.products .price {
  align-items: center;
}
.products p {
  flex-grow: 1;
  margin-bottom: 0;
}
.products button {
  flex-grow: 1;
}

h2.title sapn {
  position: relative;
}

h2.title sapn:before,
h2.title sapn:after {
  content: '';
  display: block;
  background: #333;
  position: absolute;
  width: 100%;
  height: 15%;
  top: 50%;
}
h2.title sapn:before {
  left: -120%;
}
h2.title sapn:after {
  right: -120%;
}
/*section-brand*/
.brand .text {
  background-color: #fff2;
  padding: 10% 10%;
  margin-bottom: 10%;
}
.brand button {
  right: 2.5rem;
}
@media screen and (min-width: 576px) {
  .brand .text {
    padding: 5% 5%;
    border: 5px solid;
  }
  .brand .pic {
    padding: 5% 5%;
  }
  .brand button {
    bottom: 2rem;
    right: 2rem;
  }
}

/*section-service*/

.services .service {
  border: 3px solid #333;
}

.service i {
  font-size: 5rem;
}
</style>

<script>
import FrontNav from '@/components/FrontNav.vue'
import Footer from '@/components/FooterView.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import emitter from '@/libs/emitter'

export default {
  name: 'IndexView',
  data () {
    return {
      products: [],
      isLoading: false,
      fullPage: true
    }
  },
  components: {
    FrontNav,
    Footer,
    Loading
  },
  methods: {
    getProducts () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http(api)
        .then((res) => {
          this.products = res.data.products
          emitter.emit('get-cart')
        })
        .catch(() => {
          alert('請重新整理頁面')
        })
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
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
          alert(res.data.message)
          emitter.emit('get-cart')
        })
        .catch(() => {
          alert('發生錯誤')
        })
      this.isLoadingItem = ''
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
