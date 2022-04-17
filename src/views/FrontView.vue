<template>
  <div class="wrapper">
    <Front-nav />
    <RouterView/>
  </div>
  <Footer />
</template>

<script>
import FrontNav from '@/components/FrontNav.vue'
import Footer from '@/components/FooterView.vue'
export default {
  name: 'FrontView',
  components: {
    FrontNav,
    Footer
  }
}
</script>

<style lang="scss">
body {
  overflow-x: hidden;
}

html {
  height: 100%;
}
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.wrapper {
  flex: 1;
}

.z-index-1 {
  z-index: 1;
}

.z-index-3 {
  z-index: 3;
}

.mt-6 {
  margin-top: 8.5rem;
}

.mb-6 {
  margin-bottom: 8.5rem;
}

.bg-top {
  height: 40vh;
}

.pic {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  overflow: hidden;
}
</style>
