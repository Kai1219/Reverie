<template>
  <div
    class="modal fade"
    id="delModal"
    tabindex="-1"
    aria-labelledby="delModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header text-white border-0">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body text-center">
          <p>
            是否刪除<strong class="text-danger">{{ title }}</strong
            >?
          </p>
          <p class="text-secondary text-sm">(刪除後將無法復原!!)</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="delItem()">
            確定刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  props: ['title'],
  mixins: [modalMixin],
  methods: {
    delItem () {
      this.$emit('del-item')
    }
  }
}
</script>
