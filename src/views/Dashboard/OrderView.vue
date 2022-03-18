<template>
  <h2>訂單列表</h2>
  <table class="table table-hover align-middle">
    <thead class="table-secondary">
      <tr>
        <th scope="col">訂單編號</th>
        <th scope="col">訂單日期</th>
        <th scope="col">訂購人姓名</th>
        <th scope="col">應付金額</th>
        <th scope="col">付款狀態</th>
        <th scope="col">備註</th>
        <th scope="col"></th>
        <th scope="col"></th>
     </tr>
    </thead>
    <tbody>
      <template v-for="order in orders" :key="order.id">
        <tr>
          <td scope="row">{{order.id}}</td>
          <td>{{$filters.date(order.create_at)}}</td>
          <td>{{order.user.name}}</td>
          <td>{{order.final_total}}</td>
          <td><div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" id="`paidSwitch${order.id}`" v-model="order.is_paid"
                @change="updatePaid(order)">
          <label class="form-check-label" for="`paidSwitch${order.id}`">
          <span v-if="order.is_paid">已付款</span>
          <span v-else>未付款</span>
          </label></div></td>
          <td>{{order.user.message}}</td>
          <td><button type="button" class="btn btn-primary" @click="openModal(order)">明細</button></td>
          <td><button type="button" class="btn btn-danger" @click="openDelOrderModal(order)">刪除</button></td>
        </tr>
      </template>
    </tbody>
   </table>
   <OrderModal
    :order="tempOrder"
    ref="orderModal"
    @update-paid="updatePaid"
  ></OrderModal>
  <DelModal :order="tempOrder" ref="delModal" @del-item="delOrder"></DelModal>
  <Pagination :pages="pagination" @emitPages="getOrders"></Pagination>
</template>
<script>
import OrderModal from '@/components/OrderModal.vue'
import DelModal from '@/components/DelModal.vue'
import Pagination from '@/components/PaginationView.vue'
export default {
  data () {
    return {
      orders: {},
      isNew: false,
      pagination: {},
      tempOrder: {},
      currentPage: 1
    }
  },
  components: {
    Pagination,
    DelModal,
    OrderModal
  },
  methods: {
    getOrders (currentPage = 1) {
      this.currentPage = currentPage
      this.isLoading = true
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${this.currentPage}`
        )
        .then((res) => {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          alert(error.data.message)
        })
    },
    openModal (order) {
      this.tempOrder = { ...order }
      this.isNew = false
      const orderComponent = this.$refs.orderModal
      orderComponent.openModal()
      console.log(this)
    },
    openDelOrderModal (order) {
      this.tempOrder = { ...order }
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    updatePaid (order) {
      this.isLoading = true
      const paid = {
        is_paid: order.is_paid
      }
      this.$http
        .put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${order.id}`, { data: paid })
        .then((res) => {
          this.isLoading = false
          const orderComponent = this.$refs.orderModal
          orderComponent.hideModal()
          this.getOrders(this.currentPage)
          alert(res.data.message)
        })
        .catch((error) => {
          this.isLoading = false
          alert(error.data.message)
        })
    },
    delOrder () {
      this.isLoading = true
      this.$http
        .delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`)
        .then(() => {
          this.isLoading = false
          const delComponent = this.$refs.delModal
          delComponent.closeModal()
          this.getOrders(this.currentPage)
        })
        .catch((error) => {
          this.isLoading = false
          alert(error.data.message)
        })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
