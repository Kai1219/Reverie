<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link to="/adminproducts" class="navbar-brand">後台</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/adminproducts" class="nav-link"
              >產品列表</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/adminOrder" class="nav-link"
              >訂單列表</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/adminCoupon" class="nav-link"
              >優惠券</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/" class="nav-link">回到前台</router-link>
          </li>
        </ul>
      </div>
      <a href="#" @click.prevent="signout">登出</a>
    </div>
  </nav>
  <Loading ref="Loading"></Loading>
  <router-view v-if="checkSuccess">
  </router-view>
</template>

<script>
import Loading from '@/components/LoadingView.vue'
export default {
  data () {
    return {
      checkSuccess: false
    }
  },
  components: { Loading },
  methods: {
    checkAdmin () {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      if (token) {
        // Axios 預設值
        this.$http.defaults.headers.common.Authorization = `${token}`
        this.$http
          .post(`${process.env.VUE_APP_API}/api/user/check`)
          .then(() => {
            this.checkSuccess = true
          })
          .catch(() => {
            alert('請重新登入')
            this.$router.push('/login')
          })
      } else {
        alert('您尚未登入。')
        this.$router.push('/login')
      }
    },
    signout () {
      document.cookie = 'hexToken=;expires=;'
      alert('已登出')
      this.$router.push('/')
    }
  },
  mounted () {
    this.$refs.Loading.ToggleLoading('on')
    this.checkAdmin()
    this.$refs.Loading.ToggleLoading('off')
  }
}
</script>
