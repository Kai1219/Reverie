<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    aria-labelledby="CouponsModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="CouponsModalLabel">
            <span v-if="status === 'create'">新增產品</span>
            <span v-else-if="status === 'edit'">編輯產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="temporaryCoupons.title"
                  placeholder="請輸入優惠碼標題"
                />
              </div>
              <div class="mb-3">
                <label for="code" class="form-label">優惠碼</label>
                <input
                  type="text"
                  class="form-control"
                  id="code"
                  v-model="temporaryCoupons.code"
                  placeholder="請輸入優惠碼"
                />
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label for="percent" class="form-label">折扣百分比</label>
                  <input
                    type="number"
                    class="form-control"
                    id="percent"
                    v-model="temporaryCoupons.percent"
                    min="0"
                    placeholder="請輸入折扣百分比"
                  />
                </div>
                <div class="col-md-6">
                  <label for="due_date">截止日期</label>
                  <input
                    type="date"
                    class="form-control"
                    id="due_date"
                    v-model="due_date"
                  />
                </div>
              </div>

              <hr />

              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="is_enabled"
                    v-model="temporaryCoupons.is_enabled"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="saveCoupon()">
            確定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  props: ['temporary-coupons', 'status'],
  data () {
    return {
      tempCoupon: {},
      due_date: ''
    }
  },
  mixins: [modalMixin],
  methods: {
    saveCoupon () {
      let api = ''
      let method = ''
      if (this.status === 'create') {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`
        method = 'post'
      } else if (this.status === 'edit') {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.temporaryCoupons.id}`
        method = 'put'
      }

      this.$http[method](api, { data: this.temporaryCoupons })
        .then((res) => {
          alert(res.data.message)
          this.$emit('get-data')
          console.log(res)
          this.modal.hide()
        })
        .catch((error) => {
          console.dir(error.response.data.message)
          alert(error.response.data.message)
        })
    }
  },
  watch: {
    coupon () {
      this.tempCoupon = this.temporaryCoupons
      // 將時間格式改為 YYYY-MM-DD
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T')
      this.due_date = dateAndTime
    },
    due_date () {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000)
    }
  }
}
</script>
