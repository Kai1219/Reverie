<template>
  <footer class="footer bg-secondary bg-opacity-10">
    <div class="d-md-flex p-3 justify-content-evenly align-items-center">
      <a class="navbar-brand me-2" href="#">
        <img src="@/assets/img/r-logo.png" alt="Reverie" class="logo-img" />
      </a>
      <p class="m-0">
        僅供個人作品使用，不提供商業用途 | Reverie © 2022 copyright
      </p>
      <router-link to="/adminProducts" class="">登入後台</router-link>
    </div>
  </footer>
</template>

<style lang="scss">
.logo-img {
  width: 10rem;
}
</style>
