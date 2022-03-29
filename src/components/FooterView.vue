<template>
  <footer class="text-center mt-1">
    <div class="footer row">
      <a class="navbar-brand me-2" href="#">
        <img src="@/assets/img/r-logo.png" alt="Reverie" class="logo-img" />
      </a>
      <p class="mt-3 fs-6">本網站僅供個人作品使用，不提供商業用途</p>
      <h6>Reverie &copy; 2022 copyright</h6>
      <router-link to="/adminProducts">登入後台</router-link>
    </div>
  </footer>
</template>
<style lang="scss">
/*main*/
main {
  padding-bottom: 30vh;
}
/*footer*/
footer {
  background: #eee;
  height: 30vh; /*設定footer本身高度*/
  margin-top: -30vh; /*隨footer高度需做調整*/
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.footer {
  margin: 0;
}
.logo-img {
  width: 10rem;
}
</style>

<script>
export default {
  name: 'FooterView',
  data () {
    return {
    }
  }
}
</script>
