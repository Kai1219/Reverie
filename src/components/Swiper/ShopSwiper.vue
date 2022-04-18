<template>
  <swiper
    ref="{swiperRef}"
    :slidesPerView="2"
    :spaceBetween="30"
    :modules="modules"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: false
    }"
    :breakpoints="{
      '576': {
        slidesPerView: 3,
        spaceBetween: 20
      },
      '992': {
        slidesPerView: 4,
        spaceBetween: 40
      }
    }"
    class="mySwiper shop-swiper"
  >
    <swiper-slide
      v-for="product in swiperProducts"
      :key="product.id"
      class="align-items-center"
    >
      <div class="card-product w-100 hover-line">
        <router-link
          :to="`/product/${product.id}`"
          class="hover-scale text-decoration-none text-dark"
        >
          <div class="pic ratio ratio-1x1">
            <img :src="product.imageUrl" :alt="product.title" />
          </div>
          <div class="card-body pb-0">
            <p class="card-title text-center fs-6">{{ product.title }}</p>
          </div>
          <div class="price text-center">
            <div v-if="product.origin_price === product.price">
              <p class="fs-6 d-inline">NT${{ product.price }}</p>
            </div>
            <div v-else>
              <p class="d-inline text-danger fw-bold fs-5">
                NT${{ product.price }}&nbsp;
              </p>
              <span class="text-decoration-line-through fw-light fs-6"
                >NT${{ product.origin_price }}</span
              >
            </div>
          </div>
        </router-link>
        <div class="btn-group mt-2 w-100 border border-primary">
          <button
            type="button"
            class="btn text-dark w-25 btn-hover"
            @click="toggleFavorite(product.id)"
          >
            <i
              class="bi bi-heart-fill fs-3 text-danger"
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
                class="spinner-border me-2 d-none d-sm-block"
                role="status"
                aria-hidden="true"
              ></span>
              <span>加入中...</span>
            </div>
            <i class="bi bi-cart3 fs-3" v-else></i>
          </button>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import '@/assets/stylesheets/swiper.css'
import { Autoplay, Navigation } from 'swiper'
import emitter from '@/libs/emitter'

export default {
  props: {
    swiperProducts: {}
  },
  data () {
    return {
      favoriteItems: JSON.parse(localStorage.getItem('favorite')) || [],
      toastMessage: '',
      isLoadingItem: ''
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  methods: {
    addToCart (id, qty = 1) {
      this.isLoadingItem = id
      this.$emit('add-cart', id, qty)
      setTimeout(() => {
        this.isLoadingItem = ''
      }, 1500)
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
  setup () {
    return {
      modules: [Autoplay, Navigation]
    }
  }
}
</script>

<style lang="scss">
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

.shop-swiper {
  margin: 20px auto;
}

.swiper-button-prev,
.swiper-button-next {
  width: 50px;
  height: 50px;
  background-color: #839ea9;
  border: 1px solid #839ea9;
  border-radius: 50%;
  color: #fff;
  font-size: 1rem;
}

.swiper-button-prev:after,
.swiper-button-next:after {
  font-size: 1.5rem;
}

.swiper-button-next {
  right: 20px;
  left: auto;
}

@keyframes deco-line {
  0% {
    right: 20px;
  }
  100% {
    right: 0px;
  }
}

.swiper-button-prev {
  right: auto;
  left: 20px;
}
</style>
