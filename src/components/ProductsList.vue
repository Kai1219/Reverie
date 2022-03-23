<template>
  <div class="col-sm-3 list-group">
    <a
      class="list-group-item list-group-item-action active"
      aria-current="true"
      @click.prevent="getCategory()"
    >
      全部商品
    </a>
    <a
      class="list-group-item list-group-item-action"
      @click.prevent="getCategory('冰淇淋')"
      >冰淇淋</a
    >
    <a class="list-group-item list-group-item-action" @click.prevent="getCategory('冰棒')">冰棒</a>
    <a class="list-group-item list-group-item-action" @click.prevent="getCategory('蛋糕')">蛋糕</a>
    <a class="list-group-item list-group-item-action" @click.prevent="getCategory('塔/派')">塔/派</a>
  </div>
</template>

<script>
export default {
  name: 'ProductsList',
  data () {
    return {
      products: []
    }
  },
  methods: {
    getCategory (category) {
      this.$emit('get-category', category)
    }
  },
  mounted () {}
}
</script>
