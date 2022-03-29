<template>
  <Front-nav></Front-nav>
  <router-view class="position-relative"/>
  <Footer></Footer>
</template>

<script>
import FrontNav from '@/components/FrontNav.vue'
import Footer from '@/components/FooterView.vue'
export default {
  name: 'FrontView',
  data () {
    return {}
  },
  components: {
    FrontNav,
    Footer
  }
}
</script>
