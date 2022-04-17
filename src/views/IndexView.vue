<template>
  <header>
    <section class="section-hmoepage">
      <div class="w-100 h-100 position-relative">
        <BannerSwiper class="position-absolute"></BannerSwiper>
        <div class="text-center w-100 h-100 mask z-index-3 position-relative">
          <div class="position-absolute top-50 start-50 translate-middle">
            <h2>美好的一天，就從吃甜點開始吧</h2>
            <p>HAVE A NICE DAY</p>
          </div>
        </div>
      </div>
    </section>
  </header>
  <main class="position-relative" id="main">
    <div
      class="arrow text-white position-fixed btn"
      @click="backTop"
      v-if="showArrow === true"
    >
      <i class="bi bi-arrow-up"></i>
    </div>
    <section
      class="section-brand pt-5 container mb-6"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-once="ture"
    >
      <div class="brand row px-2 bg-secondary text-dark bg-opacity-10 mb-5">
        <div class="pic col-sm-12 col-lg-6 my-3">
          <img
            src="@/assets/img/about-img.avif"
            alt="關於Reverie"
            class="w-100 h-100 about-img"
          />
        </div>
        <div class="text col-sm-12 col-lg-6 my-auto px-5">
          <span class="text-secondary position-relative deco-line"
            >About Reverie</span
          >
          <h2 class="mb-3 fw-bold">關於我們</h2>
          <p class="mb-4">
            Reverie，夢幻，或譯作夢想，現在的生活步調越來越快，有時甚至忘了怎麼放鬆，享受生活，希望每個到這裡來的人都能透過品嘗甜點，稍作休息、喘口氣，想起那些美好的時光，做一個白日夢。
          </p>
          <router-link
            to="/products"
            class="button btn border border-primary fs-5 fw-bold mb-5"
            >立即選購</router-link
          >
        </div>
      </div>
      <div
        class="recommend"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-once="ture"
        data-aos-delay="50"
      >
        <div class="products container">
          <span class="text-secondary position-relative deco-line"
            >New Arrival</span
          >
          <h2 class="fw-bold">新品上架</h2>
          <ShopSwiper
            :swiperProducts="newProducts"
            @add-cart="addToCart"
          ></ShopSwiper>
        </div>
      </div>
    </section>
    <section class="category container-fluid g-0 mb-6">
      <div class="text-center position-relative mb-5">
        <span class="text-secondary deco-line-bottom">Featured Category</span>
        <h2 class="mb-3 fw-bold">精選類別</h2>
      </div>
      <div class="row g-0">
        <div
          class="col-12 col-md-6 position-relative imgStretch"
          data-aos="zoom-in-right"
          data-aos-duration="1000"
          data-aos-once="ture"
        >
          <router-link
            :to="{ path: '/products', query: { category: '冰淇淋' } }"
            type="button"
            class="w-100 h-100 ice-cream-link pic hover-scale"
          >
            <div
              class="text-center text position-absolute top-0 start-0 d-flex w-100 h-100 justify-content-center align-items-center"
            >
              <h3 class="text-white fw-bold">冰淇淋<br />ICE CREAM</h3>
            </div>
          </router-link>
        </div>
        <div
          class="col-12 col-md-6 g-0"
          data-aos="zoom-in-right"
          data-aos-duration="1000"
          data-aos-once="ture"
        >
          <div class="row g-0">
            <div class="col-6 position-relative imgCard">
              <router-link
                :to="{ path: '/products', query: { category: '冰棒' } }"
                type="button"
                class="w-100 h-100 ice-pop-link pic hover-scale"
              >
                <div
                  class="text-center text position-absolute top-0 start-0 d-flex w-100 h-100 justify-content-center align-items-center"
                >
                  <h3 class="text-white fw-bold">冰棒<br />ICE POP</h3>
                </div>
              </router-link>
            </div>
            <div class="col-6 position-relative imgCard">
              <router-link
                :to="{ path: '/products', query: { category: '蛋糕' } }"
                type="button"
                class="w-100 h-100 cake-link pic hover-scale"
              >
                <div
                  class="text-center text position-absolute top-0 start-0 d-flex w-100 h-100 justify-content-center align-items-center"
                >
                  <h3 class="text-white fw-bold">蛋糕<br />CAKE</h3>
                </div>
              </router-link>
            </div>
          </div>
          <div class="row g-0">
            <div class="col-12 col-md-12 position-relative imgCard">
              <router-link
                :to="{ path: '/products', query: { category: '手工酥塔' } }"
                type="button"
                class="w-100 h-100 tart-link pic hover-scale"
              >
                <div
                  class="text-center text position-absolute top-0 start-0 d-flex w-100 h-100 justify-content-center align-items-center"
                >
                  <h3 class="text-white fw-bold">手工酥塔<br />TART</h3>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section-brand container mb-5">
      <div
        class="brand row px-2 mb-5 bg-secondary text-dark bg-opacity-10"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-once="ture"
        data-aos-anchor-placement="bottom-bottom"
      >
        <div class="pic col-sm-12 col-lg-6 my-3 order-lg-2">
          <img
            src="@/assets/img/selected-img.avif"
            alt="嚴選極致"
            class="w-100"
          />
        </div>
        <div class="text col-sm-12 col-lg-6 my-auto px-5 order-lg-1">
          <span class="text-secondary position-relative deco-line"
            >Carefully Selected</span
          >
          <h2 class="mb-3 fw-bold">嚴選極致</h2>
          <p class="mb-4">
            每一口美味，都採用新鮮牛奶與當季新鮮水果，搭配精心挑選的原料，且不使用人工香料與人工色素等添加物，讓您在享受甜品的同時，也能吃得安心，吃得健康。
          </p>
        </div>
      </div>
      <div
        class="recommend"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-once="ture"
        data-aos-delay="50"
        data-aos-anchor-placement="bottom-bottom"
      >
        <div class="products container">
          <span class="text-secondary position-relative deco-line"
            >Special Offer</span
          >
          <h2 class="fw-bold">限時折扣</h2>
          <ShopSwiper
            :swiperProducts="saleProducts"
            @add-cart="addToCart"
          ></ShopSwiper>
        </div>
      </div>
    </section>
    <ServiceList/>
    <keep-alive>
      <RouletteWheel ref="RouletteWheel"></RouletteWheel>
    </keep-alive>
    <SuccessToast ref="SuccessToast" :message="toastMessage"></SuccessToast>
    <ErrorToast ref="ErrorToast" :message="toastMessage"></ErrorToast>
    <Loading ref="Loading"> </Loading>
  </main>
