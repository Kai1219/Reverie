<template>
  <div
    class="container-fluid pic notfound vh-100 d-flex flex-column justify-content-center"
  >
    <div class="my-auto text-center d-flex flex-column justify-content-center">
      <h1 class="errorTitle">404</h1>
      <p class="fs-3">此頁面不存在</p>
      <i class="bi bi-cone-striped"></i>
      <p>噢不，你好像迷路了，讓我們返回首頁</p>
      <router-link to="/" class="w-25 mx-auto btn btn-primary"
        >回首頁</router-link
      >
    </div>
  </div>
</template>

<style lang="scss">
.errorTitle {
  font-size: 10rem;
}

.bi-cone-striped {
  font-size: 5rem;
}

.notfound {
  background: url('https://images.unsplash.com/photo-1600977961065-4c41f95a32a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80')
    no-repeat center center / cover;
}
</style>
