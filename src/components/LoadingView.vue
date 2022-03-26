<template>
  <div class="vld-parent">
    <loading
      :active="isLoading"
      :is-full-page="fullPage"
      color="#839EA9"
      loader="dots">
    </loading>
  </div>
</template>

<style lang="scss">
</style>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  data () {
    return {
      isLoading: false,
      fullPage: true
    }
  },
  components: {
    Loading
  },
  methods: {
    ToggleLoading (status) {
      if (status === 'on') {
        this.isLoading = true
      } else {
        setTimeout(() => {
          this.isLoading = false
        }, 1000)
      }
    }
  }
}
</script>
