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
    :loop="true"
    class="mySwiper2"
  >
    <swiper-slide
      :style="{ backgroundImage: `url(${swiperProduct.imageUrl})` }"
    ></swiper-slide>
    <swiper-slide
      v-for="(img, i) in swiperProduct.imagesUrl"
      :key="i"
      :style="{ backgroundImage: `url(${img})` }"
    >
    </swiper-slide>
  </swiper>
  <swiper
    @swiper="setThumbsSwiper"
    :spaceBetween="10"
    :slidesPerView="4"
    :freeMode="true"
    :watchSlidesProgress="true"
    :modules="modules"
    class="mySwiper productSwiper"
  >
    <swiper-slide
      :style="{ backgroundImage: `url(${swiperProduct.imageUrl})` }"
    ></swiper-slide>
    <swiper-slide
      v-for="(img, i) in swiperProduct.imagesUrl"
      :key="i"
      :style="{ backgroundImage: `url(${img})` }"
    >
    </swiper-slide>
  </swiper>
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
    }
  }
}
</script>

<style lang="scss">
.swiper {
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

.productSwiper .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}

.productSwiper .swiper-slide-thumb-active {
  opacity: 1;
}
</style>
