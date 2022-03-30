<template>
  <header>
    <section class="section-hmoepage vh-100">
      <div class="hmoepage vh-100">
        <div class="pic w-100 vh-100">
          <div class="text-center mask w-100 h-100">
            <div
              class="text shadow-sm top-0 start-0 bottom-0 end-0 align-items-center"
            >
              <h1
                class="text-white row flex-wrap align-content-between position-relative"
              >
                <div class="col">R</div>
                <div class="col">E</div>
                <div class="col">V</div>
                <div class="col-12">E</div>
                <div class="col">R</div>
                <div class="col">I</div>
                <div class="col">E</div>
              </h1>
              <p
                class="bg-primary slogan1 slogan vlr text-white position-absolute"
              >
                被生活壓的<br />喘不過氣時
              </p>
              <p
                class="bg-primary slogan2 slogan ps-2 text-white position-absolute"
              >
                來這裡
              </p>
              <p
                class="bg-primary slogan3 slogan text-white vlr position-absolute position-absolute"
              >
                做個白日夢
              </p>
            </div>
            <div class="scroll"></div>
          </div>
        </div>
      </div>
    </section>
  </header>
  <Front-nav></Front-nav>
  <main>
    <section class="section-recommend container py-5">
      <div class="title text-center mb-5">
        <h2 class="title">熱門推薦</h2>
      </div>
      <div class="products container px-sm-5">
        <div class="row row-cols-2 row-cols-lg-4 g-lg-5">
          <div
            class="col align-items-center mb-5"
            v-for="product in products.slice(0, 4)"
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
                <p class="card-title text-center fs-6">{{ product.title }}</p>
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
                <div class="btn-group mt-2 w-100 border border-primary">
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
    </section>
    <section class="section-brand py-5">
      <div class="container">
        <div class="brand row">
          <div class="pic col-sm-12 col-lg-5">
            <img
              src="https://images.unsplash.com/photo-1613687959001-1d02cac9a137?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
              alt=""
              class="w-100 h-100"
            />
          </div>
          <div class="text col-sm-12 col-lg-7 my-auto position-relative">
            <h2 class="fs-1 mb-3">品牌沿革</h2>
            <p class="fs-5 mb-4">
              Reverie，夢幻，或譯作夢想，現在的生活步調越來越快，有時甚至忘了怎麼放鬆，享受生活，希望每個到這裡來的人都能透過品嘗甜點，稍作休息、喘口氣，想起那些美好的時光，做一個白日夢
            </p>
            <router-link
              to="/products"
              type="button"
              class="button btn btn-primary position-absolute"
              >查看更多</router-link
            >
          </div>
        </div>
      </div>
    </section>
    <section class="section-service container py-5">
      <h2 class="text-center title mb-5"><sapn>常見問題</sapn></h2>
      <div class="services row row-cols-2 row-cols-md-4 gy-5">
        <router-link to="/service" class="col">
            <div class="service text-center py-3">
              <i class="bi bi-bag"></i>
              <h4 class="mt-3">購物流程</h4>
            </div>
        </router-link>
        <router-link to="/service" class="col">
          <div class="service text-center py-3">
            <i class="bi bi-exclamation-square"></i>
            <h4 class="mt-3">注意事項</h4>
          </div>
        </router-link>
        <router-link to="/service" class="col">
          <div class="service text-center py-3">
            <i class="bi bi-box2"></i>
            <h4 class="mt-3">配送方式</h4>
          </div>
        </router-link>
        <router-link to="/service" class="col">
          <div class="service text-center py-3">
            <i class="bi bi-shop"></i>
            <h4 class="mt-3">售後服務</h4>
          </div>
        </router-link>
      </div>
    </section>
    <SuccessToast ref="SuccessToast" :message="toastMessage"></SuccessToast>
    <ErrorToast ref="ErrorToast" :message="toastMessage"></ErrorToast>
    <Loading ref="Loading"> </Loading>
  </main>
  <Footer></Footer>
</template>

<style lang="scss">
.hmoepage {
  position: relative;
}

.mask {
  background-color: #bababa55;
}

