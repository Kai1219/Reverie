<template>
  <div class="vld-parent">
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage">
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
        }, 2000)
      }
    },
    onCancel () {
      console.log('User cancelled the loader.')
    }
  }
}
</script>
