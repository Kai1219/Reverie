<template>
  <footer class="footer bg-secondary bg-opacity-10 text-center">
    <div class="d-md-flex p-3 justify-content-evenly align-items-center">
      <router-link class="navbar-brand me-2 d-none d-md-block" :to="`/`">
        <img src="@/assets/img/r-logo.png" alt="Reverie" class="logo-img" />
      </router-link>
      <div class="d-md-flex">
        <p class="m-0">僅供個人作品使用，不提供商業用途</p>
        <span class="mx-2 d-none d-md-block">|</span>
        <p class="m-0">Reverie © 2022 copyright</p>
      </div>
      <router-link to="/adminProducts">登入後台</router-link>
    </div>
  </footer>
</template>