.vlr {
  writing-mode: vertical-lr;
}

h1 {
  font-size: 3.5rem;
  position: absolute;
  top: 0;
}

.slogan {
  letter-spacing: 0.5rem;
  text-align: center;
  font-size: 1.25rem;
}

.slogan1 {
  top: -80%;
  left: 0;
  text-indent: -3rem;
  padding: 0.5rem;
}

.slogan2 {
  top: 50%;
  left: 50%;
  }

.slogan3 {
  bottom: -100%;
  right: 0;
  padding: 1.5rem 1rem 1rem 1rem;
}

@media screen and (min-width: 768px) {
  .slogan {
    font-size: 2rem;
  }

  .slogan1 {
    top: -120%;
    left: -140%;
  }

  .slogan2 {
    top: 50%;
    left: 0%;
  }

  .slogan3 {
    bottom: -120%;
    right: -140%;
  }
}

.hmoepage .pic {
  max-height: 100vh;
  overflow: hidden;
  background-image: url('https://images.unsplash.com/photo-1630246077511-349597f03edd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80');
}

.hmoepage .text {
  background-color: #839ea999;
  position: absolute;
  width: 15rem;
  height: 15rem;
  left: 50%;
  top: 50%;
  margin: auto;
  padding: 10px;
  border: 0.5rem solid #fff;
}

@media screen and (min-width: 576px) {
  .hmoepage .text {
    border: 10px solid #fff;
    font-size: 1.25rem;
  }
}

/* scroll */
.scroll {
  width: 1px;
  height: 90px;
  border: 1px solid #fff;
  position: absolute;
  bottom: 2rem;
  right: 3rem;
}

.scroll::after {
  content: '';
  width: 12px;
  height: 12px;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border-radius: 50%;
  opacity: 1;
  animation: wheel 2s infinite;
}

@keyframes wheel {
  to {
    opacity: 0;
    top: 60px;
  }
}

@media screen and (min-width: 576px) {
  .scroll {
    right: 5rem;
  }
}

/* section-recommend */
.card-product .pic img {
  max-width: 100%;
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

h2.title {
  position: relative;
}

h2.title:after {
  content: '';
  display: block;
  background: #839EA9;
  position: absolute;
  width: 5rem;
  height: 10%;
  left: calc(50% - 2.5rem);
  bottom: -.5rem;
}

.pic {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
/*section-brand*/
.section-brand{
background-color: #839EA9;
color: #fff;
}

.brand .text {
  background-color: #fff2;
  padding: 10% 10%;
  margin-bottom: 10%;
}
.brand .button {
  right: 2.5rem;
  color: #fff;
}
@media screen and (min-width: 576px) {
  .brand .text {
    padding: 5% 5%;
    border-left: 5px solid #fff;
  }
  .brand .pic {
    padding: 5% 5%;
  }
  .brand .button {
    bottom: 2rem;
    right: 2rem;
  }
}

/*section-service*/

.services .service {
  border: 3px #BABABA;
  border-style: dashed solid;
}

.service i {
  font-size: 5rem;
}

.services a{
  text-decoration: none;
}

.services a:hover .service{
  background: #AAC1CA;
  color: #fff;
  border-color:#839EA9;
  transform: translateY(-5%);
  transition: 1s;
}

</style>

<script>
import FrontNav from '@/components/FrontNav.vue'
import Footer from '@/components/FooterView.vue'
import emitter from '@/libs/emitter'
import Loading from '@/components/LoadingView.vue'
import SuccessToast from '@/components/SuccessToast.vue'
import ErrorToast from '@/components/ErrorToast.vue'

export default {
  name: 'IndexView',
  data () {
    return {
      products: [],
      favoriteItems: JSON.parse(localStorage.getItem('favorite')) || [],
      toastMessage: ''
    }
  },
  components: {
    FrontNav,
    Footer,
    Loading,
    SuccessToast,
    ErrorToast
  },
  methods: {
    getProducts () {
      this.$refs.Loading.ToggleLoading('on')
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http(api)
        .then((res) => {
          this.products = res.data.products
          emitter.emit('get-cart')
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
