<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    aria-labelledby="ProductModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="productModalLabel">
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
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">主圖片</label>
                <input
                  type="text"
                  class="form-control"
                  id="imageUrl"
                  v-model="temporaryProducts.imageUrl"
                  placeholder="請輸入圖片連結"
                />
                <img
                  :src="temporaryProducts.imageUrl"
                  alt=""
                  class="img-fluid"
                />
              </div>
              <h3 class="mb-3">多圖新增</h3>
              <div v-if="Array.isArray(temporaryProducts.imagesUrl)">
                <div
                  class="mb-1"
                  v-for="(image, key) in temporaryProducts.imagesUrl"
                  :key="key"
                >
                  <div class="mb-3">
                    <label for="imagesUrl" class="form-label">圖片網址</label>
                    <input
                      v-model="temporaryProducts.imagesUrl[key]"
                      type="text"
                      class="form-control"
                      placeholder="請輸入圖片連結"
                    />
                  </div>
                  <img class="img-fluid" :src="image" />
                </div>
                <!--!temporaryProducts.imagesUrl.length  如果刪到陣列沒有長度>>空的連一格都沒有，不再顯示"刪除圖片"，只顯示"新增圖片"-->
                <!--temporaryProducts.imagesUrl[temporaryProducts.imagesUrl.length - 1]  如果陣列最後一項是有內容的，在後面顯示"新增圖片"(會再新增一個空陣列格子)-->
                <div
                  v-if="
                    !temporaryProducts.imagesUrl.length ||
                    temporaryProducts.imagesUrl[
                      temporaryProducts.imagesUrl.length - 1
                    ]
                  "
                >
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="temporaryProducts.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                </div>
                <div v-else>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="temporaryProducts.imagesUrl.pop()"
                  >
                    刪除圖片
                  </button>
                </div>
              </div>
              <div v-else>
                <!--如果temporaryProducts.imagesUrl陣列沒有內容-->
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="createImages"
                >
                  新增圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">產品名稱</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="temporaryProducts.title"
                  placeholder="請輸入產品名稱"
                />
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    type="text"
                    class="form-control"
                    id="category"
                    v-model="temporaryProducts.category"
                    placeholder="請輸入產品分類"
                  />
                </div>
                <div class="col-md-6">
                  <label for="unit" class="form-label">單位</label>
                  <input
                    type="text"
                    class="form-control"
                    id="unit"
                    v-model="temporaryProducts.unit"
                    placeholder="請輸入產品單位"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="origin_price"
                    min="0"
                    v-model.number="temporaryProducts.origin_price"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    min="0"
                    v-model.number="temporaryProducts.price"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>

              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  v-model="temporaryProducts.description"
                  placeholder="請輸入產品描述"
                >
                </textarea>
              </div>

              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="content"
                  type="text"
                  class="form-control"
                  v-model="temporaryProducts.content"
                  placeholder="請輸入說明內容"
                >
                </textarea>
              </div>

              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="is_enabled"
                    v-model="temporaryProducts.is_enabled"
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
          <button type="button" class="btn btn-primary" @click="saveProduct()">
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
  props: ['temporary-products', 'status'],
  mixins: [modalMixin],
  methods: {
    saveProduct () {
      let api = ''
      let method = ''
      if (this.status === 'create') {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`
        method = 'post'
      } else if (this.status === 'edit') {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.temporaryProducts.id}`
        method = 'put'
      }

      this.$http[method](api, { data: this.temporaryProducts })
        .then((res) => {
          alert(res.data.message)
          this.$emit('get-data')
          this.modal.hide()
        })
        .catch((error) => {
          alert(error.response.data.message)
        })
    },

    createImages () {
      this.temporaryProducts.imagesUrl = []
      this.temporaryProducts.imagesUrl.push('')
    }
  }
}
</script>
