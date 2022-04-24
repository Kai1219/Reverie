<template>
  <div class="container-fluid full-screen vh-100 p-5">
    <div class="row form p-5">
      <form class="col-6" @submit.prevent="signIn">
        <h2 class="fs-4 py-4 my-3">請先登入</h2>
        <div class="mb-3">
          <label for="userEmail" class="form-label">帳號</label>
          <input
            type="email"
            name="email"
            id="userEmail"
            class="form-control"
            placeholder="請輸入電子信箱"
            v-model="user.username"
            required
            autofocus
          />
        </div>
        <div class="mb-3">
          <label for="userPassword" class="form-label">密碼</label>
          <input
            type="password"
            name="password"
            id="userPassword"
            class="form-control"
            placeholder="請輸入密碼"
            v-model="user.password"
            required
          />
        </div>
        <div class="mt-5 row row-cols-1 row-cols-sm-2 g-2">
          <button class="btn btn-primary col" type="submit">登入</button>
          <button
            class="btn btn-secondary col btn-cancel"
            type="button"
            @click="backIndex"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  </div>
  <SuccessToast ref="SuccessToast" :message="toastMessage"></SuccessToast>
  <ErrorToast ref="ErrorToast" :message="toastMessage"></ErrorToast>
  <Loading ref="Loading"> </Loading>
</template>

<script>
import Loading from '@/components/LoadingView.vue'
import SuccessToast from '@/components/SuccessToast.vue'
import ErrorToast from '@/components/ErrorToast.vue'
export default {
  name: 'LoginView',
  data () {
    return {
      user: {},
      toastMessage: ''
    }
  },
  components: { Loading, ErrorToast, SuccessToast },
  methods: {
    signIn () {
      const api = `${process.env.VUE_APP_API}/admin/signin`
      this.$http
        .post(api, this.user)
        .then((res) => {
          this.toastMessage = res.data.message
          this.$refs.SuccessToast.openToasts()
          const { token, expired } = res.data
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`
          setTimeout(() => {
            this.$router.push('/adminProducts')
          }, 1000)
        })
        .catch(() => {
          this.toastMessage = '帳號或密碼有誤哦，請重新登入'
          this.$refs.ErrorToast.openToasts()
        })
    },

    backIndex () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
.full-screen {
  background: url('https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467&q=80')
    no-repeat center center/cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  background: rgba(0, 0, 0, 0.5);
  border: 10px solid #fff;
  box-shadow: 0 0 3.75rem #000;
  backdrop-filter: blur(0.3rem);
  padding: 1.5rem;
}

.form form {
  color: #fff;
  width: 25rem;
}

@media screen and (max-width: 576px) {
  .form {
    width: 20rem;
  }
}

.form form h2 {
  border-bottom: 1px solid #fff;
}

.from-group input {
  line-height: 3;
  border: 1px solid #aaa;
}
.btn {
  border: none;
}

.btn-cancel {
  background-color: #aaa;
}
</style>
