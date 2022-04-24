<template>
  <Swiper
    :style="{
      '--swiper-navigation-color': '#fff',
      '--swiper-pagination-color': '#fff'
    }"
    :spaceBetween="10"
    :navigation="true"
    :thumbs="{ swiper: thumbsSwiper }"
    :modules="modules"
    @swiper="onSwiper"
    class="mySwiper2 product-swiper"
  >
    <SwiperSlide
      :style="{ backgroundImage: `url(${swiperProduct.imageUrl})` }"
    ></SwiperSlide>
    <SwiperSlide
      v-for="(img, i) in swiperProduct.imagesUrl"
      :key="i"
      :style="{ backgroundImage: `url(${img})` }"
    >
    </SwiperSlide>
  </Swiper>
  <Swiper
    @swiper="setThumbsSwiper"
    :spaceBetween="10"
    :slidesPerView="4"
    :freeMode="true"
    :watchSlidesProgress="true"
    :modules="modules"
    class="mySwiper product-swiper product-mask"
  >
    <SwiperSlide
      :style="{ backgroundImage: `url(${swiperProduct.imageUrl})` }"
    ></SwiperSlide>
    <SwiperSlide
      v-for="(img, i) in swiperProduct.imagesUrl"
      :key="i"
      :style="{ backgroundImage: `url(${img})` }"
    >
    </SwiperSlide>
  </Swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import '@/assets/stylesheets/swiper.css'
import { FreeMode, Navigation, Thumbs } from 'swiper'

export default {
  name: 'ProductSwiper',
  props: {
    swiperProduct: {}
  },
  data () {
    return {
      modules: [FreeMode, Navigation, Thumbs],
      thumbsSwiper: null,
      product: {},
      pagination: {}
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  methods: {
    setThumbsSwiper (swiper) {
      this.thumbsSwiper = swiper
    },
    onSwiper (swiper) {
      this.swiper = swiper
    },
    handleSlideTo () {
      this.swiper.slideTo(0)
    }
  },
  updated () {
    this.handleSlideTo()
  }
}
</script>

<style lang="scss">
.product-swiper {
  width: 100%;
  height: 25rem;
  margin-left: auto;
  margin-right: auto;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
}

.mySwiper2 {
  // height: 80%;
  width: 100%;
}

.mySwiper {
  height: 20%;
  box-sizing: border-box;
  padding: 10px 0;
}

.product-mask .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}

.product-mask .swiper-slide-thumb-active {
  opacity: 1;
}
</style>
