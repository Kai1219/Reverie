<template>
  <footer class="text-center">
    <div class="footer row">
      <a class="navbar-brand me-2" href="#">
        <img src="@/assets/img/logo.svg" alt="Reverie" class="logo-img" />
      </a>
      <p class="mt-3">本網站僅供個人作品使用，不提供商業用途 | <router-link to="/login">登入後台</router-link></p>
      <h6>Reverie &copy; 2022 copyright</h6>
    </div>
  </footer>
</template>
<style lang="scss">
/*main*/
main {
  /*padding-bottom: 30vh;*/
}
/*footer*/
footer {
  background: #eee;
  height: 20vh; /*設定footer本身高度*/
  /*margin-top: -20vh;*/ /*隨footer高度需做調整*/
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.footer {
  margin: 0;
}
.logo-img {
  width: 13rem;
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
