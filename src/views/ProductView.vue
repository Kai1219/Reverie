<template>
  <main class="">
    <section class="section-top mb-5">
      <div class="bg-top"></div>
    </section>
    <section class="container p-5">
      <div class="row gx-5">
        <ProductsList></ProductsList>
        <div class="products-items col-sm-8">
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import ProductsList from '@/components/ProductsList.vue'
export default {
  name: 'ProductView',
  data () {
    return {
      product: {}
    }
  },
  components: {
    ProductsList
  },
  methods: {
    getProducts () {
      const { id } = this.$route.params
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`
      this.$http(api)
        .then((res) => {
          this.product = res.data.product
        })
        .catch((error) => {
          alert(error.data.message)
        })
    }
  },
  mounted () {
    this.getProducts()
    console.log('OK')
  }
}
</script>
