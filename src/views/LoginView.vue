<template>
  <div class="form">
    <form action="">
      <h2>會員登入</h2>
      <div class="from-group">
        <label for="user-id">帳號</label>
        <input type="text" name="" id="user-id" />
      </div>
      <div class="from-group">
        <label for="user-password">密碼</label>
        <input type="password" name="" id="user-password" />
      </div>
      <div class="btn-group">
        <button class="btn">登入</button>
        <button class="btn">取消</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+TC:100,300,400,500,700,900&display=swap');
* {
  padding: 0;
  margin: 0;
  list-style: none;
  font-family: 'Noto Sans TC', sans-serif;
}

html,
body {
  height: 100%;
}

body {
  background: url('https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467&q=80') no-repeat
    center center/cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  background: rgba(0, 0, 0, 0.5);
  border: 10px solid #fff;
  width: 600px;
  height: 500px;
  border-radius: 10px;
  box-shadow: 0px 0px 60px #000;
  backdrop-filter: blur(5px);
  /*模糊背景*/
  display: flex;
  justify-content: center;
  align-items: center;
}

.form form {
  color: #fff;
  width: 400px;
}

.form form h2 {
  font-size: 24px;
  border-bottom: 1px solid #fff;
  padding: 20px 0;
  margin: 20px 0;
}

.from-group {
  margin: 20px 0;
}

.from-group label {
  line-height: 2;
}

.from-group input {
  line-height: 3;
  border-radius: 5px;
  border: 1px solid #aaa;
  width: 100%;
}

.btn-group {
  margin-top: 50px;
  font-size: 0px;
}

.btn-group .btn {
  background-color: #6ab4fe;
  color: #fff;
  font-size: 20px;
  padding: 10px 0;
  border-radius: 5px;
  border: none;
  width: 190px;
}

.btn-group .btn + .btn {
  margin-left: 20px;
  background-color: #aaa;
}
</style>

<script>
export default {
  name: 'LoginView'
}
</script>
