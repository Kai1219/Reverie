<template>
  <div
    class="modal fade"
    id="delProductModal"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title" id="delProductModalLabel">確定是否刪除!</h5>
          <button
            type="button"
            class="btn-close"
            @click="closeModal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>
            是否刪除<strong class="text-danger">{{
              order.user
            }}</strong
            >?(刪除後將無法復原!!)
          </p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="closeModal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="$emit('del-item')">確定刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal'
export default {
  props: {
    order: {}
  },
  data () {
    return {
    }
  },
  emits: ['del-item'],
  methods: {
    openModal () {
      console.log(this.order)
      this.modal.show()
    },
    closeModal () {
      this.modal.hide()
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal)
  }
}
</script>
