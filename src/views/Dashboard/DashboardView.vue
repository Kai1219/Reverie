<template>
  <div class="row g-0">
    <div class="col-md-2 d-none d-lg-inline-block me-auto">
      <nav class="dashboard-nav navbar-dark bg-dark vh-100 position-relative">
        <div>
          <div class="text-white p-3">
            <h1>Reverie</h1>
            <h3>後台管理介面</h3>
          </div>
          <div>
            <ul class="navbar-nav flex-md-column fs-5">
              <li class="nav-item m-3">
                <router-link to="/adminproducts" class="nav-link"
                  ><i class="bi bi-shop-window"></i>產品列表</router-link
                >
              </li>
              <li class="nav-item m-3">
                <router-link to="/adminOrder" class="nav-link"
                  ><i class="bi bi-receipt-cutoff"></i>訂單列表</router-link
                >
              </li>
              <li class="nav-item m-3">
                <router-link to="/adminCoupon" class="nav-link"
                  ><i class="bi bi-percent"></i>優惠券</router-link
                >
              </li>
              <li class="nav-item m-3">
                <router-link to="/" class="nav-link"
                  ><i class="bi bi-box-arrow-up-left"></i>回到前台</router-link
                >
              </li>
            </ul>
          </div>
        </div>
        <button
          class="btn btn-info position-absolute bottom-0 w-100"
          @click="signout"
        >
          登出
        </button>
      </nav>
    </div>
    <div class="col d-md-block d-lg-none bg-primary">
      <div class="text-white d-flex align-items-center px-3">
        <p class="fs-3 m-0 d-inline">Reverie後台管理</p>
        <button
          class="btn btn-primary ms-auto d-block"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          <i class="bi bi-filter-right fs-1"></i>
        </button>
      </div>
      <div
        class="offcanvas offcanvas-start bg-primary text-white"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div class="offcanvas-header">
          <div class="offcanvas-title">
            <h1>Reverie</h1>
            <h2>後台管理介面</h2>
          </div>
          <button
            type="button"
            class="fs-3 text-white btn-info"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="offcanvas-body">
          <div>
            <ul class="dashboard-nav navbar-nav flex-md-column fs-5 text-white">
              <li class="nav-item m-3">
                <router-link to="/adminproducts" class="nav-link text-white"
                  ><i class="bi bi-shop-window"></i>產品列表</router-link
                >
              </li>
              <li class="nav-item m-3">
                <router-link to="/adminOrder" class="nav-link text-white"
                  ><i class="bi bi-receipt-cutoff"></i>訂單列表</router-link
                >
              </li>
              <li class="nav-item m-3">
                <router-link to="/adminCoupon" class="nav-link text-white"
                  ><i class="bi bi-percent"></i>優惠券</router-link
                >
              </li>
              <li class="nav-item m-3">
                <router-link to="/" class="nav-link text-white"
                  ><i class="bi bi-box-arrow-up-left"></i>回到前台</router-link
                >
              </li>
            </ul>
          </div>
        </div>
        <button class="btn btn-info" @click="signout">登出</button>
      </div>
    </div>
    <div class="col-lg-9 m-auto">
      <RouterView v-if="checkSuccess" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkSuccess: false
    }
  },
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
            alert('發生錯誤，請重新登入')
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
    this.checkAdmin()
  }
}
</script>

<style lang="scss">
.dashboard-nav .nav-item {
  display: block;
  text-decoration: none;
  padding: 10px;
  position: relative;
  color: #fff;
}

.dashboard-nav .nav-item::after {
  content: '';
  border-top: 1px solid #fff;
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 0rem;
}

.dashboard-nav .nav-item .bi {
  display: inline-block;
  margin-right: -1.1em;
  transform: scale(0);
  transition: 0.3s;
}

.dashboard-nav .nav-item a:hover .bi {
  margin-right: 0.5em;
  transform: scale(1);
}

.dashboard-nav .active .bi {
  margin-right: 0.5em;
  transform: scale(1);
}

.dash-title .deco-line:before {
  content: '';
  display: inline-block;
  width: 5px;
  height: 60px;
  background-color: #313c3e;
  border-top: 2px solid #313c3e;
  position: absolute;
  top: 0px;
  left: -10px;
}

@media screen and (max-width: 992px) {
  .dash-title {
    text-align: center;
  }
  .dash-title .deco-line:before {
    width: 50px;
    height: 3px;
    top: 60px;
    left: calc(50% - 25px);
  }
}
</style>
