<template>
  <swiper
    :style="{
      '--swiper-navigation-color': '#fff',
      '--swiper-pagination-color': '#fff'
    }"
    :spaceBetween="10"
    :navigation="true"
    :thumbs="{ swiper: thumbsSwiper }"
    :modules="modules"
    class="mySwiper2">
    <swiper-slide><img :src="swiperProduct.imageUrl" /></swiper-slide>
    <swiper-slide v-for="(img, i) in swiperProduct.imagesUrl" :key="i">
    <img :src="img" />
    </swiper-slide>
  </swiper>
  <swiper
    @swiper="setThumbsSwiper"
    :spaceBetween="10"
    :slidesPerView="4"
    :freeMode="true"
    :watchSlidesProgress="true"
    :modules="modules"
    class="mySwiper">
    <swiper-slide><img :src="swiperProduct.imageUrl" /></swiper-slide>
    <swiper-slide v-for="(img, i) in swiperProduct.imagesUrl" :key="i">
    <img :src="img" />
    </swiper-slide>
  </swiper>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import '@/assets/stylesheets/swiper.css'

// import required modules
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
    }
  }
}
</script>
