<template>
  <RouterView />
</template>

<script>
export default {
  name: 'App',
  watch: {
    $route (to) {
      const nowTitle = to.meta.title || 'Reverie'
      document.title = nowTitle
    }
  }
}
</script>

<style lang="scss">
@import './assets/stylesheets/all';
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
body {
  font-family: 'Roboto', sans-serif;
  background-color: #fbfbfb;
}

.btn-danger,
.btn-danger:hover,
.btn-success,
.btn-success:hover,
.btn-info,
.btn-info:hover,
.btn-success:hover,
.btn-warning,
.btn-warning:hover,
.btn-outline-danger:hover {
  color: #fff;
}

.navbar .active,
.progress-list .active {
  color: #d17028;
}
</style>