</template>

<script>
import emitter from '@/libs/emitter'
import Loading from '@/components/LoadingView.vue'
import SuccessToast from '@/components/SuccessToast.vue'
import ErrorToast from '@/components/ErrorToast.vue'
import RouletteWheel from '@/components/Modal/RouletteWheel.vue'
import BannerSwiper from '@/components/Swiper/BannerSwiper.vue'
import ShopSwiper from '@/components/Swiper/ShopSwiper.vue'
import ServiceList from '@/components/ServiceList.vue'
export default {
  name: 'IndexView',
  data () {
    return {
      products: [],
      newProducts: [],
      saleProducts: [],
      favoriteItems: JSON.parse(localStorage.getItem('favorite')) || [],
      toastMessage: '',
      showArrow: false,
      rouletteStatus: JSON.parse(localStorage.getItem('rouletteStatus'))
    }
  },
  components: {
    Loading,
    SuccessToast,
    ErrorToast,
    RouletteWheel,
    BannerSwiper,
    ShopSwiper,
    ServiceList
  },
  methods: {
    getProducts () {
      this.$refs.Loading.ToggleLoading('on')
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http(api)
        .then((res) => {
          this.products = res.data.products
          emitter.emit('get-cart')
          this.newProducts = this.products.slice(10)
          this.saleProducts = this.products.filter(
            (saleProducts) => saleProducts.origin_price !== saleProducts.price
          )
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
    },
    toggleArrow () {
      if (window.scrollY >= 900) {
        this.showArrow = true
      } else {
        this.showArrow = false
      }
    },
    backTop () {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },
    openRoulette () {
      if (this.rouletteStatus === true) {
        this.$refs.RouletteWheel.openModal()
        this.rouletteStatus = false
      }
    }
  },
  watch: {
    favoriteItems: {
      handler () {
        localStorage.setItem('favorite', JSON.stringify(this.favoriteItems))
      },
      deep: true
    },
    rouletteStatus: {
      handler () {
        localStorage.setItem('rouletteStatus', JSON.stringify(this.rouletteStatus))
      },
      deep: true
    }
  },
  mounted () {
    this.getProducts()
    window.addEventListener('scroll', this.toggleArrow)
    this.openRoulette()
  }
}
</script>

<style lang="scss">
.section-hmoepage {
  position: relative;
  height: 55vh;
}

.mask {
  background-color: #e7e7e796;
}

.vlr {
  writing-mode: vertical-lr;
}

.section-hmoepage h1 {
  font-size: 3.5rem;
}

.section-hmoepage {
  overflow: hidden;
}

.arrow {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 8px #bababa;
  background-color: #aac1ca;
  bottom: 2rem;
  right: 2rem;
  z-index: 10;
}

/*section-brand*/
.deco-line:before {
  content: '';
  display: inline-block;
  width: 5px;
  height: 60px;
  background-color: #e6c786;
  border-top: 2px solid #e6c786;
  position: absolute;
  top: 0px;
  left: -20%;
}

@media screen and (max-width: 768px) {
  .recommend .products {
    text-align: center;
  }
  .recommend .deco-line:before {
    width: 50px;
    height: 3px;
    top: 55px;
    left: calc(50% - 25px);
  }
}

.deco-line-bottom:before {
  content: '';
  display: inline-block;
  width: 80px;
  height: 80px;
  border: 3px dashed #e6c786;
  animation: deco-rotation 30s infinite linear;
  position: absolute;
  top: calc(50% - 40px);
  left: calc(50% - 40px);
  z-index: -1;
}

@keyframes deco-rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.brand .button {
  color: #839ea9;
}

.brand .button:hover {
  background-color: #839ea9;
  color: #fff;
}

/* category */
.imgCard,
.imgStretch {
  height: 250px;
}

.imgCard:hover, .imgStretch:hover{
  z-index: 3;
}

@media screen and (min-width: 768px) {
  .imgCard {
    height: 300px;
  }
  .imgStretch {
    height: 600px;
  }
}

.ice-cream-link {
  background-image: url('@/assets/img/ice-cream-link.avif');
}

.ice-pop-link {
  background-image: url('@/assets/img/ice-pop-link.avif');
}

.cake-link {
  background-image: url('@/assets/img/cake-link.avif');
}

.tart-link {
  background-image: url('@/assets/img/tart-link.avif');
}

.category .text {
  background-color: #bababaa3;
  font-size: 3rem;
}

.category .text h3 {
  font-size: 1.75rem;
}

.category .text:hover {
  background-color: #bababa1c;
  transition-duration: 1s;
}

.category .text:hover h3 {
  font-size: 2rem;
  transition-duration: 1s;
}

.hover-scale:hover {
  transform: scale(1.1);
  transition-duration: 1s;
}
</style>
