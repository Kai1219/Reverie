<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
    <div class="container-fluid">
      <div class="sr-only">
        <h1>Reverie</h1>
      </div>
      <a class="navbar-brand me-2" href="/">
        <img src="@/assets/img/logo.svg" alt="Reverie" class="logo-img" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item mx-3 my-auto">
            <router-link
              to="/f/products"
              class="nav-link active"
              aria-current="page"
              >產品列表</router-link
            >
          </li>
          <li class="nav-item mx-3 my-auto">
            <router-link to="/f/about" class="nav-link">關於我們</router-link>
          </li>
          <li class="nav-item mx-3 my-auto">
            <router-link to="/f/service" class="nav-link">常見問題</router-link>
          </li>
          <li class="nav-item mx-3 my-auto">
            <router-link to="/f/cart" class="nav-link"
              ><i class="bi bi-cart3"></i
            ></router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
body {
  font-size: 16px;
}
.logo-img {
  width: 10rem;
}
.bi-cart3 {
  font-size: 2rem;
}
</style>

<script>
export default {
  name: 'FrontNav',
  data () {
    return {
      products: []
    }
  }
}
</script>
