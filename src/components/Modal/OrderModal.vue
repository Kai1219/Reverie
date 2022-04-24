<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>訂單細節</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row justify-content-evenly">
            <div class="col-md-4">
              <div class="d-flex">
                <h3 class="d-inline-block me-auto">收件人資料</h3>
                <button
                  type="button"
                  class="btn btn-success"
                  @click="$emit('change-edit')"
                  v-if="editStatus === false"
                >
                  <i class="bi bi-pencil-square"></i>
                </button>
              </div>
              <table class="table" v-if="editStatus === false">
                <tbody v-if="temporaryOrder.user">
                  <tr>
                    <th style="width: 100px">姓名</th>
                    <td>{{ temporaryOrder.user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ temporaryOrder.user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ temporaryOrder.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ temporaryOrder.user.address }}</td>
                  </tr>
                  <tr>
                    <th>備註</th>
                    <td>{{ temporaryOrder.user.message }}</td>
                  </tr>
                </tbody>
              </table>
              <v-form
                class="form justify-content-center"
                v-else
                v-slot="{ errors }"
                @submit="$emit('update-paid', temporaryOrder)"
              >
                <div class="mb-3">
                  <label for="email" class="form-label"
                    >Email<span class="text-danger"> *</span></label
                  >
                  <v-field
                    type="email"
                    class="form-control"
                    name="email"
                    id="email"
                    placeholder="請輸入 Email"
                    :class="{ 'is-invalid': errors['email'] }"
                    rules="email|required"
                    v-model="temporaryOrder.user.email"
                  ></v-field>
                  <ErrorMessage
                    name="email"
                    class="invalid-feedback"
                  ></ErrorMessage>
                </div>
                <div class="mb-3">
                  <label for="name" class="form-label"
                    >收件人姓名<span class="text-danger"> *</span></label
                  >
                  <v-field
                    type="text"
                    class="form-control"
                    name="姓名"
                    id="name"
                    placeholder="請輸入姓名"
                    :class="{ 'is-invalid': errors['姓名'] }"
                    rules="required"
                    v-model="temporaryOrder.user.name"
                  ></v-field>
                  <ErrorMessage
                    name="姓名"
                    class="invalid-feedback"
                  ></ErrorMessage>
                </div>
                <div class="mb-3">
                  <label for="tel" class="form-label"
                    >收件人手機<span class="text-danger"> *</span></label
                  >
                  <v-field
                    type="tel"
                    class="form-control"
                    name="手機"
                    id="tel"
                    placeholder="請輸入手機號碼:09XXXXXXXX"
                    :class="{ 'is-invalid': errors['手機'] }"
                    :rules="{ regex: /^09[0-9]{8}$/, required: true }"
                    v-model="temporaryOrder.user.tel"
                  ></v-field>
                  <ErrorMessage
                    name="手機"
                    class="invalid-feedback"
                  ></ErrorMessage>
                </div>
                <div class="mb-3">
                  <label for="address" class="form-label"
                    >收件人地址<span class="text-danger"> *</span></label
                  >
                  <v-field
                    type="text"
                    class="form-control"
                    name="地址"
                    id="address"
                    placeholder="請輸入地址"
                    :class="{ 'is-invalid': errors['地址'] }"
                    rules="required"
                    v-model="temporaryOrder.user.address"
                  ></v-field>
                  <ErrorMessage
                    name="地址"
                    class="invalid-feedback"
                  ></ErrorMessage>
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
                    v-model="temporaryOrder.user.message"
                  >
                  </v-field>
                </div>
                <div class="d-flex justify-content-center">
                  <button
                    type="submit"
                    class="btn btn-success w-50"
                    v-if="editStatus"
                  >
                    修改
                  </button>
                </div>
              </v-form>
            </div>
            <div class="col-md-8">
              <h3>訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ temporaryOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ $filters.date(temporaryOrder.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="temporaryOrder.paid_date">
                        {{ $filters.date(temporaryOrder.paid_date) }}
                      </span>
                      <span v-else>時間不正確</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong v-if="temporaryOrder.is_paid" class="text-success"
                        >已付款</strong
                      >
                      <strong v-else class="text-danger">尚未付款</strong>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>
                      {{ Math.round(temporaryOrder.total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3>選購商品</h3>
              <table class="table">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr v-for="item in temporaryOrder.products" :key="item.id">
                    <th>
                      {{ item.product.title }}
                    </th>
                    <td>{{ item.qty }} / {{ item.product.unit }}</td>
                    <td class="text-end">
                      {{ Math.round(item.final_total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-end">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    v-model="temporaryOrder.is_paid"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    <span v-if="temporaryOrder.is_paid">已付款</span>
                    <span v-else>未付款</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary text-black"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-paid', temporaryOrder)"
            :disabled="editStatus"
          >
            <span v-if="editStatus">未完成</span>
            <span v-else>完成</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  props: ['temporary-order', 'edit-status'],
  data () {
    return {
      status: {},
      modal: ''
    }
  },
  emits: ['update-paid', 'change-edit'],
  mixins: [modalMixin]
}
</script>
