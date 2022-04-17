<template>
  <swiper
    :slidesPerView="1"
    :spaceBetween="30"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false
    }"
    :loop="true"
    :navigation="false"
    :modules="modules"
    class="mySwiper banerSwiper"
  >
    <swiper-slide class="pic banner-swiper1"> </swiper-slide>
    <swiper-slide class="pic banner-swiper2"></swiper-slide
    ><swiper-slide class="pic banner-swiper3"></swiper-slide>
    <swiper-slide class="pic banner-swiper4"></swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import '@/assets/stylesheets/Swiper.css'
import { Autoplay, Pagination, Navigation } from 'swiper'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  setup () {
    return {
      modules: [Autoplay, Pagination, Navigation]
    }
  }
}
</script>

<style lang="scss">
.pic {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  overflow: hidden;
}

.banner-swiper1 {
  background-image: url('@/assets/img/banner/banner-swiper1.png');
}

.banner-swiper2 {
  background-image: url('@/assets/img/banner/banner-swiper2.png');
}

.banner-swiper3 {
  background-image: url('@/assets/img/banner/banner-swiper3.png');
}

.banner-swiper4 {
  background-image: url('@/assets/img/banner/banner-swiper4.png');
}
</style>
