<template>
  <h2>優惠碼</h2>
  <section>
    <div class="container">
      <div class="text-end mt-4">
        <button class="btn btn-primary" @click="openCouponModal('create')">
          建立新的優惠碼
        </button>
      </div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="120">標題</th>
            <th>優惠碼</th>
            <th width="120">折扣</th>
            <th width="120">截止日期</th>
            <th width="120">啟用</th>
            <th width="120">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="coupon in coupons" :key="coupon.id">
            <td>{{ coupon.title }}</td>
            <td>{{ coupon.code }}</td>
            <td class="">{{ coupon.percent }}%</td>
            <td class="">
              {{ $filters.date(coupon.due_date) }}
            </td>
            <td>
              <span v-if="coupon.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm btn-primary"
                  @click="openCouponModal('edit', coupon)"
                >
                  編輯
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm btn-danger"
                  @click="openCouponModal('delete', coupon)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <CouponModal
      :temporary-coupons="tempCoupons"
      :status="status"
      v-on:get-data="getCoupons"
      ref="CouponsModal"
    ></CouponModal>
  </section>
  <DelModal
    ref="DelModal"
    @del-item="deleteCoupon"
    :item="tempCoupons"
  ></DelModal>
  <Pagination :pages="pagination"></Pagination>
</template>

<script>
import Pagination from '@/components/PaginationVuew.vue'
import CouponModal from '@/components/Modal/CouponModal.vue'
import DelModal from '@/components/Modal/DelModal.vue'
export default {
  data () {
    return {
      coupons: {},
      tempCoupons: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      status: '',
      pagination: {}
    }
  },
  components: {
    Pagination,
    CouponModal,
    DelModal
  },
  methods: {
    getCoupons (page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`
      this.$http
        .get(api)
        .then((res) => {
          this.coupons = res.data.coupons
          this.pagination = res.data.pagination
          console.log(res)
        })
        .catch((error) => {
          alert(error.data.message)
        })
    },
    openCouponModal (status, coupon) {
      const CouponComponent = this.$refs.CouponsModal
      const DelModal = this.$refs.DelModal

      if (!coupon) {
        this.tempCoupons = {}
        CouponComponent.openModal()
        this.tempCoupons = {
          due_date: new Date().getTime() / 1000
        }
        console.log('create', this.tempCoupons)
        this.status = 'create'
      } else if (status === 'edit') {
        this.tempCoupons = { ...coupon }
        CouponComponent.openModal()
        console.log('edit', this.tempCoupons)
        this.status = 'edit'
      } else if (status === 'delete') {
        this.tempCoupons = { ...coupon }
        DelModal.openModal()
        this.status = 'delete'
      }
    },
    deleteCoupon () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupons.id}`
      this.$http
        .delete(api, { data: this.tempCoupons })
        .then((res) => {
          this.getCoupons()
          alert(res.data.message)
        })
        .catch((error) => {
          console.dir(error)
          alert(error.data.message)
        })
      this.$refs.DelModal.hideModal()
    }
  },
  mounted () {
    this.getCoupons()
  }
}
</script>
