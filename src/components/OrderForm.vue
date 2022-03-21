<template>
  <section
    class="form col-md-8 px-2 py-5 p-sm-5 pb-sm-2 mx-auto row justify-content-center"
  >
    <h3 class="mb-4">訂購資訊</h3>
    <v-form class="col-11" v-slot="{ errors }" @submit="submitorder">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <v-field
          type="email"
          class="form-control"
          name="email"
          id="email"
          placeholder="請輸入 Email"
          :class="{ 'is-invalid': errors['email'] }"
          rules="email|required"
          v-model="orderform.user.email"
        ></v-field>
        <error-message name="email" class="invalid-feedback"></error-message>
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <v-field
          type="text"
          class="form-control"
          name="姓名"
          id="name"
          placeholder="請輸入姓名"
          :class="{ 'is-invalid': errors['姓名'] }"
          rules="required"
          v-model="orderform.user.name"
        ></v-field>
        <error-message name="姓名" class="invalid-feedback"></error-message>
      </div>
      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <v-field
          type="tel"
          class="form-control"
          name="電話"
          id="tel"
          placeholder="請輸入電話"
          :class="{ 'is-invalid': errors['電話'] }"
          rules="min:8|max:10|required"
          v-model="orderform.user.tel"
        ></v-field>
        <error-message name="電話" class="invalid-feedback"></error-message>
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <v-field
          type="text"
          class="form-control"
          name="地址"
          id="address"
          placeholder="請輸入地址"
          :class="{ 'is-invalid': errors['地址'] }"
          rules="required"
          v-model="orderform.user.address"
        ></v-field>
        <error-message name="地址" class="invalid-feedback"></error-message>
      </div>
      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <v-field
          as="textarea"
          id="message"
          name="留言"
          class="form-control"
          cols="30"
          rows="10"
          v-model="orderform.user.message"
        >
        </v-field>
      </div>
      <div class="d-flex justify-content-center mt-5">
        <button type="submit" class="btn btn-primary mb-3">送出訂單</button>
      </div>
    </v-form>
  </section>
</template>

<style lang="scss">
.form {
  background-color: #fff;
  box-shadow: 0 0 1rem #bababa;
  border: 20px solid #aac1ca;
}
</style>

<script>
export default {
  name: 'OrderForm',
  props: {
    cartData: {
      carts: []
    }
  },
  data () {
    return {
      orderform: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      orderId: ''
    }
  },
  methods: {
    submitorder () {
      if (this.cartData.carts.length <= 0) {
        alert('請加入商品')
      } else {
        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`
        const data = this.orderform
        this.$http
          .post(api, { data })
          .then((res) => {
            alert(res.data.message)
            // this.addLoading()
            // this.$emit('reset-cart')
            // this.$refs.form.resetForm()
            // this.orderId = res.data.orderId
            this.orderId = res.data.orderId
            this.$router.push({
              name: 'paid',
              params: { Id: `${this.orderId}` }
            })
            this.$refs.form.resetForm()
          })
          .catch(() => {
            // alert(error.data.message)
          })
      }
    },
    delCartAll () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`
      this.$http
        .delete(api)
        .then(() => {
          // this.$emit('get-cart')
          console.log('del')
        })
        .catch((error) => {
          alert(error.data.message)
        })
    }
  }
}
</script>
